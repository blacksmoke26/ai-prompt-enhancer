/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import { BaseAIProvider } from '~/base/BaseAIProvider';

// utils
import {toEnhancementTypes, toUserRoles} from '~/utils/prompts';

// types
import type { AIModel, PromptRequest, PromptResponse } from '~/types';

/**
 * SiliconFlow AI provider for prompt enhancement and model management.
 *
 * Base URL: https://api.siliconflow.cn/v1
 * Endpoint: /chat/completions
 *
 * @example
 * ```ts
 * const provider = new SiliconFlowProvider('your-api-key');
 * const response = await provider.enhancePrompt({
 *   text: 'Explain relativity',
 *   model: 'siliconflow-llama3',
 *   enhancementType: 'enhance',
 * });
 * ```
 *
 * @developerNote This provider requires a valid API key and supports multiple enhancement types.
 */
export class SiliconFlowProvider extends BaseAIProvider {
  /**
   * Creates a new SiliconFlow provider instance.
   *
   * @param apiKey - The API key for authentication
   * @param baseURL - Optional custom base URL
   */
  constructor(apiKey: string, baseURL?: string) {
    super('SiliconFlow', baseURL || 'https://api.siliconflow.cn/v1');
    this.client.defaults.headers.common['Authorization'] = `Bearer ${apiKey}`;
  }

  /**
   * Retrieves available AI models.
   *
   * @returns Array of supported AI models
   * @developerNote Returns static list of models - could be updated to fetch from API
   */
  async getModels(): Promise<AIModel[]> {
    return [
      {
        id: 'siliconflow-llama3',
        name: 'SiliconFlow LLaMA 3',
        provider: 'SiliconFlow',
        description: 'SiliconFlow LLaMA 3 model',
        contextLength: 32768,
        maxTokens: 8192,
      },
      {
        id: 'siliconflow-dolly',
        name: 'SiliconFlow Dolly',
        provider: 'SiliconFlow',
        description: 'SiliconFlow Dolly model',
        contextLength: 4096,
        maxTokens: 2048,
      },
    ];
  }

  /**
   * Enhances a prompt using SiliconFlow's AI models.
   *
   * @param request - The prompt enhancement request
   * @returns Enhanced prompt response
   * @throws Error if enhancement fails
   * @developerNote Uses temperature 0.7 and maxTokens 2000 as defaults
   */
  async enhancePrompt(request: PromptRequest): Promise<PromptResponse> {
    const startTime = Date.now();
    try {
      const systemPrompt = this.buildSystemPrompt(request);
      const response = await this.client.post('/chat/completions', {
        model: request.model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Original prompt: ${request.text}\n\nEnhanced prompt:` },
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
      console.error('SiliconFlow enhancement failed:', error);
      throw new Error(`Failed to enhance prompt with SiliconFlow: ${error}`);
    }
  }

  /**
   * Checks if the SiliconFlow service is available.
   *
   * @returns True if service is responsive
   * @developerNote Makes a minimal API call to test connectivity
   */
  async isAvailable(): Promise<boolean> {
    try {
      const resp = await this.client.post('/chat/completions', {
        model: 'siliconflow-llama3',
        messages: [{ role: 'user', content: 'test' }],
        max_tokens: 1,
      });
      return !!resp.data.choices;
    } catch {
      return false;
    }
  }

  /**
   * Builds system prompt for the request.
   *
   * @param request - The prompt request
   * @returns System prompt string
   * @developerNote Delegates to buildDefaultSystemPrompt
   */
  private buildSystemPrompt(request: PromptRequest): string {
    return this.buildDefaultSystemPrompt(request);
  }

  /**
   * Builds default system prompt based on enhancement type and user role.
   *
   * @param request - The prompt request
   * @returns Formatted system prompt
   * @developerNote Combines role and enhancement type prompts
   */
  private buildDefaultSystemPrompt(request: PromptRequest): string {
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
