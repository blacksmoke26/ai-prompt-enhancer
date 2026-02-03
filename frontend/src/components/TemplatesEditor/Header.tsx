/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {
  ChevronDown,
  ChevronRight,
  Download,
  LayoutTemplate,
  LucideIcon,
  Maximize2,
  Network,
  Terminal,
} from 'lucide-react';
import * as Select from '@radix-ui/react-select';

// utils
import {cn} from '~/utils/helpers';
import {PROMPT_STATUS_LABELS, PROMPT_STATUSES} from './utils';

// types
import type {PromptStatus, PromptTemplate} from './index';

/**
 * Props for the Header component.
 */
export interface HeaderProps {
  /** The currently active prompt template. */
  currentTemplate: PromptTemplate;
  /** The current status of the prompt. */
  status?: PromptStatus;
  /** Estimated token count of the current content. */
  tokenCount?: number;
  /** Configuration specific to the header appearance and behavior. */
  headerProps?: {
    /** The title displayed in the header. If omitted, defaults to the current template's title. */
    title?: string;
    /** The Lucide React icon component to display in the logo area. */
    logoIcon?: LucideIcon;
    /** Additional CSS class names to apply to the header container for styling overrides. */
    className?: string;
    /** Subtitle text providing context or instructions, displayed below the main title. */
    subtitle?: string;
    /** Custom React elements to render in the right-side action area of the header. */
    extraActions?: React.ReactNode;
    /** An array of breadcrumb objects to display navigation history or hierarchy. */
    breadcrumbs?: Array<{ label: string; onClick?: () => void }>;
  };
  /** General configuration flags for the header. */
  config?: {
    [key: string]: any;
    /** Whether to display the logo icon in the header. Defaults to true. */
    showLogo?: boolean;
    /** Whether to display the 'Browse' button for opening the template selector. Defaults to true. */
    showBrowseButton?: boolean;
    /** Whether to display a 'Reset' button to restore default values. Defaults to true. */
    showReset?: boolean;
  };

  /** Callback to open the template selector modal. */
  onOpenSelector(): void;

  /** Callback when the prompt status is changed. */
  onStatusChange?(status: PromptStatus): void;

  /** Callback to export the current prompt content. */
  onExport?(format: 'json' | 'md'): void;

  /** Callback to toggle Zen mode. */
  onToggleZenMode?(): void;

  /** Indicates whether Zen mode is currently active. */
  isZenMode?: boolean;
}

const Header: React.FC<HeaderProps> = (props) => {
  const {
    currentTemplate,
    onOpenSelector,
    headerProps = {},
    config = {},
    status,
    tokenCount,
    onStatusChange,
    onExport,
    onToggleZenMode,
    isZenMode,
  } = props;

  const Icon = headerProps?.logoIcon ?? Network;

  return (
    <header
      className={cn(
        'flex items-center justify-between px-6 z-20 shrink-0 transition-all duration-300',
        isZenMode
          ? 'h-0 opacity-0 pointer-events-none overflow-hidden'
          : 'h-16 border-b border-border bg-card/50 backdrop-blur-sm',
        headerProps.className || '',
      )}
    >
      {/* Left side: logo, breadcrumbs, title, badges */}
      <div className="flex items-center gap-4">
        {config.showLogo !== false && (
          <div
            className="h-9 w-9 bg-gradient-to-br from-primary to-blue-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <Icon size={18}/>
          </div>
        )}

        <div className="flex flex-col">
          {headerProps.breadcrumbs && headerProps.breadcrumbs.length > 0 && (
            <div className="flex items-center text-[10px] text-muted-foreground font-medium uppercase mb-0.5">
              {headerProps.breadcrumbs.map((b, i) => (
                <span
                  key={i}
                  className="flex items-center hover:text-foreground cursor-pointer"
                  onClick={b.onClick}
                >
                  {b.label}
                  {i < headerProps.breadcrumbs!.length - 1 && (
                    <ChevronRight size={10} className="mx-1"/>
                  )}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2">
            <h1 className="font-bold text-lg text-foreground tracking-tight">
              {headerProps.title || currentTemplate.title}
            </h1>
            <button
              onClick={onOpenSelector}
              className="text-muted-foreground hover:text-foreground opacity-70 hover:opacity-100"
            >
              <ChevronDown size={16}/>
            </button>

            {currentTemplate.isDeprecated && (
              <span
                className="text-[10px] bg-destructive/10 text-destructive px-1.5 py-0.5 rounded border border-destructive/20">
                Deprecated
              </span>
            )}

            {currentTemplate.badges &&
              currentTemplate.badges.map((b) => (
                <span
                  key={b}
                  className="text-[9px] bg-primary/10 text-primary px-1.5 py-0.5 rounded border border-primary/20 font-bold uppercase tracking-wider"
                >
                  {b}
                </span>
              ))}
          </div>

          {headerProps.subtitle && (
            <p className="text-[11px] text-muted-foreground mt-0.5 max-w-md truncate">
              {headerProps.subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Right side: status, token count, export, extra actions, browse, zen mode */}
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-3">
          {/* Token count */}
          <div
            className="flex items-center gap-1.5 text-xs text-muted-foreground bg-background border border-border rounded px-2 py-1">
            <Terminal size={10}/>
            <span>{tokenCount ?? 0} tokens</span>
          </div>

          {/* Status selector (Radix UI) */}
          {status != null && onStatusChange && (
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-muted-foreground uppercase tracking-wide">
                Status
              </span>
              <Select.Root value={status} onValueChange={onStatusChange}>
                <Select.Trigger
                  className="inline-flex items-center justify-between gap-2 rounded px-2 py-1 text-[11px] border border-input bg-background hover:bg-accent min-w-[100px]">
                  <Select.Value>
                    {PROMPT_STATUS_LABELS[status] ?? status}
                  </Select.Value>
                  <Select.Icon>
                    <ChevronDown size={10}/>
                  </Select.Icon>
                </Select.Trigger>

                <Select.Portal>
                  <Select.Content
                    className="bg-popover border border-border rounded-md shadow-md z-50 min-w-[120px] p-1 max-h-60 overflow-y-auto"
                    position="popper"
                  >
                    <Select.Viewport className="flex flex-col gap-0.5">
                      {PROMPT_STATUSES.map((s) => (
                        <Select.Item
                          key={s}
                          value={s}
                          className="flex items-center justify-between px-2 py-1.5 rounded text-[11px] hover:bg-accent cursor-pointer outline-none data-[state=checked]:font-medium data-[state=checked]:bg-accent/50 data-[disabled]:opacity-50"
                        >
                          <Select.ItemText>
                            {PROMPT_STATUS_LABELS[s] ?? s}
                          </Select.ItemText>
                          <Select.ItemIndicator>
                            {/* Optional check icon */}
                            {/* <Check size={10} /> */}
                          </Select.ItemIndicator>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>
          )}

          {/* Export popover */}
          {onExport && (
            <div className="relative group">
              <button
                className="p-1.5 rounded-md hover:bg-accent text-muted-foreground transition-colors"
                title="Export"
              >
                <Download size={14}/>
              </button>
              <div
                className="absolute right-0 top-full mt-1 w-32 bg-popover border border-border rounded-md shadow-lg p-1 hidden group-hover:block z-50">
                <button
                  onClick={() => onExport('md')}
                  className="w-full text-left text-xs px-3 py-2 hover:bg-accent rounded"
                >
                  Markdown (.md)
                </button>
                <button
                  onClick={() => onExport('json')}
                  className="w-full text-left text-xs px-3 py-2 hover:bg-accent rounded"
                >
                  JSON (.json)
                </button>
              </div>
            </div>
          )}

          {/* Extra actions from headerProps */}
          {headerProps.extraActions}
        </div>

        <div className="h-4 w-[1px] bg-border mx-1"/>

        {/* Browse button, Zen toggle */}
        <div className="flex items-center gap-2">
          {config.showBrowseButton !== false && (
            <button
              onClick={onOpenSelector}
              className="hidden sm:inline-flex items-center justify-center rounded-md text-xs font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4"
            >
              <LayoutTemplate size={12} className="mr-2"/>
              Browse
            </button>
          )}
          {onToggleZenMode && (
            <button
              onClick={onToggleZenMode}
              className="p-2 rounded-md hover:bg-accent text-muted-foreground"
              title="Toggle Zen Mode"
            >
              <Maximize2 size={14}/>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
