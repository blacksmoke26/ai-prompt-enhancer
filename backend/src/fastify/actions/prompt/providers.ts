/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// types
import type {FastifyInstance} from 'fastify';

export default (fastify: FastifyInstance) => {
  /**
   * Retrieves all registered AI providers
   * @example
   * // GET /providers
   * // Response: [{ name: "openai", status: "active" }]
   * @developer_notes Includes provider status and configuration info
   */
  fastify.get('/providers', async function (this, request, reply) {
    try {
      const models = await this.providerService.getAllProviders();
      return reply.code(200).send(models);
    } catch (error: any) {
      fastify.log.error('Failed to get models:', error);
      return reply.code(500).send({error: 'Failed to fetch models'});
    }
  });
}
