/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import api from '~/utils/api';

// services
import ConfigService from '~/services/ConfigService';

// types
import type { EnhancementType } from '~/types';

export default abstract class EnhancementTypeService {
  /**
   * Retrieves all available enhancement types.
   * @returns {Promise<EnhancementType[]>} Array of enhancement type options.
   * @example
   * const types = await ConfigService.getEnhancementTypes();
   * @developerNote
   * Used to populate dropdown/select components.
   */
  public static async getAll(): Promise<EnhancementType[]> {
    try {
      const { data } = await api.get<EnhancementType[]>('/enhancement-types');
      if (!Array.isArray(data)) {
        throw new Error('Invalid response format for enhancement types');
      }
      return data;
    } catch (error) {
      ConfigService.handleApiError(error, 'Unable to fetch enhancement types. Please try again.');
    }
  }
}
