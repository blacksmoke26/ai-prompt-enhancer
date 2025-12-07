/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useEffect, useState} from 'react';

// ui components
import {Badge} from '~/components/ui/Badge';
import {Button} from '~/components/ui/Button';
import {Input} from '~/components/ui/Input';
import {Select} from '~/components/ui/Select';
import {Card, CardContent, CardHeader, CardTitle} from '~/components/ui/Card';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '~/components/ui/Tooltip';

// AI brain module
import {aiBrain, BrainAnalysis} from '~/lib/ai-brain';
import EnhancedAIBrainV2 from '~/lib/ai-brain-enhanced';
import {
  allSuggestions,
  categories,
  complexities,
  intelligenceLevels,
  SmartSuggestion,
} from '~/constants/prompt-suggestions.ts';

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
}

/**
 * Smart suggestions panel component with AI-like brain
 * @example
 * ```tsx
 * <SmartSuggestionsPanel
 *   isVisible={showSuggestions}
 *   onClose={() => setShowSuggestions(false)}
 *   prompt={content}
 *   response={enhancementResponse}
 * />
 * ```
 */
const SmartSuggestionsPanel: React.FC<SmartSuggestionsPanelProps> = (props) => {
  const {prompt, isVisible, onClose, response} = props;

  const [suggestions, setSuggestions] = useState<SmartSuggestion[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeComplexity, setActiveComplexity] = useState<string>('all');
  const [activeIntelligence, setActiveIntelligence] = useState<string>('all');
  const [filteredSuggestions, setFilteredSuggestions] = useState<SmartSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [brainAnalysis, setBrainAnalysis] = useState<BrainAnalysis | null>(null);

  // Initialize EnhancedAIBrainV2 instance
  const enhancedBrain = EnhancedAIBrainV2.getInstance();

  useEffect(() => {
    if (isVisible) {
      setIsLoading(true);

      // Analyze prompt with AI brain
      const analysisResult = aiBrain.analyzePrompt(prompt);
      setBrainAnalysis(analysisResult);

      // Generate dynamic suggestions using EnhancedAIBrainV2
      const enhancedAnalysis = enhancedBrain.analyzePrompt(prompt);
      const enhancedSuggestions = enhancedAnalysis.suggestions || [];

      // Get all suggestions including dynamic ones
      const allSuggestionObjects: SmartSuggestion[] = [...allSuggestions];

      // Add enhanced suggestions as dynamic suggestions
      enhancedSuggestions.forEach((suggestion: string | SmartSuggestion, index: number) => {
        if ( typeof suggestion === 'string' ) {
          allSuggestionObjects.push({
            id: `enhanced-${index}`,
            title: 'Enhanced Suggestion',
            description: suggestion,
            complexity: enhancedAnalysis.complexity || 'intermediate',
            category: enhancedAnalysis.context || 'general',
            priority: 'medium',
            example: '',
            tags: ['enhanced', 'ai-brain'],
            intelligenceLevel: enhancedAnalysis.intelligenceLevel || 'ai-like',
            domain: enhancedAnalysis.domain || 'general',
            effectiveness: enhancedAnalysis.effectiveness || 0
          });
        } else {
          allSuggestionObjects.push(suggestion);
        }
      });

      setSuggestions(allSuggestionObjects);
      setIsLoading(false);
    }
  }, [enhancedBrain, isVisible, prompt]);

  useEffect(() => {
    let filtered = suggestions;

    if (activeCategory !== 'all') {
      filtered = filtered.filter(s => s.category === activeCategory);
    }

    if (activeComplexity !== 'all') {
      filtered = filtered.filter(s => s.complexity === activeComplexity);
    }

    if (activeIntelligence !== 'all') {
      filtered = filtered.filter(s => s.intelligenceLevel === activeIntelligence);
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(s =>
        s.title.toLowerCase().includes(query) ||
        s.description.toLowerCase().includes(query) ||
        s.tags.some(tag => tag.toLowerCase().includes(query)),
      );
    }

    setFilteredSuggestions(filtered);
  }, [activeCategory, activeComplexity, activeIntelligence, searchQuery, suggestions]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
              <span className="text-white text-lg">🧠</span>
            </div>
            AI-Powered Prompt Suggestions
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ✕
          </Button>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto p-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <span className="ml-3">Analyzing your prompt...</span>
            </div>
          ) : (
            <>
              <div className="mb-4 flex flex-wrap gap-2">
                <Badge variant="secondary">Prompt: {prompt.length} characters</Badge>
                <Badge variant="secondary">Suggestions: {filteredSuggestions.length}</Badge>
                {response && (
                  <Badge variant="secondary">Enhanced: {response.enhancedPrompt.length} chars</Badge>
                )}
                {brainAnalysis && (
                  <Badge variant="secondary">Confidence: {brainAnalysis.confidence}%</Badge>
                )}
              </div>

              <div className="mb-4 flex flex-wrap gap-2">
                <div className="relative flex-1 min-w-[200px]">
                  <Input
                    type="text"
                    name="suggestion-search"
                    placeholder="Search suggestions..."
                    className="w-full border rounded px-3 py-2 text-sm pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <span className="absolute left-3 top-2.5 text-gray-500">🔍</span>
                </div>

                <Select
                  className="min-w-[150px]"
                  value={activeCategory}
                  options={categories.map(value => ({label: value.charAt(0).toUpperCase() + value.slice(1), value}))}
                  onChange={value => setActiveCategory(value as string)}
                />

                <Select
                  className="min-w-[150px]"
                  value={activeComplexity}
                  options={complexities.map(value => ({label: value.charAt(0).toUpperCase() + value.slice(1), value}))}
                  onChange={value => setActiveComplexity(value as string)}
                />

                <Select
                  className="min-w-[150px]"
                  value={activeIntelligence}
                  options={intelligenceLevels.map(value => ({label: value.charAt(0).toUpperCase() + value.slice(1), value}))}
                  onChange={value => setActiveIntelligence(value as string)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSuggestions.length > 0 ? (
                  filteredSuggestions.map((suggestion) => (
                    <TooltipProvider key={suggestion.id}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Card
                            className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
                              suggestion.priority === 'high' ? 'border-l-4 border-red-500' :
                                suggestion.priority === 'medium' ? 'border-l-4 border-yellow-500' :
                                  'border-l-4 border-green-500'
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <h3 className="font-semibold text-sm">{suggestion.title}</h3>
                              <Badge
                                variant={suggestion.complexity === 'beginner' ? 'default' :
                                  suggestion.complexity === 'intermediate' ? 'secondary' :
                                    suggestion.complexity === 'advanced' ? 'outline' : 'destructive'}
                                className="text-xs"
                              >
                                {suggestion.complexity}
                              </Badge>
                            </div>
                            <p className="text-xs mt-2 text-muted-foreground">{suggestion.description}</p>
                            {suggestion?.example?.trim?.() ? (
                              <div className="mt-2 text-xs bg-muted p-2 rounded min-h-[80px]">
                                <strong>Example:</strong> {suggestion.example}
                              </div>
                            ) : (
                              <div className="mt-2 text-xs bg-muted p-2 rounded min-h-[80px]">
                                <strong>Example:</strong> N/A
                              </div>
                            )}
                            <div className="mt-2 flex flex-wrap gap-1">
                              {Array.isArray(suggestion.tags) &&
                                suggestion.tags.map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                            </div>
                          </Card>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-md">
                          <p>{suggestion.description}</p>
                          <div className="mt-2 text-xs">
                            <strong>Category:</strong> {suggestion.category}<br/>
                            <strong>Complexity:</strong> {suggestion.complexity}<br/>
                            <strong>Priority:</strong> {suggestion.priority}<br/>
                            <strong>Intelligence:</strong> {suggestion.intelligenceLevel}
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))
                ) : (
                  <div className="col-span-full text-center py-8 text-muted-foreground">
                    No suggestions match your filters. Try adjusting your search or filters.
                  </div>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SmartSuggestionsPanel;
