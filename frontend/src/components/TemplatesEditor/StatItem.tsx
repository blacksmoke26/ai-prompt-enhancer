/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';

export interface StatItemProps {
  /** The icon to display alongside the label */
  icon: React.ReactNode;
  /** The descriptive text label for the stat */
  label: string;
  /** The numerical or string value to display */
  value: string | number;
}

/**
 * A component that displays a stat with an icon, label, and value.
 */
const StatItem: React.FC<StatItemProps> = ({icon, label, value}) => {
  return (
    <div className="flex items-center justify-between text-xs">
      <div className="flex items-center gap-2 text-muted-foreground">
        <span className="shrink-0">{icon}</span>
        <span>{label}</span>
      </div>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  );
};

export default StatItem;
