/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// schemas
import schema from './schemas/update.schema';

// helpers
import ErrorHelper from '~/helpers/ErrorHelper';
import ResponseHelper from '~/helpers/ResponseHelper';

// utils
import type {AppConfig} from '~/types';
import type {FastifyInstance} from 'fastify';
import type {SuccessResponse} from '~/types/response';

export default (fastify: FastifyInstance) => {
  /**
   * Updates the application configuration with validated changes.
   * @example PUT /config with body: {"setting": "value"}
   * @developer-note All updates are validated against configUpdateSchema
   */
  fastify.put<{
    Body: AppConfig;
    Reply: SuccessResponse<AppConfig>;
  }>('/', {schema}, async function (this: FastifyInstance, request, reply) {
    try {
      await this.configService.updateConfig(request.body);
      return ResponseHelper.successWithData(await this.configService.getConfig());
    } catch (error: any) {
      fastify.log.error('Failed to update config:', error);
      ErrorHelper.throwWithStatus('Failed to update config');
    }
  });
}
