/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import merge from 'deepmerge';

// schemas
import schema400WithError from '~/fastify/schemas/generic/400.schema';
import schema200WithData from '~/fastify/schemas/generic/200-success-with-data.schema';

// constants
import { getConfigJsonSchema } from '~/constants/configuration';
import { getProvidersJsonSchema } from '~/constants/providers';

// types
import type { FastifySchema } from 'fastify';
import type { JSONSchema7 } from 'json-schema';

// The complete schema
const configSchema = merge.all([
  getConfigJsonSchema(),
  getProvidersJsonSchema(),
]);

export default {
  summary: 'Update',
  description: 'Updates the application configuration with validated changes',
  tags: ['Config'],
  security: [],
  body: {
    type: 'object',
    ...configSchema,
  } as JSONSchema7,
  response: {
    400: schema400WithError('Failed to update config'),
    200: schema200WithData(configSchema),
  },
} as FastifySchema;
