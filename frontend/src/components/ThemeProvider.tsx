/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {createContext, useContext, useEffect, useState} from 'react';

// store
import {useAppStore} from '~/stores/appStore';

/** Available theme options for the application */
export type ResolveTheme = 'light' | 'dark';

/** Available theme options for the application */
export type Theme = ResolveTheme | 'system';

/** Theme context interface providing theme state and controls */
export interface ThemeContextType {
  /** Currently selected theme preference */
  theme: Theme;

  /** Function to update the theme preference */
  setTheme(theme: Theme): void;

  /** Resolved theme after considering system preference */
  resolvedTheme: 'light' | 'dark';

  isDarkTheme: boolean;

  isLightTheme: boolean;
}

/** Context for sharing theme state throughout the application */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Provider component that manages theme state and DOM updates
 * @param children - React components that will receive theme context
 * @returns Theme provider component
 * @example
 * ```tsx
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 * ```
 * @developer-notes
 * - Listens to system theme changes when 'system' theme is selected
 * - Updates DOM classes for CSS-based theming
 * - Persists theme preference via app store
 */
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const {theme, setTheme} = useAppStore();
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const updateTheme = () => {
      let newResolvedTheme: 'light' | 'dark';

      if (theme === 'system') {
        newResolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      } else {
        newResolvedTheme = theme;
      }

      setResolvedTheme(newResolvedTheme);

      // Update DOM
      const root = document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(newResolvedTheme);
    };

    updateTheme();

    // Listen for system theme changes
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', updateTheme);

      return () => {
        mediaQuery.removeEventListener('change', updateTheme);
      };
    }
  }, [theme]);

  const value = {
    theme,
    isDarkTheme: resolvedTheme === 'dark',
    isLightTheme: resolvedTheme === 'light',
    setTheme,
    resolvedTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Hook to access theme context state and controls
 * @returns Theme context object with theme state and setters
 * @example
 * ```tsx
 * const { theme, setTheme, resolvedTheme } = useTheme();
 * setTheme('dark');
 * ```
 * @developer-notes
 * - Must be used within a ThemeProvider component
 * - Throws error if used outside provider context
 */
// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
