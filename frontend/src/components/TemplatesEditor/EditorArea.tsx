/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @version 2.3.0
 * @see https://github.com/blacksmoke26
 */

import React, {useCallback, useMemo, useState} from 'react';
import {AlertCircle, Copy, Maximize2, Minimize2, Trash2, Type} from 'lucide-react';

// utils
import {cn} from '~/utils/helpers';

// ui components
import {AdvancedTextarea} from '~/components/ui/AdvancedTextarea';

// relative components
import StatItem from './StatItem';
import ProgressBar from './ProgressBar';

// types
import type {PromptTemplate} from './index';

// ---------------------------------------------------------------------
// Type Definitions
// ---------------------------------------------------------------------

/**
 * Props for the EditorArea component (v2).
 */
export interface EditorAreaProps {
  // -----------------------------------------------------------------
  // Data
  // -----------------------------------------------------------------
  /** The current text content of the editor. */
  value: string;
  /** Callback when content changes. */
  onChange(value: string): void;
  /** Metadata about the prompt template. */
  metadata?: PromptTemplate;

  // -----------------------------------------------------------------
  // Appearance & Styling
  // -----------------------------------------------------------------
  /** Visual variant of the container. @default 'default' */
  variant?: 'default' | 'minimal' | 'borderless';
  /** Border radius utility class. @default 'xl' */
  radius?: string;
  /** Shadow utility class. @default 'sm' */
  shadow?: string;
  /** Background color class. @default 'card' */
  backgroundColor?: string;
  /** Border color class. @default 'border' */
  borderColor?: string;
  /** Main container CSS class. */
  className?: string;
  /** Textarea CSS class. */
  textareaClassName?: string;

  // -----------------------------------------------------------------
  // Features & Toggles
  // -----------------------------------------------------------------
  /** Show the top header bar. @default true */
  showHeader?: boolean;
  /** Show the bottom footer bar. @default true */
  showFooter?: boolean;
  /** Show the copy to clipboard button. @default true */
  showCopyButton?: boolean;
  /** Show the clear content button. @default true */
  showClearButton?: boolean;
  /** Show the fullscreen toggle button. @default true */
  showFullscreenButton?: boolean;
  /** Enable character counting. @default true */
  showCharCount?: boolean;
  /** Enable word counting. @default true */
  showWordCount?: boolean;
  /** Type of character limit indicator. @default 'text' */
  limitIndicator?: 'text' | 'progress' | 'both' | 'none';

  // -----------------------------------------------------------------
  // Behavior & Validation
  // -----------------------------------------------------------------
  /** Is the component disabled? */
  disabled?: boolean;
  /** Is the component read-only? */
  readOnly?: boolean;
  /** Enable spell check. @default true */
  spellCheck?: boolean;
  /** Auto focus on mount. */
  autoFocus?: boolean;
  /** Maximum character length. */
  maxLength?: number;
  /** Minimum character length. */
  minLength?: number;
  /** Placeholder text. @default 'Start typing your prompt...' */
  placeholder?: string;
  /** Handle tab key indentation (adds 2 spaces). @default true */
  enableTabIndentation?: boolean;

  // -----------------------------------------------------------------
  // Configuration
  // -----------------------------------------------------------------
  /**
   * Configuration object for specific editor behavior flags.
   */
  config?: {
    /** Determines if the user is allowed to manually edit the prompt content.
     * When set to false, the editor acts as read-only.
     * @default true */
    enableManualEdit?: boolean;
    /** Allow other arbitrary configuration flags. */
    [key: string]: any;
  };

  // -----------------------------------------------------------------
  // Advanced Textarea Props
  // -----------------------------------------------------------------
  /**
   * Additional props to pass directly to the underlying AdvancedTextarea component.
   * Useful for native attributes (id, name, rows, cols) or specific AdvancedTextarea configurations.
   */
  editorProps?: Omit<React.ComponentProps<typeof AdvancedTextarea>, 'value' | 'onChange'> & { [key: string]: any };

  // -----------------------------------------------------------------
  // Custom Render Slots
  // -----------------------------------------------------------------
  /** Custom content for the left side of the header. */
  headerStart?: React.ReactNode;
  /** Custom content for the right side of the header. */
  headerEnd?: React.ReactNode;
  /** Custom content for the left side of the footer. */
  footerStart?: React.ReactNode;
  /** Custom content for the right side of the footer. */
  footerEnd?: React.ReactNode;
  /** Render a custom tag element. */
  renderTag?: (tag: string, onClick: (tag: string) => void) => React.ReactNode;

  // -----------------------------------------------------------------
  // Callbacks
  // -----------------------------------------------------------------
  /** Fired when copy button is clicked. */
  onCopy?: () => void;
  /** Fired when clear button is clicked. */
  onClear?: () => void;
  /** Fired when a tag is clicked. */
  onTagClick?: (tag: string) => void;
  /** Fired when content is pasted into the textarea. */
  onPaste?: (e: React.ClipboardEvent<HTMLTextAreaElement>) => void;
}

const EditorArea: React.FC<EditorAreaProps> = (props) => {
  // Destructure all props with defaults
  const {
    value,
    onChange,
    metadata,
    // Appearance
    variant = 'default',
    radius = 'xl',
    shadow = 'sm',
    backgroundColor = 'card',
    borderColor = 'border',
    className,
    textareaClassName,
    // Features
    showHeader = true,
    showFooter = true,
    showCopyButton = true,
    showClearButton = true,
    showFullscreenButton = true,
    showCharCount = true,
    showWordCount = true,
    limitIndicator = 'text',
    // Behavior
    disabled = false,
    readOnly = false,
    spellCheck = true,
    autoFocus = false,
    maxLength,
    minLength,
    placeholder = 'Start typing your prompt...',
    enableTabIndentation = true,
    // Config
    config = {},
    // Editor Props (Passthrough)
    editorProps = {},
    // Slots
    headerStart,
    headerEnd,
    footerStart,
    footerEnd,
    renderTag,
    // Callbacks
    onCopy,
    onClear,
    onTagClick,
    onPaste,
  } = props;

  // Internal State
  const [isFullscreen, setIsFullscreen] = useState(false);

  // -----------------------------------------------------------------
  // Derived State & Calculations
  // -----------------------------------------------------------------

  // Determine effective read-only state based on both prop and config
  // If config explicitly disables manual edit, we enforce read-only.
  const effectiveReadOnly = readOnly || config.enableManualEdit === false;

  const wordCount = useMemo(() => {
    if (!value.trim()) return 0;
    return value.trim().split(/\s+/).length;
  }, [value]);

  const charCount = value.length;
  const isOverLimit = Boolean(maxLength && charCount > maxLength);
  const isUnderMin = minLength && charCount < minLength && charCount > 0;

  // Determine progress bar color based on limit
  const progressColor = useMemo(() => {
    if (!maxLength) return 'bg-primary';
    const ratio = charCount / maxLength;
    if (ratio > 1) return 'bg-destructive';
    if (ratio > 0.9) return 'bg-orange-500';
    return 'bg-primary';
  }, [charCount, maxLength]);

  // -----------------------------------------------------------------
  // Handlers
  // -----------------------------------------------------------------

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Call external onKeyDown if present in editorProps
    if (editorProps.onKeyDown) {
      editorProps.onKeyDown(e);
    }

    // Only handle Tab indentation if editing is enabled and prop allows it
    if (e.key === 'Tab' && enableTabIndentation && !effectiveReadOnly) {
      e.preventDefault();
      const txtArea = e.target as HTMLTextAreaElement;
      const start = txtArea.selectionStart;
      const end = txtArea.selectionEnd;
      const val = txtArea.value;
      txtArea.value = val.substring(0, start) + '  ' + val.substring(end);
      txtArea.selectionStart = txtArea.selectionEnd = start + 2;
      onChange(txtArea.value);
    }
  };

  const handleClear = useCallback(() => {
    if (onClear) {
      onClear();
    } else {
      onChange('');
    }
  }, [onClear, onChange]);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(prev => !prev);
  }, []);

  const defaultTagRenderer = useCallback((tag: string) => (
    <span
      key={tag}
      onClick={() => onTagClick && onTagClick(tag)}
      className="text-xs font-medium px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors cursor-pointer select-none"
    >
      #{tag}
    </span>
  ), [onTagClick]);

  // -----------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------

  return (
    <section
      className={cn(
        'flex flex-col h-full w-full overflow-hidden relative transition-all duration-300',
        // Base Colors
        `bg-${backgroundColor}`,
        // Borders & Radius
        variant === 'default' && cn(`border ${borderColor} shadow-${shadow}`, `rounded-${radius}`),
        variant === 'minimal' && 'border-b border-border',
        variant === 'borderless' && '',
        // Fullscreen State
        isFullscreen && 'fixed inset-0 z-50 rounded-none bg-background shadow-2xl',
        className
      )}
    >
      {/* --- Header --- */}
      {showHeader && (
        <div className="h-12 border-b border-border bg-background/50 flex items-center justify-between px-4 shrink-0 select-none">
          {/* Left: Metadata / Custom */}
          <div className="flex items-center gap-3 h-full overflow-hidden">
            {headerStart || (
              <>
                {metadata?.category && (
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">
                    {metadata.category}
                  </span>
                )}
                {metadata?.category && <div className="h-3 w-[1px] bg-border" />}
                <div className="flex gap-1.5 h-full items-center overflow-x-auto no-scrollbar">
                  {metadata?.tags?.map?.(tag =>
                    renderTag ? renderTag(tag, onTagClick || (() => {})) : defaultTagRenderer(tag)
                  )}
                </div>
              </>
            )}
          </div>

          {/* Right: Actions / Custom */}
          <div className="flex items-center gap-2 h-full">
            {headerEnd || (
              <>
                {showClearButton && value.length > 0 && !effectiveReadOnly && !disabled && (
                  <button
                    onClick={handleClear}
                    className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                    title="Clear content"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
                {showFullscreenButton && (
                  <button
                    onClick={toggleFullscreen}
                    className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                    title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                  >
                    {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                  </button>
                )}
                {showCopyButton && (
                  <button
                    onClick={onCopy}
                    className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                    title="Copy to clipboard"
                  >
                    <Copy size={14} />
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* --- Body (Textarea) --- */}
      <div className="flex-1 relative min-h-0 bg-transparent">
        <AdvancedTextarea
          {...editorProps} // Pass arbitrary editor props here
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          onPaste={onPaste}
          showCopyButton
          showFormatButton
          showClearButton
          autoResize={false}
          enableAutoClosing={true}
          disabled={disabled}
          readOnly={effectiveReadOnly} // Use derived state
          spellCheck={spellCheck}
          autoFocus={autoFocus}
          placeholder={placeholder}
          maxLength={maxLength}
          style={!isFullscreen ? {height: 400} : {}}
          className={cn(
            'w-full resize-none bg-transparent outline-none p-6 overflow-y-auto',
            'placeholder:text-muted-foreground/50 disabled:opacity-50',
            effectiveReadOnly && 'cursor-default',
            textareaClassName
          )}
        />

        {/* Limit Warning Overlay */}
        {isOverLimit && (
          <div className="absolute top-4 right-4 pointer-events-none opacity-20">
            <AlertCircle className="text-destructive w-12 h-12" />
          </div>
        )}
      </div>

      {/* --- Footer --- */}
      {showFooter && (
        <div className="bg-background/80 px-4 py-2 flex flex-col gap-2 shrink-0">

          {/* Progress Bar Area */}
          {maxLength && limitIndicator !== 'none' && (limitIndicator === 'progress' || limitIndicator === 'both') && (
            <div className="w-full px-1">
              <ProgressBar value={charCount} max={maxLength} colorClass={progressColor} />
            </div>
          )}

          <div className="flex items-center justify-between h-6">
            {/* Left: Stats / Custom */}
            <div className="flex items-center gap-4 overflow-hidden">
              {footerStart || (
                <>
                  {showWordCount && (
                    <StatItem icon={<Type size={12} />} label="Words" value={wordCount} />
                  )}
                  {showCharCount && (
                    <StatItem
                      icon={<span className="font-serif">a</span>}
                      label="Chars"
                      value={maxLength ? `${charCount} / ${maxLength}` : charCount}
                      warning={isOverLimit}
                    />
                  )}
                  {isUnderMin && (
                    <span className="text-[10px] text-muted-foreground italic">
                      Min {minLength} chars required
                    </span>
                  )}
                </>
              )}
            </div>

            {/* Right: Custom Actions */}
            <div className="flex items-center">
              {footerEnd}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default EditorArea;
