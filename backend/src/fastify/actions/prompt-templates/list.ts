/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// classes
import PaginatedList from '~/classes/PaginatedList';

// helpers
import ErrorHelper from '~/helpers/ErrorHelper';
import ResponseHelper from '~/helpers/ResponseHelper';

// db
import { literal, Op, where as seqWhere, WhereOptions } from 'sequelize';

import { getInstance } from '~/database';
import { PromptTemplate } from '~/database/models';

// schemas
import schema from './schemas/list.schema';

// types
import type { FastifyInstance } from 'fastify';
import type { PaginatedSuccessResponse, } from '~/types/response';
import type { PromptTemplateListRequest } from '~/types/prompt-templates';

/**
 * Lists prompt templates with advanced search and pagination
 * @param app - Fastify instance
 */
const list = async (app: FastifyInstance) => {
  /**
   * Retrieves a paginated list of prompt templates with advanced filtering options.
   * Supports searching by title, description, content, tags, and tools.
   * Filters by category ID and tag can also be applied.
   * @route GET /prompt-templates
   *
   * @example
   * // Get first page with default settings
   * GET /prompt-templates
   *
   * @example
   * // Search for templates with "customer" in title
   * GET /prompt-templates?search=customer
   *
   * @example
   * // Get templates by category
   * GET /prompt-templates?categoryId=1
   *
   * @example
   * // Get templates by tag with pagination
   * GET /prompt-templates?tag=support&page=2&pageSize=20
   *
   * @developerNotes
   * - Maximum page size is 50 records per request to prevent performance issues.
   * - Sort options include: id, title, categoryId, createdAt, updatedAt
   * - Search queries are performed on title, description, and content fields.
   * - Tags and tools are searched as exact matches within their arrays.
   */
  app.get<{
    Querystring: PromptTemplateListRequest;
    Reply: PaginatedSuccessResponse<PromptTemplate>;
  }>('/', { schema }, async function (request, reply) {
    // Extract query parameters
    const {
      search = null,
      categoryId = null,
      tag = null,
    } = request.query;

    const where: WhereOptions<PromptTemplate> = {};

    // Advanced search - search across title, description, and content
    if (search?.trim?.()) {
      // @ts-expect-error A false positive
      where[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
        { content: { [Op.like]: `%${search}%` } },
      ];
    }

    // Filter by category ID
    if (categoryId) {
      where.categoryId = categoryId;
    }

    // Filter by tag - check if tag exists in tags array
    if (tag?.trim?.()) {
      // @ts-expect-error A false positive
      where[Op.eq] = seqWhere(
        literal(`(
    SELECT 1
    FROM json_each(\`PromptTemplate\`.\`tags\`)
    WHERE json_each.value = ${getInstance().escape(tag)}
  )`),
        Op.gt,
        0,
      );
    }

    try {
      const pagedInstance = await PaginatedList.createWithRequest({
        model: PromptTemplate,
        request,
        sortByMap: {
          id: 'id',
          title: 'title',
          categoryId: 'categoryId',
        },
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
        defaultSortBy: 'title',
        defaultSortOrder: 'asc',
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
        `Failed to list prompt templates: ${error.message}`,
        500,
      );
    }
  });
};

export default list;
