/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {LucideIcon} from 'lucide-react';

/**
 * Props for a statistical widget component displaying icons, labels, and values with customizable styling.
 * @example
 * {
 *   icon: ChartBar,
 *   label: "Users",
 *   value: 1250,
 *   subValue: "25% increase",
 *   textClass: "text-blue-600",
 *   bgClass: "bg-blue-100",
 *   highlight: true,
 *   colSpan: 2
 * }
 */
export interface StatWidgetProps {
  /**
   * The Lucide icon component to display alongside the widget.
   */
  icon: LucideIcon;

  /**
   * The descriptive label or title of the widget.
   */
  label: string;

  /**
   * The main value or data point to display in the widget.
   */
  value: React.ReactNode;

  /**
   * Optional secondary value or additional information to display beneath the main value.
   */
  subValue?: string;

  /**
   * Optional CSS class for customizing the text color or font styling.
   */
  textClass?: string;

  /**
   * Optional CSS class for customizing the background color or other visual aspects.
   */
  bgClass?: string;

  /**
   * Whether to apply a highlight style (e.g., border, glow, or emphasis) to the widget.
   */
  highlight?: boolean;

  /**
   * Optional number of columns to span in a grid layout (e.g., 1, 2, 3).
   */
  colSpan?: number;
}

/**
 * Developer Notes:
 * - This interface is designed for a reusable widget used in dashboards or data displays.
 * - The `icon`, `label`, and `value` are required for basic functionality.
 * - `textClass` and `bgClass` allow for theme customization and visual alignment with UI frameworks.
 * - `highlight` is typically used to draw attention to key metrics or anomalies.
 * - `colSpan` is useful for responsive layouts where widgets need to occupy varying column widths.
 */

const StatWidget: React.FC<StatWidgetProps> = (props) => {
  const {
    icon: Icon,
    label,
    value,
    subValue,
    textClass = 'text-blue-500',
    bgClass = 'bg-blue-100 dark:bg-blue-900/30',
    highlight = false,
    colSpan = 1,
  } = props;

  const spanClass = colSpan === 2
    ? 'col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-2'
    : 'col-span-1';

  return (
    <div className={`
      ${spanClass} flex flex-col justify-between p-3 rounded-xl border bg-card shadow-sm transition-all hover:shadow-md
      ${highlight ? 'bg-gradient-to-br from-background to-muted/30' : ''}
    `}>
      <div className="flex items-start justify-between">
        <div className={`p-2 rounded-lg ${bgClass} ${textClass} mb-2`}>
          <Icon className="h-4 w-4"/>
        </div>
        {subValue && <span
          className="text-[10px] font-mono uppercase text-muted-foreground bg-muted px-1.5 py-0.5 rounded">{subValue}</span>}
      </div>
      <div className="min-h-[2rem]">
        <div className={`font-bold ${highlight ? 'text-2xl' : 'text-lg'} tracking-tight text-foreground truncate`}>
          {value}
        </div>
        <div className="text-xs text-muted-foreground font-medium mt-1">{label}</div>
      </div>
    </div>
  );
};

export default StatWidget;
