import { ConfigManager } from '~/config/ConfigManager';
import { OllamaProvider } from './OllamaProvider';
import { OpenAIProvider } from './OpenAIProvider';
import { OpenRouterProvider } from './OpenRouterProvider';
import { DeepSeekProvider } from './DeepSeekProvider';
import { BaseAIProvider } from './BaseAIProvider';

// types
import type { AIModel, AIProvider } from '~/types';

/**
 * Manages AI providers and their configurations.
 * Provides centralized access to multiple AI providers and their models.
 *
 * @example
 * ```typescript
 * const manager = new AIProviderManager(configManager);
 * const providers = await manager.getAllProviders();
 * ```
 *
 * @developerNote
 * Supports dynamic provider initialization based on configuration.
 * Handles provider availability checks and model retrieval.
 */
export class AIProviderManager {
  private configManager: ConfigManager;
  private providers: Map<string, BaseAIProvider> = new Map();

  /**
   * Initializes the provider manager with configuration.
   * @param configManager - The configuration manager instance.
   */
  constructor(configManager: ConfigManager) {
    this.configManager = configManager;
    this.initializeProviders();
  }

  /**
   * Initializes all available providers based on configuration.
   * Sets up providers that have valid configuration values.
   */
  private initializeProviders(): void {
    const config = this.configManager.getConfig();

    // Initialize Ollama (always available if URL is configured)
    if (config.ollama.url) {
      this.providers.set('ollama', new OllamaProvider(config.ollama.url));
    }

    // Initialize OpenAI if API key is provided
    if (config.openai?.apiKey) {
      this.providers.set('openai', new OpenAIProvider(config.openai.apiKey, config.openai.baseUrl));
    }

    // Initialize OpenRouter if API key is provided
    if (config.openrouter?.apiKey) {
      this.providers.set('openrouter', new OpenRouterProvider(config.openrouter.apiKey));
    }

    // Initialize DeepSeek if API key is provided
    if (config.deepseek?.apiKey) {
      this.providers.set('deepseek', new DeepSeekProvider(config.deepseek.apiKey));
    }
  }

  /**
   * Retrieves all configured providers with their status.
   * @returns Promise resolving to array of provider information.
   *
   * @example
   * ```typescript
   * const providers = await manager.getAllProviders();
   * console.log(providers.map(p => p.name));
   * ```
   */
  public async getAllProviders(): Promise<AIProvider[]> {
    const providers: AIProvider[] = [];

    for (const [key, provider] of this.providers) {
      const isAvailable = await provider.isAvailable();
      const models = isAvailable ? await provider.getModels() : [];

      providers.push({
        name: key,
        models,
        isConfigured: isAvailable,
        config: this.getProviderConfig(key),
      });
    }

    return providers;
  }

  /**
   * Gets all available models from all configured providers.
   * @returns Promise resolving to array of all available models.
   *
   * @example
   * ```typescript
   * const models = await manager.getAllModels();
   * const modelNames = models.map(m => m.name);
   * ```
   */
  public async getAllModels(): Promise<AIModel[]> {
    const allModels: AIModel[] = [];

    for (const provider of this.providers.values()) {
      try {
        if (await provider.isAvailable()) {
          const models = await provider.getModels();
          allModels.push(...models);
        }
      } catch (error: any) {
        console.error('Failed to get models from provider:', error);
      }
    }

    return allModels;
  }

  /**
   * Retrieves a specific provider by name.
   * @param providerName - The name of the provider to retrieve.
   * @returns The provider instance or undefined if not found.
   */
  public getProvider(providerName: string): BaseAIProvider | undefined {
    return this.providers.get(providerName.toLowerCase());
  }

  /**
   * Refreshes all providers by reinitializing them.
   * Useful after configuration changes.
   */
  public async refreshProviders(): Promise<void> {
    this.providers.clear();
    this.initializeProviders();
  }

  /**
   * Gets configuration details for a specific provider.
   * @param providerName - The name of the provider.
   * @returns The provider configuration or undefined.
   */
  private getProviderConfig(providerName: string): Record<string, any> | undefined {
    const config = this.configManager.getConfig();

    switch (providerName.toLowerCase()) {
      case 'ollama':
        return config.ollama;
      case 'openai':
        return config.openai;
      case 'openrouter':
        return config.openrouter;
      case 'deepseek':
        return config.deepseek;
      default:
        return undefined;
    }
  }

  /**
   * Gets list of all available provider names.
   * @returns Array of provider names.
   */
  public getAvailableProviderNames(): string[] {
    return Array.from(this.providers.keys());
  }

  /**
   * Tests if a provider is available and responsive.
   * @param providerName - The name of the provider to test.
   * @returns Promise resolving to true if provider is available.
   *
   * @example
   * ```typescript
   * const isWorking = await manager.testProvider('openai');
   * if (isWorking) console.log('OpenAI provider is available');
   * ```
   */
  public async testProvider(providerName: string): Promise<boolean> {
    const provider = this.getProvider(providerName);
    if (!provider) return false;

    try {
      return await provider.isAvailable();
    } catch {
      return false;
    }
  }
}
