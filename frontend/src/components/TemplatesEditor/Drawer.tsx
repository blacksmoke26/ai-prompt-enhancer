/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @version 2.2.0
 * @see https://github.com/blacksmoke26
 */

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  ChevronDown,
  ChevronRight,
  HelpCircle,
  Loader2,
  Lock,
  RotateCcw,
  Search,
  type LucideIcon,
  Sparkles,
  TextCursorInput,
  X,
} from 'lucide-react';

// utils
import {cn} from '~/utils/helpers';

// ui components
import {Label} from '~/components/ui/Label';
import {Switch} from '~/components/ui/Switch';
import {AdvancedInput} from '~/components/ui/AdvancedInput';

// types
import type {Variable} from './index';


/**
 * Props for the Drawer V2 (Variables Sidebar) component.
 */
export interface DrawerProps {
  variables: Variable[];
  formData: Record<string, any>;
  errors: Record<string, any>;
  presets?: Array<{ id: string; label: string; description?: string; values: Record<string, any> }>;

  mode?: 'drawer' | 'sidebar';
  position?: 'left' | 'right';
  resizable?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  variant?: 'default' | 'glass' | 'minimal' | 'filled';
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  width?: string;
  height?: string;
  header?: {
    title?: string; subtitle?: string; icon?: LucideIcon; hideClose?: boolean; className?: string;
  };
  footer?: {
    submitText?: string; submitIcon?: LucideIcon; resetText?: string; showReset?: boolean;
    align?: 'left' | 'center' | 'right' | 'spread'; sticky?: boolean;
  };
  renderConfig?: {
    defaultCollapsed?: boolean; showTypeBadge?: boolean; showLockIcon?: boolean; truncateNames?: boolean;
  };
  config?: {
    isLoading?: boolean; disabled?: boolean; className?: string;
  };

  renderHeader?(): React.ReactNode;

  renderFooter?(): React.ReactNode;

  renderVariableInput?(variable: Variable, value: any, error: any, onChange: (val: any) => void): React.ReactNode;

  /**
   * Triggered when the close button or overlay is clicked.
   * Wrapped by onBeforeClose and onAfterClose.
   */
  onClose?(): void;

  /**
   * Triggered when any input value changes (except booleans).
   * Wrapped by onBeforeChange and onAfterChange.
   */
  onInputChange?(name: string, value: any, variable: Variable): void;

  /**
   * Triggered specifically when a boolean switch is toggled.
   * Wrapped by onBeforeChange and onAfterChange.
   */
  onToggleBoolean?(name: string): void;

  onMount?(): void;

  onBeforeClose?(): boolean | Promise<boolean> | void;

  onAfterClose?(): void;

  onSubmitValues?(data: Record<string, any>): void | Promise<void>;

  onApply?(): void;

  onReset?(): void;

  onPresetSelect?(preset: { id: string; label: string; values: Record<string, any> }): void;

  onSearchChange?(query: string): void;

  onBeforeChange?(name: string, value: any, variable: Variable): boolean | void;

  onAfterChange?(name: string, value: any, variable: Variable): void;

  onFocus?(name: string, variable: Variable): void;

  onBlur?(name: string, value: any, variable: Variable): void;

  onInputEnter?(name: string, value: any, event: React.KeyboardEvent): void;

  onEscape?(): void;

  onGroupToggle?(groupName: string, isCollapsed: boolean): void;
}

const Drawer: React.FC<DrawerProps> = (props) => {
  const {
    // Core Props
    variables,
    formData,
    errors,
    presets = [],

    // Core Events
    onClose = () => {
    },
    onInputChange,
    onToggleBoolean,

    // Layout Props
    mode = 'drawer',
    position = 'right',
    resizable = false,
    searchable = true,
    variant = 'default',
    radius = 'lg',
    width,
    height,
    header = {},
    footer = {},
    renderConfig = {},
    config = {},

    // Advanced Props
    onPresetSelect,
    renderHeader,
    renderFooter,
    renderVariableInput,

    // Advanced Events
    onMount,
    onBeforeClose,
    onAfterClose,
    onSubmitValues,
    onApply,
    onReset,
    onSearchChange,
    onBeforeChange,
    onAfterChange,
    onFocus,
    onBlur,
    onInputEnter,
    onEscape,
    onGroupToggle,
  } = props;

  // --- State ---
  const [searchQuery, setSearchQuery] = useState('');
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});

  // --- Effects ---
  useEffect(() => {
    if (onMount) onMount();
  }, [onMount]);

  // --- Event Handlers ---

  /**
   * Handles the closing logic.
   * Order: onBeforeClose (check) -> onClose (action) -> onAfterClose (cleanup)
   */
  const handleClose = useCallback(async () => {
    let canClose = true;

    if (onBeforeClose) {
      const result = onBeforeClose();
      if (result instanceof Promise) {
        canClose = await result;
      } else if (result === false) {
        canClose = false;
      }
    }

    if (canClose) {
      onClose(); // The original prop
      if (onAfterClose) onAfterClose();
    }
  }, [onClose, onBeforeClose, onAfterClose]);

  /**
   * Handles generic input changes.
   * Order: onBeforeChange (check) -> onInputChange (action) -> onAfterChange (side effect)
   */
  const handleChange = useCallback(async (name: string, value: any, v: Variable) => {
    let canChange = true;

    if (onBeforeChange) {
      const result = onBeforeChange(name, value, v);
      if (result === false) canChange = false;
    }

    if (canChange) {
      if (onInputChange) onInputChange(name, value, v); // The original prop
      if (onAfterChange) onAfterChange(name, value, v);
    }
  }, [onInputChange, onBeforeChange, onAfterChange]);

  /**
   * Handles boolean toggle specifically.
   * Order: onBeforeChange -> onToggleBoolean -> onInputChange -> onAfterChange
   */
  const handleToggle = useCallback(async (name: string, currentValue: boolean, v: Variable) => {
    const newValue = !currentValue;

    // Validation check
    if (onBeforeChange) {
      const result = onBeforeChange(name, newValue, v);
      if (result === false) return;
    }

    // Specific Boolean Event
    if (onToggleBoolean) onToggleBoolean(name);

    // Generic Input Event (for state sync)
    if (onInputChange) onInputChange(name, newValue, v);

    // Post Event
    if (onAfterChange) onAfterChange(name, newValue, v);
  }, [onToggleBoolean, onInputChange, onBeforeChange, onAfterChange]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (onSearchChange) onSearchChange(val);
  }, [onSearchChange]);

  const handleGroupToggle = useCallback((groupName: string) => {
    setCollapsedGroups(prev => {
      const newState = !prev[groupName];
      if (onGroupToggle) onGroupToggle(groupName, newState);
      return {...prev, [groupName]: newState};
    });
  }, [onGroupToggle]);

  const handleReset = useCallback(() => {
    if (onReset) onReset();
  }, [onReset]);

  const handlePresetClick = useCallback((preset: typeof presets[0]) => {
    if (onPresetSelect) onPresetSelect(preset);
  }, [onPresetSelect]);

  const handleSubmit = useCallback(async () => {
    if (onSubmitValues) {
      await onSubmitValues(formData);
    }
    if (onApply) {
      onApply();
    }
  }, [formData, onSubmitValues, onApply]);

  const handleInputKeyDown = useCallback((e: React.KeyboardEvent, v: Variable) => {
    if (v.disableKeyboardEvents) return;

    if (e.key === 'Enter') {
      if (v.inputType !== 'textarea') {
        if (onInputEnter) onInputEnter(v.name, formData[v.name], e);
      }
    }
  }, [formData, onInputEnter]);

  const handleKeyDownGlobal = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (onEscape) onEscape();
      else handleClose();
    }
  }, [handleClose, onEscape]);

  const handleFocus = useCallback((v: Variable) => {
    if (onFocus) onFocus(v.name, v);
  }, [onFocus]);

  const handleBlur = useCallback((v: Variable) => {
    if (onBlur) onBlur(v.name, formData[v.name], v);
  }, [formData, onBlur]);

  // --- Derived State ---
  const HeaderIcon = header.icon ?? Sparkles;
  const SubmitIcon = footer.submitIcon ?? (header.icon ?? Sparkles);
  const isLoading = config.isLoading ?? false;
  const isDisabled = config.disabled ?? false;
  const isDrawer = mode === 'drawer';

  const {groupedVariables, allMatchedCount} = useMemo(() => {
    const groups: Record<string, Variable[]> = {};
    let matchCount = 0;
    const normalizedQuery = searchQuery.toLowerCase().trim();

    const visibleVars = variables.filter(v => {
      const isVisible = v.showIf ? v.showIf(formData) : true;
      if (!isVisible) return false;
      if (searchQuery) {
        return v.name.toLowerCase().includes(normalizedQuery) ||
          v.description?.toLowerCase().includes(normalizedQuery) ||
          (v.group || 'General').toLowerCase().includes(normalizedQuery);
      }
      return true;
    });

    matchCount = visibleVars.length;
    visibleVars.forEach(v => {
      const key = v.group || 'General';
      if (!groups[key]) groups[key] = [];
      groups[key].push(v);
    });
    return {groupedVariables: groups, allMatchedCount: matchCount};
  }, [variables, formData, searchQuery]);

  // --- Styles ---
  const containerClasses = cn(
    'flex flex-col border border-border z-50 transition-all duration-300 ease-in-out shadow-2xl outline-none',
    isDrawer ? 'fixed inset-y-0' : 'relative h-full w-full',
    position === 'right' ? 'right-0 left-auto' : 'left-0 right-auto',
    height || (isDrawer ? 'h-full' : 'h-full'),
    width || (isDrawer ? 'w-full sm:w-[450px]' : 'w-full'),
    resizable && (position === 'right' ? 'resize-x overflow-auto' : 'resize-x overflow-auto'),
    variant === 'glass' && 'bg-background/80 backdrop-blur-xl',
    variant === 'filled' && 'bg-muted',
    variant === 'minimal' && 'border-none shadow-none bg-transparent',
    variant === 'default' && 'bg-card',
    radius === 'none' && 'rounded-none',
    radius === 'sm' && 'rounded-sm',
    radius === 'md' && 'rounded-md',
    radius === 'lg' && 'rounded-lg',
    radius === 'full' && 'rounded-xl',
    config.className,
  );

  const overlayClasses = cn(
    'fixed inset-0 z-40 bg-background/80 backdrop-blur-sm transition-opacity duration-300',
    mode === 'drawer' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
  );

  // --- Render Helpers ---

  const renderInput = (v: Variable) => {
    if (renderVariableInput) {
      return renderVariableInput(v, formData[v.name], errors[v.name], (val) => handleChange(v.name, val, v));
    }

    const isLocked = v.locked || isDisabled;
    const commonProps = {
      disabled: isLocked,
      className: cn(errors[v.name] && 'border-destructive focus-visible:ring-destructive'),
      onFocus: () => handleFocus(v),
      onBlur: () => handleBlur(v),
      onKeyDown: (e: React.KeyboardEvent) => handleInputKeyDown(e, v),
    };

    if (v.type === 'boolean') {
      return (
        <div className={cn(
          'flex items-center justify-between p-3 rounded-lg border transition-colors',
          variant === 'glass' ? 'bg-background/50 border-white/10' : 'bg-input/50 border-input',
          isLocked && 'opacity-50 cursor-not-allowed',
          'hover:border-primary/50',
        )}>
          <span className="text-sm font-medium">{formData[v.name] ? 'Enabled' : 'Disabled'}</span>
          <Switch
            checked={formData[v.name]}
            onCheckedChange={() => !isLocked && handleToggle(v.name, formData[v.name], v)}
          />
        </div>
      );
    }

    if (v.type === 'select') {
      return (
        <div className="relative">
          <select
            value={formData[v.name]}
            onChange={(e) => handleChange(v.name, e.target.value, v)}
            {...commonProps}
            className={cn(
              'w-full h-10 rounded-md border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              'appearance-none cursor-pointer',
              variant === 'glass' && 'bg-black/20',
            )}
          >
            <option value="" disabled>{v.placeholder || `Select ${v.name}...`}</option>
            {v.options?.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-3 top-3.5 pointer-events-none text-muted-foreground"/>
        </div>
      );
    }

    if (v.inputType === 'textarea') {
      return (
        <textarea
          value={formData[v.name] || ''}
          onChange={(e) => handleChange(v.name, e.target.value, v)}
          placeholder={v.placeholder || `Enter ${v.name}...`}
          rows={v.rows || 3}
          {...commonProps}
          className={cn(
            'flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          )}
        />
      );
    }

    if (v.inputType === 'slider') {
      return (
        <div className="pt-2 px-1">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>{v.min}</span>
            <span className="font-medium text-foreground">{formData[v.name]}</span>
            <span>{v.max}</span>
          </div>
          <input
            type="range"
            min={v.min}
            max={v.max}
            step={v.step || 1}
            value={formData[v.name] || 0}
            onChange={(e) => handleChange(v.name, Number(e.target.value), v)}
            disabled={isLocked}
            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
          />
        </div>
      );
    }

    if (v.inputType === 'color') {
      return (
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={formData[v.name] || '#000000'}
            onChange={(e) => handleChange(v.name, e.target.value, v)}
            disabled={isLocked}
            className="h-10 w-14 p-0.5 rounded border border-input cursor-pointer bg-background"
          />
          <AdvancedInput
            type="text"
            value={formData[v.name]}
            onChange={(e) => handleChange(v.name, e.target.value, v)}
            placeholder="Hex code"
            disabled={isLocked}
            className="flex-1"
            onFocus={commonProps.onFocus}
            onBlur={commonProps.onBlur}
            onKeyDown={commonProps.onKeyDown}
          />
        </div>
      );
    }

    return (
      <div className="relative">
        {v.inputIcon && (
          <div className="absolute left-3 top-2.5 text-muted-foreground pointer-events-none">
            <v.inputIcon size={16}/>
          </div>
        )}
        <AdvancedInput
          type={v.type === 'number' ? 'number' : v.inputType === 'date' ? 'date' : 'text'}
          value={formData[v.name]}
          onChange={(e) => handleChange(v.name, e.target.value, v)}
          placeholder={v.placeholder}
          error={errors[v.name]}
          min={v.min}
          max={v.max}
          disabled={isLocked}
          className={v.inputIcon ? 'pl-9' : ''}
          onFocus={commonProps.onFocus}
          onBlur={commonProps.onBlur}
          onKeyDown={commonProps.onKeyDown}
        />
        {v.unit && (
          <span className="absolute right-3 top-2.5 text-xs text-muted-foreground pointer-events-none font-medium">
            {v.unit}
          </span>
        )}
      </div>
    );
  };

  return (
    <>
      {isDrawer && (
        <div
          className={overlayClasses}
          onClick={handleClose}
          aria-hidden="true"
        />
      )}

      <div
        className={containerClasses}
        role="dialog"
        aria-modal={isDrawer}
        onKeyDown={handleKeyDownGlobal}
        tabIndex={-1}
      >
        {/* --- Header --- */}
        {renderHeader ? renderHeader() : (
          <div className={cn(
            'flex items-center justify-between px-6 py-5 border-b shrink-0',
            variant === 'glass' ? 'bg-background/40 border-white/10' : 'bg-background/50 border-border',
            header.className,
          )}>
            <div className="flex items-start gap-3">
              {header?.icon && (
                <div className={cn(
                  'p-2 rounded-lg',
                  variant === 'glass' ? 'bg-primary/20 text-primary' : 'bg-primary/10 text-primary',
                )}>
                  <HeaderIcon size={18}/>
                </div>
              )}
              <div>
                <h2 className="text-lg font-bold tracking-tight text-foreground leading-tight">
                  {header.title || 'Configuration'}
                </h2>
                {header.subtitle && (
                  <p className="text-xs text-muted-foreground mt-0.5 leading-snug max-w-[200px] sm:max-w-xs">
                    {header.subtitle}
                  </p>
                )}
              </div>
            </div>

            {!header.hideClose && isDrawer && (
              <button
                onClick={handleClose}
                className="rounded-md opacity-70 hover:opacity-100 hover:bg-accent p-2 transition-all"
                aria-label="Close drawer"
              >
                <X size={18}/>
              </button>
            )}
          </div>
        )}

        {/* --- Presets --- */}
        {presets.length > 0 && (
          <div className={cn(
            'px-6 py-3 border-b shrink-0 overflow-x-auto',
            variant === 'glass' ? 'bg-background/30 border-white/5' : 'bg-muted/30 border-border',
          )}>
            <div className="flex gap-2">
              {presets.map(p => (
                <button
                  key={p.id}
                  onClick={() => handlePresetClick(p)}
                  className={cn(
                    'whitespace-nowrap px-3 py-1.5 border rounded-md text-xs font-medium transition-all flex flex-col items-start',
                    'hover:border-primary hover:bg-primary/5 hover:text-primary',
                    'focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none',
                    variant === 'glass' ? 'bg-white/5 border-white/10 text-white/80' : 'bg-background border-border text-foreground',
                  )}
                  title={p.description}
                >
                  <span className="font-bold">{p.label}</span>
                  {p.description && <span className="text-[10px] opacity-70 font-normal">{p.description}</span>}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* --- Search Bar --- */}
        {searchable && (
          <div className="px-6 py-3 border-b shrink-0">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-2.5 text-muted-foreground"/>
              <input
                type="text"
                placeholder={props.searchPlaceholder || 'Search variables...'}
                value={searchQuery}
                onChange={handleSearchChange}
                className={cn(
                  'w-full h-9 pl-9 pr-3 rounded-md text-sm bg-background border border-input',
                  'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
                  'placeholder:text-muted-foreground',
                )}
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    if (onSearchChange) onSearchChange('');
                  }}
                  className="absolute right-2 top-2 p-0.5 rounded-full hover:bg-accent text-muted-foreground"
                >
                  <X size={12}/>
                </button>
              )}
            </div>
          </div>
        )}

        {/* --- Main Content --- */}
        <div className="flex-1 overflow-y-auto custom-scroll p-6 space-y-6">
          {Object.entries(groupedVariables).map(([groupName, vars]) => {
            const isCollapsed = collapsedGroups[groupName] ?? (renderConfig.defaultCollapsed ?? false);

            return (
              <div key={groupName} className="space-y-3 animate-in fade-in zoom-in-95 duration-200">
                <button
                  onClick={() => handleGroupToggle(groupName)}
                  className="flex items-center gap-2 w-full group transition-colors"
                >
                  {isCollapsed ? <ChevronRight size={14} className="text-muted-foreground"/> :
                    <ChevronDown size={14} className="text-muted-foreground"/>}
                  <h3
                    className="text-xs font-bold uppercase tracking-wider text-foreground group-hover:text-primary transition-colors">
                    {groupName}
                  </h3>
                  <div className="h-px bg-border flex-1 opacity-50"></div>
                  <span className="text-[10px] text-muted-foreground font-mono bg-muted px-1.5 rounded-full">
                    {vars.length}
                  </span>
                </button>

                {!isCollapsed && (
                  <div className="space-y-5 pl-6 pt-1 border-l-2 border-border/50 ml-1.5">
                    {vars.map((v) => (
                      <div key={v.name} className="space-y-2.5 relative">
                        <div className="flex justify-between items-start gap-2">
                          <div className="flex-1 min-w-0">
                            <Label
                              className={cn(
                                'text-sm flex items-center gap-1.5',
                                renderConfig.truncateNames && 'truncate',
                              )}
                              title={renderConfig.truncateNames ? v.name : undefined}
                            >
                              {v.name}
                              {v.required && <span
                                className="text-[10px] px-1.5 py-0 rounded bg-destructive/10 text-destructive font-bold">Req</span>}
                            </Label>
                            {v.description && (
                              <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed line-clamp-2">
                                {v.description}
                              </p>
                            )}
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            {v.tooltip && (
                              <div
                                className="group/tooltip relative cursor-help text-muted-foreground hover:text-foreground transition-colors">
                                <HelpCircle size={13}/>
                                <div
                                  className="absolute right-0 top-6 w-56 p-2 bg-popover text-popover-foreground text-xs rounded shadow-xl opacity-0 group-hover/tooltip:opacity-100 pointer-events-none transition-opacity z-50 border border-border">
                                  {v.tooltip}
                                </div>
                              </div>
                            )}
                            {renderConfig.showLockIcon !== false && v.locked && (
                              <Lock size={12} className="text-muted-foreground" aria-label="Locked"/>
                            )}
                            {renderConfig.showTypeBadge !== false && (
                              <span
                                className="text-[9px] uppercase font-bold tracking-widest text-muted-foreground border border-border rounded px-1.5 py-0.5">
                                {v.inputType || v.type}
                              </span>
                            )}
                          </div>
                        </div>

                        {renderInput(v)}

                        {errors[v.name] && (
                          <p
                            className="text-[10px] text-destructive mt-1 font-medium flex items-center gap-1 animate-in slide-in-from-top-2">
                            <span className="w-1 h-1 rounded-full bg-destructive"/>
                            {errors[v.name] === 'custom' ? 'Invalid value' : 'This field is required.'}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {allMatchedCount === 0 && (
            <div className="flex flex-col items-center justify-center py-10 text-center opacity-60">
              <TextCursorInput className="mb-2 text-muted-foreground" size={32}/>
              <p className="text-sm font-medium">No variables found</p>
              <p className="text-xs text-muted-foreground">Try adjusting your search query.</p>
            </div>
          )}
        </div>

        {/* --- Footer --- */}
        {renderFooter ? renderFooter() : (
          <div className={cn(
            'p-6 border-t shrink-0',
            variant === 'glass' ? 'bg-background/60 border-white/10' : 'bg-background/95 border-border',
            footer.sticky && 'sticky bottom-0 z-10',
          )}>
            <div className={cn(
              'flex items-center gap-3',
              footer.align === 'left' && 'justify-start',
              footer.align === 'center' && 'justify-center',
              footer.align === 'right' && 'justify-end',
              footer.align === 'spread' && 'justify-between',
              !footer.align && 'justify-between',
            )}>
              {footer.showReset && onReset && (
                <button
                  onClick={handleReset}
                  disabled={isDisabled || isLoading}
                  className={cn(
                    'inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    'h-10 px-4 py-2',
                    'bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-95',
                    'disabled:opacity-50 disabled:pointer-events-none',
                  )}
                >
                  <RotateCcw size={14} className="mr-2"/>
                  {footer.resetText || 'Reset'}
                </button>
              )}

              {footer.align === 'spread' && !footer.showReset && <div/>}

              <button
                onClick={handleSubmit}
                disabled={isLoading || isDisabled}
                className={cn(
                  'inline-flex items-center justify-center rounded-lg text-sm font-bold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  'h-11 px-6 py-2 shadow-lg hover:shadow-xl active:scale-[0.98]',
                  'bg-primary text-primary-foreground hover:bg-primary/90',
                  'disabled:opacity-70 disabled:cursor-wait disabled:shadow-none',
                )}
              >
                {isLoading ? (
                  <Loader2 size={16} className="mr-2 animate-spin"/>
                ) : (
                  <SubmitIcon size={16} className="mr-2"/>
                )}
                {footer.submitText || 'Apply Changes'}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Drawer;
