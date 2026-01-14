/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 *
 * Streamlined MDX Editor Wrapper
 * - Removed Zen Mode functionality
 * - Fixed Dropdown rendering via Radix Portal
 * - Fixed Typography (H1-H6, P) via Tailwind Typography plugin
 */

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Tooltip from '@radix-ui/react-tooltip';
import * as Toast from '@radix-ui/react-toast';
import {
  CheckIcon,
  CopyIcon,
  DownloadIcon,
  GearIcon,
  LockClosedIcon,
  LockOpen1Icon,
} from '@radix-ui/react-icons';
import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  ChangeCodeMirrorLanguage,
  CodeToggle,
  diffSourcePlugin,
  DiffSourceToggleWrapper,
  headingsPlugin,
  imagePlugin,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  ListsToggle,
  markdownShortcutPlugin,
  MDXEditor,
  type MDXEditorMethods,
  type MDXEditorProps,
  quotePlugin,
  RealmPlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
} from '@mdxeditor/editor';

// hooks
import useDebounce from '~/hooks/useDebounce';
import {useTheme} from '~/components/ThemeProvider';

// utils
import {cn} from '~/utils/helpers';

// Styles
import '@mdxeditor/editor/style.css';

/**
 * Configuration for enabling or disabling specific plugins within the editor.
 * @example
 * const config: PluginConfig = {
 *   headings: true,
 *   lists: false,
 *   tables: true,
 * };
 * @developerNotes
 * By default, all plugins are enabled unless explicitly set to `false`.
 */
export interface PluginConfig {
  /**
   * Enables or disables the heading plugin.
   * @default true
   */
  headings?: boolean;

  /**
   * Enables or disables the list plugin.
   * @default true
   */
  lists?: boolean;

  /**
   * Enables or disables the table plugin.
   * @default true
   */
  tables?: boolean;

  /**
   * Enables or disables the thematic break plugin.
   * @default true
   */
  thematicBreak?: boolean;

  /**
   * Enables or disables the image plugin.
   * @default true
   */
  images?: boolean;

  /**
   * Enables or disables the code block plugin.
   * @default true
   */
  codeBlock?: boolean;

  /**
   * Enables or disables the quote plugin.
   * @default true
   */
  quote?: boolean;

  /**
   * Enables or disables the diff source plugin.
   * @default true
   */
  diffSource?: boolean;

  /**
   * Enables or disables keyboard shortcuts.
   * @default true
   */
  shortcuts?: boolean;
}

/**
 * Configuration for customizing the toolbar's appearance and behavior.
 * @example
 * const config: ToolbarConfig = {
 *   position: 'bottom',
 *   showDiffSourceToggle: false,
 * };
 * @developerNotes
 * If `position` is not specified, it defaults to `'top'`.
 */
export interface ToolbarConfig {
  /**
   * Disables the toolbar entirely.
   * @default false
   */
  disabled?: boolean;

  /**
   * Shows or hides the diff source toggle in the toolbar.
   * @default true
   */
  showDiffSourceToggle?: boolean;

  /**
   * Custom CSS class for styling the toolbar.
   */
  className?: string;

  /**
   * Position of the toolbar relative to the editor.
   * @default 'top'
   */
  position?: 'top' | 'bottom';
}

/**
 * Configuration for export options such as download and copy.
 * @developerNotes
 * Both options are disabled by default unless explicitly set to `true`.
 */
export interface ExportConfig {
  /** Enables the download functionality */
  enableDownload?: boolean;
  /** Enables the copy to clipboard functionality */
  enableCopy?: boolean;
}

/**
 * Props for the MdxEditor component, defining its behavior and appearance.
 * @developerNotes
 * This interface extends and modifies the original MDXEditorProps, omitting
 * `markdown`, `plugins`, and `onChange` to provide custom props.
 */
export interface MdxEditorProps extends Omit<MDXEditorProps, 'markdown' | 'plugins' | 'onChange'> {
  /** Current value of the editor */
  value?: string | null;

  /** Callback function triggered when the editor content changes */
  onChange?(value: string): void;

  /** Debounce time in milliseconds for the `onChange` event */
  debounceMs?: number;
  /** Plugin configuration to control which features are enabled */
  plugins?: PluginConfig;
  /** Configuration for the toolbar's appearance and behavior */
  toolbar?: ToolbarConfig;
  /** Height of the editor container */
  height?: string;
  /** Theme for the editor, either 'light', 'dark', or 'auto' */
  theme?: 'light' | 'dark' | 'auto';
  /** Custom CSS class for styling the editor */
  className?: string;
  /** Placeholder text displayed when the editor is empty */
  placeholder?: string;
  /** Makes the editor read-only */
  readOnly?: boolean;
  /** Configuration for export options */
  export?: ExportConfig;
  /** Minimum height of the editor container */
  minHeight?: string;
  /** Maximum height of the editor container */
  maxHeight?: string;
}

/**
 * Props interface for components that handle editor actions such as copy, download, and toggle readonly state.
 * @developerNotes
 * This interface is typically used in components that provide export or interaction controls, such as a toolbar or export panel.
 */
export interface EditorActionsProps {
  /** The content to be exported or manipulated */
  content: string;
  /** Configuration for export features like copy and download */
  config: ExportConfig;
  /** Indicates whether the editor is in read-only mode */
  isReadonly: boolean;

  /** Callback function triggered when the user initiates a copy action */
  onCopy(): void;

  /** Callback function triggered when the user initiates a download action */
  onDownload(): void;

  /** Callback function triggered when the user toggles the read-only state */
  onToggleReadonly(): void;
}

const EditorActions: React.FC<EditorActionsProps> = ({config, onCopy, onDownload, onToggleReadonly, isReadonly}) => (
  <>
    <DropdownMenu.Label className="px-2 py-1 text-xs font-semibold">
      Actions
    </DropdownMenu.Label>

    {config.enableDownload && (
      <DropdownMenu.Item
        className="cursor-pointer px-2 py-1.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded flex items-center gap-2 outline-none focus:bg-gray-100 dark:focus:bg-gray-700"
        onSelect={onDownload}
      >
        <DownloadIcon className="w-3 h-3"/> Download .MD
      </DropdownMenu.Item>
    )}

    {config.enableCopy && (
      <DropdownMenu.Item
        className="cursor-pointer px-2 py-1.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded flex items-center gap-2 outline-none focus:bg-gray-100 dark:focus:bg-gray-700"
        onSelect={onCopy}
      >
        <CopyIcon className="w-3 h-3"/> Copy Content
      </DropdownMenu.Item>
    )}

    <DropdownMenu.Separator className="h-px bg-gray-200 dark:bg-gray-700 my-1"/>

    <DropdownMenu.Item
      className="cursor-pointer px-2 py-1.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded flex items-center justify-between outline-none focus:bg-gray-100 dark:focus:bg-gray-700"
      onSelect={onToggleReadonly}
    >
      <span className="flex items-center gap-2">
        {isReadonly ? <LockOpen1Icon className="w-3 h-3"/> : <LockClosedIcon className="w-3 h-3"/>}
        {isReadonly ? 'Unlock' : 'Read Only'}
      </span>
    </DropdownMenu.Item>
  </>
);

/* -------------------------------------------------------------------------- */
/*                                MAIN COMPONENT                              */
/* -------------------------------------------------------------------------- */

export const MdxEditor = React.forwardRef<MDXEditorMethods, MdxEditorProps>((props, ref) => {
  const {
    value,
    onChange,
    debounceMs = 300,
    plugins: pluginConfig = {images: false, headings: false} as PluginConfig,
    toolbar: toolbarConfig = {} as ToolbarConfig,
    height = '500px',
    theme = 'auto',
    className = '',
    placeholder = 'Type text here',
    readOnly: readOnlyProp = false,
    export: exportConfig = {enableDownload: true, enableCopy: true},
    minHeight = '350px',
    maxHeight = '400px',
    ...rest
  } = props;

  // -- State --
  const [localMarkdown, setLocalMarkdown] = useState(value ?? '');
  const [isReadonly, setIsReadonly] = useState(readOnlyProp);
  const [showToast, setShowToast] = useState(false);
  const internalRef = React.useRef<MDXEditorMethods>(null);

  // -- Ref Handling --
  React.useImperativeHandle(ref, () => internalRef.current!);

  // -- Sync External Value --
  useEffect(() => {
    if (value !== undefined && value !== null) {
      setLocalMarkdown(value);
    }
  }, [value]);

  useEffect(() => {
    setIsReadonly(readOnlyProp);
  }, [readOnlyProp]);

  // -- Debounce Handler --
  const debouncedMarkdown = useDebounce(localMarkdown, debounceMs);
  useEffect(() => {
    if (onChange && debouncedMarkdown !== value) {
      onChange(debouncedMarkdown);
    }
  }, [debouncedMarkdown, onChange, value]);

  // -- Theme Handling --
  const {theme: activeTheme} = useTheme();
  const isDark = activeTheme === 'dark';
  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDark]);

  // -- Handlers --
  const handleChange = useCallback((markdown: string) => {
    setLocalMarkdown(markdown);
  }, []);

  const toggleReadonly = useCallback(() => {
    setIsReadonly(prev => !prev);
  }, []);

  const handleCopyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(localMarkdown).then(() => {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    });
  }, [localMarkdown]);

  const handleDownloadMarkdown = useCallback(() => {
    const element = document.createElement('a');
    const file = new Blob([localMarkdown], {type: 'text/markdown'});
    element.href = URL.createObjectURL(file);
    element.download = `document-${Date.now()}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }, [localMarkdown]);

  // -- Plugin Composition --
  const composedPlugins: RealmPlugin[] = useMemo(() => {
    const pl: RealmPlugin[] = [];

    // Functional Plugins
    if (pluginConfig.headings ?? true) pl.push(headingsPlugin());
    if (pluginConfig.lists ?? true) pl.push(listsPlugin());
    if (pluginConfig.quote ?? true) pl.push(quotePlugin());
    if (pluginConfig.thematicBreak ?? true) pl.push(thematicBreakPlugin());
    if (pluginConfig.shortcuts ?? true) pl.push(markdownShortcutPlugin());
    if (pluginConfig.tables ?? true) pl.push(tablePlugin());
    if (pluginConfig.images ?? true) pl.push(imagePlugin());
    if (pluginConfig.diffSource ?? false) pl.push(diffSourcePlugin());

    // Links
    pl.push(linkPlugin(), linkDialogPlugin());

    // Toolbar Plugin
    if (!toolbarConfig.disabled) {
      pl.push(
        toolbarPlugin({
          toolbarClassName: toolbarConfig.className || '',
          toolbarContents: () => (
            <div
              className={`flex items-center gap-2 overflow-x-auto transition-opacity ${isReadonly ? 'opacity-50 pointer-events-none' : ''}`}>

              {/* History */}
              <UndoRedo/>
              <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1 shrink-0"/>

              {/* Formatting */}
              <BoldItalicUnderlineToggles/>

              {/* Block Type Selector (Fixes H1-H6 functionality) */}
              {(pluginConfig.headings ?? true) && <BlockTypeSelect/>}

              {(pluginConfig.lists ?? true) && <ListsToggle/>}

              {/* Separator */}
              <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1 shrink-0"/>

              {/* Insertions */}
              {(pluginConfig.tables ?? true) && <InsertTable/>}
              {(pluginConfig.thematicBreak ?? true) && <InsertThematicBreak/>}
              {(pluginConfig.images ?? true) && <InsertImage/>}
              {(pluginConfig.codeBlock ?? true) && <CodeToggle/>}

              {/* Source/Diff View */}
              {(toolbarConfig.showDiffSourceToggle || pluginConfig.diffSource) && (
                <DiffSourceToggleWrapper>
                  <ChangeCodeMirrorLanguage/>
                </DiffSourceToggleWrapper>
              )}

              {/* Separator */}
              <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1 shrink-0"/>

              {/* Radix UI Integration with Portal Fix */}
              <Tooltip.Provider delayDuration={0}>
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <button
                      title="Actions"
                      type="button"
                      className="p-2 rounded mdx-editor-button text-gray-600 dark:text-gray-300 transition-colors"
                    >
                      <GearIcon className="w-4 h-4"/>
                    </button>
                  </DropdownMenu.Trigger>

                  {/* CRITICAL FIX: DropdownMenu.Portal ensures the menu renders
                      outside the editor's overflow-hidden container */}
                  <DropdownMenu.Portal>
                    <DropdownMenu.Content
                      align="end"
                      sideOffset={5}
                      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg p-1 min-w-[150px] z-[100]"
                    >
                      <EditorActions
                        content={localMarkdown}
                        config={exportConfig}
                        onCopy={handleCopyToClipboard}
                        onDownload={handleDownloadMarkdown}
                        onToggleReadonly={toggleReadonly}
                        isReadonly={isReadonly}
                      />
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
              </Tooltip.Provider>
            </div>
          ),
        }),
      );
    }

    return pl;
  }, [pluginConfig, toolbarConfig, isReadonly, exportConfig, localMarkdown, handleCopyToClipboard, handleDownloadMarkdown, toggleReadonly]);

  const containerClasses = `
    relative flex flex-col
    rounded-lg overflow-hidden bg-white dark:bg-gray-950 
    transition-all duration-300 ease-in-out shadow-sm
    ${className}
  `.replace(/\s+/g, ' ').trim();

  return (
    <>
      <div
        className={containerClasses}
        style={{height}}
      >
        {/* MDX Editor Instance */}
        <div className="flex-1 overflow-auto relative">
          <MDXEditor
            ref={internalRef}
            markdown={localMarkdown}
            onChange={handleChange}
            plugins={composedPlugins}
            readOnly={isReadonly}
            placeholder={placeholder}
            {...rest}
            contentEditableClassName={cn(
              'mdxeditor resize-none text-sm leading-relaxed transition-all duration-200 overflow-y-auto',
              `min-h-[${props?.minHeight ?? '350px'}]`,
              `max-h-[${props?.maxHeight ?? '400px'}]`,
            )}

          />
        </div>
      </div>

      {/* Toast Notification */}
      <Toast.Provider swipeDirection="right">
        <Toast.Root
          className="bg-gray-900 text-white px-4 py-3 rounded shadow-lg flex items-center gap-3 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:fade-in-0"
          open={showToast}
          onOpenChange={setShowToast}
        >
          <CheckIcon className="w-4 h-4 text-green-400"/>
          <div className="text-sm font-medium">Copied to clipboard!</div>
        </Toast.Root>
        <Toast.Viewport className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none"/>
      </Toast.Provider>
    </>
  );
});

MdxEditor.displayName = 'MdxEditor';
