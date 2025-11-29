import React from 'react';
import { Save, RefreshCw, CheckCircle } from 'lucide-react';

/**
 * AutoSaveIndicator component props.
 */
export interface AutoSaveIndicatorProps {
  /** Current auto-save status: 'idle', 'saving', or 'saved'. */
  autoSaveStatus: 'idle' | 'saving' | 'saved';
  /** Timestamp of the last save, or null if never saved. */
  lastSaved: Date | null;
}

/**
 * Visual indicator for auto-save status with dynamic icons and timestamps.
 * @example
 * <AutoSaveIndicator autoSaveStatus="saved" lastSaved={new Date()} />
 * @developer_note Ensure `lastSaved` is provided when status is 'saved' for accurate timestamp display.
 */
const AutoSaveIndicator: React.FC<AutoSaveIndicatorProps> = ({
  autoSaveStatus,
  lastSaved
}) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center space-x-1">
        {autoSaveStatus === 'saving' && <RefreshCw className="h-4 w-4 animate-spin text-blue-500"/>}
        {autoSaveStatus === 'saved' && <CheckCircle className="h-4 w-4 text-green-500"/>}
        {autoSaveStatus === 'idle' && <Save className="h-4 w-4"/>}
      </div>
      <span className="text-xs text-muted-foreground">
        {autoSaveStatus === 'saving' && 'Auto-saving...'}
        {autoSaveStatus === 'saved' && lastSaved && `Saved at ${lastSaved.toLocaleTimeString()}`}
        {autoSaveStatus === 'idle' && 'Auto-save enabled'}
      </span>
    </div>
  );
};

export default AutoSaveIndicator;
