import React from 'react';
import { Button } from '~/components/ui/Button';
import { Copy, Download, Share2, Eye, Trash2, Zap } from 'lucide-react';

/**
 * Props for the ActionButtons component
 * @developer-note All handlers are provided by parent component to maintain separation of concerns
 * @example
 * <ActionButtons
 *   value="sample text"
 *   handleCopy={async () => await navigator.clipboard.writeText(value)}
 *   handleDownload={() => downloadFile(value)}
 *   handleShare={async () => shareContent(value)}
 *   handleClear={() => setValue('')}
 *   handleEnhance={() => onEnhance(value)}
 *   onEnhance={enhanceFunction}
 *   disabled={false}
 *   showActions={true}
 * />
 */
export interface ActionButtonsProps {
  /** Current text value to perform actions on */
  value: string;
  /** Async handler for copying content to clipboard */
  handleCopy?(): Promise<void>;
  /** Handler for downloading content as file */
  handleDownload?(): void;
  /** Async handler for sharing content */
  handleShare?(): Promise<void>;
  /** Handler for clearing the content */
  handleClear?(): void;
  /** Handler for enhancing the content */
  handleEnhance?(): void;
  /** Optional enhance function from parent */
  onEnhance?: (value: string) => void;
  /** Whether enhance button should be disabled */
  disabled?: boolean;
  /** Whether to show the action buttons at all */
  showActions?: boolean;
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
const ActionButtons: React.FC<ActionButtonsProps> = ({
  value,
  handleCopy = () => {},
  handleDownload = () => {},
  handleShare = () => {},
  handleClear = () => {},
  handleEnhance = () => {},
  onEnhance = undefined,
  disabled = false,
  showActions = true
}) => {
  if (!showActions) return null;

  return (
    <div className="flex items-center justify-between py-6 px-4 border-t border-border">
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          disabled={!value.trim()}
        >
          <Copy className="h-4 w-4 mr-2"/>
          Copy
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleDownload}
          disabled={!value.trim()}
        >
          <Download className="h-4 w-4 mr-2"/>
          Download
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleShare}
          disabled={!value.trim()}
        >
          <Share2 className="h-4 w-4 mr-2"/>
          Share
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const textarea = document.querySelector('textarea');
            if (textarea) {
              textarea.select();
            }
          }}
          disabled={!value.trim()}
        >
          <Eye className="h-4 w-4 mr-2"/>
          Select
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="destructive"
          size="sm"
          onClick={handleClear}
          disabled={!value.trim()}
        >
          <Trash2 className="h-4 w-4 mr-2"/>
          Clear
        </Button>

        {onEnhance && (
          <Button
            variant="default"
            size="sm"
            onClick={handleEnhance}
            disabled={!value.trim() || disabled}
          >
            <Zap className="h-4 w-4 mr-2"/>
            Enhance
          </Button>
        )}
      </div>
    </div>
  );
};

export default ActionButtons;
