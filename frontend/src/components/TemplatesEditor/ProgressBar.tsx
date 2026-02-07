/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';

// utils
import {cn} from '~/utils/helpers';

/**
 * ProgressBar component props
 */
export interface ProgressBarProps {
  /** Current progress value */
  value: number;
  /** Maximum value for progress calculation */
  max: number;
  /** Optional CSS class for the progress bar color */
  colorClass?: string;
}

/**
 * ProgressBar component that displays a visual progress bar.
 */
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
