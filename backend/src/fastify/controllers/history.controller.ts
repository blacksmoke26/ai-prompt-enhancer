/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// actions
import clear from '~/fastify/actions/history/clear';
import stats from '~/fastify/actions/history/stats';
import getHistory from '~/fastify/actions/history/get';
import exportHistory from '~/fastify/actions/history/export';
import deleteHistoryItem from '~/fastify/actions/history/delete';
import updateHistoryItem from '~/fastify/actions/history/update';

// types
import type {FastifyInstance, FastifyPluginOptions, HookHandlerDoneFunction} from 'fastify';

export default (app: FastifyInstance, options: FastifyPluginOptions, done: HookHandlerDoneFunction) => {
  [
    getHistory,
    stats,
    deleteHistoryItem,
    updateHistoryItem,
    clear,
    exportHistory,
  ].map((action) => action(app));
  done();
};

