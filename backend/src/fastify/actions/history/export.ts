/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// helpers
import ErrorHelper from '~/helpers/ErrorHelper';

// utils
import {exportSchema} from '~/utils/validation';

// schemas
import schema from './schemas/export.schema';

// types
import type {FastifyInstance} from 'fastify';

/**
 * Represents query parameters for a request, specifying the desired data format and optional result limit.
 * @example
 * { format: 'json', limit: '10' }
 *
 * Developer Notes:
 * - Ensure `format` is one of the allowed values: 'json', 'csv', or 'txt'.
 * - `limit` is optional and should be provided as a string, even if numeric (server may handle it flexibly).
 */
export interface RequestQuery {
  /**
   * The desired format for the response data.
   * Must be one of 'json', 'csv', or 'txt'.
   */
  format: 'json' | 'csv' | 'txt';

  /**
   * Optional maximum number of results to return.
   * The server may interpret this as a string for flexibility, though typically represents a numeric value.
   */
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
  }>('/export', {schema}, async function (this, request, reply) {
    try {
      const {format, limit} = request.query;

      const {error, value} = exportSchema.validate({format, limit});

      if (error) {
        ErrorHelper.throwWithStatus(`Validation failed: ${error.details.map(detail => detail.message).join(', ')}`, 422);
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
      ErrorHelper.throwWithStatus('Failed to export history');
    }
  });
}
