/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// actions
import listAction from './list';
import getAction from './get';
import createAction from './create';
import updateAction from './update';
import deleteAction from './delete';

export default (fastify: any) => {
  listAction(fastify);
  getAction(fastify);
  createAction(fastify);
  updateAction(fastify);
  deleteAction(fastify);
};