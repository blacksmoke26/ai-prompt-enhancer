/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @version 2.0.0
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {
  Bell,
  ChevronDown,
  ChevronRight,
  Download,
  LayoutTemplate,
  LucideIcon,
  Maximize2,
  Menu,
  Moon,
  Network,
  Search,
  Sun,
  Terminal,
  X,
} from 'lucide-react';
import * as Select from '@radix-ui/react-select';

// utils
import {cn} from '~/utils/helpers';
import {PROMPT_STATUS_LABELS, PROMPT_STATUSES} from './utils';

// types
import type {PromptStatus, PromptTemplate} from './index';

/**
 * Props for the Header component (v2).
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
    /** Additional CSS class names to apply to the header container. */
    className?: string;
    /** Subtitle text providing context or instructions. */
    subtitle?: string;
    /** Custom React elements to render in the right-side action area. */
    extraActions?: React.ReactNode;
    /** An array of breadcrumb objects to display navigation history. */
    breadcrumbs?: Array<{ label: string; onClick?: () => void }>;
    /** Visual style variant of the header. */
    variant?: 'default' | 'floating' | 'glassmorphism' | 'minimal';
    /** Positioning behavior of the header. */
    position?: 'static' | 'sticky' | 'fixed';
    /** Whether to show a border at the bottom. */
    bordered?: boolean;
    /** Custom background color class (overrides variant defaults). */
    backgroundClassName?: string;
  };

  /** General configuration flags for the header. */
  config?: {
    [key: string]: any;
    /** Whether to display the logo icon. Defaults to true. */
    showLogo?: boolean;
    /** Whether to display the 'Browse' button. Defaults to true. */
    showBrowseButton?: boolean;
    /** Whether to display the 'Reset' button. Defaults to true. */
    showReset?: boolean;
    /** Whether to hide the header completely on mobile (useful if you have a custom mobile header). */
    hideOnMobile?: boolean;
  };

  // --- New v2 Feature Props ---

  /** Search bar configuration. */
  searchProps?: {
    /** Whether to show the search bar. */
    show?: boolean;
    /** Current search value. */
    value?: string;
    /** Placeholder text for the search input. */
    placeholder?: string;
    /** Custom search icon. */
    icon?: LucideIcon;
    /** Callback when the Enter key is pressed in search. */
    onEnter?(): void;
    /** Callback when search input changes. */
    onChange?(value: string): void;
  };

  /** User profile configuration. */
  userProps?: {
    /** Whether to show the user profile section. */
    show?: boolean;
    /** User's display name. */
    name?: string;
    /** User's avatar URL. */
    avatar?: string;
    /** Initials to show if no avatar is provided. */
    initials?: string;
    /** Callback when user profile is clicked. */
    onClick?: () => void;
  };

  /** Notification bell configuration. */
  notificationProps?: {
    /** Whether to show the notification bell. */
    show?: boolean;
    /** Number of unread notifications. */
    count?: number;
    /** Callback when notification bell is clicked. */
    onClick?(): void;
  };

  /** Theme toggle configuration. */
  themeProps?: {
    /** Whether to show the theme toggle button. */
    show?: boolean;
    /** Current theme ('light', 'dark', 'system'). */
    currentTheme?: 'light' | 'dark' | 'system';
    /** Callback to toggle theme. */
    onToggle?(): void;
  };

  /** Mobile menu configuration. */
  mobileMenuProps?: {
    /** Whether to show the mobile menu trigger button. */
    show?: boolean;
    /** Callback when mobile menu button is clicked. */
    onToggle?(): void;
    /** Whether the mobile menu is currently open. */
    isOpen?: boolean;
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
    searchProps,
    userProps,
    notificationProps,
    themeProps,
    mobileMenuProps,
  } = props;

  const {
    variant = 'default',
    position = 'static',
    bordered = true,
    backgroundClassName,
  } = headerProps;

  const Icon = headerProps?.logoIcon ?? Network;
  const SearchIcon = searchProps?.icon ?? Search;

  // Determine base classes based on variant and position
  const getHeaderClasses = () => {
    const base = 'flex items-center justify-between px-4 sm:px-6 z-20 shrink-0 transition-all duration-300 w-full';

    if (isZenMode) {
      return cn(base, 'h-0 opacity-0 pointer-events-none overflow-hidden border-0');
    }

    const variantClasses = {
      default: 'h-16 bg-card border-b border-border',
      floating: 'h-16 my-4 mx-4 rounded-xl bg-card/90 border border-border shadow-lg',
      glassmorphism: 'h-16 bg-background/50 backdrop-blur-md border-b border-border/50',
      minimal: 'h-14 bg-transparent border-b-0',
    };

    const positionClasses = {
      static: '',
      sticky: 'top-0 sticky',
      fixed: 'top-0 fixed w-full',
    };

    return cn(
      base,
      variantClasses[variant],
      positionClasses[position],
      bordered && variant !== 'minimal' && variant !== 'floating' && 'border-b',
      backgroundClassName || (!bordered && variant === 'minimal' ? 'bg-transparent' : ''),
      headerProps.className || '',
      config.hideOnMobile ? 'hidden md:flex' : 'flex',
    );
  };

  return (
    <header className={getHeaderClasses()}>
      {/* --- Left Side: Mobile Menu, Logo, Breadcrumbs, Title --- */}
      <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">

        {/* Mobile Menu Toggle */}
        {mobileMenuProps?.show && (
          <button
            onClick={mobileMenuProps.onToggle}
            className="p-2 rounded-md hover:bg-accent text-muted-foreground md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuProps.isOpen ? <X size={20}/> : <Menu size={20}/>}
          </button>
        )}

        {/* Logo */}
        {config.showLogo !== false && (
          <div
            className={cn(
              'shrink-0 flex items-center justify-center text-white shadow-lg shadow-primary/20 transition-transform hover:scale-105',
              variant === 'minimal' ? 'h-8 w-8 rounded-lg' : 'h-9 w-9 rounded-xl',
              headerProps.logoIcon ? 'bg-primary' : 'bg-gradient-to-br from-primary to-blue-600',
            )}
          >
            <Icon size={variant === 'minimal' ? 16 : 18}/>
          </div>
        )}

        {/* Title Area */}
        <div className="flex flex-col min-w-0">
          {/* Breadcrumbs */}
          {headerProps.breadcrumbs && headerProps.breadcrumbs.length > 0 && (
            <div className="flex items-center text-[10px] text-muted-foreground font-medium uppercase mb-0.5 truncate">
              {headerProps.breadcrumbs.map((b, i) => (
                <span
                  key={i}
                  className="flex items-center hover:text-foreground cursor-pointer transition-colors"
                  onClick={b.onClick}
                >
                  {b.label}
                  {i < headerProps.breadcrumbs!.length - 1 && (
                    <ChevronRight size={10} className="mx-1 shrink-0"/>
                  )}
                </span>
              ))}
            </div>
          )}

          {/* Title & Badges */}
          <div className="flex items-center gap-2">
            <h1 className={cn(
              'font-bold tracking-tight truncate text-foreground',
              variant === 'minimal' ? 'text-base' : 'text-lg',
            )}>
              {headerProps.title || currentTemplate.title}
            </h1>

            <button
              onClick={onOpenSelector}
              className="text-muted-foreground hover:text-foreground opacity-70 hover:opacity-100 shrink-0 transition-opacity"
              aria-label="Change template"
            >
              <ChevronDown size={16}/>
            </button>

            {currentTemplate.isDeprecated && (
              <span
                className="text-[10px] bg-destructive/10 text-destructive px-1.5 py-0.5 rounded border border-destructive/20 shrink-0 whitespace-nowrap">
                Deprecated
              </span>
            )}

            {currentTemplate.badges &&
              currentTemplate.badges.map((b) => (
                <span
                  key={b}
                  className="text-[9px] bg-primary/10 text-primary px-1.5 py-0.5 rounded border border-primary/20 font-bold uppercase tracking-wider shrink-0 whitespace-nowrap"
                >
                  {b}
                </span>
              ))}
          </div>

          {/* Subtitle */}
          {headerProps.subtitle && variant !== 'minimal' && (
            <p className="text-[11px] text-muted-foreground mt-0.5 max-w-md truncate hidden sm:block">
              {headerProps.subtitle}
            </p>
          )}
        </div>
      </div>

      {/* --- Center: Search Bar (Optional) --- */}
      {searchProps?.show && (
        <div className="hidden md:flex items-center flex-1 justify-center px-4 max-w-lg mx-4">
          <div className="relative w-full group">
            <SearchIcon
              className="absolute left-2.5 top-2.5 text-muted-foreground group-focus-within:text-primary transition-colors"
              size={14}/>
            <input
              type="text"
              placeholder={searchProps.placeholder || 'Search prompts...'}
              value={searchProps.value}
              onChange={(e) => searchProps.onChange?.(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && searchProps.onEnter?.()}
              className="w-full h-9 pl-9 pr-4 rounded-full bg-muted/50 border border-transparent focus:bg-background focus:border-primary/50 text-sm outline-none transition-all placeholder:text-muted-foreground/60"
            />
          </div>
        </div>
      )}

      {/* --- Right Side: Actions, Tools, Profile --- */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <div className="hidden md:flex items-center gap-2">

          {/* Token Count */}
          {tokenCount !== undefined && (
            <div
              className="flex items-center gap-1.5 text-xs text-muted-foreground bg-background border border-border rounded-md px-2 py-1.5 shadow-sm">
              <Terminal size={11} strokeWidth={2.5}/>
              <span className="font-medium tabular-nums">{tokenCount.toLocaleString()} tokens</span>
            </div>
          )}

          {/* Status Selector */}
          {status != null && onStatusChange && (
            <div className="flex items-center gap-2">
              <span
                className="text-[10px] sm:text-[11px] text-muted-foreground uppercase tracking-wide font-semibold hidden lg:block">
                Status
              </span>
              <Select.Root value={status} onValueChange={onStatusChange}>
                <Select.Trigger
                  className="inline-flex items-center justify-between gap-2 rounded-md px-2.5 py-1.5 text-xs font-medium border border-input bg-background hover:bg-accent/50 hover:text-accent-foreground transition-colors min-w-[110px] h-8"
                >
                  <Select.Value>
                    {PROMPT_STATUS_LABELS[status] ?? status}
                  </Select.Value>
                  <Select.Icon className="text-muted-foreground">
                    <ChevronDown size={12}/>
                  </Select.Icon>
                </Select.Trigger>

                <Select.Portal>
                  <Select.Content
                    className="bg-popover text-popover-foreground border border-border rounded-md shadow-xl z-50 min-w-[130px] p-1 max-h-60 overflow-y-auto animate-in fade-in zoom-in-95"
                    position="popper"
                  >
                    <Select.Viewport className="flex flex-col gap-0.5">
                      {PROMPT_STATUSES.map((s) => (
                        <Select.Item
                          key={s}
                          value={s}
                          className="flex items-center justify-between px-2 py-1.5 rounded-md text-xs hover:bg-accent cursor-pointer outline-none data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground data-[disabled]:opacity-50 transition-colors"
                        >
                          <Select.ItemText>
                            {PROMPT_STATUS_LABELS[s] ?? s}
                          </Select.ItemText>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>
          )}

          {/* Theme Toggle */}
          {themeProps?.show && (
            <button
              onClick={themeProps.onToggle}
              className="p-2 rounded-md hover:bg-accent text-muted-foreground transition-colors"
              title="Toggle theme"
            >
              {themeProps.currentTheme === 'dark' ? <Sun size={16}/> : <Moon size={16}/>}
            </button>
          )}

          {/* Notifications */}
          {notificationProps?.show && (
            <button
              onClick={notificationProps.onClick}
              className="relative p-2 rounded-md hover:bg-accent text-muted-foreground transition-colors"
              title="Notifications"
            >
              <Bell size={16}/>
              {notificationProps.count && notificationProps.count > 0 && (
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 animate-pulse"/>
              )}
            </button>
          )}

          {/* Export Menu */}
          {onExport && (
            <div className="relative group">
              <button
                className="p-2 rounded-md hover:bg-accent text-muted-foreground transition-colors"
                title="Export"
              >
                <Download size={16}/>
              </button>
              <div
                className="absolute right-0 top-full mt-1 w-36 bg-popover border border-border rounded-md shadow-lg p-1 hidden group-hover:block z-50 animate-in fade-in slide-in-from-top-1">
                <button
                  onClick={() => onExport('md')}
                  className="w-full text-left text-xs px-3 py-2 hover:bg-accent hover:text-accent-foreground rounded-sm transition-colors flex items-center gap-2"
                >
                  <span className="font-mono text-[10px] bg-muted px-1 rounded">MD</span> Markdown
                </button>
                <button
                  onClick={() => onExport('json')}
                  className="w-full text-left text-xs px-3 py-2 hover:bg-accent hover:text-accent-foreground rounded-sm transition-colors flex items-center gap-2"
                >
                  <span className="font-mono text-[10px] bg-muted px-1 rounded">{`{}`}</span> JSON
                </button>
              </div>
            </div>
          )}

          {/* Extra Actions */}
          {headerProps.extraActions}
        </div>

        {/* Vertical Divider */}
        <div className="hidden sm:block h-5 w-[1px] bg-border mx-1"/>

        {/* Rightmost Actions: Browse, Profile, Zen */}
        <div className="flex items-center gap-2">
          {config.showBrowseButton !== false && (
            <button
              onClick={onOpenSelector}
              className="hidden lg:inline-flex items-center justify-center rounded-md text-xs font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 transition-colors shadow-sm"
            >
              <LayoutTemplate size={13} className="mr-2"/>
              Browse
            </button>
          )}

          {/* User Profile */}
          {userProps?.show && (
            <button
              onClick={userProps.onClick}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full hover:bg-accent transition-colors border border-transparent hover:border-border"
            >
              {userProps.avatar ? (
                <img
                  src={userProps.avatar}
                  alt={userProps.name}
                  className="h-7 w-7 rounded-full object-cover border border-border"
                />
              ) : (
                <div
                  className="h-7 w-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold border border-primary/20">
                  {userProps.initials || userProps.name?.charAt(0) || 'U'}
                </div>
              )}
              <span className="text-xs font-medium text-foreground max-w-[80px] truncate hidden sm:block">
                {userProps.name || 'User'}
              </span>
            </button>
          )}

          {onToggleZenMode && (
            <button
              onClick={onToggleZenMode}
              className={cn(
                'p-2 rounded-md transition-all duration-200',
                isZenMode
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                  : 'hover:bg-accent text-muted-foreground',
              )}
              title={isZenMode ? 'Exit Zen Mode' : 'Enter Zen Mode'}
            >
              <Maximize2 size={15}/>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
