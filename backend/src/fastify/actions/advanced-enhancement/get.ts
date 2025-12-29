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
import schema from './schemas/get.schema';

// types
import type {FastifyInstance} from 'fastify';
import type {SuccessResponse} from '~/types/response';
import type {AdvancedEnhancementType} from '~/types/advanced-enhancement';

export default (fastify: FastifyInstance) => {
  /**
   * Retrieves a specific enhancement type by ID
   * @example GET /advanced-enhancement-types/:id
   * @developer-note Used to get detailed information about a specific enhancement type
   */
  fastify.get<{
    Params: { id: string };
    Reply: SuccessResponse<AdvancedEnhancementType>;
  }>('/:id', {schema}, async function (request) {
    try {
      const enhancementType = await AdvancedEnhancementService.getEnhancementType(request.params.id);

      if (!enhancementType) {
        ErrorHelper.throwWithStatus('Enhancement type not found', 404);
      }

      return ResponseHelper.successWithData(enhancementType);
    } catch (error: any) {
      fastify.log.error('Failed to get enhancement type:', error);
      ErrorHelper.throwWithStatus('Failed to fetch enhancement type');
    }
  });
}
