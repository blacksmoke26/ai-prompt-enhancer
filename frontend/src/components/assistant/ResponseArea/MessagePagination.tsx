/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {memo} from 'react';
import {ChevronLeft, ChevronRight} from 'lucide-react';

// ui components
import {Button} from '~/components/ui/Button';

// types
import type {ChatMessage} from './index';

/**
 * Props for the MessagePagination component.
 * @description A collection of properties required for rendering a pagination control within a chat message bubble.
 */
export interface MessagePaginationProps {
  /** The chat message object containing variant data and current selection index. */
  msg: ChatMessage;
  /** Optional callback triggered when the user switches to a different message variant. */
  onSwitchVariant? (msgId: string, newIndex: number): void;
}

const MessagePagination: React.FC<MessagePaginationProps> = ({msg, onSwitchVariant}) => {
  const total = msg.variants?.length || 1;
  const current = msg.variantIndex !== undefined ? msg.variantIndex : 0;
  if (total <= 1) return null;
  if (msg.role !== 'user') return null;

  const handlePrev = () => {
    if (onSwitchVariant && current > 0) onSwitchVariant(msg.id, current - 1);
  };
  const handleNext = () => {
    if (onSwitchVariant && current < total - 1) onSwitchVariant(msg.id, current + 1);
  };

  return (
    <div className="flex items-center gap-1 rounded-sm px-1.5 py-0.5 border backdrop-blur-md"
         style={{backgroundColor: 'rgba(0,0,0,0.4)', borderColor: 'rgba(255,255,255,0.1)'}}>
      <Button size="xs" variant="ghost" onClick={handlePrev} disabled={current === 0}
              className="h-4 w-4 p-0 disabled:opacity-30" style={{color: 'rgba(255,255,255,0.7)'}}>
        <ChevronLeft size={10}/>
      </Button>
      <span className="text-[9px] font-mono w-6 text-center"
            style={{color: 'rgba(255,255,255,0.9)'}}>{current + 1}/{total}</span>
      <Button size="xs" variant="ghost" onClick={handleNext} disabled={current === total - 1}
              className="h-4 w-4 p-0 disabled:opacity-30" style={{color: 'rgba(255,255,255,0.7)'}}>
        <ChevronRight size={10}/>
      </Button>
    </div>
  );
};

export default memo(MessagePagination);
