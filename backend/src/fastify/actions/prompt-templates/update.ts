/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// helpers
import ErrorHelper from '~/helpers/ErrorHelper';
import ResponseHelper from '~/helpers/ResponseHelper';

// db
import {PromptTemplate, PromptTemplateCategory} from '~/database/models';

// schemas
import schema from './schemas/update.schema';

// types
import type { FastifyInstance } from 'fastify';
import type { SuccessResponse } from '~/types/response';
import type { PromptTemplateUpdateRequest, PromptTemplateResponse } from '~/types/prompt-templates';

/**
 * Updates an existing prompt template
 * @param app - Fastify instance
 */
const update = async (app: FastifyInstance) => {
  /**
   * Updates an existing prompt template by ID. All fields are optional.
   * @route PUT /prompt-templates/:id
   *
   * @example
   * // Update title and description
   * PUT /prompt-templates/1
   * Body: {
   *   "title": "Updated Customer Support Response",
   *   "description": "Updated description for customer inquiries"
   * }
   *
   * @example
   * // Add tags and tools
   * PUT /prompt-templates/1
   * Body: {
   *   "tags": ["support", "general", "urgent"],
   *   "tools": ["openai", "anthropic", "cohere"]
   * }
   *
   * @example
   * // Update content with new variables
   * PUT /prompt-templates/1
   * Body: {
   *   "content": "You are a helpful assistant that provides {response_length} responses in {tone} style.",
   *   "variables": [
   *     {
   *       "name": "response_length",
   *       "description": "Length of response",
   *       "type": "string",
   *       "required": true
   *     },
   *     {
   *       "name": "tone",
   *       "description": "Tone of response",
   *       "type": "select",
   *       "required": true,
   *       "options": ["friendly", "professional", "formal"]
   *     }
   *   ]
   * }
   *
   * @developerNotes
   * - Only fields that need updating need to be included in the request body
   * - If categoryId is provided, it must exist in prompt_template_categories table
   * - tags and tools are replaced with the new values (not merged)
   * - variables are replaced with the new values (not merged)
   * - If a field is omitted, its value remains unchanged
   * - updatedAt is automatically updated by Sequelize
   * - Non-existent template returns 404
   */
  app.put<{
    Params: { id: string };
    Body: PromptTemplateUpdateRequest;
    Reply: SuccessResponse<PromptTemplateResponse>;
  }>('/:id', { schema }, async function (request) {
    try {
      const { id } = request.params;
      const updateData = request.body;

      // Find existing template
      const existingTemplate = await PromptTemplate.findOne({
        where: { id: parseInt(id, 10) },
      });

      if (!existingTemplate) {
        ErrorHelper.throwWithStatus(
          `Prompt template with ID ${id} not found`,
          404,
        );
      }

      // Validate categoryId if provided
      if (updateData.categoryId) {
        const category = await PromptTemplateCategory.findOne({
          where: { id: updateData.categoryId },
          attributes: ['id'],
          raw: true,
        });

        if (!category) {
          ErrorHelper.throwWithStatus(
            `Category with ID ${updateData.categoryId} not found`,
            404,
          );
        }
      }

      // Build update object with only provided fields
      const updatePayload: any = {};

      if (updateData.categoryId !== undefined) {
        updatePayload.categoryId = updateData.categoryId;
      }
      if (updateData.title !== undefined) {
        updatePayload.title = updateData.title;
      }
      if (updateData.description !== undefined) {
        updatePayload.description = updateData.description;
      }
      if (updateData.tags !== undefined) {
        updatePayload.tags = Array.isArray(updateData.tags) ? updateData.tags : [];
      }
      if (updateData.tools !== undefined) {
        updatePayload.tools = Array.isArray(updateData.tools) ? updateData.tools : [];
      }
      if (updateData.content !== undefined) {
        updatePayload.content = updateData.content;
      }
      if (updateData.variables !== undefined) {
        updatePayload.variables = Array.isArray(updateData.variables) ? updateData.variables : [];
      }

      // Update the template
      await existingTemplate.update(updatePayload);

      // Fetch updated template for response
      const updated = await PromptTemplate.findOne({
        where: { id: parseInt(id, 10) },
        raw: true,
      }) as Awaited<PromptTemplate>;

      // Transform to response format
      const response: PromptTemplateResponse = {
        id: updated.id,
        categoryId: updated.categoryId,
        title: updated.title,
        description: updated.description,
        tags: Array.isArray(updated.tags) ? updated.tags : [],
        tools: Array.isArray(updated.tools) ? updated.tools : [],
        content: updated.content,
        variables: Array.isArray(updated.variables) ? updated.variables : [],
      };

      return ResponseHelper.successWithData(response);
    } catch (error: any) {
      if (error.statusCode) {
        throw error;
      }
      ErrorHelper.throwWithStatus(
        `Failed to update prompt template: ${error.message}`,
        500,
      );
    }
  });
};

export default update;
