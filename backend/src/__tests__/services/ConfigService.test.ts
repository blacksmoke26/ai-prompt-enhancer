/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import ConfigService from '../../services/ConfigService';
import {Setting, Provider} from '../../database/models';

// Mock database models
jest.mock('../../database/models/Setting', () => ({
  Setting: {
    getDefaultSettings: jest.fn(),
    getAllSettings: jest.fn(),
    keyExists: jest.fn(),
    update: jest.fn(),
  },
}));

jest.mock('../../database/models/Provider', () => ({
  Provider: {
    getDefaultProviders: jest.fn(),
    getAllProviders: jest.fn(),
    exists: jest.fn(),
    update: jest.fn(),
  },
}));

describe('ConfigService', () => {
  let configService: ConfigService;

  beforeEach(() => {
    configService = new ConfigService();
    jest.clearAllMocks();
  });

  describe('getDefaultSettings', () => {
    it('should return default settings and providers', async () => {
      const mockSettings = { timeout: 5000, retries: 3 };
      const mockProviders = { openai: { apiKey: 'test-key' } };

      (Setting.getDefaultSettings as jest.Mock).mockResolvedValue(mockSettings);
      (Provider.getDefaultProviders as jest.Mock).mockResolvedValue(mockProviders);

      const result = await ConfigService.getDefaultSettings();

      expect(Setting.getDefaultSettings).toHaveBeenCalled();
      expect(Provider.getDefaultProviders).toHaveBeenCalled();
      expect(result).toEqual({ ...mockSettings, ...mockProviders });
    });
  });

  describe('getConfig', () => {
    it('should return current configuration', async () => {
      const mockSettings = { timeout: 5000, retries: 3 };
      const mockProviders = { openai: { apiKey: 'test-key' } };

      (Setting.getAllSettings as jest.Mock).mockResolvedValue(mockSettings);
      (Provider.getAllProviders as jest.Mock).mockResolvedValue(mockProviders);

      const result = await configService.getConfig();

      expect(Setting.getAllSettings).toHaveBeenCalled();
      expect(Provider.getAllProviders).toHaveBeenCalled();
      expect(result).toEqual({ ...mockSettings, ...mockProviders });
    });
  });

  describe('updateConfig', () => {
    it('should save configuration updates', async () => {
      const updates = { timeout: 10000, retries: 5 };

      const updateConfigSpy = jest.spyOn(configService, 'updateConfig');

      await configService.updateConfig(updates);

      expect(updateConfigSpy).toHaveBeenCalledWith(updates);
    });
  });

  describe('updateConfig', () => {
    it('should save settings and providers separately', async () => {
      const appConfig = {
        timeout: 10000,
        retries: 5,
        openai: {
          apiKey: 'new-key',
          baseURL: 'https://api.openai.com',
          enabled: true,
        },
        anthropic: {
          apiKey: 'new-key',
          baseURL: 'https://api.anthropic.com',
          enabled: true,
        }
      };

      // Mock Setting operations
      (Setting.keyExists as jest.Mock).mockResolvedValue(false);
      (Setting.update as jest.Mock).mockResolvedValue(undefined);

      // Mock Provider operations
      (Provider.exists as jest.Mock).mockResolvedValue(true);
      (Provider.update as jest.Mock).mockResolvedValue(undefined);

      await configService.updateConfig(appConfig);

      // Should have called Setting.update for settings
      expect(Setting.update).toHaveBeenCalled();

      // Should have called Provider.update for providers
      expect(Provider.update).toHaveBeenCalled();
    });

    it('should handle setting creation when key does not exist', async () => {
      const appConfig = {
        timeout: 10000,
      };

      (Setting.keyExists as jest.Mock).mockResolvedValue(false);
      (Setting.update as jest.Mock).mockResolvedValue(undefined);

      await configService.updateConfig(appConfig);

      expect(Setting.update).toHaveBeenCalled();
    });

    it('should filter provider config to valid keys', async () => {
      const appConfig = {
        openai: {
          apiKey: 'new-key',
          baseURL: 'https://api.openai.com',
          enabled: true,
          invalidKey: 'should-be-ignored', // This should be filtered out
        }
      };

      (Provider.exists as jest.Mock).mockResolvedValue(true);
      (Provider.update as jest.Mock).mockResolvedValue(undefined);

      await configService.updateConfig(appConfig);

      expect(Provider.update).toHaveBeenCalled();
    });
  });

  describe('resetConfig', () => {
    it('should reset configuration to default values', async () => {
      const mockDefaultConfig = { timeout: 5000, retries: 3 };

      (ConfigService.getDefaultSettings as jest.Mock).mockResolvedValue(mockDefaultConfig);

      const updateConfigSpy = jest.spyOn(configService, 'updateConfig');

      await configService.resetConfig();

      expect(ConfigService.getDefaultSettings).toHaveBeenCalled();
      expect(updateConfigSpy).toHaveBeenCalledWith(mockDefaultConfig);
    });
  });

  describe('exportConfig', () => {
    it('should export current configuration as JSON string', async () => {
      const mockConfig = { timeout: 5000, retries: 3 };

      (configService.getConfig as jest.Mock).mockResolvedValue(mockConfig);

      const result = await configService.exportConfig();

      expect(configService.getConfig).toHaveBeenCalled();
      expect(result).toBe(JSON.stringify(mockConfig, null, 2));
    });
  });

  describe('importConfig', () => {
    it('should successfully import valid configuration', async () => {
      const configJson = JSON.stringify({ timeout: 10000, retries: 5 });

      const updateConfigSpy = jest.spyOn(configService, 'updateConfig');

      const result = await configService.importConfig(configJson);

      expect(updateConfigSpy).toHaveBeenCalledWith({
        timeout: 10000,
        retries: 5,
      });
      expect(result).toBe(true);
    });

    it('should return false for invalid JSON', async () => {
      const invalidJson = '{ invalid json }';

      const result = await configService.importConfig(invalidJson);

      expect(result).toBe(false);
    });

    it('should handle errors during import gracefully', async () => {
      const configJson = JSON.stringify({ timeout: 10000, retries: 5 });

      // Mock updateConfig to throw an error
      jest.spyOn(configService, 'updateConfig').mockRejectedValue(new Error('Database error'));

      const result = await configService.importConfig(configJson);

      expect(result).toBe(false);
    });
  });
});
