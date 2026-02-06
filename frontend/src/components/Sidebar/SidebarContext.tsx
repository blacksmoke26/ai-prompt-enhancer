/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import {createContext, useContext} from 'react';

/**
 * Internal context shape shared between Sidebar and its children.
 */
export interface SidebarContextValue {
  /** Whether the sidebar is currently collapsed (narrow) */
  collapsed: boolean;
  /** Whether the sidebar expands on hover */
  expandOnHover: boolean;
  /** Whether the mouse is currently hovering over the sidebar */
  isHovering: boolean;
  /** The ID of the currently active navigation item */
  activePath: string;
  /** Function to update the active navigation item */
  setActivePath: (path: string) => void;
  /** The current search query string */
  searchQuery: string;
  /** The side the sidebar is positioned on */
  side: 'left' | 'right';
}

/** Context instance for Sidebar state management */
export const SidebarContext = createContext<SidebarContextValue | undefined>(undefined);

/**
 * Custom hook to access Sidebar context.
 * @throws {Error} If used outside of a Sidebar component.
 */
export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('Sidebar components must be used within the Sidebar component.');
  }
  return context;
};
