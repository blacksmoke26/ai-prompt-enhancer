/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// helpers
import ErrorHelper from '~/helpers/ErrorHelper';
import ResponseHelper from '~/helpers/ResponseHelper';

// schema
import schema from './schemas/minimal-stats.schema';

// types
import type { FastifyInstance } from 'fastify';
import type { SuccessResponse } from '~/types/response';
import type { CalculateChartData, CalculateStats } from '~/types/history-service';

export default (fastify: FastifyInstance) => {
  /**
   * Get the minimal history stats
   * @example
   * // GET /history/quick-stats
   * // Returns: { success: true, data: {stats: {...}, charts: {...}} }
   */
  fastify.get<{
    Reply: SuccessResponse<{
      stats: CalculateStats;
      charts: CalculateChartData;
    }>;
  }>('/minimal-stats', { schema }, async function (this, request) {
    try {
      const [stats, charts] = await Promise.all([
        this.historyService.calculateStats(),
        this.historyService.calculateChartData(),
      ]);

      return ResponseHelper.successWithData({
        stats,
        charts,
      });
    } catch (error: any) {
      fastify.log.error('Failed to fetch quick history stats:', error);
      ErrorHelper.throwWithStatus('Failed to fetch quick history stats');
    }
  });
};
