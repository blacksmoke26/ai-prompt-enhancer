/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// schemas
import schema404WithError from '~/fastify/schemas/generic/404.schema';
import schema500WithError from '~/fastify/schemas/generic/500.schema';
import schema200WithData from '~/fastify/schemas/generic/200-success-with-data.schema';

// types
import type { FastifySchema } from 'fastify';
import type { JSONSchema7 } from 'json-schema';

export default {
  summary: 'Delete',
  description: 'Deletes a prompt template category by its ID',
  tags: ['Prompt Categories'],
  security: [],
  response: {
    404: schema404WithError('Prompt category not found'),
    500: schema500WithError('Failed to delete prompt category'),
    200: schema200WithData({
      type: 'object',
      properties: {
        success: {
          type: 'boolean',
          description: 'Indicates the operation was successful',
          examples: [true],
        },
      },
      required: ['success'],
      additionalProperties: false,
    }),
  },
} as FastifySchema;
