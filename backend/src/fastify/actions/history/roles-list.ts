/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import { fn, col } from 'sequelize';
import { History, PromptUserRole } from '~/database/models';

// helpers
import ErrorHelper from '~/helpers/ErrorHelper';
import ResponseHelper from '~/helpers/ResponseHelper';

// schema
import schema from './schemas/roles-list.schema';

// types
import type { FastifyInstance } from 'fastify';
import type { SuccessResponse } from '~/types/response';

interface UserRoleItem {
  /** Total count associated with the role */
  total: number;
  /** Name of the role */
  name: string;
  /** Unique key identifier for the role */
  key: string;
  /** Unique ID for the role item */
  id: string;
}

export default (fastify: FastifyInstance) => {
  /**
   * Get the minimal history stats
   * @example
   * // GET /history/quick-stats
   * // Returns: { success: true, data: {stats: {...}, charts: {...}} }
   */
  fastify.get<{
    Reply: SuccessResponse<UserRoleItem[]>;
  }>('/roles-list', { schema }, async function (this, request) {
    try {
      const records: Record<string, any>[] = await History.findAll({
        attributes: [[fn('COUNT', 'history.id'), 'total']],
        include: [
          {
            as: 'promptUserRole',
            model: PromptUserRole,
            attributes: ['id', 'key', 'name'],
          },
        ],
        group: [col('history.user_role')],
        order: [['createdAt', 'DESC']],
        raw: true,
        nest: true,
      });

      const list: UserRoleItem[] = [];

      for (const record of records) {
        list.push({
          total: record.total,
          name: record.promptUserRole.name,
          key: record.promptUserRole.key,
          id: record.promptUserRole.id,
        })
      }

      return ResponseHelper.successWithData(list);
    } catch (error: any) {
      console.error('Failed to fetch quick history stats:', error);
      ErrorHelper.throwWithStatus('Failed to fetch roles list');
    }
  });
};
