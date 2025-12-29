/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// libs
import { fullPropertiesSchema } from './libs';

// schemas
import schema400WithError from '~/fastify/schemas/generic/400.schema';
import schema200WithData from '~/fastify/schemas/generic/200-success-with-data.schema';

export default {
  summary: 'List',
  description: 'Retrieves all available enhancement types with advanced features',
  tags: ['Advanced Enhancement Types'],
  security: [],
  response: {
    400: schema400WithError('Failed to fetch enhancement types'),
    200: schema200WithData({
      type: 'object',
      properties: fullPropertiesSchema,
      required: ['id', 'name', 'description', 'systemPrompt', 'category'],
    }),
  },
};
