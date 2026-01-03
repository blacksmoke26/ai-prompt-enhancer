/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';

export interface RawPieData {
  label: string;
  value: number;
  color: string;
}

export interface PieEntry extends RawPieData {
  startPercent: number;
  percent: number;
}

export interface DonutProps {
  data: { noun: number; verb: number; adj: number; other: number };
}

const DonutChart: React.FC<DonutProps> = ({data}) => {
  const total = data.noun + data.verb + data.adj + data.other;

  // Fix TS2739: Explicitly type rawData without startPercent/percent
  const rawData: RawPieData[] = [
    {label: 'Noun', value: data.noun, color: '#6366f1'},
    {label: 'Verb', value: data.verb, color: '#10b981'},
    {label: 'Adj', value: data.adj, color: '#f59e0b'},
    {label: 'Other', value: data.other, color: '#64748b'},
  ];

  let cumulativePercent = 0;
  const entries: PieEntry[] = rawData.map((entry): PieEntry => {
    if (entry.value === 0) return null as any; // Filter nulls immediately for typing
    const startPercent = cumulativePercent;
    const percent = entry.value / total;
    cumulativePercent += percent;
    return {...entry, percent, startPercent};
  }).filter((p): p is PieEntry => p !== null); // Type guard

  return (
    <div className="relative w-32 h-32 mx-auto">
      <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
        {entries.map((p, i) => {
          const [startX, startY] = [50 * Math.cos(2 * Math.PI * p.startPercent), 50 * Math.sin(2 * Math.PI * p.startPercent)];
          const [endX, endY] = [50 * Math.cos(2 * Math.PI * (p.startPercent + p.percent)), 50 * Math.sin(2 * Math.PI * (p.startPercent + p.percent))];
          const largeArcFlag = p.percent > 0.5 ? 1 : 0;
          return (
            <path
              key={i}
              d={`M 18 18 L ${18 + startX} ${18 + startY} A 18 18 0 ${largeArcFlag} 1 ${18 + endX} ${18 + endY} Z`}
              fill={p.color}
              className="opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"><span
        className="text-[10px] text-gray-500">POS</span></div>
      <div className="absolute -bottom-12 left-0 right-0 flex justify-center gap-2">
        {entries.map((p, i) => (
          <div key={i} className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full" style={{backgroundColor: p.color}}/>
            <span className="text-[8px] text-gray-400">{p.label}</span></div>
        ))}
      </div>
    </div>
  );
};

export default DonutChart;
