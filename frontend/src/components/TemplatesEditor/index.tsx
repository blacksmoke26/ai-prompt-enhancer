/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */


import React, {useCallback, useEffect, useState} from 'react';
import {Streamdown} from 'streamdown';
import {History, LayoutTemplate, type LucideIcon, Settings2, Sparkles} from 'lucide-react';

// relative components
import Drawer from './Drawer';
import EditorArea from './EditorArea';
import CommandPalette from './CommandPalette';
import TemplateSelector, {TemplateSelectorProps} from './TemplateSelector';

/**
 * Represents the lifecycle status of a prompt.
 */
export type PromptStatus = 'draft' | 'active' | 'archived';

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
  unit?: string;
  rows?: number;
  step?: number;
  inputType?: 'text' | 'number' | 'color' | 'date' | 'textarea' | 'slider';
  inputIcon?: LucideIcon;
  collapsible?: boolean;
  disableKeyboardEvents?: boolean;
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

/**
 * Props for the main PromptRunner component.
 */
export interface PromptRunnerProps {
  /** List of available prompt templates to choose from. */
  templates: PromptTemplate[];
  /** Maximum length of the content string allowed in the editor. */
  maxLength?: number;

  // UI Events
  /** Callback fired when the variables drawer is requested to open. */
  onDrawerOpen?(): void;

  /** Callback fired when the variables drawer is requested to close. */
  onDrawerClose?(): void;

  /** Callback fired when the template selector modal is requested to open. */
  onSelectorOpen?(): void;

  /** Callback fired when the template selector modal is requested to close. */
  onSelectorClose?(): void;

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

  /** Specific props for the TemplateSelector component. */
  templateSelector: Omit<TemplateSelectorProps, 'templates' | 'onSelectTemplate' | 'onClose'>;

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
  /** Flag to enable/disable the keyboard command palette. */
  enableCommandPalette?: boolean;

  /** Callback fired when a command is selected from the command palette. */
  onCommandAction?(action: string): void;

  /** Callback fired when a validation is passed */
  onValidSubmit?(content: string, variables: Record<string, any>): void;

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

  /** Custom renderer for tags within the editor or UI. */
  renderTag?(tag: string, onClick: (tag: string) => void): React.ReactNode;

  /** Global configuration object for the runner. */
  config?: {
    [key: string]: any;
    simulationSpeed?: number; // ms per char for streaming (0 = instant)
  };

  /** Specific props for the Header component. */
  headerProps?: Record<string, any>;

  /** Specific props for the EditorArea component. */
  editorProps?: Record<string, any>;

  /** Specific props for the Drawer (Variables) component. */
  drawerProps?: Record<string, any>;

  /** Debounce delay in milliseconds for editor content changes. */
  debounceMs?: number;
}

export const PromptRunner: React.FC<PromptRunnerProps> = (allProps) => {
  const {
    templates = [],
    maxLength = 0,
    enableCommandPalette = false,
    debounceMs = 300,
    onDrawerOpen, onDrawerClose, onSelectorOpen, onSelectorClose,
    onTemplateSearch, onTemplateChoose, onChange, onTagClick, onCopy,
    onTagValueChange, onTagValidate, onErrors, onValidate, onFormSubmit, onExecuteClick, onPresetSelect,
    renderTag, favorites, onToggleFavorite, presets = [],
    status, onStatusChange, history = [], onSaveSnapshot, onRestoreHistory, onExport,
    outputContent = '', onOutputChange,
    config = {}, headerProps = {}, editorProps = {}, drawerProps = {},
    onCommandAction,
    onValidSubmit,
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
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

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

  // Keyboard shortcuts
  useEffect(() => {
    if (!enableCommandPalette) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(prev => !prev);
      }
      if (e.key === 'Escape' && commandPaletteOpen) setCommandPaletteOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enableCommandPalette, commandPaletteOpen]);

  const handleContentChange = (val: string): void => {
    setContent(val);
    debouncedOnChange(val);
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

  const handlePresetSelect = ({id}): void => {
    const preset = presets.find(p => p.id === id);
    if (preset) {
      setFormData(prev => ({...prev, ...preset.values}));
      if (onPresetSelect) onPresetSelect(id);
    }
  };

  const handleRestoreHistory = (id: string) => {
    if (onRestoreHistory) onRestoreHistory(id);
    const item = history.find(h => h.id === id);
    if (item) {
      setContent(item.content);
      setIsHistoryOpen(false);
    }
  };

  // --- STREAMING LOGIC ---
  const simulateStream = (fullText: string) => {
    setIsStreaming(true);
    setStreamContent('');

    const speed = config.simulationSpeed ?? 10;

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
        if (onStreamUpdate) onStreamUpdate(fullText.substring(0, i));
      }
    }, speed);

    return () => clearInterval(interval);
  };

  const applyVariables = async () => {
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
      return;
    }

    if (onFormSubmit) await onFormSubmit(formData);

    setIsDrawerOpen(false);

    onValidSubmit?.(content, formData);

    /*let newContent = content.replace(/\{\{(.*?)}}/g, (match, key) => {
      const cleanKey = key.trim();
      if (cleanKey in formData) {
        const val = formData[cleanKey];
        return typeof val === 'boolean' ? (val ? 'YES' : 'NO') : val;
      }
      return match;
    });

    setContent(newContent);
    setIsGenerating(false);

    if (onExecuteClick) {
      onExecuteClick(newContent, formData);
    } else {
      simulateStream(newContent);
    }*/
  };

  const handleCommandSelect = (action: string) => {
    setCommandPaletteOpen(false);
    if (action === 'save' && onSaveSnapshot) onSaveSnapshot();
    if (action === 'export' && onExport) onExport('md');
    if (action === 'reset') handleReset();
    if (action === 'run') applyVariables();
    if (onCommandAction) onCommandAction(action);
  };

  // --- RENDER ---
  const ButtonIcon: LucideIcon = drawerProps.buttonIcon ?? Settings2;
  const displayOutput = isStreaming ? streamContent : (outputContent || streamContent);

  return (
    <div
      className="flex flex-col h-full w-full bg-background text-foreground overflow-hidden font-sans transition-colors duration-300">

      {/* COMMAND PALETTE */}
      {enableCommandPalette && (
        <CommandPalette
          isOpen={commandPaletteOpen}
          onClose={() => setCommandPaletteOpen(false)}
          onSelect={handleCommandSelect}
        />
      )}

      {/* HEADER */}
      {/*<Header
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
      />*/}

      {/* MAIN LAYOUT: SPLIT VERTICAL */}
      <main className="flex-1 flex flex-col overflow-hidden relative gap-4">

        {/* TOP: EDITOR AREA */}
        <div className="flex-1 flex flex-col min-w-0 relative transition-all duration-300">
          <EditorArea
            maxLength={maxLength}
            value={content}
            onChange={handleContentChange}
            metadata={activeTemplate}
            onTagClick={onTagClick}
            renderTag={renderTag}
            editorProps={{
              ...editorProps,
              fontSize: editorProps.fontSize || 14,
              className: editorProps.className,
            }}
            config={config}
            onCopy={handleCopy}
          />

          {/* Floating Action Button for Variables */}
          <div
            className="absolute bottom-5 left-1/2 transform -translate-x-1/2 z-10 inline-flex items-center justify-center gap-5">
            {!isDrawerOpen && (
              <button
                onClick={() => {
                  setIsSelectorOpen(true);
                  if (onSelectorOpen) onSelectorOpen();
                }}
                className="group inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 shadow-2xl hover:scale-105 transition-all duration-300 border border-white/10"
              >
                <LayoutTemplate size={16}/>
                Templates
              </button>
            )}

            <button
              onClick={() => {
                setIsDrawerOpen(true);
                if (onDrawerOpen) onDrawerOpen();
              }}
              className="group inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 shadow-2xl hover:scale-105 transition-all duration-300 border border-white/10"
            >
              <ButtonIcon size={16}/>
              {drawerProps.buttonText || 'Configure'}
            </button>
          </div>
        </div>

        {/* BOTTOM: OUTPUT PANEL */}
        <div className="flex flex-col bg-card border border-border rounded-2xl overflow-hidden m-h-[500px]">
          <div className="h-10 border-b border-border flex items-center justify-between px-4 bg-muted/20">
            <div className="flex items-center gap-2 text-xs font-bold uppercase text-foreground">
              <Sparkles size={14}/> Output
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

          <div className="flex-1 relative min-h-0 p-3">
            <Streamdown className="h-[400px]">{displayOutput}</Streamdown>

            {/* Streaming Cursor */}
            {isStreaming &&
              <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-1 align-middle"></span>}
          </div>
        </div>

      </main>

      {/* Modal Drawer */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm flex items-center justify-center sm:justify-end p-0 sm:p-4 pointer-events-none">
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
              {...drawerProps}
              config={{...config, isLoading: isGenerating}}
              onPresetSelect={handlePresetSelect}
            />
          </div>
        </div>
      )}

      {/* Template Selector Modal */}
      {isSelectorOpen && (
        <TemplateSelector
          {...allProps.templateSelector}
          onTagClick={onTagClick}
          favorites={favorites}
          templates={templates}
          onSelectTemplate={handleSelectTemplate}
          onClose={() => {
            setIsSelectorOpen(false);
            if (onSelectorClose) onSelectorClose();
          }}
        />
      )}
    </div>
  );
};

export default PromptRunner;
