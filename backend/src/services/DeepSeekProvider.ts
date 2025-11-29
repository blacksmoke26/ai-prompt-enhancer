import {BaseAIProvider} from './BaseAIProvider';

// types
import type {AIModel, PromptRequest, PromptResponse} from '~/types';

/**
 * DeepSeek AI provider for prompt enhancement and model management.
 * @example
 * ```typescript
 * const provider = new DeepSeekProvider('your-api-key');
 * const response = await provider.enhancePrompt({
 *   text: 'Explain quantum computing',
 *   model: 'deepseek-chat',
 *   enhancementType: 'enhance'
 * });
 * ```
 * @developerNote Ensure valid API key is provided for all operations.
 */
export class DeepSeekProvider extends BaseAIProvider {
  /**
   * Creates a new DeepSeek provider instance.
   * @param apiKey - DeepSeek API authentication key
   */
  constructor(apiKey: string) {
    super('DeepSeek', 'https://api.deepseek.com');
    this.client.defaults.headers.common['Authorization'] = `Bearer ${apiKey}`;
  }

  /**
   * Retrieves available DeepSeek models.
   * @returns Promise resolving to array of AI models
   * @example
   * ```typescript
   * const models = await provider.getModels();
   * console.log(models[0].name); // 'DeepSeek Chat'
   * ```
   * @developerNote Currently returns static models. Consider updating to fetch from API.
   */
  async getModels(): Promise<AIModel[]> {
    try {
      return [
        {
          id: 'deepseek-chat',
          name: 'DeepSeek Chat',
          provider: 'DeepSeek',
          description: 'DeepSeek\'s conversational model',
          contextLength: 32768,
          maxTokens: 4096,
        },
        {
          id: 'deepseek-coder',
          name: 'DeepSeek Coder',
          provider: 'DeepSeek',
          description: 'DeepSeek\'s code-specialized model',
          contextLength: 16384,
          maxTokens: 4096,
        },
      ];
    } catch (error: any) {
      console.error('Failed to fetch DeepSeek models:', error);
      return [];
    }
  }

  /**
   * Enhances a prompt using DeepSeek's language models.
   * @param request - Prompt enhancement request parameters
   * @returns Promise resolving to enhanced prompt response
   * @example
   * ```typescript
   * const response = await provider.enhancePrompt({
   *   text: 'Explain photosynthesis',
   *   model: 'deepseek-chat',
   *   enhancementType: 'enhance'
   * });
   * console.log(response.enhancedPrompt);
   * ```
   * @developerNote Handles rate limiting and token counting automatically.
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
      console.error('DeepSeek enhancement failed:', error);
      throw new Error(`Failed to enhance prompt with DeepSeek: ${error}`);
    }
  }

  /**
   * Checks if DeepSeek service is available.
   * @returns Promise resolving to boolean indicating availability
   * @example
   * ```typescript
   * if (await provider.isAvailable()) {
   *   console.log('DeepSeek is ready');
   * }
   * ```
   * @developerNote Uses minimal request to check API connectivity.
   */
  async isAvailable(): Promise<boolean> {
    try {
      const response = await this.client.post('/chat/completions', {
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: 'test' }],
        max_tokens: 1,
      });
      return !!response.data.choices;
    } catch {
      return false;
    }
  }

  /**
   * Builds system prompt based on request parameters.
   * @param request - Prompt request containing enhancement type and user role
   * @returns System prompt string
   * @example
   * ```typescript
   * const prompt = provider.buildSystemPrompt({
   *   enhancementType: 'correct',
   *   userRole: 'writer'
   * });
   * ```
   * @developerNote Combines role and enhancement prompts for optimal results.
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
