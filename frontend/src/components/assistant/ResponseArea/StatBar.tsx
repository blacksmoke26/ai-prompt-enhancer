/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';

/**
 * Defines the properties required for the StatBar component to function correctly.
 *
 * @developer Notes:
 * - The `color` prop uses inline styles for dynamic background coloring.
 * - The `max` prop must be a positive number to avoid division by zero.
 */
export interface StatBarProps {
  /** The label text displayed above the progress bar. */
  label: string;

  /** The current numeric value of the stat. */
  value: number;

  /** The maximum possible value for the stat. */
  max: number;

  /** The hexadecimal color code or CSS color string for the bar fill. */
  color: string;
}

const StatBar: React.FC<StatBarProps> = (props) => {
  const {label, value, max, color} = props;
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="w-full mb-2">
      <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
        <span>{label}</span>
        <span className="font-mono">{value}</span>
      </div>
      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{width: `${percentage}%`, backgroundColor: color}}
        />
      </div>
    </div>
  );
};

export default StatBar;
