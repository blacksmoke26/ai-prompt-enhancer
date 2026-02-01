/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useEffect, useRef, useState} from 'react';
import {Loader2, Maximize2, Minimize2, Send, Square} from 'lucide-react';

// helpers
import {cn} from '~/utils/helpers';

// ui components
import {Button} from '~/components/ui/Button';
import {TooltipMini} from '~/components/ui/Tooltip';
import {AdvancedTextarea} from '~/components/ui/AdvancedTextarea';

// components
import TextStatsTrigger from '~/components/AdvancedPromptEditor/TextStatsTrigger';
import DefaultSystemPrompt from '~/components/AdvancedPromptEditor/widgets/DefaultSystemPrompt';
import SmartSuggestionsTrigger from '~/components/AdvancedPromptEditor/SmartSuggestionsTrigger';
import DeepTextAnalysisTrigger from '~/components/AdvancedPromptEditor/DeepTextAnalysisTrigger';
import AdvancedWordAnalysisTrigger from '~/components/AdvancedPromptEditor/AdvancedWordAnalysisTrigger';

// relative components
import PromptActions from './PromptActions';

// types
import type {WordAnalysisConfig} from '~/utils/advanced-word-analysis';
import ItemsNavigator from '~/components/ui/ItemsNavigator.tsx';

export interface PromptEditorProps {
  /** Callback function when the user sends a prompt */
  onSend(prompt: string): void;

  /** Whether the prompt is currently being processed */
  isLoading: boolean;

  /** Whether the response is currently being streamed */
  isStreaming: boolean;

  /** Callback to stop the current stream */
  stopStreaming(): void,

  /** Whether the editor is in full-screen mode */
  isFullScreen: boolean;

  /** Callback to toggle full-screen mode */
  toggleFullScreen(): void;
}

/**
 * @returns The rendered PromptEditor component
 */
const PromptEditor: React.FC<PromptEditorProps> = (props) => {
  const {
    onSend,
    isLoading,
    isStreaming,
    stopStreaming,
    isFullScreen,
    toggleFullScreen,
  } = props;

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [prompt, setPrompt] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  /**
   * Auto-focus textarea when entering full-screen mode
   * @effect
   */
  useEffect(() => {
    if (isFullScreen && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isFullScreen]);

  /**
   * Handle sending the prompt
   */
  const handleSend = () => {
    if (prompt.trim()) {
      onSend(prompt);
    }
  };

  /**
   * Handle keyboard shortcuts
   * @param {KeyboardEvent} e - The keyboard event
   */
  const handleKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  /**
   * Get container classes based on full-screen state
   * @returns {string} CSS class names for the container
   */
  const containerClasses = isFullScreen
    ? `fixed inset-0 z-[55] flex flex-col p-6 bg-background transition-all duration-300`
    : `sticky bottom-0 z-20 w-full bg-background border-t border-border p-4 shadow-2xl transition-colors duration-300`;

  /**
   * Get textarea classes based on full-screen state
   * @returns {string} CSS class names for the textarea
   */
  const textareaClasses = `w-full bg-card text-foreground placeholder:text-muted-foreground/50 p-4 outline-none font-sans leading-relaxed transition-all duration-300
        ${isFullScreen ? 'flex-1 h-full text-lg resize-none' : 'min-h-[100px] max-h-[150px] resize-none text-base'}`;

  /**
   * Render the main PromptEditor component
   * @returns {JSX.Element} The editor UI
   */
  return (
    <div className={containerClasses}>
      <div
        className={`m-auto w-full flex flex-col transition-all duration-300 ${isFullScreen ? 'h-full' : 'max-w-7xl'}`}>

        {/* Editor Container */}
        <div
          className={cn('relative bg-card rounded-xl border border-border overflow-hidden',
            'ring-1 ring-black/5 dark:ring-white/5 flex flex-col',
            {'h-full': isFullScreen},
          )}>

          {/* Toolbar */}
          <div className="flex items-center justify-between border-b border-border px-3 bg-card">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Button size="sm" className="px-1" variant="plain" onClick={toggleFullScreen}>
                <TooltipMini title={isFullScreen ? 'Exit Full Screen (Esc)' : 'Full Screen Editor'}>
                  {isFullScreen ? <Minimize2 size={16}/> : <Maximize2 size={16}/>}
                </TooltipMini>
              </Button>

              <TextStatsTrigger disabled={isLoading || !prompt.trim()} prompt={prompt}/>

              <DeepTextAnalysisTrigger disabled={isLoading || !prompt.trim()} prompt={prompt}/>

              <AdvancedWordAnalysisTrigger
                config={{
                  customVocabulary: {simplifications: {okey: ['Ok', 'K']}},
                } as WordAnalysisConfig}
                prompt={prompt}/>

              <SmartSuggestionsTrigger
                prompt={prompt}
                isVisible={showSuggestions}
                onTogglePanel={() => setShowSuggestions(!showSuggestions)}
              />

              <DefaultSystemPrompt/>
            </div>
          </div>

          {/* Text Input */}
          <AdvancedTextarea
            size="lg"
            enableDragDrop
            enableAutoClosing={true}
            autoClosingPairs={[{open: '{', close: '}'}]}
            autoResize={false}
            wrapperClassName={isFullScreen ? 'h-full' : ''}
            ref={textareaRef}
            value={prompt}
            onChange={(value) => setPrompt(value)}
            onKeyDown={handleKeyDown}
            placeholder={isFullScreen ? 'Start writing your prompt here... (Press Esc to exit)' : 'Describe what you want to build or write about...'}
            disabled={isLoading}
            textareaClassName={textareaClasses}
          />

          {/* Footer Actions */}
          <div className="flex items-center justify-between px-4 bg-card border-t border-border">
            <div className="flex gap-2 text-muted-foreground items-center justify-between">
              <PromptActions/>
            </div>

            <div className="flex items-center gap-3">
              {prompt.length > 0 && (
                <span className="text-xs text-muted-foreground hidden sm:inline-block">
                  {prompt.length} chars
                </span>
              )}
              <Button
                onClick={() => isStreaming ? stopStreaming() : handleSend()}
                variant="plain"
                size="sm"
                disabled={isLoading || !prompt.trim()}
                className="px-0 group relative inline-flex items-center justify-center gap-2 overflow-hidden disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin"/>
                  </>
                ) : (
                  <>
                    {isStreaming ? <Square size={16} className="fill-current text-rose-500 animate-pulse"/> :
                      <Send size={16}/>}
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {!isFullScreen && (
          <div className="text-center mt-3">
            <p className="text-[10px] text-muted-foreground">
              AI-generated content may be inaccurate. Please verify important information.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromptEditor;
