/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {StarIcon} from 'lucide-react';

// utils
import {cn} from '~/utils/helpers';

/**
 * Props for the StarRatingSelector component.
 */
export interface StarRatingSelectorProps {
  /** The current rating value (1-5). */
  currentRating: number;

  /** Callback function invoked when a star is selected. Receives the selected rating. */
  onSelect(rating: number): void;
}

const StarRatingSelector: React.FC<StarRatingSelectorProps> = ({currentRating, onSelect}) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((starValue) => (
        <button
          key={starValue}
          onClick={() => onSelect(starValue)}
          className={cn(
            'transition-transform hover:scale-125 focus:outline-none',
            starValue <= currentRating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600',
          )}
        >
          <StarIcon size={14} fill={starValue <= currentRating ? 'currentColor' : 'none'}/>
        </button>
      ))}
    </div>
  );
};

export default StarRatingSelector;
