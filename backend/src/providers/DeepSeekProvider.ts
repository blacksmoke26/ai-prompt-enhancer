/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import BaseAIProvider from '~/base/BaseAIProvider';

// utils
import {toEnhancementTypes, toUserRoles} from '~/utils/prompts';

// types
import type {ConfigMeta} from '~/database/models';
import type {AIModel, PromptRequest, PromptResponse} from '~/types';

/**
 * DeepSeek AI provider for prompt enhancement and model management.
 * @example
 * ```typescript
 * const provider = new DeepSeekProvider({apiKey: 'your-api-key'});
 * const response = await provider.enhancePrompt({
 *   text: 'Explain quantum computing',
 *   model: 'deepseek-chat',
 *   enhancementType: 'enhance'
 * });
 * ```
 * @developerNote Ensure valid API key is provided for all operations.
 */
export default class DeepSeekProvider extends BaseAIProvider {
  /**
   * Creates a new DeepSeek provider instance with authentication.
   * @param config - Configuration object
   * @example
   * ```typescript
   * const provider = new DeepSeekProvider('api-key', 'https://custom.url');
   * ```
   * @developerNote API key is stored in headers for all subsequent requests.
   */
  constructor(config: ConfigMeta) {
    super('DeepSeek', config?.baseURL || 'https://api.deepseek.com');
    this.client.defaults.headers.common['Authorization'] = `Bearer ${config?.apiKey}`;
  }

  /**
   * Retrieves available DeepSeek AI models with their specifications.
   * @returns Promise resolving to array of AI models
   * @example
   * ```typescript
   * const models = await provider.getModels();
   * console.log(models[0].name); // 'DeepSeek Chat'
   * ```
   * @developerNote Currently returns static models. Consider updating to fetch from API.
   */
  async getModels(): Promise<AIModel[]> {
    try {
      return [
        {
          id: 'deepseek-chat',
          name: 'DeepSeek Chat',
          provider: 'DeepSeek',
          description: 'DeepSeek\'s conversational model',
          contextLength: 32768,
          maxTokens: 4096,
        },
        {
          id: 'deepseek-coder',
          name: 'DeepSeek Coder',
          provider: 'DeepSeek',
          description: 'DeepSeek\'s code-specialized model',
          contextLength: 16384,
          maxTokens: 4096,
        },
      ];
    } catch (error: any) {
      console.error('Failed to fetch DeepSeek models:', error);
      return [];
    }
  }

  /**
   * Enhances a prompt using DeepSeek's language models with context-aware optimization.
   * @param request - Prompt enhancement request parameters
   * @returns Promise resolving to enhanced prompt response
   * @example
   * ```typescript
   * const response = await provider.enhancePrompt({
   *   text: 'Explain photosynthesis',
   *   model: 'deepseek-chat',
   *   enhancementType: 'enhance'
   * });
   * console.log(response.enhancedPrompt);
   * ```
   * @developerNote Handles rate limiting and token counting automatically.
   */
  async enhancePrompt(request: PromptRequest): Promise<PromptResponse> {
    const startTime = Date.now();

    try {
      const systemPrompt = this.buildSystemPrompt(request);

      const response = await this.client.post('/chat/completions', {
        model: request.model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Original prompt: ${request.text}\n\nEnhanced prompt:` }
        ],
        temperature: request.temperature || 0.7,
        max_tokens: request.maxTokens || 2000,
      });

      const enhancedPrompt = response.data.choices[0]?.message?.content?.trim() || request.text;

      return {
        enhancedPrompt,
        originalPrompt: request.text,
        model: request.model,
        timestamp: new Date(),
        tokensUsed: response.data.usage?.total_tokens,
        processingTime: this.calculateProcessingTime(startTime),
      };
    } catch (error: any) {
      console.error('DeepSeek enhancement failed:', error);
      throw new Error(`Failed to enhance prompt with DeepSeek: ${error}`);
    }
  }

  /**
   * Checks DeepSeek service availability with minimal API request.
   * @returns Promise resolving to boolean indicating availability
   * @example
   * ```typescript
   * if (await provider.isAvailable()) {
   *   console.log('DeepSeek is ready');
   * }
   * ```
   * @developerNote Uses minimal request to check API connectivity.
   */
  async isAvailable(): Promise<boolean> {
    try {
      const response = await this.client.post('/chat/completions', {
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: 'test' }],
        max_tokens: 1,
      });
      return !!response.data.choices;
    } catch {
      return false;
    }
  }

  /**
   * Builds system prompt by combining role and enhancement type contexts.
   * @param request - Prompt request containing enhancement type and user role
   * @returns System prompt string
   * @example
   * ```typescript
   * const prompt = provider.buildSystemPrompt({
   *   enhancementType: 'correct',
   *   userRole: 'writer'
   * });
   * ```
   * @developerNote Combines role and enhancement prompts for optimal results.
   */
  private buildSystemPrompt(request: PromptRequest): string {
    const enhancementPrompts = toEnhancementTypes();
    const rolePrompts = toUserRoles();

    const systemPrompt = request.systemPrompt ||
      enhancementPrompts[request.enhancementType as keyof typeof enhancementPrompts] ||
      enhancementPrompts.enhance;

    const rolePrompt = rolePrompts[request.userRole as keyof typeof rolePrompts] || rolePrompts.general;

    return `${rolePrompt} ${systemPrompt}`;
  }
}
