/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// helpers
import ErrorHelper from '~/helpers/ErrorHelper';
import ResponseHelper from '~/helpers/ResponseHelper';

// schemas
import schema from './schemas/delete.schema';

// types
import type {FastifyInstance} from 'fastify';
import type {SuccessOnlyResponse} from '~/types/response';

export default (fastify: FastifyInstance) => {
  /**
   * Delete the history item
   * @example
   * // DELETE /history
   * // Returns: { success: true }
   * @developer_notes
   * - Operation is permanent and irreversible
   * - Consider adding confirmation for production use
   */
  fastify.delete<{
    Params: { id: string };
    Reply: SuccessOnlyResponse;
  }>('/:id', {schema}, async function (this, request) {
    try {
      const success = await this.historyService.deleteHistoryItem(request.params.id);

      if (!success) {
        ErrorHelper.throwWithStatus('History item not found');
      }

      return ResponseHelper.successOnly();
    } catch (error: any) {
      fastify.log.error('Failed to delete history item:', error);
      ErrorHelper.throwWithStatus('Failed to delete history item');
    }
  });
}
