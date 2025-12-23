/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {Eye, Trash2, Edit, Copy, Check} from 'lucide-react';

// ui components
import {Badge} from '~/components/ui/Badge';
import {Button} from '~/components/ui/Button';
import Markdown from '~/components/ui/Markdown';
import {ConfirmDialog} from '~/components/ui/ConfirmDialog';

// utils
import {formatDate, formatDuration, truncateText} from '~/utils/helpers';

// components
import RatingStars from './RatingStars';
import NotesEditor from './NotesEditor';

// types
import type {PromptHistory} from '~/types';

/**
 * Interface for props passed to a history item component.
 * Provides data and interaction handlers for rendering and managing prompt history entries.
 * @example
 * const props: HistoryItemProps = {
 *   item: { id: '123', prompt: 'Sample prompt', notes: 'Initial notes' },
 *   isExpanded: false,
 *   onToggleExpand: () => {},
 *   onDelete: () => {},
 *   onRatingChange: (id, rating) => {},
 *   isEditingNotes: false,
 *   notesValue: '',
 *   onNotesChange: (value) => {},
 *   onNotesSave: () => {},
 *   onNotesCancel: () => {},
 *   onEditNotes: () => {},
 *   onCopyPrompt: (prompt, isEnhanced) => {}
 * };
 * @note
 * - `item` is the core data object for the history entry.
 * - Interaction handlers (`onToggleExpand`, `onDelete`, etc.) enable user actions.
 * - `onRatingChange` and `onCopyPrompt` handle specific user feedback and copy actions.
 */
export interface HistoryItemProps {
  /**
   * The prompt history entry data (e.g., ID, prompt text, notes).
   */
  item: PromptHistory;

  /**
   * Whether the history item is currently expanded (showing additional details).
   */
  isExpanded: boolean;

  /**
   * Callback to toggle the expanded/collapsed state of the item.
   */
  onToggleExpand(): void;

  /**
   * Callback to delete the history item.
   */
  onDelete(): void;

  /**
   * Callback to update the rating for the prompt (id and rating value).
   * @param id - The ID of the prompt to rate.
   * @param rating - The rating value (e.g., 1-5).
   */
  onRatingChange(id: string, rating: number): void;

  /**
   * Whether the notes section is currently in edit mode.
   */
  isEditingNotes: boolean;

  /**
   * Current value of the notes input field.
   */
  notesValue: string;

  /**
   * Callback to save the edited notes.
   */
  onNotesSave(notes: string): void;

  /**
   * Callback to cancel edits and revert to the original notes.
   */
  onNotesCancel(): void;

  /**
   * Callback to initiate editing the notes section.
   */
  onEditNotes(): void;
}

/**
 * Component that renders a single history entry.
 *
 * It displays the original prompt, optionally the enhanced prompt, badges,
 * metadata, rating stars and a notes editor. All user actions are
 * delegated to the parent via callbacks.
 */
const HistoryItem: React.FC<HistoryItemProps> = (props) => {
  const {
    item,
    isExpanded,
    onToggleExpand,
    onDelete,
    onRatingChange,
    isEditingNotes,
    notesValue,
    onNotesSave,
    onNotesCancel,
    onEditNotes,
  } = props;

  const [copied, setCopied] = React.useState<{ original?: boolean; enhanced?: boolean }>({});

  const handleCopy = (prompt: string, isEnhanced: boolean) => {
    navigator.clipboard.writeText(prompt);
    setCopied(prev => ({...prev, [isEnhanced ? 'enhanced' : 'original']: true}));
    setTimeout(() => {
      setCopied(prev => ({...prev, [isEnhanced ? 'enhanced' : 'original']: false}));
    }, 2000);
  };

  return (
    <div className="border border-border rounded-lg p-4 space-y-3 hover:bg-muted/50 transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-xs">
            {item.provider || item.model}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {item.enhancementType}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {item.userRole}
          </Badge>
        </div>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleExpand}
            className="h-7 w-7"
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
          >
            <Eye className="h-4 w-4"/>
          </Button>
          <ConfirmDialog
            title="Remove history"
            description="Do you want to remove this history item?"
            cancelCaption="Cancel"
            confirmCaption="Remove"
            onConfirmClick={onDelete}
            triggerElement={(
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-destructive hover:text-destructive"
                aria-label="Delete"
              >
                <Trash2 className="h-4 w-4"/>
              </Button>
            )}
          />
        </div>
      </div>

      {/* Core Stats */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-muted/50 rounded p-2">
          <div className="text-muted-foreground">Tokens</div>
          <div className="font-medium">{item.tokensUsed ?? 'N/A'}</div>
        </div>
        <div className="bg-muted/50 rounded p-2">
          <div className="text-muted-foreground">Prompt Length</div>
          <div className="font-medium">{item.originalPrompt.length} chars</div>
        </div>
        {item.temperature !== undefined && (
          <div className="bg-muted/50 rounded p-2">
            <div className="text-muted-foreground">Temperature</div>
            <div className="font-medium">{item.temperature}</div>
          </div>
        )}
        {item.maxTokens !== undefined && (
          <div className="bg-muted/50 rounded p-2">
            <div className="text-muted-foreground">Max Tokens</div>
            <div className="font-medium">{item.maxTokens}</div>
          </div>
        )}
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        {item.systemPrompt && (
          <div className="bg-muted/50 rounded p-2">
            <div className="text-muted-foreground">System Prompt Length</div>
            <div className="font-medium">{item.systemPrompt.length} chars</div>
          </div>
        )}
        <div className="bg-muted/50 rounded p-2">
          <div className="text-muted-foreground">Enhanced Prompt Length</div>
          <div className="font-medium">{item.enhancedPrompt.length} chars</div>
        </div>
      </div>

      {/* Time Stats */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-muted/50 rounded p-2">
          <div className="text-muted-foreground">Created</div>
          <div className="font-medium">{formatDate(item.timestamp)}</div>
        </div>
        <div className="bg-muted/50 rounded p-2">
          <div className="text-muted-foreground">Duration</div>
          <div className="font-medium">{formatDuration(item.processingTime)}</div>
        </div>
      </div>

      {/* Prompts */}
      <div className="space-y-3">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Original:</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy(item.originalPrompt, false)}
              className="h-7 px-2 text-xs"
              aria-label="Copy original prompt"
            >
              {copied.original ? <Check className="h-4 w-4"/> : <Copy className="h-4 w-4"/>}
              <span className="ml-1">{copied.original ? 'Copied!' : 'Copy'}</span>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground bg-muted/30 p-2 rounded">
            {truncateText(item.originalPrompt, 200)}
          </p>
        </div>

        {isExpanded && (
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Enhanced:</span>
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(item.enhancedPrompt, true)}
                  className="h-7 px-2 text-xs"
                  aria-label="Copy enhanced prompt"
                >
                  {copied.enhanced ? <Check className="h-4 w-4"/> : <Copy className="h-4 w-4"/>}
                  <span className="ml-1">{copied.enhanced ? 'Copied!' : 'Copy'}</span>
                </Button>
              </div>
            </div>
            <Markdown
              className="text-sm text-muted-foreground bg-muted/30 p-2 rounded"
              style={{background: 'none'}} source={item.enhancedPrompt}/>
          </div>
        )}
      </div>

      {/* Rating */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Rating:</span>
          <RatingStars
            rating={item.rating ?? 0}
            id={item.id}
            onRatingChange={onRatingChange}
          />
        </div>
      </div>

      {/* Notes */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Notes:</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={onEditNotes}
            className="h-7 w-7"
            aria-label="Edit notes"
          >
            <Edit className="h-4 w-4"/>
          </Button>
        </div>

        {isEditingNotes ? (
          <NotesEditor
            notes={notesValue}
            isEditing={true}
            onSave={onNotesSave}
            onCancel={onNotesCancel}
          />
        ) : (
          <p className="text-sm text-muted-foreground">
            {item?.notes || <span className="italic">No notes</span>}
          </p>
        )}
      </div>
    </div>
  );
};

export default HistoryItem;
