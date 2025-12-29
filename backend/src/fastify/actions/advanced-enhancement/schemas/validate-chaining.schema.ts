/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// schemas
import schema400WithError from '~/fastify/schemas/generic/400.schema';
import schema200WithData from '~/fastify/schemas/generic/200-success-with-data.schema';

export default {
  summary: 'Validate Chaining',
  description: 'Validates if two enhancement types can be chained together',
  tags: ['Advanced Enhancement Types'],
  security: [],
  body: {
    type: 'object',
    properties: {
      firstType: {
        type: 'string',
        description: 'First enhancement type ID',
        examples: ['enhance'],
      },
      secondType: {
        type: 'string',
        description: 'Second enhancement type ID',
        examples: ['correct'],
      },
    },
    required: ['firstType', 'secondType'],
  },
  response: {
    200: schema200WithData({
      type: 'object',
      properties: {
        isValid: {
          type: 'boolean',
          description: 'Indicates whether the two enhancement types can be chained together',
          examples: [false]
        },
        errors: {
          type: 'array',
          items: { type: 'string' },
          description: 'List of error messages if validation fails',
          examples: ['Chaining validation failed']
        },
      },
      required: ['isValid', 'errors'],
    }),
    404: schema400WithError('Failed to validate enhancement chaining'),
  },
};
