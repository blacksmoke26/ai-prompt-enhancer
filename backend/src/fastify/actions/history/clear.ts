/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// helpers
import ErrorHelper from '~/helpers/ErrorHelper';
import ResponseHelper from '~/helpers/ResponseHelper';

// schemas
import schema from './schemas/clear.schema';

// types
import type {FastifyInstance} from 'fastify';
import type {SuccessOnlyResponse} from '~/types/response';

export default (fastify: FastifyInstance) => {
  /**
   * Clears all history items
   * @example
   * // DELETE /history
   * // Returns: { success: true }
   * @developer_notes
   * - Operation is permanent and irreversible
   * - Consider adding confirmation for production use
   */
  fastify.patch<{ Reply: SuccessOnlyResponse }>('/', {schema}, async function (this) {
    try {
      await this.historyService.clearHistory();
      return ResponseHelper.successOnly();
    } catch (error: any) {
      fastify.log.error('Failed to clear history:', error);
      ErrorHelper.throwWithStatus('Failed to clear history');
    }
  });
}
