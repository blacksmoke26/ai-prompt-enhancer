/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// helpers
import ErrorHelper from '~/helpers/ErrorHelper';
import ResponseHelper from '~/helpers/ResponseHelper';

// schemas
import schema from './schemas/get.schema';

// classes
import type {FastifyInstance} from 'fastify';
import type {AppConfig} from '~/types';
import type {SuccessResponse} from '~/types/response';

export default (fastify: FastifyInstance) => {
  /**
   * Retrieves the current application configuration.
   * @example GET /config
   * @developer-note Returns the full config object with all settings
   */
  fastify.get<{ Reply: SuccessResponse<AppConfig> }>('/', {schema}, async (_request, reply) => {
    try {
      const config = await fastify.configService.getConfig();
      return ResponseHelper.successWithData(config);
    } catch (error: any) {
      fastify.log.error('Failed to get config:', error);
      ErrorHelper.throwWithStatus('Failed to fetch config');
    }
  });
}
