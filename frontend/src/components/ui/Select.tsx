import React from 'react';
import { cn } from '../../utils/helpers';

/**
 * Props for the Select component.
 * @extends React.SelectHTMLAttributes<HTMLSelectElement>
 */
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** Optional label displayed above the select input */
  label?: string;
  /** Optional error message displayed below the select input */
  error?: string;
  /** Array of options to populate the select */
  options: Array<{ value: string; label: string; disabled?: boolean }>;
}

/**
 * A customizable select dropdown component with label, error, and styling support.
 *
 * @example
 * ```tsx
 * <Select
 *   label="Choose a fruit"
 *   options={[
 *     { value: 'apple', label: 'Apple' },
 *     { value: 'banana', label: 'Banana', disabled: true },
 *   ]}
 *   onChange={(e) => console.log(e.target.value)}
 * />
 * ```
 *
 * @developer
 * - Uses Tailwind CSS for styling
 * - Combines default styles with any additional className via cn utility
 * - Automatically applies error styling when error prop is provided
 * - Supports all standard HTML select attributes
 */
export const Select: React.FC<SelectProps> = ({
  className,
  label,
  error,
  options,
  ...props
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
        </label>
      )}
      <select
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          error && 'border-destructive',
          className
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
};
