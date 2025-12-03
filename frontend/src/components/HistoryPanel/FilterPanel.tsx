/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';

// ui components
import { Input } from '~/components/ui/Input';
import { Select } from '~/components/ui/Select';
import { Label } from '~/components/ui/Label';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/Card';

/**
 * Props for the {@link FilterPanel} component.
 *
 * @property searchQuery      Current search text.
 * @property setSearchQuery   Setter for search text.
 * @property models           Array of distinct model names for the model filter.
 * @property selectedModel    Currently selected model filter.
 * @property setSelectedModel Setter for selected model.
 * @property ratingFilter     Minimum rating filter (0–5).
 * @property setRatingFilter  Setter for rating filter.
 * @property dateRange        Tuple `[start, end]` where each value is a date string in `YYYY-MM-DD` or `null`.
 * @property setDateRange     Setter for date range.
 * @property roles            Array of distinct user roles for the role filter.
 * @property selectedRole     Currently selected user role filter.
 * @property setSelectedRole  Setter for selected role.
 * @property enhancementTypes Array of distinct enhancement types for the type filter.
 * @property selectedEnhancementType Currently selected enhancement type filter.
 * @property setSelectedEnhancementType Setter for selected enhancement type.
 */
export interface FilterPanelProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  models: string[];
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  ratingFilter: number;
  setRatingFilter: (rating: number) => void;
  dateRange: [string | null, string | null];
  setDateRange: (range: [string | null, string | null]) => void;
  roles: string[];
  selectedRole: string;
  setSelectedRole: (role: string) => void;
  enhancementTypes: string[];
  selectedEnhancementType: string;
  setSelectedEnhancementType: (type: string) => void;
}

/**
 * Component that renders the advanced filtering UI for the history panel.
 *
 * It includes:
 * - Text search
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
const FilterPanel: React.FC<FilterPanelProps> = ({
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
}) => {
  const [startDate, endDate] = dateRange;

  const modelOptions = [
    { value: '', label: 'All' },
    ...models.map((m) => ({ value: m, label: m })),
  ];

  const roleOptions = [
    { value: '', label: 'All' },
    ...roles.map((r) => ({ value: r, label: r })),
  ];

  const typeOptions = [
    { value: '', label: 'All' },
    ...enhancementTypes.map((t) => ({ value: t, label: t })),
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

        {/* Model selector */}
        <div>
          <Label htmlFor="history-model">Model</Label>
          <Select
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
