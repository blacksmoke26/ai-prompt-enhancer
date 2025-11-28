import { FastifyInstance } from 'fastify';
import { HistoryManager } from '../services/HistoryManager';
import { exportSchema, historyUpdateSchema } from '../utils/validation';

export async function historyRoutes(fastify: FastifyInstance, options: { historyManager: HistoryManager }) {
  const { historyManager } = options;

  fastify.get('/', async (request, reply) => {
    try {
      const { limit, search } = request.query as { limit?: string; search?: string };
      
      let history;
      if (search) {
        history = historyManager.searchHistory(search);
      } else {
        history = historyManager.getHistory(limit ? parseInt(limit) : undefined);
      }

      return reply.code(200).send(history);
    } catch (error: any) {
      fastify.log.error('Failed to get history:', error);
      return reply.code(500).send({ error: 'Failed to fetch history' });
    }
  });

  fastify.get('/stats', async (request, reply) => {
    try {
      const stats = historyManager.getStats();
      return reply.code(200).send(stats);
    } catch (error: any) {
      fastify.log.error('Failed to get history stats:', error);
      return reply.code(500).send({ error: 'Failed to fetch history stats' });
    }
  });

  fastify.delete('/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const success = historyManager.deleteHistoryItem(id);
      
      if (!success) {
        return reply.code(404).send({ error: 'History item not found' });
      }

      return reply.code(200).send({ success: true });
    } catch (error: any) {
      fastify.log.error('Failed to delete history item:', error);
      return reply.code(500).send({ error: 'Failed to delete history item' });
    }
  });

  fastify.put('/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const updates = request.body as { rating?: number; notes?: string };
      
      const { error, value } = historyUpdateSchema.validate(updates);
      if (error) {
        return reply.code(400).send({ 
          error: 'Validation failed',
          details: error.details.map(detail => detail.message)
        });
      }

      const success = historyManager.updateHistoryItem(id, value);
      
      if (!success) {
        return reply.code(404).send({ error: 'History item not found' });
      }

      return reply.code(200).send({ success: true });
    } catch (error: any) {
      fastify.log.error('Failed to update history item:', error);
      return reply.code(500).send({ error: 'Failed to update history item' });
    }
  });

  fastify.delete('/', async (request, reply) => {
    try {
      historyManager.clearHistory();
      return reply.code(200).send({ success: true });
    } catch (error: any) {
      fastify.log.error('Failed to clear history:', error);
      return reply.code(500).send({ error: 'Failed to clear history' });
    }
  });

  fastify.get('/export', async (request, reply) => {
    try {
      const { format, limit } = request.query as { format?: string; limit?: string };
      
      const { error, value } = exportSchema.validate({ format, limit });
      if (error) {
        return reply.code(400).send({ 
          error: 'Validation failed',
          details: error.details.map(detail => detail.message)
        });
      }

      const history = limit ? 
        historyManager.getHistory(parseInt(limit)) : 
        historyManager.getHistory();

      const exportData = historyManager.exportHistory(value.format as 'json' | 'csv' | 'txt');
      
      const contentType = {
        json: 'application/json',
        csv: 'text/csv',
        txt: 'text/plain',
      }[value.format as string];

      const filename = `prompt-history-${new Date().toISOString().split('T')[0]}.${value.format}`;

      reply.header('Content-Type', contentType);
      reply.header('Content-Disposition', `attachment; filename="${filename}"`);
      
      return reply.code(200).send(exportData);
    } catch (error: any) {
      fastify.log.error('Failed to export history:', error);
      return reply.code(500).send({ error: 'Failed to export history' });
    }
  });
}
