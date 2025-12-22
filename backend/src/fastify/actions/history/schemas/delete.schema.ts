/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// schemas
import schema404WithError from '~/fastify/schemas/generic/404.schema';
import schema200SuccessOnly from '~/fastify/schemas/generic/200-success-only.schema';

// types
import type {FastifySchema} from 'fastify';

export default {
  summary: 'Delete',
  description: 'Delete the history item',
  tags: ['History'],
  security: [],
  params: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
    },
    required: ['id'],
  },
  response: {
    404: schema404WithError('History item not found'),
    200: schema200SuccessOnly,
  },
} as FastifySchema;
