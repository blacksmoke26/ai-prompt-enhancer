/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {Star} from 'lucide-react';

// utils
import {cn} from '~/utils/helpers';

/**
 * Props interface for the RatingStars component, which renders a star rating system with optional interactivity and sizing.
 * Used to display or allow users to rate items with visual feedback.
 */
export interface RatingStarsProps {
  /**
   * The current rating value (e.g., 4.2 for a partially filled star).
   */
  rating: number;

  /**
   * Whether the stars are read-only (non-interactive).
   * Defaults to `false` if not provided.
   */
  readonly?: boolean;

  /**
   * Size of the stars: 'sm' for small or 'md' for medium.
   * Defaults to 'md' if not provided.
   */
  size?: 'sm' | 'md';

  /**
   * Optional handler called when the rating is changed.
   * @param rating The new rating value selected by the user.
   */
  onRatingChange?(rating: number): void;
}

/**
 * A star rating component that allows users to rate items with interactive or read-only stars.
 * Displays filled and empty stars based on the provided rating value.
 * @example
 * <RatingStars rating={4.2} onRatingChange={(r) => console.log('New rating:', r)} />
 * @developerNotes
 * - Assumes the use of a star icon component (e.g., `StarIcon`) for rendering stars.
 * - The `size` prop controls the visual scale of the stars (e.g., for compact or larger UIs).
 * - The `readonly` prop disables user interaction, useful for display-only scenarios.
 * - The `onRatingChange` handler is optional; if not provided, the component is non-interactive.
 */
const RatingStars: React.FC<RatingStarsProps> = (props) => {
  const {rating, onRatingChange, readonly = false, size = 'sm'} = props;

  const starSize = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(starSize, 'transition-colors', star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600', !readonly && 'cursor-pointer hover:text-yellow-400')}
          onClick={() => !readonly && onRatingChange && onRatingChange(star)}/>
      ))}
    </div>
  );
};

export default RatingStars;
