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
    technical: 'bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800 hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-indigo-100 dark:hover:bg-indigo-900 hover:text-indigo-800 dark:hover:text-white',
    negative: 'bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800 hover:border-rose-300 dark:hover:border-rose-600 hover:bg-rose-100 dark:hover:bg-rose-900 hover:text-rose-800 dark:hover:text-white',
    rare: 'bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800 hover:border-purple-300 dark:hover:border-purple-600 hover:bg-purple-100 dark:hover:bg-purple-900 hover:text-purple-800 dark:hover:text-white',
    common: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-white',
  };

  let type = 'common';
  if (data.complexity.factors.technical > 0.5) type = 'technical';
  else if (data.sentiment === SentimentType.Negative) type = 'negative';
  else if (data.complexity.factors.rarity > 0.6) type = 'rare';

  return (
    <button
      onClick={() => onClick(data)}
      className={`relative px-3 py-1.5 rounded-full border transition-all duration-200 select-none ${colorMap[type]} ${isSelected ? 'ring-2 ring-indigo-500 dark:ring-indigo-400 scale-110 z-10 shadow-[0_0_15px_rgba(99,102,241,0.3)]' : 'hover:scale-105 hover:shadow-md active:scale-95'} ${lang === Language.Urdu ? 'urdu-font' : ''}`}
    >
      <span className={`font-medium tracking-tight ${lang === Language.Urdu ? 'text-lg' : ''}`}
            style={{fontSize: lang === Language.Urdu ? '1.2rem' : `${Math.max(0.75, Math.min(1.25, 0.85 + (data.frequency * 100)))}rem`}}>
        {word}
      </span>
      <span
        className={`ml-1.5 text-[0.6rem] opacity-60 bg-black/5 dark:bg-black/20 text-gray-600 dark:text-gray-400 px-1.5 rounded-md py-0.5 border border-gray-200 dark:border-white/10 ${lang === Language.Urdu ? 'hidden' : ''}`}>
        {data.count}
      </span>
      {type !== 'common' &&
        <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-current animate-pulse opacity-75"/>}
    </button>
  );
};

export default WordPill;
