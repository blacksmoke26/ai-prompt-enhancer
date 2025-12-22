/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// schemas
import successWithCustom from '~/fastify/schemas/generic/200-success-with-custom.schema';

// types
import type {FastifySchema} from 'fastify';

export default {
  summary: 'Health',
  description: 'Health check endpoint to verify server status',
  tags: ['Other'],
  security: [],
  response: {
    200: successWithCustom({
      type: 'object',
      properties: {
        status: {
          type: 'string',
          description: 'Server status',
          examples: ['ok'],
        },
        timestamp: {
          type: 'string',
          description: 'Current timestamp',
          examples: ['2025-12-22T19:07:49.081Z'],
        },
      },
    }, false),
  },
} as FastifySchema;
