/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';

export interface StatCircleProps {
  /** The label text to display below the circle */
  label: string,
  /** The value text to display inside the circle */
  value: string,
  /** The border color of the circle */
  color: string,
  /** Optional size of the circle in pixels (default: 40) */
  size?: number
}

/**
 * StatCircle component renders a circular stat display with a label and value.
 * Developer notes: Uses dynamic inline styles for size and color customization.
 */
const StatCircle: React.FC<StatCircleProps> = ({label, value, color, size = 40}) => (
  <div className="flex flex-col items-center justify-center gap-2">
    <div
      className="rounded-full flex items-center justify-center border-2 border-background shadow-lg relative"
      style={{
        width: size,
        height: size,
        borderColor: color,
        backgroundColor: `${color}20`,
      }}
    >
      <span className="text-xs font-bold" style={{color}}>{value}</span>
    </div>
    <span className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider">{label}</span>
  </div>
);

export default StatCircle;
