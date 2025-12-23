/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// helpers
import ErrorHelper from '~/helpers/ErrorHelper';
import ResponseHelper from '~/helpers/ResponseHelper';

// schemas
import schema from './schemas/stats.schema';

// types
import type {FastifyInstance} from 'fastify';
import type {SuccessResponse} from '~/types/response';
import type {HistoryStatistics} from '~/types/history-service';

export default (fastify: FastifyInstance) => {
  /**
   * Gets statistics about the history data
   * @example
   * // GET /history/stats
   * // Returns: { totalCount: 42, averageRating: 4.2 }
   * @developer_notes
   * - Computed values are calculated on each request
   * - Returns empty object if no history exists
   */
  fastify.get<{ Reply: SuccessResponse<HistoryStatistics> }>('/stats', {schema}, async function (this) {
    try {
      const stats = await this.historyService.getStats();
      return ResponseHelper.successWithData(stats);
    } catch (error: any) {
      fastify.log.error('Failed to get history stats:', error);
      ErrorHelper.throwWithStatus('Failed to get history stats');
    }
  });
}
