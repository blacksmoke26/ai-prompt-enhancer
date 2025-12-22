/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import merge from 'deepmerge';

// schemas
import schema400WithError from '~/fastify/schemas/generic/400.schema';
import schema422WithError from '~/fastify/schemas/generic/422.schema';
import schema200WithData from '~/fastify/schemas/generic/200-success-with-data.schema';
import schema404WithError from '~/fastify/schemas/generic/404.schema';

// constants
import {getConfigJsonSchema, getConfigKeys} from '~/constants/configuration';
import {getProvidersJsonSchema, getProvidersName} from '~/constants/providers';

// types
import type {FastifySchema} from 'fastify';
import type {JSONSchema7} from 'json-schema';

// The complete schema
const configSchema = merge.all([
  getConfigJsonSchema(),
  getProvidersJsonSchema(),
  {
    required: [...getConfigKeys(), ...getProvidersName()],
  },
]);

export default {
  summary: 'Update',
  description: 'Updates a history item',
  tags: ['History'],
  security: [],
  params: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
    },
    required: ['id'],
  },
  body: {
    type: 'object',
    properties: {
      rating: {
        type: 'integer',
        minimum: 0,
        maximum: 5,
      },
      notes: {
        type: 'string',
        maxLength: 2000,
      },
    },
  } as JSONSchema7,
  response: {
    400: schema400WithError('Failed to update history item'),
    404: schema404WithError('History item not found'),
    422: schema422WithError('Validation failed'),
    200: schema200WithData(configSchema),
  },
} as FastifySchema;
