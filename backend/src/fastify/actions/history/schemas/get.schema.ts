/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// schemas
import schema400WithError from '~/fastify/schemas/generic/400.schema';
import schema200WithData from '~/fastify/schemas/generic/200-success-with-data.schema';

// types
import type { FastifySchema } from 'fastify';
import type { JSONSchema7 } from 'json-schema';

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
            description: 'Unique identifier for the history item',
            examples: [24],
          },
          model: {
            type: 'string',
            description: 'AI model name used for processing',
            examples: ['qwen3:14b'],
          },
          enhancedPrompt: {
            type: 'string',
            description: 'The processed and enhanced prompt text',
            examples: ['Enhanced version of the prompt'],
          },
          enhancementType: {
            type: 'string',
            description: 'Category or type of enhancement applied',
            examples: ['grammar'],
          },
          originalPrompt: {
            type: 'string',
            description: 'The original user-provided prompt text',
            examples: ['Original prompt text'],
          },
          processingTime: {
            type: 'integer',
            description: 'Time taken to process the request in milliseconds',
            examples: [1234],
          },
          timestamp: {
            type: 'string',
            description: 'ISO 8601 timestamp of when the request was processed',
            examples: ['2024-01-01T12:00:00Z'],
          },
          userRole: {
            type: 'string',
            description: 'Role of the user who made the request',
            examples: ['developer'],
          },
          provider: {
            type: 'string',
            description: 'AI service provider used',
            examples: ['openai'],
          },
          tokensUsed: {
            type: 'integer',
            description: 'Number of tokens consumed in the request',
            examples: [150],
          },
          maxTokens: {
            type: 'integer',
            description: 'Maximum token limit configured for the request',
            examples: [2048],
          },
          temperature: {
            type: 'number',
            description: 'Temperature setting for AI randomness (0.0-1.0)',
            examples: [0.7],
          },
          systemPrompt: {
            type: 'string',
            description: 'System-level prompt instructions used',
            examples: ['You are a helpful assistant'],
          },
          rating: {
            type: 'integer',
            description: 'User rating score (0-5)',
            examples: [4],
          },
          notes: {
            type: 'string',
            description: 'Additional notes or comments about the item',
            examples: ['Additional context here'],
          },
          pinned: {
            type: 'boolean',
            description: 'Indicates whether this history entry is pinned for quick access',
            examples: [true],
          },
          stats: {
            type: 'object',
            description: 'Statistical breakdown of text and token usage.',
            properties: {
              textData: {
                type: 'array',
                description:
                  'Basic text statistics such as word count, character count, and whitespace count.',
                items: {
                  type: 'object',
                  properties: {
                    name: {
                      type: 'string',
                      description:
                        'Label for the text statistic (e.g., Words, Characters, Whitespace).',
                      examples: ['Words'],
                    },
                    value: {
                      type: 'integer',
                      description: 'Numeric value representing the statistic.',
                      examples: [8],
                      minimum: 0,
                    },
                  },
                  required: ['name', 'value'],
                },
                examples: [
                  [
                    { name: 'Words', value: 8 },
                    { name: 'Characters', value: 46 },
                    { name: 'Whitespace', value: 0 },
                  ],
                ],
              },
              tokenStats: {
                type: 'array',
                description:
                  'Token-related statistics comparing current item with global averages.',
                items: {
                  type: 'object',
                  properties: {
                    name: {
                      type: 'string',
                      description:
                        'Label for the token statistic (e.g., This Item, Global Avg).',
                      examples: ['This Item'],
                    },
                    value: {
                      type: 'integer',
                      description:
                        'Numeric value representing the token count.',
                      examples: [666],
                      minimum: 0,
                    },
                    fill: {
                      type: 'string',
                      description:
                        'Hex color code used for chart visualization.',
                      pattern: '^#([A-Fa-f0-9]{6})$',
                      examples: ['#8b5cf6'],
                    },
                  },
                  required: ['name', 'value', 'fill'],
                },
                examples: [
                  [
                    { name: 'This Item', value: 666, fill: '#8b5cf6' },
                    { name: 'Global Avg', value: 687, fill: '#cbd5e1' },
                  ],
                ],
              },
            },
            required: ['textData', 'tokenStats'],
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
          'stats',
        ],
      },
    }),
  },
} as FastifySchema;
