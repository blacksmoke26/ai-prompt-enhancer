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
  fastify.delete<{ Params: { id: string } }>('/:id', async function (this, request, reply) {
    try {
      const {id} = request.params;
      const success = await this.historyService.deleteHistoryItem(id);

      if (!success) {
        return reply.code(404).send({error: 'History item not found'});
      }

      return reply.code(200).send({success: true});
    } catch (error: any) {
      fastify.log.error('Failed to delete history item:', error);
      return reply.code(500).send({error: 'Failed to delete history item'});
    }
  });
}
