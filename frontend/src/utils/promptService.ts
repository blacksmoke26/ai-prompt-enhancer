import api from '../utils/api';
import { PromptRequest, PromptResponse, AIModel, AIProvider } from '../types';

export const promptService = {
  // Enhance a prompt
  async enhancePrompt(request: PromptRequest): Promise<PromptResponse> {
    const response = await api.post('/prompts/enhance', request);
    return response.data;
  },

  // Get all available models
  async getModels(): Promise<AIModel[]> {
    const response = await api.get('/prompts/models');
    return response.data;
  },

  // Get all providers
  async getProviders(): Promise<AIProvider[]> {
    const response = await api.get('/prompts/providers');
    return response.data;
  },

  // Test a provider
  async testProvider(providerName: string): Promise<{ providerName: string; available: boolean }> {
    const response = await api.post(`/prompts/providers/${providerName}/test`);
    return response.data;
  },
};