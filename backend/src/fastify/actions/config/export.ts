/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// utils
import type {FastifyInstance} from 'fastify';

export default (fastify: FastifyInstance) => {
  /**
   * Exports the current configuration as a downloadable JSON file.
   * @example GET /config/export
   * @developer-note Response headers force file download with timestamp
   */
  fastify.get('/export', async (_request, reply) => {
    try {
      const configJson = await fastify.configService.exportConfig();

      reply.header('Content-Type', 'application/json');
      reply.header('Content-Disposition', `attachment; filename="prompt-enhancer-config-${new Date().toISOString().split('T')[0]}.json"`);

      return reply.code(200).send(configJson);
    } catch (error: any) {
      fastify.log.error('Failed to export config:', error);
      return reply.code(500).send({error: 'Failed to export config'});
    }
  });
}
