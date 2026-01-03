/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';

// types
import type {SelectOption} from '~/components/ui/SelectAdvanced';
import {SENTIMENT_WORDS, STOP_WORDS, URDU_SENTIMENT_WORDS, URDU_STOP_WORDS} from '~/utils/word-cloud.ts';

/**
 * Specifies the language mode for text processing or rendering, determining whether the system should auto-detect the language or explicitly use English or Urdu.
 * @note Developer Notes: This type is used for configuration and should remain immutable. 'auto' is recommended for dynamic content, while 'en' and 'ur' are for explicit language control.
 */
export type LanguageMode = 'auto' | 'en' | 'ur';

/**
 * Defines the strategy for assigning colors to text elements, influencing how visual attributes are determined based on content type or context.
 * @note Developer Notes: Each strategy corresponds to a different visualization logic. Ensure the selected strategy aligns with the intended UI behavior and data context.
 */
export type ColorStrategy = 'heat' | 'complexity' | 'language' | 'category' | 'sentiment';

/**
 * Configuration interface for customizing the appearance and behavior of a word cloud visualization.
 * @example
 * {
 *   labels: {
 *     title: { en: "Title", ur: "عنوان" },
 *     subtitle: { en: "Subtitle", ur: "زیر عنوان" },
 *     searchPlaceholder: { en: "Search...", ur: "تلاش کریں..." },
 *     insights: { en: "Insights", ur: "تفصیلات" },
 *     stats: {
 *       lexicalDiversity: "Lexical Diversity",
 *       technicalTerms: "Technical Terms",
 *       complexWords: "Complex Words",
 *       avgFrequency: "Average Frequency",
 *       readingTime: "Reading Time",
 *       sentiment: "Sentiment"
 *     },
 *     buttons: { clear: "Clear" },
 *     empty: {
 *       title: "No data found",
 *       description: "No words to display",
 *       action: "Try another query"
 *     }
 *   },
 *   theme: {
 *     primary: "#007BFF",
 *     heatStart: "#FFA500",
 *     heatEnd: "#FF4500",
 *     technicalColor: "#00FF00",
 *     rareColor: "#800080",
 *     sentimentPos: "#00FF00",
 *     sentimentNeg: "#FF0000",
 *     bgMuted: "#F5F5F5",
 *     urduColor: "#0000FF",
 *     englishColor: "#FF0000"
 *   },
 *   ui: {
 *     showStats: true,
 *     showInsights: false,
 *     showPagination: true,
 *     showWordCountBadge: true,
 *     defaultColorStrategy: "heat"
 *   },
 *   thresholds: {
 *     highFreqPercent: 0.8,
 *     lowFreqPercent: 0.2,
 *     technicalScore: 0.75,
 *     complexityScore: 0.6,
 *     minWordLength: 3
 *   },
 *   fontScaling: {
 *     min: 10,
 *     max: 50,
 *     step: 2
 *   }
 * }
 * @note Developer Notes: This configuration should be used to fine-tune the word cloud's UI and logic. Ensure all translations are accurate and consistent across both languages. Use valid CSS color codes and test threshold values with real data for optimal performance.
 */
export interface WordCloudConfig {
  /**
   * Text labels and translations for UI elements.
   * @example
   * {
   *   title: { en: "Title", ur: "عنوان" },
   *   subtitle: { en: "Subtitle", ur: "زیر عنوان" },
   *   searchPlaceholder: { en: "Search...", ur: "تلاش کریں..." },
   *   insights: { en: "Insights", ur: "تفصیلات" },
   *   stats: {
   *     lexicalDiversity: "Lexical Diversity",
   *     technicalTerms: "Technical Terms",
   *     complexWords: "Complex Words",
   *     avgFrequency: "Average Frequency",
   *     readingTime: "Reading Time",
   *     sentiment: "Sentiment"
   *   },
   *   buttons: { clear: "Clear" },
   *   empty: {
   *     title: "No data found",
   *     description: "No words to display",
   *     action: "Try another query"
   *   }
   * }
   * @note Developer Notes: All translations must be provided in both English and Urdu to ensure full language support. Avoid missing or mismatched keys.
   */
  labels: {
    title: { en: string; ur: string };
    subtitle: { en: string; ur: string };
    searchPlaceholder: { en: string; ur: string };
    insights: { en: string; ur: string };
    stats: {
      lexicalDiversity: string;
      technicalTerms: string;
      complexWords: string;
      avgFrequency: string;
      readingTime: string;
      sentiment: string;
    };
    buttons: {
      clear: string;
    };
    empty: {
      title: string;
      description: string;
      action: string;
    };
  };

  /**
   * Color scheme configuration for the word cloud.
   * @example
   * {
   *   primary: "#007BFF",
   *   heatStart: "#FFA500",
   *   heatEnd: "#FF4500",
   *   technicalColor: "#00FF00",
   *   rareColor: "#800080",
   *   sentimentPos: "#00FF00",
   *   sentimentNeg: "#FF0000",
   *   bgMuted: "#F5F5F5",
   *   urduColor: "#0000FF",
   *   englishColor: "#FF0000"
   * }
   * @note Developer Notes: Use valid CSS color codes for all color properties. Ensure sufficient contrast between text and background colors for readability.
   */
  theme: {
    primary: string;
    heatStart: string;
    heatEnd: string;
    technicalColor: string;
    rareColor: string;
    sentimentPos: string;
    sentimentNeg: string;
    bgMuted: string;
    urduColor: string;
    englishColor: string;
  };

  /**
   * UI-related configuration settings.
   * @example
   * {
   *   showStats: true,
   *   showInsights: false,
   *   showPagination: true,
   *   showWordCountBadge: true,
   *   defaultColorStrategy: "heat"
   * }
   * @note Developer Notes: Ensure that `defaultColorStrategy` is compatible with the `ColorStrategy` type. All boolean flags should reflect the desired UI behavior.
   */
  ui: {
    showStats: boolean;
    showInsights: boolean;
    showPagination: boolean;
    showWordCountBadge: boolean;
    defaultColorStrategy: ColorStrategy;
  };

  /**
   * Thresholds for filtering and categorizing words.
   * @example
   * {
   *   highFreqPercent: 0.8,
   *   lowFreqPercent: 0.2,
   *   technicalScore: 0.75,
   *   complexityScore: 0.6,
   *   minWordLength: 3
   * }
   * @note Developer Notes: These thresholds determine which words are displayed and how they are categorized. Test with real data to ensure optimal results.
   */
  thresholds: {
    highFreqPercent: number;
    lowFreqPercent: number;
    technicalScore: number;
    complexityScore: number;
    minWordLength: number;
  };

  /**
   * Font size scaling configuration.
   * @example
   * {
   *   min: 10,
   *   max: 50,
   *   step: 2
   * }
   * @note Developer Notes: These values define the range and increment for font sizes. Avoid extremes to maintain readability.
   */
  fontScaling: {
    min: number;
    max: number;
    step: number;
  };
}

/**
 * Configuration props for advanced word cloud customization, including text input, visibility state, and configuration overrides.
 * @example
 * {
 *   text: "This is a sample text for the word cloud",
 *   wordFrequency: [{ word: "sample", count: 2 }],
 *   showWordCloud: true,
 *   setShowWordCloud: (value) => setValue(value),
 *   config: { theme: { primary: "#007BFF" } }
 * }
 * @note Developer Notes: Ensure `setShowWordCloud` is a proper React state setter. `config` allows partial overriding of `WordCloudConfig` for fine-tuning.
 */
export interface WordCloudAdvanceProps {
  /**
   * The raw text input used to generate the word cloud.
   * @note Optional. If provided, it will override any `wordFrequency` data.
   */
  text?: string;

  /**
   * A list of words with their respective frequencies.
   * @note Optional. If provided, it will be used instead of the `text` input.
   */
  wordFrequency?: Array<{ word: string; count: number }>;

  /**
   * Boolean indicating whether the word cloud should be displayed.
   */
  showWordCloud: boolean;

  /**
   * React state setter for controlling the visibility of the word cloud.
   */
  setShowWordCloud: React.Dispatch<React.SetStateAction<boolean>>;

  /**
   * Optional configuration overrides for the word cloud, allowing partial customization of `WordCloudConfig`.
   */
  config?: Partial<WordCloudConfig>;
}

/**
 * Represents a processed word with linguistic and statistical metadata, suitable for visualization and analysis.
 * @example
 * {
 *   id: "1",
 *   word: "علم",
 *   root: "علم",
 *   count: 5,
 *   originalForms: ["علم", "علما", "علماء"],
 *   complexity: { score: 0.6, technicalScore: 0.4, rarityScore: 0.2, readabilityScore: 0.8 },
 *   pos: "noun",
 *   sentiment: "positive",
 *   lang: "ur",
 *   length: 3,
 *   index: 2
 * }
 * @note Developer Notes: This interface is used to enrich words with metadata for filtering, categorization, and visualization purposes.
 */
export interface ProcessedWord {
  /**
   * Unique identifier for the processed word.
   */
  id: string;

  /**
   * The actual word being processed.
   */
  word: string;

  /**
   * The root form of the word for linguistic analysis and tooltips.
   */
  root: string;

  /**
   * Frequency count of the word in the input text.
   */
  count: number;

  /**
   * Array of original or alternate forms of the word.
   */
  originalForms: string[];

  /**
   * Linguistic complexity metrics for the word.
   */
  complexity: {
    /**
     * Overall complexity score (0-1).
     */
    score: number;

    /**
     * Score reflecting technicality of the word.
     */
    technicalScore: number;

    /**
     * Score indicating how rare the word is.
     */
    rarityScore: number;

    /**
     * Score representing readability of the word.
     */
    readabilityScore: number;
  };

  /**
   * Part of speech classification (e.g., noun, verb, etc.).
   */
  pos?: 'noun' | 'verb' | 'adj' | 'adv' | 'other';

  /**
   * Sentiment classification of the word.
   */
  sentiment?: 'positive' | 'negative' | 'neutral';

  /**
   * Language of the word (either English or Urdu).
   */
  lang: 'en' | 'ur';

  /**
   * Length of the word in characters.
   */
  length: number;

  /**
   * Index of the first occurrence of the word in the input text.
   */
  index: number;
}

/**
 * Represents an insight or analysis result generated from the word cloud data.
 * @example
 * {
 *   id: "insight-1",
 *   word: "علم",
 *   category: "complexity",
 *   severity: "medium",
 *   message: "The word 'علم' is considered complex and may require additional explanation.",
 *   suggestion: "Consider simplifying the word or adding a tooltip for clarity.",
 *   confidence: 0.75
 * }
 * @note Developer Notes: Insights help users identify areas of concern or opportunity in the text, based on linguistic and statistical metrics.
 */
export interface Insight {
  /** Unique identifier for the insight */
  id: string;
  /** The word associated with this insight */
  word: string;
  /** Category of the insight (e.g., complexity, readability, sentiment) */
  category: string;
  /** Severity level of the insight (from critical to info) */
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  /** A message describing the insight */
  message: string;
  /** Optional suggestion for addressing the issue or improving the text */
  suggestion?: string;
  /** Confidence level of the insight, ranging from 0 (low) to 1 (high) */
  confidence: number;
}

export const FilterOptions: SelectOption[] = [
  {label: 'All Words', value: 'all'},
  {label: 'High Frequency', value: 'high'},
  {label: 'Medium', value: 'medium'},
  {label: 'Low Frequency', value: 'low'},
  {label: 'Complex', value: 'complex'},
  {label: 'Technical', value: 'technical'},
];

export const ColorStrategyOptions: SelectOption[] = [
  {label: 'Heatmap', value: 'heat'},
  {label: 'Complexity', value: 'complexity'},
  {label: 'Sentiment', value: 'sentiment'},
  {label: 'Language', value: 'language'},
];


export const ENGLISH_STOP_WORDS = STOP_WORDS;


// Simple sentiment lists (subset for demo purposes)
export const EN_POSITIVE = SENTIMENT_WORDS.positive;

export const EN_NEGATIVE = SENTIMENT_WORDS.negative;

export const UR_POSITIVE = URDU_SENTIMENT_WORDS.positive;

export const UR_NEGATIVE = URDU_SENTIMENT_WORDS.negative;

/**
 * Normalizes Urdu text by replacing specific characters with their standardized forms.
 * @example normalizeUrdu('پرائیویٹ') // returns 'پرائیوٹ'
 * @developerNotes Replaces characters like ٮ, ٯ, ٱ with ٗ, and others as per Urdu normalization rules.
 */
export const normalizeUrdu = (text: string): string => {
  let normalized = text;
  normalized = normalized.replace(/[\u0622\u0623\u0625]/g, '\u0627');
  normalized = normalized.replace(/\u06BE/g, '\u06C1');
  normalized = normalized.replace(/\u0624/g, '\u0648');
  normalized = normalized.replace(/\u0649/g, '\u06CC');
  return normalized;
};

/**
 * Stems an Urdu word by removing common plural suffixes.
 * @example stemUrdu('کتابوں') // returns 'کتاب'
 * @developerNotes Uses a list of suffixes like 'یں', 'وں', and 'ان' to identify and remove plurals.
 */
export const stemUrdu = (word: string): string => {
  let stem = word;
  if (stem.length < 3) return stem;
  const pluralSuffixes = ['ایں', 'یں', 'وں', 'ان', 'ؤں', 'یوں', 'ائی', 'اں', 'ا'];
  for (const suffix of pluralSuffixes) {
    if (stem.endsWith(suffix) && stem.length > suffix.length + 2) {
      stem = stem.slice(0, -suffix.length);
      break;
    }
  }
  return stem || word;
};

/**
 * Processes an Urdu word by trimming, normalizing, and stemming it.
 * @example processUrduWord('  کتابوں ') // returns { root: 'کتاب', normalized: 'کتابوں' }
 * @developerNotes Combines `normalizeUrdu` and `stemUrdu` in sequence to produce the final result.
 * @property {string} root - The stemmed form of the word.
 * @property {string} normalized - The normalized form of the word.
 */
export const processUrduWord = (word: string): { root: string; normalized: string } => {
  const cleaned = word.trim();
  if (cleaned.length < 1) return { root: '', normalized: '' };
  const normalized = normalizeUrdu(cleaned);
  const root = stemUrdu(normalized);
  return { root, normalized };
};

/**
 * Processes an English word by lowercasing, removing non-alphabetic characters, and removing suffixes.
 * @example processEnglishWord('Running') // returns { root: 'run', normalized: 'running' }
 * @developerNotes Removes common suffixes like 'ing', 'ed', 'ly', and lowercases the input.
 * @property {string} root - The stemmed form of the word.
 * @property {string} normalized - The normalized form of the word.
 */
export const processEnglishWord = (word: string): { root: string; normalized: string } => {
  const normalized = word.toLowerCase().replace(/[^a-z]/g, '');
  let root = normalized;
  const suffixes = ['tional', 'ness', 'tion', 'ence', 'ing', 'ment', 'able', 'ly', 'ed', 's', 'er', 'est'];
  for (const suffix of suffixes) {
    if (root.endsWith(suffix) && root.length > suffix.length + 2) {
      root = root.slice(0, -suffix.length);
      break;
    }
  }
  return { root, normalized };
};

/**
 * Detects whether the input text is in Urdu or English.
 * @example detectLanguage('پاکستان') // returns 'ur'; detectLanguage('Hello') // returns 'en'
 * @developerNotes Uses regex to count Urdu and English characters in the first 500 characters.
 */
export const detectLanguage = (text: string): 'ur' | 'en' => {
  const urduRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
  const englishRegex = /[a-zA-Z]/;
  const sample = text.slice(0, 500);
  const urMatches = sample.match(urduRegex);
  const enMatches = sample.match(englishRegex);
  if ((urMatches?.length || 0) > (enMatches?.length || 0)) return 'ur';
  return 'en';
};

/**
 * Converts a hex color code to an RGB object.
 * @example hexToRgb('#FF5733') // returns { r: 255, g: 87, b: 51 }
 * @developerNotes Assumes a 6-character hex code with optional leading '#'. Returns { r: 0, g: 0, b: 0 } for invalid input.
 */
export const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
    : { r: 0, g: 0, b: 0 };
};

/**
 * Interpolates between two RGB colors based on a factor between 0 and 1.
 * @example interpolateColor('#FF0000', '#0000FF', 0.5) // returns 'rgb(128, 0, 128)'
 * @developerNotes Clamps the factor to [0, 1] and calculates weighted averages for each channel.
 */
export const interpolateColor = (color1: string, color2: string, factor: number): string => {
  if (factor > 1) factor = 1;
  if (factor < 0) factor = 0;
  const c1 = hexToRgb(color1);
  const c2 = hexToRgb(color2);
  const r = Math.round(c1.r + factor * (c2.r - c1.r));
  const g = Math.round(c1.g + factor * (c2.g - c1.g));
  const b = Math.round(c1.b + factor * (c2.b - c1.b));
  return `rgb(${r}, ${g}, ${b})`;
};
/**
 * Processes input text intelligently to generate an array of enriched words, linguistic insights, and statistical data based on the provided configuration.
 * @example
 * processTextIntelligently("This is a sample text for analysis", {
 *   ui: { showStats: true, defaultColorStrategy: "heat" },
 *   thresholds: { minWordLength: 3 }
 * })
 * @note Developer Notes: Ensure `config` is compatible with `WordCloudConfig`. This function should handle both English and Urdu text, and `stats` should be extended with concrete types in production code.
 */
export const processTextIntelligently = (text: string, config: WordCloudConfig): {
  processedWords: ProcessedWord[],
  insights: Insight[],
  stats: any
} => {
  if (!text) return {processedWords: [], insights: [], stats: {}};

  const lang = detectLanguage(text);
  const isUrdu = lang === 'ur';
  const stopWords = isUrdu ? URDU_STOP_WORDS : ENGLISH_STOP_WORDS;
  const processWordFunc = isUrdu ? processUrduWord : processEnglishWord;

  //const sentenceCount = (text.match(/[.!?؟]/g) || []).length || 1;
  const characterCount = text.length;

  let tokens: string[];
  try {
    // @ts-ignore
    if (typeof Intl !== 'undefined' && Intl.Segmenter) {
      // @ts-ignore
      const segmenter = new Intl.Segmenter(isUrdu ? 'ur' : 'en', {granularity: 'word'});
      const segments = Array.from(segmenter.segment(text));
      tokens = segments.filter((s: any) => s.isWordLike).map((s: any) => s.segment);
    } else {
      const regex = isUrdu ? /[\u0600-\u06FF\uFB50-\uFDFF\uFE70-\uFEFF]+/g : /[a-zA-Z]+/g;
      const matches = text.match(regex);
      tokens = matches || [];
    }
  } catch (e) {
    tokens = text.split(/\s+/);
  }

  const wordMap = new Map<string, ProcessedWord>();
  let totalChars = 0;

  tokens.forEach((token, index) => {
    const {root, normalized} = processWordFunc(token);
    if (!root || root.length < 1) return;
    if (stopWords.has(root) || stopWords.has(normalized)) return;
    if (root.length < config.thresholds.minWordLength) return;

    totalChars += root.length;

    // --- POS Guess ---
    let pos: ProcessedWord['pos'] = 'other';
    if (!isUrdu) {
      if (root.endsWith('ly')) pos = 'adv';
      else if (root.endsWith('tion') || root.endsWith('ness') || root.endsWith('ity')) pos = 'noun';
      else if (root.endsWith('ed') || root.endsWith('ing')) pos = 'verb';
      else if (root.endsWith('able') || root.endsWith('ful') || root.endsWith('ous')) pos = 'adj';
    } else {
      if (root.endsWith('نا') || root.endsWith('ناں')) pos = 'noun';
      // eslint-disable-next-line no-dupe-else-if
      else if (root.endsWith('نا')) pos = 'verb'; // Na often infinitive
      else if (root.endsWith('ی') || root.endsWith('ا')) pos = 'adj';
    }

    // --- Sentiment Guess ---
    let sentiment: ProcessedWord['sentiment'] = 'neutral';
    const lowerRoot = root.toLowerCase();
    if (isUrdu) {
      if (UR_POSITIVE.has(lowerRoot)) sentiment = 'positive';
      else if (UR_NEGATIVE.has(lowerRoot)) sentiment = 'negative';
    } else {
      if (EN_POSITIVE.has(lowerRoot)) sentiment = 'positive';
      else if (EN_NEGATIVE.has(lowerRoot)) sentiment = 'negative';
    }

    if (wordMap.has(root)) {
      const existing = wordMap.get(root)!;
      existing.count++;
      if (!existing.originalForms.includes(token)) existing.originalForms.push(token);
    } else {
      // Complexity
      const hasRareChar = isUrdu ? /[ٹټپچڈڑذژںہھ]/.test(root) : /[qwxzj]/.test(root);
      const technicalScore = hasRareChar ? 0.7 : 0.1;
      const rarityScore = root.length > 8 ? 0.7 : 0.2;

      wordMap.set(root, {
        id: `word-${Math.random().toString(36).substr(2, 9)}`,
        word: root, // Display root usually, or token. Let's show Root for better linguistic insight.
        root: root,
        count: 1,
        originalForms: [token],
        complexity: {
          score: (technicalScore + rarityScore) / 2,
          technicalScore,
          rarityScore,
          readabilityScore: Math.max(0.2, 1 - (root.length / 15)),
        },
        pos,
        sentiment,
        lang,
        length: root.length,
        index,
      });
    }
  });

  // --- Advanced Insights Generation ---
  const processedWords = Array.from(wordMap.values()).sort((a, b) => b.count - a.count);
  const insights: Insight[] = [];

  // 1. Passive Voice (English Only - Heuristic)
  if (!isUrdu) {
    const passiveRegex = /\b(was|were)\s+\w+ed\b/gi;
    const matches = text.match(passiveRegex);
    if (matches && matches.length > 2) {
      insights.push({
        id: 'passive-voice',
        word: 'Passive Voice',
        category: 'Style',
        severity: 'medium',
        message: `Detected ${matches.length} instances of passive voice. Active voice is often more engaging.`,
        suggestion: 'Try converting "was/were + verb" to direct active verbs.',
        confidence: 0.6,
      });
    }
  }

  // 2. Sentence Length
  const sentences = text.split(/[.!?؟]/).filter(s => s.trim().length > 0);
  const avgSentenceLength = sentences.reduce((acc, s) => acc + s.split(/\s+/).length, 0) / sentences.length;

  if (avgSentenceLength > 25) {
    insights.push({
      id: 'long-sentences',
      word: 'Readability',
      category: 'Structure',
      severity: 'high',
      message: 'Average sentence length is quite long.',
      suggestion: 'Consider breaking down complex sentences for better readability.',
      confidence: 0.9,
    });
  } else if (avgSentenceLength < 8 && sentences.length > 5) {
    insights.push({
      id: 'short-sentences',
      word: 'Flow',
      category: 'Structure',
      severity: 'low',
      message: 'Sentences are very choppy.',
      suggestion: 'Try connecting ideas with conjunctions.',
      confidence: 0.85,
    });
  }

  // 3. Sentiment Analysis
  const positiveWords = processedWords.filter(w => w.sentiment === 'positive').length;
  const negativeWords = processedWords.filter(w => w.sentiment === 'negative').length;

  if (positiveWords > negativeWords * 2) {
    insights.push({
      id: 'pos-tone',
      word: 'Tone',
      category: 'Sentiment',
      severity: 'info',
      message: 'The text conveys a predominantly positive tone.',
      confidence: 0.75,
    });
  } else if (negativeWords > positiveWords * 2) {
    insights.push({
      id: 'neg-tone',
      word: 'Tone',
      category: 'Sentiment',
      severity: 'medium',
      message: 'The text has a predominantly negative or critical tone.',
      confidence: 0.75,
    });
  }

  // 4. Diversity
  const totalWords = processedWords.reduce((sum, w) => sum + w.count, 0);
  const uniqueRatio = processedWords.length / totalWords;

  if (uniqueRatio < 0.3) {
    insights.push({
      id: 'low-diversity',
      word: 'Vocabulary',
      category: 'Style',
      severity: 'high',
      message: 'Vocabulary diversity is low. Words are repeated frequently.',
      suggestion: 'Use synonyms to enrich the text.',
      confidence: 0.9,
    });
  }

  return {
    processedWords,
    insights,
    stats: {
      characterCount,
      sentenceCount: sentences.length,
      readingTime: characterCount / 5 / (isUrdu ? 150 : 200),
      positiveWords,
      negativeWords,
    },
  };
};

export const defaultConfig: WordCloudConfig = {
  labels: {
    title: {en: 'Deep Text Analysis', ur: 'گہری متن تجزیہ'},
    subtitle: {en: 'words • unique • language', ur: 'الفاظ • منفرد • زبان'},
    searchPlaceholder: {en: 'Search words...', ur: 'تلاش کریں...'},
    insights: {en: 'AI Insights', ur: 'AI بصیرت'},
    stats: {
      lexicalDiversity: 'Lexical Diversity',
      technicalTerms: 'Technical Terms',
      complexWords: 'Complex Words',
      avgFrequency: 'Avg Frequency',
      readingTime: 'Reading Time',
      sentiment: 'Sentiment Balance',
    },
    buttons: {clear: 'Clear'},
    empty: {title: 'No words found', description: 'Try adjusting filters', action: 'Clear'},
  },
  theme: {
    primary: '#6366f1', // indigo-500
    heatStart: '#94a3b8', // slate-400
    heatEnd: '#f43f5e', // rose-500
    technicalColor: '#3b82f6', // blue-500
    rareColor: '#8b5cf6', // violet-500
    sentimentPos: '#10b981', // emerald-500
    sentimentNeg: '#ef4444', // red-500
    bgMuted: 'bg-muted',
    urduColor: '#f97316',
    englishColor: '#1e40af',
  },
  ui: {
    showStats: true,
    showInsights: true,
    showPagination: true,
    showWordCountBadge: true,
    defaultColorStrategy: 'heat',
  },
  thresholds: {highFreqPercent: 0.7, lowFreqPercent: 0.3, technicalScore: 0.7, complexityScore: 0.6, minWordLength: 2},
  fontScaling: {min: 12, max: 36, step: 1},
};
