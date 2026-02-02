/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

 import axios from 'axios';
 import BaseAIProvider, {ProviderDefaultPrompt} from '~/base/BaseAIProvider';

 // db
 import { ConfigMeta, History, HistoryAttributes } from '~/database/models';

 // classes
 import UniversalPromptComposer from '~/classes/composer/UniversalPromptComposer';
 import PromptRequestNormalizer from '~/classes/composer/PromptRequestNormalizer';
 import StreamEnded from '~/classes/StreamEnded';

 // types
 import type {AIModel} from '~/types';
 import type {ProviderConfig} from '~/types/providers';
 import type {PromptRequest, PromptResponse, StreamResponse} from '~/types/prompt';

/**
 * Represents a model from the Zhipu API, containing metadata and configuration details.
 *
 * @example
 * const model: ZhipuModel = {
 *   id: 'glm-4.5',
 *   object: 'model',
 *   created: 1753632000,
 *   owned_by: 'z-ai'
 * };
 *
 * @developerNotes
 * This interface is based on the Zhipu API response structure. The `created` field is a Unix timestamp as a number, and `owned_by` indicates the organization that owns the model.
 */
export interface ZhipuModel {
  /** Unique identifier for the model (e.g., 'glm-4.5') */
  id: string;
  /** Type of the model object (always 'model') */
  object: string;
  /** Unix timestamp indicating when the model was created */
  created: number;
  /** Organization or entity that owns the model (e.g., 'z-ai') */
  owned_by: string;
}

/**
 * Zhipu AI provider for GLM (General Language Model) series.
 * Provides integration with Zhipu AI's chat completion API.
 *
 * @see https://docs.z.ai/guides/llm/glm-4.5#samples-code
 *
 * @example
 * ```ts
 * const provider = new ZhipuProvider({apiKey: 'your-api-key'});
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
export default class ZhipuProvider extends BaseAIProvider {
  /**
   * A static constant representing the unique identifier for the provider, typically used in internal systems or API integrations.
   * @developerNotes Ensure the ID is lowercase and matches the provider's official identifier.
   */
  public static readonly ProviderID: string = 'zhipu';

  /**
   * A static constant representing the display name or key used for referencing the provider in user-facing contexts.
   * @developerNotes This value should match the provider's official branding.
   */
  public static readonly ProviderKey: string = 'Zhipu';

  /**
   * A static constant representing the full, official name of the provider, typically used for documentation or identification purposes.
   * @developerNotes Ensure consistency with the provider's official name and use proper casing.
   */
  public static readonly ProviderName: string = 'Zhipu';

  /**
   * A static constant representing the default prompts used by the provider.
   * @developerNotes These prompts should be tailored to the specific needs of the provider and should be updated as needed.
   */
  public static readonly DefaultPrompts: ProviderDefaultPrompt = {
    system: 'You are GLM, a large language model by Zhipu AI. Refine prompts to be coherent, context-aware, and effective in both Chinese and English contexts.',
    role: 'You are a bilingual prompt optimizer. Enhance prompts for clarity, cultural relevance, and cross-lingual consistency.',
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
    caption: ZhipuProvider.ProviderName,
    name: ZhipuProvider.ProviderID,
    baseUrl: 'https://api.z.ai/api/paas/v4',
    apiKey: '',
    timeout: 30000,
  };

  /**
   * Initializes a new Zhipu provider instance.
   * @param config - Configuration object
   */
  constructor(config: ConfigMeta) {
    super(ZhipuProvider.ProviderKey, {baseUrl: config?.baseUrl || ZhipuProvider.ProviderConfig.baseUrl});
    this.client.defaults.headers.common['Authorization'] = `Bearer ${config?.apiKey}`;
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
    try {
      const response = await this.client.get<{ data: ZhipuModel[] }>('models');
      const models = response.data.data || [];

      return models.map(model => {
        const [, size = '?b'] = model.id.match(/-(\d+b)/) ?? [];
        const name = model.id.split('/');
        return ({
          id: model.id,
          name: (name.length > 1 ? name[1] : name[0]).replace(/-\d+b/g, ''),
          provider: ZhipuProvider.ProviderID,
          size,
          description: model.id,
          contextLength: 4096,
        });
      }).sort((a, b) => a.name.localeCompare(b.name));
    } catch (error: any) {
      console.error('Failed to fetch Groq models:', error);
      return [];
    }
  }

  /**
   * Enhances a prompt using Zhipu's GLM models.
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
        model: request.model,
        messages: [
          {role: 'system', content: promptRequest.systemPrompt},
          {
            role: 'user',
            content: aiPrompt,
          },
        ],
        temperature: request.temperature ?? 0.7,
        max_tokens: request.maxTokens ?? 2000,
      });

      const enhanced = await this.toPromptResponse(
        response.data.choices?.[0]?.message?.content, request.text, ZhipuProvider, request?.format || 'markdown'
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
      console.error('Zhipu enhancement failed:', error);
      throw new Error(`Failed to enhance prompt with Zhipu: ${error}`);
    }
  }

  /**
   * Generates a streaming response from Zhipu's GLM models.
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
        model: history?.model ?? request?.model ?? 'glm-4',
        messages: [
          {role: 'system', content: history?.systemPrompt ?? request?.systemPrompt},
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
            model: history?.model ?? request?.model ?? 'glm-4',
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
            model: history?.model ?? request?.model ?? 'glm-4',
            aiPrompt,
            tokensUsed,
            processingTime: this.calculateProcessingTime(startTime),
          });
          return;
        }
      }

      // If stream completes without explicit finish_reason, yield StreamEnded
      yield new StreamEnded({
        model: history?.model ?? request?.model ?? 'glm-4',
        aiPrompt,
        tokensUsed: 0,
        processingTime: this.calculateProcessingTime(startTime),
      });
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error?.message || error.message;
        console.error(
          `${ZhipuProvider.ProviderName} streaming error:`,
          errorMessage,
        );
        throw new Error(
          `${ZhipuProvider.ProviderName} API error: ${errorMessage}`,
        );
      }
      console.error('Unexpected streaming error:', error);
      throw new Error(
        `Failed to stream response from ${ZhipuProvider.ProviderName}`,
      );
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
        messages: [{role: 'user', content: 'test'}],
        max_tokens: 1,
      });
      return !!resp.data.choices;
    } catch {
      return false;
    }
  }
}
