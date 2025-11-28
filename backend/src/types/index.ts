export interface AIModel {
  id: string;
  name: string;
  provider: string;
  description?: string;
  contextLength?: number;
  maxTokens?: number;
}

export interface PromptRequest {
  text: string;
  model: string;
  systemPrompt?: string;
  temperature?: number;
  maxTokens?: number;
  enhancementType?: 'correct' | 'enhance' | 'proofread' | 'optimize';
  userRole?: string;
}

export interface PromptResponse {
  enhancedPrompt: string;
  originalPrompt: string;
  model: string;
  timestamp: Date;
  tokensUsed?: number;
  processingTime: number;
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface PromptHistory {
  id: string;
  originalPrompt: string;
  enhancedPrompt: string;
  model: string;
  enhancementType: string;
  userRole: string;
  systemPrompt?: string;
  timestamp: Date;
  tokensUsed?: number;
  processingTime: number;
  rating?: number;
  notes?: string;
}

export interface AIProvider {
  name: string;
  models: AIModel[];
  isConfigured: boolean;
  config?: Record<string, any>;
}

export interface AppConfig {
  ollama: {
    url: string;
    timeout: number;
  };
  openai?: {
    apiKey: string;
    baseUrl?: string;
  };
  openrouter?: {
    apiKey: string;
  };
  deepseek?: {
    apiKey: string;
  };
  qwen?: {
    apiKey: string;
  };
  theme: 'light' | 'dark' | 'system';
  autoSave: boolean;
  maxHistoryItems: number;
  defaultModel: string;
  defaultSystemPrompt: string;
}

export interface EnhancementType {
  id: string;
  name: string;
  description: string;
  systemPrompt: string;
}

export interface UserRole {
  id: string;
  name: string;
  description: string;
  systemPrompt: string;
}