/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// actions
import enhanceAction from '~/fastify/actions/prompt/enhance';
import modelsAction from '~/fastify/actions/prompt/models';
import providersAction from '~/fastify/actions/prompt/providers';
import streamAction from '~/fastify/actions/prompt/stream';
import testAction from '~/fastify/actions/prompt/test';

// types
import type {FastifyInstance, FastifyPluginOptions, HookHandlerDoneFunction} from 'fastify';

export default (app: FastifyInstance, options: FastifyPluginOptions, done: HookHandlerDoneFunction) => {
  [
    enhanceAction,
    modelsAction,
    providersAction,
    streamAction,
    testAction,
  ].map((action) => action(app));
  done();
};

