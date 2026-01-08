/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {FileText} from 'lucide-react';

// utils
import {DEFAULT_CONFIG} from './utils';
import {safeLocaleFormat} from '~/utils/strings';

/**
 * Configuration for global text analysis settings
 */
export interface TextStatsConfig {
  /** Maximum allowed character count (default: 1000) */
  maxLength?: number | null;
  /** Average reading speed in words per minute (default: 200) */
  readingWpm?: number | null;
  /** Average speaking speed in words per minute (default: 130) */
  speakingWpm?: number | null;
  /** Force RTL mode, disable it, or let auto-detect decide (default: 'auto') */
  rtlMode?: 'auto' | 'force' | 'disable' | null;
  /** Locale for number formatting (default: undefined) */
  locale?: string | null;
}

/**
 * Represents calculated text statistics including word count, readability scores, and linguistic analysis.
 * @example
 * const stats = {
 *   text: "This is a sample text.",
 *   wordCount: 5,
 *   charCount: 20,
 *   readingTime: 0.5,
 *   fleschScore: 90,
 *   readabilityLevel: "Easy",
 * };
 *
 * @DeveloperNotes
 * - This interface is used by components that display text analysis results.
 * - Ensure all properties are correctly calculated using robust text processing libraries.
 * - Properties like `harakatBreakdown` require specific language handling (e.g., Arabic).
 * - Readability scores (Flesch, Gunning Fog) may vary based on implementation and language.
 */
export interface CalculatedStats {
  /**
   * The original input text used to calculate the statistics.
   */
  text: string;

  /**
   * Total number of words in the text.
   */
  wordCount: number;

  /**
   * Total number of characters, including spaces.
   */
  charCount: number;

  /**
   * Total number of characters excluding spaces.
   */
  charCountNoSpaces: number;

  /**
   * Number of lines in the text, determined by newline characters.
   */
  lines: number;

  /**
   * Total number of sentences in the text.
   */
  sentenceCount: number;

  /**
   * Total number of paragraphs in the text.
   */
  paragraphCount: number;

  /**
   * Estimated reading time in minutes for an average reader.
   */
  readingTime: number;

  /**
   * Estimated speaking time in minutes for an average speaker.
   */
  speakingTime: number;

  /**
   * Number of unique words in the text.
   */
  uniqueWordCount: number;

  /**
   * Ratio of content words to total words, indicating text complexity.
   */
  lexicalDensity: number;

  /**
   * Flesch readability score, where higher values indicate easier readability.
   */
  fleschScore: number;

  /**
   * Flesch grade level, representing the U.S. school grade required to understand the text.
   */
  fleschGrade: number;

  /**
   * Average length of words in the text (in characters).
   */
  avgWordLength: number;

  /**
   * Average number of words per sentence.
   */
  avgSentenceLength: number;

  /**
   * Total number of syllables in the text.
   */
  syllableCount: number;

  /**
   * Number of spaces in the text.
   */
  spaceCount: number;

  /**
   * Number of punctuation marks in the text.
   */
  punctuationCount: number;

  /**
   * Number of digits (0-9) in the text.
   */
  digitCount: number;

  /**
   * Number of alphabetic letters in the text.
   */
  letterCount: number;

  /**
   * Longest word in the text.
   */
  longestWord: string;

  /**
   * Shortest word in the text.
   */
  shortestWord: string;

  /**
   * Whether the text is primarily right-to-left (e.g., Arabic or Hebrew).
   */
  isRtl: boolean;

  /**
   * Number of diacritical marks (e.g., accents) in the text.
   */
  diacriticsCount: number;

  /**
   * Breakdown of Arabic harakat (diacritics) into zabar, zer, paish, and other categories.
   */
  harakatBreakdown: { zabar: number; zer: number; paish: number; other: number };

  /**
   * Human-readable readability level (e.g., "Easy", "Moderate", "Difficult").
   */
  readabilityLevel: string;

  /**
   * Color code for readability level (e.g., "#4CAF50" for "Easy").
   */
  readabilityColor: string;

  /**
   * Background color for readability level UI representation.
   */
  readabilityBg: string;

  /**
   * Gunning Fog index, a readability score based on sentence length and complex words.
   */
  gunningFog: number;

  /**
   * Estimated number of tokens (e.g., for NLP tasks like tokenization).
   */
  tokenEstimate: number;
}

const CharWidgetRenderer = (data: { stats?: CalculatedStats, config?: TextStatsConfig }) => {
  // Safe access with defaults
  const currentStats = data.stats || {charCount: 0};
  const currentConfig = data.config || DEFAULT_CONFIG;

  const maxLength = currentConfig.maxLength ?? DEFAULT_CONFIG.maxLength!;
  const locale = currentConfig.locale;
  // noinspection SuspiciousTypeOfGuard
  const charCount = typeof currentStats.charCount === 'number' ? currentStats.charCount : 0;

  const progress = maxLength > 0
    ? Math.min((charCount / maxLength) * 100, 100)
    : 0;

  const isOverLimit = maxLength > 0 && charCount > maxLength;
  const barColor = isOverLimit ? 'bg-red-500' : 'bg-violet-500';

  return (
    <div
      className="flex flex-col p-3 rounded-xl border bg-card shadow-sm col-span-1 sm:col-span-2 lg:col-span-1 xl:col-span-2 relative overflow-hidden">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-muted-foreground">
          <FileText className="h-4 w-4 text-violet-600"/>
          <span className="text-xs font-bold uppercase tracking-wider">Characters</span>
        </div>
        <span
          className="text-xs text-muted-foreground font-mono">{safeLocaleFormat(charCount, locale)} / {maxLength}</span>
      </div>
      <div className="flex items-end gap-4">
        <span className="text-2xl font-bold text-foreground">{safeLocaleFormat(charCount, locale)}</span>
        <div className="mb-1.5 text-xs text-muted-foreground flex-1">
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                 style={{width: `${progress}%`}}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharWidgetRenderer;
