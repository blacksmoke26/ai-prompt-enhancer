/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import showdown from 'showdown';

// db
import { History } from '~/database/models';

// helpers
import ErrorHelper from '~/helpers/ErrorHelper';
import ResponseHelper from '~/helpers/ResponseHelper';

// schemas
import schema from './schemas/export-html.schema';

// types
import type { FastifyInstance } from 'fastify';
import type { SuccessCustomResponse, SuccessResponse } from '~/types/response';

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
  fastify.post<{
    Body: {
      id: number;
      type: 'response' | 'prompt';
    };
    Reply: SuccessCustomResponse<{ html: string }>;
  }>('/export-html', { schema }, async function (this, request, reply) {
    const record = await History.findByPk(+request.body.id, {
      attributes: ['enhancedPrompt', 'aiPrompt'],
      raw: true,
    });

    if (!record) {
      ErrorHelper.throwWithStatus('History not found', 404);
    }

    const mdContent =
      request.body.type === 'prompt'
        ? (record.aiPrompt ?? '# No contents available to export')
        : record.enhancedPrompt;

    const converter = new showdown.Converter();
    const html = converter.makeHtml(mdContent);

    return ResponseHelper.successWithCustom({ html });
  });
};
