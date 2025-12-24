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
 * Mistral AI provider implementation for prompt enhancement and model management.
 *
 * This provider integrates with Mistral's API to offer prompt enhancement capabilities
 * and model information. It supports various enhancement types and user roles.
 *
 * @example
 * ```ts
 * const provider = new MistralProvider({apiKey: 'your-api-key'});
 * const response = await provider.enhancePrompt({
 *   text: 'Explain quantum computing',
 *   model: 'mistral-large-latest',
 *   enhancementType: 'enhance',
 * });
 * console.log(response.enhancedPrompt);
 * ```
 *
 * @developer-notes
 * - Requires valid Mistral API key
 * - Default endpoint: https://api.mistral.ai/v1
 * - Supports custom base URL for enterprise deployments
 * - All API calls are authenticated with Bearer token
 */
export default class MistralProvider extends BaseAIProvider {
  /**
   * A static constant representing the unique identifier for the provider, typically used in internal systems or API integrations.
   * @developerNotes Ensure the ID is lowercase and matches the provider's official identifier.
   */
  public static readonly ProviderID: string = 'mistral';

  /**
   * A static constant representing the display name or key used for referencing the provider in user-facing contexts.
   * @developerNotes This value should match the provider's official branding.
   */
  public static readonly ProviderKey: string = 'Mistral';

  /**
   * A static constant representing the full, official name of the provider, typically used for documentation or identification purposes.
   * @developerNotes Ensure consistency with the provider's official name and use proper casing.
   */
  public static readonly ProviderName: string = 'Mistral';

  /**
   * A static constant representing the default prompts used by the provider.
   * @developerNotes These prompts should be tailored to the specific needs of the provider and should be updated as needed.
   */
  public static readonly DefaultPrompts: ProviderDefaultPrompt = {
    system: 'You are a Mistral AI assistant. Improve prompts to be succinct, precise, and aligned with Mistral’s reasoning strengths.',
    role: 'You are a prompt optimization expert. Enhance clarity and logical structure while maintaining the user’s core intent.',
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
    caption: MistralProvider.ProviderName,
    name: MistralProvider.ProviderID,
    baseUrl: 'https://api.mistral.ai/v1',
    apiKey: '',
    timeout: 30000,
  };

  /**
   * @inheritDoc
   */
  public static getProviderSpecificSystemPrompt(formattedPrompt: string, capabilities?: ProviderCapabilities): string {
    // Mistral models use instruction tuning and benefit from clear formatting
    formattedPrompt = `[INST] ${formattedPrompt} [/INST]`;

    return formattedPrompt;
  }

  /**
   * @inheritDoc
   */
  public static getFormatTemplates(): Record<OutputFormatName, string> {
    return {
      [OutputFormat.JSON]: `Output Format: JSON\nReturn strictly valid JSON with proper escaping.`,
      [OutputFormat.MARKDOWN]: `Output Format: Markdown\nUse Markdown syntax for structured output.`,
      [OutputFormat.TEXT]: `Output Format: Plain Text\nProvide clear, unformatted text.`,
      [OutputFormat.HTML]: `Output Format: HTML\nGenerate valid and accessible HTML.`,
      [OutputFormat.XML]: `Output Format: XML\nReturn well-formed XML with correct syntax.`,
      [OutputFormat.YAML]: `Output Format: YAML\nReturn valid YAML with proper indentation.`,
    };
  }

  /**
   * Creates a new Mistral provider instance.
   * @param config - Configuration object
   *
   * @developer-notes
   * - Automatically sets up Bearer token authentication
   * - Falls back to default Mistral API URL if none provided
   */
  constructor(config: ConfigMeta) {
    super(MistralProvider.ProviderKey, {baseUrl: config?.baseUrl || MistralProvider.ProviderConfig.baseUrl});
    this.client.defaults.headers.common['Authorization'] = `Bearer ${config?.apiKey}`;
  }

  /**
   * Retrieves available Mistral AI models with their specifications.
   *
   * @returns Promise resolving to array of available AI models
   *
   * @developer-notes
   * Currently returns static list of supported models:
   * - mistral-large-latest: High capability model with 32K context
   * - mistral-small-latest: Efficient model with 16K context
   */
  async getModels(): Promise<AIModel[]> {
    return [
      {
        id: 'mistral-large-latest',
        name: 'Mistral Large',
        provider: MistralProvider.ProviderID,
        description: 'Mistral Large conversational model',
        contextLength: 32768,
        maxTokens: 8192,
      },
      {
        id: 'mistral-small-latest',
        name: 'Mistral Small',
        provider: MistralProvider.ProviderID,
        description: 'Mistral Small conversational model',
        contextLength: 16384,
        maxTokens: 4096,
      },
    ];
  }

  /**
   * Enhances a prompt using Mistral's chat completion API.
   *
   * @param request - Prompt enhancement request configuration
   * @returns Promise resolving to enhanced prompt response
   *
   * @throws Error when API call fails or returns invalid response
   *
   * @developer-notes
   * - Uses system prompt based on enhancement type and user role
   * - Default temperature: 0.7, max tokens: 2000
   * - Returns original prompt if enhancement fails
   * - Tracks processing time and token usage
   */
  async enhancePrompt(request: PromptRequest): Promise<PromptResponse> {
    const startTime = Date.now();

    const systemPrompt = await this.buildSystemPrompt(request, MistralProvider);

    try {
      const response = await this.client.post('/chat/completions', {
        model: request.model,
        messages: [
          {role: 'system', content: await this.formatSystemPrompt(systemPrompt, MistralProvider)},
          {
            role: 'user',
            content: await this.formatPrompt(request, MistralProvider),
          },
        ],
        temperature: request.temperature ?? 0.7,
        max_tokens: request.maxTokens ?? 2000,
      });

      const enhancedPrompt = await this.toPromptResponse(
        response.data.choices?.[0]?.message?.content, request.text, MistralProvider, request?.format || 'markdown'
      );

      return {
        enhancedPrompt,
        originalPrompt: request.text,
        model: request.model,
        timestamp: new Date(),
        tokensUsed: response.data.usage?.total_tokens,
        processingTime: this.calculateProcessingTime(startTime),
      };
    } catch (error: any) {
      console.error('Mistral enhancement failed:', error);
      throw new Error(`Failed to enhance prompt with Mistral: ${error}`);
    }
  }

  /**
   * Checks if the Mistral API service is available and responsive.
   *
   * @returns Promise resolving to true if service is available
   *
   * @developer-notes
   * - Makes minimal API call with 1 token max
   * - Uses mistral-large-latest model for availability check
   * - Returns false on any API error or invalid response
   */
  async isAvailable(): Promise<boolean> {
    try {
      const resp = await this.client.post('/chat/completions', {
        model: 'mistral-large-latest',
        messages: [{role: 'user', content: 'test'}],
        max_tokens: 1,
      });
      return !!resp.data.choices;
    } catch {
      return false;
    }
  }
}
