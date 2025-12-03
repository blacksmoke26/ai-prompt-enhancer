/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// classes
import {HistoryManager} from '~/services/HistoryManager';

// actions
import getHistory from '~/actions/history/getHistory';
import getStats from '~/actions/history/getStats';
import deleteHistoryItem from '~/actions/history/deleteHistoryItem';
import updateHistoryItem from '~/actions/history/updateHistoryItem';
import clearHistory from '~/actions/history/clearHistory';
import exportHistory from '~/actions/history/exportHistory';

// types
import type {FastifyInstance} from 'fastify';

/**
 * Registers history-related routes for managing prompt history
 * @example
 * // Register with fastify
 * fastify.register(historyRoutes, { historyManager: new HistoryManager() });
 * @developer_notes
 * - All routes return JSON responses with appropriate HTTP status codes
 * - Error handling includes logging and standardized error responses
 * - Validation schemas are applied to relevant endpoints
 */
export default async function historyRoutes(fastify: FastifyInstance, options: { historyManager: HistoryManager }) {
  const { historyManager } = options;

  /**
   * Retrieves history items with optional search or limit
   * @example
   * // GET /history?limit=10&search=example
   * // Returns: [{ id: "123", prompt: "...", response: "..." }]
   * @developer_notes
   * - Defaults to all history if no query params provided
   * - Search performs case-insensitive text matching
   */
  fastify.get('/', async (request, reply) => {
    try {
      const { limit, search } = request.query as { limit?: string; search?: string };

      const history = await getHistory(historyManager, limit ? parseInt(limit) : undefined, search);
      return reply.code(200).send(history);
    } catch (error: any) {
      fastify.log.error('Failed to get history:', error);
      return reply.code(500).send({ error: 'Failed to fetch history' });
    }
  });

  /**
   * Gets statistics about the history data
   * @example
   * // GET /history/stats
   * // Returns: { totalCount: 42, averageRating: 4.2 }
   * @developer_notes
   * - Computed values are calculated on each request
   * - Returns empty object if no history exists
   */
  fastify.get('/stats', async (request, reply) => {
    try {
      const stats = await getStats(historyManager);
      return reply.code(200).send(stats);
    } catch (error: any) {
      fastify.log.error('Failed to get history stats:', error);
      return reply.code(500).send({ error: 'Failed to fetch history stats' });
    }
  });

  /**
   * Deletes a specific history item by ID
   * @example
   * // DELETE /history/123
   * // Returns: { success: true }
   * @developer_notes
   * - Returns 404 if item doesn't exist
   * - Operation is permanent and irreversible
   */
  fastify.delete('/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const success = await deleteHistoryItem(historyManager, id);

      if (!success) {
        return reply.code(404).send({ error: 'History item not found' });
      }

      return reply.code(200).send({ success: true });
    } catch (error: any) {
      fastify.log.error('Failed to delete history item:', error);
      return reply.code(500).send({ error: 'Failed to delete history item' });
    }
  });

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
  fastify.put('/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const updates = request.body as { rating?: number; notes?: string };

      const success = await updateHistoryItem(historyManager, id, updates);

      if (!success) {
        return reply.code(404).send({ error: 'History item not found' });
      }

      return reply.code(200).send({ success: true });
    } catch (error: any) {
      fastify.log.error('Failed to update history item:', error);
      return reply.code(500).send({ error: 'Failed to update history item' });
    }
  });

  /**
   * Clears all history items
   * @example
   * // DELETE /history
   * // Returns: { success: true }
   * @developer_notes
   * - Operation is permanent and irreversible
   * - Consider adding confirmation for production use
   */
  fastify.delete('/', async (request, reply) => {
    try {
      await clearHistory(historyManager);
      return reply.code(200).send({ success: true });
    } catch (error: any) {
      fastify.log.error('Failed to clear history:', error);
      return reply.code(500).send({ error: 'Failed to clear history' });
    }
  });

  /**
   * Exports history data in specified format
   * @example
   * // GET /history/export?format=csv&limit=100
   * // Returns: CSV file download
   * @developer_notes
   * - Supports json, csv, and txt formats
   * - Includes appropriate content headers for file download
   * - Filename includes current date
   */
  fastify.get('/export', async (request, reply) => {
    try {
      const { format, limit } = request.query as { format?: string; limit?: string };

      const exportData = await exportHistory(historyManager, format as 'json' | 'csv' | 'txt', limit ? parseInt(limit) : undefined);

      const contentType = {
        json: 'application/json',
        csv: 'text/csv',
        txt: 'text/plain',
      }[format as string];

      const filename = `prompt-history-${new Date().toISOString().split('T')[0]}.${format}`;

      reply.header('Content-Type', contentType);
      reply.header('Content-Disposition', `attachment; filename="${filename}"`);

      return reply.code(200).send(exportData);
    } catch (error: any) {
      fastify.log.error('Failed to export history:', error);
      return reply.code(500).send({ error: 'Failed to export history' });
    }
  });
}
