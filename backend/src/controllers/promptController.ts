import { FastifyInstance } from 'fastify';
import { PromptRequest, PromptResponse } from '../types';
import { AIProviderManager } from '../services/AIProviderManager';
import { HistoryManager } from '../services/HistoryManager';

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
export async function promptRoutes(fastify: FastifyInstance, options: { providerManager: AIProviderManager; historyManager: HistoryManager }) {
  const { providerManager, historyManager } = options;

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

      // Extract provider name from model ID
      const [providerName] = promptRequest.model.split(':');
      const provider = providerManager.getProvider(providerName);

      if (!provider) {
        return reply.code(400).send({ error: `Provider ${providerName} not found` });
      }

      // Check if provider is available
      if (!(await provider.isAvailable())) {
        return reply.code(503).send({ error: `Provider ${providerName} is not available` });
      }

      // Enhance the prompt
      const response = await provider.enhancePrompt(promptRequest);

      // Save to history
      historyManager.addToHistory({
        originalPrompt: response.originalPrompt,
        enhancedPrompt: response.enhancedPrompt,
        model: response.model,
        enhancementType: promptRequest.enhancementType || 'enhance',
        userRole: promptRequest.userRole || 'general',
        systemPrompt: promptRequest.systemPrompt,
        timestamp: response.timestamp,
        tokensUsed: response.tokensUsed,
        processingTime: response.processingTime,
      });

      return reply.code(200).send(response);
    } catch (error: any) {
      fastify.log.error('Prompt enhancement failed:', error);
      return reply.code(500).send({
        error: 'Failed to enhance prompt',
        details: error instanceof Error ? error.message : 'Unknown error'
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
  fastify.get('/models', async (request, reply) => {
    try {
      const models = await providerManager.getAllModels();
      return reply.code(200).send(models);
    } catch (error: any) {
      fastify.log.error('Failed to get models:', error);
      return reply.code(500).send({ error: 'Failed to fetch models' });
    }
  });

  /**
   * Retrieves all registered AI providers
   * @example
   * // GET /providers
   * // Response: [{ name: "openai", status: "active" }]
   * @developer_notes Includes provider status and configuration info
   */
  fastify.get('/providers', async (request, reply) => {
    try {
      const providers = await providerManager.getAllProviders();
      return reply.code(200).send(providers);
    } catch (error: any) {
      fastify.log.error('Failed to get providers:', error);
      return reply.code(500).send({ error: 'Failed to fetch providers' });
    }
  });

  /**
   * Tests if a specific provider is available
   * @example
   * // POST /providers/openai/test
   * // Response: { providerName: "openai", available: true }
   * @developer_notes Performs health check on the specified provider
   */
  fastify.post('/providers/:providerName/test', async (request, reply) => {
    try {
      const { providerName } = request.params as { providerName: string };
      const isAvailable = await providerManager.testProvider(providerName);

      return reply.code(200).send({
        providerName,
        available: isAvailable
      });
    } catch (error: any) {
      fastify.log.error('Provider test failed:', error);
      return reply.code(500).send({ error: 'Failed to test provider' });
    }
  });
}
