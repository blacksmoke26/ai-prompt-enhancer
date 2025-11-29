import React from 'react';
import { Badge } from '~/components/ui/Badge';
import { Save, RefreshCw, CheckCircle } from 'lucide-react';

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
 * - Currently uses dots for visual separation (could be enhanced with proper separators)
 */
const TextStats: React.FC<TextStatsProps> = ({
  wordCount,
  charCount,
  readingTime,
  tokenEstimate,
  autoSaveStatus,
  lastSaved,
  maxLength
}) => {
  return (
    <div className="flex items-center justify-between text-xs text-muted-foreground bg-background px-2 py-2 rounded">
      <div className="flex items-center space-x-2">
        <span>{charCount}</span>
        <span className="text-muted-foreground">/</span>
        <span>{maxLength}</span>
        <span>•</span>
        <span>{tokenEstimate} tokens</span>
      </div>
      <div className="flex items-center space-x-1">
        <span className="text-xs">Reading time: {readingTime} min</span>
        <div className="w-px h-px bg-muted-foreground mx-2 rounded"/>
        <div className="flex items-center space-x-1">
          {autoSaveStatus === 'saving' && <RefreshCw className="h-3 w-3 animate-spin"/>}
          {autoSaveStatus === 'saved' && <CheckCircle className="h-3 w-3 text-green-500"/>}
          {autoSaveStatus === 'idle' && <Save className="h-3 w-3"/>}
        </div>
      </div>
    </div>
  );
};

export default TextStats;
