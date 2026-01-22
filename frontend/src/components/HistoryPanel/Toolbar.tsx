/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {
  Activity,
  Columns,
  Cpu,
  Database,
  Download,
  Filter,
  Globe,
  Hash,
  LayoutGrid,
  LayoutList,
  RefreshCw,
  Search,
  SquareCheck,
  Star,
  Trash2,
  X,
} from 'lucide-react';

// utils
import {formatDuration} from '~/utils/helpers';
import {handleExport, HistoryPanelConfig} from './utils';

// ui components
import {Button} from '~/components/ui/Button';
import {AdvancedInput} from '~/components/ui/AdvancedInput';

// components
import StatWidget from './StatWidget';
import HistoryFilters from './HistoryFilters';
import {HistoryMinimalStats} from '~/types';
import {ConfirmDialog, ConfirmDialogAdvanced} from '~/components/ui/ConfirmDialog.tsx';

/**
 * Props interface for the Toolbar component used in the HistoryPanel.
 * Encapsulates state, configuration, and action handlers required to manage the UI and filters.
 */
export interface ToolbarProps {
  /** Configuration object for the HistoryPanel, defining default filters, sorting, view mode, etc */
  config: HistoryPanelConfig;
  /** Statistics calculated from the processed history data (e.g., total items, selected count) */
  stats: HistoryMinimalStats['stats'];
  /** The current view mode of the HistoryPanel (either 'table' or 'grid') */
  viewMode: 'table' | 'grid';
  /** The current search query applied to the history items */
  searchQuery: string;
  /** Whether the filters section is currently visible or hidden */
  showFilters: boolean;
  /** Whether the component is in a loading state (e.g., fetching data) */
  loading: boolean;
  /** The list of history items that have been filtered and processed */
  processedHistory: any[];
  /** A set of selected item IDs from the history list */
  selectedIds: Set<string>;
  /** Available list of models to filter by */
  models: string[];
  /** Available list of providers to filter by */
  providers: string[];
  /** Available list of formats to filter by */
  formats: string[];
  /** Available list of tones to filter by */
  tones: string[];
  /** The current selected model filter value */
  filterModel: string;
  /** The current selected provider filter value */
  filterProvider: string;
  /** The current selected format filter value */
  filterFormat: string;
  /** The current selected tone filter value */
  filterTone: string;
  /** The current selected rating filter value */
  filterRating: number;

  /** Sets the current view mode (table or grid) */
  setViewMode(mode: 'table' | 'grid'): void;

  /** Updates the search query applied to the history items */
  setSearchQuery(q: string): void;

  /** Toggles the visibility of the filters section */
  setShowFilters(show: boolean): void;

  /** Refreshes the history data (e.g., re-fetching from the backend) */
  onRefresh(): void;

  /** Clears the history data (e.g., deleting all items) */
  onClearHistory(): void;

  /** Deletes the selected items from the history list */
  onBulkDelete(): void;

  /** Initiates a comparison between selected history items */
  onCompare(): void;

  /** Updates the selected model filter */
  setFilterModel(v: string): void;

  /** Updates the selected provider filter */
  setFilterProvider(v: string): void;

  /** Updates the selected format filter */
  setFilterFormat(v: string): void;

  /** Updates the selected tone filter */
  setFilterTone(v: string): void;

  /** Updates the selected rating filter */
  setFilterRating(v: number): void;
}

/**
 * A toolbar component for managing filters, view modes, and actions in the HistoryPanel.
 * Provides controls for searching, sorting, filtering, and performing bulk operations.
 * @developerNotes
 * - This component is a central control panel for the HistoryPanel, tightly coupled with state management.
 * - Assumes that all prop functions are properly implemented and bound to state updates.
 * - Designed to be flexible, allowing dynamic filtering and sorting based on user input.
 */
const Toolbar: React.FC<ToolbarProps> = (props) => {
  const {
    config,
    stats,
    viewMode,
    setViewMode,
    searchQuery,
    setSearchQuery,
    showFilters,
    setShowFilters,
    loading,
    onRefresh,
    onClearHistory,
    processedHistory,
    selectedIds,
    onBulkDelete,
    onCompare,
    models,
    providers,
    formats,
    tones,
    filterModel,
    setFilterModel,
    filterProvider,
    setFilterProvider,
    filterFormat,
    setFilterFormat,
    filterTone,
    setFilterTone,
    filterRating,
    setFilterRating,
  } = props;

  return (
    <>
      {/* Stats Dashboard */}
      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6 px-3">
        <StatWidget
          title="Total Requests" value={stats.totalPrompts} icon={<Database className="h-6 w-6"/>}
          gradient="bg-gradient-to-br from-blue-500 to-blue-600" trend="up"/>
        <StatWidget
          title="Avg Rating" value={(stats.avgRating).toFixed(1)} icon={<Star className="h-6 w-6"/>}
          gradient="bg-gradient-to-br from-amber-400 to-orange-500" subtext={`/ 5.0`}/>
        <StatWidget
          title="Total Tokens" value={stats.totalTokens.toLocaleString()} icon={<Hash className="h-6 w-6"/>}
          gradient="bg-gradient-to-br from-emerald-400 to-teal-500"/>
        <StatWidget
          title="Avg Latency" value={formatDuration(stats.avgProcessingTime)}
          icon={<Activity className="h-6 w-6"/>} gradient="bg-gradient-to-br from-purple-500 to-indigo-500"/>
        <StatWidget
          title="Top Model" value={stats.topModel.split('-')[0]} icon={<Cpu className="h-6 w-6"/>}
          gradient="bg-gradient-to-br from-pink-500 to-rose-500" subtext={`(${stats.topModel})`}/>
        <StatWidget
          title="Active Chats" value={stats.activeConvos} icon={<Globe className="h-6 w-6"/>}
          gradient="bg-gradient-to-br from-cyan-500 to-blue-600" subtext="Conversations"/>
      </div>

      {/* Main Card Toolbar */}
      <div
        className="border-b border-gray-100 bg-white/95 p-6 sticky top-0 z-10 backdrop-blur dark:bg-gray-900/95 dark:border-gray-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          {/* Header Info */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400">
              <Database className="h-6 w-6"/></div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Prompt History</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Manage and compare your AI generations</p>
            </div>
          </div>

          {/* Action Area */}
          <div className="flex items-center gap-2">
            {selectedIds.size > 0 ? (
              <div className="flex items-center gap-2 animate-in fade-in zoom-in-95">
                <div
                  className="bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-full text-sm font-semibold dark:bg-indigo-900/30 dark:text-indigo-300 flex items-center gap-2">
                  <SquareCheck className="h-4 w-4"/> {selectedIds.size} Selected
                </div>
                {config.allowCompare && selectedIds.size === 2 && (
                  <Button variant="default" onClick={onCompare} className="gap-2" leftIcon={<Columns className="h-4 w-4"/>}> Compare</Button>
                )}
                {config.allowBulkDelete && (
                  <Button variant="destructive" onClick={onBulkDelete} className="gap-2" leftIcon={<Trash2 className="h-4 w-4"/>}> Delete</Button>
                )}
              </div>
            ) : (
              <>
                {config.allowExport && (
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                      <Button variant="outline" className="gap-2" leftIcon={<Download className="h-4 w-4"/>}>Export</Button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Portal>
                      <DropdownMenu.Content
                        align="end"
                        className="z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white p-1 shadow-md dark:bg-gray-800 dark:border-gray-700">
                        <DropdownMenu.Item
                          className="cursor-pointer text-sm p-2 hover:bg-gray-100 rounded dark:hover:bg-gray-700"
                          onClick={() => handleExport({processedHistory, format: 'json'})}>JSON</DropdownMenu.Item>
                        <DropdownMenu.Item
                          className="cursor-pointer text-sm p-2 hover:bg-gray-100 rounded dark:hover:bg-gray-700"
                          onClick={() => handleExport({processedHistory, format: 'csv'})}>CSV</DropdownMenu.Item>
                      </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                  </DropdownMenu.Root>
                )}
                <ConfirmDialog
                  title="Clear History"
                  description="Are you sure you want to clear your history? This action cannot be undone."
                  onConfirmClick={onClearHistory}
                  confirmCaption="Clear"
                  triggerElement={
                    <Button leftIcon={<Trash2 className="h-4 w-4"/>}
                      variant="outline"
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 dark:text-red-400 gap-2">
                      Clear</Button>
                  }
                  />
                <Button variant="ghost" onClick={onRefresh} className="gap-2" leftIcon={<RefreshCw
                  className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`}/>}> Refresh</Button>
              </>
            )}
          </div>
        </div>

        {/* Search & Controls */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-3">
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500"/>
            <AdvancedInput
              placeholder="Search prompts, notes..." className="pl-10" value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}/>
          </div>
          <div className="flex items-center gap-3 w-full lg:w-auto flex-wrap">
            <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg flex">
              <Button
                variant={viewMode === 'table' ? 'default' : 'ghost'} size="sm"
                onClick={() => setViewMode('table')} className="h-8 px-3"><LayoutList
                className="h-4 w-4"/></Button>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'} size="sm" onClick={() => setViewMode('grid')}
                className="h-8 px-3"><LayoutGrid className="h-4 w-4"/></Button>
            </div>
            <Button
              leftIcon={<Filter className="h-4 w-4"/>}
              rightIcon={showFilters ?
                <X className="h-4 w-4"/> : ''}
              variant={showFilters ? 'default' : 'outline'} size="sm" onClick={() => setShowFilters(!showFilters)}
              className="gap-2"> Filters </Button>
          </div>
        </div>

        {/* Filter UI */}
        {showFilters && (
          <HistoryFilters
            models={models} selectedModel={filterModel} onModelChange={setFilterModel}
            providers={providers} selectedProvider={filterProvider} onProviderChange={setFilterProvider}
            formats={formats} selectedFormat={filterFormat} onFormatChange={setFilterFormat}
            tones={tones} selectedTone={filterTone} onToneChange={setFilterTone}
            ratings={['Any', '1', '2', '3', '4', '5']} selectedRating={filterRating}
            onRatingChange={(v) => setFilterRating(parseInt(v) || 0)}/>
        )}
      </div>
    </>
  );
};

export default Toolbar;
