/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import axios from 'axios';
import BaseAIProvider, { ProviderDefaultPrompt } from '~/base/BaseAIProvider';

// db
import { ConfigMeta, History, HistoryAttributes } from '~/database/models';

// classes
import UniversalPromptComposer from '~/classes/composer/UniversalPromptComposer';
import PromptRequestNormalizer from '~/classes/composer/PromptRequestNormalizer';
import StreamEnded from '~/classes/StreamEnded';

// types
import type { AIModel } from '~/types';
import type { ProviderConfig } from '~/types/providers';
import type {
  PromptRequest,
  PromptResponse,
  StreamResponse,
} from '~/types/prompt';

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
   * A static constant representing the unique identifier for the provider, typically used in internal systems or API integrations.
   * @developerNotes Ensure the ID is lowercase and matches the provider's official identifier.
   */
  public static readonly ProviderID: string = 'gemini';

  /**
   * A static constant representing the display name or key used for referencing the provider in user-facing contexts.
   * @developerNotes This value should match the provider's official branding.
   */
  public static readonly ProviderKey: string = 'Gemini';

  /**
   * A static constant representing the full, official name of the provider, typically used for documentation or identification purposes.
   * @developerNotes Ensure consistency with the provider's official name and use proper casing.
   */
  public static readonly ProviderName: string = 'Gemini';

  /**
   * A static constant representing the default prompts used by the provider.
   * @developerNotes These prompts should be tailored to the specific needs of the provider and should be updated as needed.
   */
  public static readonly DefaultPrompts: ProviderDefaultPrompt = {
    system:
      'You are a prompt optimization specialist. Improve clarity, structure, and effectiveness while preserving intent.',
    role: "You are Gemini, Google's AI assistant. Provide helpful, accurate, and well-structured responses to enhance prompts.",
  };

  /**
   * Static configuration object defining the provider's settings.
   * @interface ProviderConfig
   * @property {string} caption - Display name of the provider, typically derived from `ProviderName`.
   * @property {string} name - Unique identifier for the provider, derived from `ProviderID`.
   * @property {string} baseUrl - Base URL for the provider's API endpoint.
   * @property {string} apiKey - API key used for authentication (typically set externally, not hardcoded).
   * @property {number} timeout - Request timeout in milliseconds (default is 30,000 ms).
   * @note The `apiKey` should be configured using a secure method (e.g., environment variables), not directly in the code.
   * @note The `timeout` value is set to 30 seconds by default and can be adjusted based on application needs.
   */
  public static readonly ProviderConfig: ProviderConfig = {
    caption: GeminiProvider.ProviderName,
    name: GeminiProvider.ProviderID,
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
    apiKey: '',
    timeout: 30000,
  };

  /**
   * Creates an instance of GeminiProvider.
   * @param config - Configuration object
   */
  constructor(config: ConfigMeta) {
    super(GeminiProvider.ProviderKey, {
      baseUrl: config?.baseUrl || GeminiProvider.ProviderConfig.baseUrl,
    });
    this.client.defaults.params ??= {};
    this.client.defaults.params['key'] = config?.apiKey;
  }

  /**
   * Generates a streaming response from Gemini's API.
   * @param request - The prompt request
   * @param history - Optional conversation history
   * @yields StreamResponse chunks and StreamEnded signal
   */
  public async *generateStream(
    request?: PromptRequest,
    history?: History | HistoryAttributes,
  ): AsyncGenerator<StreamResponse | StreamEnded, void, unknown> {
    const startTime = Date.now();

    let aiPrompt: string = '';

    if (request) {
      const promptRequest = await PromptRequestNormalizer.normalize(request);
      aiPrompt = UniversalPromptComposer.generate(promptRequest);
    } else if (history) {
      aiPrompt = history.aiPrompt || '';
    } else {
      throw new Error('One of the request or history param is required');
    }

    try {
      const body = {
        contents: [
          {
            role: 'system',
            parts: [{ text: history?.systemPrompt ?? request?.systemPrompt }],
          },
          { role: 'user', parts: [{ text: aiPrompt }] },
        ],
        temperature: request?.temperature ?? 0.7,
        topK: 64,
        topP: 0.95,
        candidateCount: 1,
        safeSearch: { category: 'NONE' },
        generationConfig: { maxOutputTokens: request?.maxTokens ?? 2048 },
        stream: true,
      };

      const endpoint = `/models/${history?.model ?? request?.model ?? 'gemini-2.0-flash'}/streamGenerateContent`;

      const response = await this.client.post(endpoint, body);

      const stream = response.data as AsyncIterable<any>;

      for await (const chunk of stream) {
        if (
          chunk.candidates &&
          chunk.candidates[0]?.content?.parts?.[0]?.text
        ) {
          yield {
            model: history?.model ?? request?.model ?? 'gemini-2.0-flash',
            created_at: new Date().toISOString(),
            message: {
              role: 'assistant',
              content: chunk.candidates[0].content.parts[0].text,
            },
            done: false,
          };
        } else if (chunk.candidates && chunk.candidates[0]?.finishReason) {
          const tokensUsed = chunk.usageMetadata?.totalTokenCount || 0;

          yield new StreamEnded({
            model: history?.model ?? request?.model ?? 'gemini-2.0-flash',
            aiPrompt,
            tokensUsed,
            processingTime: this.calculateProcessingTime(startTime),
          });
          return;
        }
      }

      // If stream completes without explicit finish_reason, yield StreamEnded
      yield new StreamEnded({
        model: history?.model ?? request?.model ?? 'gemini-2.0-flash',
        aiPrompt,
        tokensUsed: 0,
        processingTime: this.calculateProcessingTime(startTime),
      });
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.error?.message || error.message;
        console.error(
          `${GeminiProvider.ProviderName} streaming error:`,
          errorMessage,
        );
        throw new Error(
          `${GeminiProvider.ProviderName} API error: ${errorMessage}`,
        );
      }
      console.error('Unexpected streaming error:', error);
      throw new Error(
        `Failed to stream response from ${GeminiProvider.ProviderName}`,
      );
    }
  }

  /**
   * Retrieves available Gemini models.
   *
   * @returns Promise resolving to an array of available AIModel objects
   */
  async getModels(): Promise<AIModel[]> {
    try {
      const response = await this.client.get<{ models: GeminiModel[] }>(
        '/models',
      );
      const models = response.data.models || [];

      return models
        .map((model) => {
          const [, size = '?b'] = model.name.match(/-(\d+(b|n))/) ?? [];
          const name = model.name.split('/');

          return {
            id: model.name,
            name: (name.length > 1 ? name[1] : name[0]).replace(/-\d+b/g, ''),
            provider: GeminiProvider.ProviderID,
            size,
            description: model.description,
            contextLength: model?.outputTokenLimit || 4096,
          };
        })
        .sort((a, b) => a.name.localeCompare(b.name));
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
  async generateSync(request: PromptRequest): Promise<PromptResponse> {
    const startTime = Date.now();

    const promptRequest = await PromptRequestNormalizer.normalize({
      ...request,
    });

    const aiPrompt = UniversalPromptComposer.generate(promptRequest);

    const body = {
      contents: [
        { role: 'system', parts: [{ text: promptRequest.systemPrompt }] },
        { role: 'user', parts: [{ text: aiPrompt }] },
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

    const enhancedPrompt = await this.toPromptResponse(
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text,
      request.text,
      GeminiProvider,
      request?.format || 'markdown',
    );

    return {
      aiPrompt,
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
          contents: [{ parts: [{ text: 'test' }] }],
        },
      );

      return !!response.data?.text?.length;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
