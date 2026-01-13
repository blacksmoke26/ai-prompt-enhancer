/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import {useState, useRef} from 'react';

// hooks
import {useAppStore} from '~/stores/appStore';

// utils
import {nullOrString} from '~/utils/strings';

// types
import type {PromptRequest} from '~/types';

/**
 * Represents a chunk of data received from a streaming operation, containing message content, completion status, or error information.
 * @note This interface is used in asynchronous stream processing to deliver incremental updates. Not all properties are guaranteed to be present in every chunk.
 */
export interface StreamChunk {
  /** Contains the incremental message content being streamed */
  message?: {
    /** The content of the message being delivered in this chunk */
    content: string;
  };
  /** Indicates whether the stream has completed (i.e., no more chunks will be sent) */
  done?: boolean;
  /** Optional error message if an error occurs during the stream */
  error?: string;
}

/**
 * Asynchronously streams chat responses based on the provided prompt configuration.
 * @async
 * @generator
 * @param {PromptRequest} request - Configuration object containing the prompt and other settings for the chat.
 * @param {AbortSignal} [signal] - Optional signal to abort the stream if needed.
 * @yields {StreamChunk} - Yields chunks of data as they become available during the stream.
 * @example
 * for await (const chunk of await chatStream(promptConfig)) {
 *   if (chunk.message) console.log(chunk.message.content);
 *   if (chunk.done) break;
 * }
 * @note This function is designed for use with `for await...of` loops. Always handle potential errors using try/catch or check the `error` field in chunks. The `signal` parameter allows for graceful cancellation of the stream.
 */
const chatStream = async function* (request: PromptRequest, signal?: AbortSignal) {
  const response = await fetch('/api/prompts/stream', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
    signal,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
  }

  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error('Response body is not readable');
  }

  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const {done, value} = await reader.read();

      if (done) break;

      buffer += decoder.decode(value, {stream: true});
      const lines = buffer.split('\n');
      // Keep the last potentially incomplete line in the buffer
      buffer = lines.pop() || '';

      for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith('data: ')) {
          const data = trimmedLine.slice(6);

          if (data === '[DONE]') {
            return;
          }

          try {
            const parsed = JSON.parse(data) as StreamChunk;
            yield parsed;
          } catch (parseError) {
            console.warn('Failed to parse SSE data:', data, parseError);
          }
        }
      }
    }
  } finally {
    reader.releaseLock();
  }

  // Process any remaining buffer content
  const trimmedBuffer = buffer.trim();
  if (trimmedBuffer.startsWith('data: ') && trimmedBuffer !== 'data: [DONE]') {
    try {
      const data = trimmedBuffer.slice(6);
      const parsed = JSON.parse(data) as StreamChunk;
      yield parsed;
    } catch (parseError) {
      console.warn('Failed to parse final buffer:', trimmedBuffer, parseError);
    }
  }
};

/**
 * A custom React hook for managing a streaming response from a chat API, providing state and methods to control the stream.
 * @example
 * const { isStreaming, content, error, startStream, stopStream } = useGenerateStream();
 * @note This hook manages the state of a streaming process, including content accumulation, error handling, and stream aborting. Use `startStream` to initiate the stream and `stopStream` to cancel it.
 */
const useGenerateSteam = () => {
  /**
   * Tracks whether the stream is currently active.
   */
  const [isStreaming, setIsStreaming] = useState<boolean>(false);

  /**
   * Accumulated message content from the stream.
   */
  const [content, setContent] = useState<string>('');

  /**
   * Error message if an error occurs during the stream.
   */
  const [error, setError] = useState<string | null>(null);

  /**
   * Reference to an AbortController used to manage stream cancellation.
   */
  const controllerRef = useRef<AbortController | null>(null);

  const {config} = useAppStore();

  /**
   * Generates default request parameters for API calls.
   * @returns An object containing default request configuration.
   * @example
   * const params = requestParams();
   * console.log(params); // { method: 'GET', path: '/', headers: {}, queryParams: {} }
   * @developerNotes This is a factory function and should be customized based on specific API requirements.
   */
  const requestParams = (): PromptRequest => {
    const values = {
      model: config.model!,
      provider: config.provider!,
      enhancementType: nullOrString(config.enhancementType),
      userRole: nullOrString(config.userRole),
      systemPrompt: config.defaultSystemPrompt,
      temperature: config?.temperature ?? 0.7,
      maxTokens: config?.maxTokens ?? 2000,
      targetAudience: nullOrString(config.targetAudience),
      tone: nullOrString(config.tone),
      responseLength: nullOrString(config.responseLength),
      customInstructions: nullOrString(config.customInstructions),
      enhancementParameters: nullOrString(config.enhancementParameters),
      format: nullOrString(config.format),
      offTheRecord: config.offTheRecord,
      topP: nullOrString(config.topP),
      topK: nullOrString(config.topK),
      stopSequences: nullOrString(config.stopSequences),
      frequencyPenalty: nullOrString(config.frequencyPenalty),
      presencePenalty: nullOrString(config.presencePenalty),
    };

    // filter non-null values
    return Object.entries(values).reduce((acc, [key, value]) => {
      if (value !== null) {
        acc[key] = value;
      }

      return acc;
    }, {} as PromptRequest);
  };

  /**
   * Clears the error state by setting it to `null`.
   */
  const clearError = () => setError(null);

  /**
   * Resets the content state to an empty string.
   */
  const clearContent = () => setContent('');

  /**
   * Initiates a stream with the provided prompt request, updating state with message content and handling errors.
   * @param text - The prompt text to generate a response for.
   * @note This function uses `for await...of` to process stream chunks. It automatically aborts the stream if cancelled and resets state on completion or error.
   */
  const startStream = async (text: string) => {
    // Reset state
    setIsStreaming(true);
    setContent('');
    setError(null);

    // Create new abort controller for this request
    const controller = new AbortController();
    controllerRef.current = controller;

    const request: PromptRequest = {
      ...requestParams(),
      text: text.trim(),
    };

    try {
      for await (const chunk of chatStream(request, controller.signal)) {
        // Check if request was aborted between chunks
        if (controller.signal.aborted) {
          break;
        }

        if (chunk.error) {
          throw new Error(chunk.error);
        }

        if (chunk.message?.content) {
          setContent((prev) => prev + chunk?.message?.content);
        }

        if (chunk.done) {
          break;
        }
      }
    } catch (err) {
      // Ignore abort errors as they are intentional
      if (err instanceof Error && err.name === 'AbortError') {
        console.log('Stream aborted by user');
        return;
      }

      const message = err instanceof Error ? err.message : 'Failed to send message';
      setError(message);
      console.error('Streaming error:', err);
    } finally {
      setIsStreaming(false);
      controllerRef.current = null;
    }
  };

  /**
   * Aborts the current stream if it is active.
   * @note This function should be used to cancel a stream initiated by `startStream`. It cleans up the AbortController reference.
   */
  const stopStream = async () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
  };

  // Return the hook's functions and state (omitted in the provided code, but assumed to be part of the hook's return)
  return {
    isStreaming,
    content,
    error,
    startStream,
    stopStream,
    clearError,
    clearContent,
  };
};

export default useGenerateSteam;
