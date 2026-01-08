/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {CheckCircle, RefreshCw, Save} from 'lucide-react';

// utils
import {DEFAULT_CONFIG} from './utils';
import {safeLocaleFormat} from '~/utils/strings';

// types
import type {TextStatsProps} from './index';
import type {CalculatedStats, TextStatsConfig} from './CharWidgetRenderer';

/**
 * Renders a status widget based on calculated statistics and configuration settings.
 * This component is designed to be flexible and reusable across different text stats contexts.
 */
export interface StatusWidgetRendererProps {
  /**
   * The calculated statistics data used to render the widget's status information.
   */
  stats?: CalculatedStats;

  /**
   * Configuration settings for text statistics, such as display options or thresholds.
   */
  config?: TextStatsConfig;

  /**
   * Additional props inherited from `TextStatsProps`, used to control auto-save status and last saved time.
   */
  props?: Pick<TextStatsProps, 'autoSaveStatus' | 'lastSaved'>;
}

/**
 * Renders a status widget based on calculated statistics and configuration settings.
 * @param {StatusWidgetRendererProps} props - The component props.
 * @returns {JSX.Element} The rendered status widget.
 * @developerNotes
 * - This is a functional React component.
 * - Props are optional to allow for flexible usage without requiring all properties.
 * - The `props` field is a subset of `TextStatsProps` to avoid unnecessary prop drilling.
 */
const StatusWidgetRenderer: React.FC<StatusWidgetRendererProps> = (props) => {
  const {autoSaveStatus = 'idle', lastSaved} = props.props || {};
  const currentStats = props?.stats || {tokenEstimate: 0};
  const currentConfig = props.config || DEFAULT_CONFIG;
  const locale = currentConfig.locale;

  let formattedLastSaved: string | null = null;
  if (lastSaved) {
    try {
      const dateObj = lastSaved instanceof Date ? lastSaved : new Date(lastSaved);
      if (!isNaN(dateObj.getTime())) {
        formattedLastSaved = dateObj.toLocaleTimeString(locale || [], {hour: '2-digit', minute: '2-digit'});
      }
    } catch (e) {
      // nothing to do
    }
  }

  // Dynamic Status Colors
  let StatusIcon = Save;
  let statusColorClass = 'text-slate-500';
  let statusBgClass = 'bg-slate-100 dark:bg-slate-900/30';
  let statusLabel = 'Auto-save';

  if (autoSaveStatus === 'saving') {
    StatusIcon = RefreshCw;
    statusColorClass = 'text-blue-500';
    statusBgClass = 'bg-blue-100 dark:bg-blue-900/30';
    statusLabel = 'Saving...';
  } else if (autoSaveStatus === 'saved') {
    StatusIcon = CheckCircle;
    statusColorClass = 'text-emerald-500';
    statusBgClass = 'bg-emerald-100 dark:bg-emerald-900/30';
    statusLabel = 'Saved';
  }

  return (
    <div
      className="col-span-1 sm:col-span-2 lg:col-span-1 xl:col-span-2 flex items-center justify-between p-4 rounded-xl border bg-muted/30">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className={`p-1.5 rounded-full ${statusBgClass} ${statusColorClass}`}>
            <StatusIcon className="h-4 w-4"/>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-foreground">{statusLabel}</span>
          {formattedLastSaved && (
            <span className="text-[10px] text-muted-foreground font-mono">Last edit: {formattedLastSaved}</span>
          )}
        </div>
      </div>
      <div className="hidden md:flex flex-col items-end">
        <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Tokens</span>
        <span
          className="text-sm font-mono font-medium text-violet-600">{safeLocaleFormat(currentStats.tokenEstimate || 0)}</span>
      </div>
    </div>
  );
};

export default StatusWidgetRenderer;
