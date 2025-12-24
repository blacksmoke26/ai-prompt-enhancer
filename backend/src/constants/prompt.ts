/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// constants
import {OutputFormat} from '~/constants/output-format';

// types
import type {PromptFormatterConfig} from '~/types/prompt';

export const PROMPT_SEPARATOR = `\n`;

/**
 * Default configuration values for prompt formatting.
 * Provides sensible defaults while allowing overrides.
 */
export const DEFAULT_FORMATTER_CONFIG: PromptFormatterConfig = {
  includeMetadata: true,
  includeOriginalPrompt: true,
  addPlaceholders: true,
  strictValidation: false,
  sectionSeparator: '\n',
  maxCustomInstructionsLength: 500,
};

/**
 * Provides fallback format descriptions for each supported output format, used for UI or documentation purposes.
 * @example
 * FALLBACK_FORMATS[OutputFormat.JSON]; // Returns 'JSON (JavaScript Object Notation) - structured data format'
 * @developerNotes The keys are derived from the `OutputFormat` enum, and the values are human-readable descriptions intended for display, not validation.
 */
export const FALLBACK_FORMATS: Record<string, string> = {
  [OutputFormat.JSON]: 'JSON (JavaScript Object Notation) - structured data format',
  [OutputFormat.MARKDOWN]: 'Markdown - lightweight markup language',
  [OutputFormat.TEXT]: 'Plain Text - unformatted text content',
  [OutputFormat.HTML]: 'HTML (HyperText Markup Language) - web content format',
  [OutputFormat.XML]: 'XML (eXtensible Markup Language) - structured data format',
  [OutputFormat.YAML]: 'YAML (YAML Ain\'t Markup Language) - human-readable data format',
};
