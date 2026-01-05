/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// db
import { EnhancementType, EnhancementTypeAttributes } from '~/database/models';

// helpers
import ErrorHelper from '~/helpers/ErrorHelper';
import ResponseHelper from '~/helpers/ResponseHelper';

// schemas
import schema from './schemas/get.schema';

// types
import type { FastifyInstance } from 'fastify';
import type { SuccessResponse } from '~/types/response';

export default (fastify: FastifyInstance) => {
  /**
   * Retrieves all available enhancement types for prompts.
   * @example GET /config/enhancement-types
   * @developer-note Used to populate dropdown options in UI
   */
  fastify.get<{ Reply: SuccessResponse<EnhancementTypeAttributes[]> }>(
    '/',
    { schema },
    async () => {
      try {
        const records = await EnhancementType.findAll({
          order: [['id', 'ASC']],
          raw: true,
        });

        const list = records.map((record) => ({
          ...record,
          parameters: record?.parameters
            ? JSON.parse(record?.parameters as unknown as string)
            : {},
          metadata: record?.metadata
            ? JSON.parse(record?.metadata as unknown as string)
            : {},
          performance: record?.performance
            ? JSON.parse(record?.performance as unknown as string)
            : {},
          templateVariables: record?.templateVariables
            ? JSON.parse(record?.templateVariables as unknown as string)
            : [],
          dependencies: record?.dependencies
            ? JSON.parse(record?.dependencies as unknown as string)
            : [],
          tags: record?.tags
            ? JSON.parse(record?.tags as unknown as string)
            : [],
          hidden: Boolean(record.hidden),
        }));

        return ResponseHelper.successWithData(list);
      } catch (error: any) {
        fastify.log.error('Failed to get enhancement types:', error);
        ErrorHelper.throwWithStatus('Failed to fetch enhancement types');
      }
    },
  );
};
