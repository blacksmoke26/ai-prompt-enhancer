/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useEffect, useState} from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {Checkbox} from '@radix-ui/themes';
import {Clock, Eye, FileCode, MoreHorizontal, Trash2} from 'lucide-react';

// utils
import {formatDate, formatDuration} from '~/utils/helpers';

// ui components
import {Badge} from '~/components/ui/Badge';
import {Button} from '~/components/ui/Button';

// components
import RatingStars from './RatingStars';

// types
import type {PromptHistory} from '~/types';

/**
 * Props interface for the TableRow component used in the HistoryPanel.
 * Encapsulates the data and interaction handlers for rendering and managing a single table row.
 */
export interface TableRowProps {
  /**
   * The prompt history item data to be displayed in the table row.
   */
  item: PromptHistory;

  /**
   * Whether all items in the table are currently selected.
   */
  selectAll: boolean;

  /**
   * A set of selected item IDs from the table.
   */
  selectedIds: Set<string>;

  /**
   * Handler function called when the checkbox for this row is toggled.
   * @param id The ID of the item being selected or deselected.
   */
  onCheckboxChange(id: string): void;

  /**
   * Handler function called when the rating for this item is changed.
   * @param id The ID of the item being rated.
   * @param rating The new rating value (e.g., 1 to 5).
   */
  onRatingChange(id: string, rating: number): void;

  /**
   * Handler function called when the "View Details" button is clicked.
   * @param item The prompt history item to view.
   */
  onViewDetailsClick(item: PromptHistory): void;

  /**
   * Handler function called when the "Delete" button is clicked.
   * @param id The ID of the item to be deleted.
   */
  onItemDelete(id: string): void;
}

/**
 * A table row component for rendering and managing a single item in the HistoryPanel.
 * Provides controls for selecting, rating, viewing, and deleting history items.
 * @developerNotes
 * - This component is tightly coupled with the parent state and assumes that all handler functions are properly implemented.
 * - Uses the item's ID to manage selection and deletion operations.
 * - Designed to be used in conjunction with the Toolbar and HistoryPanel components.
 * - Assumes that the PromptHistory type includes necessary properties like `id`, `content`, `rating`, and `createdAt`.
 */
const TableRow: React.FC<TableRowProps> = (props) => {
  const {
    item, onCheckboxChange,
    onRatingChange,
    onViewDetailsClick,
    onItemDelete,
  } = props;

  const [selectedIds, setSelectedIds] = useState<Set<string>>(props.selectedIds);
  const [selectAll, setSelectAll] = useState<boolean>(props.selectAll);

  useEffect(() => {
    setSelectedIds(props.selectedIds);
  }, [props.selectedIds]);

  useEffect(() => {
    setSelectAll(props.selectAll);
  }, [props.selectAll]);

  return (
    <tr
      className="group border-b border-gray-100 hover:bg-indigo-50/30 dark:border-gray-800 dark:hover:bg-gray-800/50 transition-colors">
      <td className="px-4 py-4">
        <Checkbox
          checked={selectedIds.has(item.id) || selectAll} onCheckedChange={() => onCheckboxChange(item.id)}/>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{formatDate(item.timestamp)}</div>
        <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1"><Clock
          className="h-3 w-3"/>{formatDuration(item.processingTime)}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex flex-col gap-1">
          <Badge
            variant="outline"
            className="w-fit border-indigo-200 dark:border-gray-600">{item.model}
          </Badge>{item.provider &&
          <span className="text-xs text-gray-400 dark:text-gray-500">{item.provider}</span>}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex gap-1 flex-wrap">{item.tone &&
          <Badge variant="secondary" className="text-[10px] uppercase">{item.tone}</Badge>}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {item.format ? <Badge
            variant={item.format === 'json' ? 'destructive' : 'default'}
            className="text-[10px] uppercase font-bold"><FileCode
            className="h-3 w-3 mr-1"/>{item.format}</Badge> :
          <span className="text-xs text-gray-400 dark:text-gray-600">Text</span>}
      </td>
      <td className="px-6 py-4">
        <RatingStars rating={item.rating ?? 0} onRatingChange={(r) => onRatingChange(item.id, r)} readonly={false}
                     size="sm"/>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild><Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal
            className="h-4 w-4"/></Button></DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white p-1 text-slate-950 shadow-md dark:bg-gray-800 dark:text-gray-50 dark:border-gray-700">
              <DropdownMenu.Item
                className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => onViewDetailsClick(item)}><Eye className="mr-2 h-4 w-4"/> View</DropdownMenu.Item>
              <DropdownMenu.Item
                className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 dark:text-red-400"
                onClick={() => onItemDelete(item.id)}><Trash2 className="mr-2 h-4 w-4"/> Delete</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </td>
    </tr>
  );
};

export default TableRow;
