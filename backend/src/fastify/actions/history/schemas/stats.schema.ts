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
  summary: 'Stats',
  description: 'Gets statistics about the history data',
  tags: ['History'],
  security: [],
  response: {
    400: schema400WithError('Failed to fetch history'),
    200: schema200WithData({
      type: 'object',
      properties: {
        totalItems: {
          type: 'integer',
        },
        totalTokensUsed: {
          type: 'integer',
        },
        averageProcessingTime: {
          type: 'integer',
        },
        mostUsedModel: {
          type: 'string',
        },
        mostUsedEnhancementType: {
          type: 'string',
        },
        providerUsage: {
          type: 'array',
          items: [
            {
              type: 'object',
              properties: {
                provider: {
                  type: 'string',
                },
                model: {
                  type: 'string',
                },
                count: {
                  type: 'integer',
                },
              },
              required: [
                'provider',
                'model',
                'count',
              ],
            },
            {
              type: 'object',
              properties: {
                provider: {
                  type: 'string',
                },
                model: {
                  type: 'string',
                },
                count: {
                  type: 'integer',
                },
              },
              required: [
                'provider',
                'model',
                'count',
              ],
            },
          ],
        },
        mostUsedRoles: {
          type: 'array',
          items: [
            {
              type: 'object',
              properties: {
                role: {
                  type: 'string',
                },
                count: {
                  type: 'integer',
                },
              },
              required: [
                'role',
                'count',
              ],
            },
            {
              type: 'object',
              properties: {
                role: {
                  type: 'string',
                },
                count: {
                  type: 'integer',
                },
              },
              required: [
                'role',
                'count',
              ],
            },
            {
              type: 'object',
              properties: {
                role: {
                  type: 'string',
                },
                count: {
                  type: 'integer',
                },
              },
              required: [
                'role',
                'count',
              ],
            },
            {
              type: 'object',
              properties: {
                role: {
                  type: 'string',
                },
                count: {
                  type: 'integer',
                },
              },
              required: [
                'role',
                'count',
              ],
            },
            {
              type: 'object',
              properties: {
                role: {
                  type: 'string',
                },
                count: {
                  type: 'integer',
                },
              },
              required: [
                'role',
                'count',
              ],
            },
            {
              type: 'object',
              properties: {
                role: {
                  type: 'string',
                },
                count: {
                  type: 'integer',
                },
              },
              required: [
                'role',
                'count',
              ],
            },
            {
              type: 'object',
              properties: {
                role: {
                  type: 'string',
                },
                count: {
                  type: 'integer',
                },
              },
              required: [
                'role',
                'count',
              ],
            },
            {
              type: 'object',
              properties: {
                role: {
                  type: 'string',
                },
                count: {
                  type: 'integer',
                },
              },
              required: [
                'role',
                'count',
              ],
            },
            {
              type: 'object',
              properties: {
                role: {
                  type: 'string',
                },
                count: {
                  type: 'integer',
                },
              },
              required: [
                'role',
                'count',
              ],
            },
          ],
        },
        totalWords: {
          type: 'integer',
        },
        totalLines: {
          type: 'integer',
        },
        totalChars: {
          type: 'integer',
        },
        averageTokensUsed: {
          type: 'integer',
        },
        maxTokensUsed: {
          type: 'integer',
        },
        averageRating: {
          type: 'number',
        },
        topRatedEntries: {
          type: 'integer',
        },
        averageTemperature: {
          type: 'number',
        },
        temperatureDistribution: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              range: {
                type: 'string',
              },
              count: {
                type: 'integer',
                minimum: 0,
              },
            },
            required: [
              'range',
              'count',
            ],
          },
        },
        enhancementFrequency: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: {
                type: 'string',
              },
              count: {
                type: 'integer',
              },
              percentage: {
                type: 'integer',
              },
            },
            required: [
              'type',
              'count',
              'percentage',
            ],
          },
        },
        modelPerformance: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              model: {
                type: 'string',
              },
              avgProcessingTime: {
                type: 'integer',
              },
              totalUsage: {
                type: 'integer',
              },
            },
            required: [
              'model',
              'avgProcessingTime',
              'totalUsage',
            ],
          },
        },
        roleModelDistribution: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              role: {
                type: 'string',
              },
              model: {
                type: 'string',
              },
              count: {
                type: 'integer',
              },
            },
            required: [
              'role',
              'model',
              'count',
            ],
          },
        },
        dateRange: {
          type: 'object',
          properties: {
            earliest: {
              type: 'string',
            },
            latest: {
              type: 'string',
            },
          },
          required: [
            'earliest',
            'latest',
          ],
        },
        peakUsageHour: {
          type: 'object',
          properties: {
            hour: {
              type: 'integer',
            },
            count: {
              type: 'integer',
            },
          },
          required: [
            'hour',
            'count',
          ],
        },
        monthlyUsage: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              month: {
                type: 'string',
              },
              count: {
                type: 'integer',
              },
            },
            required: [
              'month',
              'count',
            ],
          },
        },
        averageMaxTokens: {
          type: 'integer',
        },
        minTokensUsed: {
          type: 'integer',
        },
        promptEnhancementRatio: {
          type: 'number',
        },
        systemPromptUsage: {
          type: 'object',
          properties: {
            used: {
              type: 'integer',
            },
            notUsed: {
              type: 'integer',
            },
            percentage: {
              type: 'integer',
            },
          },
          required: [
            'used',
            'notUsed',
            'percentage',
          ],
        },
        ratingDistribution: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              rating: {
                type: 'integer',
              },
              count: {
                type: 'integer',
              },
              percentage: {
                type: 'integer',
              },
            },
            required: [
              'rating',
              'count',
              'percentage',
            ],
          },
        },
        costAnalysis: {
          type: 'object',
          properties: {
            totalEstimatedCost: {
              type: 'number',
            },
            avgCostPerRequest: {
              type: 'number',
            },
          },
          required: [
            'totalEstimatedCost',
            'avgCostPerRequest',
          ],
        },
        weeklyUsage: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              week: {
                type: 'string',
              },
              count: {
                type: 'integer',
              },
            },
            required: [
              'week',
              'count',
            ],
          },
        },
        longestPrompt: {
          type: 'object',
          properties: {
            originalLength: {
              type: 'integer',
            },
            enhancedLength: {
              type: 'integer',
            },
            ratio: {
              type: 'number',
            },
          },
          required: [
            'originalLength',
            'enhancedLength',
            'ratio',
          ],
        },
        shortestPrompt: {
          type: 'object',
          properties: {
            originalLength: {
              type: 'integer',
            },
            enhancedLength: {
              type: 'integer',
            },
            ratio: {
              type: 'number',
            },
          },
          required: [
            'originalLength',
            'enhancedLength',
            'ratio',
          ],
        },
        averagePromptLength: {
          type: 'object',
          properties: {
            original: {
              type: 'integer',
            },
            enhanced: {
              type: 'integer',
            },
          },
          required: [
            'original',
            'enhanced',
          ],
        },
        mostEfficientModel: {
          type: 'object',
          properties: {
            model: {
              type: 'string',
            },
            avgProcessingTime: {
              type: 'integer',
            },
            avgTokensPerMs: {
              type: 'number',
            },
          },
          required: [
            'model',
            'avgProcessingTime',
            'avgTokensPerMs',
          ],
        },
        preferredTimeSlots: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              hour: {
                type: 'integer',
              },
              count: {
                type: 'integer',
              },
              percentage: {
                type: 'integer',
              },
            },
            required: [
              'hour',
              'count',
              'percentage',
            ],
          },
        },
        enhancementTypeEfficiency: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: {
                type: 'string',
              },
              avgProcessingTime: {
                type: 'integer',
              },
              avgTokensUsed: {
                type: 'integer',
              },
              successRate: {
                type: 'integer',
              },
            },
            required: [
              'type',
              'avgProcessingTime',
              'avgTokensUsed',
              'successRate',
            ],
          },
        },
        metaFieldUsage: {
          type: 'object',
          properties: {
            withMeta: {
              type: 'integer',
            },
            withoutMeta: {
              type: 'integer',
            },
            percentage: {
              type: 'integer',
            },
          },
          required: [
            'withMeta',
            'withoutMeta',
            'percentage',
          ],
        },
      },
      required: [
        'totalItems',
        'totalTokensUsed',
        'averageProcessingTime',
        'mostUsedModel',
        'mostUsedEnhancementType',
        'providerUsage',
        'mostUsedRoles',
        'totalWords',
        'totalLines',
        'totalChars',
        'averageTokensUsed',
        'maxTokensUsed',
        'averageRating',
        'topRatedEntries',
        'averageTemperature',
        'temperatureDistribution',
        'enhancementFrequency',
        'modelPerformance',
        'roleModelDistribution',
        'dateRange',
        'peakUsageHour',
        'monthlyUsage',
        'averageMaxTokens',
        'minTokensUsed',
        'promptEnhancementRatio',
        'systemPromptUsage',
        'ratingDistribution',
        'costAnalysis',
        'weeklyUsage',
        'longestPrompt',
        'shortestPrompt',
        'averagePromptLength',
        'mostEfficientModel',
        'preferredTimeSlots',
        'enhancementTypeEfficiency',
        'metaFieldUsage',
      ],
    }),
  },
} as FastifySchema;
