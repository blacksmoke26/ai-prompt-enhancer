/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';

// hooks
import {useAppStore} from '~/stores/appStore.ts';

// ui components
import {Input} from '~/components/ui/Input';
import {Select} from '~/components/ui/Select';
import {Label} from '~/components/ui/Label';
import {Card, CardContent, CardHeader, CardTitle} from '~/components/ui/Card';

/**
 * Props for the {@link FilterPanel} component.
 *
 * Interface defining the props for the FilterPanel component, which manages various filter states.
 */
export interface FilterPanelProps {
  /**
   * The current search query string.
   */
  searchQuery: string;

  /**
   * Function to update the search query string.
   * @param q - New search query string.
   */
  setSearchQuery(q: string): void;

  /**
   * Array of available model names.
   */
  models: string[];

  /**
   * Currently selected model from the models array.
   */
  selectedModel: string;

  /**
   * Function to update the selected model.
   * @param model - New selected model.
   */
  setSelectedModel(model: string): void;

  /**
   * Numeric rating filter (e.g., 1-5).
   */
  ratingFilter: number;

  /**
   * Function to update the rating filter.
   * @param rating - New numeric rating.
   */
  setRatingFilter(rating: number): void;

  /**
   * Tuple representing a date range [start, end], where null indicates no selection.
   */
  dateRange: [string | null, string | null];

  /**
   * Function to update the date range.
   * @param range - New date range tuple.
   */
  setDateRange(range: [string | null, string | null]): void;

  /**
   * Array of available role names.
   */
  roles: string[];

  /**
   * Currently selected role from the roles array.
   */
  selectedRole: string;

  /**
   * Function to update the selected role.
   * @param role - New selected role.
   */
  setSelectedRole(role: string): void;

  /**
   * Array of available enhancement types.
   */
  enhancementTypes: string[];

  /**
   * Currently selected enhancement type from the enhancement types array.
   */
  selectedEnhancementType: string;

  /**
   * Function to update the selected enhancement type.
   * @param type - New selected enhancement type.
   */
  setSelectedEnhancementType(type: string): void;

  /**
   * Array of available provider names.
   */
  providers: string[];

  /**
   * Currently selected provider from the providers array.
   */
  selectedProvider: string;

  /**
   * Function to update the selected provider.
   * @param provider - New selected provider.
   */
  setSelectedProvider(provider: string): void;
}

/**
 * Component that renders the advanced filtering UI for the history panel.
 *
 * It includes:
 * - Text search
 * - Provider selector
 * - Model selector
 * - User role selector
 * - Enhancement type selector
 * - Minimum rating slider
 * - Date range pickers
 *
 * All state updates are delegated to the parent via callback props.
 *
 * @component
 */
const FilterPanel: React.FC<FilterPanelProps> = (props) => {
  const {
    searchQuery,
    setSearchQuery,
    models,
    selectedModel,
    setSelectedModel,
    ratingFilter,
    setRatingFilter,
    dateRange,
    setDateRange,
    roles,
    selectedRole,
    setSelectedRole,
    enhancementTypes,
    selectedEnhancementType,
    setSelectedEnhancementType,
    providers,
    selectedProvider,
    setSelectedProvider,
  } = props;

  const [startDate, endDate] = dateRange;

  const {
    providers: globalProviders,
    enhancementTypes: globalEnhancementTypes,
    userRoles: globalUserRoles,
  } = useAppStore();

  const modelOptions = [
    {value: '', label: 'All'},
    ...models.map((m) => ({value: m, label: m})),
  ];

  const roleOptions = [
    {value: '', label: 'All'},
    ...roles.map((r) => ({value: r, label: globalUserRoles.filter(x => x.id === r)?.[0]?.name ?? r})),
  ];

  const typeOptions = [
    {value: '', label: 'All'},
    ...enhancementTypes.map((t) => ({value: t, label: globalEnhancementTypes.filter(x => x.id === t)?.[0]?.name ?? t})),
  ];

  const providerOptions = [
    {value: '', label: 'All'},
    ...providers.map((p) => ({value: p, label: globalProviders.filter(x => x.name === p)?.[0]?.caption ?? p})),
  ];

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Filter History</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {/* Search */}
        <div>
          <Label htmlFor="history-search">Search</Label>
          <Input
            id="history-search"
            placeholder="Search prompts…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Provider selector */}
        <div>
          <Label htmlFor="history-provider">Provider</Label>
          <Select
            isSearchable
            id="history-provider"
            options={providerOptions}
            value={selectedProvider}
            onChange={(value) => setSelectedProvider(value as string)}
          />
        </div>

        {/* Model selector */}
        <div>
          <Label htmlFor="history-model">Model</Label>
          <Select
            isSearchable
            id="history-model"
            options={modelOptions}
            value={selectedModel}
            onChange={(value) => setSelectedModel(value as string)}
          />
        </div>

        {/* User role selector */}
        <div>
          <Label htmlFor="history-role">User Role</Label>
          <Select
            isSearchable
            id="history-role"
            options={roleOptions}
            value={selectedRole}
            onChange={(value) => setSelectedRole(value as string)}
          />
        </div>

        {/* Enhancement type selector */}
        <div>
          <Label htmlFor="history-type">Enhancement Type</Label>
          <Select
            isSearchable
            id="history-type"
            options={typeOptions}
            value={selectedEnhancementType}
            onChange={(value) => setSelectedEnhancementType(value as string)}
          />
        </div>

        {/* Rating filter */}
        <div>
          <Label htmlFor="history-rating">Minimum Rating</Label>
          <div className="flex items-center gap-2">
            <Input
              id="history-rating"
              type="range"
              min={0}
              max={5}
              step={1}
              value={ratingFilter}
              onChange={(e) => setRatingFilter(Number(e.target.value))}
              className="flex-1"
            />
            <span className="w-8 text-center">{ratingFilter}</span>
          </div>
        </div>

        {/* Date range */}
        <div className="sm:col-span-2 md:col-span-3">
          <Label>Date Range</Label>
          <div className="flex items-center gap-2 mt-1">
            <Input
              type="date"
              value={startDate ?? ''}
              onChange={(e) => setDateRange([e.target.value || null, endDate])}
            />
            <span className="text-gray-400">to</span>
            <Input
              type="date"
              value={endDate ?? ''}
              onChange={(e) => setDateRange([startDate, e.target.value || null])}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterPanel;
