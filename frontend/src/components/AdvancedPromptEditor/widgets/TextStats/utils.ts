/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import {
  Activity,
  AlignLeft,
  BarChart3,
  Clock,
  Eye,
  FileText,
  Hash,
  Languages,
  Layers,
  LucideIcon,
  MessageSquare,
  Save,
  Target,
} from 'lucide-react';

// types
import type {CalculatedStats, TextStatsConfig} from './CharWidgetRenderer';

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
 * Defines a theme configuration for a widget, including the icon, text, and background styling.
 * @example
 * {
 *   Icon: User,
 *   textClass: "text-gray-700",
 *   bgClass: "bg-gray-100"
 * }
 */
export interface WidgetTheme {
  /** The Lucide icon component to render for the widget */
  Icon: LucideIcon;
  /** CSS class for customizing the text color or typography */
  textClass: string;
  /** CSS class for customizing the background color or visual styling */
  bgClass: string;
}

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
export const WIDGET_THEMES: Record<WidgetType, WidgetTheme> = {
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
