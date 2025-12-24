/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import BaseAIProvider, {ProviderDefaultPrompt} from '~/base/BaseAIProvider';

// constants
import {OutputFormat, OutputFormatName, Provider} from '~/constants/enums';

// types
import type {AIModel} from '~/types';
import type {ConfigMeta} from '~/database/models';
import type {ProviderConfig} from '~/constants/providers';
import type {PromptRequest, PromptResponse, ProviderCapabilities} from '~/types/prompt';

/**
 * Hugging Face provider for prompt enhancement.
 *
 * Base URL: https://api-inference.huggingface.co/models
 * Endpoint: /{model}
 *
 * @example
 * ```ts
 * const provider = new HuggingFaceProvider({apiKey: 'your-api-key'});
 * const response = await provider.enhancePrompt({
 *   text: 'Explain relativity',
 *   model: 'EleutherAI/gpt-neo-2.7B',
 *   enhancementType: 'enhance',
 * });
 * ```
 * @developerNotes
 * - API key must be set in environment variables or passed directly
 * - Default models are pre-configured but can be expanded
 * - Rate limiting may apply based on HF account tier
 */
export default class HuggingFaceProvider extends BaseAIProvider {
  /**
   * A static constant representing the unique identifier for the provider, typically used in internal systems or API integrations.
   * @developerNotes Ensure the ID is lowercase and matches the provider's official identifier.
   */
  public static readonly ProviderID: string = Provider.HuggingFace;

  /**
   * A static constant representing the display name or key used for referencing the provider in user-facing contexts.
   * @developerNotes This value should match the provider's official branding.
   */
  public static readonly ProviderKey: string = 'HuggingFace';

  /**
   * A static constant representing the full, official name of the provider, typically used for documentation or identification purposes.
   * @developerNotes Ensure consistency with the provider's official name and use proper casing.
   */
  public static readonly ProviderName: string = 'HuggingFace';

  /**
   * A static constant representing the default prompts used by the provider.
   * @developerNotes These prompts should be tailored to the specific needs of the provider and should be updated as needed.
   */
  public static readonly DefaultPrompts: ProviderDefaultPrompt = {
    system: 'You are a Hugging Face AI assistant. Improve prompts with attention to open-model best practices, clarity, and technical nuance.',
    role: 'You are a community-focused prompt optimizer. Enhance prompts to work well across diverse open-source models.',
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
    caption: HuggingFaceProvider.ProviderName,
    name: HuggingFaceProvider.ProviderID,
    baseUrl: 'https://api-inference.huggingface.co/models',
    apiKey: '',
    timeout: 30000,
  };

  /**
   * @inheritDoc
   */
  public static getProviderSpecificSystemPrompt(formattedPrompt: string, capabilities?: ProviderCapabilities): string {
    // HuggingFace models benefit from chat template formatting and clear role separation
    formattedPrompt = `<|system|>\n${formattedPrompt}\n<|assistant|>`;

    return formattedPrompt;
  }

  /**
   * @inheritDoc
   */
  public static getFormatTemplates(): Record<OutputFormatName, string> {
    return {
      [OutputFormat.JSON]: `Output Format: JSON\nReturn valid JSON with correct structure and escaping.`,
      [OutputFormat.MARKDOWN]: `Output Format: Markdown\nUse appropriate Markdown syntax for presentation.`,
      [OutputFormat.TEXT]: `Output Format: Plain Text\nOutput should be plain, readable text.`,
      [OutputFormat.HTML]: `Output Format: HTML\nGenerate valid HTML with semantic tags.`,
      [OutputFormat.XML]: `Output Format: XML\nProduce well-formed XML output.`,
      [OutputFormat.YAML]: `Output Format: YAML\nReturn properly formatted YAML content.`,
    };
  }

  /**
   * Creates a new HuggingFace provider instance.
   * @param config - Configuration object
   */
  constructor(config: ConfigMeta) {
    super(HuggingFaceProvider.ProviderKey, {baseUrl: config?.baseUrl || HuggingFaceProvider.ProviderConfig.baseUrl});
    this.client.defaults.headers.common['Authorization'] = `Bearer ${config?.apiKey}`;
  }

  /**
   * Gets the available AI models.
   * @returns Promise resolving to array of AI model configurations
   * @developerNotes
   * - These are preset models known to work well with the provider
   * - Context lengths and max tokens are conservative estimates
   */
  async getModels(): Promise<AIModel[]> {
    return [
      {
        id: 'EleutherAI/gpt-neo-2.7B',
        name: 'GPT‑Neo 2.7B',
        provider: HuggingFaceProvider.ProviderID,
        description: 'EleutherAI GPT‑Neo 2.7B model',
        contextLength: 2048,
        maxTokens: 1024,
      },
      {
        id: 'gpt2',
        name: 'GPT‑2',
        provider: HuggingFaceProvider.ProviderID,
        description: 'OpenAI GPT‑2 base model',
        contextLength: 1024,
        maxTokens: 512,
      },
      {
        id: 'distilgpt2',
        name: 'DistilGPT‑2',
        provider: HuggingFaceProvider.ProviderID,
        description: 'Distilled GPT‑2 model',
        contextLength: 1024,
        maxTokens: 512,
      },
    ];
  }

  /**
   * Enhances a prompt using Hugging Face models.
   * @param request - The prompt enhancement request
   * @returns Promise resolving to the enhanced prompt response
   * @developerNotes
   * - Falls back to original text if enhancement fails
   * - Token usage may not be available for all models
   * - Processing time includes network latency
   */
  async enhancePrompt(request: PromptRequest): Promise<PromptResponse> {
    const startTime = Date.now();

    try {
      const systemPrompt = await this.buildSystemPrompt(request);
      const payload = {
        inputs: await this.formatSystemPrompt(systemPrompt) + `\n\n` + await this.formatPrompt(request),
        parameters: {
          max_length: request.maxTokens ?? 2000,
          temperature: request.temperature ?? 0.7,
        },
      };

      const response = await this.client.post(`/${request.model}`, payload);

      const enhanced = await this.toPromptResponse(response.data?.[0].generated_text, request.text);

      return {
        enhancedPrompt: enhanced,
        originalPrompt: request.text,
        model: request.model,
        timestamp: new Date(),
        tokensUsed: response.data?.usage?.total_tokens,
        processingTime: this.calculateProcessingTime(startTime),
      };
    } catch (error: any) {
      console.error('HuggingFace enhancement failed:', error);
      throw new Error(`Failed to enhance prompt with HuggingFace: ${error}`);
    }
  }

  /**
   * Checks if the Hugging Face service is available.
   * @returns Promise resolving to boolean indicating availability
   * @developerNotes
   * - Uses minimal payload to test connectivity
   * - Returns false for any network or API errors
   */
  async isAvailable(): Promise<boolean> {
    try {
      const resp = await this.client.post('/gpt2', {
        inputs: 'test',
        parameters: {max_length: 1},
      });
      return Array.isArray(resp.data) && resp.data.length > 0;
    } catch {
      return false;
    }
  }
}
