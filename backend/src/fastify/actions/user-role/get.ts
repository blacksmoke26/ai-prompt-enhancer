/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// db
import {PromptUserRole, PromptUserRoleAttributes } from '~/database/models';

// helpers
import ErrorHelper from '~/helpers/ErrorHelper';
import ResponseHelper from '~/helpers/ResponseHelper';

// schemas
import schema from './schemas/get.schema';

// types
import type {FastifyInstance} from 'fastify';
import type {SuccessResponse} from '~/types/response';

export default (fastify: FastifyInstance) => {
  /**
   * Retrieves all available user roles for prompts.
   * @example GET /config/user-roles
   * @developer-note Used to populate dropdown options in UI
   */
  fastify.get<{ Reply: SuccessResponse<PromptUserRoleAttributes[]>; }>('/', {schema}, async () => {
    try {
      const records = await PromptUserRole.findAll({
        order: [['id', 'ASC']],
        raw: true,
      });

      const list = records.map(record => ({
        ...record,
        tone: record?.tone ? JSON.parse(record?.tone as unknown as string) : [],
        capabilities: record?.capabilities ? JSON.parse(record?.capabilities as unknown as string) : [],
        tags: record?.tags ? JSON.parse(record?.tags as unknown as string) : [],
        hidden: Boolean(record.hidden),
      }));

      return ResponseHelper.successWithData(list);
    } catch (error: any) {
      fastify.log.error('Failed to get user roles:', error);
      ErrorHelper.throwWithStatus('Failed to fetch user roles');
    }
  });
}
