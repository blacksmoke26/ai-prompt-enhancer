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
import type { PromptRequest, PromptResponse, AIModel } from '~/types';

/**
 * OpenRouter API provider for prompt enhancement services
 * @example
 * ```typescript
 * const provider = new OpenRouterProvider({apiKey: 'your-api-key'});
 * const enhanced = await provider.enhancePrompt({
 *   text: 'Write a story',
 *   model: 'openai/gpt-3.5-turbo'
 * });
 * ```
 * @developerNote
 * Extends BaseAIProvider to implement OpenRouter-specific API calls.
 * Handles authentication, model fetching, and prompt enhancement.
 */
export default class OpenRouterProvider extends BaseAIProvider {
  /**
   * Initialize OpenRouter provider with API authentication
   * @param config - Configuration object
   * @developerNote
   * Sets up HTTP client with required headers including Bearer token
   * and OpenRouter-specific headers for proper API communication.
   */
  constructor(config: ConfigMeta) {
    super('OpenRouter', config?.baseURL || 'https://openrouter.ai/api/v1');
    this.client.defaults.headers.common['Authorization'] = `Bearer ${config?.apiKey}`;
    this.client.defaults.headers.common['HTTP-Referer'] = 'http://localhost:5173';
    this.client.defaults.headers.common['X-Title'] = 'AI Prompt Enhancer';
  }

  /**
   * Fetch available AI models from OpenRouter API
   * @returns Promise resolving to array of AIModel objects
   * @example
   * ```typescript
   * const models = await provider.getModels();
   * console.log(models[0].name); // 'GPT-4'
   * ```
   * @developerNote
   * Transforms API response into standardized AIModel format.
   * Includes pricing info and sorts models alphabetically by name.
   */
  async getModels(): Promise<AIModel[]> {
    try {
      const response = await this.client.get<{data: AIModel[]}>('/models');
      const models = response.data.data || [];

      return models.map((model: any) => ({
        id: model.id,
        name: model.name || model.id,
        provider: 'OpenRouter',
        description: `${model.description} • ${model.pricing?.prompt || 'Free'}`,
        contextLength: model.context_length,
        maxTokens: model.top_provider?.max_completion_tokens,
      })).sort((a, b) => a.name.localeCompare(b.name));;
    } catch (error: any) {
      console.error('Failed to fetch OpenRouter models:', error);
      return [];
    }
  }

  /**
   * Enhance a prompt using OpenRouter's chat completion API
   * @param request - Prompt enhancement request containing text and options
   * @returns Promise resolving to enhanced prompt response
   * @example
   * ```typescript
   * const response = await provider.enhancePrompt({
   *   text: 'help me code',
   *   model: 'anthropic/claude-2',
   *   enhancementType: 'enhance'
   * });
   * ```
   * @developerNote
   * Builds system prompt based on enhancement type and user role.
   * Measures processing time and includes token usage in response.
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
      console.error('OpenRouter enhancement failed:', error);
      throw new Error(`Failed to enhance prompt with OpenRouter: ${error}`);
    }
  }

  /**
   * Check if OpenRouter API is accessible
   * @returns Promise resolving to boolean indicating API availability
   * @example
   * ```typescript
   * if (await provider.isAvailable()) {
   *   // Safe to make API calls
   * }
   * ```
   * @developerNote
   * Uses lightweight /models endpoint for connectivity check.
   * Returns false on any network or authentication error.
   */
  async isAvailable(): Promise<boolean> {
    try {
      await this.client.get('/models');
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Build system prompt based on enhancement type and user role
   * @param request - Prompt request containing enhancement preferences
   * @returns Complete system prompt string for API call
   * @developerNote
   * Combines role-specific persona with enhancement type instructions.
   * Falls back to general enhancement if specified type not found.
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
