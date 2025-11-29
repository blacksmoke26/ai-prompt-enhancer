import { BaseAIProvider } from './BaseAIProvider';
import { PromptRequest, PromptResponse, AIModel } from '../types';

/**
 * Interface representing an Ollama model's metadata and configuration details.
 * This interface defines the structure of model information returned by the Ollama API.
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

export class OllamaProvider extends BaseAIProvider {
  constructor(url: string = 'http://localhost:11434') {
    super('Ollama', url);
  }

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

  async isAvailable(): Promise<boolean> {
    try {
      await this.client.get('/api/tags');
      return true;
    } catch {
      return false;
    }
  }

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
