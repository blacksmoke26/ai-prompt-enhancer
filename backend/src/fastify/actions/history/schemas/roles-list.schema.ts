/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// schemas
import schema400WithError from '~/fastify/schemas/generic/400.schema';
import schema200WithData from '~/fastify/schemas/generic/200-success-with-data.schema';

export default {
  summary: 'Roles List',
  description:
    'Fetches the list of user roles associated with the prompt user roles.',
  tags: ['History'],
  security: [],
  response: {
    400: schema400WithError('Failed to fetch roles list'),
    200: schema200WithData({
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'Unique ID for the role item',
            examples: ['41'],
          },
          key: {
            type: 'string',
            description: 'Unique key identifier for the role',
            examples: ['solutions-engineer'],
          },
          name: {
            type: 'string',
            description: 'Name of the role',
            examples: ['Solutions Engineer'],
          },
          total: {
            type: 'number',
            description: 'Total count associated with the role',
            examples: [15],
          },
        },
        required: ['total', 'name', 'key', 'id'],
        additionalProperties: false,
      },
    }),
  },
};
