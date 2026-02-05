/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// db
import { PromptTemplateCategory } from '~/database/models';

// schemas
import schema from './schemas/list.schema';

// helpers
import ErrorHelper from '~/helpers/ErrorHelper';
import ResponseHelper from '~/helpers/ResponseHelper';

// types
import type { FastifyInstance } from 'fastify';
import type { SuccessResponse } from '~/types/response';
import type { PromptTemplateCategory as PromptCategoryType } from '~/database/models';

export default (fastify: FastifyInstance) => {
  /**
   * Retrieves all prompt template categories
   * @example
   * // GET /api/prompt-categories/list
   * @developer_notes Returns a list of all prompt categories sorted by key
   */
  fastify.get<{ Reply: SuccessResponse<PromptCategoryType[]> }>('/', { schema }, async function (this, request) {
    try {
      const categories = await PromptTemplateCategory.findAll({
        order: [['label', 'ASC']],
        raw: true,
      });

      return ResponseHelper.successWithData(categories);
    } catch (error: any) {
      console.error('Failed to get prompt categories:', error);
      ErrorHelper.throwWithStatus('Failed to get prompt categories');
    }
  });
};
