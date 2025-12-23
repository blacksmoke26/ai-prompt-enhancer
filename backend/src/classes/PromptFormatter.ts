/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// db
import {EnhancementType, UserRole} from '~/database/models';

// constants
import {ProviderName} from '~/constants/providers';

// types
import type {PromptRequest} from '~/types';

/**
 * A constant object defining available output formats, used for selecting or displaying different data formats.
 * @example
 * console.log(OUTPUT_FORMATS.json); // Outputs: "JSON"
 */
export const OUTPUT_FORMATS: Record<string, string> = {
  /**
   * JSON format, representing structured data in key-value pairs.
   */
  json: 'JSON',

  /**
   * Markdown format, used for formatting text with headers, lists, and other syntax.
   */
  markdown: 'Markdown',

  /**
   * Plain text format, representing unstructured, raw text.
   */
  text: 'Plain Text',
};

/**
 * An abstract base class for formatting prompts with customizable output formats and metadata.
 * Subclasses must implement abstract methods to define specific formatting logic.
 * @example
 * class CustomPromptFormatter extends PromptFormatter {
 *   formatPrompt(request: PromptRequest): string {
 *     // Custom implementation
 *   }
 * }
 */
export default abstract class PromptFormatter {
  /**
   * Returns a formatted string representing the selected output format, defaulting to `'Markdown'` if the format is not recognized.
   * @example
   * getOutputFormat('json') // returns "Output Format: JSON\n"
   * getOutputFormat('unknown') // returns "Output Format: Markdown\n"
   * @param {string} [format] - The desired output format key (e.g., 'json', 'markdown', 'text').
   * @returns {string} - A formatted string indicating the selected output format.
   */
  protected static getOutputFormat(format: string = 'markdown'): string {
    const outputFormat = OUTPUT_FORMATS?.[format] ?? OUTPUT_FORMATS.markdown;
    return `Output Format: ${outputFormat}\n`;
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
   * @param providerName - The name of the provider
   * @returns {string} - A formatted string representing the prompt with metadata and the original text.
   */
  public static formatPrompt(request: PromptRequest, providerName: ProviderName | string): string {
    let formattedPrompt = this.getOutputFormat(request.format);

    // Add user role context if specified
    if (request.userRole) {
      formattedPrompt += `User Role: ${request.userRole}\n`;
    }

    // Add target audience if specified
    if (request.targetAudience) {
      formattedPrompt += `Target Audience: ${request.targetAudience}\n`;
    }

    // Add desired tone if specified
    if (request.tone) {
      formattedPrompt += `Tone: ${request.tone}\n`;
    }

    // Add response length if specified
    if (request.responseLength) {
      formattedPrompt += `Response Length: ${request.responseLength}\n`;
    }

    // Add custom instructions if specified
    if (request.customInstructions) {
      formattedPrompt += `Custom Instructions: ${request.customInstructions}\n`;
    }

    // Add temperature if specified
    if (request.temperature !== undefined) {
      formattedPrompt += `Temperature: ${request.temperature}\n`;
    }

    // Add system prompt if specified
    if (request.systemPrompt) {
      formattedPrompt += `System Context: ${request.systemPrompt}\n`;
    }

    formattedPrompt += `\nOriginal prompt: ${request.text}\n\n{{enhanced prompt}}`;

    return formattedPrompt;
  }

  /**
   * Formats the system prompt (placeholder implementation; returns input as-is).
   * @param systemPrompt - The raw system prompt string to be formatted.
   * @param providerName - The name of the provider
   * @returns The formatted system prompt (identical to input in this implementation).
   * @example
   * const formattedPrompt = formatSystemPrompt("You are a helpful assistant.");
   * // Output: "You are a helpful assistant."
   * @note This method is a no-op by default and should be overridden in subclasses to implement custom formatting logic.
   */
  public static formatSystemPrompt(systemPrompt: string, providerName: ProviderName | string): string {
    return systemPrompt;
  }

  /**
   * Extracts the response content from a model's response object.
   * Returns the trimmed response content or the original user prompt if no response is found.
   *
   * @param enhancedResponse - The enhanced response generated by the provider
   * @param userPrompt - The original user input prompt as fallback
   * @param providerName - The name of the provider
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
  public static toPromptResponse(enhancedResponse: string, userPrompt: string, providerName: ProviderName | string): string {
    return String(enhancedResponse || '')?.trim?.() || userPrompt;
  }

  /**
   * Builds the system prompt by combining role-specific and enhancement-based prompts.
   * Combines `rolePrompt` and `systemPrompt` from the request, with fallbacks if fields are missing.
   * @param request - The request object containing prompt configuration.
   * @param providerName - The name of the provider
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
  public static async buildSystemPrompt(request: PromptRequest, providerName: ProviderName | string): Promise<string> {
    const typeRecord = await EnhancementType.findOne({
      attributes: ['systemPrompt'],
      where: {key: request.enhancementType},
      raw: true,
    });

    const userRecord = await UserRole.findOne({
      attributes: ['systemPrompt'],
      where: {key: request.userRole},
      raw: true,
    });

    const systemPrompt = typeRecord?.systemPrompt || 'You are a grammar and spelling expert. Correct any grammatical errors, spelling mistakes, and improve the clarity of the given prompt while preserving the original intent.';
    const rolePrompt = userRecord?.systemPrompt || 'You are a helpful AI assistant. Provide clear, accurate, and useful responses to enhance the user\'s prompt.';

    return `${rolePrompt} ${systemPrompt}`;
  }
}
