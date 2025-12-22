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

export default {
  summary: 'Providers',
  description: 'Retrieves all registered AI providers',
  tags: ['Prompt'],
  security: [],
  response: {
    400: schema400WithError('Failed to get providers'),
    200: schema200WithData({
      type: 'array',
      items: {
        type: 'object',
        properties: {
          caption: {
            type: 'string',
            description: 'Name of the AI provider (e.g., OpenAI, Ollama)',
            examples: ['OpenAI'],
          },
          name: {
            type: 'string',
            description: 'Name of the AI provider (e.g., openai, ollama)',
            examples: ['openai'],
          },
          models: {
            type: 'array',
            description: 'Array of AI models supported by this provider',
            items: {
              type: 'object',
              title: 'AIModel',
              properties: {
                id: {
                  type: 'string',
                  description: 'Unique identifier for the AI model',
                  examples: ['gpt-4-turbo'],
                },
                name: {
                  type: 'string',
                  description: 'Human-readable name of the AI model',
                  examples: ['GPT-4 Turbo'],
                },
                size: {
                  type: 'string',
                  description: 'Size of the model (e.g., \'7b\', \'20b\', \'30b\')',
                  examples: ['7b'],
                },
                provider: {
                  type: 'string',
                  description: 'Provider of the AI model (e.g., openai, ollama)',
                  examples: ['openai'],
                },
                description: {
                  type: 'string',
                  description: 'Optional description of the model\'s capabilities',
                  examples: ['Most capable GPT-4 model, optimized for chat'],
                },
                contextLength: {
                  type: 'integer',
                  description: 'Maximum context length in tokens',
                  examples: [128000],
                },
                maxTokens: {
                  type: 'integer',
                  description: 'Maximum number of tokens that can be generated',
                  examples: [4096],
                },
              },
              required: ['id', 'name', 'provider'],
              additionalProperties: false,
            },
            examples: [
              {'id': 'gpt-4-turbo', 'name': 'GPT-4 Turbo', 'provider': 'openai'},
            ],
          },
          isConfigured: {
            type: 'boolean',
            description: 'Boolean indicating if the provider is configured and ready to use',
            examples: [true],
          },
          config: {
            type: 'object',
            description: 'Configuration options for the provider',
            additionalProperties: true,
            examples: [{
              apiKey: 'sk-...abc',
              baseUrl: 'https://api.openai.com/v1',
            }],
          },
        },
        required: ['caption', 'name', 'models', 'isConfigured'],
        additionalProperties: false,
      },
    }),
  },
} as FastifySchema;
