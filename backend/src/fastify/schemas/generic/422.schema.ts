/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import type { JSONSchema7 } from 'json-schema';

export default {
  description: 'Unprocessable Entity',
  type: 'object',
  properties: {
    statusCode: {
      type: 'number',
      description: 'HTTP status code',
    },
    error: {
      type: 'string',
      description: 'Error name',
    },
    message: {
      type: 'string',
      description: 'Error details',
    },
  },
} as JSONSchema7;
