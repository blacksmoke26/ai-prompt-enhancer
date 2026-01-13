/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import BaseAIProvider, {ProviderDefaultPrompt} from '~/base/BaseAIProvider';

// classes
import UniversalPromptComposer from '~/classes/composer/UniversalPromptComposer';
import PromptRequestNormalizer from '~/classes/composer/PromptRequestNormalizer';

// types
import type {AIModel} from '~/types';
import type {ConfigMeta} from '~/database/models';
import type {ProviderConfig} from '~/types/providers';
import type {PromptRequest, PromptResponse, ProviderCapabilities} from '~/types/prompt';

/**
 * OpenRouter API provider for prompt enhancement services
 * @example
 * ```typescript
 * const provider = new OpenRouterProvider({apiKey: 'your-api-key'});
 * const enhanced = await provider.enhancePrompt({
 *   text: 'Write a story',
 *   model: 'openai/gpt-3.5-turbo'
 * });
 * ```
 * @developerNote
 * Extends BaseAIProvider to implement OpenRouter-specific API calls.
 * Handles authentication, model fetching, and prompt enhancement.
 */
export default class OpenRouterProvider extends BaseAIProvider {
  /**
   * A static constant representing the unique identifier for the provider, typically used in internal systems or API integrations.
   * @developerNotes Ensure the ID is lowercase and matches the provider's official identifier.
   */
  public static readonly ProviderID: string = 'openrouter';

  /**
   * A static constant representing the display name or key used for referencing the provider in user-facing contexts.
   * @developerNotes This value should match the provider's official branding.
   */
  public static readonly ProviderKey: string = 'OpenRouter';

  /**
   * A static constant representing the full, official name of the provider, typically used for documentation or identification purposes.
   * @developerNotes Ensure consistency with the provider's official name and use proper casing.
   */
  public static readonly ProviderName: string = 'OpenRouter';

  /**
   * A static constant representing the default prompts used by the provider.
   * @developerNotes These prompts should be tailored to the specific needs of the provider and should be updated as needed.
   */
  public static readonly DefaultPrompts: ProviderDefaultPrompt = {
    system: 'You are an AI assistant routed through OpenRouter. Adapt and enhance prompts to work well across multiple underlying models.',
    role: 'You are a universal prompt optimizer. Ensure prompts are robust, model-agnostic, and clearly formulated.',
  };

  /**
   * Static configuration object defining the provider's settings.
   * @interface ProviderConfig
   * @property {string} caption - Display name of the provider, typically derived from `ProviderName`.
   * @property {string} name - Unique identifier for the provider, derived from `ProviderID`.
   * @property {string} baseUrl - Base URL for the provider's API endpoint.
   * @property {string} apiKey - API key used for authentication (typically set externally, not hardcoded).
   * @property {number} timeout - Request timeout in milliseconds (default is 30,000 ms).
   * @note The `apiKey` should be configured using a secure method (e.g., environment variables), not directly in the code.
   * @note The `timeout` value is set to 30 seconds by default and can be adjusted based on application needs.
   */
  public static readonly ProviderConfig: ProviderConfig = {
    caption: OpenRouterProvider.ProviderName,
    name: OpenRouterProvider.ProviderID,
    baseUrl: 'https://openrouter.ai/api/v1',
    apiKey: '',
    timeout: 30000,
  };

  /**
   * Initialize OpenRouter provider with API authentication
   * @param config - Configuration object
   * @developerNote
   * Sets up HTTP client with required headers including Bearer token
   * and OpenRouter-specific headers for proper API communication.
   */
  constructor(config: ConfigMeta) {
    super(OpenRouterProvider.ProviderKey, {baseUrl: config?.baseUrl || OpenRouterProvider.ProviderConfig.baseUrl});
    this.client.defaults.headers.common['Authorization'] = `Bearer ${config?.apiKey}`;
    this.client.defaults.headers.common['HTTP-Referer'] = 'http://localhost:5173';
    this.client.defaults.headers.common['X-Title'] = 'Synapse';
  }

  /**
   * Fetch available AI models from OpenRouter API
   * @returns Promise resolving to array of AIModel objects
   * @example
   * ```typescript
   * const models = await provider.getModels();
   * console.log(models[0].name); // 'GPT-4'
   * ```
   * @developerNote
   * Transforms API response into standardized AIModel format.
   * Includes pricing info and sorts models alphabetically by name.
   */
  async getModels(): Promise<AIModel[]> {
    try {
      const response = await this.client.get<{ data: AIModel[] }>('/models');
      const models = response.data.data || [];

      return models.map((model: any) => {
        const [, size = '?b'] = model.id.match(/-(\d+(b|n))/) ?? [];

        return ({
          id: model.id,
          name: model.name || model.id,
          size,
          provider: OpenRouterProvider.ProviderID,
          description: `${model.description} • ${model.pricing?.prompt || 'Free'}`,
          contextLength: model.context_length,
          maxTokens: model.top_provider?.max_completion_tokens,
        });
      }).sort((a, b) => a.name.localeCompare(b.name));
      ;
    } catch (error: any) {
      console.error('Failed to fetch OpenRouter models:', error);
      return [];
    }
  }

  /**
   * Enhance a prompt using OpenRouter's chat completion API
   * @param request - Prompt enhancement request containing text and options
   * @returns Promise resolving to enhanced prompt response
   * @example
   * ```typescript
   * const response = await provider.enhancePrompt({
   *   text: 'help me code',
   *   model: 'anthropic/claude-2',
   *   enhancementType: 'enhance'
   * });
   * ```
   * @developerNote
   * Builds system prompt based on enhancement type and user role.
   * Measures processing time and includes token usage in response.
   */
  async generateSync(request: PromptRequest): Promise<PromptResponse> {
    const startTime = Date.now();

    const promptRequest = await PromptRequestNormalizer.normalize({
      ...request,
    });

    const aiPrompt = UniversalPromptComposer.generate(promptRequest);

    try {
      const response = await this.client.post('/chat/completions', {
        model: request.model,
        messages: [
          {role: 'system', content: promptRequest.systemPrompt},
          {role: 'user', content: aiPrompt},
        ],
        temperature: request.temperature || 0.7,
        max_tokens: request.maxTokens || 2000,
      });

      const enhancedPrompt = await this.toPromptResponse(
        response.data.choices[0]?.message?.content, request.text, OpenRouterProvider, request?.format || 'markdown'
      );

      return {
        aiPrompt,
        enhancedPrompt,
        originalPrompt: request.text,
        model: request.model,
        timestamp: new Date(),
        tokensUsed: response.data.usage?.total_tokens,
        processingTime: this.calculateProcessingTime(startTime),
      };
    } catch (error: any) {
      console.error('OpenRouter enhancement failed:', error);
      throw new Error(`Failed to enhance prompt with OpenRouter: ${error}`);
    }
  }

  /**
   * Check if OpenRouter API is accessible
   * @returns Promise resolving to boolean indicating API availability
   * @example
   * ```typescript
   * if (await provider.isAvailable()) {
   *   // Safe to make API calls
   * }
   * ```
   * @developerNote
   * Uses lightweight /models endpoint for connectivity check.
   * Returns false on any network or authentication error.
   */
  async isAvailable(): Promise<boolean> {
    try {
      await this.client.get('/models');
      return true;
    } catch {
      return false;
    }
  }
}
