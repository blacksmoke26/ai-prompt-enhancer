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

export default class AnthropicProvider extends BaseAIProvider {
  /**
   * @inheritDoc
   */
  public static readonly ProviderID: string = 'anthropic';

  /**
   * @inheritDoc
   */
  public static readonly ProviderKey: string = 'Anthropic';

  /**
   * @inheritDoc
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
   * @inheritDoc
   */
  public static readonly ProviderConfig: ProviderConfig = {
    caption: AnthropicProvider.ProviderName,
    name: AnthropicProvider.ProviderID,
    baseUrl: 'https://api.anthropic.com',
    apiKey: '',
    timeout: 30000,
  };

  /**
   * Creates a new provider instance.
   * @inheritDoc
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
   * @inheritDoc
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
   * @inheritDoc
   */
  public async generate(
    request: PromptRequest,
    options?: { stream?: boolean; history?: History | HistoryAttributes },
  ): Promise<PromptResponse | AsyncGenerator<StreamResponse | StreamEnded>> {
    const strategy: ProviderStrategy = {
      endpoint: '/messages',

      buildPayload: (aiPrompt, sysPrompt, req, hist) => ({
        model: hist?.model ?? req?.model ?? 'claude-3-5-sonnet-20240620',
        max_tokens: req?.maxTokens ?? 2000,
        temperature: req?.temperature ?? 0.7,
        system: sysPrompt,
        messages: [
          {
            role: 'user',
            content: [{ type: 'text', text: aiPrompt }],
          },
        ],
      }),

      parseSyncResponse: async (data, originalText, provider, format) => {
        const text = data.content?.[0]?.text || '';
        return {
          aiPrompt: originalText, // Simplified
          enhancedPrompt: await provider.toPromptResponse(
            text,
            originalText,
            AnthropicProvider,
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
        hasText: (chunk) => chunk.type === 'content_block_delta' && !!chunk.delta?.text,
        getText: (chunk) => chunk.delta.text,
        isEnd: (chunk) => chunk.type === 'message_stop',
        getUsage: (chunk) => chunk.usage?.input_tokens + chunk.usage?.output_tokens || 0,
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
    // Keep specific implementation as it differs significantly from standard generation
    // This could be refactored to use the handler too, but kept separate for brevity/clarity here.
    const response = await this.client.post('/messages', {
      model: request.model,
      max_tokens: request.maxTokens ?? 2000,
      temperature: request.temperature ?? 0.7,
      system: request.systemPrompt, // Assuming normalized
      messages: [{ role: 'user', content: [{ type: 'text', text: request.text }] }],
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

    if (!toolUseBlocks || toolUseBlocks.length === 0) return null;

    return toolUseBlocks.map((block: any) => ({
      name: block.name,
      arguments: block.input,
      result: null,
    }));
  }
}
