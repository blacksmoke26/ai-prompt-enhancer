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
import schema from './schemas/validate-chaining.schema';

// types
import type { FastifyInstance } from 'fastify';
import type { SuccessResponse } from '~/types/response';

export default (fastify: FastifyInstance) => {
  /**
   * Validates if two enhancement types can be chained together
   * @example POST /advanced-enhancement-types/validate-chaining
   * @developer-note Used to check compatibility of enhancement type combinations
   */
  fastify.post<{
    Body: { firstType: string; secondType: string };
    Reply: SuccessResponse<{ isValid: boolean; errors?: string[] }>;
  }>('/validate-chaining', { schema }, async function (request) {
    const result = await AdvancedEnhancementService.validateChaining(
      request.body.firstType,
      request.body.secondType,
    );


    if (!result.isValid) {
      console.error('Failed to validate enhancement chaining:', result?.errors?.join?.(', '));
      ErrorHelper.throwWithStatus(
        result?.errors?.[0] || 'Failed to validate enhancement chaining:',
        400,
      );
    }

    return ResponseHelper.successWithData(result);
  });
};
