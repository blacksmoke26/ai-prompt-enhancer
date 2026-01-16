/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// schemas
import schema400WithError from '~/fastify/schemas/generic/400.schema';
import schema200WithCustom from '~/fastify/schemas/generic/200-success-with-custom.schema';

// types
import type { FastifySchema } from 'fastify';
import type { JSONSchema7 } from 'json-schema';

export default {
  summary: 'Export HTML',
  description:
    'Export the history to HTML. This endpoint allows users to generate and download a HTML document for a specific history item, based on the provided ID.',
  tags: ['History'],
  body: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description:
          'The unique identifier of the history item to export as HTML',
        examples: [1],
      },
      type: {
        type: 'string',
        enum: ['prompt', 'response'],
        description:
          'Specifies the content type to be included in the exported HTML document.',
        examples: ['response'],
        default: 'response',
      },
    },
    required: ['id'],
  } as JSONSchema7,
  security: [],
  response: {
    404: schema400WithError('History item not found'),
    200: schema200WithCustom({
      properties: {
        html: {
          type: 'string',
          description: 'The exported HTML content',
        },
      },
    }),
  },
} as FastifySchema;
