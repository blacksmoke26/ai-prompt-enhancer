/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import { cn } from '~/utils/helpers.ts';

export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

/**
 * Switch component for toggle switches
 * @example
 * <Switch checked={true} onCheckedChange={(checked) => console.log(checked)} />
 * @developer
 * Uses a checkbox input hidden visually but accessible to screen readers
 * and a styled toggle thumb that moves based on the checked state
 */
export const Switch: React.FC<SwitchProps> = ({ className, checked, onCheckedChange, ...props }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onCheckedChange) {
      onCheckedChange(event.target.checked);
    }
  };

  return (
    <div className={cn('relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background', className)}>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        className="sr-only"
        {...props}
      />
      <span
        className={cn(
          'inline-block w-4 h-4 transform bg-white rounded-full duration-200 ease-in-out',
          checked ? 'translate-x-6' : 'translate-x-1'
        )}
      />
    </div>
  );
};
