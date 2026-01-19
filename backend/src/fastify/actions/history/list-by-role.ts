/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// db
import { History, HistoryAttributes, PromptUserRole } from '~/database/models';

// helpers
import ErrorHelper from '~/helpers/ErrorHelper';
import ResponseHelper from '~/helpers/ResponseHelper';

// schemas
import schema from './schemas/list-by-role.schema';

// types
import type { FastifyInstance } from 'fastify';
import type { SuccessResponse } from '~/types/response';

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
    Params: {
      role: string;
    };
    Reply: SuccessResponse<HistoryAttributes[]>;
  }>('/role/:role', { schema }, async function (this, request, reply) {
    const role = await PromptUserRole.findOne({
      attributes: ['id'],
      where: { key: request.params.role },
      raw: true,
    });

    if (!role) {
      ErrorHelper.throwWithStatus('Role not found', 404);
    }

    try {
      const records = await History.findAll({
        attributes: {
          exclude: [
            'conversationId',
            'userRole',
            'metadata',
            'timestamp',
            'customInstructions',
            'enhancementParameters',
          ],
        },
        where: {
          userRole: role.id,
        },
        order: [['createdAt', 'DESC']],
        raw: true,
      });

      return ResponseHelper.successWithData(records);
    } catch (error: any) {
      console.error('Failed to fetch history:', error);
      ErrorHelper.throwWithStatus('Failed to fetch history');
    }
  });
};
