/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// types
import type {FastifyInstance} from 'fastify';

export default async function promptRoutes(fastify: FastifyInstance, options: Record<string, any> = {}) {
  /**
   * Health check endpoint to verify server status.
   * @route GET /health
   * @returns {object} Server status and current timestamp.
   * @example
   * // Response
   * { "status": "ok", "timestamp": "2023-01-01T00:00:00.000Z" }
   */
  fastify.get('/health', async () => {
    return {status: 'ok', timestamp: new Date().toISOString()};
  });

  /**
   * Handles HEAD requests for all routes.
   * @route HEAD *
   * @returns {204} No Content
   * @developer-note Useful for health checks and CORS preflight requests.
   */
  fastify.head('*', (_req, reply) => reply.send(204));
}
