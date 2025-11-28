import fs from 'fs';
import path from 'path';
import { AppConfig } from '../types';
import { defaultConfig } from './constants';

export class ConfigManager {
  private configPath: string;
  private config: AppConfig;

  constructor(configPath?: string) {
    this.configPath = configPath || path.join(process.cwd(), 'config.json');
    this.config = this.loadConfig();
  }

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

  public getConfig(): AppConfig {
    return this.config;
  }

  public updateConfig(updates: Partial<AppConfig>): void {
    this.config = { ...this.config, ...updates };
    this.saveConfig();
  }

  private saveConfig(): void {
    try {
      fs.writeFileSync(this.configPath, JSON.stringify(this.config, null, 2));
    } catch (error: any) {
      console.error('Failed to save config:', error);
    }
  }

  public resetConfig(): void {
    this.config = { ...defaultConfig };
    this.saveConfig();
  }

  public exportConfig(): string {
    return JSON.stringify(this.config, null, 2);
  }

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
