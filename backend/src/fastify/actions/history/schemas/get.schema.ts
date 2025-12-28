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
  summary: 'List',
  description: 'Retrieves history items with optional search or limit',
  tags: ['History'],
  querystring: {
    type: 'object',
    properties: {
      provider: {
        type: 'string',
        description: 'Filter by provider name',
        examples: ['openai'],
      },
      model: {
        type: 'string',
        description: 'Filter by model name',
        examples: ['gpt-4'],
      },
      search: {
        type: 'string',
        minLength: 1,
        description: 'Search term to filter history items',
        examples: ['keyword'],
      },
      enhancementType: {
        type: 'string',
        description: 'Filter by type of enhancement',
        examples: ['grammar'],
      },
      userRole: {
        type: 'string',
        description: 'Filter by user role',
        examples: ['developer'],
      },
      dateFrom: {
        type: 'string',
        format: 'date',
        description: 'Start date for filtering history items',
        examples: ['2024-01-01'],
      },
      dateTo: {
        type: 'string',
        format: 'date',
        description: 'End date for filtering history items',
        examples: ['2024-12-31'],
      },
      minRating: {
        type: 'string',
        pattern: '^[0-5]$',
        description: 'Minimum rating value (0-5) to filter by',
        examples: [3],
      },
      maxRating: {
        type: 'string',
        pattern: '^[0-5]$',
        description: 'Maximum rating value (0-5) to filter by',
        examples: [5],
      },
      limit: {
        type: 'string',
        pattern: '^[0-9]{1,5}$',
        description: 'Maximum number of items to retrieve',
        examples: [10],
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
