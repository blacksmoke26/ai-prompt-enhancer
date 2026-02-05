/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// schemas
import schema500WithError from '~/fastify/schemas/generic/500.schema';
import schema422WithError from '~/fastify/schemas/generic/422.schema';
import schema200Success from '~/fastify/schemas/generic/200-success-with-data.schema';

// types
import type { FastifySchema } from 'fastify';
import type { JSONSchema7 } from 'json-schema';

export default {
  summary: 'Create',
  description:
    'Creates a new prompt template with optional tags, tools, and variables.',
  tags: ['Prompt Templates'],
  security: [],
  body: {
    type: 'object',
    properties: {
      categoryId: {
        type: 'integer',
        description: 'The category of the prompt',
        minimum: 1,
        examples: [1],
      },
      title: {
        type: 'string',
        description: 'The title of the prompt',
        minLength: 1,
        maxLength: 255,
        examples: ['Customer Support Response'],
      },
      description: {
        type: 'string',
        description: 'The description of the prompt',
        minLength: 1,
        examples: ['Template for responding to customer inquiries'],
      },
      tags: {
        type: 'array',
        items: { type: 'string' },
        description: 'The tags associated with the prompt',
        minItems: 0,
        maxItems: 20,
        examples: [['support', 'general']],
      },
      tools: {
        type: 'array',
        items: { type: 'string' },
        description: 'The tools associated with the prompt',
        minItems: 0,
        maxItems: 20,
        examples: [['openai', 'anthropic']],
      },
      content: {
        type: 'string',
        description: 'The content of the prompt',
        minLength: 1,
        examples: ['You are a helpful assistant that provides {response_length} responses.'],
      },
      variables: {
        type: 'array',
        description: 'The variables used in the prompt',
        items: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'The name of the variable',
              minLength: 1,
            },
            description: {
              type: 'string',
              description: 'The description of the variable',
              minLength: 1,
            },
            type: {
              type: 'string',
              enum: ['string', 'select', 'number', 'boolean', 'code'],
              description: 'The type of the variable',
            },
            required: {
              type: 'boolean',
              description: 'Whether the variable is required',
              default: false,
            },
            min: {
              type: 'number',
              description: 'The minimum value for the variable',
              minimum: 0,
            },
            max: {
              type: 'number',
              description: 'The maximum value for the variable',
              minimum: 0,
            },
            options: {
              type: 'array',
              items: { type: 'string' },
              description: 'Options for select type',
              minItems: 2,
              maxItems: 20,
            },
            defaultValue: {
              oneOf: [
                { type: 'string' },
                { type: 'number' },
                { type: 'boolean' },
                { type: 'null' },
              ],
              description: 'The default value for the variable',
            },
            placeholder: {
              type: 'string',
              description: 'The placeholder for the variable',
            },
          },
          required: ['name', 'description', 'type'],
        },
        minItems: 0,
        maxItems: 50,
      },
    },
    required: ['categoryId', 'title', 'description', 'content'],
    additionalProperties: false,
  } as JSONSchema7,
  response: {
    500: schema500WithError('Failed to create prompt template'),
    422: schema422WithError('Validation failed'),
    201: schema200Success({
      type: 'object',
      properties: {
        id: { type: 'integer', description: 'The created template ID', examples: [1] },
        title: { type: 'string', description: 'The template title', examples: ['Customer Support Response'] },
        description: { type: 'string', description: 'The template description', examples: ['Template for responding to customer inquiries'] },
        categoryId: { type: 'integer', description: 'The category ID', examples: [1] },
      },
      required: ['id', 'title', 'description', 'categoryId'],
      additionalProperties: false,
    }),
  },
} as FastifySchema;
