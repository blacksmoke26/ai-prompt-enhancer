/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import api from '~/utils/api';

// types
import type { PromptRequest, PromptResponse, AIModel, AIProvider } from '~/types';

/**
 * Service for handling AI prompt enhancement and provider management.
 */
export default abstract class PromptService {
  /**
   * Maximum allowed character count for prompt text submissions.
   * This limit prevents excessively large prompts that could cause performance issues
   * or exceed API rate limits. The value is set to accommodate detailed prompts while
   * maintaining reasonable processing times.
   * @type {number}
   * @default 10000
   */
  private static readonly MAX_PROMPT_LENGTH = 10000;

  /**
   * Default timeout duration in milliseconds for standard API requests.
   * Applied to regular operations like model and provider retrieval. This timeout
   * ensures requests don't hang indefinitely, providing a balance between reliability
   * and responsiveness. Consider network latency and typical processing times.
   * @type {number}
   * @default 10000 (10 seconds)
   */
  private static readonly DEFAULT_TIMEOUT = 10000;

  /**
   * Extended timeout duration in milliseconds for provider health check operations.
   * Health checks may require more time as they verify provider connectivity and
   * availability. The longer timeout accommodates potential network issues or provider
   * response delays while maintaining a reasonable upper bound.
   * @type {number}
   * @default 15000 (15 seconds)
   */
  private static readonly HEALTH_CHECK_TIMEOUT = 15000;

  /**
   * Array of permissible status values for AI providers.
   * These status classifications indicate the operational state of providers:
   * - 'active': Provider is fully operational and accepting requests
   * - 'inactive': Provider is temporarily disabled or not configured
   * - 'degraded': Provider is functioning but with limited capacity or performance
   * @type {string[]}
   * @readonly
   */
  private static readonly VALID_PROVIDER_STATUSES = ['active', 'inactive', 'degraded'];

  /**
   * Regular expression pattern for validating provider name formats.
   * Ensures provider names contain only URL-safe characters suitable for API paths
   * and endpoint construction. The pattern allows:
   * - Uppercase and lowercase letters (A-Z, a-z)
   * - Digits (0-9)
   * - Underscores and hyphens for readability
   * This prevents special characters that could cause routing or encoding issues.
   * @type {RegExp}
   * @pattern ^[a-zA-Z0-9_-]+$
   */
  private static readonly PROVIDER_NAME_REGEX = /^[a-zA-Z0-9_-]+$/;

  /**
   * Enhances a prompt using AI to improve clarity and effectiveness.
   * @param request - The prompt enhancement request containing original prompt and preferences.
   * @returns Promise resolving to the enhanced prompt response.
   * @throws {Error} When the request is invalid or enhancement fails.
   * @example
   * const enhanced = await PromptService.enhancePrompt({
   *   text: "Explain quantum computing",
   *   model: "gpt-4"
   * });
   * @developerNote Ensure the request object contains all required fields for successful enhancement.
   */
  static async enhancePrompt(request: PromptRequest): Promise<PromptResponse> {
    this.validatePromptRequest(request);

    try {
      const response = await api.post('/prompts/enhance', {
        ...request,
        prompt: request.text.trim(),
        timestamp: new Date().toISOString(),
      });

      if (!response.data?.enhancedPrompt) {
        throw new Error('Invalid response received from enhancement service');
      }

      return response.data;
    } catch (error: any) {
      this.handleApiError(error);
      throw error;
    }
  }

  /**
   * Retrieves all available AI models for prompt enhancement.
   * @returns Promise resolving to an array of AI model objects.
   * @throws {Error} When unable to fetch models.
   * @example
   * const models = await PromptService.getModels();
   * console.log(models); // [{ name: "gpt-4", provider: "openai", ... }]
   * @developerNote This endpoint may require authentication for certain models.
   */
  static async getModels(): Promise<AIModel[]> {
    try {
      const response = await api.get('/prompts/models', {
        timeout: this.DEFAULT_TIMEOUT,
      });

      if (!Array.isArray(response.data)) {
        throw new Error('Invalid response format: expected array of models');
      }

      return response.data.filter(this.isValidModel);
    } catch (error: any) {
      this.handleFetchError(error, 'models');
    }
  }

  /**
   * Retrieves all available AI providers.
   * @returns Promise resolving to an array of AI provider objects.
   * @throws {Error} When unable to fetch providers.
   * @example
   * const providers = await PromptService.getProviders();
   * console.log(providers); // [{ name: "openai", status: "active", ... }]
   * @developerNote Providers may have different rate limits and capabilities.
   */
  static async getProviders(): Promise<AIProvider[]> {
    try {
      const response = await api.get('/prompts/providers', {
        timeout: this.DEFAULT_TIMEOUT,
      });

      if (!Array.isArray(response.data)) {
        throw new Error('Invalid response format: expected array of providers');
      }

      return response.data.filter(this.isValidProvider);
    } catch (error: any) {
      this.handleFetchError(error, 'providers');
    }
  }

  /**
   * Tests if a specific AI provider is currently available and functional.
   * @param providerName - The name of the provider to test.
   * @returns Promise resolving to an object containing provider status.
   * @throws {Error} When provider name is invalid or test fails.
   * @example
   * const status = await PromptService.testProvider("openai");
   * console.log(status.available); // true/false
   * @developerNote This performs a lightweight health check - not a full capability test.
   */
  static async testProvider(providerName: string): Promise<{ providerName: string; available: boolean; lastChecked: string }> {
    this.validateProviderName(providerName);

    try {
      const response = await api.post(`/prompts/providers/${encodeURIComponent(providerName)}/test`, null, {
        timeout: this.HEALTH_CHECK_TIMEOUT,
      });

      if (typeof response.data?.available !== 'boolean') {
        throw new Error('Invalid response from provider health check');
      }

      return {
        providerName,
        available: response.data.available,
        lastChecked: new Date().toISOString(),
      };
    } catch (error: any) {
      if (error.response?.status === 404) {
        throw new Error(`Provider "${providerName}" not found`);
      }
      if (error.code === 'ECONNABORTED') {
        throw new Error('Health check timeout: Provider may be unavailable');
      }
      if (error.response?.status === 503) {
        return {
          providerName,
          available: false,
          lastChecked: new Date().toISOString(),
        };
      }
      throw error;
    }
  }

  /**
   * Validates a prompt request to ensure it meets requirements.
   * @param request - The prompt request object containing text and preferences.
   * @throws {Error} When request is invalid, empty, or exceeds length limit.
   * @example
   * try {
   *   PromptService.validatePromptRequest({ text: "Hello world" });
   * } catch (error) {
   *   console.error(error.message);
   * }
   * @developerNote This validation ensures consistent prompt formatting and prevents oversized requests.
   */
  private static validatePromptRequest(request: PromptRequest): void {
    if (!request?.text || typeof request.text !== 'string') {
      throw new Error('Invalid prompt provided');
    }

    const trimmedText = request.text.trim();
    if (trimmedText.length === 0) {
      throw new Error('Prompt cannot be empty');
    }

    if (request.text.length > this.MAX_PROMPT_LENGTH) {
      throw new Error('Prompt exceeds maximum length limit');
    }
  }

  /**
   * Validates provider name format and structure.
   * @param providerName - The name of the AI provider to validate.
   * @throws {Error} When name is empty, invalid type, or fails regex pattern.
   * @example
   * try {
   *   PromptService.validateProviderName("openai");
   * } catch (error) {
   *   console.error(error.message);
   * }
   * @developerNote Ensures provider names are URL-safe and follow naming conventions.
   */
  private static validateProviderName(providerName: string): void {
    if (!providerName || typeof providerName !== 'string') {
      throw new Error('Provider name must be a non-empty string');
    }

    if (providerName.trim().length === 0) {
      throw new Error('Provider name cannot be empty');
    }

    if (!this.PROVIDER_NAME_REGEX.test(providerName)) {
      throw new Error('Invalid provider name format');
    }
  }

  /**
   * Type guard to validate AI model objects.
   * @param model - The object to validate as an AI model.
   * @returns True if object is a valid AI model.
   * @example
   * const models = response.data.filter(PromptService.isValidModel);
   * @developerNote Ensures models have required name and provider properties.
   */
  private static isValidModel = (model: any): model is AIModel => {
    return !!(
      model &&
      typeof model.name === 'string' &&
      model.name.length > 0 &&
      typeof model.provider === 'string' &&
      model.provider.length > 0
    );
  };

  /**
   * Type guard to validate AI provider objects.
   * @param provider - The object to validate as an AI provider.
   * @returns True if object is a valid AI provider.
   * @example
   * const providers = response.data.filter(PromptService.isValidProvider);
   * @developerNote Checks provider has valid name and approved status.
   */
  private static isValidProvider = (provider: any): provider is AIProvider => {
    return !!(
      provider &&
      typeof provider.name === 'string' &&
      provider.name.length > 0 &&
      this.VALID_PROVIDER_STATUSES.includes(provider.status)
    );
  };

  /**
   * Handles API errors with user-friendly messages.
   * @param error - The error object from the API response.
   * @throws {Error} With formatted message based on error type.
   * @example
   * try {
   *   await api.post('/endpoint', data);
   * } catch (error) {
   *   PromptService.handleApiError(error);
   * }
   * @developerNote Translates technical errors into user-friendly messages.
   */
  private static handleApiError(error: any): void {
    if (error.response?.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }
    if (error.response?.status === 401) {
      throw new Error('Authentication required. Please check your credentials.');
    }
    if (error.response?.status === 503) {
      throw new Error('AI service temporarily unavailable. Please try again later.');
    }
  }

  /**
   * Handles fetch errors for resource retrieval.
   * @param error - The error object from the fetch request.
   * @param resource - The type of resource being fetched (e.g., "models").
   * @throws {Error} With context-specific error message.
   * @example
   * try {
   *   return await api.get('/models');
   * } catch (error) {
   *   PromptService.handleFetchError(error, 'models');
   * }
   * @developerNote Provides clear error messages for resource fetching failures.
   */
  private static handleFetchError(error: any, resource: string): never {
    if (error.code === 'ECONNABORTED') {
      throw new Error(`Request timeout: Unable to fetch ${resource}`);
    }
    if (error.response?.status === 403) {
      throw new Error(`Access denied: Insufficient permissions to view ${resource}`);
    }
    throw new Error(`Failed to fetch available AI ${resource}`);
  }
}
