/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// schemas
import schema400WithError from '~/fastify/schemas/generic/400.schema';
import schema404WithError from '~/fastify/schemas/generic/404.schema';
import schema200WithData from '~/fastify/schemas/generic/200-success-with-data.schema';

// types
import type { FastifySchema } from 'fastify';
import type { JSONSchema7 } from 'json-schema';

export default {
  summary: 'List By Role',
  description: 'Retrieves history items based on the role',
  tags: ['History'],
  params: {
    type: 'object',
    properties: {
      role: {
        type: 'string',
        examples: ['general'],
      },
    },
    required: ['role'],
  } as JSONSchema7,
  security: [],
  response: {
    400: schema400WithError('Failed to fetch history'),
    404: schema404WithError('Role not found'),
    200: schema200WithData({
      type: 'array',
      items: {
        properties: {
          id: {
            type: 'integer',
            description: 'Unique identifier of the record.',
            examples: [39],
          },
          providerId: {
            type: 'integer',
            description: 'Associated provider ID.',
            examples: [1],
          },
          aiPrompt: {
            type: 'string',
            description: 'The ai prompt used to generate the response',
            examples: ['....'],
          },
          originalPrompt: {
            type: 'string',
            description: 'Original user-provided prompt.',
            examples: ['Page has been blocked by CORS policy...'],
          },
          enhancedPrompt: {
            type: 'string',
            description: 'Enhanced version of the prompt.',
            examples: ['```markdown\n{{enhanced prompt}}...'],
          },
          model: {
            type: 'string',
            description: 'Model used for generation.',
            examples: ['deepseek-r1:1.5b'],
          },
          enhancementType: {
            type: 'string',
            description: 'Type of enhancement applied.',
            examples: ['enhance'],
          },
          userRole: {
            type: 'string',
            description: 'Role of the user.',
            examples: ['general'],
          },
          systemPrompt: {
            type: 'string',
            description: 'System-level prompt used.',
            examples: ['You are a helpful AI assistant...'],
          },
          tokensUsed: {
            type: 'integer',
            description: 'Number of tokens consumed.',
            examples: [567],
          },
          processingTime: {
            type: 'integer',
            description: 'Processing time in milliseconds.',
            examples: [2451],
          },
          temperature: {
            type: 'number',
            description: 'Temperature setting for generation.',
            examples: [0.83],
          },
          maxTokens: {
            type: 'integer',
            description: 'Maximum tokens allowed.',
            examples: [5000],
          },
          rating: {
            type: 'integer',
            description: 'Rating assigned to the output.',
            examples: [0],
          },
          notes: {
            type: 'string',
            description: 'Additional notes.',
            examples: ['Some notes here'],
          },
          targetAudience: {
            type: 'string',
            description: 'Target audience for the output.',
            examples: ['developers'],
          },
          tone: {
            type: 'string',
            description: 'Desired tone of the output.',
            examples: ['professional'],
          },
          responseLength: {
            type: 'string',
            description: 'Preferred response length.',
            examples: ['short'],
          },
          format: {
            type: 'string',
            description: 'Output format.',
            examples: ['markdown'],
          },
          topP: {
            type: 'number',
            description: 'Top-P sampling value.',
            examples: [0.9],
          },
          topK: {
            type: 'number',
            description: 'Top-K sampling value.',
            examples: [40],
          },
          stopSequences: {
            type: 'array',
            items: { type: 'string' },
            description: 'Stop sequences used.',
            examples: [['\n']],
          },
          frequencyPenalty: {
            type: 'number',
            description: 'Frequency penalty applied.',
            examples: [0.5],
          },
          presencePenalty: {
            type: 'number',
            description: 'Presence penalty applied.',
            examples: [0.5],
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Creation timestamp.',
            examples: ['2025-12-24 17:18:10.661 +00:00'],
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Last update timestamp.',
            examples: ['2025-12-24 17:18:10.661 +00:00'],
          },
        },
      },
      additionalProperties: true,
    } as JSONSchema7),
  },
} as FastifySchema;
