import React, {useState} from 'react';
import {AlertCircle, Play, RefreshCw} from 'lucide-react';

// hooks
import {useAppStore} from '~/stores/appStore.ts';
import {usePromptEnhancer} from '~/hooks/usePromptEnhancer.ts';

// components
import {Button} from '~/components/ui/Button';
import {Alert, AlertDescription} from '~/components/ui/Alert';
import {Card, CardContent, CardHeader, CardTitle} from '~/components/ui/Card';
import {AdvancedPromptEditor} from '~/components/AdvancedPromptEditor';

// types
import type {PromptResponse} from '~/types';

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
  /**
   * State management for the user's input prompt
   * @type {string} - The current prompt text being edited
   * @example
   * const [prompt, setPrompt] = useState('Initial prompt text');
   */
  const [prompt, setPrompt] = useState('');

  /**
   * State management for the API response containing enhanced prompt data
   * @type {PromptResponse | null} - The response object or null if no response yet
   * @example
   * const response = {
   *   enhancedPrompt: 'Enhanced version of the prompt',
   *   processingTime: 1234,
   *   tokensUsed: 150,
   *   originalPrompt: 'Original prompt text'
   * };
   */
  const [response, setResponse] = useState<PromptResponse | null>(null);

  /**
   * Destructured values from the prompt enhancer hook
   * enhancePrompt: Function to call the enhancement API
   * loading: Boolean indicating if an enhancement is in progress
   * error: Error message string or null if no error
   * clearError: Function to clear any existing error state
   */
  const { enhancePrompt, loading, error, clearError } = usePromptEnhancer();

  /**
   * Currently selected AI model from the global application state
   * Used to ensure a model is selected before allowing enhancement
   */
  const { selectedModel } = useAppStore();

  /**
   * Handles the prompt enhancement process
   * Validates input, clears existing errors, calls the API, and updates response state
   *
   * @async
   * @returns {Promise<void>}
   * @example
   * await handleEnhance(); // Enhances the current prompt
   *
   * @developer_notes
   * - Trims whitespace from prompt before validation
   * - Does nothing if prompt is empty
   * - Updates response state only on successful API call
   */
  const handleEnhance = async () => {
    if (!prompt.trim()) return;

    clearError();
    const result = await enhancePrompt(prompt);

    if (result) {
      setResponse(result);
    }
  };

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
    setResponse(null);
    clearError();
  };

  /**
   * Keyboard event handler for enhancement shortcuts
   * Detects Ctrl/Cmd + Enter combination to trigger enhancement
   *
   * @param {React.KeyboardEvent} e - The keyboard event object
   * @example
   * // This would trigger enhancement:
   * <textarea onKeyPress={handleKeyPress} />
   *
   * @developer_notes
  * - Prevents default browser behavior for the key combination
   * - Provides power-user functionality for frequent users
   * - Cross-platform support (Ctrl for Windows/Linux, Cmd for Mac)
   */
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleEnhance();
    }
  };

  return (
    <div className="space-y-6">
      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Main Editor */}
      <AdvancedPromptEditor
        value={prompt}
        onChange={setPrompt}
        label="Enter Your Prompt"
        placeholder="Type your prompt here and press Ctrl+Enter to enhance..."
        error={error || undefined}
        disabled={loading}
        response={response}
        onKeyPress={handleKeyPress}
        showStats={true}
        maxLength={10000}
        showTemplates={false}
        showFormatting={true}
        autoSave={true}
        showWordCloud={true}
        showPreview={false}
        onEnhance={handleEnhance}
        className="mb-6"
      />

      {/* Action Buttons */}
      <div className="flex items-center justify-center space-x-4">
        <Button
          onClick={handleEnhance}
          disabled={!prompt.trim() || !selectedModel || loading}
          size="lg"
          className="min-w-32"
        >
          {loading ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Enhancing...
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" />
              Enhance Prompt
            </>
          )}
        </Button>

        <Button
          variant="outline"
          onClick={handleReset}
          disabled={loading}
          size="lg"
        >
          Reset
        </Button>
      </div>

      {/* Quick Stats */}
      {response && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Enhancement Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {response.processingTime}ms
                </div>
                <div className="text-sm text-muted-foreground">Processing Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {response.tokensUsed || 'N/A'}
                </div>
                <div className="text-sm text-muted-foreground">Tokens Used</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {response.originalPrompt.length}
                </div>
                <div className="text-sm text-muted-foreground">Original Length</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {response.enhancedPrompt.length}
                </div>
                <div className="text-sm text-muted-foreground">Enhanced Length</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PromptEnhancer;
