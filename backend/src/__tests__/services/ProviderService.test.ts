/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import ProviderService from '../../services/ProviderService';
import { Provider } from '../../database/models';
import { providersClasses } from '../../providers';

// Mock database models
jest.mock('../../database/models/Provider', () => ({
  Provider: {
    getAllProviders: jest.fn(),
    findOne: jest.fn(),
    findAll: jest.fn(),
    exists: jest.fn(),
    update: jest.fn(),
  },
}));

// Mock providers
jest.mock('../../providers', () => ({
  providersClasses: {
    openai: jest.fn(),
    anthropic: jest.fn(),
  },
}));

// Mock BaseAIProvider
jest.mock('../../base/BaseAIProvider', () => {
  return jest.fn().mockImplementation(() => ({
    isAvailable: jest.fn(),
    getModels: jest.fn(),
  }));
});

describe('ProviderService', () => {
  let providerService: ProviderService;
  const mockProviderConfig = {
    openai: {
      apiKey: 'test-key',
      baseURL: 'https://api.openai.com',
      enabled: true,
    },
    anthropic: {
      apiKey: 'test-key',
      baseURL: 'https://api.anthropic.com',
      enabled: true,
    },
  };

  beforeEach(() => {
    providerService = new ProviderService();
    jest.clearAllMocks();
  });

  describe('load', () => {
    it('should initialize providers correctly', async () => {
      // Mock the database response
      (Provider.getAllProviders as jest.Mock).mockResolvedValue(mockProviderConfig);

      // Mock provider classes
      const mockProviderClass = jest.fn();
      (providersClasses as any).openai = mockProviderClass;

      await providerService.load();

      expect(Provider.getAllProviders).toHaveBeenCalled();
      expect(mockProviderClass).toHaveBeenCalled();
    });

    it('should throw error for unsupported provider', async () => {
      (Provider.getAllProviders as jest.Mock).mockResolvedValue({
        unsupported: {
          apiKey: 'test-key',
          enabled: true,
        },
      });

      await expect(providerService.load()).rejects.toThrow('Provider unsupported is not supported');
    });
  });

  describe('getAllProviders', () => {
    it('should return all providers with their information', async () => {
      const mockProviders = [
        {
          name: 'openai',
          caption: 'OpenAI',
          config: JSON.stringify({
            apiKey: 'test-key',
            baseURL: 'https://api.openai.com',
            enabled: true,
          }),
          enabled: true,
        },
        {
          name: 'anthropic',
          caption: 'Anthropic',
          config: JSON.stringify({
            apiKey: 'test-key',
            baseURL: 'https://api.anthropic.com',
            enabled: true,
          }),
          enabled: true,
        },
      ];

      (Provider.findAll as jest.Mock).mockResolvedValue(mockProviders);

      const result = await providerService.getAllProviders();

      expect(Provider.findAll).toHaveBeenCalledWith({
        attributes: ['name', 'caption', 'config', 'enabled'],
        raw: true,
      });
      expect(result).toHaveLength(2);
      expect(result[0]).toHaveProperty('name', 'openai');
      expect(result[1]).toHaveProperty('name', 'anthropic');
    });

    it('should handle empty providers list', async () => {
      (Provider.findAll as jest.Mock).mockResolvedValue([]);

      const result = await providerService.getAllProviders();

      expect(result).toHaveLength(0);
    });
  });

  describe('getAllModels', () => {
    it('should return all available models from providers', async () => {
      const mockProviders = {
        openai: {
          apiKey: 'test-key',
          enabled: true,
        },
        anthropic: {
          apiKey: 'test-key',
          enabled: true,
        },
      };

      (Provider.getAllProviders as jest.Mock).mockResolvedValue(mockProviders);

      // Mock provider instances
      const mockOpenAIProvider = {
        isAvailable: jest.fn().mockResolvedValue(true),
        getModels: jest.fn().mockResolvedValue([{ name: 'gpt-4', provider: 'openai' }]),
      };

      const mockAnthropicProvider = {
        isAvailable: jest.fn().mockResolvedValue(true),
        getModels: jest.fn().mockResolvedValue([{ name: 'claude-3', provider: 'anthropic' }]),
      };

      // Mock getProvider to return our mock providers
      jest.spyOn(providerService, 'getProvider').mockImplementation((name) => {
        if (name === 'openai') return mockOpenAIProvider as any;
        if (name === 'anthropic') return mockAnthropicProvider as any;
        return undefined;
      });

      const result = await providerService.getAllModels();

      expect(result).toHaveLength(2);
      expect(result[0]).toHaveProperty('name', 'gpt-4');
      expect(result[1]).toHaveProperty('name', 'claude-3');
    });

    it('should skip unavailable providers', async () => {
      const mockProviders = {
        openai: {
          apiKey: 'test-key',
          enabled: true,
        },
      };

      (Provider.getAllProviders as jest.Mock).mockResolvedValue(mockProviders);

      // Mock provider instance that is not available
      const mockOpenAIProvider = {
        isAvailable: jest.fn().mockResolvedValue(false),
        getModels: jest.fn(),
      };

      jest.spyOn(providerService, 'getProvider').mockReturnValue(mockOpenAIProvider as any);

      const result = await providerService.getAllModels();

      expect(result).toHaveLength(0);
    });

    it('should handle errors gracefully when getting models', async () => {
      const mockProviders = {
        openai: {
          apiKey: 'test-key',
          enabled: true,
        },
      };

      (Provider.getAllProviders as jest.Mock).mockResolvedValue(mockProviders);

      // Mock provider instance that throws an error
      const mockOpenAIProvider = {
        isAvailable: jest.fn().mockResolvedValue(true),
        getModels: jest.fn().mockRejectedValue(new Error('Network error')),
      };

      jest.spyOn(providerService, 'getProvider').mockReturnValue(mockOpenAIProvider as any);

      const result = await providerService.getAllModels();

      // Should not throw but return empty array
      expect(result).toHaveLength(0);
    });
  });

  describe('getProvider', () => {
    it('should return a specific provider by name', () => {
      const mockProvider = {
        isAvailable: jest.fn(),
        getModels: jest.fn(),
      };

      // Mock the providers map
      const providersMap = new Map();
      providersMap.set('openai', mockProvider);
      (providerService as any).providers = providersMap;

      const result = providerService.getProvider('openai');

      expect(result).toBe(mockProvider);
    });

    it('should return undefined for non-existent provider', () => {
      const providersMap = new Map();
      (providerService as any).providers = providersMap;

      const result = providerService.getProvider('non-existent');

      expect(result).toBeUndefined();
    });
  });

  describe('refreshProviders', () => {
    it('should clear and reload providers', async () => {
      const mockProvider = {
        isAvailable: jest.fn(),
        getModels: jest.fn(),
      };

      // Mock the providers map
      const providersMap = new Map();
      providersMap.set('openai', mockProvider);
      (providerService as any).providers = providersMap;

      // Mock load method
      const loadSpy = jest.spyOn(providerService, 'load').mockResolvedValue(undefined);

      await providerService.refreshProviders();

      expect(providerService['providers'].size).toBe(0);
      expect(loadSpy).toHaveBeenCalled();
    });
  });

  describe('getAvailableProviderNames', () => {
    it('should return all available provider names', async () => {
      const mockRecords = [
        { name: 'openai' },
        { name: 'anthropic' },
      ];

      (Provider.findAll as jest.Mock).mockResolvedValue(mockRecords);

      const result = await providerService.getAvailableProviderNames();

      expect(Provider.findAll).toHaveBeenCalledWith({
        attributes: ['name'],
      });
      expect(result).toEqual(['openai', 'anthropic']);
    });
  });

  describe('testProvider', () => {
    it('should return false for non-existent provider', async () => {
      (Provider.exists as jest.Mock).mockResolvedValue(false);

      const result = await providerService.testProvider('non-existent');

      expect(result).toBe(false);
    });

    it('should return false for provider that is not available', async () => {
      (Provider.exists as jest.Mock).mockResolvedValue(true);

      const mockProvider = {
        isAvailable: jest.fn().mockResolvedValue(false),
      };

      jest.spyOn(providerService, 'getProvider').mockReturnValue(mockProvider as any);

      const result = await providerService.testProvider('openai');

      expect(result).toBe(false);
    });

    it('should return true for working provider', async () => {
      (Provider.exists as jest.Mock).mockResolvedValue(true);

      const mockProvider = {
        isAvailable: jest.fn().mockResolvedValue(true),
      };

      jest.spyOn(providerService, 'getProvider').mockReturnValue(mockProvider as any);

      (Provider.update as jest.Mock).mockResolvedValue(undefined);

      const result = await providerService.testProvider('openai');

      expect(result).toBe(true);
      expect(Provider.update).toHaveBeenCalledWith({ enabled: true }, { where: { name: 'openai' } });
    });

    it('should return false when provider test throws error', async () => {
      (Provider.exists as jest.Mock).mockResolvedValue(true);

      const mockProvider = {
        isAvailable: jest.fn().mockRejectedValue(new Error('Test error')),
      };

      jest.spyOn(providerService, 'getProvider').mockReturnValue(mockProvider as any);

      const result = await providerService.testProvider('openai');

      expect(result).toBe(false);
    });
  });
});
