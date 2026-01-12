/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {Button} from '@radix-ui/themes';
import {Copy, Download, Share2} from 'lucide-react';

/**
 * Props for the ActionButtons component
 * @developer-note All handlers are provided by parent component to maintain separation of concerns
 */
export interface ActionButtonsProps {
  /** Current text value to perform actions on */
  value: string;
  /** Whether enhance button should be disabled */
  disabled?: boolean;
  /** Whether to show the action buttons at all */
  showActions?: boolean;

  /** Async handler for copying content to clipboard */
  handleCopy?(): Promise<void>;

  /** Handler for downloading content as file */
  handleDownload?(): void;

  /** Async handler for sharing content */
  handleShare?(): Promise<void>;
}

/**
 * ActionButtons component renders a set of utility buttons for text manipulation
 * @developer-note Component is conditionally rendered based on showActions prop
 * @example
 * // Basic usage
 * <ActionButtons
 *   value={text}
 *   handleCopy={copyHandler}
 *   handleDownload={downloadHandler}
 *   handleShare={shareHandler}
 *   handleClear={clearHandler}
 *   handleEnhance={enhanceHandler}
 *   onEnhance={undefined}
 *   disabled={false}
 *   showActions={true}
 * />
 */
const ActionButtons: React.FC<ActionButtonsProps> = (props) => {
  const {
    value,
    handleCopy = () => {
    },
    handleDownload = () => {
    },
    handleShare = () => {
    },
    showActions = true,
  } = props;

  if (!showActions) return null;

  return (
    <div className="flex items-center justify-between py-6 px-4 border-t border-border">
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          color="gray"
          onClick={handleCopy}
          disabled={!value.trim()}
          className="text-xs">
          <Copy className="h-3 w-3"/>
          Copy
        </Button>
        <Button
          variant="ghost"
          color="gray"
          onClick={handleDownload}
          disabled={!value.trim()}
          className="text-xs">
          <Download className="h-3 w-3"/>
          Download
        </Button>
        <Button
          variant="ghost"
          color="gray"
          onClick={handleShare}
          disabled={!value.trim()}
          className="text-xs">
          <Share2 className="h-3 w-3"/>
          Share
        </Button>
      </div>
    </div>
  );
};

export default ActionButtons;
