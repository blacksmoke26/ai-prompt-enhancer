/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// types
import type {FastifyInstance} from 'fastify';

export default (fastify: FastifyInstance) => {
  /**
   * Retrieves all available models from all providers
   * @example
   * // GET /models
   * // Response: [{ provider: "openai", models: ["gpt-4", "gpt-3.5"] }]
   * @developer_notes Returns aggregated list from all registered providers
   */
  fastify.get('/models', async function (this, request, reply) {
    try {
      const models = await this.providerService.getAllModels();
      return reply.code(200).send(models);
    } catch (error: any) {
      fastify.log.error('Failed to get models:', error);
      return reply.code(500).send({error: 'Failed to fetch models'});
    }
  });
}
