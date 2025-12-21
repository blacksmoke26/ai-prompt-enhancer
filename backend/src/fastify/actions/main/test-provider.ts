/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// helpers
import ResponseHelper from '~/helpers/ResponseHelper';
import ErrorHelper, {ErrorCodes} from '~/helpers/ErrorHelper';

// types
import type {FastifyInstance} from 'fastify';

export default (fastify: FastifyInstance) => {
  /**
   * Test endpoint to check provider availability and models.
   * @route GET /test-provider/:name
   * @returns {object}
   * @example
   * { "isAvailable": true, "models": [ { "id": "glm-4", "name": "GLM-4", "provider": "Zhipu", "description": "GLM‑4 large language model", "contextLength": 200000, "maxTokens": 8192 } ] }
   * @developerNote
   * This endpoint is used for testing purposes.
   */
  fastify.get<{ Params: { name: string } }>('/test-provider/:name', async function (this, request, _reply) {
    const provider = this.providerService.getProvider(request.params.name);

    if (!provider) {
      ErrorHelper.throwWithCode('The provider not found', ErrorCodes.NotFound);
    }

    return ResponseHelper.successWithData({
      isAvailable: await provider.isAvailable(),
      models: await provider.getModels(),
    });
  });
}
