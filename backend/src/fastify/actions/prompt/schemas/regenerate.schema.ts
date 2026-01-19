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

// types
import type { FastifySchema } from 'fastify';
import type { JSONSchema7 } from 'json-schema';

export default {
  summary: 'Regenerate',
  description: 'Regenerate the AI prompt for enhancement',
  tags: ['Prompt'],
  security: [],
  params: {
    type: 'object',
    properties: {
      conversationId: {
        type: 'string',
        description: 'The ID of the conversation to regenerate',
        examples: ['504'],
      },
    },
    additionalProperties: false,
  } as JSONSchema7,
  response: {
    500: schema500WithError('Prompt enhancement streaming failed'),
    503: schema503WithError('Provider may not available or not found'),
    404: schema404WithError('Conversation not found'),
    422: schema422WithError('Validation failed'),
    200: {
      type: 'object',
      description: 'Streaming response with enhanced prompt',
      properties: {
        enhancedPrompt: {
          type: 'string',
          description: 'The enhanced version of the original prompt',
          examples: [
            'Explain quantum computing in simple terms, focusing on basic principles and applications',
          ],
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
    },
  },
} as FastifySchema;
