/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {memo} from 'react';
import {BarChart3, Check, ClipboardCopy, Copy, CopyCheck, Download, Edit2, RefreshCw, Trash2} from 'lucide-react';
import {removeMarkdown} from '@excalidraw/markdown-to-text';

// utils
import {cn} from '~/utils/helpers';

// ui components
import {Button} from '~/components/ui/Button';
import Popover from '~/components/ui/Popover';
import {TooltipMini} from '~/components/ui/Tooltip';

// components
import TextStatsTrigger from '~/components/AdvancedPromptEditor/TextStatsTrigger';
import DeepTextAnalysisTrigger from '~/components/AdvancedPromptEditor/DeepTextAnalysisTrigger';
import AdvancedWordAnalysisTrigger from '~/components/AdvancedPromptEditor/AdvancedWordAnalysisTrigger';

// relative components
import StatsDashboard from './StatsDashboard';
import MessagePagination from './MessagePagination';
import EditMessagePopover from './EditMessagePopover';

// types
import type {ChatMessage} from './index';

export interface MessageActionsProps {
  msg: ChatMessage;
  isStreaming: boolean;
  copiedId: string | null;
  setEditingId: React.Dispatch<React.SetStateAction<string | null>>;
  isDetailsExpanded: boolean;

  handleCopy(id: string, text: string): void;

  onDownload(text: string): void;

  onRegenerate?(): void;

  onEditMessage?(id: string, newContent: string): void;

  onDeleteMessage?(id: string): void;

  handleEditStart(msg: ChatMessage): void;

  onSwitchVariant?(msgId: string, newIndex: number): void;

  onToggleDetails(): void;

  onRate(id: string, rating: number): void;

  onPinMessage(id: string, isPinned: boolean): void;
}

const MessageActions: React.FC<MessageActionsProps> = memo((props) => {
  const {
    msg,
    isStreaming,
    copiedId,
    handleCopy,
    onDownload,
    onRegenerate,
    onEditMessage,
    onDeleteMessage,
    handleEditStart,
    onSwitchVariant,
    onToggleDetails,
    isDetailsExpanded,
    onRate,
    setEditingId,
    onPinMessage,
  } = props;

  return (
    <div
      className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 px-1.5"
    >
      {/* 1. Analysis Tools Group */}
      <div className="flex items-center border-r pr-1 gap-0.5 mr-1" style={{borderColor: 'rgba(var(--fg-rgb), 0.1)'}}>
        <TextStatsTrigger disabled={isStreaming} prompt={msg.aiPrompt}/>
        <DeepTextAnalysisTrigger disabled={isStreaming} prompt={msg.aiPrompt}/>
        <AdvancedWordAnalysisTrigger prompt={msg.aiPrompt}/>
      </div>

      {/* 2. Variant Pagination */}
      <MessagePagination msg={msg} onSwitchVariant={onSwitchVariant}/>

      {/* 3. Download Button */}
      <Button
        size="xs"
        variant="ghost"
        onClick={() => onDownload(msg.aiPrompt)}
        className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
      >
        <TooltipMini title="Download"><Download size={12}/></TooltipMini>
      </Button>

      {/* 4. Copy Button */}
      <Button
        size="xs"
        variant="ghost"
        onClick={() => handleCopy(msg.id, msg.aiPrompt)}
        className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
      >
        <TooltipMini title="Copy">
          <Copy size={12}/>
        </TooltipMini>
      </Button>

      {msg.role === 'assistant' && (
        <Button
          size="xs"
          variant="ghost"
          onClick={() => handleCopy(msg.id, removeMarkdown(msg.aiPrompt))}
          className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
        >
          <TooltipMini title="Copy plain text">
            <CopyCheck size={12}/>
          </TooltipMini>
        </Button>
      )}

      {msg?.internalPrompt?.trim?.() && msg.role === 'assistant' && (
        <Button
          size="xs"
          variant="ghost"
          onClick={() => handleCopy(msg.id, removeMarkdown(msg?.internalPrompt ?? ''))}
          className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
        >
          <TooltipMini title="Copy AI Prompt">
            <ClipboardCopy size={12}/>
          </TooltipMini>
        </Button>
      )}

      {/* 5. Regenerate Button (Assistant Only) */}
      {msg.role === 'assistant' && !isStreaming && onRegenerate && (
        <Button
          size="xs"
          variant="ghost"
          onClick={onRegenerate}
          className="h-6 w-6 p-0 text-blue-400 hover:text-blue-300"
        >
          <TooltipMini title="Regenerate"><RefreshCw size={12}/></TooltipMini>
        </Button>
      )}

      {/* 6. Edit & Delete (User Only) */}
      {msg.role === 'user' && !isStreaming && (
        <>
          <Popover
            closeOnOutsideClick={true}
            showHeader={false}
            showFooter={false}
            trigger={(opener) => (
              <Button
                size="xs"
                variant="ghost"
                onClick={() => {
                  if (handleEditStart) handleEditStart(msg);
                  opener?.();
                }}
                className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
              >
                <TooltipMini title="Edit"><Edit2 size={12}/></TooltipMini>
              </Button>
            )}
          >
            <EditMessagePopover
              msg={msg}
              isOpen={false}
              onSave={(newContent) => {
                if (onEditMessage) {
                  onEditMessage(msg.id, newContent);
                }
                setEditingId(null);
              }}
              onCancel={() => setEditingId(null)}
            />
          </Popover>
          {onDeleteMessage && (
            <Button
              size="xs"
              variant="ghost"
              onClick={() => onDeleteMessage(msg.id)}
              className="h-6 w-6 p-0 text-red-400 hover:text-red-300"
            >
              <TooltipMini title="Delete"><Trash2 size={12}/></TooltipMini>
            </Button>
          )}
        </>
      )}

      {/* 7. Stats / Details (Assistant Only) - Uses isDetailsExpanded */}
      {msg.role === 'assistant' && (
        <Popover
          closeOnOutsideClick={true}
          showHeader={false}
          showFooter={false}
          showArrow={false}
          trigger={(opener) => (
            <Button
              size="xs"
              variant="plain"
              onClick={() => {
                if (onToggleDetails) onToggleDetails();
                opener?.();
              }}
              // IMPLEMENTED: Visual state based on isDetailsExpanded
              className={cn(
                'h-6 w-6 p-0 text-muted-foreground relative',
                isDetailsExpanded && 'text-blue-400', // Highlight when active
              )}
            >
              <TooltipMini title="Statistics">
                <BarChart3
                  size={12}
                  className={isDetailsExpanded ? 'text-blue-500' : ''}
                />
              </TooltipMini>
            </Button>
          )}
        >
          <StatsDashboard stats={msg.stats} metadata={msg.metadata}/>
        </Popover>
      )}

      {/* 8. Rating (Implemented) - Triggered via Popover */}
      {/*{msg.role === 'assistant' && onRate && (
        <Popover
          closeOnOutsideClick={true}
          showHeader={false}
          showFooter={false}
          showArrow={true}
          trigger={(opener) => (
            <Button
              size="xs"
              variant="ghost"
              onClick={() => {
                opener?.();
              }}
              // Highlight active rating
              className={cn(
                'h-6 w-6 p-0 text-muted-foreground hover:text-foreground',
                msg.rating > 0 && 'text-yellow-400',
              )}
            >
              <TooltipMini title="Rate Response">
                {msg.rating > 0 ? (
                  <div className="flex">
                    <StarIcon size={12} fill="currentColor"/>
                    <span className="text-[9px] ml-0.5 font-bold">{msg.rating}</span>
                  </div>
                ) : (
                  <StarIcon size={12}/>
                )}
              </TooltipMini>
            </Button>
          )}
        >
          <div className="p-2 bg-background">
            <StarRatingSelector
              currentRating={msg.rating}
              onSelect={(r) => onRate(msg.id, r)}
            />
          </div>
        </Popover>
      )}*/}

      {/* 9. Pin Button */}
      {/*<Button
        size="xs"
        variant="ghost"
        onClick={() => onPinMessage(msg.id, !msg.pinned)}
        className="h-6 w-6 p-0 text-rose-500 hover:text-rose-400"
      >
        <TooltipMini title={msg.pinned ? 'Unpin' : 'Pin'}>
          <Pin size={12} className={msg.pinned ? 'fill-current' : ''}/>
        </TooltipMini>
      </Button>*/}
    </div>
  );
});

export default MessageActions;
