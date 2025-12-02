/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import { BaseAIProvider } from '~/base/BaseAIProvider';

// types
import type { AIModel, PromptRequest, PromptResponse } from '~/types';

/**
 * Zhipu AI provider for GLM (General Language Model) series.
 * Provides integration with Zhipu AI's chat completion API.
 *
 * @example
 * ```ts
 * const provider = new ZhipuProvider('your-api-key');
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
export class ZhipuProvider extends BaseAIProvider {
  /**
   * Initializes a new Zhipu provider instance.
   * @param apiKey - Your Zhipu API authentication key
   * @param baseURL - Optional custom base URL, defaults to Zhipu's API endpoint
   */
  constructor(apiKey: string, baseURL?: string) {
    super('Zhipu', baseURL || 'https://api.z.ai/api/paas/v4');
    this.client.defaults.headers.common['Authorization'] = `Bearer ${apiKey}`;
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
    return [
      {
        id: 'glm-4',
        name: 'GLM-4',
        provider: 'Zhipu',
        description: 'GLM‑4 large language model',
        contextLength: 200000,
        maxTokens: 8192,
      },
      {
        id: 'glm-4-all',
        name: 'GLM-4 All',
        provider: 'Zhipu',
        description: 'GLM‑4 All model (general usage)',
        contextLength: 200000,
        maxTokens: 8192,
      },
      {
        id: 'glm-4-turbo',
        name: 'GLM-4 Turbo',
        provider: 'Zhipu',
        description: 'GLM‑4 Turbo model (fast, cheaper)',
        contextLength: 200000,
        maxTokens: 8192,
      },
      {
        id: 'glm-4-9b',
        name: 'GLM‑4‑9B',
        provider: 'Zhipu',
        description: 'GLM‑4‑9B (smaller variant)',
        contextLength: 200000,
        maxTokens: 8192,
      },
    ];
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
   * @param request - The prompt request containing enhancement settings
   * @returns A formatted system prompt string
   * @developerNote
   * Falls back to 'enhance' type and 'general' role if invalid values provided.
   * Custom system prompts take precedence over predefined templates.
   */
  private buildSystemPrompt(request: PromptRequest): string {
    const enhancementPrompts = {
      correct:
        'You are a grammar and spelling expert. Correct any grammatical errors, spelling mistakes, and improve the clarity of the given prompt while preserving the original intent.',
      enhance:
        'You are a prompt engineering expert. Enhance the given prompt by adding relevant details, making it more specific, and improving its effectiveness while maintaining the core intent.',
      proofread:
        'You are a professional proofreader. Review and refine the given prompt to make it more effective, clear, and likely to produce high-quality results.',
      optimize:
        'You are an AI prompt optimization specialist. Optimize the given prompt to work best with AI models, adding structure, context, and clarity as needed.',
    };

    const rolePrompts = {
      general: 'You are a helpful AI assistant.',
      developer: 'You are an expert software developer and prompt engineer.',
      writer: 'You are a professional writer and editor.',
      researcher: 'You are an experienced researcher and academic.',
      marketer: 'You are a marketing expert.',
      educator: 'You are an experienced educator.',
      business: 'You are a business professional.',
      designer: 'You are a professional designer.',
    };

    const systemPrompt =
      request.systemPrompt ??
      enhancementPrompts[request.enhancementType as keyof typeof enhancementPrompts] ??
      enhancementPrompts.enhance;

    const rolePrompt =
      rolePrompts[request.userRole as keyof typeof rolePrompts] ?? rolePrompts.general;

    return `${rolePrompt} ${systemPrompt}`;
  }
}
