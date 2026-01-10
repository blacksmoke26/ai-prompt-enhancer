/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {ChevronLeft, ChevronRight} from 'lucide-react';

// ui components
import {Button} from '~/components/ui/Button';
import {SelectAdvanced} from '~/components/ui/SelectAdvanced';

// types
import type {HistoryPanelConfig} from './utils';
import type {PromptHistory} from '~/types';

/**
 * Props interface for the PaginationToolbar component, used to control and display pagination controls.
 * Includes current page state, total pages, and handlers for navigation and page size changes.
 */
export interface PaginationToolbarProps {
  /** The current page size selected by the user (e.g., '10', '20') */
  value: string;
  /** The configuration object for the HistoryPanel, providing default settings and filters */
  config: HistoryPanelConfig;
  /** The list of history items that have been filtered and processed for pagination */
  processedHistory: PromptHistory[];
  /** The current page number being displayed */
  currentPage: number;
  /** The total number of pages available based on the data and page size */
  totalPages: number;
  /**
   * Handler function called when the user changes the page size (e.g., '10', '20', '50').
   * @param value The new page size selected by the user.
   */
  onPageSizeChange(value: string): void;
  /** Handler function called when the user clicks the "Previous" navigation button */
  onPreviousClick(): void;
  /** Handler function called when the user clicks the "Next" navigation button */
  onNextClick(): void;
}

/**
 * A toolbar component for navigating through paginated data in the HistoryPanel.
 * Provides controls for changing page size, moving between pages, and displaying current pagination state.
 * @example
 * <PaginationToolbar
 *   value="20"
 *   config={DEFAULT_CONFIG}
 *   processedHistory={history}
 *   currentPage={2}
 *   totalPages={5}
 *   onPageSizeChange={(v) => console.log('Page size changed to:', v)}
 *   onPreviousClick={() => console.log('Previous page clicked')}
 *   onNextClick={() => console.log('Next page clicked')}
 * />
 * @developerNotes
 * - Assumes the presence of a PageSizeSelector component for rendering the page size dropdown.
 * - The `value` prop should match the available options in the config or UI.
 * - Designed to be used in conjunction with the HistoryPanel and Toolbar components.
 * - The `onPageSizeChange` handler should update the page size and recompute pagination.
 */
const PaginationToolbar: React.FC<PaginationToolbarProps> = (props) => {
  return (
    <div
      className="border-t border-gray-200 bg-gray-50 px-6 py-4 flex items-center justify-between dark:bg-gray-800/50 dark:border-gray-700">
      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        <span>Rows per page:</span>
        <div className="w-[70px]">
          <SelectAdvanced
            clearable={false}
            triggerWidth="85px"
            value={String(props.value)}
            onChange={props.onPageSizeChange}
            options={props.config.pagination.pageSizeOptions.map(size => (
              {label: String(size), value: String(size)}
            ))}
          />
        </div>
        <span className="ml-4">Total: {props.processedHistory.length}</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600 dark:text-gray-400">Page {props.currentPage} of {props.totalPages}</span>
        <div className="flex gap-1">
          <Button
            variant="outline" size="icon" className="h-8 w-8"
            onClick={props.onPreviousClick} disabled={props.currentPage === 1}>
            <ChevronLeft className="h-4 w-4"/>
          </Button>
          <Button
            variant="outline" size="icon" className="h-8 w-8"
            onClick={props.onNextClick}
            disabled={props.currentPage === props.totalPages}>
            <ChevronRight className="h-4 w-4"/>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaginationToolbar;
