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
 * Gemini (Google Generative Language) provider for prompt enhancement.
 *
 * Implements the BaseAIProvider to interact with Google's Gemini AI models.
 * Provides functionality to enhance prompts using various enhancement types
 * and user roles.
 *
 * Base URL: https://generativelanguage.googleapis.com/v1beta
 * Header: Authorization: Bearer <API_KEY>
 *
 * @example
 * ```ts
 * const provider = new GeminiProvider({apiKey: 'your-api-key'});
 * const response = await provider.enhancePrompt({
 *   text: 'Explain blockchain',
 *   model: 'gemini-1.5-pro-001',
 *   enhancementType: 'enhance',
 * });
 * ```
 *
 * @developerNotes
 * - Requires a valid Google AI API key
 * - Default models: gemini-1.5-pro-001, gemini-1.5-pro-002
 * - Supports system prompts and role-based enhancement
 */
export default class GeminiProvider extends BaseAIProvider {
  /**
   * Creates an instance of GeminiProvider.
   * @param config - Configuration object
   */
  constructor(config: ConfigMeta) {
    super('Gemini', config?.baseURL || 'https://generativelanguage.googleapis.com/v1beta');
    this.client.defaults.headers.common['Authorization'] = `Bearer ${config?.apiKey}`;
  }

  /**
   * Retrieves available Gemini models.
   *
   * @returns Promise resolving to an array of available AIModel objects
   */
  async getModels(): Promise<AIModel[]> {
    return [
      {
        id: 'gemini-1.5-pro-001',
        name: 'Gemini Pro 1.5',
        provider: 'Gemini',
        description: 'Google Gemini Pro 1.5 model',
        contextLength: 8192,
        maxTokens: 8192,
      },
      {
        id: 'gemini-1.5-pro-002',
        name: 'Gemini Pro 1.5 (2024‑09)',
        provider: 'Gemini',
        description: 'Google Gemini Pro 1.5 (latest) model',
        contextLength: 8192,
        maxTokens: 8192,
      },
    ];
  }

  /**
   * Enhances a prompt using the Gemini AI model.
   *
   * @param request - The prompt enhancement request containing text, model, and options
   * @returns Promise resolving to the enhanced prompt response
   */
  async enhancePrompt(request: PromptRequest): Promise<PromptResponse> {
    const startTime = Date.now();

    const systemPrompt = this.buildSystemPrompt(request);

    const body = {
      contents: [
        { role: 'system', parts: [{ text: systemPrompt }] },
        { role: 'user', parts: [{ text: `Original prompt: ${request.text}\n\nEnhanced prompt:` }] },
      ],
      temperature: request.temperature ?? 0.7,
      topK: 64,
      topP: 0.95,
      candidateCount: 1,
      safeSearch: { category: 'NONE' },
      generationConfig: { maxOutputTokens: request.maxTokens ?? 2048 },
    };

    const endpoint = `/models/${request.model}/generateContent`;

    const response = await this.client.post(endpoint, body);

    const enhancedPrompt =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? request.text;

    return {
      enhancedPrompt,
      originalPrompt: request.text,
      model: request.model,
      timestamp: new Date(),
      tokensUsed: response.data?.usage?.totalTokens,
      processingTime: this.calculateProcessingTime(startTime),
    };
  }

  /**
   * Checks if the Gemini API is available and responding.
   *
   * @returns Promise resolving to true if the API is available, false otherwise
   */
  async isAvailable(): Promise<boolean> {
    try {
      const response = await this.client.post(
        `/models/gemini-1.5-pro-001/generateContent`,
        {
          contents: [{ role: 'user', parts: [{ text: 'test' }] }],
          temperature: 0.0,
          candidateCount: 1,
          generationConfig: { maxOutputTokens: 1 },
        },
      );
      return !!response.data?.candidates?.length;
    } catch {
      return false;
    }
  }

  /**
   * Builds a system prompt based on the enhancement type and user role.
   *
   * @param request - The prompt request containing enhancement type and user role
   * @returns The constructed system prompt string
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
