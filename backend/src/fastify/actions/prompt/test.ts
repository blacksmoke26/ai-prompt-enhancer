/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// db
import {Provider} from '~/database/models';

// helpers
import ErrorHelper from '~/helpers/ErrorHelper';
import ResponseHelper from '~/helpers/ResponseHelper';

// utils
import {toProviderName} from '~/utils/provider';

// schemas
import schema from './schemas/test.schema';

// types
import type {FastifyInstance} from 'fastify';
import type {SuccessResponse} from '~/types/response';

export default (fastify: FastifyInstance) => {
  /**
   * Tests if a specific provider is available
   * @example
   * // POST /providers/openai/test
   * // Response: { providerName: "openai", available: true }
   * @developer_notes Performs health check on the specified provider
   */
  fastify.post<{
    Body: { enabled: boolean; apiKey: string; timeout: number; baseUrl: string; };
    Params: { providerName: string; };
    Reply: SuccessResponse<{ providerName: string; available: boolean; }>;
  }>('/providers/:providerName/test', {schema}, async function (this, request) {
    try {
      const {providerName} = request.params;
      const isAvailable = await this.providerService.testProvider(providerName);

      if (isAvailable) {
        //<editor-fold desc="Database updates">
        const record = await Provider.findOne({where: {name: toProviderName(providerName)}});
        if (record) {
          record.enabled = request.body.enabled;
          record.config = {
            ...record.config,
            apiKey: request.body.apiKey,
            baseUrl: request.body.baseUrl?.trim?.(),
            timeout: Number(request.body.timeout) || 30000,
          };
          await record.save();
        }
        //</editor-fold>
      }

      return ResponseHelper.successWithData({
        providerName,
        available: isAvailable,
      });
    } catch (error: any) {
      fastify.log.error('Provider test failed:', error);
      ErrorHelper.throwWithStatus('Failed to test provider');
    }
  });
}
