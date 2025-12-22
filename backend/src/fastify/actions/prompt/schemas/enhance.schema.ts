/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// schemas
import schema500WithError from '~/fastify/schemas/generic/500.schema';
import schema404WithError from '~/fastify/schemas/generic/404.schema';
import schema422WithError from '~/fastify/schemas/generic/422.schema';
import schema503WithError from '~/fastify/schemas/generic/503.schema';
import schema200WithData from '~/fastify/schemas/generic/200-success-with-data.schema';

// types
import type {FastifySchema} from 'fastify';
import type {JSONSchema7} from 'json-schema';

export default {
  summary: 'Enhance',
  description: 'Enhances a prompt using the specified AI provider',
  tags: ['Prompt'],
  security: [],
  body: {
    type: 'object',
    properties: {
      text: {
        type: 'string',
        description: 'The text prompt to be processed',
        examples: ['Explain quantum computing in simple terms'],
      },
      provider: {
        type: 'string',
        description: 'Identifier of the AI model provider (e.g., Openai, Ollama)',
        examples: ['Openai'],
      },
      model: {
        type: 'string',
        description: 'Identifier of the AI model to use for processing',
        examples: ['gpt-4-turbo'],
      },
      systemPrompt: {
        type: 'string',
        description: 'System prompt to guide the AI\'s behavior',
        examples: ['You are a helpful assistant that explains complex topics simply'],
      },
      temperature: {
        type: 'number',
        minimum: 0,
        maximum: 1,
        description: 'Controls randomness of the output (0.0 to 1.0)',
        examples: [0.7],
      },
      maxTokens: {
        type: 'integer',
        description: 'Maximum number of tokens to generate',
        examples: [500],
      },
      enhancementType: {
        type: 'string',
        description: 'Type of enhancement to apply to the prompt',
        examples: ['enhance'],
      },
      userRole: {
        type: 'string',
        description: 'User role that determines the context for the AI response',
        examples: ['developer'],
      },
      targetAudience: {
        type: 'string',
        description: 'Target audience for the response',
        examples: ['technical-experts'],
      },
      tone: {
        type: 'string',
        description: 'Desired tone for the AI response',
        examples: ['professional'],
      },
      responseLength: {
        type: 'string',
        enum: ['short', 'medium', 'long', 'custom'],
        description: 'Preferred length of the response',
        examples: ['medium'],
      },
      customInstructions: {
        type: 'string',
        description: 'Additional user instructions for the AI',
        examples: ['Include code examples'],
      },
    },
    required: ['text', 'provider', 'model'],
    additionalProperties: false,
  } as JSONSchema7,
  response: {
    500: schema500WithError('Prompt enhancement failed'),
    503: schema503WithError('Provider is not available'),
    404: schema404WithError('Provider not found'),
    422: schema422WithError('Validation failed'),
    200: schema200WithData({
      type: 'object',
      properties: {
        enhancedPrompt: {
          type: 'string',
          description: 'The enhanced version of the original prompt',
          examples: ['Explain quantum computing in simple terms, focusing on basic principles and applications'],
        },
        originalPrompt: {
          type: 'string',
          description: 'The original prompt that was submitted',
          examples: ['Explain quantum computing'],
        },
        model: {
          type: 'string',
          description: 'Identifier of the AI model used',
          examples: ['gpt-4-turbo'],
        },
        timestamp: {
          type: 'string',
          format: 'date-time',
          description: 'Timestamp when the response was generated',
          examples: ['2023-05-15T10:30:00Z'],
        },
        tokensUsed: {
          type: 'integer',
          description: 'Number of tokens used in the processing',
          examples: [120],
        },
        processingTime: {
          type: 'integer',
          description: 'Time taken to process the prompt in milliseconds',
          examples: [1250],
        },
      },
      required: [
        'enhancedPrompt',
        'originalPrompt',
        'model',
        'timestamp',
        'processingTime',
      ],
      additionalProperties: false,
    }),
  },
} as FastifySchema;
