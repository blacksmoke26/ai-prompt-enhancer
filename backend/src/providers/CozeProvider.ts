/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import BaseAIProvider, {ProviderDefaultPrompt} from '~/base/BaseAIProvider';

// constants
import {OutputFormat, OutputFormatName} from '~/constants/output-format';

// types
import type {AIModel} from '~/types';
import type {ConfigMeta} from '~/database/models';
import type {ProviderConfig} from '~/types/providers';
import type {PromptRequest, PromptResponse, ProviderCapabilities} from '~/types/prompt';

/**
 * Coze AI provider for prompt enhancement and model management.
 *
 * Provides integration with Coze's AI models to enhance and optimize prompts
 * for better AI responses.
 *
 * @example
 * ```typescript
 * const provider = new CozeProvider({apiKey: 'your-api-key'});
 * const response = await provider.enhancePrompt({
 *   text: 'Explain relativity',
 *   model: 'coze-llama3',
 *   enhancementType: 'enhance',
 * });
 * ```
 *
 * @developer-note
 * Ensure you have a valid API key from Coze. The provider uses the default
 * Coze API endpoint but can be customized with a different baseUrl if needed.
 */
export default class CozeProvider extends BaseAIProvider {
  /**
   * A static constant representing the unique identifier for the provider, typically used in internal systems or API integrations.
   * @developerNotes Ensure the ID is lowercase and matches the provider's official identifier.
   */
  public static readonly ProviderID: string = 'coze';

  /**
   * A static constant representing the display name or key used for referencing the provider in user-facing contexts.
   * @developerNotes This value should match the provider's official branding.
   */
  public static readonly ProviderKey: string = 'Coze';

  /**
   * A static constant representing the full, official name of the provider, typically used for documentation or identification purposes.
   * @developerNotes Ensure consistency with the provider's official name and use proper casing.
   */
  public static readonly ProviderName: string = 'Coze';

  /**
   * A static constant representing the default prompts used by the provider.
   * @developerNotes These prompts should be tailored to the specific needs of the provider and should be updated as needed.
   */
  public static readonly DefaultPrompts: ProviderDefaultPrompt = {
    system: 'You are an AI assistant on the Coze platform. Improve prompts to be more effective, natural, and aligned with conversational best practices.',
    role: 'You specialize in prompt enhancement for chatbots and agents. Make prompts clearer, more engaging, and better scoped.',
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
    caption: CozeProvider.ProviderName,
    name: CozeProvider.ProviderID,
    baseUrl: 'https://api.coze.cn',
    apiKey: '',
    timeout: 30000,
  };

  /**
   * @inheritDoc
   */
  public static getProviderSpecificSystemPrompt(formattedPrompt: string, capabilities?: ProviderCapabilities): string {
    // Coze benefits from structured system prompts
    formattedPrompt = `You are a helpful AI assistant. ${formattedPrompt}`;

    return formattedPrompt;
  }

  /**
   * @inheritDoc
   */
  public static getFormatTemplates(): Record<OutputFormatName, string> {
    return {
      [OutputFormat.JSON]: `Output Format: JSON\nRespond in valid JSON format with correct syntax.`,
      [OutputFormat.MARKDOWN]: `Output Format: Markdown\nUse Markdown for structured, readable output.`,
      [OutputFormat.TEXT]: `Output Format: Plain Text\nProvide straightforward plain text.`,
      [OutputFormat.HTML]: `Output Format: HTML\nReturn semantic and valid HTML.`,
      [OutputFormat.XML]: `Output Format: XML\nReturn well-formed XML document.`,
      [OutputFormat.YAML]: `Output Format: YAML\nReturn correctly formatted YAML.`,
    };
  }

  /**
   * Creates a new Coze provider instance.
   * @param config - Configuration object
   */
  constructor(config: ConfigMeta) {
    super(CozeProvider.ProviderKey, {baseUrl: config?.baseUrl || CozeProvider.ProviderConfig.baseUrl});
    this.client.defaults.headers.common['Authorization'] = `Bearer ${config?.apiKey}`;
  }

  /**
   * Retrieves available AI models from Coze.
   *
   * @returns Promise resolving to an array of available AI models
   *
   * @developer-note
   * Currently returns a static list of models. In a production environment,
   * this should fetch the actual available models from the Coze API.
   */
  async getModels(): Promise<AIModel[]> {
    return [
      {
        id: 'coze-llama3',
        name: 'Coze LLaMA 3',
        provider: CozeProvider.ProviderID,
        description: 'Coze\'s LLaMA 3 based model',
        contextLength: 32768,
        maxTokens: 4096,
      },
      {
        id: 'coze-dolly',
        name: 'Coze Dolly',
        provider: CozeProvider.ProviderID,
        description: 'Coze\'s Dolly model for general usage',
        contextLength: 2048,
        maxTokens: 1024,
      },
      {
        id: 'coze-gpt4',
        name: 'Coze GPT-4',
        provider: CozeProvider.ProviderID,
        description: 'Coze\'s GPT-4 compatible model',
        contextLength: 8192,
        maxTokens: 2048,
      },
    ];
  }

  /**
   * Enhances a prompt using Coze's AI models.
   *
   * @param request - The prompt enhancement request containing text and options
   * @returns Promise resolving to the enhanced prompt response
   *
   * @throws Error If the enhancement request fails
   *
   * @developer-note
   * The method uses a chat completion approach with system and user messages.
   * Temperature and max tokens have sensible defaults but can be overridden.
   */
  async enhancePrompt(request: PromptRequest): Promise<PromptResponse> {
    const startTime = Date.now();
    try {
      const systemPrompt = await this.buildSystemPrompt(request);

      const response = await this.client.post('/v1/chat/completions', {
        model: request.model,
        messages: [
          {role: 'system', content: await this.formatSystemPrompt(systemPrompt)},
          {role: 'user', content: await this.formatPrompt(request)},
        ],
        temperature: request.temperature ?? 0.7,
        max_tokens: request.maxTokens ?? 2000,
      });

      const enhancedPrompt = await this.toPromptResponse(response.data.choices?.[0]?.message?.content, request.text);

      return {
        enhancedPrompt,
        originalPrompt: request.text,
        model: request.model,
        timestamp: new Date(),
        tokensUsed: response.data.usage?.total_tokens,
        processingTime: this.calculateProcessingTime(startTime),
      };
    } catch (error: any) {
      console.error('Coze enhancement failed:', error);
      throw new Error(`Failed to enhance prompt with Coze: ${error}`);
    }
  }

  /**
   * Checks if the Coze service is available and responsive.
   *
   * @returns Promise resolving to true if service is available, false otherwise
   *
   * @developer-note
   * Performs a minimal API call to test connectivity. Uses coze-llama3 model
   * as it's expected to be consistently available.
   */
  async isAvailable(): Promise<boolean> {
    try {
      const response = await this.client.post('/v1/chat/completions', {
        model: 'coze-llama3',
        messages: [{role: 'user', content: 'test'}],
        max_tokens: 1,
      });
      return !!response.data.choices;
    } catch {
      return false;
    }
  }
}
