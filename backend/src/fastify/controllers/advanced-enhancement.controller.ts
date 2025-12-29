/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// actions
import get from '~/fastify/actions/advanced-enhancement/get';
import getAll from '~/fastify/actions/advanced-enhancement/get-all';
import update from '~/fastify/actions/advanced-enhancement/update';
import create from '~/fastify/actions/advanced-enhancement/create';
import validateChaining from '~/fastify/actions/advanced-enhancement/validate-chaining';

// types
import type {FastifyInstance, FastifyPluginOptions, HookHandlerDoneFunction} from 'fastify';

export default (app: FastifyInstance, _opts: FastifyPluginOptions, done: HookHandlerDoneFunction) => {
  [
    get,
    getAll,
    update,
    create,
    validateChaining,
  ].map((action) => action(app));
  done();
}