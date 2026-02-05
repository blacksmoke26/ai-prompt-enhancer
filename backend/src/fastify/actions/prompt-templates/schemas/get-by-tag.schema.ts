/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// schemas
import schema500WithError from '~/fastify/schemas/generic/500.schema';
import schema422WithError from '~/fastify/schemas/generic/422.schema';
import schema200SuccessPaginated from '~/fastify/schemas/generic/200-success-paginated.schema';

// types
import type { FastifySchema } from 'fastify';
import type { JSONSchema7 } from 'json-schema';
import SchemaHelper from '~/helpers/SchemaHelper';

export default {
  summary: 'List By Tag',
  description:
    'Retrieves a paginated list of prompt templates filtered by a specific tag.',
  tags: ['Prompt Templates'],
  security: [],
  params: {
    type: 'object',
    properties: {
      tag: {
        type: 'string',
        minLength: 1,
        description: 'Tag to filter templates by',
      },
    },
    required: ['tag'],
    additionalProperties: false,
  } as JSONSchema7,
  querystring: {
    type: 'object',
    properties: SchemaHelper.withPagination({
      sortBy: {
        type: 'string',
        enum: ['id', 'title', 'categoryId'],
        description: 'Field to sort by',
        default: 'id',
      },
    }),
    required: [],
    additionalProperties: false,
  } as JSONSchema7,
  response: {
    500: schema500WithError('Failed to get templates by tag'),
    422: schema422WithError('Invalid request parameters'),
    200: schema200SuccessPaginated({
      type: 'object',
      properties: {
        id: { type: 'integer', description: 'Template ID' },
        categoryId: { type: 'integer', description: 'Category ID' },
        title: { type: 'string', description: 'Template title' },
        description: { type: 'string', description: 'Template description' },
        tags: {
          type: 'array',
          items: { type: 'string' },
          description: 'List of tags',
        },
        tools: {
          type: 'array',
          items: { type: 'string' },
          description: 'List of tools',
        },
        content: { type: 'string', description: 'Template content' },
        variables: {
          type: 'array',
          description: 'Template variables',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string', description: 'Variable name' },
              description: {
                type: 'string',
                description: 'Variable description',
              },
              type: {
                type: 'string',
                enum: ['string', 'select', 'number', 'boolean', 'code'],
                description: 'Variable type',
              },
              required: {
                type: 'boolean',
                description: 'Whether variable is required',
              },
              min: { type: 'number', description: 'Minimum value' },
              max: { type: 'number', description: 'Maximum value' },
              options: {
                type: 'array',
                items: { type: 'string' },
                description: 'Options for select type',
              },
              defaultValue: {
                oneOf: [
                  { type: 'string' },
                  { type: 'number' },
                  { type: 'boolean' },
                  { type: 'null' },
                ],
                description: 'Default value',
              },
              placeholder: { type: 'string', description: 'Input placeholder' },
            },
            required: ['name', 'description', 'type'],
          },
        },
      },
      required: [
        'id',
        'categoryId',
        'title',
        'description',
        'tags',
        'tools',
        'content',
        'variables',
      ],
      additionalProperties: false,
    }),
  },
} as FastifySchema;
