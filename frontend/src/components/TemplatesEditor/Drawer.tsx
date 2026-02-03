/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useMemo} from 'react';
import {HelpCircle, Loader2, Lock, type LucideIcon, Sparkles, X} from 'lucide-react';

// utils
import {cn} from '~/utils/helpers';

// ui components
import {Label} from '~/components/ui/Label';
import {Switch} from '~/components/ui/Switch';
import {AdvancedInput} from '~/components/ui/AdvancedInput';

// types
import type {Variable} from './index';

/**
 * Props for the Drawer (Variables Sidebar) component.
 */
export interface DrawerProps {
  /** List of variables to render. */
  variables: Variable[];
  /** Current values of the form variables. */
  formData: Record<string, any>;
  /** Validation errors for the form fields. */
  errors: Record<string, any>;
  /** List of available presets for quick configuration. */
  presets?: Array<{ id: string; label: string; values: Record<string, any> }>;
  /** Display mode: 'drawer' (overlay) or 'sidebar' (persistent). */
  mode?: 'drawer' | 'sidebar';
  /** Configuration specific to the drawer's appearance. */
  drawerProps?: {
    /** Title displayed at the top of the drawer. */
    title?: string;
    /** Subtitle providing context or instructions below the title. */
    subtitle?: string;
    /** Text displayed on the primary submit/apply button. */
    submitText?: string;
    /** Main icon displayed next to the title. */
    icon?: LucideIcon;
    /** Additional CSS class names for styling the drawer container. */
    className?: string;
    /** Icon displayed inside the submit button. */
    buttonIcon?: LucideIcon;
    /** Text displayed on secondary action buttons, if applicable. */
    buttonText?: string;
  };
  /** Functional configuration for the drawer. */
  config?: {
    /** Determines the width of the drawer/sidebar.
     * Accepts standard CSS width values (e.g., '300px', '50%', '20rem').
     * This property is typically applied to the container's style attribute.
     * If not provided, default widths are applied based on the `mode` prop. */
    drawerWidth?: string;
    /** Indicates whether a loading state is active within the drawer.
     * When true, the submit button typically displays a spinner and is disabled.
     * This is useful for asynchronous operations triggered by the 'Apply' action. */
    isLoading?: boolean;
  };

  /** Callback when the drawer is requested to close. */
  onClose?(): void;

  /** Callback when the form is submitted/changes are applied. */
  onApply(): void;

  /** Callback to validate a specific tag/variable value. */
  onTagValidate?(name: string, val: any, schema: Variable): boolean;

  /** Callback when an input value changes. */
  onInputChange(name: string, value: any, variableSchema: Variable): void;

  /** Callback when a boolean toggle is switched. */
  onToggleBoolean(name: string): void;

  /** Callback when a preset is selected. */
  onPresetSelect?(presetId: string): void;
}

const Drawer: React.FC<DrawerProps> = (props) => {
  const {
    onClose = () => {
    },
    variables,
    formData,
    onInputChange,
    onToggleBoolean,
    onApply,
    errors,
    presets = [],
    mode = 'drawer',
    drawerProps = {},
    config = {},
    onPresetSelect,
  } = props;
  const Icon = drawerProps.icon ?? Sparkles;
  const isLoading = config.isLoading ?? false;
  const groupedVariables = useMemo(() => {
    const groups: Record<string, Variable[]> = {};
    const visibleVars = variables.filter(v => v.showIf ? v.showIf(formData) : true);
    visibleVars.forEach(v => {
      const key = v.group || 'General';
      if (!groups[key]) groups[key] = [];
      groups[key].push(v);
    });
    return groups;
  }, [variables, formData]);

  const isSidebar = mode !== 'drawer';

  return (
    <>
      {mode === 'drawer' && <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-opacity"
                                 onClick={onClose}></div>}
      <div className={cn(
        'flex flex-col bg-card shadow-2xl border-l border-border z-50 transition-all duration-300 ease-in-out',
        mode === 'drawer' && 'fixed inset-y-0 right-0 h-full',
        isSidebar && 'relative h-full w-full max-w-sm',
        config.drawerWidth || (mode === 'drawer' ? 'sm:w-[420px]' : 'w-full'),
        drawerProps.className || '',
      )}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-border shrink-0">
          <div>
            <h2 className="text-lg font-bold tracking-tight">{drawerProps.title || 'Variables'}</h2>
            <p className="text-sm text-muted-foreground">{drawerProps.subtitle || 'Configure parameters'}</p>
          </div>
          {mode === 'drawer' && (
            <button onClick={onClose} className="rounded-md opacity-70 hover:opacity-100 hover:bg-accent p-2"><X
              size={20}/></button>)}
        </div>
        {presets.length > 0 && (<div className="px-6 py-3 bg-muted/20 border-b border-border shrink-0"><Label
          className="text-[10px] uppercase font-bold text-muted-foreground mb-2 block">Presets</Label>
          <div className="flex gap-2 overflow-x-auto pb-1">{presets.map(p => (
            <button key={p.id} onClick={() => onPresetSelect && onPresetSelect(p.id)}
                    className="whitespace-nowrap px-3 py-1.5 bg-background border border-border rounded-md text-xs font-medium hover:border-primary transition-colors">{p.label}</button>))}</div>
        </div>)}
        <div className="flex-1 overflow-y-auto custom-scroll p-6 space-y-6">
          {Object.entries(groupedVariables).map(([groupName, vars]) => (
            <div key={groupName} className="space-y-4">
              <div className="flex items-center gap-2"><h3
                className="text-xs font-bold uppercase tracking-wider text-foreground">{groupName}</h3>
                <div className="h-px bg-border flex-1"></div>
              </div>
              {vars.map((v) => (
                <div key={v.name} className="space-y-3 group">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <Label className="text-sm flex items-center gap-1.5">
                        {v.name} {v.required && <span
                        className="text-destructive text-[10px] px-1.5 py-0.5 rounded-full bg-destructive/10">Required</span>}
                        {v.tooltip && <div className="group/tooltip relative ml-1 cursor-help"><HelpCircle size={12}
                                                                                                           className="text-muted-foreground hover:text-foreground"/>
                          <div
                            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-popover text-popover-foreground text-xs rounded shadow-lg opacity-0 group-hover/tooltip:opacity-100 pointer-events-none transition-opacity z-50">{v.tooltip}</div>
                        </div>}
                      </Label>
                      {v.description && (
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{v.description}</p>)}
                    </div>
                    <div className="flex items-center gap-2">
                      {v.locked && <Lock size={12} className="text-muted-foreground"/>}
                      <span
                        className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground border border-border rounded-md px-2 py-1">{v.type}</span>
                    </div>
                  </div>
                  {v.type === 'boolean' ? (
                    <div
                      className={cn('flex items-center justify-between p-3 rounded-lg border border-input bg-background hover:border-primary/50 transition-colors', v.locked && 'opacity-50 cursor-not-allowed')}>
                      <span className="text-sm font-medium">{formData[v.name] ? 'Enabled' : 'Disabled'}</span><Switch
                      checked={formData[v.name]} onCheckedChange={() => onToggleBoolean(v.name)} disabled={v.locked}/>
                    </div>
                  ) : (
                    <div className="relative">
                      {v.type === 'select' ? (
                        <select value={formData[v.name]} onChange={(e) => onInputChange(v.name, e.target.value, v)}
                                disabled={v.locked}
                                className={cn('w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', errors[v.name] && 'border-destructive')}>
                          <option value="" disabled>{v.placeholder || `Select ${v.name}...`}</option>
                          {v.options?.map((opt) => <option key={opt} value={opt}>{opt}</option>)}</select>
                      ) : (
                        <AdvancedInput type={v.type === 'number' ? 'number' : 'text'} value={formData[v.name]}
                                       onChange={(e) => onInputChange(v.name, e.target.value, v)}
                                       placeholder={v.placeholder || `Enter ${v.name}...`} error={errors[v.name]}
                                       min={v.min} max={v.max} disabled={v.locked}/>
                      )}
                      {errors[v.name] && <p
                        className="text-[11px] text-destructive mt-1.5 font-medium flex items-center gap-1">{errors[v.name] === 'custom' ? 'Validation failed' : 'This field cannot be empty.'}</p>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="p-6 border-t border-border bg-background/50 shrink-0">
          <button onClick={onApply} disabled={isLoading}
                  className="w-full inline-flex items-center justify-center rounded-lg text-sm font-bold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-4 py-2 shadow-lg hover:shadow-xl active:scale-[0.98] disabled:opacity-70 disabled:cursor-wait">{isLoading ?
            <Loader2 size={16} className="mr-2 animate-spin"/> :
            <Icon size={16} className="mr-2"/>}{drawerProps.submitText || 'Generate Prompt'}</button>
        </div>
      </div>
    </>
  );
};

export default Drawer;
