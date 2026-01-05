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
import { getEnhancementTypesJsonSchema } from '~/constants/enhancement-types';

export default {
  summary: 'List',
  description: 'Retrieves all available enhancement types for prompts',
  tags: ['Enhancement Types'],
  security: [],
  response: {
    400: schema400WithError('Failed to fetch enhancement types'),
    200: schema200WithData(getEnhancementTypesJsonSchema()),
  },
} as FastifySchema;
