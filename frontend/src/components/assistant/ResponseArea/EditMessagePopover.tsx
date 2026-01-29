/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useEffect, useRef, useState} from 'react';
import {Check} from 'lucide-react';

// hooks
import {useTheme} from '~/components/ThemeProvider';

// utils
import {THEME_COLORS} from './utils';

// ui components
import {Button} from '~/components/ui/Button';

// types
import type {ChatMessage} from './index';

export interface EditMessagePopoverProps {
  /** The chat message object to be edited. */
  msg: ChatMessage;
  /** Controls whether the popover is visible. */
  isOpen: boolean;
  /** Callback function invoked when the user saves the edited message. */
  onSave(value: string): void;
  /** Callback function invoked when the user cancels the edit. */
  onCancel(): void;
}

/**
 * @description A React component that renders a popover for editing an AI message.
 * This component allows users to modify the `aiPrompt` of a `ChatMessage` and save or cancel the changes.
 * It supports focus management to ensure the textarea is automatically focused when the popover opens.
 *
 * @example
 * ```tsx
 * const [isEditing, setIsEditing] = useState(false);
 * const [message, setMessage] = useState<ChatMessage>({ id: '1', aiPrompt: 'Original text...' });
 *
 * const handleSave = (value: string) => {
 *   setMessage({ ...message, aiPrompt: value });
 *   setIsEditing(false);
 * };
 *
 * const handleCancel = () => setIsEditing(false);
 *
 * return (
 *   <EditMessagePopover
 *     msg={message}
 *     isOpen={isEditing}
 *     onSave={handleSave}
 *     onCancel={handleCancel}
 *   />
 * );
 * ```
 *
 * @returns A React JSX element representing the edit message popover.
 */
const EditMessagePopover: React.FC<EditMessagePopoverProps> = ({msg, onSave, onCancel, isOpen}) => {
  const [value, setValue] = useState(msg.aiPrompt);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const {resolvedTheme} = useTheme();
  const colors = THEME_COLORS[resolvedTheme];

  /**
   * @description Focuses the textarea and sets the cursor to the end when the popover opens.
   * @param {boolean} isOpen - Whether the popover is currently open.
   * @param {string} value - The current text value of the textarea.
   */
  useEffect(() => {
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(value.length, value.length);
    }
  }, [isOpen, value]);

  /**
   * @description Handles the save action by calling the onSave callback and resetting the internal state.
   */
  const handleSave = () => {
    onSave(value);
    setValue(msg.aiPrompt);
  };

  return (
    <div className="w-[400px] glass-panel rounded-xl shadow-2xl p-4 animate-scale-in border border-blue-500/30"
         style={{background: colors.card}}>
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-sm font-semibold" style={{color: colors.foreground}}>Edit Message</h4>
        <span className="text-[10px] text-muted-foreground">ID: {msg.id}</span>
      </div>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full h-32 border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 font-mono resize-none custom-scrollbar"
        style={{backgroundColor: colors.background, color: colors.foreground, borderColor: colors.border}}
      />
      <div className="flex justify-end gap-2 mt-3">
        <Button size="sm" variant="outline" onClick={onCancel} className="text-xs">Cancel</Button>
        <Button leftIcon={<Check size={12}/>} size="sm" variant="default" onClick={handleSave}
                className="text-xs bg-blue-600 hover:bg-blue-500">
          Save
        </Button>
      </div>
    </div>
  );
};

export default EditMessagePopover;
