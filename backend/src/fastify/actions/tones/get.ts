/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// db
import {Tone, ToneAttributes} from '~/database/models';

// helpers
import ErrorHelper from '~/helpers/ErrorHelper';
import ResponseHelper from '~/helpers/ResponseHelper';

// schemas
import schema from './schemas/get.schema';

// types
import type {FastifyInstance} from 'fastify';
import type {SuccessResponse} from '~/types/response';

export default (fastify: FastifyInstance) => {
  /**
   * Retrieves all available tones for prompts.
   * @example GET /tones
   * @developer-note Used to populate dropdown options in UI
   */
  fastify.get<{ Reply: SuccessResponse<Omit<ToneAttributes, 'id'>[]>; }>('/', {schema}, async () => {
    try {
      const records = await Tone.findAll({
        attributes: ['key', 'name', 'category', 'hidden'],
        order: [['id', 'ASC']],
        raw: true,
      });

      const list = records.map(record => ({
        key: record.key,
        name: record.name,
        category: record.category,
        hidden: Boolean(record.hidden),
      }));

      return ResponseHelper.successWithData(list);
    } catch (error: any) {
      console.error('Failed to get tones:', error);
      ErrorHelper.throwWithStatus('Failed to fetch tones');
    }
  });
}
