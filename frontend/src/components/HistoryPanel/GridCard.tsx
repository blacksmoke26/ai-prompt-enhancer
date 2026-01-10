/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {Eye, FileText, Trash2, Zap} from 'lucide-react';
import {Checkbox} from '@radix-ui/themes';

// utils
import {formatDate, formatDuration} from '~/utils/helpers';

// ui components
import {Badge} from '~/components/ui/Badge';
import {Button} from '~/components/ui/Button';

// components
import RatingStars from './RatingStars';

// types
import type {PromptHistory} from '~/types';

/**
 * Props interface for the GridCard component, used to render a single item in a grid layout.
 * Provides selection, deletion, and rating functionality for each card.
 */
export interface GridCardProps {
  /**
   * Whether all items in the grid are currently selected.
   */
  selectAll: boolean;

  /**
   * A set of selected item IDs from the grid.
   */
  selectedIds: Set<string>;

  /**
   * The prompt history item data to be displayed in the card.
   */
  item: PromptHistory;

  /**
   * Toggles the selection state of the item.
   * @param id The ID of the item to toggle.
   */
  toggleSelect(id: string): void;

  /**
   * Sets the currently selected item (for details or editing).
   * @param item The item to select.
   */
  setSelectedItem(item: PromptHistory): void;

  /**
   * Deletes the specified item.
   * @param id The ID of the item to delete.
   */
  handleDelete(id: string): void;

  /**
   * Updates the rating of the specified item.
   * @param id The ID of the item to rate.
   * @param rating The new rating value (e.g., 1 to 5).
   */
  handleRatingChange(id: string, rating: number): void;
}

/**
 * A card component for rendering a single item in a grid layout, with selection, deletion, and rating controls.
 * Designed to be used in the HistoryPanel for visualizing history items in a grid view.
 * @developerNotes
 * - Assumes the presence of a UI library for icons (e.g., `StarIcon`, `TrashIcon`, `EyeIcon`).
 * - The `item` prop should contain necessary properties like `id`, `content`, `rating`, and `createdAt`.
 * - Designed to be used in conjunction with the HistoryView and Toolbar components.
 * - The `toggleSelect` handler should update the selectedIds state.
 * - The `handleRatingChange` function should update the rating in the backend or state.
 */
const GridCard: React.FC<GridCardProps> = (props) => {
  const {item, selectedIds, selectAll, toggleSelect, setSelectedItem, handleDelete, handleRatingChange} = props;

  return (
    <div
      className="group relative flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <Checkbox checked={selectedIds.has(item.id) || selectAll} onCheckedChange={() => toggleSelect(item.id)}/>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline"
                   className="text-[10px] uppercase tracking-wide font-bold border-indigo-200 dark:border-gray-600">{item.model}</Badge>
            {item.format && <Badge color="success" className="text-[10px] uppercase">{item.format}</Badge>}
          </div>
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="ghost" size="icon" className="h-8 w-8 p-0" onClick={() => setSelectedItem(item)}><Eye
            className="h-4 w-4"/></Button>
          <Button
            variant="ghost" size="icon"
            className="h-8 w-8 p-0 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
            onClick={() => handleDelete(item.id)}><Trash2 className="h-4 w-4"/></Button>
        </div>
      </div>
      <div className="mb-4 flex-grow space-y-3">
        <div className="flex items-center gap-2"><FileText className="h-4 w-4 text-gray-400 dark:text-gray-500"/><h3
          className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate w-full">Prompt</h3></div>
        <p
          className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 bg-slate-50 dark:bg-gray-900/50 p-3 rounded-lg border border-slate-100 dark:border-gray-700 h-20">{item.originalPrompt ?? ''}</p>
        <div className="flex gap-2 flex-wrap">{item.tone && <Badge variant="secondary"
                                                                   className="text-[10px] dark:bg-gray-700 dark:text-gray-300">{item.tone}</Badge>}</div>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700 mt-auto">
        <div className="flex flex-col"><span
          className="text-[10px] text-gray-400 dark:text-gray-500">{formatDate(item.timestamp)}</span><span
          className="text-[10px] text-gray-500 dark:text-gray-400 flex items-center gap-1"><Zap
          className="h-3 w-3 text-yellow-500"/>{formatDuration(item.processingTime)}</span></div>
        <RatingStars rating={item.rating ?? 0} onRatingChange={(r) => handleRatingChange(item.id, r)}/>
      </div>
    </div>
  );
};

export default GridCard;
