/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import { spaceCase } from 'case-anything';

// helpers
import ResponseHelper from '~/helpers/ResponseHelper';

// constants
import { TONES_GROUPED } from '~/constants/tones';

// schemas
import schema from './schemas/tones.schema';

// types
import type { FastifyInstance } from 'fastify';
import type { SuccessResponse } from '~/types/response';

/**
 * Represents an individual tone option with categorized metadata.
 * @example
 * // Example usage
 * const item: ToneItem = { label: 'Short', value: 'short', category: 'General' };
 * @developer_notes Used to structure tone choices for UI selection or API responses.
 */
export interface ToneItem {
  /** The human-readable display name for the tone (e.g., "Short", "Medium"). */
  label: string;
  /** The machine-readable identifier for the tone (e.g., "short", "medium"). */
  value: string;
  /** The category grouping for the tone (e.g., "General", "Detailed"). */
  category: string;
}
export default (fastify: FastifyInstance) => {
  /**
   * Retrieves all available tones
   * @example
   * // GET prompt/tones
   * @developer_notes Performs health check on the specified provider
   */
  fastify.get<{
    Reply: SuccessResponse<ToneItem[]>;
  }>('/tones', { schema }, async function (this, request) {
    const tonesList: ToneItem[] = [];

    for (const { category, tones } of TONES_GROUPED) {
      for (const tone of tones) {
        tonesList.push({
          label: spaceCase(tone),
          value: tone,
          category,
        });
      }
    }

    return ResponseHelper.successWithData(tonesList);
  });
};
