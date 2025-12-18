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
 * Represents a Gemini model configuration and metadata from the Gemini API.
 *
 * @example
 * const model: GeminiModel = {
 *   name: 'models/gemini-2.5-flash',
 *   version: '001',
 *   displayName: 'Gemini 2.5 Flash',
 *   description: 'Stable version of Gemini 2.5 Flash, our mid-size multimodal model that supports up to 1 million tokens, released in June of 2025.',
 *   inputTokenLimit: 1048576,
 *   outputTokenLimit: 65536,
 *   supportedGenerationMethods: ['generateContent', 'countTokens', 'createCachedContent', 'batchGenerateContent'],
 *   temperature: 1,
 *   topP: 0.95,
 *   topK: 64,
 *   maxTemperature: 2,
 *   thinking: true
 * };
 *
 * @developerNotes
 * This interface is based on the Gemini API response structure. The `name` field includes the model identifier and version.
 * `supportedGenerationMethods` lists available API methods for interacting with the model. All token limits are in token counts.
 */
export interface GeminiModel {
  /** Full model identifier including version (e.g., 'models/gemini-2.5-flash') */
  name: string;
  /** Model version identifier (e.g., '001') */
  version: string;
  /** Human-readable display name of the model (e.g., 'Gemini 2.5 Flash') */
  displayName: string;
  /** Detailed description of the model's capabilities and release information */
  description: string;
  /** Maximum number of input tokens allowed for this model */
  inputTokenLimit: number;
  /** Maximum number of output tokens allowed for this model */
  outputTokenLimit: number;
  /** Array of supported generation methods for this model (e.g., 'generateContent', 'countTokens') */
  supportedGenerationMethods: string[];
  /** Controls randomness in output (0 = deterministic, 1 = fully random) */
  temperature: number;
  /** Top-P sampling parameter for output diversity (0-1) */
  topP: number;
  /** Top-K sampling parameter for output diversity (0-1) */
  topK: number;
  /** Maximum allowed temperature value for this model */
  maxTemperature: number;
  /** Boolean indicating if the model is in a thinking state (true) or direct response mode (false) */
  thinking: boolean;
}

/**
 * Gemini (Google Generative Language) provider for prompt enhancement.
 * @see https://ai.google.dev/api
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
    super('Gemini', {baseUrl: config?.baseUrl || 'https://generativelanguage.googleapis.com/v1beta'});
    this.client.defaults.params ??= {};
    this.client.defaults.params['key'] = config?.apiKey;
  }

  /**
   * Retrieves available Gemini models.
   *
   * @returns Promise resolving to an array of available AIModel objects
   */
  async getModels(): Promise<AIModel[]> {
    try {
      const response = await this.client.get<{ models: GeminiModel[] }>('/models');
      const models = response.data.models || [];

      return models.map((model) => {
        const [, size = '?b'] = model.name.match(/-(\d+(b|n))/) ?? [];
        const name = model.name.split('/');

        return ({
          id: model.name,
          name: (name.length > 1 ? name[1] : name[0]).replace(/-\d+b/g, ''),
          provider: toProviderName('Gemini'),
          size,
          description: model.description,
          contextLength: model?.outputTokenLimit || 4096,
        });
      }).sort((a, b) => a.name.localeCompare(b.name));
    } catch (error: any) {
      console.error('Failed to fetch Gemini models:', error);
      return [];
    }
  }

  /**
   * Enhances a prompt using the Gemini AI model.
   *
   * @param request - The prompt enhancement request containing text, model, and options
   * @returns Promise resolving to the enhanced prompt response
   */
  async enhancePrompt(request: PromptRequest): Promise<PromptResponse> {
    const startTime = Date.now();

    const systemPrompt = await this.buildSystemPrompt(request);

    const body = {
      contents: [
        {role: 'system', parts: [{text: this.formatSystemPrompt(systemPrompt)}]},
        {role: 'user', parts: [{text: this.formatPrompt(request)}]},
      ],
      temperature: request.temperature ?? 0.7,
      topK: 64,
      topP: 0.95,
      candidateCount: 1,
      safeSearch: {category: 'NONE'},
      generationConfig: {maxOutputTokens: request.maxTokens ?? 2048},
    };

    const endpoint = `/models/${request.model}/generateContent`;

    const response = await this.client.post(endpoint, body);

    const enhancedPrompt = this.toPromptResponse(response.data?.candidates?.[0]?.content?.parts?.[0]?.text,  request.text);

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
        `/models/gemini-2.0-flash:generateContent`,
        {
          contents: [{parts: [{text: 'test'}]}],
        },
      );

      return !!response.data?.text?.length;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
