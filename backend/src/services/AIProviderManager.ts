import { ConfigManager } from '../config/ConfigManager';
import { OllamaProvider } from './OllamaProvider';
import { OpenAIProvider } from './OpenAIProvider';
import { OpenRouterProvider } from './OpenRouterProvider';
import { DeepSeekProvider } from './DeepSeekProvider';
import { BaseAIProvider } from './BaseAIProvider';
import { AIModel, AIProvider } from '../types';

export class AIProviderManager {
  private configManager: ConfigManager;
  private providers: Map<string, BaseAIProvider> = new Map();

  constructor(configManager: ConfigManager) {
    this.configManager = configManager;
    this.initializeProviders();
  }

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

  public getProvider(providerName: string): BaseAIProvider | undefined {
    return this.providers.get(providerName.toLowerCase());
  }

  public async refreshProviders(): Promise<void> {
    this.providers.clear();
    this.initializeProviders();
  }

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

  public getAvailableProviderNames(): string[] {
    return Array.from(this.providers.keys());
  }

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
