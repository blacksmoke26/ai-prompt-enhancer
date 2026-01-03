/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 *
 * Ultra-Modern Intelligent Word Cloud (Urdu & English)
 * - Glassmorphism UI & Advanced Tooltips
 * - Deep Insights (Passive Voice, Sentiment, POS)
 * - Eye-pleasing Animations & Gradients
 */

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Brain,
  ChevronDown,
  ChevronUp,
  EyeOff,
  FileText,
  Filter,
  Globe,
  Lightbulb,
  Palette,
  Search,
  Sparkles,
  Type,
  XCircle,
  Zap,
} from 'lucide-react';

// utils
import {
  ColorStrategy,
  ColorStrategyOptions,
  defaultConfig,
  detectLanguage,
  FilterOptions,
  Insight,
  interpolateColor,
  LanguageMode,
  ProcessedWord,
  processTextIntelligently,
  WordCloudAdvanceProps,
  WordCloudConfig,
} from '~/utils/word-cloud-advanced';

// ui components
import {Button} from '~/components/ui/Button';
import {Badge} from '~/components/ui/Badge';
import {Input} from '~/components/ui/Input';
import {SelectAdvanced} from '~/components/ui/SelectAdvanced';
import {Card, CardContent, CardHeader, CardTitle} from '~/components/ui/Card';
import {Tooltip, TooltipContent, TooltipTrigger} from '~/components/ui/Tooltip';

/**
 * A React component for rendering an advanced word cloud with customizable configuration and external word frequency data.
 * @example
 * <WordCloudAdvance
 *   text="This is a sample text for the word cloud"
 *   wordFrequency={[{ word: 'sample', frequency: 10 }, { word: 'text', frequency: 5 }]}
 *   showWordCloud={true}
 *   setShowWordCloud={(value) => console.log(value)}
 *   config={{ fontSize: 20, color: 'blue' }}
 * />
 * @developerNotes Designed for flexibility with external word frequency data and state management for visibility toggling.
 * @typedef {Object} WordCloudAdvanceProps
 * @property {string} text - The source text to generate the word cloud from.
 * @property {Array<{word: string, frequency: number}>} [wordFrequency] - Optional list of words with their frequencies.
 * @property {boolean} showWordCloud - Controls the visibility of the word cloud.
 * @property {Function} setShowWordCloud - Function to toggle the visibility of the word cloud.
 * @property {Object} [config] - Custom configuration options for the word cloud (e.g., fontSize, color).
 */
const WordCloudAdvance: React.FC<WordCloudAdvanceProps> = (props) => {
  const {
    text,
    wordFrequency: externalWordFrequency = [],
    showWordCloud,
    setShowWordCloud,
    config: userConfig = {},
  } = props;

  const config: WordCloudConfig = useMemo(() => ({
    ...defaultConfig,
    ...userConfig,
    labels: {...defaultConfig.labels, ...userConfig.labels},
    theme: {...defaultConfig.theme, ...userConfig.theme},
    thresholds: {...defaultConfig.thresholds, ...userConfig.thresholds},
    fontScaling: {...defaultConfig.fontScaling, ...userConfig.fontScaling},
    ui: {...defaultConfig.ui, ...userConfig.ui},
  }), [userConfig]);

  const [languageMode, setLanguageMode] = useState<LanguageMode>('auto');
  const [filterType, setFilterType] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(30);
  const [expandedInsights, setExpandedInsights] = useState(false);
  const [selectedInsightCategory, setSelectedInsightCategory] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const [colorStrategy, setColorStrategy] = useState<ColorStrategy>(config.ui.defaultColorStrategy);
  const [fontScale, setFontScale] = useState(1);

  useEffect(() => {
    if (showWordCloud) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 600);
      return () => clearTimeout(timer);
    }
  }, [showWordCloud]);

  const {processedWords, insights, stats: initialStats} = useMemo(() => {
    if (text) return processTextIntelligently(text, config);
    if (externalWordFrequency.length > 0) {
      const formattedWords: ProcessedWord[] = externalWordFrequency.map((item, index) => ({
        id: `word-${index}`,
        word: item.word,
        root: item.word,
        count: item.count,
        originalForms: [item.word],
        complexity: {score: 0, technicalScore: 0, rarityScore: 0, readabilityScore: 1},
        lang: detectLanguage(item.word),
        length: item.word.length,
        index,
      }));
      return {processedWords: formattedWords, insights: [], stats: {}};
    }
    return {processedWords: [], insights: [], stats: {}};
  }, [text, externalWordFrequency, config]);

  const activeLanguage = useMemo(() => {
    if (languageMode !== 'auto') return languageMode;
    if (processedWords.length === 0) return 'en';
    const urduCount = processedWords.filter(w => w.lang === 'ur').length;
    return urduCount > processedWords.length / 2 ? 'ur' : 'en';
  }, [languageMode, processedWords]);

  const isUrduMode = activeLanguage === 'ur';
  const maxCount = processedWords.length > 0 ? Math.max(...processedWords.map(item => item.count), 1) : 1;
  const avgWordLength = processedWords.length > 0 ? processedWords.reduce((a, b) => a + b.length, 0) / processedWords.length : 0;

  const filteredWords = useMemo(() => {
    return processedWords.filter((item) => {
      const {count, complexity, word, lang} = item;
      const lowerWord = word.toLowerCase();
      const lowerSearch = searchQuery.toLowerCase().trim();

      if (languageMode !== 'auto' && lang !== languageMode) return false;
      if (lowerSearch && !lowerWord.includes(lowerSearch)) return false;

      if (filterType === 'all') return true;
      if (filterType === 'high') return count >= maxCount * config.thresholds.highFreqPercent;
      if (filterType === 'medium') return count >= maxCount * config.thresholds.lowFreqPercent && count < maxCount * config.thresholds.highFreqPercent;
      if (filterType === 'low') return count < maxCount * config.thresholds.lowFreqPercent;
      if (filterType === 'complex') return (complexity?.score ?? 0) > config.thresholds.complexityScore;
      if (filterType === 'technical') return (complexity?.technicalScore ?? 0) > config.thresholds.technicalScore;
      return true;
    });
  }, [processedWords, filterType, maxCount, searchQuery, languageMode, config.thresholds]);

  const totalPages = Math.ceil(filteredWords.length / itemsPerPage);
  const paginatedWords = filteredWords.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const availableCategories = useMemo(() => {
    const cats = new Set(insights.map(i => i.category));
    return ['All', ...Array.from(cats)];
  }, [insights]);

  const filteredInsights = useMemo(() => {
    let result = insights;
    const currentCat = selectedInsightCategory || 'All';
    if (currentCat !== 'All') result = result.filter(insight => insight.category === currentCat);
    const severityOrder = {'critical': 0, 'high': 1, 'medium': 2, 'low': 3, 'info': 4};
    return [...result].sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);
  }, [insights, selectedInsightCategory]);

  const stats = useMemo(() => {
    const totalWords = filteredWords.length;
    const uniqueWords = new Set(filteredWords.map(w => w.word.toLowerCase())).size;
    const avgFrequency = totalWords > 0 ? filteredWords.reduce((sum, w) => sum + w.count, 0) / totalWords : 0;

    return {
      ...initialStats,
      totalWords,
      uniqueWords,
      avgFrequency: Math.round(avgFrequency * 10) / 10,
      technicalWords: filteredWords.filter(w => (w.complexity?.technicalScore || 0) > config.thresholds.technicalScore).length,
      complexWords: filteredWords.filter(w => (w.complexity?.rarityScore || 0) > config.thresholds.complexityScore).length,
      lexicalDiversity: totalWords > 0 ? uniqueWords / totalWords : 0,
    };
  }, [filteredWords, initialStats, config.thresholds]);

  const getWordColor = useCallback((item: ProcessedWord): string => {
    const {theme} = config;
    const {count, complexity, sentiment, lang} = item;
    const ratio = count / maxCount;

    switch (colorStrategy) {
      case 'heat':
        return interpolateColor(theme.heatStart, theme.heatEnd, ratio);
      case 'complexity':
        if ((complexity?.technicalScore || 0) > config.thresholds.technicalScore) return theme.technicalColor;
        if ((complexity?.rarityScore || 0) > config.thresholds.complexityScore) return theme.rareColor;
        return interpolateColor(theme.heatStart, theme.heatEnd, ratio);
      case 'sentiment': // New Strategy
        if (sentiment === 'positive') return theme.sentimentPos;
        if (sentiment === 'negative') return theme.sentimentNeg;
        return lang === 'ur' ? theme.heatStart : 'hsl(215, 20%, 60%)';
      case 'language':
        return lang === 'ur' ? theme.urduColor : theme.englishColor;
      default:
        return 'text-foreground';
    }
  }, [colorStrategy, maxCount, config]);

  if (!showWordCloud) return null;

  // --- Helper for Insight Styling ---
  const getInsightStyle = (severity: Insight['severity']) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-50/80 border-red-200 text-red-900 dark:bg-red-950/40 dark:border-red-900 dark:text-red-200';
      case 'high':
        return 'bg-orange-50/80 border-orange-200 text-orange-900 dark:bg-orange-950/40 dark:border-orange-900 dark:text-orange-200';
      case 'medium':
        return 'bg-blue-50/80 border-blue-200 text-blue-900 dark:bg-blue-950/40 dark:border-blue-900 dark:text-blue-200';
      case 'low':
        return 'bg-slate-50/80 border-slate-200 text-slate-900 dark:bg-slate-900/40 dark:border-slate-700 dark:text-slate-200';
      case 'info':
        return 'bg-indigo-50/80 border-indigo-200 text-indigo-900 dark:bg-indigo-950/40 dark:border-indigo-900 dark:text-indigo-200';
      default:
        return '';
    }
  };

  return (
    <Card
      className={`mb-6 border-border/40 shadow-lg backdrop-blur-xl bg-card/95 transition-all duration-700 ${isAnimating ? 'animate-in fade-in slide-in-from-bottom-8' : ''}`}
      dir={isUrduMode ? 'rtl' : 'ltr'}>
      <CardHeader className="pb-4 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="p-2.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-md shadow-indigo-500/20 text-white">
              <Brain className={`h-6 w-6 ${isUrduMode ? 'rotate-180' : ''}`}/>
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2 tracking-tight">
                {isUrduMode ? config.labels.title.ur : config.labels.title.en}
                {config.ui.showWordCountBadge && insights.length > 0 && (
                  <Badge
                    className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border-indigo-200 dark:bg-indigo-900/50 dark:text-indigo-100 dark:border-indigo-800 animate-pulse">
                    <Sparkles className="h-3 w-3 mr-1"/> {insights.length} Insights
                  </Badge>
                )}
              </CardTitle>
              <p className="text-sm text-muted-foreground font-medium flex items-center gap-2">
                <Globe className="h-3 w-3 opacity-70"/>
                {stats.totalWords} words • {stats.uniqueWords} unique • {stats.sentenceCount} sentences
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex bg-muted/80 rounded-lg p-1 border border-border shadow-inner">
              <Button size="sm" variant={activeLanguage === 'en' ? 'default' : 'ghost'}
                      className="h-8 w-8 p-0 text-xs font-bold rounded-md"
                      onClick={() => setLanguageMode(activeLanguage === 'en' ? 'auto' : 'en')}>EN</Button>
              <Button size="sm" variant={activeLanguage === 'ur' ? 'default' : 'ghost'}
                      className="h-8 w-8 p-0 text-xs font-bold rounded-md"
                      onClick={() => setLanguageMode(activeLanguage === 'ur' ? 'auto' : 'ur')}>اردو</Button>
            </div>
            <Button variant="ghost" size="icon"
                    className="rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors"
                    onClick={() => setShowWordCloud(false)}><EyeOff className="h-4 w-4"/></Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6 space-y-6">
        {/* Controls Toolbar */}
        <div
          className="flex flex-col xl:flex-row gap-4 items-start xl:items-center justify-between bg-muted/40 p-3 rounded-xl border border-border/50 backdrop-blur-sm">
          <div className="relative w-full xl:w-1/3 group">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors"/>
            <Input
              placeholder={isUrduMode ? config.labels.searchPlaceholder.ur : config.labels.searchPlaceholder.en}
              value={searchQuery} onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
              className={`pl-9 pr-8 transition-all focus:ring-2 focus:ring-primary/20 border-border/50 ${isUrduMode ? 'font-urdu text-right' : ''}`}/>
            {searchQuery && <Button variant="ghost" size="sm" onClick={() => setSearchQuery('')}
                                    className="absolute right-1 top-1 h-7 w-7 p-0 text-muted-foreground hover:text-foreground"><XCircle
              className="h-4 w-4"/></Button>}
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
            <div className="flex items-center shadow-sm">
              <SelectAdvanced
                icon={<Filter className="h-4 w-4 text-muted-foreground"/>}
                options={FilterOptions}
                triggerWidth="160px"
                value={filterType}
                onChange={(v: any) => setFilterType(v)}/>
            </div>
            <div className="flex items-center shadow-sm">
              <SelectAdvanced
                icon={<Palette className="h-4 w-4 text-muted-foreground"/>}
                options={ColorStrategyOptions} value={colorStrategy} onChange={(v: any) => setColorStrategy(v)}/>
            </div>
            <div
              className="flex items-center gap-2 bg-background border border-border rounded-lg px-3 py-1.5 shadow-sm">
              <Type className="h-4 w-4 text-muted-foreground"/>
              <input type="range" min="0.5" max="2" step="0.1" value={fontScale}
                     onChange={(e) => setFontScale(parseFloat(e.target.value))}
                     className="w-24 h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"/>
            </div>
          </div>
        </div>

        {/* Pagination */}
        {config.ui.showPagination && totalPages > 1 && (
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span>Showing {Math.min(filteredWords.length, currentPage * itemsPerPage) - (currentPage - 1) * itemsPerPage} - {Math.min(filteredWords.length, currentPage * itemsPerPage)} of {filteredWords.length}</span>
            <div className="flex gap-1">
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-lg"
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>{isUrduMode ?
                <ArrowRight className="h-4 w-4"/> : <ArrowLeft className="h-4 w-4"/>}</Button>
              <span className="flex items-center px-2 font-bold text-foreground">{currentPage} / {totalPages}</span>
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-lg"
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}>{isUrduMode ? <ArrowLeft className="h-4 w-4"/> :
                <ArrowRight className="h-4 w-4"/>}</Button>
            </div>
          </div>
        )}

        {/* Word Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {paginatedWords.map((item, idx) => {
            const baseSize = config.fontScaling.min + ((item.count / maxCount) * (config.fontScaling.max - config.fontScaling.min));
            const fontSize = Math.max(10, baseSize * fontScale);
            const color = getWordColor(item);
            const delay = (idx % itemsPerPage) * 40;

            return (
              <Tooltip key={item.id} delayDuration={100}>
                <TooltipTrigger asChild>
                  <div
                    className="group relative flex flex-col items-center justify-center p-4 bg-card rounded-2xl border border-border/60 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer overflow-hidden">
                    {/* Background Gradient Hover Effect */}
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>

                    <span
                      className={`font-bold text-center break-words w-full z-10 transition-colors duration-300 ${isUrduMode ? 'font-urdu' : ''}`}
                      style={{fontSize: `${fontSize}px`, color}}>
                      {item.word}
                    </span>

                    <Badge variant="secondary"
                           className="mt-2 text-[10px] font-bold h-5 px-2 bg-muted/80 border-border z-10">{item.count}</Badge>

                    {/* Sentiment Indicator Dot */}
                    <div
                      className={`absolute top-2 right-2 w-2 h-2 rounded-full z-20 transition-transform group-hover:scale-150 ${
                        item.sentiment === 'positive' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]' :
                          item.sentiment === 'negative' ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]' : 'bg-transparent'
                      }`}/>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top"
                                className="w-80 p-0 overflow-hidden rounded-xl border-0 shadow-2xl bg-background/95 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200">
                  <div className="p-4 space-y-3 relative">
                    {/* Header Gradient Bar */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600"/>

                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-bold text-foreground leading-tight">{item.word}</h4>
                        <span
                          className="text-xs text-muted-foreground uppercase tracking-wider mt-1 block">Root: {item.root}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-black text-primary">{item.count}</span>
                        <span className="block text-[10px] text-muted-foreground">Uses</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-border/50">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-6 h-6 rounded flex items-center justify-center font-bold bg-muted ${item.sentiment === 'positive' ? 'text-emerald-600' : item.sentiment === 'negative' ? 'text-rose-600' : 'text-slate-500'}`}>
                          {item.sentiment === 'positive' ? '+' : item.sentiment === 'negative' ? '–' : '•'}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-muted-foreground">Sentiment</span>
                          <span className="font-semibold capitalize">{item.sentiment}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded flex items-center justify-center font-bold bg-muted text-slate-600">
                          {item.pos?.substring(0, 1).toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-muted-foreground">Part of Speech</span>
                          <span className="font-semibold capitalize">{item.pos || 'Unknown'}</span>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                          <span>Length ({item.length} chars)</span>
                          <span>Avg is {Math.round(avgWordLength)} chars</span>
                        </div>
                        <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-400 to-purple-500"
                            style={{width: `${Math.min(100, (item.length / avgWordLength) * 50)}%`}}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>

        {/* Insights Panel */}
        {config.ui.showInsights && insights.length > 0 && (
          <div
            className="mt-8 p-6 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-2xl border border-indigo-100/50 dark:border-indigo-900/50 shadow-sm animate-in fade-in slide-in-from-bottom-4 delay-100">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div
                  className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg text-indigo-600 dark:text-indigo-300">
                  <Lightbulb className="h-5 w-5"/>
                </div>
                <h3
                  className="text-lg font-bold text-foreground tracking-tight">{isUrduMode ? config.labels.insights.ur : config.labels.insights.en}</h3>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0 no-scrollbar w-full sm:w-auto">
                {availableCategories.map(cat => (
                  <Button key={cat}
                          variant={(!selectedInsightCategory && cat === 'All') || selectedInsightCategory === cat ? 'default' : 'ghost'}
                          size="sm" onClick={() => setSelectedInsightCategory(cat === 'All' ? null : cat)}
                          className="text-xs h-8 rounded-full">
                    {cat}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid gap-3">
              {filteredInsights.slice(0, expandedInsights ? undefined : 3).map(insight => (
                <div key={insight.id}
                     className={`p-4 rounded-xl border backdrop-blur-sm transition-all hover:shadow-md ${getInsightStyle(insight.severity)}`}>
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 p-1.5 rounded-md bg-black/5 dark:bg-white/10 text-[10px] font-bold uppercase tracking-wider shadow-sm border border-black/5 dark:border-white/5`}>
                      {insight.category}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-sm">{insight.word}</span>
                        <Badge variant="outline"
                               className="text-[10px] h-4 px-1 border-current/30">{Math.round(insight.confidence * 100)}%</Badge>
                      </div>
                      <p className="text-sm leading-relaxed opacity-90">{insight.message}</p>
                      {insight.suggestion && (
                        <div
                          className="mt-2 text-xs bg-black/5 dark:bg-white/10 p-2 rounded border border-black/5 dark:border-white/5 inline-block">
                          <span className="font-bold opacity-70 mr-1">Tip:</span>{insight.suggestion}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {filteredInsights.length > 3 && (
              <div className="mt-4 text-center">
                <Button variant="ghost" size="sm" onClick={() => setExpandedInsights(!expandedInsights)}
                        className="text-xs font-medium">
                  {expandedInsights ? <>Show Less <ChevronUp className="h-3 w-3 ml-1"/></> : <>Show All
                    ({filteredInsights.length}) <ChevronDown className="h-3 w-3 ml-1"/></>}
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Advanced Stats Grid */}
        {config.ui.showStats && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
            {[
              {
                label: config.labels.stats.lexicalDiversity,
                val: `${(stats.lexicalDiversity * 100).toFixed(0)}%`,
                icon: BarChart3,
                color: 'text-blue-500',
              },
              {
                label: config.labels.stats.technicalTerms,
                val: stats.technicalWords,
                icon: Zap,
                color: 'text-purple-500',
              },
              {label: config.labels.stats.complexWords, val: stats.complexWords, icon: Brain, color: 'text-pink-500'},
              {
                label: config.labels.stats.avgFrequency,
                val: stats.avgFrequency.toFixed(1),
                icon: FileText,
                color: 'text-orange-500',
              },
              {
                label: config.labels.stats.readingTime,
                val: `${Math.ceil(stats.readingTime || 0)}m`,
                icon: Globe,
                color: 'text-emerald-500',
              },
              {
                label: config.labels.stats.sentiment,
                val: stats.positiveWords > stats.negativeWords ? 'Positive' : stats.negativeWords > stats.positiveWords ? 'Negative' : 'Neutral',
                icon: Lightbulb,
                color: stats.positiveWords > stats.negativeWords ? 'text-emerald-500' : stats.negativeWords > stats.positiveWords ? 'text-rose-500' : 'text-slate-500',
              },
            ].map((stat, i) => (
              <div key={i}
                   className="group bg-card p-4 rounded-xl border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center text-center space-y-2">
                <div
                  className={`p-3 rounded-full bg-muted group-hover:scale-110 transition-transform duration-300 ${stat.color}`}>
                  <stat.icon className="h-5 w-5"/>
                </div>
                <div className="space-y-0.5">
                  <p className="text-xl font-bold text-foreground tracking-tight">{stat.val}</p>
                  <p
                    className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wide">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WordCloudAdvance;
