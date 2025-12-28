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
  summary: 'Tones',
  description: 'Retrieves all available tones',
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
            description: 'The display name of the tone',
            examples: ['Professional'],
          },
          value: {
            type: 'string',
            description: 'The unique identifier for the tone',
            examples: ['professional'],
          },
          category: {
            type: 'string',
            description: 'The category or group the tone belongs to',
            examples: ['Original core tones'],
          },
        },
        required: ['label', 'value', 'category'],
        additionalProperties: false,
      },
    }),
  },
} as FastifySchema;
