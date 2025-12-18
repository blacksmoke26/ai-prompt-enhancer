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
 * Represents a model from the Zhipu API, containing metadata and configuration details.
 *
 * @example
 * const model: ZhipuModel = {
 *   id: 'glm-4.5',
 *   object: 'model',
 *   created: 1753632000,
 *   owned_by: 'z-ai'
 * };
 *
 * @developerNotes
 * This interface is based on the Zhipu API response structure. The `created` field is a Unix timestamp as a number, and `owned_by` indicates the organization that owns the model.
 */
export interface ZhipuModel {
  /** Unique identifier for the model (e.g., 'glm-4.5') */
  id: string;
  /** Type of the model object (always 'model') */
  object: string;
  /** Unix timestamp indicating when the model was created */
  created: number;
  /** Organization or entity that owns the model (e.g., 'z-ai') */
  owned_by: string;
}

/**
 * Zhipu AI provider for GLM (General Language Model) series.
 * Provides integration with Zhipu AI's chat completion API.
 *
 * @see https://docs.z.ai/guides/llm/glm-4.5#samples-code
 *
 * @example
 * ```ts
 * const provider = new ZhipuProvider({apiKey: 'your-api-key'});
 * const response = await provider.enhancePrompt({
 *   text: 'Explain quantum computing',
 *   model: 'glm-4',
 *   enhancementType: 'enhance',
 * });
 * ```
 * @developerNote
 * Ensure proper API key management and consider rate limits.
 * The base URL can be customized for different deployment environments.
 */
export default class ZhipuProvider extends BaseAIProvider {
  /**
   * Initializes a new Zhipu provider instance.
   * @param config - Configuration object
   */
  constructor(config: ConfigMeta) {
    super('Zhipu', {baseUrl: config?.baseUrl || 'https://api.z.ai/api/paas/v4'});
    this.client.defaults.headers.common['Authorization'] = `Bearer ${config?.apiKey}`;
    this.client.defaults.headers.common['Content-Type'] = 'application/json';
  }

  /**
   * Retrieves available GLM models with their specifications.
   * @returns Promise resolving to an array of AI model configurations
   * @developerNote
   * This list should be updated when new models are released.
   * Consider fetching dynamically from the API for production use.
   */
  async getModels(): Promise<AIModel[]> {
    try {
      const response = await this.client.get<{ data: ZhipuModel[] }>('models');
      const models = response.data.data || [];

      return models.map(model => {
        const [, size = '?b'] = model.id.match(/-(\d+b)/) ?? [];
        const name = model.id.split('/')
        return ({
          id: model.id,
          name: (name.length > 1 ? name[1] : name[0]).replace(/-\d+b/g, ''),
          provider: toProviderName('Zhipu'),
          size,
          description: model.id,
          contextLength: 4096,
        });
      }).sort((a, b) => a.name.localeCompare(b.name));
    } catch (error: any) {
      console.error('Failed to fetch Groq models:', error);
      return [];
    }
  }

  /**
   * Enhances a prompt using Zhipu's GLM models.
   * @param request - The prompt enhancement request containing text and options
   * @returns Promise resolving to the enhanced prompt response
   * @developerNote
   * Handles API errors gracefully and provides fallback to original prompt.
   * Processing time is calculated client-side.
   */
  async enhancePrompt(request: PromptRequest): Promise<PromptResponse> {
    const startTime = Date.now();

    try {
      const systemPrompt = await this.buildSystemPrompt(request);

      const response = await this.client.post('/chat/completions', {
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
      console.error('Zhipu enhancement failed:', error);
      throw new Error(`Failed to enhance prompt with Zhipu: ${error}`);
    }
  }

  /**
   * Checks if the Zhipu service is available and responsive.
   * @returns Promise resolving to true if service is available, false otherwise
   * @developerNote
   * Uses a minimal request to test connectivity. Consider implementing retry logic.
   */
  async isAvailable(): Promise<boolean> {
    try {
      const resp = await this.client.post('/chat/completions', {
        model: 'glm-4',
        messages: [{role: 'user', content: 'test'}],
        max_tokens: 1,
      });
      return !!resp.data.choices;
    } catch {
      return false;
    }
  }
}
