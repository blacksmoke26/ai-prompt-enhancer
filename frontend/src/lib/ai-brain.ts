/**
 * AI Brain Module for Intelligent Prompt Analysis and Suggestions
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

/**
 * Analysis result from the AI brain
 */
export interface BrainAnalysis {
  /** Detected keywords in the prompt */
  keywords: string[];
  
  /** Context category of the prompt */
  context: string;
  
  /** Primary intent of the prompt */
  intent: string;
  
  /** Detected complexity level */
  complexity: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  
  /** Detected domain or subject area */
  domain: string;
  
  /** Suggested improvements */
  suggestions: string[];
  
  /** Confidence score (0-100) */
  confidence: number;
}

/**
 * AI Brain for analyzing prompts and generating intelligent suggestions
 */
export class AIBrain {
  private static instance: AIBrain;
  
  private constructor() {
    // Private constructor to enforce singleton pattern
  }
  
  /**
   * Get the singleton instance of the AI brain
   */
  public static getInstance(): AIBrain {
    if (!AIBrain.instance) {
      AIBrain.instance = new AIBrain();
    }
    return AIBrain.instance;
  }
  
  /**
   * Analyze a prompt and generate insights
   * @param prompt - The prompt text to analyze
   * @returns Analysis result
   */
  public analyzePrompt(prompt: string): BrainAnalysis {
    if (!prompt || typeof prompt !== 'string') {
      return {
        keywords: [],
        context: 'general',
        intent: 'general',
        complexity: 'intermediate',
        domain: 'general',
        suggestions: [],
        confidence: 0
      };
    }
    
    // Extract keywords
    const keywords = this.extractKeywords(prompt);
    
    // Determine context
    const context = this.determineContext(prompt);
    
    // Determine intent
    const intent = this.determineIntent(prompt);
    
    // Determine complexity
    const complexity = this.determineComplexity(prompt);
    
    // Determine domain
    const domain = this.determineDomain(prompt);
    
    // Generate suggestions
    const suggestions = this.generateSuggestions(prompt, context, intent, complexity);
    
    // Calculate confidence
    const confidence = this.calculateConfidence(prompt, keywords.length);
    
    return {
      keywords,
      context,
      intent,
      complexity,
      domain,
      suggestions,
      confidence
    };
  }
  
  /**
   * Extract keywords from prompt text
   * @param text - The text to extract keywords from
   * @returns Array of keywords
   */
  private extractKeywords(text: string): string[] {
    return text
      .toLowerCase()
      .match(/\b\w+\b/g)
      ?.filter(word => word.length > 3)
      .slice(0, 10) || [];
  }
  
  /**
   * Determine the context category of the prompt
   * @param text - The prompt text
   * @returns Context category
   */
  private determineContext(text: string): string {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('explain') || lowerText.includes('describe') || lowerText.includes('understand')) {
      return 'explanation';
    } else if (lowerText.includes('compare') || lowerText.includes('contrast')) {
      return 'comparison';
    } else if (lowerText.includes('write') || lowerText.includes('create') || lowerText.includes('generate')) {
      return 'creation';
    } else if (lowerText.includes('analyze') || lowerText.includes('evaluate') || lowerText.includes('assess')) {
      return 'analysis';
    } else if (lowerText.includes('solve') || lowerText.includes('resolve') || lowerText.includes('fix')) {
      return 'problem-solving';
    } else if (lowerText.includes('summarize') || lowerText.includes('brief')) {
      return 'summary';
    } else if (lowerText.includes('list') || lowerText.includes('enumerate')) {
      return 'enumeration';
    } else if (lowerText.includes('recommend') || lowerText.includes('suggest')) {
      return 'recommendation';
    } else if (lowerText.includes('predict') || lowerText.includes('forecast')) {
      return 'prediction';
    } else {
      return 'general';
    }
  }
  
  /**
   * Determine the primary intent of the prompt
   * @param text - The prompt text
   * @returns Primary intent
   */
  private determineIntent(text: string): string {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('explain') || lowerText.includes('describe') || lowerText.includes('understand')) {
      return 'clarification';
    } else if (lowerText.includes('compare') || lowerText.includes('contrast')) {
      return 'analysis';
    } else if (lowerText.includes('write') || lowerText.includes('create') || lowerText.includes('generate')) {
      return 'writing';
    } else if (lowerText.includes('analyze') || lowerText.includes('evaluate') || lowerText.includes('assess')) {
      return 'evaluation';
    } else if (lowerText.includes('solve') || lowerText.includes('resolve') || lowerText.includes('fix')) {
      return 'solution';
    } else if (lowerText.includes('summarize') || lowerText.includes('brief')) {
      return 'condensation';
    } else if (lowerText.includes('list') || lowerText.includes('enumerate')) {
      return 'organization';
    } else if (lowerText.includes('recommend') || lowerText.includes('suggest')) {
      return 'advice';
    } else if (lowerText.includes('predict') || lowerText.includes('forecast')) {
      return 'forecasting';
    } else {
      return 'general';
    }
  }
  
  /**
   * Determine the complexity level of the prompt
   * @param text - The prompt text
   * @returns Complexity level
   */
  private determineComplexity(text: string): 'beginner' | 'intermediate' | 'advanced' | 'expert' {
    const words = text.split(/\s+/).length;
    const sentences = text.split(/[.!?]+/).length;
    
    // Simple heuristics for complexity
    if (words < 10) return 'beginner';
    if (words < 25) return 'intermediate';
    if (words < 50) return 'advanced';
    return 'expert';
  }
  
  /**
   * Determine the domain or subject area of the prompt
   * @param text - The prompt text
   * @returns Domain category
   */
  private determineDomain(text: string): string {
    const lowerText = text.toLowerCase();
    
    const domains = [
      { keywords: ['health', 'medical', 'doctor', 'patient'], domain: 'healthcare' },
      { keywords: ['finance', 'money', 'bank', 'investment'], domain: 'finance' },
      { keywords: ['education', 'school', 'student', 'learning'], domain: 'education' },
      { keywords: ['technology', 'computer', 'software', 'ai'], domain: 'technology' },
      { keywords: ['business', 'company', 'marketing', 'strategy'], domain: 'business' },
      { keywords: ['science', 'research', 'experiment', 'theory'], domain: 'science' },
      { keywords: ['art', 'creative', 'design', 'painting'], domain: 'arts' },
      { keywords: ['environment', 'climate', 'sustainability', 'nature'], domain: 'environment' },
      { keywords: ['politics', 'government', 'policy', 'election'], domain: 'politics' },
      { keywords: ['sports', 'game', 'athlete', 'competition'], domain: 'sports' }
    ];
    
    for (const domain of domains) {
      if (domain.keywords.some(keyword => lowerText.includes(keyword))) {
        return domain.domain;
      }
    }
    
    return 'general';
  }
  
  /**
   * Generate suggestions based on analysis
   * @param prompt - The original prompt
   * @param context - The detected context
   * @param intent - The detected intent
   * @param complexity - The detected complexity
   * @returns Array of suggestions
   */
  private generateSuggestions(prompt: string, context: string, intent: string, complexity: string): string[] {
    const suggestions: string[] = [];
    
    // Context-based suggestions
    if (context === 'explanation') {
      suggestions.push('Break down your explanation into clear sections with logical flow');
      suggestions.push('Use analogies to make complex concepts more accessible');
    }
    
    if (context === 'analysis') {
      suggestions.push('Apply established analytical frameworks');
      suggestions.push('Consider multiple perspectives or viewpoints');
    }
    
    if (context === 'problem-solving') {
      suggestions.push('Follow structured problem-solving methodologies');
      suggestions.push('Consider constraints and limitations in your approach');
    }
    
    if (intent === 'writing') {
      suggestions.push('Use clear writing patterns to improve readability');
      suggestions.push('Apply appropriate tone and style for your audience');
    }
    
    // Complexity-based suggestions
    if (complexity === 'intermediate' || complexity === 'advanced') {
      suggestions.push('Include concrete examples to illustrate points');
      suggestions.push('Add reasoning to support your arguments');
    }
    
    if (complexity === 'expert') {
      suggestions.push('Demonstrate deep understanding through nuanced details');
      suggestions.push('Integrate multiple concepts or theories');
    }
    
    // General suggestions
    if (prompt.length > 100) {
      suggestions.push('Consider breaking down complex prompts into smaller, focused questions');
    }
    
    if (prompt.includes('what') || prompt.includes('how')) {
      suggestions.push('Ensure your questions are specific and actionable');
    }
    
    return suggestions;
  }
  
  /**
   * Calculate confidence score for the analysis
   * @param prompt - The prompt text
   * @param keywordCount - Number of keywords found
   * @returns Confidence score (0-100)
   */
  private calculateConfidence(prompt: string, keywordCount: number): number {
    if (!prompt) return 0;
    
    // Base confidence on prompt length and keyword count
    const lengthScore = Math.min(100, (prompt.length / 50) * 50);
    const keywordScore = Math.min(100, keywordCount * 5);
    
    // Average the scores
    return Math.round((lengthScore + keywordScore) / 2);
  }
  
  /**
   * Generate dynamic suggestions based on the prompt content
   * @param prompt - The prompt text
   * @returns Dynamic suggestions
   */
  public generateDynamicSuggestions(prompt: string): string[] {
    const analysis = this.analyzePrompt(prompt);
    const suggestions: string[] = [];
    
    // Add domain-specific suggestions
    if (analysis.domain === 'technology') {
      suggestions.push('Include technical specifications or implementation details');
      suggestions.push('Consider different platforms or frameworks');
    } else if (analysis.domain === 'healthcare') {
      suggestions.push('Reference medical or scientific sources');
      suggestions.push('Include relevant health considerations or guidelines');
    } else if (analysis.domain === 'business') {
      suggestions.push('Include market data or case studies');
      suggestions.push('Consider ROI or cost-benefit analysis');
    }
    
    // Add context-specific suggestions
    if (analysis.context === 'explanation') {
      suggestions.push('Define key terms before explaining concepts');
      suggestions.push('Use step-by-step breakdowns for complex topics');
    } else if (analysis.context === 'analysis') {
      suggestions.push('Use data-driven evidence to support arguments');
      suggestions.push('Include comparative analysis with benchmarks');
    }
    
    return suggestions;
  }
}

// Export a singleton instance for easy access
export const aiBrain = AIBrain.getInstance();