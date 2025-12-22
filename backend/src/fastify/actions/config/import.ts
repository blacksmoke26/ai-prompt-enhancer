/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// helpers
import ErrorHelper from '~/helpers/ErrorHelper';
import ResponseHelper from '~/helpers/ResponseHelper';

// schemas
import schema from './schemas/import.schema';

// classes
import type {FastifyInstance} from 'fastify';
import type {SuccessResponse} from '~/types/response';
import type {AppConfig} from '~/types';

/**
 * Imports configuration from a JSON string
 * @param fastify - Instance of ConfigManager
 * @param configJson - JSON string containing configuration
 * @returns Boolean indicating success or failure
 */
const importConfig = async (fastify: FastifyInstance, configJson: string): Promise<void> => {
  if (!configJson.trim()) {
    ErrorHelper.throwWithStatus('configJson is required', 422);
  }

  const success = await fastify.configService.importConfig(configJson);

  if (!success) {
    ErrorHelper.throwWithStatus('Failed to import config', 400);
  }
};


export default (fastify: FastifyInstance) => {
  /**
   * Imports configuration from a JSON string.
   * @example POST /config/import with body: {"configJson": "{}"}
   * @developer-note Invalid JSON will be rejected - validate before sending
   */
  fastify.post<{
    Body: { configJson: string };
    Reply: SuccessResponse<AppConfig>
  }>('/import', {schema}, async function (this, request, reply) {
    await importConfig(fastify, request.body.configJson);

    return ResponseHelper.successWithData(await this.configService.getConfig());
  });
}
