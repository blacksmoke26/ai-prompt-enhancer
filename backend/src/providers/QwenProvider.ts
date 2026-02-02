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
 * Qwen AI provider for language model series.
 * Provides integration with Qwen AI's chat completion API.
 *
 * @example
 * ```ts
 * const provider = new QwenProvider({apiKey: 'your-api-key'});
 * const response = await provider.enhancePrompt({
 *   text: 'Explain quantum computing',
 *   model: 'qwen-max',
 *   enhancementType: 'enhance',
 * });
 * ```
 * @developerNote
 * Ensure proper API key management and consider rate limits.
 * The base URL can be customized for different deployment environments.
 */
export default class QwenProvider extends BaseAIProvider {
  /**
   * A static constant representing the unique identifier for the provider, typically used in internal systems or API integrations.
   * @developerNotes Ensure the ID is lowercase and matches the provider's official identifier.
   */
  public static readonly ProviderID: string = 'qwen';

  /**
   * A static constant representing the display name or key used for referencing the provider in user-facing contexts.
   * @developerNotes This value should match the provider's official branding.
   */
  public static readonly ProviderKey: string = 'Qwen';

  /**
   * A static constant representing the full, official name of the provider, typically used for documentation or identification purposes.
   * @developerNotes Ensure consistency with the provider's official name and use proper casing.
   */
  public static readonly ProviderName: string = 'Qwen';

  /**
   * A static constant representing the default prompts used by the provider.
   * @developerNotes These prompts should be tailored to the specific needs of the provider and should be updated as needed.
   */
  public static readonly DefaultPrompts: ProviderDefaultPrompt = {
    system:
      'You are Qwen, a large language model developed by Alibaba Cloud. Optimize prompts for fluency, logic, and cross-cultural understanding.',
    role: 'You are a prompt refinement expert. Enhance structure, coherence, and effectiveness across diverse use cases.',
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
    caption: QwenProvider.ProviderName,
    name: QwenProvider.ProviderID,
    baseUrl: 'https://dashscope-intl.aliyuncs.com/compatible-mode/v1',
    apiKey: '',
    timeout: 30000,
  };

  /**
   * Initializes a new Qwen provider instance.
   * @param config - Configuration object
   */
  constructor(config: ConfigMeta) {
    super(QwenProvider.ProviderKey, {
      baseUrl: config?.baseUrl || QwenProvider.ProviderConfig.baseUrl,
    });
    this.client.defaults.headers.common['Authorization'] =
      `Bearer ${config?.apiKey}`;
    this.client.defaults.headers.common['Content-Type'] = 'application/json';
  }

  /**
   * Retrieves available Qwen models with their specifications.
   * @returns Promise resolving to an array of AI model configurations
   * @developerNote
   * This list should be updated when new models are released.
   * Consider fetching dynamically from the API for production use.
   */
  async getModels(): Promise<AIModel[]> {
    return [
      {
        id: 'qwen-max',
        provider: QwenProvider.ProviderID,
        name: 'Qwen Max',
        description: 'Most capable model for complex tasks',
        maxTokens: 8192,
        contextLength: 8192,
      },
      {
        id: 'qwen-plus',
        provider: QwenProvider.ProviderID,
        name: 'Qwen Plus',
        description: 'Balanced model for general tasks',
        maxTokens: 4096,
        contextLength: 4096,
      },
      {
        id: 'qwen-turbo',
        provider: QwenProvider.ProviderID,
        name: 'Qwen Turbo',
        description: 'Fast and efficient model for simple tasks',
        maxTokens: 2048,
        contextLength: 2048,
      },
    ];
  }

  /**
   * Enhances a prompt using Qwen's language models.
   * @param request - The prompt enhancement request containing text and options
   * @returns Promise resolving to the enhanced prompt response
   * @developerNote
   * Handles API errors gracefully and provides fallback to original prompt.
   * Processing time is calculated client-side.
   */
  async generateSync(request: PromptRequest): Promise<PromptResponse> {
    const startTime = Date.now();

    const promptRequest = await PromptRequestNormalizer.normalize({
      ...request,
    });

    const aiPrompt = UniversalPromptComposer.generate(promptRequest);

    try {
      const response = await this.client.post('/chat/completions', {
        model: request.model || 'qwen-plus',
        messages: [
          {
            role: 'system',
            content: promptRequest.systemPrompt,
          },
          {
            role: 'user',
            content: aiPrompt,
          },
        ],
        temperature: request.temperature ?? 0.7,
        max_tokens: request.maxTokens,
      });

      const enhanced = await this.toPromptResponse(
        response.data.output?.choices?.[0]?.content,
        request.text,
        QwenProvider,
        request?.format || 'markdown',
      );

      return {
        aiPrompt,
        enhancedPrompt: enhanced,
        originalPrompt: request.text,
        model: request.model,
        timestamp: new Date(),
        tokensUsed: response.data.usage?.total_tokens,
        processingTime: this.calculateProcessingTime(startTime),
      };
    } catch (error) {
      console.error('Qwen enhancement failed:', error);
      throw new Error(`Failed to enhance prompt with Qwen: ${error}`);
    }
  }

  /**
   * Generates a streaming response from Qwen's language models.
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
        model: history?.model ?? request?.model ?? 'qwen-plus',
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
            model: history?.model ?? request?.model ?? 'qwen-plus',
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
            model: history?.model ?? request?.model ?? 'qwen-plus',
            aiPrompt,
            tokensUsed,
            processingTime: this.calculateProcessingTime(startTime),
          });
          return;
        }
      }

      // If stream completes without explicit finish_reason, yield StreamEnded
      yield new StreamEnded({
        model: history?.model ?? request?.model ?? 'qwen-plus',
        aiPrompt,
        tokensUsed: 0,
        processingTime: this.calculateProcessingTime(startTime),
      });
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.error?.message || error.message;
        console.error(
          `${QwenProvider.ProviderName} streaming error:`,
          errorMessage,
        );
        throw new Error(
          `${QwenProvider.ProviderName} API error: ${errorMessage}`,
        );
      }
      console.error('Unexpected streaming error:', error);
      throw new Error(
        `Failed to stream response from ${QwenProvider.ProviderName}`,
      );
    }
  }

  /**
   * Checks if the Qwen service is available and responsive.
   * @returns Promise resolving to true if service is available, false otherwise
   * @developerNote
   * Uses a minimal request to test connectivity. Consider implementing retry logic.
   */
  async isAvailable(): Promise<boolean> {
    try {
      await this.client.get('/models');
      return true;
    } catch {
      return false;
    }
  }
}
