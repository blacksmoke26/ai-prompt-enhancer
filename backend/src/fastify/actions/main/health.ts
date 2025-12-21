/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// helpers
import ResponseHelper from '~/helpers/ResponseHelper';

// types
import type {FastifyInstance} from 'fastify';

export default (fastify: FastifyInstance) => {
  /**
   * Health check endpoint to verify server status.
   * @route GET /health
   * @returns {object} Server status and current timestamp.
   * @example
   * // Response
   * { "success": true, "status": "ok", "timestamp": "2023-01-01T00:00:00.000Z" }
   */
  fastify.get('/health', async () => {
    return ResponseHelper.successWithCustom(
      {status: 'ok', timestamp: new Date().toISOString()},
    );
  });
}
