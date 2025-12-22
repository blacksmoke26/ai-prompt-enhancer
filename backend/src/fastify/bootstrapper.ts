/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import Fastify, {type FastifyInstance} from 'fastify';
import env from '@junaidatari/env-binder';

// helpers
import AjvHelper from '~/helpers/AjvHelper';

// mappers
import decoratorsMapper from './decorators';
import controllersMapper from './controllers';

// plugins
import genericPlugin from './plugins/generic';
import pluginsMapper from './plugins';

// config
import {serverOptions} from './app.options';

/**
 * Asynchronously initializes and returns a fully configured Fastify application instance.
 * Registers plugins, controllers, and returns the instance for use in the application.
 * @returns {Promise<FastifyInstance>} A promise resolving to the initialized Fastify instance.
 * @example
 * const server = await appInstance();
 * await server.listen(3000);
 */
export async function appInstance(): Promise<FastifyInstance> {
  /**
   * Configures and initializes a Fastify application instance with validation, error handling, and plugin/controller registration.
   * This function sets up the server with Ajv-based schema validation and centralized error handling.
   */
  const fastify = Fastify(serverOptions) as FastifyInstance;

  /**
   * Configures Ajv as the schema validator for the Fastify instance.
   * Uses a custom `AjvHelper` to compile JSON schema validation rules.
   */
  fastify.setValidatorCompiler(({schema}) => {
    return AjvHelper.create().compile(schema);
  });

  /**
   * Global error handler for the Fastify server.
   * @param error - Error object.
   * @param request - Fastify request object.
   * @param reply - Fastify reply object.
   * @example
   * // Validation error response
   * { "error": "Validation Error", "details": [...] }
   * @developer-note Customize error messages based on environment for security.
   */
  fastify.setErrorHandler((error: any, _request, reply) => {
    fastify.log.error(error);

    if (error.validation) {
      reply.status(422).send(new Error(error.message));
      return;
    }

    reply.send(error);
  });

  await genericPlugin(fastify);

  await Promise.all(pluginsMapper.map(invoke => invoke(fastify)));

  // decorators
  await decoratorsMapper(fastify);

  // controllers
  await controllersMapper(fastify);

  return fastify;
}
