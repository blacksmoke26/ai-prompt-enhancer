/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {ReactNode, useEffect, useState} from 'react';
import {ChevronDown, ChevronUp, LucideIcon} from 'lucide-react';

// hooks
import {useSidebarContext} from '~/components/Sidebar/SidebarContext';

// helpers
import {cn} from '~/utils/helpers';

// ui components
import {Tooltip, TooltipContent, TooltipTrigger} from '~/components/ui/Tooltip';

/**
 * Props interface for the SidebarItem component.
 */
export interface SidebarItemProps {
  /** Unique identifier for the navigation item */
  id: string;
  /** Icon component to display next to the label */
  icon?: LucideIcon;
  /** Text label for the item */
  label: string;
  /** Manually force the active state */
  active?: boolean;
  /** Optional badge text or number */
  badge?: string | number;
  /** Click event handler */
  onClick?: () => void;
  /** Nested child items (for sub-menus) */
  children?: ReactNode;
}

/**
 * Sidebar Item Component
 * --- FIXED NESTED SEARCH ---
 *
 * Represents a single navigation link or a parent of sub-links.
 * Handles active states, search filtering, and nested item expansion.
 */
const SidebarItem: React.FC<SidebarItemProps> = (props) => {
  const {
    id,
    icon: Icon,
    label,
    active: manuallyActive,
    badge,
    onClick,
    children,
  } = props;

  // 1. HOOK: Context
  const {
    collapsed,
    expandOnHover,
    isHovering,
    activePath,
    setActivePath,
    searchQuery,
    side,
  } = useSidebarContext();

  // 2. HOOK: State
  const [isOpen, setIsOpen] = useState(false);

  // 3. HOOK: Effect
  useEffect(() => {
    // Open if this item is active and nested
    if ((manuallyActive || activePath === id) && children && collapsed) {
      setIsOpen(true);
    }

    // Open if there is an active search query (Force open to show matches)
    if (searchQuery && children) {
      setIsOpen(true);
    }
  }, [manuallyActive, activePath, id, children, collapsed, searchQuery]);

  // Search Filter Logic
  const lowerLabel = label.toLowerCase();
  const lowerQuery = searchQuery.toLowerCase();
  const isMatch = lowerLabel.includes(lowerQuery);
  const isNested = !!children;
  const isActive = manuallyActive || activePath === id;

  // --- FIX: Allow Parents to render even if they don't match ---
  // If searching and no match...
  if (searchQuery && !isMatch) {
    // ...AND it's NOT a parent (it's a leaf node), hide it.
    // If it IS a parent, show it so its matching children can be seen.
    if (!isNested) {
      return null;
    }
    // If it is a parent, we continue to render it.
  }

  const isFullyCollapsed = collapsed && !(expandOnHover && isHovering);

  const handleClick = () => {
    if (isNested) {
      setIsOpen(!isOpen);
    } else {
      setActivePath(id);
      onClick?.();
    }
  };

  const ItemContent = (
    <div className="w-full">
      <button
        onClick={handleClick}
        className={cn(
          'w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 group relative outline-none',
          isActive
            ? 'bg-primary text-primary-foreground shadow-sm'
            : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
        )}
      >
        <div className="flex items-center min-w-0 flex-1">
          {Icon && (
            <Icon
              className={cn(
                'h-4 w-4 flex-shrink-0',
                isFullyCollapsed ? 'mr-0' : 'mr-3',
                isActive && 'text-primary-foreground',
              )}
            />
          )}
          {!isFullyCollapsed && <span className="truncate">{label}</span>}
        </div>

        {!isFullyCollapsed && (
          <div className="flex items-center space-x-1 ml-2 flex-shrink-0">
            {badge && (
              <span
                className={cn(
                  'px-2 py-0.5 text-[10px] rounded-full font-bold',
                  isActive
                    ? 'bg-primary-foreground/20 text-primary-foreground'
                    : 'bg-primary/10 text-primary',
                )}
              >
                {badge}
              </span>
            )}
            {isNested && (
              isOpen ? <ChevronUp className="h-3 w-3"/> : <ChevronDown className="h-3 w-3"/>
            )}
          </div>
        )}
      </button>

      {/* Nested Children */}
      {isNested && isOpen && !isFullyCollapsed && (
        <div
          className="mt-1 ml-4 space-y-1 border-l border-border pl-2 overflow-hidden animate-in slide-in-from-top-1 duration-200">
          {React.Children.map(children, (child) => (
            <React.Fragment key={((child as React.ReactElement).props as Record<string, any>).id || Math.random()}>
              {child}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );

  if (isFullyCollapsed) {
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <div className="px-2 py-1">{ItemContent}</div>
        </TooltipTrigger>
        <TooltipContent side={side === 'right' ? 'left' : 'right'} align="center">
          <p>{label}</p>
          {isNested && <p className="text-xs text-muted-foreground">Has sub-items</p>}
        </TooltipContent>
      </Tooltip>
    );
  }

  return ItemContent;
};

export default SidebarItem;
