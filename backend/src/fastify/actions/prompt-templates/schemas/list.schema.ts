/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// helpers
import SchemaHelper from '~/helpers/SchemaHelper';

// schemas
import schema500WithError from '~/fastify/schemas/generic/500.schema';
import schema400WithError from '~/fastify/schemas/generic/400.schema';
import schema200SuccessPaginated from '~/fastify/schemas/generic/200-success-paginated.schema';

// types
import type { FastifySchema } from 'fastify';
import type { JSONSchema7 } from 'json-schema';

export default {
  summary: 'List',
  description:
    'Retrieves a paginated list of prompt templates with optional filtering by search terms, category ID, or tag.',
  tags: ['Prompt Templates'],
  security: [],
  querystring: {
    type: 'object',
    properties: SchemaHelper.withPagination({
      sortBy: {
        type: 'string',
        enum: ['id', 'title', 'categoryId'],
        description: 'Field to sort by',
        default: 'id',
        examples: ['id'],
      },
      search: {
        type: 'string',
        description: 'Search query for title, description, or content',
        minLength: 1,
        examples: ['example search query'],
      },
      categoryId: {
        type: 'string',
        pattern: '^\\d+$',
        description: 'Filter by category ID',
        minLength: 1,
        // @ts-expect-error false positive
        errorMessage: "must be an integer",
        examples: ['123'],
      },
      tag: {
        type: 'string',
        description: 'Filter by tag',
        examples: ['tag-name'],
      },
    }),
    required: [],
    additionalProperties: false,
  } as JSONSchema7,
  response: {
    500: schema500WithError('Failed to list prompt templates'),
    400: schema400WithError('Invalid query parameters'),
    200: schema200SuccessPaginated({
      type: 'object',
      properties: {
        id: { type: 'integer', description: 'Template ID', examples: [1] },
        categoryId: { type: 'integer', description: 'Category ID', examples: [1] },
        title: { type: 'string', description: 'Template title', examples: ['My Template'] },
        description: { type: 'string', description: 'Template description', examples: ['A sample template description'] },
        tags: {
          type: 'array',
          items: { type: 'string' },
          description: 'List of tags',
          examples: [['tag1', 'tag2']],
        },
        tools: {
          type: 'array',
          items: { type: 'string' },
          description: 'List of tools',
          examples: [['tool1', 'tool2']],
        },
        content: { type: 'string', description: 'Template content', examples: ['Hello, {{name}}!'] },
        variables: {
          type: 'array',
          description: 'Template variables',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string', description: 'Variable name', examples: ['name'] },
              description: { type: 'string', description: 'Variable description', examples: ['Variable description'] },
              type: {
                type: 'string',
                enum: ['string', 'select', 'number', 'boolean', 'code'],
                description: 'Variable type',
                examples: ['string'],
              },
              required: { type: 'boolean', description: 'Whether variable is required', examples: [true] },
              min: { type: 'number', description: 'Minimum value', examples: [1] },
              max: { type: 'number', description: 'Maximum value', examples: [100] },
              options: {
                type: 'array',
                items: { type: 'string' },
                description: 'Options for select type',
                examples: [['option1', 'option2']],
              },
              defaultValue: {
                oneOf: [
                  { type: 'string' },
                  { type: 'number' },
                  { type: 'boolean' },
                  { type: 'null' },
                ],
                description: 'Default value',
                examples: ['default value'],
              },
              placeholder: { type: 'string', description: 'Input placeholder', examples: ['Enter value'] },
            },
            required: ['name', 'description', 'type'],
          },
          examples: [[
            {
              name: 'name',
              description: 'Variable description',
              type: 'string',
              required: true,
              min: 1,
              max: 100,
              options: ['option1', 'option2'],
              defaultValue: 'default value',
              placeholder: 'Enter value',
            },
          ]],
        },
      },
      required: ['id', 'categoryId', 'title', 'description', 'tags', 'tools', 'content', 'variables'],
      additionalProperties: false,
    }),
  },
} as FastifySchema;
