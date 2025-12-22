/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import 'dotenv/config';

// db
import {initDB} from './database';

// core
import {appInstance} from '~/fastify/bootstrapper';
import {listenOptions as appListenOptions} from '~/fastify/app.options';

/**
 * Creates and configures a Fastify server instance with plugins, routes, and WebSocket support.
 * @returns A configured Fastify server instance ready to start.
 * @example
 * const server = await createServer();
 * await server.listen({ port: 3000 });
 * @developer-note Ensure all environment variables are properly configured before calling this function.
 */
const createServer = async () => {
  const fastify = await appInstance();

  await initDB();

  /**
   * Handles HEAD requests for all routes.
   * @route HEAD *
   * @returns {204} No Content
   * @developer-note Useful for health checks and CORS preflight requests.
   */
  fastify.head('*', (_req, reply) => reply.send(204));

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
const start = async () => {
  try {
    const server = await createServer();

    // start listening to events
    server.listen(appListenOptions, (err, address) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log(`🚀 Server listening on ${address}`);
    });

  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

// Start server if this file is run directly
if (require.main === module) {
  start();
}

export {createServer};
