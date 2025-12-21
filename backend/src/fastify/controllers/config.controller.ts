/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// actions
import getAction from '~/fastify/actions/config/get';
import updateAction from '~/fastify/actions/config/update';
import resetAction from '~/fastify/actions/config/reset';
import exportAction from '~/fastify/actions/config/export';
import importAction from '~/fastify/actions/config/import';

// types
import type {FastifyInstance, FastifyPluginOptions, HookHandlerDoneFunction} from 'fastify';

export default (app: FastifyInstance, _opts: FastifyPluginOptions, done: HookHandlerDoneFunction) => {
  [
    getAction,
    updateAction,
    resetAction,
    exportAction,
    importAction,
  ].map((action) => action(app));
  done();
};

