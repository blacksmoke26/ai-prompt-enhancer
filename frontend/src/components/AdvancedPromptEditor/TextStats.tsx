import React from 'react';
import {Save, RefreshCw, CheckCircle} from 'lucide-react';

/**
 * Props for the TextStats component
 * @interface TextStatsProps
 */
export interface TextStatsProps {
  /** Total word count in the text */
  wordCount: number;
  /** Total character count in the text */
  charCount: number;
  /** Estimated reading time in minutes */
  readingTime: number;
  /** Estimated token count for AI processing */
  tokenEstimate: number;
  /** Current auto-save status indicator */
  autoSaveStatus: 'idle' | 'saving' | 'saved';
  /** Timestamp of last save operation */
  lastSaved: Date | null;
  /** Maximum allowed character count */
  maxLength: number;
  /** Display line count in stats panel */
  displayLineCount?: boolean;
  /** Line count to display */
  lineCount?: number;
}

/**
 * TextStats component displays text statistics and save status
 * Shows character count, token estimate, reading time, and auto-save status
 *
 * @example
 * <TextStats
 *   wordCount={150}
 *   charCount={800}
 *   readingTime={2}
 *   tokenEstimate={200}
 *   autoSaveStatus="saved"
 *   lastSaved={new Date()}
 *   maxLength={1000}
 * />
 *
 * @developer_notes
 * - Uses lucide-react icons for save status indicators
 * - Responsive design with flexbox layout
 * - Status icons change color and animation based on state
 * - Properly implements all declared props including unused ones
 */
const TextStats: React.FC<TextStatsProps> = (props) => {
  const {wordCount, charCount, readingTime, tokenEstimate, autoSaveStatus, lastSaved, maxLength, displayLineCount, lineCount} = props;

  // Format the last saved timestamp if available
  const formattedLastSaved = lastSaved ? lastSaved.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}) : null;

  return (
    <div
      className="flex items-center justify-between text-xs text-muted-foreground bg-background px-3 py-2 mt-1 rounded-md border">
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-1">
          <span className="font-medium">Chars:</span>
          <span>{charCount}</span>
          <span className="text-muted-foreground">/</span>
          <span>{maxLength}</span>
        </div>
        <div className="w-px h-4 bg-muted-foreground mx-2 rounded"></div>
        <div className="flex items-center space-x-1">
          <span className="font-medium">Words:</span>
          <span>{wordCount}</span>
        </div>
        {displayLineCount !== false && (
          <>
            <div className="w-px h-4 bg-muted-foreground mx-2 rounded"></div>
            <div className="flex items-center space-x-1">
              <span className="font-medium">Lines:</span>
              <span>{lineCount ?? 0}</span>
            </div>
          </>
        )}
        <div className="w-px h-4 bg-muted-foreground mx-2 rounded"></div>
        <div className="flex items-center space-x-1">
          <span className="font-medium">Tokens:</span>
          <span>{tokenEstimate}</span>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-1">
          <span className="font-medium">Reading:</span>
          <span>{readingTime} min</span>
        </div>
        <div className="w-px h-4 bg-muted-foreground mx-2 rounded"></div>
        <div className="flex items-center space-x-1">
          {autoSaveStatus === 'saving' && (
            <div className="flex items-center space-x-1 text-blue-500">
              <RefreshCw className="h-3 w-3 animate-spin"/>
              <span>Saving...</span>
            </div>
          )}
          {autoSaveStatus === 'saved' && (
            <div className="flex items-center space-x-1 text-green-500">
              <CheckCircle className="h-3 w-3"/>
              <span>Saved</span>
            </div>
          )}
          {autoSaveStatus === 'idle' && (
            <div className="flex items-center space-x-1 text-muted-foreground">
              <Save className="h-3 w-3"/>
              <span>Auto-save</span>
            </div>
          )}
          {lastSaved && (
            <div className="text-xs text-muted-foreground">
              {formattedLastSaved}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextStats;
