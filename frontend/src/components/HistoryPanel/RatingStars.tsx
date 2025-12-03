/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import { Star } from 'lucide-react';

/**
 * Component for rendering a 5‑star rating widget.
 *
 * @property rating          Current rating (0–5). 0 means unrated.
 * @property id              Identifier of the history item this rating belongs to.
 * @property onRatingChange  Callback invoked with the new rating when a star is clicked.
 * @property disabled        Optional flag to prevent user interaction.
 */
export interface RatingStarsProps {
  rating: number;
  id: string;
  onRatingChange: (id: string, rating: number) => void;
  disabled?: boolean;
}

/**
 * Renders a horizontal star rating that can be clicked to change the rating.
 *
 * The component uses the {@link Star} icon from lucide‑react and applies
 * conditional styling to indicate the current rating and hover state.
 *
 * @param props
 */
const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  id,
  onRatingChange,
  disabled = false,
}) => {
  const handleClick = (newRating: number) => {
    if (!disabled) {
      onRatingChange(id, newRating);
    }
  };

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 cursor-pointer transition-colors ${
            star <= rating
              ? 'text-yellow-400 fill-yellow-400'
              : 'text-gray-300 hover:text-yellow-200'
          }`}
          onClick={() => handleClick(star)}
        />
      ))}
    </div>
  );
};

export default RatingStars;
