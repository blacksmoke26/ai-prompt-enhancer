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

/**
 * Vercel AI Gateway provider.
 *
 * Integrates with Vercel's AI Gateway to route requests to various underlying models
 * (OpenAI, Anthropic, etc.) using a unified, OpenAI-compatible interface.
 *
 * @example
 * ```ts
 * const provider = new VercelProvider({
 *   baseUrl: 'https://my-gateway.gateway.vercel.sh/v1',
 *   apiKey: 'your-vercel-api-key'
 * });
 * ```
 */
export default class VercelProvider extends BaseAIProvider {
  /**
   * @inheritDoc
   */
  public static readonly ProviderID: string = 'vercel';

  /**
   * @inheritDoc
   */
  public static readonly ProviderKey: string = 'Vercel';

  /**
   * @inheritDoc
   */
  public static readonly ProviderName: string = 'Vercel AI';

  /**
   * @inheritDoc
   */
  public static readonly DefaultPrompts: ProviderDefaultPrompt = {
    system:
      'You are a high-performance AI assistant routed through Vercel. Optimize prompts for edge-compatibility and speed.',
    role: 'You are a prompt optimization assistant. Focus on concise, effective prompts suitable for edge deployment.',
  };

  /**
   * @inheritDoc
   */
  public static readonly ProviderConfig: ProviderConfig = {
    caption: VercelProvider.ProviderName,
    name: VercelProvider.ProviderID,
    baseUrl: 'https://gateway.vercel.sh', // Placeholder, usually specific to user's gateway
    apiKey: '',
    timeout: 30000,
  };

  /**
   * @inheritDoc
   */
  constructor(config: ConfigMeta) {
    super(VercelProvider.ProviderKey, {
      baseUrl: config?.baseUrl || VercelProvider.ProviderConfig.baseUrl,
    });
    this.client.defaults.headers.common['Authorization'] =
      `Bearer ${config?.apiKey}`;
  }

  /**
   * @inheritDoc
   */
  async getModels(): Promise<AIModel[]> {
    // Vercel Gateway is a router. It doesn't strictly "have" models itself,
    // but allows access to many. We return a list of commonly supported models.
    // In a real implementation, you might fetch the configured providers from Vercel API.
    return [
      {
        id: 'openai/gpt-4o',
        name: 'GPT-4o (Vercel)',
        provider: VercelProvider.ProviderID,
        description: 'OpenAI GPT-4o via Vercel Gateway',
        contextLength: 128000,
        maxTokens: 4096,
      },
      {
        id: 'anthropic/claude-3.5-sonnet',
        name: 'Claude 3.5 Sonnet (Vercel)',
        provider: VercelProvider.ProviderID,
        description: 'Anthropic Claude 3.5 Sonnet via Vercel Gateway',
        contextLength: 200000,
        maxTokens: 4096,
      },
      {
        id: 'meta-llama/llama-3-70b-instruct',
        name: 'Llama 3 70B (Vercel)',
        provider: VercelProvider.ProviderID,
        description: 'Meta Llama 3 70B via Vercel Gateway',
        contextLength: 8192,
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
      // Vercel Gateway uses standard OpenAI paths
      endpoint: '/chat/completions',

      buildPayload: (aiPrompt, sysPrompt, req, hist) => ({
        // Vercel Gateway expects model IDs like "openai/gpt-4o" or "anthropic/claude-3-sonnet"
        model: hist?.model ?? req?.model ?? 'openai/gpt-4o',
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
            VercelProvider,
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
    const gen = await this.generate(request, { stream: true, history });
    yield* gen as AsyncGenerator<StreamResponse | StreamEnded>;
  }

  /**
   * @inheritDoc
   */
  async isAvailable(): Promise<boolean> {
    try {
      // Check availability by listing models or a minimal chat request
      const resp = await this.client.get('/models');
      return !!resp.data;
    } catch {
      return false;
    }
  }
}
