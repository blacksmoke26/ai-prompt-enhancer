/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// types
import type {HistoryMinimalStats, PromptHistory} from '~/types';

/**
 * Configuration object for sorting data by a specific key and direction.
 * Used to control the order of results in a list or table.
 */
export type SortConfig = { key: keyof PromptHistory; direction: 'asc' | 'desc' } | null;

/**
 * Type defining the display mode for a UI component, either grid or table layout.
 * Used to switch between different visual representations of data.
 */
export type ViewMode = 'grid' | 'table';

/**
 * Represents the local configuration state for a component, including UI settings, selection states, and pagination controls.
 * @example
 * const config: LocalConfig = {
 *   viewMode: 'table',
 *   showFilters: true,
 *   showCharts: false,
 *   copied: false,
 *   showCompareModal: false,
 *   selectAll: false,
 *   deleteTargetId: null,
 *   showDeleteConfirm: false,
 *   currentPage: 1,
 *   itemsPerPage: 10,
 *   selectedItem: null,
 * };
 * @developerNotes This interface is used to manage component state. Ensure that properties like deleteTargetId and selectedItem are properly synchronized with UI actions.
 */
export interface LocalConfig {
  /** The current view mode of the component (e.g., 'table', 'card') */
  viewMode: ViewMode;
  /** Whether the filters panel is currently visible */
  showFilters: boolean;
  /** Whether charts are displayed in the current view */
  showCharts: boolean;
  /** Indicates if a copy operation was successfully performed */
  copied: boolean;
  /** Whether the compare modal is open and visible */
  showCompareModal: boolean;
  /** Whether all items are currently selected */
  selectAll: boolean;
  /** The ID of the item targeted for deletion, or null if none */
  deleteTargetId: string | null;
  /** Whether the delete confirmation dialog is currently shown */
  showDeleteConfirm: boolean;
  /** The current page number in the pagination system */
  currentPage: number;
  /** The number of items displayed per page */
  itemsPerPage: number;
  /** The currently selected item from the history, or null if none */
  selectedItem: PromptHistory | null;
}

/**
 * Interface defining the set of filters that can be applied to a dataset.
 * Each property represents a specific filtering criterion.
 */
export interface InputFilters {
  /** The search term used to filter results by content */
  searchQuery: string;
  /** The selected model to filter results by */
  model: string;
  /** The selected provider to filter results by */
  provider: string;
  /** The selected type to filter results by (e.g., 'text', 'image') */
  type: string;
  /** The selected format to filter results by (e.g., 'markdown', 'json') */
  format: string;
  /** The minimum rating to filter results by */
  rating: number;
  /** The selected tone to filter results by (e.g., 'formal', 'casual') */
  tone: string;
  /** The selected audience to filter results by (e.g., 'beginner', 'expert') */
  audience: string;
  /**
   * A date range [start, end] to filter results by creation or modification date.
   * Each value can be `null` to indicate no bound.
   */
  dateRange: [string | null, string | null];
}

/**
 * Defines the actions available for managing history items within the HistoryPanel.
 * Actions can be synchronous or asynchronous, allowing for flexible integration with backend services.
 * @example
 * const actions: HistoryPanelActions = {
 *   deleteHistoryItem: (id) => console.log(`Deleting item with ID: ${id}`),
 *   updateHistoryItem: (id, updates) => console.log(`Updating item ${id} with ${updates}`),
 *   clearHistory: () => console.log('Clearing all history items'),
 * };
 * @developerNotes Ensure that async actions handle loading states or errors appropriately, especially when used in UI components.
 */
export interface HistoryPanelActions {
  /**
   * Deletes a history item by its ID.
   * @param id - The unique identifier of the history item to delete.
   */
  deleteHistoryItem(id: string): void | Promise<void>;

  /**
   * Updates a history item with the provided changes.
   * @param id - The unique identifier of the history item to update.
   * @param updates - Partial properties of the PromptHistory to update.
   */
  updateHistoryItem(id: string, updates: Partial<PromptHistory>): void | Promise<void>;

  /**
   * Clears all history items from the panel.
   */
  clearHistory(): void | Promise<void>;
}

/**
 * Configuration for pagination settings in the HistoryPanel.
 * @example
 * const paginationConfig: PaginationConfig = {
 *   enabled: true,
 *   defaultPageSize: 10,
 *   pageSizeOptions: [5, 10, 20],
 * };
 */
export interface PaginationConfig {
  /** Enables or disables pagination functionality */
  enabled: boolean;
  /** The default number of items per page */
  defaultPageSize: number;
  /** Available page size options for users to select */
  pageSizeOptions: number[];
}

/**
 * Configuration options for customizing the behavior and appearance of the HistoryPanel.
 * @example
 * const panelConfig: HistoryPanelConfig = {
 *   pagination: { enabled: true, defaultPageSize: 10, pageSizeOptions: [5, 10, 20] },
 *   allowBulkDelete: true,
 *   allowCompare: false,
 *   allowExport: true,
 *   defaultViewMode: 'list',
 *   showChartsByDefault: false,
 *   theme: 'dark',
 * };
 * @developerNotes Ensure `defaultViewMode` is an enum from the `ViewMode` type, and `PromptHistory` is imported from the relevant module.
 */
export interface HistoryPanelConfig {
  /** Pagination settings for the panel */
  pagination: PaginationConfig;
  /** Enables bulk delete functionality for multiple history items */
  allowBulkDelete: boolean;
  /** Enables the ability to compare history items */
  allowCompare: boolean;
  /** Enables export functionality for history items (e.g., CSV, JSON) */
  allowExport: boolean;
  /** The default view mode for displaying history items (e.g., 'list', 'grid') */
  defaultViewMode: ViewMode;
  /** Determines if charts are shown by default when viewing history items */
  showChartsByDefault: boolean;
  /** Sets the UI theme of the panel ('light', 'dark', or 'system' for OS preference) */
  theme: 'light' | 'dark' | 'system';
}

/**
 * Props passed to the HistoryPanel component.
 * @developerNotes The `setLoading` function is optional but recommended for managing async operations and UI feedback.
 */
export interface HistoryPanelProps {
  /** Array of history items to display */
  history: PromptHistory[];
  /** Optional loading state to show/hide loading indicators */
  loading?: boolean;
  /** Actions available for managing history items (delete, update, clear) */
  actions?: HistoryPanelActions;
  /** Optional configuration for customizing the panel's behavior and appearance */
  config?: Partial<HistoryPanelConfig>;

  /** Optional function to update the loading state */
  setLoading?(loading: boolean): void;
}

/**
 Applies filtering and sorting operations to an array of prompt history items.
 Useful for dynamically updating UI lists based on user-defined criteria.
 @param history The array of prompt history items to process.
 @param filters The filtering criteria to apply (see `InputFilters` for details).
 @param sortConfig The sorting configuration to apply (see `SortConfig` for details).
 @returns A new array of filtered and sorted prompt history items.
 @example
 * const processed = processHistoryItems(
  *   history,
  *   {
  *     searchQuery: 'AI',
  *     model: 'gpt-4',
  *     dateRange: ['2023-01-01', '2023-12-31'],
  *   },
  *   { key: 'date', direction: 'desc' }
  * );
 * @developerNotes
 * - This is a pure function; it does not mutate the original `history` array.
 * - Relies on `InputFilters` and `SortConfig` types for validation and structure.
 * - Designed to be used in UI components that need to display and sort filtered history.
 */
export const processHistoryItems = (
  history: PromptHistory[],
  filters: InputFilters,
  sortConfig: SortConfig,
): PromptHistory[] => {
  let result = [...history];

  try {
    // Filtering
    result = result.filter(item => {
      const {searchQuery, model, provider, type, format, rating, tone, audience, dateRange} = filters;

      const searchLower = searchQuery.toLowerCase();
      const itemOriginal = item.originalPrompt?.toLowerCase() ?? '';
      const itemEnhanced = item.enhancedPrompt?.toLowerCase() ?? '';
      const itemModel = item.model?.toLowerCase() ?? '';
      const itemNotes = item.notes?.toLowerCase() ?? '';
      const itemFormat = item.format?.toLowerCase() ?? '';

      const matchesSearch =
        itemOriginal.includes(searchLower) ||
        itemEnhanced.includes(searchLower) ||
        itemModel.includes(searchLower) ||
        itemNotes.includes(searchLower) ||
        itemFormat.includes(searchLower);

      const matchesModel = model ? item.model === model : true;
      const matchesProvider = provider ? item.provider === provider : true;
      const matchesType = type ? item.enhancementType === type : true;
      const matchesFormat = format ? item.format === format : true;
      const matchesTone = tone ? item.tone === tone : true;
      const matchesAudience = audience ? item.targetAudience === audience : true;
      const matchesRating = (item.rating ?? 0) >= rating;

      let matchesDate = true;
      if (dateRange[0] || dateRange[1]) {
        try {
          const itemDate = new Date(item.timestamp);
          const start = dateRange[0] ? new Date(dateRange[0]) : null;
          const end = dateRange[1] ? new Date(dateRange[1]) : null;
          matchesDate = (!start || itemDate >= start) && (!end || itemDate <= end);
        } catch (e) {
          matchesDate = true;
        }
      }

      return matchesSearch && matchesModel && matchesProvider && matchesType && matchesFormat && matchesTone && matchesAudience && matchesRating && matchesDate;
    });

    // Sorting
    if (sortConfig) {
      result.sort((a, b) => {
        const aVal = a[sortConfig.key] as unknown as number;
        const bVal = b[sortConfig.key] as unknown as number;
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
  } catch (e) {
    console.error('Error processing history:', e);
    return [];
  }

  return result;
};

/**
 * Calculates analytics for a specific selected item
 * @param selectedItem - The selected item for which to calculate analytics.
 * @param stats - The statistics object containing global statistics.
 * @returns An object containing analytics for the selected item.
 */
export const calculateItemAnalytics = (selectedItem: PromptHistory | null, stats: HistoryMinimalStats['stats']): {
  textData: { name: string, value: number }[],
  tokenStats: { name: string, value: number, fill: string }[]
} | null => {
  if (!selectedItem) return null;
  try {
    const words = (selectedItem.originalPrompt ?? '').trim().split(/\s+/).length;
    const chars = (selectedItem.originalPrompt ?? '').length;

    const textData = [
      {name: 'Words', value: words},
      {name: 'Characters', value: chars},
      {
        name: 'Whitespace',
        value: (selectedItem.originalPrompt ?? '').length - (selectedItem.originalPrompt ?? '').trim().length,
      },
    ];

    const tokenStats = [
      {name: 'This Item', value: selectedItem.tokensUsed ?? 0, fill: '#8b5cf6'},
      {name: 'Global Avg', value: Math.round(stats.totalTokens / stats.totalPrompts) || 0, fill: '#cbd5e1'},
    ];

    return {textData, tokenStats};
  } catch (e) {
    console.error('Error computing analytics', e);
    return null;
  }
};

/**
 * Default configuration settings for the HistoryPanel component.
 * Provides initial values for filters, sorting, view mode, and other display-related options.
 */
export const DEFAULT_CONFIG: HistoryPanelConfig = {
  pagination: {
    enabled: true,
    defaultPageSize: 10,
    pageSizeOptions: [5, 10, 20, 50],
  },
  allowBulkDelete: true,
  allowCompare: true,
  allowExport: true,
  defaultViewMode: 'table',
  showChartsByDefault: true,
  theme: 'light',
};

/**
 * A predefined list of color definitions used throughout the application.
 * Typically used for theming, UI elements, or visual consistency.
 */
export const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316'];

/**
 * Exports processed history data in the specified format, handling errors gracefully.
 * Supports JSON, CSV, and plain text formats.
 *
 * @param processedHistory The array of prompt history items to export.
 * @param format The desired export format (json, csv, or txt).
 * @param onFailed Optional callback to handle errors during export.
 * @returns A Promise that resolves when the export is complete.
 * @example
 * handleExport({
 *   processedHistory: history,
 *   format: 'json',
 *   onFailed: (error) => console.error('Export failed:', error),
 * });
 * @developerNotes
 * - This function is asynchronous and returns a Promise.
 * - Uses format-specific export utilities (e.g., `exportToJSON`, `exportToCSV`).
 * - Assumes the existence of helper functions for formatting and exporting data.
 * - `onFailed` is optional; if not provided, errors are silently logged.
 */
export const handleExport = ({format, processedHistory, onFailed}: {
  processedHistory: PromptHistory[],
  format: 'json' | 'csv' | 'txt';
  onFailed?(error: Error): void
}) => {
  let content = '';
  let mimeType = 'text/plain';
  let extension = 'txt';
  try {
    if (format === 'json') {
      content = JSON.stringify(processedHistory, null, 2);
      mimeType = 'application/json';
      extension = 'json';
    } else if (format === 'csv') {
      const headers = ['Timestamp', 'Model', 'Original Prompt', 'Enhanced Prompt'];
      const rows = processedHistory.map(item => [
        item.timestamp,
        `"${item.model}"`,
        `"${(item.originalPrompt ?? '').replace(/"/g, '""')}"`,
        `"${(item.enhancedPrompt ?? '').replace(/"/g, '""')}"`,
      ]);
      content = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
      mimeType = 'text/csv';
      extension = 'csv';
    } else {
      content = processedHistory.map(item => `Time: ${item.timestamp}\n\nOriginal:\n${item.originalPrompt}\n\nEnhanced:\n${item.enhancedPrompt}\n\n${'='.repeat(40)}`).join('\n');
    }
    const blob = new Blob([content], {type: mimeType});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `history_export.${extension}`;
    a.click();
  } catch (e: any) {
    console.error('Export failed:', e);
    onFailed?.(e);
  }
};
