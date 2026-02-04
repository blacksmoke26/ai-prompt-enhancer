/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import { Readable } from 'node:stream';
import axios, { AxiosResponse } from 'axios';
import BaseAIProvider, { ProviderDefaultPrompt } from '~/base/BaseAIProvider';

// classes
import StreamEnded from '~/classes/StreamEnded';
import PromptRequestNormalizer from '~/classes/composer/PromptRequestNormalizer';
import UniversalPromptComposer from '~/classes/composer/UniversalPromptComposer';
import AIRequestHandler, { ProviderStrategy } from '~/classes/AIRequestHandler';

// db
import { ConfigMeta, History, HistoryAttributes } from '~/database/models';

// types
import type { AIModel } from '~/types';
import type { ProviderConfig } from '~/types/providers';
import type {
  FunctionCallResult,
  FunctionDefinition,
  HealthStatus,
  PromptRequest,
  PromptResponse,
  StreamResponse,
} from '~/types/prompt';

export interface OllamaModel {
  readonly name: string;
  readonly model: string;
  readonly modified_at: string;
  readonly size: number;
  readonly digest: string;
  readonly details: {
    readonly parent_model: string;
    readonly format: string;
    readonly family: string;
    readonly families: string[];
    readonly parameter_size: string;
    readonly quantization_level: string;
    readonly context_length?: number;
  };
}

export default class OllamaProvider extends BaseAIProvider {
  /**
   * @inheritDoc
   */
  public static readonly ProviderID: string = 'ollama';

  /**
   * @inheritDoc
   */
  public static readonly ProviderKey: string = 'Ollama';

  /**
   * @inheritDoc
   */
  public static readonly ProviderName: string = 'Ollama';

  /**
   * @inheritDoc
   */
  public static readonly DefaultPrompts: ProviderDefaultPrompt = {
    system:
      'You are an AI assistant running via Ollama. Optimize prompts to be efficient, clear, and well-suited for local LLM execution.',
    role: 'You are a prompt engineer for local models. Improve prompts to be self-contained, unambiguous, and effective on-device.',
  };

  /**
   * @inheritDoc
   */
  public static readonly ProviderConfig: ProviderConfig = {
    caption: OllamaProvider.ProviderName,
    name: OllamaProvider.ProviderID,
    baseUrl: 'http://localhost:11434',
    apiKey: '',
    timeout: 30000,
  };

  /**
   * Creates a new provider instance.
   * @inheritDoc
   */
  constructor(config: ConfigMeta) {
    super(OllamaProvider.ProviderKey, {
      ...config,
      baseUrl: config?.baseUrl ?? OllamaProvider.ProviderConfig.baseUrl,
    });
  }

  /**
   * @inheritDoc
   */
  public async getModels(): Promise<AIModel[]> {
    try {
      const cacheKey = `${this.name}:models:all`;
      const cached = await this.getCachedResponse(cacheKey);
      if (cached) return cached;

      const response = await this.client.get<{ models: OllamaModel[] }>('/api/tags');
      const models = response.data.models || [];
      const result = models.map(
        (model) =>
          ({
            id: model.name,
            size: model.size,
            name: model.name.split(':')[0],
            provider: OllamaProvider.ProviderID,
            description: `${(model.size / 1024 / 1024 / 1024).toFixed(2)}GB • ${model.details?.family || 'unknown'} • ${model.details?.parameter_size || ''}`,
            contextLength: model.details?.context_length || 4096,
            parameters: {
              family: model.details?.family,
              parameter_size: model.details?.parameter_size,
              quantization: model.details?.quantization_level,
              format: model.details?.format,
            },
          }) as unknown as AIModel,
      );

      result.sort((a, b) => a.name.localeCompare(b.name));
      await this.cacheResponse(cacheKey, result, 300000);
      return result;
    } catch (error: any) {
      console.error('Failed to fetch Ollama models:', error);
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
    // Ollama requires a specific payload structure for `/api/generate` (Sync) vs `/api/chat` (Stream)
    // The generic handler is great for Sync, but Stream requires manual NDJSON parsing.

    if (options?.stream) {
      // Manual implementation for stream due to raw buffer parsing requirements
      return this._manualGenerateStream(request, options?.history);
    }

    // Strategy for Synchronous generation (/api/generate)
    const strategy: ProviderStrategy = {
      endpoint: '/api/generate',

      buildPayload: (aiPrompt, sysPrompt, req, hist) => ({
        model: hist?.model ?? req?.model ?? 'llama2',
        prompt: `${sysPrompt}\n\n${aiPrompt}`,
        stream: false,
        options: {
          temperature: Math.max(0, Math.min(1, req.temperature || 0.7)),
          top_p: req?.topP || 1.0,
          top_k: req?.topK || 100,
          num_predict: req?.maxTokens || 2000,
          stop: req?.stopSequences,
          frequency_penalty: req?.frequencyPenalty || 0.0,
          presence_penalty: req?.presencePenalty || 0.0,
        },
      }),

      parseSyncResponse: async (data, originalText, provider, format) => {
        const text = data?.response?.trim() || '';
        return {
          aiPrompt: originalText,
          enhancedPrompt: await provider.toPromptResponse(
            text,
            originalText,
            OllamaProvider,
            format,
          ),
          originalPrompt: originalText,
          model: data.model,
          timestamp: new Date(),
          tokensUsed: data.eval_count || 0,
          processingTime: 0, // Calculated in handler
          metadata: {
            modelDetails: data.model,
            totalDuration: data.total_duration,
            evalDuration: data.eval_duration,
          },
        };
      },

      stream: {
        hasText: () => false,
        getText: () => '',
        isEnd: () => false,
        getUsage: () => 0,
      },
    };

    return AIRequestHandler.generate({
      client: this.client,
      request,
      history: options?.history,
      stream: false,
      strategy,
      providerInstance: this,
    });
  }

  // Separate method for manual stream handling due to NDJSON raw parsing
  private async *_manualGenerateStream(
    request?: PromptRequest,
    history?: History | HistoryAttributes,
  ): AsyncGenerator<StreamResponse | StreamEnded, void, unknown> {
    const startTime = Date.now();

    let aiPrompt: string = '';
    if (request) {
      const promptRequest = await PromptRequestNormalizer.normalize(request);
      aiPrompt = UniversalPromptComposer.generate(promptRequest);
    } else if (history) {
      aiPrompt = history.aiPrompt || '';
    } else {
      throw new Error('One of the request or history param is required');
    }

    try {
      const response: AxiosResponse<Readable> = await this.client.post(
        '/api/chat',
        {
          model: history?.model ?? request?.model ?? '',
          messages: [
            { role: 'system', content: history?.systemPrompt ?? request?.systemPrompt },
            { role: 'user', content: aiPrompt },
          ],
        },
        { responseType: 'stream' },
      );

      const stream = response.data;
      let buffer = '';

      for await (const chunk of stream) {
        buffer += chunk.toString();
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.trim()) {
            try {
              const data = JSON.parse(line) as StreamResponse;
              yield data;

              if (data.done) {
                yield new StreamEnded({
                  aiPrompt,
                  model: data.model,
                  tokensUsed: data?.eval_count ?? 0,
                  processingTime: this.calculateProcessingTime(startTime),
                });
                return;
              }
            } catch (parseError) {
              console.warn('Failed to parse streaming response:', line, parseError);
            }
          }
        }
      }

      if (buffer.trim()) {
        try {
          const data = JSON.parse(buffer) as StreamResponse;
          yield data;
        } catch (parseError) {
          console.warn('Failed to parse final buffer:', buffer, parseError);
        }
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error || error.message;
        console.error(`${OllamaProvider.ProviderName} streaming error:`, errorMessage);
        throw new Error(`${OllamaProvider.ProviderName} API error: ${errorMessage}`);
      }
      console.error('Unexpected streaming error:', error);
      throw new Error(`Failed to stream response from ${OllamaProvider.ProviderName}`);
    }
  }

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
  public async getHealthStatus(): Promise<HealthStatus> {
    try {
      const [versionResponse, modelsResponse] = await Promise.all([
        this.client.get('/api/version'),
        this.client.get('/api/tags'),
      ]);

      const versionData = versionResponse.data;
      const models = modelsResponse.data.models || [];

      return {
        status: 'healthy',
        provider: 'ollama',
        timestamp: Date.now(),
        version: versionData.version,
        uptime: 'unknown',
        services: {
          api: 'operational',
          database: 'operational',
          cache: 'operational',
        },
        resources: {
          cpu: 'unknown',
          memory: 'unknown',
          disk: 'unknown',
        },
        models: {
          total: models.length,
          active: models.length,
          loading: 0,
        },
        requests: {
          rate: 0,
          limit: 'unlimited',
          remaining: 'unlimited',
        },
        latency: {
          p50: 0,
          p95: 0,
          p99: 0,
        },
      };
    } catch (error: any) {
      return {
        status: error.response?.status === 404 ? 'degraded' : 'down',
        provider: 'ollama',
        timestamp: Date.now(),
        version: 'unknown',
        uptime: 'unknown',
        services: {
          api: 'down',
          database: 'unknown',
          cache: 'unknown',
        },
        resources: {
          cpu: 'unknown',
          memory: 'unknown',
          disk: 'unknown',
        },
        models: {
          total: 0,
          active: 0,
          loading: 0,
        },
        requests: {
          rate: 0,
          limit: 'unknown',
          remaining: 'unknown',
        },
        latency: {
          p50: 0,
          p95: 0,
          p99: 0,
        },
        error: error.message,
      };
    }
  }

  /**
   * @inheritDoc
   */
  public async versionInfo(): Promise<{
    apiVersion: string;
    serviceVersion: string;
    providerVersion: string;
  }> {
    try {
      const response = await this.client.get('/api/version');
      const versionData = response.data;
      return {
        apiVersion: versionData.version,
        serviceVersion: versionData.version,
        providerVersion: `${OllamaProvider.ProviderName} v1.0`,
      };
    } catch (error) {
      return {
        apiVersion: 'unknown',
        serviceVersion: 'unknown',
        providerVersion: `${OllamaProvider.ProviderName} v1.0`,
      };
    }
  }

  /**
   * @inheritDoc
   */
  public async isAvailable(): Promise<boolean> {
    try {
      const cacheKey = `${this.name}:availability`;
      const cached = await this.getCachedResponse(cacheKey);
      if (cached !== null) return cached as boolean;

      await this.client.get('/api/tags', { timeout: 5000 });
      await this.cacheResponse(cacheKey, true, 30000);
      return true;
    } catch {
      try {
        await this.client.get('/api/version', { timeout: 2000 });
        await this.cacheResponse(`${this.name}:availability`, true, 30000);
        return true;
      } catch {
        await this.cacheResponse(`${this.name}:availability`, false, 10000);
        return false;
      }
    }
  }

  /**
   * @inheritDoc
   */
  public async callFunction(
    functions: FunctionDefinition[],
    request: PromptRequest,
  ): Promise<FunctionCallResult[] | null> {
    console.warn('Ollama does not support native function calling.');
    return null;
  }

  public async getMaxContextLength(modelName: string): Promise<number> {
    const models = await this.getModels();
    const model = models.find((m) => m.name === modelName.split(':')[0]);
    return model?.contextLength || 8192;
  }

  /**
   * @inheritDoc
   */
  public async estimateTokenCount(text: string, modelName: string): Promise<number> {
    try {
      const response = await this.client.post('/api/tokenize', {
        model: modelName,
        content: text,
      });
      return response.data.tokens?.length || Math.ceil(text.length / 4);
    } catch (error) {
      return Math.ceil(text.length / 4);
    }
  }
}
