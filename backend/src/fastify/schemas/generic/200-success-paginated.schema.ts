/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// types
import type { JSONSchemaType } from 'ajv';
import type { JSONSchema7 } from 'json-schema';

export default <T>(itemSchema: Partial<JSONSchemaType<T>>) =>
  ({
    description: 'OK',
    type: 'object',
    properties: {
      success: {
        type: 'boolean',
        description: 'The operation was successful',
      },
      totalCount: {
        type: 'integer',
        description: 'Count of total records',
        examples: [50],
      },
      pageInfo: {
        properties: {
          currentPage: {
            type: 'number',
            examples: [1],
            description: 'The current page'
          },
          totalPages: {
            type: 'number',
            examples: [5],
            description: 'Count of total pages',
          },
          hasNextPage: {
            type: 'boolean',
            examples: [true],
            description: 'Whatever there is a page after the current page',
          },
          hasPreviousPage: {
            type: 'boolean',
            examples: [false],
            description: 'Whatever there is a page before the current page',
          },
        },
        required: ['currentPage', 'totalPages', 'hasNextPage', 'hasPreviousPage'],
      },
      rows: {
        type: 'array',
        items: itemSchema,
      },
    },
    required: ['success', 'totalCount', 'pageInfo', 'rows'],
  }) as JSONSchema7;
