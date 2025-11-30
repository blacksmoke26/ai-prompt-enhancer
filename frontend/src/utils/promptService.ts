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
export const promptService = {
  /**
   * Enhances a given prompt using AI to improve its clarity and effectiveness.
   * @param request - The prompt enhancement request containing original prompt and preferences.
   * @returns Promise resolving to the enhanced prompt response.
   * @throws {Error} When the request is invalid or enhancement fails.
   * @example
   * const enhanced = await promptService.enhancePrompt({
   *   prompt: "Explain quantum computing",
   *   model: "gpt-4"
   * });
   * @developerNote Ensure the request object contains all required fields for successful enhancement.
   */
  async enhancePrompt(request: PromptRequest): Promise<PromptResponse> {
    try {
      // Validate request
      if (!request || !request.text || typeof request.text !== 'string') {
        throw new Error('Invalid prompt provided');
      }

      if (request.text.trim().length === 0) {
        throw new Error('Prompt cannot be empty');
      }

      if (request.text.length > 10000) {
        throw new Error('Prompt exceeds maximum length limit');
      }

      const response = await api.post('/prompts/enhance', {
        ...request,
        prompt: request.text.trim(),
        timestamp: new Date().toISOString(),
      });

      // Validate response
      if (!response.data || !response.data.enhancedPrompt) {
        throw new Error('Invalid response received from enhancement service');
      }

      return response.data;
    } catch (error: any) {
      // Handle specific error cases
      if (error.response?.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }
      if (error.response?.status === 401) {
        throw new Error('Authentication required. Please check your credentials.');
      }
      if (error.response?.status === 503) {
        throw new Error('AI service temporarily unavailable. Please try again later.');
      }
      throw error;
    }
  },

  /**
   * Retrieves all available AI models for prompt enhancement.
   * @returns Promise resolving to an array of AI model objects.
   * @throws {Error} When unable to fetch models.
   * @example
   * const models = await promptService.getModels();
   * console.log(models); // [{ name: "gpt-4", provider: "openai", ... }]
   * @developerNote This endpoint may require authentication for certain models.
   */
  async getModels(): Promise<AIModel[]> {
    try {
      const response = await api.get('/prompts/models', {
        timeout: 10000, // 10 second timeout
      });

      // Validate response structure
      if (!Array.isArray(response.data)) {
        throw new Error('Invalid response format: expected array of models');
      }

      // Filter and validate models
      return response.data.filter(model =>
        model &&
        typeof model.name === 'string' &&
        model.name.length > 0 &&
        typeof model.provider === 'string' &&
        model.provider.length > 0
      );
    } catch (error: any) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('Request timeout: Unable to fetch models');
      }
      if (error.response?.status === 403) {
        throw new Error('Access denied: Insufficient permissions to view models');
      }
      throw new Error('Failed to fetch available AI models');
    }
  },

  /**
   * Retrieves all available AI providers.
   * @returns Promise resolving to an array of AI provider objects.
   * @throws {Error} When unable to fetch providers.
   * @example
   * const providers = await promptService.getProviders();
   * console.log(providers); // [{ name: "openai", status: "active", ... }]
   * @developerNote Providers may have different rate limits and capabilities.
   */
  async getProviders(): Promise<AIProvider[]> {
    try {
      const response = await api.get('/prompts/providers', {
        timeout: 10000, // 10 second timeout
      });

      // Validate response structure
      if (!Array.isArray(response.data)) {
        throw new Error('Invalid response format: expected array of providers');
      }

      // Filter and validate providers
      return response.data.filter(provider =>
        provider &&
        typeof provider.name === 'string' &&
        provider.name.length > 0 &&
        ['active', 'inactive', 'degraded'].includes(provider.status)
      );
    } catch (error: any) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('Request timeout: Unable to fetch providers');
      }
      if (error.response?.status === 403) {
        throw new Error('Access denied: Insufficient permissions to view providers');
      }
      throw new Error('Failed to fetch available AI providers');
    }
  },

  /**
   * Tests if a specific AI provider is currently available and functional.
   * @param providerName - The name of the provider to test.
   * @returns Promise resolving to an object containing provider status.
   * @throws {Error} When provider name is invalid or test fails.
   * @example
   * const status = await promptService.testProvider("openai");
   * console.log(status.available); // true/false
   * @developerNote This performs a lightweight health check - not a full capability test.
   */
  async testProvider(providerName: string): Promise<{ providerName: string; available: boolean; lastChecked: string }> {
    try {
      // Validate provider name
      if (!providerName || typeof providerName !== 'string') {
        throw new Error('Provider name must be a non-empty string');
      }

      if (providerName.trim().length === 0) {
        throw new Error('Provider name cannot be empty');
      }

      if (!/^[a-zA-Z0-9_-]+$/.test(providerName)) {
        throw new Error('Invalid provider name format');
      }

      const response = await api.post(`/prompts/providers/${encodeURIComponent(providerName)}/test`, null, {
        timeout: 15000, // 15 second timeout for health check
      });

      // Validate response structure
      if (!response.data || typeof response.data.available !== 'boolean') {
        throw new Error('Invalid response from provider health check');
      }

      return {
        providerName: providerName,
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
          providerName: providerName,
          available: false,
          lastChecked: new Date().toISOString(),
        };
      }
      throw error;
    }
  },
};
