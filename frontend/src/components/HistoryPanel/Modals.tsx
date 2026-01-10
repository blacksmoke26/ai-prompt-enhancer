/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useState} from 'react';
import {Cell} from 'recharts';
import {Columns, X} from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import MarkdownPreview from '@uiw/react-markdown-preview';

// hooks
import {useTheme} from '~/components/ThemeProvider';

// utils
import {COLORS} from './utils';
import {decodeHtml, formatDate} from '~/utils/helpers';

// ui components
import {Label} from '~/components/ui/Label';
import {Button} from '~/components/ui/Button';
import {ConfirmDialogAdvanced} from '~/components/ui/ConfirmDialog';

// components
import HistoryItemDetails from './HistoryItemDetails';

// types
import type {PromptHistory} from '~/types';

/**
 * Props interface for the Modals component, managing state and handlers for various modal dialogs and actions.
 * Includes flags for modal visibility, selected items, and handlers for copy, delete, fork, and rating operations.
 */
export interface ModalsProps {
  /** The currently selected item for modal operations (e.g., delete, fork, view details) */
  selectedItem: PromptHistory | null;
  /** Whether the delete confirmation modal is currently visible */
  showDeleteConfirm: boolean;
  /** Whether the compare modal is currently visible */
  showCompareModal: boolean;
  /** Whether a copy operation has been successfully completed */
  copied: boolean;
  /** The current text being edited in the note modal */
  editingNote: string;
  /** A set of selected item IDs used for bulk operations */
  selectedIds: Set<string>;
  /** The full list of history items for reference or export */
  history: any[];

  /** Saves the edited note to the selected item */
  onSaveNote(): void;

  /** Triggers the fork operation for the selected item */
  onFork(): void;

  /** Performs the actual delete operation for the selected item(s) */
  onDelete(): void;

  /** Confirms the delete operation (triggered by a confirmation dialog) */
  confirmDelete(): void;

  /**
   * Updates the rating of the selected item.
   * @param rating The new rating value.
   */
  onRatingChange(rating: number): void;

  /**
   * Sets the visibility of the delete confirmation modal.
   * @param show Whether to show or hide the modal.
   */
  setShowDeleteConfirm(show: boolean): void;

  /**
   * Sets the visibility of the compare modal.
   * @param show Whether to show or hide the modal.
   */
  setShowCompareModal(show: boolean): void;

  /**
   * Handles copying text to the clipboard.
   * @param text The text to be copied.
   */
  onCopy(text: string): void;

  /**
   * Updates the note text in the note modal.
   * @param e The React change event from the input field.
   */
  onNoteChange(e: React.ChangeEvent<any>): void;

  onDetailsModelClose?(): void;
}

/**
 * A component responsible for rendering various modals (delete confirmation, compare, copy, analytics, etc.)
 * and handling user interactions for actions like delete, fork, copy, and note editing.
 * @developerNotes
 * - Assumes the presence of specific modals (delete, compare, copy, analytics) in the UI.
 * - Requires proper implementation of all handler functions (e.g., `onDelete`, `onFork`).
 * - Designed to be reusable across different contexts (e.g., prompt history, document comparison).
 * - The `selectedItem` and `history` props are used for data display and operations.
 * - The `copied` flag is used to show/hide a success message after a copy operation.
 */
const Modals: React.FC<ModalsProps> = (props) => {
  const {
    selectedItem,
    showDeleteConfirm,
    setShowDeleteConfirm,
    showCompareModal,
    setShowCompareModal,
    copied,
    editingNote,
    selectedIds,
    history,
    onCopy,
    onNoteChange,
    onSaveNote,
    onFork,
    onDelete,
    confirmDelete,
    onRatingChange,
    onDetailsModelClose = () => {
    },
  } = props;

  const {theme} = useTheme();
  return (
    <>
      {/* Confirm Delete Dialog */}
      <ConfirmDialogAdvanced
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        title="Delete History Item"
        description="Are you sure you want to delete this history item? This action cannot be undone."
        confirmCaption="Delete"
        cancelCaption="Cancel"
        onConfirmClick={confirmDelete}
      />

      {/* Details Modal */}
      <Dialog.Root open={selectedItem !== null} onOpenChange={(open) => !open && onDelete()}>
        <Dialog.Portal>
          <Dialog.Overlay
            className="fixed inset-0 z-50 bg-black/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 backdrop-blur-sm"/>
          <Dialog.Content
            className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-5xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-0 shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out rounded-2xl overflow-hidden dark:bg-gray-900 dark:border-gray-700">
            {selectedItem && (
              <HistoryItemDetails
                selectedItem={selectedItem}
                onEnhancedPromptCopyClick={() => onCopy(selectedItem.enhancedPrompt ?? '')}
                copied={copied}
                onJsonCopyClick={() => onCopy(JSON.stringify(selectedItem, null, 2))}
                dataColorMode={theme}
                element={(_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                )}
                onRatingChange={onRatingChange} value={editingNote}
                onNoteChange={onNoteChange} onSaveNoteClick={onSaveNote}
                onForkClick={onFork} onDeleteClick={onDelete} onDialogClose={onDetailsModelClose}
              />
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Compare Dialog */}
      <Dialog.Root open={showCompareModal} onOpenChange={setShowCompareModal}>
        <Dialog.Portal>
          <Dialog.Overlay
            className="fixed inset-0 z-[60] bg-black/60 data-[state=open]:animate-in data-[state=closed]:animate-out backdrop-blur-sm"/>
          <Dialog.Content
            className="fixed left-[50%] top-[50%] z-[60] grid w-[95vw] max-w-7xl h-[85vh] translate-x-[-50%] translate-y-[-50%] gap-0 border bg-white p-0 shadow-2xl rounded-lg overflow-hidden dark:bg-gray-900 dark:border-gray-700">
            <div
              className="p-1 border-b bg-gray-50 flex items-center justify-between dark:bg-gray-800 dark:border-gray-700">
              <Dialog.Title className="text-lg font-bold flex items-center gap-2 pl-2">
                <Columns className="h-5 w-5 text-indigo-500"/> Compare Prompts
              </Dialog.Title>
              <Dialog.Close asChild><Button variant="ghost" size="icon"><X className="h-4 w-4"/></Button></Dialog.Close>
            </div>
            <div className="flex-1 flex overflow-hidden">
              {Array.from(selectedIds).map((id, idx) => {
                const item = history.find(h => h.id === id);
                if (!item) return null;
                return (
                  <div key={id}
                       className="w-1/2 border-r border-gray-200 dark:border-gray-700 flex flex-col last:border-r-0">
                    <div
                      className="p-3 bg-gray-100 dark:bg-gray-800 border-b font-mono text-xs text-gray-500 dark:text-gray-400 flex justify-between">
                      <span>{formatDate(item.timestamp)} • {item.model}</span>
                      <span className="font-bold text-indigo-600 dark:text-indigo-400">Item {idx + 1}</span>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      <div>
                        <Label className="mb-2 block text-gray-500 dark:text-gray-400">Original</Label>
                        <div
                          className="p-3 bg-white border rounded text-sm whitespace-pre-wrap dark:bg-gray-900 dark:border-gray-700">{decodeHtml(item.originalPrompt ?? '')}</div>
                      </div>
                      <div>
                        <Label className="mb-2 block text-purple-600 dark:text-purple-400 font-bold">Enhanced</Label>
                        <div
                          className="p-3 bg-white border rounded text-sm whitespace-pre-wrap dark:bg-gray-900 dark:border-gray-700">
                          <MarkdownPreview
                            source={decodeHtml(item.enhancedPrompt ?? '')}
                          />
                        </div>
                      </div>
                      <div
                        className="grid grid-cols-2 gap-2 text-xs text-gray-500 bg-gray-50 dark:bg-gray-800/50 p-2 rounded">
                        <div>Tokens: <span
                          className="font-medium text-gray-900 dark:text-gray-100">{item.tokensUsed ?? 0}</span></div>
                        <div>Rating: <span
                          className="font-medium text-gray-900 dark:text-gray-100">{item.rating ?? 0}/5</span></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};

export default Modals;
