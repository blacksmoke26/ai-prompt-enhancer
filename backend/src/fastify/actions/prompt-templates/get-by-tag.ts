/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import { literal, Op, where as seqWhere, WhereOptions } from 'sequelize';

// classes
import PaginatedList from '~/classes/PaginatedList';

// helpers
import ErrorHelper from '~/helpers/ErrorHelper';
import ResponseHelper from '~/helpers/ResponseHelper';

// db
import { getInstance } from '~/database';
import { PromptTemplate } from '~/database/models';

// schemas
import schema from './schemas/get-by-tag.schema';

// types
import type { FastifyInstance } from 'fastify';
import type { PaginatedSuccessResponse } from '~/types/response';
import type { PromptTemplateListRequest } from '~/types/prompt-templates';

/**
 * Gets prompt templates by tag with pagination
 * @param app - Fastify instance
 */
const getByTag = async (app: FastifyInstance) => {
  /**
   * Retrieves a paginated list of prompt templates filtered by a specific tag.
   * @route GET /prompt-templates/tag/:tag
   *
   * @example
   * // Get first page of templates with "support" tag
   * GET /prompt-templates/tag/support
   *
   * @example
   * // Get second page with custom page size
   * GET /prompt-templates/tag/support?page=2&pageSize=25
   *
   * @example
   * // Search within templates with tag
   * GET /prompt-templates/tag/support?search=customer
   *
   * @example
   * // Get templates sorted by title
   * GET /prompt-templates/tag/support?sortBy=title&order=asc
   *
   * @developerNotes
   * - Maximum page size is 50 records per request to prevent performance issues.
   * - Search queries are performed on title, description, and content fields.
   * - Only templates containing the specified tag are returned.
   */
  app.get<{
    Params: { tag: string };
    Querystring: PromptTemplateListRequest;
    Reply: PaginatedSuccessResponse<PromptTemplate>;
  }>('/tag/:tag', { schema }, async function (request) {
    try {
      const { tag } = request.params;
      const { search = null } = request.query;

      const where: WhereOptions<PromptTemplate> = {};

      // Filter by tag - check if tag exists in tags array
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
        `Failed to get templates by tag: ${error.message}`,
        500,
      );
    }
  });
};

export default getByTag;
