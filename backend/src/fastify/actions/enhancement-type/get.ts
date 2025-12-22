/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// db
import {EnhancementType} from '~/database/models';

// helpers
import ErrorHelper from '~/helpers/ErrorHelper';
import ResponseHelper from '~/helpers/ResponseHelper';

// schemas
import schema from './schemas/get.schema';

// types
import type {FastifyInstance} from 'fastify';
import type {SuccessResponse} from '~/types/response';
import type {EnhancementType as Enhancement} from '~/constants/enhancement-types';

export default (fastify: FastifyInstance) => {
  /**
   * Retrieves all available enhancement types for prompts.
   * @example GET /config/enhancement-types
   * @developer-note Used to populate dropdown options in UI
   */
  fastify.get<{ Reply: SuccessResponse<Enhancement[]>; }>('/', {schema}, async () => {
    try {
      const records = await EnhancementType.findAll({
        attributes: ['id', 'key', 'name', 'description', 'systemPrompt', 'category', 'hidden'],
        order: [['id', 'ASC']],
        raw: true,
      });

      const list = records.map(record => ({
        id: record.key,
        name: record.name,
        description: record.description,
        systemPrompt: record.systemPrompt,
        category: record.category,
        hidden: Boolean(record.hidden),
      }));

      return ResponseHelper.successWithData(list);
    } catch (error: any) {
      fastify.log.error('Failed to get enhancement types:', error);
      ErrorHelper.throwWithStatus('Failed to fetch enhancement types');
    }
  });
}
