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

export default class CohereProvider extends BaseAIProvider {
  /**
   * @inheritDoc
   */
  public static readonly ProviderID: string = 'cohere';

  /**
   * @inheritDoc
   */
  public static readonly ProviderKey: string = 'Cohere';

  /**
   * @inheritDoc
   */
  public static readonly ProviderName: string = 'Cohere';

  /**
   * @inheritDoc
   */
  public static readonly DefaultPrompts: ProviderDefaultPrompt = {
    system:
      'You are a language AI developed by Cohere. Optimize prompts for clarity, coherence, and conciseness while preserving original meaning.',
    role: 'You are a prompt refinement expert. Enhance the structure and expressiveness of user prompts without altering their intent.',
  };

  /**
   * Creates a new provider instance.
   * @inheritDoc
   */
  public static readonly ProviderConfig: ProviderConfig = {
    caption: CohereProvider.ProviderName,
    name: CohereProvider.ProviderID,
    baseUrl: 'https://api.cohere.com/v1',
    apiKey: '',
    timeout: 30000,
  };

  /**
   * @inheritDoc
   */
  constructor(config: ConfigMeta) {
    super(CohereProvider.ProviderKey, {
      baseUrl: config?.baseUrl || CohereProvider.ProviderConfig.baseUrl,
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
        id: 'command-nightly',
        name: 'Command Nightly',
        provider: CohereProvider.ProviderID,
        description: 'Cohere Command nightly model',
        contextLength: 4096,
        maxTokens: 4096,
      },
      {
        id: 'command-light-nightly',
        name: 'Command Light Nightly',
        provider: CohereProvider.ProviderID,
        description: 'Cohere Command Light nightly model',
        contextLength: 4096,
        maxTokens: 2048,
      },
      {
        id: 'command-r',
        name: 'Command R',
        provider: CohereProvider.ProviderID,
        description: 'Cohere Command R model',
        contextLength: 4096,
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
      endpoint: '/chat',

      buildPayload: (aiPrompt, sysPrompt, req, hist) => ({
        model: hist?.model ?? req?.model ?? 'command-nightly',
        messages: [
          { role: 'system', content: sysPrompt },
          { role: 'user', content: aiPrompt },
        ],
        temperature: req?.temperature ?? 0.7,
        max_tokens: req?.maxTokens ?? 2000,
      }),

      parseSyncResponse: async (data, originalText, provider, format) => {
        const text = data.generations?.[0]?.text || '';
        return {
          aiPrompt: originalText,
          enhancedPrompt: await provider.toPromptResponse(
            text,
            originalText,
            CohereProvider,
            format,
          ),
          originalPrompt: originalText,
          model: data.model,
          timestamp: new Date(),
          tokensUsed: data.usage?.total_input_tokens, // Cohere specific
          processingTime: 0,
        };
      },

      stream: {
        hasText: (chunk) => !!chunk.message?.content,
        getText: (chunk) => chunk.message.content,
        isEnd: (chunk) => !!chunk.stop_reason,
        getUsage: (chunk) => chunk.usage?.total_input_tokens || 0,
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
    const gen = await this.generate(request, {
      stream: true,
      history,
    });
    yield* gen as AsyncGenerator<StreamResponse | StreamEnded>;
  }

  /**
   * @inheritDoc
   */
  public async isAvailable(): Promise<boolean> {
    try {
      const resp = await this.client.post('/chat', {
        model: 'command-nightly',
        messages: [{ role: 'user', content: 'test' }],
        max_tokens: 1,
      });
      return !!resp.data.generations;
    } catch {
      return false;
    }
  }
}
