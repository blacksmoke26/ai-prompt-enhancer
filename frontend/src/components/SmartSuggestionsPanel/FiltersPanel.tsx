/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {TextField} from '@radix-ui/themes';

// ui components
import {Input} from '~/components/ui/Input';
import {SelectAdvanced} from '~/components/ui/SelectAdvanced';

// constants
import {categories, complexities, intelligenceLevels} from '~/constants/prompt-suggestions';

/**
 * Interface defining the props for the `FiltersPanel` component.
 * Provides the state and callbacks needed to manage filtering options such as query, category, complexity, and intelligence.
 */
export interface FiltersPanelProps {
  /**
   * The current search query value.
   * Typically used to display or update the query input field.
   */
  value: string;

  /**
   * Callback function triggered when the query input changes.
   * Receives the event object from the input change.
   */
  onQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * The current selected category.
   * Used to render the selected value in the category dropdown.
   */
  category: string;

  /**
   * Callback function used to retrieve a formatted value object for the selected category.
   * Returns an object containing `label` and `value` for rendering in a dropdown.
   */
  onValueChange: (value: string) => { label: string; value: string };

  /**
   * Callback function triggered when the category changes.
   * Receives the new category value.
   */
  onCategoryChange: (value: string) => void;

  /**
   * The current selected complexity level.
   * Used to display or update the complexity filter.
   */
  complexity: string;

  /**
   * Callback function triggered when the complexity filter changes.
   * Receives the new complexity value.
   */
  onComplexityChange: (value: string) => void;

  /**
   * The current selected intelligence level.
   * Used to display or update the intelligence filter.
   */
  intelligence: string;

  /**
   * Callback function used to retrieve a formatted value object for the selected intelligence level.
   * Returns an object containing `label` and `value` for rendering in a dropdown.
   */
  intelligenceLevelItem: (value: string) => { label: string; value: string };

  /**
   * Callback function triggered when the intelligence filter changes.
   * Receives the new intelligence value.
   */
  onIntelligenceChange: (value: string) => void;
}

/**
 * A panel component that provides filtering controls for query, category, complexity, and intelligence levels.
 * Utilizes callback functions to handle state changes and provide custom rendering of filter options.
 *
 * @example
 * <FiltersPanel
 *   value="search"
 *   onQueryChange={(e) => console.log(e.target.value)}
 *   category="type"
 *   onValueChange={(value) => ({ label: 'Label', value: 'value' })}
 *   onCategoryChange={(value) => console.log(value)}
 *   complexity="high"
 *   onComplexityChange={(value) => console.log(value)}
 *   intelligence="medium"
 *   intelligenceLevelItem={(value) => ({ label: 'Level', value: 'level' })}
 *   onIntelligenceChange={(value) => console.log(value)}
 * />
 */
const FiltersPanel = (props: FiltersPanelProps) => {
  return (
    <div className="mb-4 flex flex-col md:flex-row gap-3">
      <div className="flex-1 min-w-[200px] relative">
        <TextField.Root
          type="text"
          placeholder="Search suggestions by keyword, tag, or description..."
          className="w-full pr-4 py-2 text-sm"
          value={props.value}
          onChange={props.onQueryChange}
        >
          <TextField.Slot>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </TextField.Slot>
        </TextField.Root>

      </div>

      <div className="flex gap-3 flex-wrap">
        <SelectAdvanced
          triggerWidth="min-w-[180px]"
          value={props.category}
          options={[
            {label: 'All Categories', value: 'all'},
            ...categories.map(props.onValueChange),
          ]}
          onChange={value => props.onCategoryChange(value as string)}
        />

        <SelectAdvanced
          triggerWidth="min-w-[190px]"
          value={props.complexity}
          options={[
            {label: 'All Complexities', value: 'all'},
            ...complexities.map(props.onValueChange),
          ]}
          onChange={value => props.onComplexityChange(value as string)}
        />

        <SelectAdvanced
          triggerWidth="min-w-[230px]"
          value={props.intelligence}
          options={[
            {label: 'All Intelligence Levels', value: 'all'},
            ...intelligenceLevels.map(props.intelligenceLevelItem),
          ]}
          onChange={value => props.onIntelligenceChange(value as string)}
        />
      </div>
    </div>
  );
};

export default FiltersPanel;
