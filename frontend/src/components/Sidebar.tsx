/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useEffect, useRef, useState} from 'react';
import {ChevronLeft, ChevronRight, Menu, Monitor, Moon, Sun, X} from 'lucide-react';

// hooks
import {useTheme} from '~/components/ThemeProvider';
import {useMediaQuery} from '~/hooks/useMediaQuery';

// store
import {useAppStore} from '~/stores/appStore';

// helpers
import {cn} from '~/utils/helpers';

// ui components
import {Button} from '~/components/ui/Button';
import {Tooltip, TooltipContent, TooltipTrigger} from '~/components/ui/Tooltip';

/**
 * Props for the Sidebar component
 * @interface SidebarProps
 */
export interface SidebarProps {
  /** Content to render inside the sidebar */
  children: React.ReactNode;
  /** Custom header content (replaces default title) */
  header?: React.ReactNode;
  /** Custom footer content */
  footer?: React.ReactNode;
  /** Sidebar title (default: 'Synapse') */
  title?: string;
  /** Enable collapsible sidebar functionality */
  collapsible?: boolean;
  /** Show/hide theme switcher (default: true) */
  showThemeSwitcher?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Custom brand/logo component */
  brand?: React.ReactNode;
}

/**
 * Advanced responsive sidebar component with enhanced features
 *
 * Features:
 * - 100% height handling with scroll management
 * - Collapsible sidebar option
 * - Enhanced mobile experience with smooth animations
 * - Accessibility improvements
 * - Theme switcher with system preference detection
 * - Customizable header and footer sections
 * - Performance optimizations
 * - Responsive design with media query handling
 *
 * @example
 * ```tsx
 * <Sidebar
 *   title="Dashboard"
 *   collapsible={true}
 *   header={<CustomHeader />}
 *   footer={<CustomFooter />}
 * >
 *   <NavigationMenu items={navigationItems} />
 *   <UserPanel />
 * </Sidebar>
 * ```
 *
 * @developer_note
 * This component uses a combination of fixed and static positioning for optimal responsiveness.
 * Height is managed through flexbox and viewport units for consistent behavior across devices.
 * State management is handled through Zustand for performance and theme context for theming.
 */
const Sidebar: React.FC<SidebarProps> = (props) => {
  const {
    children,
    header,
    footer,
    title = 'Synapse',
    collapsible = false,
    showThemeSwitcher = true,
    className,
    brand
  } = props;

  const {sidebarOpen, setSidebarOpen} = useAppStore();
  const {theme, setTheme} = useTheme();

  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);

  const sidebarRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  // Initialize mounted state for client-side rendering
  useEffect(() => {
    setIsMounted(true);

    // Handle system theme preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        setTheme('system'); // This will trigger the theme update
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, setTheme]);

  // Handle collapsible state synchronization
  useEffect(() => {
    if (isDesktop && collapsible) {
      // Only allow collapsing on desktop when collapsible is enabled
      setSidebarOpen(true);
    } else if (!isDesktop) {
      // Reset collapsed state on mobile
      setSidebarCollapsed(false);
    }
  }, [isDesktop, collapsible, setSidebarOpen, setSidebarCollapsed]);

  // Handle click outside to close mobile sidebar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && !sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    if (sidebarOpen && !isDesktop) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarOpen, isDesktop, setSidebarOpen]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [sidebarOpen, setSidebarOpen]);

  // Calculate sidebar width based on state
  const sidebarWidth = isDesktop && sidebarCollapsed ? 'w-16' : 'w-64';
  const contentPadding = isDesktop && sidebarCollapsed ? 'pl-16' : 'pl-64';

  return (
    <>
      {/* Mobile overlay - appears when sidebar is open on mobile */}
      {(sidebarOpen && !isDesktop) && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ease-in-out"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main sidebar container with enhanced height handling */}
      <div
        ref={sidebarRef}
        className={cn(
          'fixed left-0 top-0 h-screen bg-background border-r border-border z-50 transition-all duration-300 ease-in-out',
          'flex flex-col',
          sidebarWidth,
          isMounted && (sidebarOpen || isDesktop) ? 'translate-x-0' : '-translate-x-full',
          isDesktop ? 'static z-0' : 'shadow-lg',
          className
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex flex-col h-full min-h-screen">
          {/* Header section with enhanced branding and controls */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            {header || (
              <div className="flex items-center space-x-3">
                {brand || (
                  <div className={cn(
                    'transition-all duration-300',
                    sidebarCollapsed && 'opacity-0'
                  )}>
                    <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">AI</span>
                    </div>
                  </div>
                )}
                <h1
                  className={cn(
                    'text-lg font-semibold transition-all duration-300',
                    sidebarCollapsed && 'opacity-0'
                  )}
                  aria-hidden={sidebarCollapsed}
                >
                  {title}
                </h1>
              </div>
            )}

            <div className="flex items-center space-x-2">
              {/* Collapsible toggle button */}
              {collapsible && isDesktop && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                      className="h-8 w-8"
                      aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                    >
                      {sidebarCollapsed ? (
                        <ChevronRight className="h-4 w-4" />
                      ) : (
                        <ChevronLeft className="h-4 w-4" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                  </TooltipContent>
                </Tooltip>
              )}

              {/* Mobile close button */}
              {!isDesktop && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(false)}
                  className="h-8 w-8"
                  aria-label="Close sidebar"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Main content area with improved scroll handling */}
          <div className="flex-1 overflow-y-auto py-4 px-2">
            <div className="space-y-1">
              {React.Children.map(children, (child) =>
                React.cloneElement(child as React.ReactElement, {
                  // @ts-ignore
                  collapsed: String(sidebarCollapsed && isDesktop)
                })
              )}
            </div>
          </div>

          {/* Footer section with theme switcher and custom content */}
          <div className="mt-auto p-2 border-t border-border">
            {footer ? (
              footer
            ) : showThemeSwitcher && (
              <>
                <div className={cn(
                  'flex items-center justify-between p-2',
                  sidebarCollapsed && 'justify-center'
                )}>
                  {!sidebarCollapsed && (
                    <span className="text-sm text-muted-foreground">Theme</span>
                  )}
                  <div className="flex items-center space-x-1">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={theme === 'light' ? 'default' : 'ghost'}
                          size="icon"
                          onClick={() => setTheme('light')}
                          className="h-8 w-8"
                          aria-label="Switch to light theme"
                        >
                          <Sun className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Light theme</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={theme === 'dark' ? 'default' : 'ghost'}
                          size="icon"
                          onClick={() => setTheme('dark')}
                          className="h-8 w-8"
                          aria-label="Switch to dark theme"
                        >
                          <Moon className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Dark theme</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={theme === 'system' ? 'default' : 'ghost'}
                          size="icon"
                          onClick={() => setTheme('system')}
                          className="h-8 w-8"
                          aria-label="Switch to system theme"
                        >
                          <Monitor className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>System theme</TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu toggle button with improved positioning */}
      {!isDesktop && (
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed top-4 left-4 z-50 rounded-full shadow-md"
          aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}

      {/* Desktop collapsible toggle button */}
      {isDesktop && collapsible && sidebarCollapsed && (
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSidebarCollapsed(false)}
          className="fixed top-4 left-4 z-40 rounded-full shadow-md"
          aria-label="Expand sidebar"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      )}

      {/* Content padding adjustment for desktop layout */}
      {isDesktop && (
        <div className={cn(
          'transition-all duration-300 ease-in-out fixed inset-0 pointer-events-none',
          contentPadding
        )} />
      )}
    </>
  );
};

export default Sidebar;
