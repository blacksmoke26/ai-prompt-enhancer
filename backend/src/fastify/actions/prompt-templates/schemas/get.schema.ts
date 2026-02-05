/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// schemas
import schema500WithError from '~/fastify/schemas/generic/500.schema';
import schema404WithError from '~/fastify/schemas/generic/404.schema';
import schema422WithError from '~/fastify/schemas/generic/422.schema';
import schema200WithData from '~/fastify/schemas/generic/200-success-with-data.schema';

// types
import type { FastifySchema } from 'fastify';
import type { JSONSchema7 } from 'json-schema';

export default {
  summary: 'Get',
  description:
    'Retrieves a single prompt template by its ID. Returns all template details including content and variables.',
  tags: ['Prompt Templates'],
  security: [],
  params: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        pattern: '^\\d+$',
        minLength: 1,
        description: 'Template ID',
        // @ts-expect-error false positive
        errorMessage: "must be an integer",
      },
    },
    required: ['id'],
    additionalProperties: false,
  } as JSONSchema7,
  response: {
    500: schema500WithError('Failed to get prompt template'),
    404: schema404WithError('Prompt template not found'),
    422: schema422WithError('Invalid ID parameter'),
    200: schema200WithData({
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
              description: { type: 'string', description: 'Variable description' },
              type: {
                type: 'string',
                enum: ['string', 'select', 'number', 'boolean', 'code'],
                description: 'Variable type',
              },
              required: { type: 'boolean', description: 'Whether variable is required' },
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
      required: ['id', 'categoryId', 'title', 'description', 'tags', 'tools', 'content', 'variables'],
      additionalProperties: false,
    }),
  },
} as FastifySchema;
