/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import type {FastifyInstance} from 'fastify';

// actions
import update from '~/actions/user-role/update';
import getUserRoles from '~/actions/user-role/getUserRoles';

export default async function userRoleRoutes(fastify: FastifyInstance) {
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

  /**
   * Updates the hidden status of a user identified by the provided key.
   * Example: PUT /123 with body { "hidden": true } returns { "success": true }.
   */
  fastify.put<{
    Params: { key: string };
    Body: { hidden: boolean }
  }>('/:key', async (request, reply) => {
    try {
      return reply.code(200).send({success: await update(request.params.key, request.body)});
    } catch (error: any) {
      fastify.log.error('Failed to update user role:', error);
      return reply.code(500).send({error: 'Failed to update user role'});
    }
  });
}
