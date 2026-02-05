/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// db
import { PromptTemplateCategory } from '~/database/models';

// schemas
import schema from './schemas/delete.schema';

// helpers
import ErrorHelper from '~/helpers/ErrorHelper';
import ResponseHelper from '~/helpers/ResponseHelper';

// types
import type { FastifyInstance } from 'fastify';
import type { SuccessResponse } from '~/types/response';

export default (fastify: FastifyInstance) => {
  /**
   * Deletes a prompt template category
   * @example
   * // DELETE /api/prompt-categories/:id
   * @developer_notes Deletes the category with the specified ID
   */
  fastify.delete<{ Params: { id: string }; Reply: SuccessResponse<{ success: boolean }> }>('/:id', { schema }, async function (this, request) {
    try {
      const id = parseInt(request.params.id, 10);
      const category = await PromptTemplateCategory.findByPk(id);

      if (!category) {
        ErrorHelper.throwWithStatus('Prompt category not found');
      }

      await category.destroy();
      return ResponseHelper.successWithData({ success: true });
    } catch (error: any) {
      fastify.log.error('Failed to delete prompt category:', error);
      ErrorHelper.throwWithStatus('Failed to delete prompt category');
    }
  });
};
