/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// db
import { TargetAudienceAttributes, TargetAudience} from '~/database/models';

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
   * Retrieves all available target audiences for prompts.
   * @example GET /target audiences
   * @developer-note Used to populate dropdown options in UI
   */
  fastify.get<{ Reply: SuccessResponse<Omit<TargetAudienceAttributes, 'id'>[]>; }>('/', {schema}, async () => {
    try {
      const records = await TargetAudience.findAll({
        order: [['id', 'ASC']],
        raw: true,
      });

      const list = records.map(record => ({
        ...record,
        tags: record?.tags ? JSON.parse(record?.tags as unknown as string) : [],
        hidden: Boolean(record.hidden),
      }));

      return ResponseHelper.successWithData(list);
    } catch (error: any) {
      console.error('Failed to get target audiences:', error);
      ErrorHelper.throwWithStatus('Failed to fetch target audiences');
    }
  });
}
