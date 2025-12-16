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
import type { AIModel, PromptRequest, PromptResponse } from '~/types';

/**
 * Hugging Face provider for prompt enhancement.
 *
 * Base URL: https://api-inference.huggingface.co/models
 * Endpoint: /{model}
 *
 * @example
 * ```ts
 * const provider = new HuggingFaceProvider({apiKey: 'your-api-key'});
 * const response = await provider.enhancePrompt({
 *   text: 'Explain relativity',
 *   model: 'EleutherAI/gpt-neo-2.7B',
 *   enhancementType: 'enhance',
 * });
 * ```
 * @developerNotes
 * - API key must be set in environment variables or passed directly
 * - Default models are pre-configured but can be expanded
 * - Rate limiting may apply based on HF account tier
 */
export default class HuggingFaceProvider extends BaseAIProvider {
  /**
   * Creates a new HuggingFace provider instance.
   * @param config - Configuration object
   */
  constructor(config: ConfigMeta) {
    super('HuggingFace', {baseUrl: config?.baseUrl || 'https://api-inference.huggingface.co/models'});
    this.client.defaults.headers.common['Authorization'] = `Bearer ${config?.apiKey}`;
  }

  /**
   * Gets the available AI models.
   * @returns Promise resolving to array of AI model configurations
   * @developerNotes
   * - These are preset models known to work well with the provider
   * - Context lengths and max tokens are conservative estimates
   */
  async getModels(): Promise<AIModel[]> {
    return [
      {
        id: 'EleutherAI/gpt-neo-2.7B',
        name: 'GPT‑Neo 2.7B',
        provider: toProviderName('HuggingFace'),
        description: 'EleutherAI GPT‑Neo 2.7B model',
        contextLength: 2048,
        maxTokens: 1024,
      },
      {
        id: 'gpt2',
        name: 'GPT‑2',
        provider: toProviderName('HuggingFace'),
        description: 'OpenAI GPT‑2 base model',
        contextLength: 1024,
        maxTokens: 512,
      },
      {
        id: 'distilgpt2',
        name: 'DistilGPT‑2',
        provider: toProviderName('HuggingFace'),
        description: 'Distilled GPT‑2 model',
        contextLength: 1024,
        maxTokens: 512,
      },
    ];
  }

  /**
   * Enhances a prompt using Hugging Face models.
   * @param request - The prompt enhancement request
   * @returns Promise resolving to the enhanced prompt response
   * @developerNotes
   * - Falls back to original text if enhancement fails
   * - Token usage may not be available for all models
   * - Processing time includes network latency
   */
  async enhancePrompt(request: PromptRequest): Promise<PromptResponse> {
    const startTime = Date.now();

    try {
      const systemPrompt = this.buildSystemPrompt(request);
      const payload = {
        inputs: `${systemPrompt}\nOriginal prompt: ${request.text}\n\nEnhanced prompt:`,
        parameters: {
          max_length: request.maxTokens ?? 2000,
          temperature: request.temperature ?? 0.7,
        },
      };

      const response = await this.client.post(`/${request.model}`, payload);

      const enhanced = Array.isArray(response.data) && response.data[0]?.generated_text
        ? response.data[0].generated_text.trim()
        : request.text;

      return {
        enhancedPrompt: enhanced,
        originalPrompt: request.text,
        model: request.model,
        timestamp: new Date(),
        tokensUsed: response.data?.usage?.total_tokens,
        processingTime: this.calculateProcessingTime(startTime),
      };
    } catch (error: any) {
      console.error('HuggingFace enhancement failed:', error);
      throw new Error(`Failed to enhance prompt with HuggingFace: ${error}`);
    }
  }

  /**
   * Checks if the Hugging Face service is available.
   * @returns Promise resolving to boolean indicating availability
   * @developerNotes
   * - Uses minimal payload to test connectivity
   * - Returns false for any network or API errors
   */
  async isAvailable(): Promise<boolean> {
    try {
      const resp = await this.client.post('/gpt2', {
        inputs: 'test',
        parameters: { max_length: 1 },
      });
      return Array.isArray(resp.data) && resp.data.length > 0;
    } catch {
      return false;
    }
  }

  /**
   * Builds the system prompt based on request parameters.
   * @param request - The prompt request containing enhancement type and user role
   * @returns The constructed system prompt string
   * @developerNotes
   * - Combines role-based and enhancement-type prompts
   * - Falls back to general role if invalid role specified
   * - Uses 'enhance' type if invalid enhancement type specified
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
