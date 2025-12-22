/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import type { JSONSchema7 } from 'json-schema';

/**
 * Generates a JSON Schema for a success response with data.
 * This schema includes a boolean `success` field and a generic `data` field
 * that is extended by the provided schema.
 *
 * @param data - A JSONSchema7 object that defines the structure of the `data` property.
 * @returns A JSONSchema7 object representing the success response with the provided data structure.
 *
 * @example
 * // Input
 * const userSchema = {
 *   type: 'object',
 *   properties: {
 *     id: { type: 'number' },
 *     name: { type: 'string' }
 *   },
 *   required: ['id', 'name']
 * };
 *
 * // Output
 * {
 *   description: 'OK',
 *   type: 'object',
 *   properties: {
 *     success: { type: 'boolean', description: 'The operation was successful' },
 *     data: {
 *       type: 'object',
 *       properties: {
 *         id: { type: 'number' },
 *         name: { type: 'string' }
 *       },
 *       required: ['id', 'name']
 *     }
 *   }
 * }
 *
 * @developerNotes
 * - This function is typically used to generate standardized JSON Schema responses for APIs.
 * - The `data` parameter is merged into the `data` property of the resulting schema.
 * - Ensure that the `data` parameter is a valid JSONSchema7 object to avoid schema validation errors.
 */
export default (data: JSONSchema7) =>
  ({
    description: 'OK',
    type: 'object',
    properties: {
      success: {
        type: 'boolean',
        description: 'The operation was successful',
      },
      data: {
        type: 'object',
        ...data,
      },
    },
  }) as JSONSchema7;
