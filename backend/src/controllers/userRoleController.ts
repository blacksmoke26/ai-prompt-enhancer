/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import type {FastifyInstance} from 'fastify';

// actions
import getUserRoles from '~/actions/user-role/getUserRoles';

export default async function userRoleRoutes(fastify: FastifyInstance, options: {}) {
  /**
   * Retrieves all defined user roles in the system.
   * @example GET /config/user-roles
   * @developer-note Used for role-based access control configurations
   */
  fastify.get('/', async (_request, reply) => {
    try {
      const roles = await getUserRoles();
      return reply.code(200).send(roles);
    } catch (error: any) {
      fastify.log.error('Failed to get user roles:', error);
      return reply.code(500).send({error: 'Failed to fetch user roles'});
    }
  });
}
