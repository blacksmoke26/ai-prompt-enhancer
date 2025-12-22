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

// constants
import {getConfigJsonSchema, getConfigKeys} from '~/constants/configuration';
import {getProvidersJsonSchema, getProvidersName} from '~/constants/providers';

// types
import type {FastifySchema} from 'fastify';
import type {JSONSchema7} from 'json-schema';

export default {
  summary: 'Import',
  description: 'Imports configuration from a JSON string',
  tags: ['Config'],
  security: [],
  body: {
    type: 'object',
    properties: {
      configJson: {
        type: 'string',
      },
    },
    required: ['configJson'],
  } as JSONSchema7,
  response: {
    400: schema400WithError('configJson is required'),
    422: schema422WithError('Failed to import config'),
    200: schema200WithData(merge.all([
      getConfigJsonSchema(),
      getProvidersJsonSchema(),
      {
        required: [...getConfigKeys(), ...getProvidersName()],
      },
    ])),
  },
} as FastifySchema;
