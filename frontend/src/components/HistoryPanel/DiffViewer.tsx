/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';

// utils
import {cn} from '~/utils/helpers';

/**
 * A component that visually represents the differences between two pieces of text.
 * Ideal for comparing code, documents, or any textual content side-by-side.
 */
export interface DiffViewerProps {
  /** The original text or content to compare */
  original: string;
  /** The enhanced or modified text or content to compare against the original */
  enhanced: string;
}

/**
 * A React component that displays a side-by-side comparison of two texts, highlighting differences.
 * Uses a diff algorithm to show additions, deletions, and changes.
 * @example
 * <DiffViewer original="Hello world" enhanced="Hello there, world!" />
 * @developerNotes
 * - Assumes the use of a diff library (e.g., `react-diff-viewer`) for rendering differences.
 * - Designed for readability; suitable for comparing code, documents, or any textual content.
 */
const DiffViewer: React.FC<DiffViewerProps> = (props) => {
  const linesOriginal = props?.original?.split?.('\n') ?? [];
  const linesEnhanced = props?.enhanced?.split?.('\n') ?? [];

  return (
    <div className="grid grid-cols-2 gap-4 text-sm font-mono">
      <div className="border-r border-gray-200 dark:border-gray-700 pr-2">
        <h4 className="text-xs text-gray-500 mb-2 font-bold uppercase">Original</h4>
        <div className="space-y-1">
          {linesOriginal.map((line, i) => {
            const isChanged = linesOriginal[i] !== linesEnhanced[i];
            const color = isChanged ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' : 'text-gray-700 dark:text-gray-300';
            return (<div key={i} className={cn('p-1 rounded whitespace-pre-wrap break-words', color)}>{line ||
              <span className="text-gray-300 italic">...</span>}</div>);
          })}
        </div>
      </div>
      <div className="pl-2">
        <h4 className="text-xs text-green-600 mb-2 font-bold uppercase">Enhanced</h4>
        <div className="space-y-1">
          {linesEnhanced.map((line, i) => {
            const isAdded = !linesOriginal[i] && linesEnhanced[i];
            const isChanged = linesOriginal[i] !== linesEnhanced[i];
            const color = isAdded ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : (isChanged ? 'bg-green-50 text-green-900 dark:bg-green-900/10 dark:text-green-200' : 'text-gray-700 dark:text-gray-300');
            return (<div key={i} className={cn('p-1 rounded whitespace-pre-wrap break-words', color)}>{line}</div>);
          })}
        </div>
      </div>
    </div>
  );
};

export default DiffViewer;
