/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import { Eye, Trash2, Edit, Copy, Check, MessageSquare } from 'lucide-react';
import * as Popover from '@radix-ui/react-popover';
import ReactMarkdown from 'react-markdown';

// ui components
import { Badge } from '~/components/ui/Badge';
import { Button } from '~/components/ui/Button';

// utils
import { formatDate, formatDuration, truncateText } from '~/utils/helpers';

// components
import RatingStars from './RatingStars';
import NotesEditor from './NotesEditor';

// types
import type { PromptHistory } from '~/types/index';

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
 * @property onCopyPrompt   Callback to copy prompt to editor.
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
  onCopyPrompt: (prompt: string, isEnhanced: boolean) => void;
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
  onCopyPrompt,
}) => {
  const [copied, setCopied] = React.useState<{ original?: boolean; enhanced?: boolean }>({});

  const handleCopy = (prompt: string, isEnhanced: boolean) => {
    navigator.clipboard.writeText(prompt);
    setCopied(prev => ({ ...prev, [isEnhanced ? 'enhanced' : 'original']: true }));
    setTimeout(() => {
      setCopied(prev => ({ ...prev, [isEnhanced ? 'enhanced' : 'original']: false }));
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
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onDelete}
            className="h-7 w-7 text-destructive hover:text-destructive"
            aria-label="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
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
              {copied.original ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
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
                  {copied.enhanced ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  <span className="ml-1">{copied.enhanced ? 'Copied!' : 'Copy'}</span>
                </Button>

                <Popover.Root>
                  <Popover.Trigger asChild>
                    <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                      <MessageSquare className="h-4 w-4" />
                      <span className="ml-1">View Full</span>
                    </Button>
                  </Popover.Trigger>
                  <Popover.Content
                    side="bottom"
                    align="start"
                    className="w-96 p-4 rounded bg-background shadow-lg z-50"
                  >
                    <ReactMarkdown>{item.enhancedPrompt}</ReactMarkdown>
                  </Popover.Content>
                </Popover.Root>
              </div>
            </div>
            <p className="text-sm bg-muted/30 p-2 rounded">
              {truncateText(item.enhancedPrompt, 400)}
            </p>
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
            <Edit className="h-4 w-4" />
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
