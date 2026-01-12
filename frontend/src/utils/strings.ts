/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

/**
 * Safely converts any value to a string, returning an empty string for `null` or `undefined`.
 * @param val - The value to convert.
 * @returns The string representation of the value, or an empty string if invalid.
 * @example
 * safeString(null); // returns ''
 * safeString(123); // returns '123'
 * safeString(undefined); // returns ''
 * @developerNotes
 * - Handles all types including numbers, booleans, and objects.
 * - Avoids throwing errors for invalid inputs.
 */
export const safeString = (val: unknown): string => {
  if (val === null || val === undefined) return '';
  return String(val);
};

/**
 * Formats a number with a locale, defaulting to `'0'` if the input is invalid or formatting fails.
 * @param num - The number to format.
 * @param [locale] - The locale to use for formatting (e.g., `'en-US'`, `'fr-FR'`).
 * @returns The locale-formatted string or the number as a string if formatting fails.
 * @example
 * safeLocaleFormat(1234.56, 'en-US'); // returns '1,234.56'
 * safeLocaleFormat(1234.56, 'de-DE'); // returns '1.234,56'
 * safeLocaleFormat(NaN, 'en-US'); // returns '0'
 * @developerNotes
 * - Uses `try-catch` to handle locale formatting errors gracefully.
 * - Falls back to `toString()` if formatting fails or the input is invalid.
 */
export const safeLocaleFormat = (num: number, locale?: string | null): string => {
  // noinspection SuspiciousTypeOfGuard
  if (typeof num !== 'number' || isNaN(num)) return '0';
  try {
    return num.toLocaleString(locale || undefined);
  } catch (e) {
    return num.toString();
  }
};

/**
 * Estimates the number of syllables in a word using heuristic vowel matching.
 * @param word - The word to analyze.
 * @returns The estimated number of syllables.
 * @example
 * countSyllables('example'); // returns 3
 * countSyllables('hello'); // returns 2
 * countSyllables(''); // returns 0
 * @developerNotes
 * - Removes common suffixes like `-ed`, `-es`, and `-e` before counting.
 * - Uses a simple vowel-based heuristic and may not be 100% accurate.
 */
export const countSyllables = (word: string): number => {
  if (!word) return 0;
  word = word.toLowerCase();
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  const matches = word.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
};

/**
 * Detects if a text is predominantly right-to-left (RTL) based on character composition.
 * @param text - The text to analyze.
 * @returns `true` if the text is mostly RTL, otherwise `false`.
 * @example
 * detectRtl('مرحبا'); // returns true
 * detectRtl('Hello world'); // returns false
 * detectRtl('Hello مرحبا'); // returns false
 * @developerNotes
 * - Uses a regex to identify RTL Unicode characters.
 * - Considers RTL dominance if more than 20% of non-whitespace characters are RTL.
 * - Ignores whitespace when determining RTL dominance.
 */
export const detectRtl = (text: string): boolean => {
  if (!text) return false;
  const rtlRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
  const matches = text.match(rtlRegex);
  if (!matches) return false;
  const cleanText = text.replace(/\s/g, '');
  if (cleanText.length === 0) return false;
  return (matches.length / cleanText.length) > 0.2;
};

/**
 * Converts a value to a string or returns `null` if the value is `undefined` or `null`.
 * @param value - The value to convert.
 * @returns The string representation of the value or `null` if the value is `undefined` or `null`.
 * @example
 * nullOrString(undefined); // returns null
 * nullOrString(null); // returns null
 * nullOrString('Hello'); // returns 'Hello'
 * @developerNotes
 * - Handles both `undefined` and `null` values.
 * - Trims the string if it's a non-null value.
 * - Returns `null` for `undefined` or `null` values.
 */
export const nullOrString = (value: any | undefined | null): any | null => {
  return !value
    ? null
    : (value?.trim?.() ? value.trim() : null);
};
