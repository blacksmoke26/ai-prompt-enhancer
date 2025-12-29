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
import schema from './schemas/get-all.schema';

// types
import type {FastifyInstance} from 'fastify';
import type {SuccessResponse} from '~/types/response';
import type {AdvancedEnhancementType} from '~/types/advanced-enhancement';

export default (fastify: FastifyInstance) => {
  /**
   * Retrieves all available enhancement types with advanced features
   * @example GET /advanced-enhancement-types
   * @developer-note Used to populate dropdown options in UI
   */
  fastify.get<{
    Reply: SuccessResponse<AdvancedEnhancementType[]>;
  }>('/', {schema}, async function () {
    try {
      const enhancementTypes = await AdvancedEnhancementService.getAllEnhancementTypes();
      return ResponseHelper.successWithData(enhancementTypes);
    } catch (error: any) {
      fastify.log.error('Failed to get enhancement types:', error);
      ErrorHelper.throwWithStatus('Failed to fetch enhancement types');
    }
  });
}
