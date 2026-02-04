/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import BaseAIProvider, { ProviderDefaultPrompt } from '~/base/BaseAIProvider';

// classes
import StreamEnded from '~/classes/StreamEnded';
import AIRequestHandler, { ProviderStrategy } from '~/classes/AIRequestHandler';

// db
import { ConfigMeta, History, HistoryAttributes } from '~/database/models';

// types
import type { AIModel } from '~/types';
import type { ProviderConfig } from '~/types/providers';
import type {
  PromptRequest,
  PromptResponse,
  StreamResponse,
} from '~/types/prompt';

export default class OpenAIProvider extends BaseAIProvider {
  /**
   * @inheritDoc
   */
  public static readonly ProviderID: string = 'openai';

  /**
   * @inheritDoc
   */
  public static readonly ProviderKey: string = 'OpenAi';

  /**
   * @inheritDoc
   */
  public static readonly ProviderName: string = 'OpenAI';

  /**
   * @inheritDoc
   */
  public static readonly DefaultPrompts: ProviderDefaultPrompt = {
    system:
      'You are a grammar and spelling expert. Correct any grammatical errors, spelling mistakes, and improve the clarity of the given prompt while preserving original intent.',
    role: "You are a helpful AI assistant developed by OpenAI. Provide clear, accurate, and useful responses to enhance the user's prompt.",
  };

  /**
   * @inheritDoc
   */
  public static readonly ProviderConfig: ProviderConfig = {
    caption: OpenAIProvider.ProviderName,
    name: OpenAIProvider.ProviderID,
    baseUrl: 'https://api.openai.com/v1',
    apiKey: '',
    timeout: 30000,
  };

  /**
   * Creates a new provider instance.
   * @inheritDoc
   */
  constructor(config: ConfigMeta) {
    super(OpenAIProvider.ProviderKey, {
      baseUrl: config?.baseUrl || OpenAIProvider.ProviderConfig.baseUrl,
    });
    this.client.defaults.headers.common['Authorization'] =
      `Bearer ${config?.apiKey}`;
  }

  /**
   * @inheritDoc
   */
  async getModels(): Promise<AIModel[]> {
    try {
      const response = await this.client.get<{ data: AIModel[] }>('/models');
      const models = response.data.data || [];

      return models
        .filter((model: any) => model.id.includes('gpt'))
        .map((model: any) => ({
          id: model.id,
          name: model.id,
          provider: OpenAIProvider.ProviderID,
          description: model.owned_by,
          contextLength: this.getContextLength(model.id),
          maxTokens: this.getMaxTokens(model.id),
        }))
        .sort((a, b) => a.id.localeCompare(b.id));
    } catch (error: any) {
      console.error('Failed to fetch OpenAI models:', error);
      return [];
    }
  }

  /**
   * @inheritDoc
   */
  public async generate(
    request: PromptRequest,
    options?: { stream?: boolean; history?: History | HistoryAttributes },
  ): Promise<PromptResponse | AsyncGenerator<StreamResponse | StreamEnded>> {
    const strategy: ProviderStrategy = {
      endpoint: '/chat/completions',

      buildPayload: (aiPrompt, sysPrompt, req, hist) => ({
        model: hist?.model ?? req?.model ?? 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: sysPrompt },
          { role: 'user', content: aiPrompt },
        ],
        temperature: req?.temperature ?? 0.7,
        max_tokens: req?.maxTokens ?? 2000,
      }),

      parseSyncResponse: async (data, originalText, provider, format) => {
        const content = data.choices[0]?.message?.content || '';
        return {
          aiPrompt: originalText,
          enhancedPrompt: await provider.toPromptResponse(
            content,
            originalText,
            OpenAIProvider,
            format,
          ),
          originalPrompt: originalText,
          model: data.model,
          timestamp: new Date(),
          tokensUsed: data.usage?.total_tokens,
          processingTime: 0,
        };
      },

      stream: {
        hasText: (chunk) => !!chunk.choices?.[0]?.delta?.content,
        getText: (chunk) => chunk.choices[0].delta.content,
        isEnd: (chunk) => !!chunk.choices?.[0]?.finish_reason,
        getUsage: (chunk) => chunk.usage?.total_tokens || 0,
      },
    };

    return AIRequestHandler.generate({
      client: this.client,
      request,
      history: options?.history,
      stream: options?.stream ?? false,
      strategy,
      providerInstance: this,
    });
  }

  /**
   * @inheritDoc
   */
  public async generateSync(request: PromptRequest): Promise<PromptResponse> {
    return (await this.generate(request, { stream: false })) as PromptResponse;
  }

  /**
   * @inheritDoc
   */
  public async *generateStream(
    request: PromptRequest,
    history?: History | HistoryAttributes,
  ): AsyncGenerator<StreamResponse | StreamEnded, void, unknown> {
    if (!request && !history) throw new Error('Request or history required');
    const gen = await this.generate(
      request,
      { stream: true, history },
    );
    yield* gen as AsyncGenerator<StreamResponse | StreamEnded>;
  }

  /**
   * @inheritDoc
   */
  async isAvailable(): Promise<boolean> {
    try {
      await this.client.get('/models');
      return true;
    } catch {
      return false;
    }
  }

  /**
   * @inheritDoc
   */
  private getContextLength(modelId: string): number {
    const contexts: Record<string, number> = {
      'gpt-4': 8192,
      'gpt-4-32k': 32768,
      'gpt-4-turbo': 128000,
      'gpt-4o': 128000,
      'gpt-3.5-turbo': 4096,
      'gpt-3.5-turbo-16k': 16385,
    };
    return contexts[modelId] || 4096;
  }

  /**
   * @inheritDoc
   */
  private getMaxTokens(modelId: string): number {
    const maxTokens: Record<string, number> = {
      'gpt-4': 4096,
      'gpt-4-32k': 32768,
      'gpt-4-turbo': 4096,
      'gpt-4o': 4096,
      'gpt-3.5-turbo': 4096,
      'gpt-3.5-turbo-16k': 16385,
    };
    return maxTokens[modelId] || 4096;
  }
}
