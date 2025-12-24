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
 * Kimi AI provider for prompt enhancement.
 *
 * Implements integration with Kimi's API to enhance user prompts using various
 * enhancement types and roles. Built on top of BaseAIProvider for consistency.
 *
 * @example
 * ```ts
 * const provider = new KimiProvider({apiKey: 'your-api-key'});
 * const response = await provider.enhancePrompt({
 *   text: 'Explain relativity',
 *   model: 'kimi-large',
 *   enhancementType: 'enhance',
 * });
 * ```
 *
 * @developer Note: Requires valid API key. Default base URL is https://api.kimi.ai
 */
export default class KimiProvider extends BaseAIProvider {
  /**
   * A static constant representing the unique identifier for the provider, typically used in internal systems or API integrations.
   * @developerNotes Ensure the ID is lowercase and matches the provider's official identifier.
   */
  public static readonly ProviderID: string = 'kimi';

  /**
   * A static constant representing the display name or key used for referencing the provider in user-facing contexts.
   * @developerNotes This value should match the provider's official branding.
   */
  public static readonly ProviderKey: string = 'Kimi';

  /**
   * A static constant representing the full, official name of the provider, typically used for documentation or identification purposes.
   * @developerNotes Ensure consistency with the provider's official name and use proper casing.
   */
  public static readonly ProviderName: string = 'Kimi';

  /**
   * A static constant representing the default prompts used by the provider.
   * @developerNotes These prompts should be tailored to the specific needs of the provider and should be updated as needed.
   */
  public static readonly DefaultPrompts: ProviderDefaultPrompt = {
    system: 'You are Kimi, a large AI model by Moonshot AI. Refine prompts to be fluent, context-aware, and aligned with user goals.',
    role: 'You are a prompt enhancement specialist. Improve readability and effectiveness while preserving the original meaning.',
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
    caption: KimiProvider.ProviderName,
    name: KimiProvider.ProviderID,
    baseUrl: 'https://api.kimi.ai',
    apiKey: '',
    timeout: 30000,
  };

  /**
   * @inheritDoc
   */
  public static getProviderSpecificSystemPrompt(formattedPrompt: string, capabilities?: ProviderCapabilities): string {
    // Kimi (Moonshot AI) benefits from clear instructions
    formattedPrompt = `You are Kimi, an AI assistant developed by Moonshot AI. ${formattedPrompt}`;

    return formattedPrompt;
  }

  /**
   * @inheritDoc
   */
  public static getFormatTemplates(): Record<OutputFormatName, string> {
    return {
      [OutputFormat.JSON]: `Output Format: JSON\nEnsure the response is valid JSON with proper syntax.`,
      [OutputFormat.MARKDOWN]: `Output Format: Markdown\nFormat using standard Markdown conventions.`,
      [OutputFormat.TEXT]: `Output Format: Plain Text\nReturn only clear, unformatted text.`,
      [OutputFormat.HTML]: `Output Format: HTML\nGenerate valid and semantic HTML.`,
      [OutputFormat.XML]: `Output Format: XML\nReturn well-formed XML with correct tags.`,
      [OutputFormat.YAML]: `Output Format: YAML\nReturn valid YAML with consistent structure.`,
    };
  }

  /**
   * Creates a new Kimi AI provider instance.
   * @param config - Configuration object
   */
  constructor(config: ConfigMeta) {
    super(KimiProvider.ProviderKey, {baseUrl: config?.baseUrl || KimiProvider.ProviderConfig.baseUrl});
    this.client.defaults.headers.common['Authorization'] = `Bearer ${config?.apiKey}`;
  }

  /**
   * Retrieves available Kimi AI models.
   *
   * @returns Array of supported AI models with their specifications
   * @developer Note: Currently supports kimi-large and kimi-3.5 models
   */
  async getModels(): Promise<AIModel[]> {
    return [
      {
        id: 'kimi-large',
        name: 'Kimi Large',
        provider: KimiProvider.ProviderID,
        description: 'Kimi large conversational model',
        contextLength: 32768,
        maxTokens: 4096,
      },
      {
        id: 'kimi-3.5',
        name: 'Kimi 3.5',
        provider: KimiProvider.ProviderID,
        description: 'Kimi 3.5 model',
        contextLength: 16384,
        maxTokens: 2048,
      },
    ];
  }

  /**
   * Enhances a prompt using Kimi AI.
   *
   * @param request - The prompt enhancement request configuration
   * @returns Enhanced prompt response with metadata
   * @throws Error when enhancement fails
   * @developer Note: Uses temperature 0.7 and maxTokens 2000 as defaults
   */
  async enhancePrompt(request: PromptRequest): Promise<PromptResponse> {
    const startTime = Date.now();

    try {
      const systemPrompt = await this.buildSystemPrompt(request);

      const response = await this.client.post('/v1/chat/completions', {
        model: request.model,
        messages: [
          {role: 'system', content: await this.formatSystemPrompt(systemPrompt)},
          {
            role: 'user',
            content: await this.formatPrompt(request),
          },
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
      console.error('Kimi enhancement failed:', error);
      throw new Error(`Failed to enhance prompt with Kimi: ${error}`);
    }
  }

  /**
   * Checks if Kimi AI service is available.
   *
   * @returns True if service is responding correctly
   * @developer Note: Sends minimal test request to verify connectivity
   */
  async isAvailable(): Promise<boolean> {
    try {
      const resp = await this.client.post('/v1/chat/completions', {
        model: 'kimi-large',
        messages: [{role: 'user', content: 'test'}],
        max_tokens: 1,
      });
      return !!resp.data.choices;
    } catch {
      return false;
    }
  }
}
