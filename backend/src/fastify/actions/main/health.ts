/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// helpers
import ResponseHelper from '~/helpers/ResponseHelper';

// schemas
import schema from './schemas/health.schema';

// types
import type {FastifyInstance} from 'fastify';
import type {SuccessCustomResponse} from '~/types/response';

export default (fastify: FastifyInstance) => {
  /**
   * Health check endpoint to verify server status.
   * @route GET /health
   * @returns {object} Server status and current timestamp.
   * @example
   * // Response
   * { "success": true, "status": "ok", "timestamp": "2023-01-01T00:00:00.000Z" }
   */
  fastify.get<{
    Reply: SuccessCustomResponse<{ status: string; timestamp: string; }>
  }>('/health', {schema}, async () => {
    return ResponseHelper.successWithCustom(
      {status: 'ok', timestamp: new Date().toISOString()},
    );
  });
}
