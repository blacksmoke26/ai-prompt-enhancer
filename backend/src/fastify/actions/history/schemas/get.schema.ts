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
import {JSONSchema7} from 'json-schema';

export default {
  summary: 'List',
  description: 'Retrieves history items with optional search or limit',
  tags: ['History'],
  querystring: {
    type: 'object',
    properties: {
      limit: {
        type: 'string',
      },
      search: {
        type: 'string',
        minLength: 1,
      },
    },
  } as JSONSchema7,
  security: [],
  response: {
    400: schema400WithError('Failed to fetch history'),
    200: schema200WithData({
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          model: {
            type: 'string',
          },
          enhancedPrompt: {
            type: 'string',
          },
          enhancementType: {
            type: 'string',
          },
          originalPrompt: {
            type: 'string',
          },
          processingTime: {
            type: 'integer',
          },
          timestamp: {
            type: 'string',
          },
          userRole: {
            type: 'string',
          },
          provider: {
            type: 'string',
          },
          tokensUsed: {
            type: 'integer',
          },
          maxTokens: {
            type: 'integer',
          },
          temperature: {
            type: 'number',
          },
          systemPrompt: {
            type: 'string',
          },
          rating: {
            type: 'integer',
          },
          notes: {
            type: 'string',
          },
        },
        required: [
          'id',
          'model',
          'enhancedPrompt',
          'enhancementType',
          'originalPrompt',
          'processingTime',
          'timestamp',
          'userRole',
          'provider',
          'tokensUsed',
          'maxTokens',
          'temperature',
          'systemPrompt',
          'rating',
          'notes',
        ],
      },
    }),
  },
} as FastifySchema;
