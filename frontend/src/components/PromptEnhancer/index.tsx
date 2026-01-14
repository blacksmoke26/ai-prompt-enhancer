/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useState} from 'react';

// store
import {useAppStore} from '~/stores/appStore';

// hooks
import useGenerateSteam from '~/hooks/useGenerateSteam';

// components
import ErrorAlert from '~/components/PromptEnhancer/ErrorAlert';
import AdvancedPromptEditor from '~/components/AdvancedPromptEditor';
import ActionButtons from '~/components/PromptEnhancer/ActionButtons';
import EnhancedPrompt from '~/components/AdvancedPromptEditor/EnhancedPrompt';

/**
 * PromptEnhancer Component
 *
 * A comprehensive UI component that provides an interface for enhancing user prompts
 * using AI/ML capabilities. It features a rich text editor, real-time statistics,
 * error handling, and response visualization.
 *
 * @component
 * @example
 * ```tsx
 * <PromptEnhancer />
 * ```
 *
 * @developer_notes
 * - This component integrates with the prompt enhancement API through usePromptEnhancer hook
 * - It maintains local state for the prompt text and API response
 * - The component handles keyboard shortcuts (Ctrl/Cmd + Enter) for quick enhancement
 * - Error states are prominently displayed with dismissible alerts
 * - Statistics are shown in a responsive grid layout that adapts to screen size
 * - All actions are disabled during loading states to prevent race conditions
 */
const PromptEnhancer: React.FC = () => {
  const [prompt, setPrompt] = useState('');

  /**
   * Destructured values from the prompt enhancer hook
   * enhancePrompt: Function to call the enhancement API
   * loading: Boolean indicating if an enhancement is in progress
   * error: Error message string or null if no error
   * clearError: Function to clear any existing error state
   */
  const {startStream, stopStream, isStreaming: loading, error, clearError, content, clearContent} = useGenerateSteam();

  /**
   * Currently selected AI model from the global application state
   * Used to ensure a model is selected before allowing enhancement
   */
  const {config} = useAppStore();

  /**
   * Handles the prompt enhancement process
   * Validates input, clears existing errors, calls the API, and updates response state
   *
   * @developer_notes
   * - Trims whitespace from prompt before validation
   * - Does nothing if prompt is empty
   * - Updates response state only on successful API call
   */
  const handleEnhance = async () => {
    if (!prompt.trim()) return;

    clearError();
    await startStream(prompt);
  };

  /**
   * Stops the current enhancement process
   * @developerNotes Useful for interrupting a long-running enhancement
   */
  const handleStop = async () => stopStream();

  /**
   * Resets the component to its initial state
   * Clears prompt text, response data, and any existing errors
   *
   * @example
   * handleReset(); // Returns component to fresh state
   *
   * @developer_notes
   * - Useful for starting over with a new prompt
   * - Ensures clean state for next enhancement operation
   */
  const handleReset = () => {
    setPrompt('');
    clearError();
    clearContent();
  };

  return (
    <div className="space-y-6">
      <ErrorAlert error={error}/>

      <AdvancedPromptEditor
        value={prompt}
        onChange={setPrompt}
        label="Enter Your Prompt"
        placeholder="Type your prompt here..."
        error={error || undefined}
        disabled={loading}
        content={content}
        showTemplates={false}
        autoSave={true}
        showWordCloud={true}
        showPreview={false}
        className="mb-6"
      />

      <ActionButtons
        onStreamingStart={handleEnhance}
        onStreamingStop={handleStop}
        onReset={handleReset}
        isLoading={loading}
        isEnhancementAvailable={!!prompt.trim() && !!config.model}
      />

      <EnhancedPrompt content={content || ''}/>
    </div>
  );
};

export default PromptEnhancer;
