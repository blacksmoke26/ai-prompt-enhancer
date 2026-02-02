/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import BaseAIProvider, { ProviderDefaultPrompt } from '~/base/BaseAIProvider';
import axios from 'axios';

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
 * DeepSeek AI provider for prompt enhancement and model management.
 * @example
 * ```typescript
 * const provider = new DeepSeekProvider({apiKey: 'your-api-key'});
 * const response = await provider.enhancePrompt({
 *   text: 'Explain quantum computing',
 *   model: 'deepseek-chat',
 *   enhancementType: 'enhance'
 * });
 * ```
 * @developerNote Ensure valid API key is provided for all operations.
 */
export default class DeepSeekProvider extends BaseAIProvider {
  /**
   * A static constant representing the unique identifier for the provider, typically used in internal systems or API integrations.
   * @developerNotes Ensure the ID is lowercase and matches the provider's official identifier.
   */
  public static readonly ProviderID: string = 'deepseek';

  /**
   * A static constant representing the display name or key used for referencing the provider in user-facing contexts.
   * @developerNotes This value should match the provider's official branding.
   */
  public static readonly ProviderKey: string = 'Deepseek';

  /**
   * A static constant representing the full, official name of the provider, typically used for documentation or identification purposes.
   * @developerNotes Ensure consistency with the provider's official name and use proper casing.
   */
  public static readonly ProviderName: string = 'Deepseek';

  /**
   * A static constant representing the default prompts used by the provider.
   * @developerNotes These prompts should be tailored to the specific needs of the provider and should be updated as needed.
   */
  public static readonly DefaultPrompts: ProviderDefaultPrompt = {
    system:
      'You are a DeepSeek AI language model. Refine prompts to be logically sound, grammatically correct, and semantically precise.',
    role: 'You are a prompt optimization assistant. Ensure clarity, fluency, and fidelity to the original user intent.',
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
    caption: DeepSeekProvider.ProviderName,
    name: DeepSeekProvider.ProviderID,
    baseUrl: 'https://api.deepseek.com',
    apiKey: '',
    timeout: 30000,
  };

  /**
   * Creates a new DeepSeek provider instance with authentication.
   * @param config - Configuration object
   * @example
   * ```typescript
   * const provider = new DeepSeekProvider('api-key', 'https://custom.url');
   * ```
   * @developerNote API key is stored in headers for all subsequent requests.
   */
  constructor(config: ConfigMeta) {
    super(DeepSeekProvider.ProviderKey, {
      baseUrl: config?.baseUrl || DeepSeekProvider.ProviderConfig.baseUrl,
    });
    this.client.defaults.headers.common['Authorization'] =
      `Bearer ${config?.apiKey}`;
  }

  /**
   * Retrieves available DeepSeek AI models with their specifications.
   * @returns Promise resolving to array of AI models
   * @example
   * ```typescript
   * const models = await provider.getModels();
   * console.log(models[0].name); // 'DeepSeek Chat'
   * ```
   * @developerNote Currently returns static models. Consider updating to fetch from API.
   */
  async getModels(): Promise<AIModel[]> {
    try {
      return [
        {
          id: 'deepseek-chat',
          name: 'DeepSeek Chat',
          provider: DeepSeekProvider.ProviderID,
          description: "DeepSeek's conversational model",
          contextLength: 32768,
          maxTokens: 4096,
        },
        {
          id: 'deepseek-coder',
          name: 'DeepSeek Coder',
          provider: DeepSeekProvider.ProviderID,
          description: "DeepSeek's code-specialized model",
          contextLength: 16384,
          maxTokens: 4096,
        },
      ];
    } catch (error: any) {
      console.error('Failed to fetch DeepSeek models:', error);
      return [];
    }
  }

  /**
   * Enhances a prompt using DeepSeek's language models with context-aware optimization.
   * @param request - Prompt enhancement request parameters
   * @returns Promise resolving to enhanced prompt response
   * @example
   * ```typescript
   * const response = await provider.enhancePrompt({
   *   text: 'Explain photosynthesis',
   *   model: 'deepseek-chat',
   *   enhancementType: 'enhance'
   * });
   * console.log(response.enhancedPrompt);
   * ```
   * @developerNote Handles rate limiting and token counting automatically.
   */
  async generateSync(request: PromptRequest): Promise<PromptResponse> {
    const startTime = Date.now();

    const promptRequest = await PromptRequestNormalizer.normalize({
      ...request,
    });

    const aiPrompt = UniversalPromptComposer.generate(promptRequest);

    try {
      const response = await this.client.post('/chat/completions', {
        model: request.model,
        messages: [
          { role: 'system', content: promptRequest.systemPrompt },
          { role: 'user', content: aiPrompt },
        ],
        temperature: request.temperature || 0.7,
        max_tokens: request.maxTokens || 2000,
      });

      const enhancedPrompt = await this.toPromptResponse(
        response.data.choices[0]?.message?.content,
        request.text,
        DeepSeekProvider,
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
    } catch (error: any) {
      console.error('DeepSeek enhancement failed:', error);
      throw new Error(`Failed to enhance prompt with DeepSeek: ${error}`);
    }
  }

  /**
   * Generates a streaming response from DeepSeek's API.
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
      const response = await this.client.post('/chat/completions', {
        model: history?.model ?? request?.model ?? 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: history?.systemPrompt ?? request?.systemPrompt,
          },
          { role: 'user', content: aiPrompt },
        ],
        temperature: request?.temperature ?? 0.7,
        max_tokens: request?.maxTokens ?? 2000,
        stream: true,
      });

      const stream = response.data as AsyncIterable<any>;

      for await (const chunk of stream) {
        if (chunk.choices && chunk.choices[0]?.delta?.content) {
          yield {
            model: history?.model ?? request?.model ?? 'deepseek-chat',
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
            model: history?.model ?? request?.model ?? 'deepseek-chat',
            aiPrompt,
            tokensUsed,
            processingTime: this.calculateProcessingTime(startTime),
          });
          return;
        }
      }

      // If stream completes without explicit finish_reason, yield StreamEnded
      yield new StreamEnded({
        model: history?.model ?? request?.model ?? 'deepseek-chat',
        aiPrompt,
        tokensUsed: 0,
        processingTime: this.calculateProcessingTime(startTime),
      });
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.error?.message || error.message;
        console.error(
          `${DeepSeekProvider.ProviderName} streaming error:`,
          errorMessage,
        );
        throw new Error(
          `${DeepSeekProvider.ProviderName} API error: ${errorMessage}`,
        );
      }
      console.error('Unexpected streaming error:', error);
      throw new Error(
        `Failed to stream response from ${DeepSeekProvider.ProviderName}`,
      );
    }
  }

  /**
   * Checks DeepSeek service availability with minimal API request.
   * @returns Promise resolving to boolean indicating availability
   * @example
   * ```typescript
   * if (await provider.isAvailable()) {
   *   console.log('DeepSeek is ready');
   * }
   * ```
   * @developerNote Uses minimal request to check API connectivity.
   */
  async isAvailable(): Promise<boolean> {
    try {
      const response = await this.client.post('/chat/completions', {
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: 'test' }],
        max_tokens: 1,
      });
      return !!response.data.choices;
    } catch {
      return false;
    }
  }
}
