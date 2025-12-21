/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// actions
import get from '~/fastify/actions/user-role/get';
import update from '~/fastify/actions/user-role/update';

// types
import type {FastifyInstance, FastifyPluginOptions, HookHandlerDoneFunction} from 'fastify';

export default (app: FastifyInstance, _opts: FastifyPluginOptions, done: HookHandlerDoneFunction) => {
  [
    get, update,
  ].map((action) => action(app));
  done();
}
