/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import BaseAIProvider from '~/base/BaseAIProvider';

// utils
import {toEnhancementTypes, toUserRoles} from '~/utils/prompts';

// types
import type { AIModel, PromptRequest, PromptResponse } from '~/types';

/**
 * Kimi AI provider for prompt enhancement.
 *
 * Implements integration with Kimi's API to enhance user prompts using various
 * enhancement types and roles. Built on top of BaseAIProvider for consistency.
 *
 * @example
 * ```ts
 * const provider = new KimiProvider('your-api-key');
 * const response = await provider.enhancePrompt({
 *   text: 'Explain relativity',
 *   model: 'kimi-large',
 *   enhancementType: 'enhance',
 * });
 * ```
 *
 * @developer Note: Requires valid API key. Default base URL is https://api.kimi.ai
 */
export default class KimiProvider extends BaseAIProvider {
  /**
   * Creates a new Kimi AI provider instance.
   *
   * @param apiKey - The API key for authentication
   * @param baseURL - Optional custom base URL (defaults to https://api.kimi.ai)
   */
  constructor(apiKey: string, baseURL?: string) {
    super('Kimi', baseURL || 'https://api.kimi.ai');
    this.client.defaults.headers.common['Authorization'] = `Bearer ${apiKey}`;
  }

  /**
   * Retrieves available Kimi AI models.
   *
   * @returns Array of supported AI models with their specifications
   * @developer Note: Currently supports kimi-large and kimi-3.5 models
   */
  async getModels(): Promise<AIModel[]> {
    return [
      {
        id: 'kimi-large',
        name: 'Kimi Large',
        provider: 'Kimi',
        description: 'Kimi large conversational model',
        contextLength: 32768,
        maxTokens: 4096,
      },
      {
        id: 'kimi-3.5',
        name: 'Kimi 3.5',
        provider: 'Kimi',
        description: 'Kimi 3.5 model',
        contextLength: 16384,
        maxTokens: 2048,
      },
    ];
  }

  /**
   * Enhances a prompt using Kimi AI.
   *
   * @param request - The prompt enhancement request configuration
   * @returns Enhanced prompt response with metadata
   * @throws Error when enhancement fails
   * @developer Note: Uses temperature 0.7 and maxTokens 2000 as defaults
   */
  async enhancePrompt(request: PromptRequest): Promise<PromptResponse> {
    const startTime = Date.now();

    try {
      const systemPrompt = this.buildSystemPrompt(request);

      const response = await this.client.post('/v1/chat/completions', {
        model: request.model,
        messages: [
          { role: 'system', content: systemPrompt },
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
    } catch (error: any) {
      console.error('Kimi enhancement failed:', error);
      throw new Error(`Failed to enhance prompt with Kimi: ${error}`);
    }
  }

  /**
   * Checks if Kimi AI service is available.
   *
   * @returns True if service is responding correctly
   * @developer Note: Sends minimal test request to verify connectivity
   */
  async isAvailable(): Promise<boolean> {
    try {
      const resp = await this.client.post('/v1/chat/completions', {
        model: 'kimi-large',
        messages: [{ role: 'user', content: 'test' }],
        max_tokens: 1,
      });
      return !!resp.data.choices;
    } catch {
      return false;
    }
  }

  /**
   * Builds system prompt based on enhancement type and user role.
   *
   * @param request - The prompt request containing enhancement preferences
   * @returns Complete system prompt string
   * @developer Note: Combines role-specific and enhancement-type prompts
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
