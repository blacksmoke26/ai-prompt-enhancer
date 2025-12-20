/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import type {FastifyInstance} from 'fastify';

// actions
import update from '~/actions/enhancement-type/update';
import getEnhancementTypes from '~/actions/enhancement-type/getEnhancementTypes';

export default async function enhancementTypeRoutes(fastify: FastifyInstance, options: {}) {
  /**
   * Retrieves all available enhancement types for prompts.
   * @example GET /config/enhancement-types
   * @developer-note Used to populate dropdown options in UI
   */
  fastify.get('/', async (_request, reply) => {
    try {
      const types = await getEnhancementTypes();
      return reply.code(200).send(types);
    } catch (error: any) {
      fastify.log.error('Failed to get enhancement types:', error);
      return reply.code(500).send({error: 'Failed to fetch enhancement types'});
    }
  });

  /**
   * Updates the hidden status of enhancement identified by the provided key.
   * Example: PUT /123 with body { "hidden": true } returns { "success": true }.
   */
  fastify.put<{
    Params: { key: string };
    Body: { hidden: boolean }
  }>('/:key', async (request, reply) => {
    try {
      return reply.code(200).send({success: await update(request.params.key, request.body)});
    } catch (error: any) {
      fastify.log.error('Failed to update enhancement type:', error);
      return reply.code(500).send({error: 'Failed to update enhancement type'});
    }
  });
}
