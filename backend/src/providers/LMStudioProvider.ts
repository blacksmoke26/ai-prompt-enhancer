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
import type {PromptRequest, PromptResponse, AIModel} from '~/types';

/**
 * Represents a model from LM Studio, containing metadata such as ID, type, publisher, and configuration details.
 * Example: `{ id: 'qwen2-vl-7b-instruct', type: 'vlm', publisher: 'mlx-community', max_context_length: 2048 }`.
 *
 * @interface LMStudioModel
 *
 * Developer Notes:
 * - This interface defines the structure of a model from LM Studio, supporting various types (e.g., VLM, LLM).
 * - `readonly` properties ensure immutability for critical metadata like `id` and `type`.
 * - Enum-like values (e.g., `quantization`, `state`) provide type safety and clarity for model states.
 */
export interface LMStudioModel {
  /** The full ID of the model, including version tag (e.g., 'qwen2-vl-7b-instruct') */
  readonly id: string;
  /** The type of the model object (e.g., 'model', 'llm', 'vlm') */
  readonly object: 'model' | string;
  /** The category of the model (e.g., 'vlm' for Vision-Language Models, 'llm' for Language Models) */
  readonly type: 'vlm' | 'llm' | 'embeddings' | string;
  /** The publisher of the model (e.g., 'mlx-community' for community models) */
  readonly publisher: 'mlx-community' | string;
  /** The architecture or framework of the model (e.g., 'Transformer', 'LSTM') */
  readonly arch: string;
  /** The compatibility type or framework (e.g., 'mlx' for MLX framework) */
  readonly compatibility_type: 'mlx' | 'gguf' | string;
  /** The quantization level of the model (e.g., '4bit' for 4-bit quantization) */
  readonly quantization: '4bit' | '8bit' | 'Q4_K_M' | string;
  /** The current state of the model (e.g., 'not-loaded', 'loaded') */
  readonly state: 'not-loaded' | 'loaded' | string;
  /** The maximum context length supported by the model in tokens */
  readonly max_context_length: number;
}

/**
 * Provider implementation for LM Studio AI models.
 * @see https://lmstudio.ai/docs/developer/rest/endpoints
 *
 * @example
 * ```typescript
 * const provider = new LMStudioProvider('http://localhost:1234');
 * const models = await provider.getModels();
 * const enhanced = await provider.enhancePrompt({
 *   text: 'Tell me about AI',
 *   model: 'llama2',
 *   enhancementType: 'enhance'
 * });
 * ```
 *
 * @developerNote
 * This class extends BaseAIProvider and implements LM Studio-specific API calls.
 * Default URL points to local LM Studio instance. Error handling returns empty arrays for model fetch failures.
 */
export default class LMStudioProvider extends BaseAIProvider {
  /**
   * Creates a new LM Studio provider instance.
   * @param config - Configuration object
   */
  constructor(config: ConfigMeta) {
    super('LMStudio', {baseUrl: config?.baseUrl ?? 'http://localhost:1234'});
  }

  /**
   * Retrieves all available models from the LM Studio instance.
   *
   * @returns Promise resolving to an array of AIModel objects
   *
   * @example
   * ```typescript
   * const models = await provider.getModels();
   * console.log(models[0].name); // 'llama2'
   * ```
   *
   * @developerNote
   * Maps LM Studio's native model format to the standardized AIModel interface.
   * Falls back to 4096 context length if not provided by the API.
   */
  async getModels(): Promise<AIModel[]> {
    try {
      const response = await this.client.get<{ data: LMStudioModel[] }>('/api/v0/models');
      const models = response.data.data || [];

      return models.map((model) => {
        const [, size = '?b'] = model.id.match(/-(\d+b)/) ?? [];
        const items = model.id.split('-');
        let name = (String(items[0]).split('/')[1] ?? '');
        if (name.trim()) {
          name += '-' + items[1];
        }
        return ({
          id: model.id,
          name,
          size,
          provider: toProviderName('LM Studio'),
          description: `${size} • ${model.type} • ${model.compatibility_type}`,
          contextLength: model?.max_context_length || 4096,
        });
      }).sort((a, b) => a.name.localeCompare(b.name));
    } catch (error: any) {
      console.error('Failed to fetch LM Studio models:', error);
      return [];
    }
  }

  /**
   * Enhances a prompt using the specified LM Studio model.
   *
   * @param request - The prompt enhancement request containing text and options
   * @returns Promise resolving to the enhanced prompt response
   *
   * @example
   * ```typescript
   * const response = await provider.enhancePrompt({
   *   text: 'What is AI?',
   *   model: 'llama2',
   *   temperature: 0.7,
   *   maxTokens: 1000
   * });
   * console.log(response.enhancedPrompt);
   * ```
   *
   * @developerNote
   * Builds a system prompt based on enhancement type and user role.
   * Falls back to original text if API call fails or returns empty response.
   */
  async enhancePrompt(request: PromptRequest): Promise<PromptResponse> {
    const startTime = Date.now();

    try {
      const systemPrompt = this.buildSystemPrompt(request);
      const fullPrompt = `${this.formatSystemPrompt(systemPrompt)}\n\n` + this.formatPrompt(request.text);

      const response = await this.client.post('/api/v0/completions', {
        model: request.model,
        prompt: fullPrompt,
        stream: false,
        temperature: request.temperature || 0.7,
        max_tokens: request.maxTokens || 2000,
      });

      const enhancedPrompt = this.toPromptResponse(response.data.choices?.[0]?.text, request.text);

      return {
        enhancedPrompt,
        originalPrompt: request.text,
        model: request.model,
        timestamp: new Date(),
        tokensUsed: response.data.usage?.prompt_tokens,
        processingTime: this.calculateProcessingTime(startTime),
      };
    } catch (error: any) {
      console.error('LM Studio enhancement failed:', error);
      throw new Error(`Failed to enhance prompt with LM Studio: ${error}`);
    }
  }

  /**
   * Checks if the LM Studio service is available and responding.
   *
   * @returns Promise resolving to true if service is available, false otherwise
   *
   * @example
   * ```typescript
   * if (await provider.isAvailable()) {
   *   console.log('LM Studio is running');
   * }
   * ```
   *
   * @developerNote
   * Uses the /v0/models endpoint as a lightweight health check.
   * Silent failure returns false without logging.
   */
  async isAvailable(): Promise<boolean> {
    try {
      await this.client.get('/api/v0/models');
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Builds a system prompt based on the enhancement type and user role.
   *
   * @param request - The prompt request containing enhancement preferences
   * @returns The constructed system prompt string
   *
   * @example
   * ```typescript
   * const prompt = provider.buildSystemPrompt({
   *   enhancementType: 'enhance',
   *   userRole: 'developer'
   * });
   * ```
   *
   * @developerNote
   * Combines role-based prompts with enhancement-specific instructions.
   * Falls back to 'enhance' type and 'general' role if invalid values provided.
   */
  private buildSystemPrompt(request: PromptRequest): string {
    const enhancementPrompts = toEnhancementTypes();

    const rolePrompts = toUserRoles();

    const systemPrompt = request.systemPrompt ||
      enhancementPrompts[request.enhancementType as keyof typeof enhancementPrompts] ||
      enhancementPrompts.enhance;

    const rolePrompt = rolePrompts[request.userRole as keyof typeof rolePrompts] || rolePrompts.general;

    console.log({
      systemPrompt,
      rolePrompt,
    });

    return `${rolePrompt} ${systemPrompt}`;
  }
}
