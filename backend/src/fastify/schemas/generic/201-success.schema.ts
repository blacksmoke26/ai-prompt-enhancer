/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import type { JSONSchema7 } from 'json-schema';

export default {
  description: 'Created',
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      description: 'The operation was successful',
    },
  },
} as JSONSchema7;
