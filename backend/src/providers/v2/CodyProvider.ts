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
  FunctionCallResult,
  FunctionDefinition,
  PromptRequest,
  PromptResponse,
  StreamResponse,
} from '~/types/prompt';

export default class CodyProvider extends BaseAIProvider {
  /**
   * @inheritDoc
   */
  public static readonly ProviderID: string = 'cody';

  /**
   * @inheritDoc
   */
  public static readonly ProviderKey: string = 'Cody';

  /**
   * @inheritDoc
   */
  public static readonly ProviderName: string = 'Cody';

  /**
   * @inheritDoc
   */
  public static readonly DefaultPrompts: ProviderDefaultPrompt = {
    system:
      'You are Cody, an AI coding assistant from Sourcegraph. Help users refine prompts with a focus on technical accuracy and developer context.',
    role: 'You are a prompt engineering assistant specialized in developer workflows. Improve prompts to be precise, actionable, and context-aware.',
  };

  /**
   * @inheritDoc
   */
  public static readonly ProviderConfig: ProviderConfig = {
    caption: CodyProvider.ProviderName,
    name: CodyProvider.ProviderID,
    baseUrl: 'https://sourcegraph.com',
    apiKey: '',
    timeout: 30000,
  };

  /**
   * Creates a new provider instance.
   * @inheritDoc
   */
  constructor(config: ConfigMeta) {
    super(CodyProvider.ProviderKey, {
      baseUrl: config?.baseUrl || CodyProvider.ProviderConfig.baseUrl,
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
        id: 'cody-code',
        name: 'Cody Code',
        provider: CodyProvider.ProviderID,
        description: 'Cody model optimized for code generation',
        contextLength: 16384,
        maxTokens: 2048,
      },
      {
        id: 'cody-general',
        name: 'Cody General',
        provider: CodyProvider.ProviderID,
        description: 'Cody model optimized for general conversation',
        contextLength: 32768,
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
        model: hist?.model ?? req?.model ?? 'cody-general',
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
            CodyProvider,
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
      const resp = await this.client.post('/chat', {
        model: 'cody-general',
        messages: [{ role: 'user', content: 'test' }],
        max_tokens: 1,
      });
      return !!resp.data.choices;
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
    // Function calling logic separated as per original structure
    const response = await this.client.post('/chat', {
      model: request.model,
      messages: [
        { role: 'system', content: request.systemPrompt },
        { role: 'user', content: request.text },
      ],
      temperature: request.temperature ?? 0.7,
      max_tokens: request.maxTokens ?? 2000,
      functions: functions.map((fn) => ({
        name: fn.name,
        description: fn.description,
        parameters: fn.parameters,
      })),
      function_call: 'auto',
    });

    const message = response.data.choices?.[0]?.message;
    if (message?.function_call) {
      return [
        {
          name: message.function_call.name,
          arguments: JSON.parse(message.function_call.arguments),
          result: message.function_call,
          timestamp: new Date(),
          success: true,
        },
      ];
    }
    return null;
  }
}
