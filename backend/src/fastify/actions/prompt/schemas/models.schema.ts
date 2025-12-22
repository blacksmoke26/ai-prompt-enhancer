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
  summary: 'Models',
  description: 'Retrieves all available models from all providers',
  tags: ['Prompt'],
  security: [],
  response: {
    400: schema400WithError('Failed to get models'),
    200: schema200WithData({
      type: 'array',
      items: {
        type: 'object',
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
    }),
  },
} as FastifySchema;
