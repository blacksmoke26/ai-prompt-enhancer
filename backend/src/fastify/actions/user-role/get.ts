/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// db
import {UserRole} from '~/database/models';

// helpers
import ErrorHelper from '~/helpers/ErrorHelper';
import ResponseHelper from '~/helpers/ResponseHelper';

// schemas
import schema from './schemas/get.schema';

// types
import type {FastifyInstance} from 'fastify';
import type {SuccessResponse} from '~/types/response';
import type {UserRole as UserRol} from '~/constants/user-roles';

export default (fastify: FastifyInstance) => {
  /**
   * Retrieves all available user roles for prompts.
   * @example GET /config/user-roles
   * @developer-note Used to populate dropdown options in UI
   */
  fastify.get<{ Reply: SuccessResponse<UserRol[]>; }>('/', {schema}, async () => {
    try {
      const records = await UserRole.findAll({
        attributes: ['id', 'key', 'name', 'description', 'systemPrompt', 'category', 'hidden'],
        order: [['id', 'ASC']],
        raw: true,
      });

      const list = records.map(record => ({
        id: record.key,
        name: record.name,
        description: record.description,
        systemPrompt: record.systemPrompt,
        category: record.category,
        hidden: Boolean(record.hidden),
      }));

      return ResponseHelper.successWithData(list);
    } catch (error: any) {
      fastify.log.error('Failed to get user roles:', error);
      ErrorHelper.throwWithStatus('Failed to fetch user roles');
    }
  });
}
