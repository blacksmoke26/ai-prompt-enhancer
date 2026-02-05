/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// schemas
import schema200WithData from '~/fastify/schemas/generic/200-success-with-data.schema';

// types
import type { FastifySchema } from 'fastify';
import type { JSONSchema7 } from 'json-schema';

export default {
  summary: 'Get',
  description: 'Retrieves a specific prompt template category by its ID',
  tags: ['Prompt Categories'],
  security: [],
  response: {
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
          examples: ['general'],
        },
        label: {
          type: 'string',
          description: 'Display name of the category',
          examples: ['General Prompts'],
        },
        description: {
          type: 'string',
          description: 'Description of the category',
          examples: ['General purpose prompts'],
        },
      },
      required: ['id', 'key', 'label'],
      additionalProperties: false,
    }),
  },
} as FastifySchema;
