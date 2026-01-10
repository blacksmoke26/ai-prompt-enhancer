/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {ArrowRight} from 'lucide-react';

// utils
import {cn} from '~/utils/helpers';

/**
 * Props interface for the StatWidget component, used to display statistical information with visual feedback.
 * Includes title, value, icon, gradient styling, and optional trend indicators.
 */
export interface StatWidgetProps {
  /** The main title or label for the statistic */
  title: string;
  /** The numerical or textual value of the statistic */
  value: string | number;
  /** A React element representing an icon to visually represent the statistic */
  icon: React.ReactNode;
  /** A CSS gradient string for background styling of the widget */
  gradient: string;
  /** Optional subtext or additional information to display below the value */
  subtext?: string;
  /** Optional trend indicator, either 'up' or 'down', to show direction of change */
  trend?: 'up' | 'down';
}

/**
 * A reusable widget component for displaying statistical data with visual enhancements.
 * Renders a title, value, icon, and optional trend indicators with gradient styling.
 * @developerNotes
 * - Assumes the existence of an `Icon` component or similar for rendering the icon.
 * - The `gradient` prop should be a valid CSS gradient string for background styling.
 * - The `trend` prop adds visual feedback (e.g., up/down arrows) based on the direction.
 * - Designed to be used in dashboards or analytics sections for quick data insights.
 */
const StatWidget: React.FC<StatWidgetProps> = (props) => {
  const {title, value, icon, gradient, subtext, trend} = props;

  return (
    <div
      className={cn('relative overflow-hidden rounded-xl border border-white/20 bg-white shadow-md transition-all hover:shadow-xl hover:-translate-y-1 dark:bg-gray-800 dark:border-gray-700 group', gradient)}>
      <div className="absolute right-0 top-0 opacity-10 transform translate-x-2 -translate-y-2">
        <div className="h-24 w-24 rounded-full bg-white dark:bg-gray-400"></div>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-white/80 flex items-center gap-1">{title}
              {trend && <ArrowRight className="h-3 w-3 opacity-70"/>}</p>
            <h3 className="mt-2 text-2xl font-bold text-white">{value}</h3>
            {subtext && <p className="text-xs text-white/60 mt-1">{subtext}</p>}
          </div>
          <div
            className="rounded-lg bg-white/20 p-3 text-white shadow-inner backdrop-blur-sm group-hover:scale-110 transition-transform">{icon}</div>
        </div>
      </div>
    </div>
  );
};

export default StatWidget;
