/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// utils
import type {AppConfig} from '~/types';
import type {FastifyInstance} from 'fastify';

export default (fastify: FastifyInstance) => {
  /**
   * Updates the application configuration with validated changes.
   * @example PUT /config with body: {"setting": "value"}
   * @developer-note All updates are validated against configUpdateSchema
   */
  fastify.put<{ Body: AppConfig }>('/', async function (this: FastifyInstance, request, reply) {
    try {
      const updates = request.body;
      const updatedConfig = await this.configService.updateConfig(updates);
      return reply.code(200).send(updatedConfig);
    } catch (error: any) {
      fastify.log.error('Failed to update config:', error);
      return reply.code(500).send({error: 'Failed to update config'});
    }
  });
}
