/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// types
import type {FastifyInstance} from 'fastify';

export default (fastify: FastifyInstance) => {
  /**
   * Gets statistics about the history data
   * @example
   * // GET /history/stats
   * // Returns: { totalCount: 42, averageRating: 4.2 }
   * @developer_notes
   * - Computed values are calculated on each request
   * - Returns empty object if no history exists
   */
  fastify.get('/stats', async function (this, request, reply) {
    try {
      const stats = await this.historyService.getStats();
      return reply.code(200).send(stats);
    } catch (error: any) {
      fastify.log.error('Failed to get history stats:', error);
      return reply.code(500).send({error: 'Failed to fetch history stats'});
    }
  });
}
