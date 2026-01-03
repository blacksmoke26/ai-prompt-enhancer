/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {ChangeEvent, useMemo, useState} from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileText,
  Filter,
  Hash,
  Info,
  Layers,
  Loader2,
  Quote,
  Replace,
  Search,
  Type,
  XCircle,
  Zap as Bolt,
} from 'lucide-react';
import {
  AdvancedWordAnalysisProps,
  AnalysisResult,
  DEFAULT_VOCAB_EN,
  FilterType,
  Language,
  processAdvancedText,
  SentimentType,
  SidebarTab,
  URDU_SIMPLIFICATIONS,
  WordMetadata,
  WordType,
} from '~/utils/advanced-word-analysis';
import DonutChart from './DonutChart';
import RadarChart from './RadarChart';
import WordPill from './WordPill';

const AdvancedWordAnalysis: React.FC<AdvancedWordAnalysisProps> = (props) => {
  const {
    text,
    language = Language.English,
    config,
  } = props;

  // Auto-detect Urdu if the text contains Urdu script characters and language is default English
  // This allows parsing Urdu words even if the language prop is not explicitly set
  const detectedLanguage = (language === Language.English && text && /[\u0600-\u06FF]/.test(text)) ? Language.Urdu : language;
  const isUrdu = detectedLanguage === Language.Urdu;

  const {
    defaultSidebarTab = SidebarTab.Overview,
    enabledTabs = [SidebarTab.Overview, SidebarTab.Composition, SidebarTab.Entities, SidebarTab.Insights],
    enableRewrite = true,
    maxWords = 2000,
    customVocabulary,
  } = config || {};

  const [selectedWord, setSelectedWord] = useState<WordMetadata | null>(null);
  const [filter, setFilter] = useState<FilterType>(FilterType.All);
  const [search, setSearch] = useState('');
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [activeSidebarTab, setActiveSidebarTab] = useState<SidebarTab>(defaultSidebarTab);
  const [isRewriting, setIsRewriting] = useState(false);
  const [rewriteSuccess, setRewriteSuccess] = useState(false);

  // Pass detectedLanguage to the processor
  const analysis: AnalysisResult = useMemo(() => processAdvancedText(text || '', maxWords, detectedLanguage, customVocabulary), [text, maxWords, detectedLanguage, customVocabulary]);

  const filteredWords: WordMetadata[] = useMemo(() => {
    return analysis.words.filter(w => {
      if (search && !w.word.toLowerCase().includes(search.toLowerCase())) return false;
      if (filter === FilterType.All) return true;
      if (filter === FilterType.StopWords) return w.isStopWord;
      if (filter === FilterType.Unique) return w.count === 1 && !w.isStopWord;
      if (filter === FilterType.Common) return w.frequency > 0.01 && !w.isStopWord;
      if (filter === FilterType.Long) return w.word.length > 8 && !w.isStopWord;
      if (filter === FilterType.Short) return w.word.length < 4 && !w.isStopWord;
      if (filter === FilterType.Technical) return w.complexity.factors.technical > 0.5 && !w.isStopWord;
      if (filter === FilterType.Complex) return w.complexity.factors.rarity > 0.7 && !w.isStopWord;
      if (filter === FilterType.Positive) return w.sentiment === SentimentType.Positive && !w.isStopWord;
      if (filter === FilterType.Negative) return w.sentiment === SentimentType.Negative && !w.isStopWord;
      if (filter === FilterType.Noun) return w.type === WordType.Noun && !w.isStopWord;
      if (filter === FilterType.Verb) return w.type === WordType.Verb && !w.isStopWord;
      if (filter === FilterType.Adjective) return w.type === WordType.Adjective && !w.isStopWord;
      return true;
    });
  }, [analysis.words, filter, search]);

  const handleRewrite = () => {
    if (!selectedWord || !enableRewrite) return;
    setIsRewriting(true);
    setRewriteSuccess(false);
    setTimeout(() => {
      setIsRewriting(false);
      setRewriteSuccess(true);
      setTimeout(() => setRewriteSuccess(false), 3000);
    }, 1500);
  };

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value as FilterType);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  if (!text) {
    return (
      <div
        className="flex flex-col items-center justify-center p-20 border-2 border-dashed border-gray-800 rounded-3xl bg-gray-900/30 min-h-[600px]">
        <FileText className="w-16 h-16 text-gray-700 mb-4"/>
        <p
          className={`text-xl text-gray-500 font-medium ${isUrdu ? 'urdu-font' : ''}`}>{isUrdu ? 'انتظار فرمایں' : 'Awaiting Input'}</p>
        <p
          className="text-sm text-gray-600">{isUrdu ? 'متن پیسٹ کریں' : 'Paste text to activate Deep Linguistic Analysis'}</p>
      </div>
    );
  }

  return (
    <div
      className={`w-full h-[calc(100vh-4rem)] flex gap-4 p-4 bg-gray-950 text-gray-100 font-sans relative overflow-hidden ${isUrdu ? 'urdu-font' : ''}`}
      dir={isUrdu ? 'rtl' : 'ltr'}>

      <div
        className={`relative flex items-stretch transition-all duration-500 ease-in-out ${isPanelOpen ? 'w-80' : 'w-0'}`}>
        <div
          className={`w-80 bg-gray-900 border-r border-gray-800 flex flex-col gap-3 overflow-hidden transition-all duration-500 ${isPanelOpen ? 'opacity-100' : 'opacity-0 translate-x-[-20px]'}`}>
          {enabledTabs.length > 1 && (
            <div className="flex border-b border-gray-800">
              {enabledTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveSidebarTab(tab)}
                  className={`flex-1 py-3 text-[10px] uppercase font-bold tracking-wider transition-colors ${
                    activeSidebarTab === tab ? 'text-indigo-400 border-b-2 border-indigo-500 bg-gray-800/30' : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800/20'
                  }`}
                >
                  {isUrdu ? (tab === SidebarTab.Overview ? 'خلاصہ' : tab === SidebarTab.Composition ? 'تشکیل' : tab) : tab}
                </button>
              ))}
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-6">
            {activeSidebarTab === SidebarTab.Overview && (
              <>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                      <p className="text-[10px] text-gray-500">{isUrdu ? 'پڑھنے کا وقت' : 'Reading Time'}</p>
                      <p className="text-2xl font-bold text-white">{analysis.stats.readingTime}<span
                        className="text-xs text-gray-500">{isUrdu ? 'م' : 'm'}</span></p>
                    </div>
                    <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                      <p className="text-[10px] text-gray-500">{isUrdu ? 'الفاظ' : 'Words'}</p>
                      <p className="text-2xl font-bold text-white">{analysis.stats.totalWords}</p>
                    </div>
                  </div>
                  <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                    <p
                      className="text-[10px] text-gray-500 mb-1">{isUrdu ? 'لغوی بہتری (TTR)' : 'Lexical Diversity'}</p>
                    <div className="flex items-end justify-between">
                      <p className="text-xl font-bold text-indigo-400">{(analysis.stats.ttr * 100).toFixed(0)}%</p>
                      <span
                        className={`text-[10px] font-bold ${analysis.stats.ttr > 0.5 ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {analysis.stats.ttr > 0.5 ? (isUrdu ? 'بہتر' : 'Rich') : (isUrdu ? 'محدود' : 'Limited')}
                      </span>
                    </div>
                    <div className="h-1 bg-gray-800 rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-indigo-500" style={{width: `${analysis.stats.ttr * 100}%`}}/>
                    </div>
                  </div>
                  <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                    <p className="text-[10px] text-gray-500 mb-1">{isUrdu ? 'اوسط ہجے' : 'Avg Syllables/Word'}</p>
                    <p className="text-xl font-bold text-white">{analysis.stats.avgSyllablesPerWord.toFixed(2)}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3
                    className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{isUrdu ? 'AI تجزیات' : 'AI Insights'}</h3>
                  {analysis.insights.slice(0, 3).map((insight) => (
                    <div key={insight.id} className={`text-[11px] border-l-2 p-3 bg-gray-800/20 rounded-r ${
                      insight.type === 'warning' ? 'border-amber-500/50 text-amber-200' :
                        insight.type === 'critical' ? 'border-red-500/50 text-red-200' :
                          insight.type === 'success' ? 'border-emerald-500/50 text-emerald-200' : 'border-blue-500/50 text-blue-200'
                    }`}>
                      <div className="flex items-center gap-1.5 mb-1 opacity-70">
                        {insight.type === 'warning' ? <AlertTriangle size={12}/> :
                          insight.type === 'critical' ? <AlertOctagon size={12}/> :
                            insight.type === 'success' ? <CheckCircle2 size={12}/> : <Info size={12}/>}
                        <span className="uppercase font-bold text-[8px] tracking-wider">{insight.category}</span>
                      </div>
                      <p className={`leading-relaxed ${isUrdu ? 'text-right' : ''}`}>{insight.message}</p>
                      {insight.suggestion && <p
                        className={`mt-1 text-[9px] opacity-70 italic ${isUrdu ? 'text-right' : ''}`}>{insight.suggestion}</p>}
                    </div>
                  ))}
                  {analysis.insights.length > 3 && (
                    <button onClick={() => setActiveSidebarTab(SidebarTab.Insights)}
                            className="text-xs text-indigo-400 hover:underline">
                      {isUrdu ? `تم ${analysis.insights.length} تجزیات دیکھیں` : `View all ${analysis.insights.length} insights`}
                    </button>
                  )}
                </div>
              </>
            )}

            {activeSidebarTab === SidebarTab.Composition && (
              <>
                <div className="flex flex-col items-center py-4">
                  <DonutChart data={analysis.stats.posDistribution}/>
                </div>
                <div className="space-y-3">
                  <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                    <p className="text-[10px] text-gray-500">{isUrdu ? 'گریڈ لول' : 'Grade Level (ARI)'}</p>
                    <p className="text-lg font-bold text-white">{analysis.stats.gradeLevel}</p>
                    <p
                      className="text-[9px] text-gray-600 mt-1">{isUrdu ? 'پڑھنے کی آسانی' : 'Automated Readability Index'}</p>
                  </div>
                  <div>
                    <p
                      className="text-[10px] text-gray-500 mb-2">{isUrdu ? 'جملوں کی لمبائی' : 'Sentence Length Flow'}</p>
                    <div className="flex items-end gap-1 h-20 w-full px-1">
                      {analysis.stats.sentenceLengths.slice(0, 30).map((len, i) => (
                        <div key={i}
                             className="flex-1 bg-indigo-900/40 hover:bg-indigo-500/60 transition-colors rounded-sm relative group"
                             style={{height: `${Math.min((len / 50) * 100, 100)}%`}}>
                          <div
                            className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 text-[9px] bg-black px-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-10">{len}w
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeSidebarTab === SidebarTab.Entities && (
              <>
                <div className="space-y-4">
                  <div>
                    <h3
                      className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">{isUrdu ? 'جذباتی اشارے' : 'Sentiment Drivers'}</h3>
                    {analysis.stats.sentimentDrivers.length === 0 ? (
                      <p
                        className="text-xs text-gray-600 italic">{isUrdu ? 'کوئی خاص جذباتی الفاظ نہیں ملتے۔' : 'No strong sentiment words found.'}</p>
                    ) : (
                      <div className="space-y-2">
                        {analysis.stats.sentimentDrivers.map((driver) => (
                          <div key={driver.word}
                               className="flex items-center justify-between p-2 rounded-lg bg-gray-950 border border-gray-800">
                            <div className="flex items-center gap-2">
                              <div
                                className={`p-1 rounded ${driver.type === 'positive' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                                {driver.type === 'positive' ? <Bolt size={12}/> : <AlertTriangle size={12}/>}
                              </div>
                              <span className="text-sm font-medium">{driver.word}</span>
                            </div>
                            <span className="text-xs text-gray-500 font-mono">{driver.count}x</span>
                          </div>
                        ))}
                      </div>
                    )
                    }
                  </div>
                  <div>
                    <h3
                      className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">{isUrdu ? 'اہم موضوعات' : 'Key Topics'}</h3>
                    <div className="flex flex-wrap gap-2">
                      {analysis.stats.topKeywords.map((k) => (
                        <span key={k}
                              className="px-2 py-1 bg-indigo-900/20 border border-indigo-500/30 rounded text-xs text-indigo-300">{k}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeSidebarTab === SidebarTab.Insights && (
              <div className="space-y-3">
                {analysis.insights.map((insight) => (
                  <div key={insight.id} className={`p-3 border border-l-4 rounded-lg ${
                    insight.type === 'warning' ? 'border-amber-500 bg-amber-900/10' :
                      insight.type === 'critical' ? 'border-red-500 bg-red-900/10' :
                        insight.type === 'success' ? 'border-emerald-500 bg-emerald-900/10' : 'border-blue-500 bg-blue-900/10'
                  }`}>
                    <div className="flex items-center gap-2 mb-1">
                      {insight.type === 'warning' ? <AlertTriangle size={14} className="text-amber-500"/> :
                        insight.type === 'critical' ? <AlertOctagon size={14} className="text-red-500"/> :
                          insight.type === 'success' ? <CheckCircle2 size={14} className="text-emerald-500"/> :
                            <Info size={14} className="text-blue-500"/>}
                      <span
                        className="text-xs font-bold uppercase tracking-wider text-gray-400">{insight.category}</span>
                    </div>
                    <p className="text-sm font-medium mb-1">{insight.message}</p>
                    {insight.suggestion && (
                      <p className={`text-xs text-gray-400 pl-6 flex gap-1 ${isUrdu ? 'text-right' : ''}`}>
                        <ArrowRight size={12} className={`shrink-0 mt-0.5 ${isUrdu ? 'rotate-180' : ''}`}/>
                        {insight.suggestion}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <button onClick={() => setIsPanelOpen(!isPanelOpen)}
                className="absolute -right-3 top-1/2 -translate-y-1/2 z-50 bg-gray-800 border border-gray-600 p-1.5 rounded-full hover:bg-indigo-600 hover:border-indigo-500 transition-all shadow-xl group">
          {isPanelOpen ? <ChevronLeft size={14} className="text-gray-300 group-hover:text-white"/> :
            <ChevronRight size={14} className="text-gray-300 group-hover:text-white"/>}
        </button>
      </div>

      <div
        className="flex-1 lg:min-w-[500px] bg-gray-900/50 border border-gray-800 rounded-2xl shadow-inner flex flex-col relative overflow-hidden min-h-0">
        <div
          className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-gray-900 border-b border-gray-800 z-10">
          <div className="flex items-center gap-2 text-gray-200">
            <Layers className="text-indigo-500" size={20}/>
            <h1 className="font-semibold tracking-tight">{isUrdu ? 'لفظوں کا نقشہ' : 'Word Map'}</h1>
            <span className="text-xs text-gray-600 bg-gray-800 px-2 py-0.5 rounded-full">{filteredWords.length}</span>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative group">
              <Search
                className={`absolute ${isUrdu ? 'right-2.5' : 'left-2.5'} top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 group-focus-within:text-indigo-400 transition-colors`}/>
              <input
                type="text"
                placeholder={isUrdu ? 'تلاش...' : 'Search...'}
                value={search}
                onChange={handleSearchChange}
                className={`bg-gray-950 border border-gray-800 text-gray-300 text-xs rounded-lg ${isUrdu ? 'pr-9 pl-3' : 'pl-8 pr-3'} py-1.5 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 w-full sm:w-40 transition-all`}
              />
            </div>
            <div className="relative">
              <Filter
                className={`absolute ${isUrdu ? 'right-2' : 'left-2'} top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500 pointer-events-none`}/>
              <select value={filter} onChange={handleFilterChange}
                      className={`appearance-none bg-gray-950 border border-gray-800 text-gray-300 text-xs rounded-lg ${isUrdu ? 'pl-3 pr-8' : 'pl-7 pr-7'} py-1.5 focus:outline-none focus:border-indigo-500 cursor-pointer hover:bg-gray-800 transition-colors`}>
                {/* General */}
                <option value={FilterType.All}>{isUrdu ? 'تم الفاظ' : 'All Words'}</option>
                <option value={FilterType.StopWords}>{isUrdu ? 'رکاوٹ الفاظ' : 'Stopwords Only'}</option>
                <optgroup label={isUrdu ? 'تعداد' : 'Frequency'}>
                  <option value={FilterType.Unique}>{isUrdu ? 'نایاب' : 'Unique'}</option>
                  <option value={FilterType.Common}>{isUrdu ? 'عام' : 'Common'}</option>
                </optgroup>
                <optgroup label={isUrdu ? 'ساخت' : 'Structure'}>
                  <option value={FilterType.Long}>{isUrdu ? 'لمبے' : 'Long Words'}</option>
                  <option value={FilterType.Short}>{isUrdu ? 'چھوٹے' : 'Short Words'}</option>
                  <option value={FilterType.Technical}>{isUrdu ? 'پیچیدہ' : 'Complex/Tech'}</option>
                </optgroup>
                <optgroup label={isUrdu ? 'جذبات' : 'Sentiment'}>
                  <option value={FilterType.Positive}>{isUrdu ? 'مثبت' : 'Positive'}</option>
                  <option value={FilterType.Negative}>{isUrdu ? 'منفی' : 'Negative'}</option>
                </optgroup>
                <optgroup label={isUrdu ? 'حصے' : 'Part of Speech'}>
                  <option value={FilterType.Noun}>{isUrdu ? 'نام' : 'Nouns'}</option>
                  <option value={FilterType.Verb}>{isUrdu ? 'فعل' : 'Verbs'}</option>
                  <option value={FilterType.Adjective}>{isUrdu ? 'صفت' : 'Adjectives'}</option>
                </optgroup>
              </select>
              <ChevronDown
                className={`absolute ${isUrdu ? 'left-2' : 'right-2'} top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500 pointer-events-none`}/>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-6 relative z-0 custom-scrollbar">
          <div className="flex flex-wrap gap-3 justify-center content-start items-baseline min-h-full">
            {filteredWords.length === 0 ? (
              <div className="flex flex-col items-center justify-center w-full h-48 text-gray-600"><Hash
                className="w-8 h-8 mb-2 opacity-50"/><p
                className="text-sm">{isUrdu ? 'کوئی لفظ نہیں ملا' : 'No words match your criteria'}</p>
                <button onClick={() => {
                  setSearch('');
                  setFilter(FilterType.All);
                }}
                        className="text-xs text-indigo-400 mt-2 hover:underline">{isUrdu ? 'فلٹر صاف کریں' : 'Reset filters'}</button>
              </div>
            ) : (
              filteredWords.map((w) => (
                <WordPill key={w.id} word={w.word} data={w} isSelected={selectedWord?.id === w.id}
                          onClick={setSelectedWord} lang={detectedLanguage}/>))
            )}
            <div className="h-20 w-full"/>
          </div>
        </div>
      </div>

      {selectedWord && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={(e) => e.target === e.currentTarget && setSelectedWord(null)}>
          <div
            className="bg-gray-900 border border-gray-700 w-full max-w-4xl rounded-xl shadow-2xl flex flex-col max-h-[75vh] overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
            <div className="px-6 py-4 bg-gray-800/50 border-b border-gray-700 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20"><Type
                  className="text-indigo-400 w-5 h-5"/></div>
                <div><p
                  className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">{isUrdu ? 'منتخب لفظ' : 'Selected Term'}</p>
                  <h2 className="text-2xl font-bold text-white">{selectedWord.word}</h2></div>
                <div className="ml-4 flex gap-2"><span
                  className={`px-2 py-0.5 rounded text-[10px] border ${selectedWord.sentiment === SentimentType.Positive ? 'bg-emerald-900/30 text-emerald-400 border-emerald-800' : selectedWord.sentiment === SentimentType.Negative ? 'bg-rose-900/30 text-rose-400 border-rose-800' : 'bg-gray-800 text-gray-400 border-gray-700'}`}>{selectedWord.sentiment}</span><span
                  className="px-2 py-0.5 rounded text-[10px] bg-gray-800 text-gray-400 border border-gray-700">{selectedWord.type}</span>
                </div>
              </div>
              <button onClick={() => setSelectedWord(null)}
                      className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
                <XCircle className="w-5 h-5"/></button>
            </div>
            <div className="flex flex-col md:flex-row overflow-hidden">
              <div
                className="md:w-1/3 border-r border-gray-800 p-6 flex flex-col items-center justify-center bg-gray-900/30">
                <p
                  className="text-[10px] text-gray-500 font-mono uppercase mb-4">{isUrdu ? 'پیچیدگی ویکٹر' : 'Complexity Vector'}</p>
                <RadarChart data={selectedWord.complexity.factors}/>
                <div className="mt-4 w-full flex justify-between items-center px-4 bg-gray-800/50 rounded-lg py-2"><span
                  className="text-xs text-gray-400">{isUrdu ? 'اوسط' : 'Overall'}</span><span
                  className="text-lg font-bold text-indigo-400">{Math.round(selectedWord.complexity.score)}</span></div>
              </div>
              <div className="md:w-2/3 p-6 overflow-y-auto custom-scrollbar bg-gray-900/80">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="col-span-2 md:col-span-1">
                    <h3
                      className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Replace className="w-3 h-3"/> {isUrdu ? 'بدلاؤ' : 'Replacements'}</h3>
                    {/* TS18048 FIX: Safe access to simplifications */}
                    {customVocabulary?.simplifications?.[selectedWord.originalWord] || DEFAULT_VOCAB_EN.simplifications[selectedWord.originalWord] || URDU_SIMPLIFICATIONS[selectedWord.originalWord] ? (
                      <div
                        className="space-y-1.5">{(customVocabulary?.simplifications?.[selectedWord.originalWord] || DEFAULT_VOCAB_EN.simplifications[selectedWord.originalWord] || URDU_SIMPLIFICATIONS[selectedWord.originalWord])?.map((s, i) => (
                        <button key={i} onClick={handleRewrite}
                                className="w-full text-left px-3 py-2 bg-gray-800 hover:bg-indigo-900/30 border border-gray-700 hover:border-indigo-500/50 rounded text-xs text-gray-300 transition-all flex justify-between items-center group">
                          <span>{s}</span>
                          {isRewriting ?
                            <Loader2 size={10} className="animate-spin text-indigo-400"/> : rewriteSuccess ?
                              <CheckCircle2 size={10} className="text-emerald-400"/> :
                              <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 text-gray-500"/>}
                        </button>
                      ))}</div>
                    ) : (
                      <div className="p-3 bg-gray-800/30 rounded border border-dashed border-gray-700 text-center">
                        <p
                          className="text-[10px] text-gray-500 italic">{isUrdu ? 'کوئی مشورہ دستیاب نہیں' : 'No suggestions found'}</p>
                      </div>
                    )}
                  </div>
                  <div className="col-span-2 md:col-span-1 space-y-3">
                    <div>
                      <p
                        className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">{isUrdu ? 'تعداد' : 'Frequency'}</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-white">{selectedWord.count}</span>
                        <span className="text-xs text-gray-500">({(selectedWord.frequency * 100).toFixed(2)}%)</span>
                      </div>
                    </div>
                    <div>
                      <p
                        className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">{isUrdu ? 'ہجے' : 'Syllables'}</p>
                      <p className="text-lg font-medium text-gray-300">{selectedWord.syllables}</p>
                    </div>
                  </div>
                </div>

                {selectedWord.contextSentences.length > 0 && (
                  <div className="space-y-2">
                    <h3
                      className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                      <Quote className="w-3 h-3"/> {isUrdu ? 'سیاق و سباق' : 'Context'}</h3>
                    {selectedWord.contextSentences.map((s, i) => (
                      <p key={i}
                         className={`text-xs text-gray-400 bg-gray-950 p-3 rounded border border-gray-800 leading-relaxed ${isUrdu ? 'text-right' : ''}`}>...{s}...</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedWordAnalysis;
