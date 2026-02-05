/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// schemas
import schema500WithError from '~/fastify/schemas/generic/500.schema';
import schema400WithError from '~/fastify/schemas/generic/400.schema';
import schema404WithError from '~/fastify/schemas/generic/404.schema';
import schema200SuccessWithData from '~/fastify/schemas/generic/200-success-with-data.schema';

// types
import type { FastifySchema } from 'fastify';
import type { JSONSchema7 } from 'json-schema';

export default {
  summary: 'Update',
  description:
    'Updates an existing prompt template by ID. All fields are optional, so only the fields you want to update need to be provided.',
  tags: ['Prompt Templates'],
  security: [],
  params: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        minimum: 1,
        description: 'Prompt template ID',
      },
    },
    required: ['id'],
  } as JSONSchema7,
  body: {
    type: 'object',
    properties: {
      categoryId: {
        type: 'integer',
        minimum: 1,
        description: 'The category of the prompt',
      },
      title: {
        type: 'string',
        minLength: 1,
        maxLength: 255,
        description: 'The title of the prompt',
      },
      description: {
        type: 'string',
        minLength: 1,
        description: 'The description of the prompt',
      },
      tags: {
        type: 'array',
        items: { type: 'string' },
        description: 'The tags associated with the prompt',
      },
      tools: {
        type: 'array',
        items: { type: 'string' },
        description: 'The tools associated with the prompt',
      },
      content: {
        type: 'string',
        minLength: 1,
        description: 'The content of the prompt',
      },
      variables: {
        type: 'array',
        description: 'The variables used in the prompt',
        items: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'Variable name' },
            description: { type: 'string', description: 'Variable description' },
            type: {
              type: 'string',
              enum: ['string', 'select', 'number', 'boolean', 'code'],
              description: 'Variable type',
            },
            required: { type: 'boolean', description: 'Whether variable is required' },
            min: { type: 'number', description: 'Minimum value' },
            max: { type: 'number', description: 'Maximum value' },
            options: {
              type: 'array',
              items: { type: 'string' },
              description: 'Options for select type',
            },
            defaultValue: {
              oneOf: [
                { type: 'string' },
                { type: 'number' },
                { type: 'boolean' },
                { type: 'null' },
              ],
              description: 'Default value',
            },
            placeholder: { type: 'string', description: 'Input placeholder' },
          },
          required: ['name', 'description', 'type'],
        },
      },
    },
    required: [],
    additionalProperties: false,
  } as JSONSchema7,
  response: {
    500: schema500WithError('Failed to update prompt template'),
    400: schema400WithError('Invalid request body'),
    404: schema404WithError('Prompt template not found'),
    200: schema200SuccessWithData({
      type: 'object',
      properties: {
        id: { type: 'integer', description: 'Template ID' },
        categoryId: { type: 'integer', description: 'Category ID' },
        title: { type: 'string', description: 'Template title' },
        description: { type: 'string', description: 'Template description' },
        tags: {
          type: 'array',
          items: { type: 'string' },
          description: 'List of tags',
        },
        tools: {
          type: 'array',
          items: { type: 'string' },
          description: 'List of tools',
        },
        content: { type: 'string', description: 'Template content' },
        variables: {
          type: 'array',
          description: 'Template variables',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string', description: 'Variable name' },
              description: { type: 'string', description: 'Variable description' },
              type: {
                type: 'string',
                enum: ['string', 'select', 'number', 'boolean', 'code'],
                description: 'Variable type',
              },
              required: { type: 'boolean', description: 'Whether variable is required' },
              min: { type: 'number', description: 'Minimum value' },
              max: { type: 'number', description: 'Maximum value' },
              options: {
                type: 'array',
                items: { type: 'string' },
                description: 'Options for select type',
              },
              defaultValue: {
                oneOf: [
                  { type: 'string' },
                  { type: 'number' },
                  { type: 'boolean' },
                  { type: 'null' },
                ],
                description: 'Default value',
              },
              placeholder: { type: 'string', description: 'Input placeholder' },
            },
            required: ['name', 'description', 'type'],
          },
        },
      },
      required: ['id', 'categoryId', 'title', 'description', 'tags', 'tools', 'content', 'variables'],
      additionalProperties: false,
    }),
  },
} as FastifySchema;
