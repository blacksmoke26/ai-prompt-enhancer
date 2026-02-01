/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {
  Children,
  cloneElement,
  useCallback,
  useEffect,
  useRef,
  useState,
  ReactElement,
  ReactNode,
  isValidElement,
} from 'react';
import {useTheme} from '~/components/ThemeProvider';
import {ChevronLeft, ChevronRight} from 'lucide-react';

/**
 * Configuration constants
 */
const SIZE_PRESETS = {
  sm: {container: 'py-2', btn: 'p-1.5', gap: '0.75rem', icon: 'w-3 h-3'},
  md: {container: 'py-4', btn: 'p-2', gap: '1.5rem', icon: 'w-4 h-4'},
  lg: {container: 'py-6', btn: 'p-3', gap: '2rem', icon: 'w-6 h-6'},
} as const;

const VARIANTS = {
  solid: 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-md',
  ghost: 'bg-transparent hover:bg-black/5 dark:hover:bg-white/10 border-transparent',
  glass: 'bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 shadow-lg',
} as const;

type SizePreset = keyof typeof SIZE_PRESETS;
type VariantPreset = keyof typeof VARIANTS;
type AnimationType = 'fade' | 'slide-up' | 'none';

export interface ItemsNavigatorProps {
  /** Child elements to be navigated */
  children: ReactNode;
  /** Preset size for the navigator */
  size?: SizePreset;
  /** Visual style of the navigator controls */
  variant?: VariantPreset;
  /** Border radius style */
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  /** If true, navigation buttons have a transparent background */
  bgTransparent?: boolean;
  /** Type of animation for items entering */
  animation?: AnimationType;
  /** Custom gap between items */
  gap?: string;
  /** If true, display the header section */
  showTitle?: boolean;
  /** Title displayed above */
  title?: string;
  /** Action buttons displayed alongside title */
  options?: ReactNode;
  /** Additional CSS classes for the main container */
  className?: string;
  /** If true, displays a progress bar */
  showProgress?: boolean;
  /** Color of the progress bar (Tailwind class) */
  progressColor?: string;
  /** Fixed width for items. Defaults to 'auto' */
  itemWidth?: string | number;
  /** Hide navigation arrows */
  hideArrows?: boolean;
  /** Hide the browser's horizontal scrollbar */
  hideScrollbar?: boolean;
  /** Scroll snap behavior */
  snapType?: 'none' | 'mandatory' | 'proximity';
  /** Percentage of container width to scroll */
  scrollStepPercentage?: number;
  /** Custom left arrow icon */
  arrowLeftIcon?: ReactNode;
  /** Custom right arrow icon */
  arrowRightIcon?: ReactNode;
  /** Callbacks */
  onBackClick?: () => void;
  onNextClick?: () => void;
  onSelect?: (index: number) => void;
}

const ItemsNavigator: React.FC<ItemsNavigatorProps> = (props) => {
  const {
    children,
    size = 'md',
    variant = 'solid',
    rounded = 'lg',
    bgTransparent = false,
    animation = 'fade',
    gap,
    title = 'Navigation',
    options,
    className = '',
    showProgress = true,
    showTitle = true,
    progressColor = 'bg-blue-500 dark:bg-blue-400',
    itemWidth = 'auto',
    hideArrows = false,
    hideScrollbar = true, // New Prop Defaulting to true
    snapType = 'mandatory',
    scrollStepPercentage = 0.8,
    onBackClick,
    onNextClick,
    onSelect,
    arrowLeftIcon: CustomLeftIcon,
    arrowRightIcon: CustomRightIcon,
  } = props;

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const {theme} = useTheme();

  const actualGap = gap || SIZE_PRESETS[size].gap;
  const sizeStyles = SIZE_PRESETS[size];
  const isDark = theme === 'dark';

  // Calculate padding to prevent content hiding behind arrows
  const arrowPadding = hideArrows ? '0' : size === 'lg' ? '4rem' : size === 'sm' ? '2.5rem' : '3rem';

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * scrollStepPercentage;
    const targetScroll = direction === 'left'
      ? container.scrollLeft - scrollAmount
      : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth',
    });
  };

  const checkScrollability = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 1);
    setCanScrollRight(
      Math.ceil(container.scrollLeft + container.clientWidth) < container.scrollWidth - 1,
    );
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    checkScrollability();

    const resizeObserver = new ResizeObserver(() => checkScrollability());
    resizeObserver.observe(container);

    const scrollListener = () => checkScrollability();

    container.addEventListener('scroll', scrollListener);
    window.addEventListener('resize', scrollListener);

    return () => {
      container.removeEventListener('scroll', scrollListener);
      window.removeEventListener('resize', scrollListener);
      resizeObserver.disconnect();
    };
  }, [checkScrollability, children, actualGap]);

  const getButtonVariant = () => {
    if (bgTransparent) return 'bg-white/10 dark:bg-white/5 hover:bg-white/20 backdrop-blur text-current border-none';

    const baseVariant = VARIANTS[variant];
    const textClass = 'text-slate-700 dark:text-slate-200';
    const hoverClass = 'hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white';

    return `${baseVariant} ${textClass} ${hoverClass} transition-all duration-300`;
  };

  const getRoundedClass = () => {
    if (rounded === 'full') return 'rounded-full';
    return `rounded-${rounded}`;
  };

  const getAnimationClass = () => {
    if (animation === 'fade') return 'animate-fade-in';
    if (animation === 'slide-up') return 'animate-slide-up';
    return '';
  };

  return (
    <div className={`w-full flex flex-col ${className}`}>
      {/* Header Section */}
      {showTitle && (title || options) && (
        <div className="flex items-center justify-between mb-3 px-1">
          {title && (
            <h2 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {title}
            </h2>
          )}
          {options && <div className="flex items-center gap-2">{options}</div>}
        </div>
      )}

      {/* Scroll Container Wrapper */}
      <div className="relative group/navigator">

        {/* Navigation Buttons */}
        {!hideArrows && (
          <>
            <button
              onClick={() => {
                scroll('left');
                onBackClick?.();
              }}
              disabled={!canScrollLeft}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center shadow-lg disabled:opacity-0 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${sizeStyles.btn} ${getRoundedClass()} ${getButtonVariant()}`}
              aria-label="Scroll left"
            >
              {CustomLeftIcon || <ChevronLeft className={sizeStyles.icon}/>}
            </button>

            <button
              onClick={() => {
                scroll('right');
                onNextClick?.();
              }}
              disabled={!canScrollRight}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center shadow-lg disabled:opacity-0 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${sizeStyles.btn} ${getRoundedClass()} ${getButtonVariant()}`}
              aria-label="Scroll right"
            >
              {CustomRightIcon || <ChevronRight className={sizeStyles.icon}/>}
            </button>
          </>
        )}

        {/* The Scrollable Area */}
        <div
          ref={scrollRef}
          className={`
            flex overflow-x-auto
            ${hideScrollbar ? 'no-scrollbar' : ''}
            snap-x snap-${snapType}
            cursor-grab active:cursor-grabbing 
            ${sizeStyles.container} 
            select-none scroll-smooth
          `}
          style={{gap: actualGap}}
        >
          {Children.map(children, (child, i) => {
            if (!isValidElement(child)) return null;

            return (
              <div
                key={i}
                className={`
                  flex-shrink-0 snap-center 
                  opacity-0 ${getAnimationClass()} 
                  transition-transform duration-300 hover:scale-[1.02]
                `}
                style={{
                  width: itemWidth,
                  animationDelay: `${i * 50}ms`,
                  animationFillMode: 'forwards',
                }}
                onClick={() => onSelect?.(i)}
              >
                {cloneElement(child as ReactElement, {
                  // @ts-ignore
                  className: `${child.props.className || ''} h-full`,
                  onClick: () => onSelect?.(i),
                })}
              </div>
            );
          })}

          {/* Empty space at the end for better scrolling feel */}
          <div className="w-4 flex-shrink-0"/>
        </div>

        {/* Progress Bar */}
        {showProgress && (
          <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-100 dark:bg-slate-800/50 overflow-hidden">
            <div
              className={`h-full ${progressColor} transition-all duration-150 ease-out`}
              style={{
                width: scrollRef.current
                  ? `${(scrollRef.current.scrollLeft / (scrollRef.current.scrollWidth - scrollRef.current.clientWidth || 1)) * 100}%`
                  : '0%',
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemsNavigator;
