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
        order: [['id', 'ASC']],
        raw: true,
      });

      const list = records.map(record => ({
        ...record,
        parameters: record?.parameters ? JSON.parse(record?.parameters as unknown as string) : {},
        tags: record?.tags ? JSON.parse(record?.tags as unknown as string) : [],
        hidden: Boolean(record.hidden),
      }));

      console.log(list[0]);

      return ResponseHelper.successWithData(list);
    } catch (error: any) {
      console.error('Failed to get tones:', error);
      ErrorHelper.throwWithStatus('Failed to fetch tones');
    }
  });
}
