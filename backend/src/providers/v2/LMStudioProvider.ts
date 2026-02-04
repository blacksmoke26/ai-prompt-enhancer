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

export default class LMStudioProvider extends BaseAIProvider {
  /**
   * @inheritDoc
   */
  public static readonly ProviderID: string = 'lmstudio';

  /**
   * @inheritDoc
   */
  public static readonly ProviderKey: string = 'LmStudio';

  /**
   * @inheritDoc
   */
  public static readonly ProviderName: string = 'LM Studio';

  /**
   * @inheritDoc
   */
  public static readonly DefaultPrompts: ProviderDefaultPrompt = {
    system:
      'You are an AI assistant running locally via LM Studio. Optimize prompts for local inference: be clear, concise, and avoid unnecessary complexity.',
    role: 'You are a prompt refiner for local LLMs. Ensure prompts are well-scoped, efficient, and compatible with on-device models.',
  };

  /**
   * @inheritDoc
   */
  public static readonly ProviderConfig: ProviderConfig = {
    caption: LMStudioProvider.ProviderName,
    name: LMStudioProvider.ProviderID,
    baseUrl: 'http://localhost:1234',
    apiKey: '',
    timeout: 30000,
  };

  /**
   * Creates a new provider instance.
   * @inheritDoc
   */
  constructor(config: ConfigMeta) {
    super(LMStudioProvider.ProviderKey, {
      baseUrl: config?.baseUrl ?? LMStudioProvider.ProviderConfig.baseUrl,
    });
  }

  /**
   * @inheritDoc
   */
  async getModels(): Promise<AIModel[]> {
    // Kept original fetching logic
    try {
      const response = await this.client.get<{ data: any[] }>('/api/v0/models');
      const models = response.data.data || [];
      return models
        .map((model) => {
          const [, size = '?b'] = model.id.match(/-(\d+b)/) ?? [];
          const items = model.id.split('-');
          let name = String(items[0]).split('/')[1] ?? '';
          if (name.trim()) {
            name += '-' + items[1];
          }
          return {
            id: model.id,
            name,
            size,
            provider: LMStudioProvider.ProviderID,
            description: `${size} • ${model.type} • ${model.compatibility_type}`,
            contextLength: model?.max_context_length || 4096,
          };
        })
        .sort((a, b) => a.name.localeCompare(b.name));
    } catch (error: any) {
      console.error('Failed to fetch LM Studio models:', error);
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
      endpoint: '/api/v0/completions',

      buildPayload: (aiPrompt, sysPrompt, req, hist) => ({
        model: hist?.model ?? req?.model ?? 'llama2',
        prompt: `${sysPrompt}\n\n${aiPrompt}`,
        stream: false, // handled by request params
        temperature: req?.temperature ?? 0.7,
        max_tokens: req?.maxTokens ?? 2000,
      }),

      parseSyncResponse: async (data, originalText, provider, format) => {
        const text = data.choices?.[0]?.text || '';
        return {
          aiPrompt: originalText,
          enhancedPrompt: await provider.toPromptResponse(
            text,
            originalText,
            LMStudioProvider,
            format,
          ),
          originalPrompt: originalText,
          model: data.model,
          timestamp: new Date(),
          tokensUsed: data.usage?.prompt_tokens,
          processingTime: 0,
        };
      },

      stream: {
        hasText: (chunk) => !!chunk.choices?.[0]?.text,
        getText: (chunk) => chunk.choices[0].text,
        isEnd: (chunk) => !!chunk.choices?.[0]?.finish_reason,
        getUsage: (chunk) => chunk.usage?.prompt_tokens || 0,
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
      await this.client.get('/api/v0/models');
      return true;
    } catch {
      return false;
    }
  }
}
