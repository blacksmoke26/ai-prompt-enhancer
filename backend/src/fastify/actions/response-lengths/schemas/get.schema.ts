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
  description: 'Retrieves all available response lengths',
  tags: ['Response Lengths'],
  security: [],
  response: {
    400: schema400WithError('Failed to fetch response length'),
    200: schema200WithData({
      type: 'array',
      items: {
        type: 'object',
        properties: {
          key: {
            description: 'A unique identifier for the response length',
            type: 'string',
            examples: ['short', 'detailed'],
          },
          name: {
            description: 'The human-readable name of the response length',
            type: 'string',
            examples: ['Short', 'Detailed'],
          },
          category: {
            description: 'A category grouping similar response length',
            type: 'string',
            examples: ['Expansion-focused', 'Original values'],
          },
          hidden: {
            description: 'A flag indicating whether the response length is hidden from the UI',
            type: 'boolean',
            examples: [false],
          },
        },
        required: ['key', 'name', 'category', 'hidden'],
      },
    }),
  },
} as FastifySchema;
