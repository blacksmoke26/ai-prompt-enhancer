/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// schemas
import schema400WithError from '~/fastify/schemas/generic/400.schema';
import schema200WithData from '~/fastify/schemas/generic/200-success-with-data.schema';

export default {
  summary: 'Minimal Stats',
  description: 'Gets minimal statistics about the history data',
  tags: ['History'],
  security: [],
  response: {
    400: schema400WithError('Failed to fetch history'),
    200: schema200WithData({
      title: 'Analytics Data Schema',
      description:
        'Schema representing analytics statistics and chart data for model usage and ratings.',
      type: 'object',
      properties: {
        stats: {
          type: 'object',
          description:
            'Statistical summary of prompts, tokens, ratings, and active conversations.',
          properties: {
            totalPrompts: {
              type: 'integer',
              description: 'Total number of prompts processed.',
              examples: [54],
              minimum: 0,
            },
            totalTokens: {
              type: 'integer',
              description:
                'Total number of tokens consumed across all prompts.',
              examples: [37122],
              minimum: 0,
            },
            avgRating: {
              type: 'number',
              description:
                'Average rating given by users, typically between 0 and 5.',
              examples: [0.19],
              minimum: 0,
              maximum: 5,
            },
            avgProcessingTime: {
              type: 'number',
              description:
                'Average processing time per prompt in milliseconds.',
              examples: [5684.93],
              minimum: 0,
            },
            topModel: {
              type: 'string',
              description: 'Most frequently used model identifier.',
              examples: ['deepseek-r1:1.5b'],
            },
            activeConvos: {
              type: 'integer',
              description: 'Number of currently active conversations.',
              examples: [0],
              minimum: 0,
            },
          },
          required: [
            'totalPrompts',
            'totalTokens',
            'avgRating',
            'avgProcessingTime',
            'topModel',
            'activeConvos',
          ],
        },
        charts: {
          type: 'object',
          description: 'Chart data for trends, bar charts, and pie charts.',
          properties: {
            trendData: {
              type: 'array',
              description: 'Daily trend data showing tokens and counts.',
              items: {
                type: 'object',
                properties: {
                  date: {
                    type: 'string',
                    format: 'date',
                    description: 'Date of the trend data in YYYY-MM-DD format.',
                    examples: ['2026-01-09'],
                  },
                  tokens: {
                    type: 'integer',
                    description: 'Number of tokens used on this date.',
                    examples: [1174],
                    minimum: 0,
                  },
                  count: {
                    type: 'integer',
                    description: 'Number of prompts processed on this date.',
                    examples: [2],
                    minimum: 0,
                  },
                },
                required: ['date', 'tokens', 'count'],
              },
              examples: [
                [
                  { date: '2026-01-03', tokens: 0, count: 0 },
                  { date: '2026-01-09', tokens: 1174, count: 2 },
                ],
              ],
            },
            barData: {
              type: 'array',
              description: 'Bar chart data showing model usage counts.',
              items: {
                type: 'object',
                properties: {
                  model: {
                    type: 'string',
                    description: 'Model identifier.',
                    examples: ['deepseek-r1:1.5b'],
                  },
                  count: {
                    type: 'integer',
                    description: 'Number of times the model was used.',
                    examples: [48],
                    minimum: 0,
                  },
                },
                required: ['model', 'count'],
              },
              examples: [
                [
                  { model: 'deepseek-r1:1.5b', count: 48 },
                  { model: 'qwen3:14b', count: 5 },
                ],
              ],
            },
            pieData: {
              type: 'array',
              description: 'Pie chart data showing distribution of ratings.',
              items: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    description: 'Rating category label.',
                    examples: ['5 Star'],
                  },
                  value: {
                    type: 'integer',
                    description: 'Number of ratings in this category.',
                    examples: [2],
                    minimum: 0,
                  },
                },
                required: ['name', 'value'],
              },
              examples: [
                [
                  { name: '1 Star', value: 0 },
                  { name: '2 Star', value: 0 },
                  { name: '3 Star', value: 0 },
                  { name: '4 Star', value: 0 },
                  { name: '5 Star', value: 2 },
                ],
              ],
            },
          },
          required: ['trendData', 'barData', 'pieData'],
        },
      },
      required: ['stats', 'charts'],
    }),
  },
};
