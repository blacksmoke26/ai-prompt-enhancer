/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// db
import {EnhancementType} from '~/database/models';

// types
import type {FastifyInstance} from 'fastify';

export default (fastify: FastifyInstance) => {
  /**
   * Updates the hidden status of enhancement identified by the provided key.
   * Example: PUT /123 with body { "hidden": true } returns { "success": true }.
   */
  fastify.put<{
    Params: { key: string };
    Body: { hidden: boolean }
  }>('/:key', async (request, reply) => {
    try {

      const record = await EnhancementType.findOne({
        where: {key: request.params.key},
      });

      if (!record) {
        throw new Error(`Enhancement type ${request.params.key} not found`);
      }

      record.hidden = request.body.hidden;
      await record.save();

      return reply.code(200).send({success: true});
    } catch (error: any) {
      fastify.log.error('Failed to update enhancement type:', error);
      return reply.code(500).send({error: 'Failed to update enhancement type'});
    }
  });
}
