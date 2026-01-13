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
import type {PromptRequest, PromptResponse, ProviderCapabilities} from '~/types/prompt';

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
   * A static constant representing the unique identifier for the provider, typically used in internal systems or API integrations.
   * @developerNotes Ensure the ID is lowercase and matches the provider's official identifier.
   */
  public static readonly ProviderID: string = 'qianfan';

  /**
   * A static constant representing the display name or key used for referencing the provider in user-facing contexts.
   * @developerNotes This value should match the provider's official branding.
   */
  public static readonly ProviderKey: string = 'Qianfan';

  /**
   * A static constant representing the full, official name of the provider, typically used for documentation or identification purposes.
   * @developerNotes Ensure consistency with the provider's official name and use proper casing.
   */
  public static readonly ProviderName: string = 'Qianfan';

  /**
   * A static constant representing the default prompts used by the provider.
   * @developerNotes These prompts should be tailored to the specific needs of the provider and should be updated as needed.
   */
  public static readonly DefaultPrompts: ProviderDefaultPrompt = {
    system: 'You are a Qianfan AI assistant by Baidu. Refine prompts to be natural, contextually appropriate, and aligned with Chinese and global best practices.',
    role: 'You specialize in multilingual prompt enhancement. Improve clarity and cultural appropriateness while preserving intent.',
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
    caption: QianFanProvider.ProviderName,
    name: QianFanProvider.ProviderID,
    baseUrl: 'https://dashscope.aliyuncs.com',
    apiKey: '',
    timeout: 30000,
  };

  /**
   * Initialize the QianFan provider with authentication credentials.
   * @param config - Configuration object
   */
  constructor(config: ConfigMeta) {
    super(QianFanProvider.ProviderKey, {baseUrl: config?.baseUrl || QianFanProvider.ProviderConfig.baseUrl});
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
        provider: QianFanProvider.ProviderID,
        description: 'Alibaba Qwen 1.5 1.8B chat model',
        contextLength: 8192,
        maxTokens: 2048,
      },
      {
        id: 'qwen-1.5-72b-chat',
        name: 'Qwen 1.5 72B Chat',
        provider: QianFanProvider.ProviderID,
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
  async generateSync(request: PromptRequest): Promise<PromptResponse> {
    const startTime = Date.now();

    const promptRequest = await PromptRequestNormalizer.normalize({
      ...request,
    });

    const aiPrompt = UniversalPromptComposer.generate(promptRequest);

    try {
      const response = await this.client.post(
        '/api/v1/services/aigc/text-generation/v1',
        {
          model: request.model,
          input: `SYSTEM: ${promptRequest.systemPrompt}`
            + `\n\nUSER: ${aiPrompt}`,
          parameters: {
            temperature: request.temperature ?? 0.7,
            top_p: 1.0,
            max_tokens: request.maxTokens ?? 2000,
          },
        },
      );

      const enhanced = await this.toPromptResponse(
        response.data.output?.choices?.[0]?.content, request.text, QianFanProvider, request?.format || 'markdown',
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
          parameters: {max_tokens: 1},
        },
      );
      return !!resp.data.output?.choices;
    } catch {
      return false;
    }
  }
}
