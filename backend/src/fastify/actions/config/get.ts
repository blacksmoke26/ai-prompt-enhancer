/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// classes
import type {FastifyInstance} from 'fastify';

export default (fastify: FastifyInstance) => {
  /**
   * Retrieves the current application configuration.
   * @example GET /config
   * @developer-note Returns the full config object with all settings
   */
  fastify.get('/', async (_request, reply) => {
    try {
      const config = await fastify.configService.getConfig();
      return reply.code(200).send(config);
    } catch (error: any) {
      fastify.log.error('Failed to get config:', error);
      return reply.code(500).send({error: 'Failed to fetch config'});
    }
  });
}
