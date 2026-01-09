/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// db
import { History } from '~/database/models';

// helpers
import ErrorHelper from '~/helpers/ErrorHelper';
import ResponseHelper from '~/helpers/ResponseHelper';

// schemas
import schema from './schemas/get.schema';

// types
import type { FastifyInstance } from 'fastify';
import type { SuccessResponse } from '~/types/response';
import type { PromptHistory } from '~/services/HistoryService';

export interface HistoryItem extends PromptHistory {
  stats: {
    textData: { name: string; value: number }[];
    tokenStats: { name: string; value: number; fill: string }[];
  };
}

export default (fastify: FastifyInstance) => {
  /**
   * Retrieves history items with optional search or limit
   * @example
   * // GET /history?limit=10&search=example
   * // Returns: [{ id: "123", prompt: "...", response: "..." }]
   * @developer_notes
   * - Defaults to all history if no query params provided
   * - Search performs case-insensitive text matching
   */
  fastify.get<{
    Querystring: {
      limit?: string;
      search?: string;
      model?: string;
      enhancementType?: string;
      userRole?: string;
      provider?: string;
      dateFrom?: string;
      dateTo?: string;
      minRating?: string;
      maxRating?: string;
    };
    Reply: SuccessResponse<HistoryItem[]>;
  }>('/', { schema }, async function (this, request, reply) {
    try {
      const {
        limit,
        search,
        model,
        enhancementType,
        userRole,
        provider,
        dateFrom,
        dateTo,
        minRating,
        maxRating,
      } = request.query;

      // Build filters object
      const filters: any = {};

      if (model) filters.model = model;
      if (enhancementType) filters.enhancementType = enhancementType;
      if (userRole) filters.userRole = userRole;
      if (provider) filters.provider = provider;
      if (dateFrom) filters.dateFrom = dateFrom;
      if (dateTo) filters.dateTo = dateTo;
      if (minRating) filters.minRating = parseInt(minRating);
      if (maxRating) filters.maxRating = parseInt(maxRating);

      let history;

      if (search) {
        history = await this.historyService.searchHistory(search, filters);
      } else {
        history = await this.historyService.getHistory(
          limit ? parseInt(limit) : undefined,
          filters,
        );
      }

      const globalStats: Record<string, any> = (await History.findOne({
        attributes: [
          [
            History.sequelize!.fn('COUNT', History.sequelize!.col('id')),
            'totalPrompts',
          ],
          [
            History.sequelize!.fn('SUM', History.sequelize!.col('tokens_used')),
            'totalTokens',
          ],
        ],
        raw: true,
      })) || { totalPrompts: 0, totalTokens: 0 };

      history = history.map((item) => {
        return {
          ...item,
          stats: calculateItemStats(item, globalStats),
        } as HistoryItem;
      });

      return ResponseHelper.successWithData(history);
    } catch (error: any) {
      fastify.log.error('Failed to get history:', error);
      ErrorHelper.throwWithStatus('Failed to get history');
    }
  });

  const calculateItemStats = (
    item: PromptHistory,
    stats: Record<string, any>,
  ) => {
    try {
      const words = (item.originalPrompt ?? '').trim().split(/\s+/).length;
      const chars = (item.originalPrompt ?? '').length;

      const textData = [
        { name: 'Words', value: words },
        { name: 'Characters', value: chars },
        {
          name: 'Whitespace',
          value:
            (item.originalPrompt ?? '').length -
            (item.originalPrompt ?? '').trim().length,
        },
      ];

      const globalAvg =
        stats.totalPrompts > 0
          ? Math.round(stats.totalTokens / stats.totalPrompts)
          : 0;

      const tokenStats = [
        {
          name: 'This Item',
          value: item.tokensUsed ?? 0,
          fill: '#8b5cf6',
        },
        {
          name: 'Global Avg',
          value: globalAvg,
          fill: '#cbd5e1',
        },
      ];

      return { textData, tokenStats };
    } catch (e) {
      console.error('Error computing analytics', e);
      return null;
    }
  };
};
