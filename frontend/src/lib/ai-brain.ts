/**
 * AI Brain Module for Intelligent Prompt Analysis and Suggestions
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// Import the EnhancedAIBrainV2 class
import EnhancedAIBrainV2 from './ai-brain-enhanced';

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

  /** Awareness level */
  awareness: number;

  /** Understanding level */
  understanding: number;

  /** Adaptability score */
  adaptability: number;

  /** Limitations identified */
  limitations: string[];

  /** Learning indicators */
  learning: string[];

  /** Knowledge gained */
  knowledgeGained: number;

  /** Effectiveness score */
  effectiveness: number;

  /** Intelligence level */
  intelligenceLevel?: string;
}

/**
 * AI Brain for analyzing prompts and generating intelligent suggestions
 */
export class AIBrain {
  private static instance: AIBrain;
  private enhancedBrain: EnhancedAIBrainV2;

  private constructor() {
    // Initialize the EnhancedAIBrainV2 singleton
    this.enhancedBrain = EnhancedAIBrainV2.getInstance();
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
        confidence: 0,
        awareness: 0,
        understanding: 0,
        adaptability: 0,
        limitations: [],
        learning: [],
        knowledgeGained: 0,
        effectiveness: 0,
        intelligenceLevel: 'ai-like'
      };
    }

    // Use EnhancedAIBrainV2 for analysis
    const analysis = this.enhancedBrain.analyzePrompt(prompt);

    // Map EnhancedAIBrainV2 results to our BrainAnalysis interface
    return {
      keywords: analysis.keywords || [],
      context: analysis.context || 'general',
      intent: analysis.intent || 'general',
      complexity: analysis.complexity || 'intermediate',
      domain: analysis.domain || 'general',
      suggestions: analysis.suggestions || [],
      confidence: analysis.confidence || 0,
      awareness: analysis.awareness || 0,
      understanding: analysis.understanding || 0,
      adaptability: analysis.adaptability || 0,
      limitations: analysis.limitations || [],
      learning: analysis.learning || [],
      knowledgeGained: analysis.knowledgeGained || 0,
      effectiveness: analysis.effectiveness || 0,
      intelligenceLevel: analysis.intelligenceLevel
    };
  }

  /**
   * Generate dynamic suggestions based on the prompt content
   * @param prompt - The prompt text
   * @returns Dynamic suggestions
   */
  public generateDynamicSuggestions(prompt: string): string[] {
    // Use EnhancedAIBrainV2 to get enhanced suggestions
    const analysis = this.enhancedBrain.analyzePrompt(prompt);
    return analysis.suggestions || [];
  }
}

// Export a singleton instance for easy access
export const aiBrain = AIBrain.getInstance();
