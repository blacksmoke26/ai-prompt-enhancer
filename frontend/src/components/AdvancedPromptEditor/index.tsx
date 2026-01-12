/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Brain, NotebookText, WandSparkles} from 'lucide-react';

// helpers
import {cn, copyToClipboard, downloadFile} from '~/utils/helpers';

// ui components
import {Card, CardContent, CardHeader} from '~/components/ui/Card';

// components
import ActionButtons from './ActionButtons';
import AutoSaveIndicator from './AutoSaveIndicator';
import DefaultSystemPrompt from './widgets/DefaultSystemPrompt';
import SmartSuggestionsTrigger from './SmartSuggestionsTrigger';
import AdvancedWordAnalysisTrigger, {WordAnalysisConfig} from './AdvancedWordAnalysisTrigger';
import EditorContentWithSmartPanel, {MDXEditorMethods} from './EditorContentWithSmartPanel';

// types
import type {PromptResponse} from '~/types';
import {Button} from '~/components/ui/Button.tsx';
import {TooltipMini} from '~/components/ui/Tooltip.tsx';
import {useAppStore} from '~/stores/appStore.ts';

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

  /** Show template selection */
  showTemplates?: boolean;

  /** Prompt enhancement callback */
  onEnhance?(prompt: string): void;

  /** Show preview panel */
  showPreview?: boolean;
  /** Show word cloud visualization */
  showWordCloud?: boolean;
  /** Enable auto-save functionality */
  autoSave?: boolean;

  /** Auto-save callback function */
  onAutoSave?(prompt: string): void;

  /** Word count to display (overrides auto-calculated) */
  wordCount?: number;
  /** Line count to display (overrides auto-calculated) */
  lineCount?: number;
  /** Display line count in stats panel */
  displayLineCount?: boolean;
  /** Show/hide line count in stats panel */
  showLineCount?: boolean;

  /** Callback function to update the default system prompt */
  onSystemPromptChange?(systemPrompt: string): void;
}

/**
 * Interface for component state management
 */
export interface EditorState {
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
}

/**
 * Advanced prompt editor with auto-save, formatting, and AI enhancement capabilities
 * @developer Notes: Component uses React hooks extensively for state management and side effects.
 * Keyboard shortcuts are handled globally - ensure no conflicts with parent components.
 * Token estimation is approximate (4 chars per token) and may vary by model.
 */
const AdvancedPromptEditor: React.FC<AdvancedPromptEditorProps> = (props) => {
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
    showTemplates = false,
    onEnhance,
    showPreview = false,
    autoSave = false,
    onAutoSave,
    showWordCloud = false,
  } = props;

  const [state, setState] = useState<EditorState>({
    isFocused: false,
    wordCount: 0,
    charCount: 0,
    lineCount: 0,
    readingTime: 0,
    tokenEstimate: 0,
    isFullscreen: false,
    showWordCloud,
    lastSaved: null,
    autoSaveStatus: 'idle',
    selectedText: '',
  });

  const textareaRef = useRef<MDXEditorMethods>(null);

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
          setState(prev => ({...prev, autoSaveStatus: 'saved'}));
        }, 1000);
      }
    }
  }, [value, autoSave, onAutoSave, state.selectedText]);

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
    if (textareaRef.current) {
      textareaRef.current.setMarkdown('');
    }
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

  const wordFrequency = getWordFrequency();


  const [showSuggestions, setShowSuggestions] = useState(false);

  const {config, setConfig} = useAppStore();

  return (
    <div className={cn('w-full', className)}>
      <Card className="border-2 border-border/50">
        <CardHeader>
          <div className="flex justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-lg font-semibold">
                <WandSparkles className="display-inline"/> {label || 'Advanced Prompt Editor'}</h1>
              {autoSave && <AutoSaveIndicator autoSaveStatus={state.autoSaveStatus} lastSaved={state.lastSaved}/>}
            </div>

            <div className="flex justify-between">
              <Button size="icon" variant="plain" onClick={() => {
                setConfig({showPromptStats: !config.showPromptStats}, true);
              }}>
                <TooltipMini title="Show Prompt Statistics"><NotebookText className="h-5"/></TooltipMini>
              </Button>
              <Button size="icon" variant="plain" onClick={() => {
                setConfig({showDeepTextAnalysis: !config.showDeepTextAnalysis}, true);
              }}>
                <TooltipMini title="Show Deep Text Analysis"><Brain className="h-5"/></TooltipMini>
              </Button>
              <AdvancedWordAnalysisTrigger
                config={{
                  customVocabulary: {simplifications: {okey: ['Ok', 'K']}},
                } as WordAnalysisConfig}
                prompt={value}/>
              <DefaultSystemPrompt/>
              <SmartSuggestionsTrigger
                prompt={value}
                isVisible={showSuggestions}
                onTogglePanel={() => setShowSuggestions(!showSuggestions)}
                response={response}
              />
            </div>
          </div>
          <p className="text-sm">Enter your prompt below and let AI enhance it for better results</p>
        </CardHeader>

        <CardContent className="space-y-4 p-3">
          <EditorContentWithSmartPanel
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            error={error}
            isFocused={state.isFocused}
            isFullscreen={state.isFullscreen}
            wordFrequency={wordFrequency}
            showTemplates={showTemplates}
            showPreview={showPreview}
            response={response}
            originalPrompt={value}
            autoSaveStatus={state.autoSaveStatus}
            lastSaved={state.lastSaved}
            ref={textareaRef}
          />
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

export default AdvancedPromptEditor;
