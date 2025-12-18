import React from 'react';
import { cn } from '../../utils/helpers';

/**
 * Props for the Button component.
 * Extends HTML button attributes to maintain native button functionality.
 */
type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'plain';
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant of the button */
  variant?: ButtonVariant;
  /** Size variation of the button */
  size?: ButtonSize;
  /** Content to be rendered inside the button */
  children: React.ReactNode;
}

/**
 * A flexible button component with multiple variants and sizes.
 *
 * @example
 * ```tsx
 * <Button variant="destructive" size="lg" onClick={handleClick}>
 *   Delete Item
 * </Button>
 * ```
 *
 * @example
 * ```tsx
 * <Button variant="outline" size="icon">
 *   <Icon />
 * </Button>
 * ```
 *
 * @developer_notes
 * - Uses Tailwind CSS classes for styling
 * - Combines base styles with variant and size modifiers
 * - Maintains full accessibility with focus states
 * - Supports all standard HTML button attributes
 */
export const Button: React.FC<ButtonProps> = ({
  className,
  variant = 'default',
  size = 'default',
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    plain: '',
    link: 'text-primary underline-offset-4 hover:underline',
  };

  const sizes = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 rounded-md px-3',
    lg: 'h-11 rounded-md px-8',
    icon: 'h-10 w-10',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};
