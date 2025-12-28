/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import axios, { AxiosInstance, AxiosError } from 'axios';

// classes
import CacheManager from '~/cache/CacheManager';
import PromptFormatter from '~/classes/PromptFormatter';

// utils
import { getInstance } from '~/cache';

// types
import type { AIModel } from '~/types';
import type { ConfigMeta } from '~/database/models';
import type { ProviderConfig } from '~/types/providers';
import type { IProvider } from '~/types/interfaces/IProvider';
import type { OutputFormatName } from '~/constants/output-format';
import type {
  PromptRequest,
  PromptResponse,
  ProviderCapabilities,
  BatchPromptRequest,
  BatchPromptResponse,
  StreamCallback,
  ConversationContext,
  FunctionDefinition,
  FunctionCallResult,
  UsageMetrics,
  HealthStatus,
} from '~/types/prompt';
import type { RateLimitInfo } from '~/types/rate-limit';

/**
 * Defines the default system and role prompts for a provider, used as a base for generating responses.
 * These defaults ensure consistency in the provider's behavior and expectations when interacting with users.
 * @example { system: "You are a helpful assistant", role: "Assistant" }
 * @developerNotes These values should align with the provider's expected behavior and can be customized if needed for specific use cases.
 */
export interface ProviderDefaultPrompt {
  /**
   * The default system prompt or instruction set for the provider.
   * This typically includes general guidelines or constraints for response generation.
   */
  system: string;
  /**
   * The default role or persona the provider should adopt when generating responses.
   * This defines the expected behavior, tone, or context of the provider's output.
   */
  role: string;
}

/**
 * Abstract base class for AI provider implementations.
 * Provides common functionality for API client initialization and processing time calculation.
 *
 * @example
 * class CustomProvider extends BaseAIProvider {
 *   async getModels() { return []; }
 *   async enhancePrompt(req) { return { enhancedPrompt: req.prompt }; }
 *   async isAvailable() { return true; }
 * }
 *
 * @developer_notes
 * Extend this class to implement new AI providers with custom API integrations.
 */
export default abstract class BaseAIProvider {
  /** HTTP client instance for making API requests */
  protected client: AxiosInstance;

  /** Provider name */
  protected name: string;

  /** Cache manager instance */
  protected cache: CacheManager;

  /** Conversation history store */
  protected conversations: Map<string, ConversationContext[]> = new Map();

  /** Rate limit tracking */
  protected rateLimits: Map<string, RateLimitInfo> = new Map();

  /** Supported capabilities */
  protected capabilities: ProviderCapabilities = {
    provider: '',
    supportsStreaming: false,
    supportsBatchProcessing: false,
    supportsFunctionCalling: false,
    supportsConversationHistory: false,
    supportsJsonMode: false,
    supportsImageGeneration: false,
    supportsFineTuning: false,
    maxContextLength: 4096,
    supportedFormats: ['text', 'markdown', 'json'],
  };

  /**
   * A static constant representing the unique identifier for the provider, typically used in internal systems or API integrations.
   * @developerNotes Ensure the ID is lowercase and matches the provider's official identifier.
   */
  public static readonly ProviderID: string = '';

  /**
   * A static constant representing the display name or key used for referencing the provider in user-facing contexts.
   * @developerNotes This value should match the provider's official branding.
   */
  public static readonly ProviderKey: string = '';

  /**
   * A static constant representing the full, official name of the provider, typically used for documentation or identification purposes.
   * @developerNotes Ensure consistency with the provider's official name and use proper casing.
   */
  public static readonly ProviderName: string = '';

  /**
   * A static constant representing the default prompts used by the provider.
   * @developerNotes These prompts should be tailored to the specific needs of the provider and should be updated as needed.
   */
  public static readonly DefaultPrompts: ProviderDefaultPrompt = {
    system: '',
    role: '',
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
    caption: '',
    name: '',
    baseUrl: '',
    apiKey: '',
    timeout: 30000,
  };

  /**
   * Creates an instance of BaseAIProvider with HTTP client configuration.
   * @param name - Provider identifier for logging/tracking purposes
   * @param config - Configuration object
   *
   * @example
   * const provider = new BaseAIProvider('openai', 'https://api.openai.com', 10000);
   */
  constructor(name: string, config: ConfigMeta) {
    this.name = name;
    this.cache = getInstance();
    this.client = axios.create({
      baseURL: config?.baseUrl,
      timeout: config?.timeout ?? 30000,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': `AIProvider/${name} v1.0`,
      },
    });

    // Setup interceptors for rate limiting and error handling
    this.setupInterceptors();
  }

  /**
   * Sets up Axios interceptors for rate limiting, error handling, and logging
   */
  private setupInterceptors(): void {
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        if (error.response?.status === 429) {
          await this.handleRateLimit(error);
        }
        if (error.response?.status === 401 || error.response?.status === 403) {
          console.error(`[${this.name}] Authentication failed:`, error.message);
        }
        return Promise.reject(error);
      },
    );
  }

  /**
   * Retrieves available AI models from the provider.
   * @returns Promise resolving to array of available model configurations
   *
   * @example
   * const models = await provider.getModels();
   * console.log(models[0].id); // "gpt-4"
   */
  abstract getModels(): Promise<AIModel[]>;

  /**
   * Enhances a prompt using the provider's AI capabilities.
   * @param request - Prompt enhancement request with input text and options
   * @returns Promise resolving to enhanced prompt response
   *
   * @example
   * const response = await provider.enhancePrompt({
   *   prompt: "What is the weather?",
   *   context: "user in Tokyo"
   * });
   */
  abstract enhancePrompt(request: PromptRequest): Promise<PromptResponse>;

  /**
   * Checks provider availability and connectivity.
   * @returns Promise resolving to boolean indicating service status
   *
   * @example
   * if (await provider.isAvailable()) {
   *   // proceed with API calls
   * }
   */
  abstract isAvailable(): Promise<boolean>;

  /**
   * Provider-specific system prompt for enhanced prompts.
   * @param formattedPrompt - Formatted system prompt string
   * @param capabilities - Provider capabilities
   * @returns The provider-specific system prompt
   *
   * @example
   * const systemPrompt = provider.providerSpecificSystemPrompt('openai', 'You are a helpful assistant');
   * console.log(systemPrompt); // "You are a helpful assistant"
   *
   * @developerNotes
   * Override this method to provide provider-specific system prompts.
   * This method is called by the base class to generate provider-specific system prompts.
   * It is used to generate provider-specific system prompts for enhanced prompts.
   */
  public static getProviderSpecificSystemPrompt(
    formattedPrompt: string,
    capabilities?: ProviderCapabilities,
  ): string {
    throw new Error('Not implemented');
  }

  /**
   * Returns a mapping of predefined output format names to their corresponding instruction templates.
   * These templates guide the response generation process for different output formats (e.g., JSON, Markdown).
   * @example {
   *   [OutputFormat.JSON]: "Output Format: JSON\nResponse Format: JSON\nEnsure the response is valid JSON with proper escaping and structure.",
   *   [OutputFormat.TEXT]: "Output Format: Plain Text\nResponse Format: Text\nProvide clear, concise plain text output."
   * }
   * @developerNotes This method should be implemented by subclasses to provide format-specific instructions. Ensure `OutputFormat` is defined to validate keys in the returned object.
   */
  public static getFormatTemplates(): Record<OutputFormatName, string> {
    throw new Error('Not implemented');
  }

  /**
   * Batch processes multiple prompts in a single request for efficiency.
   * @param requests - Array of prompt requests to process
   * @returns Promise resolving to array of enhanced prompt responses
   *
   * @example
   * const responses = await provider.batchEnhancePrompts([
   *   { text: "What is AI?", model: "gpt-4" },
   *   { text: "Explain ML", model: "gpt-4" }
   * ]);
   */
  public async batchEnhancePrompts(
    requests: BatchPromptRequest[],
  ): Promise<BatchPromptResponse[]> {
    const results: BatchPromptResponse[] = [];
    const startTime = Date.now();

    try {
      // Process in parallel but with rate limiting
      const batchSize = 5; // Process 5 at a time to avoid overwhelming Ollama
      for (let i = 0; i < requests.length; i += batchSize) {
        const batch = requests.slice(i, i + batchSize);
        const batchPromises = batch.map(async (request, index) => {
          try {
            const response = await this.enhancePrompt(request);
            return {
              success: true,
              response,
              originalRequest: request,
              index: i + index,
            };
          } catch (error) {
            return {
              success: false,
              error: error instanceof Error ? error.message : String(error),
              originalRequest: request,
              index: i + index,
            };
          }
        });

        const batchResults = await Promise.all(batchPromises);
        results.push(...batchResults);

        // Small delay between batches to prevent rate limiting
        if (i + batchSize < requests.length) {
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
      }

      const processingTime = this.calculateProcessingTime(startTime);
      console.log(
        `[Ollama] Batch processed ${requests.length} prompts in ${processingTime}ms`,
      );

      return results.sort((a, b) => a.index - b.index);
    } catch (error) {
      console.error('Batch processing failed:', error);
      throw new Error(
        `Batch processing failed: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  /**
   * Streams prompt responses in real-time for long-running generations.
   * @param request - Prompt request with streaming enabled
   * @param callback - Callback function to handle streamed chunks
   * @returns Promise resolving to final response when stream completes
   *
   * @example
   * await provider.streamPrompt({
   *   text: "Write a long story...",
   *   model: "gpt-4"
   * }, (chunk) => {
   *   console.log('Received chunk:', chunk.text);
   * });
   */
  public async streamPrompt(
    request: PromptRequest,
    callback: StreamCallback,
  ): Promise<PromptResponse> {
    throw new Error('Method not implemented.');
  }

  /**
   * Manages models (download, delete, update) based on action type.
   * @param action - Action to perform ('download', 'delete', 'update')
   * @param modelName - Name of the model to manage
   * @param options - Additional options specific to the action
   * @returns Promise resolving to management result
   *
   * @example
   * await provider.manageModel('download', 'llama2:latest');
   * await provider.manageModel('delete', 'old-model');
   */
  public async manageModel?(
    action: 'download' | 'delete' | 'update',
    modelName: string,
    options?: Record<string, any>,
  ): Promise<{
    success: boolean;
    message: string;
  }> {
    return {
      success: false,
      message: `Model management (${action}) is not supported through API.`,
    };
  }

  /**
   * Gets provider capabilities and supported features.
   * @returns Provider capabilities object
   *
   * @example
   * const capabilities = provider.getProviderCapabilities();
   * console.log(capabilities.supportsStreaming); // true/false
   */
  public getProviderCapabilities(): ProviderCapabilities {
    return this.capabilities;
  }

  /**
   * Sets provider capabilities for runtime feature detection.
   * @param capabilities - Capabilities object to set
   *
   * @example
   * provider.setProviderCapabilities({
   *   supportsStreaming: true,
   *   maxContextLength: 8192
   * });
   */
  public setProviderCapabilities(capabilities: ProviderCapabilities): void {
    this.capabilities = { ...this.capabilities, ...capabilities };
  }

  /**
   * Gets usage metrics and statistics for the provider.
   * @param since - Optional timestamp to get metrics since a specific time
   * @returns Usage metrics object
   *
   * @example
   * const metrics = await provider.getUsageMetrics(Date.now() - 86400000); // last 24 hours
   */
  abstract getUsageMetrics?(since?: number): Promise<UsageMetrics>;

  /**
   * Handles rate limiting by implementing backoff strategies.
   * @param error - Axios error that triggered the rate limit
   * @param maxRetries - Maximum number of retry attempts
   * @returns Promise that resolves when rate limit is cleared or rejects on failure
   *
   * @example
   * try {
   *   await provider.makeRequest();
   * } catch (error) {
   *   await provider.handleRateLimit(error);
   * }
   */
  protected async handleRateLimit(
    error: AxiosError,
    maxRetries: number = 3,
  ): Promise<void> {
    const retryAfter =
      error.response?.headers?.['retry-after'] ||
      error.response?.headers?.['x-ratelimit-reset'];
    const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : 1000;

    console.warn(
      `[${this.name}] Rate limited. Waiting ${waitTime}ms before retry.`,
    );

    // Store rate limit info
    this.rateLimits.set(error.config?.url || 'unknown', {
      retryAfter: waitTime,
      resetTime: Date.now() + waitTime,
      remaining: 0,
    });

    // Exponential backoff
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        await new Promise((resolve) =>
          setTimeout(resolve, waitTime * Math.pow(2, attempt - 1)),
        );
        // Try to make a lightweight request to check if rate limit is cleared
        await this.client.get('/health');
        return;
      } catch (retryError) {
        if (attempt === maxRetries) {
          throw new Error(`[${this.name}] Rate limit exceeded maximum retries`);
        }
      }
    }
  }

  /**
   * Caches a response for future use based on cache key and TTL.
   * @param key - Unique cache key
   * @param response - Response to cache
   * @param ttl - Time to live in milliseconds (default: 1 hour)
   * @returns Boolean indicating if caching was successful
   *
   * @example
   * await provider.cacheResponse('prompt:123', response, 3600000);
   */
  public async cacheResponse(
    key: string,
    response: any,
    ttl: number = 3600000,
  ): Promise<boolean> {
    try {
      await this.cache.set(key, response, ttl);
      return true;
    } catch (error) {
      console.error(`[${this.name}] Failed to cache response:`, error);
      return false;
    }
  }

  /**
   * Retrieves a cached response if available.
   * @param key - Cache key to look up
   * @returns Cached response or null if not found/expired
   *
   * @example
   * const cached = await provider.getCachedResponse('prompt:123');
   * if (cached) return cached;
   */
  public async getCachedResponse(key: string): Promise<any | null> {
    try {
      return await this.cache.get(key);
    } catch (error) {
      console.error(`[${this.name}] Failed to get cached response:`, error);
      return null;
    }
  }

  /**
   * Sanitizes input to prevent prompt injection and security issues.
   * @param input - Raw input to sanitize
   * @returns Sanitized input string
   *
   * @example
   * const safeInput = provider.sanitizeInput("User input with <script>tags</script>");
   */
  public sanitizeInput(input: string): string {
    if (!input) return '';

    // Remove control characters (NULL to DEL except TAB, LF, CR)
    // \x00-\x08: NULL to BACKSPACE
    // \x0B-\x0C: VT, FF
    // \x0E-\x1F: SO to US
    // \x7F: DEL
    // Remove dangerous control characters while preserving safe whitespace
    // This approach avoids ESLint no-control-regex warnings by using character code checking
    let sanitized = input.replace(/[\0-\x7F]/g, (match) => {
      const charCode = match.charCodeAt(0);

      // Keep safe whitespace characters:
      // 9 = TAB, 10 = LINE FEED (\n), 13 = CARRIAGE RETURN (\r)
      if (charCode === 9 || charCode === 10 || charCode === 13) {
        return match;
      }

      // Remove all other control characters (0-31 and 127)
      if ((charCode >= 0 && charCode <= 31) || charCode === 127) {
        return '';
      }

      return match;
    });

    // Remove potentially dangerous content for XSS prevention
    sanitized = sanitized
      // Remove script tags and their content
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      // Remove javascript: protocol handlers
      .replace(/javascript:/gi, 'javascript-disabled:')
      // Remove event handlers (onclick, onmouseover, etc.)
      .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
      // Remove data URLs that could contain malicious content
      .replace(
        /data:\s*image\/(gif|png|jpg|jpeg|bmp|webp);base64,[a-zA-Z0-9+/=]+/gi,
        '',
      )
      // Remove iframe tags
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');

    // Basic HTML entity encoding for additional safety
    sanitized = sanitized
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

    return sanitized.trim();
  }

  /**
   * Adds a message to a conversation context.
   * @param conversationId - Unique conversation identifier
   * @param message - Message to add to conversation
   * @returns Updated conversation context
   *
   * @example
   * await provider.addConversationMessage('conv-123', {
   *   role: 'user',
   *   content: 'Hello!'
   * });
   */
  public async addConversationMessage(
    conversationId: string,
    message: ConversationContext,
  ): Promise<ConversationContext[]> {
    const conversation = this.conversations.get(conversationId) || [];
    const updatedConversation = [...conversation, message];
    this.conversations.set(conversationId, updatedConversation);

    // Trim conversation to reasonable length
    if (updatedConversation.length > 20) {
      this.conversations.set(conversationId, updatedConversation.slice(-20));
    }

    return updatedConversation;
  }

  /**
   * Gets the full conversation context for a given conversation ID.
   * @param conversationId - Unique conversation identifier
   * @returns Array of conversation messages or empty array if not found
   *
   * @example
   * const context = provider.getConversationContext('conv-123');
   */
  public getConversationContext(conversationId: string): ConversationContext[] {
    return this.conversations.get(conversationId) || [];
  }

  /**
   * Clears a conversation context.
   * @param conversationId - Unique conversation identifier
   * @returns Boolean indicating if conversation was cleared
   *
   * @example
   * provider.clearConversation('conv-123');
   */
  public clearConversation(conversationId: string): boolean {
    return this.conversations.delete(conversationId);
  }

  /**
   * Calls a function/tool based on the provider's function calling capabilities.
   * @param functions - Array of function definitions available to call
   * @param request - Prompt request that may trigger function calls
   * @returns Function call results or null if no functions were called
   *
   * @example
   * const result = await provider.callFunction([
   *   {
   *     name: 'getWeather',
   *     parameters: { location: 'string' }
   *   }
   * ], { text: 'What's the weather in London?' });
   */
  public async callFunction(
    functions: FunctionDefinition[],
    request: PromptRequest,
  ): Promise<FunctionCallResult[] | null> {
    throw new Error('Method not implemented.');
  }

  /**
   * Gets comprehensive health status of the provider service.
   * @returns Health status object with detailed information
   *
   * @example
   * const health = await provider.getHealthStatus();
   * console.log(health.status); // 'healthy', 'degraded', 'down'
   */
  public async getHealthStatus(): Promise<HealthStatus> {
    throw new Error('Method not implemented.');
  }

  /**
   * Gets version information about the provider API and service.
   * @returns Version information object
   *
   * @example
   * const version = await provider.versionInfo();
   * console.log(version.apiVersion); // 'v1.0.0'
   */
  public async versionInfo(): Promise<{
    apiVersion: string;
    serviceVersion: string;
    providerVersion: string;
  }> {
    throw new Error('Method not implemented.');
  }

  /**
   * Calculates processing time in milliseconds from start timestamp.
   * @param startTime - Epoch timestamp when operation began
   * @returns Elapsed time in milliseconds
   *
   * @example
   * const start = Date.now();
   * await operation();
   * console.log(calculateProcessingTime(start)); // 123
   *
   * @developer_notes
   * Use for performance monitoring and timeout handling.
   */
  protected calculateProcessingTime(startTime: number): number {
    return Date.now() - startTime;
  }

  /**
   * Formats a prompt request into a structured string, including optional metadata and the original prompt.
   * @example
   * const request = {
   *   format: 'json',
   *   userRole: 'Analyst',
   *   targetAudience: 'Managers',
   *   tone: 'Professional',
   *   text: 'Generate a report',
   * };
   * formatPrompt(request);
   * // returns:
   * // Output Format: JSON
   * // User Role: Analyst
   * // Target Audience: Managers
   * // Tone: Professional
   * // Original prompt: Generate a report
   * //
   * // {{enhanced prompt}}
   * @param {PromptRequest} request - The prompt request object containing metadata and the original text.
   * @param staticClass - The class reference for static methods
   * @returns {string} - A formatted string representing the prompt with metadata and the original text.
   */
  public async formatPrompt(
    request: PromptRequest,
    staticClass: object,
  ): Promise<string> {
    return (
      await PromptFormatter.formatPrompt(request, staticClass as IProvider)
    ).prompt;
  }

  /**
   * Formats the system prompt (placeholder implementation; returns input as-is).
   * @param systemPrompt - The raw system prompt string to be formatted.
   * @param staticClass - The class reference for static methods
   * @returns The formatted system prompt (identical to input in this implementation).
   * @example
   * const formattedPrompt = formatSystemPrompt("You are a helpful assistant.");
   * // Output: "You are a helpful assistant."
   * @note This method is a no-op by default and should be overridden in subclasses to implement custom formatting logic.
   */
  public async formatSystemPrompt(
    systemPrompt: string,
    staticClass: object,
  ): Promise<string> {
    return PromptFormatter.formatSystemPrompt(
      systemPrompt,
      staticClass as IProvider,
    );
  }

  /**
   * Extracts the response content from a model's response object.
   * Returns the trimmed response content or the original user prompt if no response is found.
   *
   * @param enhancedResponse - The enhanced response generated by the provider
   * @param userPrompt - The original user input prompt as fallback
   * @param staticClass - The class reference for static methods
   * @param format - The output format name for response formatting
   * @returns The extracted response content or the user prompt
   *
   * @example
   * toPromptResponse( "Hello, world!", "Ask about AI")
   * // Returns: "Hello, world!"
   *
   * toPromptResponse('', "Ask about AI")
   * // Returns: "Ask about AI"
   *
   * Developer Note: This method ensures consistent handling of empty responses
   * and provides a fallback mechanism for cases where the model's response is missing.
   */
  public async toPromptResponse(
    enhancedResponse: string,
    userPrompt: string,
    staticClass: object,
    format: OutputFormatName = 'markdown',
  ): Promise<string> {
    return PromptFormatter.toPromptResponse(
      enhancedResponse,
      userPrompt,
      staticClass as IProvider,
      format,
    );
  }

  /**
   * Builds the system prompt by combining role-specific and enhancement-based prompts.
   * Combines `rolePrompt` and `systemPrompt` from the request, with fallbacks if fields are missing.
   * @param request - The request object containing prompt configuration.
   * @param staticClass - The class reference for static methods
   * @returns The constructed system prompt string.
   * @example
   * const request = {
   *   enhancementType: 'enhance',
   *   userRole: 'admin'
   * };
   * const prompt = buildSystemPrompt(request);
   * // Output: "Admin role prompt. Enhance system prompt."
   * @note
   * - Falls back to default prompts if `systemPrompt` or `enhancementType` is missing.
   * - Uses `toEnhancementTypes()` and `toUserRoles()` for prompt mapping.
   * - Override this method for custom prompt construction logic.
   */
  public async buildSystemPrompt(
    request: PromptRequest,
    staticClass: object,
  ): Promise<string> {
    return (
      await PromptFormatter.buildSystemPrompt(request, staticClass as IProvider)
    ).enhancementPrompt;
  }

  /**
   * Validates that a model is supported by the provider.
   * @param modelName - Name of the model to validate
   * @returns Boolean indicating if the model is supported
   *
   * @example
   * const isSupported = provider.validateModel('gpt-4');
   * if (!isSupported) throw new Error('Model not supported');
   */
  public async validateModel(modelName: string): Promise<boolean> {
    const models = await this.getModels();
    return models.some(
      (model) => model.name === modelName || model.id === modelName,
    );
  }

  /**
   * Gets the maximum context length supported by a specific model.
   * @param modelName - Name of the model
   * @returns Maximum context length in tokens
   *
   * @example
   * const maxLength = await provider.getMaxContextLength('gpt-4');
   */
  public async getMaxContextLength(modelName: string): Promise<number> {
    const models = await this.getModels();
    const model = models.find(
      (m) => m.name === modelName || m.id === modelName,
    );
    return model?.contextLength || this.capabilities.maxContextLength || 4096;
  }

  /**
   * Estimates token count for a given text and model.
   * @param text - Text to estimate tokens for
   * @param modelName - Model name to use for estimation
   * @returns Estimated token count
   *
   * @example
   * const tokenCount = await provider.estimateTokenCount('Hello world', 'gpt-4');
   */
  public async estimateTokenCount(
    text: string,
    modelName: string,
  ): Promise<number> {
    // Simple estimation: ~4 chars per token on average
    const charCount = text.length;
    return Math.ceil(charCount / 4);
  }

  /**
   * Checks if the provider supports a specific capability.
   * @param capability - Capability to check
   * @returns Boolean indicating if supported
   *
   * @example
   * const supportsStreaming = provider.supportsCapability('supportsStreaming');
   */
  public supportsCapability(capability: keyof ProviderCapabilities): boolean {
    return !!this.capabilities[capability];
  }
}
