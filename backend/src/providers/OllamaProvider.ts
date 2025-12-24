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
 * Interface representing an Ollama model's metadata and configuration details.
 *
 * @example
 * ```typescript
 * const model: OllamaModel = {
 *   name: 'llama2:latest',
 *   model: 'llama2',
 *   modified_at: '2023-12-01T10:00:00Z',
 *   size: 4349184000,
 *   digest: 'sha256:abc123...',
 *   details: {
 *     parent_model: '',
 *     format: 'gguf',
 *     family: 'llama',
 *     families: ['llama'],
 *     parameter_size: '7B',
 *     quantization_level: 'Q4_0'
 *   }
 * };
 * ```
 *
 * @developerNote
 * This interface matches the Ollama API response structure for model metadata.
 * All fields are readonly as they represent server-provided data.
 */
export interface OllamaModel {
  /** The full name of the model including version tag (e.g., 'mxbai-embed-large:latest') */
  readonly name: string;

  /** The model identifier (typically same as name) */
  readonly model: string;

  /** ISO timestamp of when the model was last modified */
  readonly modified_at: string;

  /** Size of the model in bytes */
  readonly size: number;

  /** SHA256 digest hash of the model for integrity verification */
  readonly digest: string;

  /** Detailed configuration and metadata about the model */
  readonly details: {
    /** Parent model if this is a fine-tuned version */
    readonly parent_model: string;

    /** Model format (e.g., 'gguf' for GPT-Generated Unified Format) */
    readonly format: string;

    /** Primary model family/architecture (e.g., 'bert', 'llama') */
    readonly family: string;

    /** Array of all model families this model belongs to */
    readonly families: string[];

    /** Parameter size as string (e.g., '334M' for 334 million parameters) */
    readonly parameter_size: string;

    /** Quantization level for model compression (e.g., 'F16' for 16-bit float) */
    readonly quantization_level: string;
  };
}

/**
 * Provider implementation for Ollama AI models.
 *
 * @example
 * ```typescript
 * const provider = new OllamaProvider('http://localhost:11434');
 * const models = await provider.getModels();
 * const enhanced = await provider.enhancePrompt({
 *   text: 'Tell me about AI',
 *   model: 'llama2',
 *   enhancementType: 'enhance'
 * });
 * ```
 *
 * @developerNote
 * This class extends BaseAIProvider and implements Ollama-specific API calls.
 * Default URL points to local Ollama instance. Error handling returns empty arrays for model fetch failures.
 */
export default class OllamaProvider extends BaseAIProvider {
  /**
   * A static constant representing the unique identifier for the provider, typically used in internal systems or API integrations.
   * @developerNotes Ensure the ID is lowercase and matches the provider's official identifier.
   */
  public static readonly ProviderID: string = 'ollama';

  /**
   * A static constant representing the display name or key used for referencing the provider in user-facing contexts.
   * @developerNotes This value should match the provider's official branding.
   */
  public static readonly ProviderKey: string = 'Ollama';

  /**
   * A static constant representing the full, official name of the provider, typically used for documentation or identification purposes.
   * @developerNotes Ensure consistency with the provider's official name and use proper casing.
   */
  public static readonly ProviderName: string = 'Ollama';

  /**
   * A static constant representing the default prompts used by the provider.
   * @developerNotes These prompts should be tailored to the specific needs of the provider and should be updated as needed.
   */
  public static readonly DefaultPrompts: ProviderDefaultPrompt = {
    system: 'You are an AI assistant running via Ollama. Optimize prompts to be efficient, clear, and well-suited for local LLM execution.',
    role: 'You are a prompt engineer for local models. Improve prompts to be self-contained, unambiguous, and effective on-device.',
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
    caption: OllamaProvider.ProviderName,
    name: OllamaProvider.ProviderID,
    baseUrl: 'https://api.groq.com',
    apiKey: '',
    timeout: 30000,
  };

  /**
   * @inheritDoc
   */
  public static getProviderSpecificSystemPrompt(formattedPrompt: string, capabilities?: ProviderCapabilities): string {
    // Ollama supports OpenAI standard API but benefits from clear role definitions
    formattedPrompt = `You are a helpful AI assistant. ${formattedPrompt}`;

    if (capabilities?.supportsJsonMode) {
      formattedPrompt += '\n\nRespond with valid JSON only.';
    }

    return formattedPrompt;
  }

  /**
   * @inheritDoc
   */
  public static getFormatTemplates(): Record<OutputFormatName, string> {
    return {
      [OutputFormat.JSON]: `Output must be valid JSON. Do not include explanations or markdown.`,
      [OutputFormat.MARKDOWN]: `Use Markdown syntax for formatting (headers, lists, code blocks).`,
      [OutputFormat.TEXT]: `Respond in clear, plain text without formatting.`,
      [OutputFormat.HTML]: `Return valid HTML with semantic structure.`,
      [OutputFormat.XML]: `Return well-formed XML with proper tags.`,
      [OutputFormat.YAML]: `Return valid YAML with correct indentation.`,
    };
  }

  /**
   * Creates a new Ollama provider instance.
   * @param config - Configuration object
   */
  constructor(config: ConfigMeta) {
    super(OllamaProvider.ProviderKey, {baseUrl: config?.baseUrl ?? OllamaProvider.ProviderConfig.baseUrl});
  }

  /**
   * Retrieves all available models from the Ollama instance.
   *
   * @returns Promise resolving to an array of AIModel objects
   *
   * @example
   * ```typescript
   * const models = await provider.getModels();
   * console.log(models[0].name); // 'llama2'
   * ```
   *
   * @developerNote
   * Maps Ollama's native model format to the standardized AIModel interface.
   * Falls back to 4096 context length if not provided by the API.
   */
  async getModels(): Promise<AIModel[]> {
    try {
      const response = await this.client.get<{ models: OllamaModel[] }>('/api/tags');
      const models = response.data.models || [];

      return models.map((model: any) => ({
        id: model.name,
        size: model.size,
        name: model.name.split(':')[0],
        provider: OllamaProvider.ProviderID,
        description: `${model.size} • ${model.digest.substring(0, 12)}`,
        contextLength: model.details?.context_length || 4096,
      })).sort((a, b) => a.name.localeCompare(b.name));
    } catch (error: any) {
      console.error('Failed to fetch Ollama models:', error);
      return [];
    }
  }

  /**
   * Enhances a prompt using the specified Ollama model.
   *
   * @param request - The prompt enhancement request containing text and options
   * @returns Promise resolving to the enhanced prompt response
   *
   * @example
   * ```typescript
   * const response = await provider.enhancePrompt({
   *   text: 'What is AI?',
   *   model: 'llama2',
   *   temperature: 0.7,
   *   maxTokens: 1000
   * });
   * console.log(response.enhancedPrompt);
   * ```
   *
   * @developerNote
   * Builds a system prompt based on enhancement type and user role.
   * Falls back to original text if API call fails or returns empty response.
   */
  async enhancePrompt(request: PromptRequest): Promise<PromptResponse> {
    const startTime = Date.now();

    try {
      const systemPrompt = await this.buildSystemPrompt(request);
      const fullPrompt = await this.formatSystemPrompt(systemPrompt) + `\n\n` + await this.formatPrompt(request);

      console.log({systemPrompt, fullPrompt});
      throw new Error ('_NO_ERROR_');

      const response = await this.client.post('/api/generate', {
        model: request.model,
        prompt: fullPrompt,
        stream: false,
        options: {
          temperature: request.temperature || 0.7,
          num_predict: request.maxTokens || 2000,
        },
      });

      const enhancedPrompt = await this.toPromptResponse(response?.data?.response?.trim(), request.text);

      return {
        enhancedPrompt,
        originalPrompt: request.text,
        model: request.model,
        timestamp: new Date(),
        tokensUsed: response.data.eval_count,
        processingTime: this.calculateProcessingTime(startTime),
      };
    } catch (error: any) {
      console.error('Ollama enhancement failed:', error);
      throw new Error(`Failed to enhance prompt with Ollama: ${error}`);
    }
  }

  /**
   * Checks if the Ollama service is available and responding.
   *
   * @returns Promise resolving to true if service is available, false otherwise
   *
   * @example
   * ```typescript
   * if (await provider.isAvailable()) {
   *   console.log('Ollama is running');
   * }
   * ```
   *
   * @developerNote
   * Uses the /api/tags endpoint as a lightweight health check.
   * Silent failure returns false without logging.
   */
  async isAvailable(): Promise<boolean> {
    try {
      await this.client.get('/api/tags');
      return true;
    } catch {
      return false;
    }
  }
}
