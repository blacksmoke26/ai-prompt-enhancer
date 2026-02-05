/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// actions
import promptCategoriesAction from '~/fastify/actions/prompt-categories';

// types
import type { FastifyInstance, FastifyPluginOptions, HookHandlerDoneFunction } from 'fastify';

export default (app: FastifyInstance, options: FastifyPluginOptions, done: HookHandlerDoneFunction) => {
  promptCategoriesAction(app);
  done();
};