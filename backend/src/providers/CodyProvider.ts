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
import type {AIModel, PromptRequest, PromptResponse} from '~/types';
import type {ConfigMeta} from '~/database/models';

/**
 * Cody AI provider for prompt enhancement and optimization.
 *
 * @example
 * ```ts
 * const provider = new CodyProvider({apiKey: 'your-api-key'});
 * const response = await provider.enhancePrompt({
 *   text: 'Explain quantum computing',
 *   model: 'cody-general',
 *   enhancementType: 'enhance',
 * });
 * console.log(response.enhancedPrompt);
 * ```
 *
 * @developerNotes
 * - Requires valid Cody AI API key
 * - Default base URL: https://api.cody.ai/v1
 * - Supports multiple enhancement types and user roles
 * - Automatic fallback to original prompt if enhancement fails
 */
export default class CodyProvider extends BaseAIProvider {
  /**
   * Initializes a new CodyProvider instance.
   * @param config - Configuration object
   * @example
   * ```ts
   * const provider = new CodyProvider({apiKey: 'sk-xxx', baseUrl: 'https://custom-api.cody.ai'});
   * ```
   */
  constructor(config: ConfigMeta) {
    super('Cody', {baseUrl: config?.baseUrl ||  'https://api.cody.ai/v1'});
    this.client.defaults.headers.common['Authorization'] = `Bearer ${config?.apiKey}`;
  }

  /**
   * Retrieves available Cody AI models.
   *
   * @returns Promise resolving to array of available AI models
   *
   * @example
   * ```ts
   * const models = await provider.getModels();
   * console.log(models.map(m => m.name)); // ['Cody Code', 'Cody General']
   * ```
   */
  async getModels(): Promise<AIModel[]> {
    return [
      {
        id: 'cody-code',
        name: 'Cody Code',
        provider: toProviderName('Cody'),
        description: 'Cody model optimized for code generation',
        contextLength: 16384,
        maxTokens: 2048,
      },
      {
        id: 'cody-general',
        name: 'Cody General',
        provider: toProviderName('Cody'),
        description: 'Cody model optimized for general conversation',
        contextLength: 32768,
        maxTokens: 4096,
      },
    ];
  }

  /**
   * Enhances a prompt using Cody AI with various optimization strategies.
   *
   * @param request - Prompt enhancement request configuration
   * @returns Promise resolving to enhanced prompt response
   *
   * @example
   * ```ts
   * const response = await provider.enhancePrompt({
   *   text: 'Make a website',
   *   model: 'cody-code',
   *   enhancementType: 'optimize',
   *   userRole: 'developer'
   * });
   * ```
   *
   * @developerNotes
   * - Automatically includes processing time and token usage
   * - Falls back to original prompt if API fails
   * - Supports temperature and max tokens customization
   */
  async enhancePrompt(request: PromptRequest): Promise<PromptResponse> {
    const startTime = Date.now();
    try {
      const systemPrompt = await this.buildSystemPrompt(request);
      const response = await this.client.post('/chat', {
        model: request.model,
        messages: [
          {role: 'system', content: this.formatSystemPrompt(systemPrompt)},
          {
            role: 'user',
            content: this.formatPrompt(request),
          },
        ],
        temperature: request.temperature ?? 0.7,
        max_tokens: request.maxTokens ?? 2000,
      });

      const enhanced = this.toPromptResponse(response.data.choices?.[0]?.message?.content, request.text);

      return {
        enhancedPrompt: enhanced,
        originalPrompt: request.text,
        model: request.model,
        timestamp: new Date(),
        tokensUsed: response.data.usage?.total_tokens,
        processingTime: this.calculateProcessingTime(startTime),
      };
    } catch (error: any) {
      console.error('Cody enhancement failed:', error);
      throw new Error(`Failed to enhance prompt with Cody: ${error}`);
    }
  }

  /**
   * Checks if the Cody AI service is available and responsive.
   *
   * @returns Promise resolving to true if service is available
   *
   * @example
   * ```ts
   * if (await provider.isAvailable()) {
   *   console.log('Cody AI is ready');
   * }
   * ```
   */
  async isAvailable(): Promise<boolean> {
    try {
      const resp = await this.client.post('/chat', {
        model: 'cody-general',
        messages: [{role: 'user', content: 'test'}],
        max_tokens: 1,
      });
      return !!resp.data.choices;
    } catch {
      return false;
    }
  }
}
