/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';

export interface RadarProps {
  data: { technical: number; rarity: number; emotion: number; length: number; frequency: number };
}

const RadarChart: React.FC<RadarProps> = ({data}) => {
  const width = 180;
  const height = 180;
  const center = width / 2;
  const radius = 65;
  const labels = ['Tech', 'Rare', 'Emo', 'Long', 'Freq'];
  const values = [data.technical, data.rarity, data.emotion, data.length, Math.min(data.frequency * 50, 1)];
  const getCoordinates = (value: number, index: number, total: number) => {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    const r = value * radius;
    return [center + r * Math.cos(angle), center + r * Math.sin(angle)];
  };
  const polygonPoints = values.map((v, i) => getCoordinates(v, i, 5).join(',')).join(' ');

  return (
    <div className="relative flex items-center justify-center">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
        {[1, 2, 3].map((level) => (
          <polygon key={level}
                   points={Array(5).fill(0).map((_, i) => getCoordinates(level / 3, i, 5).join(',')).join(' ')}
                   fill="none" stroke="#334155" strokeWidth="1" className="opacity-20"/>
        ))}
        {Array(5).fill(0).map((_, i) => {
          const [x, y] = getCoordinates(1, i, 5);
          return <line key={i} x1={center} y1={center} x2={x} y2={y} stroke="#334155" className="opacity-20"/>;
        })}
        <polygon points={polygonPoints} fill="rgba(99, 102, 241, 0.25)" stroke="#818cf8" strokeWidth="2"
                 className="transition-all duration-700 ease-out drop-shadow-lg"/>
        {values.map((v, i) => {
          const [x, y] = getCoordinates(v, i, 5);
          return <circle key={i} cx={x} cy={y} r="3.5" fill="#c7d2fe" className="transition-all duration-700"/>;
        })}
      </svg>
      <div className="absolute inset-0 pointer-events-none">
        {labels.map((label, i) => {
          const [x, y] = getCoordinates(1.25, i, 5);
          return <span key={i}
                       className="absolute text-[10px] text-gray-500 font-bold uppercase tracking-wider -translate-x-1/2 -translate-y-1/2 bg-[#0f172a] px-1.5 py-0.5 rounded border border-gray-800 shadow-sm"
                       style={{left: x, top: y}}>{label}</span>;
        })}
      </div>
    </div>
  );
};

export default RadarChart;
