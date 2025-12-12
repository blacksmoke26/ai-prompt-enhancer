import React from 'react';
import { cn } from '~/utils/helpers.ts';

/**
 * Input component props extending HTML input attributes
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Optional label text displayed above the input */
  label?: string;
  /** Error message displayed below the input */
  error?: string;
}

/**
 * Customizable input field with optional label and error states
 *
 * @example
 * <Input
 *   label="Email"
 *   type="email"
 *   placeholder="Enter your email"
 *   error="Invalid email format"
 *   className="w-full"
 * />
 *
 * @developer_notes
 * - Uses Tailwind CSS for styling with focus and disabled states
 * - Error state adds destructive border color and shows error message
 * - Supports all standard HTML input attributes
 * - Combines custom className with default styles using cn utility
 */
export const Input: React.FC<InputProps> = ({
  className,
  type = 'text',
  label,
  error,
  ...props
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
        </label>
      )}
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
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
};
