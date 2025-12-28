/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import { spaceCase } from 'case-anything';

// helpers
import ResponseHelper from '~/helpers/ResponseHelper';

// constants
import { RESPONSE_LENGTH_GROUPED } from '~/constants/response-length';

// schemas
import schema from './schemas/response-length.schema';

// types
import type { FastifyInstance } from 'fastify';
import type { SuccessResponse } from '~/types/response';

/**
 * Represents an individual response length option with categorized metadata.
 * @example
 * // Example usage
 * const item: ResponseLengthItem = { label: 'Short', value: 'short', category: 'General' };
 * @developer_notes Used to structure response length choices for UI selection or API responses.
 */
export interface ResponseLengthItem {
  /** The human-readable display name for the response length (e.g., "Short", "Medium"). */
  label: string;
  /** The machine-readable identifier for the response length (e.g., "short", "medium"). */
  value: string;
  /** The category grouping for the response length (e.g., "General", "Detailed"). */
  category: string;
}

export default (fastify: FastifyInstance) => {
  /**
   * Retrieves all available response lengths
   * @example
   * // GET prompt/response-length
   * // Response: { providerName: "openai", available: true }
   * @developer_notes Performs health check on the specified provider
   */
  fastify.get<{
    Reply: SuccessResponse<ResponseLengthItem[]>;
  }>('/response-length', { schema }, async function (this, request) {
    const tonesList: ResponseLengthItem[] = [];

    for (const { category, values } of RESPONSE_LENGTH_GROUPED) {
      for (const value of values) {
        tonesList.push({
          label: spaceCase(value),
          value,
          category,
        });
      }
    }

    return ResponseHelper.successWithData(tonesList);
  });
};
