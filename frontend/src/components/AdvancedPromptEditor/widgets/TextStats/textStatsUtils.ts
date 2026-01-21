/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// utils
import {DEFAULT_CONFIG} from './utils'; // Assuming default config is available
import {safeLocaleFormat, countSyllables, detectRtl, safeString} from '~/utils/strings';

// types
import type {WidgetConfig, WidgetType} from './utils';
import type {CalculatedStats, TextStatsConfig} from './CharWidgetRenderer';

/**
 * Formats a numeric value to a fixed decimal string.
 */
export const formatStatValue = (val: number | undefined, decimals = 1): string => {
  return val !== undefined && !isNaN(val) ? val.toFixed(decimals) : '-';
};

/**
 * Merges user configuration with default configuration safely.
 */
export const resolveConfig = (userConfig: TextStatsConfig | null | undefined): TextStatsConfig => {
  const base = DEFAULT_CONFIG;
  const safeUserConfig = userConfig || {};

  return {
    maxLength: Math.max(0, safeUserConfig.maxLength ?? base.maxLength!),
    readingWpm: Math.max(1, safeUserConfig.readingWpm ?? base.readingWpm!),
    speakingWpm: Math.max(1, safeUserConfig.speakingWpm ?? base.speakingWpm!),
    rtlMode: safeUserConfig.rtlMode || base.rtlMode,
    locale: safeUserConfig.locale || base.locale,
  };
};

/**
 * Calculates all text statistics based on input text and configuration.
 */
export const calculateStats = (rawText: string, config: TextStatsConfig): CalculatedStats => {
  const text = safeString(rawText);
  const trimmedText = text.trim();

  // Basic Counts
  const charCount = text.length;
  const charCountNoSpaces = text.replace(/\s/g, '').length;
  const lines = text ? text.split(/\r\n|\r|\n/).length : 0;
  const paragraphCount = trimmedText ? trimmedText.split(/\n\s*\n/).filter(p => p.trim().length > 0).length : 0;

  // Words & Sentences
  const words = trimmedText ? trimmedText.split(/\s+/).filter(w => w.length > 0) : [];
  const wordCount = words.length;
  const sentences = trimmedText ? trimmedText.split(/[.!?\u3002\u06D4]+/).filter(s => s.trim().length > 0) : [];
  const sentenceCount = sentences.length;

  // Character Breakdown
  const spaceCount = (text.match(/\s/g) || []).length;
  const punctuationCount = (text.match(/[.,!?;:'"()[\]{}،۔؟]/g) || []).length;
  const digitCount = (text.match(/\d/g) || []).length;
  const letterCount = (text.match(/[a-zA-Z\u0600-\u06FF]/g) || []).length;

  // Word Analysis
  const uniqueWords = new Set(words.map(w => w.toLowerCase()));
  const uniqueWordCount = uniqueWords.size;
  const lexicalDensity = wordCount > 0 ? (uniqueWordCount / wordCount) * 100 : 0;
  const sortedWords = [...words].sort((a, b) => b.length - a.length);
  const longestWord = sortedWords[0] || '';
  const shortestWord = sortedWords[sortedWords.length - 1] || '';

  // RTL Detection
  const isRtl = config.rtlMode === 'force'
    ? true
    : config.rtlMode === 'disable'
      ? false
      : detectRtl(text);

  // Syllables & Readability (LTR Only)
  let syllableCount = 0;
  if (!isRtl) {
    words.forEach(w => syllableCount += countSyllables(w));
  }

  const avgWordLength = wordCount > 0 ? charCountNoSpaces / wordCount : 0;
  const avgSentenceLength = sentenceCount > 0 ? wordCount / sentenceCount : 0;

  const fleschScore = (sentenceCount > 0 && wordCount > 0)
    ? 206.835 - 1.015 * (wordCount / sentenceCount) - 84.6 * (syllableCount / wordCount)
    : 0;

  const fleschGrade = (sentenceCount > 0 && wordCount > 0)
    ? 0.39 * (wordCount / sentenceCount) + 11.8 * (syllableCount / wordCount) - 15.59
    : 0;

  const complexWords = words.filter(w => countSyllables(w) >= 3).length;
  const gunningFog = (sentenceCount > 0 && wordCount > 0)
    ? 0.4 * (avgWordLength + 100 * (complexWords / wordCount))
    : 0;

  // Readability Level Styling
  let readabilityLevel = 'N/A';
  let readabilityColor = 'text-muted-foreground';
  let readabilityBg = 'bg-gray-100 dark:bg-gray-900/30';

  if (!isRtl) {
    if (fleschScore >= 90) {
      readabilityLevel = 'Very Easy';
      readabilityColor = 'text-green-600';
      readabilityBg = 'bg-green-100 dark:bg-green-900/30';
    } else if (fleschScore >= 80) {
      readabilityLevel = 'Easy';
      readabilityColor = 'text-green-500';
      readabilityBg = 'bg-green-100 dark:bg-green-900/30';
    } else if (fleschScore >= 70) {
      readabilityLevel = 'Fairly Easy';
      readabilityColor = 'text-lime-600';
      readabilityBg = 'bg-lime-100 dark:bg-lime-900/30';
    } else if (fleschScore >= 60) {
      readabilityLevel = 'Standard';
      readabilityColor = 'text-yellow-600';
      readabilityBg = 'bg-yellow-100 dark:bg-yellow-900/30';
    } else if (fleschScore >= 50) {
      readabilityLevel = 'Fairly Difficult';
      readabilityColor = 'text-orange-600';
      readabilityBg = 'bg-orange-100 dark:bg-orange-900/30';
    } else if (fleschScore >= 30) {
      readabilityLevel = 'Difficult';
      readabilityColor = 'text-red-600';
      readabilityBg = 'bg-red-100 dark:bg-red-900/30';
    } else {
      readabilityLevel = 'Very Difficult';
      readabilityColor = 'text-red-700';
      readabilityBg = 'bg-red-100 dark:bg-red-900/30';
    }
  }

  // Time Estimates
  const readingTime = wordCount > 0 ? wordCount / (config.readingWpm || 1) : 0;
  const speakingTime = wordCount > 0 ? wordCount / (config.speakingWpm || 1) : 0;
  const tokenEstimate = Math.ceil(charCount / 4);

  // Harakat (RTL Only)
  let diacriticsCount = 0;
  let harakatBreakdown = {zabar: 0, zer: 0, paish: 0, other: 0};

  if (isRtl) {
    const harakatRegex = /[\u064B-\u065F\u0670]/g;
    const matches = text.match(harakatRegex) || [];
    diacriticsCount = matches.length;
    matches.forEach(m => {
      if (m === '\u064E') harakatBreakdown.zabar++;
      else if (m === '\u0650') harakatBreakdown.zer++;
      else if (m === '\u064F') harakatBreakdown.paish++;
      else harakatBreakdown.other++;
    });
  }

  return {
    text, wordCount, charCount, charCountNoSpaces, lines, sentenceCount, paragraphCount,
    readingTime, speakingTime, uniqueWordCount, lexicalDensity, fleschScore, fleschGrade,
    avgWordLength, avgSentenceLength, syllableCount, spaceCount, punctuationCount, digitCount,
    letterCount, longestWord, shortestWord, isRtl, diacriticsCount, harakatBreakdown,
    readabilityLevel, readabilityColor, readabilityBg, gunningFog, tokenEstimate,
  };
};

/**
 * Determines the display label for a widget based on its type and optional override.
 */
export const getWidgetLabel = (type: WidgetType, override?: string | null): string => {
  if (override) return override;
  switch (type) {
    case 'words':
      return 'Total Words';
    case 'chars':
      return 'Characters';
    case 'reading_time':
      return 'Reading Time';
    case 'speaking_time':
      return 'Speaking Time';
    case 'sentences':
      return 'Sentences';
    case 'paragraphs':
      return 'Paragraphs';
    case 'lines':
      return 'Lines';
    case 'unique_words':
      return 'Unique Words';
    case 'readability_level':
      return 'Reading Level';
    case 'gunning_fog':
      return 'Gunning Fog';
    case 'harakat':
      return 'Harakat';
    case 'diacritics':
      return 'Diacritics';
    case 'longest_word':
      return 'Longest Word';
    case 'shortest_word':
      return 'Shortest Word';
    case 'avg_word_len':
      return 'Avg Word Len';
    case 'avg_sentence_len':
      return 'Avg Sent Len';
    case 'lexical_density':
      return 'Lexical Density';
    case 'tokens':
      return 'Tokens';
    case 'punctuation':
      return 'Punctuation';
    case 'digits':
      return 'Digits';
    case 'spaces':
      return 'Spaces';
    case 'letters':
      return 'Letters';
    case 'readability_score':
      return 'Flesch Score';
    case 'status':
      return 'Status';
    default:
      return 'Stat';
  }
};

/**
 * Resolves the calculated value for a widget based on its type.
 */
export const getWidgetValue = (cfg: WidgetConfig, stats: CalculatedStats, config: TextStatsConfig): string | number => {
  if (cfg.customRender) return '';
  try {
    switch (cfg.type) {
      case 'words':
        return safeLocaleFormat(stats.wordCount, config.locale);
      case 'reading_time':
        return `${formatStatValue(stats.readingTime)} min`;
      case 'speaking_time':
        return `${formatStatValue(stats.speakingTime)}m`;
      case 'sentences':
        return stats.sentenceCount;
      case 'paragraphs':
        return stats.paragraphCount;
      case 'lines':
        return stats.lines;
      case 'unique_words':
        return stats.uniqueWordCount;
      case 'readability_level':
        return stats.readabilityLevel;
      case 'gunning_fog':
        return formatStatValue(stats.gunningFog, 1);
      case 'diacritics':
        return stats.diacriticsCount;
      case 'longest_word':
        return stats.longestWord || '-';
      case 'shortest_word':
        return stats.shortestWord || '-';
      case 'avg_word_len':
        return `${formatStatValue(stats.avgWordLength, 1)}c`;
      case 'avg_sentence_len':
        return `${formatStatValue(stats.avgSentenceLength, 1)}w`;
      case 'lexical_density':
        return `${formatStatValue(stats.lexicalDensity, 0)}%`;
      case 'tokens':
        return safeLocaleFormat(stats.tokenEstimate, config.locale);
      case 'punctuation':
        return stats.punctuationCount;
      case 'digits':
        return stats.digitCount;
      case 'spaces':
        return stats.spaceCount;
      case 'letters':
        return stats.letterCount;
      case 'readability_score':
        return formatStatValue(stats.fleschScore, 1);
      default:
        return '-';
    }
  } catch (e) {
    return 'Error';
  }
};
