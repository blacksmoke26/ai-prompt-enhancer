/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import api from '~/utils/api';

// types
import type { AppConfig, EnhancementType, UserRole } from '~/types';

export const configService = {
  /**
   * Retrieves the current application configuration.
   * @returns {Promise<AppConfig>} The full configuration object.
   * @example
   * const config = await configService.getConfig();
   * console.log(config.theme);
   * @developerNote
   * This endpoint returns all configuration settings including defaults.
   */
  async getConfig(): Promise<AppConfig> {
    try {
      const response = await api.get('/config');
      if (!response.data) {
        throw new Error('No configuration data received');
      }
      return response.data;
    } catch (error) {
      console.error('Failed to retrieve configuration:', error);
      throw new Error('Unable to fetch configuration. Please try again.');
    }
  },

  /**
   * Updates the application configuration with partial data.
   * @param {Partial<AppConfig>} config - The configuration properties to update.
   * @returns {Promise<AppConfig>} The updated configuration object.
   * @example
   * const updated = await configService.updateConfig({ theme: 'dark' });
   * @developerNote
   * Only provided fields will be updated; others remain unchanged.
   */
  async updateConfig(config: Partial<AppConfig>): Promise<AppConfig> {
    if (!config || Object.keys(config).length === 0) {
      throw new Error('No configuration data provided');
    }

    try {
      const response = await api.put('/config', config);
      if (!response.data) {
        throw new Error('No configuration data received after update');
      }
      return response.data;
    } catch (error: any) {
      console.error('Failed to update configuration:', error);
      if (error.response?.status === 400) {
        throw new Error('Invalid configuration data provided');
      }
      throw new Error('Unable to update configuration. Please try again.');
    }
  },

  /**
   * Resets the configuration to default values.
   * @returns {Promise<AppConfig>} The reset configuration object.
   * @example
   * await configService.resetConfig();
   * @developerNote
   * This action is irreversible - consider adding confirmation in UI.
   */
  async resetConfig(): Promise<AppConfig> {
    try {
      const response = await api.post('/config/reset');
      if (!response.data) {
        throw new Error('Failed to reset configuration');
      }
      return response.data;
    } catch (error: any) {
      console.error('Failed to reset configuration:', error);
      if (error.response?.status === 403) {
        throw new Error('You do not have permission to reset the configuration');
      }
      throw new Error('Unable to reset configuration. Please try again.');
    }
  },

  /**
   * Exports the current configuration as a downloadable JSON file.
   * @example
   * await configService.exportConfig();
   * @developerNote
   * Creates a file named with current date in YYYY-MM-DD format.
   */
  async exportConfig(): Promise<void> {
    if (typeof window === 'undefined') {
      throw new Error('Export functionality is not available in this environment');
    }

    try {
      const response = await api.get('/config/export', {
        responseType: 'blob',
      });

      if (!response.data) {
        throw new Error('No data received for export');
      }

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      const fileName = `prompt-enhancer-config-${new Date().toISOString().split('T')[0]}.json`;
      link.setAttribute('download', fileName);

      // Handle case where document.body might not exist
      const body = document.body || document.documentElement;
      body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      console.error('Failed to export configuration:', error);
      if (error.response?.status === 404) {
        throw new Error('Export service is not available');
      }
      throw new Error('Unable to export configuration. Please try again.');
    }
  },

  /**
   * Imports configuration from a JSON string.
   * @param {string} configJson - The configuration data as JSON string.
   * @returns {Promise<AppConfig>} The imported configuration object.
   * @example
   * const json = JSON.stringify(config);
   * await configService.importConfig(json);
   * @developerNote
   * Invalid JSON will be rejected by the server.
   */
  async importConfig(configJson: string): Promise<AppConfig> {
    if (!configJson || configJson.trim().length === 0) {
      throw new Error('Configuration data is required');
    }

    // Basic JSON validation before sending to server
    try {
      JSON.parse(configJson);
    } catch (error) {
      throw new Error('Invalid JSON format provided');
    }

    try {
      const response = await api.post('/config/import', { configJson });
      if (!response.data) {
        throw new Error('Failed to import configuration');
      }
      return response.data;
    } catch (error: any) {
      console.error('Failed to import configuration:', error);
      if (error.response?.status === 400) {
        throw new Error('Invalid configuration format or data');
      } else if (error.response?.status === 403) {
        throw new Error('You do not have permission to import configuration');
      }
      throw new Error('Unable to import configuration. Please try again.');
    }
  },

  /**
   * Retrieves all available enhancement types.
   * @returns {Promise<EnhancementType[]>} Array of enhancement type options.
   * @example
   * const types = await configService.getEnhancementTypes();
   * @developerNote
   * Used to populate dropdown/select components.
   */
  async getEnhancementTypes(): Promise<EnhancementType[]> {
    try {
      const response = await api.get('/config/enhancement-types');
      if (!Array.isArray(response.data)) {
        throw new Error('Invalid response format for enhancement types');
      }
      return response.data;
    } catch (error: any) {
      console.error('Failed to retrieve enhancement types:', error);
      if (error.response?.status === 404) {
        throw new Error('Enhancement types service is not available');
      }
      throw new Error('Unable to fetch enhancement types. Please try again.');
    }
  },

  /**
   * Retrieves all available user roles.
   * @returns {Promise<UserRole[]>} Array of user role definitions.
   * @example
   * const roles = await configService.getUserRoles();
   * @developerNote
   * May include system roles that cannot be modified.
   */
  async getUserRoles(): Promise<UserRole[]> {
    try {
      const response = await api.get('/config/user-roles');
      if (!Array.isArray(response.data)) {
        throw new Error('Invalid response format for user roles');
      }
      return response.data;
    } catch (error: any) {
      console.error('Failed to retrieve user roles:', error);
      if (error.response?.status === 403) {
        throw new Error('You do not have permission to view user roles');
      } else if (error.response?.status === 404) {
        throw new Error('User roles service is not available');
      }
      throw new Error('Unable to fetch user roles. Please try again.');
    }
  },
};
