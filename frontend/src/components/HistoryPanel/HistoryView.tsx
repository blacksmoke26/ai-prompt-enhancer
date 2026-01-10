/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {Database} from 'lucide-react';

// components
import TableRow from './TableRow';
import GridCard from './GridCard';
import SortIcon from './SortIcon';
import PaginationToolbar from './PaginationToolbar';

// types
import type {SortConfig} from './utils';
import type {PromptHistory} from '~/types';
import type {HistoryPanelConfig} from './utils';

/**
 * Props interface for the HistoryView component, which renders the history items in either table or grid layout.
 * Manages state for selection, pagination, sorting, and item interactions.
 */
export interface HistoryViewProps {
  /** Configuration object for the HistoryPanel, defining default filters, sorting, view mode, etc */
  config: HistoryPanelConfig;
  /** Current view mode of the HistoryPanel (either 'table' or 'grid') */
  viewMode: 'table' | 'grid';
  /** The paginated history items currently being displayed */
  paginatedHistory: PromptHistory[];
  /** A set of selected item IDs from the history list */
  selectedIds: Set<string>;
  /** Whether all items are currently selected */
  selectAll: boolean;
  /** The current sorting configuration (key and direction) */
  sortConfig: SortConfig;
  /** The full list of processed history items (used for sorting and pagination) */
  processedHistory: PromptHistory[];
  /** The current page number being displayed */
  currentPage: number;
  /** The total number of pages available based on the data and page size */
  totalPages: number;
  /** The number of items displayed per page */
  itemsPerPage: number;

  /** Handler function called when the user navigates to the next page */
  onNextPage(): void;

  /** Handler function called when the user navigates to the previous page */
  onPrevPage(): void;

  /**
   * Toggles the selection of a specific item.
   * @param id The ID of the item to toggle.
   */
  toggleSelect(id: string): void;

  /**
   * Handles the deletion of a specific item.
   * @param id The ID of the item to delete.
   */
  handleDelete(id: string): void;

  /**
   * Updates the number of items displayed per page.
   * @param size The new number of items per page.
   */
  setItemsPerPage(size: number): void;

  /**
   * Sorts the history items by the specified key.
   * @param key The key in the PromptHistory object to sort by.
   */
  onSort(key: keyof PromptHistory): void;

  /**
   * Sets the currently selected item (for details or editing).
   * @param item The item to select.
   */
  setSelectedItem(item: PromptHistory): void;

  /**
   * Updates the rating of a specific item.
   * @param id The ID of the item to rate.
   * @param rating The new rating value.
   */
  handleRatingChange(id: string, rating: number): void;
}

/**
 * A component that renders the history items in either table or grid view, supporting sorting, selection, pagination, and rating.
 * Acts as the main container for displaying and interacting with history data.
 * @developerNotes
 * - Assumes the presence of helper functions like `toggleSet` or similar for managing selected item sets.
 * - Relies on the `PromptHistory` type for item data and the `SortConfig` type for sorting.
 * - Designed to be used in conjunction with the Toolbar, PaginationToolbar, and Modals components.
 * - The `viewMode` prop controls whether the history is displayed as a table or grid.
 * - The `onSort` handler is responsible for updating the sort configuration and re-sorting the history.
 * - The `handleRatingChange` function should update the rating in the backend or state.
 */
const HistoryView: React.FC<HistoryViewProps> = (props) => {
  const {
    viewMode,
    paginatedHistory,
    selectedIds,
    selectAll,
    toggleSelect,
    onSort,
    sortConfig,
    handleRatingChange,
    setSelectedItem,
    handleDelete,
    processedHistory,
    currentPage,
    totalPages,
    itemsPerPage,
    setItemsPerPage,
    onNextPage,
    onPrevPage,
    config,
  } = props;

  if (!paginatedHistory.length) {
    return (
      <div
        className="flex flex-col items-center justify-center h-[600px] text-center border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50 dark:border-gray-700 dark:bg-gray-800/50">
        <Database className="h-12 w-12 text-gray-300 dark:text-gray-600 mb-3"/>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">No history found</h3>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[600px]">
      <div className="flex-grow overflow-hidden relative">
        {viewMode === 'table' ? (
          <div className="h-full overflow-hidden flex flex-col">
            <div className="overflow-x-auto flex-grow">
              <table className="w-full text-sm text-left">
                <thead
                  className="text-xs text-gray-500 uppercase bg-gray-50/80 border-b border-gray-200 dark:bg-gray-800/80 dark:text-gray-400 dark:border-gray-700 sticky top-0">
                <tr>
                  <th className="px-2 pl-4 py-3 w-10">
                    &nbsp;
                  </th>
                  <th className="px-6 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => onSort('timestamp')}>
                    <div className="flex items-center gap-1">Time
                      <SortIcon sortConfig={sortConfig} historyKey="timestamp"/>
                    </div>
                  </th>
                  <th className="px-6 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => onSort('model')}>
                    <div className="flex items-center gap-1">Model
                      <SortIcon sortConfig={sortConfig} historyKey="model"/>
                    </div>
                  </th>
                  <th className="px-6 py-3">Meta</th>
                  <th className="px-6 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => onSort('format')}>
                    <div className="flex items-center gap-1">Format
                      <SortIcon sortConfig={sortConfig} historyKey="format"/>
                    </div>
                  </th>
                  <th className="px-6 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => onSort('rating')}>
                    <div className="flex items-center gap-1">Rating
                      <SortIcon sortConfig={sortConfig} historyKey="rating"/>
                    </div>
                  </th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {paginatedHistory.map(item => (
                  <TableRow
                    selectAll={selectAll}
                    key={item.id}
                    item={item} selectedIds={selectedIds}
                    onCheckboxChange={toggleSelect}
                    onRatingChange={handleRatingChange}
                    onViewDetailsClick={setSelectedItem}
                    onItemDelete={handleDelete}/>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div
            className="h-full overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 content-start">
            {paginatedHistory.map(item => (
              <GridCard
                selectAll={selectAll}
                selectedIds={selectedIds}
                item={item}
                toggleSelect={toggleSelect}
                setSelectedItem={setSelectedItem}
                handleDelete={handleDelete}
                handleRatingChange={handleRatingChange}
                key={item.id}/>
            ))}
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {config.pagination.enabled && processedHistory.length > 0 && (
        <PaginationToolbar
          value={String(itemsPerPage)}
          onPageSizeChange={(v) => setItemsPerPage(parseInt(v))}
          processedHistory={processedHistory} currentPage={currentPage}
          totalPages={totalPages} onPreviousClick={onPrevPage}
          onNextClick={onNextPage} config={config}/>
      )}
    </div>
  );
};

export default HistoryView;
