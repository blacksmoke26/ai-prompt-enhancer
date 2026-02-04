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

export default class GroqProvider extends BaseAIProvider {
  /**
   * @inheritDoc
   */
  public static readonly ProviderID: string = 'groq';

  /**
   * @inheritDoc
   */
  public static readonly ProviderKey: string = 'Groq';

  /**
   * @inheritDoc
   */
  public static readonly ProviderName: string = 'Groq';

  /**
   * @inheritDoc
   */
  public static readonly DefaultPrompts: ProviderDefaultPrompt = {
    system:
      'You are a Groq-powered AI assistant optimized for speed and accuracy. Enhance prompts to be concise, unambiguous, and well-structured.',
    role: 'You are a prompt engineer focused on efficiency and precision. Improve prompts for faster, more reliable AI responses.',
  };

  /**
   * @inheritDoc
   */
  public static readonly ProviderConfig: ProviderConfig = {
    caption: GroqProvider.ProviderName,
    name: GroqProvider.ProviderID,
    baseUrl: 'https://api.groq.com',
    apiKey: '',
    timeout: 30000,
  };

  /**
   * Creates a new provider instance.
   * @inheritDoc
   */
  constructor(config: ConfigMeta) {
    super(GroqProvider.ProviderKey, {
      baseUrl: config?.baseUrl || GroqProvider.ProviderConfig.baseUrl,
    });
    this.client.defaults.headers.common['Authorization'] =
      `Bearer ${config?.apiKey}`;
  }

  /**
   * @inheritDoc
   */
  async getModels(): Promise<AIModel[]> {
    // Note: Original implementation fetched models dynamically.
    // We keep that logic here.
    try {
      const response = await this.client.get<{ data: any[] }>(
        '/openai/v1/models',
      );
      const models = response.data.data || [];
      return models
        .map((model) => {
          const [, size = '?b'] = model.id.match(/-(\d+b)/) ?? [];
          const name = model.id.split('/');
          return {
            id: model.id,
            name: (name.length > 1 ? name[1] : name[0]).replace(/-\d+b/g, ''),
            provider: GroqProvider.ProviderID,
            size,
            description: `${size}`,
            contextLength: model?.context_window || 4096,
          };
        })
        .sort((a, b) => a.name.localeCompare(b.name));
    } catch (error: any) {
      console.error('Failed to fetch Groq models:', error);
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
      endpoint: '/openai/v1/chat/completions',

      buildPayload: (aiPrompt, sysPrompt, req, hist) => ({
        model: hist?.model ?? req?.model ?? 'mixtral-8x7b-32768',
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
            GroqProvider,
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
      const resp = await this.client.post('/openai/v1/chat/completions', {
        model: 'mixtral-8x7b-32768',
        messages: [{ role: 'user', content: 'test' }],
        max_tokens: 1,
      });
      return !!resp.data.choices;
    } catch {
      return false;
    }
  }
}
