/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// helpers
import ErrorHelper from '~/helpers/ErrorHelper';
import ResponseHelper from '~/helpers/ResponseHelper';

// schemas
import schema from './schemas/models.schema';

// types
import type {FastifyInstance} from 'fastify';
import type {AIModel} from '~/types';
import type {SuccessResponse} from '~/types/response';

export default (fastify: FastifyInstance) => {
  /**
   * Retrieves all available models from all providers
   * @example
   * // GET /models
   * // Response: [{ provider: "openai", models: ["gpt-4", "gpt-3.5"] }]
   * @developer_notes Returns aggregated list from all registered providers
   */
  fastify.get<{ Reply: SuccessResponse<AIModel[]> }>('/models', {schema}, async function (this, request, reply) {
    try {
      const models = await this.providerService.getAllModels();
      return ResponseHelper.successWithData(models);
    } catch (error: any) {
      fastify.log.error('Failed to get models:', error);
      ErrorHelper.throwWithStatus('Failed to get models');
    }
  });
}
