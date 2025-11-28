import Fastify from 'fastify';
import cors, {FastifyCorsOptions} from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import websocket from '@fastify/websocket';
import dotenv from 'dotenv';

import { ConfigManager } from './config/ConfigManager';
import { AIProviderManager } from './services/AIProviderManager';
import { HistoryManager } from './services/HistoryManager';
import { promptRoutes } from './controllers/promptController';
import { historyRoutes } from './controllers/historyController';
import { configRoutes } from './controllers/configController';

// Load environment variables
dotenv.config();

async function createServer() {
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
      const hostname = new URL(origin).hostname
      if(hostname === "localhost"){
        //  Request from localhost will pass
        cb(null, true)
        return
      }
      // Generate an error on other origins, disabling access
      cb(new Error("Not allowed"), false)
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
  const providerManager = new AIProviderManager(configManager);
  const historyManager = new HistoryManager();

  // Health check endpoint
  fastify.get('/health', async (request, reply) => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  });

  /**
   * @route HEAD *
   * Allow head for all routes
   */
  fastify.head('*', (_req, reply) => reply.send(204));

  // Register routes
  fastify.register(promptRoutes, { prefix: '/api/prompts', providerManager, historyManager });
  fastify.register(historyRoutes, { prefix: '/api/history', historyManager });
  fastify.register(configRoutes, { prefix: '/api/config', configManager });

  // WebSocket connection for real-time updates
  fastify.register(async function (fastify) {
    fastify.get('/ws', { websocket: true }, (connection, req) => {
      console.log('WebSocket client connected');

      connection.on('message', (message: string) => {
        try {
          const data = JSON.parse(message.toString());
          console.log('Received WebSocket message:', data);

          // Handle different message types
          switch (data.type) {
            case 'ping':
              connection.send(JSON.stringify({ type: 'pong' }));
              break;
            case 'subscribe':
              // Handle subscription to updates
              connection.send(JSON.stringify({
                type: 'subscribed',
                channels: data.channels || []
              }));
              break;
            default:
              connection.send(JSON.stringify({
                type: 'error',
                message: 'Unknown message type'
              }));
          }
        } catch (error: any) {
          console.error('WebSocket message error:', error);
          connection.send(JSON.stringify({
            type: 'error',
            message: 'Invalid message format'
          }));
        }
      });

      connection.on('close', () => {
        console.log('WebSocket client disconnected');
      });

      // Send initial connection message
      connection.send(JSON.stringify({
        type: 'connected',
        timestamp: new Date().toISOString()
      }));
    });
  });

  // Error handler
  fastify.setErrorHandler((error, _request, reply) => {
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
}

async function start() {
  try {
    const server = await createServer();

    const port = parseInt(process.env.PORT || '3000');
    const host = process.env.HOST || '0.0.0.0';

    await server.listen({ port, host });
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

export { createServer };
