/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

/**
 * Enum representing supported output formats for AI responses.
 * Provides type safety and easy maintenance when adding new formats.
 * @example
 * // Using the enum
 * const format = OutputFormat.JSON;
 * console.log(format); // 'json'
 *
 * // Checking available formats
 * const isSupported = Object.values(OutputFormat).includes('xml');
 */
export const OutputFormat = {
  JSON: 'json',
  MARKDOWN: 'markdown',
  TEXT: 'text',
  HTML: 'html',
  XML: 'xml',
  YAML: 'yaml',
};

/**
 * Represents the possible output formats as keys of the `OutputFormat` enum.
 * @example
 * type Example = OutputFormatName; // 'JSON', 'HTML', 'XML', etc.
 * @developerNotes This type is automatically generated from the `OutputFormat` enum and ensures type safety when working with format keys.
 */
export const OUTPUT_FORMAT_NAMES = Object.values(OutputFormat);

/**
 * Represents the possible output format names as keys of the `OutputFormat` enum.
 * @example
 * type Example = OutputFormatName; // 'JSON', 'HTML', 'XML', etc.
 * @developerNotes This type is automatically generated from the `OutputFormat` enum and ensures type safety when working with format keys.
 */
export type OutputFormatName =
  | 'json'
  | 'markdown'
  | 'text'
  | 'html'
  | 'xml'
  | 'yaml'
  | string;
