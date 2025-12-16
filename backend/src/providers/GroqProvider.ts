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
 * Groq AI provider for prompt enhancement.
 *
 * @example
 * ```ts
 * const provider = new GroqProvider({apiKey: 'your-api-key'});
 * const response = await provider.enhancePrompt({
 *   text: 'Explain relativity',
 *   model: 'mixtral-8x7b-32768',
 *   enhancementType: 'enhance',
 * });
 * ```
 *
 * @developerNote This provider uses Groq's API endpoint at https://api.groq.com/openai/v1/chat/completions.
 * It supports Mixtral and LLaMA2 models with various context lengths and token limits.
 */
export default class GroqProvider extends BaseAIProvider {
  /**
   * Creates an instance of GroqProvider.
   * @param config - Configuration object
   */
  constructor(config: ConfigMeta) {
    super('Groq', {baseUrl: config?.baseUrl || 'https://api.groq.com/openai/v1'});
    this.client.defaults.headers.common['Authorization'] = `Bearer ${config?.apiKey}`;
  }

  /**
   * Retrieves available AI models from Groq.
   *
   * @returns Promise resolving to array of available AI models
   *
   * @developerNote Currently returns Mixtral 8x7B (32768 context) and LLaMA2 70B (4096 context) models.
   * These models have different token limits and capabilities.
   */
  async getModels(): Promise<AIModel[]> {
    return [
      {
        id: 'mixtral-8x7b-32768',
        name: 'Groq Mixtral 8x7B',
        provider: toProviderName('Groq'),
        description: 'Groq Mixtral 8x7B model',
        contextLength: 32768,
        maxTokens: 8192,
      },
      {
        id: 'llama2-70b-4096',
        name: 'Groq LLaMA2 70B',
        provider: toProviderName('Groq'),
        description: 'Groq LLaMA2 70B model',
        contextLength: 4096,
        maxTokens: 2048,
      },
    ];
  }

  /**
   * Enhances a prompt using Groq's AI models.
   *
   * @param request - The prompt enhancement request containing text, model, and options
   * @returns Promise resolving to enhanced prompt response
   *
   * @example
   * ```ts
   * const response = await provider.enhancePrompt({
   *   text: 'Explain relativity',
   *   model: 'mixtral-8x7b-32768',
   *   enhancementType: 'enhance',
   *   temperature: 0.7,
   * });
   * ```
   *
   * @developerNote Uses system prompts based on enhancement type and user role.
   * Falls back to original text if enhancement fails. Measures processing time and token usage.
   */
  async enhancePrompt(request: PromptRequest): Promise<PromptResponse> {
    const startTime = Date.now();

    const systemPrompt = this.buildSystemPrompt(request);

    const response = await this.client.post('/chat/completions', {
      model: request.model,
      messages: [
        {role: 'system', content: systemPrompt},
        {
          role: 'user',
          content: `Original prompt: ${request.text}\n\nEnhanced prompt:`,
        },
      ],
      temperature: request.temperature ?? 0.7,
      max_tokens: request.maxTokens ?? 2000,
    });

    const enhancedPrompt =
      response.data.choices?.[0]?.message?.content?.trim() ?? request.text;

    return {
      enhancedPrompt,
      originalPrompt: request.text,
      model: request.model,
      timestamp: new Date(),
      tokensUsed: response.data.usage?.total_tokens,
      processingTime: this.calculateProcessingTime(startTime),
    };
  }

  /**
   * Checks if the Groq API service is available.
   *
   * @returns Promise resolving to boolean indicating service availability
   *
   * @developerNote Performs a minimal API call with Mixtral model to test connectivity.
   * Returns false on any API error or if response format is unexpected.
   */
  async isAvailable(): Promise<boolean> {
    try {
      const resp = await this.client.post('/chat/completions', {
        model: 'mixtral-8x7b-32768',
        messages: [{role: 'user', content: 'test'}],
        max_tokens: 1,
      });
      return !!resp.data.choices;
    } catch {
      return false;
    }
  }

  /**
   * Builds a system prompt based on enhancement type and user role.
   *
   * @param request - The prompt request containing enhancement type and user role
   * @returns Combined system prompt string
   *
   * @developerNote Combines role-specific prompts with enhancement-type prompts.
   * Falls back to 'enhance' type and 'general' role if invalid values provided.
   */
  private buildSystemPrompt(request: PromptRequest): string {
    const enhancementPrompts = toEnhancementTypes();
    const rolePrompts = toUserRoles();

    const systemPrompt =
      request.systemPrompt ??
      enhancementPrompts[request.enhancementType as keyof typeof enhancementPrompts] ??
      enhancementPrompts.enhance;

    const rolePrompt =
      rolePrompts[request.userRole as keyof typeof rolePrompts] ?? rolePrompts.general;

    return `${rolePrompt} ${systemPrompt}`;
  }
}
