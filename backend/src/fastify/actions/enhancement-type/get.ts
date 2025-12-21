/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// db
import {EnhancementType} from '~/database/models';

// types
import type {FastifyInstance} from 'fastify';

export default (fastify: FastifyInstance) => {
  /**
   * Retrieves all available enhancement types for prompts.
   * @example GET /config/enhancement-types
   * @developer-note Used to populate dropdown options in UI
   */
  fastify.get('/', async (_request, reply) => {
    try {
      const enhancementTypes = await EnhancementType.findAll({
        attributes: ['id', 'key', 'name', 'description', 'systemPrompt', 'category', 'hidden'],
        order: [['id', 'ASC']],
        raw: true,
      });

      const types = enhancementTypes.map(enhancementType => ({
        id: enhancementType.key,
        name: enhancementType.name,
        description: enhancementType.description,
        systemPrompt: enhancementType.systemPrompt,
        category: enhancementType.category,
        hidden: enhancementType.hidden,
      }));
      return reply.code(200).send(types);
    } catch (error: any) {
      fastify.log.error('Failed to get enhancement types:', error);
      return reply.code(500).send({error: 'Failed to fetch enhancement types'});
    }
  });
}
