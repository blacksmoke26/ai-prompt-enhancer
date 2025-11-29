import { useState, useCallback } from 'react';
import { useAppStore } from '~/stores/appStore.ts';
import { useHistoryStore } from '~/stores/historyStore.ts';
import { promptService } from '~/utils/promptService.ts';
import { PromptRequest } from '~/types';

export const usePromptEnhancer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    selectedModel,
    selectedEnhancementType,
    selectedUserRole,
    config
  } = useAppStore();

  const { addToHistory } = useHistoryStore();

  const enhancePrompt = useCallback(async (text: string) => {
    if (!text.trim()) {
      setError('Please enter a prompt to enhance');
      return null;
    }

    if (!selectedModel) {
      setError('Please select a model');
      return null;
    }

    try {
      setLoading(true);
      setError(null);

      const request: PromptRequest = {
        text: text.trim(),
        model: selectedModel,
        enhancementType: selectedEnhancementType as any,
        userRole: selectedUserRole,
        systemPrompt: config.defaultSystemPrompt,
        temperature: 0.7,
        maxTokens: 2000,
      };

      const response = await promptService.enhancePrompt(request);

      // Add to history
      addToHistory({
        ...response,
        id: response.timestamp, // Use timestamp as ID for now
        enhancementType: selectedEnhancementType,
        userRole: selectedUserRole,
        rating: undefined,
        notes: undefined,
      });

      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to enhance prompt';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, [selectedModel, selectedEnhancementType, selectedUserRole, config.defaultSystemPrompt, addToHistory]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    enhancePrompt,
    loading,
    error,
    clearError,
  };
};
