/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// helpers
import ErrorHelper from '~/helpers/ErrorHelper';
import ResponseHelper from '~/helpers/ResponseHelper';

// schemas
import schema from './schemas/providers.schema';

// types
import type {FastifyInstance} from 'fastify';
import type {AIProvider} from '~/types';
import type {SuccessResponse} from '~/types/response';

export default (fastify: FastifyInstance) => {
  /**
   * Retrieves all registered AI providers
   * @example
   * // GET /providers
   * // Response: [{ name: "openai", status: "active" }]
   * @developer_notes Includes provider status and configuration info
   */
  fastify.get<{ Reply: SuccessResponse<AIProvider[]> }>('/providers', {schema}, async function (this) {
    try {
      const providers = await this.providerService.getAllProviders();
      return ResponseHelper.successWithData(providers);
    } catch (error: any) {
      fastify.log.error('Failed to get providers:', error);
      ErrorHelper.throwWithStatus('Failed to get providers');
    }
  });
}
