/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// db
import {UserRole} from '~/database/models';

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
      const records = await UserRole.findAll({
        attributes: ['id', 'key', 'name', 'description', 'systemPrompt', 'category', 'hidden'],
        order: [['id', 'ASC']],
        raw: true,
      });

      const types = records.map(record => ({
        id: record.key,
        name: record.name,
        description: record.description,
        systemPrompt: record.systemPrompt,
        category: record.category,
        hidden: record.hidden,
      }));
      return reply.code(200).send(types);
    } catch (error: any) {
      fastify.log.error('Failed to get enhancement types:', error);
      return reply.code(500).send({error: 'Failed to fetch enhancement types'});
    }
  });
}
