// noinspection ExceptionCaughtLocallyJS

/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import api from '~/utils/api';

// services
import ConfigService from '~/services/ConfigService';

// types
import type { ResponseLength } from '~/types';

export default abstract class ResponseLengthService {
  /**
   * Retrieves all available response lengths.
   * @returns Array of response length options.
   * @example
   * const types = await ResponseLengthService.getAll();
   * @developerNote
   * Used to populate dropdown/select components.
   */
  public static async getAll(): Promise<ResponseLength[]> {
    try {
      const { data } = await api.get<{data: ResponseLength[]}>('/response-lengths');
      if (!Array.isArray(data.data)) {
        throw new Error('Invalid response format for response lengths');
      }
      return data.data;
    } catch (error) {
      ConfigService.handleApiError(error, 'Unable to fetch response lengths. Please try again.');
    }
  }

  /**
   * Updates a response length.
   * @param key - The key of the response length to update.
   * @param hidden - The new value for the hidden property.
   * @example
   * await ResponseLengthService.update('123', true);
   */
  public static async update(key: string, hidden: boolean): Promise<void> {
    try {
      await api.put(`/response-lengths/${key}`, {hidden});
    } catch (error) {
      ConfigService.handleApiError(error, 'Unable to update response length. Please try again.');
    }
  }
}
