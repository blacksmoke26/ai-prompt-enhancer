/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useRef} from 'react';

// helpers
import {cn} from '~/utils/helpers';

// ui components
import {MdxEditor} from '~/components/ui/MdxEditor';

// components
import TextStats from './TextStats';
import WordCloud from './WordCloud';
import EnhancedPrompt, {type EnhancedPromptResponse} from './EnhancedPrompt';

// types
import type {PromptResponse} from '~/types';
import type {MDXEditorMethods} from '@mdxeditor/editor';

export type {MDXEditorMethods};

/**
 * Props for the EditorContent component
 * @developerNote - The component handles extensive editor state including formatting, statistics, and various view modes
 * @developerNote - Line count is duplicated in props - consider consolidating
 */
export interface EditorContentProps {
  /** Current editor text value */
  value: string;

  /** Change handler for text value */
  onChange(value: string): void;

  /** Placeholder text for empty editor */
  placeholder?: string;
  /** Whether editor is disabled */
  disabled?: boolean;
  /** Error message to display */
  error?: string;
  /** Whether formatting toolbar is shown */
  showFormatting?: boolean;
  /** Current text formatting state */
  formatting: {
    bold: boolean;
    italic: boolean;
    underline: boolean;
    alignment: 'left' | 'center' | 'right';
    listType: 'none' | 'bullet' | 'numbered';
  };
  /** Whether editor has focus */
  isFocused: boolean;
  /** Whether editor is in fullscreen mode */
  isFullscreen: boolean;
  /** Whether word cloud is visible */
  showWordCloud: boolean;
  /** Word frequency data for cloud */
  wordFrequency: { word: string; count: number }[];
  /** Toggle word cloud visibility */
  setShowWordCloud: React.Dispatch<React.SetStateAction<boolean>>;
  /** Whether templates section is shown */
  showTemplates?: boolean;
  /** Whether preview section is shown */
  showPreview?: boolean;
  /** Response data from prompt enhancement */
  response?: PromptResponse | null;
  /** Original prompt text */
  originalPrompt?: string;
  /** Current word count */
  wordCount: number;
  /** Current character count */
  charCount: number;
  /** Current line count (duplicated) */
  lineCount: number;
  /** Estimated reading time in minutes */
  readingTime: number;
  /** Estimated token count */
  tokenEstimate: number;
  /** Current auto-save status */
  autoSaveStatus: 'idle' | 'saving' | 'saved';
  /** Last saved timestamp */
  lastSaved: Date | null;
  /** Maximum character limit */
  maxLength?: number;
  /** Whether line count is displayed */
  displayLineCount?: boolean;
  /** Whether statistics section is shown */
  showStats?: boolean;

  /** Key down event handler */
  onKeyDown?(e: React.KeyboardEvent<HTMLTextAreaElement>): void;

  /** Focus event handler */
  onFocus?(): void;

  /** Blur event handler */
  onBlur?(): void;
}

/**
 * Rich text editor component with statistics, word cloud, and formatting options
 * @example
 * ```tsx
 * <EditorContent
 *   value={content}
 *   onChange={setContent}
 *   isFocused={isFocused}
 *   isFullscreen={false}
 *   showWordCloud={false}
 *   wordFrequency={wordFreq}
 *   setShowWordCloud={toggleCloud}
 *   wordCount={words}
 *   charCount={chars}
 *   lineCount={lines}
 *   readingTime={readTime}
 *   tokenEstimate={tokens}
 *   autoSaveStatus="idle"
 *   lastSaved={lastSave}
 *   displayLineCount={true}
 *   showStats={true}
 * />
 * ```
 * @developerNote - Component conditionally renders multiple sections based on props
 * @developerNote - MdxEditor handles the core editing functionality
 * @developerNote - TextStats duplication of lineCount prop should be fixed
 */
const EditorContent = React.forwardRef<MDXEditorMethods, EditorContentProps>((props, ref) => {
  const {
    value,
    onChange,
    placeholder,
    disabled,
    error,
    showFormatting,
    formatting,
    isFocused,
    isFullscreen,
    showWordCloud,
    wordFrequency,
    setShowWordCloud,
    showTemplates,
    showPreview,
    response,
    originalPrompt,
    wordCount,
    charCount,
    lineCount,
    readingTime,
    tokenEstimate,
    autoSaveStatus,
    lastSaved,
    maxLength,
    displayLineCount,
    showStats,
    onKeyDown,
    onFocus,
    onBlur,
  } = props;

  return (
    <div
      className={cn(
        'relative',
        isFullscreen && 'fixed inset-0 z-50 bg-background p-8',
      )}
    >
      <MdxEditor
        value={value}
        onChange={onChange}
        readOnly={disabled}
        placeholder={placeholder}
        showFormatting={showFormatting}
        className={cn(
          'min-h-[400px] resize-none text-sm leading-relaxed transition-all duration-200',
          isFocused && 'ring-2 ring-ring ring-offset-2',
          disabled && 'opacity-50 cursor-not-allowed',
        )}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        autoFocus
        ref={ref}
      />
      {error && <p className="text-sm text-destructive">{error}</p>}

      {showStats && (
        <TextStats
          wordCount={wordCount}
          charCount={charCount}
          lineCount={lineCount}
          readingTime={readingTime}
          tokenEstimate={tokenEstimate}
          autoSaveStatus={autoSaveStatus}
          lastSaved={lastSaved}
          maxLength={maxLength ?? 10000}
          displayLineCount={displayLineCount ?? true}
        />
      )}

      {showWordCloud && (
        <WordCloud
          wordFrequency={wordFrequency}
          showWordCloud={showWordCloud}
          setShowWordCloud={setShowWordCloud}
        />
      )}

      {showTemplates && (
        <div className="p-4 border border-border rounded-lg">
          <h3 className="font-medium mb-2">Templates</h3>
          <p className="text-sm text-muted-foreground">
            Template selection would appear here
          </p>
        </div>
      )}

      {showPreview && (
        <div className="p-4 border border-border rounded-lg">
          <h3 className="font-medium mb-2">Preview</h3>
          <p className="text-sm text-muted-foreground">
            Prompt preview would appear here
          </p>
        </div>
      )}

      {response && (
        <EnhancedPrompt
          response={response as EnhancedPromptResponse}
          originalPrompt={originalPrompt ?? ''}
        />
      )}
    </div>
  );
});

EditorContent.displayName = 'EditorContent';

export default EditorContent;
