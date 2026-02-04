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

export default class QianFanProvider extends BaseAIProvider {
  /**
   * @inheritDoc
   */
  public static readonly ProviderID: string = 'qianfan';

  /**
   * @inheritDoc
   */
  public static readonly ProviderKey: string = 'Qianfan';

  /**
   * @inheritDoc
   */
  public static readonly ProviderName: string = 'Qianfan';

  /**
   * @inheritDoc
   */
  public static readonly DefaultPrompts: ProviderDefaultPrompt = {
    system:
      'You are a Qianfan AI assistant by Baidu. Refine prompts to be natural, contextually appropriate, and aligned with Chinese and global best practices.',
    role: 'You specialize in multilingual prompt enhancement. Improve clarity and cultural appropriateness while preserving intent.',
  };

  /**
   * @inheritDoc
   */
  public static readonly ProviderConfig: ProviderConfig = {
    caption: QianFanProvider.ProviderName,
    name: QianFanProvider.ProviderID,
    baseUrl: 'https://dashscope.aliyuncs.com',
    apiKey: '',
    timeout: 30000,
  };

  /**
   * Creates a new provider instance.
   * @inheritDoc
   */
  constructor(config: ConfigMeta) {
    super(QianFanProvider.ProviderKey, {
      baseUrl: config?.baseUrl || QianFanProvider.ProviderConfig.baseUrl,
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
        id: 'qwen-1.5-1.8b-chat',
        name: 'Qwen 1.5 1.8B Chat',
        provider: QianFanProvider.ProviderID,
        description: 'Alibaba Qwen 1.5 1.8B chat model',
        contextLength: 8192,
        maxTokens: 2048,
      },
      {
        id: 'qwen-1.5-72b-chat',
        name: 'Qwen 1.5 72B Chat',
        provider: QianFanProvider.ProviderID,
        description: 'Alibaba Qwen 1.5 72B chat model',
        contextLength: 16384,
        maxTokens: 4096,
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
      endpoint: '/api/v1/services/aigc/text-generation/v1',

      buildPayload: (aiPrompt, sysPrompt, req, hist) => ({
        model: hist?.model ?? req?.model ?? 'qwen-1.5-1.8b-chat',
        input: `SYSTEM: ${sysPrompt}\n\nUSER: ${aiPrompt}`,
        parameters: {
          temperature: req?.temperature ?? 0.7,
          top_p: 1.0,
          max_tokens: req?.maxTokens ?? 2000,
        },
      }),

      parseSyncResponse: async (data, originalText, provider, format) => {
        const content = data.output?.choices?.[0]?.content || '';
        return {
          aiPrompt: originalText,
          enhancedPrompt: await provider.toPromptResponse(
            content,
            originalText,
            QianFanProvider,
            format,
          ),
          originalPrompt: originalText,
          model: request.model,
          timestamp: new Date(),
          tokensUsed: data.usage?.total_tokens,
          processingTime: 0,
        };
      },

      stream: {
        hasText: (chunk) => !!chunk.output?.choices?.[0]?.message?.content,
        getText: (chunk) => chunk.output.choices[0].message.content,
        isEnd: (chunk) => !!chunk.output?.choices?.[0]?.finish_reason,
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
    const gen = await this.generate(request, { stream: true, history });
    yield* gen as AsyncGenerator<StreamResponse | StreamEnded>;
  }

  /**
   * @inheritDoc
   */
  async isAvailable(): Promise<boolean> {
    try {
      const resp = await this.client.post(
        '/api/v1/services/aigc/text-generation/v1',
        {
          model: 'qwen-1.5-1.8b-chat',
          input: 'test',
          parameters: { max_tokens: 1 },
        },
      );
      return !!resp.data.output?.choices;
    } catch {
      return false;
    }
  }
}
