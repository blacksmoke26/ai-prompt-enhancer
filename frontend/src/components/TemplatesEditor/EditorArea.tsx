/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {Code, Copy} from 'lucide-react';

// utils
import {cn} from '~/utils/helpers';

// ui components
import {AdvancedTextarea} from '~/components/ui/AdvancedTextarea';

// types
import type {LayoutMode, PromptTemplate} from './index';

/**
 * Props for the EditorArea component.
 */
export interface EditorAreaProps {
  /** The current text content of the editor. */
  content: string;
  /** Metadata about the prompt template being edited. */
  metadata: PromptTemplate;
  /** Configuration specific to the editor's appearance and behavior. */
  /**
   * Configuration specific to the editor's appearance and behavior.
   * These properties allow customization of the editor UI elements and text formatting.
   */
  editorProps?: {
    /** Placeholder text displayed when the editor content is empty. */
    placeholder?: string;
    /** Text displayed in the header area of the editor, typically a brief description. */
    subtitle?: string;
    /** Text displayed in the footer area of the editor, often used for stats or hints. */
    footerText?: string;
    /** Additional CSS class names to apply to the editor container for styling overrides. */
    className?: string;
    /** Flag to determine whether the 'Copy to Clipboard' action button is visible in the header. */
    showCopyButton?: boolean;
    /** Maximum number of characters allowed in the editor content. If exceeded, validation warnings may appear. */
    maxCharCount?: number;
    /** Font size in pixels for the editor text content. */
    fontSize?: number;
    /** Font family for the editor text content (e.g., 'monospace', 'sans-serif'). */
    fontFamily?: string;
  };
  /** Functional configuration for the editor. */
  config?: {
    [key: string]: any;

    /** Determines whether the user is allowed to manually edit the prompt content in the editor.
     * When set to `false`, the editor acts as a read-only display or allows interaction only through
     * predefined variables and controls, preventing direct text manipulation.
     *
     * @default false */
    enableManualEdit?: boolean;
  };
  /** The current layout mode of the application. */
  layout?: LayoutMode;

  /** Callback when the editor content changes. */
  onChange(val: string): void;

  /** Callback when a tag within the editor is clicked. */
  onTagClick?(tag: string): void;

  /** Custom renderer for tags. */
  renderTag?(tag: string, onClick: (tag: string) => void): React.ReactNode;

  /** Callback to copy editor content to clipboard. */
  onCopy?(): void;
}

const EditorArea: React.FC<EditorAreaProps> = (props) => {
  const {
    content, onChange, metadata, onTagClick = () => {
    }, editorProps = {}, config = {}, renderTag, onCopy, layout,
  } = props;
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab' && !config.enableManualEdit) {
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
  const renderDefaultTag = (tag: string) => (<span key={tag} onClick={() => onTagClick && onTagClick(tag)}
                                                   className="text-xs text-muted-foreground hover:text-foreground hover:underline cursor-pointer transition-colors font-medium">#{tag}</span>);
  const isOverLimit = editorProps.maxCharCount && content.length > editorProps.maxCharCount;

  return (
    <section className={cn(
      'flex-1 flex flex-col min-w-0 bg-card border border-border rounded-2xl shadow-sm overflow-hidden ring-1 ring-black/5',
      // Zen Mode Overrides: Remove border, shadow, radius for full immersion
      layout === 'zen' && 'bg-background border-none rounded-none shadow-none ring-0',
      editorProps.className || '',
    )}>
      <div
        className={cn('h-12 border-b border-border bg-background/50 flex items-center justify-between px-4 shrink-0', layout === 'presentation' && 'hidden', layout === 'zen' && 'hidden')}>
        <div className="flex items-center gap-4 h-full"><span
          className="text-xs font-semibold text-muted-foreground uppercase">{metadata.category}</span>
          <div className="h-3 w-[1px] bg-border"></div>
          <div
            className="flex gap-1.5 h-full items-center">{metadata?.tags?.map?.(tag => renderTag?.(tag, onTagClick) ?? renderDefaultTag(tag))}</div>
        </div>
        <div className="flex items-center gap-3">
          <div
            className="text-xs text-muted-foreground hidden sm:block">{editorProps.subtitle || metadata.description}</div>
          {editorProps.showCopyButton && (<button onClick={onCopy}
                                                  className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors">
            <Copy size={14}/></button>)}
        </div>
      </div>
      <div
        className={cn('flex-1 relative group min-h-0', layout === 'presentation' && 'flex items-center justify-center bg-background')}>
        <AdvancedTextarea
          showCopyButton={false}
          showClearButton={false}
          enableAutoClosing={true}

          value={content}
          onChange={value => onChange(value)}
          onKeyDown={handleKeyDown}
          readOnly={!config.enableManualEdit}
          className={cn(
            'w-full h-full resize-none bg-transparent outline-none selection:bg-primary/20 placeholder:text-muted-foreground/50 disabled:opacity-50',
            layout !== 'presentation' && 'absolute inset-0 p-6 font-mono text-sm leading-relaxed',
            layout === 'presentation' && 'text-3xl font-serif leading-relaxed max-w-4xl w-full p-20 text-center',
            layout === 'zen' && 'p-8 md:p-12 text-base md:text-lg',
            isOverLimit && 'text-destructive',
          )}
          style={{
            fontSize: layout === 'presentation' ? undefined : `${editorProps.fontSize || 14}px`,
            fontFamily: layout === 'presentation' ? 'serif' : (editorProps.fontFamily || 'monospace'),
          }}
          spellCheck={layout !== 'presentation'}
          placeholder={editorProps.placeholder || 'Start typing your prompt...'}
          maxLength={editorProps.maxCharCount}
        ></AdvancedTextarea>
      </div>
      {layout !== 'presentation' && layout !== 'zen' && (
        <div
          className="h-8 border-t border-border bg-background/30 flex items-center justify-between px-4 text-[10px] text-muted-foreground shrink-0">
          <span>{editorProps.footerText || `Length: ${content.length}${editorProps.maxCharCount ? ` / ${editorProps.maxCharCount}` : ''}`}</span>
          <span className="flex items-center gap-1"><Code size={10}/> Markdown Supported</span>
        </div>
      )}
    </section>
  );
};

export default EditorArea;
