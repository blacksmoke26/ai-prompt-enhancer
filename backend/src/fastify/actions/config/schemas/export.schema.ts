/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// schemas
import schema400WithError from '~/fastify/schemas/generic/400.schema';

// types
import type {FastifySchema} from 'fastify';

export default {
  summary: 'Export',
  description: 'Exports the current configuration as a downloadable JSON file',
  tags: ['Config'],
  security: [],
  response: {
    400: schema400WithError('Failed to export config'),
    200: {
      description: 'OK',
      type: 'object',
      content: {
        'application/json': {
          schema: {
            description: 'Exported JSON configuration file',
            type: 'string',
          },
        },
      },
    },
  },
} as FastifySchema;
