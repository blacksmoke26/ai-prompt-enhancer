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
 * Nvidia AI provider for prompt enhancement using Nvidia's API.
 *
 * This provider integrates with Nvidia's API to enhance prompts through
 * various enhancement types and user roles. It supports models like LLaMA3 and Dolly.
 *
 * @example
 * ```ts
 * const provider = new NvidiaProvider({apiKey: 'your-api-key'});
 * const response = await provider.enhancePrompt({
 *   text: 'Explain quantum computing',
 *   model: 'nvidia-llama3',
 *   enhancementType: 'enhance',
 *   userRole: 'educator'
 * });
 * ```
 *
 * @developerNotes
 * - Requires valid Nvidia API key
 * - Default base URL: https://integrate.nvidia.com/v1
 * - Supports customization of system prompts
 * - Handles API errors gracefully with detailed logging
 */
export default class NvidiaProvider extends BaseAIProvider {
  /**
   * A static constant representing the unique identifier for the provider, typically used in internal systems or API integrations.
   * @developerNotes Ensure the ID is lowercase and matches the provider's official identifier.
   */
  public static readonly ProviderID: string = 'nvidia';

  /**
   * A static constant representing the display name or key used for referencing the provider in user-facing contexts.
   * @developerNotes This value should match the provider's official branding.
   */
  public static readonly ProviderKey: string = 'Nvidia';

  /**
   * A static constant representing the full, official name of the provider, typically used for documentation or identification purposes.
   * @developerNotes Ensure consistency with the provider's official name and use proper casing.
   */
  public static readonly ProviderName: string = 'Nvidia';

  /**
   * A static constant representing the default prompts used by the provider.
   * @developerNotes These prompts should be tailored to the specific needs of the provider and should be updated as needed.
   */
  public static readonly DefaultPrompts: ProviderDefaultPrompt = {
    system: 'You are an NVIDIA NeMo-powered AI assistant. Refine prompts for technical accuracy, especially in AI, engineering, and scientific contexts.',
    role: 'You specialize in optimizing prompts for high-performance AI systems. Ensure clarity, precision, and domain relevance.',
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
    caption: NvidiaProvider.ProviderName,
    name: NvidiaProvider.ProviderID,
    baseUrl: 'https://integrate.nvidia.com/v1',
    apiKey: '',
    timeout: 30000,
  };

  /**
   * @inheritDoc
   */
  public static getProviderSpecificSystemPrompt(formattedPrompt: string, capabilities?: ProviderCapabilities): string {
    // NVIDIA NIM endpoints benefit from clear system prompts
    formattedPrompt = `You are an AI assistant powered by NVIDIA technology. ${formattedPrompt}`;

    return formattedPrompt;
  }

  /**
   * @inheritDoc
   */
  public static getFormatTemplates(): Record<OutputFormatName, string> {
    return {
      [OutputFormat.JSON]: `Output Format: JSON\nRespond with valid JSON. Avoid additional commentary.`,
      [OutputFormat.MARKDOWN]: `Output Format: Markdown\nUse Markdown for clear, structured responses.`,
      [OutputFormat.TEXT]: `Output Format: Plain Text\nReturn plain, readable text only.`,
      [OutputFormat.HTML]: `Output Format: HTML\nGenerate semantic and valid HTML.`,
      [OutputFormat.XML]: `Output Format: XML\nProduce well-formed XML output.`,
      [OutputFormat.YAML]: `Output Format: YAML\nReturn correctly formatted YAML with indentation.`,
    };
  }

  /**
   * Creates an instance of the Nvidia provider.
   * @param config - Configuration object
   */
  constructor(config: ConfigMeta) {
    super(NvidiaProvider.ProviderKey, {baseUrl: config?.baseUrl || NvidiaProvider.ProviderConfig.baseUrl});
    this.client.defaults.headers.common['Authorization'] = `Bearer ${config?.apiKey}`;
  }

  /**
   * Retrieves available AI models for the Nvidia provider.
   * @returns Array of available AI models
   */
  async getModels(): Promise<AIModel[]> {
    return [
      {
        id: 'nvidia-llama3',
        name: 'Nvidia LLaMA3',
        provider: NvidiaProvider.ProviderID,
        description: 'Nvidia LLaMA3 model',
        contextLength: 32768,
        maxTokens: 8192,
      },
      {
        id: 'nvidia-dolly',
        name: 'Nvidia Dolly',
        provider: NvidiaProvider.ProviderID,
        description: 'Nvidia Dolly model',
        contextLength: 16384,
        maxTokens: 4096,
      },
    ];
  }

  /**
   * Enhances a prompt using Nvidia's AI models.
   * @param request - The prompt enhancement request
   * @returns Enhanced prompt response
   * @throws Error when enhancement fails
   */
  async enhancePrompt(request: PromptRequest): Promise<PromptResponse> {
    const startTime = Date.now();
    try {
      const systemPrompt = await this.buildSystemPrompt(request, NvidiaProvider);

      const response = await this.client.post('/chat/completions', {
        model: request.model,
        messages: [
          {role: 'system', content: await this.formatSystemPrompt(systemPrompt, NvidiaProvider)},
          {
            role: 'user',
            content: await this.formatPrompt(request, NvidiaProvider),
          },
        ],
        temperature: request.temperature ?? 0.7,
        max_tokens: request.maxTokens ?? 2000,
      });

      const enhanced = await this.toPromptResponse(
        response.data.choices?.[0]?.message?.content, request.text, NvidiaProvider
      );

      return {
        enhancedPrompt: enhanced,
        originalPrompt: request.text,
        model: request.model,
        timestamp: new Date(),
        tokensUsed: response.data.usage?.total_tokens,
        processingTime: this.calculateProcessingTime(startTime),
      };
    } catch (error: any) {
      console.error('Nvidia enhancement failed:', error);
      throw new Error(`Failed to enhance prompt with Nvidia: ${error}`);
    }
  }

  /**
   * Checks if the Nvidia provider is available and functional.
   * @returns True if provider is available, false otherwise
   */
  async isAvailable(): Promise<boolean> {
    try {
      const resp = await this.client.post('/chat/completions', {
        model: 'nvidia-llama3',
        messages: [{role: 'user', content: 'test'}],
        max_tokens: 1,
      });
      return !!resp.data.choices;
    } catch {
      return false;
    }
  }
}
