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
 * Cohere AI provider for prompt enhancement and text generation.
 *
 * Integrates with Cohere's API to provide intelligent prompt enhancement capabilities
 * using various models including Command, Command Light, and Command R series.
 *
 * @example
 * ```ts
 * const provider = new CohereProvider({apiKey: 'your-api-key'});
 * const response = await provider.enhancePrompt({
 *   text: 'Explain relativity',
 *   model: 'command-nightly',
 *   enhancementType: 'enhance',
 * });
 * ```
 *
 * @developerNotes
 * - Requires valid Cohere API key
 * - Supports models with varying context lengths (2048-4096 tokens)
 * - Implements exponential backoff for rate limiting
 * - Default temperature: 0.7, max tokens: 2000
 */
export default class CohereProvider extends BaseAIProvider {
  /**
   * A static constant representing the unique identifier for the provider, typically used in internal systems or API integrations.
   * @developerNotes Ensure the ID is lowercase and matches the provider's official identifier.
   */
  public static readonly ProviderID: string = 'cohere';

  /**
   * A static constant representing the display name or key used for referencing the provider in user-facing contexts.
   * @developerNotes This value should match the provider's official branding.
   */
  public static readonly ProviderKey: string = 'Cohere';

  /**
   * A static constant representing the full, official name of the provider, typically used for documentation or identification purposes.
   * @developerNotes Ensure consistency with the provider's official name and use proper casing.
   */
  public static readonly ProviderName: string = 'Cohere';

  /**
   * A static constant representing the default prompts used by the provider.
   * @developerNotes These prompts should be tailored to the specific needs of the provider and should be updated as needed.
   */
  public static readonly DefaultPrompts: ProviderDefaultPrompt = {
    system: 'You are a language AI developed by Cohere. Optimize prompts for clarity, coherence, and conciseness while preserving original meaning.',
    role: 'You are a prompt refinement expert. Enhance the structure and expressiveness of user prompts without altering their intent.',
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
    caption: CohereProvider.ProviderName,
    name: CohereProvider.ProviderID,
    baseUrl: 'https://api.cohere.com/v1',
    apiKey: '',
    timeout: 30000,
  };

  /**
   * @inheritDoc
   */
  public static getProviderSpecificSystemPrompt(formattedPrompt: string, capabilities?: ProviderCapabilities): string {
    // Cohere benefits from clear separators and structured instructions
    formattedPrompt = `## SYSTEM INSTRUCTIONS ##\n${formattedPrompt}\n## END SYSTEM INSTRUCTIONS ##`;

    if (capabilities?.supportsJsonMode) {
      formattedPrompt += '\n\nRespond in valid JSON format only.';
    }

    return formattedPrompt;
  }

  /**
   * @inheritDoc
   */
  public static getFormatTemplates(): Record<OutputFormatName, string> {
    return {
      [OutputFormat.JSON]: `Output Format: JSON\nRespond with valid JSON only. Avoid extra text or explanations.`,
      [OutputFormat.MARKDOWN]: `Output Format: Markdown\nFormat response using standard Markdown conventions.`,
      [OutputFormat.TEXT]: `Output Format: Plain Text\nReturn only plain text without any formatting.`,
      [OutputFormat.HTML]: `Output Format: HTML\nGenerate clean, valid HTML output.`,
      [OutputFormat.XML]: `Output Format: XML\nProduce well-formed XML with proper nesting.`,
      [OutputFormat.YAML]: `Output Format: YAML\nReturn properly indented and valid YAML.`,
    };
  }

  /**
   * Creates a new Cohere provider instance.
   * @param config - Configuration object
   */
  constructor(config: ConfigMeta) {
    super(CohereProvider.ProviderKey, {baseUrl: config?.baseUrl || CohereProvider.ProviderConfig.baseUrl});
    this.client.defaults.headers.common['Authorization'] = `Bearer ${config?.apiKey}`;
  }

  /**
   * Retrieves available Cohere models for prompt enhancement.
   *
   * @returns Array of available AI models with their specifications
   */
  async getModels(): Promise<AIModel[]> {
    return [
      {
        id: 'command-nightly',
        name: 'Command Nightly',
        provider: CohereProvider.ProviderID,
        description: 'Cohere Command nightly model',
        contextLength: 4096,
        maxTokens: 4096,
      },
      {
        id: 'command-light-nightly',
        name: 'Command Light Nightly',
        provider: CohereProvider.ProviderID,
        description: 'Cohere Command Light nightly model',
        contextLength: 4096,
        maxTokens: 2048,
      },
      {
        id: 'command-r',
        name: 'Command R',
        provider: CohereProvider.ProviderID,
        description: 'Cohere Command R model',
        contextLength: 4096,
        maxTokens: 4096,
      },
    ];
  }

  /**
   * Enhances a prompt using Cohere's chat API.
   *
   * @param request - The prompt enhancement request containing text, model, and options
   * @returns Enhanced prompt response with metadata
   * @throws Error when enhancement fails
   *
   * @example
   * ```ts
   * const result = await provider.enhancePrompt({
   *   text: 'What is AI?',
   *   model: 'command-r',
   *   enhancementType: 'enhance',
   *   temperature: 0.5
   * });
   * ```
   */
  async enhancePrompt(request: PromptRequest): Promise<PromptResponse> {
    const startTime = Date.now();
    try {
      const systemPrompt = await this.buildSystemPrompt(request);
      const response = await this.client.post('/chat', {
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

      const enhancedPrompt = await this.toPromptResponse(response.data.generations?.[0]?.text, request.text);

      return {
        enhancedPrompt,
        originalPrompt: request.text,
        model: request.model,
        timestamp: new Date(),
        tokensUsed: response.data.usage?.total_input_tokens,
        processingTime: this.calculateProcessingTime(startTime),
      };
    } catch (error: any) {
      console.error('Cohere enhancement failed:', error);
      throw new Error(`Failed to enhance prompt with Cohere: ${error}`);
    }
  }

  /**
   * Checks if the Cohere API is accessible and working.
   *
   * @returns True if API is available, false otherwise
   *
   * @developerNotes
   * Makes a minimal API call with 1 max token to test connectivity.
   * Uses command-nightly model for availability check.
   */
  async isAvailable(): Promise<boolean> {
    try {
      const resp = await this.client.post('/chat', {
        model: 'command-nightly',
        messages: [{role: 'user', content: 'test'}],
        max_tokens: 1,
      });
      return !!resp.data.generations;
    } catch {
      return false;
    }
  }
}
