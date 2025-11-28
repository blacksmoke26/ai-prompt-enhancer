import Joi from 'joi';

export const promptRequestSchema = Joi.object({
  text: Joi.string().required().min(1).max(10000),
  model: Joi.string().required(),
  systemPrompt: Joi.string().optional().max(2000),
  temperature: Joi.number().optional().min(0).max(2).default(0.7),
  maxTokens: Joi.number().optional().min(1).max(8000).default(2000),
  enhancementType: Joi.string().optional().valid('correct', 'enhance', 'proofread', 'optimize', 'creative', 'technical', 'concise', 'structured').default('enhance'),
  userRole: Joi.string().optional().valid('general', 'developer', 'writer', 'researcher', 'marketer', 'educator', 'business', 'designer').default('general'),
});

export const configUpdateSchema = Joi.object({
  ollama: Joi.object({
    url: Joi.string().uri().optional(),
    timeout: Joi.number().min(1000).max(300000).optional(),
  }).optional(),
  openai: Joi.object({
    apiKey: Joi.string().optional(),
    baseUrl: Joi.string().uri().optional(),
  }).optional(),
  openrouter: Joi.object({
    apiKey: Joi.string().optional(),
  }).optional(),
  deepseek: Joi.object({
    apiKey: Joi.string().optional(),
  }).optional(),
  theme: Joi.string().valid('light', 'dark', 'system').optional(),
  autoSave: Joi.boolean().optional(),
  maxHistoryItems: Joi.number().min(10).max(10000).optional(),
  defaultModel: Joi.string().optional(),
  defaultSystemPrompt: Joi.string().max(2000).optional(),
});

export const historyUpdateSchema = Joi.object({
  rating: Joi.number().min(1).max(5).optional(),
  notes: Joi.string().max(1000).optional(),
});

export const exportSchema = Joi.object({
  format: Joi.string().valid('json', 'csv', 'txt').default('json'),
  limit: Joi.number().min(1).max(10000).optional(),
});