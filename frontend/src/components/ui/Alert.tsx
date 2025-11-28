import React from 'react';
import { cn } from '../../utils/helpers';

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

export const AlertDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className,
  ...props
}) => (
  <div
    className={cn('text-sm [&_p]:leading-relaxed', className)}
    {...props}
  />
);