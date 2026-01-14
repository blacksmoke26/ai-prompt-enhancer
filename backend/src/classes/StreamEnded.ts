/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

/**
 * Represents the response structure from a model processing operation.
 * Contains metadata and the AI-generated prompt.
 */
export interface ModelResponse {
  /**
   * The name or identifier of the AI model used.
   */
  model: string;

  /**
   * The time taken by the model to process the request, in milliseconds.
   */
  processingTime: number;

  /**
   * The number of tokens consumed by the model during processing.
   */
  tokensUsed: number;

  /**
   * The prompt generated or used by the AI during the processing.
   */
  aiPrompt: string;
}

/**
 * Signals the end of a streaming process, containing the model's response data.
 * Used to indicate completion in a streaming API context.
 * @example
 * const response = new StreamEnded({
 *   model: 'gpt-4',
 *   processingTime: 1200,
 *   tokensUsed: 150,
 *   aiPrompt: 'Hello, how can I assist you today?'
 * });
 */
export default class StreamEnded {
  /**
   * Constructs a new StreamEnded instance with the provided model response data.
   * @param data - The model response data, containing metadata and AI prompt.
   * @note The `data` parameter is marked as `readonly` to ensure immutability.
   */
  constructor(public readonly data: ModelResponse) {}
}
