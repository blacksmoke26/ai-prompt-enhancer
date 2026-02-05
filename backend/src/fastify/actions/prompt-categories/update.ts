/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// db
import { PromptTemplateCategory } from '~/database/models';

// schemas
import schema from './schemas/update.schema';

// helpers
import ErrorHelper from '~/helpers/ErrorHelper';
import ResponseHelper from '~/helpers/ResponseHelper';

// types
import type { FastifyInstance } from 'fastify';
import type { SuccessResponse } from '~/types/response';

export default (fastify: FastifyInstance) => {
  /**
   * Updates an existing prompt template category
   * @example
   * // PUT /api/prompt-categories/:id
   * // Body: { "key": "creative", "label": "Creative Prompts Updated", "description": "Updated description" }
   * @developer_notes Updates the category with the specified ID
   */
  fastify.put<{
    Params: { id: string };
    Body: {
      key: string;
      label: string;
      description?: string;
    };
    Reply: SuccessResponse<PromptTemplateCategory>;
  }>('/:id', { schema }, async function (this, request) {
    try {
      const id = parseInt(request.params.id, 10);
      const category = await PromptTemplateCategory.findByPk(id);

      if (!category) {
        ErrorHelper.throwWithStatus('Prompt category not found');
      }

      await category.update({
        key: request.body.key,
        label: request.body.label,
        description: request.body.description,
      });

      return ResponseHelper.successWithData(category);
    } catch (error: any) {
      fastify.log.error('Failed to update prompt category:', error);
      ErrorHelper.throwWithStatus('Failed to update prompt category');
    }
  });
};