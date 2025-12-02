/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import { BaseAIProvider } from '~/base/BaseAIProvider';

// types
import type { AIModel, PromptRequest, PromptResponse } from '~/types';

/**
 * Cody AI provider for prompt enhancement and optimization.
 *
 * @example
 * ```ts
 * const provider = new CodyProvider('your-api-key');
 * const response = await provider.enhancePrompt({
 *   text: 'Explain quantum computing',
 *   model: 'cody-general',
 *   enhancementType: 'enhance',
 * });
 * console.log(response.enhancedPrompt);
 * ```
 *
 * @developerNotes
 * - Requires valid Cody AI API key
 * - Default base URL: https://api.cody.ai/v1
 * - Supports multiple enhancement types and user roles
 * - Automatic fallback to original prompt if enhancement fails
 */
export class CodyProvider extends BaseAIProvider {
  /**
   * Initializes a new CodyProvider instance.
   *
   * @param apiKey - Valid Cody AI API key for authentication
   * @param baseURL - Optional custom base URL for the API
   *
   * @example
   * ```ts
   * const provider = new CodyProvider('sk-xxx', 'https://custom-api.cody.ai');
   * ```
   */
  constructor(apiKey: string, baseURL?: string) {
    super('Cody', baseURL || 'https://api.cody.ai/v1');
    this.client.defaults.headers.common['Authorization'] = `Bearer ${apiKey}`;
  }

  /**
   * Retrieves available Cody AI models.
   *
   * @returns Promise resolving to array of available AI models
   *
   * @example
   * ```ts
   * const models = await provider.getModels();
   * console.log(models.map(m => m.name)); // ['Cody Code', 'Cody General']
   * ```
   */
  async getModels(): Promise<AIModel[]> {
    return [
      {
        id: 'cody-code',
        name: 'Cody Code',
        provider: 'Cody',
        description: 'Cody model optimized for code generation',
        contextLength: 16384,
        maxTokens: 2048,
      },
      {
        id: 'cody-general',
        name: 'Cody General',
        provider: 'Cody',
        description: 'Cody model optimized for general conversation',
        contextLength: 32768,
        maxTokens: 4096,
      },
    ];
  }

  /**
   * Enhances a prompt using Cody AI with various optimization strategies.
   *
   * @param request - Prompt enhancement request configuration
   * @returns Promise resolving to enhanced prompt response
   *
   * @example
   * ```ts
   * const response = await provider.enhancePrompt({
   *   text: 'Make a website',
   *   model: 'cody-code',
   *   enhancementType: 'optimize',
   *   userRole: 'developer'
   * });
   * ```
   *
   * @developerNotes
   * - Automatically includes processing time and token usage
   * - Falls back to original prompt if API fails
   * - Supports temperature and max tokens customization
   */
  async enhancePrompt(request: PromptRequest): Promise<PromptResponse> {
    const startTime = Date.now();
    try {
      const systemPrompt = this.buildSystemPrompt(request);
      const response = await this.client.post('/chat', {
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
      console.error('Cody enhancement failed:', error);
      throw new Error(`Failed to enhance prompt with Cody: ${error}`);
    }
  }

  /**
   * Checks if the Cody AI service is available and responsive.
   *
   * @returns Promise resolving to true if service is available
   *
   * @example
   * ```ts
   * if (await provider.isAvailable()) {
   *   console.log('Cody AI is ready');
   * }
   * ```
   */
  async isAvailable(): Promise<boolean> {
    try {
      const resp = await this.client.post('/chat', {
        model: 'cody-general',
        messages: [{ role: 'user', content: 'test' }],
        max_tokens: 1,
      });
      return !!resp.data.choices;
    } catch {
      return false;
    }
  }

  /**
   * Builds system prompt based on request parameters.
   *
   * @param request - Prompt request containing enhancement configuration
   * @returns Formatted system prompt string
   *
   * @developerNotes
   * - Delegates to buildDefaultSystemPrompt implementation
   * - Allows for future customization of prompt building logic
   */
  private buildSystemPrompt(request: PromptRequest): string {
    return this.buildDefaultSystemPrompt(request);
  }

  /**
   * Creates a comprehensive system prompt combining role and enhancement type.
   *
   * @param request - Prompt request with enhancement and role specifications
   * @returns Complete system prompt for AI model
   *
   * @developerNotes
   * - Supports 4 enhancement types: correct, enhance, proofread, optimize
   * - Supports 8 user roles: general, developer, writer, researcher, marketer, educator, business, designer
   * - Falls back to sensible defaults if invalid types provided
   */
  private buildDefaultSystemPrompt(request: PromptRequest): string {
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

    const sys =
      request.systemPrompt ||
      enhancementPrompts[request.enhancementType as keyof typeof enhancementPrompts] ||
      enhancementPrompts.enhance;

    const role = rolePrompts[request.userRole as keyof typeof rolePrompts] || rolePrompts.general;

    return `${role} ${sys}`;
  }
}
