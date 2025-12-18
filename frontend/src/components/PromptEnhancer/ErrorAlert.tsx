/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import { AlertCircle } from 'lucide-react';

// ui components
import { Alert, AlertDescription } from '~/components/ui/Alert';

/**
 * Props for the ErrorAlert component.
 * @interface ErrorAlertProps
 * @property {string | null} error - The error message to display. If null, no alert is shown.
 * @property {string} [className=''] - Optional additional CSS classes for styling the alert.
 */
interface ErrorAlertProps {
  error: string | null;
  className?: string;
}

/**
 * ErrorAlert component displays an error message in a styled alert box.
 * @component
 * @example
 * ```tsx
 * <ErrorAlert error="Something went wrong" className="mt-4" />
 * ```
 * @developer.notes Ensure the error prop is a string or null. The component will render nothing if error is null or empty.
 */
const ErrorAlert: React.FC<ErrorAlertProps> = ({ error, className = '' }) => {
  if (!error) return null;

  return (
    <Alert variant="destructive" className={`flex justify-start space-x-2 items-center` + className}>
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );
};

export default ErrorAlert;
