/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import type { JSONSchema7 } from 'json-schema';

/**
 * Generates a JSON Schema for unprocessable entity response with an optional error message.
 *
 * @param [message] - An optional error message to include in the response.
 * @param [error] - An optional error name to include in the response.
 * @returns A JSONSchema7 object representing the unprocessable entity response with the provided error message.
 */
export default (message?: string, error?: string): JSONSchema7 => {
  return {
    description: 'Unprocessable Entity',
    type: 'object',
    properties: {
      statusCode: {
        type: 'number',
        description: 'HTTP status code',
        examples: [422],
      },
      error: {
        type: 'string',
        description: 'Error name',
        examples: [error ?? 'Unprocessable Entity'],
      },
      message: {
        type: 'string',
        description: 'Error details',
        examples: [message ?? 'Unprocessable Entity'],
      },
    },
  };
};
