/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// helpers
import ErrorHelper from '~/helpers/ErrorHelper';
import ResponseHelper from '~/helpers/ResponseHelper';

// schemas
import schema from './schemas/reset.schema';

// types
import type {FastifyInstance} from 'fastify';
import type {AppConfig} from '~/types';
import type {SuccessResponse} from '~/types/response';

export default (fastify: FastifyInstance) => {
  /**
   * Resets the configuration to default values.
   * @example POST /config/reset
   * @developer-note This action is irreversible - ensure user confirmation in UI
   */
  fastify.post<{ Reply: SuccessResponse<AppConfig> }>('/reset', {schema}, async function (_request, reply) {
    try {
      await this.configService.resetConfig();
      const config = await this.configService.getConfig();
      return ResponseHelper.successWithData<AppConfig>(config);
    } catch (error: any) {
      fastify.log.error('Failed to reset config:', error);
      ErrorHelper.throwWithStatus('Failed to reset config');
    }
  });
}
