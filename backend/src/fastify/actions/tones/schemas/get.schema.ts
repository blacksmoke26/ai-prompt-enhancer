/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// schemas
import schema400WithError from '~/fastify/schemas/generic/400.schema';
import schema200WithData from '~/fastify/schemas/generic/200-success-with-data.schema';

// types
import type { FastifySchema } from 'fastify';

export default {
  summary: 'List',
  description: 'Retrieves all available tones',
  tags: ['Tones'],
  security: [],
  response: {
    400: schema400WithError('Failed to fetch tones'),
    200: schema200WithData({
      type: 'array',
      items: {
        type: 'object',
        properties: {
          key: {
            description: 'A unique identifier for the tone',
            type: 'string',
            examples: ['friendly', 'executive'],
          },
          name: {
            description: 'The human-readable name of the tone',
            type: 'string',
            examples: ['Friendly', 'Executive'],
          },
          category: {
            description: 'A category grouping similar tones',
            type: 'string',
            examples: ['Original core tones', 'Emotional & Relational'],
          },
          hidden: {
            description: 'A flag indicating whether the tone is hidden from the UI',
            type: 'boolean',
            examples: [false],
          },
        },
        required: ['key', 'name', 'category', 'hidden'],
      },
    }),
  },
} as FastifySchema;
