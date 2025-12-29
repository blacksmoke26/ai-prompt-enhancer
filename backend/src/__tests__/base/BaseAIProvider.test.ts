/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import BaseAIProvider from '../../base/BaseAIProvider';

// Mock the BaseAIProvider class to test its methods
class MockProvider extends BaseAIProvider {
  constructor(config: any) {
    super('mock', config);
  }

  async enhancePrompt(request: PromptRequest): Promise<PromptResponse> {
    throw new Error('Method not implemented.');
  }

  async getUsageMetrics?(since?: number): Promise<UsageMetrics> {
    throw new Error('Method not implemented.');
  }

  async isAvailable(): Promise<boolean> {
    return true;
  }

  async getModels(): Promise<any[]> {
    return [{ name: 'test-model', provider: 'mock' }];
  }

  async enhance(prompt: string): Promise<string> {
    return `Enhanced: ${prompt}`;
  }
}

describe('BaseAIProvider', () => {
  describe('constructor', () => {
    it('should create BaseAIProvider instance with config', () => {
      const config = {
        apiKey: 'test-key',
        baseURL: 'https://api.example.com',
        enabled: true,
      };

      const provider = new MockProvider(config);

      expect(provider).toBeDefined();
      expect(provider['config']).toEqual(config);
    });
  });

  describe('getConfig', () => {
    it('should return the provider configuration', () => {
      const config = {
        apiKey: 'test-key',
        baseURL: 'https://api.example.com',
        enabled: true,
      };

      const provider = new MockProvider(config);

      const result = provider.getConfig();

      expect(result).toEqual(config);
    });
  });

  describe('isAvailable', () => {
    it('should be implemented by subclasses', async () => {
      const provider = new MockProvider({});

      // This should be implemented by subclasses
      const result = await provider.isAvailable();

      expect(result).toBe(true);
    });
  });

  describe('getModels', () => {
    it('should be implemented by subclasses', async () => {
      const provider = new MockProvider({});

      const result = await provider.getModels();

      expect(result).toEqual([{ name: 'test-model', provider: 'mock' }]);
    });
  });

  describe('enhance', () => {
    it('should be implemented by subclasses', async () => {
      const provider = new MockProvider({});

      const result = await provider.enhance('test prompt');

      expect(result).toBe('Enhanced: test prompt');
    });
  });
});
