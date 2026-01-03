/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {forwardRef, KeyboardEvent, useEffect, useRef, useState} from 'react';
import {Dialog, Popover} from '@radix-ui/themes';
import {Check, Copy, Eye, FileJson, Loader2, Sparkles, X} from 'lucide-react';

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
 * Props interface for an advanced textarea component, extending standard HTML textarea attributes
 * with additional features like suggestions, auto-resizing, and JSON formatting.
 * @typedef {Object} AdvancedTextareaProps
 * @example
 * <AdvancedTextarea
 *   label="JSON Input"
 *   jsonMode
 *   autoClosingPairs={[{ open: '{', close: '}' }]}
 *   onSuggestionSelect={(suggestion) => console.log('Selected:', suggestion)}
 * />
 */
export interface AdvancedTextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  /**
   * Label text for the textarea
   */
  label?: string;

  /**
   * Error message to display below the textarea
   */
  error?: string;

  /**
   * Maximum allowed length of input
   */
  maxLength?: number;

  /**
   * List of suggestions for autocomplete
   */
  suggestions?: string[];

  /**
   * Callback for when a suggestion is selected
   * @param {string} suggestion - The selected suggestion
   */
  onSuggestionSelect?(suggestion: string): void;

  /**
   * Show a loading spinner
   * @default false
   */
  isLoading?: boolean;

  /**
   * Show a copy button
   * @default false
   */
  showCopyButton?: boolean;

  /**
   * Enable auto-resizing based on content
   * @default false
   */
  autoResize?: boolean;

  /**
   * Enable JSON-specific features (detection, formatting, preview)
   * @default false
   */
  jsonMode?: boolean;

  /**
   * Enable auto-closing of brackets/quotes
   * @default false
   */
  enableAutoClosing?: boolean;

  /**
   * Custom auto-closing pairs (e.g., for JSON or custom syntax)
   * @default Standard JSON pairs
   */
  autoClosingPairs?: AutoClosingPair[];

  /**
   * Current value of the textarea
   */
  value?: string;

  /**
   * Callback for value changes
   * @param {React.ChangeEvent<HTMLTextAreaElement>} e - Change event
   */
  onChange?(e: React.ChangeEvent<HTMLTextAreaElement>): void;
}

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
    return str.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g, (match) => {
      let cls = 'text-orange-500'; // number
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'text-blue-400 font-semibold'; // key
        } else {
          cls = 'text-green-400'; // string
        }
      } else if (/true|false/.test(match)) {
        cls = 'text-purple-400'; // boolean
      } else if (/null/.test(match)) {
        cls = 'text-gray-500 italic'; // null
      }
      return `<span class="${cls}">${match}</span>`;
    });
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
 *   onChange={(e) => setValue(e.target.value)}
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
      label,
      error,
      maxLength,
      suggestions = [],
      onSuggestionSelect,
      isLoading = false,
      showCopyButton = true,
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
      value: controlledValue,
      onChange,
      ...props
    },
    ref,
  ) => {
    const internalRef = useRef<HTMLTextAreaElement>(null);
    const textareaRef = (ref as React.RefObject<HTMLTextAreaElement>) || internalRef;

    const [internalValue, setInternalValue] = useState(controlledValue || '');
    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled ? controlledValue : internalValue;

    // Autocomplete state
    const [open, setOpen] = useState(false);
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    // JSON State
    const [isValidJson, setIsValidJson] = useState(false);
    const [jsonError, setJsonError] = useState<string | null>(null);

    // --- Auto-resize ---
    useEffect(() => {
      if (autoResize && textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 400)}px`;
      }
    }, [currentValue, autoResize, textareaRef]);

    // --- JSON Detection Logic ---
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

    // --- Autocomplete Filtering ---
    useEffect(() => {
      if (suggestions.length > 0 && currentValue.length > 0) {
        const filtered = suggestions.filter((s) =>
          s.toLowerCase().includes(currentValue.toLowerCase()),
        );
        setFilteredSuggestions(filtered);
        setOpen(filtered.length > 0);
        setActiveIndex(0);
      } else {
        setOpen(false);
      }
    }, [currentValue, suggestions]);

    // --- Core Handlers ---

    const updateValue = (newValue: string, cursorPosition?: number) => {
      if (!isControlled) setInternalValue(newValue);

      // We need to construct a synthetic event if onChange expects it
      const syntheticEvent = {
        target: {value: newValue},
      } as React.ChangeEvent<HTMLTextAreaElement>;

      onChange?.(syntheticEvent);

      // Cursor manipulation must happen after React render
      if (cursorPosition !== undefined && textareaRef.current) {
        requestAnimationFrame(() => {
          textareaRef.current?.setSelectionRange(cursorPosition, cursorPosition);
        });
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      updateValue(e.target.value);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
      // 1. Autocomplete Navigation
      if (open && filteredSuggestions.length > 0) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setActiveIndex((prev) => (prev + 1) % filteredSuggestions.length);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setActiveIndex((prev) => (prev - 1 + filteredSuggestions.length) % filteredSuggestions.length);
        } else if (e.key === 'Enter') {
          if (!e.shiftKey) {
            e.preventDefault();
            handleSelectSuggestion(filteredSuggestions[activeIndex]);
            return; // Exit early to prevent auto-closing logic from running
          }
        } else if (e.key === 'Escape') {
          setOpen(false);
        }
      }

      // 2. Auto-Closing Logic
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
        const formatted = JSON.stringify(parsed, null, 2);
        updateValue(formatted);
      } catch (e) {
        console.error('Failed to format', e);
      }
    };

    const handleClear = () => {
      updateValue('');
      textareaRef.current?.focus();
    };

    const handleCopy = async () => {
      if (textareaRef.current) {
        await navigator.clipboard.writeText(textareaRef.current.value);
      }
    };

    const handleSelectSuggestion = (suggestion: string) => {
      updateValue(suggestion);
      onSuggestionSelect?.(suggestion);
      setOpen(false);
      textareaRef.current?.focus();
    };

    // --- UI Calculations ---
    const charCount = currentValue.length;
    const isNearLimit = maxLength && charCount >= maxLength * 0.9;
    const isAtLimit = maxLength && charCount >= maxLength;
    const showCharCount = maxLength !== undefined;

    return (
      <div className="w-full max-w-2xl space-y-2 relative font-sans">

        {/* Header / Label */}
        <div className="flex items-center justify-between">
          {label && (
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {label}
            </label>
          )}

          {/* JSON Toolbar */}
          {jsonMode && (
            <div className="flex items-center gap-2 text-xs">
              {isValidJson ? (
                <span
                  className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-0.5 rounded-full dark:bg-green-900/20 dark:text-green-400">
                  <Check className="w-3 h-3"/> Valid JSON
                </span>
              ) : currentValue ? (
                <span className="text-muted-foreground flex items-center gap-1">
                   {jsonError ? <span className="text-destructive truncate max-w-[150px]"
                                      title={jsonError}>Invalid</span> : 'Checking...'}
                 </span>
              ) : null}

              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <button
                    type="button"
                    disabled={!isValidJson}
                    className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-accent text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Eye className="w-3 h-3"/> Preview
                  </button>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay
                    className="fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 z-50"/>
                  <Dialog.Content
                    className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-xl">
                    <div className="flex flex-col space-y-1.5 text-center sm:text-left">
                      <Dialog.Title
                        className="text-lg font-semibold leading-none tracking-tight flex items-center gap-2">
                        <FileJson className="w-5 h-5 text-blue-500"/>
                        JSON Preview
                      </Dialog.Title>
                    </div>
                    <div className="py-4">
                      <SyntaxHighlighter json={currentValue}/>
                    </div>
                    <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
                      <Dialog.Close asChild>
                        <button
                          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                          Close
                        </button>
                      </Dialog.Close>
                    </div>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            </div>
          )}
        </div>

        {/* Editor Area */}
        <div className="relative group">
          <textarea
            ref={textareaRef}
            value={currentValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className={cn(
              'flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono', // Monospace helps with JSON
              'transition-all duration-200 ease-in-out',
              error || isAtLimit ? 'border-destructive' : 'focus-visible:ring-ring',
              jsonMode ? 'font-mono text-xs leading-relaxed' : '',
              currentValue ? 'pb-10' : '', // Space for footer
              className,
            )}
            spellCheck="false"
            {...props}
          />

          {/* Overlay Footer */}
          {(currentValue || showCharCount || isLoading) && (
            <div className="absolute bottom-2 right-2 flex items-center gap-2 pointer-events-none z-10">
              {isLoading && <Loader2 className="w-4 h-4 text-muted-foreground animate-spin"/>}

              {/* Clear */}
              {currentValue && !isLoading && !props.disabled && (
                <button type="button" onClick={handleClear}
                        className="pointer-events-auto text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-accent transition-colors">
                  <X className="w-3 h-3"/>
                </button>
              )}

              {/* Copy */}
              {showCopyButton && currentValue && !isLoading && (
                <button type="button" onClick={handleCopy}
                        className="pointer-events-auto text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-accent transition-colors">
                  <Copy className="w-3 h-3"/>
                </button>
              )}

              {/* Format Button (Floating inside if JSON Mode) */}
              {jsonMode && isValidJson && (
                <button
                  type="button"
                  onClick={handleFormatJson}
                  title="Format JSON (Prettify)"
                  className="pointer-events-auto text-blue-600 bg-blue-50 dark:bg-blue-900/20 p-1 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                >
                  <Sparkles className="w-3 h-3"/>
                </button>
              )}

              {showCharCount && (
                <span
                  className={cn('text-[10px] tabular-nums font-medium', isAtLimit ? 'text-destructive' : 'text-muted-foreground')}>
                  {charCount}/{maxLength}
                </span>
              )}
            </div>
          )}

          {/* Char Limit Bar */}
          {showCharCount && (
            <div className="absolute bottom-0 left-0 h-0.5 bg-secondary rounded-b-md w-full overflow-hidden">
              <div
                className={cn('h-full transition-all duration-300 ease-out', isAtLimit ? 'bg-destructive' : isNearLimit ? 'bg-yellow-500' : 'bg-primary')}
                style={{width: `${Math.min((charCount / maxLength) * 100, 100)}%`}}
              />
            </div>
          )}
        </div>

        {/* Autocomplete Popover */}
        <Popover.Root open={open} onOpenChange={setOpen}>
          <Popover.Anchor asChild>
            <div style={{position: 'absolute', width: 0, height: 0}}/>
          </Popover.Anchor>
          <Popover.Portal>
            <Popover.Content
              className="z-50 w-[--radix-popover-trigger-width] rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2"
              sideOffset={5}
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
              <ul className="max-h-60 overflow-auto py-1">
                {filteredSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelectSuggestion(suggestion)}
                    className={cn('relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground', index === activeIndex && 'bg-accent text-accent-foreground')}
                  >
                    <span className="flex-1 truncate">{suggestion}</span>
                  </li>
                ))}
              </ul>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>
    );
  },
);
