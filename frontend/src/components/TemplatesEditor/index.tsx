/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useCallback, useEffect, useState} from 'react';
import {BarChart, Eye, History, type LucideIcon, Settings2, Sparkles} from 'lucide-react';

// utils
import {cn} from '~/utils/helpers';
import {simpleMarkdownToHtml} from './utils';

// relative components
import Drawer from './Drawer';
import Header from './Header';
import StatsPanel from './StatsPanel';
import EditorArea from './EditorArea';
import PreviewPanel from './PreviewPanel';
import CommandPalette from './CommandPalette';
import TemplateSelector from './TemplateSelector';

/**
 * Represents the lifecycle status of a prompt.
 */
export type PromptStatus = 'draft' | 'active' | 'archived';

/**
 * Defines the various layout modes available for the prompt runner interface.
 * These modes control how the editor, preview, and sidebars are arranged.
 */
export type LayoutMode =
  | 'editor-only'
  | 'split-horizontal'
  | 'split-vertical'
  | 'focus'
  | 'zen'
  | 'dual-sidebar'
  | 'presentation'
  | 'layout-top'
  | 'layout-bottom'
  | 'sidebar-left'
  | 'sidebar-right'
  | 'preview-right'
  | 'preview-left'
  | 'triple-column'
  | 'bento-grid';

/**
 * Defines the display mode for the variables sidebar.
 */
export type SidebarMode = 'drawer' | 'sidebar-left' | 'sidebar-right';

/**
 * Represents a single variable definition within a prompt template.
 * Variables are used to dynamically insert user input into the prompt content.
 */
export interface Variable {
  /** The unique identifier for the variable. */
  name: string;
  /** A brief description of what the variable represents. */
  description?: string;
  /** The data type of the variable. */
  type: 'string' | 'number' | 'boolean' | 'select' | 'code';
  /** Whether the variable must be filled out before execution. */
  required?: boolean;
  /** Minimum value for number types. */
  min?: number;
  /** Maximum value for number types. */
  max?: number;
  /** List of available options for 'select' types. */
  options?: string[];
  /** The initial value of the variable. */
  defaultValue?: string | number | boolean | null;
  /** Placeholder text for input fields. */
  placeholder?: string;
  /** Grouping key for organizing variables in the UI. */
  group?: string;

  /** Conditional logic to determine if the variable should be visible. */
  showIf?(formData: Record<string, any>): boolean;

  /** Tooltip text explaining the variable. */
  tooltip?: string;
  /** If true, the variable cannot be edited by the user. */
  locked?: boolean;
}

/**
 * Represents a complete prompt template containing content and metadata.
 */
export interface PromptTemplate {
  /** Unique identifier for the template. */
  id: number;
  /** Display title of the template. */
  title: string;
  /** Detailed description of the template's purpose. */
  description: string;
  /** Category for organizing templates. */
  category: string;
  /** List of tags for searching and filtering. */
  tags: string[];
  /** The raw content of the prompt, potentially containing variable placeholders. */
  content: string;
  /** Array of variable definitions used in this template. */
  variables: Variable[];
  /** Optional version string. */
  version?: string;
  /** Flag indicating if the template is deprecated. */
  isDeprecated?: boolean;
  /** Estimated token count for the base template. */
  estimatedBaseTokens?: number;
  /** Optional badges to display on the template card. */
  badges?: string[];
}

/**
 * Represents an item in the history of prompt generations or edits.
 */
export interface HistoryItem {
  /** Unique identifier for the history entry. */
  id: string;
  /** When this entry was created. */
  timestamp: Date;
  /** The content of the prompt at this point in time. */
  content: string;
  /** The state of the form variables at this point in time. */
  formData: Record<string, any>;
  /** Optional label for the history entry. */
  label?: string;
}

// --- PROPS ---

/**
 * Props for the main PromptRunner component.
 */
export interface PromptRunnerProps {
  /** List of available prompt templates to choose from. */
  templates: PromptTemplate[];

  // UI Events
  /** Callback fired when the variables drawer/sidebar is requested to open. */
  onDrawerOpen?(): void;

  /** Callback fired when the variables drawer/sidebar is requested to close. */
  onDrawerClose?(): void;

  /** Callback fired when the template selector modal is requested to open. */
  onSelectorOpen?(): void;

  /** Callback fired when the template selector modal is requested to close. */
  onSelectorClose?(): void;

  /** Callback fired when a category link is clicked in the sidebar or UI. */
  onCategoryClick?(cat: string): void;

  /** Callback fired when the active category selection changes. */
  onCategoryChange?(cat: string): void;

  /** Callback fired when a category filter is applied to the template list. */
  onCategoryFilter?(cat: string): void;

  /** Callback fired when a search query is performed on templates. */
  onTemplateSearch?(q: string, cat: string): void;

  /** Callback fired when a specific template is selected/confirmed. */
  onTemplateChoose?(t: PromptTemplate): void;

  // Content Events
  /** Callback fired when the main editor content changes. */
  onChange?(c: string): void;

  /** Callback fired when a tag inside the editor or UI is clicked. */
  onTagClick?(tag: string): void;

  /** Callback fired when the "Copy to Clipboard" action is triggered. */
  onCopy?(): void;

  /** Callback fired when the Zen Mode toggle is activated/deactivated. */
  onToggleZenMode?(): void;

  /** Flag indicating whether Zen Mode is currently active. */
  isZenMode?: boolean;

  // Form Events
  /** Callback fired when a specific variable input value changes. */
  onTagValueChange?(name: string, val: any, schema: Variable): void;

  /** Callback to validate a specific variable's value. Returns true if valid. */
  onTagValidate?(name: string, val: any, schema: Variable): boolean;

  /** Callback fired when validation errors are detected or updated. */
  onErrors?(errs: Record<string, any>): void;

  /** Callback fired to validate the entire form data. */
  onValidate?(data: Record<string, any>): void;

  /** Callback fired when the main form is submitted (e.g., via Apply button). */
  onFormSubmit?(data: Record<string, any>): void;

  /** Callback fired when the "Execute/Run" action is triggered. */
  onExecuteClick?(content: string, variables: Record<string, any>): void;

  /** Callback fired when a preset configuration is selected from the drawer. */
  onPresetSelect?(presetId: string): void;

  // Layouts & Features
  /** Determines the current layout arrangement of the runner UI. */
  layout?: LayoutMode;

  /** Determines how the variables sidebar is displayed (drawer or persistent). */
  variableSidebar?: SidebarMode;

  /** Flag to show/hide the analytics/stats panel. */
  showAnalytics?: boolean;

  /** Flag to show/hide the markdown preview panel. */
  showPreview?: boolean;

  /** Flag to enable/disable the keyboard command palette. */
  enableCommandPalette?: boolean;

  /** Callback fired when a command is selected from the command palette. */
  onCommandAction?(action: string): void;

  // Workflow & History
  /** The current lifecycle status of the prompt being edited. */
  status?: PromptStatus;

  /** Callback fired when the prompt status is changed. */
  onStatusChange?(status: PromptStatus): void;

  /** List of history items for undo/restore functionality. */
  history?: HistoryItem[];

  /** Callback fired to save the current state as a snapshot in history. */
  onSaveSnapshot?(): void;

  /** Callback fired to restore the state from a specific history item ID. */
  onRestoreHistory?(id: string): void;

  /** Callback fired to export the current prompt in a specific format. */
  onExport?(format: 'json' | 'md'): void;

  // Output
  /** The content generated by the AI or output stream. */
  outputContent?: string;

  /** Callback fired when the output content changes (e.g., during streaming). */
  onOutputChange?(val: string): void;

  // Streaming Support
  /** Callback fired when a new chunk of data arrives during a stream. */
  onStreamUpdate?(chunk: string): void;

  // Config & Customization
  /** Array of template IDs that are marked as favorites. */
  favorites?: number[];

  /** Callback fired to toggle the favorite status of a specific template ID. */
  onToggleFavorite?(id: number): void;

  /** List of available presets for the variables sidebar. */
  presets?: Array<{ id: string; label: string; values: Record<string, any> }>;

  /** Custom mapping of category slugs to icons and display names. */
  categoryIcons?: Record<string, { name: string; icon: LucideIcon }>;

  /** Custom renderer for tags within the editor or UI. */
  renderTag?(tag: string, onClick: (tag: string) => void): React.ReactNode;

  /** Global configuration object for the runner. */
  config?: {
    [key: string]: any;
    simulationSpeed?: number; // New: ms per char for streaming (0 = instant)
  };

  /** Specific props for the Header component. */
  headerProps?: Record<string, any>;

  /** Specific props for the EditorArea component. */
  editorProps?: Record<string, any>;

  /** Specific props for the Drawer (Variables Sidebar) component. */
  drawerProps?: Record<string, any>;

  /** Specific props for the TemplateSelector component. */
  selectorProps?: Record<string, any>;

  // --- REDUNDANT/DUPLICATE PROPS FROM ORIGINAL SOURCE (Preserved for safety) ---
  /** @deprecated Duplicate of onDrawerOpen */
  onDrawerOpen?(): void;

  /** @deprecated Duplicate of onDrawerClose */
  onDrawerClose?(): void;

  /** @deprecated Duplicate of onSelectorOpen */
  onSelectorOpen?(): void;

  /** @deprecated Duplicate of onSelectorClose */
  onSelectorClose?(): void;

  /** @deprecated Duplicate of onCategoryClick */
  onCategoryClick?(cat: string): void;

  /** @deprecated Duplicate of onCategoryChange */
  onCategoryChange?(cat: string): void;

  /** @deprecated Duplicate of onCategoryFilter */
  onCategoryFilter?(cat: string): void;

  /** @deprecated Duplicate of onTemplateSearch */
  onTemplateSearch?(q: string, cat: string): void;

  /** @deprecated Duplicate of onTemplateChoose */
  onTemplateChoose?(t: PromptTemplate): void;

  /** @deprecated Duplicate of onChange */
  onChange?(c: string): void;

  /** @deprecated Duplicate of onTagClick */
  onTagClick?(tag: string): void;

  /** @deprecated Duplicate of onCopy */
  onCopy?(): void;

  /** @deprecated Duplicate of onToggleZenMode */
  onToggleZenMode?(): void;

  /** @deprecated Duplicate of onTagValueChange */
  onTagValueChange?(name: string, val: any, schema: Variable): void;

  /** @deprecated Duplicate of onTagValidate */
  onTagValidate?(name: string, val: any, schema: Variable): boolean;

  /** @deprecated Duplicate of onErrors */
  onErrors?(errs: Record<string, any>): void;

  /** @deprecated Duplicate of onValidate */
  onValidate?(data: Record<string, any>): void;

  /** @deprecated Duplicate of onFormSubmit */
  onFormSubmit?(data: Record<string, any>): void;

  /** @deprecated Duplicate of onExecuteClick */
  onExecuteClick?(content: string, variables: Record<string, any>): void;

  /** @deprecated Duplicate of onPresetSelect */
  onPresetSelect?(presetId: string): void;

  /** @deprecated Duplicate of onCommandAction */
  onCommandAction?(action: string): void;

  /** @deprecated Duplicate of onStatusChange */
  onStatusChange?(status: PromptStatus): void;

  /** @deprecated Duplicate of onSaveSnapshot */
  onSaveSnapshot?(): void;

  /** @deprecated Duplicate of onRestoreHistory */
  onRestoreHistory?(id: string): void;

  /** @deprecated Duplicate of onExport */
  onExport?(format: 'json' | 'md'): void;

  /** @deprecated Duplicate of onOutputChange */
  onOutputChange?(val: string): void;

  /** @deprecated Duplicate of onToggleFavorite */
  onToggleFavorite?(id: number): void;

  // --- NEW ADVANCED PROPS ---
  /** Debounce delay in milliseconds for editor content changes. */
  debounceMs?: number;
}

export const PromptRunner: React.FC<PromptRunnerProps> = (allProps) => {
  const {
    templates = [],
    layout = 'editor-only',
    variableSidebar = 'drawer',
    showAnalytics = false,
    showPreview = false,
    enableCommandPalette = false,
    debounceMs = 300, // Advanced Prop default
    // ... (Destructure all other props as per your snippet) ...
    onDrawerOpen, onDrawerClose, onSelectorOpen, onSelectorClose,
    onCategoryClick, onCategoryChange, onCategoryFilter = () => {
    },
    onTemplateSearch, onTemplateChoose, onChange, onTagClick, onCopy,
    onTagValueChange, onTagValidate, onErrors, onValidate, onFormSubmit, onExecuteClick, onPresetSelect,
    categoryIcons, renderTag, favorites, onToggleFavorite, presets = [],
    status, onStatusChange, history = [], onSaveSnapshot, onRestoreHistory, onExport,
    outputContent = '', onOutputChange,
    config = {}, headerProps = {}, editorProps = {}, drawerProps = {}, selectorProps = {},
    onCommandAction, onToggleZenMode, isZenMode,
    onStreamUpdate,
  } = allProps;

  // --- STATE ---
  const [activeTemplate, setActiveTemplate] = useState<PromptTemplate>((templates.length > 0 ? templates[0] : {} as any));
  const [isSelectorOpen, setIsSelectorOpen] = useState<boolean>(false);
  const [content, setContent] = useState<string>(activeTemplate.content || '');
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, any>>({});
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [formData, setFormData] = useState<Record<string, any>>(() => initializeFormData(activeTemplate.variables));
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false); // Advanced Feature

  // Streaming State
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamContent, setStreamContent] = useState('');


  // --- Logic ---
  function initializeFormData(variables: Variable[]) {
    const initial: Record<string, any> = {};
    (variables || []).forEach(v => {
      initial[v.name] = v.defaultValue !== undefined ? v.defaultValue : (v.type === 'boolean' ? false : '');
    });
    return initial;
  }

  // Advanced: Debounced Change Handler
  const debouncedOnChange = useCallback(
    (val: string) => {
      const handler = setTimeout(() => {
        if (onChange) onChange(val);
      }, debounceMs);
      return () => clearTimeout(handler);
    },
    [onChange, debounceMs],
  );

  // ... (Keep existing useEffect for Keyboard shortcuts) ...
  useEffect(() => {
    if (!enableCommandPalette) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(prev => !prev);
      }
      if (e.key === 'Escape' && commandPaletteOpen) setCommandPaletteOpen(false);
      if (e.key === 'Escape' && isZenMode && onToggleZenMode) onToggleZenMode();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enableCommandPalette, commandPaletteOpen, isZenMode, onToggleZenMode]);

  const handleContentChange = (val: string) => {
    setContent(val);
    debouncedOnChange(val); // Use advanced debounced handler
  };

  const handleSelectTemplate = (template: PromptTemplate) => {
    setActiveTemplate(template);
    setContent(template.content);
    setFormData(initializeFormData(template.variables));
    setErrors({});
    setIsSelectorOpen(false);
    if (onTemplateChoose) onTemplateChoose(template);
  };

  const handleReset = () => {
    setContent(activeTemplate.content);
    setFormData(initializeFormData(activeTemplate.variables));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    if (onCopy) onCopy();
  };

  const handleInputChange = (name: string, value: any, variableSchema: Variable) => {
    setFormData(prev => ({...prev, [name]: value}));
    if (onTagValueChange) onTagValueChange(name, value, variableSchema);
    if (errors[name]) setErrors(prev => ({...prev, [name]: false}));
  };

  const handlePresetSelect = (presetId: string) => {
    const preset = presets.find(p => p.id === presetId);
    if (preset) {
      setFormData(prev => ({...prev, ...preset.values}));
      if (onPresetSelect) onPresetSelect(presetId);
    }
  };

  // Advanced: History Restore Logic
  const handleRestoreHistory = (id: string) => {
    if (onRestoreHistory) onRestoreHistory(id);
    const item = history.find(h => h.id === id);
    if (item) {
      setContent(item.content);
      //setFormData(item.variables);
      setIsHistoryOpen(false);
    }
  };

  // --- STREAMING LOGIC ---
  const simulateStream = (fullText: string) => {
    setIsStreaming(true);
    setStreamContent('');

    // USE PROP OR DEFAULT 10
    const speed = config.simulationSpeed ?? 10;

    // If speed is 0, instant
    if (speed === 0) {
      setStreamContent(fullText);
      setIsStreaming(false);
      if (onOutputChange) onOutputChange(fullText);
      return;
    }

    let i = 0;
    const interval = setInterval(() => {
      setStreamContent(fullText.substring(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(interval);
        setIsStreaming(false);
        if (onOutputChange) onOutputChange(fullText);
      } else {
        // Fire stream update
        if (onStreamUpdate) onStreamUpdate(fullText.substring(0, i));
      }
    }, speed);

    return () => clearInterval(interval);
  };

  const applyVariables = async () => {
    setIsGenerating(true);
    if (onValidate) onValidate(formData);
    const newErrors: Record<string, any> = {};
    let hasErrors = false;

    activeTemplate.variables.forEach(v => {
      if (v.required) {
        const isEmpty = formData[v.name] === '' || formData[v.name] === null || formData[v.name] === undefined;
        if (onTagValidate) {
          const isValid = onTagValidate(v.name, formData[v.name], v);
          if (!isValid) {
            newErrors[v.name] = 'custom';
            hasErrors = true;
          } else if (isEmpty) {
            newErrors[v.name] = 'required';
            hasErrors = true;
          }
        } else if (isEmpty) {
          newErrors[v.name] = 'required';
          hasErrors = true;
        }
      }
    });

    setErrors(newErrors);
    if (onErrors) onErrors(newErrors);

    if (hasErrors) {
      setIsGenerating(false);
      return;
    }

    if (onFormSubmit) await onFormSubmit(formData);

    let newContent = content.replace(/\{\{(.*?)}}/g, (match, key) => {
      const cleanKey = key.trim();
      if (cleanKey in formData) {
        const val = formData[cleanKey];
        return typeof val === 'boolean' ? (val ? 'YES' : 'NO') : val;
      }
      return match;
    });

    setContent(newContent);
    setIsDrawerOpen(false);
    setIsGenerating(false);

    if (onExecuteClick) {
      // If onExecuteClick is provided, assume parent handles streaming or final output
      onExecuteClick(newContent, formData);
    } else {
      // Otherwise, simulate local streaming into the output box
      simulateStream(newContent);
    }
  };

  const handleCommandSelect = (action: string) => {
    setCommandPaletteOpen(false);
    if (action === 'zen' && onToggleZenMode) onToggleZenMode();
    if (action === 'save' && onSaveSnapshot) onSaveSnapshot();
    if (action === 'export' && onExport) onExport('md');
    if (action === 'reset') handleReset();
    if (action === 'run') applyVariables();
    if (onCommandAction) onCommandAction(action);
  };

  // --- RENDER ---
  const ButtonIcon: LucideIcon = drawerProps.buttonIcon ?? Settings2;

  // Determine Output to show (Stream or Static)
  const displayOutput = isStreaming ? streamContent : (outputContent || streamContent);

  return (
    <div
      className={cn('flex flex-col h-full w-full bg-background text-foreground overflow-hidden font-sans transition-colors duration-300', isZenMode && 'bg-zinc-950')}>

      {/* COMMAND PALETTE */}
      {enableCommandPalette && (
        <CommandPalette
          isOpen={commandPaletteOpen}
          onClose={() => setCommandPaletteOpen(false)}
          onSelect={handleCommandSelect}
        />
      )}

      {/* HEADER (Assuming Header component is imported) */}
      <Header
        currentTemplate={activeTemplate}
        onOpenSelector={() => {
          setIsSelectorOpen(true);
          if (onSelectorOpen) onSelectorOpen();
        }}
        status={status}
        tokenCount={Math.ceil(content.length / 4)}
        onStatusChange={onStatusChange}
        onExport={onExport}
        headerProps={headerProps}
        config={config}
        onToggleZenMode={onToggleZenMode}
        isZenMode={isZenMode}
      />

      <main className={cn(
        'flex-1 flex overflow-hidden relative p-4 sm:p-6 lg:p-8 transition-all duration-300',
        // Zen Mode Overrides
        isZenMode && 'p-0 m-0 flex items-center justify-center',

        // Layout Variants
        layout === 'split-vertical' && 'flex-col gap-6',
        layout === 'split-horizontal' && 'flex-row gap-6',
        layout === 'dual-sidebar' && '!grid !grid-cols-[300px_1fr_300px] gap-6',
        layout === 'bento-grid' && '!grid !grid-cols-[280px_1fr_280px_240px] !grid-rows-2 gap-4 h-full',
        (layout === 'presentation' || isZenMode) && 'p-0',
      )}>

        {/* --- ZEN MODE SPECIAL CASE --- */}
        {isZenMode ? (
          <div className="w-full h-full flex items-center justify-center max-w-5xl mx-auto">
            <EditorArea
              content={content}
              onChange={handleContentChange}
              metadata={activeTemplate}
              onTagClick={onTagClick}
              renderTag={renderTag}
              editorProps={{
                ...editorProps,
                fontSize: 18,
                className: 'h-full w-full rounded-none shadow-none border-none',
              }}
              config={config}
              onCopy={handleCopy}
              layout="zen"
            />
          </div>
        ) : (
          /* --- LAYOUT SYSTEM --- */
          <>
            {/* 1. DUAL SIDEBAR (LEFT: Variables) */}
            {layout === 'dual-sidebar' && (
              <div className="hidden lg:flex flex-col min-w-0 bg-card border border-border rounded-2xl overflow-hidden">
                <Drawer
                  variables={activeTemplate.variables}
                  formData={formData}
                  onInputChange={handleInputChange}
                  onToggleBoolean={(name) => handleInputChange(name, !formData[name], activeTemplate.variables.find(v => v.name === name)!)}
                  onApply={applyVariables}
                  errors={errors}
                  presets={presets}
                  mode="sidebar"
                  drawerProps={{...drawerProps, title: 'Config', submitText: 'Run'}}
                  config={{isLoading: isGenerating}}
                  onPresetSelect={handlePresetSelect}
                />
              </div>
            )}

            {/* 2. SIDEBAR LEFT */}
            {(layout === 'sidebar-left' || layout === 'triple-column' || layout === 'bento-grid') && variableSidebar !== 'drawer' && (
              <div
                className={cn('flex flex-col min-w-0 bg-card border border-border rounded-2xl overflow-hidden', layout === 'bento-grid' ? 'col-span-1 row-span-2' : 'w-80')}>
                <Drawer
                  variables={activeTemplate.variables}
                  formData={formData}
                  onInputChange={handleInputChange}
                  onToggleBoolean={(name) => handleInputChange(name, !formData[name], activeTemplate.variables.find(v => v.name === name)!)}
                  onApply={applyVariables}
                  errors={errors}
                  presets={presets}
                  mode="sidebar"
                  drawerProps={{...drawerProps, title: 'Config', submitText: 'Run'}}
                  config={{isLoading: isGenerating}}
                  onPresetSelect={handlePresetSelect}
                />
              </div>
            )}

            {/* 3. SIDEBAR RIGHT */}
            {layout === 'sidebar-right' && variableSidebar !== 'drawer' && (
              <div
                className={cn('flex flex-col min-w-0 bg-card border border-border rounded-2xl overflow-hidden', 'w-80 order-last')}>
                <Drawer
                  variables={activeTemplate.variables}
                  formData={formData}
                  onInputChange={handleInputChange}
                  onToggleBoolean={(name) => handleInputChange(name, !formData[name], activeTemplate.variables.find(v => v.name === name)!)}
                  onApply={applyVariables}
                  errors={errors}
                  presets={presets}
                  mode="sidebar"
                  drawerProps={{...drawerProps, title: 'Config', submitText: 'Run'}}
                  config={{isLoading: isGenerating}}
                  onPresetSelect={handlePresetSelect}
                />
              </div>
            )}

            {/* 4. CENTER / EDITOR AREA */}
            <div className={cn('flex flex-col min-w-0 transition-all duration-300',
              layout === 'editor-only' ? 'w-full' : 'flex-1',
              // Special sizes for Bento/Grid
              layout === 'bento-grid' ? 'col-span-2 row-span-2' : '',
              layout === 'preview-left' ? 'flex-1' : '',
              layout === 'preview-right' ? 'flex-1' : '',
            )}>
              <EditorArea
                content={content}
                onChange={handleContentChange}
                metadata={activeTemplate}
                onTagClick={onTagClick}
                renderTag={renderTag}
                editorProps={{
                  ...editorProps,
                  fontSize: isZenMode ? 18 : (editorProps.fontSize || 14),
                  className: isZenMode ? 'h-full rounded-none border-none shadow-none' : editorProps.className,
                }}
                config={config}
                onCopy={handleCopy}
                layout={layout}
              />

              {/* Floating Action Button (Only in Editor-Only mode with Drawer) */}
              {layout === 'editor-only' && variableSidebar === 'drawer' && (
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
                  <button
                    onClick={() => {
                      setIsDrawerOpen(true);
                      if (onDrawerOpen) onDrawerOpen();
                    }}
                    className="group inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 shadow-2xl hover:scale-105 transition-all duration-300 border border-white/10"
                  >
                    <ButtonIcon size={16}/>
                    {drawerProps.buttonText || 'Configure Variables'}
                  </button>
                </div>
              )}

              {/* DRAWER TOP MODE */}
              {layout === 'layout-top' && variableSidebar === 'drawer' && (
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <button onClick={() => setIsDrawerOpen(true)}
                          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg text-xs font-medium">Variables
                  </button>
                </div>
              )}
            </div>

            {/* 5. PREVIEW RIGHT */}
            {layout === 'preview-right' && (
              <div
                className="hidden md:flex flex-col w-1/2 min-w-0 bg-card border border-border rounded-2xl overflow-hidden">
                <PreviewPanel content={content} fontSize={editorProps?.fontSize || 14}/>
              </div>
            )}

            {/* 6. PREVIEW LEFT */}
            {layout === 'preview-left' && (
              <div
                className="hidden md:flex flex-col w-1/2 min-w-0 bg-card border border-border rounded-2xl overflow-hidden order-first">
                <PreviewPanel content={content} fontSize={editorProps?.fontSize || 14}/>
              </div>
            )}

            {/* 7. BENTO GRID PREVIEW (Middle Right) */}
            {layout === 'bento-grid' && (
              <div
                className="hidden lg:flex flex-col col-span-1 row-span-1 bg-card border border-border rounded-2xl overflow-hidden">
                <div className="h-10 border-b border-border flex items-center justify-between px-4 bg-muted/20">
                  <div className="flex items-center gap-2"><Eye size={12}/><span
                    className="text-xs font-bold uppercase">Preview</span></div>
                </div>
                <div className="flex-1 p-4 overflow-y-auto text-sm text-foreground leading-relaxed"
                     dangerouslySetInnerHTML={{__html: simpleMarkdownToHtml(content)}}></div>
              </div>
            )}

            {/* 8. BENTO GRID ANALYTICS (Bottom Right) */}
            {layout === 'bento-grid' && (
              <div
                className="hidden lg:flex flex-col col-span-1 row-span-1 bg-card border border-border rounded-2xl overflow-hidden">
                <div className="h-10 border-b border-border flex items-center justify-between px-4 bg-muted/20">
                  <div className="flex items-center gap-2"><BarChart size={12}/><span
                    className="text-xs font-bold uppercase">Stats</span></div>
                </div>
                <StatsPanel content={content} variables={activeTemplate.variables} status={status}/>
              </div>
            )}

            {/* 9. TRIPLE COLUMN PREVIEW (Right) */}
            {layout === 'triple-column' && (
              <div
                className="hidden md:flex flex-col w-80 min-w-0 bg-card border border-border rounded-2xl overflow-hidden">
                <PreviewPanel content={content} fontSize={editorProps?.fontSize || 14}/>
              </div>
            )}

            {/* DRAWER BOTTOM MODE */}
            {(layout === 'layout-bottom' || layout === 'split-vertical') && variableSidebar === 'drawer' && !isDrawerOpen && (
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
                <button onClick={() => setIsDrawerOpen(true)}
                        className="bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg text-xs font-medium">Variables
                </button>
              </div>
            )}

            {/* 10. OUTPUT PANEL (Only for non-Preview modes) */}
            {(layout === 'split-horizontal' || layout === 'split-vertical' || layout === 'editor-only') && (
              <div
                className={cn('flex flex-col bg-card border border-border rounded-2xl overflow-hidden min-w-0', layout === 'split-vertical' ? 'h-1/2' : 'flex-1')}>
                <div className="h-10 border-b border-border flex items-center justify-between px-4 bg-muted/20">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase text-foreground"><Sparkles
                    size={14}/> Output
                  </div>
                  {history.length > 0 && (
                    <button onClick={() => setIsHistoryOpen(!isHistoryOpen)}
                            className="text-xs flex items-center gap-1 text-muted-foreground hover:text-foreground">
                      <History size={12}/> History ({history.length})
                    </button>
                  )}
                </div>

                {/* History Dropdown */}
                {isHistoryOpen && (
                  <div className="max-h-48 overflow-y-auto border-b border-border bg-muted/10 p-2">
                    {history.map(h => (
                      <button key={h.id} onClick={() => handleRestoreHistory(h.id)}
                              className="w-full text-left text-xs p-2 hover:bg-accent rounded truncate mb-1">
                        {new Date(h.timestamp).toLocaleTimeString()} - {activeTemplate.title}
                      </button>
                    ))}
                  </div>
                )}

                <div className="flex-1 relative min-h-0 p-0">
                    <textarea
                      value={displayOutput}
                      onChange={(e) => onOutputChange && onOutputChange(e.target.value)}
                      readOnly={!onOutputChange || isStreaming}
                      className="absolute inset-0 w-full h-full resize-none bg-transparent p-4 font-mono text-sm leading-relaxed outline-none text-foreground"
                      placeholder={isStreaming ? 'Streaming...' : 'AI response will appear here...'}
                    />
                  {/* Streaming Cursor */}
                  {isStreaming &&
                    <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-1 align-middle"></span>}
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Modal Drawer */}
      {variableSidebar === 'drawer' && isDrawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm flex items-center justify-center sm:justify-end p-0 sm:p-4 pointer-events-none">
          <div
            className="pointer-events-auto bg-card w-full h-full sm:h-auto sm:max-h-[85vh] sm:rounded-2xl shadow-2xl border border-border flex flex-col overflow-hidden sm:w-[400px] animate-in slide-in-from-right-10 duration-300">
            <Drawer
              onClose={() => {
                setIsDrawerOpen(false);
                if (onDrawerClose) onDrawerClose();
              }}
              variables={activeTemplate.variables}
              formData={formData}
              onInputChange={handleInputChange}
              onToggleBoolean={(name) => handleInputChange(name, !formData[name], activeTemplate.variables.find(v => v.name === name)!)}
              onApply={applyVariables}
              errors={errors}
              presets={presets}
              mode="drawer"
              drawerProps={drawerProps}
              config={{...config, isLoading: isGenerating}}
              onPresetSelect={handlePresetSelect}
            />
          </div>
        </div>
      )}

      {/* Template Selector Modal */}
      {isSelectorOpen && (
        <TemplateSelector
          templates={templates}
          onSelectTemplate={handleSelectTemplate}
          onClose={() => {
            setIsSelectorOpen(false);
            if (onSelectorClose) onSelectorClose();
          }}
          onCategoryFilter={onCategoryFilter}
          onTagClick={onTagClick}
          onTemplateSearch={onTemplateSearch}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
          selectorProps={selectorProps}
          categoryIcons={categoryIcons}
          onCategoryClick={onCategoryClick}
          onCategoryChange={onCategoryChange}
        />
      )}
    </div>
  );
};

export default PromptRunner;
