/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import type { AxiosInstance } from 'axios';

// classes
import StreamEnded from '~/classes/StreamEnded';
import BaseAIProvider from '~/base/BaseAIProvider';
import PromptRequestNormalizer from '~/classes/composer/PromptRequestNormalizer';
import UniversalPromptComposer from '~/classes/composer/UniversalPromptComposer';

// db
import type { History, HistoryAttributes } from '~/database/models';

// types
import type {
  PromptRequest,
  PromptResponse,
  StreamResponse,
} from '~/types/prompt';

/**
 * Configuration strategy for handling provider-specific API differences.
 * Allows the generic handler to adapt to different API structures (OpenAI, Anthropic, etc.).
 */
export interface ProviderStrategy<PayloadType = any> {
  /** The API endpoint path (e.g., '/chat/completions' or '/messages') */
  endpoint: string;

  /**
   * Constructs the HTTP request body specific to the provider's API requirements.
   * @param aiPrompt - The composed prompt to send
   * @param sysPrompt - The system prompt
   * @param req - The original request object
   * @param hist - Optional history object
   */
  buildPayload(
    aiPrompt: string,
    sysPrompt: string,
    req: PromptRequest,
    hist?: History | HistoryAttributes,
  ): PayloadType;

  /**
   * Parses the synchronous API response into a standard PromptResponse.
   * @param data - Raw axios response data
   * @param originalText - Original user text
   * @param provider - Instance of the provider (to access toPromptResponse)
   * @param format - Desired output format
   */
  parseSyncResponse(
    data: any,
    originalText: string,
    provider: BaseAIProvider,
    format: string,
  ): Promise<PromptResponse>;

  /** Configuration for parsing streaming responses */
  stream: {
    /** Predicate to check if a chunk contains text content */
    hasText: (chunk: any) => boolean;
    /** Extractor to get the text string from the chunk */
    getText: (chunk: any) => string;
    /** Predicate to check if the stream has ended */
    isEnd: (chunk: any) => boolean;
    /** Extractor to get token usage from the ending chunk */
    getUsage: (chunk: any) => number;
  };
}

/**
 * Static utility class to handle generic AI generation logic.
 * Merges Sync and Stream logic into a unified flow.
 */
export default abstract class AIRequestHandler {
  /**
   * Calculates processing time in milliseconds from start timestamp.
   * @param startTime - Epoch timestamp when operation began
   * @returns Elapsed time in milliseconds
   *
   * @example
   * const start = Date.now();
   * await operation();
   * console.log(calculateProcessingTime(start)); // 123
   *
   * @developer_notes
   * Use for performance monitoring and timeout handling.
   */
  protected static calculateProcessingTime(startTime: number): number {
    return Date.now() - startTime;
  }

  /**
   * Unified generation method handling both synchronous and streaming requests.
   *
   * @param config - Configuration object containing client, request, and strategy
   * @returns Promise resolving to PromptResponse or AsyncGenerator
   */
  public static async generate<T = any>({
    client,
    request,
    history,
    stream,
    strategy,
    providerInstance,
  }: {
    client: AxiosInstance;
    request: PromptRequest;
    history?: History | HistoryAttributes;
    stream: boolean;
    strategy: ProviderStrategy<T>;
    providerInstance: BaseAIProvider;
  }): Promise<PromptResponse | AsyncGenerator<StreamResponse | StreamEnded>> {
    // 1. Normalize Request & Compose Prompt
    const { aiPrompt, systemPrompt } = await AIRequestHandler._prepareInputs(
      request,
      history,
    );

    // 2. Route to specific handler
    if (stream) {
      return this._handleStream<T>({
        client,
        request,
        history,
        strategy,
        providerInstance,
        aiPrompt,
        systemPrompt,
      });
    } else {
      return this._handleSync<T>({
        client,
        request,
        strategy,
        providerInstance,
        aiPrompt,
        systemPrompt,
      });
    }
  }

  /**
   * Handles Synchronous generation.
   */
  private static async _handleSync<T>({
    client,
    request,
    strategy,
    providerInstance,
    aiPrompt,
    systemPrompt,
  }: {
    client: AxiosInstance;
    request: PromptRequest;
    strategy: ProviderStrategy<T>;
    providerInstance: BaseAIProvider;
    aiPrompt: string;
    systemPrompt: string;
  }): Promise<PromptResponse> {
    const startTime = Date.now();
    const payload = strategy.buildPayload(aiPrompt, systemPrompt, request);

    try {
      const response = await client.post(strategy.endpoint, payload);
      const result = await strategy.parseSyncResponse(
        response.data,
        request.text,
        providerInstance,
        request?.format || 'markdown',
      );

      return {
        ...result,
        processingTime: this.calculateProcessingTime(startTime),
      };
    } catch (error: any) {
      console.error(`${providerInstance.constructor.name} sync failed:`, error);
      throw new Error(
        `Failed to generate with ${providerInstance.constructor.name}: ${error.message}`,
      );
    }
  }

  /**
   * Handles Streaming generation.
   */
  private static async *_handleStream<T>({
    client,
    request,
    history,
    strategy,
    providerInstance,
    aiPrompt,
    systemPrompt,
  }: {
    client: AxiosInstance;
    request: PromptRequest;
    history?: History | HistoryAttributes;
    strategy: ProviderStrategy<T>;
    providerInstance: BaseAIProvider;
    aiPrompt: string;
    systemPrompt: string;
  }): AsyncGenerator<StreamResponse | StreamEnded, void, unknown> {
    const startTime = Date.now();
    const model = history?.model ?? request?.model ?? 'unknown';
    const payload = strategy.buildPayload(
      aiPrompt,
      systemPrompt,
      request,
      history,
    );

    try {
      const response = await client.post(strategy.endpoint, {
        ...payload,
        stream: true,
      });

      const stream = response.data as AsyncIterable<any>;

      for await (const chunk of stream) {
        // Yield Content
        if (strategy.stream.hasText(chunk)) {
          yield {
            model,
            created_at: new Date().toISOString(),
            message: {
              role: 'assistant',
              content: strategy.stream.getText(chunk),
            },
            done: false,
          };
        }

        // Yield End Signal
        if (strategy.stream.isEnd(chunk)) {
          const tokensUsed = strategy.stream.getUsage(chunk) || 0;

          yield new StreamEnded({
            model,
            aiPrompt,
            tokensUsed,
            processingTime: this.calculateProcessingTime(startTime),
          });
          return;
        }
      }

      // Fallback if stream ends without explicit stop signal
      yield new StreamEnded({
        model,
        aiPrompt,
        tokensUsed: 0,
        processingTime: this.calculateProcessingTime(startTime),
      });
    } catch (error: any) {
      console.error(
        `${providerInstance.constructor.name} streaming failed:`,
        error,
      );
      throw new Error(
        `Failed to stream with ${providerInstance.constructor.name}: ${error.message}`,
      );
    }
  }

  /**
   * Shared logic for input normalization and prompt composition.
   */
  private static async _prepareInputs(
    request: PromptRequest,
    history?: History | HistoryAttributes,
  ): Promise<{ aiPrompt: string; systemPrompt: string }> {
    let normalizedReq, aiPrompt, systemPrompt;

    if (request) {
      normalizedReq = await PromptRequestNormalizer.normalize(request);
      aiPrompt = UniversalPromptComposer.generate(normalizedReq);
      systemPrompt = normalizedReq.systemPrompt;
    } else if (history) {
      aiPrompt = history.aiPrompt || '';
      systemPrompt = history.systemPrompt || '';
    } else {
      throw new Error('Either request or history must be provided');
    }

    return { aiPrompt, systemPrompt };
  }
}
