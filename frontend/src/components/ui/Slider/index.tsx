/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, { useState, useMemo } from 'react';
import * as RacSlider from '@radix-ui/react-slider';
import { cn } from '~/utils/helpers';

export type SliderColor = 'indigo' | 'emerald' | 'rose' | 'amber' | 'cyan';
export type SliderSize = 'sm' | 'md' | 'lg';
export type ValueDisplayType = 'always' | 'hover' | 'drag';

export interface Mark {
  value: number;
  label?: string;
}

export interface SliderProps extends Omit<RacSlider.SliderProps, 'ref'> {
  /**
   * Current value of the slider (controlled).
   * If length > 1, it becomes a range slider.
   */
  value?: number[];

  /**
   * Default value (uncontrolled).
   */
  defaultValue?: number[];

  /**
   * Callback when value changes.
   */
  onValueChange?: (value: number[]) => void;

  /**
   * Format the value displayed in the tooltip/label.
   * (e.g., (val) => `$${val}`)
   */
  formatValue?: (value: number) => string | number;

  /**
   * Display the current value bubble.
   */
  showValue?: ValueDisplayType;

  /**
   * Minimum label text or node.
   */
  minLabel?: React.ReactNode;

  /**
   * Maximum label text or node.
   */
  maxLabel?: React.ReactNode;

  /**
   * Icon to display on the left.
   */
  iconLeft?: React.ReactNode;

  /**
   * Icon to display on the right.
   */
  iconRight?: React.ReactNode;

  /**
   * Marks/Steps to display on the track.
   */
  marks?: Mark[];

  /**
   * Color theme of the slider.
   * @default 'indigo'
   */
  color?: SliderColor;

  /**
   * Size variant of the slider.
   * @default 'md'
   */
  size?: SliderSize;

  /**
   * Custom container class for the root wrapper.
   */
  containerClassName?: string;

  /**
   * Class for the value tooltip bubble.
   */
  valueClassName?: string;
}

// --- Constants & Helpers ---

const COLOR_MAP: Record<SliderColor, { track: string; range: string; thumb: string; thumbBorder: string }> = {
  indigo: {
    track: 'bg-gray-200 dark:bg-gray-700',
    range: 'bg-indigo-500 dark:bg-indigo-400',
    thumb: 'bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-400',
    thumbBorder: 'border-white dark:border-gray-800',
  },
  emerald: {
    track: 'bg-gray-200 dark:bg-gray-700',
    range: 'bg-emerald-500 dark:bg-emerald-400',
    thumb: 'bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-400',
    thumbBorder: 'border-white dark:border-gray-800',
  },
  rose: {
    track: 'bg-gray-200 dark:bg-gray-700',
    range: 'bg-rose-500 dark:bg-rose-400',
    thumb: 'bg-rose-500 hover:bg-rose-600 dark:bg-rose-400',
    thumbBorder: 'border-white dark:border-gray-800',
  },
  amber: {
    track: 'bg-gray-200 dark:bg-gray-700',
    range: 'bg-amber-500 dark:bg-amber-400',
    thumb: 'bg-amber-500 hover:bg-amber-600 dark:bg-amber-400',
    thumbBorder: 'border-white dark:border-gray-800',
  },
  cyan: {
    track: 'bg-gray-200 dark:bg-gray-700',
    range: 'bg-cyan-500 dark:bg-cyan-400',
    thumb: 'bg-cyan-500 hover:bg-cyan-600 dark:bg-cyan-400',
    thumbBorder: 'border-white dark:border-gray-800',
  },
};

const SIZE_MAP: Record<SliderSize, { thumbSize: string; trackHeight: string; textSize: string }> = {
  sm: { thumbSize: 'h-4 w-4', trackHeight: 'h-1.5', textSize: 'text-[10px]' },
  md: { thumbSize: 'h-5 w-5', trackHeight: 'h-2', textSize: 'text-xs' },
  lg: { thumbSize: 'h-6 w-6', trackHeight: 'h-[10px]', textSize: 'text-sm' },
};

// --- Sub-Components ---

interface ThumbProps extends RacSlider.SliderThumbProps {
  color: SliderColor;
  size: SliderSize;
  value: number;
  showValue: ValueDisplayType;
  formatValue?: (value: number) => string | number;
  valueClassName?: string;
}

const SliderThumb = React.forwardRef<HTMLDivElement, ThumbProps>(
  ({ className, color, size, value, showValue, formatValue, valueClassName, children, ...props }, ref) => {
    const styles = COLOR_MAP[color];
    const sizeStyles = SIZE_MAP[size];
    const isDragRef = React.useRef(false);
    const [isHovered, setIsHovered] = useState(false);

    const displayValue = useMemo(() => {
      return formatValue ? formatValue(value) : value;
    }, [value, formatValue]);

    const shouldShowValue =
      showValue === 'always' ||
      (showValue === 'hover' && (isHovered || isDragRef.current)) ||
      (showValue === 'drag' && isDragRef.current);

    return (
      <RacSlider.Thumb
        ref={ref}
        className={cn(
          'relative block shrink-0 rounded-full border-2 shadow-[0_2px_10px_rgba(0,0,0,0.1)] ring-offset-2 transition-all duration-150 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          styles.thumb,
          styles.thumbBorder,
          sizeStyles.thumbSize,
          'focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900',
          className
        )}
        onPointerDown={() => (isDragRef.current = true)}
        onPointerUp={() => (isDragRef.current = false)}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
        {...props}
      >
        {children}
        {shouldShowValue && (
          <div
            className={cn(
              'absolute -top-10 left-1/2 -translate-x-1/2 flex items-center justify-center rounded-md px-2 py-1 text-white shadow-lg whitespace-nowrap transition-opacity duration-200 animate-in fade-in slide-in-from-bottom-1',
              styles.range, // Background matches range color
              sizeStyles.textSize,
              valueClassName
            )}
            onPointerDown={(e) => e.stopPropagation()} // Prevent drag start when clicking tooltip
          >
            {displayValue}
            <div className={cn('absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 rotate-45', styles.range)} />
          </div>
        )}
      </RacSlider.Thumb>
    );
  }
);
SliderThumb.displayName = 'SliderThumb';

// --- Main Component ---

const Slider = React.forwardRef<HTMLDivElement, SliderProps>((props, ref) => {
  const {
    className,
    containerClassName,
    valueClassName,
    value: controlledValue,
    defaultValue = [0],
    onValueChange,
    min = 0,
    max = 100,
    step = 1,
    minLabel,
    maxLabel,
    iconLeft,
    iconRight,
    marks = [],
    color = 'indigo',
    size = 'md',
    showValue = 'hover',
    formatValue,
    disabled,
    ...rest
  } = props;

  // Determine if this is a range slider
  const isRange = (controlledValue || defaultValue).length > 1;
  const currentValues = controlledValue || defaultValue;

  const styles = COLOR_MAP[color];
  const sizeStyles = SIZE_MAP[size];

  return (
    <div ref={ref} className={cn('w-full space-y-3', containerClassName)}>
      {/* Header Section: Labels and Icons */}
      {(minLabel || maxLabel || iconLeft || iconRight) && (
        <div className="flex items-center justify-between text-sm font-medium text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            {iconLeft && <span className="text-gray-500 dark:text-gray-400">{iconLeft}</span>}
            {minLabel && <span>{minLabel}</span>}
          </div>

          {/* Center value for non-range sliders when not dragging (optional view) */}
          {/* eslint-disable-next-line no-constant-binary-expression */}
          {!isRange && showValue === 'always' && false && (
            <span className="text-gray-900 dark:text-white">
               {formatValue ? formatValue?.(currentValues[0]) : currentValues[0]}
             </span>
          )}

          <div className="flex items-center gap-2">
            {maxLabel && <span>{maxLabel}</span>}
            {iconRight && <span className="text-gray-500 dark:text-gray-400">{iconRight}</span>}
          </div>
        </div>
      )}

      <div className="relative w-full pt-1"> {/* Padding for tooltip overflow */}
        <RacSlider.Root
          className={cn('relative flex w-full touch-none select-none items-center', className)}
          value={controlledValue}
          defaultValue={defaultValue}
          onValueChange={onValueChange}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          {...rest}
        >
          <RacSlider.Track
            className={cn(
              'relative w-full grow overflow-hidden rounded-full',
              styles.track,
              sizeStyles.trackHeight
            )}
          >
            <RacSlider.Range className={cn('absolute h-full rounded-full', styles.range)} />
          </RacSlider.Track>

          {/* Dynamic Thumbs */}
          {currentValues.map((val, index) => (
            <SliderThumb
              key={index}
              value={val}
              color={color}
              size={size}
              showValue={showValue}
              formatValue={formatValue}
              valueClassName={valueClassName}
              aria-label={`Volume ${index + 1}`}
            />
          ))}
        </RacSlider.Root>

        {/* Marks / Ticks */}
        {marks.length > 0 && (
          <div className="absolute left-0 right-0 top-[6px] flex justify-between px-0 pointer-events-none">
            {marks.map((mark, i) => {
              // Calculate percentage position
              const percentage = ((mark.value - min) / (max - min)) * 100;

              return (
                <div
                  key={i}
                  className="absolute flex flex-col items-center group"
                  style={{ left: `${percentage}%`, transform: 'translateX(-50%)' }}
                >
                  {/* Tick Line */}
                  <div
                    className={cn(
                      'w-[1px] bg-gray-300 dark:bg-gray-600 mb-1',
                      size === 'lg' ? 'h-2' : 'h-1.5'
                    )}
                  />
                  {/* Tick Label */}
                  {mark.label && (
                    <span className={cn(
                      'text-[10px] text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors',
                      sizeStyles.textSize
                    )}>
                      {mark.label}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
});

Slider.displayName = 'Slider';

export default Slider;
