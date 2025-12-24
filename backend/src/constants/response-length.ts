/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

/**
 * A constant array of response length categories, where each category groups related values describing the expected length or format of a response.
 * This structure allows for organizing response length options into meaningful themes (e.g., brevity, expansion, or structured formats).
 * @example [
 *   {
 *     category: 'Original values',
 *     values: ['short', 'medium', 'long', 'concise', 'detailed']
 *   }
 * ]
 * @developerNotes Maintain consistency in category names and ensure that values are logically grouped to avoid ambiguity. Avoid overlapping values across categories.
 */
export const RESPONSE_LENGTH_GROUPED: { category: string; values: string[] }[] = [
  {
    category: 'Original values',
    values: [
      'short', 'medium', 'long', 'concise', 'detailed',
    ],
  },
  {
    category: 'Brevity-focused',
    values: [
      'brief', 'succinct', 'to-the-point', 'minimal', 'one-liner', 'tweet-length', 'summary',
      'bullet-point', 'telegraphic',
    ],
  },
  {
    category: 'Expansion-focused',
    values: [
      'comprehensive', 'in-depth', 'thorough', 'elaborate', 'extensive', 'exhaustive',
      'encyclopedic', 'full-length', 'essay-style', 'report-quality',
    ],
  },
  {
    category: 'Structured formats',
    values: [
      'outline', 'structured', 'step-by-step', 'numbered-list', 'paragraph-form', 'narrative-form',
    ],
  },
  {
    category: 'Context-aware lengths',
    values: [
      'quick-reply', 'chat-style', 'email-appropriate', 'document-ready', 'presentation-summary',
      'technical-spec', 'executive-summary', 'TL;DR', 'expandable-preview',
    ],
  },
];

/**
 * A flattened array containing all response length values from the `RESPONSE_LENGTH_GROUPED` structure.
 * This array is derived by combining all `values` from each group, providing a single list of possible response length options.
 * @example ["short", "medium", "long", "concise", "detailed", "brief", "succinct", ...]
 * @developerNotes This array is automatically generated from `RESPONSE_LENGTH_GROUPED` and should not be manually edited. Ensure consistency in the grouped data to maintain accuracy here.
 */
export const RESPONSE_LENGTH = RESPONSE_LENGTH_GROUPED.reduce((acc: string[], group) => {
  acc.push(...group.values);
  return acc;
}, []);
