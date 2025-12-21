/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// utils
import {historyUpdateSchema} from '~/utils/validation';

// types
import type {FastifyInstance} from 'fastify';

export default (fastify: FastifyInstance) => {
  /**
   * Updates a history item with rating or notes
   * @example
   * // PUT /history/123
   * // Body: { rating: 5, notes: "Excellent response" }
   * // Returns: { success: true }
   * @developer_notes
   * - Only updates provided fields
   * - Rating must be between 1-5
   * - Returns 404 if item doesn't exist
   */
  fastify.put<{
    Params: { id: string };
    Body: { rating?: number; notes?: string };
  }>('/:id', async function (this, request, reply) {
    try {
      const {error, value} = historyUpdateSchema.validate(request.body);
      if (error) {
        throw new Error(`Validation failed: ${error.details.map(detail => detail.message).join(', ')}`);
      }

      const success = await this.historyService.updateHistoryItem(request.params.id, value);

      if (!success) {
        return reply.code(404).send({error: 'History item not found'});
      }

      return reply.code(200).send({success: true});
    } catch (error: any) {
      fastify.log.error('Failed to update history item:', error);
      return reply.code(500).send({error: 'Failed to update history item'});
    }
  });
}
