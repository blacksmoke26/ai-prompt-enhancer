/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// schemas
import schema400WithError from '~/fastify/schemas/generic/400.schema';
import schema422WithError from '~/fastify/schemas/generic/422.schema';

// types
import type {FastifySchema} from 'fastify';
import type {JSONSchema7} from 'json-schema';

export default {
  summary: 'Export',
  description: 'Exports history data in specified format',
  tags: ['History'],
  security: [],
  querystring: {
    type: 'object',
    properties: {
      format: {
        type: 'string',
        enum: ['json', 'csv', 'txt'],
        examples: ['json'],
      },
      limit: {
        type: 'string',
      },
    },
    required: ['format'],
  } as JSONSchema7,
  response: {
    400: schema422WithError('Validation error'),
    422: schema400WithError('Failed to export history'),
    200: {
      description: 'OK',
      type: 'object',
      content: {
        'application/json': {
          schema: {
            description: 'Exported history as JSON file',
            type: 'string',
          },
        },
        'text/csv': {
          schema: {
            description: 'Exported history as CSV file',
            type: 'string',
          },
        },
        'text/plain': {
          schema: {
            description: 'Exported history as TEXT file',
            type: 'string',
          },
        },
      },
    },
  },
} as FastifySchema;
