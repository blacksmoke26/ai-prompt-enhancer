/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// db
import { PromptTemplateCategory } from '~/database/models';

// schemas
import schema from './schemas/get.schema';

// helpers
import ErrorHelper from '~/helpers/ErrorHelper';
import ResponseHelper from '~/helpers/ResponseHelper';

// types
import type { FastifyInstance } from 'fastify';
import type { SuccessResponse } from '~/types/response';
import type { PromptTemplateCategory as PromptCategoryType } from '~/database/models';

export default (fastify: FastifyInstance) => {
  /**
   * Retrieves a specific prompt template category by ID
   * @example
   * // GET /api/prompt-categories/:id
   * @developer_notes Returns the category with the specified ID
   */
  fastify.get<{ Params: { id: string }; Reply: SuccessResponse<PromptCategoryType> }>('/:id', { schema }, async function (this, request) {
    try {
      const id = parseInt(request.params.id, 10);
      const category = await PromptTemplateCategory.findByPk(id, {
        attributes: ['id', 'key', 'label', 'description'],
      });

      if (!category) {
        ErrorHelper.throwWithStatus('Prompt category not found');
      }

      return ResponseHelper.successWithData(category);
    } catch (error: any) {
      fastify.log.error('Failed to get prompt category:', error);
      ErrorHelper.throwWithStatus('Failed to get prompt category');
    }
  });
};