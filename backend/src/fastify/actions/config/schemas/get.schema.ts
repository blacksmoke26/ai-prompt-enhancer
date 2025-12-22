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
import {getConfigJsonSchema, getConfigKeys} from '~/constants/configuration';
import {getProvidersJsonSchema, getProvidersName} from '~/constants/providers';

// types
import type {FastifySchema} from 'fastify';

export default {
  summary: 'Get',
  description: 'Retrieves the current application configuration',
  tags: ['Config'],
  security: [],
  response: {
    400: schema400WithError('Failed to fetch config'),
    200: schema200WithData(merge.all([
      getConfigJsonSchema(),
      getProvidersJsonSchema(),
      {
        required: [...getConfigKeys(), ...getProvidersName()],
      },
    ])),
  },
} as FastifySchema;
