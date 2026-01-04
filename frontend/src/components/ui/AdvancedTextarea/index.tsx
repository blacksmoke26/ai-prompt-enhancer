/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {
  forwardRef,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
  useCallback,
} from 'react';
import {Dialog, Portal} from '@radix-ui/themes';
import {
  Check,
  Copy,
  Eye,
  FileJson,
  Loader2,
  Sparkles,
  UploadCloud,
  X,
} from 'lucide-react';

// utils
import {cn} from '~/utils/helpers';

/**
 * Represents a pair of characters used for auto-closing in JSON mode (e.g., `{` and `}`).
 * @example
 * const pair: AutoClosingPair = { open: '{', close: '}' };
 */
export interface AutoClosingPair {
  /** The opening character (e.g., `{`, `"`). */
  open: string;
  /** The closing character (e.g., `}`, `"`, `]`). */
  close: string;
}

/**
 * Represents the available size variants for the textarea component.
 * @example
 * type Size = TextareaSize; // Possible values: 'sm', 'md', 'lg', 'xl'
 * @developerNotes These size variants control the font scale, padding, and minimum height of the textarea.
 */
export type TextareaSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * Defines the visual style variants for the textarea component.
 * @example
 * type Variant = TextareaVariant; // Possible values: 'classic', 'soft', 'filled', 'ghost'
 * @developerNotes These variants determine the background, border, and focus states of the textarea.
 */
export type TextareaVariant = 'classic' | 'soft' | 'filled' | 'ghost';

/**
 * Context object providing state and actions for the toolbar in the AdvancedTextarea component.
 * @example
 * const context: ToolbarContext = {
 *   value: 'Sample JSON',
 *   isValidJson: true,
 *   onFormat: () => console.log('Formatting JSON'),
 *   onCopy: () => navigator.clipboard.writeText('Sample JSON'),
 *   onClear: () => console.log('Cleared textarea'),
 *   isLoading: false,
 *   charCount: 12,
 *   maxLength: 100,
 * };
 * @developerNotes This context is used to control toolbar buttons and display state, such as validation status, character count, and loading indicators.
 */
export interface ToolbarContext {
  /**
   * Current value of the textarea.
   */
  value: string;

  /**
   * Indicates whether the current JSON content is valid.
   */
  isValidJson: boolean;

  /**
   * Formats the JSON content (only available in JSON mode).
   */
  onFormat(): void;

  /**
   * Copies the current value to the clipboard.
   */
  onCopy(): void;

  /**
   * Clears the textarea value.
   */
  onClear(): void;

  /**
   * Indicates whether a formatting or loading operation is in progress.
   */
  isLoading: boolean;

  /**
   * Current character count of the textarea value.
   */
  charCount: number;

  /**
   * Maximum allowed character length (optional, may not be set if not restricted).
   */
  maxLength?: number;
}

/**
 * Extensive props for the Ultimate Textarea component, extending React's native TextareaHTMLAttributes with advanced customization options.
 * @example
 * <AdvancedTextarea
 *   label="Description"
 *   value="Sample text"
 *   variant="filled"
 *   size="lg"
 *   radius="md"
 *   suggestions={['Option 1', 'Option 2']}
 * />
 * @developerNotes This interface supports advanced features like auto-resizing, JSON mode, and custom toolbars while maintaining compatibility with standard HTML textarea attributes.
 */
export interface AdvancedTextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange' | 'size'> {
  /**
   * Label text displayed above the textarea.
   */
  label?: string;

  /**
   * Helper text displayed below the label.
   */
  description?: string;

  /**
   * Error message to display if validation fails.
   */
  error?: string;

  /**
   * Placeholder text shown inside the textarea when empty.
   */
  placeholder?: string;

  /**
   * Size variant of the textarea (small, medium, large, extra large).
   */
  size?: TextareaSize;

  /**
   * Visual style variant for the textarea (classic, soft, filled, ghost).
   */
  variant?: TextareaVariant;

  /**
   * Border radius option for the textarea (none, small, medium, large, full).
   */
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';

  /**
   * Custom class name for the outer container wrapper.
   */
  wrapperClassName?: string;

  /**
   * Array of suggestions for autocomplete functionality.
   */
  suggestions?: string[];

  /**
   * Maximum allowed length of the input text.
   */
  maxLength?: number;

  /**
   * Enables JSON formatting and validation.
   */
  jsonMode?: boolean;

  /**
   * Enables auto-closing of brackets/quotes.
   */
  enableAutoClosing?: boolean;

  /**
   * Custom auto-closing pairs for syntax highlighting.
   */
  autoClosingPairs?: AutoClosingPair[];

  /**
   * Enables Tab key for indentation.
   */
  enableTabSupport?: boolean;

  /**
   * Enables file drag-and-drop into the textarea.
   */
  enableDragDrop?: boolean;

  /**
   * Automatically resizes the textarea height based on content.
   */
  autoResize?: boolean;

  /**
   * Displays character count next to the textarea.
   */
  showCharCount?: boolean;

  /**
   * Renders a loading spinner overlay.
   */
  isLoading?: boolean;

  /**
   * Displays a copy button to copy text.
   */
  showCopyButton?: boolean;

  /**
   * Displays a clear button to reset the textarea.
   */
  showClearButton?: boolean;

  /**
   * Displays a format button (only functional in JSON mode).
   */
  showFormatButton?: boolean;

  /**
   * Custom toolbar rendering function. Overrides default buttons if provided.
   * @param ctx - Context object containing state and actions.
   */
  renderToolbar?(ctx: ToolbarContext): React.ReactNode;

  /**
   * Delay (in milliseconds) for debouncing the onChange event.
   */
  debounceMs?: number;

  /**
   * Callback triggered when the textarea value changes.
   * @param value - New value of the textarea.
   */
  onChange?(value: string): void;

  /**
   * Callback triggered when a suggestion is selected.
   * @param suggestion - Selected suggestion.
   */
  onSuggestionSelect?(suggestion: string): void;

  /**
   * Callback triggered when a file is dropped into the editor.
   * @param file - Dropped file object.
   * @param content - File content as a string.
   */
  onFileDrop?(file: File, content: string): void;

  /**
   * Callback triggered when the textarea gains focus.
   * @param e - Focus event.
   */
  onFocus?(e: React.FocusEvent<HTMLTextAreaElement>): void;

  /**
   * Callback triggered when the textarea loses focus.
   * @param e - Blur event.
   */
  onBlur?(e: React.FocusEvent<HTMLTextAreaElement>): void;

  /**
   * Controlled value of the textarea.
   */
  value?: string;

  /**
   * Default value for the textarea (uncontrolled).
   */
  defaultValue?: string;
}

/**
 * Defines the size variants for the textarea component, mapping each size to its corresponding Tailwind CSS classes.
 * @example
 * const sizeClass = sizes.sm; // 'text-xs px-2 py-1.5 min-h-[60px]'
 * @developerNotes These classes control the font size, padding, and minimum height of the textarea.
 */
const sizes: Record<TextareaSize, string> = {
  sm: 'text-xs px-2 py-1.5 min-h-[60px]',
  md: 'text-sm px-3 py-2 min-h-[120px]',
  lg: 'text-base px-4 py-3 min-h-[150px]',
  xl: 'text-lg px-5 py-4 min-h-[180px]',
};

/**
 * Specifies the visual styles for different textarea variants, mapping each variant to its Tailwind CSS class string.
 * @example
 * const variantClass = variants.classic; // 'bg-background border-input focus:border-ring'
 * @developerNotes These variants affect the background, border, and focus styles of the textarea.
 */
const variants: Record<TextareaVariant, string> = {
  classic: 'bg-background border-input focus:border-ring',
  soft: 'bg-gray-50 dark:bg-gray-900/50 border-transparent shadow-sm focus:border-ring',
  filled: 'bg-gray-100 dark:bg-gray-800 border-transparent focus:bg-white dark:focus:bg-black',
  ghost: 'bg-transparent border-transparent hover:bg-gray-50 dark:hover:bg-gray-900/50 focus:bg-gray-50 dark:focus:bg-gray-900/50',
};

/**
 * Determines the border radius options for the textarea, mapping each radius value to its corresponding Tailwind CSS class.
 * @example
 * const radiusClass = radiuses.lg; // 'rounded-lg'
 * @developerNotes These classes control the corner rounding of the textarea component.
 */
const radiuses: Record<NonNullable<AdvancedTextareaProps['radius']>, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
};


/**
 * A syntax highlighter component for JSON strings, applying color coding to keys, values, and structure elements.
 * @typedef {Function} SyntaxHighlighter
 * @param {string} json - The JSON string to be syntax-highlighted.
 * @example
 * <SyntaxHighlighter json='{"name": "John", "age": 30}' />
 */
const SyntaxHighlighter: React.FC<{ json: string }> = ({json}) => {
  if (!json) return null;

  // Simple regex-based highlighting for demonstration.
  // For production, a lexer like PrismJS or refractor is recommended.
  const formatJson = (str: string) => {
    str = str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return str.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
      match => {
        let cls = 'text-orange-500';
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = 'text-blue-400 font-semibold';
          } else {
            cls = 'text-green-400';
          }
        } else if (/true|false/.test(match)) {
          cls = 'text-purple-400';
        } else if (/null/.test(match)) {
          cls = 'text-gray-500 italic';
        }
        return `<span class="${cls}">${match}</span>`;
      },
    );
  };

  return (
    <div
      className="font-mono text-sm leading-relaxed bg-gray-900 text-gray-100 p-4 rounded-md overflow-auto whitespace-pre">
      <code dangerouslySetInnerHTML={{__html: formatJson(json)}}/>
    </div>
  );
};

/**
 * A highly flexible and feature-rich textarea component that supports both JSON editing with auto-closing and formatting, and regular text input with autocomplete suggestions.
 * @param  props - The props for the textarea component.
 * @example
 * #### Mode 1: JSON Editor with Auto-closing and Formatting
 * <AdvancedTextarea
 *   label="JSON Config Editor"
 *   jsonMode
 *   enableAutoClosing
 *   value={value}
 *   onChange={v => setValue(v)}
 *   placeholder="Type or paste JSON here..."
 * />
 *
 * #### Mode 2: Regular Text with Autocomplete
 * <AdvancedTextarea
 *   label="Notes (Regular Mode)"
 *   suggestions={["TODO: Buy milk", "TODO: Call mom", "Meeting at 5pm"]}
 *   maxLength={200}
 *   placeholder="Type 'TODO' to see suggestions..."
 * />
 */
export const AdvancedTextarea = forwardRef<HTMLTextAreaElement, AdvancedTextareaProps>(
  (
    {
      className,
      wrapperClassName,
      label,
      description,
      error,
      maxLength,
      suggestions = [],
      onSuggestionSelect,
      isLoading = false,
      showCopyButton = true,
      showClearButton = true,
      showFormatButton = true,
      showCharCount = false,
      autoResize = true,
      jsonMode = false,
      enableAutoClosing = false,
      autoClosingPairs = [
        {open: '{', close: '}'},
        {open: '[', close: ']'},
        {open: '(', close: ')'},
        {open: '"', close: '"'},
        {open: '`', close: '`'},
        {open: '\'', close: '\''},
      ],
      enableTabSupport = false,
      enableDragDrop = false,
      debounceMs = 0,
      renderToolbar,
      value: controlledValue,
      defaultValue,
      onChange,
      onFileDrop,
      onFocus,
      onBlur,
      size = 'md',
      variant = 'classic',
      radius = 'md',
      ...props
    },
    ref,
  ) => {
    const internalRef = useRef<HTMLTextAreaElement>(null);
    const textareaRef = (ref as React.RefObject<HTMLTextAreaElement>) || internalRef;
    const containerRef = useRef<HTMLDivElement>(null);

    // State
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = useState(defaultValue || controlledValue || '');
    const currentValue = isControlled ? controlledValue : internalValue;

    // Autocomplete state
    const [open, setOpen] = useState(false);
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [popupStyle, setPopupStyle] = useState<React.CSSProperties>({});

    // JSON & Validation
    const [isValidJson, setIsValidJson] = useState(false);
    const [jsonError, setJsonError] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    // --- Ref for Debounce Timer ---
    const debounceTimerRef = useRef<NodeJS.Timeout>(undefined);

    // --- Helpers ---
    const triggerChange = useCallback(
      (newValue: string) => {
        if (!isControlled) setInternalValue(newValue);

        if (debounceMs > 0) {
          if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
          debounceTimerRef.current = setTimeout(() => {
            onChange?.(newValue);
          }, debounceMs);
        } else {
          onChange?.(newValue);
        }
      },
      [isControlled, debounceMs, onChange],
    );

    const updateValue = (newValue: string, cursorPosition?: number) => {
      triggerChange(newValue);
      if (cursorPosition !== undefined && textareaRef.current) {
        requestAnimationFrame(() => {
          textareaRef.current?.setSelectionRange(cursorPosition, cursorPosition);
        });
      }
    };

    // --- Effects ---

    // Auto-resize
    useEffect(() => {
      if (autoResize && textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 400)}px`;
      }
    }, [currentValue, autoResize, textareaRef]);

    // JSON Validation
    useEffect(() => {
      if (!jsonMode || !currentValue.trim()) {
        setIsValidJson(false);
        setJsonError(null);
        return;
      }
      try {
        JSON.parse(currentValue);
        setIsValidJson(true);
        setJsonError(null);
      } catch (e) {
        setIsValidJson(false);
        setJsonError(e instanceof Error ? e.message : 'Invalid JSON');
      }
    }, [currentValue, jsonMode]);

    // Suggestions Filtering
    useEffect(() => {
      if (suggestions.length > 0 && currentValue.length > 0) {
        const filtered = suggestions.filter(s =>
          s.toLowerCase().includes(currentValue.toLowerCase()),
        );
        setFilteredSuggestions(filtered);
        setOpen(filtered.length > 0);
        setActiveIndex(0);
      } else {
        setOpen(false);
      }
    }, [currentValue, suggestions]);

    // Popup Positioning
    useLayoutEffect(() => {
      if (open && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setPopupStyle({
          position: 'fixed',
          top: rect.bottom + 4,
          left: rect.left,
          width: rect.width,
          zIndex: 9999,
        });
      }
    }, [open, filteredSuggestions]);

    // --- Handlers ---

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      triggerChange(e.target.value);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
      // 1. Tab Support (Highest Priority)
      if (enableTabSupport && e.key === 'Tab') {
        e.preventDefault();
        const start = textareaRef.current?.selectionStart || 0;
        const end = textareaRef.current?.selectionEnd || 0;
        const inserted = '\t';
        const newValue = currentValue.slice(0, start) + inserted + currentValue.slice(end);
        updateValue(newValue, start + 1);
        return;
      }

      // 2. Autocomplete Navigation
      if (open && filteredSuggestions.length > 0) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setActiveIndex(prev => (prev + 1) % filteredSuggestions.length);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setActiveIndex(prev => (prev - 1 + filteredSuggestions.length) % filteredSuggestions.length);
        } else if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleSelectSuggestion(filteredSuggestions[activeIndex]);
          return;
        } else if (e.key === 'Escape') {
          setOpen(false);
        }
      }

      // 3. Auto-Closing Logic
      if (enableAutoClosing && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const start = textareaRef.current?.selectionStart || 0;
        const end = textareaRef.current?.selectionEnd || 0;
        const char = e.key;

        // Find matching pair
        const pair = autoClosingPairs.find(p => p.open === char);

        if (pair) {
          // Prevent default only if we aren't selecting a range of text to wrap
          const isRangeSelection = start !== end;

          if (!isRangeSelection) {
            // Standard insertion: Char + Close
            e.preventDefault();
            const inserted = pair.open + pair.close;
            const newValue = currentValue.slice(0, start) + inserted + currentValue.slice(end);
            updateValue(newValue, start + 1);
          } else {
            // Range wrapping: wrap selection in pair
            e.preventDefault();
            const selectedText = currentValue.slice(start, end);
            const wrapped = pair.open + selectedText + pair.close;
            const newValue = currentValue.slice(0, start) + wrapped + currentValue.slice(end);
            updateValue(newValue, start + wrapped.length);
          }
        }

        // Handle "Backspace" to delete pair
        if (e.key === 'Backspace') {
          // If the character before cursor is an open char, and char after is close char, delete both
          const prevChar = currentValue[start - 1];
          const nextChar = currentValue[start];
          const pair = autoClosingPairs.find(p => p.open === prevChar && p.close === nextChar);

          if (pair) {
            e.preventDefault();
            const newValue = currentValue.slice(0, start - 1) + currentValue.slice(end + 1);
            updateValue(newValue, start - 1);
          }
        }
      }
    };

    // --- Action Handlers ---

    const handleFormatJson = () => {
      if (!isValidJson || !currentValue) return;
      try {
        const parsed = JSON.parse(currentValue);
        updateValue(JSON.stringify(parsed, null, 2));
      } catch (e) {
        console.error('Failed to format', e);
      }
    };

    const handleClear = () => {
      updateValue('');
      textareaRef.current?.focus();
    };

    const handleCopy = async () => {
      if (textareaRef.current) await navigator.clipboard.writeText(textareaRef.current.value);
    };

    const handleSelectSuggestion = (suggestion: string) => {
      updateValue(suggestion);
      onSuggestionSelect?.(suggestion);
      setOpen(false);
      textareaRef.current?.focus();
    };

    // --- Drag & Drop Handlers ---
    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      if (enableDragDrop) setIsDragging(true);
    };
    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      if (enableDragDrop) setIsDragging(false);
    };
    const handleDrop = async (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (!enableDragDrop || !e.dataTransfer.files.length) return;

      const file = e.dataTransfer.files[0];
      if (file) {
        const text = await file.text();
        updateValue(text);
        onFileDrop?.(file, text);
      }
    };

    // --- Calculations ---
    const charCount = currentValue.length;
    const isNearLimit = maxLength && charCount >= maxLength * 0.9;
    const isAtLimit = maxLength && charCount >= maxLength;
    const showCount = showCharCount || maxLength !== undefined;

    // --- Toolbar Context ---
    const toolbarContext: ToolbarContext = {
      value: currentValue,
      isValidJson,
      onFormat: handleFormatJson,
      onCopy: handleCopy,
      onClear: handleClear,
      isLoading,
      charCount,
      maxLength,
    };

    return (
      <div
        className={cn('w-full space-y-2 relative font-sans', wrapperClassName)}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Label & Description */}
        {(label || description) && (
          <div className="space-y-1">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex justify-between">
              {label}
              {error && <span className="text-destructive text-xs">{error}</span>}
            </label>
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
          </div>
        )}

        {/* Editor Area */}
        <div
          ref={containerRef}
          className={cn(
            'relative group transition-all duration-200',
            isDragging && 'ring-2 ring-ring ring-offset-2',
          )}
        >
          {/* JSON Status Badge (Absolute Top Right) */}
          {jsonMode && (
            <div className="absolute top-2 right-2 z-10">
              {isValidJson ? (
                <span
                  className="flex items-center gap-1 text-[10px] font-mono text-green-600 bg-green-50 px-1.5 py-0.5 rounded dark:bg-green-900/20 dark:text-green-400">
                  <Check className="w-2.5 h-2.5"/> Valid
                </span>
              ) : currentValue ? (
                <span
                  className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground bg-background px-1.5 py-0.5 rounded">
                   {jsonError ? 'Invalid' : '...'}
                 </span>
              ) : null}
            </div>
          )}

          {/* Drag Overlay */}
          {isDragging && (
            <div
              className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm rounded-md border-2 border-dashed border-ring">
              <UploadCloud className="w-8 h-8 text-ring mb-2"/>
              <span className="text-sm font-medium text-ring">Drop file to load</span>
            </div>
          )}

          <textarea
            ref={textareaRef}
            value={currentValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={onFocus}
            onBlur={onBlur}
            className={cn(
              'flex w-full ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200',
              'border focus-visible:ring-2',
              sizes[size],
              variants[variant],
              radiuses[radius],
              error || isAtLimit ? 'border-destructive focus-visible:ring-destructive' : '',
              // Add padding bottom if we show the default toolbar
              (!renderToolbar && (showCount || isLoading || currentValue)) ? 'pb-10' : '',
              jsonMode ? 'font-mono' : '',
              className,
            )}
            spellCheck="false"
            {...props}
          />

          {/* Default Toolbar (Footer) */}
          {!renderToolbar && (showCount || isLoading || currentValue || showFormatButton) && (
            <div className="absolute bottom-2 right-2 flex items-center gap-2 pointer-events-none z-10">
              {isLoading && <Loader2 className="w-4 h-4 text-muted-foreground animate-spin"/>}

              {showClearButton && currentValue && !isLoading && !props.disabled && (
                <button type="button" onClick={handleClear}
                        className="pointer-events-auto text-muted-foreground hover:text-foreground p-1 rounded hover:bg-accent/50 transition-colors"
                        title="Clear">
                  <X className="w-3 h-3"/>
                </button>
              )}

              {showCopyButton && currentValue && !isLoading && (
                <button type="button" onClick={handleCopy}
                        className="pointer-events-auto text-muted-foreground hover:text-foreground p-1 rounded hover:bg-accent/50 transition-colors"
                        title="Copy">
                  <Copy className="w-3 h-3"/>
                </button>
              )}

              {jsonMode && showFormatButton && isValidJson && (
                <button type="button" onClick={handleFormatJson}
                        className="pointer-events-auto text-blue-600 bg-blue-50 dark:bg-blue-900/20 p-1 rounded hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                        title="Format JSON">
                  <Sparkles className="w-3 h-3"/>
                </button>
              )}

              {showCount && (
                <span
                  className={cn('text-[10px] tabular-nums font-medium', isAtLimit ? 'text-destructive' : 'text-muted-foreground')}>
                  {charCount}/{maxLength}
                </span>
              )}
            </div>
          )}

          {/* Custom Toolbar */}
          {renderToolbar && (
            <div className="absolute bottom-2 right-2 pointer-events-auto z-10">
              {renderToolbar(toolbarContext)}
            </div>
          )}

          {/* Progress Bar (Only if default toolbar is NOT used) */}
          {!renderToolbar && showCount && (
            <div className="absolute bottom-0 left-0 h-0.5 bg-secondary rounded-b-md w-full overflow-hidden">
              <div
                className={cn('h-full transition-all duration-300 ease-out', isAtLimit ? 'bg-destructive' : isNearLimit ? 'bg-yellow-500' : 'bg-primary')}
                style={{width: `${Math.min((charCount / (maxLength || 1)) * 100, 100)}%`}}/>
            </div>
          )}
        </div>

        {/* JSON Preview Dialog */}
        {jsonMode && (
          <Dialog.Root>
            <Dialog.Trigger>
              <button type="button" disabled={!isValidJson}
                      className="text-xs text-muted-foreground hover:text-foreground disabled:opacity-50 flex items-center gap-1 transition-colors">
                <Eye className="w-3 h-3"/> View JSON
              </button>
            </Dialog.Trigger>
            <Dialog.Content
              className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 rounded-xl">
              <div className="flex flex-col space-y-1.5 text-center sm:text-left">
                <Dialog.Title className="text-lg font-semibold leading-none tracking-tight flex items-center gap-2">
                  <FileJson className="w-5 h-5 text-blue-500"/> JSON Preview
                </Dialog.Title>
              </div>
              <div className="py-4">
                <SyntaxHighlighter json={currentValue}/>
              </div>
              <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
                <Dialog.Close>
                  <button
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                    Close
                  </button>
                </Dialog.Close>
              </div>
            </Dialog.Content>
          </Dialog.Root>
        )}

        {/* Suggestion Portal */}
        {open && (
          <Portal>
            <div style={popupStyle}
                 className="rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-xl p-1 animate-in fade-in zoom-in-95 duration-200">
              <ul className="max-h-60 overflow-auto py-1">
                {filteredSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelectSuggestion(suggestion)}
                    className={cn('relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-gray-100 dark:hover:bg-gray-700', index === activeIndex && 'bg-gray-100 dark:bg-gray-700')}
                  >
                    <span className="flex-1 truncate text-gray-900 dark:text-gray-100">{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Portal>
        )}
      </div>
    );
  },
);

AdvancedTextarea.displayName = 'AdvancedTextarea';
