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
 * XAI provider for prompt enhancement using XAI's language models.
 *
 * Integrates with XAI's API to enhance and optimize user prompts through various enhancement types.
 * @example
 * ```ts
 * const provider = new XAIProvider({apiKey: 'your-api-key'});
 * const enhanced = await provider.enhancePrompt({
 *   text: 'Explain quantum computing',
 *   model: 'xai-gpt4',
 *   enhancementType: 'enhance'
 * });
 * ```
 */
export default class XAIProvider extends BaseAIProvider {
  /**
   * A static constant representing the unique identifier for the provider, typically used in internal systems or API integrations.
   * @developerNotes Ensure the ID is lowercase and matches the provider's official identifier.
   */
  public static readonly ProviderID: string = 'xai';

  /**
   * A static constant representing the display name or key used for referencing the provider in user-facing contexts.
   * @developerNotes This value should match the provider's official branding.
   */
  public static readonly ProviderKey: string = 'XAI';

  /**
   * A static constant representing the full, official name of the provider, typically used for documentation or identification purposes.
   * @developerNotes Ensure consistency with the provider's official name and use proper casing.
   */
  public static readonly ProviderName: string = 'xAI';

  /**
   * A static constant representing the default prompts used by the provider.
   * @developerNotes These prompts should be tailored to the specific needs of the provider and should be updated as needed.
   */
  public static readonly DefaultPrompts: ProviderDefaultPrompt = {
    system: 'You are an AI assistant from xAI. Focus on truthfulness, reasoning depth, and clarity when refining user prompts.',
    role: 'You are a prompt engineer emphasizing accuracy and intellectual rigor. Strengthen logical structure and reduce ambiguity.',
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
    caption: XAIProvider.ProviderName,
    name: XAIProvider.ProviderID,
    baseUrl: 'https://api.x.ai/v1',
    apiKey: '',
    timeout: 30000,
  };

  /**
   * @inheritDoc
   */
  public static getProviderSpecificSystemPrompt(formattedPrompt: string, capabilities?: ProviderCapabilities): string {
    // XAI models (Grok) benefit from clear, direct instructions
    formattedPrompt = `You are an AI assistant developed by xAI. ${formattedPrompt}`;

    return formattedPrompt;
  }

  /**
   * @inheritDoc
   */
  public static getFormatTemplates(): Record<OutputFormatName, string> {
    return {
      [OutputFormat.JSON]: `Output Format: JSON\nReturn valid JSON with proper structure.`,
      [OutputFormat.MARKDOWN]: `Output Format: Markdown\nUse standard Markdown for formatting.`,
      [OutputFormat.TEXT]: `Output Format: Plain Text\nProvide clean, readable plain text.`,
      [OutputFormat.HTML]: `Output Format: HTML\nGenerate valid and accessible HTML.`,
      [OutputFormat.XML]: `Output Format: XML\nReturn well-formed XML with proper syntax.`,
      [OutputFormat.YAML]: `Output Format: YAML\nReturn properly structured YAML content.`,
    };
  }

  /**
   * Creates a new XAI provider instance.
   * @param config - Configuration object
   */
  constructor(config: ConfigMeta) {
    super(XAIProvider.ProviderKey, {baseUrl: config?.baseUrl || XAIProvider.ProviderConfig.baseUrl});
    this.client.defaults.headers.common['Authorization'] = `Bearer ${config?.apiKey}`;
  }

  /**
   * Retrieves available XAI models for prompt enhancement.
   * @returns Array of supported AI models with their specifications
   */
  async getModels(): Promise<AIModel[]> {
    return [
      {
        id: 'xai-gpt4',
        name: 'XAI GPT‑4',
        provider: XAIProvider.ProviderID,
        description: 'XAI GPT‑4 model',
        contextLength: 65536,
        maxTokens: 8192,
      },
      {
        id: 'xai-dolly',
        name: 'XAI Dolly',
        provider: XAIProvider.ProviderID,
        description: 'XAI Dolly model',
        contextLength: 16384,
        maxTokens: 4096,
      },
    ];
  }

  /**
   * Enhances a prompt using XAI's language models.
   * @param request - Prompt enhancement request parameters
   * @returns Enhanced prompt response with metadata
   * @throws Error if enhancement fails
   */
  async enhancePrompt(request: PromptRequest): Promise<PromptResponse> {
    const startTime = Date.now();

    try {
      const systemPrompt = await this.buildSystemPrompt(request, XAIProvider);

      const response = await this.client.post('/chat/completions', {
        model: request.model,
        messages: [
          {role: 'system', content: await this.formatSystemPrompt(systemPrompt, XAIProvider)},
          {
            role: 'user',
            content: await this.formatPrompt(request, XAIProvider),
          },
        ],
        temperature: request.temperature ?? 0.7,
        max_tokens: request.maxTokens ?? 2000,
      });

      const enhancedPrompt = await this.toPromptResponse(
        response.data.choices?.[0]?.message?.content, request.text, XAIProvider
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
      console.error('XAI enhancement failed:', error);
      throw new Error(`Failed to enhance prompt with XAI: ${error}`);
    }
  }

  /**
   * Checks if XAI service is available and responsive.
   * @returns True if service is available, false otherwise
   */
  async isAvailable(): Promise<boolean> {
    try {
      const resp = await this.client.post('/chat/completions', {
        model: 'xai-gpt4',
        messages: [{role: 'user', content: 'test'}],
        max_tokens: 1,
      });
      return !!resp.data.choices;
    } catch {
      return false;
    }
  }
}
