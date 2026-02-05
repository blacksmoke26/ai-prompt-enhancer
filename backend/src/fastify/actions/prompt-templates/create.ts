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
import PromptTemplateCategory from '~/database/models/PromptTemplateCategory';

// schemas
import schema from './schemas/create.schema';

// types
import type { FastifyInstance } from 'fastify';
import type { SuccessResponse } from '~/types/response';
import type { PromptTemplateCreateRequest, PromptTemplateResponse } from '~/types/prompt-templates';

/**
 * Creates a new prompt template
 * @param app - Fastify instance
 */
const create = async (app: FastifyInstance) => {
  /**
   * Creates a new prompt template with optional tags, tools, and variables.
   * @route POST /prompt-templates
   *
   * @example
   * // Create a simple template
   * POST /prompt-templates
   * Body: {
   *   "categoryId": 1,
   *   "title": "Customer Support Response",
   *   "description": "Template for responding to customer inquiries",
   *   "content": "You are a helpful assistant that provides {response_length} responses.",
   *   "tags": ["support", "general"],
   *   "tools": ["openai", "anthropic"]
   * }
   *
   * @example
   * // Create a template with variables
   * POST /prompt-templates
   * Body: {
   *   "categoryId": 1,
   *   "title": "Code Generation",
   *   "description": "Generate code based on requirements",
   *   "content": "Generate {language} code that implements {feature}. The code should be {detail_level} and include {number_of_examples} examples.",
   *   "variables": [
   *     {
   *       "name": "language",
   *       "description": "Programming language",
   *       "type": "string",
   *       "required": true,
   *       "placeholder": "e.g., JavaScript"
   *     },
   *     {
   *       "name": "feature",
   *       "description": "Feature to implement",
   *       "type": "string",
   *       "required": true
   *     },
   *     {
   *       "name": "detail_level",
   *       "description": "Level of detail",
   *       "type": "select",
   *       "required": false,
   *       "options": ["simple", "detailed", "very detailed"],
   *       "defaultValue": "detailed"
   *     }
   *   ]
   * }
   *
   * @developerNotes
   * - categoryId must exist in prompt_template_categories table
   * - tags and tools are optional arrays, defaults to empty arrays
   * - variables are optional, defaults to empty array
   * - Variables are stored as JSON and can be referenced in content using curly braces: {variable_name}
   * - createdAt and updatedAt are automatically set by Sequelize
   */
  app.post<{
    Body: PromptTemplateCreateRequest;
    Reply: SuccessResponse<PromptTemplateResponse>;
  }>('/', { schema }, async function (request, reply) {
    try {
      const { categoryId, title, description, tags, tools, content, variables } = request.body;

      // Validate categoryId exists
      const category = await PromptTemplateCategory.findOne({
        where: { id: categoryId },
        attributes: ['id'],
        raw: true,
      });

      if (!category) {
        ErrorHelper.throwWithStatus(
          `Category with ID ${categoryId} not found`,
          404,
        );
      }

      // Create the prompt template
      const created = await PromptTemplate.create({
        categoryId,
        title,
        description,
        tags: tags || [],
        tools: tools || [],
        content,
        variables: variables || [],
      });

      // Transform to response format
      const response: PromptTemplateResponse = {
        id: created.id,
        categoryId: created.categoryId,
        title: created.title,
        description: created.description,
        tags: Array.isArray(created.tags) ? created.tags : [],
        tools: Array.isArray(created.tools) ? created.tools : [],
        content: created.content,
        variables: Array.isArray(created.variables) ? created.variables : [],
      };

      return ResponseHelper.successWithData(response);
    } catch (error: any) {
      if (error.statusCode) {
        throw error;
      }
      ErrorHelper.throwWithStatus(
        `Failed to create prompt template: ${error.message}`,
        500,
      );
    }
  });
};

export default create;
