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

export default class KimiProvider extends BaseAIProvider {
  /**
   * @inheritDoc
   */
  public static readonly ProviderID: string = 'kimi';

  /**
   * @inheritDoc
   */
  public static readonly ProviderKey: string = 'Kimi';

  /**
   * @inheritDoc
   */
  public static readonly ProviderName: string = 'Kimi';

  /**
   * @inheritDoc
   */
  public static readonly DefaultPrompts: ProviderDefaultPrompt = {
    system:
      'You are Kimi, a large AI model by Moonshot AI. Refine prompts to be fluent, context-aware, and aligned with user goals.',
    role: 'You are a prompt enhancement specialist. Improve readability and effectiveness while preserving the original meaning.',
  };

  /**
   * @inheritDoc
   */
  public static readonly ProviderConfig: ProviderConfig = {
    caption: KimiProvider.ProviderName,
    name: KimiProvider.ProviderID,
    baseUrl: 'https://api.kimi.ai',
    apiKey: '',
    timeout: 30000,
  };

  /**
   * Creates a new provider instance.
   * @inheritDoc
   */
  constructor(config: ConfigMeta) {
    super(KimiProvider.ProviderKey, {
      baseUrl: config?.baseUrl || KimiProvider.ProviderConfig.baseUrl,
    });
    this.client.defaults.headers.common['Authorization'] =
      `Bearer ${config?.apiKey}`;
  }

  /**
   * @inheritDoc
   */
  async getModels(): Promise<AIModel[]> {
    return [
      {
        id: 'kimi-large',
        name: 'Kimi Large',
        provider: KimiProvider.ProviderID,
        description: 'Kimi large conversational model',
        contextLength: 32768,
        maxTokens: 4096,
      },
      {
        id: 'kimi-3.5',
        name: 'Kimi 3.5',
        provider: KimiProvider.ProviderID,
        description: 'Kimi 3.5 model',
        contextLength: 16384,
        maxTokens: 2048,
      },
    ];
  }

  /**
   * @inheritDoc
   */
  public async generate(
    request: PromptRequest,
    options?: { stream?: boolean; history?: History | HistoryAttributes },
  ): Promise<PromptResponse | AsyncGenerator<StreamResponse | StreamEnded>> {
    const strategy: ProviderStrategy = {
      endpoint: '/v1/chat/completions',

      buildPayload: (aiPrompt, sysPrompt, req, hist) => ({
        model: hist?.model ?? req?.model ?? 'kimi-large',
        messages: [
          { role: 'system', content: sysPrompt },
          { role: 'user', content: aiPrompt },
        ],
        temperature: req?.temperature ?? 0.7,
        max_tokens: req?.maxTokens ?? 2000,
      }),

      parseSyncResponse: async (data, originalText, provider, format) => {
        const content = data.choices?.[0]?.message?.content || '';
        return {
          aiPrompt: originalText,
          enhancedPrompt: await provider.toPromptResponse(
            content,
            originalText,
            KimiProvider,
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
      const resp = await this.client.post('/v1/chat/completions', {
        model: 'kimi-large',
        messages: [{ role: 'user', content: 'test' }],
        max_tokens: 1,
      });
      return !!resp.data.choices;
    } catch {
      return false;
    }
  }
}
