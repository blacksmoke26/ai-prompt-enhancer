/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useState, useRef, useEffect} from 'react';

// utils
import {cn} from '~/utils/helpers';

// hooks
import {useAppStore} from '~/stores/appStore';

// ui components
import {MdxEditor} from '~/components/ui/MdxEditor';

// components
import TextStats from './widgets/TextStats';
import DeepTextAnalysis from '~/components/standalone/WordCloud/WordCloudAdvance';

// types
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
  /** Placeholder text for empty editor */
  placeholder?: string;
  /** Whether editor is disabled */
  disabled?: boolean;
  /** Error message to display */
  error?: string;
  /** Whether editor has focus */
  isFocused: boolean;
  /** Whether editor is in fullscreen mode */
  isFullscreen: boolean;
  /** Word frequency data for cloud */
  wordFrequency: { word: string; count: number }[];
  /** Whether templates section is shown */
  showTemplates?: boolean;
  /** Whether preview section is shown */
  showPreview?: boolean;
  /** Original prompt text */
  originalPrompt?: string;
  /** Current auto-save status */
  autoSaveStatus: 'idle' | 'saving' | 'saved';
  /** Last saved timestamp */
  lastSaved: Date | null;

  /** Whether to show the smart suggestion panel */
  showSmartPanel?: boolean;

  /** Editor settings */
  editorSettings?: {
    scrollBehavior?: 'auto' | 'manual' | 'smart';
    maxHeight?: number;
    autoScroll?: boolean;
    fontSize?: 'small' | 'medium' | 'large';
    lineHeight?: 'tight' | 'normal' | 'relaxed' | 'loose';
    showScrollbar?: boolean;
    theme?: 'default' | 'dark' | 'light' | 'blue' | 'green';
    fontFamily?: 'system' | 'monospace' | 'serif' | 'sans-serif';
    wordWrap?: boolean;
    showLineNumbers?: boolean;
  };

  /** Blur event handler */
  onBlur?(): void;

  /** Change handler for text value */
  onChange(value: string): void;

  /** Theme change handler */
  onThemeChange?(theme: string): void;
}

const EditorContent = React.forwardRef<MDXEditorMethods, EditorContentProps>((props, ref) => {
  const {
    value,
    onChange,
    placeholder,
    disabled,
    error,
    isFocused,
    isFullscreen,
    wordFrequency,
    showTemplates,
    showPreview,
    autoSaveStatus,
    lastSaved,
    onBlur,
    editorSettings,
  } = props;

  const {config} = useAppStore();

  const [selectedTheme, setSelectedTheme] = useState<string>(editorSettings?.theme ?? 'default');
  const editorRef = useRef<HTMLDivElement>(null);

  // Keep local theme in sync with props when they change
  useEffect(() => {
    if (editorSettings?.theme && editorSettings.theme !== selectedTheme) {
      setSelectedTheme(editorSettings.theme);
    }
  }, [editorSettings?.theme, selectedTheme]);

  // Auto-scroll to bottom when content overflows
  useEffect(() => {
    const scrollEditorToBottom = () => {
      if (editorRef.current) {
        const editorElement = editorRef.current.querySelector('.mdxeditor');
        if (editorElement) {
          const contentEditable = editorElement.querySelector('[contenteditable]');
          if (contentEditable) {
            // Scroll to bottom when content overflows
            if (contentEditable.scrollHeight > contentEditable.clientHeight) {
              contentEditable.scrollTop = contentEditable.scrollHeight;
            }
          }
        }
      }
    };

    // Use a timeout to ensure DOM is updated
    const timeout = setTimeout(scrollEditorToBottom, 100);

    return () => clearTimeout(timeout);
  }, [value]);

  // Handle auto-scroll behavior based on settings
  useEffect(() => {
    if (editorSettings?.autoScroll && value) {
      const scrollEditorToBottom = () => {
        if (editorRef.current) {
          const editorElement = editorRef.current.querySelector('.mdxeditor');
          if (editorElement) {
            const contentEditable = editorElement.querySelector('[contenteditable]');
            if (contentEditable) {
              contentEditable.scrollTop = contentEditable.scrollHeight;
            }
          }
        }
      };

      // Use a timeout to ensure DOM is updated
      const timeout = setTimeout(scrollEditorToBottom, 100);

      return () => clearTimeout(timeout);
    }
  }, [value, editorSettings?.autoScroll]);

  return (
    <div
      ref={editorRef}
      className={cn('relative', isFullscreen && 'fixed inset-0 z-50 bg-background p-8')}
    >
      <MdxEditor
        value={value}
        onChange={onChange}
        minHeight="150px"
        maxHeight="100px"
        height="150"
        readOnly={disabled}
        placeholder={placeholder}
        plugins={{images: false, headings: false}}
        className={cn(
          isFocused && 'ring-2 ring-ring ring-offset-2',
          disabled && 'opacity-50 cursor-not-allowed',
        )}
        onBlur={onBlur}
        autoFocus
        ref={ref}
      />
      {error && <p className="text-sm text-destructive">{error}</p>}

      {config.showPromptStats && (
        <TextStats
          text={value}
          autoSaveStatus={autoSaveStatus}
          lastSaved={lastSaved}
        />
      )}

      {config.showDeepTextAnalysis && (
        <DeepTextAnalysis
          wordFrequency={wordFrequency}
          text={value}
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
    </div>
  );
});

EditorContent.displayName = 'EditorContent';

export default EditorContent;
