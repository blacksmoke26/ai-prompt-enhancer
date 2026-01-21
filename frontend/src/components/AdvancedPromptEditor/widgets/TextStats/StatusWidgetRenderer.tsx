/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';

// utils
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
  const currentStats = props?.stats || {tokenEstimate: 0};

  return (
    <div
      className="col-span-1 sm:col-span-2 lg:col-span-1 xl:col-span-1 flex items-center justify-start p-4 rounded-xl border bg-muted/30">
      <div className="hidden md:flex flex-col ">
        <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Tokens</span>
        <span
          className="text-sm font-mono font-medium text-violet-600">{safeLocaleFormat(currentStats.tokenEstimate || 0)}</span>
      </div>
    </div>
  );
};

export default StatusWidgetRenderer;
