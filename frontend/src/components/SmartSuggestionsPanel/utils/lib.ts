/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// libs
import {BrainAnalysis} from '~/lib/ai-brain';
import {EnhancedAIBrainConfig} from '~/lib/ai-brain-enhanced';

/**
 * Represents the different operational modes available in the system, ranging from basic to advanced and specialized modes.
 * Used to control behavior, UI rendering, and analysis depth across components.
 */
export type Mode = 'basic' | 'advanced' | 'quantum' | 'emergent';

/**
 * Formats a string representing an intelligence level by replacing hyphens with spaces and capitalizing each word.
 * Useful for normalizing and displaying human-readable intelligence level labels.
 *
 * Example:
 * formatIntelligenceLevel("ai-enhanced") // returns "Ai Enhanced"
 */
export const formatIntelligenceLevel = (level: string) => {
  return level
    .replace(/-/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());
};

/**
 * Returns a badge variant based on the priority level, used for visual differentiation in UI components.
 * Maps 'critical' → 'destructive', 'high' → 'warning', 'medium' → 'secondary', and defaults to 'default'.
 *
 * Example:
 * getPriorityBadgeVariant('high') // returns 'warning'
 * getPriorityBadgeVariant('low')  // returns 'default'
 */
export const getPriorityBadgeVariant = (priority: string) => {
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

/**
 * Returns a configuration object tailored to the specified AI operational mode.
 * Used to initialize or update the EnhancedAIBrain configuration based on selected mode.
 *
 * Example:
 * const config = getConfigForMode('quantum');
 * console.log(config.advanced.enableQuantumReasoning); // true
 */
export const getConfigForMode = (mode: Mode): Partial<EnhancedAIBrainConfig> => {
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

/**
 * The initial default configuration for the EnhancedAIBrain.
 * Provides base settings for core features, advanced capabilities, and neural weights.
 *
 * Example:
 * const brain = new EnhancedAIBrainV3({
 *   ...INITIAL_CONFIG,
 *   core: {
 *     ...INITIAL_CONFIG.core,
 *     enableSelfAssessment: true,
 *   },
 * });
 */
export const INITIAL_CONFIG: Partial<EnhancedAIBrainConfig> = {
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

/**
 * Maps a BrainAnalysis result into a standardized format for consistent processing.
 * Used to extract and structure key analysis properties into a new object.
 *
 * Example:
 * const analysis = getMappedAnalysis(result);
 * console.log(analysis.confidence); // 0.92
 */
export const getMappedAnalysis = (analysisResult: BrainAnalysis) => {
  return {
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
};
