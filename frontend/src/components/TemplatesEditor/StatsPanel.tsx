/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {FileText, Moon, Terminal} from 'lucide-react';

// utils
import {
  getStatusBadgeClassName,
  PROMPT_STATUS_ICONS,
  PROMPT_STATUS_LABELS,
} from './utils';

// relative components
import StatItem from './StatItem';

// types
import type {PromptStatus, Variable} from './index';

/**
 * Props for the StatsPanel component.
 */
export interface StatsPanelProps {
  /** The string content of the prompt to analyze. */
  content: string;
  /** An array of variables defined in the prompt. */
  variables: Variable[];
  /** The current status of the prompt (optional). */
  status?: PromptStatus;
}

/**
 * StatsPanel displays key metrics and metadata about a prompt, including
 * word count, character count, reading time, and a calculated complexity score.
 * It also optionally displays the prompt's current processing status.
 *
 * @param props - The component properties.
 */
const StatsPanel: React.FC<StatsPanelProps> = (props) => {
  const {content, variables, status} = props;

  const wordCount = content.trim().split(/\s+/).filter((w) => w.length > 0).length;
  const readTime = Math.ceil(wordCount / 200);
  const charCount = content.length;
  const varCount = variables.length;
  const complexity = Math.min(100, Math.floor(charCount / 100 + varCount * 5));

  const statusLabel = status ? PROMPT_STATUS_LABELS[status] ?? status : null;
  const StatusIcon = status ? PROMPT_STATUS_ICONS[status] : null;

  return (
    <div className="p-4 space-y-6 h-full">
      {/* Status section */}
      {status && statusLabel && StatusIcon && (
        <div>
          <h3 className="text-xs font-bold uppercase text-muted-foreground mb-3">
            Status
          </h3>
          <div
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[11px] font-medium uppercase tracking-wide transition-colors ${getStatusBadgeClassName(
              status,
            )}`}
          >
            <StatusIcon size={12}/>
            <span>{statusLabel}</span>
          </div>
        </div>
      )}
      {/* Metrics */}
      <div>
        <h3 className="text-xs font-bold uppercase text-muted-foreground mb-3">
          Metrics
        </h3>
        <div className="space-y-3">
          <StatItem icon={<FileText size={14}/>} label="Words" value={wordCount}/>
          <StatItem icon={<Terminal size={14}/>} label="Chars" value={charCount}/>
          <StatItem
            icon={<Moon size={14}/>}
            label="Read Time"
            value={`~${readTime} min`}
          />
        </div>
      </div>

      {/* Complexity */}
      <div>
        <h3 className="text-xs font-bold uppercase text-muted-foreground mb-3">
          Complexity
        </h3>
        <div className="bg-muted/50 rounded-lg p-4 border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Score</span>
            <span className="text-lg font-bold text-primary">{complexity}/100</span>
          </div>
          <div className="h-2 bg-background rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{width: `${complexity}%`}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;
