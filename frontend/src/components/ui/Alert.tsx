import React from 'react';
import { cn } from '../../utils/helpers';

/**
 * Alert component for displaying important messages with different severity levels.
 * @example
 * <Alert variant="destructive">This is an error message</Alert>
 * @developer.notes The component uses a role="alert" for screen readers and supports both default and destructive variants.
 */
interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'destructive';
}

export const Alert: React.FC<AlertProps> = ({ className, variant = 'default', children, ...props }) => {
  const variants = {
    default: 'bg-background text-foreground border-border',
    destructive: 'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
  };

  return (
    <div
      role="alert"
      className={cn(
        'relative w-full rounded-lg border p-4',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * AlertDescription component for providing additional context within an Alert.
 * @example
 * <AlertDescription>Please check your input and try again.</AlertDescription>
 * @developer.notes This component renders as a div with text-sm styling and supports paragraph elements with relaxed line height.
 */
export const AlertDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className,
  ...props
}) => (
  <div
    className={cn('text-sm [&_p]:leading-relaxed', className)}
    {...props}
  />
);
