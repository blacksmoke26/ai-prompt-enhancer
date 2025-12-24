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
 * Anthropic AI provider for prompt enhancement.
 *
 * @example
 * ```ts
 * const provider = new AnthropicProvider({apiKey: 'your-api-key'});
 * const enhanced = await provider.enhancePrompt({
 *   text: 'Explain relativity',
 *   model: 'claude-3-haiku-20240307',
 *   enhancementType: 'enhance'
 * });
 * ```
 * @developerNote Uses Anthropic's Claude models with custom system prompts for different enhancement types
 */
export default class AnthropicProvider extends BaseAIProvider {
  /**
   * A static constant representing the unique identifier for the provider, typically used in internal systems or API integrations.
   * @developerNotes Ensure the ID is lowercase and matches the provider's official identifier.
   */
  public static readonly ProviderID: string = 'anthropic';

  /**
   * A static constant representing the display name or key used for referencing the provider in user-facing contexts.
   * @developerNotes This value should match the provider's official branding.
   */
  public static readonly ProviderKey: string = 'Anthropic';

  /**
   * A static constant representing the full, official name of the provider, typically used for documentation or identification purposes.
   * @developerNotes Ensure consistency with the provider's official name and use proper casing.
   */
  public static readonly ProviderName: string = 'Anthropic';

  /**
   * A static constant representing the default prompts used by the provider.
   * @developerNotes These prompts should be tailored to the specific needs of the provider and should be updated as needed.
   */
  public static readonly DefaultPrompts: ProviderDefaultPrompt = {
    system: 'You are Claude, an AI assistant created by Anthropic. Focus on being helpful, harmless, and honest while enhancing the prompt.',
    role: 'You are an expert prompt engineer. Analyze and improve the given prompt while maintaining its core purpose.',
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
    caption: AnthropicProvider.ProviderName,
    name: AnthropicProvider.ProviderID,
    baseUrl: 'https://api.anthropic.com',
    apiKey: '',
    timeout: 30000,
  };

  /**
   * @inheritDoc
   */
  public static getProviderSpecificSystemPrompt(formattedPrompt: string, capabilities?: ProviderCapabilities): string {
    formattedPrompt = formattedPrompt.replace(
      /You are/g,
      'You are Claude, an AI assistant created by Anthropic',
    );
    // Claude benefits from emphasizing helpfulness, harmlessness, and honesty
    formattedPrompt += '\n\nAlways be helpful, harmless, and honest in your responses.';

    return formattedPrompt;
  }

  /**
   * @inheritDoc
   */
  public static getFormatTemplates(): Record<OutputFormatName, string> {
    return {
      [OutputFormat.JSON]: `Output Format: JSON\nResponse Format: JSON\nEnsure the response is valid JSON with proper escaping and structure.`,
      [OutputFormat.MARKDOWN]: `Output Format: Markdown\nResponse Format: Markdown\nUse Markdown syntax appropriately for readability and structure.`,
      [OutputFormat.TEXT]: `Output Format: Plain Text\nResponse Format: Text\nProvide clear, concise plain text output.`,
      [OutputFormat.HTML]: `Output Format: HTML\nResponse Format: HTML\nGenerate semantic, accessible HTML content.`,
      [OutputFormat.XML]: `Output Format: XML\nResponse Format: XML\nGenerate well-formed XML with proper validation.`,
      [OutputFormat.YAML]: `Output Format: YAML\nResponse Format: YAML\nGenerate properly formatted YAML with clear structure.`,
    };
  }

  /**
   * Creates a new Anthropic provider instance.
   * @param config - Configuration object
   */
  constructor(config: ConfigMeta) {
    super(AnthropicProvider.ProviderKey, {baseUrl: config?.baseUrl || AnthropicProvider.ProviderConfig.baseUrl});
    this.client.defaults.headers.common['Authorization'] = `Bearer ${config?.apiKey}`;
    this.client.defaults.headers.common['Anthropic-Version'] = '2023-06-01';
    this.client.defaults.headers.common['Content-Type'] = 'application/json';
  }

  /**
   * Returns available Anthropic models.
   * @developerNote Currently includes Claude 3.5 Sonnet and Claude 3 Haiku with their specifications
   */
  async getModels(): Promise<AIModel[]> {
    return [
      {
        id: 'claude-3-5-sonnet-20240620',
        name: 'Claude 3.5 Sonnet',
        provider: AnthropicProvider.ProviderID,
        description: 'Claude 3.5 Sonnet model',
        contextLength: 8192,
        maxTokens: 4096,
      },
      {
        id: 'claude-3-haiku-20240307',
        name: 'Claude 3 Haiku',
        provider: AnthropicProvider.ProviderID,
        description: 'Claude 3 Haiku model',
        contextLength: 4096,
        maxTokens: 2048,
      },
    ];
  }

  /**
   * Enhances a prompt using Anthropic's Claude models.
   * @param request - The prompt enhancement request
   * @returns Enhanced prompt response with metadata
   * @developerNote Sends the original prompt with a system instruction for enhancement
   */
  async enhancePrompt(request: PromptRequest): Promise<PromptResponse> {
    const startTime = Date.now();

    const systemPrompt = await this.buildSystemPrompt(request);

    try {
      const response = await this.client.post('/messages', {
        model: request.model,
        max_tokens: request.maxTokens ?? 2000,
        temperature: request.temperature ?? 0.7,
        system: await this.formatSystemPrompt(systemPrompt),
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: await this.formatPrompt(request),
              },
            ],
          },
        ],
      });

      const enhanced = await this.toPromptResponse(response.data.content?.[0]?.text, request.text);

      return {
        enhancedPrompt: enhanced,
        originalPrompt: request.text,
        model: request.model,
        timestamp: new Date(),
        tokensUsed: response.data.usage?.total_tokens,
        processingTime: this.calculateProcessingTime(startTime),
      };
    } catch (error: any) {
      console.error('Anthropic enhancement failed:', error);
      throw new Error(`Failed to enhance prompt with Anthropic: ${error}`);
    }
  }

  /**
   * Checks if the Anthropic API is accessible.
   * @developerNote Makes a minimal API call with Claude 3 Haiku to verify connectivity
   */
  async isAvailable(): Promise<boolean> {
    try {
      const resp = await this.client.post('/messages', {
        model: 'claude-3-haiku-20240307',
        max_tokens: 1,
        temperature: 0,
        system: 'You are a helpful assistant.',
        messages: [
          {role: 'user', content: [{type: 'text', text: 'test'}]},
        ],
      });
      return !!resp.data.content;
    } catch {
      return false;
    }
  }
}
