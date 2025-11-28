import { FastifyInstance } from 'fastify';
import { PromptRequest, PromptResponse } from '../types';
import { AIProviderManager } from '../services/AIProviderManager';
import { HistoryManager } from '../services/HistoryManager';

export async function promptRoutes(fastify: FastifyInstance, options: { providerManager: AIProviderManager; historyManager: HistoryManager }) {
  const { providerManager, historyManager } = options;

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

  fastify.get('/models', async (request, reply) => {
    try {
      const models = await providerManager.getAllModels();
      return reply.code(200).send(models);
    } catch (error: any) {
      fastify.log.error('Failed to get models:', error);
      return reply.code(500).send({ error: 'Failed to fetch models' });
    }
  });

  fastify.get('/providers', async (request, reply) => {
    try {
      const providers = await providerManager.getAllProviders();
      return reply.code(200).send(providers);
    } catch (error: any) {
      fastify.log.error('Failed to get providers:', error);
      return reply.code(500).send({ error: 'Failed to fetch providers' });
    }
  });

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
