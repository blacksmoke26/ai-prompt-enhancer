/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */
import React, {useEffect, useMemo, useState} from 'react';
import {Brain, ChevronDown, EyeOff, Filter, Lightbulb, Sparkles} from 'lucide-react';
// ui components
import {Button} from '~/components/ui/Button';
import {Badge} from '~/components/ui/Badge';
import {Card, CardContent, CardHeader, CardTitle} from '~/components/ui/Card';
import {Tooltip, TooltipContent, TooltipTrigger} from '~/components/ui/Tooltip';

/**
 * Common English stop words to filter out
 */
const STOP_WORDS = new Set([
  'the', 'and', 'a', 'an', 'to', 'in', 'is', 'it', 'that', 'was', 'he', 'she', 'as', 'for', 'on', 'with',
  'by', 'at', 'this', 'be', 'are', 'were', 'but', 'not', 'or', 'have', 'has', 'had', 'of', 'they', 'their',
  'you', 'your', 'we', 'our', 'i', 'my', 'me', 'do', 'does', 'did', 'can', 'could', 'should', 'would',
  'will', 'just', 'about', 'also', 'very', 'only', 'from', 'one', 'all', 'so', 'no', 'if', 'than', 'too',
  'them', 'these', 'those', 'been', 'being', 'before', 'after', 'again', 'then', 'when', 'where', 'why', 'how',
]);

/**
 * Technical terms that might indicate specialized content
 */
const TECHNICAL_TERMS = new Set([
  'algorithm', 'function', 'variable', 'parameter', 'method', 'class', 'object', 'array', 'string',
  'integer', 'boolean', 'component', 'element', 'interface', 'property', 'state', 'effect', 'hook',
  'query', 'database', 'api', 'endpoint', 'server', 'client', 'request', 'response', 'error', 'exception',
  'framework', 'library', 'module', 'package', 'dependency', 'version', 'commit', 'branch', 'merge',
  'system', 'architecture', 'design', 'pattern', 'model', 'view', 'controller', 'service', 'repository',
]);

/**
 * @interface WordComplexityMetrics
 * @description Metrics for determining word complexity and importance
 */
interface WordComplexityMetrics {
  length: number;
  syllableCount: number;
  technicalScore: number;
  rarityScore: number;
  contextRelevance: number;
}

/**
 * @interface WordInsight
 * @description Structure for word-based insights and suggestions
 */
interface WordInsight {
  type: 'overused' | 'complex' | 'technical' | 'sentiment' | 'diversity';
  word: string;
  frequency: number;
  message: string;
  suggestion?: string;
  severity?: 'low' | 'medium' | 'high';
}

/**
 * @interface ProcessedWord
 * @description Enhanced word structure with complexity metrics
 */
interface ProcessedWord {
  word: string;
  count: number;
  complexity?: WordComplexityMetrics;
}

/**
 * @interface WordCloudProps
 * @description Props for the intelligent WordCloud component
 */
export interface WordCloudProps {
  /** Raw text input for intelligent analysis */
  text?: string;
  /** Pre-calculated word frequency array (optional if text is provided) */
  wordFrequency?: Array<{ word: string; count: number }>;
  /** Controls visibility of the word cloud component */
  showWordCloud: boolean;
  /** Function to update the showWordCloud state */
  setShowWordCloud: React.Dispatch<React.SetStateAction<boolean>>;
  /** Optional callback for when insights are detected */
  onInsightsDetected?: (insights: WordInsight[]) => void;
}

/**
 * Enhanced intelligent WordCloud component with professional design and advanced text analysis
 * @description Renders a visually appealing, intelligent word frequency analysis with markdown handling,
 * complexity detection, and actionable insights
 */
const WordCloud: React.FC<WordCloudProps> = (props) => {
  const {text, wordFrequency: externalWordFrequency = [], showWordCloud, setShowWordCloud, onInsightsDetected} = props;

  if (!showWordCloud) return null;

  // State for filter selection
  const [filterLevel, setFilterLevel] = useState<'all' | 'high' | 'medium' | 'low' | 'complex'>('all');

  // Process text and extract word frequencies if raw text is provided
  const {processedWords, insights} = useMemo(() => {
    if (!text) {
      // Format external word frequency to match processed word structure
      const formattedWords: ProcessedWord[] = externalWordFrequency.map(item => ({
        word: item.word,
        count: item.count,
        complexity: undefined,
      }));

      return {
        processedWords: formattedWords,
        insights: [],
      };
    }

    return processTextIntelligently(text);
  }, [text, externalWordFrequency]);

  // Notify parent component about detected insights
  useEffect(() => {
    if (onInsightsDetected && insights.length > 0) {
      onInsightsDetected(insights);
    }
  }, [insights, onInsightsDetected]);

  // Calculate max count for proportional sizing
  const maxCount = processedWords.length > 0
    ? Math.max(...processedWords.map(item => item.count), 1)
    : 1;

  // Filter words based on selection
  const filteredWords = processedWords.filter((item) => {
    const {count, complexity} = item;

    if (filterLevel === 'all') return true;
    if (filterLevel === 'high') return count >= maxCount * 0.7;
    if (filterLevel === 'medium') return count >= maxCount * 0.3 && count < maxCount * 0.7;
    if (filterLevel === 'low') return count < maxCount * 0.3;
    if (filterLevel === 'complex') {
      // Safely check for complexity properties
      return (complexity?.technicalScore ?? 0) > 0.7 || (complexity?.rarityScore ?? 0) > 0.7;
    }
    return true;
  });

  // Get top 30 words for display (or all if less)
  const topWords = filteredWords.slice(0, 30);

  // Get filter options
  const filterOptions = [
    {value: 'all', label: 'All words'},
    {value: 'high', label: 'High frequency'},
    {value: 'medium', label: 'Medium frequency'},
    {value: 'low', label: 'Low frequency'},
    {value: 'complex', label: 'Complex terms'},
  ];

  return (
    <Card className="mb-6 border-border/50 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
              <Brain className="h-5 w-5 text-indigo-600"/>
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
                Intelligent Word Analysis
                {insights.length > 0 && (
                  <Badge variant="secondary" className="text-xs px-2 py-0.5 bg-amber-50 text-amber-700">
                    <Lightbulb className="h-3 w-3 mr-1 inline"/>
                    {insights.length} insights
                  </Badge>
                )}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Top {topWords.length} terms with complexity analysis
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowWordCloud(false)}
            className="hover:bg-destructive/10 hover:text-destructive"
          >
            <EyeOff className="h-4 w-4"/>
            <span className="sr-only">Close</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground"/>
            <span className="text-sm text-muted-foreground">Filter by frequency</span>
          </div>
          <div className="relative">
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value as any)}
              className="appearance-none bg-background border border-border rounded-md py-1.5 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            >
              {filterOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none"/>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {topWords.map(({word, count, complexity}) => {
            // Calculate proportional font size (slightly smaller than original)
            const fontSize = Math.max(10, Math.min(22, (count / maxCount) * 14 + 10));

            // Determine badge variant and color based on complexity and frequency
            let badgeVariant: any = 'secondary';
            let badgeColor = '';

            const isTechnical = (complexity?.technicalScore || 0) > 0.7;
            const isRare = (complexity?.rarityScore || 0) > 0.7;

            if (isTechnical) {
              badgeVariant = 'default';
              badgeColor = 'bg-blue-100 text-blue-800 border-blue-200';
            } else if (isRare) {
              badgeVariant = 'default';
              badgeColor = 'bg-purple-100 text-purple-800 border-purple-200';
            } else if (count >= maxCount * 0.7) {
              badgeVariant = 'destructive';
            } else if (count >= maxCount * 0.4) {
              badgeVariant = 'default';
            }

            return (
              <Tooltip key={word} delayDuration={200}>
                <TooltipTrigger asChild>
                  <div
                    className={`group relative flex flex-col items-center justify-center p-2.5 bg-card rounded-lg border ${
                      isTechnical ? 'border-blue-300/50' : isRare ? 'border-purple-300/50' : 'border-border'
                    } hover:border-primary/50 transition-all duration-200 hover:shadow-sm`}
                    style={{
                      fontSize: `${fontSize}px`,
                      minHeight: '55px',
                    }}
                  >
                    <span
                      className={`font-medium text-center text-foreground group-hover:text-primary transition-colors ${
                        isTechnical ? 'text-blue-700 dark:text-blue-400' : isRare ? 'text-purple-700 dark:text-purple-400' : ''
                      }`}>
                      {cleanMarkdown(word)}
                    </span>
                    <Badge
                      variant={badgeVariant}
                      className={`mt-1 text-[11px] font-medium px-2 py-0.5 ${
                        badgeColor || (badgeVariant === 'destructive' ? 'bg-red-100 text-red-800 border-red-200' : '')
                      }`}
                    >
                      {count}
                    </Badge>
                    {isTechnical && (
                      <div
                        className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full w-3 h-3 flex items-center justify-center">
                        <span className="text-[8px]">T</span>
                      </div>
                    )}
                    {isRare && (
                      <div
                        className="absolute -top-1 -right-1 bg-purple-500 text-white rounded-full w-3 h-3 flex items-center justify-center">
                        <span className="text-[8px]">R</span>
                      </div>
                    )}
                    <div
                      className="absolute inset-0 bg-primary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"/>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="max-w-[300px]">
                  <div className="space-y-1">
                    <p><span className="font-medium">Frequency:</span> {count} occurrences</p>
                    {complexity && (
                      <>
                        {isTechnical && (
                          <p className="text-blue-600 flex items-center">
                            <Sparkles className="w-3 h-3 mr-1"/> Technical term
                          </p>
                        )}
                        {isRare && (
                          <p className="text-purple-600 flex items-center">
                            <Sparkles className="w-3 h-3 mr-1"/> Rare/unique term
                          </p>
                        )}
                        <p><span className="font-medium">Complexity:</span> {Math.round(
                          ((complexity.technicalScore || 0) * 0.4 + (complexity.rarityScore || 0) * 0.3 + (complexity.length / 20) * 0.3) * 100,
                        )}%</p>
                      </>
                    )}
                  </div>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>

        {filteredWords.length > 30 && (
          <div className="mt-3 text-center">
            <p className="text-xs text-muted-foreground">
              Showing top 30 of {filteredWords.length} words
            </p>
          </div>
        )}

        {/* Display insights if any are detected */}
        {insights.length > 0 && (
          <div className="mt-5 pt-4 border-t border-border/50">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="h-4 w-4 text-amber-500"/>
              <h4 className="text-sm font-medium text-foreground">Content Insights</h4>
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
              {insights.slice(0, 5).map((insight, index) => {
                const bgColor = insight.severity === 'high' ? 'bg-red-50' :
                  insight.severity === 'medium' ? 'bg-amber-50' : 'bg-blue-50';
                const borderColor = insight.severity === 'high' ? 'border-red-200' :
                  insight.severity === 'medium' ? 'border-amber-200' : 'border-blue-200';

                return (
                  <div
                    key={index}
                    className={`p-2 rounded-md border ${borderColor} ${bgColor} text-sm`}
                  >
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5">
                        {insight.severity === 'high' && <span className="text-red-500 text-xs">⚠️</span>}
                        {insight.severity === 'medium' && <span className="text-amber-500 text-xs">💡</span>}
                        {insight.severity === 'low' && <span className="text-blue-500 text-xs">🔍</span>}
                      </div>
                      <div className="flex-1">
                        <p><span className="font-medium">{insight.word}:</span> {insight.message}</p>
                        {insight.suggestion && (
                          <p className="mt-1 text-xs text-muted-foreground italic">Suggestion: {insight.suggestion}</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              {insights.length > 5 && (
                <p className="text-xs text-muted-foreground text-center mt-2">
                  +{insights.length - 5} more insights available
                </p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

};


/**
 * Process text intelligently to extract words, handle markdown, and analyze complexity
 */
function processTextIntelligently(rawText: string) {
  // 1. Clean markdown formatting
  const cleanedText = cleanMarkdown(rawText);

  // 2. Extract words with enhanced processing
  const wordFrequency = extractWordsWithIntelligence(cleanedText);

  // 3. Calculate complexity metrics for each word
  const processedWords = wordFrequency.map(item => ({
    ...item,
    complexity: calculateWordComplexity(item.word),
  }));

  // 4. Generate insights based on the analysis
  const insights = generateInsights(processedWords);

  // 5. Sort by count and complexity score combined
  processedWords.sort((a, b) => {
    const scoreA = a.count * (1 + ((a.complexity?.technicalScore || 0) * 0.5));
    const scoreB = b.count * (1 + ((b.complexity?.technicalScore || 0) * 0.5));
    return scoreB - scoreA;
  });

  return {processedWords, insights};
}

/**
 * Clean markdown syntax from text
 */
function cleanMarkdown(text: string): string {
  // Remove markdown headers
  let cleanText = text.replace(/^#+\s+/gm, '');

  // Remove markdown links [text](url) -> text
  cleanText = cleanText.replace(/\[([^\]]+)]\([^)]+\)/g, '$1');

  // Remove images
  cleanText = cleanText.replace(/!\[[^\]]*]\([^)]*\)/g, '');

  // Remove bold and italic markers
  cleanText = cleanText.replace(/(\*\*|__)(.*?)\1/g, '$2');
  cleanText = cleanText.replace(/([*_])(.*?)\1/g, '$2');

  // Remove inline code markers
  cleanText = cleanText.replace(/`([^`]*)`/g, '$1');

  // Remove blockquotes
  cleanText = cleanText.replace(/^\s*>\s+/gm, '');

  // Remove horizontal rules
  cleanText = cleanText.replace(/^(-{3,}|_{3,}|\*{3,})\s*$/gm, '');

  // Remove HTML tags
  cleanText = cleanText.replace(/<[^>]*>/g, '');

  // Remove markdown formatting characters and symbols
  return cleanText
    .replace(/[*_~`#>[\](){}|\\/^$+.!?,;:@]/g, '') // Remove all symbols and markdown chars
    .replace(/<\/?[^>]+(>|$)/g, '') // Remove HTML tags
    .replace(/[0-9]+[^\p{L}\s][0-9]*/gu, '') // Remove words with numbers and symbols combined
    .replace(/[^a-zA-Z\s'-]/g, '') // Keep only letters, spaces, hyphens and apostrophes
    .replace(/^\s+|\s+$/g, '') // Trim whitespace
    .replace(/\s+/g, ' ') // Normalize spaces
    .toLowerCase()
    .split(' ')
    .filter(part => part.length > 1) // Remove single character parts
    .join(' ')
    .trim();
}

/**
 * Enhanced word extraction with better filtering and phrase detection
 */
function extractWordsWithIntelligence(text: string): Array<{ word: string; count: number }> {
  // Convert to lowercase and replace common apostrophe patterns
  let processedText = text.toLowerCase()
    .replace(/'s\b/g, '')          // Remove possessive 's
    .replace(/'/g, '');            // Remove other apostrophes

  // Handle technical phrases and common compound terms
  const technicalPhrases = [
    'machine learning', 'deep learning', 'neural network', 'artificial intelligence',
    'user interface', 'user experience', 'front end', 'back end', 'data science',
    'react component', 'state management', 'api endpoint', 'type script', 'java script',
  ];

  // Replace technical phrases with underscore versions to keep them as single terms
  technicalPhrases.forEach(phrase => {
    const underscored = phrase.replace(/\s+/g, '_');
    processedText = processedText.replace(new RegExp(phrase.replace(/\s+/g, '\\s+'), 'g'), underscored);
  });

  // Extract words, including hyphenated ones and underscored phrases
  const wordRegex = /[\p{L}\p{N}_-]+/gu;
  const words = processedText.match(wordRegex) || [];

  // Filter and count words
  const wordCounts: Record<string, number> = {};

  words.forEach(word => {
    // Replace underscores back to spaces for display
    const displayWord = word.replace(/_/g, ' ');

    // Skip if too short or is a stop word
    if (displayWord.length < 3 || STOP_WORDS.has(displayWord)) return;

    // Skip numbers that are just numeric
    if (/^\d+$/.test(displayWord)) return;

    // Skip common URL parts and technical noise
    if (/(http|https|www|com|net|org|io|dev)$/i.test(displayWord)) return;

    // Add to count
    wordCounts[displayWord] = (wordCounts[displayWord] || 0) + 1;
  });

  // Convert to array and sort by frequency
  return Object.entries(wordCounts)
    .map(([word, count]) => ({word, count}))
    .sort((a, b) => b.count - a.count);
}

/**
 * Calculate complexity metrics for a word
 */
function calculateWordComplexity(word: string): WordComplexityMetrics {
  // Length factor - longer words tend to be more complex
  const length = word.length;

  // Estimate syllable count (simplified)
  const syllableCount = estimateSyllables(word);

  // Check if it's a technical term
  const isTechnical = TECHNICAL_TERMS.has(word.toLowerCase());
  const technicalScore = isTechnical ? 1.0 : word.split(' ').some(w => TECHNICAL_TERMS.has(w.toLowerCase())) ? 0.7 : 0.0;

  // Estimate rarity based on word characteristics
  let rarityScore = 0.0;

  // Longer words are often rarer
  if (length > 10) rarityScore += 0.3;
  if (length > 15) rarityScore += 0.2;

  // Words with unusual characters or patterns
  if (/[^\w\s-]/.test(word)) rarityScore += 0.2;

  // Words with many consonants in a row
  if (/[bcdfghjklmnpqrstvwxyz]{3,}/i.test(word)) rarityScore += 0.2;

  // Less common letter combinations
  if (/x|z|q/.test(word.toLowerCase())) rarityScore += 0.1;

  // Cap at 1.0
  rarityScore = Math.min(1.0, rarityScore);

  // Context relevance is calculated elsewhere based on document context
  const contextRelevance = 0.5;

  return {
    length,
    syllableCount,
    technicalScore,
    rarityScore,
    contextRelevance,
  };
}

/**
 * Simple syllable estimation
 */
function estimateSyllables(word: string): number {
  if (word.length <= 3) return 1;

  // Remove trailing e
  let modifiedWord = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  // Remove initial y
  modifiedWord = modifiedWord.replace(/^y/, '');

  // Count vowel groups
  const matches = modifiedWord.match(/[aeiouy]{1,2}/g);
  return Math.max(1, matches ? matches.length : 1);
}

/**
 * Generate insights based on word analysis
 */
function generateInsights(processedWords: ProcessedWord[]): WordInsight[] {
  const insights: WordInsight[] = [];
  const totalWords = processedWords.length;
  const totalCount = processedWords.reduce((sum, item) => sum + item.count, 0);

  // Find overused words
  processedWords.slice(0, 10).forEach(item => {
    const frequencyRatio = item.count / totalCount;

    if (frequencyRatio > 0.08 && item.word.length > 3) {
      insights.push({
        type: 'overused',
        word: item.word,
        frequency: item.count,
        message: `This word appears ${item.count} times (${Math.round(frequencyRatio * 100)}% of all words)`,
        suggestion: `Consider using synonyms or restructuring sentences to improve variety.`,
        severity: 'high',
      });
    } else if (frequencyRatio > 0.05) {
      insights.push({
        type: 'overused',
        word: item.word,
        frequency: item.count,
        message: `This word appears frequently (${item.count} occurrences)`,
        suggestion: `Using alternative terms might improve readability and engagement.`,
        severity: 'medium',
      });
    }
  });

  // Find complex technical terms
  processedWords.filter(item =>
    ((item.complexity?.technicalScore || 0) > 0.7) && item.count > 1,
  ).slice(0, 5).forEach(item => {
    insights.push({
      type: 'technical',
      word: item.word,
      frequency: item.count,
      message: `Technical term used ${item.count} times. May impact readability for general audiences.`,
      suggestion: `Consider adding brief explanations when using specialized terminology.`,
      severity: 'medium',
    });
  });

  // Check for vocabulary diversity
  const uniqueWordRatio = totalWords / totalCount;
  if (uniqueWordRatio < 0.2) {
    insights.push({
      type: 'diversity',
      word: 'Vocabulary',
      frequency: 0,
      message: 'Limited vocabulary diversity detected. Same words appear frequently.',
      suggestion: 'Expand your vocabulary with synonyms and varied expressions to enhance engagement.',
      severity: 'medium',
    });
  } else if (uniqueWordRatio > 0.4) {
    insights.push({
      type: 'diversity',
      word: 'Vocabulary',
      frequency: 0,
      message: 'Excellent vocabulary diversity! Your content uses many unique terms.',
      severity: 'low',
    });
  }

  // Detect sentiment-bearing words (simplified)
  const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'perfect', 'best', 'love'];
  const negativeWords = ['bad', 'poor', 'terrible', 'awful', 'horrible', 'worst', 'hate', 'dislike'];

  const positiveCount = processedWords.filter(item =>
    positiveWords.includes(item.word.toLowerCase()),
  ).reduce((sum, item) => sum + item.count, 0);

  const negativeCount = processedWords.filter(item =>
    negativeWords.includes(item.word.toLowerCase()),
  ).reduce((sum, item) => sum + item.count, 0);

  if (negativeCount > positiveCount * 2 && negativeCount > 3) {
    insights.push({
      type: 'sentiment',
      word: 'Tone',
      frequency: 0,
      message: 'Content has a predominantly negative tone which might impact reader engagement.',
      suggestion: 'Balance negative statements with positive aspects or solutions-focused language.',
      severity: 'medium',
    });
  }

  return insights.slice(0, 10); // Limit to top 10 insights
}

export default WordCloud;
