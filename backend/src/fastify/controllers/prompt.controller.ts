/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// actions
import enhanceAction from '~/fastify/actions/prompt/enhance';
import modelsAction from '~/fastify/actions/prompt/models';
import providersAction from '~/fastify/actions/prompt/providers';
import testAction from '~/fastify/actions/prompt/test';
import tonesAction from '~/fastify/actions/prompt/tones';
import responseLengthAction from '~/fastify/actions/prompt/response-length';

// types
import type {FastifyInstance, FastifyPluginOptions, HookHandlerDoneFunction} from 'fastify';

export default (app: FastifyInstance, options: FastifyPluginOptions, done: HookHandlerDoneFunction) => {
  [
    enhanceAction,
    modelsAction,
    providersAction,
    testAction,
    tonesAction,
    responseLengthAction,
  ].map((action) => action(app));
  done();
};

