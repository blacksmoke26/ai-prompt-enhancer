/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// actions
import healthAction from '~/fastify/actions/main/health';
import testProviderAction from '~/fastify/actions/main/test-provider';

// types
import type {FastifyInstance, FastifyPluginOptions, HookHandlerDoneFunction} from 'fastify';

export default (app: FastifyInstance, options: FastifyPluginOptions, done: HookHandlerDoneFunction) => {
  [
    healthAction,
    testProviderAction,
  ].map((action) => action(app));
  done();
};
