/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import env from '@junaidatari/env-binder';

// types
import { FastifyListenOptions, FastifyServerOptions } from 'fastify';

/**
 * Fastify server options.
 */
export const serverOptions: FastifyServerOptions = {
  logger: env.getBool('LOGGING_FASTIFY_SERVER', false),
  requestTimeout: 600000,
  routerOptions: {
    ignoreTrailingSlash: true,
  },
};

/**
 * Fastify server listening options.
 */
export const listenOptions: FastifyListenOptions = {
  host: env.getString('HOST', '0.0.0.0'),
  port: env.getInteger('PORT', 3000),
};
