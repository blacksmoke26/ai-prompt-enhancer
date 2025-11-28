import { BaseAIProvider } from './BaseAIProvider';
import { PromptRequest, PromptResponse, AIModel } from '../types';

export class OpenAIProvider extends BaseAIProvider {
  constructor(apiKey: string, baseURL?: string) {
    super('OpenAI', baseURL || 'https://api.openai.com/v1');
    this.client.defaults.headers.common['Authorization'] = `Bearer ${apiKey}`;
  }

  async getModels(): Promise<AIModel[]> {
    try {
      const response = await this.client.get('/models');
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
        }));
    } catch (error: any) {
      console.error('Failed to fetch OpenAI models:', error);
      return [];
    }
  }

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

  async isAvailable(): Promise<boolean> {
    try {
      await this.client.get('/models');
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
