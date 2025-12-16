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
 * Coze AI provider for prompt enhancement and model management.
 *
 * Provides integration with Coze's AI models to enhance and optimize prompts
 * for better AI responses.
 *
 * @example
 * ```typescript
 * const provider = new CozeProvider({apiKey: 'your-api-key'});
 * const response = await provider.enhancePrompt({
 *   text: 'Explain relativity',
 *   model: 'coze-llama3',
 *   enhancementType: 'enhance',
 * });
 * ```
 *
 * @developer-note
 * Ensure you have a valid API key from Coze. The provider uses the default
 * Coze API endpoint but can be customized with a different baseUrl if needed.
 */
export default class CozeProvider extends BaseAIProvider {
  /**
   * Creates a new Coze provider instance.
   * @param config - Configuration object
   */
  constructor(config: ConfigMeta) {
    super('Coze', {baseUrl: config?.baseUrl || 'https://api.coze.cn'});
    this.client.defaults.headers.common['Authorization'] = `Bearer ${config?.apiKey}`;
  }

  /**
   * Retrieves available AI models from Coze.
   *
   * @returns Promise resolving to an array of available AI models
   *
   * @developer-note
   * Currently returns a static list of models. In a production environment,
   * this should fetch the actual available models from the Coze API.
   */
  async getModels(): Promise<AIModel[]> {
    return [
      {
        id: 'coze-llama3',
        name: 'Coze LLaMA 3',
        provider: toProviderName('Coze'),
        description: 'Coze\'s LLaMA 3 based model',
        contextLength: 32768,
        maxTokens: 4096,
      },
      {
        id: 'coze-dolly',
        name: 'Coze Dolly',
        provider: toProviderName('Coze'),
        description: 'Coze\'s Dolly model for general usage',
        contextLength: 2048,
        maxTokens: 1024,
      },
      {
        id: 'coze-gpt4',
        name: 'Coze GPT-4',
        provider: toProviderName('Coze'),
        description: 'Coze\'s GPT-4 compatible model',
        contextLength: 8192,
        maxTokens: 2048,
      },
    ];
  }

  /**
   * Enhances a prompt using Coze's AI models.
   *
   * @param request - The prompt enhancement request containing text and options
   * @returns Promise resolving to the enhanced prompt response
   *
   * @throws Error If the enhancement request fails
   *
   * @developer-note
   * The method uses a chat completion approach with system and user messages.
   * Temperature and max tokens have sensible defaults but can be overridden.
   */
  async enhancePrompt(request: PromptRequest): Promise<PromptResponse> {
    const startTime = Date.now();
    try {
      const systemPrompt = this.buildSystemPrompt(request);

      const response = await this.client.post('/v1/chat/completions', {
        model: request.model,
        messages: [
          {role: 'system', content: systemPrompt},
          {role: 'user', content: `Original prompt: ${request.text}\n\nEnhanced prompt:`},
        ],
        temperature: request.temperature ?? 0.7,
        max_tokens: request.maxTokens ?? 2000,
      });

      const enhancedPrompt = response.data.choices?.[0]?.message?.content?.trim() ?? request.text;

      return {
        enhancedPrompt,
        originalPrompt: request.text,
        model: request.model,
        timestamp: new Date(),
        tokensUsed: response.data.usage?.total_tokens,
        processingTime: this.calculateProcessingTime(startTime),
      };
    } catch (error: any) {
      console.error('Coze enhancement failed:', error);
      throw new Error(`Failed to enhance prompt with Coze: ${error}`);
    }
  }

  /**
   * Checks if the Coze service is available and responsive.
   *
   * @returns Promise resolving to true if service is available, false otherwise
   *
   * @developer-note
   * Performs a minimal API call to test connectivity. Uses coze-llama3 model
   * as it's expected to be consistently available.
   */
  async isAvailable(): Promise<boolean> {
    try {
      const response = await this.client.post('/v1/chat/completions', {
        model: 'coze-llama3',
        messages: [{role: 'user', content: 'test'}],
        max_tokens: 1,
      });
      return !!response.data.choices;
    } catch {
      return false;
    }
  }

  /**
   * Builds a system prompt based on the enhancement type and user role.
   *
   * @param request - The prompt request containing enhancement type and user role
   * @returns A formatted system prompt string
   *
   * @developer-note
   * Combines role-specific prompts with enhancement type instructions.
   * Falls back to general assistant and enhance type if values are invalid.
   */
  private buildSystemPrompt(request: PromptRequest): string {
    const enhancementPrompts = toEnhancementTypes();
    const rolePrompts = toUserRoles();

    const systemPrompt =
      request.systemPrompt ||
      enhancementPrompts[request.enhancementType as keyof typeof enhancementPrompts] ||
      enhancementPrompts.enhance;

    const rolePrompt =
      rolePrompts[request.userRole as keyof typeof rolePrompts] || rolePrompts.general;

    return `${rolePrompt} ${systemPrompt}`;
  }
}
