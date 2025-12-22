/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import merge from 'deepmerge';

// types
import type {JSONSchema7} from 'json-schema';

/**
 * Merges a provided schema with a standardized base schema that includes an optional 'success' field.
 * @param {JSONSchema7} schema - The schema to merge with the base structure.
 * @param {boolean} includeSuccess - Whether to include the 'success' field in the result (default: true).
 * @returns {JSONSchema7} A merged schema object containing the standardized base structure and the provided schema's properties.
 * @example
 * // With success field
 * mergeSchema({ properties: { data: { type: 'object' } } });
 * // => { description: 'OK', type: 'object', properties: { success: ..., data: ... } }
 *
 * // Without success field
 * mergeSchema({ properties: { data: { type: 'object' } } }, false);
 * // => { description: 'OK', type: 'object', properties: { data: ... } }
 * @developerNotes
 * - Used to standardize response formats, especially for API success/failure responses.
 * - Assumes `merge` is a utility function that deeply merges two schema objects.
 * - The base schema adds a standardized `description`, `type`, and optional `success` field.
 */
export default (schema: JSONSchema7, includeSuccess: boolean = true) => {
  return merge<JSONSchema7>({
    description: 'OK',
    type: 'object',
    properties: {
      ...(!includeSuccess ? {} : {
        success: {
          type: 'boolean',
          description: 'The operation was successful',
        },
      }),
    },
  }, schema);
};
