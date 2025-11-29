import { BaseAIProvider } from './BaseAIProvider';
import { PromptRequest, PromptResponse, AIModel } from '../types';

/**
 * Interface representing an Ollama model's metadata and configuration details.
 *
 * @example
 * ```typescript
 * const model: OllamaModel = {
 *   name: 'llama2:latest',
 *   model: 'llama2',
 *   modified_at: '2023-12-01T10:00:00Z',
 *   size: 4349184000,
 *   digest: 'sha256:abc123...',
 *   details: {
 *     parent_model: '',
 *     format: 'gguf',
 *     family: 'llama',
 *     families: ['llama'],
 *     parameter_size: '7B',
 *     quantization_level: 'Q4_0'
 *   }
 * };
 * ```
 *
 * @developerNote
 * This interface matches the Ollama API response structure for model metadata.
 * All fields are readonly as they represent server-provided data.
 */
export interface OllamaModel {
  /** The full name of the model including version tag (e.g., 'mxbai-embed-large:latest') */
  readonly name: string;

  /** The model identifier (typically same as name) */
  readonly model: string;

  /** ISO timestamp of when the model was last modified */
  readonly modified_at: string;

  /** Size of the model in bytes */
  readonly size: number;

  /** SHA256 digest hash of the model for integrity verification */
  readonly digest: string;

  /** Detailed configuration and metadata about the model */
  readonly details: {
    /** Parent model if this is a fine-tuned version */
    readonly parent_model: string;

    /** Model format (e.g., 'gguf' for GPT-Generated Unified Format) */
    readonly format: string;

    /** Primary model family/architecture (e.g., 'bert', 'llama') */
    readonly family: string;

    /** Array of all model families this model belongs to */
    readonly families: string[];

    /** Parameter size as string (e.g., '334M' for 334 million parameters) */
    readonly parameter_size: string;

    /** Quantization level for model compression (e.g., 'F16' for 16-bit float) */
    readonly quantization_level: string;
  };
}

/**
 * Provider implementation for Ollama AI models.
 *
 * @example
 * ```typescript
 * const provider = new OllamaProvider('http://localhost:11434');
 * const models = await provider.getModels();
 * const enhanced = await provider.enhancePrompt({
 *   text: 'Tell me about AI',
 *   model: 'llama2',
 *   enhancementType: 'enhance'
 * });
 * ```
 *
 * @developerNote
 * This class extends BaseAIProvider and implements Ollama-specific API calls.
 * Default URL points to local Ollama instance. Error handling returns empty arrays for model fetch failures.
 */
export class OllamaProvider extends BaseAIProvider {
  /**
   * Creates a new Ollama provider instance.
   * @param url - The base URL of the Ollama API endpoint
   */
  constructor(url: string = 'http://localhost:11434') {
    super('Ollama', url);
  }

  /**
   * Retrieves all available models from the Ollama instance.
   *
   * @returns Promise resolving to an array of AIModel objects
   *
   * @example
   * ```typescript
   * const models = await provider.getModels();
   * console.log(models[0].name); // 'llama2'
   * ```
   *
   * @developerNote
   * Maps Ollama's native model format to the standardized AIModel interface.
   * Falls back to 4096 context length if not provided by the API.
   */
  async getModels(): Promise<AIModel[]> {
    try {
      const response = await this.client.get<{models: OllamaModel[]}>('/api/tags');
      const models = response.data.models || [];

      return models.map((model: any) => ({
        id: model.name,
        name: model.name.split(':')[0],
        provider: 'Ollama',
        description: `${model.size} • ${model.digest.substring(0, 12)}`,
        contextLength: model.details?.context_length || 4096,
      })).sort((a, b) => a.name.localeCompare(b.name));
    } catch (error: any) {
      console.error('Failed to fetch Ollama models:', error);
      return [];
    }
  }

  /**
   * Enhances a prompt using the specified Ollama model.
   *
   * @param request - The prompt enhancement request containing text and options
   * @returns Promise resolving to the enhanced prompt response
   *
   * @example
   * ```typescript
   * const response = await provider.enhancePrompt({
   *   text: 'What is AI?',
   *   model: 'llama2',
   *   temperature: 0.7,
   *   maxTokens: 1000
   * });
   * console.log(response.enhancedPrompt);
   * ```
   *
   * @developerNote
   * Builds a system prompt based on enhancement type and user role.
   * Falls back to original text if API call fails or returns empty response.
   */
  async enhancePrompt(request: PromptRequest): Promise<PromptResponse> {
    const startTime = Date.now();

    try {
      const systemPrompt = this.buildSystemPrompt(request);
      const fullPrompt = `${systemPrompt}\n\nOriginal prompt: ${request.text}\n\nEnhanced prompt:`;

      const response = await this.client.post('/api/generate', {
        model: request.model,
        prompt: fullPrompt,
        stream: false,
        options: {
          temperature: request.temperature || 0.7,
          num_predict: request.maxTokens || 2000,
        },
      });

      const enhancedPrompt = response.data.response?.trim() || request.text;

      return {
        enhancedPrompt,
        originalPrompt: request.text,
        model: request.model,
        timestamp: new Date(),
        tokensUsed: response.data.eval_count,
        processingTime: this.calculateProcessingTime(startTime),
      };
    } catch (error: any) {
      console.error('Ollama enhancement failed:', error);
      throw new Error(`Failed to enhance prompt with Ollama: ${error}`);
    }
  }

  /**
   * Checks if the Ollama service is available and responding.
   *
   * @returns Promise resolving to true if service is available, false otherwise
   *
   * @example
   * ```typescript
   * if (await provider.isAvailable()) {
   *   console.log('Ollama is running');
   * }
   * ```
   *
   * @developerNote
   * Uses the /api/tags endpoint as a lightweight health check.
   * Silent failure returns false without logging.
   */
  async isAvailable(): Promise<boolean> {
    try {
      await this.client.get('/api/tags');
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Builds a system prompt based on the enhancement type and user role.
   *
   * @param request - The prompt request containing enhancement preferences
   * @returns The constructed system prompt string
   *
   * @example
   * ```typescript
   * const prompt = provider.buildSystemPrompt({
   *   enhancementType: 'enhance',
   *   userRole: 'developer'
   * });
   * ```
   *
   * @developerNote
   * Combines role-based prompts with enhancement-specific instructions.
   * Falls back to 'enhance' type and 'general' role if invalid values provided.
   */
  private buildSystemPrompt(request: PromptRequest): string {
    const enhancementPrompts = {
      correct: 'You are a grammar and spelling expert. Correct any grammatical errors, spelling mistakes, and improve the clarity of the given prompt while preserving the original intent.',
      enhance: 'You are a prompt engineering expert. Enhance the given prompt by adding relevant details, making it more specific, and improving its effectiveness while maintaining the core intent.',
      proofread: 'You are a professional proofreader. Review and refine the given prompt to make it more effective, clear, and likely to produce high-quality results.',
      optimize: 'You are an AI prompt optimization specialist. Optimize the given prompt to work best with AI models, adding structure, context, and clarity as needed.',
    };

    const rolePrompts = {
      general: 'You are a helpful AI assistant.',
      developer: 'You are an expert software developer and prompt engineer.',
      writer: 'You are a professional writer and editor.',
      researcher: 'You are an experienced researcher and academic.',
      marketer: 'You are a marketing expert.',
      educator: 'You are an experienced educator.',
      business: 'You are a business professional.',
      designer: 'You are a professional designer.',
    };

    const systemPrompt = request.systemPrompt ||
      enhancementPrompts[request.enhancementType as keyof typeof enhancementPrompts] ||
      enhancementPrompts.enhance;

    const rolePrompt = rolePrompts[request.userRole as keyof typeof rolePrompts] || rolePrompts.general;

    return `${rolePrompt} ${systemPrompt}`;
  }
}
