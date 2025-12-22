/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// helpers
import ErrorHelper from '~/helpers/ErrorHelper';

// schemas
import schema from './schemas/export.schema';

// utils
import type {FastifyInstance} from 'fastify';

export default (fastify: FastifyInstance) => {
  /**
   * Exports the current configuration as a downloadable JSON file.
   * @example GET /config/export
   * @developer-note Response headers force file download with timestamp
   */
  fastify.get('/export', {schema}, async function (this, _request, reply) {
    try {
      const configJson = await this.configService.exportConfig();

      reply.header('Content-Type', 'application/json');
      reply.header('Content-Disposition', `attachment; filename="prompt-enhancer-config-${new Date().toISOString().split('T')[0]}.json"`);

      return reply.code(200).send(configJson);
    } catch (error: any) {
      fastify.log.error('Failed to export config:', error);
      ErrorHelper.throwWithStatus('Failed to export config');
    }
  });
}
