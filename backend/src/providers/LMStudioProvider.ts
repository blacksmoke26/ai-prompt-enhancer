/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import BaseAIProvider, {ProviderDefaultPrompt} from '~/base/BaseAIProvider';

// utils
import {toProviderName} from '~/utils/provider';

// constants
import {OutputFormat, OutputFormatName, Provider} from '~/constants/enums';

// types
import type {AIModel} from '~/types';
import type {ConfigMeta} from '~/database/models';
import type {ProviderConfig} from '~/constants/providers';
import type {PromptRequest, PromptResponse, ProviderCapabilities} from '~/types/prompt';

/**
 * Represents a model from LM Studio, containing metadata such as ID, type, publisher, and configuration details.
 * Example: `{ id: 'qwen2-vl-7b-instruct', type: 'vlm', publisher: 'mlx-community', max_context_length: 2048 }`.
 *
 * @interface LMStudioModel
 *
 * Developer Notes:
 * - This interface defines the structure of a model from LM Studio, supporting various types (e.g., VLM, LLM).
 * - `readonly` properties ensure immutability for critical metadata like `id` and `type`.
 * - Enum-like values (e.g., `quantization`, `state`) provide type safety and clarity for model states.
 */
export interface LMStudioModel {
  /** The full ID of the model, including version tag (e.g., 'qwen2-vl-7b-instruct') */
  readonly id: string;
  /** The type of the model object (e.g., 'model', 'llm', 'vlm') */
  readonly object: 'model' | string;
  /** The category of the model (e.g., 'vlm' for Vision-Language Models, 'llm' for Language Models) */
  readonly type: 'vlm' | 'llm' | 'embeddings' | string;
  /** The publisher of the model (e.g., 'mlx-community' for community models) */
  readonly publisher: 'mlx-community' | string;
  /** The architecture or framework of the model (e.g., 'Transformer', 'LSTM') */
  readonly arch: string;
  /** The compatibility type or framework (e.g., 'mlx' for MLX framework) */
  readonly compatibility_type: 'mlx' | 'gguf' | string;
  /** The quantization level of the model (e.g., '4bit' for 4-bit quantization) */
  readonly quantization: '4bit' | '8bit' | 'Q4_K_M' | string;
  /** The current state of the model (e.g., 'not-loaded', 'loaded') */
  readonly state: 'not-loaded' | 'loaded' | string;
  /** The maximum context length supported by the model in tokens */
  readonly max_context_length: number;
}

/**
 * Provider implementation for LM Studio AI models.
 * @see https://lmstudio.ai/docs/developer/rest/endpoints
 *
 * @example
 * ```typescript
 * const provider = new LMStudioProvider('http://localhost:1234');
 * const models = await provider.getModels();
 * const enhanced = await provider.enhancePrompt({
 *   text: 'Tell me about AI',
 *   model: 'llama2',
 *   enhancementType: 'enhance'
 * });
 * ```
 *
 * @developerNote
 * This class extends BaseAIProvider and implements LM Studio-specific API calls.
 * Default URL points to local LM Studio instance. Error handling returns empty arrays for model fetch failures.
 */
export default class LMStudioProvider extends BaseAIProvider {
  /**
   * A static constant representing the unique identifier for the provider, typically used in internal systems or API integrations.
   * @developerNotes Ensure the ID is lowercase and matches the provider's official identifier.
   */
  public static readonly ProviderID: string = Provider.LmStudio;

  /**
   * A static constant representing the display name or key used for referencing the provider in user-facing contexts.
   * @developerNotes This value should match the provider's official branding.
   */
  public static readonly ProviderKey: string = 'LmStudio';

  /**
   * A static constant representing the full, official name of the provider, typically used for documentation or identification purposes.
   * @developerNotes Ensure consistency with the provider's official name and use proper casing.
   */
  public static readonly ProviderName: string = 'LM Studio';

  /**
   * A static constant representing the default prompts used by the provider.
   * @developerNotes These prompts should be tailored to the specific needs of the provider and should be updated as needed.
   */
  public static readonly DefaultPrompts: ProviderDefaultPrompt = {
    system: 'You are an AI assistant running locally via LM Studio. Optimize prompts for local inference: be clear, concise, and avoid unnecessary complexity.',
    role: 'You are a prompt refiner for local LLMs. Ensure prompts are well-scoped, efficient, and compatible with on-device models.',
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
    caption: LMStudioProvider.ProviderName,
    name: LMStudioProvider.ProviderID,
    baseUrl: 'http://localhost:1234',
    apiKey: '',
    timeout: 30000,
  };

  /**
   * @inheritDoc
   */
  public static getProviderSpecificSystemPrompt(formattedPrompt: string, capabilities?: ProviderCapabilities): string {
    // LMStudio is a local runner that benefits from standard formatting
    formattedPrompt = `You are a helpful AI assistant. ${formattedPrompt}`;

    return formattedPrompt;
  }

  /**
   * @inheritDoc
   */
  public static getFormatTemplates(): Record<OutputFormatName, string> {
    return {
      [OutputFormat.JSON]: `Output Format: JSON\nRespond with valid JSON only. No explanations.`,
      [OutputFormat.MARKDOWN]: `Output Format: Markdown\nUse standard Markdown for formatting.`,
      [OutputFormat.TEXT]: `Output Format: Plain Text\nProvide clean plain text output.`,
      [OutputFormat.HTML]: `Output Format: HTML\nReturn valid HTML with semantic structure.`,
      [OutputFormat.XML]: `Output Format: XML\nReturn well-formed XML document.`,
      [OutputFormat.YAML]: `Output Format: YAML\nReturn properly indented YAML.`,
    };
  }

  /**
   * Creates a new LM Studio provider instance.
   * @param config - Configuration object
   */
  constructor(config: ConfigMeta) {
    super(LMStudioProvider.ProviderKey, {baseUrl: config?.baseUrl ?? LMStudioProvider.ProviderConfig.baseUrl});
  }

  /**
   * Retrieves all available models from the LM Studio instance.
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
   * Maps LM Studio's native model format to the standardized AIModel interface.
   * Falls back to 4096 context length if not provided by the API.
   */
  async getModels(): Promise<AIModel[]> {
    try {
      const response = await this.client.get<{ data: LMStudioModel[] }>('/api/v0/models');
      const models = response.data.data || [];

      return models.map((model) => {
        const [, size = '?b'] = model.id.match(/-(\d+b)/) ?? [];
        const items = model.id.split('-');
        let name = (String(items[0]).split('/')[1] ?? '');
        if (name.trim()) {
          name += '-' + items[1];
        }
        return ({
          id: model.id,
          name,
          size,
          provider: LMStudioProvider.ProviderID,
          description: `${size} • ${model.type} • ${model.compatibility_type}`,
          contextLength: model?.max_context_length || 4096,
        });
      }).sort((a, b) => a.name.localeCompare(b.name));
    } catch (error: any) {
      console.error('Failed to fetch LM Studio models:', error);
      return [];
    }
  }

  /**
   * Enhances a prompt using the specified LM Studio model.
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
      const fullPrompt = `${await this.formatSystemPrompt(systemPrompt)}\n\n` + await this.formatPrompt(request);

      const response = await this.client.post('/api/v0/completions', {
        model: request.model,
        prompt: fullPrompt,
        stream: false,
        temperature: request.temperature || 0.7,
        max_tokens: request.maxTokens || 2000,
      });

      const enhancedPrompt = await this.toPromptResponse(response.data.choices?.[0]?.text, request.text);

      return {
        enhancedPrompt,
        originalPrompt: request.text,
        model: request.model,
        timestamp: new Date(),
        tokensUsed: response.data.usage?.prompt_tokens,
        processingTime: this.calculateProcessingTime(startTime),
      };
    } catch (error: any) {
      console.error('LM Studio enhancement failed:', error);
      throw new Error(`Failed to enhance prompt with LM Studio: ${error}`);
    }
  }

  /**
   * Checks if the LM Studio service is available and responding.
   *
   * @returns Promise resolving to true if service is available, false otherwise
   *
   * @example
   * ```typescript
   * if (await provider.isAvailable()) {
   *   console.log('LM Studio is running');
   * }
   * ```
   *
   * @developerNote
   * Uses the /v0/models endpoint as a lightweight health check.
   * Silent failure returns false without logging.
   */
  async isAvailable(): Promise<boolean> {
    try {
      await this.client.get('/api/v0/models');
      return true;
    } catch {
      return false;
    }
  }
}
