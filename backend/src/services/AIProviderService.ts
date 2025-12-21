/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// base
import BaseAIProvider from '~/base/BaseAIProvider';

// db
import {ConfigMeta, Provider} from '~/database/models';

// constants
import {providersClasses} from '~/constants/providers';

// utils
import {toProviderName} from '~/utils/provider';

// types
import type {AIModel, AIProvider} from '~/types';

/**
 * Manages initialization and access to multiple AI provider implementations.
 * @example
 * ```typescript
 * const manager = new AIProviderManager(configManager);
 * const providers = await manager.getAllProviders();
 * const models = await manager.getAllModels();
 * ```
 * @devnote Ensure provider credentials are properly configured before initialization.
 */
export class AIProviderManager {
  private providers: Map<string, BaseAIProvider> = new Map();

  /**
   * Creates an instance of AIProviderManager.
   */
  constructor() {
  }

  /**
   * Initializes all available AI providers based on configuration.
   * @devnote Providers are only added if their required config is present.
   */
  public async load(): Promise<void> {
    const providers = await Provider.getAllProviders();

    for (const [name, config] of Object.entries(providers)) {
      if (!Object.hasOwn(providersClasses, name)) {
        throw new Error(`Provider ${name} is not supported`);
      }

      const ctor = providersClasses[name];
      this.providers.set(name, new ctor(config));
    }
  }

  /**
   * Retrieves all configured providers with their availability status and models.
   * @returns Promise resolving to an array of provider information.
   * @example
   * ```typescript
   * const providers = await manager.getAllProviders();
   * console.log(providers.map(p => p.name));
   * ```
   */
  public async getAllProviders(): Promise<AIProvider[]> {
    const providers: AIProvider[] = [];

    const providerModels = await Provider.findAll({attributes: ['name', 'caption', 'config', 'enabled'], raw: true});

    for await (const providerModel of providerModels) {
      const isAvailable = Boolean(providerModel?.enabled ?? false);
      //const aiProvider = this.getProvider(providerModel.name);

      let models: AIProvider['models'] = [];

      // if (isAvailable && aiProvider) {
      //   models = await aiProvider.getModels();
      // }

      providers.push({
        caption: providerModel.caption,
        name: providerModel.name,
        models,
        isConfigured: isAvailable,
        config: JSON.parse(providerModel.config as unknown as string),
      });
    }

    return providers;
  }

  /**
   * Retrieves all available models from all configured providers.
   * @returns Promise resolving to an array of all available AI models.
   * @devnote Errors are logged but don't prevent other providers from being processed.
   */
  public async getAllModels(): Promise<AIModel[]> {
    const allModels: AIModel[] = [];
    const providers = await Provider.getAllProviders();

    for (const [name, config] of Object.entries(providers)) {
      const provider = this.getProvider(name);
      if (!provider || !config.enabled) continue;

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
   * Gets a specific provider instance by name.
   * @param providerName - The name of the provider to retrieve.
   * @returns The provider instance or undefined if not found.
   * @example
   * ```typescript
   * const openai = manager.getProvider('openai');
   * if (openai) {
   *   const models = await openai.getModels();
   * }
   * ```
   */
  public getProvider(providerName: string): BaseAIProvider | undefined {
    return this.providers.get(toProviderName(providerName));
  }

  /**
   * Refreshes all providers by clearing and reinitializing them.
   * @devnote Useful after configuration changes.
   */
  public async refreshProviders(): Promise<void> {
    this.providers.clear();
    await this.load();
  }

  /**
   * Retrieves the configuration for a specific provider.
   * @param providerName - The name of the provider.
   * @returns The provider configuration or undefined if not found.
   * @devnote This is a private helper method.
   */
  private async getProviderConfig(providerName: string): Promise<ConfigMeta | null> {
    const model = await Provider.findOne({
      attributes: ['config'],
      where: {name: toProviderName(providerName)},
      raw: true,
    });

    return model?.config ?? null;
  }

  /**
   * Gets the names of all available providers.
   * @returns An array of provider names.
   * @example
   * ```typescript
   * const names = manager.getAvailableProviderNames();
   * console.log('Available providers:', names);
   * ```
   */
  public async getAvailableProviderNames(): Promise<string[]> {
    const records = await Provider.findAll({
      attributes: ['name'],
    });

    return records.map(record => record.name);
  }

  /**
   * Tests if a provider is available and properly configured.
   * @param providerName - The name of the provider to test.
   * @returns Promise resolving to true if the provider is available.
   * @example
   * ```typescript
   * const isWorking = await manager.testProvider('openai');
   * if (isWorking) {
   *   console.log('OpenAI is available');
   * }
   * ```
   */
  public async testProvider(providerName: string): Promise<boolean> {
    const exist = await Provider.exists(toProviderName(providerName));

    if (!exist) return false;

    const provider = this.getProvider(toProviderName(providerName));
    if (!provider) return false;

    try {
      const available = await provider.isAvailable();
      if (available) {
        await Provider.update({enabled: available}, {where: {name: toProviderName(providerName)}});
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }
}
