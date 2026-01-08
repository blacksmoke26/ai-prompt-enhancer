/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 *
 * Streamlined MDX Editor Wrapper
 * - Removed stats footer for cleaner UI
 * - Fixed Dropdown rendering via Radix Portal
 * - Fixed Typography (H1-H6, P) via Tailwind Typography plugin
 */

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Tooltip from '@radix-ui/react-tooltip';
import * as Toast from '@radix-ui/react-toast';
import {
  BoxModelIcon,
  CheckIcon,
  CopyIcon,
  CrossCircledIcon,
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

// Styles
import '@mdxeditor/editor/style.css';
import useDebounce from '~/hooks/useDebounce.ts';
import {useTheme} from '~/components/ThemeProvider.tsx';
import {cn} from '~/utils/helpers.ts';

/* -------------------------------------------------------------------------- */
/*                                TYPES & INTERFACES                          */

/* -------------------------------------------------------------------------- */

export interface PluginConfig {
  headings?: boolean;
  lists?: boolean;
  tables?: boolean;
  thematicBreak?: boolean;
  images?: boolean;
  codeBlock?: boolean;
  quote?: boolean;
  diffSource?: boolean;
  shortcuts?: boolean;
}

export interface ToolbarConfig {
  disabled?: boolean;
  showDiffSourceToggle?: boolean;
  className?: string;
  position?: 'top' | 'bottom';
}

export interface ExportConfig {
  enableDownload?: boolean;
  enableCopy?: boolean;
}

export interface MdxEditorProps extends Omit<MDXEditorProps, 'markdown' | 'plugins' | 'onChange'> {
  value?: string | null;

  onChange?(value: string): void;

  debounceMs?: number;
  plugins?: PluginConfig;
  toolbar?: ToolbarConfig;
  height?: string;
  theme?: 'light' | 'dark' | 'auto';
  enableFullscreen?: boolean;
  className?: string;
  placeholder?: string;
  readOnly?: boolean;
  export?: ExportConfig;
  minHeight?: string;
  maxHeight?: string;
}

/* -------------------------------------------------------------------------- */
/*                           SUB-COMPONENTS                                   */
/* -------------------------------------------------------------------------- */

const EditorActions: React.FC<{
  content: string;
  config: ExportConfig;
  onCopy: () => void;
  onDownload: () => void;
  onToggleReadonly: () => void;
  isReadonly: boolean;
}> = ({content, config, onCopy, onDownload, onToggleReadonly, isReadonly}) => (
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
    ...rest
  } = props;

  // -- State --
  const [isZenMode, setIsZenMode] = useState(false);
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
              className={`flex items-center gap-2 py-2 px-3 overflow-x-auto transition-opacity ${isReadonly ? 'opacity-50 pointer-events-none' : ''}`}>

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
                <button
                  title={isZenMode ? 'Exit Zen Mode' : 'Zen Mode'}
                  onClick={() => setIsZenMode(!isZenMode)}
                  type="button"
                  className="p-2 rounded mdx-editor-button text-gray-600 dark:text-gray-300 transition-colors"
                >
                  {isZenMode ? <CrossCircledIcon className="w-4 h-4"/> : <BoxModelIcon className="w-4 h-4"/>}
                </button>

                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <button title="Actions"
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
  }, [pluginConfig, toolbarConfig, isZenMode, isReadonly, exportConfig, localMarkdown, handleCopyToClipboard, handleDownloadMarkdown, toggleReadonly]);

  // -- Styles --
  const containerClasses = `
    relative flex flex-col
    rounded-lg overflow-hidden bg-white dark:bg-gray-950 
    transition-all duration-300 ease-in-out shadow-sm
    ${isZenMode ? 'fixed inset-0 z-50 rounded-none border-none shadow-2xl' : ''}
    ${className}
  `.replace(/\s+/g, ' ').trim();

  const maxHeight = isZenMode ? 'h-full' : `max-h-[${props?.maxHeight ?? '400px'}`;
  const minHeight = `min-h-${props?.minHeight ?? '350px'}`;

  return (
    <>
      <div
        className={containerClasses}
        style={{height: isZenMode ? '100vh' : height}}
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
            contentEditableClassName={cn(`mdxeditor resize-none text-sm leading-relaxed transition-all duration-200 overflow-y-auto`, maxHeight, minHeight)}
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
