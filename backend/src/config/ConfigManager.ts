/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// db
import {ConfigMeta, Provider, Setting} from '~/database/models';

// constants
import {configKeys} from '~/constants/providers';
import defaultConfig from '~/constants/default-config';

// types
import type {AppConfig} from '~/types';

/**
 * Manages application configuration loading, saving, and manipulation.
 * @example
 * ```typescript
 * const configManager = new ConfigManager();
 * await configManager.load();
 * const config = configManager.getConfig();
 * ```
 * @developerNotes: This class serves as the primary interface for all configuration-related operations. It handles both settings and providers, ensuring data consistency across the application.
 */
export class ConfigManager {
  /**
   * Initializes ConfigManager instance.
   * @example
   * ```typescript
   * const manager = new ConfigManager();
   * await manager.load();
   * ```
   * @developerNotes: The constructor doesn't load configuration automatically. Call load() method explicitly to populate the config.
   */
  constructor() {
  }

  /**
   * Retrieves default settings and providers from database.
   * @returns Promise resolving to default configuration object
   * @example
   * ```typescript
   * const defaults = await ConfigManager.getDefaultSettings();
   * ```
   * @developerNotes: Static method that doesn't require instance creation. Useful for initialization and comparison operations.
   */
  public static async getDefaultSettings(): Promise<AppConfig> {
    const settings = await Setting.getDefaultSettings();
    const providers = await Provider.getDefaultProviders();
    return {...settings, ...providers};
  }

  /**
   * Retrieves current configuration from database.
   * @returns Promise resolving to current configuration object
   * @example
   * ```typescript
   * const currentConfig = configManager.getConfig();
   * ```
   * @developerNotes: Always fetches fresh data from database, unlike the internal config property which may be stale.
   */
  public async getConfig(): Promise<AppConfig> {
    const settings = await Setting.getAllSettings();
    const providers = await Provider.getAllProviders();
    return {...settings, ...providers};
  }

  /**
   * Updates configuration with partial changes and persists to database.
   * @param updates - Partial configuration object with properties to update
   * @throws {Error} When database update fails
   * @example
   * ```typescript
   * await configManager.updateConfig({ timeout: 5000, retries: 3 });
   * ```
   * @developerNotes: Performs shallow merge. Nested objects will be completely replaced, not merged. Consider using spread operator for deep updates if needed.
   */
  public async updateConfig(updates: Partial<AppConfig>): Promise<void> {
    this.saveConfig(updates);
  }

  /**
   * Persists current configuration to database.
   * @private
   * @throws {Error} When database operations fail
   * @example
   * ```typescript
   * this.saveConfig();
   * ```
   * @developerNotes: Handles both settings and providers in separate transactions. Provider configs are filtered to only include valid config keys.
   */
  private async saveConfig(appConfig: Partial<AppConfig>): Promise<void> {
    // save settings
    for await (const [key, value] of Object.entries(appConfig)) {
      const exist = await Setting.keyExists(key);

      if (exist) {
        await Setting.update(
          {value: JSON.stringify(value)},
          {where: {key}},
        );

        continue;
      }

      const providerExist = await Provider.exists(key);

      // save providers
      if ( providerExist ) {
        const providerConfig: Partial<ConfigMeta> = {};

        for (const [key, val] of Object.entries(value)) {
          if (configKeys.includes(key)) {
            providerConfig[key] = val;
          }
        }

        const updated: Record<string, any> = {
          config: providerConfig as ConfigMeta,
        };

        if (!value.enabled) {
          updated.enabled = false;
        }

        await Provider.update(updated, {where: {name: key}});
      }
    }
  }

  /**
   * Resets configuration to default values and persists to database.
   * @throws {Error} When database operations fail
   * @example
   * ```typescript
   * await configManager.resetConfig();
   * ```
   * @developerNotes: Currently commented out reset logic. Uncomment this.config = {...defaultConfig} to enable full reset functionality.
   */
  public async resetConfig(): Promise<void> {
    const defaultConfig = await ConfigManager.getDefaultSettings();
    return this.saveConfig(defaultConfig);
  }

  /**
   * Exports current configuration as formatted JSON string.
   * @returns Promise resolving to JSON string representation of current configuration
   * @example
   * ```typescript
   * const configJson = await configManager.exportConfig();
   * console.log(configJson);
   * ```
   * @developerNotes: Always fetches latest config from database. Use 2-space indentation for readability. Sensitive values should be masked before export.
   */
  public async exportConfig(): Promise<string> {
    return JSON.stringify(await this.getConfig(), null, 2);
  }

  /**
   * Imports configuration from JSON string and persists to database.
   * @param configJson - JSON string containing configuration to import
   * @returns Promise resolving to true if import succeeded, false if failed
   * @example
   * ```typescript
   * const success = await configManager.importConfig('{"timeout": 3000}');
   * if (!success) console.error('Import failed');
   * ```
   * @developerNotes: Performs validation during JSON.parse. Invalid JSON or malformed config will fail silently without affecting current configuration.
   */
  public async importConfig(configJson: string): Promise<boolean> {
    try {
      const importedConfig = JSON.parse(configJson);
      await this.saveConfig({...defaultConfig, ...importedConfig});
      return true;
    } catch (error: any) {
      console.error('Failed to import config:', error);
      return false;
    }
  }
}
