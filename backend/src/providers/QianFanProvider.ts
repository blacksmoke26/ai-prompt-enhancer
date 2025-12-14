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
 * QianFan (Alibaba DashScope) provider for AI-powered prompt enhancement.
 *
 * Integrates with Alibaba's QianFan AI service to improve prompt quality through
 * various enhancement strategies including grammar correction, optimization,
 * and role-specific refinements.
 *
 * @example
 * ```ts
 * const provider = new QianFanProvider({apiKey: 'your-api-key'});
 * const response = await provider.enhancePrompt({
 *   text: 'Explain machine learning',
 *   model: 'qwen-1.5-72b-chat',
 *   enhancementType: 'enhance',
 *   userRole: 'educator'
 * });
 * ```
 *
 * @developerNotes
 * - Requires valid QianFan API key with DashScope access
 * - Default models support context up to 16K tokens
 * - Automatic fallback to original prompt on API failure
 */
export default class QianFanProvider extends BaseAIProvider {
  /**
   * Initialize the QianFan provider with authentication credentials.
   * @param config - Configuration object
   */
  constructor(config: ConfigMeta) {
    super('QianFan', config?.baseURL || 'https://dashscope.aliyuncs.com');
    this.client.defaults.headers.common['Authorization'] = `Bearer ${config?.apiKey}`;
  }

  /**
   * Retrieve available QianFan models with their specifications.
   *
   * @returns Array of supported AI models including context limits and token constraints
   */
  async getModels(): Promise<AIModel[]> {
    return [
      {
        id: 'qwen-1.5-1.8b-chat',
        name: 'Qwen 1.5 1.8B Chat',
        provider: 'QianFan',
        description: 'Alibaba Qwen 1.5 1.8B chat model',
        contextLength: 8192,
        maxTokens: 2048,
      },
      {
        id: 'qwen-1.5-72b-chat',
        name: 'Qwen 1.5 72B Chat',
        provider: 'QianFan',
        description: 'Alibaba Qwen 1.5 72B chat model',
        contextLength: 16384,
        maxTokens: 4096,
      },
    ];
  }

  /**
   * Enhance a prompt using QianFan's AI capabilities.
   *
   * Applies system prompts and role-specific instructions to improve the
   * original text while preserving its core intent.
   *
   * @param request - Prompt enhancement configuration including text and model settings
   * @returns Enhanced prompt with metadata including processing time and token usage
   */
  async enhancePrompt(request: PromptRequest): Promise<PromptResponse> {
    const startTime = Date.now();

    try {
      const systemPrompt = this.buildSystemPrompt(request);
      const response = await this.client.post(
        '/api/v1/services/aigc/text-generation/v1',
        {
          model: request.model,
          input: `SYSTEM: ${systemPrompt}\nUSER: Original prompt: ${request.text}\nENHANCE:`,
          parameters: {
            temperature: request.temperature ?? 0.7,
            top_p: 1.0,
            max_tokens: request.maxTokens ?? 2000,
          },
        },
      );

      const enhanced = response.data.output?.choices?.[0]?.content?.trim() ??
        request.text;

      return {
        enhancedPrompt: enhanced,
        originalPrompt: request.text,
        model: request.model,
        timestamp: new Date(),
        tokensUsed: response.data.usage?.total_tokens,
        processingTime: this.calculateProcessingTime(startTime),
      };
    } catch (error: any) {
      console.error('QianFan enhancement failed:', error);
      throw new Error(`Failed to enhance prompt with QianFan: ${error}`);
    }
  }

  /**
   * Check QianFan service availability with a minimal test request.
   *
   * @returns True if the service responds with valid model output
   */
  async isAvailable(): Promise<boolean> {
    try {
      const resp = await this.client.post(
        '/api/v1/services/aigc/text-generation/v1',
        {
          model: 'qwen-1.5-1.8b-chat',
          input: 'test',
          parameters: { max_tokens: 1 },
        },
      );
      return !!resp.data.output?.choices;
    } catch {
      return false;
    }
  }

  /**
   * Construct a system prompt combining role context and enhancement type.
   *
   * @param request - Prompt enhancement configuration
   * @returns Formatted system prompt string for AI model
   * @private
   */
  private buildSystemPrompt(request: PromptRequest): string {
    const enhancementPrompts = toEnhancementTypes();
    const rolePrompts = toUserRoles();

    const system =
      request.systemPrompt ??
      enhancementPrompts[request.enhancementType as keyof typeof enhancementPrompts] ??
      enhancementPrompts.enhance;

    const role = rolePrompts[request.userRole as keyof typeof rolePrompts] ?? rolePrompts.general;

    return `${role} ${system}`;
  }
}
