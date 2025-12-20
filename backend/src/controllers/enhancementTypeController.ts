/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import type {FastifyInstance} from 'fastify';

// actions
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
}
