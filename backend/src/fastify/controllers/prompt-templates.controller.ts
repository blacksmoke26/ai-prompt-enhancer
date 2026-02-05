/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// actions
import listAction from '~/fastify/actions/prompt-templates/list';
//import createAction from '~/fastify/actions/prompt-templates/create';
import getAction from '~/fastify/actions/prompt-templates/get';
//import updateAction from '~/fastify/actions/prompt-templates/update';
import getByCategoryAction from '~/fastify/actions/prompt-templates/get-by-category';
import getByTagAction from '~/fastify/actions/prompt-templates/get-by-tag';

// types
import type { FastifyInstance, FastifyPluginOptions, HookHandlerDoneFunction } from 'fastify';

export default (app: FastifyInstance, options: FastifyPluginOptions, done: HookHandlerDoneFunction) => {
  // Register all action routes
  listAction(app);
  getByCategoryAction(app);
  getByTagAction(app);
  getAction(app);
  //createAction(app);
  //updateAction(app);
  done();
};
