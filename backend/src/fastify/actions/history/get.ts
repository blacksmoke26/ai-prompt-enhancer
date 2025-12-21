/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// types
import type {FastifyInstance} from 'fastify';

export default (fastify: FastifyInstance) => {
  /**
   * Retrieves history items with optional search or limit
   * @example
   * // GET /history?limit=10&search=example
   * // Returns: [{ id: "123", prompt: "...", response: "..." }]
   * @developer_notes
   * - Defaults to all history if no query params provided
   * - Search performs case-insensitive text matching
   */
  fastify.get<{
    Querystring: { limit?: string; search?: string }
  }>('/', async function (this, request, reply) {
    try {
      const {limit, search} = request.query;

      let history;

      if (search) {
        history = await this.historyService.searchHistory(search);
      } else {
        history = await this.historyService.getHistory(limit ? parseInt(limit) : undefined);
      }

      return reply.code(200).send(history);
    } catch (error: any) {
      fastify.log.error('Failed to get history:', error);
      return reply.code(500).send({error: 'Failed to fetch history'});
    }
  });
}
