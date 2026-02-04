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

export default class HuggingFaceProvider extends BaseAIProvider {
  /**
   * @inheritDoc
   */
  public static readonly ProviderID: string = 'huggingface';

  /**
   * @inheritDoc
   */
  public static readonly ProviderKey: string = 'HuggingFace';

  /**
   * @inheritDoc
   */
  public static readonly ProviderName: string = 'HuggingFace';

  /**
   * @inheritDoc
   */
  public static readonly DefaultPrompts: ProviderDefaultPrompt = {
    system:
      'You are a Hugging Face AI assistant. Improve prompts with attention to open-model best practices, clarity, and technical nuance.',
    role: 'You are a community-focused prompt optimizer. Enhance prompts to work well across diverse open-source models.',
  };

  /**
   * @inheritDoc
   */
  public static readonly ProviderConfig: ProviderConfig = {
    caption: HuggingFaceProvider.ProviderName,
    name: HuggingFaceProvider.ProviderID,
    baseUrl: 'https://api-inference.huggingface.co/models',
    apiKey: '',
    timeout: 30000,
  };

  /**
   * Creates a new provider instance.
   * @inheritDoc
   */
  constructor(config: ConfigMeta) {
    super(HuggingFaceProvider.ProviderKey, {
      baseUrl: config?.baseUrl || HuggingFaceProvider.ProviderConfig.baseUrl,
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
        id: 'EleutherAI/gpt-neo-2.7B',
        name: 'GPT‑Neo 2.7B',
        provider: HuggingFaceProvider.ProviderID,
        description: 'EleutherAI GPT‑Neo 2.7B model',
        contextLength: 2048,
        maxTokens: 1024,
      },
      {
        id: 'gpt2',
        name: 'GPT‑2',
        provider: HuggingFaceProvider.ProviderID,
        description: 'OpenAI GPT‑2 base model',
        contextLength: 1024,
        maxTokens: 512,
      },
      {
        id: 'distilgpt2',
        name: 'DistilGPT‑2',
        provider: HuggingFaceProvider.ProviderID,
        description: 'Distilled GPT‑2 model',
        contextLength: 1024,
        maxTokens: 512,
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
      // Dynamic endpoint based on model ID
      endpoint: `/${request.model}`,

      buildPayload: (aiPrompt, sysPrompt, req, hist) => ({
        inputs: `${sysPrompt}\n\n${aiPrompt}`,
        parameters: {
          max_length: req?.maxTokens ?? 2000,
          temperature: req?.temperature ?? 0.7,
        },
      }),

      parseSyncResponse: async (data, originalText, provider, format) => {
        const text = data?.[0].generated_text || '';
        return {
          aiPrompt: originalText,
          enhancedPrompt: await provider.toPromptResponse(
            text,
            originalText,
            HuggingFaceProvider,
            format,
          ),
          originalPrompt: originalText,
          model: request.model,
          timestamp: new Date(),
          tokensUsed: data?.usage?.total_tokens,
          processingTime: 0,
        };
      },

      stream: {
        hasText: (chunk) => !!chunk[0]?.generated_text,
        getText: (chunk) => chunk[0].generated_text,
        isEnd: (chunk) => !!chunk[0]?.finish_reason,
        getUsage: (chunk) => chunk[0]?.usage?.total_tokens || 0,
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
  async isAvailable(): Promise<boolean> {
    try {
      const resp = await this.client.post('/gpt2', {
        inputs: 'test',
        parameters: { max_length: 1 },
      });
      return Array.isArray(resp.data) && resp.data.length > 0;
    } catch {
      return false;
    }
  }
}
