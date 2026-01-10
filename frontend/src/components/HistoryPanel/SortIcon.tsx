/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {ChevronDown, ChevronUp} from 'lucide-react';

// types
import type {PromptHistory} from '~/types';
import type {SortConfig} from './utils';

/**
 * Props interface for the SortIcon component, used to determine the sort state of a specific column.
 * Provides the key being sorted and the current sort configuration.
 */
export interface SortIconProps {
  /** The key in the PromptHistory object that this icon is associated with (e.g., 'date', 'model') */
  historyKey: keyof PromptHistory;
  /** The current sort configuration, indicating the key being sorted and the direction (asc/desc) */
  sortConfig: SortConfig;
}

/**
 * A small icon component that visually represents the sort direction for a specific column.
 * Renders an upward or downward arrow based on the current sort configuration.
 * @developerNotes
 * - Assumes the presence of a helper function or logic to determine if the current column is being sorted.
 * - The icon's visual state (e.g., arrow direction, color) changes based on the `sortConfig` prop.
 * - Designed to be used within table headers to indicate sorting status.
 */
const SortIcon: React.FC<SortIconProps> = (props) => {
  if (props?.sortConfig?.key !== props?.historyKey) {
    return <ChevronDown className="h-4 w-4 opacity-20"/>;
  }

  return props?.sortConfig?.direction === 'asc'
    ? <ChevronUp className="h-4 w-4 text-indigo-600"/>
    : <ChevronDown className="h-4 w-4 text-indigo-600"/>;
};

export default SortIcon;
