/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import axios, {AxiosInstance} from 'axios';

// classes
import PromptFormatter from '~/classes/PromptFormatter';

// types
import type {AIModel} from '~/types';
import type {ConfigMeta} from '~/database/models';
import type {ProviderConfig} from '~/types/providers';
import type {IProvider} from '~/types/interfaces/IProvider';
import type {OutputFormatName} from '~/constants/output-format';
import type {PromptRequest, PromptResponse, ProviderCapabilities} from '~/types/prompt';

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
  public static getProviderSpecificSystemPrompt(formattedPrompt: string, capabilities?: ProviderCapabilities): string {
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
  public async formatPrompt(request: PromptRequest, staticClass: IProvider): Promise<string> {
    return (await PromptFormatter.formatPrompt(request, staticClass)).prompt;
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
  public async formatSystemPrompt(systemPrompt: string, staticClass: IProvider): Promise<string> {
    return PromptFormatter.formatSystemPrompt(systemPrompt, staticClass);
  }

  /**
   * Extracts the response content from a model's response object.
   * Returns the trimmed response content or the original user prompt if no response is found.
   *
   * @param enhancedResponse - The enhanced response generated by the provider
   * @param userPrompt - The original user input prompt as fallback
   * @param staticClass - The class reference for static methods
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
  public async toPromptResponse(enhancedResponse: string, userPrompt: string, staticClass: IProvider): Promise<string> {
    return PromptFormatter.toPromptResponse(enhancedResponse, userPrompt, staticClass);
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
  public async buildSystemPrompt(request: PromptRequest, staticClass: IProvider): Promise<string> {
    return (await PromptFormatter.buildSystemPrompt(request, staticClass)).enhancementPrompt;
  }
}
