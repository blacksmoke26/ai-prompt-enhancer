/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// classes
import type {FastifyInstance} from 'fastify';

/**
 * Imports configuration from a JSON string
 * @param fastify - Instance of ConfigManager
 * @param configJson - JSON string containing configuration
 * @returns Boolean indicating success or failure
 */
const importConfig = async (fastify: FastifyInstance, configJson: string): Promise<boolean> => {
  try {
    if (!configJson) {
      throw new Error('configJson is required');
    }

    const success = await fastify.configService.importConfig(configJson);

    if (!success) {
      throw new Error('Invalid config JSON');
    }

    return success;
  } catch (error: any) {
    throw new Error(`Failed to import config: ${error.message}`);
  }
};


export default (fastify: FastifyInstance) => {
  /**
   * Imports configuration from a JSON string.
   * @example POST /config/import with body: {"configJson": "{}"}
   * @developer-note Invalid JSON will be rejected - validate before sending
   */
  fastify.post<{ Body: { configJson: string } }>('/import', async function (this, request, reply) {
    try {
      const {configJson} = request?.body ?? {};

      const success = await importConfig(fastify, configJson);

      if (!success) {
        return reply.code(400).send({error: 'Invalid config JSON'});
      }
      return reply.code(200).send(await this.configService.getConfig());
    } catch (error: any) {
      fastify.log.error('Failed to import config:', error);
      return reply.code(500).send({error: 'Failed to import config'});
    }
  });
}
