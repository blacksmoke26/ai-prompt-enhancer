/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {Languages} from 'lucide-react';

// utils
import type {CalculatedStats} from './CharWidgetRenderer';

const HarakatWidgetRenderer = (props: { stats?: CalculatedStats }) => {
  const currentStats = props.stats || {harakatBreakdown: {zabar: 0, zer: 0, paish: 0}};

  return (
    <div
      className="p-3 rounded-xl border bg-rose-50/50 dark:bg-rose-900/10 border-rose-200 dark:border-rose-900/30 col-span-1 sm:col-span-2">
      <div className="text-[10px] text-rose-700 dark:text-rose-400 font-bold uppercase mb-2 flex items-center gap-2">
        <Languages className="h-3 w-3"/>
        Harakat Breakdown
      </div>
      <div className="flex justify-between gap-2 text-center">
        {[
          {key: 'zabar', label: 'Zabr', val: currentStats.harakatBreakdown.zabar},
          {key: 'zer', label: 'Zer', val: currentStats.harakatBreakdown.zer},
          {key: 'paish', label: 'Paish', val: currentStats.harakatBreakdown.paish},
        ].map(item => (
          <div key={item.key}
               className="flex-1 bg-background rounded p-1.5 border border-rose-100 dark:border-rose-900/30">
            <div className="text-lg font-bold text-rose-800 dark:text-rose-300">{item.val}</div>
            <div className="text-[9px] text-muted-foreground">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HarakatWidgetRenderer;
