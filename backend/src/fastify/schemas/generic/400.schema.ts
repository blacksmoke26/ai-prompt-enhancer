/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import type { JSONSchema7 } from 'json-schema';

export default {
  description: 'Bad Request',
  type: 'object',
  properties: {
    statusCode: {
      type: 'number',
      description: 'HTTP status code',
      examples: [400]
    },
    error: {
      type: 'string',
      description: 'Error name',
      examples: ['Bad request']
    },
    message: {
      type: 'string',
      description: 'Error details',
      examples: ['An unknown error occurred']
    },
  },
} as JSONSchema7;
