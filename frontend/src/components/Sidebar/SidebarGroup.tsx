/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {ReactNode, useEffect, useState} from 'react';
import {ChevronDown, ChevronUp} from 'lucide-react';

// hooks
import {useSidebarContext} from './SidebarContext';

// utils
import {cn} from '~/utils/helpers';

/**
 * Props interface for the SidebarGroup component.
 */
export interface SidebarGroupProps {
  /** Optional title/label for the group */
  title?: string;
  /** Child navigation items */
  children: ReactNode;
  /** Additional CSS classes for the group container */
  className?: string;
  /** Initial collapsed state of the group */
  defaultCollapsed?: boolean;
}

/**
 * A collapsible section within the Sidebar.
 * Groups items together and allows toggling their visibility.
 */
const SidebarGroup: React.FC<SidebarGroupProps> = ({title, children, className, defaultCollapsed = false}) => {
  // 1. HOOK: Context
  const {collapsed, expandOnHover, isHovering, searchQuery} = useSidebarContext();

  // 2. HOOK: State
  const [isGroupCollapsed, setIsGroupCollapsed] = useState(defaultCollapsed);

  // 3. HOOK: Effect (Must be called before any return)
  // Automatically expands group when a search query is active to show results
  useEffect(() => {
    if (searchQuery.length > 0) {
      setIsGroupCollapsed(false);
    }
  }, [searchQuery]);

  // Visibility Logic (Non-Hook calculations)
  // Determines if the group should be hidden entirely (e.g. when sidebar is collapsed and not hovering)
  const isFullyCollapsed = collapsed && !(expandOnHover && isHovering);

  // Conditional Return (Safe because it comes AFTER all Hooks)
  if (isFullyCollapsed) return null;

  return (
    <div className={cn('mb-4', className)}>
      {title && (
        <div
          className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider select-none">
          {title}
          {/* Group Toggle Chevron */}
          {!isFullyCollapsed && (
            <button
              onClick={() => setIsGroupCollapsed(prev => !prev)}
              className="opacity-50 hover:opacity-100 transition-opacity"
              aria-label={isGroupCollapsed ? 'Expand group' : 'Collapse group'}
            >
              {isGroupCollapsed ? <ChevronDown size={14}/> : <ChevronUp size={14}/>}
            </button>
          )}
        </div>
      )}
      {/* Content area with transition for collapse animation */}
      <div className="space-y-1 overflow-hidden transition-all duration-300" style={{
        maxHeight: isGroupCollapsed && searchQuery.length === 0 ? '0px' : '1000px',
      }}>
        {children}
      </div>
    </div>
  );
};

export default SidebarGroup;
