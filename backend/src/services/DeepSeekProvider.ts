import { BaseAIProvider } from './BaseAIProvider';
import { PromptRequest, PromptResponse, AIModel } from '../types';

export class DeepSeekProvider extends BaseAIProvider {
  constructor(apiKey: string) {
    super('DeepSeek', 'https://api.deepseek.com');
    this.client.defaults.headers.common['Authorization'] = `Bearer ${apiKey}`;
  }

  async getModels(): Promise<AIModel[]> {
    try {
      const models: AIModel[] = [
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
      
      return models;
    } catch (error: any) {
      console.error('Failed to fetch DeepSeek models:', error);
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
      console.error('DeepSeek enhancement failed:', error);
      throw new Error(`Failed to enhance prompt with DeepSeek: ${error}`);
    }
  }

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
