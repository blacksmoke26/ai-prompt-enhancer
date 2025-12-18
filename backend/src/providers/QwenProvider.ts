/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import BaseAIProvider from '~/base/BaseAIProvider';

// utils
import {toProviderName} from '~/utils/provider';
import {toEnhancementTypes, toUserRoles} from '~/utils/prompts';

// types
import type {ConfigMeta} from '~/database/models';
import type {AIModel, PromptRequest, PromptResponse} from '~/types';

/**
 * Qwen AI provider for language model series.
 * Provides integration with Qwen AI's chat completion API.
 *
 * @example
 * ```ts
 * const provider = new QwenProvider({apiKey: 'your-api-key'});
 * const response = await provider.enhancePrompt({
 *   text: 'Explain quantum computing',
 *   model: 'qwen-max',
 *   enhancementType: 'enhance',
 * });
 * ```
 * @developerNote
 * Ensure proper API key management and consider rate limits.
 * The base URL can be customized for different deployment environments.
 */
export default class QwenProvider extends BaseAIProvider {
  /**
   * Initializes a new Qwen provider instance.
   * @param config - Configuration object
   */
  constructor(config: ConfigMeta) {
    super('Qwen', {baseUrl: config?.baseUrl || 'https://dashscope-intl.aliyuncs.com/compatible-mode/v1'});
    this.client.defaults.headers.common['Authorization'] = `Bearer ${config?.apiKey}`;
    this.client.defaults.headers.common['Content-Type'] = 'application/json';
  }

  /**
   * Retrieves available Qwen models with their specifications.
   * @returns Promise resolving to an array of AI model configurations
   * @developerNote
   * This list should be updated when new models are released.
   * Consider fetching dynamically from the API for production use.
   */
  async getModels(): Promise<AIModel[]> {
    return [
      {
        id: 'qwen-max',
        provider: toProviderName('Qwen'),
        name: 'Qwen Max',
        description: 'Most capable model for complex tasks',
        maxTokens: 8192,
        contextLength: 8192,
      },
      {
        id: 'qwen-plus',
        provider: toProviderName('Qwen'),
        name: 'Qwen Plus',
        description: 'Balanced model for general tasks',
        maxTokens: 4096,
        contextLength: 4096,
      },
      {
        id: 'qwen-turbo',
        provider: toProviderName('Qwen'),
        name: 'Qwen Turbo',
        description: 'Fast and efficient model for simple tasks',
        maxTokens: 2048,
        contextLength: 2048,
      },
    ];
  }

  /**
   * Enhances a prompt using Qwen's language models.
   * @param request - The prompt enhancement request containing text and options
   * @returns Promise resolving to the enhanced prompt response
   * @developerNote
   * Handles API errors gracefully and provides fallback to original prompt.
   * Processing time is calculated client-side.
   */
  async enhancePrompt(request: PromptRequest): Promise<PromptResponse> {
    const startTime = Date.now();

    try {
      const systemPrompt = await this.buildSystemPrompt(request);

      const response = await this.client.post('/chat/completions', {
        model: request.model || 'qwen-plus',
        messages: [
          {
            role: 'system',
            content: this.formatSystemPrompt(systemPrompt),
          },
          {
            role: 'user',
            content: request.text,
          },
        ],
        temperature: request.temperature ?? 0.7,
        max_tokens: request.maxTokens,
      });

      const enhanced = this.toPromptResponse(response.data.output?.choices?.[0]?.content, request.text);

      return {
        enhancedPrompt: enhanced,
        originalPrompt: request.text,
        model: request.model,
        timestamp: new Date(),
        tokensUsed: response.data.usage?.total_tokens,
        processingTime: this.calculateProcessingTime(startTime),
      };
    } catch (error) {
      console.error('Qwen enhancement failed:', error);
      throw new Error(`Failed to enhance prompt with Qwen: ${error}`);
    }
  }

  /**
   * Checks if the Qwen service is available and responsive.
   * @returns Promise resolving to true if service is available, false otherwise
   * @developerNote
   * Uses a minimal request to test connectivity. Consider implementing retry logic.
   */
  async isAvailable(): Promise<boolean> {
    try {
      await this.client.get('/models');
      return true;
    } catch {
      return false;
    }
  }
}
