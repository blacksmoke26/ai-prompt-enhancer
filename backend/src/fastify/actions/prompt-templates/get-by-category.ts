/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// db
import { Op, WhereOptions } from 'sequelize';

// classes
import PaginatedList from '~/classes/PaginatedList';

// helpers
import ErrorHelper from '~/helpers/ErrorHelper';
import ResponseHelper from '~/helpers/ResponseHelper';

// db
import PromptTemplate from '~/database/models/PromptTemplate';

// schemas
import schema from './schemas/get-by-category.schema';

// types
import type { FastifyInstance } from 'fastify';
import type { PaginatedSuccessResponse, } from '~/types/response';
import type { PromptTemplateListRequest } from '~/types/prompt-templates';

/**
 * Gets prompt templates by category ID with pagination
 * @param app - Fastify instance
 */
const getByCategory = async (app: FastifyInstance) => {
  /**
   * Retrieves a paginated list of prompt templates filtered by category ID.
   * @route GET /prompt-templates/category/:categoryId
   *
   * @example
   * // Get first page of templates for category 1
   * GET /prompt-templates/category/1
   *
   * @example
   * // Get second page with custom page size
   * GET /prompt-templates/category/1?page=2&pageSize=25
   *
   * @example
   * // Search within category templates
   * GET /prompt-templates/category/1?search=customer
   *
   * @example
   * // Get templates sorted by creation date
   *
   * @developerNotes
   * - Maximum page size is 50 records per request to prevent performance issues.
   * - Search queries are performed on title, description, and content fields.
   * - Tags and tools are searched as exact matches within their arrays.
   * - Only templates associated with the specified category are returned.
   */
  app.get<{
    Params: { categoryId: string };
    Querystring: PromptTemplateListRequest;
    Reply: PaginatedSuccessResponse<PromptTemplate>;
  }>('/category/:categoryId', { schema }, async function (request, reply) {
    try {
      const { categoryId } = request.params;
      const {search} = request.query;

      const where: WhereOptions<PromptTemplate> = {
        categoryId: Number(categoryId),
      };

      // Advanced search - search across title, description, and content
      if (search?.trim?.()) {
        // @ts-expect-error A false positive
        where[Op.or] = [
          { title: { [Op.like]: `%${search}%` } },
          { description: { [Op.like]: `%${search}%` } },
          { content: { [Op.like]: `%${search}%` } },
        ];
      }

      const pagedInstance = await PaginatedList.createWithRequest({
        model: PromptTemplate,
        request,
        sortByMap: {
          id: 'id',
          title: 'title',
          categoryId: 'categoryId',
        },
        defaultSortBy: 'title',
        defaultSortOrder: 'asc',
        findOptions: {
          where,
          attributes: [
            'id',
            'categoryId',
            'title',
            'description',
            'tags',
            'tools',
            'content',
            'variables',
          ],
        },
      });

      // Transform items before returning (remove database-specific fields)
      pagedInstance.itemsIterator((item) => {
        return {
          id: item.id,
          categoryId: item.categoryId,
          title: item.title,
          description: item.description,
          tags: Array.isArray(item.tags) ? item.tags : [],
          tools: Array.isArray(item.tools) ? item.tools : [],
          content: item.content,
          variables: Array.isArray(item.variables) ? item.variables : [],
        } as PromptTemplate;
      });

      return ResponseHelper.successWithPaginated(pagedInstance);
    } catch (error: any) {
      if (error.statusCode) {
        throw error;
      }
      ErrorHelper.throwWithStatus(
        `Failed to get templates by category: ${error.message}`,
        500,
      );
    }
  });
};

export default getByCategory;
