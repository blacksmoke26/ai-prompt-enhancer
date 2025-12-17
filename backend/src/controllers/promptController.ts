/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import {FastifyInstance} from 'fastify';

// classes
import {AIProviderManager} from '~/services/AIProviderManager';
import {HistoryManager} from '~/services/HistoryManager';

// actions
import enhancePrompt from '~/actions/prompt/enhancePrompt';
import getAllModels from '~/actions/prompt/getAllModels';
import getAllProviders from '~/actions/prompt/getAllProviders';
import testProvider from '~/actions/prompt/testProvider';

// types
import type {PromptRequest} from '~/types';
import {Provider} from '~/database/models';
import {toProviderName} from '~/utils/provider';
import {ProviderConfig} from '~/constants/providers';

/**
 * Registers prompt enhancement routes for the Fastify instance
 * @example
 * // Register routes with provider and history managers
 * await fastify.register(promptRoutes, {
 *   providerManager: new AIProviderManager(),
 *   historyManager: new HistoryManager()
 * });
 * @developer_notes Ensure all providers are properly initialized before registering routes
 */
export default async function promptRoutes(fastify: FastifyInstance, options: {
  providerManager: AIProviderManager;
  historyManager: HistoryManager
}) {
  const {providerManager} = options;

  /**
   * Enhances a prompt using the specified AI provider
   * @example
   * // POST /enhance
   * // Body: { model: "openai:gpt-4", prompt: "Hello world" }
   * @developer_notes Provider name is extracted from model ID format "provider:model"
   */
  fastify.post('/enhance', async (request, reply) => {
    try {
      const promptRequest = request.body as PromptRequest;

      const response = await enhancePrompt(providerManager, promptRequest);

      return reply.code(200).send(response);
    } catch (error: any) {
      fastify.log.error('Prompt enhancement failed:', error);
      return reply.code(500).send({
        error: 'Failed to enhance prompt',
        details: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  });

  /**
   * Retrieves all available models from all providers
   * @example
   * // GET /models
   * // Response: [{ provider: "openai", models: ["gpt-4", "gpt-3.5"] }]
   * @developer_notes Returns aggregated list from all registered providers
   */
  fastify.get('/models', async (_request, reply) => {
    try {
      const models = await getAllModels(providerManager);
      return reply.code(200).send(models);
    } catch (error: any) {
      fastify.log.error('Failed to get models:', error);
      return reply.code(500).send({error: 'Failed to fetch models'});
    }
  });

  /**
   * Retrieves all registered AI providers
   * @example
   * // GET /providers
   * // Response: [{ name: "openai", status: "active" }]
   * @developer_notes Includes provider status and configuration info
   */
  fastify.get('/providers', async (_request, reply) => {
    try {
      const providers = await getAllProviders(providerManager);
      return reply.code(200).send(providers);
    } catch (error: any) {
      fastify.log.error('Failed to get providers:', error);
      return reply.code(500).send({error: `Failed to fetch providers: ${error.message}`});
    }
  });

  /**
   * Tests if a specific provider is available
   * @example
   * // POST /providers/openai/test
   * // Response: { providerName: "openai", available: true }
   * @developer_notes Performs health check on the specified provider
   */
  fastify.post<{
    Body: { enabled: boolean; apiKey: string; timeout: number; baseUrl: string; }
  }>('/providers/:providerName/test', async (request, reply) => {
    try {
      const {providerName} = request.params as { providerName: string };
      const isAvailable = await testProvider(providerManager, providerName);

      if ( isAvailable ) {
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
