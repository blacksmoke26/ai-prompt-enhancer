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
import type {UserRole} from '~/types';

export default abstract class UserRoleService {
  /**
   * Retrieves all available user roles.
   * @returns {Promise<UserRole[]>} Array of user role definitions.
   * @example
   * const roles = await ConfigService.getUserRoles();
   * @developerNote
   * May include system roles that cannot be modified.
   */
  public static async getAll(): Promise<UserRole[]> {
    try {
      const {data} = await api.get<{ data: UserRole[] }>('/user-roles');
      if (!Array.isArray(data?.data)) {
        throw new Error('Invalid response format for user roles');
      }
      return data?.data;
    } catch (error) {
      ConfigService.handleApiError(error, 'Unable to fetch user roles. Please try again.');
    }
  }
}
