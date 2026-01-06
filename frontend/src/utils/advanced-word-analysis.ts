/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// utils
import {
  SENTIMENT_WORDS,
  STOP_WORDS,
  TECHNICAL_TERMS,
  URDU_SENTIMENT_WORDS,
  URDU_STOP_WORDS,
} from '~/utils/word-cloud.ts';

/**
 * Represents the sentiment classification of text content.
 * @example
 * const sentiment: SentimentType = SentimentType.Positive;
 */
export enum SentimentType {
  Positive = 'positive',
  Negative = 'negative',
  Neutral = 'neutral',
  Mixed = 'mixed',
}

/**
 * Represents parts of speech (POS) for text analysis.
 * @example
 * const wordType: WordType = WordType.Adjective;
 */
export enum WordType {
  Noun = 'noun',
  Verb = 'verb',
  Adjective = 'adjective',
  Adverb = 'adverb',
  Unknown = 'unknown',
}

/**
 * Represents filters for text processing, such as filtering stop words or by frequency.
 * @example
 * const filter: FilterType = FilterType.StopWords;
 */
export enum FilterType {
  All = 'all',
  StopWords = 'stopwords',
  Unique = 'unique',
  Common = 'common',
  Technical = 'technical',
  Long = 'long',
  Short = 'short',
  Complex = 'complex',
  Positive = 'positive',
  Negative = 'negative',
  Noun = 'noun',
  Verb = 'verb',
  Adjective = 'adjective',
}

/**
 * Represents tabs in a sidebar UI for text analysis or visualization.
 * @example
 * const tab: SidebarTab = SidebarTab.Composition;
 */
export enum SidebarTab {
  Overview = 'overview',
  Composition = 'composition',
  Entities = 'entities',
  Insights = 'insights',
}

/**
 * Represents supported languages for text processing.
 * @example
 * const lang: Language = Language.English;
 */
export enum Language {
  English = 'en',
  Urdu = 'ur',
}

/**
 * A customizable vocabulary configuration for text analysis, allowing users to define custom word lists
 * for filtering, categorization, or simplification.
 * @example
 * const vocab: CustomVocabulary = {
 *   technical: ["algorithm", "database"],
 *   positive: ["happy", "success"],
 *   stopwords: new Set(["the", "and"]),
 * };
 */
export interface CustomVocabulary {
  /**
   * List of technical terms to identify or filter.
   */
  technical?: string[];

  /**
   * List of positive sentiment words.
   */
  positive?: string[];

  /**
   * List of negative sentiment words.
   */
  negative?: string[];

  /**
   * List of complex or difficult-to-understand words.
   */
  complex?: string[];

  /**
   * Mapping of complex words to their simplified equivalents.
   */
  simplifications?: Record<string, string[]>;

  /**
   * Set of stop words to exclude from analysis.
   */
  stopwords?: Set<string>;
}

/**
 * Metadata for an individual word, including frequency, sentiment, complexity, and other linguistic features.
 * @example
 * const metadata: WordMetadata = {
 *   id: "123",
 *   word: "algorithm",
 *   originalWord: "algorithm",
 *   count: 5,
 *   isStopWord: false,
 *   complexity: { score: 0.8, factors: { technical: 1.0, rarity: 0.7 } },
 *   sentiment: SentimentType.Positive,
 *   type: WordType.Noun,
 *   syllables: 5,
 *   contextSentences: ["The algorithm processed data efficiently."],
 * };
 */
export interface WordMetadata {
  /**
   * Unique identifier for the word.
   */
  id: string;

  /**
   * The word itself.
   */
  word: string;

  /**
   * Original form of the word before any transformations.
   */
  originalWord: string;

  /**
   * Number of times the word appears in the text.
   */
  count: number;

  /**
   * Frequency score (normalized).
   */
  frequency: number;

  /**
   * Whether the word is a stop word (common, non-content word).
   */
  isStopWord: boolean;

  /**
   * Complexity analysis of the word.
   */
  complexity: {
    /**
     * Overall complexity score (0–1).
     */
    score: number;

    /**
     * Breakdown of complexity factors.
     */
    factors: {
      /**
       * Technicality of the word.
       */
      technical: number;

      /**
       * Rarity of the word.
       */
      rarity: number;

      /**
       * Length of the word.
       */
      length: number;

      /**
       * Emotional connotation of the word.
       */
      emotion: number;

      /**
       * Frequency in the text.
       */
      frequency: number;
    };
  };

  /**
   * Sentiment classification of the word.
   */
  sentiment: SentimentType;

  /**
   * Part of speech classification (noun, verb, etc.).
   */
  type: WordType;

  /**
   * Number of syllables in the word.
   */
  syllables: number;

  /**
   * List of sentences in which the word appears.
   */
  contextSentences: string[];
}

/**
 * Statistical summary of text analysis, including readability, sentiment, and linguistic features.
 * @example
 * const stats: AnalysisStats = {
 *   totalWords: 1000,
 *   uniqueWords: 300,
 *   readingTime: 5.2,
 *   gradeLevel: "12th grade",
 *   toneScore: { analytical: 0.7, confident: 0.6 },
 *   emotionalBreakdown: { joy: 0.4, anger: 0.1 },
 * };
 */
export interface AnalysisStats {
  /**
   * Total number of words in the text.
   */
  totalWords: number;

  /**
   * Number of unique words in the text.
   */
  uniqueWords: number;

  /**
   * Number of sentences in the text.
   */
  sentences: number;

  /**
   * Estimated reading time in minutes.
   */
  readingTime: number;

  /**
   * Estimated grade level (e.g., "12th grade").
   */
  gradeLevel: string;

  /**
   * Grade-level score (e.g., Flesch-Kincaid score).
   */
  gradeScore: number;

  /**
   * Tone analysis scores.
   */
  toneScore: {
    /**
     * Analytical tone score.
     */
    analytical: number;

    /**
     * Confident tone score.
     */
    confident: number;

    /**
     * Tentative tone score.
     */
    tentative: number;
  };

  /**
   * Emotional breakdown of the text.
   */
  emotionalBreakdown: {
    /**
     * Joy score.
     */
    joy: number;

    /**
     * Anger score.
     */
    anger: number;

    /**
     * Sadness score.
     */
    sadness: number;

    /**
     * Fear score.
     */
    fear: number;
  };

  /**
   * Distribution of sentence lengths.
   */
  sentenceLengths: number[];

  /**
   * Top keywords by frequency.
   */
  topKeywords: string[];

  /**
   * Type-token ratio (TTR), a measure of lexical diversity.
   */
  ttr: number;

  /**
   * Part-of-speech distribution.
   */
  posDistribution: {
    /**
     * Noun count.
     */
    noun: number;

    /**
     * Verb count.
     */
    verb: number;

    /**
     * Adjective count.
     */
    adj: number;

    /**
     * Other part-of-speech count.
     */
    other: number;
  };

  /**
   * Total number of syllables in the text.
   */
  totalSyllables: number;

  /**
   * Average syllables per word.
   */
  avgSyllablesPerWord: number;

  /**
   * Sentiment drivers (words contributing most to sentiment).
   */
  sentimentDrivers: {
    /**
     * Word contributing to sentiment.
     */
    word: string;

    /**
     * Frequency of the word.
     */
    count: number;

    /**
     * Type of sentiment (positive/negative).
     */
    type: string;
  }[];

  /**
   * Number of sentences using passive voice.
   */
  passiveVoiceCount: number;
}

/**
 * Represents the severity or type of insight, used to categorize UI feedback or alerts.
 * @example
 * const insight: InsightType = 'warning';
 */
export type InsightType = 'warning' | 'success' | 'info' | 'critical';

/**
 * Represents the category or domain of an insight, used to organize insights into meaningful groups.
 * @example
 * const category: InsightCategory = 'readability';
 */
export type InsightCategory = 'vocabulary' | 'readability' | 'tone' | 'grammar' | 'structure';

/**
 * Represents a single insight or recommendation generated from text analysis, including its type, category, and suggestions.
 * @example
 * const insight: Insight = {
 *   id: "insight-123",
 *   type: InsightType.warning,
 *   category: InsightCategory.readability,
 *   message: "This text may be difficult to read for younger audiences.",
 *   suggestion: "Consider simplifying complex words or shortening sentences.",
 * };
 */
export interface Insight {
  /** Unique identifier for the insight */
  id: string;
  /** Type of insight (e.g., warning, success, info, critical) */
  type: InsightType;
  /** Category of insight (e.g., vocabulary, readability, tone) */
  category: InsightCategory;
  /** Human-readable message describing the insight */
  message: string;
  /** Optional suggestion or action to address the insight */
  suggestion?: string;
}

/**
 * A complete result object containing word metadata, statistical analysis, and insights derived from text analysis.
 */
export interface AnalysisResult {
  /** Array of metadata for each word in the analyzed text */
  words: WordMetadata[];
  /** Statistical summary of the text analysis (readability, sentiment, etc.) */
  stats: AnalysisStats;
  /** Array of insights or recommendations derived from the analysis */
  insights: Insight[];
}

export interface WordAnalysisConfig {
  /** Default sidebar tab to display (e.g., 'composition') */
  defaultSidebarTab?: SidebarTab;
  /** Tabs to enable in the sidebar UI */
  enabledTabs?: SidebarTab[];
  /** Enable text rewriting or simplification features */
  enableRewrite?: boolean;
  /** Maximum number of words to analyze */
  maxWords?: number;
  /** Custom vocabulary for filtering or analysis */
  customVocabulary?: CustomVocabulary;
}

/**
 * Props interface for the `AdvancedWordAnalysis` component, defining input text, language, and configuration options.
 * @example
 * <AdvancedWordAnalysis
 *   text="This is a sample text for analysis."
 *   language={Language.English}
 *   config={{
 *     defaultSidebarTab: SidebarTab.Composition,
 *     enabledTabs: [SidebarTab.Overview, SidebarTab.Insights],
 *     enableRewrite: true,
 *     customVocabulary: {
 *       technical: ["algorithm", "database"],
 *       stopwords: new Set(["the", "and"]),
 *     },
 *   }}
 * />
 */
export interface AdvancedWordAnalysisProps {
  /** The text to be analyzed */
  text: string;
  /** Language of the text (default: English) */
  language?: Language;
  /** Optional configuration for analysis behavior and UI */
  config?: WordAnalysisConfig;
}

/**
 * A list of positive sentiment words in the Urdu language, derived from the `URDU_SENTIMENT_WORDS` object.
 * @example ["خوش", "مبارک", "آرام"]
 * @note Developer Notes: This list is a copy of `URDU_SENTIMENT_WORDS.positive`. Ensure that updates to the source sentiment words are reflected here.
 */
export const URDU_POSITIVE_WORDS = [...URDU_SENTIMENT_WORDS.positive];

/**
 * A list of negative sentiment words in the Urdu language, derived from the `URDU_SENTIMENT_WORDS` object.
 * @example ["بads", "بے‌حیا", "نفرت"]
 * @note Developer Notes: This list is a copy of `URDU_SENTIMENT_WORDS.negative`. Ensure consistency with the source and avoid duplication.
 */
export const URDU_NEGATIVE_WORDS = [...URDU_SENTIMENT_WORDS.negative];

/**
 * A list of complex or rarely used Urdu words, intended for advanced linguistic processing.
 * @example ["آئینہ", "گھر", "دشمن"]
 * @note Developer Notes: This list is currently a work in progress and may require expansion. Add words that are contextually complex or infrequently used.
 */
export const URDU_COMPLEX_WORDS = [
  'موجودیت', 'استعمال', 'حاصل کرنا', 'تقریباً', 'زیرِ التوا', 'موجودہ', 'بہترین', 'خیر', 'ممکنہ',
  'مستبعد', 'تشویشناک', 'تخلیق', 'اضافہ', 'نشان', 'خاکہ', 'ضرورت', 'وجہ',
  'کیوںکہ', 'اس لے', 'اس وجہ سے', 'فی', 'تحت', 'علاوہ', 'علاوہاں',
  'اہمیت', 'تشخیص', 'ابلاغ', 'تعلق', 'تعلقہ', 'مطابق', 'مطابقہ', 'مختلف', 'مختلفہ',
  'مخصوص', 'مخصوصہ', 'موجودہ', 'موجودگی', 'نتیجہ', 'نتیجتاً', 'عمل', 'عملکرد', 'اوسط',
  'اوسطاً', 'فوری', 'فوراً', 'ضروری', 'ضرورت', 'مستقبل', 'مستقیم', 'مستقل', 'مستقلہ',
  'مجموعی', 'مجموعی طور پر', 'مکمل', 'مکمل طور پر', 'متناسب', 'متعلقہ', 'متعدد',
  'مثلاً', 'ممکن', 'ممکنہ', 'موجود', 'موجودہ', 'نصاب', 'نظام', 'نظامت', 'نیاز',
  'واقعہ', 'واقعی', 'وسط', 'وسطی', 'پرانی', 'پرانا', 'پروگرام', 'پروگرامنگ', 'پیش',
  'پیشہ', 'پیشہ ورانہ', 'چونکہ', 'چہارم', 'حادثہ', 'حکومت', 'حکومتی', 'حصہ', 'حصہ دار',
  'خصوصی', 'خصوصیت', 'خطرہ', 'خطرناک', 'داخل', 'داخلہ', 'دوسرا', 'دوسرے', 'دورانیہ',
  'دوران', 'دوسرا', 'ذمہ داری', 'ذریعہ', 'ذریعے', 'راستہ', 'رابطہ', 'رابطہ کار', 'رویہ',
  'رفتار', 'رقبہ', 'سامنا', 'سوال', 'سماج', 'سماجی', 'سیاسی', 'شامل', 'شکل',
  'صلاحیت', 'صورت', 'صورت حال', 'ضد', 'طرف', 'طور', 'طور پر', 'عام', 'عامی',
  'فائدہ', 'فاصلہ', 'قابل', 'قابل ذکر', 'قدر', 'لحاظ', 'لوگ', 'مثال', 'مجموعہ',
  'محض', 'مختلف', 'ممکن', 'مناسب', 'نام', 'نظر', 'نتیجہ', 'نوعیت', 'ہر',
  'ہدف', 'ہم', 'ہمارا', 'ہمارے', 'پاکستان', 'اسلام', 'دنیا', 'کھیل', 'کامیابی', 'شکست',
];

/**
 * A mapping of Urdu script characters to their simplified or normalized forms, facilitating easier processing and comparison.
 * @example
 * {
 *   "۱": ["1", "١"],
 *   "۲": ["2", "٢"]
 * }
 * @note Developer Notes: Ensure that all keys are unique and values are consistent across different representations. This mapping is static and should not be modified at runtime.
 */
export const URDU_SIMPLIFICATIONS: Record<string, string[]> = {
  'موجودیت': ['موجودگی', 'وجود'],
  'استعمال': ['استعمال'],
  'حاصل کرنا': ['پانا', 'لینا'],
  'تقریباً': ['تقریب', 'تھوڑا'],
  'زیرِ التوا': ['مجموعہ', 'گروپ'],
  'موجودہ': ['پڑا', 'موجود'],
  'بہترین': ['سب سے اچھا'],
  'مستبعد': ['پر مشتمل'],
  'تشویشناک': ['پریشان کن', 'پریشان کرنے والا'],
  'نشان': ['نشانہی', 'اشارہ'],
  'اہمیت': ['اہم', 'اہم بات'],
  'تشخیص': ['پتہ', 'جاننا'],
  'ابلاغ': ['بتانا', 'کہنا'],
  'تعلق': ['رشتہ', 'جوڑ'],
  'مطابق': ['سے', 'موافق'],
  'مختلف': ['الگ', 'علیحدہ'],
  'مخصوص': ['مقرر', 'خاص'],
  'نتیجہ': ['نتیجہ'],
  'نتیجتاً': ['اس لیے'],
  'عمل': ['کام', ' کام کرنا'],
  'عملکرد': ['کام کا انداز'],
  'اوسط': ['درمیانہ'],
  'فوری': ['جلدی'],
  'ضروری': ['چاہیے'],
  'مستقبل': ['آئندہ'],
  'مستقیم': ['سیدھا'],
  'مستقل': ['پکا'],
  'مجموعی': ['کل'],
  'مکمل': ['پورا', 'ختم'],
  'متناسب': ['موزوں'],
  'متعلقہ': ['سے متعلق'],
  'متعدد': ['کئی', 'بہت سارے'],
  'مثلاً': ['جیسے'],
  'موجود': ['ہے'],
  'نظام': ['طریقہ'],
  'نیاز': ['ضرورت'],
  'واقعہ': ['بات', 'ہو بہو'],
  'وسط': ['درمیان'],
  'پرانی': ['پرانا'],
  'پیش': ['آگے'],
  'پیشہ': ['کام', 'روزگار'],
  'چونکہ': ['کیونکہ'],
  'حکومت': ['سارکار'],
  'حصہ': ['حصہ'],
  'خصوصی': ['خاص'],
  'خصوصیت': ['خوبی'],
  'خطرہ': ['نقصان'],
  'داخل': ['اندر'],
  'دوسرا': ['اگلا'],
  'دورانیہ': ['وقت'],
  'دوران': ['دوران'],
  'ذمہ داری': ['ذمہ داری'],
  'ذریعہ': ['راستہ'],
  'راستہ': ['راستہ', 'سڑک'],
  'رابطہ': ['رابطہ'],
  'رویہ': ['انداز'],
  'رفتار': ['تیزی'],
  'رقبہ': ['جگہ'],
  'سامنا': ['مقابلہ'],
  'سوال': ['سوال'],
  'سماج': ['لوگ'],
  'سیاسی': ['سیاست دان'],
  'شامل': ['میں'],
  'شکل': ['شکل', 'روپ'],
  'صلاحیت': ['صلاحیت'],
  'صورت': ['صورت', 'حالت'],
  'ضد': ['خلاف'],
  'طرف': ['طرف', 'جانب'],
  'طور': ['طور', 'طریقہ'],
  'عام': ['سارا', 'آبا'],
};

/**
 * A default vocabulary configuration for English text analysis, containing pre-defined lists of technical terms, sentiment words, complex words, and stop words.
 * This is a fully populated version of `CustomVocabulary` with default values for all properties.
 * @example
 * const defaultVocab = {
 *   technical: ["algorithm", "database", "encryption"],
 *   positive: ["happy", "success", "benefit"],
 *   negative: ["error", "problem", "failure"],
 *   complex: ["sophistication", "implementation", "optimization"],
 *   simplifications: {
 *     "sophistication": ["complexity", "advanced"],
 *     "implementation": ["execution", "realization"],
 *   },
 *   stopwords: new Set(["the", "and", "of", "a", "to"]),
 * };
 */
export const DEFAULT_VOCAB_EN: Readonly<Required<CustomVocabulary>> = {
  technical: [...TECHNICAL_TERMS],
  negative: [...SENTIMENT_WORDS.negative],
  positive: [...SENTIMENT_WORDS.positive],
  complex: [
    'utilize', 'demonstrate', 'facilitate', 'consequently', 'approximately',
    'implement', 'methodology', 'functionality', 'optimize', 'furthermore',
    'nevertheless', 'subsequently', 'approximately', 'commence', 'terminate',
    'exhibit', 'indicate', 'demonstrates', 'initiate', 'constitutes', 'necessitate',
    'substantially', 'comprehensive', 'fundamentally', 'predominantly', 'subsequently',
    'regarding', 'concerning', 'expedite', 'ameliorate', 'acquisition', 'advancement',
    'beneficial', 'capabilities', 'capacity', 'cognizant', 'commencement', 'component',
    'consequently', 'constitute', 'contemporary', 'demonstrate', 'determine', 'discontinue',
    'elucidate', 'encounter', 'endeavor', 'enumerate', 'equivalent', 'establish', 'exhibit',
    'expedite', 'facilitate', 'feasible', 'finalize', 'formulate', 'generate', 'highlight',
    'identify', 'illustrate', 'implement', 'indicate', 'initiate', 'locate', 'magnitude',
    'modification', 'necessitate', 'nonetheless', 'objective', 'obtain', 'operate',
    'orientation', 'participate', 'pertaining', 'possess', 'preclude', 'preliminary',
    'prerequisite', 'proceed', 'process', 'proficiency', 'project', 'promulgate',
    'propensity', 'provide', 'purchase', 'regarding', 'requirement', 'retain', 'scenario',
    'scope', 'sequence', 'significant', 'similar', 'solicit', 'specification', 'strategic',
    'subsequently', 'substitute', 'succession', 'sufficient', 'terminate', 'transmit',
    'utilization', 'validate', 'verify', 'via', 'viable', 'visualize', 'warrant',
    'abbreviation', 'accommodate', 'accumulation', 'acknowledge', 'accordingly', 'accurate',
    'achievement', 'additional', 'addressed', 'adequately', 'adjustment', 'administrative',
    'advocate', 'affected', 'aggregate', 'alternative', 'amendment', 'announced', 'annually',
    'apparent', 'applicable', 'appointment', 'appreciate', 'approached', 'appropriate',
    'arrangement', 'association', 'assumed', 'assistance', 'assure', 'attempted',
    'attention', 'attributed', 'authorized', 'available', 'backwards', 'calculated',
    'capability', 'capacity', 'categories', 'categorize', 'characteristic', 'clarification',
    'collaborate', 'collaborative', 'collaboratively', 'collectively', 'combination', 'combine',
    'commencement', 'commission', 'commitment', 'communicate', 'completion', 'compliance',
    'component', 'comprehensive', 'comprise', 'compute', 'concentrate', 'conceptual',
    'conclusion', 'concurrent', 'condition', 'confirmation', 'conflict', 'consequently',
    'conservation', 'considerable', 'consideration', 'consistent', 'consolidate',
    'constitute', 'construction', 'consultation', 'consumption', 'contemporary', 'context',
    'continually', 'continuously', 'contractor', 'contribute', 'contribution', 'controversy',
    'convenient', 'convention', 'convergence', 'conversely', 'converted', 'conviction',
    'cooperation', 'cooperative', 'coordinate', 'correction', 'correspondingly',
    'counsel', 'creation', 'creative', 'critically', 'cumulative', 'currently',
    'decision', 'decisive', 'decomposition', 'dedication', 'definition', 'demonstrate',
    'denominator', 'dependence', 'deployment', 'derived', 'designate', 'desired',
    'designers', 'destinations', 'detected', 'determinations', 'determine', 'determined',
    'developments', 'devices', 'devoted', 'devotedly', 'diagnostic', 'diagram',
    'dialectical', 'diameter', 'differ', 'differentiate', 'difficult', 'difficulty',
    'dimension', 'dimensions', 'direction', 'directors', 'disadvantages', 'disappear',
    'disaster', 'discipline', 'disclosure', 'discontinuity', 'discovered', 'discovery',
    'discrete', 'discuss', 'discussion', 'discretion', 'disentangle', 'disintegration',
    'dismissal', 'dispensation', 'dispersion', 'displacement', 'disproportionate',
    'disregard', 'disseminate', 'dissimilar', 'dissociate', 'dissolution', 'distance',
    'distinct', 'distinction', 'distribute', 'distribution', 'divergence', 'diversified',
    'diversion', 'diversity', 'diverted', 'division', 'documentation', 'documented',
    'dominance', 'dominant', 'dominate', 'doubtful', 'drastically', 'duration',
    'dynamics', 'economically', 'economics', 'economy', 'educated', 'education',
    'efficacy', 'efficiency', 'efficient', 'elaborate', 'elapsed', 'elastic',
    'elapsed', 'election', 'electorate', 'electronic', 'elementary', 'elevation',
    'eliminated', 'embarrassment', 'embrace', 'emerged', 'emergence', 'emergency',
    'emission', 'emotional', 'emphasis', 'emphasized', 'employed', 'employment',
    'encourage', 'endeavor', 'ending', 'endless', 'endorse', 'endorsement',
    'endurance', 'energetic', 'engage', 'engagement', 'engine', 'engineering',
    'enhancement', 'enormous', 'enough', 'enrichment', 'enrolled', 'enrollment',
    'ensured', 'entertainment', 'enthusiasm', 'enthusiastic', 'entirely', 'entity',
    'entrance', 'environment', 'environmental', 'envision', 'episode', 'equated',
    'equation', 'equipment', 'equipped', 'equity', 'equivalent', 'eradicate',
    'erroneous', 'escalation', 'establish', 'established', 'establishment', 'estate',
    'estimate', 'estimated', 'evaluation', 'evacuation', 'evaluate', 'evaporated',
    'evidence', 'evident', 'evolution', 'exacerbate', 'exaggerated', 'examination',
    'exceeded', 'exception', 'exceptional', 'excess', 'excessive', 'exchange',
    'excitement', 'excluded', 'exclusion', 'exclusively', 'execute', 'execution',
    'executive', 'exemplify', 'exemption', 'exertion', 'exhausted', 'exhibit',
    'existence', 'expansion', 'expectancy', 'expectation', 'expedite', 'expelled',
    'expenditure', 'expertise', 'explicitly', 'exploitation', 'exploration', 'explosive',
    'exposure', 'expression', 'extensive', 'external', 'extinction', 'extracted',
    'facilitate', 'facilities', 'factor', 'faculties', 'failure', 'fairness',
    'familiar', 'family', 'farther', 'fastened', 'feasibility', 'federal',
    'feedback', 'fence', 'festival', 'fiber', 'fiction', 'fight', 'figure',
    'filter', 'final', 'finance', 'financial', 'finding', 'finger', 'finish',
    'finite', 'fiscal', 'fitness', 'fitting', 'fixed', 'flag', 'flame',
    'flash', 'flat', 'flavor', 'flesh', 'flight', 'float', 'flock', 'floor',
    'flower', 'fluid', 'flush', 'flux', 'focus', 'fog', 'foil', 'fold',
    'folk', 'follow', 'font', 'food', 'foot', 'force', 'forecast', 'foreign',
    'forest', 'forever', 'forge', 'forget', 'fork', 'form', 'formal', 'format',
    'former', 'formula', 'fort', 'forth', 'fortune', 'forward', 'fossil',
    'foster', 'fought', 'found', 'foundation', 'four', 'fourth', 'frame', 'franchise',
    'frank', 'fraud', 'free', 'freedom', 'freeze', 'freight', 'frequency',
    'frequent', 'fresh', 'friction', 'friend', 'frighten', 'fringe', 'front',
    'frost', 'fruit', 'fuel', 'full', 'fund', 'function', 'fundamental', 'funds',
    'funeral', 'funny', 'furnace', 'furnish', 'future', 'gain', 'gallery',
    'game', 'gang', 'gap', 'garage', 'garden', 'garlic', 'gas', 'gate',
    'gather', 'gauge', 'gaze', 'gear', 'gender', 'gene', 'general', 'generate',
    'generation', 'generic', 'generous', 'genetic', 'genre', 'gentle', 'gently',
    'genuine', 'geographic', 'geometry', 'gesture', 'ghost', 'giant', 'gift',
    'gigantic', 'girl', 'given', 'glance', 'glare', 'glass', 'globe', 'glory',
    'glove', 'glow', 'glue', 'goal', 'goat', 'gold', 'golden', 'golf',
    'gone', 'good', 'goose', 'gorgeous', 'gossip', 'govern', 'government', 'governor',
    'grab', 'grace', 'grade', 'grain', 'grammar', 'grand', 'grant', 'grape',
    'graph', 'grasp', 'grass', 'grave', 'gravity', 'gray', 'great', 'greedy',
    'green', 'greet', 'grief', 'grill', 'grim', 'grin', 'grind', 'grip',
    'groan', 'grocery', 'ground', 'group', 'grow', 'growl', 'grown', 'growth',
    'guarantee', 'guard', 'guess', 'guest', 'guide', 'guild', 'guilt', 'guilty',
    'guitar', 'gulf', 'gun', 'gust', 'gut', 'guy', 'gym', 'habit',
    'hail', 'hair', 'half', 'hall', 'hand', 'handle', 'handsome', 'hang',
    'happen', 'happy', 'harass', 'harbor', 'hard', 'hardly', 'hardware', 'harm',
    'harmony', 'harp', 'harsh', 'harvest', 'hat', 'hatch', 'hate', 'haul',
    'have', 'haven', 'havoc', 'hawk', 'hazard', 'haze', 'head', 'heal',
    'health', 'healthy', 'heap', 'hear', 'heard', 'heart', 'heat', 'heaven',
    'heavy', 'hedge', 'heel', 'height', 'heir', 'helicopter', 'hell', 'hello',
    'helmet', 'help', 'helpful', 'hemp', 'hen', 'hence', 'herb', 'herd',
    'here', 'hero', 'high', 'hill', 'hint', 'hip', 'hire', 'history',
    'hitch', 'hoard', 'hobby', 'hockey', 'hold', 'hole', 'holiday', 'hollow',
    'holy', 'home', 'honest', 'honey', 'honor', 'hood', 'hoof', 'hook',
    'hope', 'horn', 'horror', 'horse', 'hose', 'host', 'hot', 'hotel',
    'hound', 'hour', 'house', 'hover', 'how', 'howl', 'huge', 'human',
    'humble', 'humid', 'humor', 'hundred', 'hungry', 'hunt', 'hunter', 'hurry',
    'hurt', 'husband', 'hut', 'hybrid', 'hydrogen', 'ice', 'idea', 'ideal',
    'identical', 'identify', 'idiom', 'idle', 'idiot', 'ignite', 'ignore', 'ill',
    'illegal', 'illness', 'illustrate', 'image', 'imaginary', 'imagination', 'imagine',
    'imitate', 'immense', 'immerse', 'immigrant', 'immune', 'impact', 'implement',
    'implication', 'implied', 'import', 'important', 'impose', 'impossible', 'impress',
    'impression', 'impressive', 'imprison', 'improve', 'impulse', 'in', 'incentive',
    'incident', 'inclined', 'include', 'income', 'increase', 'indeed', 'independent',
    'index', 'indicate', 'indifferent', 'indirect', 'indoor', 'induce', 'industry',
    'infant', 'infect', 'infer', 'infinite', 'influence', 'inform', 'informal',
    'information', 'informed', 'infrared', 'infrastructure', 'ingredient', 'inhabit',
    'inhale', 'inherit', 'initial', 'inject', 'injure', 'injury', 'inmate',
    'inner', 'innocent', 'innovation', 'innovative', 'inquiry', 'insane', 'insect',
    'insert', 'inside', 'insight', 'insist', 'inspect', 'inspection', 'inspire',
    'install', 'instance', 'instant', 'instead', 'instinct', 'institute', 'institution',
    'instruct', 'instruction', 'instructor', 'instrument', 'insult', 'insurance',
    'insure', 'intact', 'intake', 'integral', 'integrate', 'integrity', 'intellect',
    'intellectual', 'intelligence', 'intelligent', 'intend', 'intense', 'intent',
    'interact', 'interest', 'interested', 'interface', 'interfere', 'interior',
    'internal', 'international', 'internet', 'interpret', 'interrupt', 'interval',
    'intervene', 'interview', 'intimate', 'into', 'intricate', 'introduce', 'introduction',
    'invade', 'invalid', 'invaluable', 'invasion', 'invent', 'invention', 'invest',
    'investigate', 'investment', 'invite', 'involve', 'involved', 'iron', 'irony',
    'island', 'isolate', 'issue', 'it', 'item', 'itself', 'ivory', 'jacket',
    'jail', 'jam', 'jar', 'jaw', 'jazz', 'jealous', 'jeans', 'jeep',
    'jelly', 'jersey', 'jet', 'jewel', 'job', 'join', 'joint', 'joke',
    'journal', 'journalist', 'journey', 'joy', 'judge', 'judgment', 'juice',
    'jump', 'junction', 'jungle', 'junior', 'junk', 'jury', 'just', 'justice',
    'justify', 'keen', 'keep', 'key', 'kick', 'kid', 'kidney', 'kill',
    'killer', 'kilogram', 'kilometer', 'kilo', 'kind', 'king', 'kingdom', 'kiss',
    'kit', 'kitchen', 'kite', 'knee', 'kneel', 'knife', 'knock', 'knot',
    'know', 'knowledge', 'lab', 'label', 'labor', 'laboratory', 'lace', 'lack',
    'ladder', 'lady', 'lake', 'lamb', 'lamp', 'land', 'landlord', 'lane',
    'language', 'lantern', 'lap', 'large', 'laser', 'last', 'late', 'lately',
    'later', 'latin', 'laugh', 'launch', 'law', 'lawn', 'lawyer', 'lay',
    'layer', 'lazy', 'lead', 'leader', 'leadership', 'leaf', 'league', 'leak',
    'lean', 'leap', 'learn', 'lease', 'least', 'leave', 'lecture', 'left',
    'leg', 'legacy', 'legal', 'legend', 'leisure', 'lemon', 'lend', 'length',
    'lens', 'less', 'lesson', 'let', 'letter', 'level', 'lever', 'liability',
    'liable', 'liberal', 'library', 'license', 'lick', 'lid', 'lie', 'life',
    'lift', 'light', 'like', 'likely', 'limb', 'lime', 'limit', 'line',
    'linen', 'link', 'lion', 'lip', 'list', 'listen', 'literally', 'literary',
    'literature', 'little', 'live', 'lively', 'load', 'loaf', 'loan', 'lobby',
    'local', 'locate', 'location', 'lock', 'lodge', 'log', 'logic', 'logical',
    'lonely', 'long', 'look', 'loop', 'loose', 'lose', 'loss', 'lost',
    'lot', 'loud', 'lounge', 'love', 'lovely', 'lover', 'low', 'lower',
    'loyal', 'loyalty', 'luck', 'lucky', 'lumber', 'lump', 'lunch', 'lung',
    'luxury', 'machine', 'machinery', 'mad', 'madam', 'magazine', 'magic', 'magnet',
    'magnetic', 'magnificent', 'magnitude', 'maid', 'mail', 'main', 'mainly', 'maintain',
    'maintenance', 'major', 'majority', 'make', 'maker', 'male', 'mall', 'man',
    'manage', 'management', 'manager', 'mandate', 'maneuver', 'manifest', 'manipulate',
    'mankind', 'manner', 'manual', 'manufacture', 'manufacturer', 'manufacturing',
    'many', 'map', 'maple', 'marble', 'march', 'margin', 'marine', 'mark',
    'market', 'marketing', 'marriage', 'marry', 'mask', 'mass', 'massive', 'master',
    'match', 'mate', 'material', 'math', 'matrix', 'matter', 'mature', 'maximize',
    'maximum', 'maybe', 'mayor', 'meal', 'mean', 'meaning', 'meanwhile', 'measure',
    'measurement', 'meat', 'mechanic', 'mechanical', 'mechanics', 'mechanism', 'medal',
    'media', 'medicine', 'medieval', 'medium', 'meet', 'melody', 'melt', 'member',
    'membership', 'memo', 'memory', 'mental', 'mention', 'menu', 'merchandise', 'merchant',
    'mercy', 'mere', 'merge', 'merger', 'merit', 'merry', 'mess', 'message',
    'messenger', 'metal', 'meter', 'method', 'metric', 'microphone', 'microscope',
    'midst', 'might', 'mighty', 'migrant', 'migrate', 'migration', 'mild', 'mile',
    'military', 'milk', 'mill', 'million', 'mimic', 'mind', 'mine', 'miner',
    'mineral', 'minimal', 'minimize', 'minimum', 'mining', 'minister', 'ministry',
    'minor', 'minority', 'minus', 'minute', 'miracle', 'mirror', 'misery', 'miss',
    'missile', 'missing', 'mission', 'missionary', 'mist', 'mistake', 'mister',
    'mix', 'mixture', 'mobile', 'mode', 'model', 'moderate', 'modern', 'modest',
    'modify', 'module', 'moisture', 'mold', 'molecule', 'moment', 'momentum', 'money',
    'monitor', 'monk', 'monkey', 'monopoly', 'monster', 'month', 'monthly', 'mood',
    'moon', 'moral', 'more', 'moreover', 'morning', 'mortal', 'mortgage', 'mosaic',
    'most', 'mostly', 'mother', 'motion', 'motivate', 'motivation', 'motive', 'motor',
    'mount', 'mountain', 'mountainous', 'mouse', 'mouth', 'move', 'movement', 'movie',
    'much', 'mud', 'multiple', 'multiply', 'municipal', 'murder', 'muscle', 'museum',
    'mushroom', 'music', 'musical', 'musician', 'must', 'mutual', 'myself', 'mystery',
    'myth', 'nail', 'name', 'narrative', 'narrow', 'nasty', 'nation', 'national',
    'native', 'natural', 'nature', 'naval', 'navy', 'near', 'nearby', 'nearly',
    'neat', 'necessarily', 'necessary', 'necessity', 'neck', 'need', 'needle',
    'negative', 'neglect', 'negotiate', 'negotiation', 'neighbor', 'neighborhood',
    'neither', 'nephew', 'nerve', 'nervous', 'nest', 'net', 'network', 'neutral',
    'never', 'nevertheless', 'new', 'news', 'newspaper', 'next', 'nice', 'night',
    'nine', 'noble', 'nobody', 'nod', 'noise', 'noisy', 'none', 'nonetheless',
    'nor', 'norm', 'normal', 'normally', 'north', 'northern', 'nose', 'not',
    'note', 'nothing', 'notice', 'notify', 'notion', 'noun', 'novel', 'november',
    'now', 'nowhere', 'nuclear', 'number', 'numerous', 'nurse', 'nut', 'object',
    'objection', 'objective', 'obligation', 'oblige', 'obscure', 'observation', 'observe',
    'observer', 'obsess', 'obstacle', 'obstruct', 'obtain', 'obvious', 'occasion',
    'occasional', 'occupation', 'occupy', 'occur', 'occurrence', 'ocean', 'october',
    'odd', 'odds', 'odor', 'of', 'off', 'offend', 'offense', 'offer',
    'office', 'officer', 'official', 'offset', 'often', 'oil', 'okay', 'old',
    'olive', 'omit', 'once', 'one', 'ongoing', 'onion', 'only', 'onto',
    'open', 'opening', 'operate', 'operation', 'operational', 'operator', 'opinion',
    'opponent', 'opportunity', 'oppose', 'opposite', 'opposition', 'opt', 'optimism',
    'optimistic', 'option', 'optional', 'or', 'oral', 'orange', 'orbit', 'order',
    'ordinary', 'organ', 'organic', 'organism', 'organization', 'organize', 'oriented',
    'origin', 'original', 'originate', 'ornament', 'other', 'others', 'otherwise',
    'ought', 'ounce', 'our', 'ours', 'ourselves', 'out', 'outcome', 'outdoor',
    'outer', 'outfit', 'outlet', 'outlook', 'output', 'outside', 'outsider', 'oval',
    'oven', 'over', 'overall', 'overcome', 'overhead', 'overlap', 'overlook',
    'overnight', 'override', 'overseas', 'overtake', 'owe', 'owl', 'own', 'owner',
    'oxide', 'oxygen', 'pace', 'pack', 'package', 'packet', 'page', 'pain',
    'painful', 'paint', 'painter', 'painting', 'pair', 'palace', 'pale', 'palm',
    'pan', 'panel', 'panic', 'pant', 'paper', 'parade', 'paragraph', 'parallel',
    'parameter', 'parent', 'parish', 'park', 'parking', 'parliament', 'part',
    'partial', 'participate', 'particle', 'particular', 'partner', 'partnership',
    'party', 'pass', 'passage', 'passenger', 'passion', 'passive', 'passport',
    'past', 'paste', 'pat', 'patch', 'path', 'patience', 'patient', 'pattern',
    'pause', 'pay', 'payment', 'peace', 'peak', 'pear', 'pedestrian', 'peer',
    'pen', 'penalty', 'pencil', 'people', 'pepper', 'per', 'perceive', 'percent',
    'percentage', 'perception', 'perfect', 'perform', 'performance', 'perhaps',
    'period', 'perish', 'permit', 'persist', 'person', 'personal', 'personnel',
    'perspective', 'persuade', 'pervasive', 'pet', 'phase', 'phenomenon', 'philosophy',
    'phone', 'photo', 'photograph', 'phrase', 'physical', 'physically', 'physics',
    'piano', 'pick', 'picture', 'piece', 'pier', 'pile', 'pill', 'pilot',
    'pin', 'pine', 'pink', 'pipe', 'pitch', 'place', 'plain', 'plan',
    'plane', 'planet', 'planning', 'plant', 'plastic', 'plate', 'platform', 'play',
    'player', 'please', 'pleasure', 'pledge', 'plenty', 'plot', 'plow', 'plug',
    'plunge', 'plural', 'plus', 'pocket', 'poem', 'poet', 'poetry', 'point',
    'pole', 'police', 'policy', 'polish', 'polite', 'political', 'politics',
    'poll', 'pollution', 'pool', 'poor', 'pop', 'popular', 'population', 'porch',
    'port', 'portion', 'portray', 'pose', 'position', 'positive', 'possess', 'possible',
    'possibly', 'post', 'postpone', 'pot', 'potato', 'potential', 'potentially',
    'pound', 'pour', 'poverty', 'powder', 'power', 'powerful', 'practical', 'practice',
    'praise', 'pray', 'prayer', 'predict', 'prefer', 'preference', 'pregnant',
    'premise', 'prepare', 'preparation', 'presence', 'present', 'presentation',
    'preserve', 'pressure', 'presume', 'pretend', 'pretty', 'prevail', 'prevent',
    'previous', 'price', 'pride', 'priest', 'primary', 'prime', 'primitive',
    'prince', 'princess', 'principal', 'principle', 'print', 'prior', 'priority',
    'prison', 'private', 'privilege', 'prize', 'probability', 'probably', 'problem',
    'procedure', 'proceed', 'process', 'produce', 'producer', 'product', 'production',
    'profession', 'professional', 'professor', 'profile', 'profit', 'program',
    'progress', 'project', 'promise', 'promote', 'prompt', 'proof', 'proper', 'property',
    'proposal', 'propose', 'proposed', 'prospect', 'prosper', 'protect', 'protection',
    'protein', 'protest', 'proud', 'prove', 'provide', 'provider', 'province',
    'provision', 'psychology', 'public', 'publish', 'publisher', 'pull', 'pulse',
    'pump', 'punch', 'punish', 'pupil', 'purchase', 'pure', 'purple', 'purpose',
    'pursue', 'push', 'put', 'puzzle', 'qualify', 'quality', 'quantity', 'quarter',
    'queen', 'quest', 'question', 'quick', 'quiet', 'quite', 'quote', 'rabbit',
    'race', 'racial', 'racing', 'radar', 'radio', 'rag', 'raid', 'rail',
    'rain', 'raise', 'rally', 'ramp', 'range', 'rank', 'rapid', 'rare',
    'rarely', 'rat', 'rate', 'ratio', 'rational', 'raw', 'reach', 'react',
    'reaction', 'read', 'reader', 'reading', 'ready', 'real', 'realistic', 'reality',
    'realize', 'really', 'realm', 'rear', 'reason', 'reasonable', 'reasoning',
    'rebel', 'rebuild', 'receipt', 'receive', 'received', 'recent', 'recently',
    'reception', 'recession', 'recipe', 'reckon', 'recognize', 'recommend', 'recommendation',
    'record', 'recorder', 'recover', 'recovery', 'recruit', 'red', 'reduce',
    'reduction', 'refer', 'reference', 'reflect', 'reflection', 'reform', 'refuse',
    'regard', 'regarding', 'regardless', 'regime', 'region', 'regional', 'register',
    'regular', 'regulate', 'regulation', 'reinforce', 'reject', 'relate', 'related',
    'relation', 'relationship', 'relative', 'relatively', 'relax', 'relay', 'release',
    'relevant', 'reliability', 'reliable', 'relief', 'relieve', 'religion', 'religious',
    'reluctant', 'rely', 'remain', 'remainder', 'remaining', 'remark', 'remarkable',
    'remedy', 'remember', 'remind', 'remote', 'remove', 'render', 'renew', 'rent',
    'repair', 'repeat', 'replace', 'replacement', 'reply', 'report', 'reporter',
    'represent', 'representation', 'representative', 'reproduce', 'republic', 'request',
    'require', 'requirement', 'rescue', 'research', 'researcher', 'resemble', 'reservation',
    'reserve', 'residence', 'resident', 'resign', 'resist', 'resistance', 'resolution',
    'resolve', 'resort', 'resource', 'respect', 'respond', 'response', 'responsibility',
    'responsible', 'rest', 'restaurant', 'restore', 'restrict', 'restriction', 'result',
    'retain', 'retire', 'retirement', 'retreat', 'return', 'reveal', 'revelation',
    'revenue', 'reverse', 'review', 'revise', 'revision', 'revive', 'revolt',
    'revolution', 'reward', 'rhythm', 'rib', 'rice', 'rich', 'rid', 'ride',
    'rider', 'ridge', 'rifle', 'right', 'rigid', 'ring', 'riot', 'rip',
    'rise', 'risk', 'ritual', 'rival', 'river', 'road', 'roar', 'roast',
    'rob', 'robot', 'rock', 'rocket', 'rod', 'role', 'roll', 'roman', 'romantic',
    'roof', 'room', 'root', 'rope', 'rose', 'rough', 'roughly', 'round',
    'route', 'routine', 'row', 'royal', 'rub', 'rubber', 'rubbish', 'rude',
    'rug', 'rule', 'ruler', 'run', 'runner', 'rural', 'rush', 'sack',
    'sad', 'safe', 'safety', 'sail', 'sailor', 'saint', 'salad', 'salary',
    'sale', 'sales', 'salt', 'same', 'sample', 'sand', 'sandwich', 'satellite',
    'satisfaction', 'satisfy', 'sauce', 'save', 'say', 'scale', 'scan', 'scandal',
    'scare', 'scatter', 'scenario', 'scene', 'schedule', 'scheme', 'scholar',
    'scholarship', 'school', 'science', 'scientific', 'scientist', 'scope',
    'score', 'scratch', 'scream', 'screen', 'script', 'scrutiny', 'sea', 'seal',
    'search', 'season', 'seat', 'second', 'secondary', 'secret', 'secretary',
    'section', 'sector', 'secure', 'security', 'see', 'seed', 'seek', 'seem',
    'segment', 'seize', 'seldom', 'select', 'selection', 'self', 'sell', 'seller',
    'semester', 'semi', 'senate', 'senator', 'send', 'senior', 'sense', 'sensible',
    'sensitive', 'sentence', 'separate', 'sequence', 'series', 'serious', 'servant',
    'serve', 'service', 'session', 'set', 'settle', 'settlement', 'seven', 'several',
    'severe', 'sex', 'sexual', 'shade', 'shadow', 'shake', 'shall', 'shame',
    'shape', 'share', 'sharp', 'she', 'sheep', 'sheet', 'shelf', 'shell',
    'shelter', 'shift', 'shine', 'ship', 'shirt', 'shock', 'shoe', 'shoot',
    'shop', 'shopping', 'shore', 'short', 'shortage', 'shot', 'should', 'shoulder',
    'shout', 'show', 'shower', 'shrink', 'shut', 'sick', 'side', 'sigh',
    'sight', 'sign', 'signal', 'significance', 'significant', 'silence', 'silent',
    'silk', 'silly', 'silver', 'similar', 'similarity', 'simple', 'simplicity',
    'simplify', 'since', 'sing', 'singer', 'single', 'sink', 'sir', 'sister',
    'sit', 'site', 'situation', 'six', 'size', 'skill', 'skin', 'skirt',
    'sky', 'slave', 'sleep', 'slice', 'slide', 'slight', 'slip', 'slow',
    'slowly', 'small', 'smart', 'smell', 'smile', 'smoke', 'smooth', 'snake',
    'snow', 'so', 'soak', 'soap', 'soar', 'soccer', 'social', 'society',
    'soft', 'software', 'soil', 'solar', 'sold', 'soldier', 'sole', 'solid',
    'solution', 'solve', 'some', 'somebody', 'somehow', 'someone', 'something',
    'sometimes', 'somewhat', 'somewhere', 'son', 'song', 'soon', 'sophisticated',
    'sorry', 'sort', 'soul', 'sound', 'soup', 'source', 'south', 'southern',
    'space', 'spade', 'span', 'spare', 'speak', 'speaker', 'special', 'specialist',
    'species', 'specific', 'specifically', 'specify', 'specimen', 'spectacular',
    'speech', 'speed', 'spell', 'spend', 'spending', 'sphere', 'spill', 'spin',
    'spirit', 'spiritual', 'split', 'spoil', 'spokesman', 'sport', 'spot',
    'spread', 'spring', 'square', 'stability', 'stable', 'stack', 'staff', 'stage',
    'stain', 'stair', 'stake', 'stamp', 'stand', 'standard', 'standing', 'star',
    'stare', 'start', 'state', 'statement', 'station', 'statistic', 'statistical',
    'statistics', 'status', 'stay', 'steady', 'steak', 'steal', 'steam', 'steel',
    'steep', 'steer', 'stem', 'step', 'stick', 'still', 'stimulate', 'stimulus',
    'stir', 'stock', 'stomach', 'stone', 'stop', 'storage', 'store', 'storm',
    'story', 'straight', 'strain', 'strange', 'strategy', 'straw', 'stream',
    'street', 'strength', 'strengthen', 'stress', 'stretch', 'strict', 'strike',
    'string', 'strip', 'stroke', 'strong', 'structurally', 'structure', 'struggle',
    'student', 'studio', 'study', 'stuff', 'stupid', 'style', 'subject', 'submit',
    'subsequent', 'substance', 'substantial', 'substitute', 'subtle', 'subtract',
    'suburb', 'suburban', 'subway', 'succeed', 'success', 'successful', 'succession',
    'such', 'sudden', 'suddenly', 'suffer', 'sufficient', 'sugar', 'suggest',
    'suggestion', 'suicide', 'suit', 'summer', 'summit', 'sun', 'super', 'superb',
    'superior', 'supermarket', 'supervise', 'supper', 'supplement', 'supply',
    'support', 'supporter', 'suppose', 'supposed', 'suppress', 'supreme', 'sure',
    'surely', 'surface', 'surgery', 'surplus', 'surprise', 'surprised', 'surprising',
    'surprisingly', 'surrender', 'surround', 'survey', 'survival', 'survive',
    'survivor', 'suspect', 'suspend', 'suspension', 'suspicion', 'sustain',
    'swear', 'sweep', 'sweet', 'swim', 'swing', 'switch', 'symbol', 'sympathy',
    'symptom', 'syndrome', 'system', 'systematic', 'table', 'tablespoon', 'tactic',
    'tag', 'tail', 'take', 'tale', 'talent', 'talk', 'tall', 'tank',
    'tap', 'tape', 'target', 'task', 'taste', 'tax', 'taxpayer', 'tea',
    'teach', 'teacher', 'teaching', 'team', 'tear', 'teaspoon', 'technical',
    'technique', 'technology', 'teen', 'teenager', 'television', 'tell', 'temperature',
    'temporary', 'tempt', 'ten', 'tend', 'tendency', 'tender', 'tennis', 'tension',
    'tent', 'term', 'terminal', 'terminate', 'terrible', 'territory', 'terror',
    'terrorism', 'terrorist', 'test', 'testify', 'testimony', 'testing', 'text',
    'than', 'thank', 'thanks', 'that', 'the', 'theater', 'their', 'them',
    'theme', 'themselves', 'then', 'theory', 'therapy', 'there', 'therefore',
    'thermometer', 'these', 'they', 'thick', 'thin', 'thing', 'think', 'third',
    'thirty', 'this', 'those', 'though', 'thought', 'thousand', 'threat',
    'threaten', 'three', 'throat', 'through', 'throughout', 'throw', 'thus',
    'ticket', 'tide', 'tie', 'tight', 'time', 'timetable', 'tin', 'tiny',
    'tip', 'tired', 'tissue', 'title', 'to', 'toast', 'today', 'toe',
    'together', 'toilet', 'tolerance', 'tolerate', 'toll', 'tomato', 'tomorrow',
    'ton', 'tone', 'tongue', 'tonight', 'too', 'tool', 'tooth', 'top',
    'topic', 'toss', 'total', 'totally', 'touch', 'tough', 'tour', 'tourist',
    'tournament', 'toward', 'towards', 'tower', 'town', 'toy', 'trace', 'track',
    'tractor', 'trade', 'tradition', 'traditional', 'traffic', 'tragedy', 'trail',
    'train', 'trainer', 'training', 'transaction', 'transfer', 'transform', 'transformation',
    'transition', 'translate', 'translation', 'transmission', 'transmit', 'transport',
    'transportation', 'trap', 'trash', 'travel', 'traveler', 'treat', 'treatment',
    'treaty', 'tree', 'tremendous', 'trend', 'trial', 'triangle', 'tribe',
    'tribunal', 'trick', 'trip', 'troop', 'trophy', 'trouble', 'truck', 'true',
    'truly', 'trust', 'truth', 'try', 'tube', 'tunnel', 'turn', 'tv',
    'twelve', 'twenty', 'twice', 'twin', 'twist', 'two', 'type', 'typical',
    'typically', 'ugly', 'ultimate', 'ultimately', 'umbrella', 'unable', 'uncertain',
    'uncle', 'uncomfortable', 'unconscious', 'under', 'undergo', 'understand',
    'understanding', 'undertake', 'undo', 'unemployment', 'unexpected', 'unfair',
    'unfit', 'unfold', 'unhappy', 'uniform', 'unify', 'union', 'unique', 'unit',
    'unite', 'unity', 'universal', 'universe', 'university', 'unknown', 'unless',
    'unlike', 'unlikely', 'until', 'unusual', 'up', 'upon', 'upper', 'urban',
    'urge', 'urgent', 'us', 'usage', 'use', 'used', 'useful', 'useless',
    'user', 'usual', 'usually', 'utility', 'utilize', 'vacant', 'vacation',
    'vacuum', 'vague', 'valid', 'valley', 'valuable', 'value', 'van', 'vanish',
    'variety', 'various', 'vary', 'vast', 'vegetable', 'vehicle', 'venture',
    'version', 'vertical', 'very', 'vessel', 'veteran', 'via', 'victim', 'victory',
    'video', 'view', 'viewer', 'village', 'violent', 'virtual', 'virtually',
    'virus', 'visible', 'vision', 'visit', 'visitor', 'visual', 'vital', 'voice',
    'volume', 'voluntary', 'volunteer', 'vote', 'voter', 'voyage', 'wage',
    'wait', 'waiter', 'wake', 'walk', 'wall', 'wander', 'want', 'war',
    'warm', 'warn', 'warning', 'wash', 'waste', 'watch', 'water', 'wave',
    'way', 'weak', 'wealth', 'wealthy', 'weapon', 'wear', 'weather', 'weave',
    'web', 'wedding', 'week', 'weekend', 'weekly', 'weigh', 'weight', 'welcome',
    'welfare', 'well', 'west', 'western', 'wet', 'what', 'whatever', 'wheel',
    'when', 'whenever', 'where', 'whereas', 'whether', 'which', 'while', 'whisper',
    'white', 'who', 'whole', 'wholly', 'whom', 'whose', 'why', 'wicked',
    'wide', 'widely', 'widespread', 'widow', 'wife', 'wild', 'will', 'willing',
    'win', 'wind', 'window', 'wine', 'wing', 'winner', 'winter', 'wire',
    'wisdom', 'wise', 'wish', 'with', 'withdraw', 'within', 'without', 'witness',
    'wolf', 'woman', 'wonder', 'wonderful', 'wood', 'wooden', 'wool', 'word',
    'work', 'worker', 'working', 'workshop', 'world', 'worldwide', 'worried',
    'worry', 'worse', 'worst', 'worth', 'worthwhile', 'would', 'wound', 'wrap',
    'write', 'writer', 'writing', 'wrong', 'yard', 'yeah', 'year', 'yell',
    'yellow', 'yes', 'yesterday', 'yet', 'yield', 'you', 'young', 'your',
    'yours', 'yourself', 'youth', 'zebra', 'zero', 'zone', 'zoo',
  ],
  simplifications: {
    'utilize': ['use', 'apply', 'employ'],
    'demonstrate': ['show', 'prove', 'reveal'],
    'facilitate': ['help', 'ease', 'aid'],
    'consequently': ['so', 'thus', 'therefore'],
    'approximately': ['about', 'around', 'roughly'],
    'implement': ['start', 'do', 'carry out'],
    'methodology': ['method', 'approach', 'way'],
    'functionality': ['function', 'feature', 'role'],
    'optimize': ['improve', 'fix', 'enhance'],
    'furthermore': ['also', 'plus', 'besides'],
    'nevertheless': ['still', 'yet', 'however'],
    'subsequently': ['then', 'later', 'next'],
    'commence': ['start', 'begin'],
    'terminate': ['end', 'stop'],
    'exhibit': ['show'],
    'indicate': ['show', 'point out'],
    'initiate': ['start', 'launch'],
    'constitutes': ['is', 'forms'],
    'expedite': ['speed up', 'hasten'],
    'ameliorate': ['improve', 'fix'],
    'acquisition': ['get', 'buy', 'gain'],
    'advancement': ['progress', 'rise'],
    'beneficial': ['good', 'helpful'],
    'capabilities': ['skills', 'abilities'],
    'capacity': ['room', 'space', 'ability'],
    'cognizant': ['aware', 'knowing'],
    'commencement': ['start', 'start time'],
    'component': ['part', 'piece'],
    'constitute': ['make up', 'form', 'is'],
    'contemporary': ['modern', 'current'],
    'determine': ['find', 'decide', 'figure out'],
    'discontinue': ['stop', 'end', 'quit'],
    'elucidate': ['explain', 'clear up'],
    'encounter': ['meet', 'run into', 'find'],
    'endeavor': ['try', 'attempt'],
    'enumerate': ['list', 'count'],
    'equivalent': ['equal', 'same'],
    'establish': ['set up', 'start', 'prove'],
    'feasible': ['doable', 'possible'],
    'finalize': ['finish', 'complete', 'wrap up'],
    'formulate': ['create', 'make', 'plan'],
    'generate': ['make', 'create', 'produce'],
    'highlight': ['point out', 'stress', 'emphasize'],
    'identify': ['find', 'name', 'spot'],
    'illustrate': ['show', 'draw', 'explain'],
    'locate': ['find', 'spot', 'place'],
    'magnitude': ['size', 'amount', 'scale'],
    'modification': ['change', 'adjustment'],
    'necessitate': ['require', 'need', 'force'],
    'nonetheless': ['still', 'even so'],
    'objective': ['goal', 'aim', 'purpose'],
    'obtain': ['get', 'acquire', 'receive'],
    'operate': ['run', 'work', 'use'],
    'orientation': ['introduction', 'training', 'direction'],
    'participate': ['join', 'take part'],
    'pertaining': ['about', 'related to'],
    'possess': ['have', 'own', 'hold'],
    'preclude': ['prevent', 'stop', 'rule out'],
    'preliminary': ['initial', 'early', 'first'],
    'prerequisite': ['requirement', 'condition', 'need'],
    'proceed': ['go', 'continue', 'move forward'],
    'process': ['way', 'method', 'system'],
    'proficiency': ['skill', 'expertise', 'ability'],
    'project': ['plan', 'task', 'forecast'],
    'promulgate': ['announce', 'spread', 'declare'],
    'propensity': ['tendency', 'likeliness', 'habit'],
    'provide': ['give', 'supply', 'offer'],
    'purchase': ['buy', 'get'],
    'requirement': ['need', 'necessity', 'demand'],
    'retain': ['keep', 'hold', 'save'],
    'scenario': ['situation', 'case', 'scene'],
    'scope': ['range', 'reach', 'extent'],
    'sequence': ['order', 'series', 'chain'],
    'significant': ['important', 'big', 'major'],
    'similar': ['alike', 'like', 'resembling'],
    'solicit': ['ask for', 'request', 'seek'],
    'specification': ['detail', 'requirement', 'spec'],
    'strategic': ['planned', 'key', 'major'],
    'substitute': ['replace', 'swap', 'alternative'],
    'succession': ['series', 'order', 'sequence'],
    'sufficient': ['enough', 'ample', 'plenty'],
    'transmit': ['send', 'pass', 'communicate'],
    'utilization': ['use', 'usage'],
    'validate': ['check', 'confirm', 'prove'],
    'verify': ['check', 'confirm', 'make sure'],
    'via': ['by', 'through', 'using'],
    'viable': ['possible', 'doable', 'workable'],
    'visualize': ['imagine', 'see', 'picture'],
    'warrant': ['justify', 'guarantee', 'reason for'],
    'abbreviated': ['shortened'],
    'accommodate': ['fit', 'hold', 'house'],
    'acknowledged': ['admitted', 'recognized'],
    'accordingly': ['so'],
    'accurate': ['correct', 'right', 'precise'],
    'achievement': ['success', 'accomplishment'],
    'acquired': ['got', 'bought', 'gained'],
    'additional': ['extra', 'more', 'added'],
    'addressed': ['handled', 'dealt with'],
    'adequately': ['enough', 'well'],
    'adjusted': ['changed', 'fixed'],
    'administrative': ['managing'],
    'advocate': ['support', 'back'],
    'aggregated': ['combined', 'total'],
    'alternative': ['choice', 'option'],
    'amendment': ['change', 'fix'],
    'announced': ['stated', 'said'],
    'apparent': ['clear', 'obvious'],
    'applicable': ['relevant', 'fitting'],
    'appointed': ['named', 'chosen'],
    'appropriate': ['right', 'fitting'],
    'arrangement': ['plan', 'setup'],
    'associated': ['linked', 'related'],
    'assistance': ['help', 'aid'],
    'assure': ['promise', 'guarantee'],
    'attempted': ['tried'],
    'attributed': ['credited', 'blamed'],
    'authorized': ['allowed', 'approved'],
    'calculated': ['figured', 'estimated'],
    'categorized': ['sorted', 'grouped'],
    'characteristic': ['typical', 'feature'],
    'clarified': ['cleared up', 'explained'],
    'collaborate': ['work together'],
    'combined': ['mixed', 'joined'],
    'commission': ['group', 'fee'],
    'committed': ['dedicated', 'promised'],
    'communicated': ['told', 'shared'],
    'completion': ['finishing', 'end'],
    'compliance': ['following', 'obeying'],
    'comprehend': ['understand'],
    'compute': ['calculate', 'figure'],
    'concentrate': ['focus'],
    'conclusion': ['end'],
    'concurrent': ['simultaneous', 'at same time'],
    'confirmation': ['proof', 'check'],
    'conflict': ['fight', 'disagreement'],
    'conservation': ['saving', 'protection'],
    'considerable': ['large', 'significant'],
    'consideration': ['thought'],
    'consistent': ['steady', 'unchanging'],
    'consolidated': ['combined', 'merged'],
    'construction': ['building'],
    'consumption': ['use', 'eating'],
    'continually': ['constantly', 'always'],
    'contractor': ['builder', 'worker'],
    'contribute': ['give', 'add'],
    'convenience': ['ease'],
    'convention': ['rule', 'standard'],
    'convergence': ['coming together'],
    'conversely': ['opposite'],
    'converted': ['changed'],
    'cooperation': ['working together'],
    'coordinate': ['organize', 'arrange'],
    'correction': ['fix'],
    'creation': ['making'],
    'critically': ['vitally', 'negatively'],
    'currently': ['now', 'right now'],
    'decisive': ['final', 'firm'],
    'dedicated': ['devoted'],
    'definition': ['meaning'],
    'denominator': ['bottom number'],
    'dependence': ['reliance'],
    'deployed': ['sent', 'placed'],
    'designated': ['chosen', 'named'],
    'desired': ['wanted'],
    'developed': ['made', 'grew'],
    'devices': ['tools', 'machines'],
    'determined': ['found', 'decided'],
    'devoted': ['loyal', 'dedicated'],
    'diagnostic': ['identifying'],
    'dimensions': ['measurements'],
    'differentiate': ['distinguish', 'tell apart'],
    'direction': ['way', 'path'],
    'directors': ['bosses', 'leaders'],
    'disadvantages': ['downsides', 'cons'],
    'disaster': ['catastrophe'],
    'discontinuity': ['break', 'gap'],
    'discovered': ['found'],
    'discrete': ['separate'],
    'discuss': ['talk about'],
    'discretion': ['choice', 'freedom'],
    'disintegration': ['breaking apart'],
    'dismissal': ['firing'],
    'displacement': ['moving'],
    'disregard': ['ignore'],
    'disseminate': ['spread'],
    'distinction': ['difference'],
    'divergence': ['split', 'difference'],
    'diversified': ['varied'],
    'diversion': ['distraction', 'detour'],
    'documentation': ['records', 'papers'],
    'dominance': ['power', 'control'],
    'doubtful': ['unsure'],
    'drastically': ['severely', 'harshly'],
    'duration': ['length', 'time'],
    'economics': ['money matters'],
    'educated': ['learned'],
    'efficiently': ['well', 'quickly'],
    'elaborate': ['detailed', 'complex'],
    'eligible': ['qualified'],
    'eliminate': ['remove', 'get rid of'],
    'embarrassment': ['shame'],
    'emerged': ['appeared', 'came out'],
    'emergency': ['crisis'],
    'emission': ['release', 'output'],
    'emphasis': ['stress', 'focus'],
    'employed': ['hired', 'used'],
    'encouraged': ['urged', 'supported'],
    'engage': ['involve', 'participate'],
    'enhancement': ['improvement'],
    'enormous': ['huge', 'giant'],
    'enrolled': ['signed up', 'joined'],
    'ensured': ['made sure'],
    'enthusiasm': ['excitement'],
    'entirely': ['completely'],
    'entrance': ['entry', 'door'],
    'envision': ['imagine'],
    'episode': ['event', 'scene'],
    'equated': ['compared', 'linked'],
    'estimated': ['guessed', 'calculated'],
    'evaluate': ['judge', 'check'],
    'exacerbate': ['worsen'],
    'exaggerated': ['overstated'],
    'examination': ['test', 'check'],
    'exceeded': ['went past', 'beat'],
    'exception': ['exclusion', 'oddity'],
    'excessive': ['too much', 'extreme'],
    'exchange': ['swap', 'trade'],
    'exclusion': ['leaving out'],
    'execute': ['do', 'carry out'],
    'exemplify': ['show', 'represent'],
    'exertion': ['effort', 'work'],
    'expansion': ['growth', 'spread'],
    'expectancy': ['hope', 'wait'],
    'expelled': ['kicked out'],
    'expenditure': ['spending', 'cost'],
    'explicitly': ['clearly', 'openly'],
    'exploitation': ['use', 'abuse'],
    'explosive': ['bomb', 'volatile'],
    'exposure': ['unveiling', 'contact'],
    'external': ['outside'],
    'extinction': ['dying out'],
    'facilities': ['amenities', 'buildings'],
    'faculty': ['teachers', 'staff'],
    'failure': ['flop', 'collapse'],
    'feasibility': ['possibility'],
    'feedback': ['response', 'comments'],
    'forecast': ['prediction'],
    'formal': ['official', 'proper'],
    'formula': ['recipe', 'method'],
    'foundation': ['base', 'start'],
    'frequency': ['rate', 'often'],
    'fundamental': ['basic', 'key'],
    'generated': ['created', 'made'],
    'genuine': ['real', 'authentic'],
    'guarantee': ['promise', 'assure'],
    'hazard': ['danger', 'risk'],
    'illustration': ['drawing', 'example'],
    'implication': ['suggestion', 'consequence'],
    'imposed': ['forced', 'applied'],
    'incentive': ['reward', 'motivation'],
    'incline': ['lean', 'tend'],
    'incorporate': ['include', 'mix in'],
    'independent': ['free', 'separate'],
    'individual': ['person'],
    'inference': ['conclusion'],
    'infrastructure': ['base', 'systems'],
    'inherited': ['got from family'],
    'initiative': ['plan', 'start'],
    'inquire': ['ask'],
    'insertion': ['addition'],
    'insight': ['understanding', 'clue'],
    'inspection': ['check', 'look-over'],
    'instance': ['example', 'case'],
    'institute': ['start', 'organization'],
    'institution': ['organization', 'establishment'],
    'instruction': ['direction', 'teaching'],
    'insurance': ['coverage', 'protection'],
    'intact': ['whole', 'unbroken'],
    'integration': ['mixing', 'joining'],
    'interaction': ['communication', 'action'],
    'interference': ['block', 'disturbance'],
    'interpretation': ['meaning', 'reading'],
    'intervention': ['involvement', 'action'],
    'intricate': ['complex', 'detailed'],
    'investment': ['spending', 'funding'],
    'irrelevant': ['unrelated'],
    'justification': ['reason', 'defense'],
    'justified': ['defended', 'proved'],
    'knowledgeable': ['smart', 'informed'],
    'launch': ['start', 'begin'],
    'liaison': ['link', 'contact'],
    'maintenance': ['upkeep', 'care'],
    'management': ['control', 'bosses'],
    'mandated': ['required', 'ordered'],
    'manipulate': ['control', 'handle'],
    'manufacture': ['make', 'build'],
    'marketing': ['advertising', 'selling'],
    'monitor': ['watch', 'check'],
    'narrative': ['story'],
    'negotiation': ['bargaining', 'talks'],
    'notified': ['told', 'informed'],
    'obligation': ['duty', 'requirement'],
    'occurrence': ['event', 'happening'],
    'operation': ['action', 'process'],
    'opportunity': ['chance'],
    'optimistic': ['hopeful'],
    'originality': ['creativity', 'newness'],
    'originated': ['started', 'began'],
    'perception': ['view', 'understanding'],
    'perform': ['do', 'carry out'],
    'permission': ['approval', 'consent'],
    'persistence': ['continuing', 'staying power'],
    'personnel': ['staff', 'workers'],
    'persuasion': ['influence'],
    'phase': ['stage', 'step'],
    'phenomenon': ['event', 'occurrence'],
    'plausible': ['believable', 'likely'],
    'potential': ['possible'],
    'precedence': ['priority'],
    'precise': ['exact'],
    'predominantly': ['mostly', 'mainly'],
    'presume': ['assume', 'suppose'],
    'prevalent': ['common', 'widespread'],
    'procedure': ['method', 'steps'],
    'procurement': ['buying', 'getting'],
    'productivity': ['output', 'efficiency'],
    'progression': ['progress', 'advance'],
    'prohibit': ['ban', 'forbid'],
    'prominent': ['famous', 'important'],
    'propel': ['push', 'drive'],
    'proportion': ['amount', 'share'],
    'proposed': ['suggested'],
    'prosecution': ['legal action'],
    'prospect': ['possibility', 'candidate'],
    'prosperity': ['wealth', 'success'],
    'protocol': ['rules', 'system'],
    'provision': ['supply', 'rule'],
    'psychology': ['mind study'],
    'publicize': ['announce', 'advertise'],
    'qualification': ['skill', 'cert'],
    'qualify': ['meet standards'],
    'quantity': ['amount'],
    'radiation': ['energy waves'],
    'randomly': ['by chance'],
    'rational': ['logical', 'sensible'],
    'reactivity': ['reaction'],
    'realistic': ['practical', 'real'],
    'reasonable': ['fair', 'sensible'],
    'received': ['got'],
    'recession': ['downturn'],
    'recognition': ['credit', 'fame'],
    'recommendation': ['advice', 'suggestion'],
    'reconsider': ['think again'],
    'recruit': ['hire'],
    'rectify': ['fix', 'correct'],
    'reduction': ['cut', 'lowering'],
    'redundant': ['extra', 'unnecessary'],
    'reference': ['mention', 'source'],
    'reflected': ['showed', 'mirrored'],
    'reform': ['change', 'improve'],
    'refused': ['said no', 'denied'],
    'regarding': ['about', 'on'],
    'regardless': ['despite'],
    'registered': ['signed up'],
    'reinforce': ['strengthen'],
    'rejected': ['turned down'],
    'related': ['connected'],
    'relaxation': ['rest', 'ease'],
    'relevance': ['importance', 'relation'],
    'reliability': ['trustworthiness'],
    'relief': ['ease', 'help'],
    'rely': ['depend', 'trust'],
    'remainder': ['rest', 'leftover'],
    'remedial': ['healing', 'fixing'],
    'reminder': ['note', 'hint'],
    'remote': ['far away'],
    'removal': ['taking away'],
    'renewal': ['extension', 'restart'],
    'replace': ['substitute', 'change'],
    'replicate': ['copy', 'duplicate'],
    'reporting': ['telling', 'writing'],
    'representative': ['agent', 'delegate'],
    'reproduce': ['copy', 'breed'],
    'reputation': ['name', 'standing'],
    'requested': ['asked for'],
    'rescue': ['save'],
    'resemble': ['look like'],
    'reservoir': ['store', 'tank'],
    'residence': ['home'],
    'resign': ['quit'],
    'resistance': ['opposition', 'fight'],
    'resolution': ['solution', 'decision'],
    'resolved': ['solved', 'fixed'],
    'respectively': ['in that order'],
    'responded': ['answered', 'reacted'],
    'restrict': ['limit', 'control'],
    'retirement': ['retiring'],
    'revenue': ['income', 'money'],
    'reverse': ['opposite', 'back'],
    'revised': ['changed', 'updated'],
    'revive': ['bring back', 'save'],
    'revolution': ['overthrow', 'big change'],
    'richness': ['wealth', 'depth'],
    'rigidity': ['stiffness', 'strictness'],
    'rotate': ['turn', 'spin'],
    'routine': ['standard', 'regular'],
    'safeguard': ['protect', 'defend'],
    'satisfaction': ['happiness', 'fulfillment'],
    'scarcity': ['lack', 'shortage'],
    'scatter': ['spread', 'throw'],
    'schedule': ['timetable', 'plan'],
    'scrutiny': ['close look', 'examination'],
    'security': ['safety', 'protection'],
    'selecting': ['choosing'],
    'sensation': ['feeling'],
    'sensitivity': ['reactivity', 'feeling'],
    'separated': ['apart', 'split'],
    'serious': ['bad', 'important'],
    'settlement': ['agreement', 'payment'],
    'severely': ['badly', 'harshly'],
    'shelter': ['housing', 'cover'],
    'shortage': ['lack'],
    'simplification': ['making easy'],
    'simulate': ['imitate', 'copy'],
    'situated': ['located', 'placed'],
    'sketch': ['draw', 'plan'],
    'solar': ['sun'],
    'solicited': ['asked for', 'sought'],
    'somewhat': ['a little', 'kind of'],
    'sophisticated': ['complex', 'advanced'],
    'specified': ['named', 'stated'],
    'specimen': ['sample', 'example'],
    'spectacular': ['amazing', 'impressive'],
    'speculation': ['guess', 'theory'],
    'spontaneous': ['unplanned', 'sudden'],
    'stability': ['steadiness', 'balance'],
    'standard': ['normal', 'rule'],
    'statistics': ['data', 'numbers'],
    'stimulate': ['encourage', 'cause'],
    'strategy': ['plan', 'approach'],
    'streamline': ['improve', 'smooth'],
    'strength': ['power', 'force'],
    'strictly': ['firmly', 'exactly'],
    'structure': ['form', 'build'],
    'submission': ['giving in', 'entry'],
    'subsequent': ['next', 'later'],
    'substance': ['material', 'stuff'],
    'substantial': ['big', 'real'],
    'successful': ['winning', 'working'],
    'sufficiently': ['enough'],
    'summary': ['recap', 'short version'],
    'superior': ['higher', 'better'],
    'supervise': ['oversee', 'watch'],
    'supplement': ['addition', 'extra'],
    'supported': ['helped', 'backed'],
    'suppressed': ['stopped', 'held down'],
    'surge': ['rise', 'rush'],
    'surplus': ['extra', 'leftover'],
    'surveillance': ['watching', 'monitoring'],
    'survival': ['living', 'staying alive'],
    'susceptibility': ['sensitivity', 'weakness'],
    'sustain': ['support', 'keep up'],
    'synthesis': ['combination', 'mix'],
    'systematic': ['organized', 'methodical'],
    'tactics': ['methods', 'plans'],
    'targeted': ['aimed at'],
    'technicality': ['detail', 'point'],
    'technique': ['method', 'way'],
    'technology': ['tech', 'machines'],
    'temporary': ['short-term', 'brief'],
    'terminology': ['terms', 'words'],
    'terrain': ['land', 'ground'],
    'territory': ['land', 'area'],
    'terrorism': ['violence', 'terror'],
    'testify': ['give evidence'],
    'thereafter': ['after that'],
    'thereby': ['by that means'],
    'thermal': ['heat'],
    'thickens': ['gets thick'],
    'thorough': ['complete', 'full'],
    'thoughtfully': ['carefully'],
    'threatened': ['endangered', 'warned'],
    'threshold': ['limit', 'border'],
    'tightened': ['made tight'],
    'timely': ['on time'],
    'tolerable': ['bearable', 'okay'],
    'total': ['whole', 'complete'],
    'trace': ['track', 'small amount'],
    'traditionally': ['historically'],
    'trajectory': ['path', 'curve'],
    'transaction': ['deal', 'exchange'],
    'transformation': ['change', 'conversion'],
    'transition': ['change', 'shift'],
    'transportation': ['transport', 'travel'],
    'traumatic': ['shocking', 'upsetting'],
    'traverse': ['cross', 'travel'],
    'treaty': ['agreement', 'pact'],
    'tremendous': ['huge', 'great'],
    'trend': ['tendency', 'direction'],
    'trial': ['test', 'try'],
    'triggered': ['caused', 'set off'],
    'ultimate': ['final', 'last'],
    'unacceptable': ['bad', 'not allowed'],
    'unanimous': ['all agree'],
    'uncertainty': ['doubt', 'unknown'],
    'unconditional': ['absolute', 'total'],
    'undisclosed': ['secret', 'hidden'],
    'underlying': ['basic', 'hidden'],
    'undertake': ['take on', 'start'],
    'undesirable': ['bad', 'unwanted'],
    'uneven': ['rough', 'not level'],
    'unexpected': ['surprising'],
    'unfair': ['not right'],
    'unfold': ['open', 'reveal'],
    'unhappy': ['sad'],
    'uniformity': ['sameness'],
    'unify': ['unite', 'join'],
    'uniquely': ['specially', 'distinctly'],
    'universal': ['global', 'general'],
    'unknown': ['strange', 'unfamiliar'],
    'unlimited': ['endless'],
    'unnecessary': ['not needed'],
    'unprecedented': ['new', 'never before'],
    'unpredictable': ['uncertain', 'random'],
    'unrealistic': ['impossible'],
    'unstable': ['shaky', 'unsteady'],
    'unsure': ['uncertain'],
    'until': ['up to', 'till'],
    'unusual': ['rare', 'odd'],
    'upcoming': ['next', 'future'],
    'upgrade': ['improve'],
    'utilized': ['used'],
    'vacancy': ['empty spot'],
    'vaguely': ['unclearly'],
    'validity': ['truth', 'soundness'],
    'variation': ['change', 'difference'],
    'variety': ['mix', 'range'],
    'various': ['different', 'many'],
    'vastly': [' hugely', 'very much'],
    'vehicle': ['car', 'transport'],
    'venture': ['risk', 'business'],
    'version': ['form', 'edition'],
    'vertical': ['upright'],
    'vibration': ['shake'],
    'victim': ['sufferer', 'target'],
    'victory': ['win'],
    'violation': ['break', 'crime'],
    'violently': ['forcefully'],
    'virtual': ['simulated', 'digital'],
    'virtually': ['almost', 'nearly'],
    'visible': ['seeable'],
    'visually': ['by sight'],
    'vital': ['essential', 'life-giving'],
    'vocational': ['job-related'],
    'voice': ['speak', 'say'],
    'volume': ['amount', 'loudness'],
    'voluntary': ['optional', 'free'],
    'voluntarily': ['willingly'],
    'vulnerability': ['weakness'],
    'wage': ['pay', 'salary'],
    'waiting': ['stay', 'hold'],
    'waning': ['fading', 'lessening'],
    'warning': ['alert', 'caution'],
    'warranted': ['justified', 'needed'],
    'weakened': ['made weak'],
    'wealthy': ['rich'],
    'weaponry': ['weapons', 'arms'],
    'whereas': ['while', 'although'],
    'whereby': ['by which', 'how'],
    'widespread': ['common', 'far-reaching'],
    'withdraw': ['take back', 'leave'],
    'withstand': ['resist', 'survive'],
    'witness': ['see', 'observe'],
    'wonderful': ['great', 'amazing'],
    'workforce': ['workers', 'staff'],
    'worry': ['concern', 'anxiety'],
    'worsening': ['getting worse'],
    'worthwhile': ['worth it'],
    'wound': ['injury', 'cut'],
    'wrapping': ['covering'],
    'writing': ['text', 'composition'],
    'yearly': ['annually'],
    'youthful': ['young'],
  },
  stopwords: STOP_WORDS,
};

/**
 * Estimates the number of syllables in a word using language-specific heuristics.
 * This is a simplified approximation and may not be 100% accurate for all words.
 * @param {string} word - The word to count syllables for.
 * @param {Language} lang - The language of the word (e.g., English or Urdu).
 * @returns {number} - Estimated number of syllables in the word.
 * @example
 * countSyllables("example", Language.English); // returns 3
 * countSyllables("سکول", Language.Urdu); // returns 2 (approximate)
 */
const countSyllables = (word: string, lang: Language): number => {
  if (lang === Language.Urdu) {
    // Urdu syllable heuristic: roughly 70% of character count, but clamped to char count
    return Math.max(1, Math.round(word.length * 0.7));
  }
  // English heuristic
  if (word.length <= 3) return 1;
  word = word.toLowerCase().replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '').replace(/^y/, '');
  const matches = word.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
};

/**
 * Detects the part of speech (noun, verb, etc.) for a given word in the specified language.
 * This is a simplified version and may require integration with NLP libraries for full accuracy.
 * @param word - The word to analyze.
 * @param lang - The language of the word (e.g., English or Urdu).
 * @returns The detected part of speech (e.g., noun, verb, adjective).
 * @example
 * detectWordType("run", Language.English); // returns WordType.Verb
 * detectWordType("سکول", Language.Urdu); // returns WordType.Noun
 */
const detectWordType = (word: string, lang: Language): WordType => {
  if (lang === Language.Urdu) {
    // Urdu Verb Suffixes (Common): نے, نا, تھا, تھی, تھے, گیا, گئی
    // Urdu Noun Suffixes (Common): گا, گی, ہ, ہیں, ون, ان
    if (/نے$|نا$|تھا$|تھی$|تھے$|گیا$|گئی$/.test(word)) return WordType.Verb;
    if (/گا$|گی$|ہ$|ہیں$|ون$|ان$/.test(word)) return WordType.Noun;
    if (/ای$/.test(word)) return WordType.Adjective;
    return WordType.Unknown;
  }

  // English Heuristic
  if (word.endsWith('ing') || word.endsWith('ed')) return WordType.Verb;
  else if (word.endsWith('ly')) return WordType.Adverb;
  else if (word.endsWith('tion') || word.endsWith('ity') || word.endsWith('ness')) return WordType.Noun;
  else if (word.endsWith('able') || word.endsWith('ous') || word.endsWith('ive')) return WordType.Adjective;
  return WordType.Unknown;
};

/**
 * Processes the input text into a structured analysis result, including word metadata, statistical insights, and language-specific processing.
 * @param {string} text - The input text to be analyzed.
 * @param {number} maxWords - Maximum number of words to process (for performance optimization).
 * @param {Language} language - The language of the input text (e.g., English or Urdu).
 * @param {CustomVocabulary} [customVocab] - Optional custom vocabulary for filtering or analysis.
 * @returns {AnalysisResult} - The result containing words, stats, and insights from the text analysis.
 * @example
 * const result = processAdvancedText(
 *   "This is a sample text for analysis.",
 *   100,
 *   Language.English,
 *   {
 *     technical: ["algorithm", "database"],
 *     stopwords: new Set(["the", "and"]),
 *   }
 * );
 * console.log(result.stats.readingTime); // Outputs estimated reading time
 */
export const processAdvancedText = (
  text: string,
  maxWords: number,
  language: Language,
  customVocab?: CustomVocabulary,
): AnalysisResult => {
  const isUrdu = language === Language.Urdu;

  // Select Base Vocabulary
  const baseVocab: CustomVocabulary = isUrdu ? {
    technical: [],
    positive: URDU_POSITIVE_WORDS,
    negative: URDU_NEGATIVE_WORDS,
    complex: URDU_COMPLEX_WORDS,
    simplifications: URDU_SIMPLIFICATIONS,
    stopwords: URDU_STOP_WORDS,
  } : DEFAULT_VOCAB_EN;

  // Merge with custom vocab safely
  const vocab: CustomVocabulary = {
    technical: [...(baseVocab.technical || []), ...(customVocab?.technical || [])],
    positive: [...(baseVocab.positive || []), ...(customVocab?.positive || [])],
    negative: [...(baseVocab.negative || []), ...(customVocab?.negative || [])],
    complex: [...(baseVocab.complex || []), ...(customVocab?.complex || [])],
    simplifications: {...(baseVocab.simplifications || {}), ...(customVocab?.simplifications || {})},
    stopwords: baseVocab.stopwords || new Set(),
  };

  // Tokenization
  // English: Standard words. Urdu: Arabic script characters (expanded range).
  // Expanded range includes Arabic Supplement, Extended-A, and Presentation Forms to catch all Urdu variations.
  const tokenRegex = isUrdu
    ? /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]+/g
    : /\b[\w']+\b/g;

  // Sentence splitting
  // Updated Urdu split to include '.' as well as '۔' to handle mixed/informal punctuation
  const sentences = text.split(isUrdu ? /[۔.!?।]/g : /[.!?]+/g);

  const sentenceMap = new Map<string, string[]>();
  const sentenceLengths: number[] = [];
  let passiveVoiceCount = 0;

  sentences.forEach((s) => {
    const wordsInSentence = s.toLowerCase().match(tokenRegex) || [];
    sentenceLengths.push(wordsInSentence.length);

    // Passive voice check is language dependent, simplified here to english
    if (!isUrdu && /\b(was|were|is|are|been)\s\w+ed\b/g.test(s)) {
      passiveVoiceCount++;
    }

    wordsInSentence.forEach(w => {
      // Normalize for map (Urdu words with unicode variations)
      const normalized = w;
      if (!sentenceMap.has(normalized)) sentenceMap.set(normalized, []);
      if (sentenceMap.get(normalized)!.length < 3) {
        sentenceMap.get(normalized)!.push(s.trim());
      }
    });
  });

  const rawWords = text.toLowerCase().match(tokenRegex) || [];
  const wordCount = new Map<string, number>();
  rawWords.forEach(w => wordCount.set(w, (wordCount.get(w) || 0) + 1));

  let positiveCount = 0;
  let negativeCount = 0;
  const sentimentDrivers: AnalysisStats['sentimentDrivers'] = [];

  const processedWords: WordMetadata[] = Array.from(wordCount.entries())
    .slice(0, maxWords)
    .map(([word, count], index): WordMetadata => {
      const isStopWord = vocab.stopwords?.has?.(word) ?? false;
      // Length score relative to language (Urdu words avg 4, English 5)
      const avgLen = isUrdu ? 4 : 5;
      const lengthScore = Math.min(word.length / (avgLen * 2), 1);
      const frequencyScore = count / rawWords.length;
      const rarityScore = 1 - Math.min((frequencyScore * 20) + (word.length * 0.01), 1);

      const isTech = vocab.technical!.some(k => word.includes(k));
      const technicalScore = isTech ? 0.9 : 0.1;

      let sentiment: SentimentType = SentimentType.Neutral;
      if (vocab.positive!.includes(word)) {
        sentiment = SentimentType.Positive;
        positiveCount += count;
        sentimentDrivers.push({word, count, type: 'positive'});
      } else if (vocab.negative!.includes(word)) {
        sentiment = SentimentType.Negative;
        negativeCount += count;
        sentimentDrivers.push({word, count, type: 'negative'});
      }

      const type = detectWordType(word, language);

      return {
        id: `word-${index}`,
        // Keep original casing for display, but standard first letter caps
        word: isUrdu ? word.charAt(0).toUpperCase() + word.slice(1) : word.charAt(0).toUpperCase() + word.slice(1),
        originalWord: word,
        count,
        frequency: frequencyScore,
        isStopWord,
        complexity: {
          score: ((technicalScore * 40) + (rarityScore * 40) + (lengthScore * 20)),
          factors: {
            technical: technicalScore,
            rarity: rarityScore,
            length: lengthScore,
            emotion: sentiment === SentimentType.Positive ? 0.8 : sentiment === SentimentType.Negative ? 0.2 : 0.5,
            frequency: frequencyScore,
          },
        },
        sentiment,
        type,
        syllables: countSyllables(word, language),
        contextSentences: sentenceMap.get(word) || [],
      };
    }).sort((a, b) => b.count - a.count);

  const uniqueWords = processedWords.length;
  const totalSyllables = processedWords.reduce((acc, w) => acc + (w.syllables * w.count), 0);
  const avgSyllablesPerWord = rawWords.length ? (totalSyllables / rawWords.length) : 0;
  const ttr = rawWords.length > 0 ? (uniqueWords / rawWords.length) : 0;

  const avgChars = rawWords.join('').length / rawWords.length;
  const ari = 4.71 * avgChars + 0.5 * (rawWords.length / sentences.length) - 21.43;
  // Flesch-Kincaid roughly for Urdu doesn't exist, we use ARI generic formula or simplified grades
  let gradeLevel = ari < 1 ? isUrdu ? 'پرائمری' : 'K-1' : ari < 2 ? isUrdu ? 'دوم' : '2nd' : isUrdu ? 'سوم' : '3rd';

  const posDist = {
    noun: processedWords.filter(w => w.type === WordType.Noun).length,
    verb: processedWords.filter(w => w.type === WordType.Verb).length,
    adj: processedWords.filter(w => w.type === WordType.Adjective).length,
    other: processedWords.filter(w => !['noun', 'verb', 'adjective'].includes(w.type)).length,
  };

  const insights: Insight[] = [];
  // TS18048 Fix: Ensure safe access to simplifications
  const simplifications = vocab.simplifications || {};

  const complexWords = processedWords.filter(w => vocab.complex!.includes(w.originalWord));
  if (complexWords.length > 0) {
    const key = complexWords[0].originalWord;
    // Safe access using nullish coalescing or optional chaining
    const suggestions = simplifications[key] || [];
    insights.push({
      id: 'v-complex',
      type: 'warning',
      category: 'vocabulary',
      message: isUrdu ? `پیچیدہ الفاظ: "${complexWords[0].word}"` : `Simplification opportunity: "${complexWords[0].word}"`,
      suggestion: suggestions.length > 0 ? suggestions[0] : (isUrdu ? 'آسان الفاظ استعمال کریں' : 'Use simpler words'),
    });
  }

  if (ttr < 0.4) {
    insights.push({
      id: 'v-ttr',
      type: 'warning',
      category: 'readability',
      message: isUrdu ? 'الفاظ کی تکراری زیادہ ہے۔' : 'Low lexical diversity.',
      suggestion: isUrdu ? 'جدید الفاظ کا استعمال کریں' : 'Try expanding your vocabulary.',
    });
  }

  if (avgSyllablesPerWord > 2.0 && !isUrdu) { // Syllable metric mostly english
    insights.push({
      id: 'r-syllables',
      type: 'warning',
      category: 'readability',
      message: 'Polysyllabic words dominate.',
      suggestion: 'Text may be hard to read aloud for general audiences.',
    });
  }

  if (passiveVoiceCount > 0 && !isUrdu) {
    insights.push({
      id: 'g-passive',
      type: 'info',
      category: 'grammar',
      message: `Detected ${passiveVoiceCount} instances of passive voice.`,
      suggestion: 'Active voice is generally more engaging.',
    });
  }

  const totalSentiment = positiveCount + negativeCount;
  if (totalSentiment > 0) {
    const negRatio = negativeCount / totalSentiment;
    if (negRatio > 0.4) {
      insights.push({
        id: 't-neg',
        type: 'warning',
        category: 'tone',
        message: isUrdu ? `منفی جذبات پر مبنی متن ہے (${(negRatio * 100).toFixed(0)}%).` : `Negative tone is dominant (${(negRatio * 100).toFixed(0)}%).`,
        suggestion: isUrdu ? 'مثبت انداز میں لکھیں' : 'Try to balance negative feedback with positive framing.',
      });
    }
  }

  const avgSentenceLen = sentenceLengths.reduce((a, b) => a + b, 0) / sentenceLengths.length;
  if (avgSentenceLen > 30) {
    insights.push({
      id: 's-long',
      type: 'critical',
      category: 'structure',
      message: isUrdu ? 'جملہ بہت لمبے ہیں۔' : 'Sentences are too long.',
      suggestion: isUrdu ? 'جملے چھوٹے کریں' : 'Break down long sentences.',
    });
  } else if (avgSentenceLen < 8) {
    insights.push({
      id: 's-short',
      type: 'info',
      category: 'structure',
      message: isUrdu ? 'جملے بہت چھوٹے ہیں۔' : 'Choppy sentence flow.',
      suggestion: isUrdu ? 'جملوں کو جوڑیں' : 'Combine some sentences.',
    });
  }

  if (insights.length === 0) {
    insights.push({
      id: 'obs-1',
      type: 'info',
      category: 'structure',
      message: `Text structure looks balanced (${gradeLevel}).`,
    });
    insights.push({
      id: 'obs-2',
      type: 'success',
      category: 'vocabulary',
      message: isUrdu ? 'الفاظ کا استعمال درست ہے۔' : 'Vocabulary usage appears appropriate.',
    });
  }

  return {
    words: processedWords,
    stats: {
      totalWords: rawWords.length,
      uniqueWords,
      sentences: sentences.length,
      readingTime: Math.ceil(rawWords.length / 200),
      gradeLevel,
      gradeScore: ari,
      toneScore: {analytical: 0.85, confident: 0.65, tentative: 0.15},
      emotionalBreakdown: {
        joy: positiveCount > negativeCount ? 0.8 : 0.2,
        anger: negativeCount * 0.1,
        sadness: negativeCount * 0.05,
        fear: 0.1,
      },
      sentenceLengths,
      topKeywords: processedWords.slice(0, 5).map(w => w.word),
      ttr,
      posDistribution: posDist,
      totalSyllables,
      avgSyllablesPerWord,
      sentimentDrivers: sentimentDrivers.sort((a, b) => b.count - a.count).slice(0, 5),
      passiveVoiceCount,
    },
    insights,
  };
};
