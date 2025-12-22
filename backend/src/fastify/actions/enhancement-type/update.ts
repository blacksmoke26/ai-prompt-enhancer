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
import schema from './schemas/update.schema';

// types
import type {FastifyInstance} from 'fastify';
import {SuccessOnlyResponse} from '~/types/response';

export default (fastify: FastifyInstance) => {
  /**
   * Updates enhancement identified by the provided key.
   * Example: PUT /123 with body { "hidden": true } returns { "success": true }.
   */
  fastify.put<{
    Params: { key: string };
    Body: { hidden: boolean }
    Reply: SuccessOnlyResponse
  }>('/:key', {schema}, async (request, reply) => {
    const record = await EnhancementType.findOne({
      where: {key: request.params.key},
    });

    if (!record) {
      ErrorHelper.throwWithStatus('Enhancement type not found', 404);
    }


    try {
      record.hidden = request.body.hidden;
      await record.save();

      return ResponseHelper.successOnly();
    } catch (error: any) {
      fastify.log.error('Failed to update enhancement type:', error);
      ErrorHelper.throwWithStatus('Failed to update enhancement type');
    }
  });
}
