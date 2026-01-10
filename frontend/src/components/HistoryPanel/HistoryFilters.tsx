/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {Cpu, FileCode} from 'lucide-react';

// ui components
import {Label} from '~/components/ui/Label';
import {SelectAdvanced} from '~/components/ui/SelectAdvanced';

/**
 * Props interface for the HistoryFilters component, used to render a filter panel with dropdowns for model, provider, format, tone, and rating.
 * Manages selected filter values and provides handlers for user interactions.
 */
export interface HistoryFiltersProps {
  /**
   * The list of available models for selection.
   */
  models: string[];

  /**
   * The list of available providers for selection.
   */
  providers: string[];

  /**
   * The list of available formats for selection.
   */
  formats: string[];

  /**
   * The list of available tones for selection.
   */
  tones: string[];

  /**
   * The list of available rating options for selection (e.g., ['1', '2', ..., '5']).
   */
  ratings: string[];

  /**
   * The currently selected model filter value.
   */
  selectedModel: string;

  /**
   * The currently selected provider filter value.
   */
  selectedProvider: string;

  /**
   * The currently selected tone filter value.
   */
  selectedTone: string;

  /**
   * The currently selected rating filter value (as a string, even though it represents a number).
   */
  selectedRating: number;

  /**
   * The currently selected format filter value.
   */
  selectedFormat: string;

  /**
   * Handler function called when the selected model changes.
   * @param value The new model filter value.
   */
  onModelChange(value: string): void;

  /**
   * Handler function called when the selected provider changes.
   * @param value The new provider filter value.
   */
  onProviderChange(value: string): void;

  /**
   * Handler function called when the selected format changes.
   * @param value The new format filter value.
   */
  onFormatChange(value: string): void;

  /**
   * Handler function called when the selected tone changes.
   * @param value The new tone filter value.
   */
  onToneChange(value: string): void;

  /**
   * Handler function called when the selected rating changes.
   * @param value The new rating filter value (as a string, even though it represents a number).
   */
  onRatingChange(value: string): void;
}

/**
 * A filter panel component for the HistoryPanel, providing dropdowns to filter history items by model, provider, format, tone, and rating.
 * Designed to be used alongside the Toolbar and HistoryView components.
 * @developerNotes
 * - Assumes the use of a UI library for dropdowns (e.g., `Select` from `@mui/material`).
 * - The `ratings` array is expected to contain string representations of numbers (e.g., ['1', '2', ...]).
 * - The `selectedRating` is stored as a number, but the `onRatingChange` handler receives a string value.
 * - Designed to be used in the HistoryPanel's filter section for dynamic filtering of history items.
 * - All handlers should update the corresponding state in the parent component.
 */
const HistoryFilters: React.FC<HistoryFiltersProps> = (props) => {
  return (
    <div
      className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div><Label
          className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Model</Label>
          <SelectAdvanced
            searchable clearable placeholder="All Models" value={props.selectedModel} onChange={props.onModelChange}
            options={props.models.map(v => ({label: v, value: v}))} icon={<Cpu className="h-4 w-4 text-gray-400"/>}/>
        </div>
        <div><Label
          className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Provider</Label>
          <SelectAdvanced
            searchable clearable placeholder="All Providers" value={props.selectedProvider}
            onChange={props.onProviderChange}
            options={props.providers.map(v => ({label: v, value: v}))}/></div>
        <div><Label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Format</Label>
          <SelectAdvanced
            searchable clearable placeholder="All Formats" value={props.selectedFormat} onChange={props.onFormatChange}
            options={props.formats.map(v => ({label: v, value: v}))}
            icon={<FileCode className="h-4 w-4 text-gray-400"/>}/></div>
        <div><Label
          className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Tone</Label>
          <SelectAdvanced
            searchable clearable placeholder="Any Tone" value={props.selectedTone} onChange={props.onToneChange}
            options={props.tones.map(v => ({label: v, value: v}))}/></div>
        <div><Label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Rating</Label>
          <SelectAdvanced
            clearable={false} placeholder="Any"
            value={props.selectedRating.toString() === '0' ? 'Any' : String(props.selectedRating)}
            onChange={props.onRatingChange}
            options={[
              {label: 'Any', value: '0'},
              {label: '⭐', value: '1'},
              {label: '⭐⭐', value: '2'},
              {label: '⭐⭐⭐', value: '3'},
              {label: '⭐⭐⭐⭐', value: '4'},
              {label: '⭐⭐⭐⭐⭐', value: '5'},
            ]}/>
        </div>
      </div>
    </div>
  );
};

export default HistoryFilters;
