/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useCallback, useEffect, useState} from 'react';
import {
  AlertTriangle,
  Brain,
  BrainCircuit,
  ChevronDown,
  ChevronUp,
  Gauge,
  Lightbulb,
  LayersIcon,
  RefreshCw,
  Settings,
  Sparkles,
  Star,
  Target,
} from 'lucide-react';
import {Slider, Progress, Dialog, Flex} from '@radix-ui/themes';

// libs
import {BrainAnalysis} from '~/lib/ai-brain';
import {EnhancedAIBrainConfig, EnhancedAIBrainV3} from '~/lib/ai-brain-enhanced';
import {
  allSuggestions,
  categories,
  complexities,
  intelligenceLevels,
  SmartSuggestion,
} from '~/constants/prompt-suggestions';

// ui components
import {Badge, BadgeVariant} from '~/components/ui/Badge';
import {Button} from '~/components/ui/Button';
import {Input} from '~/components/ui/Input';
import {Select} from '~/components/ui/Select';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '~/components/ui/Card';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '~/components/ui/Tooltip';
import {Switch} from '~/components/ui/Switch';
import {cn} from '~/utils/helpers';

export interface SmartSuggestionsPanelProps {
  /** Current prompt text */
  prompt: string;

  /** Whether suggestions panel is visible */
  isVisible: boolean;

  /** Callback when panel visibility changes */
  onClose: () => void;

  /** Response from prompt enhancement (if available) */
  response?: any | null;

  /** Analysis result from AI brain */
  analysis?: any | null;

  /** Current user ID for personalized learning */
  userId?: string;

  /** Callback when a suggestion is applied */
  onApplySuggestion?: (suggestion: SmartSuggestion) => void;

  /** Callback when analysis is updated */
  onAnalysisUpdate?: (analysis: BrainAnalysis) => void;
}

/**
 * Configuration panel for AI brain settings
 */
const BrainConfigPanel: React.FC<{
  config: Partial<EnhancedAIBrainConfig>;
  onConfigChange: (config: Partial<EnhancedAIBrainConfig>) => void;
  isAdvancedMode: boolean;
}> = ({config, onConfigChange, isAdvancedMode}) => {
  const [localConfig, setLocalConfig] = useState(config);

  useEffect(() => {
    setLocalConfig(config);
  }, [config]);

  const updateConfig = useCallback((updates: Partial<EnhancedAIBrainConfig>) => {
    const newConfig = {...localConfig, ...updates};
    setLocalConfig(newConfig);
    onConfigChange(newConfig);
  }, [localConfig, onConfigChange]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium"><Brain className="display-inline h-4 w-4"/> Self-Assessment</label>
          <Switch
            checked={localConfig.core?.enableSelfAssessment}
            onCheckedChange={(value) => updateConfig({core: {...localConfig.core, enableSelfAssessment: value}})}
          >

          </Switch>
        </div>
        <p className="text-xs text-muted-foreground">
          Enable AI to evaluate its own limitations and biases
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium"><BrainCircuit className="display-inline h-4 w-4"/> Meta-Cognition</label>
          <Switch
            checked={localConfig.core?.enableMetaCognition}
            onCheckedChange={(value) => updateConfig({core: {...localConfig.core, enableMetaCognition: value}})}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Enable AI to think about its own thinking process
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium"><LayersIcon className="display-inline h-4 w-4"/> Quantum Reasoning</label>
          <Switch
            checked={localConfig.advanced?.enableQuantumReasoning}
            onCheckedChange={(value) => updateConfig({
              advanced: {
                ...localConfig.advanced,
                enableQuantumReasoning: value,
              },
            })}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Enable multi-state reasoning and probabilistic outcomes
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Intelligence Mode</label>
        <Select
          value={localConfig.core?.enableEthicalFramework ? 'ethics-focused' : 'performance-focused'}
          options={[
            {label: 'Performance Focused', value: 'performance-focused'},
            {label: 'Ethics Focused', value: 'ethics-focused'},
            {label: 'Balanced', value: 'balanced'},
          ]}
          onChange={(value) => {
            const ethicalFramework = value === 'ethics-focused' || value === 'balanced';
            updateConfig({
              core: {...localConfig.core, enableEthicalFramework: ethicalFramework},
              neuralWeights: {
                ...localConfig.neuralWeights,
                ethicalAlignment: value === 'ethics-focused' ? 0.15 : (value === 'balanced' ? 0.08 : 0.03),
              },
            });
          }}
        />
        <p className="text-xs text-muted-foreground">
          Control the balance between performance and ethical considerations
        </p>
      </div>

      {isAdvancedMode && (
        <div className="space-y-4 pt-4 border-t border-border">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Learning Rate</label>
              <span className="text-xs text-muted-foreground">{localConfig.core?.learningRate?.toFixed(2)}</span>
            </div>
            <Slider
              value={[localConfig.core?.learningRate || 0.1]}
              max={1}
              step={0.05}
              onValueChange={([value]) => updateConfig({core: {...localConfig.core, learningRate: value}})}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Innovation Threshold</label>
              <span className="text-xs text-muted-foreground">{localConfig.core?.innovationThreshold?.toFixed(2)}</span>
            </div>
            <Slider
              value={[localConfig.core?.innovationThreshold || 0.7]}
              max={1}
              step={0.05}
              onValueChange={([value]) => updateConfig({core: {...localConfig.core, innovationThreshold: value}})}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Max Suggestions</label>
              <span className="text-xs text-muted-foreground">{localConfig.core?.maxSuggestions || 10}</span>
            </div>
            <Slider
              value={[localConfig.core?.maxSuggestions || 10]}
              max={20}
              step={1}
              onValueChange={([value]) => updateConfig({
                core: {
                  ...localConfig.core,
                  maxSuggestions: Math.round(value),
                },
              })}
            />
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Advanced confidence meter with detailed breakdown
 */
const ConfidenceMeter: React.FC<{
  analysis: BrainAnalysis;
  expanded?: boolean;
  onExpand?: () => void;
}> = ({analysis, expanded = false, onExpand}) => {
  const confidence = analysis.confidence * 100;
  const awareness = analysis.awareness * 100;
  const understanding = analysis.understanding * 100;
  const adaptability = analysis.adaptability * 100;

  const getConfidenceColor = (value: number) => {
    if (value > 80) return 'text-green-500';
    if (value > 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getConfidenceDescription = (value: number) => {
    if (value > 80) return 'High confidence - AI is highly certain about suggestions';
    if (value > 60) return 'Moderate confidence - AI has reasonable certainty';
    return 'Low confidence - AI is uncertain, suggestions may need verification';
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Gauge className="h-4 w-4 text-primary"/>
          <span className="font-medium">AI Confidence: {confidence.toFixed(1)}%</span>
        </div>
        <Button variant="ghost" size="sm" onClick={onExpand}>
          {expanded ? <ChevronUp className="h-4 w-4"/> : <ChevronDown className="h-4 w-4"/>}
        </Button>
      </div>

      <Progress value={confidence} className={cn(
        'transition-all duration-300',
        confidence > 80 && 'bg-green-500',
        confidence > 60 && confidence <= 80 && 'bg-yellow-500',
        confidence <= 60 && 'bg-red-500',
      )}/>

      <p className={cn('text-xs', getConfidenceColor(confidence))}>
        {getConfidenceDescription(confidence)}
      </p>

      {expanded && (
        <div className="grid grid-cols-2 gap-3 mt-2">
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Awareness:</span>
              <span>{awareness.toFixed(1)}%</span>
            </div>
            <Progress
              value={awareness}
              className={cn(
                awareness > 80 && 'bg-green-400',
                awareness > 60 && awareness <= 80 && 'bg-yellow-400',
                awareness <= 60 && 'bg-red-400',
              )}
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Understanding:</span>
              <span>{understanding.toFixed(1)}%</span>
            </div>
            <Progress
              value={understanding}
              className={cn(
                understanding > 80 && 'bg-green-400',
                understanding > 60 && understanding <= 80 && 'bg-yellow-400',
                understanding <= 60 && 'bg-red-400',
              )}
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Adaptability:</span>
              <span>{adaptability.toFixed(1)}%</span>
            </div>
            <Progress
              value={adaptability}
              className={cn(
                adaptability > 80 && 'bg-green-400',
                adaptability > 60 && adaptability <= 80 && 'bg-yellow-400',
                adaptability <= 60 && 'bg-red-400',
              )}
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Effectiveness:</span>
              <span>{(analysis.effectiveness * 100).toFixed(1)}%</span>
            </div>
            <Progress
              value={analysis.effectiveness * 100}
              className={cn(
                analysis.effectiveness > 0.8 && 'bg-green-400',
                analysis.effectiveness > 0.6 && analysis.effectiveness <= 0.8 && 'bg-yellow-400',
                analysis.effectiveness <= 0.6 && 'bg-red-400',
              )}
            />
          </div>
        </div>
      )}

      {analysis.limitations && analysis.limitations.length > 0 && (
        <div className="mt-2 p-2 bg-muted/50 rounded-md text-xs">
          <div className="flex items-start gap-1">
            <AlertTriangle className="h-3 w-3 text-yellow-500 mt-0.5 flex-shrink-0"/>
            <div>
              <p className="font-medium text-yellow-600">AI Limitations</p>
              <ul className="list-disc pl-4 mt-1 space-y-0.5">
                {analysis.limitations.slice(0, expanded ? undefined : 2).map((limitation, i) => (
                  <li key={i}>{limitation}</li>
                ))}
                {!expanded && analysis.limitations.length > 2 && (
                  <li>...and {analysis.limitations.length - 2} more</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Performance metrics visualization
 */
const PerformanceMetrics: React.FC<{
  analysis: any;
  brainInstance: EnhancedAIBrainV3;
}> = ({analysis, brainInstance}) => {
  const [metricsState, setMetricsState] = useState({
    processingTime: 0,
    suggestionEffectiveness: 0,
    learningRate: 0,
    selfAwarenessLevel: 0,
  });

  useEffect(() => {
    if (analysis) {
      setMetricsState({
        processingTime: analysis.processingTime || 0,
        suggestionEffectiveness: analysis.effectiveness || 0,
        learningRate: brainInstance['adaptationParameters']?.learningRate || 0.1,
        selfAwarenessLevel: brainInstance['selfAwareness']?.confidence || 0.5,
      });
    }
  }, [analysis, brainInstance]);

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span>Processing Time</span>
          <span className="font-mono">{metricsState.processingTime}ms</span>
        </div>
        <div className="w-full bg-muted rounded-full h-1.5">
          <div
            className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
            style={{width: `${Math.min(100, metricsState.processingTime / 2)}%`}}
          />
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span>Suggestion Effectiveness</span>
          <span>{(metricsState.suggestionEffectiveness * 100).toFixed(1)}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-1.5">
          <div
            className={cn(
              'h-1.5 rounded-full transition-all duration-300',
              metricsState.suggestionEffectiveness > 0.8 ? 'bg-green-500' :
                metricsState.suggestionEffectiveness > 0.6 ? 'bg-yellow-500' : 'bg-red-500',
            )}
            style={{width: `${metricsState.suggestionEffectiveness * 100}%`}}
          />
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span>Adaptive Learning</span>
          <span>{(metricsState.learningRate * 100).toFixed(1)}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-1.5">
          <div
            className="bg-purple-500 h-1.5 rounded-full transition-all duration-300"
            style={{width: `${metricsState.learningRate * 100}%`}}
          />
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span>Self-Awareness</span>
          <span>{(metricsState.selfAwarenessLevel * 100).toFixed(1)}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-1.5">
          <div
            className="bg-orange-500 h-1.5 rounded-full transition-all duration-300"
            style={{width: `${metricsState.selfAwarenessLevel * 100}%`}}
          />
        </div>
      </div>
    </div>
  );
};

/**
 * Smart suggestions panel with advanced AI capabilities
 */
const SmartSuggestionsPanel: React.FC<SmartSuggestionsPanelProps> = (props) => {
  const {
    prompt,
    isVisible,
    onClose,
    response,
    userId,
    onApplySuggestion,
    onAnalysisUpdate,
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
  const [showConfigDialog, setShowConfigDialog] = useState(false);
  const [showMetricsPanel, setShowMetricsPanel] = useState(false);
  const [aiMode, setAiMode] = useState<'basic' | 'advanced' | 'quantum' | 'emergent'>('advanced');
  const [confidenceExpanded, setConfidenceExpanded] = useState(false);
  const [brainInstance, setBrainInstance] = useState<EnhancedAIBrainV3 | null>(null);

  // Initialize EnhancedAIBrainV3 instance with configuration
  useEffect(() => {
    const initialConfig: Partial<EnhancedAIBrainConfig> = {
      core: {
        enableSelfAssessment: true,
        enableMetaCognition: true,
        enableEmotionalIntelligence: true,
        enableEthicalFramework: true,
        learningRate: 0.1,
        innovationThreshold: 0.7,
        maxSuggestions: 10,
        minConfidenceThreshold: 0.3,
      },
      advanced: {
        enableQuantumReasoning: false,
        enableEmergentBehavior: false,
      },
      debug: {
        enableLogging: false,
      },
    };

    const instance = EnhancedAIBrainV3.getInstance(initialConfig);
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
        const mappedAnalysis: BrainAnalysis = {
          keywords: analysisResult.keywords,
          context: analysisResult.context,
          intent: analysisResult.intent,
          complexity: analysisResult.complexity,
          domain: analysisResult.domain,
          suggestions: analysisResult.suggestions,
          confidence: analysisResult.confidence,
          awareness: analysisResult.awareness,
          understanding: analysisResult.understanding,
          adaptability: analysisResult.adaptability,
          limitations: analysisResult.limitations,
          learning: analysisResult.learning,
          knowledgeGained: analysisResult.knowledgeGained,
          effectiveness: analysisResult.effectiveness,
          intelligenceLevel: analysisResult.intelligenceLevel,
          //processingTime: analysisResult.processingTime,
        };

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
  const handleAiModeChange = useCallback((mode: 'basic' | 'advanced' | 'quantum' | 'emergent') => {
    if (!brainInstance) return;

    setAiMode(mode);

    const getConfigForMode = (): Partial<EnhancedAIBrainConfig> => {
      switch (mode) {
        case 'basic':
          return {
            core: {
              enableSelfAssessment: false,
              enableMetaCognition: false,
              enableEmotionalIntelligence: false,
              enableEthicalFramework: false,
            },
            advanced: {
              enableQuantumReasoning: false,
              enableEmergentBehavior: false,
            },
            neuralWeights: {
              context: 0.3,
              domain: 0.3,
              complexity: 0.4,
            },
          };
        case 'advanced':
          return {
            core: {
              enableSelfAssessment: true,
              enableMetaCognition: true,
              enableEmotionalIntelligence: true,
              enableEthicalFramework: true,
            },
            advanced: {
              enableQuantumReasoning: false,
              enableEmergentBehavior: false,
            },
            neuralWeights: {
              context: 0.15,
              domain: 0.12,
              complexity: 0.1,
              priority: 0.13,
              effectiveness: 0.1,
              userPreference: 0.1,
              emotionalAlignment: 0.05,
              ethicalAlignment: 0.05,
            },
          };
        case 'quantum':
          return {
            core: {
              enableSelfAssessment: true,
              enableMetaCognition: true,
              enableEmotionalIntelligence: true,
              enableEthicalFramework: true,
            },
            advanced: {
              enableQuantumReasoning: true,
              enableEmergentBehavior: false,
            },
            neuralWeights: {
              context: 0.1,
              domain: 0.1,
              complexity: 0.08,
              priority: 0.1,
              effectiveness: 0.08,
              metaCognition: 0.05,
              innovationScore: 0.15,
              //quantumPotential: 0.24,
            },
          };
        case 'emergent':
          return {
            core: {
              enableSelfAssessment: true,
              enableMetaCognition: true,
              enableEmotionalIntelligence: true,
              enableEthicalFramework: true,
            },
            advanced: {
              enableQuantumReasoning: true,
              enableEmergentBehavior: true,
            },
            neuralWeights: {
              context: 0.08,
              domain: 0.08,
              complexity: 0.07,
              metaCognition: 0.1,
              innovationScore: 0.2,
              crossDomainRelevance: 0.15,
              //emergentPotential: 0.32,
            },
          };
        default:
          return {};
      }
    };

    const modeConfig = getConfigForMode();
    brainInstance.updateConfig(modeConfig);
  }, [brainInstance]);

  const formatIntelligenceLevel = (level: string) => {
    return level
      .replace(/-/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
  };

  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'destructive';
      case 'high':
        return 'warning';
      case 'medium':
        return 'secondary';
      default:
        return 'default';
    }
  };

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
            <div className="flex flex-col items-center justify-center h-64">
              <div className="relative">
                <div
                  className="absolute inset-0 animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite] rounded-full bg-purple-500 opacity-20"></div>
                <div
                  className="absolute inset-0 animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite] rounded-full bg-blue-500 opacity-20 delay-100"></div>
                <div className="relative">
                  <BrainCircuit className="h-16 w-16 text-purple-500 animate-pulse"/>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="font-medium text-lg">Enhancing Your Prompt</p>
                <p className="text-sm text-muted-foreground mt-1">
                  AI is analyzing your prompt
                  with {aiMode === 'quantum' ? 'quantum' : aiMode === 'emergent' ? 'emergent' : 'advanced'} intelligence
                </p>
              </div>
            </div>
          ) : (
            <>
              {brainAnalysis && (
                <div className="mb-6 space-y-4">
                  <ConfidenceMeter
                    analysis={brainAnalysis}
                    expanded={confidenceExpanded}
                    onExpand={() => setConfidenceExpanded(!confidenceExpanded)}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Target className="h-4 w-4 text-primary"/>
                          <span className="font-medium text-sm">Analysis Summary</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowMetricsPanel(!showMetricsPanel)}
                          className="text-xs"
                        >
                          {showMetricsPanel ? 'Hide Details' : 'Show Details'}

                          {showMetricsPanel ? (
                            <ChevronUp className="ml-1 h-3 w-3"/>
                          ) : (
                            <ChevronDown className="ml-1 h-3 w-3"/>
                          )}
                        </Button>
                      </div>

                      {showMetricsPanel ? (
                        <div className="space-y-3 p-3 bg-muted/30 rounded-lg">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-medium">Context:</span>
                                <Badge variant="secondary" className="text-xs">
                                  {brainAnalysis.context}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-medium">Intent:</span>
                                <Badge variant="secondary" className="text-xs">
                                  {brainAnalysis.intent}
                                </Badge>
                              </div>
                            </div>

                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-medium">Domain:</span>
                                <Badge variant="secondary" className="text-xs">
                                  {brainAnalysis.domain}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-medium">Complexity:</span>
                                <Badge
                                  variant={
                                    brainAnalysis.complexity === 'beginner' ? 'default' :
                                      brainAnalysis.complexity === 'intermediate' ? 'secondary' :
                                        brainAnalysis.complexity === 'advanced' ? 'outline' : 'destructive'
                                  }
                                  className="text-xs"
                                >
                                  {brainAnalysis.complexity}
                                </Badge>
                              </div>
                            </div>

                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-medium">Keywords:</span>
                                <Badge variant="secondary" className="text-xs">
                                  {brainAnalysis.keywords.length}
                                </Badge>
                              </div>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {brainAnalysis.keywords.slice(0, 4).map((keyword, index) => (
                                  <Badge key={index} variant="outline" className="text-xs px-1.5 py-0">
                                    {keyword}
                                  </Badge>
                                ))}
                                {brainAnalysis.keywords.length > 4 && (
                                  <Badge variant="outline" className="text-xs px-1.5 py-0">
                                    +{brainAnalysis.keywords.length - 4}
                                  </Badge>
                                )}
                              </div>
                            </div>

                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-medium">Intelligence:</span>
                                <Badge
                                  variant={
                                    (brainAnalysis.intelligenceLevel === 'basic' ? 'default' :
                                      brainAnalysis.intelligenceLevel === 'advanced' ? 'secondary' : 'gradient') as BadgeVariant
                                  }
                                  className="text-xs"
                                >
                                  {formatIntelligenceLevel(brainAnalysis.intelligenceLevel || 'ai-like')}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-medium">Learning:</span>
                                <Badge variant="secondary" className="text-xs">
                                  {brainAnalysis.learning.length}
                                </Badge>
                              </div>
                            </div>
                          </div>

                          {enhancedAnalysis && enhancedAnalysis.metaAnalysis && (
                            <div className="pt-2 border-t border-border mt-2">
                              <div className="flex items-center gap-2 mb-2">
                                <Brain className="h-4 w-4 text-purple-500"/>
                                <span className="text-xs font-medium text-muted-foreground">
                                  Advanced Metrics
                                </span>
                              </div>
                              <PerformanceMetrics analysis={enhancedAnalysis} brainInstance={brainInstance}/>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary" className="text-xs">Context: {brainAnalysis.context}</Badge>
                          <Badge variant="secondary" className="text-xs">Intent: {brainAnalysis.intent}</Badge>
                          <Badge variant="secondary" className="text-xs">Domain: {brainAnalysis.domain}</Badge>
                          <Badge
                            variant={
                              brainAnalysis.complexity === 'beginner' ? 'default' :
                                brainAnalysis.complexity === 'intermediate' ? 'secondary' :
                                  brainAnalysis.complexity === 'advanced' ? 'outline' : 'destructive'
                            }
                            className="text-xs"
                          >
                            Complexity: {brainAnalysis.complexity}
                          </Badge>
                          <Badge
                            variant={
                              (brainAnalysis.intelligenceLevel === 'basic' ? 'default' :
                                brainAnalysis.intelligenceLevel === 'advanced' ? 'secondary' : 'gradient') as BadgeVariant
                            }
                            className="text-xs"
                          >
                            Intelligence: {formatIntelligenceLevel(brainAnalysis.intelligenceLevel || 'ai-like')}
                          </Badge>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-center">
                      <div className="flex flex-wrap gap-1">
                        {(['basic', 'advanced', 'quantum', 'emergent'] as const).map((mode) => (
                          <Button
                            key={mode}
                            variant={aiMode === mode ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => handleAiModeChange(mode)}
                            className={cn(
                              'text-xs px-2 py-1 rounded-full transition-all duration-200',
                              aiMode === mode && 'shadow-[0_0_10px_rgba(99,102,241,0.5)]',
                            )}
                          >
                            {mode.charAt(0).toUpperCase() + mode.slice(1)}
                            {mode === 'quantum' && <AtomIcon className="ml-1 h-3 w-3"/>}
                            {mode === 'emergent' && <Sparkles className="ml-1 h-3 w-3"/>}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mb-4 flex flex-col md:flex-row gap-3">
                <div className="flex-1 min-w-[200px] relative">
                  <Input
                    type="text"
                    placeholder="Search suggestions by keyword, tag, or description..."
                    className="w-full pl-10 pr-4 py-2 text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="absolute left-3 top-2.5 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </svg>
                  </div>
                </div>

                <div className="flex gap-3 flex-wrap">
                  <Select
                    className="min-w-[150px]"
                    value={activeCategory}
                    options={[
                      {label: 'All Categories', value: 'all'},
                      ...categories.map(value => ({
                        label: value.charAt(0).toUpperCase() + value.slice(1),
                        value,
                      })),
                    ]}
                    onChange={value => setActiveCategory(value as string)}
                  />

                  <Select
                    className="min-w-[150px]"
                    value={activeComplexity}
                    options={[
                      {label: 'All Complexities', value: 'all'},
                      ...complexities.map(value => ({
                        label: value.charAt(0).toUpperCase() + value.slice(1),
                        value,
                      })),
                    ]}
                    onChange={value => setActiveComplexity(value as string)}
                  />

                  <Select
                    className="min-w-[170px]"
                    value={activeIntelligence}
                    options={[
                      {label: 'All Intelligence Levels', value: 'all'},
                      ...intelligenceLevels.map(value => ({
                        label: formatIntelligenceLevel(value),
                        value,
                      })),
                    ]}
                    onChange={value => setActiveIntelligence(value as string)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredSuggestions.length > 0 ? (
                  filteredSuggestions.map((suggestion) => {
                    const isAiRecommended = (suggestion as any).aiRecommended;
                    const adaptiveScore = (suggestion as any).adaptiveScore || 0.5;

                    return (
                      <TooltipProvider key={suggestion.id}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Card
                              className={cn(
                                'group transition-all duration-300 cursor-pointer hover:shadow-lg border-2',
                                isAiRecommended
                                  ? 'border-purple-500/30 hover:border-purple-500/50'
                                  : 'border-border hover:border-primary/50',
                                'hover:scale-[1.01]',
                              )}
                              onClick={() => handleApplySuggestion(suggestion)}
                            >
                              <div className="p-3">
                                <div className="flex items-start justify-between">
                                  <div className="space-y-1 flex-1">
                                    <div className="flex items-center gap-2">
                                      {isAiRecommended && (
                                        <div
                                          className="flex-shrink-0 w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center">
                                          <Star className="h-2.5 w-2.5 text-white"/>
                                        </div>
                                      )}
                                      <h3 className={cn(
                                        'font-semibold text-sm transition-colors duration-200',
                                        isAiRecommended ? 'text-purple-700 dark:text-purple-400' : 'text-foreground',
                                      )}>
                                        {suggestion.title}
                                      </h3>
                                    </div>

                                    <div className="flex flex-wrap gap-1 mt-1">
                                      {isAiRecommended && adaptiveScore > 0.8 && (
                                        <Badge variant="destructive" className="text-[10px] px-1.5 py-0.5">
                                          TOP RECOMMENDATION
                                        </Badge>
                                      )}
                                      <Badge
                                        variant={getPriorityBadgeVariant(suggestion.priority) as BadgeVariant}
                                        className="text-[10px] px-1.5 py-0.5"
                                      >
                                        {suggestion.priority.toUpperCase()}
                                      </Badge>
                                      <Badge
                                        variant={suggestion.complexity === 'beginner' ? 'default' :
                                          suggestion.complexity === 'intermediate' ? 'secondary' :
                                            suggestion.complexity === 'advanced' ? 'outline' : 'destructive'}
                                        className="text-[10px] px-1.5 py-0.5"
                                      >
                                        {suggestion.complexity}
                                      </Badge>
                                    </div>
                                  </div>

                                  {isAiRecommended && (
                                    <div className="flex-shrink-0 ml-2">
                                      <div
                                        className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white text-[10px] font-bold">
                                        AI
                                      </div>
                                    </div>
                                  )}
                                </div>

                                <p className="text-xs mt-2 text-muted-foreground line-clamp-2">
                                  {suggestion.description}
                                </p>

                                {(suggestion as any).relevance && (
                                  <div className="mt-2 flex flex-wrap gap-1">
                                    {(suggestion as any).relevance.context && (
                                      <Badge variant="secondary" className="text-[10px] bg-green-50/50">
                                        Context Match
                                      </Badge>
                                    )}
                                    {(suggestion as any).relevance.domain && (
                                      <Badge variant="secondary" className="text-[10px] bg-blue-50/50">
                                        Domain Match
                                      </Badge>
                                    )}
                                    {(suggestion as any).relevance.complexity && (
                                      <Badge variant="secondary" className="text-[10px] bg-purple-50/50">
                                        Complexity Match
                                      </Badge>
                                    )}
                                  </div>
                                )}

                                {suggestion.example && suggestion.example.trim() && (
                                  <div
                                    className="mt-3 p-2 bg-muted/40 rounded text-[11px] border border-border min-h-[60px] max-h-[80px] overflow-hidden text-ellipsis">
                                    <div className="flex items-start gap-1">
                                      <span className="font-medium flex-shrink-0">Example:</span>
                                      <span className="text-muted-foreground line-clamp-2">
                                        {suggestion.example}
                                      </span>
                                    </div>
                                  </div>
                                )}

                                {Array.isArray(suggestion.tags) && suggestion.tags.length > 0 && (
                                  <div className="mt-2 flex flex-wrap gap-1 max-h-[40px] overflow-hidden">
                                    {suggestion.tags.slice(0, 4).map((tag, index) => (
                                      <Badge key={index} variant="outline" className="text-[10px] px-1.5 py-0">
                                        {tag}
                                      </Badge>
                                    ))}
                                    {suggestion.tags.length > 4 && (
                                      <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                                        +{suggestion.tags.length - 4}
                                      </Badge>
                                    )}
                                  </div>
                                )}
                              </div>

                              <div className={cn(
                                'h-1 transition-all duration-500',
                                isAiRecommended
                                  ? 'bg-gradient-to-r from-purple-500 to-indigo-600'
                                  : 'bg-primary/20',
                              )}/>
                            </Card>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-md p-3">
                            <div className="space-y-2">
                              <p className="font-medium">{suggestion.title}</p>
                              <p>{suggestion.description}</p>

                              {isAiRecommended && (
                                <div className="space-y-1 pt-1 border-t border-border mt-1">
                                  <div className="flex justify-between text-xs">
                                    <span>AI Confidence Score</span>
                                    <span className={cn(
                                      adaptiveScore > 0.8 ? 'text-green-500 font-medium' :
                                        adaptiveScore > 0.6 ? 'text-yellow-500' : 'text-red-500',
                                    )}>
                                      {(adaptiveScore * 100).toFixed(1)}%
                                    </span>
                                  </div>
                                  <Progress
                                    value={adaptiveScore * 100}
                                    className={cn(
                                      adaptiveScore > 0.8 && 'bg-green-500 [&>div]:bg-green-600',
                                      adaptiveScore > 0.6 && adaptiveScore <= 0.8 && 'bg-yellow-500 [&>div]:bg-yellow-600',
                                      adaptiveScore <= 0.6 && 'bg-red-500 [&>div]:bg-red-600',
                                    )}
                                  />
                                </div>
                              )}

                              <div className="mt-2 text-xs space-y-1">
                                <div className="flex justify-between">
                                  <span className="font-medium">Category:</span>
                                  <span>{suggestion.category}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="font-medium">Domain:</span>
                                  <span>{suggestion.domain}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="font-medium">Intelligence:</span>
                                  <span>{formatIntelligenceLevel(suggestion.intelligenceLevel)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="font-medium">Effectiveness:</span>
                                  <span>{(suggestion.effectiveness * 100).toFixed(1)}%</span>
                                </div>
                              </div>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    );
                  })
                ) : (
                  <div className="col-span-full text-center py-12">
                    <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                      <Lightbulb className="h-8 w-8 text-muted-foreground"/>
                    </div>
                    <p className="text-lg font-medium text-foreground mb-2">
                      No suggestions found
                    </p>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your filters or search query to find relevant suggestions.
                    </p>
                    <div className="flex justify-center gap-2 flex-wrap">
                      <Button variant="outline" size="sm" onClick={() => {
                        setActiveCategory('all');
                        setActiveComplexity('all');
                        setActiveIntelligence('all');
                        setSearchQuery('');
                      }}>
                        Reset Filters
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </CardContent>

        <CardFooter className="border-t border-border p-4 bg-background/50 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Showing {filteredSuggestions.length} of {suggestions.length} suggestions
            </span>
            {enhancedAnalysis?.processingTime && (
              <Badge variant="secondary" className="text-xs">
                Analysis: {enhancedAnalysis.processingTime}ms
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Dialog.Root>
              <Dialog.Trigger>
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden md:flex"
                >
                  <Settings className="mr-1 h-3 w-3"/>
                  Configure AI
                </Button>
              </Dialog.Trigger>
              <Dialog.Content maxWidth="500px">
                <Dialog.Title className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary"/>
                  AI Brain Configuration
                </Dialog.Title>
                <Flex direction="column" gap="3">
                  <div className="py-4 max-h-[70vh] overflow-y-auto">
                    <BrainConfigPanel
                      config={brainInstance.getConfig()}
                      onConfigChange={(config) => brainInstance.updateConfig(config)}
                      isAdvancedMode={isAdvancedMode}
                    />
                  </div>
                </Flex>
                <Flex gap="3" mt="4" justify="end">
                  <Dialog.Close>
                    <Button>
                      Done
                    </Button>
                  </Dialog.Close>
                </Flex>
              </Dialog.Content>
            </Dialog.Root>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                // Re-analyze with current settings
                setIsLoading(true);
                setTimeout(() => {
                  const analysisResult = brainInstance.analyzePrompt(prompt, userId);
                  setEnhancedAnalysis(analysisResult);
                  setIsLoading(false);
                }, 300);
              }}
            >
              <RefreshCw className="mr-1 h-3 w-3"/>
              Re-analyze
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              Close Panel
            </Button>
          </div>
        </CardFooter>

        {/*<Dialog open={showConfigDialog} onOpenChange={setShowConfigDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary"/>
                AI Brain Configuration
              </DialogTitle>
            </DialogHeader>

            <div className="py-4 max-h-[60vh] overflow-y-auto">
              <BrainConfigPanel
                config={brainInstance.getConfig()}
                onConfigChange={(config) => brainInstance.updateConfig(config)}
                isAdvancedMode={isAdvancedMode}
              />
            </div>

            <div className="flex justify-end pt-4">
              <Button onClick={() => setShowConfigDialog(false)}>
                Done
              </Button>
            </div>
          </DialogContent>
        </Dialog>*/}
      </Card>
    </div>
  );
};

// Helper component for Atom icon
const AtomIcon = ({className}: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="1"></circle>
    <path d="M14.644 3.37a10 10 0 1 0-5.288 0"></path>
    <path d="M19.835 11.71a10 10 0 0 0-15.67 0"></path>
    <path d="M12 20.642a10 10 0 0 0 0-7.284"></path>
  </svg>
);

export default SmartSuggestionsPanel;
