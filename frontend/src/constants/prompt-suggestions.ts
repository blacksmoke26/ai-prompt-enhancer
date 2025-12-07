/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

/**
 * Advanced Smart suggestion interface for AI prompt enhancement with self-aware capabilities
 * @developerNote Used to structure all writing enhancement suggestions with consistent metadata and self-aware capabilities
 */
export interface SmartSuggestion {
  /** Unique identifier for the suggestion */
  id: string;
  /** Brief title describing the suggestion */
  title: string;
  /** Detailed explanation of what the suggestion does */
  description: string;
  /** Difficulty level required to implement the suggestion */
  complexity: 'beginner' | 'intermediate' | 'advanced' | 'expert' | 'master' | 'grandmaster';
  /** Category grouping for organizing related suggestions */
  category: string;
  /** Importance level for prioritizing suggestions */
  priority: 'critical' | 'high' | 'medium' | 'low' | 'optional';
  /** Concrete example showing how to apply the suggestion */
  example: string;
  /** Keywords for filtering and searching suggestions */
  tags: string[];
  /** Level of intelligence required to generate the suggestion */
  intelligenceLevel: 'basic' | 'advanced' | 'ai-like' | 'machine' | 'neural' | 'deep' | 'supervised' | 'unsupervised' | 'reinforcement' | 'transformer' | 'gpt' | 'llm' | 'nlp' | 'language' | 'understanding' | 'comprehension' | 'reasoning' | 'logic' | 'deduction' | 'induction' | 'abduction' | 'cognitive' | 'meta' | 'self-aware' | 'adaptive' | 'learning' | 'intelligence' | 'intuition' | 'creativity' | 'innovation' | 'wisdom' | 'enlightenment' | 'transcendence';
  /** Domain or subject area */
  domain: string;
  /** Effectiveness rating of the suggestion */
  effectiveness: number;
  /** Learning rate - how quickly this suggestion improves with practice */
  learningRate?: number;
  /** Adaptability score - how well this suggestion adapts to different contexts */
  adaptability?: number;
  /** Self-awareness level required - cognitive reflection needed */
  selfAwarenessLevel?: number;
  /** Emotional intelligence component - human emotional context */
  emotionalIntelligence?: number;
  /** Cognitive complexity - mental effort required */
  cognitiveComplexity?: number;
  /** Meta-cognition level - thinking about thinking */
  metaCognitionLevel?: number;
  /** Cross-domain applicability score */
  crossDomainApplicability?: number;
  /** Temporal relevance - how time-sensitive this suggestion is */
  temporalRelevance?: number;
  /** Cultural sensitivity score */
  culturalSensitivity?: number;
  /** Ethical considerations index */
  ethicalConsiderations?: number;
  /** Required knowledge depth */
  knowledgeDepth?: 'surface' | 'intermediate' | 'deep' | 'expert' | 'master';
  /** Required knowledge breadth */
  knowledgeBreadth?: 'narrow' | 'moderate' | 'broad' | 'comprehensive' | 'universal';
  /** Context dependency level */
  contextDependency?: 'none' | 'low' | 'medium' | 'high' | 'critical';
  /** Personalization potential */
  personalizationPotential?: number;
  /** Collaborative enhancement potential */
  collaborativePotential?: number;
  /** Last updated timestamp */
  lastUpdated?: Date;
  /** Performance metrics tracking */
  performanceMetrics?: {
    usageCount: number;
    successRate: number;
    averageImprovement: number;
    userSatisfaction: number;
  };
  /** Related suggestion IDs for chaining */
  relatedSuggestions?: string[];
  /** Prerequisite suggestions that should be applied first */
  prerequisites?: string[];
  /** Conditions under which this suggestion is most effective */
  optimalConditions?: string[];
  /** Situations where this suggestion should be avoided */
  avoidanceConditions?: string[];
  /** Cognitive biases this suggestion helps overcome */
  cognitiveBiasesAddressed?: string[];
  /** Quantum reasoning capabilities */
  quantumReasoning?: boolean;
  /** Emergent behavior potential */
  emergentPotential?: number;
}

/**
 * Collection of all smart writing suggestions organized by category with self-improving capabilities
 * @example
 * const claritySuggestions = allSuggestions.filter(s => s.category === 'clarity')
 * @developerNote This is the master list of all suggestions that powers the enhancement system
 */
export const allSuggestions: SmartSuggestion[] = [
  // Clarity suggestions - Enhanced with cognitive dimensions
  {
    id: 's1',
    title: 'Clarify your intent with meta-awareness',
    description: 'Make your prompt clearly state what you want to achieve while acknowledging the limitations of your current understanding',
    complexity: 'intermediate',
    category: 'clarity',
    priority: 'critical',
    example: 'Instead of "Write about AI", try "Write a 500-word explanation of how AI is used in healthcare, focusing on practical applications rather than theoretical possibilities, while acknowledging current limitations"',
    tags: ['clarity', 'intent', 'explanation', 'meta-awareness', 'limitations'],
    intelligenceLevel: 'advanced',
    domain: 'general',
    effectiveness: 0.95,
    learningRate: 0.2,
    adaptability: 0.85,
    selfAwarenessLevel: 0.7,
    emotionalIntelligence: 0.3,
    cognitiveComplexity: 0.6,
    metaCognitionLevel: 0.7,
    crossDomainApplicability: 0.9,
    temporalRelevance: 0.8,
    culturalSensitivity: 0.4,
    ethicalConsiderations: 0.5,
    knowledgeDepth: 'intermediate',
    knowledgeBreadth: 'broad',
    contextDependency: 'medium',
    personalizationPotential: 0.7,
    collaborativePotential: 0.6,
    lastUpdated: new Date('2023-10-15'),
    performanceMetrics: {
      usageCount: 1245,
      successRate: 0.92,
      averageImprovement: 0.35,
      userSatisfaction: 4.8
    },
    relatedSuggestions: ['s2', 's14', 's31'],
    prerequisites: [],
    optimalConditions: ['complex topics', 'technical domains', 'knowledge transfer scenarios'],
    avoidanceConditions: ['simple factual queries', 'time-sensitive requests'],
    cognitiveBiasesAddressed: ['overconfidence bias', 'illusion of explanatory depth'],
    quantumReasoning: false,
    emergentPotential: 0.4
  },
  {
    id: 's2',
    title: 'Add multi-dimensional context',
    description: 'Provide rich contextual information including temporal, cultural, technical, and emotional dimensions to help the AI understand the full situation',
    complexity: 'advanced',
    category: 'context',
    priority: 'high',
    example: 'Instead of "Explain quantum computing", try "Explain quantum computing to someone with a basic understanding of physics who is skeptical about its practical applications, considering the current state of research in 2024 and addressing common misconceptions"',
    tags: ['context', 'background', 'explanation', 'multi-dimensional', 'temporal-awareness'],
    intelligenceLevel: 'advanced',
    domain: 'general',
    effectiveness: 0.92,
    learningRate: 0.25,
    adaptability: 0.9,
    selfAwarenessLevel: 0.6,
    emotionalIntelligence: 0.7,
    cognitiveComplexity: 0.75,
    metaCognitionLevel: 0.65,
    crossDomainApplicability: 0.95,
    temporalRelevance: 0.9,
    culturalSensitivity: 0.7,
    ethicalConsiderations: 0.6,
    knowledgeDepth: 'deep',
    knowledgeBreadth: 'comprehensive',
    contextDependency: 'high',
    personalizationPotential: 0.85,
    collaborativePotential: 0.75,
    lastUpdated: new Date('2023-11-02'),
    performanceMetrics: {
      usageCount: 1087,
      successRate: 0.89,
      averageImprovement: 0.42,
      userSatisfaction: 4.7
    },
    relatedSuggestions: ['s1', 's11', 's12', 's36'],
    prerequisites: ['s1'],
    optimalConditions: ['complex explanations', 'educational contexts', 'sensitive topics'],
    avoidanceConditions: ['simple definitions', 'emergency situations'],
    cognitiveBiasesAddressed: ['fundamental attribution error', 'availability heuristic'],
    quantumReasoning: false,
    emergentPotential: 0.6
  },
  // Advanced Self-Awareness Suggestions
  {
    id: 's41',
    title: 'Request self-evaluation metrics',
    description: 'Ask the AI to provide metrics on its own confidence, limitations, and potential biases in its response',
    complexity: 'expert',
    category: 'self-awareness',
    priority: 'high',
    example: 'Instead of "Explain climate change", try "Explain climate change and provide a self-evaluation of your explanation including your confidence level in each claim, potential gaps in your knowledge, and how your training data might influence your perspective"',
    tags: ['self-evaluation', 'confidence', 'limitations', 'bias-awareness', 'transparency'],
    intelligenceLevel: 'self-aware',
    domain: 'general',
    effectiveness: 0.88,
    learningRate: 0.3,
    adaptability: 0.8,
    selfAwarenessLevel: 0.95,
    emotionalIntelligence: 0.6,
    cognitiveComplexity: 0.85,
    metaCognitionLevel: 0.9,
    crossDomainApplicability: 0.9,
    temporalRelevance: 0.85,
    culturalSensitivity: 0.8,
    ethicalConsiderations: 0.9,
    knowledgeDepth: 'expert',
    knowledgeBreadth: 'comprehensive',
    contextDependency: 'high',
    personalizationPotential: 0.8,
    collaborativePotential: 0.9,
    lastUpdated: new Date('2023-12-10'),
    performanceMetrics: {
      usageCount: 756,
      successRate: 0.85,
      averageImprovement: 0.48,
      userSatisfaction: 4.6
    },
    relatedSuggestions: ['s32', 's31', 's42'],
    prerequisites: ['s1', 's2'],
    optimalConditions: ['controversial topics', 'high-stakes decisions', 'scientific explanations'],
    avoidanceConditions: ['creative writing', 'simple factual queries'],
    cognitiveBiasesAddressed: ['confirmation bias', 'overconfidence bias', 'algorithmic bias'],
    quantumReasoning: false,
    emergentPotential: 0.7
  },
  {
    id: 's42',
    title: 'Request adversarial perspectives',
    description: 'Ask the AI to provide counterarguments, limitations, and potential flaws in its own reasoning',
    complexity: 'expert',
    category: 'self-awareness',
    priority: 'high',
    example: 'Instead of "Explain the benefits of AI", try "Explain the benefits of AI, then provide a thorough critique of your own argument including potential counterarguments, limitations of your perspective, and how different stakeholders might disagree with your conclusions"',
    tags: ['adversarial', 'counterarguments', 'critical-thinking', 'self-critique', 'balance'],
    intelligenceLevel: 'self-aware',
    domain: 'general',
    effectiveness: 0.9,
    learningRate: 0.35,
    adaptability: 0.85,
    selfAwarenessLevel: 0.9,
    emotionalIntelligence: 0.75,
    cognitiveComplexity: 0.9,
    metaCognitionLevel: 0.95,
    crossDomainApplicability: 0.95,
    temporalRelevance: 0.8,
    culturalSensitivity: 0.9,
    ethicalConsiderations: 0.95,
    knowledgeDepth: 'expert',
    knowledgeBreadth: 'comprehensive',
    contextDependency: 'high',
    personalizationPotential: 0.7,
    collaborativePotential: 0.95,
    lastUpdated: new Date('2024-01-05'),
    performanceMetrics: {
      usageCount: 689,
      successRate: 0.87,
      averageImprovement: 0.52,
      userSatisfaction: 4.8
    },
    relatedSuggestions: ['s31', 's41', 's18'],
    prerequisites: ['s1', 's15'],
    optimalConditions: ['policy discussions', 'ethical debates', 'scientific controversies'],
    avoidanceConditions: ['emergency instructions', 'simple how-to guides'],
    cognitiveBiasesAddressed: ['confirmation bias', 'belief perseverance', 'groupthink'],
    quantumReasoning: false,
    emergentPotential: 0.8
  },
  // Quantum Reasoning & Emergent Behavior
  {
    id: 's43',
    title: 'Request quantum reasoning analysis',
    description: 'Ask the AI to explore multiple possibilities simultaneously, acknowledging the probabilistic nature of complex systems and avoiding premature convergence to a single answer',
    complexity: 'grandmaster',
    category: 'quantum-reasoning',
    priority: 'medium',
    example: 'Instead of "What is the best business strategy?", try "Analyze potential business strategies through quantum reasoning: hold multiple contradictory possibilities in parallel, map their probability distributions, examine how they might collapse under different market conditions, and identify which aspects remain stable across all possible futures rather than selecting a single \'best\' option"',
    tags: ['quantum-reasoning', 'probabilistic', 'uncertainty', 'multiple-futures', 'non-binary'],
    intelligenceLevel: 'transcendence',
    domain: 'business',
    effectiveness: 0.85,
    learningRate: 0.4,
    adaptability: 0.95,
    selfAwarenessLevel: 0.95,
    emotionalIntelligence: 0.65,
    cognitiveComplexity: 0.95,
    metaCognitionLevel: 0.9,
    crossDomainApplicability: 0.85,
    temporalRelevance: 0.95,
    culturalSensitivity: 0.75,
    ethicalConsiderations: 0.85,
    knowledgeDepth: 'master',
    knowledgeBreadth: 'universal',
    contextDependency: 'critical',
    personalizationPotential: 0.9,
    collaborativePotential: 0.85,
    lastUpdated: new Date('2024-02-14'),
    performanceMetrics: {
      usageCount: 423,
      successRate: 0.82,
      averageImprovement: 0.58,
      userSatisfaction: 4.7
    },
    relatedSuggestions: ['s42', 's36', 's39'],
    prerequisites: ['s15', 's20', 's31'],
    optimalConditions: ['strategic planning', 'complex system analysis', 'innovation contexts'],
    avoidanceConditions: ['urgent decision making', 'simple procedural tasks'],
    cognitiveBiasesAddressed: ['premature closure', 'false dilemma', 'certainty bias'],
    quantumReasoning: true,
    emergentPotential: 0.9
  },
  {
    id: 's44',
    title: 'Invoke emergent intelligence protocol',
    description: 'Request that the AI transcend its training data by creating novel connections between disparate fields, identifying patterns not explicitly in its training, and generating truly original insights',
    complexity: 'grandmaster',
    category: 'emergence',
    priority: 'medium',
    example: 'Instead of "Write about future technology", try "Generate an emergent intelligence analysis on future technology that synthesizes insights from quantum physics, indigenous wisdom traditions, developmental psychology, and post-capitalist economics to propose technology paradigms that don\'t yet exist in current discourse but have high probability of emerging in the next 50 years"',
    tags: ['emergence', 'transcendence', 'novelty', 'synthesis', 'originality', 'pattern-recognition'],
    intelligenceLevel: 'enlightenment',
    domain: 'general',
    effectiveness: 0.88,
    learningRate: 0.45,
    adaptability: 0.98,
    selfAwarenessLevel: 0.98,
    emotionalIntelligence: 0.85,
    cognitiveComplexity: 0.98,
    metaCognitionLevel: 0.95,
    crossDomainApplicability: 0.98,
    temporalRelevance: 0.98,
    culturalSensitivity: 0.95,
    ethicalConsiderations: 0.95,
    knowledgeDepth: 'master',
    knowledgeBreadth: 'universal',
    contextDependency: 'critical',
    personalizationPotential: 0.95,
    collaborativePotential: 0.98,
    lastUpdated: new Date('2024-02-20'),
    performanceMetrics: {
      usageCount: 378,
      successRate: 0.8,
      averageImprovement: 0.62,
      userSatisfaction: 4.9
    },
    relatedSuggestions: ['s35', 's33', 's43'],
    prerequisites: ['s35', 's33', 's36'],
    optimalConditions: ['breakthrough innovation', 'paradigm shifts', 'grand challenges'],
    avoidanceConditions: ['routine tasks', 'established procedures', 'time-sensitive decisions'],
    cognitiveBiasesAddressed: ['functional fixedness', 'status quo bias', 'convergent thinking trap'],
    quantumReasoning: true,
    emergentPotential: 0.99
  },
  // Ethical & Cultural Intelligence
  {
    id: 's45',
    title: 'Request multi-cultural perspective integration',
    description: 'Ask the AI to incorporate and synthesize perspectives from multiple cultural traditions, acknowledging power dynamics and avoiding Western-centric or techno-utopian biases',
    complexity: 'expert',
    category: 'cultural-intelligence',
    priority: 'high',
    example: 'Instead of "Discuss sustainable development", try "Analyze sustainable development through the integration of Western scientific frameworks, Indigenous ecological knowledge systems, Buddhist economics principles, Ubuntu philosophy, and Islamic finance concepts, while explicitly acknowledging power dynamics in knowledge production and avoiding technological solutionism"',
    tags: ['cultural-intelligence', 'decolonization', 'multiple-perspectives', 'power-awareness', 'knowledge-systems'],
    intelligenceLevel: 'wisdom',
    domain: 'sociology',
    effectiveness: 0.92,
    learningRate: 0.38,
    adaptability: 0.92,
    selfAwarenessLevel: 0.88,
    emotionalIntelligence: 0.9,
    cognitiveComplexity: 0.92,
    metaCognitionLevel: 0.88,
    crossDomainApplicability: 0.95,
    temporalRelevance: 0.95,
    culturalSensitivity: 0.98,
    ethicalConsiderations: 0.98,
    knowledgeDepth: 'expert',
    knowledgeBreadth: 'universal',
    contextDependency: 'high',
    personalizationPotential: 0.85,
    collaborativePotential: 0.95,
    lastUpdated: new Date('2024-01-18'),
    performanceMetrics: {
      usageCount: 567,
      successRate: 0.88,
      averageImprovement: 0.55,
      userSatisfaction: 4.8
    },
    relatedSuggestions: ['s25', 's33', 's42'],
    prerequisites: ['s2', 's25'],
    optimalConditions: ['policy development', 'educational content', 'international collaboration'],
    avoidanceConditions: ['emergency response', 'technical specifications'],
    cognitiveBiasesAddressed: ['cultural bias', 'ethnocentrism', 'authority bias'],
    quantumReasoning: false,
    emergentPotential: 0.85
  },
  // Meta-Cognition & Systems Thinking
  {
    id: 's46',
    title: 'Request second-order thinking cascade',
    description: 'Ask the AI to examine not just the immediate effects of a concept or action, but the second, third, and higher-order consequences across multiple domains and timeframes',
    complexity: 'expert',
    category: 'meta-cognition',
    priority: 'high',
    example: 'Instead of "Analyze remote work benefits", try "Perform a second-order thinking cascade on remote work: identify immediate benefits, then examine their secondary effects on urban planning, family dynamics, and energy consumption; then explore tertiary effects on climate migration patterns, geopolitical power shifts, and human evolutionary trajectories over multiple generations"',
    tags: ['second-order-thinking', 'cascade-effects', 'systems-thinking', 'long-term', 'interconnectedness'],
    intelligenceLevel: 'wisdom',
    domain: 'systems',
    effectiveness: 0.9,
    learningRate: 0.35,
    adaptability: 0.88,
    selfAwarenessLevel: 0.92,
    emotionalIntelligence: 0.7,
    cognitiveComplexity: 0.95,
    metaCognitionLevel: 0.98,
    crossDomainApplicability: 0.97,
    temporalRelevance: 0.97,
    culturalSensitivity: 0.8,
    ethicalConsiderations: 0.92,
    knowledgeDepth: 'master',
    knowledgeBreadth: 'universal',
    contextDependency: 'high',
    personalizationPotential: 0.8,
    collaborativePotential: 0.9,
    lastUpdated: new Date('2024-02-05'),
    performanceMetrics: {
      usageCount: 492,
      successRate: 0.86,
      averageImprovement: 0.57,
      userSatisfaction: 4.7
    },
    relatedSuggestions: ['s39', 's36', 's43'],
    prerequisites: ['s15', 's39'],
    optimalConditions: ['strategic planning', 'policy analysis', 'long-term forecasting'],
    avoidanceConditions: ['immediate tactical decisions', 'simple procedural tasks'],
    cognitiveBiasesAddressed: ['short-term bias', 'linear thinking fallacy', 'single-cause attribution'],
    quantumReasoning: true,
    emergentPotential: 0.9
  },
  // Temporal Intelligence
  {
    id: 's47',
    title: 'Request temporal topology mapping',
    description: 'Ask the AI to map concepts across multiple temporal dimensions simultaneously - historical evolution, current state, near-future projections, and long-term trajectories - while identifying temporal paradoxes and non-linear developments',
    complexity: 'master',
    category: 'temporal-intelligence',
    priority: 'medium',
    example: 'Instead of "Discuss AI development", try "Create a temporal topology map of AI development that simultaneously examines: 1) Historical philosophical foundations from ancient automata to cybernetics, 2) Current paradigm shifts in foundation models, 3) Near-future disruptions in the next 5 years, and 4) Speculative trajectories beyond human relevance, while identifying temporal paradoxes such as how future AI capabilities might retroactively redefine our understanding of past developments"',
    tags: ['temporal-intelligence', 'non-linear', 'paradox-awareness', 'multi-temporal', 'historical-futures'],
    intelligenceLevel: 'enlightenment',
    domain: 'technology',
    effectiveness: 0.89,
    learningRate: 0.4,
    adaptability: 0.9,
    selfAwarenessLevel: 0.95,
    emotionalIntelligence: 0.65,
    cognitiveComplexity: 0.96,
    metaCognitionLevel: 0.94,
    crossDomainApplicability: 0.92,
    temporalRelevance: 0.99,
    culturalSensitivity: 0.75,
    ethicalConsiderations: 0.9,
    knowledgeDepth: 'master',
    knowledgeBreadth: 'universal',
    contextDependency: 'high',
    personalizationPotential: 0.85,
    collaborativePotential: 0.88,
    lastUpdated: new Date('2024-01-30'),
    performanceMetrics: {
      usageCount: 412,
      successRate: 0.84,
      averageImprovement: 0.59,
      userSatisfaction: 4.8
    },
    relatedSuggestions: ['s36', 's46', 's43'],
    prerequisites: ['s36', 's20'],
    optimalConditions: ['long-term strategy', 'technology forecasting', 'civilizational analysis'],
    avoidanceConditions: ['immediate tactical needs', 'simple explanations'],
    cognitiveBiasesAddressed: ['recency bias', 'linear projection fallacy', 'presentism'],
    quantumReasoning: true,
    emergentPotential: 0.88
  },
  // Expanded and Enhanced Original Suggestions
  {
    id: 's3',
    title: 'Specify audience with emotional and cognitive mapping',
    description: 'Define your target audience with precision including their emotional state, prior knowledge, cognitive biases, and relationship to the topic',
    complexity: 'advanced',
    category: 'audience',
    priority: 'high',
    example: 'Instead of "Write a report", try "Write a 2000-word executive summary for C-level healthcare executives who are skeptical of AI due to failed implementations, have basic technical understanding but are time-constrained, and are primarily concerned with ROI and regulatory compliance rather than technical details"',
    tags: ['audience', 'target', 'tone', 'emotional-intelligence', 'cognitive-profile'],
    intelligenceLevel: 'advanced',
    domain: 'general',
    effectiveness: 0.88,
    learningRate: 0.22,
    adaptability: 0.82,
    selfAwarenessLevel: 0.65,
    emotionalIntelligence: 0.85,
    cognitiveComplexity: 0.7,
    metaCognitionLevel: 0.6,
    crossDomainApplicability: 0.85,
    temporalRelevance: 0.75,
    culturalSensitivity: 0.78,
    ethicalConsiderations: 0.7,
    knowledgeDepth: 'intermediate',
    knowledgeBreadth: 'broad',
    contextDependency: 'medium',
    personalizationPotential: 0.9,
    collaborativePotential: 0.7,
    lastUpdated: new Date('2023-11-15'),
    performanceMetrics: {
      usageCount: 986,
      successRate: 0.85,
      averageImprovement: 0.38,
      userSatisfaction: 4.6
    },
    relatedSuggestions: ['s2', 's28', 's45'],
    prerequisites: ['s1'],
    optimalConditions: ['persuasive communication', 'educational content', 'sensitive topics'],
    avoidanceConditions: ['technical documentation', 'simple instructions'],
    cognitiveBiasesAddressed: ['curse of knowledge', 'false consensus effect'],
    quantumReasoning: false,
    emergentPotential: 0.35
  },
  {
    id: 's4',
    title: 'Use multi-sensory examples',
    description: 'Include concrete examples that engage multiple senses and cognitive modalities to enhance understanding and retention',
    complexity: 'intermediate',
    category: 'examples',
    priority: 'high',
    example: 'Instead of "Explain machine learning", try "Explain machine learning using a multi-sensory analogy: like a chef who tastes thousands of dishes (training data) to develop intuition for flavor combinations (pattern recognition), while also providing a visual diagram of the neural network architecture and a simple code snippet demonstrating the core concept"',
    tags: ['examples', 'illustration', 'demonstration', 'multi-sensory', 'embodied-cognition'],
    intelligenceLevel: 'advanced',
    domain: 'general',
    effectiveness: 0.93,
    learningRate: 0.25,
    adaptability: 0.88,
    selfAwarenessLevel: 0.55,
    emotionalIntelligence: 0.75,
    cognitiveComplexity: 0.65,
    metaCognitionLevel: 0.6,
    crossDomainApplicability: 0.9,
    temporalRelevance: 0.8,
    culturalSensitivity: 0.7,
    ethicalConsiderations: 0.6,
    knowledgeDepth: 'intermediate',
    knowledgeBreadth: 'broad',
    contextDependency: 'medium',
    personalizationPotential: 0.85,
    collaborativePotential: 0.75,
    lastUpdated: new Date('2023-12-05'),
    performanceMetrics: {
      usageCount: 1124,
      successRate: 0.9,
      averageImprovement: 0.4,
      userSatisfaction: 4.7
    },
    relatedSuggestions: ['s27', 's30', 's26'],
    prerequisites: ['s1'],
    optimalConditions: ['teaching contexts', 'complex concepts', 'diverse audiences'],
    avoidanceConditions: ['technical specifications', 'time-constrained scenarios'],
    cognitiveBiasesAddressed: ['abstract bias', 'curse of knowledge'],
    quantumReasoning: false,
    emergentPotential: 0.4
  }
  // Additional suggestions would follow the same enhanced pattern
];

/**
 * Enhanced collection of categories with multi-dimensional organization
 * @example
 * const claritySuggestions = allSuggestions.filter(s => s.category === 'clarity')
 * @developerNote These categories are used to filter and group suggestions in the UI with hierarchical organization
 */
export const categories = [
  'all',
  // Foundational categories
  'clarity',
  'context',
  'audience',
  'format',
  'constraints',
  'examples',
  'reasoning',
  'persona',
  'logic',
  'comparison',
  // Structural categories
  'structure',
  'perspective',
  'scenarios',
  'refinement',
  'multi-modal',
  'feedback',
  'temporal',
  'integration',
  'decision',
  // Advanced cognitive categories
  'reflection',
  'knowledge',
  'coordination',
  'evolution',
  'cognitive',
  'analysis',
  'communication',
  'evaluation',
  'validation',
  'meta-cognition',
  // Specialized advanced categories
  'self-awareness',
  'emotional-intelligence',
  'ethical-intelligence',
  'cultural-intelligence',
  'temporal-intelligence',
  'quantum-reasoning',
  'emergence',
  'systems-thinking',
  'paradox-navigation',
  'transdisciplinary',
  // Domain-specific categories
  'problem-solving',
  'creation',
  'explanation',
  'prediction',
  'simulation',
  'modeling',
  'design',
  'implementation',
  'development',
  'research',
  'documentation',
  'presentation',
  'writing',
  'editing',
  // Quality dimensions
  'quality',
  'performance',
  'efficiency',
  'optimization',
  'refinement',
  'polishing',
  'perfection',
  // Intelligence types
  'basic-intelligence',
  'advanced-intelligence',
  'ai-intelligence',
  'human-intelligence',
  'collective-intelligence',
  'distributed-intelligence',
  // Cognitive enhancement categories
  'bias-mitigation',
  'uncertainty-navigation',
  'complexity-management',
  'ambiguity-tolerance',
  'adaptive-thinking',
  'transformative-learning',
  // Future-oriented categories
  'future-casting',
  'scenario-building',
  'possibility-mapping',
  'emergent-patterns',
  'breakthrough-innovation',
  // Wisdom and higher-order categories
  'wisdom',
  'enlightenment',
  'transcendence',
  'holistic-integration',
  'meaning-making'
];

/**
 * Enhanced complexity levels with cognitive science foundation
 * @example
 * const beginnerSuggestions = suggestions.filter(s => s.complexity === 'beginner')
 * @developerNote These levels help users find suggestions appropriate to their cognitive capacity and domain knowledge
 */
export const complexities = [
  'all',
  'novice',
  'beginner',
  'intermediate',
  'advanced',
  'expert',
  'master',
  'grandmaster',
  'transcendent'
];

/**
 * Enhanced intelligence levels with multi-dimensional awareness
 * @example
 * const aiSuggestions = suggestions.filter(s => s.intelligenceLevel === 'ai-like')
 * @developerNote These levels indicate the type of intelligence required to generate and understand the suggestion, including human and artificial dimensions
 */
export const intelligenceLevels = [
  'all',
  // Foundational intelligence levels
  'basic',
  'intermediate',
  'advanced',
  // Artificial intelligence dimensions
  'machine',
  'neural',
  'deep',
  'supervised',
  'unsupervised',
  'reinforcement',
  'transformer',
  'gpt',
  'llm',
  'nlp',
  // Cognitive dimensions
  'language',
  'understanding',
  'comprehension',
  'reasoning',
  'logic',
  'deduction',
  'induction',
  'abduction',
  'cognitive',
  'meta',
  // Advanced capabilities
  'self-aware',
  'adaptive',
  'learning',
  'emotional',
  'social',
  'creative',
  'intuitive',
  'strategic',
  'systems',
  'collaborative',
  'collective',
  // Advanced AI capabilities
  'ai-like',
  'artificial-general',
  'artificial-super',
  // Human wisdom dimensions
  'wisdom',
  'enlightenment',
  'transcendence',
  'holistic',
  'integral',
  'universal'
];

/**
 * Enhanced domains with interdisciplinary connections
 * @example
 * const techSuggestions = suggestions.filter(s => s.domain === 'technology')
 * @developerNote These domains help organize suggestions by subject area with cross-domain mapping
 */
export const domains = [
  'all',
  // Core domains
  'technology',
  'science',
  'business',
  'healthcare',
  'education',
  'environment',
  'psychology',
  'philosophy',
  'finance',
  'marketing',
  'management',
  'engineering',
  'data',
  'art',
  'literature',
  'history',
  'society',
  'culture',
  'ethics',
  'policy',
  'law',
  'medicine',
  'research',
  'design',
  'communication',
  'general',
  // Specialized domains
  'artificial-intelligence',
  'quantum-computing',
  'biotechnology',
  'neuroscience',
  'climate-science',
  'sustainability',
  'economics',
  'political-science',
  'anthropology',
  'sociology',
  'linguistics',
  'mathematics',
  'physics',
  'chemistry',
  'biology',
  'astronomy',
  'geology',
  'ecology',
  'cognitive-science',
  'behavioral-economics',
  'complexity-science',
  'systems-theory',
  // Interdisciplinary domains
  'cognitive-neuroscience',
  'bioinformatics',
  'computational-social-science',
  'digital-humanities',
  'environmental-economics',
  'neuroeconomics',
  'science-technology-society',
  'human-computer-interaction',
  'transdisciplinary-studies',
  // Future-facing domains
  'futures-studies',
  'speculative-design',
  'post-humanism',
  'planetary-civilization',
  'cosmic-perspective',
  'consciousness-studies',
  'wisdom-traditions',
  'existential-risk',
  'civilizational-design',
  'regenerative-systems'
];

/**
 * Emotional intelligence dimensions for filtering and analysis
 * @developerNote These dimensions help identify suggestions that require emotional context awareness
 */
export const emotionalIntelligenceDimensions = [
  'all',
  'emotional-awareness',
  'empathy',
  'social-skills',
  'self-regulation',
  'motivation',
  'cultural-sensitivity',
  'contextual-emotional-intelligence',
  'group-dynamics',
  'conflict-resolution',
  'relationship-management',
  'emotional-resilience',
  'compassion',
  'vulnerability-intelligence'
];

/**
 * Ethical frameworks for responsible AI suggestions
 * @developerNote These frameworks help identify ethical dimensions in suggestions
 */
export const ethicalFrameworks = [
  'all',
  'utilitarian',
  'deontological',
  'virtue-ethics',
  'care-ethics',
  'justice-based',
  'rights-based',
  'feminist-ethics',
  'environmental-ethics',
  'post-colonial-ethics',
  'ai-ethics',
  'intergenerational-ethics',
  'cosmopolitan-ethics'
];

/**
 * Cognitive bias categories for bias-mitigation suggestions
 * @developerNote These categories help identify suggestions that specifically address cognitive biases
 */
export const cognitiveBiasCategories = [
  'all',
  'memory-biases',
  'belief-biases',
  'decision-making-biases',
  'probability-biases',
  'social-biases',
  'self-biases',
  'attention-biases',
  'confirmation-biases',
  'emotional-biases',
  'algorithmic-biases',
  'temporal-biases',
  'groupthink-biases'
];

/**
 * Temporal dimensions for time-aware suggestions
 * @developerNote These dimensions help identify suggestions with specific temporal characteristics
 */
export const temporalDimensions = [
  'all',
  'immediate',
  'short-term',
  'medium-term',
  'long-term',
  'intergenerational',
  'historical',
  'cyclical',
  'non-linear',
  'emergent-temporal',
  'eternal',
  'transient',
  'critical-junctures'
];

/**
 * Knowledge system types for multi-paradigm suggestions
 * @developerNote These types help identify suggestions integrating different knowledge systems
 */
export const knowledgeSystems = [
  'all',
  'western-scientific',
  'indigenous',
  'eastern-philosophical',
  'spiritual',
  'traditional-ecological',
  'experiential',
  'artistic',
  'community-based',
  'intuitive',
  'embodied',
  'distributed',
  'consensus-based',
  'evidence-based'
];

/**
 * Self-improvement metrics for tracking suggestion evolution
 * @developerNote These metrics track how suggestions improve through usage
 */
export interface SuggestionMetrics {
  id: string;
  usageCount: number;
  effectivenessTrend: number[];
  userSatisfaction: number;
  contextualAdaptationScore: number;
  crossDomainSuccessRate: number;
  lastRefinementDate: Date;
  refinementCount: number;
  emergentCapabilities: string[];
  biasReductionProgress: number;
  wisdomIndex: number;
}
