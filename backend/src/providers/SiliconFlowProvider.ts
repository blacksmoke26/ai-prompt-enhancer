/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import BaseAIProvider, {ProviderDefaultPrompt} from '~/base/BaseAIProvider';

// classes
import UniversalPromptComposer from '~/classes/composer/UniversalPromptComposer';
import PromptRequestNormalizer from '~/classes/composer/PromptRequestNormalizer';

// types
import type {AIModel} from '~/types';
import type {ConfigMeta} from '~/database/models';
import type {ProviderConfig} from '~/types/providers';
import type {PromptRequest, PromptResponse} from '~/types/prompt';

/**
 * SiliconFlow AI provider for prompt enhancement and model management.
 *
 * Base URL: https://api.siliconflow.cn/v1
 * Endpoint: /chat/completions
 *
 * @example
 * ```ts
 * const provider = new SiliconFlowProvider({apiKey: 'your-api-key'});
 * const response = await provider.enhancePrompt({
 *   text: 'Explain relativity',
 *   model: 'siliconflow-llama3',
 *   enhancementType: 'enhance',
 * });
 * ```
 *
 * @developerNote This provider requires a valid API key and supports multiple enhancement types.
 */
export default class SiliconFlowProvider extends BaseAIProvider {
  /**
   * A static constant representing the unique identifier for the provider, typically used in internal systems or API integrations.
   * @developerNotes Ensure the ID is lowercase and matches the provider's official identifier.
   */
  public static readonly ProviderID: string = 'siliconflow';

  /**
   * A static constant representing the display name or key used for referencing the provider in user-facing contexts.
   * @developerNotes This value should match the provider's official branding.
   */
  public static readonly ProviderKey: string = 'SiliconFlow';

  /**
   * A static constant representing the full, official name of the provider, typically used for documentation or identification purposes.
   * @developerNotes Ensure consistency with the provider's official name and use proper casing.
   */
  public static readonly ProviderName: string = 'SiliconFlow';

  /**
   * A static constant representing the default prompts used by the provider.
   * @developerNotes These prompts should be tailored to the specific needs of the provider and should be updated as needed.
   */
  public static readonly DefaultPrompts: ProviderDefaultPrompt = {
    system: 'You are a SiliconFlow AI assistant. Improve prompts to be efficient, developer-friendly, and optimized for cloud inference.',
    role: 'You specialize in prompt engineering for production AI systems. Ensure prompts are scalable, clear, and reliable.',
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
    caption: SiliconFlowProvider.ProviderName,
    name: SiliconFlowProvider.ProviderID,
    baseUrl: 'https://api.siliconflow.cn/v1',
    apiKey: '',
    timeout: 30000,
  };

  /**
   * Creates a new SiliconFlow provider instance.
   * @param config - Configuration object
   */
  constructor(config: ConfigMeta) {
    super(SiliconFlowProvider.ProviderKey, {baseUrl: config?.baseUrl || SiliconFlowProvider.ProviderConfig.baseUrl});
    this.client.defaults.headers.common['Authorization'] = `Bearer ${config?.apiKey}`;
  }

  /**
   * Retrieves available AI models.
   *
   * @returns Array of supported AI models
   * @developerNote Returns static list of models - could be updated to fetch from API
   */
  async getModels(): Promise<AIModel[]> {
    return [
      {
        id: 'siliconflow-llama3',
        name: 'SiliconFlow LLaMA 3',
        provider: SiliconFlowProvider.ProviderID,
        description: 'SiliconFlow LLaMA 3 model',
        contextLength: 32768,
        maxTokens: 8192,
      },
      {
        id: 'siliconflow-dolly',
        name: 'SiliconFlow Dolly',
        provider: SiliconFlowProvider.ProviderID,
        description: 'SiliconFlow Dolly model',
        contextLength: 4096,
        maxTokens: 2048,
      },
    ];
  }

  /**
   * Enhances a prompt using SiliconFlow's AI models.
   *
   * @param request - The prompt enhancement request
   * @returns Enhanced prompt response
   * @throws Error if enhancement fails
   * @developerNote Uses temperature 0.7 and maxTokens 2000 as defaults
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
          {role: 'user', content: aiPrompt},
        ],
        temperature: request.temperature ?? 0.7,
        max_tokens: request.maxTokens ?? 2000,
      });

      const enhancedPrompt = await this.toPromptResponse(
        response.data.choices?.[0]?.message?.content, request.text, SiliconFlowProvider, request?.format || 'markdown'
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
      console.error('SiliconFlow enhancement failed:', error);
      throw new Error(`Failed to enhance prompt with SiliconFlow: ${error}`);
    }
  }

  /**
   * Checks if the SiliconFlow service is available.
   *
   * @returns True if service is responsive
   * @developerNote Makes a minimal API call to test connectivity
   */
  async isAvailable(): Promise<boolean> {
    try {
      const resp = await this.client.post('/chat/completions', {
        model: 'siliconflow-llama3',
        messages: [{role: 'user', content: 'test'}],
        max_tokens: 1,
      });
      return !!resp.data.choices;
    } catch {
      return false;
    }
  }
}
