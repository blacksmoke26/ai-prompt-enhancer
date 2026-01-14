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
import type {TargetAudience} from '~/types';

export default abstract class TargetAudienceService {
  /**
   * Retrieves all available target-audiences.
   * @returns Array of target-audiences options.
   * @example
   * const types = await TargetAudienceService.getAll();
   * @developerNote
   * Used to populate dropdown/select components.
   */
  public static async getAll(): Promise<TargetAudience[]> {
    try {
      const {data} = await api.get<{ data: TargetAudience[] }>('/target-audiences');
      if (!Array.isArray(data.data)) {
        throw new Error('Invalid response format for target-audiences');
      }
      return data.data;
    } catch (error) {
      ConfigService.handleApiError(error, 'Unable to fetch target-audiences. Please try again.');
    }
  }

  /**
   * Updates a tone.
   * @param key - The key of the tone to update.
   * @param hidden - The new value for the hidden property.
   * @example
   * await TargetAudienceService.update('123', true);
   */
  public static async update(key: string, hidden: boolean): Promise<void> {
    try {
      await api.put(`/target-audiences/${key}`, {hidden});
    } catch (error) {
      ConfigService.handleApiError(error, 'Unable to update tone. Please try again.');
    }
  }
}
