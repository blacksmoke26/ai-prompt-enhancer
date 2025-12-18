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
 * Anthropic AI provider for prompt enhancement.
 *
 * @example
 * ```ts
 * const provider = new AnthropicProvider({apiKey: 'your-api-key'});
 * const enhanced = await provider.enhancePrompt({
 *   text: 'Explain relativity',
 *   model: 'claude-3-haiku-20240307',
 *   enhancementType: 'enhance'
 * });
 * ```
 * @developerNote Uses Anthropic's Claude models with custom system prompts for different enhancement types
 */
export default class AnthropicProvider extends BaseAIProvider {
  /**
   * Creates a new Anthropic provider instance.
   * @param config - Configuration object
   */
  constructor(config: ConfigMeta) {
    super('Anthropic', {baseUrl: config?.baseUrl || 'https://api.anthropic.com/v1'});
    this.client.defaults.headers.common['Authorization'] = `Bearer ${config?.apiKey}`;
    this.client.defaults.headers.common['Anthropic-Version'] = '2023-06-01';
    this.client.defaults.headers.common['Content-Type'] = 'application/json';
  }

  /**
   * Returns available Anthropic models.
   * @developerNote Currently includes Claude 3.5 Sonnet and Claude 3 Haiku with their specifications
   */
  async getModels(): Promise<AIModel[]> {
    return [
      {
        id: 'claude-3-5-sonnet-20240620',
        name: 'Claude 3.5 Sonnet',
        provider: toProviderName('Anthropic'),
        description: 'Claude 3.5 Sonnet model',
        contextLength: 8192,
        maxTokens: 4096,
      },
      {
        id: 'claude-3-haiku-20240307',
        name: 'Claude 3 Haiku',
        provider: toProviderName('Anthropic'),
        description: 'Claude 3 Haiku model',
        contextLength: 4096,
        maxTokens: 2048,
      },
    ];
  }

  /**
   * Enhances a prompt using Anthropic's Claude models.
   * @param request - The prompt enhancement request
   * @returns Enhanced prompt response with metadata
   * @developerNote Sends the original prompt with a system instruction for enhancement
   */
  async enhancePrompt(request: PromptRequest): Promise<PromptResponse> {
    const startTime = Date.now();

    const systemPrompt = await this.buildSystemPrompt(request);

    try {
      const response = await this.client.post('/messages', {
        model: request.model,
        max_tokens: request.maxTokens ?? 2000,
        temperature: request.temperature ?? 0.7,
        system: this.formatSystemPrompt(systemPrompt),
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: this.formatPrompt(request),
              },
            ],
          },
        ],
      });

      const enhanced = this.toPromptResponse(response.data.content?.[0]?.text, request.text);

      return {
        enhancedPrompt: enhanced,
        originalPrompt: request.text,
        model: request.model,
        timestamp: new Date(),
        tokensUsed: response.data.usage?.total_tokens,
        processingTime: this.calculateProcessingTime(startTime),
      };
    } catch (error: any) {
      console.error('Anthropic enhancement failed:', error);
      throw new Error(`Failed to enhance prompt with Anthropic: ${error}`);
    }
  }

  /**
   * Checks if the Anthropic API is accessible.
   * @developerNote Makes a minimal API call with Claude 3 Haiku to verify connectivity
   */
  async isAvailable(): Promise<boolean> {
    try {
      const resp = await this.client.post('/messages', {
        model: 'claude-3-haiku-20240307',
        max_tokens: 1,
        temperature: 0,
        system: 'You are a helpful assistant.',
        messages: [
          {role: 'user', content: [{type: 'text', text: 'test'}]},
        ],
      });
      return !!resp.data.content;
    } catch {
      return false;
    }
  }
}
