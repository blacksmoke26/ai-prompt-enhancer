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
 * Represents a model from the Groq API, containing metadata and configuration details.
 *
 * @example
 * const model: GroqModel = {
 *   id: 'gemma2-9b-it',
 *   object: 'model',
 *   created: '1693721698',
 *   owned_by: 'Google',
 *   active: true,
 *   context_window: 8192,
 *   public_apps: null
 * };
 *
 * @developerNotes
 * This interface is based on the Groq API response structure. The `created` field is a Unix timestamp as a string.
 * The `public_apps` field can be null if the model is not publicly accessible.
 */
export interface GroqModel {
  /** Unique identifier for the model (e.g., 'gemma2-9b-it') */
  id: string;
  /** Type of the model object (always 'model')*/
  object: string;
  /** Unix timestamp indicating when the model was created*/
  created: string;
  /** Organization or entity that owns the model (e.g., 'Google')*/
  owned_by: string;
  /** Boolean flag indicating if the model is currently active */
  active: boolean;
  /** Maximum context window size in tokens supported by the model*/
  context_window: number;
  /** Optional field specifying public applications associated with the model*/
  public_apps: string | null;
}

/**
 * Groq AI provider for prompt enhancement.
 *
 * @example
 * ```ts
 * const provider = new GroqProvider({apiKey: 'your-api-key'});
 * const response = await provider.enhancePrompt({
 *   text: 'Explain relativity',
 *   model: 'mixtral-8x7b-32768',
 *   enhancementType: 'enhance',
 * });
 * ```
 *
 * @developerNote This provider uses Groq's API endpoint at https://api.groq.com/openai/v1/chat/completions.
 * It supports Mixtral and LLaMA2 models with various context lengths and token limits.
 */
export default class GroqProvider extends BaseAIProvider {
  /**
   * A static constant representing the unique identifier for the provider, typically used in internal systems or API integrations.
   * @developerNotes Ensure the ID is lowercase and matches the provider's official identifier.
   */
  public static readonly ProviderID: string = 'groq';

  /**
   * A static constant representing the display name or key used for referencing the provider in user-facing contexts.
   * @developerNotes This value should match the provider's official branding.
   */
  public static readonly ProviderKey: string = 'Groq';

  /**
   * A static constant representing the full, official name of the provider, typically used for documentation or identification purposes.
   * @developerNotes Ensure consistency with the provider's official name and use proper casing.
   */
  public static readonly ProviderName: string = 'Groq';

  /**
   * A static constant representing the default prompts used by the provider.
   * @developerNotes These prompts should be tailored to the specific needs of the provider and should be updated as needed.
   */
  public static readonly DefaultPrompts: ProviderDefaultPrompt = {
    system:
      'You are a Groq-powered AI assistant optimized for speed and accuracy. Enhance prompts to be concise, unambiguous, and well-structured.',
    role: 'You are a prompt engineer focused on efficiency and precision. Improve prompts for faster, more reliable AI responses.',
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
    caption: GroqProvider.ProviderName,
    name: GroqProvider.ProviderID,
    baseUrl: 'https://api.groq.com',
    apiKey: '',
    timeout: 30000,
  };

  /**
   * Creates an instance of GroqProvider.
   * @param config - Configuration object
   */
  constructor(config: ConfigMeta) {
    super(GroqProvider.ProviderKey, {
      baseUrl: config?.baseUrl || GroqProvider.ProviderConfig.baseUrl,
    });
    this.client.defaults.headers.common['Authorization'] =
      `Bearer ${config?.apiKey}`;
  }

  /**
   * Retrieves available AI models from Groq.
   *
   * @returns Promise resolving to array of available AI models
   *
   * @developerNote Currently returns Mixtral 8x7B (32768 context) and LLaMA2 70B (4096 context) models.
   * These models have different token limits and capabilities.
   */
  async getModels(): Promise<AIModel[]> {
    try {
      const response = await this.client.get<{ data: GroqModel[] }>(
        '/openai/v1/models',
      );
      const models = response.data.data || [];

      return models
        .map((model) => {
          const [, size = '?b'] = model.id.match(/-(\d+b)/) ?? [];
          const name = model.id.split('/');
          return {
            id: model.id,
            name: (name.length > 1 ? name[1] : name[0]).replace(/-\d+b/g, ''),
            provider: GroqProvider.ProviderID,
            size,
            description: `${size}`,
            contextLength: model?.context_window || 4096,
          };
        })
        .sort((a, b) => a.name.localeCompare(b.name));
    } catch (error: any) {
      console.error('Failed to fetch Groq models:', error);
      return [];
    }
  }

  /**
   * Enhances a prompt using Groq's AI models.
   *
   * @param request - The prompt enhancement request containing text, model, and options
   * @returns Promise resolving to enhanced prompt response
   *
   * @example
   * ```ts
   * const response = await provider.enhancePrompt({
   *   text: 'Explain relativity',
   *   model: 'mixtral-8x7b-32768',
   *   enhancementType: 'enhance',
   *   temperature: 0.7,
   * });
   * ```
   *
   * @developerNote Uses system prompts based on enhancement type and user role.
   * Falls back to original text if enhancement fails. Measures processing time and token usage.
   */
  async generateSync(request: PromptRequest): Promise<PromptResponse> {
    const startTime = Date.now();

    const promptRequest = await PromptRequestNormalizer.normalize({
      ...request,
    });

    const aiPrompt = UniversalPromptComposer.generate(promptRequest);

    const response = await this.client.post('/openai/v1/chat/completions', {
      model: request.model,
      messages: [
        { role: 'system', content: promptRequest.systemPrompt },
        {
          role: 'user',
          content: aiPrompt,
        },
      ],
      temperature: request.temperature ?? 0.7,
      max_tokens: request.maxTokens ?? 2000,
    });

    const enhancedPrompt = await this.toPromptResponse(
      response.data.choices?.[0]?.message?.content,
      request.text,
      GroqProvider,
      request?.format || 'markdown',
    );

    return {
      aiPrompt,
      enhancedPrompt,
      originalPrompt: request.text,
      model: request.model,
      timestamp: new Date(),
      tokensUsed: response.data.usage?.total_tokens,
      processingTime: this.calculateProcessingTime(startTime),
    };
  }

  /**
   * Generates a streaming response from Groq's API.
   * @param request - The prompt request
   * @param history - Optional conversation history
   * @yields StreamResponse chunks and StreamEnded signal
   * @example
   * ```typescript
   * for await (const chunk of provider.generateStream(request)) {
   *   if (chunk.done) {
   *     // Stream completed
   *     console.log(`Used ${chunk.tokensUsed} tokens`);
   *   } else {
   *     console.log(chunk.message.content);
   *   }
   * }
   * ```
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
      const response = await this.client.post('/openai/v1/chat/completions', {
        model: history?.model ?? request?.model ?? 'mixtral-8x7b-32768',
        messages: [
          {
            role: 'system',
            content: history?.systemPrompt ?? request?.systemPrompt,
          },
          {
            role: 'user',
            content: aiPrompt,
          },
        ],
        temperature: request?.temperature ?? 0.7,
        max_tokens: request?.maxTokens ?? 2000,
        stream: true,
      });

      const stream = response.data as AsyncIterable<any>;

      for await (const chunk of stream) {
        if (chunk.choices && chunk.choices[0]?.delta?.content) {
          yield {
            model: history?.model ?? request?.model ?? 'mixtral-8x7b-32768',
            created_at: new Date().toISOString(),
            message: {
              role: 'assistant',
              content: chunk.choices[0].delta.content,
            },
            done: false,
          };
        } else if (chunk.choices && chunk.choices[0]?.finish_reason) {
          const tokensUsed = chunk.usage?.total_tokens || 0;

          yield new StreamEnded({
            model: history?.model ?? request?.model ?? 'mixtral-8x7b-32768',
            aiPrompt,
            tokensUsed,
            processingTime: this.calculateProcessingTime(startTime),
          });
          return;
        }
      }

      // If stream completes without explicit finish_reason, yield StreamEnded
      yield new StreamEnded({
        model: history?.model ?? request?.model ?? 'mixtral-8x7b-32768',
        aiPrompt,
        tokensUsed: 0,
        processingTime: this.calculateProcessingTime(startTime),
      });
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.error?.message || error.message;
        console.error(
          `${GroqProvider.ProviderName} streaming error:`,
          errorMessage,
        );
        throw new Error(
          `${GroqProvider.ProviderName} API error: ${errorMessage}`,
        );
      }
      console.error('Unexpected streaming error:', error);
      throw new Error(
        `Failed to stream response from ${GroqProvider.ProviderName}`,
      );
    }
  }

  /**
   * Checks if the Groq API service is available.
   *
   * @returns Promise resolving to boolean indicating service availability
   *
   * @developerNote Performs a minimal API call with Mixtral model to test connectivity.
   * Returns false on any API error or if response format is unexpected.
   */
  async isAvailable(): Promise<boolean> {
    const [model] = await this.getModels();

    try {
      const resp = await this.client.post('/openai/v1/chat/completions', {
        model: model.id,
        messages: [{ role: 'user', content: 'test' }],
        max_tokens: 1,
      });
      return !!resp.data.choices;
    } catch {
      return false;
    }
  }
}
