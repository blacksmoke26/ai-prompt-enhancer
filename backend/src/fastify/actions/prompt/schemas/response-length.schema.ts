/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// schemas
import schema200WithData from '~/fastify/schemas/generic/200-success-with-data.schema';

// types
import type {FastifySchema} from 'fastify';

export default {
  summary: 'Response Length',
  description: 'Retrieves all available response lengths',
  tags: ['Prompt'],
  security: [],
  response: {
    200: schema200WithData({
      type: 'array',
      items: {
        type: 'object',
        properties: {
          label: {
            type: 'string',
            description: 'The display name of the response length',
            examples: ['Concise'],
          },
          value: {
            type: 'string',
            description: 'The unique identifier for the response length',
            examples: ['concise'],
          },
          category: {
            type: 'string',
            description: 'The category or group the response length belongs to',
            examples: ['Original values'],
          },
        },
        required: ['label', 'value', 'category'],
        additionalProperties: false,
      },
    }),
  },
} as FastifySchema;
