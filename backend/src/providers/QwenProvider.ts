/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import BaseAIProvider, {ProviderDefaultPrompt} from '~/base/BaseAIProvider';

// constants
import {OutputFormat, OutputFormatName} from '~/constants/enums';

// types
import type {AIModel} from '~/types';
import type {ConfigMeta} from '~/database/models';
import type {ProviderConfig} from '~/constants/providers';
import type {PromptRequest, PromptResponse, ProviderCapabilities} from '~/types/prompt';

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
    system: 'You are Qwen, a large language model developed by Alibaba Cloud. Optimize prompts for fluency, logic, and cross-cultural understanding.',
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
   * @inheritDoc
   */
  public static getProviderSpecificSystemPrompt(formattedPrompt: string, capabilities?: ProviderCapabilities): string {
    // Qwen (Alibaba) models benefit from clear role definitions and structured prompts
    formattedPrompt = `You are Qwen, a large language model developed by Alibaba Cloud. ${formattedPrompt}`;

    return formattedPrompt;
  }

  /**
   * @inheritDoc
   */
  public static getFormatTemplates(): Record<OutputFormatName, string> {
    return {
      [OutputFormat.JSON]: `Output Format: JSON\nEnsure output is valid JSON with proper escaping.`,
      [OutputFormat.MARKDOWN]: `Output Format: Markdown\nUse Markdown for clear formatting.`,
      [OutputFormat.TEXT]: `Output Format: Plain Text\nProvide plain, readable text.`,
      [OutputFormat.HTML]: `Output Format: HTML\nReturn valid and semantic HTML.`,
      [OutputFormat.XML]: `Output Format: XML\nProduce well-formed XML content.`,
      [OutputFormat.YAML]: `Output Format: YAML\nReturn valid YAML with correct indentation.`,
    };
  }

  /**
   * Initializes a new Qwen provider instance.
   * @param config - Configuration object
   */
  constructor(config: ConfigMeta) {
    super(QwenProvider.ProviderKey, {baseUrl: config?.baseUrl || QwenProvider.ProviderConfig.baseUrl});
    this.client.defaults.headers.common['Authorization'] = `Bearer ${config?.apiKey}`;
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
  async enhancePrompt(request: PromptRequest): Promise<PromptResponse> {
    const startTime = Date.now();

    try {
      const systemPrompt = await this.buildSystemPrompt(request);

      const response = await this.client.post('/chat/completions', {
        model: request.model || 'qwen-plus',
        messages: [
          {
            role: 'system',
            content: await this.formatSystemPrompt(systemPrompt),
          },
          {
            role: 'user',
            content: await this.formatPrompt(request),
          },
        ],
        temperature: request.temperature ?? 0.7,
        max_tokens: request.maxTokens,
      });

      const enhanced = await this.toPromptResponse(response.data.output?.choices?.[0]?.content, request.text);

      return {
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
