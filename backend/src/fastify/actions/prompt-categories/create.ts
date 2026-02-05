/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// db
import { PromptTemplateCategory } from '~/database/models';

// schemas
import schema from './schemas/create.schema';

// helpers
import ErrorHelper from '~/helpers/ErrorHelper';
import ResponseHelper from '~/helpers/ResponseHelper';

// types
import type { FastifyInstance } from 'fastify';
import type { SuccessResponse } from '~/types/response';

export default (fastify: FastifyInstance) => {
  /**
   * Creates a new prompt template category
   * @example
   * // POST /api/prompt-categories
   * // Body: { "key": "creative", "label": "Creative Prompts", "description": "Creative and imaginative prompt templates" }
   * @developer_notes The key must be unique
   */
  fastify.post<{
    Body: {
      key: string;
      label: string;
      description?: string;
    };
    Reply: SuccessResponse<PromptTemplateCategory>;
  }>('/', { schema }, async function (this, request) {
    try {
      const category = await PromptTemplateCategory.create({
        key: request.body.key,
        label: request.body.label,
        description: request.body.description,
      });
      return ResponseHelper.successWithData(category);
    } catch (error: any) {
      fastify.log.error('Failed to create prompt category:', error);
      ErrorHelper.throwWithStatus('Failed to create prompt category');
    }
  });
};