import fs from 'fs';
import path from 'path';
import { AppConfig } from '../types';
import { defaultConfig } from './constants';

/**
 * Manages application configuration loading, saving, and manipulation.
 * @example
 * const configManager = new ConfigManager('./my-config.json');
 * const config = configManager.getConfig();
 * @developerNotes
 * Handles configuration file operations with fallback to defaults.
 * Supports JSON-based configuration with partial updates.
 */
export class ConfigManager {
  /** Path to the configuration file */
  private configPath: string;
  /** Current configuration object */
  private config: AppConfig;

  /**
   * Initializes ConfigManager with optional custom config path.
   * @param configPath - Optional path to config file. Defaults to './config.json'.
   * @example
   * const manager = new ConfigManager(); // uses default path
   * const customManager = new ConfigManager('./custom.json');
   * @developerNotes
   * Merges with default configuration during initialization.
   * Creates config file if it doesn't exist during updates.
   */
  constructor(configPath?: string) {
    this.configPath = configPath || path.join(process.cwd(), 'config.json');
    this.config = this.loadConfig();
  }

  /**
   * Loads configuration from file with fallback to defaults.
   * @returns Loaded configuration merged with defaults.
   * @private
   * @example
   * const config = this.loadConfig();
   * @developerNotes
   * Gracefully handles missing or malformed config files.
   * Always ensures at least default configuration is returned.
   */
  private loadConfig(): AppConfig {
    try {
      if (fs.existsSync(this.configPath)) {
        const configData = fs.readFileSync(this.configPath, 'utf-8');
        const parsedConfig = JSON.parse(configData);
        return { ...defaultConfig, ...parsedConfig };
      }
    } catch (error: any) {
      console.warn('Failed to load config, using defaults:', error);
    }
    return defaultConfig;
  }

  /**
   * Returns current configuration object.
   * @returns The current configuration.
   * @example
   * const currentConfig = configManager.getConfig();
   * @developerNotes
   * Returns a reference to the internal config object.
   * Modifying the returned object won't persist - use updateConfig().
   */
  public getConfig(): AppConfig {
    return this.config;
  }

  /**
   * Updates configuration with partial changes and saves to file.
   * @param updates - Partial configuration object with properties to update.
   * @example
   * configManager.updateConfig({ timeout: 5000, retries: 3 });
   * @developerNotes
   * Performs shallow merge of updates with existing config.
   * Automatically persists changes to configuration file.
   */
  public updateConfig(updates: Partial<AppConfig>): void {
    this.config = { ...this.config, ...updates };
    this.saveConfig();
  }

  /**
   * Persists current configuration to file.
   * @private
   * @example
   * this.saveConfig();
   * @developerNotes
   * Uses pretty-printed JSON with 2-space indentation.
   * Handles write errors gracefully without throwing.
   */
  private saveConfig(): void {
    try {
      fs.writeFileSync(this.configPath, JSON.stringify(this.config, null, 2));
    } catch (error: any) {
      console.error('Failed to save config:', error);
    }
  }

  /**
   * Resets configuration to default values and persists.
   * @example
   * configManager.resetConfig();
   * @developerNotes
   * Creates new object from defaultConfig to avoid reference issues.
   * Immediately saves the reset configuration to file.
   */
  public resetConfig(): void {
    this.config = { ...defaultConfig };
    this.saveConfig();
  }

  /**
   * Exports current configuration as formatted JSON string.
   * @returns JSON string representation of current configuration.
   * @example
   * const configJson = configManager.exportConfig();
   * console.log(configJson);
   * @developerNotes
   * Returns pretty-printed JSON with 2-space indentation.
   * Useful for backup or configuration sharing.
   */
  public exportConfig(): string {
    return JSON.stringify(this.config, null, 2);
  }

  /**
   * Imports configuration from JSON string and persists.
   * @param configJson - JSON string containing configuration to import.
   * @returns True if import succeeded, false if failed.
   * @example
   * const success = configManager.importConfig('{"timeout": 3000}');
   * if (!success) console.error('Import failed');
   * @developerNotes
   * Merges imported config with defaults for completeness.
   * Returns boolean status instead of throwing on invalid JSON.
   */
  public importConfig(configJson: string): boolean {
    try {
      const importedConfig = JSON.parse(configJson);
      this.config = { ...defaultConfig, ...importedConfig };
      this.saveConfig();
      return true;
    } catch (error: any) {
      console.error('Failed to import config:', error);
      return false;
    }
  }
}
