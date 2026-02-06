/**
 * @fileoverview A comprehensive, feature-rich Sidebar component for React applications.
 * @module Sidebar
 *
 * @description
 * This module provides a flexible Sidebar component that supports navigation, grouping,
 * searching, resizing, and collapsing. It is designed to work seamlessly with
 * desktop and mobile layouts, using context to manage state across its sub-components.
 *
 * @features
 * - Collapsible state (desktop) / Off-canvas state (mobile)
 * - Resizable width (with min/max constraints)
 * - Searchable navigation items with auto-expansion
 * - Grouping with collapsible sections
 * - Nested navigation items
 * - Hover expansion support
 * - Left or Right placement
 * - Loading states with skeleton UI
 *
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {ReactNode, useEffect, useRef, useState} from 'react';
import {ChevronLeft, ChevronRight, GripVertical, Menu, Search, X} from 'lucide-react';

// Hooks (Adjust paths to your project structure)
import {useMediaQuery} from '~/hooks/useMediaQuery';
import {useAppStore} from '~/stores/appStore';
import {SidebarContext, SidebarContextValue} from './SidebarContext';

// Helpers (Adjust path)
import {cn} from '~/utils/helpers';

// UI Components (Adjust path)
import {Button} from '~/components/ui/Button';
import {Tooltip, TooltipContent, TooltipTrigger} from '~/components/ui/Tooltip';

// relative components
import SidebarItem from './SidebarItem';
import SidebarGroup from './SidebarGroup';

/**
 * Props interface for the main Sidebar component.
 */
export interface SidebarProps {
  /** Child components, typically Sidebar.Group or Sidebar.Item */
  children: ReactNode;
  /** Optional custom header content */
  header?: ReactNode;
  /** Optional custom footer content */
  footer?: ReactNode;
  /** Title of the sidebar (e.g., application name) */
  title?: string;
  /** Enables the collapse toggle button on desktop */
  collapsible?: boolean;
  /** Additional CSS class names for the sidebar container */
  className?: string;
  /** Custom brand element (logo/icon) to display in the header */
  brand?: ReactNode;
  /** Enables drag-to-resize functionality */
  resizable?: boolean;
  /** Minimum width in pixels when resizing */
  minWidth?: number;
  /** Maximum width in pixels when resizing */
  maxWidth?: number;
  /** Displays a search input in the sidebar header */
  searchable?: boolean;
  /** Callback fired when the search query changes */
  onSearchChange?: (query: string) => void;
  /** Shows a skeleton loader state instead of children */
  isLoading?: boolean;
  /** Expands the sidebar to full width on hover when collapsed */
  expandOnHover?: boolean;
  /** Position of the sidebar relative to the viewport */
  side?: 'left' | 'right';
  /** Propagates collapsible state to child groups */
  groupCollapsible?: boolean;

  /** Callback fired when the sidebar open/close state changes (mobile) */
  onOpenChange?(open: boolean): void;

  /** Callback fired when the sidebar collapse state changes (desktop) */
  onCollapseChange?(collapsed: boolean): void;
}

/**
 * A loading skeleton UI for sidebar items.
 * Displays a pulsing icon and text line.
 */
export const SkeletonLoader = () => (
  <div className="flex items-center space-x-3 px-2 py-2.5">
    <div className="h-4 w-4 rounded bg-muted animate-pulse"/>
    <div className="h-4 w-full max-w-[180px] rounded bg-muted animate-pulse"/>
  </div>
);

/**
 * The main Sidebar container component.
 * Manages layout, global state (open/closed/collapsed), resizing, and keyboard interactions.
 */
const SidebarComponent = (props: SidebarProps) => {
  const {
    children,
    title = 'Synapse',
    collapsible = false,
    className,
    brand,
    resizable = false,
    minWidth = 200,
    maxWidth = 450,
    searchable = false,
    onSearchChange,
    isLoading = false,
    expandOnHover = false,
    side = 'left',
    groupCollapsible = true,
    onOpenChange,
    onCollapseChange,
  } = props;

  const {sidebarOpen, setSidebarOpen} = useAppStore();
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const [currentWidth, setCurrentWidth] = useState<number>(280);
  const [isHovering, setIsHovering] = useState(false);
  const [activePath, setActivePath] = useState<string>('');

  const sidebarRef = useRef<HTMLDivElement>(null);
  const resizeHandleRef = useRef<HTMLDivElement>(null);


  // Callbacks for state changes
  useEffect(() => {
    if (onOpenChange) onOpenChange(sidebarOpen);
  }, [sidebarOpen, onOpenChange]);

  useEffect(() => {
    if (onCollapseChange) onCollapseChange(sidebarCollapsed);
  }, [sidebarCollapsed, onCollapseChange]);

  // Responsive behavior: Ensure sidebar is open on desktop if collapsible
  useEffect(() => {
    if (isDesktop && collapsible) {
      setSidebarOpen(true);
    } else if (!isDesktop) {
      setSidebarCollapsed(false);
    }
  }, [isDesktop, collapsible, setSidebarOpen]);

  // Keyboard shortcuts: Ctrl/Cmd + B to toggle, Escape to close
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'b') {
        event.preventDefault();
        if (isDesktop && collapsible) {
          setSidebarCollapsed(prev => !prev);
        } else {
          setSidebarOpen(!sidebarOpen);
        }
      }
      if (event.key === 'Escape' && sidebarOpen) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [sidebarOpen, isDesktop, collapsible, setSidebarOpen]);

  // Resize logic: Handles mouse movement to adjust sidebar width
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !sidebarRef.current) return;
      const windowWidth = window.innerWidth;
      const clientX = e.clientX;

      let newWidth: number;

      if (side === 'right') {
        newWidth = windowWidth - clientX;
      } else {
        newWidth = clientX;
      }

      if (newWidth >= minWidth && newWidth <= maxWidth) {
        setCurrentWidth(newWidth);
      }
    };
    const handleMouseUp = () => setIsResizing(false);

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, minWidth, maxWidth, side]);

  // Mobile Click Outside: Closes sidebar if clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && sidebarOpen) {
        setSidebarOpen(false);
      }
    };
    if (sidebarOpen && !isDesktop) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [sidebarOpen, isDesktop, setSidebarOpen]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (onSearchChange) onSearchChange(val);
  };

  // Calculate effective width based on collapsed state and hover
  const effectiveWidth = sidebarCollapsed
    ? (expandOnHover && isHovering ? currentWidth : 72)
    : currentWidth;

  const sidebarStyle = {width: isDesktop ? `${effectiveWidth}px` : '100%'};

  // Create a placeholder element to push main content
  const contentPaddingStyle: React.CSSProperties = isDesktop
    ? {
      [side]: `${effectiveWidth}px`,
      left: 'auto',
      right: 'auto',
      width: 'auto',
      position: 'fixed',
      inset: 0,
      pointerEvents: 'none',
      transition: 'all 0.3s',
    }
    : {position: 'static'};

  if (isDesktop) {
    if (side === 'left') {
      contentPaddingStyle.left = `${effectiveWidth}px`;
      contentPaddingStyle.right = '0';
    } else {
      contentPaddingStyle.right = `${effectiveWidth}px`;
      contentPaddingStyle.left = '0';
    }
  }

  const contextValue: SidebarContextValue = {
    collapsed: sidebarCollapsed,
    expandOnHover,
    isHovering,
    activePath,
    setActivePath,
    searchQuery,
    side,
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {(sidebarOpen && !isDesktop) && (
        <div
          className={cn('fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity duration-300', side === 'right' && 'bg-transparent')}
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <SidebarContext value={contextValue}>
        <div
          ref={sidebarRef}
          className={cn(
            'fixed top-0 h-screen bg-background border-r border-border z-50 flex flex-col shadow-xl',
            !isResizing && 'transition-all duration-300 ease-in-out',
            isDesktop ? 'static z-0' : 'shadow-2xl',
            side === 'left' ? 'left-0 ' : 'right-0 border-l-0',
            className,
          )}
          style={sidebarStyle}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          role="navigation"
          aria-label="Main navigation"
        >
          {/* Header */}
          <div
            className={cn('flex flex-col justify-between p-4 border-b border-border shrink-0 bg-background/95 backdrop-blur', !searchable && 'py-3 pt-2')}>
            <div className={cn('flex items-center space-x-3 overflow-hidden', searchable ? 'mb-2' : 'mt-2')}>
              {brand || (
                <div
                  className="flex-shrink-0 h-9 w-9 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center shadow-md shadow-primary/20">
                  <span className="text-white font-bold text-base">SY</span>
                </div>
              )}
              <div className={cn(
                'flex flex-col justify-center transition-all duration-300 whitespace-nowrap overflow-hidden',
                sidebarCollapsed && !(expandOnHover && isHovering) && 'opacity-0 w-0',
              )}>
                <h1 className="text-lg font-bold tracking-tight">{title}</h1>
              </div>
            </div>

            {/* Controls */}
            <div className={cn('flex items-center space-x-2 flex-shrink-0', searchable && 'mt-[23px]')}>
              {searchable && (
                <div className={cn(
                  'transition-all duration-300 overflow-hidden relative',
                  sidebarCollapsed && !(expandOnHover && isHovering) && 'w-0 opacity-0',
                )}>
                  <div className="relative flex items-center">
                    <Search className="absolute left-2.5 top-2.3 h-3.5 w-3.5 text-muted-foreground"/>
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="h-8 w-48 md:w-64 pl-8 pr-3 rounded-full border border-input bg-muted/50 text-xs focus:outline-none outline-none transition-all"
                      autoFocus={sidebarOpen && !isDesktop}
                    />
                  </div>
                </div>
              )}

              {collapsible && isDesktop && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="plain"
                      size="icon"
                      onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                      className="h-8 w-8 shrink-0"
                    >
                      {sidebarCollapsed ? <ChevronRight size={16}/> : <ChevronLeft size={16}/>}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent
                    side={side === 'right' ? 'left' : 'right'}>{sidebarCollapsed ? 'Expand' : 'Collapse'}</TooltipContent>
                </Tooltip>
              )}

              {!isDesktop && (
                <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)} className="h-8 w-8">
                  <X size={16}/>
                </Button>
              )}
            </div>
          </div>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto sidebar-scroll py-4 px-3">
            {isLoading ? (
              <div className="space-y-4 px-1">{[...Array(5)].map((_, i) => <SkeletonLoader key={i}/>)}</div>
            ) : (
              <div className="space-y-6">
                {React.Children.map(children, child =>
                  React.cloneElement(child as React.ReactElement<any>, {
                    groupCollapsible,
                  }),
                )}
              </div>
            )}
          </div>

          {/* Resize Handle */}
          {isDesktop && resizable && !sidebarCollapsed && (
            <div
              ref={resizeHandleRef}
              className={cn(
                'absolute top-0 bottom-0 w-1 cursor-col-resize hover:bg-primary transition-colors z-10 flex items-center justify-center group/resize',
                side === 'left' ? 'right-0' : 'left-0',
                isResizing && 'bg-primary',
              )}
              onMouseDown={(e) => {
                e.preventDefault();
                setIsResizing(true);
              }}
              aria-label="Resize sidebar"
            >
              <GripVertical
                className="h-4 w-4 text-muted-foreground opacity-0 group-hover/resize:opacity-100 transition-opacity"/>
            </div>
          )}
        </div>
      </SidebarContext>

      {/* Mobile Floating Toggle */}
      {!isDesktop && (
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={cn('fixed top-4 z-50 rounded-full shadow-lg bg-background', side === 'left' ? 'left-4' : 'right-4')}
        >
          <Menu size={20}/>
        </Button>
      )}


      {/* Content Spacer */}
      {isDesktop && (
        <div style={contentPaddingStyle} className="pointer-events-none transition-all duration-300"/>
      )}
    </>
  );
};

/**
 * Composite type for the Sidebar export including its sub-components.
 */
type SidebarWithComponents = React.FC<SidebarProps> & {
  Group: typeof SidebarGroup;
  Item: typeof SidebarItem;
};

const Sidebar = SidebarComponent as SidebarWithComponents;
Sidebar.Group = SidebarGroup;
Sidebar.Item = SidebarItem;

export {SidebarItem, SidebarGroup};

export default Sidebar;

