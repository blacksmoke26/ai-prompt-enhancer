/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 * @license MIT
 */

// db
import {EnhancementType, UserRole} from '~/database/models';

// utils
import cache from '~/utils/cache';
import {formatSpecificValidation, sanitizeInput, validatePromptRequest} from '~/utils/validation';

// constants
import {OutputFormat, OutputFormatName} from '~/constants/output-format';
import {DEFAULT_FORMATTER_CONFIG, FALLBACK_FORMATS, PROMPT_SEPARATOR} from '~/constants/prompt';

// types
import type {
  FormattedPromptResult,
  PromptFormatterConfig,
  PromptRequest,
  ProviderCapabilities,
  SystemPromptComponents,
} from '~/types/prompt';
import type {IProvider} from '~/types/interfaces/IProvider';

/**
 * A robust, extensible base class for formatting prompts with AI models.
 * Provides standardized formatting, type safety, validation, and provider-specific customization.
 *
 * @example
 * // Basic usage
 * const request: PromptRequest = {
 *   text: 'Write a report about AI trends',
 *   format: OutputFormat.JSON,
 *   userRole: 'analyst',
 *   targetAudience: 'executives',
 *   tone: 'professional'
 * };
 *
 * const formatted = DefaultPromptFormatter.formatPrompt(
 *   request,
 *   ProviderName.OPENAI
 * );
 *
 * @example
 * // Custom formatter implementation
 * class MarketingPromptFormatter extends PromptFormatter {
 *   protected static override getOutputFormat(format: OutputFormat): string {
 *     return `🎯 MARKETING OUTPUT: ${format.toUpperCase()}\n`;
 *   }
 *
 *   public static override formatPrompt(
 *     request: PromptRequest,
 *     providerName: ProviderName
 *   ): string {
 *     const base = super.formatPrompt(request, providerName);
 *     return `✨ MARKETING ENHANCED ✨\n${base}`;
 *   }
 * }
 */
export default abstract class PromptFormatter {
  /**
   * Configuration for this formatter instance.
   * Can be overridden by subclasses or modified at runtime.
   */
  protected static config: PromptFormatterConfig = {...DEFAULT_FORMATTER_CONFIG};

  /**
   * Returns a formatted string representing the selected output format.
   * Uses provider-specific templates when available, falls back to generic format.
   *
   * @param format - The desired output format (defaults to 'markdown')
   * @param providerClass - The class reference for static methods
   * @returns Formatted string indicating the output format with provider context
   *
   * @example
   * // OpenAI with JSON format
   * getOutputFormat(OutputFormat.JSON, ProviderName.OPENAI);
   * // Returns: "Output Format: JSON\nContent-Type: application/json\n..."
   *
   * @example
   * // Generic fallback for unsupported format
   * getOutputFormat('custom' as OutputFormat, ProviderName.OPENAI);
   * // Returns: "Output Format: Plain Text\n"
   */
  protected static getOutputFormat(
    format: OutputFormatName = OutputFormat.MARKDOWN,
    providerClass: IProvider,
  ): string {
    // Validate and normalize format
    const normalizedFormat = Object.values(OutputFormat).includes(format)
      ? format
      : OutputFormat.TEXT;

    // Get provider-specific template if available
    const providerTemplates = providerClass.getFormatTemplates();

    if (providerTemplates?.[normalizedFormat]) {
      return `${providerTemplates[normalizedFormat]}`.concat(PROMPT_SEPARATOR);
    }

    // Fallback to generic format description
    const formatDescription: string = FALLBACK_FORMATS[normalizedFormat] || 'Plain Text - unformatted text content';

    return `Output Format: ${formatDescription}`.concat(PROMPT_SEPARATOR);
  }

  /**
   * Formats metadata fields consistently with validation and sanitization.
   * Ensures consistent formatting across all metadata types.
   *
   * @param label - The metadata field label (e.g., 'User Role', 'Tone')
   * @param value - The metadata value to format
   * @returns Formatted metadata string or empty string if value is invalid
   *
   * @example
   * formatMetadataField('User Role', 'data scientist');
   * // Returns: "User Role: Data Scientist\n"
   *
   * formatMetadataField('Tone', '');
   * // Returns: ""
   */
  protected static formatMetadataField(label: string, value: string | number | undefined | null): string {
    if (!value && value !== 0) return '';

    const sanitizedValue = sanitizeInput(String(value));
    if (!sanitizedValue.trim()) return '';

    // Capitalize label properly
    const formattedLabel = label
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');

    return `${formattedLabel}: ${sanitizedValue}`.concat(PROMPT_SEPARATOR);
  }

  /**
   * Formats a prompt request into a structured, provider-optimized string.
   * Includes validation, sanitization, and provider-specific formatting.
   *
   * @param request - The prompt request object with metadata and text
   * @param providerClass - The class reference for static methods
   * @param config - Optional configuration overrides
   * @returns Formatted prompt string ready for AI processing
   *
   * @example
   * // Complete example with all fields
   * const request: PromptRequest = {
   *   text: 'Analyze Q4 sales data and provide insights',
   *   enhancementType: 'analyze',
   *   format: OutputFormat.JSON,
   *   userRole: 'analyst',
   *   targetAudience: 'executives',
   *   tone: 'professional',
   *   responseLength: 'concise',
   *   customInstructions: 'Focus on revenue growth and market share',
   *   temperature: 0.7,
   *   systemPrompt: 'You are a data analysis expert'
   * };
   *
   * const formatted = formatPrompt(request, ProviderName.OPENAI);
   * // Returns a well-structured prompt with all metadata
   *
   * @example
   * // Minimal example
   * const minimalRequest: PromptRequest = {
   *   text: 'Hello world',
   *   format: OutputFormat.TEXT
   * };
   *
   * const minimalFormatted = formatPrompt(minimalRequest, ProviderName.OPENAI);
   * // Returns basic formatted prompt
   */
  public static async formatPrompt(
    request: PromptRequest,
    providerClass: IProvider,
    config: Partial<PromptFormatterConfig> = {},
  ): Promise<FormattedPromptResult> {
    // Merge configs
    const effectiveConfig = {...this.config, ...config};
    const seperator = effectiveConfig.sectionSeparator || '\n';

    // Validate request if strict mode is enabled
    if (effectiveConfig.strictValidation) {
      validatePromptRequest(request);
    }

    // Sanitize input text
    const sanitizedText = sanitizeInput(request.text);

    // Initialize formatted prompt parts
    const parts: string[] = [];

    // Add output format section
    if (effectiveConfig.includeMetadata) {
      parts.push(this.getOutputFormat(request.format, providerClass));
    }

    // Add metadata fields conditionally
    if (effectiveConfig.includeMetadata) {
      const {name = request.userRole} = (await UserRole.findOne({
        where: {key: request.userRole},
        attributes: ['name'],
        raw: true,
      })) ?? {};

      const metadataFields = [
        {label: 'User Role', value: name},
        {label: 'Target Audience', value: request.targetAudience},
        {label: 'Tone', value: request.tone},
        {label: 'Response Length', value: request.responseLength},
        {label: 'Temperature', value: request.temperature?.toString()},
      ];

      metadataFields.forEach(field => {
        if (field.value) {
          const formatted = this.formatMetadataField(field.label, field.value);
          if (formatted) parts.push(formatted);
        }
      });

      // Handle custom instructions with length limiting
      if (request.customInstructions) {
        let instructions = sanitizeInput(request.customInstructions);
        if (effectiveConfig.maxCustomInstructionsLength &&
          instructions.length > effectiveConfig.maxCustomInstructionsLength) {
          instructions = instructions.substring(0, effectiveConfig.maxCustomInstructionsLength) + '...';
        }
        parts.push(this.formatMetadataField('Custom Instructions', instructions));
      }

      // Handle system prompt
      if (request.systemPrompt) {
        parts.push(this.formatMetadataField('System Context', request.systemPrompt));
      }
    }

    // Add separator if there are metadata parts
    if (parts.length > 0 && effectiveConfig.includeOriginalPrompt) {
      parts.push(effectiveConfig.sectionSeparator || PROMPT_SEPARATOR);
    }

    // Add original prompt
    if (effectiveConfig.includeOriginalPrompt) {
      parts.push(`Original prompt: ${sanitizedText}`.concat(PROMPT_SEPARATOR));
    }

    // Add placeholder for enhanced prompt
    if (effectiveConfig.addPlaceholders) {
      parts.push(seperator + 'Write the enhanced prompt here after\n{{enhanced prompt}}\nBut DO NOT INCLUDE the context in response like: Enhanced Prompt\n');
    }

    // Join all parts with the configured separator
    const formattedPrompt = parts.join(seperator);

    return {
      prompt: formattedPrompt,
      metadata: {
        provider: providerClass.ProviderKey,
        format: request?.format ?? 'markdown',
        originalText: sanitizedText,
        timestamp: new Date().toISOString(),
      },
    };
  }

  /**
   * Formats the system prompt with provider-specific optimizations.
   * Applies sanitization and structure improvements.
   *
   * @param systemPrompt - The raw system prompt to format
   * @param providerClass - The static class of the provider
   * @param capabilities - Optional provider capabilities for optimization
   * @returns Formatted system prompt optimized for the provider
   *
   * @example
   * // Basic formatting
   * formatSystemPrompt('You are a helpful assistant', ProviderName.OPENAI);
   * // Returns: "You are a helpful assistant"
   *
   * @example
   * // With capabilities
   * const capabilities: ProviderCapabilities = {
   *   maxTokens: 4096,
   *   supportsJsonMode: true,
   *   supportsSystemMessages: true
   * };
   *
   * formatSystemPrompt('Generate JSON output', ProviderName.OPENAI, capabilities);
   * // Returns optimized prompt for JSON generation
   */
  public static async formatSystemPrompt(
    systemPrompt: string,
    providerClass: IProvider,
    capabilities?: ProviderCapabilities,
  ): Promise<string> {
    return providerClass.getProviderSpecificSystemPrompt(systemPrompt, capabilities);
  }

  /**
   * Extracts and validates the response content from AI model output.
   * Provides robust fallback mechanisms and content validation.
   *
   * @param enhancedResponse - The raw response from the AI model
   * @param userPrompt - The original user prompt as fallback
   * @param providerClass - The static class of the provider
   * @param format - Expected output format for validation
   * @returns Cleaned and validated response content
   *
   * @example
   * // Valid JSON response
   * toPromptResponse('{"result": "success"}', 'Generate JSON', ProviderName.OPENAI, OutputFormat.JSON);
   * // Returns: '{"result": "success"}'
   *
   * @example
   * // Empty response with fallback
   * toPromptResponse('', 'What is AI?', ProviderName.OPENAI);
   * // Returns: 'What is AI?'
   *
   * @example
   * // Invalid JSON with validation
   * toPromptResponse('invalid json', 'Generate JSON', ProviderName.OPENAI, OutputFormat.JSON);
   * // Returns: 'Generate JSON' (fallback due to invalid format)
   */
  public static async toPromptResponse(
    enhancedResponse: string,
    userPrompt: string,
    providerClass: IProvider,
    format?: OutputFormatName,
  ): Promise<string> {
    try {
      let response = String(enhancedResponse || '').trim();

      // Handle empty responses
      if (!response) {
        return sanitizeInput(userPrompt);
      }

      // Format-specific validation
      if (format) {
        const sanitized = formatSpecificValidation(format, response, userPrompt);
        if (sanitized !== null) return sanitized;
      }

      // Sanitize the final response
      return sanitizeInput(response);

    } catch (error) {
      console.error('Error processing prompt response:', error);
      return sanitizeInput(userPrompt);
    }
  }

  /**
   * Builds the system prompt by combining role-specific and enhancement-based prompts.
   * Uses caching for performance and includes error handling with fallbacks.
   *
   * @param request - The prompt request containing configuration
   * @param providerClass - The static class for the provider
   * @returns Promise resolving to the constructed system prompt
   *
   * @example
   * // Successful database lookup
   * const request = {
   *   enhancementType: 'enhance',
   *   userRole: 'admin'
   * };
   * const prompt = await buildSystemPrompt(request, ProviderName.OPENAI);
   * // Returns combined system prompt from database
   *
   * @example
   * // Fallback when database fails
   * const failingRequest = {
   *   enhancementType: 'invalid_type',
   *   userRole: 'invalid_role'
   * };
   * const fallbackPrompt = await buildSystemPrompt(failingRequest, ProviderName.OPENAI);
   * // Returns default fallback prompts
   */
  public static async buildSystemPrompt(
    request: PromptRequest,
    providerClass: IProvider,
  ): Promise<SystemPromptComponents> {
    const cacheKey = `system_prompt_${request.enhancementType}_${request.userRole}`;

    try {
      // Check cache first
      const cached = await cache.get<SystemPromptComponents>(cacheKey);
      if (cached) {
        return cached;
      }

      // Fetch prompts from database with timeouts
      const [typeRecord, userRecord] = await Promise.all([
        EnhancementType.findOne({
          attributes: ['systemPrompt', 'key'],
          where: {key: request.enhancementType},
          raw: true,
        }).catch(() => null),

        UserRole.findOne({
          attributes: ['systemPrompt', 'key'],
          where: {key: request.userRole},
          raw: true,
        }).catch(() => null),
      ]);

      const providerDefaults = providerClass.DefaultPrompts;
      const systemPrompt = typeRecord?.systemPrompt || providerDefaults.system;
      const rolePrompt = userRecord?.systemPrompt || providerDefaults.role;

      const combinedPrompt = `${rolePrompt.trim()} ${systemPrompt.trim()}`.replace(/\s+/g, ' ');

      const result: SystemPromptComponents = {
        fullPrompt: combinedPrompt,
        rolePrompt: rolePrompt,
        enhancementPrompt: systemPrompt,
        source: {
          enhancementType: typeRecord?.key || 'default',
          userRole: userRecord?.key || 'default',
          fallbackUsed: !typeRecord || !userRecord,
        },
      };

      // Cache the result
      await cache.set(cacheKey, result, 3600); // Cache for 1 hour

      return result;

    } catch (error) {
      console.error('Error building system prompt:', error);

      // Safe fallback
      const fallbackPrompt = 'You are a helpful AI assistant. Enhance the user\'s prompt while maintaining its original intent and context.';

      return {
        fullPrompt: fallbackPrompt,
        rolePrompt: fallbackPrompt,
        enhancementPrompt: fallbackPrompt,
        source: {
          enhancementType: 'fallback',
          userRole: 'fallback',
          fallbackUsed: true,
        },
      };
    }
  }

  /**
   * Sets the configuration for the formatter.
   * Allows runtime customization of formatting behavior.
   *
   * @param newConfig - Configuration object to merge with current config
   *
   * @example
   * // Customize formatter behavior
   * PromptFormatter.setConfig({
   *   includeMetadata: false,
   *   sectionSeparator: '---\n'
   * });
   */
  public static setConfig(newConfig: Partial<PromptFormatterConfig>): void {
    this.config = {...this.config, ...newConfig};
  }
}
