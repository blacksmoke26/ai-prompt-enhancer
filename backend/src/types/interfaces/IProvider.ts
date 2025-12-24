/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 * @license MIT
 */

// types
import type {ProviderConfig} from '~/types/providers';
import type {PromptRequest, ProviderCapabilities} from '~/types/prompt';
import type {OutputFormatName} from '~/constants/output-format';

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
 * Represents a provider that can be instantiated with any arguments, returning an instance of any type.
 * Typically used to define classes that act as providers for services or dependencies.
 * @developer Note: The `new` method is a constructor function. Implementations should ensure correct type handling.
 */
export interface IProvider {
  new(...args: any[]): any;

  /**
   * A static constant representing the unique identifier for the provider, typically used in internal systems or API integrations.
   * @developerNotes Ensure the ID is lowercase and matches the provider's official identifier.
   */
  readonly ProviderID: string;

  /**
   * A static constant representing the display name or key used for referencing the provider in user-facing contexts.
   * @developerNotes This value should match the provider's official branding.
   */
  readonly ProviderKey: string;

  /**
   * A static constant representing the full, official name of the provider, typically used for documentation or identification purposes.
   * @developerNotes Ensure consistency with the provider's official name and use proper casing.
   */
  readonly ProviderName: string;

  /**
   * A static constant representing the default prompts used by the provider.
   * @developerNotes These prompts should be tailored to the specific needs of the provider and should be updated as needed.
   */
  readonly DefaultPrompts: ProviderDefaultPrompt;

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
  readonly ProviderConfig: ProviderConfig;

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
  getProviderSpecificSystemPrompt(formattedPrompt: string, capabilities?: ProviderCapabilities): string;

  /**
   * Returns a mapping of predefined output format names to their corresponding instruction templates.
   * These templates guide the response generation process for different output formats (e.g., JSON, Markdown).
   * @example {
   *   [OutputFormat.JSON]: "Output Format: JSON\nResponse Format: JSON\nEnsure the response is valid JSON with proper escaping and structure.",
   *   [OutputFormat.TEXT]: "Output Format: Plain Text\nResponse Format: Text\nProvide clear, concise plain text output."
   * }
   * @developerNotes This method should be implemented by subclasses to provide format-specific instructions. Ensure `OutputFormat` is defined to validate keys in the returned object.
   */
  getFormatTemplates(): Record<OutputFormatName, string>;

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
  formatPrompt(request: PromptRequest, staticClass: object): Promise<string>;

  /**
   * Formats the system prompt (placeholder implementation; returns input as-is).
   * @param systemPrompt - The raw system prompt string to be formatted.
   * @param capabilities - Optional provider capabilities for optimization
   * @returns The formatted system prompt (identical to input in this implementation).
   * @example
   * const formattedPrompt = formatSystemPrompt("You are a helpful assistant.");
   * // Output: "You are a helpful assistant."
   * @note This method is a no-op by default and should be overridden in subclasses to implement custom formatting logic.
   */
  formatSystemPrompt(systemPrompt: string, capabilities?: ProviderCapabilities): Promise<string>;
}
