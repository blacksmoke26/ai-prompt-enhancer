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
 * OpenAI provider implementation for AI model interactions.
 * Extends BaseAIProvider to provide OpenAI-specific functionality.
 */
export default class OpenAIProvider extends BaseAIProvider {
  /**
   * A static constant representing the unique identifier for the provider, typically used in internal systems or API integrations.
   * @developerNotes Ensure the ID is lowercase and matches the provider's official identifier.
   */
  public static readonly ProviderID: string = 'openai';

  /**
   * A static constant representing the display name or key used for referencing the provider in user-facing contexts.
   * @developerNotes This value should match the provider's official branding.
   */
  public static readonly ProviderKey: string = 'OpenAi';

  /**
   * A static constant representing the full, official name of the provider, typically used for documentation or identification purposes.
   * @developerNotes Ensure consistency with the provider's official name and use proper casing.
   */
  public static readonly ProviderName: string = 'OpenAI';

  /**
   * A static constant representing the default prompts used by the provider.
   * @developerNotes These prompts should be tailored to the specific needs of the provider and should be updated as needed.
   */
  public static readonly DefaultPrompts: ProviderDefaultPrompt = {
    system: 'You are a grammar and spelling expert. Correct any grammatical errors, spelling mistakes, and improve the clarity of the given prompt while preserving the original intent.',
    role: 'You are a helpful AI assistant developed by OpenAI. Provide clear, accurate, and useful responses to enhance the user\'s prompt.',
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
    caption: OpenAIProvider.ProviderName,
    name: OpenAIProvider.ProviderID,
    baseUrl: 'https://api.openai.com/v1',
    apiKey: '',
    timeout: 30000,
  };

  /**
   * @inheritDoc
   */
  public static getProviderSpecificSystemPrompt(formattedPrompt: string, capabilities?: ProviderCapabilities): string {
    if (capabilities?.supportsJsonMode) {
      formattedPrompt += '\n\nRespond with valid JSON only. Do not include any other text.';
    }
    // OpenAI models benefit from clear role definitions
    formattedPrompt = `You are a helpful AI assistant. ${formattedPrompt}`;

    return formattedPrompt;
  }

  /**
   * @inheritDoc
   */
  public static getFormatTemplates(): Record<OutputFormatName, string> {
    return {
      [OutputFormat.JSON]: `Output Format: JSON\nContent-Type: application/json\nResponse should be valid JSON with proper structure and escaping.`,
      [OutputFormat.MARKDOWN]: `Output Format: Markdown\nContent-Type: text/markdown\nUse appropriate Markdown syntax for formatting, including headers, lists, code blocks, and tables where relevant.`,
      [OutputFormat.TEXT]: `Output Format: Plain Text\nContent-Type: text/plain\nProvide clear, well-structured plain text without any formatting syntax.`,
      [OutputFormat.HTML]: `Output Format: HTML\nContent-Type: text/html\nGenerate valid HTML with proper structure, semantic tags, and accessibility considerations.`,
      [OutputFormat.XML]: `Output Format: XML\nContent-Type: application/xml\nGenerate well-formed XML with proper encoding, namespaces, and validation.`,
      [OutputFormat.YAML]: `Output Format: YAML\nContent-Type: application/yaml\nGenerate valid YAML with proper indentation, structure, and comments where helpful.`,
    };
  }

  /**
   * Creates a new instance of the OpenAI provider.
   * @param config - Configuration object
   *
   * @example
   * ```typescript
   * const provider = new OpenAIProvider('sk-xxx', 'https://api.openai.com/v1');
   * ```
   *
   * @developer_notes
   * If no baseUrl is provided, defaults to the official OpenAI API endpoint.
   * The API key is set in the authorization header for all requests.
   */
  constructor(config: ConfigMeta) {
    super(OpenAIProvider.ProviderKey, {baseUrl: config?.baseUrl || OpenAIProvider.ProviderConfig.baseUrl});
    this.client.defaults.headers.common['Authorization'] = `Bearer ${config?.apiKey}`;
  }

  /**
   * Retrieves available OpenAI models filtered for GPT variants.
   * @returns Promise resolving to an array of AIModel objects
   *
   * @example
   * ```typescript
   * const models = await provider.getModels();
   * console.log(models); // [{ id: 'gpt-4', name: 'gpt-4', ... }]
   * ```
   *
   * @developer_notes
   * Filters models to only include those with 'gpt' in their ID.
   * Returns empty array if API call fails, ensuring graceful degradation.
   * Models are sorted alphabetically by ID for consistent ordering.
   */
  async getModels(): Promise<AIModel[]> {
    try {
      const response = await this.client.get<{ data: AIModel[] }>('/models');
      const models = response.data.data || [];

      return models
        .filter((model: any) => model.id.includes('gpt'))
        .map((model: any) => ({
          id: model.id,
          name: model.id,
          provider: OpenAIProvider.ProviderID,
          description: model.owned_by,
          contextLength: this.getContextLength(model.id),
          maxTokens: this.getMaxTokens(model.id),
        })).sort((a, b) => a.id.localeCompare(b.id));
      ;
    } catch (error: any) {
      console.error('Failed to fetch OpenAI models:', error);
      return [];
    }
  }

  /**
   * Enhances a prompt using OpenAI's chat completion API.
   * @param request - The prompt enhancement request containing original text and parameters
   * @returns Promise resolving to the enhanced prompt response
   *
   * @example
   * ```typescript
   * const response = await provider.enhancePrompt({
   *   text: 'What is AI?',
   *   model: 'gpt-4',
   *   enhancementType: 'enhance'
   * });
   * console.log(response.enhancedPrompt);
   * ```
   *
   * @developer_notes
   * Uses a system prompt based on the enhancement type and user role.
   * Tracks processing time and token usage for monitoring purposes.
   * Returns original text unchanged if API call fails, with error thrown.
   */
  async enhancePrompt(request: PromptRequest): Promise<PromptResponse> {
    const startTime = Date.now();

    try {
      const systemPrompt = await this.buildSystemPrompt(request);

      const response = await this.client.post('/chat/completions', {
        model: request.model,
        messages: [
          {role: 'system', content: await this.formatSystemPrompt(systemPrompt)},
          {role: 'user', content: await this.formatPrompt(request)},
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
      console.error('OpenAI enhancement failed:', error);
      throw new Error(`Failed to enhance prompt with OpenAI: ${error}`);
    }
  }

  /**
   * Checks if the OpenAI API is accessible and working.
   * @returns Promise resolving to true if API is available, false otherwise
   *
   * @example
   * ```typescript
   * const isOnline = await provider.isAvailable();
   * if (isOnline) console.log('OpenAI API is reachable');
   * ```
   *
   * @developer_notes
   * Makes a lightweight request to the /models endpoint.
   * Returns false on any network or authentication error.
   * Can be used for health checks or fallback logic.
   */
  async isAvailable(): Promise<boolean> {
    try {
      await this.client.get('/models');
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Gets the context window length for a specific OpenAI model.
   * @param modelId - The ID of the model to look up
   * @returns The context length in tokens
   *
   * @example
   * ```typescript
   * const length = provider.getContextLength('gpt-4');
   * console.log(length); // 8192
   * ```
   *
   * @developer_notes
   * Returns 4096 as a safe default for unknown models.
   * Values are based on OpenAI's official model specifications.
   * Should be updated when new models are released.
   */
  private getContextLength(modelId: string): number {
    const contexts: Record<string, number> = {
      'gpt-4': 8192,
      'gpt-4-32k': 32768,
      'gpt-4-turbo': 128000,
      'gpt-4o': 128000,
      'gpt-3.5-turbo': 4096,
      'gpt-3.5-turbo-16k': 16385,
    };
    return contexts[modelId] || 4096;
  }

  /**
   * Gets the maximum token limit for a specific OpenAI model.
   * @param modelId - The ID of the model to look up
   * @returns The maximum tokens the model can generate
   *
   * @example
   * ```typescript
   * const maxTokens = provider.getMaxTokens('gpt-4');
   * console.log(maxTokens); // 4096
   * ```
   *
   * @developer_notes
   * Returns 4096 as a safe default for unknown models.
   * These values represent the output token limits, not context windows.
   * Different from context length - this is for generated content only.
   */
  private getMaxTokens(modelId: string): number {
    const maxTokens: Record<string, number> = {
      'gpt-4': 4096,
      'gpt-4-32k': 32768,
      'gpt-4-turbo': 4096,
      'gpt-4o': 4096,
      'gpt-3.5-turbo': 4096,
      'gpt-3.5-turbo-16k': 16385,
    };
    return maxTokens[modelId] || 4096;
  }
}
