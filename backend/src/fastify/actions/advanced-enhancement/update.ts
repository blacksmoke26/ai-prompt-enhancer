/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// service
import AdvancedEnhancementService from '~/services/AdvancedEnhancementService';

// helpers
import ErrorHelper from '~/helpers/ErrorHelper';
import ResponseHelper from '~/helpers/ResponseHelper';

// schemas
import schema from './schemas/update.schema';

// types
import type {FastifyInstance} from 'fastify';
import type {SuccessResponse} from '~/types/response';
import type {AdvancedEnhancementType} from '~/types/advanced-enhancement';

export default (fastify: FastifyInstance) => {
  /**
   * Updates an existing enhancement type with advanced features
   * @example PUT /advanced-enhancement-types/:id
   * @developer-note Used to modify existing enhancement type configurations
   */
  fastify.put<{
    Params: { id: string };
    Body: Partial<AdvancedEnhancementType>;
    Reply: SuccessResponse<AdvancedEnhancementType>;
  }>('/:id', {schema}, async function (request) {
    try {
      const enhancementType = await AdvancedEnhancementService.updateEnhancementType(
        request.params.id,
        request.body
      );

      return ResponseHelper.successWithData(enhancementType);
    } catch (error: any) {
      fastify.log.error('Failed to update enhancement type:', error);

      if (error.message.includes('not found')) {
        ErrorHelper.throwWithStatus('Enhancement type not found', 404);
      }

      ErrorHelper.throwWithStatus('Failed to update enhancement type');
    }
  });
}
