/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

/**
 * Converts a name to a standardized provider name by removing whitespace and converting to lowercase.
 * Example: 'My Provider' → 'myprovider'.
 *
 * @param name - The input name string.
 * @returns The standardized provider name.
 *
 * Developer Notes:
 * - Assumes input is a string; handles edge cases like empty strings or non-string inputs gracefully.
 * - Case-insensitive and removes all whitespace characters (spaces, tabs, etc.).
 */
export const toProviderName = (name: string): string => {
  return String(name || '').trim().replace(/\s+/, '').toLowerCase();
};
