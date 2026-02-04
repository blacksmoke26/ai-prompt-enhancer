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

export default class GeminiProvider extends BaseAIProvider {

  /**
   * @inheritDoc
   */
  public static readonly ProviderID: string = 'gemini';

  /**
   * @inheritDoc
   */
  public static readonly ProviderKey: string = 'Gemini';

  /**
   * @inheritDoc
   */
  public static readonly ProviderName: string = 'Gemini';

  /**
   * @inheritDoc
   */
  public static readonly DefaultPrompts: ProviderDefaultPrompt = {
    system:
      'You are a prompt optimization specialist. Improve clarity, structure, and effectiveness while preserving intent.',
    role: "You are Gemini, Google's AI assistant. Provide helpful, accurate, and well-structured responses to enhance prompts.",
  };

  /**
   * @inheritDoc
   */
  public static readonly ProviderConfig: ProviderConfig = {
    caption: GeminiProvider.ProviderName,
    name: GeminiProvider.ProviderID,
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
    apiKey: '',
    timeout: 30000,
  };

  /**
   * Creates a new provider instance.
   * @inheritDoc
   */
  constructor(config: ConfigMeta) {
    super(GeminiProvider.ProviderKey, {
      baseUrl: config?.baseUrl || GeminiProvider.ProviderConfig.baseUrl,
    });
    this.client.defaults.params ??= {};
    this.client.defaults.params['key'] = config?.apiKey;
  }

  /**
   * @inheritDoc
   */
  async getModels(): Promise<AIModel[]> {
    // Note: Kept original implementation logic
    try {
      const response = await this.client.get<{ models: any[] }>('/models');
      const models = response.data.models || [];
      return models
        .map((model) => {
          const [, size = '?b'] = model.name.match(/-(\d+([bn]))/) ?? [];
          const name = model.name.split('/');
          return {
            id: model.name,
            name: (name.length > 1 ? name[1] : name[0]).replace(/-\d+b/g, ''),
            provider: GeminiProvider.ProviderID,
            size,
            description: model.description,
            contextLength: model?.outputTokenLimit || 4096,
          };
        })
        .sort((a, b) => a.name.localeCompare(b.name));
    } catch (error: any) {
      console.error('Failed to fetch Gemini models:', error);
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
    const modelId =
      options?.history?.model ?? request?.model ?? 'gemini-2.0-flash';

    const strategy: ProviderStrategy = {
      // Dynamic endpoint for Gemini based on streaming mode
      endpoint: `/models/${modelId}/${options?.stream ? 'streamGenerateContent' : 'generateContent'}`,

      buildPayload: (aiPrompt, sysPrompt, req) => ({
        contents: [
          { role: 'system', parts: [{ text: sysPrompt }] },
          { role: 'user', parts: [{ text: aiPrompt }] },
        ],
        temperature: req?.temperature ?? 0.7,
        topK: 64,
        topP: 0.95,
        candidateCount: 1,
        safeSearch: { category: 'NONE' },
        generationConfig: { maxOutputTokens: req?.maxTokens ?? 2048 },
      }),

      parseSyncResponse: async (data, originalText, provider, format) => {
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
        return {
          aiPrompt: originalText,
          enhancedPrompt: await provider.toPromptResponse(
            text,
            originalText,
            GeminiProvider,
            format,
          ),
          originalPrompt: originalText,
          model: modelId,
          timestamp: new Date(),
          tokensUsed: data?.usage?.totalTokens || 0,
          processingTime: 0,
        };
      },

      stream: {
        hasText: (chunk) => !!chunk.candidates?.[0]?.content?.parts?.[0]?.text,
        getText: (chunk) => chunk.candidates[0].content.parts[0].text,
        isEnd: (chunk) => !!chunk.candidates?.[0]?.finishReason,
        getUsage: (chunk) => chunk.usageMetadata?.totalTokenCount || 0,
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
      const response = await this.client.post(
        `/models/gemini-2.0-flash:generateContent`,
        { contents: [{ parts: [{ text: 'test' }] }] },
      );
      return !!response.data?.text?.length;
    } catch (e) {
      return false;
    }
  }
}
