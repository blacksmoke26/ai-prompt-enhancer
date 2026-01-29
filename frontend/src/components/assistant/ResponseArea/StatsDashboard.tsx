/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {Activity, Settings} from 'lucide-react';

// hooks
import {useTheme} from '~/components/ThemeProvider';

  // utils
import {THEME_COLORS} from './utils.ts';

// components
import StatBar from './StatBar';
import StatCircle from './StatCircle';

// types
import type {ChatMessage} from './index';

export interface StatsDashboardProps {
  /**
   * The chat message statistics to display.
   * Includes text data and token usage metrics.
   */
  stats: ChatMessage['stats'];
  /**
   * Optional additional metadata associated with the message.
   * e.g. source, format, etc.
   */
  metadata?: ChatMessage['metadata'];
}

const StatsDashboard: React.FC<StatsDashboardProps> = ({stats, metadata}) => {
  const {resolvedTheme} = useTheme();
  const colors = THEME_COLORS[resolvedTheme];

  return (
    <div className="w-full p-5 glass-panel rounded-xl shadow-2xl animate-scale-in border-t"
         style={{background: colors.card}}>
      <h3 className="text-sm font-bold mb-4 flex items-center gap-2 border-b pb-2" style={{borderColor: colors.border}}>
        <Activity className="text-blue-400" size={16}/> Statistics
      </h3>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <StatCircle label="Words" value={String(stats.textData[0]?.value || 0)} color="#3b82f6" size={50}/>
        <StatCircle label="Tokens" value={String(stats.tokenStats[2]?.value || 0)} color="#10b981" size={50}/>
      </div>
      <div className="space-y-3 mb-4">
        <StatBar label="Sentences" value={stats.textData[1]?.value || 0} max={50} color="#f59e0b"/>
        <StatBar label="Input Tokens" value={stats.tokenStats[0]?.value || 0} max={1000} color="#3b82f6"/>
        <StatBar label="Output Tokens" value={stats.tokenStats[1]?.value || 0} max={2000} color="#10b981"/>
      </div>
      {metadata && (
        <div className="mt-4 pt-4 border-t" style={{borderColor: colors.border}}>
          <h4 className="text-[10px] uppercase text-muted-foreground mb-2 flex items-center gap-1">
            <Settings size={10}/> Metadata
          </h4>
          <div className="grid grid-cols-2 gap-2 text-[10px]" style={{color: colors.foreground}}>
            <div className="truncate">Format: {metadata.format || 'N/A'}</div>
            <div className="truncate">Source: {metadata.source || 'N/A'}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsDashboard;
