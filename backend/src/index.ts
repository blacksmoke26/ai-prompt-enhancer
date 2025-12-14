/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import 'dotenv/config';

import Fastify from 'fastify';
import cors, {FastifyCorsOptions} from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import websocket from '@fastify/websocket';

// classes
import {ConfigManager} from './config/ConfigManager';
import {AIProviderManager} from './services/AIProviderManager';
import {HistoryManager} from './services/HistoryManager';

// controllers
import promptController from './controllers/promptController';
import historyController from './controllers/historyController';
import configController from './controllers/configController';

// db
import {initDB} from './database';

/**
 * Creates and configures a Fastify server instance with plugins, routes, and WebSocket support.
 * @returns A configured Fastify server instance ready to start.
 * @example
 * const server = await createServer();
 * await server.listen({ port: 3000 });
 * @developer-note Ensure all environment variables are properly configured before calling this function.
 */
const createServer = async () => {
  await initDB();

  const fastify = Fastify({
    logger: {
      level: process.env.LOG_LEVEL || 'info',
    },
  });

  // Register plugins
  await fastify.register(cors, {
    origin: (origin: string, cb): void => {
      console.log(origin);
      if (!origin) {
        cb(null, true);
        return;
      }
      const hostname = new URL(origin).hostname;
      if (hostname === 'localhost') {
        //  Request from localhost will pass
        cb(null, true);
        return;
      }
      // Generate an error on other origins, disabling access
      cb(new Error('Not allowed'), false);
    },
    credentials: true,
  } as FastifyCorsOptions);

  await fastify.register(helmet, {
    contentSecurityPolicy: false,
  });

  await fastify.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute',
  });

  await fastify.register(websocket);

  // Initialize managers
  const configManager = new ConfigManager();
  await configManager.load();

  const providerManager = new AIProviderManager();
  await providerManager.load();

  const historyManager = new HistoryManager();
  await historyManager.load();

  /**
   * Health check endpoint to verify server status.
   * @route GET /health
   * @returns {object} Server status and current timestamp.
   * @example
   * // Response
   * { "status": "ok", "timestamp": "2023-01-01T00:00:00.000Z" }
   */
  fastify.get('/health', async (request, reply) => {
    return {status: 'ok', timestamp: new Date().toISOString()};
  });

  /**
   * Handles HEAD requests for all routes.
   * @route HEAD *
   * @returns {204} No Content
   * @developer-note Useful for health checks and CORS preflight requests.
   */
  fastify.head('*', (_req, reply) => reply.send(204));

  // Register routes
  fastify.register(promptController, {prefix: '/api/prompts', providerManager, historyManager});
  fastify.register(historyController, {prefix: '/api/history', historyManager});
  fastify.register(configController, {prefix: '/api/config', configManager});

  /**
   * WebSocket connection handler for real-time updates.
   * @route GET /ws
   * @param {object} connection - WebSocket connection instance.
   * @param {object} req - HTTP upgrade request.
   * @example
   * // Client connection
   * const ws = new WebSocket('ws://localhost:3000/ws');
   * ws.send(JSON.stringify({ type: 'ping' }));
   * @developer-note Add authentication and authorization as needed.
   */
  fastify.register(async function (fastify) {
    fastify.get('/ws', {websocket: true}, (connection, _req) => {
      console.log('WebSocket client connected');

      connection.on('message', (message: string) => {
        try {
          const data = JSON.parse(message.toString());
          console.log('Received WebSocket message:', data);

          // Handle different message types
          switch (data.type) {
            case 'ping':
              connection.send(JSON.stringify({type: 'pong'}));
              break;
            case 'subscribe':
              // Handle subscription to updates
              connection.send(JSON.stringify({
                type: 'subscribed',
                channels: data.channels || [],
              }));
              break;
            default:
              connection.send(JSON.stringify({
                type: 'error',
                message: 'Unknown message type',
              }));
          }
        } catch (error: any) {
          console.error('WebSocket message error:', error);
          connection.send(JSON.stringify({
            type: 'error',
            message: 'Invalid message format',
          }));
        }
      });

      connection.on('close', () => {
        console.log('WebSocket client disconnected');
      });

      // Send initial connection message
      connection.send(JSON.stringify({
        type: 'connected',
        timestamp: new Date().toISOString(),
      }));
    });
  });

  /**
   * Global error handler for the Fastify server.
   * @param {Error} error - Error object.
   * @param {object} request - Fastify request object.
   * @param {object} reply - Fastify reply object.
   * @returns {void}
   * @example
   * // Validation error response
   * { "error": "Validation Error", "details": [...] }
   * @developer-note Customize error messages based on environment for security.
   */
  fastify.setErrorHandler((error: any, _request, reply) => {
    fastify.log.error(error);

    if (error.validation) {
      reply.code(400).send({
        error: 'Validation Error',
        details: error.validation,
      });
      return;
    }

    reply.code(500).send({
      error: 'Internal Server Error',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong',
    });
  });

  return fastify;
};

/**
 * Starts the Fastify server and listens on configured port and host.
 * @returns {Promise<void>}
 * @example
 * await start();
 * console.log('Server started successfully');
 * @developer-note Ensure proper error handling and graceful shutdown.
 */
async function start() {
  try {
    const server = await createServer();

    const port = parseInt(process.env.PORT || '3000');
    const host = process.env.HOST || '0.0.0.0';

    await server.listen({port, host});
    console.log(`🚀 Server listening on http://${host}:${port}`);

  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

// Start server if this file is run directly
if (require.main === module) {
  start();
}

export {createServer};
