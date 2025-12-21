/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// types
import type {FastifyInstance} from 'fastify';

export default (fastify: FastifyInstance) => {
  /**
   * Resets the configuration to default values.
   * @example POST /config/reset
   * @developer-note This action is irreversible - ensure user confirmation in UI
   */
  fastify.post('/reset', async function (_request, reply) {
    try {
      const config = await this.configService.resetConfig();
      return reply.code(200).send(config);
    } catch (error: any) {
      fastify.log.error('Failed to reset config:', error);
      return reply.code(500).send({error: 'Failed to reset config'});
    }
  });
}
