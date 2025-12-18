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
 * Cohere AI provider for prompt enhancement and text generation.
 *
 * Integrates with Cohere's API to provide intelligent prompt enhancement capabilities
 * using various models including Command, Command Light, and Command R series.
 *
 * @example
 * ```ts
 * const provider = new CohereProvider({apiKey: 'your-api-key'});
 * const response = await provider.enhancePrompt({
 *   text: 'Explain relativity',
 *   model: 'command-nightly',
 *   enhancementType: 'enhance',
 * });
 * ```
 *
 * @developerNotes
 * - Requires valid Cohere API key
 * - Supports models with varying context lengths (2048-4096 tokens)
 * - Implements exponential backoff for rate limiting
 * - Default temperature: 0.7, max tokens: 2000
 */
export default class CohereProvider extends BaseAIProvider {
  /**
   * Creates a new Cohere provider instance.
   * @param config - Configuration object
   */
  constructor(config: ConfigMeta) {
    super('Cohere', {baseUrl: config?.baseUrl || 'https://api.cohere.com/v1'});
    this.client.defaults.headers.common['Authorization'] = `Bearer ${config?.apiKey}`;
  }

  /**
   * Retrieves available Cohere models for prompt enhancement.
   *
   * @returns Array of available AI models with their specifications
   */
  async getModels(): Promise<AIModel[]> {
    return [
      {
        id: 'command-nightly',
        name: 'Command Nightly',
        provider: toProviderName('Cohere'),
        description: 'Cohere Command nightly model',
        contextLength: 4096,
        maxTokens: 4096,
      },
      {
        id: 'command-light-nightly',
        name: 'Command Light Nightly',
        provider: toProviderName('Cohere'),
        description: 'Cohere Command Light nightly model',
        contextLength: 4096,
        maxTokens: 2048,
      },
      {
        id: 'command-r',
        name: 'Command R',
        provider: toProviderName('Cohere'),
        description: 'Cohere Command R model',
        contextLength: 4096,
        maxTokens: 4096,
      },
    ];
  }

  /**
   * Enhances a prompt using Cohere's chat API.
   *
   * @param request - The prompt enhancement request containing text, model, and options
   * @returns Enhanced prompt response with metadata
   * @throws Error when enhancement fails
   *
   * @example
   * ```ts
   * const result = await provider.enhancePrompt({
   *   text: 'What is AI?',
   *   model: 'command-r',
   *   enhancementType: 'enhance',
   *   temperature: 0.5
   * });
   * ```
   */
  async enhancePrompt(request: PromptRequest): Promise<PromptResponse> {
    const startTime = Date.now();
    try {
      const systemPrompt = this.buildSystemPrompt(request);
      const response = await this.client.post('/chat', {
        model: request.model,
        messages: [
          {role: 'system', content: this.formatSystemPrompt(systemPrompt)},
          {
            role: 'user',
            content: this.formatPrompt(request.text),
          },
        ],
        temperature: request.temperature ?? 0.7,
        max_tokens: request.maxTokens ?? 2000,
      });

      const enhancedPrompt = this.toPromptResponse(response.data.generations?.[0]?.text, request.text);

      return {
        enhancedPrompt,
        originalPrompt: request.text,
        model: request.model,
        timestamp: new Date(),
        tokensUsed: response.data.usage?.total_input_tokens,
        processingTime: this.calculateProcessingTime(startTime),
      };
    } catch (error: any) {
      console.error('Cohere enhancement failed:', error);
      throw new Error(`Failed to enhance prompt with Cohere: ${error}`);
    }
  }

  /**
   * Checks if the Cohere API is accessible and working.
   *
   * @returns True if API is available, false otherwise
   *
   * @developerNotes
   * Makes a minimal API call with 1 max token to test connectivity.
   * Uses command-nightly model for availability check.
   */
  async isAvailable(): Promise<boolean> {
    try {
      const resp = await this.client.post('/chat', {
        model: 'command-nightly',
        messages: [{role: 'user', content: 'test'}],
        max_tokens: 1,
      });
      return !!resp.data.generations;
    } catch {
      return false;
    }
  }

  /**
   * Builds the system prompt based on the request parameters.
   *
   * @param request - The prompt request containing enhancement type and user role
   * @returns Constructed system prompt string
   */
  private buildSystemPrompt(request: PromptRequest): string {
    return this.buildDefaultSystemPrompt(request);
  }

  /**
   * Creates a default system prompt based on enhancement type and user role.
   *
   * @param request - The prompt request configuration
   * @returns Complete system prompt combining role and enhancement instructions
   *
   * @developerNotes
   * Supports multiple enhancement types: correct, enhance, proofread, optimize
   * Includes 9 predefined user roles for specialized prompt engineering
   */
  private buildDefaultSystemPrompt(request: PromptRequest): string {
    const enhancementPrompts = toEnhancementTypes();
    const rolePrompts = toUserRoles();

    const system =
      request.systemPrompt ||
      enhancementPrompts[request.enhancementType as keyof typeof enhancementPrompts] ||
      enhancementPrompts.enhance;

    const role = rolePrompts[request.userRole as keyof typeof rolePrompts] || rolePrompts.general;

    return `${role} ${system}`;
  }
}
