/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// classes
import {AIProviderManager} from '~/services/AIProviderManager';

// types
import type {PromptRequest, PromptResponse} from '~/types';
import {History, Provider} from '~/database/models';

/**
 * Enhances a prompt using the specified AI provider
 * @param providerManager - Instance of AIProviderManager
 * @param promptRequest - Request containing prompt and enhancement details
 * @returns Enhanced prompt response
 */
export default async function enhancePrompt(
  providerManager: AIProviderManager,
  promptRequest: PromptRequest,
): Promise<PromptResponse> {
  try {
    // Extract provider name from model ID
    const provider = providerManager.getProvider(promptRequest.provider);
    const providerRecord = await Provider.findOne({
      where: {name: promptRequest.provider.toLowerCase(), enabled: true},
      attributes: ['id'],
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
    });

    return response;
  } catch (error: any) {
    throw new Error(`Prompt enhancement failed: ${error.message}`);
  }
}
