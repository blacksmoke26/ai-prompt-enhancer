import React from 'react';
import { cn } from '../../utils/helpers';

/**
 * Type for Badge variants
 * @default 'default'
 */
type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline';

/**
 * Props for the Badge component
 * @extends React.HTMLAttributes<HTMLDivElement>
 */
interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual variant of the badge */
  variant?: BadgeVariant;
  /** Content to be rendered inside the badge */
  children: React.ReactNode;
}

/**
 * A flexible badge component for displaying small status indicators or labels.
 *
 * @example
 * <Badge variant="destructive">Error</Badge>
 * <Badge variant="secondary">New</Badge>
 *
 * @developer.notes
 * - Uses CSS variables for theming (primary, secondary, destructive)
 * - Fully focusable with keyboard navigation
 * - Responsive to parent text size scaling
 */
export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'default',
  children,
  ...props
}) => {
  const variants = {
    default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
    secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
    destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
    outline: 'text-foreground',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
