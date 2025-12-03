/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import {ConfigManager} from '~/config/ConfigManager';
import {BaseAIProvider} from '~/base/BaseAIProvider';

import env from '@junaidatari/env-binder';

// provider imports
import {OllamaProvider} from '~/providers/OllamaProvider';
import {OpenAIProvider} from '~/providers/OpenAIProvider';
import {OpenRouterProvider} from '~/providers/OpenRouterProvider';
import {DeepSeekProvider} from '~/providers/DeepSeekProvider';
import {CozeProvider} from '~/providers/CozeProvider';
import {QianFanProvider} from '~/providers/QianFanProvider';
import {GeminiProvider} from '~/providers/GeminiProvider';
import {KimiProvider} from '~/providers/KimiProvider';
import {GroqProvider} from '~/providers/GroqProvider';
import {AnthropicProvider} from '~/providers/AnthropicProvider';
import {MistralProvider} from '~/providers/MistralProvider';
import {NvidiaProvider} from '~/providers/NvidiaProvider';
import {CohereProvider} from '~/providers/CohereProvider';
import {CodyProvider} from '~/providers/CodyProvider';
import {XAIProvider} from '~/providers/XAIProvider';
import {HuggingFaceProvider} from '~/providers/HuggingFaceProvider';
import {SiliconFlowProvider} from '~/providers/SiliconFlowProvider';
import {ZhipuProvider} from '~/providers/ZhipuProvider';

// types
import type {AIModel, AIProvider, AppConfig} from '~/types';

const providers: Record<string, new (...args: any[]) => BaseAIProvider> = {
  openai: OpenAIProvider,
  openrouter: OpenRouterProvider,
  deepseek: DeepSeekProvider,
  coze: CozeProvider,
  qianfan: QianFanProvider,
  gemini: GeminiProvider,
  kimi: KimiProvider,
  groq: GroqProvider,
  anthropic: AnthropicProvider,
  mistral: MistralProvider,
  nvidia: NvidiaProvider,
  cohere: CohereProvider,
  cody: CodyProvider,
  xai: XAIProvider,
  huggingface: HuggingFaceProvider,
  siliconflow: SiliconFlowProvider,
  zhipu: ZhipuProvider,
};

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
  private configManager: ConfigManager;
  private providers: Map<string, BaseAIProvider> = new Map();

  /**
   * Creates an instance of AIProviderManager.
   * @param configManager - The configuration manager instance.
   */
  constructor(configManager: ConfigManager) {
    this.configManager = configManager;
    this.initializeProviders();
  }

  /**
   * Initializes all available AI providers based on configuration.
   * @devnote Providers are only added if their required config is present.
   */
  private initializeProviders(): void {
    const config = this.configManager.getConfig();

    if (config.ollama?.url) {
      this.providers.set('ollama', new OllamaProvider(config.ollama.url));
    }

    const availableProviders: string[] = env.getStringArray('AVAILABLE_PROVIDERS', []);

    for (const [key, ctor] of Object.entries(providers)) {
      if (availableProviders.length && !availableProviders.includes(key)) continue;

      const providerName = key as keyof AppConfig;
      const providerConfig = config?.[providerName] as Record<string, any>;
      this.providers.set(key, new ctor(providerConfig?.apiKey, providerConfig?.baseUrl));
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
   * Retrieves all available models from all configured providers.
   * @returns Promise resolving to an array of all available AI models.
   * @devnote Errors are logged but don't prevent other providers from being processed.
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
    return this.providers.get(providerName.toLowerCase());
  }

  /**
   * Refreshes all providers by clearing and reinitializing them.
   * @devnote Useful after configuration changes.
   */
  public async refreshProviders(): Promise<void> {
    this.providers.clear();
    this.initializeProviders();
  }

  /**
   * Retrieves the configuration for a specific provider.
   * @param providerName - The name of the provider.
   * @returns The provider configuration or undefined if not found.
   * @devnote This is a private helper method.
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
      case 'coze':
        return config.coze;
      case 'qianfan':
        return config.qianfan;
      case 'gemini':
        return config.gemini;
      case 'kimi':
        return config.kimi;
      case 'groq':
        return config.groq;
      case 'anthropic':
        return config.anthropic;
      case 'mistral':
        return config.mistral;
      case 'nvidia':
        return config.nvidia;
      case 'cohere':
        return config.cohere;
      case 'cody':
        return config.cody;
      case 'xai':
        return config.xai;
      case 'huggingface':
        return config.huggingface;
      case 'siliconflow':
        return config.siliconflow;
      case 'zhipu':
        return config.zhipu;
      default:
        return undefined;
    }
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
  public getAvailableProviderNames(): string[] {
    return Array.from(this.providers.keys());
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
    const provider = this.getProvider(providerName.toLowerCase());
    console.log('provider:', provider, this);
    if (!provider) return false;
    try {
      return await provider.isAvailable();
    } catch {
      return false;
    }
  }
}
