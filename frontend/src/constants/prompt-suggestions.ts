/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

/**
 * Interface for smart writing suggestions with various metadata
 * @example
 * const suggestion: SmartSuggestion = {
 *   id: 'clarity-precision',
 *   title: 'Be More Specific',
 *   description: 'Avoid vague language and be precise with your intent',
 *   complexity: 'beginner',
 *   category: 'clarity',
 *   priority: 'high',
 *   example: 'Instead of \'Write about education\', try \'Write about the impact...\'',
 *   tags: ['precision', 'clarity', 'specificity'],
 *   intelligenceLevel: 'basic'
 * }
 * @developerNote Used to structure all writing enhancement suggestions with consistent metadata
 */
 export interface SmartSuggestion {
   /** Unique identifier for the suggestion */
   id: string;
   /** Brief title describing the suggestion */
   title: string;
   /** Detailed explanation of what the suggestion does */
   description: string;
   /** Difficulty level required to implement the suggestion */
   complexity: 'beginner' | 'intermediate' | 'advanced' | 'expert';
   /** Category grouping for organizing related suggestions */
   category: string;
   /** Importance level for prioritizing suggestions */
   priority: 'high' | 'medium' | 'low';
   /** Concrete example showing how to apply the suggestion */
   example: string;
   /** Keywords for filtering and searching suggestions */
   tags: string[];
   /** Level of intelligence required to generate the suggestion */
   intelligenceLevel: 'basic' | 'advanced' | 'ai-like';
 }

/**
 * Collection of all smart writing suggestions organized by category
 * @example
 * const claritySuggestions = allSuggestions.filter(s => s.category === 'clarity')
 * @developerNote This is the master list of all suggestions that powers the enhancement system
 */
export const allSuggestions: SmartSuggestion[] = [
  // Clarity and Precision
  {
    id: 'clarity-precision',
    title: 'Be More Specific',
    description: 'Avoid vague language and be precise with your intent',
    complexity: 'beginner',
    category: 'clarity',
    priority: 'high',
    example: 'Instead of \'Write about education\', try \'Write about the impact of digital learning tools on elementary school mathematics education in rural communities\'',
    tags: ['precision', 'clarity', 'specificity'],
    intelligenceLevel: 'basic',
  },
  {
    id: 'clarity-structure',
    title: 'Add Logical Structure',
    description: 'Organize your thoughts in a logical sequence',
    complexity: 'intermediate',
    category: 'structure',
    priority: 'high',
    example: 'Instead of \'Discuss AI\', try \'Discuss AI in three sections: 1) Historical development, 2) Current applications, 3) Future implications\'',
    tags: ['structure', 'logic', 'organization'],
    intelligenceLevel: 'advanced',
  },
  {
    id: 'clarity-context',
    title: 'Provide Context',
    description: 'Set the stage for your reader with appropriate background information',
    complexity: 'intermediate',
    category: 'context',
    priority: 'medium',
    example: 'Instead of \'Explain quantum computing\', try \'Explain quantum computing in the context of modern cryptography and cybersecurity challenges\'',
    tags: ['context', 'background', 'introduction'],
    intelligenceLevel: 'advanced',
  },
  {
    id: 'clarity-audience',
    title: 'Define Your Audience',
    description: 'Specify who you are writing for to tailor your approach',
    complexity: 'intermediate',
    category: 'audience',
    priority: 'medium',
    example: 'Instead of \'Write about climate change\', try \'Write about climate change for high school students interested in environmental science\'',
    tags: ['audience', 'targeting', 'personalization'],
    intelligenceLevel: 'advanced',
  },
  {
    id: 'clarity-constraints',
    title: 'Add Constraints',
    description: 'Specify limitations or boundaries to focus your content',
    complexity: 'intermediate',
    category: 'constraints',
    priority: 'medium',
    example: 'Instead of \'Discuss business strategies\', try \'Discuss business strategies for small tech startups with limited funding\'',
    tags: ['constraints', 'focus', 'limitations'],
    intelligenceLevel: 'advanced',
  },

  // Audience and Perspective
  {
    id: 'audience-persona',
    title: 'Adopt a Persona',
    description: 'Write as if you are a specific type of person or role',
    complexity: 'intermediate',
    category: 'persona',
    priority: 'medium',
    example: 'Instead of \'Write about leadership\', try \'Write about leadership from the perspective of a first-time manager\'',
    tags: ['persona', 'role', 'point-of-view'],
    intelligenceLevel: 'advanced',
  },
  {
    id: 'audience-perspective',
    title: 'Change Perspective',
    description: 'View the topic from different angles or viewpoints',
    complexity: 'advanced',
    category: 'perspective',
    priority: 'high',
    example: 'Instead of \'Discuss renewable energy\', try \'Discuss renewable energy from both economic and environmental perspectives\'',
    tags: ['perspective', 'multi-perspective', 'analysis'],
    intelligenceLevel: 'ai-like',
  },
  {
    id: 'audience-comparison',
    title: 'Use Comparisons',
    description: 'Compare concepts to help readers understand',
    complexity: 'intermediate',
    category: 'comparison',
    priority: 'medium',
    example: 'Instead of \'Explain blockchain\', try \'Explain blockchain by comparing it to a ledger system used by medieval merchants\'',
    tags: ['comparison', 'analogy', 'clarity'],
    intelligenceLevel: 'advanced',
  },

  // Structure and Organization
  {
    id: 'structure-outline',
    title: 'Create an Outline',
    description: 'Plan your content structure before writing',
    complexity: 'intermediate',
    category: 'structure',
    priority: 'high',
    example: 'Instead of \'Write about AI ethics\', try \'Write about AI ethics following this outline: 1) Introduction, 2) Key ethical principles, 3) Current issues, 4) Future considerations\'',
    tags: ['structure', 'planning', 'outline'],
    intelligenceLevel: 'advanced',
  },
  {
    id: 'structure-scenarios',
    title: 'Include Scenarios',
    description: 'Add concrete examples or hypothetical situations',
    complexity: 'intermediate',
    category: 'scenarios',
    priority: 'medium',
    example: 'Instead of \'Discuss customer service\', try \'Discuss customer service using scenarios from both customer and employee perspectives\'',
    tags: ['scenarios', 'examples', 'concrete'],
    intelligenceLevel: 'advanced',
  },
  {
    id: 'structure-reasoning',
    title: 'Add Reasoning',
    description: 'Include logical reasoning to support your points',
    complexity: 'advanced',
    category: 'reasoning',
    priority: 'high',
    example: 'Instead of \'State that AI is important\', try \'State that AI is important because it enables automation of complex tasks, increases efficiency, and allows for data-driven decision making\'',
    tags: ['reasoning', 'logic', 'justification'],
    intelligenceLevel: 'ai-like',
  },
  {
    id: 'structure-examples',
    title: 'Include Concrete Examples',
    description: 'Use specific examples to illustrate your points',
    complexity: 'intermediate',
    category: 'examples',
    priority: 'medium',
    example: 'Instead of \'Write about nutrition\', try \'Write about nutrition with examples of meals for different dietary needs\'',
    tags: ['examples', 'concrete', 'illustration'],
    intelligenceLevel: 'advanced',
  },

  // Analysis and Depth
  {
    id: 'analysis-relationships',
    title: 'Explore Relationships',
    description: 'Identify and analyze connections between concepts',
    complexity: 'advanced',
    category: 'analysis',
    priority: 'high',
    example: 'Instead of \'Discuss climate change\', try \'Discuss climate change by analyzing relationships between temperature, sea levels, and biodiversity\'',
    tags: ['analysis', 'relationships', 'connections'],
    intelligenceLevel: 'ai-like',
  },
  {
    id: 'analysis-framework',
    title: 'Apply Frameworks',
    description: 'Use established analytical frameworks to structure your thoughts',
    complexity: 'advanced',
    category: 'analysis',
    priority: 'high',
    example: 'Instead of \'Analyze market trends\', try \'Analyze market trends using SWOT analysis: Strengths, Weaknesses, Opportunities, Threats\'',
    tags: ['framework', 'analysis', 'structure'],
    intelligenceLevel: 'ai-like',
  },
  {
    id: 'analysis-criteria',
    title: 'Define Evaluation Criteria',
    description: 'Establish clear criteria for analysis and judgment',
    complexity: 'advanced',
    category: 'analysis',
    priority: 'medium',
    example: 'Instead of \'Evaluate technology\', try \'Evaluate technology using criteria: cost, efficiency, scalability, user-friendliness\'',
    tags: ['analysis', 'criteria', 'evaluation'],
    intelligenceLevel: 'ai-like',
  },
  {
    id: 'analysis-comparison',
    title: 'Make Comparisons',
    description: 'Compare different approaches, concepts, or viewpoints',
    complexity: 'intermediate',
    category: 'comparison',
    priority: 'medium',
    example: 'Instead of \'Discuss programming languages\', try \'Discuss programming languages by comparing Python and JavaScript for web development\'',
    tags: ['comparison', 'analysis', 'contrast'],
    intelligenceLevel: 'advanced',
  },

  // Advanced Techniques
  {
    id: 'advanced-constraints',
    title: 'Add Specific Constraints',
    description: 'Include clear limitations or requirements to focus your thinking',
    complexity: 'advanced',
    category: 'constraints',
    priority: 'high',
    example: 'Instead of \'Write about business\', try \'Write about business strategies within the constraints of a startup with $50k budget\'',
    tags: ['constraints', 'focus', 'specification'],
    intelligenceLevel: 'ai-like',
  },
  {
    id: 'advanced-multi-modal',
    title: 'Use Multi-Modal Approach',
    description: 'Combine different types of content to enhance understanding',
    complexity: 'advanced',
    category: 'multi-modal',
    priority: 'medium',
    example: 'Instead of \'Explain AI\', try \'Explain AI with text explanation, visual diagrams, and code examples\'',
    tags: ['multi-modal', 'visualization', 'mixed-media'],
    intelligenceLevel: 'ai-like',
  },
  {
    id: 'advanced-integration',
    title: 'Integrate Multiple Concepts',
    description: 'Combine several related ideas to create deeper insights',
    complexity: 'advanced',
    category: 'integration',
    priority: 'high',
    example: 'Instead of \'Discuss education\', try \'Discuss education by integrating technology, pedagogy, and psychology\'',
    tags: ['integration', 'synthesis', 'complexity'],
    intelligenceLevel: 'ai-like',
  },
  {
    id: 'advanced-evolution',
    title: 'Show Evolution',
    description: 'Present how concepts or systems have developed over time',
    complexity: 'advanced',
    category: 'evolution',
    priority: 'medium',
    example: 'Instead of \'Write about history\', try \'Write about the evolution of web development from HTML to modern frameworks\'',
    tags: ['evolution', 'history', 'development'],
    intelligenceLevel: 'ai-like',
  },
  {
    id: 'advanced-reflection',
    title: 'Add Reflection',
    description: 'Include personal insights or reflective thinking',
    complexity: 'intermediate',
    category: 'reflection',
    priority: 'medium',
    example: 'Instead of \'Discuss AI\', try \'Discuss AI with reflection on personal experiences and observations\'',
    tags: ['reflection', 'insight', 'personal'],
    intelligenceLevel: 'advanced',
  },
  {
    id: 'advanced-temporal',
    title: 'Include Temporal Context',
    description: 'Add time-based elements to your content',
    complexity: 'advanced',
    category: 'temporal',
    priority: 'medium',
    example: 'Instead of \'Write about technology\', try \'Write about technology with focus on current trends and predictions for the next decade\'',
    tags: ['temporal', 'time', 'context'],
    intelligenceLevel: 'ai-like',
  },
  {
    id: 'advanced-knowledge',
    title: 'Show Knowledge Depth',
    description: 'Demonstrate deep understanding through nuanced details',
    complexity: 'expert',
    category: 'knowledge',
    priority: 'high',
    example: 'Instead of \'Explain machine learning\', try \'Explain machine learning with technical details about algorithms, mathematical foundations, and practical implementation\'',
    tags: ['knowledge', 'depth', 'technical'],
    intelligenceLevel: 'ai-like',
  },
  {
    id: 'advanced-coordination',
    title: 'Coordinate Multiple Aspects',
    description: 'Integrate multiple dimensions or perspectives simultaneously',
    complexity: 'expert',
    category: 'coordination',
    priority: 'high',
    example: 'Instead of \'Discuss sustainability\', try \'Discuss sustainability by coordinating economic, environmental, and social factors\'',
    tags: ['coordination', 'integration', 'multidimensional'],
    intelligenceLevel: 'ai-like',
  },
  {
    id: 'advanced-cognitive',
    title: 'Incorporate Cognitive Principles',
    description: 'Use principles of cognitive science to structure your content',
    complexity: 'expert',
    category: 'cognitive',
    priority: 'high',
    example: 'Instead of \'Write about learning\', try \'Write about learning using cognitive principles like spaced repetition and active recall\'',
    tags: ['cognitive', 'principles', 'psychology'],
    intelligenceLevel: 'ai-like',
  },
  {
    id: 'advanced-decision',
    title: 'Apply Decision-Making Frameworks',
    description: 'Use structured approaches to make recommendations or decisions',
    complexity: 'advanced',
    category: 'decision',
    priority: 'high',
    example: 'Instead of \'Recommend a strategy\', try \'Recommend a strategy using decision matrix analysis with weighted criteria\'',
    tags: ['decision', 'framework', 'analysis'],
    intelligenceLevel: 'ai-like',
  },
  {
    id: 'advanced-feedback',
    title: 'Incorporate Feedback Loops',
    description: 'Include iterative improvement and feedback mechanisms',
    complexity: 'advanced',
    category: 'feedback',
    priority: 'medium',
    example: 'Instead of \'Discuss improvement\', try \'Discuss improvement by incorporating feedback loops and iterative processes\'',
    tags: ['feedback', 'iteration', 'process'],
    intelligenceLevel: 'ai-like',
  },
  {
    id: 'advanced-scenarios',
    title: 'Develop Scenarios',
    description: 'Create hypothetical situations to explore implications',
    complexity: 'advanced',
    category: 'scenarios',
    priority: 'high',
    example: 'Instead of \'Discuss AI ethics\', try \'Discuss AI ethics through scenarios of potential misuse and safeguards\'',
    tags: ['scenarios', 'hypothetical', 'implications'],
    intelligenceLevel: 'ai-like',
  },
  {
    id: 'advanced-persona',
    title: 'Define Persona in Context',
    description: 'Specify the role and perspective for content creation',
    complexity: 'intermediate',
    category: 'persona',
    priority: 'medium',
    example: 'Instead of \'Write about leadership\', try \'Write about leadership as a seasoned manager with 15 years of experience\'',
    tags: ['persona', 'context', 'role'],
    intelligenceLevel: 'advanced',
  },
  {
    id: 'advanced-refinement',
    title: 'Refine and Iterate',
    description: 'Suggest improvements through iterative refinement',
    complexity: 'advanced',
    category: 'refinement',
    priority: 'medium',
    example: 'Instead of \'Explain concepts\', try \'Explain concepts with iterative refinement showing how ideas evolve and improve\'',
    tags: ['refinement', 'iteration', 'improvement'],
    intelligenceLevel: 'advanced',
  },
  {
    id: 'advanced-logic',
    title: 'Apply Logical Structures',
    description: 'Use logical patterns and reasoning to build arguments',
    complexity: 'advanced',
    category: 'logic',
    priority: 'high',
    example: 'Instead of \'Discuss arguments\', try \'Discuss arguments using logical structures like syllogisms and logical fallacy recognition\'',
    tags: ['logic', 'reasoning', 'arguments'],
    intelligenceLevel: 'ai-like',
  },
  {
    id: 'advanced-structure',
    title: 'Use Advanced Structures',
    description: 'Apply sophisticated organizational patterns for complex topics',
    complexity: 'advanced',
    category: 'structure',
    priority: 'high',
    example: 'Instead of \'Write about philosophy\', try \'Write about philosophy using the structure: definition, historical context, major schools, modern applications\'',
    tags: ['structure', 'advanced', 'organization'],
    intelligenceLevel: 'ai-like',
  },
  {
    id: 'advanced-precision',
    title: 'Achieve Precision',
    description: 'Focus on accurate and specific expression of ideas',
    complexity: 'expert',
    category: 'clarity',
    priority: 'high',
    example: 'Instead of \'Discuss innovation\', try \'Discuss innovation by precisely defining terms, identifying key drivers, and providing measurable outcomes\'',
    tags: ['precision', 'accuracy', 'specificity'],
    intelligenceLevel: 'ai-like',
  },
  {
    id: 'advanced-communication',
    title: 'Optimize Communication',
    description: 'Improve clarity through strategic communication techniques',
    complexity: 'expert',
    category: 'communication',
    priority: 'high',
    example: 'Instead of \'Explain data\', try \'Explain data using communication techniques like storytelling, analogies, and visual aids\'',
    tags: ['communication', 'techniques', 'clarity'],
    intelligenceLevel: 'ai-like',
  },
  {
    id: 'advanced-synthesis',
    title: 'Synthesize Information',
    description: 'Combine different sources and perspectives into cohesive insights',
    complexity: 'expert',
    category: 'integration',
    priority: 'high',
    example: 'Instead of \'Discuss science\', try \'Discuss science by synthesizing research findings, historical developments, and contemporary applications\'',
    tags: ['synthesis', 'integration', 'research'],
    intelligenceLevel: 'ai-like',
  },
  {
    id: 'advanced-analysis',
    title: 'Deep Analysis',
    description: 'Conduct comprehensive analysis of complex topics',
    complexity: 'expert',
    category: 'analysis',
    priority: 'high',
    example: 'Instead of \'Analyze trends\', try \'Analyze trends by examining multiple factors, temporal patterns, and cross-sector relationships\'',
    tags: ['analysis', 'comprehensive', 'deep'],
    intelligenceLevel: 'ai-like',
  },
];

/**
 * Categories available for organizing suggestions
 * @example
 * const claritySuggestions = suggestions.filter(s => s.category === 'clarity')
 * @developerNote These categories are used to filter and group suggestions in the UI
 */
export const categories = [
  'all',
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
  'structure',
  'perspective',
  'scenarios',
  'refinement',
  'multi-modal',
  'feedback',
  'temporal',
  'integration',
  'decision',
  'reflection',
  'knowledge',
  'coordination',
  'evolution',
  'cognitive',
  'analysis',
  'communication'
];

/**
 * Complexity levels for suggestions
 * @example
 * const beginnerSuggestions = suggestions.filter(s => s.complexity === 'beginner')
 * @developerNote These levels help users find suggestions appropriate to their skill level
 */
export const complexities = ['all', 'beginner', 'intermediate', 'advanced', 'expert'];

/**
 * Intelligence levels for suggestions
 * @example
 * const aiSuggestions = suggestions.filter(s => s.intelligenceLevel === 'ai-like')
 * @developerNote These levels indicate the type of intelligence required to generate the suggestion
 */
export const intelligenceLevels = ['all', 'basic', 'advanced', 'ai-like'];
