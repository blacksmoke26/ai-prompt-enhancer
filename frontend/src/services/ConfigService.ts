/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import api from '~/utils/api';

// types
import type { AppConfig, EnhancementType, UserRole } from '~/types';

export default abstract class ConfigService {
  /**
   * Handles API errors with appropriate error messages.
   * @private
   * @param {any} error - The error object from the API call.
   * @param {string} defaultMessage - Default error message to use.
   * @throws {Error} - Throws an error with an appropriate message.
   */
  private static handleApiError(error: any, defaultMessage: string): never {
    console.error(error);
    if (error.response?.status === 400) {
      throw new Error('Invalid request data provided');
    } else if (error.response?.status === 403) {
      throw new Error('You do not have permission to perform this action');
    } else if (error.response?.status === 404) {
      throw new Error('The requested service is not available');
    }
    throw new Error(defaultMessage);
  }

  /**
   * Retrieves the current application configuration.
   * @returns {Promise<AppConfig>} The full configuration object.
   * @example
   * const config = await ConfigService.getConfig();
   * console.log(config.theme);
   * @developerNote
   * This endpoint returns all configuration settings including defaults.
   */
  public static async getConfig(): Promise<AppConfig> {
    try {
      const { data } = await api.get<AppConfig>('/config');
      if (!data) {
        throw new Error('No configuration data received');
      }
      return data;
    } catch (error) {
      ConfigService.handleApiError(error, 'Unable to fetch configuration. Please try again.');
    }
  }

  /**
   * Updates the application configuration with partial data.
   * @param {Partial<AppConfig>} config - The configuration properties to update.
   * @returns {Promise<AppConfig>} The updated configuration object.
   * @example
   * const updated = await ConfigService.updateConfig({ theme: 'dark' });
   * @developerNote
   * Only provided fields will be updated; others remain unchanged.
   */
  public static async updateConfig(config: Partial<AppConfig>): Promise<AppConfig> {
    if (!config || Object.keys(config).length === 0) {
      throw new Error('No configuration data provided');
    }

    try {
      const { data } = await api.put<AppConfig>('/config', config);
      if (!data) {
        throw new Error('No configuration data received after update');
      }
      return data;
    } catch (error) {
      ConfigService.handleApiError(error, 'Unable to update configuration. Please try again.');
    }
  }

  /**
   * Resets the configuration to default values.
   * @returns {Promise<AppConfig>} The reset configuration object.
   * @example
   * await ConfigService.resetConfig();
   * @developerNote
   * This action is irreversible - consider adding confirmation in UI.
   */
  public static async resetConfig(): Promise<AppConfig> {
    try {
      const { data } = await api.post<AppConfig>('/config/reset');
      if (!data) {
        throw new Error('Failed to reset configuration');
      }
      return data;
    } catch (error) {
      ConfigService.handleApiError(error, 'Unable to reset configuration. Please try again.');
    }
  }

  /**
   * Exports the current configuration as a downloadable JSON file.
   * @example
   * await ConfigService.exportConfig();
   * @developerNote
   * Creates a file named with current date in YYYY-MM-DD format.
   */
  public static async exportConfig(): Promise<void> {
    if (typeof window === 'undefined') {
      throw new Error('Export functionality is not available in this environment');
    }

    try {
      const { data } = await api.get('/config/export', { responseType: 'blob' });
      if (!data) {
        throw new Error('No data received for export');
      }

      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      const fileName = `prompt-enhancer-config-${new Date().toISOString().split('T')[0]}.json`;
      link.setAttribute('download', fileName);

      const body = document.body || document.documentElement;
      body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      ConfigService.handleApiError(error, 'Unable to export configuration. Please try again.');
    }
  }

  /**
   * Imports configuration from a JSON string.
   * @param {string} configJson - The configuration data as JSON string.
   * @returns {Promise<AppConfig>} The imported configuration object.
   * @example
   * const json = JSON.stringify(config);
   * await ConfigService.importConfig(json);
   * @developerNote
   * Invalid JSON will be rejected by the server.
   */
  public static async importConfig(configJson: string): Promise<AppConfig> {
    if (!configJson?.trim()) {
      throw new Error('Configuration data is required');
    }

    try {
      JSON.parse(configJson);
    } catch {
      throw new Error('Invalid JSON format provided');
    }

    try {
      const { data } = await api.post<AppConfig>('/config/import', { configJson });
      if (!data) {
        throw new Error('Failed to import configuration');
      }
      return data;
    } catch (error) {
      ConfigService.handleApiError(error, 'Unable to import configuration. Please try again.');
    }
  }

  /**
   * Retrieves all available enhancement types.
   * @returns {Promise<EnhancementType[]>} Array of enhancement type options.
   * @example
   * const types = await ConfigService.getEnhancementTypes();
   * @developerNote
   * Used to populate dropdown/select components.
   */
  public static async getEnhancementTypes(): Promise<EnhancementType[]> {
    try {
      const { data } = await api.get<EnhancementType[]>('/config/enhancement-types');
      if (!Array.isArray(data)) {
        throw new Error('Invalid response format for enhancement types');
      }
      return data;
    } catch (error) {
      ConfigService.handleApiError(error, 'Unable to fetch enhancement types. Please try again.');
    }
  }

  /**
   * Retrieves all available user roles.
   * @returns {Promise<UserRole[]>} Array of user role definitions.
   * @example
   * const roles = await ConfigService.getUserRoles();
   * @developerNote
   * May include system roles that cannot be modified.
   */
  public static async getUserRoles(): Promise<UserRole[]> {
    try {
      const { data } = await api.get<UserRole[]>('/config/user-roles');
      if (!Array.isArray(data)) {
        throw new Error('Invalid response format for user roles');
      }
      return data;
    } catch (error) {
      ConfigService.handleApiError(error, 'Unable to fetch user roles. Please try again.');
    }
  }
}
