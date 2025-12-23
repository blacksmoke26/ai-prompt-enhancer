/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// utils
import {historyUpdateSchema} from '~/utils/validation';

// schemas
import schema from './schemas/update.schema';

// types
import type {FastifyInstance} from 'fastify';
import ErrorHelper from '~/helpers/ErrorHelper';
import ResponseHelper from '~/helpers/ResponseHelper';

export default (fastify: FastifyInstance) => {
  /**
   * Updates a history item
   * @example
   * // PUT /history/123
   * // Body: { rating: 5, notes: "Excellent response" }
   * // Returns: { success: true }
   * @developer_notes
   * - Only updates provided fields
   * - Rating must be between 1-5
   * - Returns 404 if item doesn't exist
   */
  fastify.put<{
    Params: { id: string };
    Body: { rating?: number; notes?: string };
  }>('/:id', {schema}, async function (this, request, reply) {
    try {
      const {error, value} = historyUpdateSchema.validate(request.body);
      if (error) {
        ErrorHelper.throwWithStatus('Validation failed', 422, 'VALIDATION_FAILED');
      }

      const success = await this.historyService.updateHistoryItem(request.params.id, value);

      if (!success) {
        ErrorHelper.throwWithStatus('History item not found', 404, 'NOT_FOUND');
      }

      return ResponseHelper.successOnly();
    } catch (error: any) {
      fastify.log.error('Failed to update history item:', error);
      ErrorHelper.throwWithStatus('Failed to update history item', 400);
    }
  });
}
