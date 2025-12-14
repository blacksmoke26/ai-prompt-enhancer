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
import type { AIModel, PromptRequest, PromptResponse } from '~/types';

/**
 * Nvidia AI provider for prompt enhancement using Nvidia's API.
 *
 * This provider integrates with Nvidia's API to enhance prompts through
 * various enhancement types and user roles. It supports models like LLaMA3 and Dolly.
 *
 * @example
 * ```ts
 * const provider = new NvidiaProvider({apiKey: 'your-api-key'});
 * const response = await provider.enhancePrompt({
 *   text: 'Explain quantum computing',
 *   model: 'nvidia-llama3',
 *   enhancementType: 'enhance',
 *   userRole: 'educator'
 * });
 * ```
 *
 * @developerNotes
 * - Requires valid Nvidia API key
 * - Default base URL: https://integrate.nvidia.com/v1
 * - Supports customization of system prompts
 * - Handles API errors gracefully with detailed logging
 */
export default class NvidiaProvider extends BaseAIProvider {
  /**
   * Creates an instance of the Nvidia provider.
   * @param config - Configuration object
   */
  constructor(config: ConfigMeta) {
    super('Nvidia', {baseUrl: config?.baseUrl || 'https://integrate.nvidia.com/v1'});
    this.client.defaults.headers.common['Authorization'] = `Bearer ${config?.apiKey}`;
  }

  /**
   * Retrieves available AI models for the Nvidia provider.
   * @returns Array of available AI models
   */
  async getModels(): Promise<AIModel[]> {
    return [
      {
        id: 'nvidia-llama3',
        name: 'Nvidia LLaMA3',
        provider: 'Nvidia',
        description: 'Nvidia LLaMA3 model',
        contextLength: 32768,
        maxTokens: 8192,
      },
      {
        id: 'nvidia-dolly',
        name: 'Nvidia Dolly',
        provider: 'Nvidia',
        description: 'Nvidia Dolly model',
        contextLength: 16384,
        maxTokens: 4096,
      },
    ];
  }

  /**
   * Enhances a prompt using Nvidia's AI models.
   * @param request - The prompt enhancement request
   * @returns Enhanced prompt response
   * @throws Error when enhancement fails
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

      const enhanced = response.data.choices?.[0]?.message?.content?.trim() ?? request.text;

      return {
        enhancedPrompt: enhanced,
        originalPrompt: request.text,
        model: request.model,
        timestamp: new Date(),
        tokensUsed: response.data.usage?.total_tokens,
        processingTime: this.calculateProcessingTime(startTime),
      };
    } catch (error: any) {
      console.error('Nvidia enhancement failed:', error);
      throw new Error(`Failed to enhance prompt with Nvidia: ${error}`);
    }
  }

  /**
   * Checks if the Nvidia provider is available and functional.
   * @returns True if provider is available, false otherwise
   */
  async isAvailable(): Promise<boolean> {
    try {
      const resp = await this.client.post('/chat/completions', {
        model: 'nvidia-llama3',
        messages: [{ role: 'user', content: 'test' }],
        max_tokens: 1,
      });
      return !!resp.data.choices;
    } catch {
      return false;
    }
  }

  /**
   * Builds a system prompt based on the enhancement type and user role.
   * @param request - The prompt request containing enhancement type and user role
   * @returns Constructed system prompt
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
