/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useEffect, useMemo, useState} from 'react';
import {Cell} from 'recharts';
import {ChevronDown} from 'lucide-react';

// hooks
import {useHistory} from '~/hooks/useHistory';
import {useHistoryStore} from '~/stores/historyStore';

// utils
import * as Utils from './utils';
import {cn} from '~/utils/helpers';
import {DEFAULT_CONFIG, HistoryPanelConfig, HistoryPanelProps} from './utils';

// ui components
import {Button} from '~/components/ui/Button';

// components
import Modals from './Modals';
import Toolbar from './Toolbar';
import HistoryView from './HistoryView';
import AnalyticsCharts from './AnalyticsCharts';

// types
import type {PromptHistory} from '~/types';

const HistoryPanel: React.FC<HistoryPanelProps> = (props) => {
  const {
    history = [],
    loading = false,
    config: userConfig = {},
  } = props;

  // Merge user panelConfig with defaults
  const panelConfig: HistoryPanelConfig = useMemo(() => ({
    ...DEFAULT_CONFIG,
    ...userConfig,
    pagination: {
      ...DEFAULT_CONFIG.pagination,
      ...userConfig.pagination,
    },
  }), [userConfig]);

  const {minimalStats} = useHistoryStore();
  const {loadHistory, deleteItem, updateItem, clearHistory} = useHistory();

  // -- State --
  const [sortConfig, setSortConfig] = useState<Utils.SortConfig>(null);

  // Multi-Select & Bulk Actions
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Modal Internal State
  const [editingNote, setEditingNote] = useState<string>('');

  const [filters, setFilters] = useState<Utils.InputFilters>({
    searchQuery: '',
    model: '',
    provider: '',
    type: '',
    format: '',
    rating: 0,
    tone: '',
    audience: '',
    dateRange: [null, null],
  });

  const [config, setconfig] = useState<Utils.LocalConfig>({
    viewMode: panelConfig.defaultViewMode,
    showFilters: false,
    showCharts: panelConfig.showChartsByDefault,
    copied: false,
    showCompareModal: false,
    selectAll: false,
    deleteTargetId: null,
    showDeleteConfirm: false,
    currentPage: 1,
    itemsPerPage: panelConfig.pagination.defaultPageSize,
    selectedItem: null,
  });

  const updateFilter = (key: keyof Utils.InputFilters, value: any) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  const updateConfig = (key: keyof Utils.LocalConfig, value: Utils.LocalConfig[keyof Utils.LocalConfig] | ((prev: Utils.LocalConfig[keyof Utils.LocalConfig]) => Utils.LocalConfig[keyof Utils.LocalConfig])) => {
    setconfig(prevConfig => ({
      ...prevConfig,
      [key]: value instanceof Function ? value(prevConfig[key]) : value,
    }));
  };

  const processedHistory = useMemo(
    () => Utils.processHistoryItems(history, filters, sortConfig),
    [history, filters, sortConfig],
  );

  const models = useMemo(() => Array.from(new Set(history.map(h => h.model))), [history]);
  const providers = useMemo(() => Array.from(new Set(history.map(h => h.provider).filter(Boolean) as string[])), [history]);
  const formats = useMemo(() => Array.from(new Set(history.map(h => h.format).filter(Boolean) as string[])), [history]);
  const tones = useMemo(() => Array.from(new Set(history.map(h => h.tone).filter(Boolean) as string[])), [history]);

  const totalPages = panelConfig.pagination.enabled ? Math.ceil(processedHistory.length / config.itemsPerPage) : 1;
  const paginatedHistory = panelConfig.pagination.enabled
    ? processedHistory.slice((config.currentPage - 1) * config.itemsPerPage, config.currentPage * config.itemsPerPage)
    : processedHistory;

  // -- Effects --
  useEffect(() => {
    if (config.selectAll) {
      const allIds = new Set(paginatedHistory.map(h => h.id));
      setSelectedIds(allIds);
    }
  }, [config.selectAll, paginatedHistory]);

  useEffect(() => {
    const allSelected = paginatedHistory.length > 0 && paginatedHistory.every(h => selectedIds.has(h.id));
    if (config.selectAll !== allSelected) updateConfig('selectAll', allSelected);
  }, [selectedIds, paginatedHistory, config.selectAll]);

  useEffect(() => {
    updateConfig('currentPage', 1);
    updateConfig('selectAll', false);
    setSelectedIds(new Set());
  }, [processedHistory.length, config.itemsPerPage]);

  const confirmDelete = async () => {
    updateConfig('selectedItem', null);

    try {
      if (config.deleteTargetId) {
        await deleteItem(config.deleteTargetId);
        setToast({message: 'Item deleted', type: 'success'});
      }
      updateConfig('showDeleteConfirm', false);
      updateConfig('deleteTargetId', null);
    } catch (e) {
      console.error('Delete failed:', e);
      setToast({message: 'Failed to delete item', type: 'error'});
    }
  };

  const handleBulkDelete = async () => {
    const promises: Promise<void>[] = [];
    selectedIds.forEach(id => promises.push(deleteItem(id)));

    try {
      await Promise.all(promises);
      setSelectedIds(new Set());
      updateConfig('selectAll', false);
      setToast({message: 'Selected items deleted', type: 'success'});
    } catch (e) {
      console.error('Bulk delete failed:', e);
      setToast({message: 'Failed to delete items', type: 'error'});
    }
  };

  const handleRatingChange = (id: string, rating: number) => {
    updateItem(id, {rating});
    if (config?.selectedItem?.id === id) {
      updateConfig('selectedItem', {...config?.selectedItem, rating});
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      updateConfig('copied', true);
      setTimeout(() => updateConfig('copied', false), 2000);
      setToast({message: 'Copied to clipboard!', type: 'success'});
      setTimeout(() => setToast(null), 3000);
    }).catch(() => setToast({message: 'Failed to copy', type: 'error'}));
  };

  const handleFork = (item: PromptHistory) => {
    handleCopy(item.originalPrompt ?? '');
    setToast({message: 'Prompt copied! You can paste it to start a new generation.', type: 'success'});
  };

  const handleSaveNote = () => {
    if (config.selectedItem) {
      updateItem(config.selectedItem.id, {notes: editingNote});
      updateConfig('selectedItem', {...config.selectedItem, notes: editingNote});
      setEditingNote('');
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50/50 dark:bg-gray-950 pb-10 transition-colors duration-200">
      {/* Toast */}
      {toast && (
        <div
          className={cn('fixed top-4 right-4 z-[100] flex items-center ',
            'gap-2 px-4 py-3 rounded-lg shadow-lg animate-in slide-in-from-right-5',
            toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white')}>
          <span className="font-medium text-sm">{toast.message}</span>
        </div>
      )}

      {/* Charts */}
      {config.showCharts ? (
        <AnalyticsCharts
          onHideChartsClick={() => updateConfig('showCharts', false)}
          chartData={minimalStats?.charts!}
          element={(_, index) => (
            <Cell key={`cell-${index}`} fill={Utils.COLORS[index % Utils.COLORS.length]}/>
          )}
        />
      ) : (
        <div className="mb-6 px-1 text-right">
          <Button variant="plain" size="sm" onClick={() => updateConfig('showCharts', true)}>
            Show Analytics Charts <ChevronDown className="h-4 w-4 ml-1"/>
          </Button>
        </div>
      )}

      {/* Main Card */}
      <div
        className="rounded-2xl bg-white shadow-sm border border-gray-200 overflow-hidden mx-1 dark:bg-gray-900 dark:border-gray-800">

        {/* Header / Toolbar */}
        <Toolbar
          config={panelConfig}
          stats={minimalStats?.stats!}
          viewMode={config.viewMode}
          setViewMode={mode => updateConfig('viewMode', mode)}
          searchQuery={filters.searchQuery}
          setSearchQuery={val => updateFilter('searchQuery', val)}
          showFilters={config.showFilters}
          setShowFilters={state => updateConfig('showFilters', state)}
          loading={loading}
          onRefresh={() => loadHistory()}
          onClearHistory={() => clearHistory()}
          processedHistory={processedHistory}
          selectedIds={selectedIds}
          onBulkDelete={handleBulkDelete}
          onCompare={() => updateConfig('showCompareModal', true)}
          models={models}
          providers={providers}
          formats={formats}
          tones={tones}
          filterModel={filters.model}
          setFilterModel={val => updateFilter('model', val)}
          filterProvider={filters.provider}
          setFilterProvider={val => updateFilter('provider', val)}
          filterFormat={filters.format}
          setFilterFormat={val => updateFilter('format', val)}
          filterTone={filters.tone}
          setFilterTone={val => updateFilter('tone', val)}
          filterRating={filters.rating}
          setFilterRating={val => updateFilter('rating', val)}
        />

        {/* Content View */}
        <div>
          <HistoryView
            config={panelConfig}
            viewMode={config.viewMode}
            paginatedHistory={paginatedHistory}
            selectedIds={selectedIds}
            selectAll={config.selectAll}
            toggleSelect={(id: string) => {
              const newSet = new Set(selectedIds);
              if (newSet.has(id)) newSet.delete(id); else newSet.add(id);
              setSelectedIds(newSet);
            }}
            onSort={(key: keyof PromptHistory) => {
              let direction: 'asc' | 'desc' = 'asc';
              if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
              setSortConfig({key, direction});
            }}
            sortConfig={sortConfig}
            handleRatingChange={handleRatingChange}
            setSelectedItem={item => updateConfig('selectedItem', item)}
            handleDelete={(id: string) => {
              updateConfig('deleteTargetId', id);
              updateConfig('showDeleteConfirm', true);
            }}
            processedHistory={processedHistory}
            currentPage={config.currentPage}
            totalPages={totalPages}
            itemsPerPage={config.itemsPerPage}
            setItemsPerPage={itemsPerPage => updateConfig('itemsPerPage', itemsPerPage)}
            onNextPage={() => updateConfig('currentPage', p => Math.min(totalPages, Number(p) + 1))}
            onPrevPage={() => updateConfig('currentPage', p => Math.max(1, Number(p) - 1))}
          />
        </div>

        {/* Modals */}
        <Modals
          selectedItem={config.selectedItem}
          showDeleteConfirm={config.showDeleteConfirm}
          setShowDeleteConfirm={show => updateConfig('showDeleteConfirm', show)}
          showCompareModal={config.showCompareModal}
          setShowCompareModal={state => updateConfig('showCompareModal', state)}
          copied={config.copied}
          editingNote={editingNote}
          selectedIds={selectedIds}
          history={history}
          onCopy={handleCopy}
          onNoteChange={(e) => setEditingNote(e.target.value)}
          onSaveNote={handleSaveNote}
          onFork={() => config.selectedItem && handleFork(config.selectedItem)}
          onDelete={confirmDelete}
          confirmDelete={confirmDelete}
          onDetailsModelClose={() => updateConfig('selectedItem', null)}
          onRatingChange={(r) => config.selectedItem && handleRatingChange(config.selectedItem.id, r)}
        />
      </div>
    </div>
  );
};

export default HistoryPanel;
