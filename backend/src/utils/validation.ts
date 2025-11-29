import Joi from 'joi';

/**
 * Validates prompt request parameters for AI model interactions.
 * @example
 * { text: "Hello world", model: "gpt-4", enhancementType: "enhance" }
 * @developer_note
 * Use this schema to validate user input before sending to AI models.
 */
export const promptRequestSchema = Joi.object({
  text: Joi.string().required().min(1).max(10000),
  model: Joi.string().required(),
  systemPrompt: Joi.string().optional().max(2000),
  temperature: Joi.number().optional().min(0).max(2).default(0.7),
  maxTokens: Joi.number().optional().min(1).max(8000).default(2000),
  enhancementType: Joi.string().optional().valid('correct', 'enhance', 'proofread', 'optimize', 'creative', 'technical', 'concise', 'structured', 'audience', 'tone', 'length', 'simplify', 'expand', 'format').default('enhance'),
  userRole: Joi.string().optional().valid('general', 'developer', 'writer', 'researcher', 'marketer', 'educator', 'business', 'designer').default('general'),
  targetAudience: Joi.string().optional().max(500),
  tone: Joi.string().optional().valid('formal', 'casual', 'professional', 'friendly', 'academic', 'creative', 'technical').max(100),
  responseLength: Joi.string().optional().valid('short', 'medium', 'long', 'custom'),
  customInstructions: Joi.string().optional().max(1000),
});

/**
 * Validates configuration update requests for various AI providers and app settings.
 * @example
 * { ollama: { url: "http://localhost:11434" }, theme: "dark" }
 * @developer_note
 * Only include fields that need to be updated in the request.
 */
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

/**
 * Validates history item updates including ratings and notes.
 * @example
 * { rating: 5, notes: "Excellent response" }
 * @developer_note
 * All fields are optional - send only those you want to update.
 */
export const historyUpdateSchema = Joi.object({
  rating: Joi.number().min(1).max(5).optional(),
  notes: Joi.string().max(1000).optional(),
});

/**
 * Validates export request parameters for data export functionality.
 * @example
 * { format: "json", limit: 100 }
 * @developer_note
 * If no limit is provided, all items will be exported.
 */
export const exportSchema = Joi.object({
  format: Joi.string().valid('json', 'csv', 'txt').default('json'),
  limit: Joi.number().min(1).max(10000).optional(),
});
