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
 * XAI provider for prompt enhancement using XAI's language models.
 *
 * Integrates with XAI's API to enhance and optimize user prompts through various enhancement types.
 * @example
 * ```ts
 * const provider = new XAIProvider('your-api-key');
 * const enhanced = await provider.enhancePrompt({
 *   text: 'Explain quantum computing',
 *   model: 'xai-gpt4',
 *   enhancementType: 'enhance'
 * });
 * ```
 */
export default class XAIProvider extends BaseAIProvider {
  /**
   * Creates a new XAI provider instance.
   * @param apiKey - XAI API authentication key
   * @param baseURL - Optional custom base URL (defaults to XAI's API)
   */
  constructor(apiKey: string, baseURL?: string) {
    super('XAI', baseURL || 'https://api.x.ai/v1');
    this.client.defaults.headers.common['Authorization'] = `Bearer ${apiKey}`;
  }

  /**
   * Retrieves available XAI models for prompt enhancement.
   * @returns Array of supported AI models with their specifications
   */
  async getModels(): Promise<AIModel[]> {
    return [
      {
        id: 'xai-gpt4',
        name: 'XAI GPT‑4',
        provider: 'XAI',
        description: 'XAI GPT‑4 model',
        contextLength: 65536,
        maxTokens: 8192,
      },
      {
        id: 'xai-dolly',
        name: 'XAI Dolly',
        provider: 'XAI',
        description: 'XAI Dolly model',
        contextLength: 16384,
        maxTokens: 4096,
      },
    ];
  }

  /**
   * Enhances a prompt using XAI's language models.
   * @param request - Prompt enhancement request parameters
   * @returns Enhanced prompt response with metadata
   * @throws Error if enhancement fails
   */
  async enhancePrompt(request: PromptRequest): Promise<PromptResponse> {
    const startTime = Date.now();

    try {
      const systemPrompt = this.buildSystemPrompt(request);

      const response = await this.client.post('/chat/completions', {
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
      console.error('XAI enhancement failed:', error);
      throw new Error(`Failed to enhance prompt with XAI: ${error}`);
    }
  }

  /**
   * Checks if XAI service is available and responsive.
   * @returns True if service is available, false otherwise
   */
  async isAvailable(): Promise<boolean> {
    try {
      const resp = await this.client.post('/chat/completions', {
        model: 'xai-gpt4',
        messages: [{ role: 'user', content: 'test' }],
        max_tokens: 1,
      });
      return !!resp.data.choices;
    } catch {
      return false;
    }
  }

  /**
   * Builds a system prompt based on enhancement type and user role.
   * @param request - Prompt request containing enhancement parameters
   * @returns Combined system prompt string
   * @private
   */
  private buildSystemPrompt(request: PromptRequest): string {
    const enhancementPrompts = toEnhancementTypes();
    const rolePrompts = toUserRoles();

    const system =
      request.systemPrompt ??
      enhancementPrompts[request.enhancementType as keyof typeof enhancementPrompts] ??
      enhancementPrompts.enhance;

    const role = rolePrompts[request.userRole as keyof typeof rolePrompts] ?? rolePrompts.general;

    return `${role} ${system}`;
  }
}
