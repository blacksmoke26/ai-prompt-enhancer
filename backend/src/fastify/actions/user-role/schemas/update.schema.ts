/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// schemas
import schema400WithError from '~/fastify/schemas/generic/400.schema';
import schema404WithError from '~/fastify/schemas/generic/404.schema';
import schema200SuccessOnly from '~/fastify/schemas/generic/200-success-only.schema';

// types
import type {FastifySchema} from 'fastify';
import type {JSONSchema7} from 'json-schema';

export default {
  summary: 'Update',
  description: 'Updates user role identified by the provided key',
  tags: ['User Roles'],
  security: [],
  params: {
    type: 'object',
    properties: {
      key: {
        type: 'string',
      },
    },
    required: ['key'],
  },
  body: {
    type: 'object',
    properties: {
      hidden: {
        type: 'boolean',
        examples: [false]
      },
    },
    required: ['hidden'],
  } as JSONSchema7,
  response: {
    400: schema400WithError('Failed to update user role'),
    404: schema404WithError('User role not found'),
    200: schema200SuccessOnly,
  },
} as FastifySchema;
