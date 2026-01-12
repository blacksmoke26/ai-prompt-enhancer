/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import axios, { AxiosResponse } from 'axios';

import BaseAIProvider, { ProviderDefaultPrompt } from '~/base/BaseAIProvider';
import UniversalPromptComposer from '~/classes/composer/UniversalPromptComposer';
import PromptRequestNormalizer from '~/classes/composer/PromptRequestNormalizer';

// types
import type { AIModel } from '~/types';
import type { Readable } from 'node:stream';
import type { ConfigMeta } from '~/database/models';
import type { ProviderConfig } from '~/types/providers';
import type {
  FunctionCallResult,
  FunctionDefinition,
  HealthStatus,
  PromptRequest,
  PromptResponse,
  StreamResponse,
} from '~/types/prompt';

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
    /** Context window size */
    readonly context_length?: number;
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
    baseUrl: 'http://localhost:11434',
    apiKey: '',
    timeout: 30000,
  };

  /**
   * Constructs a new instance of the OllamaProvider class.
   * @param {ConfigMeta} config - Configuration options for the provider.
   */
  constructor(config: ConfigMeta) {
    super(OllamaProvider.ProviderKey, {...config, baseUrl: config?.baseUrl ?? OllamaProvider.ProviderConfig.baseUrl});
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
  public async getModels(): Promise<AIModel[]> {
    try {
      const cacheKey = `${this.name}:models:all`;
      const cached = await this.getCachedResponse(cacheKey);
      if (cached) return cached;

      const response = await this.client.get<{ models: OllamaModel[] }>('/api/tags');
      const models = response.data.models || [];
      const result = models.map((model) => ({
        id: model.name,
        size: model.size,
        name: model.name.split(':')[0],
        provider: OllamaProvider.ProviderID,
        description: `${(model.size / 1024 / 1024 / 1024).toFixed(2)}GB • ${model.details?.family || 'unknown'} • ${model.details?.parameter_size || ''}`,
        contextLength: model.details?.context_length || 4096,
        parameters: {
          family: model.details?.family,
          parameter_size: model.details?.parameter_size,
          quantization: model.details?.quantization_level,
          format: model.details?.format,
        },
      } as unknown as AIModel));

      result.sort((a, b) => a.name.localeCompare(b.name));

      // Cache for 5 minutes
      await this.cacheResponse(cacheKey, result, 300000);

      return result;
    } catch (error: any) {
      console.error('Failed to fetch Ollama models:', error);
      return [];
    }
  }

  /**
   * Generate a sync response using the specified model.
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
  public async generateSync(request: PromptRequest): Promise<PromptResponse> {
    const startTime = Date.now();
    try {
      // Input validation and sanitization
      if (!request.text?.trim()) {
        // noinspection ExceptionCaughtLocallyJS
        throw new Error('Empty prompt text provided');
      }

      const sanitizedText = this.sanitizeInput(request.text);
      const model = request.model || 'llama2';

      const promptRequest = await PromptRequestNormalizer.normalize({
        ...request,
      });

      const aiPrompt = UniversalPromptComposer.generate(promptRequest);

      const response = await this.client.post<Record<string, any>>(
        '/api/generate',
        {
          model,
          prompt: aiPrompt,
          stream: false,
          options: {
            temperature: Math.max(0, Math.min(1, request.temperature || 0.7)),
            top_p: request?.topP || 1.0,
            top_k: request?.topK || 100,
            num_predict: request?.maxTokens || 2000,
            stop: request?.stopSequences,
            frequency_penalty: request?.frequencyPenalty || 0.0,
            presence_penalty: request?.presencePenalty || 0.0,
          },
        },
      );

      const enhancedPrompt = await this.toPromptResponse(
        response?.data?.response?.trim(),
        sanitizedText,
        OllamaProvider,
        request?.format || 'markdown',
      );

      return {
        aiPrompt,
        enhancedPrompt,
        originalPrompt: sanitizedText,
        model,
        timestamp: new Date(),
        tokensUsed: response.data.eval_count || 0,
        processingTime: this.calculateProcessingTime(startTime),
        metadata: {
          modelDetails: response.data.model,
          totalDuration: response.data.total_duration,
          evalDuration: response.data.eval_duration,
          contextLength: await this.getMaxContextLength(model),
        },
      };
    } catch (error: any) {
      console.error('Ollama enhancement failed:', error);
      throw new Error(`Failed to enhance prompt with Ollama: ${error.message || error}`);
    }
  }

  /**
   * @inheritDoc
   */
  public async *generateStream(request: PromptRequest): AsyncGenerator<StreamResponse, void, unknown> {
    const promptRequest = await PromptRequestNormalizer.normalize(request);

    const aiPrompt = UniversalPromptComposer.generate(promptRequest);

    try {
      const response: AxiosResponse<Readable> = await this.client.post(
        '/api/chat',
        {
          model: request.model,
          messages: [
            {role: 'system', content: request.systemPrompt},
            {role: 'user', content: aiPrompt}
          ]},
        {
          responseType: 'stream',
        },
      );

      const stream = response.data;
      let buffer = '';

      for await (const chunk of stream) {
        buffer += chunk.toString();
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.trim()) {
            try {
              const data = JSON.parse(line) as StreamResponse;
              yield data;

              if (data.done) {
                return;
              }
            } catch (parseError) {
              console.warn('Failed to parse streaming response:', line, parseError);
            }
          }
        }
      }

      // Process any remaining buffer
      if (buffer.trim()) {
        try {
          const data = JSON.parse(buffer) as StreamResponse;
          yield data;
        } catch (parseError) {
          console.warn('Failed to parse final buffer:', buffer, parseError);
        }
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error || error.message;
        console.error(`${OllamaProvider.ProviderName} streaming error:`, errorMessage);
        throw new Error(`${OllamaProvider.ProviderName} API error: ${errorMessage}`);
      }
      console.error('Unexpected streaming error:', error);
      throw new Error(`Failed to stream response from ${OllamaProvider.ProviderName}`);
    }
  }

  /**
   * Gets comprehensive health status of the Ollama service.
   * @returns Health status object with detailed information
   */
  public async getHealthStatus(): Promise<HealthStatus> {
    try {
      const [versionResponse, modelsResponse] = await Promise.all([
        this.client.get('/api/version'),
        this.client.get('/api/tags'),
      ]);

      const versionData = versionResponse.data;
      const models = modelsResponse.data.models || [];

      return {
        status: 'healthy',
        provider: 'ollama',
        timestamp: Date.now(),
        version: versionData.version,
        uptime: 'unknown', // Ollama doesn't provide uptime info
        services: {
          api: 'operational',
          database: 'operational',
          cache: 'operational',
        },
        resources: {
          cpu: 'unknown',
          memory: 'unknown',
          disk: 'unknown',
        },
        models: {
          total: models.length,
          active: models.length,
          loading: 0,
        },
        requests: {
          rate: 0, // Not available
          limit: 'unlimited',
          remaining: 'unlimited',
        },
        latency: {
          p50: 0,
          p95: 0,
          p99: 0,
        },
      };
    } catch (error: any) {
      console.error('Health check failed:', error);
      return {
        status: error.response?.status === 404 ? 'degraded' : 'down',
        provider: 'ollama',
        timestamp: Date.now(),
        version: 'unknown',
        uptime: 'unknown',
        services: {
          api: 'down',
          database: 'unknown',
          cache: 'unknown',
        },
        resources: {
          cpu: 'unknown',
          memory: 'unknown',
          disk: 'unknown',
        },
        models: {
          total: 0,
          active: 0,
          loading: 0,
        },
        requests: {
          rate: 0,
          limit: 'unknown',
          remaining: 'unknown',
        },
        latency: {
          p50: 0,
          p95: 0,
          p99: 0,
        },
        error: error.message,
      };
    }
  }

  /**
   * Gets version information about the Ollama API and service.
   * @returns Version information object
   */
  public async versionInfo(): Promise<{ apiVersion: string; serviceVersion: string; providerVersion: string }> {
    try {
      const response = await this.client.get('/api/version');
      const versionData = response.data;

      return {
        apiVersion: versionData.version,
        serviceVersion: versionData.version,
        providerVersion: `${OllamaProvider.ProviderName} v1.0`,
      };
    } catch (error) {
      console.error('Failed to get version info:', error);
      return {
        apiVersion: 'unknown',
        serviceVersion: 'unknown',
        providerVersion: `${OllamaProvider.ProviderName} v1.0`,
      };
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
  public async isAvailable(): Promise<boolean> {
    try {
      const cacheKey = `${this.name}:availability`;
      const cached = await this.getCachedResponse(cacheKey);
      if (cached !== null) {
        return cached as boolean;
      }

      await this.client.get('/api/tags', {timeout: 5000}); // 5 second timeout for availability check

      // Cache availability status for 30 seconds
      await this.cacheResponse(cacheKey, true, 30000);

      return true;
    } catch {
      // Try version endpoint as fallback
      try {
        await this.client.get('/api/version', {timeout: 2000});
        await this.cacheResponse(`${this.name}:availability`, true, 30000);
        return true;
      } catch {
        await this.cacheResponse(`${this.name}:availability`, false, 10000); // Cache negative result for shorter time
        return false;
      }
    }
  }

  /**
   * Call function - Ollama doesn't natively support function calling
   * This is a placeholder implementation that returns null
   */
  public async callFunction(functions: FunctionDefinition[], request: PromptRequest): Promise<FunctionCallResult[] | null> {
    // Ollama doesn't have native function calling support
    // This would need to be implemented via prompt engineering
    console.warn('Ollama does not support native function calling. This is a placeholder implementation.');
    return null;
  }

  /**
   * Gets the maximum context length for an Ollama model.
   * @param modelName - Name of the model
   * @returns Maximum context length in tokens
   */
  public async getMaxContextLength(modelName: string): Promise<number> {
    const models = await this.getModels();
    const model = models.find(m => m.name === modelName.split(':')[0]);
    return model?.contextLength || 8192; // Default to 8K context for Ollama
  }

  /**
   * Estimates token count for text using Ollama's tokenization.
   * @param text - Text to estimate tokens for
   * @param modelName - Model name to use for estimation
   * @returns Estimated token count
   */
  public async estimateTokenCount(text: string, modelName: string): Promise<number> {
    try {
      const response = await this.client.post('/api/tokenize', {
        model: modelName,
        content: text,
      });
      return response.data.tokens?.length || Math.ceil(text.length / 4);
    } catch (error) {
      // Fallback to simple estimation
      return Math.ceil(text.length / 4);
    }
  }
}
