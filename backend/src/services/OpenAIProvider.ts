import { BaseAIProvider } from './BaseAIProvider';
import { PromptRequest, PromptResponse, AIModel } from '../types';

/**
 * OpenAI provider implementation for AI model interactions.
 * Extends BaseAIProvider to provide OpenAI-specific functionality.
 */
export class OpenAIProvider extends BaseAIProvider {
  /**
   * Creates a new instance of the OpenAI provider.
   * @param apiKey - The OpenAI API key for authentication
   * @param baseURL - Optional custom base URL for the OpenAI API
   *
   * @example
   * ```typescript
   * const provider = new OpenAIProvider('sk-xxx', 'https://api.openai.com/v1');
   * ```
   *
   * @developer_notes
   * If no baseURL is provided, defaults to the official OpenAI API endpoint.
   * The API key is set in the authorization header for all requests.
   */
  constructor(apiKey: string, baseURL?: string) {
    super('OpenAI', baseURL || 'https://api.openai.com/v1');
    this.client.defaults.headers.common['Authorization'] = `Bearer ${apiKey}`;
  }

  /**
   * Retrieves available OpenAI models filtered for GPT variants.
   * @returns Promise resolving to an array of AIModel objects
   *
   * @example
   * ```typescript
   * const models = await provider.getModels();
   * console.log(models); // [{ id: 'gpt-4', name: 'gpt-4', ... }]
   * ```
   *
   * @developer_notes
   * Filters models to only include those with 'gpt' in their ID.
   * Returns empty array if API call fails, ensuring graceful degradation.
   * Models are sorted alphabetically by ID for consistent ordering.
   */
  async getModels(): Promise<AIModel[]> {
    try {
      const response = await this.client.get<{data: AIModel[]}>('/models');
      const models = response.data.data || [];

      return models
        .filter((model: any) => model.id.includes('gpt'))
        .map((model: any) => ({
          id: model.id,
          name: model.id,
          provider: 'OpenAI',
          description: model.owned_by,
          contextLength: this.getContextLength(model.id),
          maxTokens: this.getMaxTokens(model.id),
        })).sort((a, b) => a.id.localeCompare(b.id));;
    } catch (error: any) {
      console.error('Failed to fetch OpenAI models:', error);
      return [];
    }
  }

  /**
   * Enhances a prompt using OpenAI's chat completion API.
   * @param request - The prompt enhancement request containing original text and parameters
   * @returns Promise resolving to the enhanced prompt response
   *
   * @example
   * ```typescript
   * const response = await provider.enhancePrompt({
   *   text: 'What is AI?',
   *   model: 'gpt-4',
   *   enhancementType: 'enhance'
   * });
   * console.log(response.enhancedPrompt);
   * ```
   *
   * @developer_notes
   * Uses a system prompt based on the enhancement type and user role.
   * Tracks processing time and token usage for monitoring purposes.
   * Returns original text unchanged if API call fails, with error thrown.
   */
  async enhancePrompt(request: PromptRequest): Promise<PromptResponse> {
    const startTime = Date.now();

    try {
      const systemPrompt = this.buildSystemPrompt(request);

      const response = await this.client.post('/chat/completions', {
        model: request.model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Original prompt: ${request.text}\n\nEnhanced prompt:` }
        ],
        temperature: request.temperature || 0.7,
        max_tokens: request.maxTokens || 2000,
      });

      const enhancedPrompt = response.data.choices[0]?.message?.content?.trim() || request.text;

      return {
        enhancedPrompt,
        originalPrompt: request.text,
        model: request.model,
        timestamp: new Date(),
        tokensUsed: response.data.usage?.total_tokens,
        processingTime: this.calculateProcessingTime(startTime),
      };
    } catch (error: any) {
      console.error('OpenAI enhancement failed:', error);
      throw new Error(`Failed to enhance prompt with OpenAI: ${error}`);
    }
  }

  /**
   * Checks if the OpenAI API is accessible and working.
   * @returns Promise resolving to true if API is available, false otherwise
   *
   * @example
   * ```typescript
   * const isOnline = await provider.isAvailable();
   * if (isOnline) console.log('OpenAI API is reachable');
   * ```
   *
   * @developer_notes
   * Makes a lightweight request to the /models endpoint.
   * Returns false on any network or authentication error.
   * Can be used for health checks or fallback logic.
   */
  async isAvailable(): Promise<boolean> {
    try {
      await this.client.get('/models');
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Builds a system prompt based on enhancement type and user role.
   * @param request - The prompt request containing enhancement parameters
   * @returns The constructed system prompt string
   *
   * @example
   * ```typescript
   * const systemPrompt = provider.buildSystemPrompt({
   *   enhancementType: 'correct',
   *   userRole: 'writer'
   * });
   * ```
   *
   * @developer_notes
   * Combines role-specific context with enhancement type instructions.
   * Falls back to 'enhance' type and 'general' role if invalid values provided.
   * Uses custom system prompt if one is supplied in the request.
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

  /**
   * Gets the context window length for a specific OpenAI model.
   * @param modelId - The ID of the model to look up
   * @returns The context length in tokens
   *
   * @example
   * ```typescript
   * const length = provider.getContextLength('gpt-4');
   * console.log(length); // 8192
   * ```
   *
   * @developer_notes
   * Returns 4096 as a safe default for unknown models.
   * Values are based on OpenAI's official model specifications.
   * Should be updated when new models are released.
   */
  private getContextLength(modelId: string): number {
    const contexts: Record<string, number> = {
      'gpt-4': 8192,
      'gpt-4-32k': 32768,
      'gpt-4-turbo': 128000,
      'gpt-4o': 128000,
      'gpt-3.5-turbo': 4096,
      'gpt-3.5-turbo-16k': 16385,
    };
    return contexts[modelId] || 4096;
  }

  /**
   * Gets the maximum token limit for a specific OpenAI model.
   * @param modelId - The ID of the model to look up
   * @returns The maximum tokens the model can generate
   *
   * @example
   * ```typescript
   * const maxTokens = provider.getMaxTokens('gpt-4');
   * console.log(maxTokens); // 4096
   * ```
   *
   * @developer_notes
   * Returns 4096 as a safe default for unknown models.
   * These values represent the output token limits, not context windows.
   * Different from context length - this is for generated content only.
   */
  private getMaxTokens(modelId: string): number {
    const maxTokens: Record<string, number> = {
      'gpt-4': 4096,
      'gpt-4-32k': 32768,
      'gpt-4-turbo': 4096,
      'gpt-4o': 4096,
      'gpt-3.5-turbo': 4096,
      'gpt-3.5-turbo-16k': 16385,
    };
    return maxTokens[modelId] || 4096;
  }
}
