/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// schemas
import schema400WithError from '~/fastify/schemas/generic/400.schema';
import schema200WithData from '~/fastify/schemas/generic/200-success-with-data.schema';

// libs
import { fullPropertiesSchema } from './libs';

export default {
  summary: 'Get',
  description: 'Retrieves a specific enhancement type by ID',
  tags: ['Advanced Enhancement Types'],
  security: [],
  params: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'Enhancement type ID',
        examples: ['enhance'],
      },
    },
    required: ['id'],
  },
  response: {
    400: schema400WithError('Failed to fetch enhancement type'),
    200: schema200WithData({
      type: 'object',
      properties: fullPropertiesSchema,
      required: ['id', 'name', 'description', 'systemPrompt', 'category'],
    }),
  },
};
