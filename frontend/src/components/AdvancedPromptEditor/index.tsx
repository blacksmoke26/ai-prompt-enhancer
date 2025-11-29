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
export interface PromptEditorProps {
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
 * Advanced prompt editor with auto-save, formatting, and AI enhancement capabilities
 * @developer Notes: Component uses React hooks extensively for state management and side effects.
 * Keyboard shortcuts are handled globally - ensure no conflicts with parent components.
 * Token estimation is approximate (4 chars per token) and may vary by model.
 */
export const AdvancedPromptEditor: React.FC<PromptEditorProps> = (props) => {
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

  const [isFocused, setIsFocused] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [lineCount, setLineCount] = useState(0);
  const [readingTime, setReadingTime] = useState(0);
  const [tokenEstimate, setTokenEstimate] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showWordCloud, setShowWordCloud] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [autoSaveStatus, setAutoSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [selectedText, setSelectedText] = useState('');
  const [formatting, setFormatting] = useState({
    bold: false,
    italic: false,
    underline: false,
    alignment: 'left' as 'left' | 'center' | 'right',
    listType: 'none' as 'none' | 'bullet' | 'numbered',
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

    setWordCount(words);
    setCharCount(chars);
    setLineCount(lines);

    const readingMinutes = Math.ceil(words / 200);
    setReadingTime(readingMinutes);

    const tokens = Math.ceil(chars / 4);
    setTokenEstimate(tokens);

    // Auto-save functionality
    if (autoSave && onAutoSave && value.trim()) {
      const now = new Date();
      if (value !== selectedText) {
        setAutoSaveStatus('saving');
        onAutoSave(value);
        setLastSaved(now);
        setTimeout(() => setAutoSaveStatus('saved'), 1000);
      }
      setSelectedText(value);
    }
  }, [value, autoSave, onAutoSave, selectedText]);

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
            setFormatting(prev => ({...prev, bold: !prev.bold}));
            break;
          case 'i':
            e.preventDefault();
            setFormatting(prev => ({...prev, italic: !prev.italic}));
            break;
          case 'u':
            e.preventDefault();
            setFormatting(prev => ({...prev, underline: !prev.underline}));
            break;
          case 'l':
            e.preventDefault();
            setFormatting(prev => ({...prev, alignment: 'left'}));
            break;
          case 'e':
            e.preventDefault();
            setFormatting(prev => ({...prev, alignment: 'center'}));
            break;
          case 'r':
            e.preventDefault();
            setFormatting(prev => ({...prev, alignment: 'right'}));
            break;
          case 'f11':
            e.preventDefault();
            setIsFullscreen(prev => !prev);
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
              {autoSave && <AutoSaveIndicator autoSaveStatus={autoSaveStatus} lastSaved={lastSaved} />}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {showFormatting && (
            <FormattingToolbar formatting={formatting} setFormatting={setFormatting} />
          )}

          {showWordCloud && (
            <WordCloud
              wordFrequency={wordFrequency}
              showWordCloud={showWordCloud}
              setShowWordCloud={setShowWordCloud}
            />
          )}

          <div className={cn(
            'relative',
            isFullscreen && 'fixed inset-0 z-50 bg-background p-8',
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
                isFocused && 'ring-2 ring-ring ring-offset-2',
                disabled && 'opacity-50 cursor-not-allowed',
                isFullscreen && 'min-h-screen',
                formatting.bold && 'font-bold',
                formatting.italic && 'italic',
                formatting.underline && 'underline',
                formatting.alignment === 'center' && 'text-center',
                formatting.alignment === 'right' && 'text-right',
                formatting.listType === 'bullet' && 'list-disc',
                formatting.listType === 'numbered' && 'list-decimal',
              )}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              style={{
                textAlign: formatting.alignment as any,
                listStyleType: formatting.listType === 'numbered' ? 'decimal' : formatting.listType === 'bullet' ? 'disc' : 'none',
              }}
            />

            <TextStats
              wordCount={wordCount}
              charCount={charCount}
              readingTime={readingTime}
              tokenEstimate={tokenEstimate}
              autoSaveStatus={autoSaveStatus}
              lastSaved={lastSaved}
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
