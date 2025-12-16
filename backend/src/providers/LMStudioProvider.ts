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
 * Interface representing an LM Studio model's metadata and configuration details.
 *
 * @example
 * ```typescript
 * const model: LMStudioModel = {
 *   name: 'llama2:latest',
 *   model: 'llama2',
 *   modified_at: '2023-12-01T10:00:00Z',
 *   size: 4349184000,
 *   digest: 'sha256:abc123...',
 *   details: {
 *     parent_model: '',
 *     format: 'gguf',
 *     family: 'llama',
 *     families: ['llama'],
 *     parameter_size: '7B',
 *     quantization_level: 'Q4_0'
 *   }
 * };
 * ```
 *
 * @developerNote
 * This interface matches the LM Studio API response structure for model metadata.
 * All fields are readonly as they represent server-provided data.
 */
export interface LMStudioModel {
  /** The full name of the model including version tag (e.g., 'mxbai-embed-large:latest') */
  readonly name: string;

  /** The model identifier (typically same as name) */
  readonly model: string;

  /** ISO timestamp of when the model was last modified */
  readonly modified_at: string;

  /** Size of the model in bytes */
  readonly size: number;

  /** SHA256 digest hash of the model for integrity verification */
  readonly digest: string;

  /** Detailed configuration and metadata about the model */
  readonly details: {
    /** Parent model if this is a fine-tuned version */
    readonly parent_model: string;

    /** Model format (e.g., 'gguf' for GPT-Generated Unified Format) */
    readonly format: string;

    /** Primary model family/architecture (e.g., 'bert', 'llama') */
    readonly family: string;

    /** Array of all model families this model belongs to */
    readonly families: string[];

    /** Parameter size as string (e.g., '334M' for 334 million parameters) */
    readonly parameter_size: string;

    /** Quantization level for model compression (e.g., 'F16' for 16-bit float) */
    readonly quantization_level: string;

    /** Context length supported by the model */
    readonly context_length?: number;
  };
}

/**
 * Provider implementation for LM Studio AI models.
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
      const response = await this.client.get<{ models: LMStudioModel[] }>('/v0/models');
      const models = response.data.models || [];

      return models.map((model: any) => ({
        id: model.name,
        name: model.name.split(':')[0],
        provider: toProviderName('LM Studio'),
        description: `${model.size} • ${model.digest.substring(0, 12)}`,
        contextLength: model.details?.context_length || 4096,
      })).sort((a, b) => a.name.localeCompare(b.name));
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
      const fullPrompt = `${systemPrompt}\n\nOriginal prompt: ${request.text}\n\nEnhanced prompt:`;

      const response = await this.client.post('/v0/completions', {
        model: request.model,
        prompt: fullPrompt,
        stream: false,
        temperature: request.temperature || 0.7,
        max_tokens: request.maxTokens || 2000,
      });

      const enhancedPrompt = response.data.choices?.[0]?.text?.trim() || request.text;

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
      await this.client.get('/v0/models');
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
