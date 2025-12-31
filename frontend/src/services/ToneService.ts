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
import type {Tone} from '~/types';

export default abstract class ToneService {
  /**
   * Retrieves all available tones.
   * @returns Array of tones options.
   * @example
   * const types = await ToneService.getAll();
   * @developerNote
   * Used to populate dropdown/select components.
   */
  public static async getAll(): Promise<Tone[]> {
    try {
      const {data} = await api.get<{ data: Tone[] }>('/tones');
      if (!Array.isArray(data.data)) {
        throw new Error('Invalid response format for tones');
      }
      return data.data;
    } catch (error) {
      ConfigService.handleApiError(error, 'Unable to fetch tones. Please try again.');
    }
  }

  /**
   * Updates a tone.
   * @param key - The key of the tone to update.
   * @param hidden - The new value for the hidden property.
   * @example
   * await ToneService.update('123', true);
   */
  public static async update(key: string, hidden: boolean): Promise<void> {
    try {
      await api.put(`/api/tones/${key}`, {hidden});
    } catch (error) {
      ConfigService.handleApiError(error, 'Unable to update tone. Please try again.');
    }
  }
}
