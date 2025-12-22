/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// schemas
import schema400WithError from '~/fastify/schemas/generic/400.schema';
import schema200SuccessOnly from '~/fastify/schemas/generic/200-success-only.schema';

// types
import type {FastifySchema} from 'fastify';

export default {
  summary: 'Clear',
  description: 'Clears all history items',
  tags: ['History'],
  security: [],
  response: {
    400: schema400WithError('Failed to clear history'),
    200: schema200SuccessOnly,
  },
} as FastifySchema;
