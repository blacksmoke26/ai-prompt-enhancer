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
    system: 'You are a DeepSeek AI language model. Refine prompts to be logically sound, grammatically correct, and semantically precise.',
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
   * @inheritDoc
   */
  public static getProviderSpecificSystemPrompt(formattedPrompt: string, capabilities?: ProviderCapabilities): string {
    // DeepSeek models benefit from clear role definitions
    formattedPrompt = `You are a helpful AI assistant. ${formattedPrompt}`;

    return formattedPrompt;
  }

  /**
   * @inheritDoc
   */
  public static getFormatTemplates(): Record<OutputFormatName, string> {
    return {
      [OutputFormat.JSON]: `Output Format: JSON\nEnsure output is valid JSON with proper escaping.`,
      [OutputFormat.MARKDOWN]: `Output Format: Markdown\nUse Markdown syntax for clarity and structure.`,
      [OutputFormat.TEXT]: `Output Format: Plain Text\nReturn clean, unformatted plain text.`,
      [OutputFormat.HTML]: `Output Format: HTML\nGenerate valid, accessible HTML content.`,
      [OutputFormat.XML]: `Output Format: XML\nProduce well-formed and valid XML.`,
      [OutputFormat.YAML]: `Output Format: YAML\nReturn valid YAML with consistent indentation.`,
    };
  }

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
    super(DeepSeekProvider.ProviderKey, {baseUrl: config?.baseUrl || DeepSeekProvider.ProviderConfig.baseUrl});
    this.client.defaults.headers.common['Authorization'] = `Bearer ${config?.apiKey}`;
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
          description: 'DeepSeek\'s conversational model',
          contextLength: 32768,
          maxTokens: 4096,
        },
        {
          id: 'deepseek-coder',
          name: 'DeepSeek Coder',
          provider: DeepSeekProvider.ProviderID,
          description: 'DeepSeek\'s code-specialized model',
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
  async enhancePrompt(request: PromptRequest): Promise<PromptResponse> {
    const startTime = Date.now();

    try {
      const systemPrompt = await this.buildSystemPrompt(request);

      const response = await this.client.post('/chat/completions', {
        model: request.model,
        messages: [
          { role: 'system', content: await this.formatSystemPrompt(systemPrompt) },
          { role: 'user', content: await this.formatPrompt(request) }
        ],
        temperature: request.temperature || 0.7,
        max_tokens: request.maxTokens || 2000,
      });

      const enhancedPrompt = await this.toPromptResponse(response.data.choices[0]?.message?.content, request.text);

      return {
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
