/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {memo, useEffect, useRef} from 'react';
import {Streamdown} from 'streamdown';
import {Bot, Brain, Check, Clock, Pin, Star, User, X, Zap} from 'lucide-react';

// hooks
import {useTheme} from '~/components/ThemeProvider';

// utils
import {cn} from '~/utils/helpers';
import {THEME_COLORS} from './utils';

// ui components
import {Button} from '~/components/ui/Button';

// relative components
import MessageActions from './MessageActions';

// types
import type {ChatMessage} from './index';

/**
 * Props interface for the MessageBubble component.
 *
 * @remarks
 * - Required properties are passed directly from parent state. Optional event handlers are
 *   defined with optional chaining (`?`) to allow parent components to omit them.
 * - The `editContent` and `setEditContent` pair manage the input value for the edit textarea.
 * - `setEditingId` is used by child components (e.g., Action Buttons) to toggle edit mode.
 */
export interface MessageBubbleProps {
  /** The full message object containing role, content, metadata, and state flags. */
  msg: ChatMessage;
  /** Indicates if the message is currently being streamed or generated. */
  isStreamingActive: boolean;
  /** Current raw content for streaming display purposes. */
  content: string;
  /** The display name of the user associated with the message. */
  userRole: { name: string } | null;
  /** Current font size scaling factor for the message bubble. */
  fontSize: number;
  /** The current value of the edit textarea input. */
  editContent: string;
  /** State setter to control which message ID is currently in edit mode. */
  setEditingId: React.Dispatch<React.SetStateAction<string | null>>;
  /** Optional search query string for highlighting matching messages. */
  searchQuery?: string;
  /** ID of the last copied message, used to style the copy feedback icon. */
  copiedId: string | null;
  /** Boolean flag indicating if the message details panel is expanded. */
  isDetailsExpanded: boolean;

  /** Callback to update the value of the edit textarea. */
  setEditContent(c: string): void;

  /** Initiates edit mode for the provided message object. */
  handleEditStart(msg: ChatMessage): void;

  /** Saves the new content for the message with the given ID. */
  handleEditSave(id: string): void;

  /** Cancels the current edit operation and reverts content. */
  handleEditCancel(): void;

  /** Copies the message text to the clipboard and updates UI state. */
  handleCopy(id: string, text: string): void;

  /** Triggers a file download of the message text content. */
  onDownload(text: string): void;

  /** Regenerates the AI response for the message. */
  onRegenerate?(): void;

  /** Saves an edited version of the message. */
  onEditMessage?(id: string, newContent: string): void;

  /** Deletes the message with the given ID. */
  onDeleteMessage?(id: string): void;

  /** Switches the message variant/variant index for the given ID. */
  onSwitchVariant?(msgId: string, newIndex: number): void;

  /** Expands or collapses the details section of the message. */
  onToggleDetails(): void;

  /** Invoked when the user rates the message response. */
  onRate(id: string, rating: number): void;

  /** Updates the pin status of the message. */
  onPinMessage(id: string, isPinned: boolean): void;
}

const MessageBubble: React.FC<MessageBubbleProps> = (props) => {
  const {
    msg,
    isStreamingActive,
    content,
    userRole,
    fontSize,
    editContent,
    setEditContent,
    handleEditStart,
    handleEditSave,
    handleEditCancel,
    copiedId,
    handleCopy,
    onDownload,
    onRegenerate,
    onEditMessage,
    onDeleteMessage,
    onSwitchVariant,
    onToggleDetails,
    isDetailsExpanded,
    onRate,
    onPinMessage,
    setEditingId,
    searchQuery,
  } = props;

  // Determine theme colors
  const {theme} = useTheme();
  const resolvedTheme = theme === 'system' ? 'dark' : theme;
  const colors = THEME_COLORS[resolvedTheme];

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isEditing = false; // This is a placeholder, in a real app this would compare IDs.
  const displayContent = isStreamingActive ? content : msg.aiPrompt;
  const isHighlighted = searchQuery && msg.aiPrompt.toLowerCase().includes(searchQuery.toLowerCase());
  const isDarkTheme = resolvedTheme === 'dark';

  // Focus textarea when entering edit mode
  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isEditing]);

  const handleSaveClick = () => {
    if (editContent) {
      handleEditSave(msg.id);
    }
  };

  const handleCancelClick = () => {
    handleEditCancel();
  };

  const handleStartEditClick = () => {
    handleEditStart(msg);
  };

  return (
    <div className={cn(
      'group relative w-full mb-8 transition-all duration-300',
      msg.role === 'user' ? 'flex-row-reverse' : 'flex-row',
      msg.pinned && 'z-10',
    )}>
      <div className={cn(
        'flex flex-col max-w-[85%] relative',
        msg.role === 'user' ? 'items-end' : 'items-start',
      )}>

        {/* --- Header with Actions --- */}
        <div className="flex items-center gap-2 mb-2 px-2 w-full">
          <div className="">
            {msg.role === 'user' ? (
              <div
                className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center border-2 border-background shadow-lg">
                <User size={20} className="text-white"/>
              </div>
            ) : (
              <div
                className="h-10 w-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center border-2 border-background shadow-lg">
                <Bot size={20} className="text-gray-300"/>
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              {msg.pinned && <Pin size={14} className="text-yellow-400 fill-yellow-400"/>}
              <span className="text-xs font-bold" style={{color: `rgba(${colors.foregroundRgb}, 0.9)`}}>
              {msg.role === 'user' ? userRole?.name : 'AI Assistant'}
            </span>
              <span className="text-[10px] text-muted-foreground px-2 py-0.5 rounded-full backdrop-blur-sm"
                    style={{backgroundColor: 'rgba(var(--bg-rgb), 0.5)'}}>
              {new Intl.DateTimeFormat('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              }).format(msg.timestamp)}
            </span>
            </div>
          </div>

          {/* Action Bar: Hidden if Editing, Visible otherwise */}
          {!isEditing && (
            <MessageActions
              onToggleDetails={onToggleDetails}
              isDetailsExpanded={isDetailsExpanded}
              msg={msg}
              isStreaming={isStreamingActive}
              copiedId={copiedId}
              handleCopy={handleCopy}
              onDownload={onDownload}
              onRegenerate={onRegenerate}
              onEditMessage={onEditMessage}
              onDeleteMessage={onDeleteMessage}
              handleEditStart={handleStartEditClick}
              onSwitchVariant={onSwitchVariant}
              onRate={onRate}
              onPinMessage={onPinMessage}
              setEditingId={setEditingId}
            />
          )}
        </div>

        {/* --- Content Body --- */}

        {/* EDIT MODE: Textarea + Save/Cancel */}
        {isEditing ? (
          <div className="w-full relative">
             <textarea
               ref={textareaRef}
               value={editContent}
               onChange={(e) => setEditContent(e.target.value)}
               className={cn(
                 'w-full h-48 p-4 rounded-xl text-sm leading-relaxed font-mono resize-none custom-scrollbar focus:outline-none transition-shadow duration-300',
                 colors.background,
                 colors.foreground,
                 isHighlighted && 'ring-2 ring-blue-500/50',
               )}
               style={{
                 border: `1px solid ${colors.border}`,
                 boxShadow: `0 4px 6px -1px rgba(0, 0, 0, 0.1)`,
               }}
             />
            <div className="flex justify-end gap-2 mt-2 px-1">
              <Button size="sm" variant="outline" onClick={handleCancelClick} className="h-8 text-xs">
                <X size={12} className="mr-1"/> Cancel
              </Button>
              <Button size="sm" variant="default" onClick={handleSaveClick}
                      className="h-8 text-xs bg-blue-600 hover:bg-blue-500 text-white">
                <Check size={12} className="mr-1"/> Save Changes
              </Button>
            </div>
          </div>
        ) : (
          /* VIEW MODE: Rendered Markdown or Text */
          <div className={cn(
            'relative px-5 py-4 rounded-2xl text-sm leading-relaxed break-words transition-all duration-300 shadow-sm',
            msg.role === 'user'
              ? 'rounded-tr-sm w-full backdrop-blur-sm'
              : 'rounded-tl-sm w-full border border-transparent',
            isHighlighted && 'ring-2 ring-blue-500/50',
          )}
               style={{
                 fontSize: `${fontSize}px`,
                 ...(msg.role === 'user' ? {
                   backgroundColor: colors.card,
                   border: '1px solid rgba(59, 130, 246, 0.2)',
                 } : {
                   color: colors.foreground,
                   backgroundColor: 'transparent',
                 }),
               }}>
            {msg.role === 'user' ? (
              <div className="whitespace-pre-wrap">{displayContent}</div>
            ) : (
              <div className="prose prose-invert max-w-none relative">
                <Streamdown
                  shikiTheme={isDarkTheme ? ['github-dark', 'github-dark'] : ['github-light', 'github-light']}
                  isAnimating={false}>
                  {displayContent}
                </Streamdown>
                {isStreamingActive && (
                  <span
                    className="inline-block w-2 h-4 bg-blue-400 ml-1 align-middle animate-blink relative top-[-1px] shadow-[0_0_8px_rgba(59,130,246,0.5)]"></span>
                )}
              </div>
            )}
          </div>
        )}

        {/* --- Footer Stats (Mini) - Only visible in View Mode for Assistant --- */}
        {!isEditing && msg.role === 'assistant' && (
          <div
            className="flex items-center gap-3 mt-2 px-2 w-full opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md"
                 style={{backgroundColor: 'rgba(var(--bg-rgb), 0.3)'}}>
              <span className="text-[12px] font-mono text-blue-300 flex items-center gap-1">
                <Brain size={11} className="mr-1"/> {msg.model}
              </span>
              {msg.tokensUsed && <span className="text-[12px] text-green-400 flex items-center gap-1"><Zap
                size={10}/> {msg.tokensUsed}</span>}
              <span className="text-[12px] text-muted-foreground flex items-center gap-1"><Clock
                size={10}/> {msg.processingTime}ms</span>
            </div>
            <div className="ml-auto">
              {[1, 2, 3, 4, 5].map(s => (
                <button key={s} onClick={() => onRate(msg.id, s)}
                        className={cn('transition-transform hover:scale-125', s <= msg.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600')}>
                  <Star size={12} fill={s <= msg.rating ? 'currentColor' : 'none'}/>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(MessageBubble);
