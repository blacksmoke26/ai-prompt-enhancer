/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// types
import type { JSONSchema7 } from 'json-schema';

/**
 * A schema definition for validating and describing properties used in configuration or data structures.
 *
 * Ensures consistency and clarity in property definitions across different parts of the application.
 * @example
 * {
 *   username: {
 *     type: 'string',
 *     description: 'User identifier',
 *     required: true,
 *     default: 'guest',
 *     options: ['admin', 'user']
 *   },
 *   age: {
 *     type: 'number',
 *     description: 'Age in years',
 *     min: 0,
 *     max: 120
 *   }
 * }
 * @developerNote Maintain consistent naming and use descriptive property names. Ensure that all optional fields are documented and that type constraints (e.g., min/max) are applied where necessary.
 */
export const propertiesSchema = {
  name: {
    type: 'string',
    minLength: 5,
    maxLength: 50,
    description: 'The unique name of the enhancement type',
    examples: ['Correct Grammar & Spelling'],
  },
  description: {
    type: 'string',
    minLength: 20,
    maxLength: 255,
    description: 'A detailed description of what this enhancement type does',
    examples: [
      'Fix grammatical errors, spelling mistakes, and improve clarity',
    ],
  },
  systemPrompt: {
    type: 'string',
    minLength: 30,
    maxLength: 255,
    description: 'The system prompt used to initialize the enhancement',
    examples: [
      'You are a grammar and spelling expert. Correct any grammatical errors, spelling mistakes, and improve the clarity of the given prompt while preserving the original intent.',
    ],
  },
  category: {
    type: 'string',
    minLength: 5,
    maxLength: 50,
    description: 'The category this enhancement type belongs to',
    examples: ['Language'],
  },
  hidden: {
    type: 'boolean',
    description: 'Whether this enhancement type should be hidden from listings',
    examples: [false],
  },
  parameters: {
    type: 'object',
    description: 'Configuration parameters for the enhancement type',
    additionalProperties: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          enum: ['string', 'number', 'boolean', 'array'],
          description: 'The data type of the parameter',
          examples: ['number'],
        },
        description: {
          type: 'string',
          description: 'Description of what the parameter does',
          examples: ['Complexity level of the enhancement (1-10)'],
        },
        required: {
          type: 'boolean',
          description: 'Whether this parameter is required',
          examples: [false],
        },
        default: {
          type: 'string',
          description: 'Default value for the parameter',
          examples: [5],
        },
        options: {
          type: 'array',
          items: { type: 'string' },
          description: 'List of allowed values for the parameter',
          examples: ['speed', 'memory', 'accuracy', 'balanced'],
        },
        min: {
          type: 'number',
          description: 'Minimum allowed value for numeric parameters',
          examples: [1],
        },
        max: {
          type: 'number',
          description: 'Maximum allowed value for numeric parameters',
          examples: [10],
        },
      },
      required: ['type', 'description'],
    },
  },
  chainingEnabled: {
    type: 'boolean',
    description: 'Whether this enhancement type can be chained with others',
    examples: [true],
  },
  templateVariables: {
    type: 'array',
    items: { type: 'string' },
    description:
      'List of template variables that can be used in the system prompt',
    examples: ['targetPerformance', 'threshold'],
  },
  dependencies: {
    type: 'array',
    items: { type: 'string' },
    description: 'List of other enhancement types this depends on',
    examples: ['optimize'],
  },
  metadata: {
    type: 'object',
    description: 'Additional metadata about the enhancement type',
    examples: [{ version: '1.0' }],
  },
  tags: {
    type: 'array',
    items: { type: 'string' },
    description: 'Tags for categorizing and filtering enhancement types',
    examples: ['performance', 'optimization'],
  },
  complexity: {
    type: 'string',
    enum: ['basic', 'intermediate', 'advanced'],
    description: 'The complexity level of this enhancement type',
    examples: ['advanced'],
  },
  experimental: {
    type: 'boolean',
    description: 'Whether this enhancement type is experimental',
    examples: [false],
  },
  exampleUsage: {
    type: 'string',
    description: 'Example of how to use this enhancement type',
    examples: ['Use with targetPerformance="memory" and threshold=90'],
  },
  performance: {
    type: 'object',
    description: 'Performance metrics for the enhancement type',
    properties: {
      estimatedProcessingTime: {
        type: 'number',
        description: 'Estimated processing time in milliseconds',
        examples: [250],
      },
      tokenUsage: {
        type: 'number',
        description: 'Expected token usage per invocation',
        examples: [180],
      },
      complexity: {
        type: 'number',
        description: 'Computational complexity score',
        examples: [7],
      },
    },
  },
} as JSONSchema7['properties'];

/**
 * A comprehensive schema defining all possible properties for a given entity, including their types, validation rules, and metadata.
 * This schema is typically used for data validation, serialization, and API contract definition.
 * @example
 * {
 *   name: { type: 'string', description: 'The entity name' },
 *   age: { type: 'number', minimum: 0, description: 'The entity age' },
 *   metadata: { $ref: '#/definitions/EntityMetadata' }
 * }
 * @developerNotes
 * - Ensure this schema remains synchronized with the actual data model.
 * - When adding new properties, update corresponding validation logic and API endpoints.
 */
export const fullPropertiesSchema = {
  id: {
    type: 'string',
    description: 'The unique identifier of the enhancement type',
    examples: ['correct'],
  },
  ...propertiesSchema,
} as JSONSchema7['properties'];
