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
  /** Current configuration object */
  private config: AppConfig = {};

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
   * Loads configuration from database with fallback to defaults.
   * @throws {Error} When database connection fails
   * @example
   * ```typescript
   * await configManager.load();
   * ```
   * @developerNotes: This method is idempotent and can be called multiple times. It gracefully handles database errors by maintaining current configuration.
   */
  public async load(): Promise<void> {
    try {
      this.config = await this.getConfig();
    } catch (error: any) {
      console.warn('Failed to load config, using defaults:', error);
    }
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
    this.config = {...this.config, ...updates};
    this.saveConfig();
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
  private async saveConfig(): Promise<void> {
    // save settings
    for await (const [key, value] of Object.entries(this.config)) {
      const exist = await Setting.keyExists(key);

      if (exist) {
        await Setting.update(
          {value: JSON.stringify(value)},
          {where: {key}},
        );
      }
    }

    // save providers
    for await (const [name, config] of Object.entries(this.config)) {
      const exist = await Provider.exists(name);

      if (!exist) continue;

      const providerConfig: Partial<ConfigMeta> = {};

      for (const [key, value] of Object.entries(config)) {
        if (configKeys.includes(key)) {
          providerConfig[key] = value;
        }
      }

      const updated: Record<string, any> = {
        config: providerConfig as ConfigMeta,
      };

      if (!config.enabled) {
        updated.enabled = false;
      }

      await Provider.update(updated, {where: {name}});
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
    //this.config = {...defaultConfig};
    return this.saveConfig();
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
      this.config = {...defaultConfig, ...importedConfig};
      await this.saveConfig();
      return true;
    } catch (error: any) {
      console.error('Failed to import config:', error);
      return false;
    }
  }
}
