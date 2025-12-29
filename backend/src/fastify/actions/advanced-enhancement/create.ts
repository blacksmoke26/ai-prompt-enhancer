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
import schema from './schemas/create.schema';

// types
import type {FastifyInstance} from 'fastify';
import type {SuccessResponse} from '~/types/response';
import type {AdvancedEnhancementType} from '~/types/advanced-enhancement';

export default (fastify: FastifyInstance) => {
  /**
   * Creates a new enhancement type with advanced features
   * @example POST /advanced-enhancement-types
   * @developer-note Used to add new enhancement type configurations
   */
  fastify.post<{
    Body: Omit<AdvancedEnhancementType, 'id'>;
    Reply: SuccessResponse<AdvancedEnhancementType>;
  }>('/', {schema}, async function (request) {
    try {
      const enhancementType = await AdvancedEnhancementService.createEnhancementType(
        request.body
      );

      return ResponseHelper.successWithData(enhancementType);
    } catch (error: any) {
      fastify.log.error('Failed to create enhancement type:', error);
      ErrorHelper.throwWithStatus(error?.message || 'Failed to create enhancement type');
    }
  });
}
