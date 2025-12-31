/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// db
import { ResponseLength } from '~/database/models';

// helpers
import ErrorHelper from '~/helpers/ErrorHelper';
import ResponseHelper from '~/helpers/ResponseHelper';

// schemas
import schema from './schemas/update.schema';

// types
import type { FastifyInstance } from 'fastify';
import type { SuccessOnlyResponse } from '~/types/response';

export default (fastify: FastifyInstance) => {
  /**
   * Updates response length identified by the provided key.
   * Example: PUT response-lengths/123 with body { "hidden": true } returns { "success": true }.
   */
  fastify.put<{
    Params: { key: string };
    Body: { hidden: boolean };
    Reply: SuccessOnlyResponse;
  }>('/:key', { schema }, async (request) => {
    const record = await ResponseLength.findOne({
      where: { key: request.params.key },
    });

    if (!record) {
      ErrorHelper.throwWithStatus('Response length not found', 404);
    }

    try {
      record.hidden = request.body.hidden;
      await record.save();

      return ResponseHelper.successOnly();
    } catch (error: any) {
      fastify.log.error('Failed to update response length:', error);
      ErrorHelper.throwWithStatus('Failed to update response length');
    }
  });
};
