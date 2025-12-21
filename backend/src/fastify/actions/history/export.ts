/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// utils
import {exportSchema} from '~/utils/validation';

// types
import type {FastifyInstance} from 'fastify';

interface RequestQuery {
  format: 'json' | 'csv' | 'txt';
  limit?: string;
}

export default (fastify: FastifyInstance) => {
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
  fastify.get<{
    Querystring: RequestQuery;
  }>('/export', async function (this, request, reply) {
    try {
      const {format, limit} = request.query;

      const {error, value} = exportSchema.validate({format, limit});
      if (error) {
        throw new Error(`Validation failed: ${error.details.map(detail => detail.message).join(', ')}`);
      }

      const exportData = await this.historyService.exportHistory(value.format);

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
      return reply.code(500).send({error: 'Failed to export history'});
    }
  });
}
