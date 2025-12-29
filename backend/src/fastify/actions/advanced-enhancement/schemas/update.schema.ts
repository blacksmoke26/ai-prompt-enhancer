/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// libs
import { fullPropertiesSchema, propertiesSchema } from './libs';

// schemas
import schema400WithError from '~/fastify/schemas/generic/400.schema';
import schema200WithData from '~/fastify/schemas/generic/200-success-with-data.schema';

export default {
  summary: 'Update',
  description: 'Updates an existing enhancement type with advanced features',
  tags: ['Advanced Enhancement Types'],
  security: [],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: {
        type: 'string',
        description: 'Enhancement type ID',
        examples: ['enhance'],
      },
    },
  },
  body: {
    type: 'object',
    properties: propertiesSchema,
    required: ['name', 'description', 'systemPrompt', 'category'],
  },
  response: {
    200: schema200WithData({
      type: 'object',
      properties: fullPropertiesSchema,
      required: ['id', 'name', 'description', 'systemPrompt', 'category'],
    }),
    404: schema400WithError('Failed to update enhancement type'),
  },
};
