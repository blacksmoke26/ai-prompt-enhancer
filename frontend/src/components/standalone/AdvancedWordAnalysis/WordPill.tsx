/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {Language, SentimentType, WordMetadata} from '~/utils/advanced-word-analysis';

export interface PillProps {
  word: string;
  data: WordMetadata;
  isSelected: boolean;
  onClick: (data: WordMetadata) => void;
  lang: Language;
}

const WordPill: React.FC<PillProps> = ({word, data, isSelected, onClick, lang}) => {
  const colorMap: Record<string, string> = {
    technical: 'bg-indigo-950/40 text-indigo-300 border-indigo-900/50 hover:border-indigo-500/60 hover:bg-indigo-900/40 hover:text-white',
    negative: 'bg-rose-950/40 text-rose-300 border-rose-900/50 hover:border-rose-500/60 hover:bg-rose-900/40 hover:text-white',
    rare: 'bg-purple-950/40 text-purple-300 border-purple-900/50 hover:border-purple-500/60 hover:bg-purple-900/40 hover:text-white',
    common: 'bg-slate-800/40 text-slate-400 border-slate-700/50 hover:border-slate-500/60 hover:bg-slate-700/40 hover:text-white',
  };
  let type = 'common';
  if (data.complexity.factors.technical > 0.5) type = 'technical';
  else if (data.sentiment === SentimentType.Negative) type = 'negative';
  else if (data.complexity.factors.rarity > 0.6) type = 'rare';

  return (
    <button
      onClick={() => onClick(data)}
      className={`relative px-3 py-1.5 rounded-full border transition-all duration-200 select-none ${colorMap[type]} ${isSelected ? 'ring-2 ring-indigo-400 scale-110 z-10 shadow-[0_0_15px_rgba(99,102,241,0.3)]' : 'hover:scale-105 hover:shadow-md active:scale-95'} ${lang === Language.Urdu ? 'urdu-font' : ''}`}
    >
      <span className={`font-medium tracking-tight ${lang === Language.Urdu ? 'text-lg' : ''}`}
            style={{fontSize: lang === Language.Urdu ? '1.2rem' : `${Math.max(0.75, Math.min(1.25, 0.85 + (data.frequency * 100)))}rem`}}>{word}</span>
      <span
        className={`ml-1.5 text-[0.6rem] opacity-50 bg-black/20 px-1.5 rounded-md py-0.5 border border-white/5 ${lang === Language.Urdu ? 'hidden' : ''}`}>{data.count}</span>
      {type !== 'common' &&
        <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-current animate-pulse opacity-75"/>}
    </button>
  );
};

export default WordPill;
