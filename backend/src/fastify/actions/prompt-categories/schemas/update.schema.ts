/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// schemas
import schema422WithError from '~/fastify/schemas/generic/422.schema';
import schema500WithError from '~/fastify/schemas/generic/500.schema';
import schema200WithData from '~/fastify/schemas/generic/200-success-with-data.schema';

// types
import type { FastifySchema } from 'fastify';
import type { JSONSchema7 } from 'json-schema';

export default {
  summary: 'Update',
  description: 'Updates an existing prompt template category',
  tags: ['Prompt Categories'],
  security: [],
  body: {
    type: 'object',
    properties: {
      key: {
        type: 'string',
        description: 'Unique identifier for the category (max 128 characters)',
        examples: ['creative'],
        minLength: 1,
        maxLength: 128,
      },
      label: {
        type: 'string',
        description: 'Display name of the category',
        examples: ['Creative Prompts'],
        minLength: 1,
      },
      description: {
        type: 'string',
        description: 'Description of the category',
        examples: ['Creative and imaginative prompt templates'],
        maxLength: 1000,
      },
    },
    required: ['key', 'label'],
    additionalProperties: false,
  } as JSONSchema7,
  response: {
    422: schema422WithError('Validation failed'),
    500: schema500WithError('Failed to update prompt category'),
    200: schema200WithData({
      type: 'object',
      properties: {
        id: {
          type: 'number',
          description: 'Unique identifier for the category',
          examples: [1],
        },
        key: {
          type: 'string',
          description: 'Unique identifier for the category',
          examples: ['creative'],
        },
        label: {
          type: 'string',
          description: 'Display name of the category',
          examples: ['Creative Prompts'],
        },
        description: {
          type: 'string',
          description: 'Description of the category',
          examples: ['Creative and imaginative prompt templates'],
        },
      },
      required: ['id', 'key', 'label'],
      additionalProperties: false,
    }),
  },
} as FastifySchema;
