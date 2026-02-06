/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {cn} from '~/utils/helpers.ts';

export interface StatItemProps {
  /** The icon to display alongside the label */
  icon: React.ReactNode;
  /** The descriptive text label for the stat */
  label: string;
  /** The numerical or string value to display */
  value: string | number;
  warning?: boolean;
}

/**
 * A component that displays a stat with an icon, label, and value.
 */
const StatItem: React.FC<StatItemProps> = (props) => {
  const {icon, label, value, warning} = props;

  return (
    <div className={cn('flex items-center gap-2 text-xs transition-colors', warning ? 'text-destructive font-bold' : 'text-muted-foreground')}>
      {icon}
      <span className="hidden sm:inline">{label}:</span>
      <span>{value}</span>
    </div>
  );
};

export default StatItem;
