/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';

// utils
import {cn} from '~/utils/helpers';

export interface ProgressBarProps {
  value: number;
  max: number;
  colorClass?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = (props) => {
  const {value, max, colorClass} = props;

  let percentage = Math.min((value / max) * 100, 100);
  if (percentage > 100) percentage = 100;


  return (
    <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
      <div
        className={cn('h-full transition-all duration-300 ease-out', colorClass || 'bg-primary')}
        style={{width: `${percentage}%`}}
      />
    </div>
  );
};

export default ProgressBar;
