import React from 'react';
import { cn } from '../../utils/helpers';

/**
 * Textarea component with optional label and error display.
 *
 * @example
 * <Textarea
 *   label="Message"
 *   placeholder="Type your message here..."
 *   error="This field is required"
 *   className="max-w-md"
 * />
 *
 * @developerNotes
 * - Extends all standard textarea HTML attributes
 * - Automatically applies error styling when error prop is provided
 * - Uses Tailwind's cn utility for conditional class merging
 * - Label and error message are optional and render conditionally
 */
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Optional label text displayed above the textarea */
  label?: string;
  /** Error message to display below the textarea */
  error?: string;
  /** Additional CSS classes to apply to the textarea */
  className?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({
  className,
  label,
  error,
  ...props
}, ref) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        className={cn(
          'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          error && 'border-destructive',
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
});
