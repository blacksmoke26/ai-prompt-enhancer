/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// db
import {Provider} from '~/database/models';

// utils
import {toProviderName} from '~/utils/provider';

// types
import type {FastifyInstance} from 'fastify';

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
  }>('/providers/:providerName/test', async function (this, request, reply) {
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

      return reply.code(200).send({
        providerName,
        available: isAvailable,
      });
    } catch (error: any) {
      fastify.log.error('Provider test failed:', error);
      return reply.code(500).send({error: 'Failed to test provider'});
    }
  });

}
