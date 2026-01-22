/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
// Assuming you use lucide-react for icons, if not, replace with your own SVG component
import { Loader2 } from 'lucide-react';

// utils
import { cn } from '~/utils/helpers';

/**
 * Props for the Button component.
 * Extends HTML button attributes to maintain native button functionality.
 */
export type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'plain' | 'gradient';
export type ButtonSize = 'default' | 'sm' | 'lg' | 'xs' | 'icon';
export type ButtonShape = 'default' | 'rounded' | 'square' | 'pill';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant of the button */
  variant?: ButtonVariant;
  /** Size variation of the button */
  size?: ButtonSize;
  /** Shape variation of the button border radius */
  shape?: ButtonShape;
  /** Content to be rendered inside the button */
  children: React.ReactNode;
  /** Displays a loading spinner and disables interactions */
  loading?: boolean;
  /** Icon to be displayed before the text */
  leftIcon?: React.ReactNode;
  /** Icon to be displayed after the text */
  rightIcon?: React.ReactNode;
  /** Forces the button to take the full width of its container */
  fullWidth?: boolean;
}

/**
 * A flexible button component with multiple variants, sizes, and states.
 *
 * @example
 * ```tsx
 * // Loading State with Icon
 * <Button variant="primary" loading leftIcon={<SaveIcon />}>
 *   Saving...
 * </Button>
 * ```
 *
 * @example
 * ```tsx
 * // Full width Gradient Pill Button
 * <Button variant="gradient" shape="pill" fullWidth>
 *   Subscribe Now
 * </Button>
 * ```
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
     className,
     variant = 'default',
     size = 'default',
     shape = 'default',
     children,
     loading = false,
     leftIcon,
     rightIcon,
     fullWidth = false,
     disabled,
     type = 'button',
     ...props
   }, ref) => {

    // Base styles: Added gap-2 for automatic spacing between icons and text
    const baseStyles = 'inline-flex items-center justify-center font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 transition-transform gap-2';

    const variants: Record<ButtonVariant, string> = {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm',
      outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-sm',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      plain: 'bg-transparent hover:bg-transparent shadow-none',
      link: 'text-primary underline-offset-4 hover:underline shadow-none',
      gradient: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90 shadow-md border-0',
    };

    const sizes: Record<ButtonSize, string> = {
      default: 'h-10 px-4 py-2 text-sm',
      sm: 'h-9 rounded-md px-3 text-xs',
      lg: 'h-11 rounded-md px-8 text-base',
      xs: 'h-8 w-8 p-0 text-xs', // Useful for small icon buttons
      icon: 'h-10 w-10 p-0',
    };

    const shapes: Record<ButtonShape, string> = {
      default: 'rounded-md',
      rounded: 'rounded-lg',
      square: 'rounded-none',
      pill: 'rounded-full',
    };

    // Merge styles dynamically
    const computedClasses = cn(
      baseStyles,
      variants[variant],
      sizes[size],
      shapes[shape],
      fullWidth && 'w-full',
      className
    );

    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type={type}
        className={computedClasses}
        disabled={isDisabled}
        {...props}
      >
        {/* Left Icon: Hide if loading to prevent clutter, or keep if preferred. Here we hide. */}
        {!loading && leftIcon && (
          <span className="inline-flex items-center justify-center">
            {leftIcon}
          </span>
        )}

        {/* Loading Spinner */}
        {loading && (
          <Loader2 className="h-4 w-4 animate-spin" />
        )}

        {/* Button Content: We wrap children in a span to allow specific styling if needed */}
        <span className={cn(loading && 'opacity-70')}>{children}</span>

        {/* Right Icon: Hidden if loading */}
        {!loading && rightIcon && (
          <span className="inline-flex items-center justify-center">
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
