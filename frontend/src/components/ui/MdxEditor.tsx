/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {
  MDXEditor, UndoRedo, BoldItalicUnderlineToggles, BlockTypeSelect, toolbarPlugin, type MDXEditorProps,
  CodeToggle, InsertCodeBlock, InsertTable, ListsToggle, InsertFrontmatter, InsertThematicBreak, RealmPlugin,
} from '@mdxeditor/editor';

// styles
import '@mdxeditor/editor/style.css';

/**
 * Props for the MdxEditor component extending MDXEditorProps
 * @developer-note: This interface extends MDXEditorProps to maintain compatibility with the underlying editor
 * while adding custom props specific to our wrapper implementation.
 */
export interface MdxEditorProps extends Partial<MDXEditorProps> {
  /** Current MDX content to be displayed and edited */
  value?: string;

  /** Callback fired when content changes with the new MDX content */
  onChange?(value: string): void;

  /** Whether to show formatting toolbar controls (default: true) */
  showFormatting?: boolean;

  /** Additional props forwarded to the underlying MdxEditor component */
  [key: string]: any;
}

/**
 * Enhanced MDX editor wrapper with formatting toolbar and theme support.
 * Provides a ready-to-use MDX editing experience with common formatting options.
 *
 * @example
 * ```tsx
 * <MdxEditor
 *   value={mdxContent}
 *   onChange={setMdxContent}
 *   showFormatting={true}
 * />
 * ```
 *
 * @developer-note: This wrapper abstracts away the complexity of configuring MDXEditor plugins
 * and provides a simpler API for common use cases. The toolbar can be toggled via showFormatting prop.
 */
export const MdxEditor: React.FC<MdxEditorProps> = (props) => {
  const {value, onChange, showFormatting = true, ...rest} = props;

  /**
   * Configure plugins based on props
   * @developer-note: Dynamically adds toolbar plugin only when formatting is enabled
   * to reduce bundle size for cases where formatting controls aren't needed
   */
  const plugins: RealmPlugin[] = [];

  if (showFormatting) {
    plugins.push(toolbarPlugin({
      toolbarClassName: 'my-classname',
      /**
       * Toolbar content configuration
       * @developer-note: Order of components in toolbar determines their display order
       * Each component provides specific editing functionality for MDX content
       */
      toolbarContents: () => (
        <>
          <UndoRedo/>
          <BoldItalicUnderlineToggles/>
          <BlockTypeSelect/>
          <InsertCodeBlock/>
          <InsertTable/>
          <ListsToggle/>
          <InsertFrontmatter/>
          <InsertThematicBreak/>
          <CodeToggle/>
        </>
      ),
    }));
  }

  /**
   * Render MDX editor with configured plugins and props
   * @developer-note: The onChange handler strips the HTML part that mdx-editor-lite returns
   * to maintain a simple string-based interface for consumers
   */
  return (
    <MDXEditor
      markdown={value ?? ''}
      plugins={plugins}
      onChange={content => typeof onChange === 'function' && onChange(content)}
      {...rest}
    />
  );
};
