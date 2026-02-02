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
  FunctionCallResult,
  FunctionDefinition,
  PromptRequest,
  PromptResponse,
  StreamResponse,
} from '~/types/prompt';

/**
 * Cody AI provider for prompt enhancement and optimization.
 *
 * @example
 * ```ts
 * const provider = new CodyProvider({apiKey: 'your-api-key'});
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
export default class CodyProvider extends BaseAIProvider {
  /**
   * A static constant representing the unique identifier for the provider, typically used in internal systems or API integrations.
   * @developerNotes Ensure the ID is lowercase and matches the provider's official identifier.
   */
  public static readonly ProviderID: string = 'cody';

  /**
   * A static constant representing the display name or key used for referencing the provider in user-facing contexts.
   * @developerNotes This value should match the provider's official branding.
   */
  public static readonly ProviderKey: string = 'Cody';

  /**
   * A static constant representing the full, official name of the provider, typically used for documentation or identification purposes.
   * @developerNotes Ensure consistency with the provider's official name and use proper casing.
   */
  public static readonly ProviderName: string = 'Cody';

  /**
   * A static constant representing the default prompts used by the provider.
   * @developerNotes These prompts should be tailored to the specific needs of the provider and should be updated as needed.
   */
  public static readonly DefaultPrompts: ProviderDefaultPrompt = {
    system:
      'You are Cody, an AI coding assistant from Sourcegraph. Help users refine prompts with a focus on technical accuracy and developer context.',
    role: 'You are a prompt engineering assistant specialized in developer workflows. Improve prompts to be precise, actionable, and context-aware.',
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
    caption: CodyProvider.ProviderName,
    name: CodyProvider.ProviderID,
    baseUrl: 'https://sourcegraph.com',
    apiKey: '',
    timeout: 30000,
  };

  /**
   * Initializes a new CodyProvider instance.
   * @param config - Configuration object
   * @example
   * ```ts
   * const provider = new CodyProvider({apiKey: 'sk-xxx', baseUrl: 'https://custom-api.cody.ai'});
   * ```
   */
  constructor(config: ConfigMeta) {
    super(CodyProvider.ProviderKey, {
      baseUrl: config?.baseUrl || CodyProvider.ProviderConfig.baseUrl,
    });
    this.client.defaults.headers.common['Authorization'] =
      `Bearer ${config?.apiKey}`;
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
        provider: CodyProvider.ProviderID,
        description: 'Cody model optimized for code generation',
        contextLength: 16384,
        maxTokens: 2048,
      },
      {
        id: 'cody-general',
        name: 'Cody General',
        provider: CodyProvider.ProviderID,
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
  async generateSync(request: PromptRequest): Promise<PromptResponse> {
    const startTime = Date.now();

    const promptRequest = await PromptRequestNormalizer.normalize({
      ...request,
    });

    const aiPrompt = UniversalPromptComposer.generate(promptRequest);

    try {
      const response = await this.client.post('/chat', {
        model: request.model,
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
        max_tokens: request.maxTokens ?? 2000,
      });

      const enhanced = await this.toPromptResponse(
        response.data.choices?.[0]?.message?.content,
        request.text,
        CodyProvider,
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
    } catch (error: any) {
      console.error('Cody enhancement failed:', error);
      throw new Error(`Failed to enhance prompt with Cody: ${error}`);
    }
  }

  /**
   * Generates a streaming response from Cody AI's API.
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
      const response = await this.client.post('/chat', {
        model: history?.model ?? request?.model ?? 'cody-general',
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
            model: history?.model ?? request?.model ?? 'cody-general',
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
            model: history?.model ?? request?.model ?? 'cody-general',
            aiPrompt,
            tokensUsed,
            processingTime: this.calculateProcessingTime(startTime),
          });
          return;
        }
      }

      // If stream completes without explicit finish_reason, yield StreamEnded
      yield new StreamEnded({
        model: history?.model ?? request?.model ?? 'cody-general',
        aiPrompt,
        tokensUsed: 0,
        processingTime: this.calculateProcessingTime(startTime),
      });
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.error?.message || error.message;
        console.error(
          `${CodyProvider.ProviderName} streaming error:`,
          errorMessage,
        );
        throw new Error(
          `${CodyProvider.ProviderName} API error: ${errorMessage}`,
        );
      }
      console.error('Unexpected streaming error:', error);
      throw new Error(
        `Failed to stream response from ${CodyProvider.ProviderName}`,
      );
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
   * @inheritDoc
   */
  async callFunction(
    functions: FunctionDefinition[],
    request: PromptRequest,
  ): Promise<FunctionCallResult[] | null> {
    const promptRequest = await PromptRequestNormalizer.normalize({
      ...request,
    });

    const aiPrompt = UniversalPromptComposer.generate(promptRequest);

    try {
      const response = await this.client.post('/chat', {
        model: request.model,
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
        max_tokens: request.maxTokens ?? 2000,
        functions: functions.map((fn) => ({
          name: fn.name,
          description: fn.description,
          parameters: fn.parameters,
        })),
        function_call: 'auto',
      });

      const message = response.data.choices?.[0]?.message;

      if (message?.function_call) {
        return [
          {
            name: message.function_call.name,
            arguments: JSON.parse(message.function_call.arguments),
            result: message.function_call,
            timestamp: new Date(),
            success: true,
          },
        ];
      }

      return null;
    } catch (error: any) {
      console.error('Cody function call failed:', error);
      throw new Error(`Failed to call function with Cody: ${error.message}`);
    }
  }

  /**
   * @inheritDoc
   */
  async versionInfo(): Promise<{
    apiVersion: string;
    serviceVersion: string;
    providerVersion: string;
  }> {
    try {
      const response = await this.client.get('/');

      return {
        apiVersion: response.headers['x-api-version'] || 'v1',
        serviceVersion: response.headers['x-service-version'] || 'unknown',
        providerVersion: '1.0.0',
      };
    } catch (error) {
      // Return default versions if endpoint fails
      return {
        apiVersion: 'v1',
        serviceVersion: 'unknown',
        providerVersion: '1.0.0',
      };
    }
  }
}
