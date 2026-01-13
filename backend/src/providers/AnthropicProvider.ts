/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import BaseAIProvider, { ProviderDefaultPrompt } from '~/base/BaseAIProvider';

// classes
import PromptRequestNormalizer from '~/classes/composer/PromptRequestNormalizer';
import UniversalPromptComposer from '~/classes/composer/UniversalPromptComposer';

// types
import type { AIModel } from '~/types';
import type { ConfigMeta } from '~/database/models';
import type { ProviderConfig } from '~/types/providers';
import type {
  FunctionCallResult,
  FunctionDefinition,
  PromptRequest,
  PromptResponse,
} from '~/types/prompt';

/**
 * Anthropic AI provider for prompt enhancement.
 *
 * @example
 * ```ts
 * const provider = new AnthropicProvider({apiKey: 'your-api-key'});
 * const enhanced = await provider.enhancePrompt({
 *   text: 'Explain relativity',
 *   model: 'claude-3-haiku-20240307',
 *   enhancementType: 'enhance'
 * });
 * ```
 * @developerNote Uses Anthropic's Claude models with custom system prompts for different enhancement types
 */
export default class AnthropicProvider extends BaseAIProvider {
  /**
   * A static constant representing the unique identifier for the provider, typically used in internal systems or API integrations.
   * @developerNotes Ensure the ID is lowercase and matches the provider's official identifier.
   */
  public static readonly ProviderID: string = 'anthropic';

  /**
   * A static constant representing the display name or key used for referencing the provider in user-facing contexts.
   * @developerNotes This value should match the provider's official branding.
   */
  public static readonly ProviderKey: string = 'Anthropic';

  /**
   * A static constant representing the full, official name of the provider, typically used for documentation or identification purposes.
   * @developerNotes Ensure consistency with the provider's official name and use proper casing.
   */
  public static readonly ProviderName: string = 'Anthropic';

  /**
   * A static constant representing the default prompts used by the provider.
   * @developerNotes These prompts should be tailored to the specific needs of the provider and should be updated as needed.
   */
  public static readonly DefaultPrompts: ProviderDefaultPrompt = {
    system:
      'You are Claude, an AI assistant created by Anthropic. Focus on being helpful, harmless, and honest while enhancing the prompt.',
    role: 'You are an expert prompt engineer. Analyze and improve the given prompt while maintaining its core purpose.',
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
    caption: AnthropicProvider.ProviderName,
    name: AnthropicProvider.ProviderID,
    baseUrl: 'https://api.anthropic.com',
    apiKey: '',
    timeout: 30000,
  };

  /**
   * Creates a new Anthropic provider instance.
   * @param config - Configuration object
   */
  constructor(config: ConfigMeta) {
    super(AnthropicProvider.ProviderKey, {
      baseUrl: config?.baseUrl || AnthropicProvider.ProviderConfig.baseUrl,
    });
    this.client.defaults.headers.common['Authorization'] =
      `Bearer ${config?.apiKey}`;
    this.client.defaults.headers.common['Anthropic-Version'] = '2023-06-01';
    this.client.defaults.headers.common['Content-Type'] = 'application/json';
  }

  /**
   * Returns available Anthropic models.
   * @developerNote Currently includes Claude 3.5 Sonnet and Claude 3 Haiku with their specifications
   */
  async getModels(): Promise<AIModel[]> {
    return [
      {
        id: 'claude-3-5-sonnet-20240620',
        name: 'Claude 3.5 Sonnet',
        provider: AnthropicProvider.ProviderID,
        description: 'Claude 3.5 Sonnet model',
        contextLength: 8192,
        maxTokens: 4096,
      },
      {
        id: 'claude-3-haiku-20240307',
        name: 'Claude 3 Haiku',
        provider: AnthropicProvider.ProviderID,
        description: 'Claude 3 Haiku model',
        contextLength: 4096,
        maxTokens: 2048,
      },
    ];
  }

  /**
   * Enhances a prompt using Anthropic's Claude models.
   * @param request - The prompt enhancement request
   * @returns Enhanced prompt response with metadata
   * @developerNote Sends the original prompt with a system instruction for enhancement
   */
  public async generateSync(request: PromptRequest): Promise<PromptResponse> {
    const startTime = Date.now();

    // Input validation and sanitization
    if (!request.text?.trim()) {
      // noinspection ExceptionCaughtLocallyJS
      throw new Error('Empty prompt text provided');
    }

    const sanitizedText = this.sanitizeInput(request.text);

    const promptRequest = await PromptRequestNormalizer.normalize({
      ...request,
    });

    const aiPrompt = UniversalPromptComposer.generate(promptRequest);

    try {
      const response = await this.client.post('/messages', {
        model: request.model,
        max_tokens: request.maxTokens ?? 2000,
        temperature: request.temperature ?? 0.7,
        system: promptRequest.systemPrompt,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: aiPrompt,
              },
            ],
          },
        ],
      });

      const enhanced = await this.toPromptResponse(
        response.data.content?.[0]?.text,
        sanitizedText,
        AnthropicProvider,
        request?.format || 'markdown',
      );

      return {
        aiPrompt,
        enhancedPrompt: enhanced,
        originalPrompt: request.text,
        model: request.model,
        timestamp: new Date(),
        tokensUsed: response.data.usage?.total_tokens,
        processingTime: this.calculateProcessingTime(startTime),
      };
    } catch (error: any) {
      console.error('Anthropic enhancement failed:', error);
      throw new Error(`Failed to enhance prompt with Anthropic: ${error}`);
    }
  }

  /**
   * Checks if the Anthropic API is accessible.
   * @developerNote Makes a minimal API call with Claude 3 Haiku to verify connectivity
   */
  async isAvailable(): Promise<boolean> {
    try {
      const resp = await this.client.post('/messages', {
        model: 'claude-3-haiku-20240307',
        max_tokens: 1,
        temperature: 0,
        system: 'You are a helpful assistant.',
        messages: [{ role: 'user', content: [{ type: 'text', text: 'test' }] }],
      });
      return !!resp.data.content;
    } catch {
      return false;
    }
  }

  /**
   * @inheritDoc
   */
  async callFunction(
    functions: FunctionDefinition[],
    request: PromptRequest,
  ): Promise<FunctionCallResult[] | null> {
    const promptRequest = await PromptRequestNormalizer.normalize({
      ...request,
    });

    const aiPrompt = UniversalPromptComposer.generate(promptRequest);

    try {
      const response = await this.client.post('/messages', {
        model: request.model,
        max_tokens: request.maxTokens ?? 2000,
        temperature: request.temperature ?? 0.7,
        system: promptRequest.systemPrompt,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: aiPrompt,
              },
            ],
          },
        ],
        tools: functions.map((fn) => ({
          name: fn.name,
          description: fn.description,
          input_schema: {
            type: 'object',
            properties: fn.parameters?.properties || {},
            required: fn.parameters?.required || [],
          },
        })),
      });

      const toolUseBlocks = response.data.content?.filter(
        (block: any) => block.type === 'tool_use',
      );

      if (!toolUseBlocks || toolUseBlocks.length === 0) {
        return null;
      }

      return toolUseBlocks.map((block: any) => ({
        name: block.name,
        arguments: block.input,
        result: null,
      })) as FunctionCallResult[];
    } catch (error: any) {
      console.error('Anthropic function calling failed:', error);
      throw new Error(
        `Failed to call function with Anthropic: ${error.message}`,
      );
    }
  }

  /**
   * @inheritDoc
   */
  async versionInfo(): Promise<{
    apiVersion: string;
    serviceVersion: string;
    providerVersion: string;
  }> {
    try {
      const response = await this.client.head('/');
      const apiVersion =
        response.headers['anthropic-version'] ||
        this.client.defaults.headers.common['Anthropic-Version'] ||
        'unknown';

      return {
        apiVersion: apiVersion as string,
        serviceVersion: '1.0.0',
        providerVersion: 'anthropic-sdk-2024',
      };
    } catch (error) {
      return {
        apiVersion:
          (this.client.defaults.headers.common[
            'Anthropic-Version'
          ] as string) || 'unknown',
        serviceVersion: '1.0.0',
        providerVersion: 'anthropic-sdk-2024',
      };
    }
  }
}
