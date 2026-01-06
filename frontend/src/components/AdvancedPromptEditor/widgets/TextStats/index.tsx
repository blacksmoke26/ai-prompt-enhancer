/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useMemo} from 'react';
import {
  Activity,
  AlignLeft,
  BarChart3,
  CheckCircle,
  Clock,
  Eye,
  FileText,
  Hash,
  Languages,
  Layers,
  LucideIcon,
  MessageSquare,
  RefreshCw,
  Save,
  Target,
} from 'lucide-react';

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
 * Types of available widgets
 */
export type WidgetType =
  | 'words'
  | 'chars'
  | 'reading_time'
  | 'speaking_time'
  | 'sentences'
  | 'paragraphs'
  | 'lines'
  | 'unique_words'
  | 'readability_level'
  | 'readability_score'
  | 'gunning_fog'
  | 'harakat'
  | 'diacritics'
  | 'longest_word'
  | 'shortest_word'
  | 'avg_word_len'
  | 'avg_sentence_len'
  | 'lexical_density'
  | 'tokens'
  | 'punctuation'
  | 'digits'
  | 'spaces'
  | 'letters'
  | 'status';

/**
 * Configuration for a single widget
 */
export interface WidgetConfig {
  /** The type of widget to render */
  type: WidgetType;
  /** Whether this widget should be displayed (default: true) */
  visible?: boolean | null;
  /** Custom label (overrides default) */
  label?: string | null;
  /** Custom icon (overrides default) */
  icon?: LucideIcon | null;
  /** Custom color class (overrides default) */
  colorClass?: string | null;
  /** Whether to apply the "highlight" style (larger, gradient bg) */
  highlight?: boolean | null;
  /** Grid column span (e.g., 1, 2, etc. Tailwind cols) */
  colSpan?: number | null;
  /** Custom sub-value text */
  subValue?: string | null;
  /** Completely override the rendering of this widget */
  customRender?: (data: CalculatedStats, config: TextStatsConfig) => React.ReactNode;
}

/**
 * Props for the TextStats component
 */
export interface TextStatsProps {
  /** The text content to analyze (defaults to empty string) */
  text?: string | null;
  /** Current auto-save status (defaults to 'idle') */
  autoSaveStatus?: 'idle' | 'saving' | 'saved' | null;
  /** Timestamp of last save operation */
  lastSaved?: Date | string | null;
  /** Global configuration for calculations */
  config?: TextStatsConfig | null;
  /** Array of widget configurations to define layout and content */
  widgets?: WidgetConfig[] | null;
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


/**
 * Default configuration for text statistics calculations, providing fallback values for various settings.
 */
export const DEFAULT_CONFIG: Required<Omit<TextStatsConfig, 'locale'>> & { locale: TextStatsConfig['locale'] } = {
  maxLength: 1000,
  readingWpm: 200,
  speakingWpm: 130,
  rtlMode: 'auto',
  locale: undefined,
};

/**
 * Default list of widgets to display in the UI, including their type and styling options.
 */
export const DEFAULT_WIDGETS: WidgetConfig[] = [
  {type: 'words', highlight: true},
  {type: 'reading_time', highlight: true},
  {type: 'chars', colSpan: 2},
  {type: 'sentences'},
  {type: 'paragraphs'},
  {type: 'lines'},
  {type: 'readability_level'},
  {type: 'gunning_fog'},
  {type: 'harakat', colSpan: 2},
  {type: 'unique_words'},
  {type: 'avg_word_len'},
  {type: 'speaking_time'},
  {type: 'status', colSpan: 2},
];

// --- Color Themes ---

/**
 * Defines a theme configuration for a widget, including the icon, text, and background styling.
 * @example
 * {
 *   Icon: User,
 *   textClass: "text-gray-700",
 *   bgClass: "bg-gray-100"
 * }
 */
export interface WidgetTheme {
  /**
   * The Lucide icon component to render for the widget.
   */
  Icon: LucideIcon;

  /**
   * CSS class for customizing the text color or typography.
   */
  textClass: string;

  /**
   * CSS class for customizing the background color or visual styling.
   */
  bgClass: string;
}

/**
 * A centralized configuration mapping widget types to their corresponding themes.
 * @example
 * const WIDGET_THEMES = {
 *   users: {
 *     Icon: User,
 *     textClass: "text-blue-600",
 *     bgClass: "bg-blue-100"
 *   },
 *   metrics: {
 *     Icon: BarChart,
 *     textClass: "text-green-600",
 *     bgClass: "bg-green-100"
 *   }
 * };
 * @DeveloperNotes:
 * - `WidgetTheme` is used to define visual styles for different widget types in a centralized manner.
 * - `Icon` is a required property for all themes, ensuring consistent visual representation.
 * - `textClass` and `bgClass` allow for theming and styling flexibility across different UI frameworks.
 * - `WIDGET_THEMES` should be extended or modified to support new widget types as needed.
 * - Ensure that the `LucideIcon` used in each theme is
 */
const WIDGET_THEMES: Record<WidgetType, WidgetTheme> = {
  words: {Icon: Hash, textClass: 'text-blue-600', bgClass: 'bg-blue-100 dark:bg-blue-900/30'},
  chars: {Icon: FileText, textClass: 'text-violet-600', bgClass: 'bg-violet-100 dark:bg-violet-900/30'},
  reading_time: {Icon: Clock, textClass: 'text-emerald-600', bgClass: 'bg-emerald-100 dark:bg-emerald-900/30'},
  speaking_time: {Icon: Eye, textClass: 'text-cyan-600', bgClass: 'bg-cyan-100 dark:bg-cyan-900/30'},
  sentences: {Icon: MessageSquare, textClass: 'text-indigo-600', bgClass: 'bg-indigo-100 dark:bg-indigo-900/30'},
  paragraphs: {Icon: AlignLeft, textClass: 'text-purple-600', bgClass: 'bg-purple-100 dark:bg-purple-900/30'},
  lines: {Icon: Layers, textClass: 'text-slate-600', bgClass: 'bg-slate-100 dark:bg-slate-900/30'},
  unique_words: {Icon: Hash, textClass: 'text-pink-600', bgClass: 'bg-pink-100 dark:bg-pink-900/30'},
  readability_level: {Icon: Target, textClass: 'text-orange-600', bgClass: 'bg-orange-100 dark:bg-orange-900/30'},
  gunning_fog: {Icon: BarChart3, textClass: 'text-amber-600', bgClass: 'bg-amber-100 dark:bg-amber-900/30'},
  harakat: {Icon: Languages, textClass: 'text-rose-600', bgClass: 'bg-rose-100 dark:bg-rose-900/30'},
  diacritics: {Icon: Languages, textClass: 'text-red-600', bgClass: 'bg-red-100 dark:bg-red-900/30'},
  longest_word: {Icon: AlignLeft, textClass: 'text-teal-600', bgClass: 'bg-teal-100 dark:bg-teal-900/30'},
  shortest_word: {Icon: AlignLeft, textClass: 'text-teal-500', bgClass: 'bg-teal-50 dark:bg-teal-900/20'},
  avg_word_len: {Icon: Activity, textClass: 'text-lime-600', bgClass: 'bg-lime-100 dark:bg-lime-900/30'},
  avg_sentence_len: {Icon: Activity, textClass: 'text-green-600', bgClass: 'bg-green-100 dark:bg-green-900/30'},
  lexical_density: {Icon: Activity, textClass: 'text-fuchsia-600', bgClass: 'bg-fuchsia-100 dark:bg-fuchsia-900/30'},
  tokens: {Icon: Hash, textClass: 'text-violet-500', bgClass: 'bg-violet-50 dark:bg-violet-900/20'},
  punctuation: {Icon: FileText, textClass: 'text-yellow-600', bgClass: 'bg-yellow-100 dark:bg-yellow-900/30'},
  digits: {Icon: Hash, textClass: 'text-stone-600', bgClass: 'bg-stone-100 dark:bg-stone-900/30'},
  spaces: {Icon: Layers, textClass: 'text-gray-400', bgClass: 'bg-gray-100 dark:bg-gray-900/30'},
  letters: {Icon: AlignLeft, textClass: 'text-zinc-600', bgClass: 'bg-zinc-100 dark:bg-zinc-900/30'},
  readability_score: {Icon: BarChart3, textClass: 'text-orange-500', bgClass: 'bg-orange-50 dark:bg-orange-900/20'},
  status: {Icon: Save, textClass: 'text-emerald-600', bgClass: 'bg-emerald-100 dark:bg-emerald-900/30'},
};

// --- Helpers ---

const safeString = (val: unknown): string => {
  if (val === null || val === undefined) return '';
  return String(val);
};

const safeLocaleFormat = (num: number, locale?: string | null): string => {
  // noinspection SuspiciousTypeOfGuard
  if (typeof num !== 'number' || isNaN(num)) return '0';
  try {
    return num.toLocaleString(locale || undefined);
  } catch (e) {
    return num.toString();
  }
};

const countSyllables = (word: string): number => {
  if (!word) return 0;
  word = word.toLowerCase();
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  const matches = word.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
};

const detectRtl = (text: string): boolean => {
  if (!text) return false;
  const rtlRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
  const matches = text.match(rtlRegex);
  if (!matches) return false;
  const cleanText = text.replace(/\s/g, '');
  if (cleanText.length === 0) return false;
  return (matches.length / cleanText.length) > 0.2;
};

// --- Internal Components ---

/**
 * Props for a statistical widget component displaying icons, labels, and values with customizable styling.
 * @example
 * {
 *   icon: ChartBar,
 *   label: "Users",
 *   value: 1250,
 *   subValue: "25% increase",
 *   textClass: "text-blue-600",
 *   bgClass: "bg-blue-100",
 *   highlight: true,
 *   colSpan: 2
 * }
 */
export interface StatWidgetProps {
  /**
   * The Lucide icon component to display alongside the widget.
   */
  icon: LucideIcon;

  /**
   * The descriptive label or title of the widget.
   */
  label: string;

  /**
   * The main value or data point to display in the widget.
   */
  value: React.ReactNode;

  /**
   * Optional secondary value or additional information to display beneath the main value.
   */
  subValue?: string;

  /**
   * Optional CSS class for customizing the text color or font styling.
   */
  textClass?: string;

  /**
   * Optional CSS class for customizing the background color or other visual aspects.
   */
  bgClass?: string;

  /**
   * Whether to apply a highlight style (e.g., border, glow, or emphasis) to the widget.
   */
  highlight?: boolean;

  /**
   * Optional number of columns to span in a grid layout (e.g., 1, 2, 3).
   */
  colSpan?: number;
}

/**
 * Developer Notes:
 * - This interface is designed for a reusable widget used in dashboards or data displays.
 * - The `icon`, `label`, and `value` are required for basic functionality.
 * - `textClass` and `bgClass` allow for theme customization and visual alignment with UI frameworks.
 * - `highlight` is typically used to draw attention to key metrics or anomalies.
 * - `colSpan` is useful for responsive layouts where widgets need to occupy varying column widths.
 */

const StatWidget: React.FC<StatWidgetProps> = (props) => {
  const {
    icon: Icon,
    label,
    value,
    subValue,
    textClass = 'text-blue-500',
    bgClass = 'bg-blue-100 dark:bg-blue-900/30',
    highlight = false,
    colSpan = 1,
  } = props;

  const spanClass = colSpan === 2
    ? 'col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-2'
    : 'col-span-1';

  return (
    <div className={`
      ${spanClass} flex flex-col justify-between p-3 rounded-xl border bg-card shadow-sm transition-all hover:shadow-md
      ${highlight ? 'bg-gradient-to-br from-background to-muted/30' : ''}
    `}>
      <div className="flex items-start justify-between">
        <div className={`p-2 rounded-lg ${bgClass} ${textClass} mb-2`}>
          <Icon className="h-4 w-4"/>
        </div>
        {subValue && <span
          className="text-[10px] font-mono uppercase text-muted-foreground bg-muted px-1.5 py-0.5 rounded">{subValue}</span>}
      </div>
      <div className="min-h-[2rem]">
        <div className={`font-bold ${highlight ? 'text-2xl' : 'text-lg'} tracking-tight text-foreground truncate`}>
          {value}
        </div>
        <div className="text-xs text-muted-foreground font-medium mt-1">{label}</div>
      </div>
    </div>
  );
};

// --- Specialized Renderers ---

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

const StatusWidgetRenderer = (
  data: {
    stats?: CalculatedStats,
    config?: TextStatsConfig,
    props?: Pick<TextStatsProps, 'autoSaveStatus' | 'lastSaved'>
  },
) => {
  const {autoSaveStatus = 'idle', lastSaved} = data.props || {};
  const currentStats = data?.stats || {tokenEstimate: 0};
  const currentConfig = data.config || DEFAULT_CONFIG;
  const locale = currentConfig.locale;

  let formattedLastSaved: string | null = null;
  if (lastSaved) {
    try {
      const dateObj = lastSaved instanceof Date ? lastSaved : new Date(lastSaved);
      if (!isNaN(dateObj.getTime())) {
        formattedLastSaved = dateObj.toLocaleTimeString(locale || [], {hour: '2-digit', minute: '2-digit'});
      }
    } catch (e) {
      // nothing to do
    }
  }

  // Dynamic Status Colors
  let StatusIcon = Save;
  let statusColorClass = 'text-slate-500';
  let statusBgClass = 'bg-slate-100 dark:bg-slate-900/30';
  let statusLabel = 'Auto-save';

  if (autoSaveStatus === 'saving') {
    StatusIcon = RefreshCw;
    statusColorClass = 'text-blue-500';
    statusBgClass = 'bg-blue-100 dark:bg-blue-900/30';
    statusLabel = 'Saving...';
  } else if (autoSaveStatus === 'saved') {
    StatusIcon = CheckCircle;
    statusColorClass = 'text-emerald-500';
    statusBgClass = 'bg-emerald-100 dark:bg-emerald-900/30';
    statusLabel = 'Saved';
  }

  return (
    <div
      className="col-span-1 sm:col-span-2 lg:col-span-1 xl:col-span-2 flex items-center justify-between p-4 rounded-xl border bg-muted/30">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className={`p-1.5 rounded-full ${statusBgClass} ${statusColorClass}`}>
            <StatusIcon className="h-4 w-4"/>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-foreground">{statusLabel}</span>
          {formattedLastSaved && (
            <span className="text-[10px] text-muted-foreground font-mono">Last edit: {formattedLastSaved}</span>
          )}
        </div>
      </div>
      <div className="hidden md:flex flex-col items-end">
        <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Tokens</span>
        <span
          className="text-sm font-mono font-medium text-violet-600">{safeLocaleFormat(currentStats.tokenEstimate || 0)}</span>
      </div>
    </div>
  );
};

/**
 * Main Component
 */
const TextStats: React.FC<TextStatsProps> = (props) => {
  const {
    text: rawText = '',
    autoSaveStatus = 'idle',
    lastSaved,
    config: userConfig,
    widgets: userWidgets,
  } = props;

  const text = safeString(rawText);

  const config: TextStatsConfig = useMemo(() => {
    const base = DEFAULT_CONFIG;
    const safeUserConfig = userConfig || {};

    return {
      maxLength: Math.max(0, safeUserConfig.maxLength ?? base.maxLength!),
      readingWpm: Math.max(1, safeUserConfig.readingWpm ?? base.readingWpm!),
      speakingWpm: Math.max(1, safeUserConfig.speakingWpm ?? base.speakingWpm!),
      rtlMode: safeUserConfig.rtlMode || base.rtlMode,
      locale: safeUserConfig.locale || base.locale,
    };
  }, [userConfig]);

  const activeWidgets = useMemo(() => {
    const source = Array.isArray(userWidgets) ? userWidgets : DEFAULT_WIDGETS;
    return source.filter(w => w?.visible !== false);
  }, [userWidgets]);

  const stats = useMemo((): CalculatedStats => {
    const trimmedText = text.trim();
    const charCount = text.length;
    const charCountNoSpaces = text.replace(/\s/g, '').length;
    const lines = text ? text.split(/\r\n|\r|\n/).length : 0;
    const paragraphCount = trimmedText ? trimmedText.split(/\n\s*\n/).filter(p => p.trim().length > 0).length : 0;
    const words = trimmedText ? trimmedText.split(/\s+/).filter(w => w.length > 0) : [];
    const wordCount = words.length;
    const sentences = trimmedText ? trimmedText.split(/[.!?\u3002\u06D4]+/).filter(s => s.trim().length > 0) : [];
    const sentenceCount = sentences.length;
    const spaceCount = (text.match(/\s/g) || []).length;
    const punctuationCount = (text.match(/[.,!?;:'"()[\]{}،۔؟]/g) || []).length;
    const digitCount = (text.match(/\d/g) || []).length;
    const letterCount = (text.match(/[a-zA-Z\u0600-\u06FF]/g) || []).length;
    const uniqueWords = new Set(words.map(w => w.toLowerCase()));
    const uniqueWordCount = uniqueWords.size;
    const lexicalDensity = wordCount > 0 ? (uniqueWordCount / wordCount) * 100 : 0;
    const sortedWords = [...words].sort((a, b) => b.length - a.length);
    const longestWord = sortedWords[0] || '';
    const shortestWord = sortedWords[sortedWords.length - 1] || '';

    let syllableCount = 0;
    const isRtl = config.rtlMode === 'force'
      ? true
      : config.rtlMode === 'disable'
        ? false
        : detectRtl(text);

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

    const readingTime = wordCount > 0 ? wordCount / (config?.readingWpm || 1) : 0;
    const speakingTime = wordCount > 0 ? wordCount / (config?.speakingWpm || 1) : 0;
    const tokenEstimate = Math.ceil(charCount / 4); // Ensure this is calculated

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
  }, [text, config]);

  const fmt = (val: number | undefined, decimals = 1): string =>
    val !== undefined && !isNaN(val) ? val.toFixed(decimals) : '-';

  const getLabel = (type: WidgetType, override?: string | null): string => {
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

  const getValue = (cfg: WidgetConfig): string | number => {
    if (cfg.customRender) return '';
    try {
      switch (cfg.type) {
        case 'words':
          return safeLocaleFormat(stats.wordCount, config.locale);
        case 'reading_time':
          return `${fmt(stats.readingTime)} min`;
        case 'speaking_time':
          return `${fmt(stats.speakingTime)}m`;
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
          return fmt(stats.gunningFog, 1);
        case 'diacritics':
          return stats.diacriticsCount;
        case 'longest_word':
          return stats.longestWord || '-';
        case 'shortest_word':
          return stats.shortestWord || '-';
        case 'avg_word_len':
          return `${fmt(stats.avgWordLength, 1)}c`;
        case 'avg_sentence_len':
          return `${fmt(stats.avgSentenceLength, 1)}w`;
        case 'lexical_density':
          return `${fmt(stats.lexicalDensity, 0)}%`;
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
          return fmt(stats.fleschScore, 1);
        default:
          return '-';
      }
    } catch (e) {
      return 'Error';
    }
  };

  return (
    <div className="w-full bg-background border-t border-b md:border md:rounded-xl shadow-sm p-4 md:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:col-span-4 xl:grid-cols-6 gap-4">
        {activeWidgets.map((cfg, idx) => {
          if (!cfg || !cfg.type) return null;

          // 1. Handle Custom Renderers
          if (cfg.customRender) {
            return (
              <div key={idx}
                   className={cfg.colSpan === 2 ? 'col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-2' : 'col-span-1'}>
                {cfg.customRender(stats, config)}
              </div>
            );
          }

          // 2. Handle Special Built-in Renderers
          if (cfg.type === 'chars') return <CharWidgetRenderer key={idx} stats={stats} config={config}/>;
          if (cfg.type === 'status') return <StatusWidgetRenderer key={idx} stats={stats} config={config}
                                                                  props={{autoSaveStatus, lastSaved}}/>;

          // 3. Handle Harakat (Special Condition)
          if (cfg.type === 'harakat') {
            if (!stats.isRtl) return null;
            return <HarakatWidgetRenderer key={idx} stats={stats}/>;
          }

          // 4. Conditionals for Standard Widgets
          if ((cfg.type === 'readability_level' || cfg.type === 'gunning_fog' || cfg.type === 'readability_score') && stats.isRtl) return null;

          // 5. Resolve Theme & Colors
          const theme = WIDGET_THEMES[cfg.type] || WIDGET_THEMES.status;
          const Icon = cfg.icon || theme.Icon;

          let textClass = cfg.colorClass || theme.textClass;
          let bgClass = theme.bgClass;

          if (cfg.type === 'readability_level') {
            textClass = stats.readabilityColor;
            bgClass = stats.readabilityBg || theme.bgClass;
          }

          // 6. Handle Standard Widgets
          return (
            <StatWidget
              key={idx}
              icon={Icon}
              label={getLabel(cfg.type, cfg.label)}
              value={getValue(cfg)}
              subValue={cfg.subValue || undefined}
              textClass={textClass}
              bgClass={bgClass}
              highlight={!!cfg.highlight}
              colSpan={cfg.colSpan ?? 1}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TextStats;
