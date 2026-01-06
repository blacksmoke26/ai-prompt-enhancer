/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useCallback, useEffect, useState} from 'react';
import {BrainCircuit, Settings, Sparkles} from 'lucide-react';

// libs
import {BrainAnalysis} from '~/lib/ai-brain';
import {EnhancedAIBrainV3} from '~/lib/ai-brain-enhanced';

// constants
import {allSuggestions, SmartSuggestion} from '~/constants/prompt-suggestions';

// helpers
import {cn} from '~/utils/helpers';

// libs
import {
  formatIntelligenceLevel,
  getPriorityBadgeVariant,
  getConfigForMode, getMappedAnalysis, INITIAL_CONFIG, Mode,
} from './utils/lib';

// ui components
import {Button} from '~/components/ui/Button';
import {Badge} from '~/components/ui/Badge';
import {Card, CardContent, CardHeader, CardTitle} from '~/components/ui/Card';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '~/components/ui/Tooltip';

// components
import FooterPanel from './FooterPanel';
import FiltersPanel from './FiltersPanel';
import NoSuggestions from './NoSuggestions';
import AnalyzeLoading from './AnalyzeLoading';
import BrainAnalysisStats from './BrainAnalysisStats';
import FilteredSuggestion from './FilteredSuggestion';

// icons
import AtomIcon from './icons/AtomIcon';

export interface SmartSuggestionsPanelProps {
  /** Current prompt text */
  prompt: string;
  /** Whether suggestions panel is visible */
  isVisible: boolean;
  /** Analysis result from AI brain */
  analysis?: any | null;
  /** Current user ID for personalized learning */
  userId?: string;

  /** Callback when a suggestion is applied */
  onApplySuggestion?(suggestion: SmartSuggestion): void;

  /** Callback when analysis is updated */
  onAnalysisUpdate?(analysis: BrainAnalysis): void;

  /** Callback when panel visibility changes */
  onClose(): void;
}

/**
 * Smart suggestions panel with advanced AI capabilities
 */
const SmartSuggestionsPanel: React.FC<SmartSuggestionsPanelProps> = (props) => {
  const {
    prompt, isVisible, onClose, userId, onApplySuggestion, onAnalysisUpdate,
  } = props;

  const [suggestions, setSuggestions] = useState<SmartSuggestion[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeComplexity, setActiveComplexity] = useState<string>('all');
  const [activeIntelligence, setActiveIntelligence] = useState<string>('all');
  const [filteredSuggestions, setFilteredSuggestions] = useState<SmartSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [brainAnalysis, setBrainAnalysis] = useState<BrainAnalysis | null>(null);
  const [enhancedAnalysis, setEnhancedAnalysis] = useState<any | null>(null);
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);
  const [showMetricsPanel, setShowMetricsPanel] = useState(false);
  const [aiMode, setAiMode] = useState<Mode>('advanced');
  const [confidenceExpanded, setConfidenceExpanded] = useState(false);
  const [brainInstance, setBrainInstance] = useState<EnhancedAIBrainV3 | null>(null);

  // Initialize EnhancedAIBrainV3 instance with configuration
  useEffect(() => {
    const instance = EnhancedAIBrainV3.getInstance(INITIAL_CONFIG);
    setBrainInstance(instance);
  }, []);

  // Analyze prompt when visible
  useEffect(() => {
    if (!isVisible || !brainInstance || !prompt.trim()) {
      setFilteredSuggestions([]);
      return;
    }

    const analyzePrompt = async () => {
      setIsLoading(true);

      try {
        // Get AI brain analysis
        const analysisResult = await brainInstance.analyzePrompt(prompt, userId);
        setEnhancedAnalysis(analysisResult);

        // Map to BrainAnalysis interface
        const mappedAnalysis = getMappedAnalysis(analysisResult);

        setBrainAnalysis(mappedAnalysis);

        if (onAnalysisUpdate) {
          onAnalysisUpdate(mappedAnalysis);
        }

        // Get all suggestions
        const allSuggestionObjects: SmartSuggestion[] = [...allSuggestions];

        // Add dynamic suggestions from AI analysis
        const dynamicSuggestions = analysisResult.suggestions || [];
        dynamicSuggestions.forEach((suggestion: any, index: number) => {
          if (typeof suggestion === 'string') {
            allSuggestionObjects.push({
              id: `enhanced-${index}`,
              title: 'AI-Generated Suggestion',
              description: suggestion,
              complexity: analysisResult.complexity || 'intermediate',
              category: analysisResult.context || 'general',
              priority: 'high',
              example: '',
              tags: ['enhanced', 'ai-brain', 'dynamic'],
              intelligenceLevel: analysisResult.intelligenceLevel || 'ai-like',
              domain: analysisResult.domain || 'general',
              effectiveness: 0.8,
              adaptivePotential: 0.9,
            } as SmartSuggestion);
          } else if (suggestion) {
            allSuggestionObjects.push({
              ...suggestion,
              id: suggestion.id || `enhanced-${index}`,
              adaptivePotential: 0.9,
            } as SmartSuggestion);
          }
        });

        setSuggestions(allSuggestionObjects);
      } catch (error) {
        console.error('Error analyzing prompt:', error);
        setBrainAnalysis({
          keywords: [],
          context: 'general',
          intent: 'general',
          complexity: 'intermediate',
          domain: 'general',
          suggestions: [],
          confidence: 0.3,
          awareness: 0.2,
          understanding: 0.25,
          adaptability: 0.2,
          limitations: ['Analysis failed due to error'],
          learning: [],
          knowledgeGained: 0.2,
          effectiveness: 0.25,
          intelligenceLevel: 'basic',
        });
        setSuggestions(allSuggestions);
      } finally {
        setIsLoading(false);
      }
    };

    analyzePrompt();
  }, [brainInstance, isVisible, prompt, userId, onAnalysisUpdate]);

  // Filter suggestions based on criteria
  const filterSuggestions = useCallback(() => {
    if (!suggestions.length || !brainAnalysis) return;

    let filtered = [...suggestions];

    // Apply category filter
    if (activeCategory !== 'all') {
      filtered = filtered.filter(s => s.category === activeCategory);
    }

    // Apply complexity filter
    if (activeComplexity !== 'all') {
      filtered = filtered.filter(s => s.complexity === activeComplexity);
    }

    // Apply intelligence filter
    if (activeIntelligence !== 'all') {
      filtered = filtered.filter(s => s.intelligenceLevel === activeIntelligence);
    }

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase().trim();
      if (query) {
        filtered = filtered.filter(s =>
          s.title.toLowerCase().includes(query) ||
          s.description.toLowerCase().includes(query) ||
          (Array.isArray(s.tags) && s.tags.some(tag => tag.toLowerCase().includes(query))),
        );
      }
    }

    // Apply AI ranking based on context and analysis
    if (enhancedAnalysis) {
      filtered = filtered.map(suggestion => {
        // Calculate adaptive score based on AI analysis
        let adaptiveScore = 0;

        // Context relevance
        if (enhancedAnalysis.context === suggestion.category) {
          adaptiveScore += 0.3;
        }

        // Domain relevance
        if (enhancedAnalysis.domain === suggestion.domain) {
          adaptiveScore += 0.2;
        }

        // Complexity matching
        if (enhancedAnalysis.complexity === suggestion.complexity) {
          adaptiveScore += 0.2;
        }

        // Priority weighting
        const priorityWeights: Record<string, number> = {
          'critical': 0.4,
          'high': 0.3,
          'medium': 0.2,
          'low': 0.1,
          'optional': 0.05,
        };
        adaptiveScore += (priorityWeights[suggestion.priority] || 0.1);

        // AI confidence boost
        adaptiveScore += (enhancedAnalysis.confidence * 0.2);

        // Effectiveness from history
        adaptiveScore += ((suggestion.effectiveness || 0.5) * 0.1);

        return {
          ...suggestion,
          adaptiveScore: adaptiveScore,
          relevance: {
            context: enhancedAnalysis.context === suggestion.category,
            domain: enhancedAnalysis.domain === suggestion.domain,
            complexity: enhancedAnalysis.complexity === suggestion.complexity,
            priority: suggestion.priority,
          },
          aiRecommended: adaptiveScore > 0.6,
        };
      });

      // Sort by adaptive score
      filtered.sort((a, b) => (b as any).adaptiveScore - (a as any).adaptiveScore);
    }

    setFilteredSuggestions(filtered);
  }, [
    suggestions,
    activeCategory,
    activeComplexity,
    activeIntelligence,
    searchQuery,
    brainAnalysis,
    enhancedAnalysis,
  ]);

  useEffect(() => {
    filterSuggestions();
  }, [filterSuggestions]);

  // Handle AI mode changes
  const handleAiModeChange = useCallback((mode: Mode) => {
    if (!brainInstance) return;

    setAiMode(mode);

    const modeConfig = getConfigForMode(mode);
    brainInstance.updateConfig(modeConfig);
  }, [brainInstance]);

  const handleApplySuggestion = (suggestion: SmartSuggestion) => {
    // Update suggestion history with effectiveness feedback
    if (brainInstance && enhancedAnalysis) {
      // Simulate effectiveness based on user selection
      brainInstance.updateSuggestionHistory(suggestion.id, 0.9);

      // Update learning patterns
      const keywords = enhancedAnalysis.keywords || [];
      keywords.forEach(keyword => {
        brainInstance.updateLearningPatterns(keyword, 0.8);
      });
    }

    if (onApplySuggestion) {
      onApplySuggestion(suggestion);
    }
  };

  if (!isVisible || !brainInstance) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-7xl max-h-[90vh] overflow-hidden flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b border-border">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center">
              <BrainCircuit className="h-5 w-5 text-white"/>
            </div>
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                Intelligent Prompt Enhancement Engine
                <Badge variant="secondary" className="text-xs px-2 py-0.5">
                  {aiMode.toUpperCase()}
                </Badge>
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                {prompt.length} characters • {filteredSuggestions.length} suggestions analyzed
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={isAdvancedMode ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => setIsAdvancedMode(!isAdvancedMode)}
                  >
                    <Settings className="h-4 w-4"/>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isAdvancedMode ? 'Hide advanced controls' : 'Show advanced controls'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Button variant="ghost" size="sm" onClick={onClose}>
              ✕
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto p-4">
          {isLoading ? (
            <AnalyzeLoading aiMode={aiMode}/>
          ) : (
            <>
              {brainAnalysis && (
                <BrainAnalysisStats
                  analysis={brainAnalysis} expanded={confidenceExpanded}
                  onExpand={() => setConfidenceExpanded(!confidenceExpanded)}
                  onClick={() => setShowMetricsPanel(!showMetricsPanel)}
                  showMetricsPanel={showMetricsPanel} onKeywordChange={(keyword, index) => (
                  <Badge key={index} variant="outline" className="text-xs px-1.5 py-0">
                    {keyword}
                  </Badge>
                )}
                  caption={formatIntelligenceLevel(brainAnalysis.intelligenceLevel || 'ai-like')}
                  enhancedAnalysis={enhancedAnalysis} brainInstance={brainInstance}
                  onModeChange={(mode) => (
                    <Button
                      key={mode}
                      variant={aiMode === mode ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleAiModeChange(mode as Mode)}
                      className={cn(
                        'text-xs px-2 py-1 rounded-full transition-all duration-200',
                        aiMode === mode && 'shadow-[0_0_10px_rgba(99,102,241,0.5)]',
                      )}
                    >
                      {mode.charAt(0).toUpperCase() + mode.slice(1)}
                      {mode === 'quantum' && <AtomIcon className="ml-1 h-3 w-3"/>}
                      {mode === 'emergent' && <Sparkles className="ml-1 h-3 w-3"/>}
                    </Button>
                  )}/>
              )}

              <FiltersPanel
                value={searchQuery}
                onQueryChange={(e) => setSearchQuery(e.target.value)}
                category={activeCategory}
                onValueChange={value => ({
                  label: value.charAt(0).toUpperCase() + value.slice(1),
                  value,
                })}
                onCategoryChange={value => setActiveCategory(value as string)}
                complexity={activeComplexity}
                onComplexityChange={value => setActiveComplexity(value as string)}
                intelligence={activeIntelligence}
                intelligenceLevelItem={value => ({label: formatIntelligenceLevel(value), value})}
                onIntelligenceChange={value => setActiveIntelligence(value as string)}/>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredSuggestions.length > 0 ? (
                  filteredSuggestions.map((suggestion, index) => {
                    const isAiRecommended = (suggestion as any).aiRecommended;
                    const adaptiveScore = (suggestion as any).adaptiveScore || 0.5;

                    return (
                      <FilteredSuggestion
                        key={suggestion.id + '_' + index}
                        aiRecommended={isAiRecommended}
                        onApplySuggestionClick={() => handleApplySuggestion(suggestion)} suggestion={suggestion}
                        adaptiveScore={adaptiveScore}
                        priorityBadgeVariant={getPriorityBadgeVariant(suggestion.priority)}
                        onTagChange={(tag, index) => (
                          <Badge key={index} variant="outline" className="text-[10px] px-1.5 py-0">
                            {tag}
                          </Badge>
                        )} caption={formatIntelligenceLevel(suggestion.intelligenceLevel)}/>
                    );
                  })
                ) : (
                  <NoSuggestions onResetFilterClick={() => {
                    setActiveCategory('all');
                    setActiveComplexity('all');
                    setActiveIntelligence('all');
                    setSearchQuery('');
                  }}/>
                )}
              </div>
            </>
          )}
        </CardContent>

        <FooterPanel
          smartSuggestions={filteredSuggestions} smartSuggestions1={suggestions}
          enhancedAnalysis={enhancedAnalysis} brainInstance={brainInstance}
          onConfigChange={(config) => brainInstance.updateConfig(config)}
          advancedMode={isAdvancedMode}
          onReanalyzeClick={() => {
            // Re-analyze with current settings
            setIsLoading(true);
            setTimeout(() => {
              const analysisResult = brainInstance.analyzePrompt(prompt, userId);
              setEnhancedAnalysis(analysisResult);
              setIsLoading(false);
            }, 300);
          }}
          onCloseClick={onClose}/>
      </Card>
    </div>
  );
};

export default SmartSuggestionsPanel;
