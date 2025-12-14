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
 * Mistral AI provider implementation for prompt enhancement and model management.
 *
 * This provider integrates with Mistral's API to offer prompt enhancement capabilities
 * and model information. It supports various enhancement types and user roles.
 *
 * @example
 * ```ts
 * const provider = new MistralProvider({apiKey: 'your-api-key'});
 * const response = await provider.enhancePrompt({
 *   text: 'Explain quantum computing',
 *   model: 'mistral-large-latest',
 *   enhancementType: 'enhance',
 * });
 * console.log(response.enhancedPrompt);
 * ```
 *
 * @developer-notes
 * - Requires valid Mistral API key
 * - Default endpoint: https://api.mistral.ai/v1
 * - Supports custom base URL for enterprise deployments
 * - All API calls are authenticated with Bearer token
 */
export default class MistralProvider extends BaseAIProvider {
  /**
   * Creates a new Mistral provider instance.
   * @param config - Configuration object
   *
   * @developer-notes
   * - Automatically sets up Bearer token authentication
   * - Falls back to default Mistral API URL if none provided
   */
  constructor(config: ConfigMeta) {
    super('Mistral', config?.baseURL || 'https://api.mistral.ai/v1');
    this.client.defaults.headers.common['Authorization'] = `Bearer ${config?.apiKey}`;
  }

  /**
   * Retrieves available Mistral AI models with their specifications.
   *
   * @returns Promise resolving to array of available AI models
   *
   * @developer-notes
   * Currently returns static list of supported models:
   * - mistral-large-latest: High capability model with 32K context
   * - mistral-small-latest: Efficient model with 16K context
   */
  async getModels(): Promise<AIModel[]> {
    return [
      {
        id: 'mistral-large-latest',
        name: 'Mistral Large',
        provider: 'Mistral',
        description: 'Mistral Large conversational model',
        contextLength: 32768,
        maxTokens: 8192,
      },
      {
        id: 'mistral-small-latest',
        name: 'Mistral Small',
        provider: 'Mistral',
        description: 'Mistral Small conversational model',
        contextLength: 16384,
        maxTokens: 4096,
      },
    ];
  }

  /**
   * Enhances a prompt using Mistral's chat completion API.
   *
   * @param request - Prompt enhancement request configuration
   * @returns Promise resolving to enhanced prompt response
   *
   * @throws Error when API call fails or returns invalid response
   *
   * @developer-notes
   * - Uses system prompt based on enhancement type and user role
   * - Default temperature: 0.7, max tokens: 2000
   * - Returns original prompt if enhancement fails
   * - Tracks processing time and token usage
   */
  async enhancePrompt(request: PromptRequest): Promise<PromptResponse> {
    const startTime = Date.now();

    const systemPrompt = this.buildSystemPrompt(request);

    try {
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
      console.error('Mistral enhancement failed:', error);
      throw new Error(`Failed to enhance prompt with Mistral: ${error}`);
    }
  }

  /**
   * Checks if the Mistral API service is available and responsive.
   *
   * @returns Promise resolving to true if service is available
   *
   * @developer-notes
   * - Makes minimal API call with 1 token max
   * - Uses mistral-large-latest model for availability check
   * - Returns false on any API error or invalid response
   */
  async isAvailable(): Promise<boolean> {
    try {
      const resp = await this.client.post('/chat/completions', {
        model: 'mistral-large-latest',
        messages: [{ role: 'user', content: 'test' }],
        max_tokens: 1,
      });
      return !!resp.data.choices;
    } catch {
      return false;
    }
  }

  /**
   * Constructs a system prompt based on enhancement type and user role.
   *
   * @param request - Prompt request containing enhancement and role information
   * @returns Combined system prompt string
   *
   * @developer-notes
   * - Combines role-based and enhancement-type prompts
   * - Falls back to general role and enhance type if invalid
   * - Supports custom system prompts override
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
