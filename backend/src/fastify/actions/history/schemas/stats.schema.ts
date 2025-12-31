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

export default {
  summary: 'Stats',
  description: 'Gets statistics about the history data',
  tags: ['History'],
  security: [],
  response: {
    400: schema400WithError('Failed to fetch history'),
    200: schema200WithData({
      type: 'object',
      description:
        'Represents comprehensive statistical data summarizing historical usage, performance, and behavior across operations, models, and user interactions.',
      properties: {
        totalItems: {
          type: 'number',
          description:
            'The total number of items processed in the tracked history.',
          examples: [1500],
        },
        totalTokensUsed: {
          type: 'number',
          description:
            'The cumulative number of tokens used across all requests.',
          examples: [120000],
        },
        averageProcessingTime: {
          type: 'number',
          description:
            'The average processing time (in milliseconds) per request.',
          examples: [1250],
        },
        mostUsedModel: {
          type: 'string',
          description:
            'The model that was used most frequently in the history.',
          examples: ['gpt-4'],
        },
        mostUsedEnhancementType: {
          type: 'string',
          description: 'The enhancement type that was used most frequently.',
          examples: ['grammar'],
        },
        providerUsage: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              provider: {
                type: 'string',
                description: 'The name or identifier of the service provider',
                examples: ['OpenAI'],
              },
              model: {
                type: 'string',
                description:
                  'The name or identifier of the specific model used by the provider',
                examples: ['gpt-4'],
              },
              count: {
                type: 'number',
                description:
                  'The total number of times this provider-model combination was used',
                examples: [800],
              },
            },
          },
          description:
            'Represents usage statistics for provider-model combinations',
          examples: [
            [
              {
                provider: 'ProviderA',
                model: 'ModelX',
                count: 800,
              },
            ],
          ],
        },
        mostUsedRoles: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              role: {
                type: 'string',
                description: 'The name or identifier of the role',
                examples: ['user'],
              },
              count: {
                type: 'number',
                description:
                  'The total number of times this role was used or encountered',
                examples: [150],
              },
            },
          },
          description: 'Represents a mapping of roles to their usage frequency',
          examples: [
            [
              {
                role: 'user',
                count: 150,
              },
            ],
          ],
        },
        totalWords: {
          type: 'number',
          description:
            'The total number of words processed across all requests.',
          examples: [45000],
        },
        totalLines: {
          type: 'number',
          description:
            'The total number of lines processed across all requests.',
          examples: [3000],
        },
        totalChars: {
          type: 'number',
          description:
            'The total number of characters processed across all requests.',
          examples: [250000],
        },
        averageTokensUsed: {
          type: 'number',
          description: 'The average number of tokens used per request.',
          examples: [80],
        },
        maxTokensUsed: {
          type: 'number',
          description: 'The maximum number of tokens used in a single request.',
          examples: [4096],
        },
        averageRating: {
          type: 'number',
          description:
            'The average rating assigned to processed items (e.g., 1–5 scale).',
          examples: [4.2],
        },
        topRatedEntries: {
          type: 'number',
          description:
            'The number of entries rated as "top-rated" (based on predefined criteria).',
          examples: [350],
        },
        averageTemperature: {
          type: 'number',
          description:
            'The average temperature value used in generation processes (controls randomness).',
          examples: [0.7],
        },
        temperatureDistribution: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              range: {
                type: 'string',
                description: 'A string representing the temperature range',
                examples: ['0.0–0.5'],
              },
              count: {
                type: 'number',
                description:
                  'The number of occurrences within the specified temperature range',
                examples: [120],
              },
            },
          },
          description:
            'Represents the distribution of temperature values across predefined ranges',
          examples: [
            [
              {
                range: '0.0–0.5',
                count: 120,
              },
            ],
          ],
        },
        enhancementFrequency: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: {
                type: 'string',
                description: 'The name or identifier of the enhancement type',
                examples: ['summarize'],
              },
              count: {
                type: 'number',
                description:
                  'The total number of times this enhancement type was used',
                examples: [150],
              },
              percentage: {
                type: 'number',
                description:
                  'The proportion of total enhancements that this type represents, as a decimal (0–1)',
                examples: [0.3],
              },
            },
          },
          description:
            'Represents the frequency of different enhancement types',
          examples: [
            [
              {
                type: 'summarize',
                count: 150,
                percentage: 0.3,
              },
            ],
          ],
        },
        modelPerformance: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              model: {
                type: 'string',
                description:
                  'The identifier or name of the model being evaluated',
                examples: ['ModelX'],
              },
              avgProcessingTime: {
                type: 'number',
                description:
                  'The average time (in milliseconds) required to process a request using this model',
                examples: [150],
              },
              totalUsage: {
                type: 'number',
                description: 'The total number of times this model was used',
                examples: [800],
              },
            },
          },
          description: 'Represents performance metrics for specific models',
          examples: [
            [
              {
                model: 'ModelX',
                avgProcessingTime: 150,
                totalUsage: 800,
              },
            ],
          ],
        },
        roleModelDistribution: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              role: {
                type: 'string',
                description:
                  'The role or user type associated with the model usage',
                examples: ['user'],
              },
              model: {
                type: 'string',
                description:
                  'The model name or identifier used by the specified role',
                examples: ['ModelX'],
              },
              count: {
                type: 'number',
                description:
                  'The total number of times this model was used by the specified role',
                examples: [120],
              },
            },
          },
          description: 'Represents the distribution of model usage by role',
          examples: [
            [
              {
                role: 'user',
                model: 'ModelX',
                count: 120,
              },
            ],
          ],
        },
        dateRange: {
          type: 'object',
          properties: {
            earliest: {
              type: 'string',
              format: 'date-time',
              description: 'The earliest (minimum) date in the dataset',
              examples: ['2023-01-01T00:00:00Z'],
            },
            latest: {
              type: 'string',
              format: 'date-time',
              description: 'The latest (maximum) date in the dataset',
              examples: ['2023-12-31T23:59:59Z'],
            },
          },
          description:
            'Represents the date range with the earliest and latest dates recorded',
          examples: [
            {
              earliest: '2023-01-01T00:00:00Z',
              latest: '2023-12-31T23:59:59Z',
            },
          ],
        },
        peakUsageHour: {
          type: 'object',
          properties: {
            hour: {
              type: 'number',
              minimum: 0,
              maximum: 23,
              description:
                'The hour of the day in 24-hour format (0–23) with the highest usage',
              examples: [15],
            },
            count: {
              type: 'number',
              description:
                'The total number of events, requests, or operations recorded during the peak hour',
              examples: [200],
            },
          },
          description: 'Represents the hour with the highest usage',
          examples: [
            {
              hour: 15,
              count: 200,
            },
          ],
        },
        monthlyUsage: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              month: {
                type: 'string',
                pattern: '^\\d{4}-(0[1-9]|1[0-2])$',
                description:
                  "The month identifier in ISO 8601 format (e.g., '2023-01')",
                examples: ['2023-01'],
              },
              count: {
                type: 'number',
                description:
                  'The total number of events or occurrences recorded during the specified month',
                examples: [150],
              },
            },
          },
          description: 'Represents monthly usage statistics',
          examples: [
            [
              {
                month: '2023-01',
                count: 150,
              },
            ],
          ],
        },
        averageMaxTokens: {
          type: 'number',
          description: 'The average maximum number of tokens used per request.',
          examples: [2048],
        },
        minTokensUsed: {
          type: 'number',
          description: 'The minimum number of tokens used in a single request.',
          examples: [10],
        },
        promptEnhancementRatio: {
          type: 'number',
          description:
            'The ratio of prompts that were enhanced compared to those that were not.',
          examples: [0.75],
        },
        systemPromptUsage: {
          type: 'object',
          properties: {
            used: {
              type: 'number',
              description: 'The total number of times a system prompt was used',
              examples: [450],
            },
            notUsed: {
              type: 'number',
              description:
                'The total number of times a system prompt was not used',
              examples: [550],
            },
            percentage: {
              type: 'number',
              description:
                'The proportion of total prompts that were used, represented as a decimal (0–1)',
              examples: [0.45],
            },
          },
          description: 'Represents statistics for the usage of system prompts',
          examples: [
            {
              used: 450,
              notUsed: 550,
              percentage: 0.45,
            },
          ],
        },
        ratingDistribution: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              rating: {
                type: 'number',
                minimum: 1,
                maximum: 5,
                description: 'The rating value (e.g., 1–5 for star ratings)',
                examples: [5],
              },
              count: {
                type: 'number',
                description:
                  'The number of times this rating was recorded or assigned',
                examples: [120],
              },
              percentage: {
                type: 'number',
                description:
                  'The proportion of total ratings that this entry represents, as a decimal (0–1)',
                examples: [0.24],
              },
            },
          },
          description: 'Represents the distribution of ratings',
          examples: [
            [
              {
                rating: 5,
                count: 120,
                percentage: 0.24,
              },
            ],
          ],
        },
        costAnalysis: {
          type: 'object',
          properties: {
            totalEstimatedCost: {
              type: 'number',
              description:
                'The total estimated cost accumulated across all requests or operations',
              examples: [250.75],
            },
            avgCostPerRequest: {
              type: 'number',
              description:
                'The average cost per individual request or operation',
              examples: [1.25],
            },
          },
          description: 'Represents cost-related statistics',
          examples: [
            {
              totalEstimatedCost: 250.75,
              avgCostPerRequest: 1.25,
            },
          ],
        },
        weeklyUsage: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              week: {
                type: 'string',
                pattern: '^\\d{4}-W(0[1-9]|[1-4][0-9]|5[0-3])$',
                description:
                  "The week identifier in ISO 8601 format (e.g., '2023-W01')",
                examples: ['2023-W01'],
              },
              count: {
                type: 'number',
                description:
                  'The total number of events or occurrences recorded during the specified week',
                examples: [150],
              },
            },
          },
          description: 'Represents weekly usage statistics',
          examples: [
            [
              {
                week: '2023-W01',
                count: 150,
              },
            ],
          ],
        },
        longestPrompt: {
          type: 'object',
          properties: {
            originalLength: {
              type: 'number',
              description: 'The length of the original longest prompt',
              examples: [500],
            },
            enhancedLength: {
              type: 'number',
              description:
                'The length of the enhanced longest prompt after processing',
              examples: [600],
            },
            ratio: {
              type: 'number',
              description: 'The ratio of original length to enhanced length',
              examples: [0.83],
            },
          },
          description: 'Represents statistics for the longest prompt',
          examples: [
            {
              originalLength: 500,
              enhancedLength: 600,
              ratio: 0.83,
            },
          ],
        },
        shortestPrompt: {
          type: 'object',
          properties: {
            originalLength: {
              type: 'number',
              description: 'The length of the original shortest prompt',
              examples: [50],
            },
            enhancedLength: {
              type: 'number',
              description:
                'The length of the enhanced shortest prompt after processing',
              examples: [60],
            },
            ratio: {
              type: 'number',
              description: 'The ratio of original length to enhanced length',
              examples: [0.83],
            },
          },
          description: 'Represents statistics for the shortest prompt',
          examples: [
            {
              originalLength: 50,
              enhancedLength: 60,
              ratio: 0.83,
            },
          ],
        },
        averagePromptLength: {
          type: 'object',
          properties: {
            original: {
              type: 'number',
              description: 'The length of the original content',
              examples: [150],
            },
            enhanced: {
              type: 'number',
              description:
                'The length of the enhanced content after processing',
              examples: [200],
            },
          },
          description:
            'Represents the lengths of original and enhanced content',
          examples: [
            {
              original: 150,
              enhanced: 200,
            },
          ],
        },
        mostEfficientModel: {
          type: 'object',
          properties: {
            model: {
              type: 'string',
              description:
                'The identifier or name of the model being evaluated',
              examples: ['ModelX'],
            },
            avgProcessingTime: {
              type: 'number',
              description:
                'The average time (in milliseconds) required to process a request using this model',
              examples: [150],
            },
            avgTokensPerMs: {
              type: 'number',
              description:
                'The average number of tokens processed per millisecond',
              examples: [2.5],
            },
          },
          description: 'Represents performance metrics for a specific model',
          examples: [
            {
              model: 'ModelX',
              avgProcessingTime: 150,
              avgTokensPerMs: 2.5,
            },
          ],
        },
        preferredTimeSlots: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              hour: {
                type: 'number',
                minimum: 0,
                maximum: 23,
                description: 'The hour of the day in 24-hour format (0–23)',
                examples: [15],
              },
              count: {
                type: 'number',
                description:
                  'The number of occurrences or events recorded during this hour',
                examples: [200],
              },
              percentage: {
                type: 'number',
                description:
                  'The proportion of total occurrences during this hour, represented as a decimal (0–1)',
                examples: [0.35],
              },
            },
          },
          description: 'Represents statistics for a specific hour',
          examples: [
            [
              {
                hour: 15,
                count: 200,
                percentage: 0.35,
              },
            ],
          ],
        },
        enhancementTypeEfficiency: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: {
                type: 'string',
                description: 'The name or identifier of the enhancement type',
                examples: ['summarize'],
              },
              avgProcessingTime: {
                type: 'number',
                description:
                  'The average processing time (in milliseconds) for this enhancement type',
                examples: [120],
              },
              avgTokensUsed: {
                type: 'number',
                description:
                  'The average number of tokens used per operation for this enhancement type',
                examples: [50],
              },
              successRate: {
                type: 'number',
                description:
                  'The success rate of operations for this enhancement type, represented as a decimal (0–1)',
                examples: [0.95],
              },
            },
          },
          description:
            'Represents efficiency metrics for a specific enhancement type',
          examples: [
            [
              {
                type: 'summarize',
                avgProcessingTime: 120,
                avgTokensUsed: 50,
                successRate: 0.95,
              },
            ],
          ],
        },
        metaFieldUsage: {
          type: 'object',
          properties: {
            withMeta: {
              type: 'number',
              description:
                'The total number of prompts that included metadata fields',
              examples: [450],
            },
            withoutMeta: {
              type: 'number',
              description:
                'The total number of prompts that did not include metadata fields',
              examples: [550],
            },
            percentage: {
              type: 'number',
              description:
                'The proportion of prompts that included metadata fields, represented as a decimal (0–1)',
              examples: [0.45],
            },
          },
          description: 'Represents statistics for the usage of metadata fields',
          examples: [
            {
              withMeta: 450,
              withoutMeta: 550,
              percentage: 0.45,
            },
          ],
        },
        targetAudienceUsage: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              audience: {
                type: 'string',
                description: 'The name or identifier of the target audience',
                examples: ['technical-experts'],
              },
              count: {
                type: 'number',
                description: 'The total number of times this audience was used',
                examples: [120],
              },
              percentage: {
                type: 'number',
                description:
                  'The proportion of total requests that used this audience, represented as a percentage (0–100)',
                examples: [24.0],
              },
            },
          },
          description: 'Represents the usage statistics for target audiences',
          examples: [
            [
              {
                audience: 'technical-experts',
                count: 120,
                percentage: 24.0,
              },
            ],
          ],
        },
        toneUsage: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              tone: {
                type: 'string',
                description: 'The name or identifier of the tone',
                examples: ['professional'],
              },
              count: {
                type: 'number',
                description: 'The total number of times this tone was used',
                examples: [150],
              },
              percentage: {
                type: 'number',
                description:
                  'The proportion of total requests that used this tone, represented as a percentage (0–100)',
                examples: [30.0],
              },
            },
          },
          description: 'Represents the usage statistics for tone preferences',
          examples: [
            [
              {
                tone: 'professional',
                count: 150,
                percentage: 30.0,
              },
            ],
          ],
        },
        responseLengthUsage: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              length: {
                type: 'string',
                description:
                  'The category or identifier of the response length',
                examples: ['short'],
              },
              count: {
                type: 'number',
                description: 'The total number of times this length was used',
                examples: [80],
              },
              percentage: {
                type: 'number',
                description:
                  'The proportion of total requests that used this length, represented as a percentage (0–100)',
                examples: [16.0],
              },
            },
          },
          description: 'Represents the usage statistics for response lengths',
          examples: [
            [
              {
                length: 'short',
                count: 80,
                percentage: 16.0,
              },
            ],
          ],
        },
        formatUsage: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              format: {
                type: 'string',
                description: 'The name or identifier of the output format',
                examples: ['markdown'],
              },
              count: {
                type: 'number',
                description: 'The total number of times this format was used',
                examples: [200],
              },
              percentage: {
                type: 'number',
                description:
                  'The proportion of total requests that used this format, represented as a percentage (0–100)',
                examples: [40.0],
              },
            },
          },
          description: 'Represents the usage statistics for output formats',
          examples: [
            [
              {
                format: 'markdown',
                count: 200,
                percentage: 40.0,
              },
            ],
          ],
        },
        processingTimePercentiles: {
          type: 'object',
          properties: {
            p50: {
              type: 'number',
              description: 'The 50th percentile (median) of processing times',
              examples: [150],
            },
            p75: {
              type: 'number',
              description: 'The 75th percentile of processing times',
              examples: [200],
            },
            p90: {
              type: 'number',
              description: 'The 90th percentile of processing times',
              examples: [250],
            },
            p95: {
              type: 'number',
              description: 'The 95th percentile of processing times',
              examples: [300],
            },
            p99: {
              type: 'number',
              description: 'The 99th percentile of processing times',
              examples: [350],
            },
          },
          description: 'A structure containing processing time percentiles',
        },
        tokenUsagePercentiles: {
          type: 'object',
          properties: {
            p50: {
              type: 'number',
              description: 'The 50th percentile (median) of token usage',
              examples: [100],
            },
            p75: {
              type: 'number',
              description: 'The 75th percentile of token usage',
              examples: [150],
            },
            p90: {
              type: 'number',
              description: 'The 90th percentile of token usage',
              examples: [200],
            },
            p95: {
              type: 'number',
              description: 'The 95th percentile of token usage',
              examples: [250],
            },
            p99: {
              type: 'number',
              description: 'The 99th percentile of token usage',
              examples: [300],
            },
          },
          description: 'Represents token usage percentiles',
        },
        errorStatistics: {
          type: 'object',
          properties: {
            totalErrors: {
              type: 'number',
              description: 'Total number of errors recorded',
              examples: [150],
            },
            errorRate: {
              type: 'number',
              description:
                'The proportion of errors relative to total requests or operations',
              examples: [0.05],
            },
            errorTypes: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  type: {
                    type: 'string',
                    description: 'The name or category of the error',
                    examples: ['validation'],
                  },
                  count: {
                    type: 'number',
                    description:
                      'The number of occurrences for this error type',
                    examples: [80],
                  },
                  percentage: {
                    type: 'number',
                    description:
                      'The percentage of total errors this type represents',
                    examples: [53.3],
                  },
                },
              },
              description: 'An array of error type statistics',
            },
          },
          description: 'Tracks statistics related to errors',
        },
        userActivity: {
          type: 'object',
          properties: {
            dailyActiveUsers: {
              type: 'number',
              description: 'The number of unique users active on a daily basis',
              examples: [1000],
            },
            weeklyActiveUsers: {
              type: 'number',
              description:
                'The number of unique users active on a weekly basis',
              examples: [8000],
            },
            monthlyActiveUsers: {
              type: 'number',
              description:
                'The number of unique users active on a monthly basis',
              examples: [30000],
            },
            retentionRate: {
              type: 'number',
              description:
                'The proportion of users who continue to engage with the system',
              examples: [0.85],
            },
          },
          description: 'Tracks user activity metrics',
        },
        performanceTrends: {
          type: 'object',
          properties: {
            processingTime: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  date: {
                    type: 'string',
                    pattern: '^\\d{4}-\\d{2}-\\d{2}$',
                    description: 'The date associated with this data point',
                    examples: ['2025-04-01'],
                  },
                  value: {
                    type: 'number',
                    description:
                      'The numeric value representing the metric at the given date',
                    examples: [200],
                  },
                },
              },
              description:
                'An array of data points representing processing time trends over time',
            },
            tokenUsage: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  date: {
                    type: 'string',
                    pattern: '^\\d{4}-\\d{2}-\\d{2}$',
                    description: 'The date associated with this data point',
                    examples: ['2025-04-01'],
                  },
                  value: {
                    type: 'number',
                    description:
                      'The numeric value representing the metric at the given date',
                    examples: [1000],
                  },
                },
              },
              description:
                'An array of data points representing token usage trends over time',
            },
            errorRate: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  date: {
                    type: 'string',
                    pattern: '^\\d{4}-\\d{2}-\\d{2}$',
                    description: 'The date associated with this data point',
                    examples: ['2025-04-01'],
                  },
                  value: {
                    type: 'number',
                    description:
                      'The numeric value representing the metric at the given date',
                    examples: [0.05],
                  },
                },
              },
              description:
                'An array of data points representing error rate trends over time',
            },
          },
          description: 'Tracks performance trends over time',
        },
        modelMetrics: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              model: {
                type: 'string',
                description: 'The name of the model being evaluated',
                examples: ['gpt-4'],
              },
              accuracy: {
                type: 'number',
                description:
                  "The accuracy of the model's predictions or outputs",
                examples: [0.95],
              },
              costEfficiency: {
                type: 'number',
                description:
                  'A measure of how efficiently the model uses resources',
                examples: [85],
              },
              responseQuality: {
                type: 'number',
                description: "The quality of the model's responses or outputs",
                examples: [0.92],
              },
              successRate: {
                type: 'number',
                description:
                  'The proportion of successful requests or operations',
                examples: [0.98],
              },
            },
          },
          description: 'Metrics related to a specific AI model',
        },
        enhancementMetrics: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: {
                type: 'string',
                description: 'The type or name of the enhancement',
                examples: ['text_summary'],
              },
              successRate: {
                type: 'number',
                description:
                  'The proportion of successful enhancement requests',
                examples: [0.99],
              },
              avgQualityScore: {
                type: 'number',
                description: 'The average quality score for the enhancement',
                examples: [88],
              },
              popularityTrend: {
                type: 'string',
                enum: ['increasing', 'decreasing', 'stable'],
                description: 'The trend in popularity of the enhancement',
                examples: ['increasing'],
              },
              avgProcessingTime: {
                type: 'number',
                description:
                  'The average time taken to process the enhancement',
                examples: [150],
              },
              avgTokenUsage: {
                type: 'number',
                description:
                  'The average number of tokens used by the enhancement',
                examples: [200],
              },
            },
          },
          description: 'Metrics related to an enhancement',
        },
        contentComplexity: {
          type: 'object',
          properties: {
            avgComplexityScore: {
              type: 'number',
              description:
                'The average complexity score across all content items',
              examples: [75],
            },
            complexityDistribution: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  score: {
                    type: 'number',
                    description: 'The complexity score for this range',
                    examples: [75],
                  },
                  count: {
                    type: 'number',
                    description:
                      'The number of content items with this complexity score',
                    examples: [400],
                  },
                  percentage: {
                    type: 'number',
                    description:
                      'The percentage of total content items with this complexity score',
                    examples: [40],
                  },
                },
              },
              description: 'An array of complexity score distributions',
            },
            complexityTimeCorrelation: {
              type: 'number',
              description:
                'The correlation between content complexity and processing time',
              examples: [0.65],
            },
            complexityTokenCorrelation: {
              type: 'number',
              description:
                'The correlation between content complexity and token usage',
              examples: [0.35],
            },
          },
          description: 'Metrics related to content complexity',
        },
        systemHealth: {
          type: 'object',
          properties: {
            avgSystemLoad: {
              type: 'number',
              description: 'The average system load over a defined period',
              examples: [70],
            },
            peakSystemLoad: {
              type: 'number',
              description: 'The highest system load recorded',
              examples: [95],
            },
            avgResourceUtilization: {
              type: 'number',
              description:
                'The average resource utilization (e.g., CPU, memory)',
              examples: [80],
            },
            uptime: {
              type: 'number',
              description: 'The total uptime of the system in seconds',
              examples: [1209600],
            },
            avgResponseTime: {
              type: 'number',
              description: 'The average response time for system operations',
              examples: [200],
            },
          },
          description: 'Metrics related to system health',
        },
        userPreferences: {
          type: 'object',
          properties: {
            modelPreference: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  model: {
                    type: 'string',
                    description:
                      'The model or parameter type associated with the preference trend',
                    examples: ['gpt-4'],
                  },
                  trend: {
                    type: 'string',
                    enum: ['increasing', 'decreasing', 'stable'],
                    description: 'The direction of the preference trend',
                    examples: ['increasing'],
                  },
                  changeRate: {
                    type: 'number',
                    description:
                      'The rate of change in preference, measured as a percentage or absolute value',
                    examples: [15.2],
                  },
                },
              },
              description: 'An array of preference trends for specific models',
            },
            enhancementPreference: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  type: {
                    type: 'string',
                    description:
                      'The type or parameter being tracked for preference trends',
                    examples: ['text_summary'],
                  },
                  trend: {
                    type: 'string',
                    enum: ['increasing', 'decreasing', 'stable'],
                    description: 'The direction of the preference trend',
                    examples: ['increasing'],
                  },
                  changeRate: {
                    type: 'number',
                    description:
                      'The rate of change in preference, measured as a percentage or absolute value',
                    examples: [10],
                  },
                },
              },
              description:
                'An array of preference trends for specific enhancements',
            },
            parameterPreference: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  parameter: {
                    type: 'string',
                    description: 'The name of the parameter being tracked',
                    examples: ['max_tokens'],
                  },
                  trend: {
                    type: 'string',
                    enum: ['increasing', 'decreasing', 'stable'],
                    description: 'The direction of the preference trend',
                    examples: ['decreasing'],
                  },
                  changeRate: {
                    type: 'number',
                    description:
                      'The rate of change in preference, measured as a percentage or absolute value',
                    examples: [-5.3],
                  },
                },
              },
              description:
                'An array of preference trends for specific parameters',
            },
          },
          description:
            'Tracks user preferences for models, enhancements, and parameters',
        },
        costBreakdown: {
          type: 'object',
          properties: {
            modelCosts: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  model: {
                    type: 'string',
                    description: 'The name of the AI model',
                    examples: ['gpt-4'],
                  },
                  totalCost: {
                    type: 'number',
                    description: 'The total cost incurred for using the model',
                    examples: [500],
                  },
                  avgCostPerRequest: {
                    type: 'number',
                    description: 'The average cost per request for the model',
                    examples: [2.5],
                  },
                  percentage: {
                    type: 'number',
                    description:
                      'The percentage of total cost attributed to this model',
                    examples: [40],
                  },
                },
              },
              description: 'An array of cost metrics for different AI models',
            },
            enhancementCosts: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  type: {
                    type: 'string',
                    description: 'The type of enhancement being tracked',
                    examples: ['text_summary'],
                  },
                  totalCost: {
                    type: 'number',
                    description:
                      'The total cost incurred for using the enhancement',
                    examples: [150],
                  },
                  avgCostPerRequest: {
                    type: 'number',
                    description:
                      'The average cost per request for the enhancement',
                    examples: [0.5],
                  },
                  percentage: {
                    type: 'number',
                    description:
                      'The percentage of total cost attributed to this enhancement',
                    examples: [10],
                  },
                },
              },
              description:
                'An array of cost metrics for different enhancement types',
            },
            costEfficiency: {
              type: 'object',
              properties: {
                mostEfficientModel: {
                  type: 'string',
                  description: 'The model with the highest cost efficiency',
                  examples: ['gpt-3.5-turbo'],
                },
                mostEfficientEnhancement: {
                  type: 'string',
                  description:
                    'The enhancement with the highest cost efficiency',
                  examples: ['text_summary'],
                },
                efficiencyScore: {
                  type: 'number',
                  description:
                    'A numeric score representing overall cost efficiency',
                  examples: [95],
                },
              },
              description: 'Metrics representing overall cost efficiency',
            },
          },
          description:
            'Provides a detailed breakdown of costs associated with different models and enhancements',
        },
        seasonalPatterns: {
          type: 'object',
          properties: {
            seasonalTrends: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  season: {
                    type: 'string',
                    enum: ['winter', 'spring', 'summer', 'fall'],
                    description: 'The season associated with the trend',
                    examples: ['summer'],
                  },
                  usage: {
                    type: 'number',
                    description: 'The total usage recorded during the season',
                    examples: [7500],
                  },
                  changeRate: {
                    type: 'number',
                    description:
                      'The rate of change in usage compared to the previous season',
                    examples: [12.5],
                  },
                },
              },
              description:
                'An array of seasonal trends with usage data and change rates',
            },
            peakSeason: {
              type: 'string',
              enum: ['winter', 'spring', 'summer', 'fall'],
              description: 'The season with the highest usage or preference',
              examples: ['summer'],
            },
            lowestSeason: {
              type: 'string',
              enum: ['winter', 'spring', 'summer', 'fall'],
              description: 'The season with the lowest usage or preference',
              examples: ['winter'],
            },
          },
          description: 'Represents seasonal trends in data usage or preference',
        },
        geographicDistribution: {
          type: 'object',
          properties: {
            regions: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  region: {
                    type: 'string',
                    description: 'The name of the geographic region',
                    examples: ['Asia'],
                  },
                  usage: {
                    type: 'number',
                    description: 'The total usage recorded in the region',
                    examples: [6000],
                  },
                  percentage: {
                    type: 'number',
                    description:
                      'The percentage of total usage attributed to this region',
                    examples: [40],
                  },
                },
              },
              description: 'An array of region-specific usage data',
            },
            mostActiveRegion: {
              type: 'string',
              description: 'The region with the highest usage',
              examples: ['Asia'],
            },
            leastActiveRegion: {
              type: 'string',
              description: 'The region with the lowest usage',
              examples: ['Europe'],
            },
          },
          description:
            'Describes the geographic distribution of usage across different regions',
        },
      },
    }),
  },
} as FastifySchema;
