/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// classes
import ProviderService from '~/services/ProviderService';

// db
import {History, Provider} from '~/database/models';

// utils
import {toProviderName} from '~/utils/provider';

// types
import type {FastifyInstance} from 'fastify';
import type {PromptRequest, PromptResponse} from '~/types';

/**
 * Enhances a prompt using the specified AI provider
 * @param providerManager - Instance of AIProviderManager
 * @param promptRequest - Request containing prompt and enhancement details
 * @returns Enhanced prompt response
 */
const enhance = async (
  providerManager: ProviderService,
  promptRequest: PromptRequest,
): Promise<PromptResponse> => {
  try {
    // Extract provider name from model ID
    const provider = providerManager.getProvider(promptRequest.provider);

    const providerRecord = await Provider.findOne({
      where: {name: toProviderName(promptRequest.provider), enabled: true},
      attributes: ['id'],
      raw: true,
    });

    if (!provider || !providerRecord) {
      throw new Error(`Provider ${promptRequest.provider} not found`);
    }

    // Check if provider is available
    if (!(await provider.isAvailable())) {
      throw new Error(`Provider ${promptRequest.provider} is not available`);
    }

    // Enhance the prompt
    const response = await provider.enhancePrompt(promptRequest);

    // Save to history
    await History.create({
      providerId: providerRecord.id,
      originalPrompt: response.originalPrompt,
      enhancedPrompt: response.enhancedPrompt,
      model: response.model,
      enhancementType: promptRequest.enhancementType || 'enhance',
      userRole: promptRequest.userRole || 'general',
      systemPrompt: promptRequest?.systemPrompt ?? '',
      tokensUsed: response?.tokensUsed ?? 0,
      processingTime: response.processingTime,
      temperature: promptRequest?.temperature ?? 0,
      maxTokens: promptRequest?.maxTokens ?? 0,
      rating: 0,
      notes: null,
    });

    return response;
  } catch (error: any) {
    throw new Error(`Prompt enhancement failed: ${error.message}`);
  }
};

export default (fastify: FastifyInstance) => {
  /**
   * Enhances a prompt using the specified AI provider
   * @example
   * // POST /enhance
   * // Body: { model: "openai:gpt-4", prompt: "Hello world" }
   * @developer_notes Provider name is extracted from model ID format "provider:model"
   */
  fastify.post<{ Body: PromptRequest }>('/enhance', async function (this, request, reply) {
    try {
      const response = await enhance(this.providerService, request.body);

      return reply.code(200).send(response);
    } catch (error: any) {
      fastify.log.error('Prompt enhancement failed:', error);
      return reply.code(500).send({
        error: 'Failed to enhance prompt',
        details: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  });
}
