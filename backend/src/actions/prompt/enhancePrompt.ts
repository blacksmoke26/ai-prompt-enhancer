/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// classes
import { AIProviderManager } from '~/services/AIProviderManager';
import { HistoryManager } from '~/services/HistoryManager';

// types
import type {PromptRequest, PromptResponse} from '~/types';

/**
 * Enhances a prompt using the specified AI provider
 * @param providerManager - Instance of AIProviderManager
 * @param historyManager - Instance of HistoryManager
 * @param promptRequest - Request containing prompt and enhancement details
 * @returns Enhanced prompt response
 */
export default async function enhancePrompt(
  providerManager: AIProviderManager,
  historyManager: HistoryManager,
  promptRequest: PromptRequest
): Promise<PromptResponse> {
  try {
    // Extract provider name from model ID
    const provider = providerManager.getProvider(promptRequest.provider);

    if (!provider) {
      throw new Error(`Provider ${promptRequest.provider} not found`);
    }

    // Check if provider is available
    if (!(await provider.isAvailable())) {
      throw new Error(`Provider ${promptRequest.provider} is not available`);
    }

    // Enhance the prompt
    const response = await provider.enhancePrompt(promptRequest);

    // Save to history
    historyManager.addToHistory({
      provider: promptRequest.provider,
      originalPrompt: response.originalPrompt,
      enhancedPrompt: response.enhancedPrompt,
      model: response.model,
      enhancementType: promptRequest.enhancementType || 'enhance',
      userRole: promptRequest.userRole || 'general',
      systemPrompt: promptRequest.systemPrompt,
      timestamp: response.timestamp,
      tokensUsed: response.tokensUsed,
      processingTime: response.processingTime,
      temperature: promptRequest.temperature,
      maxTokens: promptRequest.maxTokens,

    });

    return response;
  } catch (error: any) {
    throw new Error(`Prompt enhancement failed: ${error.message}`);
  }
}
