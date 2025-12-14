/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import axios, {AxiosInstance} from 'axios';

// types
import type {ConfigMeta} from '~/database/models';
import type {PromptRequest, PromptResponse, AIModel} from '~/types';

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
    this.client = axios.create({
      baseURL: config?.baseUrl,
      timeout: config?.timeout ?? 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
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
}
