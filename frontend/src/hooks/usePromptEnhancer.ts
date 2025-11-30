/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import {useCallback, useState} from 'react';

// store
import {useAppStore} from '~/stores/appStore';
import {useHistoryStore} from '~/stores/historyStore';

// services
import {promptService} from '~/utils/promptService';

// types
import type {PromptRequest} from '~/types';

/**
 * Custom hook for enhancing AI prompts with various settings.
 *
 * @returns An object with prompt enhancement utilities and state
 *
 * @example
 * ```tsx
 * const { enhancePrompt, loading, error, clearError } = usePromptEnhancer();
 * const response = await enhancePrompt("Explain quantum computing");
 * ```
 *
 * @developer_notes
 * - Manages loading and error states internally
 * - Integrates with app store for configuration
 * - Automatically adds successful enhancements to history
 */
export const usePromptEnhancer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    selectedModel,
    selectedEnhancementType,
    selectedUserRole,
    config,
  } = useAppStore();

  const {addToHistory} = useHistoryStore();

  /**
   * Enhances a text prompt using the selected AI model and settings.
   *
   * @param text - The prompt text to enhance
   * @returns Enhanced prompt response or null if failed
   *
   * @example
   * ```tsx
   * const response = await enhancePrompt("Explain quantum computing");
   * if (response) console.log(response.enhancedText);
   * ```
   *
   * @developer_notes
   * - Validates input text and model selection before processing
   * - Uses timestamp as temporary ID for history entries
   * - Handles both Error objects and generic error messages
   * - Resets error state on successful enhancement
   */
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
        enhancementType: selectedEnhancementType,
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

  /**
   * Refines an enhanced prompt with additional context.
   *
   * @param enhancedText - The previously enhanced prompt text
   * @param additionalContext - Additional context to incorporate
   * @returns Further refined prompt response or null if failed
   */
  const refinePrompt = useCallback(async (enhancedText: string, additionalContext: string) => {
    if (!enhancedText.trim() || !additionalContext.trim()) {
      setError('Both enhanced prompt and additional context are required');
      return null;
    }

    try {
      setLoading(true);
      setError(null);

      const request: PromptRequest = {
        text: `${enhancedText}\n\nAdditional context: ${additionalContext}`,
        model: selectedModel,
        enhancementType: 'refine',
        userRole: selectedUserRole,
        systemPrompt: config.defaultSystemPrompt,
        temperature: 0.5,
        maxTokens: 2000,
      };

      const response = await promptService.enhancePrompt(request);

      addToHistory({
        ...response,
        id: response.timestamp,
        enhancementType: 'refine',
        userRole: selectedUserRole,
        rating: undefined,
        notes: undefined,
      });

      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to refine prompt';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, [selectedModel, selectedUserRole, config.defaultSystemPrompt, addToHistory]);

  /**
   * Combines multiple enhanced prompts into a single prompt.
   *
   * @param prompts - Array of prompt texts to combine
   * @returns Combined prompt response or null if failed
   */
  const combinePrompts = useCallback(async (prompts: string[]) => {
    if (prompts.length < 2 || !prompts.every(p => p.trim())) {
      setError('At least 2 valid prompts are required for combination');
      return null;
    }

    try {
      setLoading(true);
      setError(null);

      const combinedText = prompts.map((p, i) => `[Prompt ${i + 1}]: ${p}`).join('\n\n');

      const request: PromptRequest = {
        text: combinedText,
        model: selectedModel,
        enhancementType: 'combine',
        userRole: selectedUserRole,
        systemPrompt: config.defaultSystemPrompt,
        temperature: 0.6,
        maxTokens: 2500,
      };

      const response = await promptService.enhancePrompt(request);

      addToHistory({
        ...response,
        id: response.timestamp,
        enhancementType: 'combine',
        userRole: selectedUserRole,
        rating: undefined,
        notes: undefined,
      });

      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to combine prompts';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, [selectedModel, selectedUserRole, config.defaultSystemPrompt, addToHistory]);

  /**
   * Reverts a prompt to its original state from history.
   *
   * @param historyId - The ID of the history entry to revert
   * @returns Original prompt text or null if not found
   */
  const revertPrompt = useCallback((historyId: number) => {
    // This would need access to history items - might need to be implemented in historyStore
    setError('Revert functionality not yet implemented');
    return null;
  }, []);

  /**
   * Clears the current error state.
   *
   * @example
   * ```tsx
   * const { clearError } = usePromptEnhancer();
   * <button onClick={clearError}>Dismiss Error</button>
   * ```
   *
   * @developer_notes
   * - Should be called when user dismisses error messages
   * - Simply resets error state to null
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    enhancePrompt,
    refinePrompt,
    combinePrompts,
    revertPrompt,
    loading,
    error,
    clearError,
  };
};
