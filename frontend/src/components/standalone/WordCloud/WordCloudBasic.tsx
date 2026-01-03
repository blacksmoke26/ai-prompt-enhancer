/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useMemo, useState} from 'react';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Brain,
  ChevronDown as ChevronDownIcon,
  ChevronUp,
  EyeOff,
  Filter,
  Info,
  Lightbulb,
  Search,
  Sparkles,
} from 'lucide-react';

// ui components
import {Button} from '~/components/ui/Button';
import {Badge} from '~/components/ui/Badge';
import {Input} from '~/components/ui/Input';
import {Card, CardContent, CardHeader, CardTitle} from '~/components/ui/Card';
import {Tooltip, TooltipContent, TooltipTrigger} from '~/components/ui/Tooltip';

// utils
import processTextIntelligently, {
  cleanMarkdown,
  FILTER_OPTIONS,
  INSIGHT_CATEGORIES,
  type ProcessedWord,

} from '~/utils/word-cloud.ts';

// hooks
import {useAppStore} from '~/stores/appStore.ts';

// types
import type {AppConfig} from '~/types';

/**
 * Defines the props for the `WordCloudBasic` component, including text input, word frequency data, visibility state, and optional UI controls.
 * @example
 * const props = {
 *   text: "This is a sample text for the basic word cloud",
 *   showWordCloudBasic: true,
 *   setShowWordCloudBasic: setShowWordCloudBasic,
 *   showAdvancedControls: true,
 * };
 * <WordCloudBasic {...props} />
 * @developerNotes
 * - `text` and `wordFrequency` are mutually optional — provide one or the other.
 * - `showAdvancedControls` defaults to `false` if not provided.
 * - Designed for integration with React's state management via `useState`.
 */
export interface WordCloudBasicProps {
  /**
   * The raw text input to generate the word cloud from.
   * If not provided, `wordFrequency` must be used instead.
   */
  text?: string;

  /**
   * Pre-calculated word frequency array for rendering.
   * Optional if `text` is provided.
   */
  wordFrequency?: Array<{ word: string; count: number }>;

  /**
   * Controls the visibility of the word cloud.
   * Required prop to manage state via React.
   */
  showWordCloudBasic: boolean;

  /**
   * Function to update the visibility state of the word cloud.
   * Required for managing component state.
   */
  setShowWordCloudBasic: React.Dispatch<React.SetStateAction<boolean>>;

  /**
   * Optional flag to show/hide advanced controls in the UI.
   * Defaults to `false` if not provided.
   */
  showAdvancedControls?: boolean;
}

/**
 * A React functional component for rendering a basic word cloud using either raw text or pre-calculated word frequency data.
 * @example
 * const [showWordCloud, setShowWordCloud] = useState(true);
 *
 * <WordCloudBasic
 *   text="This is a sample text for the basic word cloud"
 *   showWordCloudBasic={showWordCloud}
 *   setShowWordCloudBasic={setShowWordCloud}
 *   showAdvancedControls={true}
 * />
 * @developerNotes
 * - Renders words either from raw text (processed internally) or from a pre-calculated `wordFrequency` array.
 * - Uses React's `useState` for visibility control via `showWordCloudBasic` and `setShowWordCloudBasic`.
 * - Optional `showAdvancedControls` toggles UI elements like filters or settings.
 */
const WordCloudBasic: React.FC<WordCloudBasicProps> = (props) => {
  const {
    text,
    wordFrequency: externalWordFrequency = [],
    showWordCloudBasic,
    setShowWordCloudBasic,
    showAdvancedControls = true,
  } = props;

  const {config, setConfig} = useAppStore();

  // Local state for pagination and search
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(30);
  const [expandedInsights, setExpandedInsights] = useState(false);
  const [selectedInsightCategory, setSelectedInsightCategory] = useState<string | null>(null);

  if (!showWordCloudBasic) return null;

  const {processedWords, insights} = useMemo(() => {
    if (!text) {
      const formattedWords: ProcessedWord[] = externalWordFrequency.map((item, index) => ({
        id: `word-${index}`,
        word: item.word,
        count: item.count,
        originalForms: [item.word],
        complexity: undefined,
      }));
      return {processedWords: formattedWords, insights: []};
    }
    return processTextIntelligently(text);
  }, [text, externalWordFrequency]);

  const maxCount = processedWords.length > 0
    ? Math.max(...processedWords.map(item => item.count), 1)
    : 1;

  // Apply all filters: frequency, search, and complexity
  const filteredWords = useMemo(() => {
    return processedWords.filter((item) => {
      const {count, complexity, word} = item;
      const lowerWord = word.toLowerCase();
      const lowerSearch = searchQuery.toLowerCase().trim();

      // Apply search filter first
      if (lowerSearch && !lowerWord.includes(lowerSearch)) {
        return false;
      }

      // Apply frequency filter
      if (config.wordFrequency === 'all') return true;
      if (config.wordFrequency === 'high') return count >= maxCount * 0.7;
      if (config.wordFrequency === 'medium') return count >= maxCount * 0.3 && count < maxCount * 0.7;
      if (config.wordFrequency === 'low') return count < maxCount * 0.3;
      if (config.wordFrequency === 'complex') {
        return (complexity?.technicalScore ?? 0) > 0.6 || (complexity?.rarityScore ?? 0) > 0.6;
      }
      if (config.wordFrequency === 'technical') {
        return (complexity?.technicalScore ?? 0) > 0.7;
      }
      if (config.wordFrequency === 'rare') {
        return (complexity?.rarityScore ?? 0) > 0.7;
      }
      return true;
    });
  }, [processedWords, config.wordFrequency, maxCount, searchQuery]);

  // Pagination logic
  const totalPages = Math.ceil(filteredWords.length / itemsPerPage);
  const paginatedWords = filteredWords.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // Filter insights by category and severity
  const filteredInsights = useMemo(() => {
    let result = insights;

    if (selectedInsightCategory) {
      result = result.filter(insight => insight.category === selectedInsightCategory);
    }

    // Sort by severity (critical > high > medium > low)
    const severityOrder = {'critical': 0, 'high': 1, 'medium': 2, 'low': 3};
    return [...result].sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);
  }, [insights, selectedInsightCategory]);

  // Generate summary statistics
  const stats = useMemo(() => {
    const totalWords = filteredWords.length;
    const uniqueWords = new Set(filteredWords.map(w => w.word.toLowerCase())).size;
    const avgFrequency = totalWords > 0
      ? filteredWords.reduce((sum, w) => sum + w.count, 0) / totalWords
      : 0;

    const technicalWords = filteredWords.filter(w =>
      (w.complexity?.technicalScore || 0) > 0.7,
    ).length;

    const complexWords = filteredWords.filter(w =>
      (w.complexity?.rarityScore || 0) > 0.7 || w.word.length > 12,
    ).length;

    return {
      totalWords,
      uniqueWords,
      avgFrequency: Math.round(avgFrequency * 10) / 10,
      technicalWords,
      complexWords,
      lexicalDiversity: uniqueWords / totalWords,
    };
  }, [filteredWords]);

  return (
    <Card className="mb-6 border-border/50 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="p-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg dark:from-blue-900/30 dark:to-indigo-900/30">
              <Brain className="h-5 w-5 text-indigo-600 dark:text-indigo-400"/>
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
                Intelligent Word Analysis
                {insights.length > 0 && (
                  <Badge variant="secondary"
                         className="text-xs px-2 py-0.5 bg-amber-50 text-amber-700 dark:bg-amber-900/40 dark:text-amber-200">
                    <Lightbulb className="h-3 w-3 mr-1 inline"/>
                    {insights.length} insights
                  </Badge>
                )}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {stats.totalWords} total words • {stats.uniqueWords} unique terms • Lexical
                diversity: {(stats.lexicalDiversity * 100).toFixed(1)}%
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowWordCloudBasic(false)}
            className="hover:bg-destructive/10 hover:text-destructive dark:hover:bg-destructive/20"
          >
            <EyeOff className="h-4 w-4"/>
            <span className="sr-only">Close</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Advanced Controls Section */}
        {showAdvancedControls && (
          <div className="mb-4 space-y-3">
            {/* Search and Filter Row */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-initial">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                  <Input
                    placeholder="Search words..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1); // Reset to first page on search
                    }}
                    className="pl-9"
                  />
                </div>
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSearchQuery('')}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Clear
                  </Button>
                )}
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="h-4 w-4 text-muted-foreground"/>
                <select
                  value={config.wordFrequency}
                  onChange={(e) => {
                    setConfig({wordFrequency: e.target.value as AppConfig['wordFrequency']}, true);
                    setCurrentPage(1); // Reset pagination on filter change
                  }}
                  className="appearance-none bg-background border border-border rounded-md py-1.5 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  {FILTER_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon
                  className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none hidden"/>

                <div className="flex items-center gap-2 ml-2">
                  <span className="text-sm text-muted-foreground hidden sm:inline">Items per page:</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1); // Reset pagination on items per page change
                    }}
                    className="appearance-none bg-background border border-border rounded-md py-1.5 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    {[10, 20, 30, 50, 100].map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between py-2 border-t border-border/30">
                <div className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages} • {filteredWords.length} words total
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="dark:border-border/50"
                  >
                    <ArrowLeft className="h-4 w-4 mr-1"/>
                    Prev
                  </Button>
                  <div className="flex items-center gap-1">
                    {[...Array(Math.min(5, totalPages))].map((_, i) => {
                      const pageNum = currentPage > 3 && totalPages > 5 && i === 0
                        ? currentPage - 2
                        : currentPage <= 3 || totalPages <= 5
                          ? i + 1
                          : currentPage + i - 2;

                      if (pageNum < 1 || pageNum > totalPages) return null;

                      return (
                        <Button
                          key={pageNum}
                          variant={currentPage === pageNum ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-8 h-8 p-0 text-sm ${currentPage === pageNum ? 'bg-primary text-primary-foreground' : 'dark:border-border/50'}`}
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                    {totalPages > 5 && currentPage < totalPages - 1 && (
                      <span className="px-2 text-muted-foreground">...</span>
                    )}
                    {totalPages > 5 && currentPage < totalPages - 1 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(totalPages)}
                        className="w-8 h-8 p-0 text-sm dark:border-border/50"
                      >
                        {totalPages}
                      </Button>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="dark:border-border/50"
                  >
                    Next
                    <ArrowRight className="h-4 w-4 ml-1"/>
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Word Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 mb-4">
          {paginatedWords.map(({id, word, count, complexity}) => {
            const fontSize = Math.max(10, Math.min(24, (count / maxCount) * 16 + 10));
            let badgeVariant: any = 'secondary';
            let badgeColor = '';
            const isTechnical = (complexity?.technicalScore || 0) > 0.7;
            const isRare = (complexity?.rarityScore || 0) > 0.7;
            const isLong = word.length > 12;

            if (isTechnical) {
              badgeVariant = 'default';
              badgeColor = 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/40 dark:text-blue-200 dark:border-blue-800';
            } else if (isRare || isLong) {
              badgeVariant = 'default';
              badgeColor = 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/40 dark:text-purple-200 dark:border-purple-800';
            } else if (count >= maxCount * 0.7) {
              badgeVariant = 'destructive';
            } else if (count >= maxCount * 0.4) {
              badgeVariant = 'default';
            }

            return (
              <Tooltip key={id} delayDuration={200}>
                <TooltipTrigger asChild>
                  <div
                    className={`group relative flex flex-col items-center justify-center p-2.5 bg-card rounded-lg border ${
                      isTechnical ? 'border-blue-300/50 dark:border-blue-700/50' :
                        isRare ? 'border-purple-300/50 dark:border-purple-700/50' :
                          isLong ? 'border-amber-300/50 dark:border-amber-700/50' : 'border-border'
                    } hover:border-primary/50 transition-all duration-200 hover:shadow-sm`}
                    style={{fontSize: `${fontSize}px`, minHeight: '60px'}}
                  >
                    <span
                      className={`font-medium text-center text-foreground group-hover:text-primary transition-colors ${
                        isTechnical ? 'text-blue-700 dark:text-blue-400' :
                          isRare ? 'text-purple-700 dark:text-purple-400' :
                            isLong ? 'text-amber-700 dark:text-amber-400' : ''
                      }`}
                    >
                      {cleanMarkdown(word)}
                    </span>
                    <Badge
                      variant={badgeVariant}
                      className={`mt-1 text-[11px] font-medium px-2 py-0.5 ${
                        badgeColor || (badgeVariant === 'destructive'
                          ? 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/40 dark:text-red-200 dark:border-red-800'
                          : 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700')
                      }`}
                    >
                      {count}
                    </Badge>
                    {(isTechnical || isRare || isLong) && (
                      <div
                        className={`absolute -top-1 -right-1 rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-bold ${
                          isTechnical ? 'bg-blue-500 text-white dark:bg-blue-600' :
                            isRare ? 'bg-purple-500 text-white dark:bg-purple-600' : 'bg-amber-500 text-white dark:bg-amber-600'
                        }`}>
                        {isTechnical ? 'T' : isRare ? 'R' : 'L'}
                      </div>
                    )}
                    <div
                      className="absolute inset-0 bg-primary/5 dark:bg-primary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"/>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="max-w-[320px] p-3">
                  <div className="space-y-2">
                    <div>
                      <h4 className="font-medium text-foreground">{word}</h4>
                      <p className="text-sm text-muted-foreground">{count} occurrences</p>
                    </div>
                    {complexity && (
                      <div className="space-y-1">
                        {isTechnical && (
                          <p className="text-blue-600 dark:text-blue-400 flex items-center">
                            <Sparkles className="w-3 h-3 mr-1"/> Technical term
                            • {Math.round(complexity.technicalScore * 100)}% confidence
                          </p>
                        )}
                        {isRare && (
                          <p className="text-purple-600 dark:text-purple-400 flex items-center">
                            <Sparkles className="w-3 h-3 mr-1"/> Rare term • {Math.round(complexity.rarityScore * 100)}%
                            rarity
                          </p>
                        )}
                        {isLong && (
                          <p className="text-amber-600 dark:text-amber-400 flex items-center">
                            <AlertCircle className="w-3 h-3 mr-1"/> Long word ({word.length} chars)
                          </p>
                        )}
                        <div className="mt-1">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-muted-foreground">Readability</span>
                            <span className="font-medium">{Math.round((1 - complexity.readabilityScore) * 100)}%</span>
                          </div>
                          <div className="h-1.5 bg-border rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary transition-all duration-500"
                              style={{width: `${(1 - complexity.readabilityScore) * 100}%`}}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>

        {/* Empty State */}
        {paginatedWords.length === 0 && (
          <div className="text-center py-8 bg-muted/20 rounded-lg">
            <Info className="h-8 w-8 text-muted-foreground mx-auto mb-2"/>
            <p className="text-muted-foreground">
              {searchQuery ? `No words found matching "${searchQuery}"` : 'No words to display with current filters'}
            </p>
            {searchQuery && (
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => setSearchQuery('')}
              >
                Clear search
              </Button>
            )}
          </div>
        )}

        {/* Insights Section */}
        {insights.length > 0 && (
          <div className="mt-6 pt-4 border-t border-border/50">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-amber-500 dark:text-amber-400"/>
                <h4 className="text-sm font-medium text-foreground">Content Insights ({insights.length})</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {INSIGHT_CATEGORIES.map(category => (
                  <Button
                    key={category.id}
                    variant={selectedInsightCategory === category.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedInsightCategory(
                      selectedInsightCategory === category.id ? null : category.id,
                    )}
                    className={`text-xs px-2 py-0.5 ${
                      selectedInsightCategory === category.id
                        ? category.color.replace('text-', 'dark:text-')
                        : 'bg-background hover:bg-accent'
                    }`}
                  >
                    {category.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className={`space-y-2 max-h-[300px] overflow-y-auto rounded-md border border-border/50 p-3 ${
              expandedInsights ? 'max-h-[600px]' : ''
            }`}>
              {filteredInsights.slice(0, expandedInsights ? undefined : 8).map((insight) => {
                // Theme-aware semantic classes based on severity
                const getColorClasses = () => {
                  const baseClasses = {
                    bg: '',
                    border: '',
                    text: '',
                    icon: '',
                  };

                  switch (insight.severity) {
                    case 'critical':
                      return {
                        ...baseClasses,
                        bg: 'bg-red-50 dark:bg-red-900/30',
                        border: 'border-red-200 dark:border-red-800',
                        text: 'text-red-800 dark:text-red-200',
                        icon: 'text-red-500 dark:text-red-400',
                      };
                    case 'high':
                      return {
                        ...baseClasses,
                        bg: 'bg-orange-50 dark:bg-orange-900/30',
                        border: 'border-orange-200 dark:border-orange-800',
                        text: 'text-orange-800 dark:text-orange-200',
                        icon: 'text-orange-500 dark:text-orange-400',
                      };
                    case 'medium':
                      return {
                        ...baseClasses,
                        bg: 'bg-amber-50 dark:bg-amber-900/30',
                        border: 'border-amber-200 dark:border-amber-800',
                        text: 'text-amber-800 dark:text-amber-200',
                        icon: 'text-amber-500 dark:text-amber-400',
                      };
                    default:
                      return {
                        ...baseClasses,
                        bg: 'bg-blue-50 dark:bg-blue-900/30',
                        border: 'border-blue-200 dark:border-blue-800',
                        text: 'text-blue-800 dark:text-blue-200',
                        icon: 'text-blue-500 dark:text-blue-400',
                      };
                  }
                };

                const {bg, border, text, icon} = getColorClasses();
                const categoryColor = INSIGHT_CATEGORIES.find(c => c.id === insight.category)?.color || 'bg-gray-50 dark:bg-gray-900/30';

                return (
                  <div
                    key={insight.id}
                    className={`p-3 rounded-lg border ${border} ${bg} ${text} transition-all duration-200 hover:shadow-sm`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {insight.severity === 'critical' && <AlertCircle className={`h-4 w-4 ${icon}`}/>}
                        {insight.severity === 'high' && <span className={`text-lg ${icon}`}>⚠️</span>}
                        {insight.severity === 'medium' && <Lightbulb className={`h-4 w-4 ${icon}`}/>}
                        {insight.severity === 'low' && <Info className={`h-4 w-4 ${icon}`}/>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className={`text-sm font-medium ${text}`}>{insight.word}:</span>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${categoryColor}`}>
                            {insight.category.charAt(0).toUpperCase() + insight.category.slice(1)}
                          </span>
                          <Badge variant="outline"
                                 className={`text-xs ${insight.confidence > 0.8 ? 'border-green-500 text-green-700 dark:text-green-300' : insight.confidence > 0.6 ? 'border-amber-500 text-amber-700 dark:text-amber-300' : 'border-red-500 text-red-700 dark:text-red-300'}`}>
                            {Math.round(insight.confidence * 100)}% confidence
                          </Badge>
                        </div>
                        <p className="text-sm mb-2 break-words">
                          {insight.message}
                        </p>
                        {insight.suggestion && (
                          <div className="mt-2 p-2 bg-background/50 border border-border/50 rounded-md text-sm">
                            <span className="font-medium text-primary">Suggestion:</span> {insight.suggestion}
                          </div>
                        )}
                        {insight.actionItems && insight.actionItems.length > 0 && (
                          <div className="mt-2">
                            <span className="text-xs font-medium text-muted-foreground">Recommended actions:</span>
                            <ul className="mt-1 space-y-1 text-sm">
                              {insight.actionItems.map((action, idx) => (
                                <li key={idx} className="flex items-start gap-1.5">
                                  <span className="text-primary">•</span>
                                  <span>{action}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredInsights.length > 8 && (
              <div className="mt-2 text-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setExpandedInsights(!expandedInsights)}
                  className="text-sm text-primary hover:bg-accent/50"
                >
                  {expandedInsights
                    ? <><ChevronUp className="h-4 w-4 inline mr-1"/> Show fewer insights</>
                    : <><ChevronDownIcon className="h-4 w-4 inline mr-1"/> Show
                      all {filteredInsights.length} insights</>
                  }
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Summary Statistics */}
        {showAdvancedControls && (
          <div className="mt-6 pt-4 border-t border-border/50">
            <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-1.5">
              <Brain className="h-4 w-4 text-indigo-500 dark:text-indigo-400"/>
              Content Analysis Summary
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="bg-card border border-border/50 rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-1">Vocabulary Diversity</p>
                <p className="font-medium text-lg">{((stats?.lexicalDiversity || 0) * 100).toFixed(1)}%</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {stats.lexicalDiversity > 0.6 ? 'Excellent variety' : stats.lexicalDiversity > 0.4 ? 'Good variety' : 'Limited variety'}
                </p>
              </div>
              <div className="bg-card border border-border/50 rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-1">Technical Terms</p>
                <p className="font-medium text-lg">{stats.technicalWords}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {stats.technicalWords > 10 ? 'High technical density' : stats.technicalWords > 5 ? 'Moderate technical density' : 'Low technical density'}
                </p>
              </div>
              <div className="bg-card border border-border/50 rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-1">Complex Words</p>
                <p className="font-medium text-lg">{stats.complexWords}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {stats.complexWords > 15 ? 'May impact readability' : stats.complexWords > 8 ? 'Moderate complexity' : 'Good readability'}
                </p>
              </div>
              <div className="bg-card border border-border/50 rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-1">Average Frequency</p>
                <p className="font-medium text-lg">{stats.avgFrequency}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {stats.avgFrequency > 5 ? 'High repetition' : stats.avgFrequency > 3 ? 'Moderate repetition' : 'Good distribution'}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WordCloudBasic;
