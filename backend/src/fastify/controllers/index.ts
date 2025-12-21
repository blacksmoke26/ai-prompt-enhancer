/**
 * @Author: Junaid Atari mj.atari@gmail.com
 * @Date: 2025-01-31 14:45:42
 */

// controllers
import mainController from './main.controller';
import configController from './config.controller';
import promptController from './prompt.controller';
import historyController from './history.controller';
import userRoleController from './user-role.controller';
import enhancementTypeController from './enhancement-type.controller';

// helpers
import env from '@junaidatari/env-binder';

// types
import type {FastifyInstance} from 'fastify';

/**
 * Map of controllers
 * @param fastify - Fastify instance
 */
export default async (fastify: FastifyInstance) => {
  // Register routes
  await Promise.all([
    fastify.register(mainController, {prefix: '/'}),
    fastify.register(configController, {prefix: '/api/config'}),
    fastify.register(promptController, {prefix: '/api/prompts'}),
    fastify.register(historyController, {prefix: '/api/history'}),
    fastify.register(userRoleController, {prefix: '/api/user-roles'}),
    fastify.register(enhancementTypeController, {prefix: '/api/enhancement-types'}),
  ]);

  //<editor-fold desc="Development specific controllers">
  if (!env.isProduction()) {
    //fastify.register(testController, { prefix: '/test' });
  }
  //</editor-fold>
};
