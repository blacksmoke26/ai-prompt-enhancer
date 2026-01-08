/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useMemo} from 'react';

// utils
import {DEFAULT_WIDGETS, WIDGET_THEMES, WidgetConfig} from './utils';
import {safeString} from '~/utils/strings';
import {calculateStats, getWidgetLabel, getWidgetValue, resolveConfig} from './textStatsUtils';

// components
import StatWidget from './StatWidget';
import StatusWidgetRenderer from './StatusWidgetRenderer';
import HarakatWidgetRenderer from './HarakatWidgetRenderer';
import CharWidgetRenderer, {CalculatedStats, TextStatsConfig} from './CharWidgetRenderer';

/**
 * Props for the TextStats component
 */
export interface TextStatsProps {
  /** The text content to analyze (defaults to empty string) */
  text?: string | null;
  /** Current auto-save status (defaults to 'idle') */
  autoSaveStatus?: 'idle' | 'saving' | 'saved' | null;
  /** Timestamp of last save operation */
  lastSaved?: Date | string | null;
  /** Global configuration for calculations */
  config?: TextStatsConfig | null;
  /** Array of widget configurations to define layout and content */
  widgets?: WidgetConfig[] | null;
}

/**
 * Represents calculated text statistics including word count, readability scores, and linguistic analysis.
 * @DeveloperNotes
 * - This interface is used by components that display text analysis results.
 * - Ensure all properties are correctly calculated using robust text processing libraries.
 * - Properties like `harakatBreakdown` require specific language handling (e.g., Arabic).
 * - Readability scores (Flesch, Gunning Fog) may vary based on implementation and language.
 */
const TextStats: React.FC<TextStatsProps> = (props) => {
  const {
    text: rawText = '',
    autoSaveStatus = 'idle',
    lastSaved,
    config: userConfig,
    widgets: userWidgets,
  } = props;

  const text = safeString(rawText);

  // Use extracted config resolver
  const config: TextStatsConfig = useMemo(() => resolveConfig(userConfig), [userConfig]);

  const activeWidgets = useMemo(() => {
    const source = Array.isArray(userWidgets) ? userWidgets : DEFAULT_WIDGETS;
    return source.filter(w => w?.visible !== false);
  }, [userWidgets]);

  // Use extracted stats calculator
  const stats = useMemo((): CalculatedStats => calculateStats(text, config), [text, config]);

  return (
    <div className="mt-3 w-full bg-background border-t border-b md:border md:rounded-xl shadow-sm p-4 md:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:col-span-4 xl:grid-cols-6 gap-4">
        {activeWidgets.map((cfg, idx) => {
          if (!cfg || !cfg.type) return null;

          // 1. Handle Custom Renderers
          if (cfg.customRender) {
            return (
              <div key={idx}
                   className={cfg.colSpan === 2 ? 'col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-2' : 'col-span-1'}>
                {cfg.customRender(stats, config)}
              </div>
            );
          }

          // 2. Handle Special Built-in Renderers
          if (cfg.type === 'chars') return <CharWidgetRenderer key={idx} stats={stats} config={config}/>;
          if (cfg.type === 'status') return <StatusWidgetRenderer key={idx} stats={stats} config={config}
                                                                  props={{autoSaveStatus, lastSaved}}/>;

          // 3. Handle Harakat (Special Condition)
          if (cfg.type === 'harakat') {
            if (!stats.isRtl) return null;
            return <HarakatWidgetRenderer key={idx} stats={stats}/>;
          }

          // 4. Conditionals for Standard Widgets
          if ((cfg.type === 'readability_level' || cfg.type === 'gunning_fog' || cfg.type === 'readability_score') && stats.isRtl) return null;

          // 5. Resolve Theme & Colors
          const theme = WIDGET_THEMES[cfg.type] || WIDGET_THEMES.status;
          const Icon = cfg.icon || theme.Icon;

          let textClass = cfg.colorClass || theme.textClass;
          let bgClass = theme.bgClass;

          if (cfg.type === 'readability_level') {
            textClass = stats.readabilityColor;
            bgClass = stats.readabilityBg || theme.bgClass;
          }

          // 6. Handle Standard Widgets
          return (
            <StatWidget
              key={idx}
              icon={Icon}
              label={getWidgetLabel(cfg.type, cfg.label)}
              value={getWidgetValue(cfg, stats, config)}
              subValue={cfg.subValue || undefined}
              textClass={textClass}
              bgClass={bgClass}
              highlight={!!cfg.highlight}
              colSpan={cfg.colSpan ?? 1}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TextStats;
