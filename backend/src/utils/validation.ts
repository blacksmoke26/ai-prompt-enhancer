/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @license MIT
 * @description Validation and sanitization utilities for prompt processing
 */

import Joi from 'joi';

// constants
import {OUTPUT_FORMAT_NAMES, OutputFormat, OutputFormatName} from '~/constants/output-format';

// types
import type {PromptRequest, ValidationResult, ValidationRule} from '~/types/prompt';
import {TONES} from '~/constants/tones';
import {RESPONSE_LENGTH} from '~/constants/response-length';

/**
 * Validates prompt request parameters for AI model interactions.
 * @example
 * { text: "Hello world", model: "gpt-4", enhancementType: "enhance" }
 * @developer_note
 * Use this schema to validate user input before sending to AI models.
 */
export const promptRequestSchema = Joi.object({
  text: Joi.string().required().min(1).max(10000),
  model: Joi.string().required(),
  systemPrompt: Joi.string().optional().max(2000),
  temperature: Joi.number().optional().min(0).max(2).default(0.7),
  maxTokens: Joi.number().optional().min(1).max(8000).default(2000),
  enhancementType: Joi.string().optional().valid('correct', 'enhance', 'proofread', 'optimize', 'creative', 'technical', 'concise', 'structured', 'audience', 'tone', 'length', 'simplify', 'expand', 'format').default('enhance'),
  userRole: Joi.string().optional().valid('general', 'developer', 'writer', 'researcher', 'marketer', 'educator', 'business', 'designer').default('general'),
  targetAudience: Joi.string().optional().max(500),
  tone: Joi.string().optional().valid('formal', 'casual', 'professional', 'friendly', 'academic', 'creative', 'technical').max(100),
  responseLength: Joi.string().optional().valid('short', 'medium', 'long', 'custom'),
  customInstructions: Joi.string().optional().max(1000),
});

/**
 * Validates history item updates including ratings and notes.
 * @example
 * { rating: 5, notes: "Excellent response" }
 * @developer_note
 * All fields are optional - send only those you want to update.
 */
export const historyUpdateSchema = Joi.object({
  rating: Joi.number().min(1).max(5).optional(),
  notes: Joi.string().max(1000).optional(),
});

/**
 * Validates export request parameters for data export functionality.
 * @example
 * { format: "json", limit: 100 }
 * @developer_note
 * If no limit is provided, all items will be exported.
 */
export const exportSchema = Joi.object({
  format: Joi.string().valid('json', 'csv', 'txt').default('json'),
  limit: Joi.number().min(1).max(10000).optional(),
});

/**
 * Regular expression patterns for common validation scenarios
 * @constant
 * @example
 * // Email validation
 * const isValidEmail = REGEX_PATTERNS.EMAIL.test('user@example.com');
 */
export const REGEX_PATTERNS = {
  /** Email format validation */
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,

  /** URL format validation */
  URL: /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/,

  /** Basic text sanitization (removes potentially dangerous characters) */
  SAFE_TEXT: /[<>&"']/g,

  /** Alphanumeric with basic punctuation */
  ALPHANUMERIC: /^[a-zA-Z0-9\s.,!?()-_]+$/,

  /** Temperature range validation (0.0 to 2.0) */
  TEMPERATURE: /^(?:[01](?:\.\d{1,2})?|2(?:\.0{1,2})?)$/,
};

/**
 * Default validation rules for PromptRequest fields
 * @constant
 * @example
 * const rules = DEFAULT_VALIDATION_RULES.text;
 * // { required: true, maxLength: 2000, pattern: REGEX_PATTERNS.ALPHANUMERIC }
 */
export const DEFAULT_VALIDATION_RULES: Record<keyof PromptRequest | string, ValidationRule> = {
  text: {
    required: true,
    maxLength: 4000,
    minLength: 1,
    pattern: null,
    errorMessage: 'Prompt text must be between 1 and 4000 characters',
  },
  format: {
    required: false,
    allowedValues: OUTPUT_FORMAT_NAMES,
    errorMessage: 'Invalid output format specified',
  },
  userRole: {
    required: false,
    maxLength: 50,
    pattern: /^[a-zA-Z0-9_-]+$/,
    errorMessage: 'User role must be alphanumeric with underscores and hyphens',
  },
  targetAudience: {
    required: false,
    maxLength: 100,
    pattern: REGEX_PATTERNS.ALPHANUMERIC,
    errorMessage: 'Target audience contains invalid characters',
  },
  tone: {
    required: false,
    maxLength: 50,
    pattern: /^[a-zA-Z\s-]+$/,
    allowedValues: TONES,
    errorMessage: 'Tone must be alphabetic with spaces and hyphens',
  },
  responseLength: {
    required: false,
    allowedValues: RESPONSE_LENGTH,
    errorMessage: 'Invalid response length specified',
  },
  customInstructions: {
    required: false,
    maxLength: 1000,
    errorMessage: 'Custom instructions must not exceed 1000 characters',
  },
  temperature: {
    required: false,
    min: 0.0,
    max: 2.0,
    pattern: REGEX_PATTERNS.TEMPERATURE,
    errorMessage: 'Temperature must be between 0.0 and 2.0',
  },
  systemPrompt: {
    required: false,
    maxLength: 2000,
    errorMessage: 'System prompt must not exceed 2000 characters',
  },
  enhancementType: {
    required: false,
    maxLength: 50,
    pattern: /^[a-zA-Z0-9_-]+$/,
    errorMessage: 'Enhancement type must be alphanumeric with underscores and hyphens',
  },
};

/**
 * Validates a PromptRequest object against defined rules
 * @param request - The prompt request to validate
 * @param rules - Optional custom validation rules (defaults to DEFAULT_VALIDATION_RULES)
 * @throws {ValidationError} If validation fails
 * @returns {boolean} True if validation passes
 *
 * @example
 * // Basic validation
 * const request = { text: 'Hello world', format: 'json' };
 * validatePromptRequest(request); // returns true
 *
 * @example
 * // Validation failure
 * const invalidRequest = { text: '', format: 'invalid' };
 * validatePromptRequest(invalidRequest); // throws ValidationError
 */
export function validatePromptRequest(
  request: PromptRequest,
  rules: Partial<Record<keyof PromptRequest, ValidationRule>> = DEFAULT_VALIDATION_RULES,
): boolean {
  const errors: string[] = [];

  // Validate each field according to rules
  (Object.keys(rules) as Array<keyof PromptRequest>).forEach(field => {
    const rule = rules[field];
    const value = request[field];

    if (!rule) return;

    try {
      validateField(field as keyof PromptRequest, value, rule);
    } catch (error) {
      errors.push((error as Error).message);
    }
  });

  if (errors.length > 0) {
    throw new ValidationError(`Validation failed:\n${errors.join('\n')}`);
  }

  return true;
}

/**
 * Validates a single field against validation rules
 * @param field - The field name being validated
 * @param value - The value to validate
 * @param rule - Validation rules for this field
 * @throws {ValidationError} If validation fails for this field
 */
function validateField<T extends keyof PromptRequest>(
  field: T,
  value: PromptRequest[T],
  rule: ValidationRule,
): void {
  // Required field validation
  if (rule.required && (value === undefined || value === null || value === '')) {
    throw new ValidationError(`${field} is required`);
  }

  // Skip further validation if value is empty and not required
  if (!rule.required && (value === undefined || value === null || value === '')) {
    return;
  }

  // Type guard for string values
  const stringValue = String(value).trim();

  // Max length validation
  if (rule.maxLength !== undefined && stringValue.length > rule.maxLength) {
    throw new ValidationError(`${field} must not exceed ${rule.maxLength} characters`);
  }

  // Min length validation
  if (rule.minLength !== undefined && stringValue.length < rule.minLength) {
    throw new ValidationError(`${field} must be at least ${rule.minLength} characters`);
  }

  // Pattern validation
  if (rule.pattern instanceof RegExp && !rule.pattern.test(stringValue)) {
    throw new ValidationError(rule.errorMessage || `${field} contains invalid characters`);
  }

  // Allowed values validation
  if (rule.allowedValues && !rule.allowedValues.includes(stringValue)) {
    throw new ValidationError(rule.errorMessage || `${field} must be one of: ${rule.allowedValues.join(', ')}`);
  }

  // Numeric range validation (for temperature)
  if ((field === 'temperature' || rule.min !== undefined || rule.max !== undefined) && !isNaN(parseFloat(stringValue))) {
    const numValue = parseFloat(stringValue);
    if (rule.min !== undefined && numValue < rule.min) {
      throw new ValidationError(`${field} must be at least ${rule.min}`);
    }
    if (rule.max !== undefined && numValue > rule.max) {
      throw new ValidationError(`${field} must not exceed ${rule.max}`);
    }
  }
}

/**
 * Sanitizes input text to prevent XSS and other security issues
 * @param input - The input string to sanitize
 * @param options - Sanitization options
 * @returns {string} Sanitized string
 *
 * @example
 * // Basic sanitization
 * sanitizeInput('<script>alert("xss")</script>Hello & Welcome!');
 * // Returns: '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;Hello &amp; Welcome!'
 *
 * @example
 * // With custom options
 * sanitizeInput('Hello <b>World</b>', { allowedTags: ['b', 'i'] });
 * // Returns: 'Hello <b>World</b>'
 */
export interface SanitizeOptions {
  /** Whether to escape HTML entities */
  escapeHtml?: boolean;

  /** Allowed HTML tags (if not escaping HTML) */
  allowedTags?: string[];

  /** Whether to remove control characters */
  removeControlChars?: boolean;
}

export function sanitizeInput(input: string | null | undefined, options: SanitizeOptions = {}): string {
  if (!input) return '';

  let sanitized = String(input).replaceAll('{{enhanced prompt}}', '');

  const {
    escapeHtml = true,
    allowedTags = [],
    removeControlChars = true,
  } = options;

  // Remove control characters (ASCII 0-31 except tab, newline, carriage return)
  if (removeControlChars) {
    sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '');
  }

  // HTML escaping
  if (escapeHtml) {
    sanitized = sanitized
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  } else if (allowedTags.length > 0) {
    // Allow specific HTML tags if not escaping
    const allowedPattern = new RegExp(`<(?!\/?(${allowedTags.join('|')})[^>]*>)`, 'g');
    sanitized = sanitized.replace(allowedPattern, '');
  }

  // Trim whitespace
  sanitized = sanitized.trim();

  return sanitized;
}

/**
 * Custom validation error class
 * @extends Error
 */
export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

/**
 * Validates and normalizes temperature value
 * @param temp - Temperature value to validate
 * @returns {number} Normalized temperature value
 * @throws {ValidationError} If temperature is invalid
 *
 * @example
 * validateTemperature(0.7); // returns 0.7
 * validateTemperature('1.5'); // returns 1.5
 * validateTemperature(3.0); // throws ValidationError
 */
export function validateTemperature(temp: string | number | undefined): number | undefined {
  if (temp === undefined || temp === null || temp === '') {
    return undefined;
  }

  const numTemp = typeof temp === 'string' ? parseFloat(temp) : temp;

  if (isNaN(numTemp)) {
    throw new ValidationError('Temperature must be a valid number');
  }

  if (numTemp < 0 || numTemp > 2.0) {
    throw new ValidationError('Temperature must be between 0.0 and 2.0');
  }

  return parseFloat(numTemp.toFixed(2)); // Round to 2 decimal places
}

/**
 * Batch validates multiple prompt requests
 * @param requests - Array of prompt requests to validate
 * @returns {ValidationResult} Object containing validation results
 *
 * @example
 * const results = validateMultipleRequests([
 *   { text: 'Valid prompt' },
 *   { text: '' },
 *   { text: 'Another valid prompt', temperature: 1.5 }
 * ]);
 *
 * console.log(results.validCount); // 2
 * console.log(results.invalidCount); // 1
 */
export function validateMultipleRequests(requests: PromptRequest[]): ValidationResult {
  const validRequests: PromptRequest[] = [];
  const invalidRequests: Array<{ request: PromptRequest; errors: string[] }> = [];

  requests.forEach(request => {
    try {
      validatePromptRequest(request);
      validRequests.push(request);
    } catch (error) {
      invalidRequests.push({
        request,
        errors: [(error as Error).message],
      });
    }
  });

  return {
    validCount: validRequests.length,
    invalidCount: invalidRequests.length,
    validRequests,
    invalidRequests,
    isValid: invalidRequests.length === 0,
    errors: invalidRequests.flatMap(item => item.errors),
  };
}

/**
 * Validates the response against the specified output format. Returns a sanitized user prompt if validation fails for formats other than TEXT.
 * @example
 * formatSpecificValidation(OutputFormat.JSON, '{"invalid":', 'Fallback content'); // Returns sanitized 'Fallback content'
 * @developerNotes This function performs basic syntactic checks and is not a full parser. For stricter validation, consider using dedicated libraries.
 */
export const formatSpecificValidation = (format: OutputFormatName | undefined, response: string, userPrompt: string): string | null => {
  switch (format) {
    case OutputFormat.JSON: {
      try {
        // Attempt to parse JSON to validate it
        JSON.parse(response);
      } catch (e) {
        console.warn('Invalid JSON response received, falling back to user prompt');
        return sanitizeInput(userPrompt);
      }
      return null;
    }

    case OutputFormat.HTML: {
      // Basic HTML validation: check for common root-level tags
      if (!/<html|<body|<div|<p|<h[1-6]|<span|<section/i.test(response)) {
        console.warn('Response may not be valid HTML, proceeding with caution');
      }
      return null;
    }

    case OutputFormat.XML: {
      // Basic XML validation: check for XML declaration or root tag
      if (!/^<\?xml|<[^>]+>/i.test(response.trim())) {
        console.warn('Response may not be valid XML, proceeding with caution');
      }
      return null;
    }

    case OutputFormat.YAML: {
      // YAML is hard to validate strictly without a parser,
      // but we can check for common scalar or mapping indicators
      const trimmed = response.trim();
      if (
        !trimmed ||
        trimmed.startsWith('---') || // document start
        /^[a-zA-Z_][a-zA-Z0-9_]*\s*:/.test(trimmed) || // key-like start
        /^- /.test(trimmed) || // list item
        /^[{}[\]]/.test(trimmed) // looks like JSON (also valid YAML)
      ) {
        // Acceptable YAML-like structure; no warning
      } else {
        console.warn('Response may not be valid YAML, proceeding with caution');
      }
      return null;
    }

    case OutputFormat.MARKDOWN: {
      // Markdown is inherently permissive; check for common syntax
      const hasMarkdownSyntax = /\*\*|__|##|# |\* |- |\[.*]\(.*\)|`/.test(response);
      if (!hasMarkdownSyntax && !/^\s*$/.test(response)) {
        console.warn('Response lacks typical Markdown syntax, proceeding with caution');
      }
      return null;
    }

    case OutputFormat.TEXT: {
      // Plain text requires no validation—always acceptable
      // No-op: text is assumed valid by default
      return null;
    }

    default: {
      // Should not occur due to enum usage, but safe fallback
      console.warn('Unknown output format specified, treating as plain text');
      return null;
    }
  }
};

// Type exports for convenience
export type {
  ValidationRule,
  ValidationResult,
  ValidationError as ValidationErrorClass,
};
