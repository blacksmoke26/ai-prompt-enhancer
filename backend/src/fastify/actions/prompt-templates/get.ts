/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// helpers
import ErrorHelper from '~/helpers/ErrorHelper';
import ResponseHelper from '~/helpers/ResponseHelper';

// db
import PromptTemplate from '~/database/models/PromptTemplate';

// schemas
import schema from './schemas/get.schema';

// types
import type { FastifyInstance } from 'fastify';
import type { SuccessResponse } from '~/types/response';
import type { PromptTemplateResponse } from '~/types/prompt-templates';

/**
 * Retrieves a single prompt template by ID
 * @param app - Fastify instance
 */
const get = async (app: FastifyInstance) => {
  /**
   * Retrieves a single prompt template by its ID.
   * @route GET /prompt-templates/:id
   *
   * @example
   * // Get template by ID
   * GET /prompt-templates/1
   *
   * @developerNotes
   * - Returns 404 if template not found
   * - Returns complete template including content and variables
   * - Tags and tools are returned as arrays
   * - Variables are returned as an array of objects
   */
  app.get<{
    Params: { id: string };
    Reply: SuccessResponse<PromptTemplateResponse>;
  }>('/:id', { schema }, async function (request, reply) {
    try {
      const { id } = request.params;

      // Find the template
      const template = await PromptTemplate.findOne({
        where: { id: parseInt(id, 10) },
        raw: true,
      });

      if (!template) {
        ErrorHelper.throwWithStatus(
          `Prompt template with ID ${id} not found`,
          404,
        );
      }

      // Transform to response format
      const response: PromptTemplateResponse = {
        id: template.id,
        categoryId: template.categoryId,
        title: template.title,
        description: template.description,
        tags: Array.isArray(template.tags) ? template.tags : [],
        tools: Array.isArray(template.tools) ? template.tools : [],
        content: template.content,
        variables: Array.isArray(template.variables) ? template.variables : [],
      };

      return ResponseHelper.successWithData(response);
    } catch (error: any) {
      if (error.statusCode) {
        throw error;
      }
      ErrorHelper.throwWithStatus(
        `Failed to get prompt template: ${error.message}`,
        500,
      );
    }
  });
};

export default get;
