/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {X, Sun, Moon, Monitor, Menu} from 'lucide-react';

// hooks
import {useTheme} from './ThemeProvider';

// store
import {useAppStore} from '~/stores/appStore';

// helpers
import {cn} from '~/utils/helpers';

// components
import {Button} from './ui/Button';

/**
 * Props for the Sidebar component
 * @interface SidebarProps
 * @property {React.ReactNode} children - Content to render inside the sidebar
 */
export interface SidebarProps {
  children: React.ReactNode;
}

/**
 * Responsive sidebar component with theme switcher
 * Features mobile overlay, theme selection, and collapsible navigation
 *
 * @example
 * ```tsx
 * <Sidebar>
 *   <NavigationItems />
 *   <UserProfile />
 * </Sidebar>
 * ```
 *
 * @developer_note
 * The sidebar is fixed on mobile and static on desktop screens.
 * Theme state is managed through ThemeProvider context.
 * Sidebar visibility is controlled through appStore state.
 */
const Sidebar: React.FC<SidebarProps> = ({children}) => {
  const {sidebarOpen, setSidebarOpen} = useAppStore();
  const {theme, setTheme} = useTheme();

  return (
    <>
      {/* Mobile overlay - appears when sidebar is open on mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main sidebar container with responsive behavior */}
      <div
        className={cn(
          'fixed left-0 top-0 h-full w-64 bg-background border-r border-border z-50 transform transition-transform duration-300 ease-in-out',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
          'lg:translate-x-0 lg:static lg:z-0 lg:h-screen',
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header section with title and close button */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h1 className="text-lg font-semibold">AI Prompt Enhancer</h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
              className="h-8 w-8 lg:hidden"
            >
              <X className="h-4 w-4"/>
            </Button>
          </div>

          {/* Main content area - scrollable */}
          <div className="flex-1 overflow-y-auto p-4">
            {children}
          </div>

          {/* Footer section with theme switcher */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Theme</span>
              <div className="flex items-center space-x-1">
                <Button
                  variant={theme === 'light' ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => setTheme('light')}
                  className="h-8 w-8"
                >
                  <Sun className="h-4 w-4"/>
                </Button>
                <Button
                  variant={theme === 'dark' ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => setTheme('dark')}
                  className="h-8 w-8"
                >
                  <Moon className="h-4 w-4"/>
                </Button>
                <Button
                  variant={theme === 'system' ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => setTheme('system')}
                  className="h-8 w-8"
                >
                  <Monitor className="h-4 w-4"/>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu toggle button - always visible on mobile */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setSidebarOpen(true)}
        className="fixed top-4 left-4 z-30 lg:hidden"
      >
        <Menu className="h-4 w-4"/>
      </Button>
    </>
  );
};

export default Sidebar;
