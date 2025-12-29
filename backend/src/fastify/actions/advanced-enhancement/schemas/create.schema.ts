/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// schemas
import schema400WithError from '~/fastify/schemas/generic/400.schema';
import schema200WithData from '~/fastify/schemas/generic/200-success-with-data.schema';

// libs
import { fullPropertiesSchema, propertiesSchema } from './libs';

// types
import type { FastifySchema } from 'fastify';
import type { JSONSchema7 } from 'json-schema';

export default {
  summary: 'Create',
  description: 'Creates a new enhancement type with advanced features',
  tags: ['Advanced Enhancement Types'],
  body: {
    type: 'object',
    properties: propertiesSchema,
    required: ['name', 'description', 'systemPrompt', 'category'],
  } as JSONSchema7,
  security: [],
  response: {
    400: schema400WithError('Failed to create enhancement type'),
    200: schema200WithData({
      type: 'object',
      properties: fullPropertiesSchema,
      required: ['id', 'name', 'description', 'systemPrompt', 'category'],
    }),
  },
} as FastifySchema;
