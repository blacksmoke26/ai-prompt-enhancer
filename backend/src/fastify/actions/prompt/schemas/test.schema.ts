/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// schemas
import schema400WithError from '~/fastify/schemas/generic/400.schema';
import schema200WithData from '~/fastify/schemas/generic/200-success-with-data.schema';

// types
import type {FastifySchema} from 'fastify';
import type {JSONSchema7} from 'json-schema';

export default {
  summary: 'Test Provider',
  description: 'Tests if a specific provider is available',
  tags: ['Prompt'],
  security: [],
  params: {
    type: 'object',
    properties: {
      providerName: {
        type: 'string',
        description: 'Identifier of the AI model provider (e.g., openai, ollama)',
        examples: ['openai'],
      },
    },
    required: ['providerName'],
    additionalProperties: false,
  },
  body: {
    type: 'object',
    properties: {
      enabled: {
        type: 'boolean',
        description: 'Whether the provider is enabled or not',
        examples: [true],
      },
      apiKey: {
        type: 'string',
        description: 'API key for the AI model provider',
        examples: ['sk-1234567890'],
      },
      timeout: {
        type: 'integer',
        description: 'Timeout for the AI model provider',
        examples: [30000],
      },
      baseUrl: {
        type: 'string',
        description: 'Base URL for the AI model provider',
        examples: ['https://api.openai.com/v1'],
      },
    },
    required: ['enabled', 'apiKey', 'timeout', 'baseUrl'],
    additionalProperties: false,
  } as JSONSchema7,
  response: {
    400: schema400WithError('Failed to test provider'),
    200: schema200WithData({
      type: 'object',
      properties: {
        providerName: {
          type: 'string',
          description: 'Identifier of the AI model provider (e.g., openai, ollama)',
          examples: ['openai'],
        },
        available: {
          type: 'boolean',
          description: 'Whether the provider is available or not',
          examples: [true],
        },
      },
      required: ['providerName', 'available'],
      additionalProperties: false,
    }),
  },
} as FastifySchema;
