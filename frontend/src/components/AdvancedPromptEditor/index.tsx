import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Textarea } from '~/components/ui/Textarea';
import { Card, CardContent, CardHeader } from '~/components/ui/Card';
import { cn, copyToClipboard, downloadFile } from '~/utils/helpers';

// types
import type { PromptResponse } from '~/types';

// ui components
import FormattingToolbar from './FormattingToolbar';
import TextStats from './TextStats';
import WordCloud from './WordCloud';
import EnhancedPrompt from './EnhancedPrompt';
import ActionButtons from './ActionButtons';
import AutoSaveIndicator from './AutoSaveIndicator';

/**
 * Configuration props for the Advanced Prompt Editor component
 * @example
 * <AdvancedPromptEditor
 *   value={prompt}
 *   onChange={setPrompt}
 *   onEnhance={enhancePrompt}
 *   autoSave
 *   onAutoSave={savePrompt}
 * />
 */
export interface AdvancedPromptEditorProps {
  /** Current prompt text value */
  value: string;
  /** Callback for prompt text changes */
  onChange(value: string): void;
  /** Placeholder text for empty textarea */
  placeholder?: string;
  /** Optional label for the editor */
  label?: string;
  /** Error message to display */
  error?: string;
  /** Disable editor interactions */
  disabled?: boolean;
  /** Show action buttons for copy, download, etc. */
  showActions?: boolean;
  /** Enhanced prompt response data */
  response?: PromptResponse | null;
  /** Additional CSS classes */
  className?: string;
  /** Custom key press handler */
  onKeyPress?(e: React.KeyboardEvent): void;
  /** Show statistics panel */
  showStats?: boolean;
  /** Maximum character limit */
  maxLength?: number;
  /** Show template selection */
  showTemplates?: boolean;
  /** Prompt enhancement callback */
  onEnhance?(prompt: string): void;
  /** Show formatting toolbar */
  showFormatting?: boolean;
  /** Show preview panel */
  showPreview?: boolean;
  /** Enable auto-save functionality */
  autoSave?: boolean;
  /** Auto-save callback function */
  onAutoSave?(prompt: string): void;
}

/**
 * Interface for component state management
 */
 interface EditorState {
   /** Whether the editor is currently focused */
   isFocused: boolean;
   /** Total number of words in the editor */
   wordCount: number;
   /** Total number of characters in the editor */
   charCount: number;
   /** Number of lines in the editor content */
   lineCount: number;
   /** Estimated reading time in minutes (200 words/min) */
   readingTime: number;
   /** Approximate token count estimation (4 chars/token) */
   tokenEstimate: number;
   /** Whether fullscreen mode is active */
   isFullscreen: boolean;
   /** Whether word cloud visualization is shown */
   showWordCloud: boolean;
   /** Timestamp of last auto-save operation */
   lastSaved: Date | null;
   /** Current auto-save operation status */
   autoSaveStatus: 'idle' | 'saving' | 'saved';
   /** Currently selected text in the editor */
   selectedText: string;
   /** Text formatting options and styles */
   formatting: {
     /** Bold text formatting */
     bold: boolean;
     /** Italic text formatting */
     italic: boolean;
     /** Underline text formatting */
     underline: boolean;
     /** Text alignment setting */
     alignment: 'left' | 'center' | 'right';
     /** List style type */
     listType: 'none' | 'bullet' | 'numbered';
   };
 }

/**
 * Advanced prompt editor with auto-save, formatting, and AI enhancement capabilities
 * @developer Notes: Component uses React hooks extensively for state management and side effects.
 * Keyboard shortcuts are handled globally - ensure no conflicts with parent components.
 * Token estimation is approximate (4 chars per token) and may vary by model.
 */
export const AdvancedPromptEditor: React.FC<AdvancedPromptEditorProps> = (props) => {
  const {
    value,
    onChange,
    placeholder = 'Enter your prompt here...',
    label,
    error,
    disabled = false,
    showActions = true,
    response,
    className,
    onKeyPress,
    showStats = true,
    maxLength = 10000,
    showTemplates = false,
    onEnhance,
    showFormatting = false,
    showPreview = false,
    autoSave = false,
    onAutoSave,
  } = props;

  const [state, setState] = useState<EditorState>({
    isFocused: false,
    wordCount: 0,
    charCount: 0,
    lineCount: 0,
    readingTime: 0,
    tokenEstimate: 0,
    isFullscreen: false,
    showWordCloud: false,
    lastSaved: null,
    autoSaveStatus: 'idle',
    selectedText: '',
    formatting: {
      bold: false,
      italic: false,
      underline: false,
      alignment: 'left',
      listType: 'none',
    },
  });
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  /**
   * Calculates text statistics and handles auto-save
   * @developer Notes: Reading time assumes 200 words per minute average.
   * Auto-save triggers only when content actually changes.
   */
  useEffect(() => {
    const words = value.trim().split(/\s+/).filter(word => word.length > 0).length;
    const chars = value.length;
    const lines = value.split('\n').length;

    const readingMinutes = Math.ceil(words / 200);
    const tokens = Math.ceil(chars / 4);

    setState(prev => ({
      ...prev,
      wordCount: words,
      charCount: chars,
      lineCount: lines,
      readingTime: readingMinutes,
      tokenEstimate: tokens,
    }));

    // Auto-save functionality
    if (autoSave && onAutoSave && value.trim()) {
      const now = new Date();
      if (value !== state.selectedText) {
        setState(prev => ({
          ...prev,
          autoSaveStatus: 'saving',
          lastSaved: now,
          selectedText: value,
        }));
        onAutoSave(value);
        setTimeout(() => {
          setState(prev => ({ ...prev, autoSaveStatus: 'saved' }));
        }, 1000);
      }
    }
  }, [value, autoSave, onAutoSave, state.selectedText]);

  /**
   * Sets up keyboard shortcuts for formatting and fullscreen
   * @developer Notes: Shortcuts use Ctrl/Meta key combinations to avoid browser conflicts.
   * F11 toggles fullscreen mode but may conflict with browser's native fullscreen.
   */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'b':
            e.preventDefault();
            setState(prev => ({
              ...prev,
              formatting: { ...prev.formatting, bold: !prev.formatting.bold }
            }));
            break;
          case 'i':
            e.preventDefault();
            setState(prev => ({
              ...prev,
              formatting: { ...prev.formatting, italic: !prev.formatting.italic }
            }));
            break;
          case 'u':
            e.preventDefault();
            setState(prev => ({
              ...prev,
              formatting: { ...prev.formatting, underline: !prev.formatting.underline }
            }));
            break;
          case 'l':
            e.preventDefault();
            setState(prev => ({
              ...prev,
              formatting: { ...prev.formatting, alignment: 'left' }
            }));
            break;
          case 'e':
            e.preventDefault();
            setState(prev => ({
              ...prev,
              formatting: { ...prev.formatting, alignment: 'center' }
            }));
            break;
          case 'r':
            e.preventDefault();
            setState(prev => ({
              ...prev,
              formatting: { ...prev.formatting, alignment: 'right' }
            }));
            break;
          case 'f11':
            e.preventDefault();
            setState(prev => ({ ...prev, isFullscreen: !prev.isFullscreen }));
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  /**
   * Analyzes word frequency in the prompt text
   * @returns Array of top 10 most frequent words with counts
   * @developer Notes: Filters out words shorter than 4 characters for meaningful analysis.
   * Returns frequency sorted in descending order.
   */
  const getWordFrequency = useCallback(() => {
    const words = value.toLowerCase().split(/\s+/).filter(word => word.length > 3);
    const frequency: Record<string, number> = {};

    words.forEach(word => {
      frequency[word] = (frequency[word] || 0) + 1;
    });

    return Object.entries(frequency)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([word, count]) => ({word, count}));
  }, [value]);

  /**
   * Copies current prompt text to clipboard
   * @developer Notes: Uses helper utility that handles clipboard permissions.
   */
  const handleCopy = async () => {
    await copyToClipboard(value);
  };

  /**
   * Downloads prompt as text file with date-stamped filename
   * @developer Notes: Filename format: prompt-YYYY-MM-DD.txt
   */
  const handleDownload = () => {
    const filename = `prompt-${new Date().toISOString().split('T')[0]}.txt`;
    downloadFile(value, filename);
  };

  /**
   * Shares prompt using Web Share API or clipboard fallback
   * @developer Notes: Falls back to clipboard copy if native sharing is unavailable.
   */
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'AI Prompt',
          text: value,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      await copyToClipboard(value);
    }
  };

  /**
   * Clears all text content from the editor
   */
  const handleClear = () => {
    onChange('');
  };

  /**
   * Triggers prompt enhancement via provided callback
   * @developer Notes: Only available when onEnhance prop is provided.
   */
  const handleEnhance = () => {
    if (onEnhance) {
      onEnhance(value);
    }
  };

  /**
   * Handles custom keyboard interactions in textarea
   * @developer Notes: Inserts 2 spaces for Tab key to maintain formatting.
   * Calls external key handler if provided.
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const newValue = value.substring(0, start) + '  ' + value.substring(end);
      onChange(newValue);

      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2;
        }
      }, 0);
    }

    if (onKeyPress) {
      onKeyPress(e);
    }
  };

  const wordFrequency = getWordFrequency();

  return (
    <div className={cn('w-full', className)}>
      <Card className="border-2 border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-lg font-semibold">{label || 'Advanced Prompt Editor'}</h1>
              {autoSave && <AutoSaveIndicator autoSaveStatus={state.autoSaveStatus} lastSaved={state.lastSaved} />}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {showFormatting && (
            <FormattingToolbar formatting={state.formatting} setFormatting={(formatting) => setState(prev => ({ ...prev, formatting: formatting as EditorState['formatting'] }))} />
          )}

          {state.showWordCloud && (
            <WordCloud
              wordFrequency={wordFrequency}
              showWordCloud={state.showWordCloud}
              setShowWordCloud={(show) => setState(prev => ({ ...prev, showWordCloud: Boolean(show) }))}
            />
          )}

          <div className={cn(
            'relative',
            state.isFullscreen && 'fixed inset-0 z-50 bg-background p-8',
          )}>
            <Textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              error={error}
              disabled={disabled}
              maxLength={maxLength}
              className={cn(
                'min-h-[400px] resize-none font-mono text-sm leading-relaxed transition-all duration-200',
                state.isFocused && 'ring-2 ring-ring ring-offset-2',
                disabled && 'opacity-50 cursor-not-allowed',
                state.isFullscreen && 'min-h-screen',
                state.formatting.bold && 'font-bold',
                state.formatting.italic && 'italic',
                state.formatting.underline && 'underline',
                state.formatting.alignment === 'center' && 'text-center',
                state.formatting.alignment === 'right' && 'text-right',
                state.formatting.listType === 'bullet' && 'list-disc',
                state.formatting.listType === 'numbered' && 'list-decimal',
              )}
              onKeyDown={handleKeyDown}
              onFocus={() => setState(prev => ({ ...prev, isFocused: true }))}
              onBlur={() => setState(prev => ({ ...prev, isFocused: false }))}
              style={{
                textAlign: state.formatting.alignment as any,
                listStyleType: state.formatting.listType === 'numbered' ? 'decimal' : state.formatting.listType === 'bullet' ? 'disc' : 'none',
              }}
            />

            <TextStats
              wordCount={state.wordCount}
              charCount={state.charCount}
              readingTime={state.readingTime}
              tokenEstimate={state.tokenEstimate}
              autoSaveStatus={state.autoSaveStatus}
              lastSaved={state.lastSaved}
              maxLength={maxLength}
            />
          </div>

          {response && (
            <EnhancedPrompt response={response} originalPrompt={value} />
          )}
        </CardContent>

          <ActionButtons
            value={value}
            handleCopy={handleCopy}
            handleDownload={handleDownload}
            handleShare={handleShare}
            handleClear={handleClear}
            handleEnhance={handleEnhance}
            onEnhance={onEnhance}
            disabled={disabled}
            showActions={showActions}
          />
      </Card>
    </div>
  );
};
