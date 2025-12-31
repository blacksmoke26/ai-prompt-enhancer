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
import PromptService from '~/services/PromptService';

// types
import type {PromptRequest} from '~/types';

const nullOrString = (value: any | undefined | null): any | null => {
  return !value
    ? null
    : (value?.trim?.() ? value.trim() : null);
};

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
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const {config} = useAppStore();

  const {addToHistory} = useHistoryStore();

  /**
   * Generates default request parameters for API calls.
   * @returns An object containing default request configuration.
   * @example
   * const params = requestParams();
   * console.log(params); // { method: 'GET', path: '/', headers: {}, queryParams: {} }
   * @developerNotes This is a factory function and should be customized based on specific API requirements.
   */
  const requestParams = (): PromptRequest => {
    const values = {
      model: config.model!,
      provider: config.provider!,
      enhancementType: 'refine',
      userRole: config.userRole,
      systemPrompt: config.defaultSystemPrompt,
      temperature: config?.temperature ?? 0.7,
      maxTokens: config?.maxTokens ?? 2000,
      targetAudience: nullOrString(config.targetAudience),
      tone: nullOrString(config.tone),
      responseLength: nullOrString(config.responseLength),
      customInstructions: nullOrString(config.customInstructions),
      enhancementParameters: nullOrString(config.enhancementParameters),
      format: nullOrString(config.format),
      offTheRecord: config.offTheRecord,
      topP: nullOrString(config.topP),
      topK: nullOrString(config.topK),
      stopSequences: nullOrString(config.stopSequences),
      frequencyPenalty: nullOrString(config.frequencyPenalty),
      presencePenalty: nullOrString(config.presencePenalty),
    };

    // filter non-null values
    return Object.entries(values).reduce((acc, [key, value]) => {
      if (value !== null) {
        acc[key] = value;
      }

      return acc;
    }, {} as PromptRequest);
  };

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

    if (!config?.provider) {
      setError('Please select a provider');
      return null;
    }

    if (!config?.model) {
      setError('Please select a model');
      return null;
    }

    try {
      setLoading(true);
      setError(null);

      const request: PromptRequest = {
        ...requestParams(),
        text: text.trim(),
      };

      const response = await PromptService.enhancePrompt(request);

      // Add to history
      addToHistory({
        ...response,
        provider: config?.provider,
        // @ts-ignore
        id: response.timestamp, // Use timestamp as ID for now
        enhancementType: config?.enhancementType!,
        userRole: config?.userRole!,
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
    // eslint-disable-next-line
  }, [config?.provider, config?.model, config?.enhancementType, config?.userRole]);

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
        ...requestParams(),
        text: `${enhancedText}\n\nAdditional context: ${additionalContext}`,
      };

      const response = await PromptService.enhancePrompt(request);

      addToHistory({
        ...response,
        // @ts-ignore
        id: response.timestamp,
        provider: config.provider!,
        enhancementType: 'refine',
        userRole: config.userRole!,
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
    // eslint-disable-next-line
  }, [config.provider, config.userRole]);

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
        ...requestParams(),
        text: combinedText,
      };

      const response = await PromptService.enhancePrompt(request);

      addToHistory({
        ...response,
        // @ts-ignore
        id: response.timestamp,
        provider: config.provider!,
        enhancementType: 'combine',
        userRole: config.userRole!,
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
    // eslint-disable-next-line
  }, [config.provider, config.userRole]);

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
    requestParams,
  };
};
