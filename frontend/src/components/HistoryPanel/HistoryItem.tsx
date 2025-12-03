/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {Eye, Trash2, Edit} from 'lucide-react';

// ui components
import {Badge} from '~/components/ui/Badge';
import {Button} from '~/components/ui/Button';

// utils
import {formatDate, formatDuration, truncateText} from '~/utils/helpers';

// components
import RatingStars from './RatingStars';
import NotesEditor from './NotesEditor';

// types
import type {PromptHistory} from '~/types/index';

/**
 * Props for the {@link HistoryItem} component.
 *
 * @property item           The prompt history item to display.
 * @property isExpanded    Whether the enhanced prompt is currently expanded.
 * @property onToggleExpand Callback to toggle the expanded state.
 * @property onDelete       Callback to delete this item.
 * @property onRatingChange Callback invoked with a new rating.
 * @property isEditingNotes Whether the notes editor is active for this item.
 * @property notesValue     Current text in the notes editor.
 * @property onNotesChange  Callback to update the notes editor value.
 * @property onNotesSave    Callback to save notes (triggers parent update).
 * @property onNotesCancel  Callback to cancel notes editing.
 * @property onEditNotes   Callback to initiate notes editing.
 */
export interface HistoryItemProps {
  item: PromptHistory;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onDelete: () => void;
  onRatingChange: (id: string, rating: number) => void;
  isEditingNotes: boolean;
  notesValue: string;
  onNotesChange: (value: string) => void;
  onNotesSave: () => void;
  onNotesCancel: () => void;
  onEditNotes: () => void;
}

/**
 * Component that renders a single history entry.
 *
 * It displays the original prompt, optionally the enhanced prompt, badges,
 * metadata, rating stars and a notes editor. All user actions are
 * delegated to the parent via callbacks.
 */
const HistoryItem: React.FC<HistoryItemProps> = ({
  item,
  isExpanded,
  onToggleExpand,
  onDelete,
  onRatingChange,
  isEditingNotes,
  notesValue,
  onNotesChange,
  onNotesSave,
  onNotesCancel,
  onEditNotes,
}) => {
  return (
    <div className="border border-border rounded-lg p-3 space-y-2 hover:bg-muted/50 transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-xs">
            {item.model}
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
            className="h-6 w-6"
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
          >
            <Eye className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onDelete}
            className="h-6 w-6 text-destructive hover:text-destructive"
            aria-label="Delete"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Meta */}
      <div className="text-xs text-muted-foreground">
        {formatDate(item.timestamp)} • {formatDuration(item.processingTime)}
        {item.tokensUsed && ` • ${item.tokensUsed} tokens`}
      </div>

      {/* Prompts */}
      <div className="space-y-1">
        <div>
          <span className="text-xs font-medium">Original:</span>
          <p className="text-sm text-muted-foreground">
            {truncateText(item.originalPrompt, 100)}
          </p>
        </div>

        {isExpanded && (
          <div>
            <span className="text-xs font-medium">Enhanced:</span>
            <p className="text-sm">
              {truncateText(item.enhancedPrompt, 200)}
            </p>
          </div>
        )}
      </div>

      {/* Rating */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-medium">Rating:</span>
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
          <span className="text-xs font-medium">Notes:</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={onEditNotes}
            className="h-6 w-6"
            aria-label="Edit notes"
          >
            <Edit className="h-3 w-3" />
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
            {item.notes || <span className="italic">No notes</span>}
          </p>
        )}
      </div>
    </div>
  );
};

export default HistoryItem;
