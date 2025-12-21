/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// types
import type {FastifyInstance} from 'fastify';

export default (fastify: FastifyInstance) => {
  /**
   * Clears all history items
   * @example
   * // DELETE /history
   * // Returns: { success: true }
   * @developer_notes
   * - Operation is permanent and irreversible
   * - Consider adding confirmation for production use
   */
  fastify.delete('/', async function (this, request, reply ) {
    try {
      await this.historyService.clearHistory();
      return reply.code(200).send({ success: true });
    } catch (error: any) {
      fastify.log.error('Failed to clear history:', error);
      return reply.code(500).send({ error: 'Failed to clear history' });
    }
  });
}
