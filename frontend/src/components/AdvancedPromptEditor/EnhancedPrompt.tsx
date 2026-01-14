/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useState, useCallback, useEffect} from 'react';
import {Copy, Check, Sparkles} from 'lucide-react';
import * as Tooltip from '@radix-ui/react-tooltip';
import {Streamdown} from 'streamdown';

/**
 * Props for the EnhancedPrompt component
 */
export interface EnhancedPromptProps {
  /** The enhanced prompt response containing metadata and the enhanced text */
  content: string;
}

/**
 * Displays an enhanced prompt with metadata and comparison stats.
 * Features a clean card layout, custom scrollbars, and copy-to-clipboard functionality.
 */
const EnhancedPrompt: React.FC<EnhancedPromptProps> = ({content}) => {
  const [isCopied, setIsCopied] = useState(false);

  const [text, setText] = useState<string>(content);

  useEffect(() => {
    setText(content);
  }, [content]);

  const handleCopy = useCallback(async () => {
    if (!content) return;
    try {
      await navigator.clipboard.writeText(content);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }, [content]);

  return (
    <div className="mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Card Container */}
      <div
        className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white/50 text-slate-950 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-50">

        {/* Header Section */}
        <div
          className="flex items-center justify-between border-b border-slate-200 bg-slate-50/50 px-4 py-3 dark:border-slate-800 dark:bg-slate-900/50">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-indigo-500"/>
            <span className="text-sm font-semibold tracking-wide text-slate-700 dark:text-slate-300">
              AI Response
            </span>
          </div>

          {/* Copy Button with Tooltip */}
          <Tooltip.Provider delayDuration={200}>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button
                  onClick={handleCopy}
                  className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                  aria-label="Copy content"
                >
                  {isCopied ? (
                    <Check className="h-4 w-4 text-emerald-500"/>
                  ) : (
                    <Copy className="h-4 w-4"/>
                  )}
                </button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  className="select-none rounded-md bg-slate-900 px-3 py-1.5 text-xs leading-none text-white will-change-[transform,opacity] dark:bg-slate-100 dark:text-slate-900"
                  sideOffset={5}
                >
                  {isCopied ? 'Copied!' : 'Copy to clipboard'}
                  <Tooltip.Arrow className="fill-slate-900 dark:fill-slate-100"/>
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
        </div>

        <div className="my-2 mx-4 px-4">
          <Streamdown>{text?.trim?.() || '> Enter the prompt and hit the Ask AI button'}</Streamdown>
        </div>
      </div>
    </div>
  );
};

export default EnhancedPrompt;
