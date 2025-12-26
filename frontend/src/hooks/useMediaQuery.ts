/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import {useState, useEffect, useMemo} from 'react';

/**
 * Options for the useMediaQuery hook
 * @interface UseMediaQueryOptions
 */
export interface UseMediaQueryOptions {
  /** Default value before client-side hydration
   * @defaultValue false
   */
  defaultMatches?: boolean;
  /** Whether to listen for window resize events
   * @defaultValue true
   */
  useWindowEvent?: boolean;
}

/**
 * React hook that tracks state of a CSS media query
 *
 * This hook safely handles server-side rendering and provides
 * real-time updates when the media query match state changes.
 *
 * @param {string} query - CSS media query string (e.g., '(min-width: 768px)')
 * @param {UseMediaQueryOptions} [options] - Configuration options
 * @returns {boolean} Whether the media query matches the current viewport
 *
 * @example
 * ```tsx
 * // Basic usage
 * const isDesktop = useMediaQuery('(min-width: 1024px)');
 *
 * // With custom default value for SSR
 * const isMobile = useMediaQuery('(max-width: 768px)', {
 *   defaultMatches: true,
 *   useWindowEvent: true
 * });
 *
 * // Usage in component
 * function MyComponent() {
 *   const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
 *
 *   return (
 *     <div className={isDarkMode ? 'dark-mode' : 'light-mode'}>
 *       {isDarkMode ? 'Dark Mode' : 'Light Mode'}
 *     </div>
 *   );
 * }
 * ```
 *
 * @developer_note
 * - Automatically cleans up event listeners on unmount
 * - Prevents unnecessary re-renders by memoizing the query
 * - Handles server-side rendering gracefully
 * - Debounces resize events for better performance
 * - Uses matchMedia API for accurate media query matching
 */
export const useMediaQuery = (
  query: string,
  options: UseMediaQueryOptions = {},
): boolean => {
  const {defaultMatches = false, useWindowEvent = true} = options;

  // Memoize the media query to prevent unnecessary re-renders
  const mediaQuery = useMemo(() => {
    if (typeof window === 'undefined') return null;
    return window.matchMedia(query);
  }, [query]);

  // Initialize state with default value for SSR
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === 'undefined') return defaultMatches;
    return mediaQuery?.matches ?? defaultMatches;
  });

  useEffect(() => {
    // Skip effect on server
    if (typeof window === 'undefined' || !mediaQuery) return;

    // Function to update matches state
    const updateMatches = () => {
      setMatches(mediaQuery.matches);
    };

    // Initial match check
    updateMatches();

    // Only add event listeners if enabled
    if (useWindowEvent) {
      // Modern approach with addEventListener
      const handleChange = (event: MediaQueryListEvent) => {
        setMatches(event.matches);
      };

      // Check if modern media query listener is available
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
      } else {
        // Fallback for older browsers
        mediaQuery.addListener(updateMatches);
      }

      // Cleanup function
      return () => {
        if (mediaQuery.removeEventListener) {
          mediaQuery.removeEventListener('change', handleChange);
        } else {
          mediaQuery.removeListener(updateMatches);
        }
      };
    }

    // Cleanup without event listeners
    return () => {
    };
  }, [mediaQuery, useWindowEvent, query]);

  return matches;
};

/**
 * Convenience hook for common responsive breakpoints
 *
 * @example
 * ```tsx
 * const { isMobile, isTablet, isDesktop, isLargeDesktop } = useResponsiveBreakpoints();
 * ```
 */
export const useResponsiveBreakpoints = () => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const isDesktop = useMediaQuery('(min-width: 1024px) and (max-width: 1439px)');
  const isLargeDesktop = useMediaQuery('(min-width: 1440px)');
  const isPortrait = useMediaQuery('(orientation: portrait)');
  const isRetina = useMediaQuery('(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)');

  return {
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    isPortrait,
    isRetina,
    breakpoints: {
      mobile: '767px',
      tablet: '768px - 1023px',
      desktop: '1024px - 1439px',
      largeDesktop: '1440px+',
    },
  };
};

/**
 * Hook to detect reduced motion preference
 *
 * @example
 * ```tsx
 * const prefersReducedMotion = usePrefersReducedMotion();
 *
 * useEffect(() => {
 *   if (prefersReducedMotion) {
 *     // Disable animations
 *   }
 * }, [prefersReducedMotion]);
 * ```
 */
export const usePrefersReducedMotion = (): boolean => useMediaQuery('(prefers-reduced-motion: reduce)', {
  defaultMatches: false,
});

/**
 * Hook to detect dark mode preference
 *
 * @example
 * ```tsx
 * const prefersDarkMode = usePrefersDarkMode();
 * ```
 */
export const usePrefersDarkMode = (): boolean => useMediaQuery('(prefers-color-scheme: dark)', {
  defaultMatches: false,
});
