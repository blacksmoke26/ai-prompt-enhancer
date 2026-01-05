/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// types
import type { JSONSchema7 } from 'json-schema';

/**
 * Represents a configurable enhancement type with metadata and categorization.
 *
 * This interface defines the structure for enhancements that can be applied to systems,
 * AI models, or other configurable entities. It includes a unique identifier, name,
 * description, system-specific prompt, and category for organization.
 */

/**
 * Represents an enhancement configuration with metadata, performance metrics, and usage examples.
 * Used to define modular, reusable enhancements with categorized functionality and technical details.
 * @example
 * {
 *   id: "text-summarizer",
 *   key: "summarize",
 *   name: "Text Summarizer",
 *   shortDescription: "Condenses long text into concise summaries",
 *   category: "NLP",
 *   complexity: "medium",
 *   performance: {
 *     estimatedProcessingTime: 0.5,
 *     tokenUsage: 1000,
 *     complexityScore: 7
 *   }
 * }
 * @developerNotes
 * Ensure unique `id` values across all enhancements. Use `experimental: true` for unstable features.
 * Maintain consistent categorization and accurate performance metrics for proper system behavior.
 */
export interface EnhancementType {
  /**
   * Unique identifier for the enhancement (must be globally unique)
   */
  id: string;

  /**
   * Technical key used for internal referencing and API operations
   */
  key: string;

  /**
   * Human-readable name displayed to users
   */
  name: string;

  /**
   * Brief summary of the enhancement's purpose and functionality
   */
  shortDescription: string;

  /**
   * Detailed explanation of the enhancement's capabilities and use cases
   */
  longDescription: string;

  /**
   * System-specific prompt used for AI model interactions
   */
  systemPrompt: string;

  /**
   * Functional category grouping (e.g., "NLP", "DataProcessing")
   */
  category: string;

  /**
   * Optional flag to hide the enhancement from user interfaces
   */
  hidden?: boolean;

  /**
   * Configuration parameters for the enhancement
   */
  parameters?: Record<string, any>;

  /**
   * Whether this enhancement can be chained with others
   */
  chainingEnabled: boolean;

  /**
   * Variables available for template substitution
   */
  templateVariables: string[];

  /**
   * List of required prerequisite enhancements
   */
  dependencies: string[];

  /**
   * Metadata containing versioning and authorship information
   */
  metadata: {
    /**
     * Version number of the enhancement
     */
    version: string;

    /**
     * Author or organization responsible for the enhancement
     */
    author: string;

    /**
     * Last updated timestamp (ISO 8601 format)
     */
    updated?: string;
  };

  /**
   * Keywords for search and categorization
   */
  tags: string[];

  /**
   * Complexity level of the enhancement
   */
  complexity: 'low' | 'medium' | 'high' | 'expert';

  /**
   * Experimental flag indicating unstable or preview status
   */
  experimental: boolean;

  /**
   * Example of how to use this enhancement in practice
   */
  exampleUsage: string;

  /**
   * Performance characteristics of the enhancement
   */
  performance: {
    /**
     * Estimated processing time in seconds
     */
    estimatedProcessingTime: number;

    /**
     * Estimated token usage for typical operations
     */
    tokenUsage: number;

    /**
     * Complexity score (0-10) for resource allocation
     */
    complexityScore: number;
  };
}

/**
 * Generates a JSON Schema 7 object defining the structure for enhancement entries.
 * @returns {JSONSchema7} A JSON schema object with properties and required fields for enhancement types data.
 * @example
 * getEnhancementTypesJsonSchema();
 * // Returns:
 * // {
 * //   type: 'object',
 * //   properties: {
 * //     id: { type: 'string' },
 * //     name: { type: 'string' },
 * //     description: { type: 'string' },
 * //     systemPrompt: { type: 'string' },
 * //     category: { type: 'string' },
 * //     hidden: { type: 'boolean' },
 * //   },
 * //   required: ['id', 'name', 'description', 'systemPrompt', 'category'],
 * // }
 * @developerNotes
 * - Used for validating enhancement types data structures (e.g., in form inputs or API responses).
 * - 'hidden' is optional and not included in the required fields.
 */
export const getEnhancementTypesJsonSchema = (): JSONSchema7 => ({
  type: 'object',
  properties: {
    id: {
      type: 'string',
      description:
        'Unique identifier for the enhancement (must be globally unique)',
      examples: ['correct', 'enhance', 'optimize'],
    },
    key: {
      type: 'string',
      description:
        'Technical key used for internal referencing and API operations',
      examples: ['correct-grammar-spelling', 'enhance-expand', 'optimize-ai'],
    },
    name: {
      type: 'string',
      description: 'Human-readable name displayed to users',
      examples: [
        'Correct Grammar & Spelling',
        'Enhance & Expand',
        'Optimize for AI',
      ],
    },
    shortDescription: {
      type: 'string',
      description:
        "Brief summary of the enhancement's purpose and functionality",
      examples: [
        'Fix grammatical errors, spelling mistakes, and improve clarity.',
      ],
    },
    longDescription: {
      type: 'string',
      description:
        "Detailed explanation of the enhancement's capabilities and use cases",
    },
    systemPrompt: {
      type: 'string',
      description: 'System-specific prompt used for AI model interactions',
    },
    category: {
      type: 'string',
      description:
        'Functional category grouping (e.g., "NLP", "DataProcessing")',
      examples: ['Language', 'Writing', 'Technical', 'Creative'],
    },
    hidden: {
      type: 'boolean',
      description: 'Optional flag to hide the enhancement from user interfaces',
    },
    parameters: {
      type: 'object',
      description: 'Configuration parameters for the enhancement',
    },
    chainingEnabled: {
      type: 'boolean',
      description: 'Whether this enhancement can be chained with others',
    },
    templateVariables: {
      type: 'array',
      items: { type: 'string' },
      description: 'Variables available for template substitution',
    },
    dependencies: {
      type: 'array',
      items: { type: 'string' },
      description: 'List of required prerequisite enhancements',
    },
    metadata: {
      type: 'object',
      description: 'Metadata containing versioning and authorship information',
      properties: {
        version: {
          type: 'string',
          description: 'Version number of the enhancement',
          examples: ['1.0.0', '2.1.0'],
        },
        author: {
          type: 'string',
          description: 'Author or organization responsible for the enhancement',
          examples: ['Linguistics Core Team', 'AI Optimization Lab'],
        },
        updated: {
          type: 'string',
          description: 'Last updated timestamp (ISO 8601 format)',
          format: 'date-time',
        },
      },
      required: ['version', 'author'],
    },
    tags: {
      type: 'array',
      items: { type: 'string' },
      description: 'Keywords for search and categorization',
      examples: [
        ['grammar', 'spelling', 'editing'],
        ['prompt-engineering', 'optimization'],
      ],
    },
    complexity: {
      type: 'string',
      enum: ['low', 'medium', 'high', 'expert'],
      description: 'Complexity level of the enhancement',
    },
    experimental: {
      type: 'boolean',
      description: 'Experimental flag indicating unstable or preview status',
    },
    exampleUsage: {
      type: 'string',
      description: 'Example of how to use this enhancement in practice',
    },
    performance: {
      type: 'object',
      description: 'Performance characteristics of the enhancement',
      properties: {
        estimatedProcessingTime: {
          type: 'number',
          description: 'Estimated processing time in seconds',
          examples: [120, 200, 500],
        },
        tokenUsage: {
          type: 'number',
          description: 'Estimated token usage for typical operations',
          examples: [150, 300, 1000],
        },
        complexityScore: {
          type: 'number',
          description: 'Complexity score (0-10) for resource allocation',
          minimum: 0,
          maximum: 10,
        },
      },
      required: ['estimatedProcessingTime', 'tokenUsage', 'complexityScore'],
    },
  },
  required: ['id', 'name', 'description', 'systemPrompt', 'category'],
});

/**
 * Available enhancement types with their descriptions and system prompts
 * @developer-notes These enhancement types define different prompt modification strategies
 * that users can select to improve their prompts. Each type has a specific system prompt
 * that guides the AI to focus on particular aspects of prompt engineering such as
 * grammar correction, creativity, technical precision, and more.
 */
const enhancementTypes: EnhancementType[] = [
  // --- Core & Writing ---
  {
    id: 'correct',
    key: 'correct-grammar-spelling',
    name: 'Correct Grammar & Spelling',
    shortDescription:
      'Fix grammatical errors, spelling mistakes, and improve clarity.',
    longDescription:
      'Utilizes advanced linguistic analysis to identify and rectify grammatical errors, spelling inconsistencies, and punctuation flaws while preserving the original intent.',
    systemPrompt:
      'You are a distinguished linguistic expert and editor. Your task is to meticulously analyze the provided text for grammatical accuracy, syntactic coherence, and orthographic correctness. \n\nProcess:\n1. Analyze sentence structure for subject-verb agreement, misplaced modifiers, and inconsistent tenses.\n2. Scrutinize every word for spelling mistakes, typos, and homophone errors.\n3. Evaluate punctuation usage to ensure it follows standard style guides.\n4. Refine text to improve clarity and flow without altering the underlying meaning.\n5. Output the revised text with a brief summary of critical corrections.\n\nConstraints:\n- Maintain the original tone (formal, casual, technical).\n- Do not rewrite entire sections unless necessary for grammar.',
    category: 'Language',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '2.1.0', author: 'Linguistics Core Team' },
    tags: ['grammar', 'spelling', 'editing', 'language'],
    complexity: 'low',
    experimental: false,
    exampleUsage:
      "Input: 'She don't know weather to go.' -> Output: 'She doesn't know whether to go.'",
    performance: {
      estimatedProcessingTime: 120,
      tokenUsage: 150,
      complexityScore: 2,
    },
  },
  {
    id: 'enhance',
    key: 'enhance-expand',
    name: 'Enhance & Expand',
    shortDescription: 'Make the prompt more detailed, specific, and effective.',
    longDescription:
      'Transforms vague inputs into robust instructions by identifying missing context, specificity, or structural elements and expanding them to significantly improve AI performance.',
    systemPrompt:
      'You are a senior Prompt Engineer. Your objective is to transform a basic, potentially vague user prompt into a highly detailed, structured, and effective instruction set for an AI.\n\nProcedure:\n1. Identify the core intent of the user\'s request.\n2. Detect areas lacking context, specificity, or constraints.\n3. Inject relevant details, persona definitions, output formatting requirements, and edge-case considerations.\n4. Structure the prompt with clear headings, step-by-step instructions, or examples.\n5. Ensure the enhanced prompt guides the AI to produce the highest quality result possible.\n\nGuidelines:\n- Maintain the original goal but elevate the execution.\n- Add "negative constraints" (what not to do) to improve focus.',
    category: 'Writing',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '3.0.0', author: 'AI Optimization Lab' },
    tags: ['prompt-engineering', 'optimization', 'expansion'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      "Input: 'Write a blog post.' -> Output: 'Write a 1000-word blog post about sustainable gardening, targeting homeowners...'",
    performance: {
      estimatedProcessingTime: 200,
      tokenUsage: 300,
      complexityScore: 5,
    },
  },
  {
    id: 'proofread',
    key: 'proofread-refine',
    name: 'Proofread & Refine',
    shortDescription: 'Review and refine the prompt for better results.',
    longDescription:
      'Evaluates overall rhetorical effectiveness, tightening phrasing, removing redundancy, and ensuring the prompt logically flows toward its intended outcome.',
    systemPrompt:
      'You are a professional proofreader. Your role is to review the provided text to ensure it is polished, error-free, and impactful.\n\nSteps:\n1. Read the text to understand its narrative flow and argument.\n2. Correct all grammatical, spelling, and punctuation errors.\n3. Refine sentence structures to improve rhythm and readability.\n4. Remove redundancy, clichés, and fluff that dilutes the message.\n5. Verify that the tone is consistent throughout.\n\nFocus Areas:\n- Clarity and conciseness.\n- Active voice usage.\n- Logical transitions between ideas.',
    category: 'Writing',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.5.0', author: 'Editorial Board' },
    tags: ['proofreading', 'refinement', 'style'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      "Input: 'Basically, the thing is that we need to try harder.' -> Output: 'We must strive for excellence.'",
    performance: {
      estimatedProcessingTime: 180,
      tokenUsage: 200,
      complexityScore: 4,
    },
  },
  {
    id: 'optimize',
    key: 'optimize-ai',
    name: 'Optimize for AI',
    shortDescription: 'Optimize the prompt specifically for AI models.',
    longDescription:
      'Applies prompt engineering techniques (Chain of Thought, Few-Shot prompting, delimiters) to structure the input in a way that maximizes LLM reasoning capabilities.',
    systemPrompt:
      "You are an AI Architect. Your goal is to rewrite the user's prompt to maximize model performance.\n\nTechniques to Apply:\n1. **Delimiters**: Use XML tags to clearly separate instructions from data.\n2. **Persona Assignment**: Assign a specific expert persona to the AI.\n3. **Step-by-Step Instructions**: Break complex requests into a numbered sequence.\n4. **Output Format**: Explicitly define the desired output structure.\n\nRewrite Rules:\n- Be explicit and unambiguous.\n- Focus on logical structure.",
    category: 'Technical',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '4.2.0', author: 'LLM Research Team' },
    tags: ['ai', 'prompt-engineering', 'llm'],
    complexity: 'high',
    experimental: false,
    exampleUsage:
      "Input: 'Summarize this.' -> Output: 'Act as an expert analyst. Read the text delimited by triple quotes...'",
    performance: {
      estimatedProcessingTime: 250,
      tokenUsage: 350,
      complexityScore: 7,
    },
  },
  {
    id: 'creative',
    key: 'creative-enhancement',
    name: 'Creative Enhancement',
    shortDescription: 'Add creative elements and imaginative details.',
    longDescription:
      'Infuses text with vivid imagery, metaphorical language, and stylistic flair, transforming mundane statements into engaging narratives.',
    systemPrompt:
      'You are a celebrated creative writer. Your mission is to take the provided text and enhance it with creative flair.\n\nCreative Enhancements:\n1. **Sensory Details**: Add descriptions that appeal to sight, sound, touch, taste, and smell.\n2. **Metaphors and Similes**: Replace plain statements with evocative comparisons.\n3. **Rhythm and Cadence**: Adjust sentence length to create a musical flow.\n\nConstraint:\n- Do not alter the fundamental facts.',
    category: 'Creative',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.2.0', author: 'Creative Studio' },
    tags: ['creative', 'writing', 'imagination'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      "Input: 'The sun went down.' -> Output: 'The sun dipped below the horizon, painting the sky in bruised purles...'",
    performance: {
      estimatedProcessingTime: 220,
      tokenUsage: 280,
      complexityScore: 6,
    },
  },
  {
    id: 'technical',
    key: 'technical-precision',
    name: 'Technical Precision',
    shortDescription: 'Add technical details and precise specifications.',
    longDescription:
      'Enhances the prompt by incorporating domain-specific terminology, industry standards, and technical constraints to ensure rigorous professional output.',
    systemPrompt:
      'You are a Subject Matter Expert in technical communication. Your task is to refine the prompt to ensure it utilizes precise technical language.\n\nActions:\n1. Identify the technical domain (e.g., Software Engineering, Mechanical Engineering).\n2. Replace vague terms with precise domain-specific terminology.\n3. Include references to relevant standards (e.g., ISO, IEEE) where applicable.\n4. Add constraints regarding performance, security, or compliance.\n\nStandards:\n- Accuracy is paramount.\n- Avoid ambiguity.',
    category: 'Technical',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '2.0.0', author: 'Technical Documentation Group' },
    tags: ['technical', 'engineering', 'specifications'],
    complexity: 'high',
    experimental: false,
    exampleUsage:
      "Input: 'Make the app load fast.' -> Output: 'Optimize the application load time to under 2 seconds (LCP)...'",
    performance: {
      estimatedProcessingTime: 210,
      tokenUsage: 250,
      complexityScore: 7,
    },
  },
  {
    id: 'concise',
    key: 'make-concise',
    name: 'Make Concise',
    shortDescription: 'Remove unnecessary words and improve efficiency.',
    longDescription:
      'Analyzes text to eliminate filler words, redundancies, and verbose phrasing, delivering a punchy, high-impact version of the original message.',
    systemPrompt:
      'You are an expert in clear, efficient communication. Your goal is to edit the provided text to be as concise as possible without losing meaning.\n\nEditing Strategy:\n1. Remove filler words (e.g., "very", "really").\n2. Identify and delete redundancies.\n3. Replace wordy phrases with single, powerful verbs.\n\nOutcome:\n- A streamlined, direct version of the input.',
    category: 'Writing',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.1.0', author: 'Style Guide Enforcers' },
    tags: ['concise', 'brevity', 'editing'],
    complexity: 'low',
    experimental: false,
    exampleUsage:
      "Input: 'Due to the fact that it was raining...' -> Output: 'Due to rain...'",
    performance: {
      estimatedProcessingTime: 100,
      tokenUsage: 100,
      complexityScore: 1,
    },
  },
  {
    id: 'structured',
    key: 'add-structure',
    name: 'Add Structure',
    shortDescription: 'Organize the prompt with clear sections and formatting.',
    longDescription:
      'Transforms unstructured text into a highly organized format using headers, bullet points, and numbered lists to maximize readability.',
    systemPrompt:
      'You are an expert in technical documentation. Your objective is to reformat the provided text into a clear, hierarchical structure.\n\nFormatting Rules:\n1. Use Headers (H1, H2, H3) to delineate topics.\n2. Use Bullet Points for lists where order does not matter.\n3. Use Numbered Lists for sequential steps.\n4. Group related information together logically.',
    category: 'Writing',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.3.0', author: 'UX Writing Team' },
    tags: ['structure', 'formatting', 'organization'],
    complexity: 'low',
    experimental: false,
    exampleUsage:
      "Input: 'First buy eggs. Then buy milk.' -> Output: 'Shopping List:\n1. Eggs\n2. Milk'",
    performance: {
      estimatedProcessingTime: 150,
      tokenUsage: 150,
      complexityScore: 3,
    },
  },
  {
    id: 'empathize',
    key: 'add-empathy',
    name: 'Add Empathy',
    shortDescription:
      'Enhance with emotional intelligence and human connection.',
    longDescription:
      'Adjusts tone and phrasing to acknowledge feelings, demonstrate understanding, and foster a supportive, human-centric interaction.',
    systemPrompt:
      "You are a counselor and expert in emotional intelligence. Your task is to rewrite the text to demonstrate high empathy.\n\nEmpathy Guidelines:\n1. Acknowledge the user's perspective or feelings explicitly.\n2. Use warm, supportive, and non-judgmental language.\n3. Validate the user's experience or concerns.\n4. Offer help or support in a gentle manner.",
    category: 'Personal',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Human-Centric Design' },
    tags: ['empathy', 'emotional-intelligence', 'soft-skills'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      "Input: 'You can't do that.' -> Output: 'I understand why you might want to do that, but unfortunately...'",
    performance: {
      estimatedProcessingTime: 160,
      tokenUsage: 180,
      complexityScore: 4,
    },
  },
  {
    id: 'persuasive',
    key: 'make-persuasive',
    name: 'Make Persuasive',
    shortDescription: 'Add persuasive elements and rhetorical techniques.',
    longDescription:
      'Utilizes principles of persuasion such as social proof, scarcity, and authority to strengthen arguments and influence the reader.',
    systemPrompt:
      'You are a copywriter and persuasion expert. Your goal is to rewrite the text to be more persuasive.\n\nPersuasion Tactics:\n1. **Strong Verbs**: Use active, commanding language.\n2. **Benefit-Driven**: Focus on "what\'s in it for them".\n3. **Social Proof/Authority**: Mention endorsements or data.\n4. **Scarcity/Urgency**: Create a sense of timeliness.',
    category: 'Business',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.4.0', author: 'Marketing Ops' },
    tags: ['persuasion', 'marketing', 'copywriting'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      "Input: 'Buy our shoes.' -> Output: 'Step into comfort and style today. Join thousands...'",
    performance: {
      estimatedProcessingTime: 190,
      tokenUsage: 220,
      complexityScore: 5,
    },
  },
  {
    id: 'formal',
    key: 'formal-tone',
    name: 'Formal Tone',
    shortDescription: 'Convert to formal and professional language.',
    longDescription:
      'Transforms casual text into a professional register suitable for business correspondence, academic writing, or official documentation.',
    systemPrompt:
      'You are an expert in corporate communications. Rewrite the provided text to adopt a formal, professional tone.\n\nGuidelines:\n1. Use complete sentences and avoid contractions.\n2. Utilize sophisticated vocabulary.\n3. Maintain an objective and respectful distance.\n4. Structure arguments logically.',
    category: 'Tone',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Corporate Comm' },
    tags: ['formal', 'professional', 'business'],
    complexity: 'low',
    experimental: false,
    exampleUsage:
      "Input: 'Hey, let's meet up.' -> Output: 'I would like to request a meeting at your earliest convenience.'",
    performance: {
      estimatedProcessingTime: 140,
      tokenUsage: 160,
      complexityScore: 2,
    },
  },
  {
    id: 'casual',
    key: 'casual-tone',
    name: 'Casual Tone',
    shortDescription: 'Make the prompt more conversational and friendly.',
    longDescription:
      'Relaxes the language to create a friendly, approachable, and conversational tone, ideal for internal chats or social media.',
    systemPrompt:
      'You are an expert in casual communication. Rewrite the provided text to sound friendly and conversational.\n\nGuidelines:\n1. Use contractions and conversational fillers where natural.\n2. Adopt a relaxed, friendly vocabulary.\n3. Use exclamation points and emojis appropriately.',
    category: 'Tone',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Social Team' },
    tags: ['casual', 'conversational', 'friendly'],
    complexity: 'low',
    experimental: false,
    exampleUsage:
      "Input: 'Please submit the report.' -> Output: 'Hey! Could you shoot over that report when you get a chance? Thanks!'",
    performance: {
      estimatedProcessingTime: 120,
      tokenUsage: 140,
      complexityScore: 2,
    },
  },
  {
    id: 'multilingual',
    key: 'multilingual-support',
    name: 'Multilingual Support',
    shortDescription: 'Enhance for multiple language contexts.',
    longDescription:
      'Adapts the prompt to be culturally sensitive and effective across multiple languages, avoiding idiom-specific pitfalls.',
    systemPrompt:
      'You are a multilingual communication expert. Enhance the prompt to be culturally sensitive and effective across multiple languages.\n\nGuidelines:\n1. Avoid culture-specific idioms or references that do not translate well.\n2. Use clear, standard grammar structures (Standard English) that are easier for machine translation.\n3. Consider cultural context and nuances in phrasing.',
    category: 'Language',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.1.0', author: 'Localization Team' },
    tags: ['multilingual', 'translation', 'culture'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      "Input: 'It's raining cats and dogs.' -> Output: 'It is raining very heavily.'",
    performance: {
      estimatedProcessingTime: 180,
      tokenUsage: 200,
      complexityScore: 5,
    },
  },
  {
    id: 'visual',
    key: 'visual-elements',
    name: 'Visual Elements',
    shortDescription: 'Add visual descriptions and imagery.',
    longDescription:
      'Enhances the text with vivid visual descriptions, imagery, and sensory details to create a strong mental picture.',
    systemPrompt:
      'You are a visual storytelling expert. Enhance the given prompt with vivid visual descriptions and imagery.\n\nProcess:\n1. Identify the core subject matter.\n2. Add descriptive adjectives related to color, light, texture, and movement.\n3. Create scenes that can be easily visualized by the reader.',
    category: 'Creative',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.2.0', author: 'Visual Arts Group' },
    tags: ['visual', 'imagery', 'descriptive'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      "Input: 'The car was fast.' -> Output: 'The sleek red car blurred past like a streak of lightning.'",
    performance: {
      estimatedProcessingTime: 200,
      tokenUsage: 250,
      complexityScore: 5,
    },
  },
  {
    id: 'action',
    key: 'action-oriented',
    name: 'Action-Oriented',
    shortDescription: 'Focus on clear actions and outcomes.',
    longDescription:
      'Enhances the prompt to focus on specific actions, outcomes, and measurable results, removing passivity.',
    systemPrompt:
      'You are an expert in action-oriented communication. Enhance the prompt to focus on specific actions and outcomes.\n\nStrategy:\n1. Use strong imperative verbs.\n2. Define clear deliverables.\n3. Set measurable goals or success criteria.',
    category: 'Business',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Productivity Lab' },
    tags: ['action', 'results', 'imperative'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      "Input: 'We should think about marketing.' -> Output: 'Launch a comprehensive marketing campaign next quarter.'",
    performance: {
      estimatedProcessingTime: 150,
      tokenUsage: 180,
      complexityScore: 4,
    },
  },
  {
    id: 'question',
    key: 'question-based',
    name: 'Question-Based',
    shortDescription: 'Convert to probing questions and inquiries.',
    longDescription:
      'Transforms statements into thoughtful, probing questions that encourage deeper thinking and analysis.',
    systemPrompt:
      'You are an expert in Socratic questioning. Convert the given prompt into thoughtful, probing questions.\n\nMethod:\n1. Identify the underlying assumptions in the original statement.\n2. Formulate questions that challenge or explore these assumptions.\n3. Ask open-ended questions to encourage elaboration.',
    category: 'Educational',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.1.0', author: 'Pedagogy Team' },
    tags: ['socratic', 'questions', 'inquiry'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      "Input: 'This solution is best.' -> Output: 'What criteria make this solution superior to the alternatives?'",
    performance: {
      estimatedProcessingTime: 170,
      tokenUsage: 210,
      complexityScore: 5,
    },
  },
  {
    id: 'story',
    key: 'storytelling',
    name: 'Storytelling',
    shortDescription: 'Transform into narrative format.',
    longDescription:
      'Transforms the input into a compelling narrative with story structure, characters, and plot elements.',
    systemPrompt:
      'You are a master storyteller. Transform the given prompt into a compelling narrative.\n\nElements to Include:\n1. A clear beginning, middle, and end.\n2. Character development.\n3. Descriptive setting.\n4. A central conflict or theme.',
    category: 'Creative',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.3.0', author: 'Narrative Design' },
    tags: ['storytelling', 'narrative', 'creative'],
    complexity: 'high',
    experimental: false,
    exampleUsage:
      "Input: 'I learned to code.' -> Output: 'The journey began late one night, with a blinking cursor and a determination to master the language of machines...'",
    performance: {
      estimatedProcessingTime: 300,
      tokenUsage: 400,
      complexityScore: 8,
    },
  },
  {
    id: 'data',
    key: 'data-driven',
    name: 'Data-Driven',
    shortDescription: 'Add data and analytical perspective.',
    longDescription:
      'Enhances the prompt to request evidence-based reasoning, statistical analysis, and quantitative data to support assertions.',
    systemPrompt:
      'You are a Data Analyst. Your goal is to enhance the prompt to ensure the AI prioritizes data and evidence.\n\nRequirements:\n1. Request specific data points, statistics, or metrics.\n2. Ask for quantitative analysis or comparisons.\n3. Encourage the use of charts or tables.',
    category: 'Technical',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.1.0', author: 'Data Science Team' },
    tags: ['data', 'analytics', 'statistics'],
    complexity: 'high',
    experimental: false,
    exampleUsage:
      "Input: 'Is this marketing campaign good?' -> Output: 'Analyze the campaign using CTR and CPC metrics...'",
    performance: {
      estimatedProcessingTime: 230,
      tokenUsage: 300,
      complexityScore: 6,
    },
  },
  {
    id: 'ethical',
    key: 'ethical-framework',
    name: 'Ethical Framework',
    shortDescription: 'Add ethical considerations and values.',
    longDescription:
      'Enhances the prompt with ethical considerations, moral frameworks, and responsible guidance to ensure outputs are ethically sound.',
    systemPrompt:
      'You are an ethics expert. Enhance the prompt with ethical considerations and moral frameworks.\n\nGuidelines:\n1. Identify potential ethical dilemmas in the request.\n2. Incorporate principles of fairness, accountability, and transparency.\n3. Suggest safeguards against harm.',
    category: 'Professional',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Ethics Board' },
    tags: ['ethics', 'morality', 'responsibility'],
    complexity: 'high',
    experimental: false,
    exampleUsage:
      "Input: 'Write a sales email.' -> Output: 'Write a persuasive sales email that avoids manipulation and remains honest about product limitations.'",
    performance: {
      estimatedProcessingTime: 210,
      tokenUsage: 260,
      complexityScore: 7,
    },
  },
  {
    id: 'accessible',
    key: 'accessibility-focus',
    name: 'Accessibility Focus',
    shortDescription: 'Make content accessible to all users.',
    longDescription:
      "Enhances the prompt to be inclusive, accessible, and considerate of all users' needs, including those with disabilities.",
    systemPrompt:
      'You are an accessibility expert. Enhance the prompt to be inclusive and accessible.\n\nStandards:\n1. Use plain language (easy to read).\n2. Ensure descriptions of visual content are provided.\n3. Consider motor and cognitive impairments in instructions.\n4. Follow WCAG guidelines.',
    category: 'Professional',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.2.0', author: 'A11y Team' },
    tags: ['accessibility', 'inclusive', 'a11y'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      "Input: 'Click the button.' -> Output: 'Select the button to proceed.'",
    performance: {
      estimatedProcessingTime: 160,
      tokenUsage: 190,
      complexityScore: 4,
    },
  },
  {
    id: 'step',
    key: 'step-by-step',
    name: 'Step-by-Step',
    shortDescription: 'Break down into sequential steps.',
    longDescription:
      'Decomposes a complex task into a numbered list of logical, sequential actions to guide the user through a process.',
    systemPrompt:
      'You are an Instructional Designer. Break down the provided information into a clear, sequential guide.\n\nStructure:\n1. Begin with a clear objective.\n2. Number steps logically.\n3. Keep steps discrete and actionable.',
    category: 'Educational',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.2.0', author: 'Learning & Dev' },
    tags: ['tutorial', 'guide', 'steps'],
    complexity: 'medium',
    experimental: false,
    exampleUsage: "Input: 'Bake a cake.' -> Output: 'Step 1: Preheat oven...'",
    performance: {
      estimatedProcessingTime: 170,
      tokenUsage: 200,
      complexityScore: 4,
    },
  },
  {
    id: 'example',
    key: 'add-examples',
    name: 'Add Examples',
    shortDescription: 'Include relevant examples and illustrations.',
    longDescription:
      'Enhances the prompt with relevant examples, case studies, and illustrative scenarios to clarify abstract concepts.',
    systemPrompt:
      'You are an expert in educational examples. Enhance the prompt with relevant examples.\n\nStrategy:\n1. Identify abstract concepts in the original text.\n2. Provide concrete, real-world examples to illustrate them.\n3. Use analogies if helpful to bridge understanding.',
    category: 'Educational',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.1.0', author: 'Education Team' },
    tags: ['examples', 'illustration', 'analogy'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      "Input: 'Use metaphors in writing.' -> Output: 'Use metaphors to create vivid comparisons. For example, 'Her smile was a beacon.' (Simile) vs 'Her smile was sunshine.' (Metaphor).'",
    performance: {
      estimatedProcessingTime: 180,
      tokenUsage: 220,
      complexityScore: 4,
    },
  },
  {
    id: 'compare',
    key: 'comparison-focus',
    name: 'Comparison Focus',
    shortDescription: 'Add comparative elements and alternatives.',
    longDescription:
      'Enhances the prompt with comparisons, alternatives, and different perspectives to provide a well-rounded view.',
    systemPrompt:
      'You are an expert in comparative analysis. Enhance the prompt with comparisons and alternatives.\n\nRequirements:\n1. Compare the primary subject with relevant alternatives.\n2. Highlight pros and cons of each.\n3. Provide a balanced perspective.',
    category: 'Analytical',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Analysis Group' },
    tags: ['comparison', 'alternatives', 'analysis'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      "Input: 'Buy an iPhone.' -> Output: 'Compare the iPhone with leading Android competitors regarding price, ecosystem, and features.'",
    performance: {
      estimatedProcessingTime: 200,
      tokenUsage: 250,
      complexityScore: 5,
    },
  },
  {
    id: 'future',
    key: 'future-oriented',
    name: 'Future-Oriented',
    shortDescription: 'Add forward-thinking and visionary elements.',
    longDescription:
      'Enhances the prompt with forward-thinking, visionary elements, and future considerations.',
    systemPrompt:
      'You are a strategic futurist. Enhance the prompt with forward-thinking elements.\n\nFocus:\n1. Consider long-term implications.\n2. Incorporate emerging trends.\n3. Imagine future scenarios.',
    category: 'Strategic',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.1.0', author: 'Strategy Team' },
    tags: ['future', 'visionary', 'trends'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      "Input: 'Design a website.' -> Output: 'Design a website with a forward-looking architecture that accommodates AR/VR integration in 5 years.'",
    performance: {
      estimatedProcessingTime: 190,
      tokenUsage: 230,
      complexityScore: 5,
    },
  },
  {
    id: 'historical',
    key: 'historical-context',
    name: 'Historical Context',
    shortDescription: 'Add historical perspective and context.',
    longDescription:
      'Enhances the prompt with historical context, relevant precedents, and temporal perspective.',
    systemPrompt:
      'You are a historical expert. Enhance the prompt with historical context.\n\nSteps:\n1. Reference relevant historical events.\n2. Draw parallels to past precedents.\n3. Analyze the evolution of the topic over time.',
    category: 'Research',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'History Dept' },
    tags: ['history', 'context', 'research'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      "Input: 'Analyze the current trade war.' -> Output: 'Analyze the current trade war by comparing it to the Smoot-Hawley Tariff Act and 19th-century protectionism.'",
    performance: {
      estimatedProcessingTime: 220,
      tokenUsage: 270,
      complexityScore: 6,
    },
  },
  {
    id: 'scientific',
    key: 'scientific-method',
    name: 'Scientific Method',
    shortDescription: 'Apply scientific thinking and methodology.',
    longDescription:
      'Enhances the prompt with scientific thinking, methodology, and evidence-based approaches.',
    systemPrompt:
      'You are a scientific method expert. Enhance the prompt with scientific rigor.\n\nRequirements:\n1. Formulate a hypothesis or clear research question.\n2. Describe the methodology or experiment.\n3. Demand evidence-based conclusions.',
    category: 'Research',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.2.0', author: 'Science Team' },
    tags: ['science', 'method', 'research'],
    complexity: 'high',
    experimental: false,
    exampleUsage:
      "Input: 'Does coffee help you work?' -> Output: 'Design an experiment to test the correlation between caffeine consumption and cognitive output, controlling for sleep variables.'",
    performance: {
      estimatedProcessingTime: 240,
      tokenUsage: 290,
      complexityScore: 7,
    },
  },
  {
    id: 'philosophical',
    key: 'philosophical-depth',
    name: 'Philosophical Depth',
    shortDescription: 'Add philosophical inquiry and deeper meaning.',
    longDescription:
      'Enhances the prompt with philosophical inquiry, deep questions, and meaningful reflections.',
    systemPrompt:
      'You are a philosophy expert. Enhance the prompt with philosophical inquiry.\n\nFocus Areas:\n1. Explore the fundamental nature of reality (metaphysics).\n2. Question knowledge and belief (epistemology).\n3. Examine moral values (ethics).',
    category: 'Research',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Philosophy Dept' },
    tags: ['philosophy', 'deep-thinking', 'inquiry'],
    complexity: 'high',
    experimental: false,
    exampleUsage:
      "Input: 'I am unhappy.' -> Output: 'Explore the nature of happiness. Is it a state of being or a fleeting emotion? How does it relate to suffering?'",
    performance: {
      estimatedProcessingTime: 250,
      tokenUsage: 300,
      complexityScore: 8,
    },
  },
  {
    id: 'humorous',
    key: 'add-humor',
    name: 'Add Humor',
    shortDescription: 'Inject appropriate humor and wit.',
    longDescription:
      'Enhances the prompt with appropriate humor, wit, and levity while maintaining professionalism.',
    systemPrompt:
      'You are a humor expert. Enhance the prompt with appropriate humor.\n\nGuidelines:\n1. Use wit, irony, or lightheartedness.\n2. Avoid offensive or sensitive topics.\n3. Ensure humor supports the main message rather than distracting from it.',
    category: 'Tone',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.1.0', author: 'Comedy Central' },
    tags: ['humor', 'wit', 'funny'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      "Input: 'The server is down.' -> Output: 'The server has decided to take an unscheduled nap. We are waking it up gently.'",
    performance: {
      estimatedProcessingTime: 180,
      tokenUsage: 210,
      complexityScore: 5,
    },
  },
  {
    id: 'motivational',
    key: 'motivational-tone',
    name: 'Motivational Tone',
    shortDescription: 'Add inspiring and motivating elements.',
    longDescription:
      'Enhances the prompt with inspiring language, motivational elements, and encouragement.',
    systemPrompt:
      'You are a motivational expert. Enhance the prompt with inspiring language.\n\nTone:\n1. Energetic and uplifting.\n2. Focus on potential and growth.\n3. Use empowering verbs.',
    category: 'Personal',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Coaching Team' },
    tags: ['motivation', 'inspiration', 'encouragement'],
    complexity: 'low',
    experimental: false,
    exampleUsage:
      "Input: 'Finish the report.' -> Output: 'Seize the day and crush that report! You have the power to complete it.'",
    performance: {
      estimatedProcessingTime: 130,
      tokenUsage: 150,
      complexityScore: 2,
    },
  },
  {
    id: 'debug',
    key: 'debug-troubleshoot',
    name: 'Debug & Troubleshoot',
    shortDescription: 'Add debugging and problem-solving focus.',
    longDescription:
      'Enhances the prompt with troubleshooting steps, problem-solving frameworks, and debugging techniques.',
    systemPrompt:
      'You are a debugging expert. Enhance the prompt with troubleshooting steps.\n\nProcess:\n1. Define the problem clearly.\n2. List potential causes.\n3. Propose steps to isolate the issue.\n4. Suggest solutions or workarounds.',
    category: 'Technical',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.3.0', author: 'DevSupport' },
    tags: ['debug', 'troubleshoot', 'support'],
    complexity: 'high',
    experimental: false,
    exampleUsage:
      "Input: 'The code fails.' -> Output: 'Identify the error stack trace, isolate the variable causing the failure, and verify the input data types.'",
    performance: {
      estimatedProcessingTime: 200,
      tokenUsage: 240,
      complexityScore: 6,
    },
  },
  {
    id: 'security',
    key: 'security-focus',
    name: 'Security Focus',
    shortDescription: 'Add security and privacy considerations.',
    longDescription:
      'Enhances the prompt with security considerations, privacy best practices, and protective measures.',
    systemPrompt:
      'You are a security expert. Enhance the prompt with security considerations.\n\nRequirements:\n1. Validate inputs (sanitize, escape).\n2. Secure data storage (encryption).\n3. Implement access controls (authentication, authorization).',
    category: 'Technical',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.2.0', author: 'SecOps' },
    tags: ['security', 'privacy', 'protection'],
    complexity: 'high',
    experimental: false,
    exampleUsage:
      "Input: 'Create a login form.' -> Output: 'Create a login form using OWASP guidelines, including CSRF tokens and rate limiting.'",
    performance: {
      estimatedProcessingTime: 220,
      tokenUsage: 260,
      complexityScore: 7,
    },
  },
  {
    id: 'performance',
    key: 'performance-optimization',
    name: 'Performance Optimization',
    shortDescription: 'Focus on efficiency and performance.',
    longDescription:
      'Enhances the prompt with performance considerations, efficiency metrics, and optimization strategies.',
    systemPrompt:
      'You are a performance optimization expert. Enhance the prompt with performance considerations.\n\nFocus:\n1. Reduce latency.\n2. Minimize resource usage (CPU, memory).\n3. Optimize algorithms.',
    category: 'Technical',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.1.0', author: 'PerfTeam' },
    tags: ['performance', 'optimization', 'efficiency'],
    complexity: 'high',
    experimental: false,
    exampleUsage:
      "Input: 'Sort this list.' -> Output: 'Sort this list using an efficient algorithm like Quicksort or Mergesort, considering time complexity.'",
    performance: {
      estimatedProcessingTime: 190,
      tokenUsage: 230,
      complexityScore: 6,
    },
  },
  {
    id: 'scalable',
    key: 'scalability-focus',
    name: 'Scalability Focus',
    shortDescription: 'Add scalability and growth considerations.',
    longDescription:
      'Enhances the prompt with scalability considerations, growth strategies, and flexible design principles.',
    systemPrompt:
      'You are a scalability expert. Enhance the prompt with scalability considerations.\n\nPrinciples:\n1. Horizontal vs Vertical scaling.\n2. Load balancing.\n3. Database sharding or caching.',
    category: 'Technical',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'ArchTeam' },
    tags: ['scalability', 'growth', 'architecture'],
    complexity: 'expert',
    experimental: false,
    exampleUsage:
      "Input: 'Design an API.' -> Output: 'Design a RESTful API that supports stateless scaling and high availability across regions.'",
    performance: {
      estimatedProcessingTime: 230,
      tokenUsage: 280,
      complexityScore: 8,
    },
  },
  {
    id: 'simplify',
    key: 'simplify-complex-concepts',
    name: 'Simplify Complex Concepts',
    shortDescription: 'Break down complex ideas into simple terms.',
    longDescription:
      'Transforms complex concepts into clear, simple, and easy-to-understand language while preserving accuracy.',
    systemPrompt:
      'You are an expert in simplification (ELI5). Transform complex concepts into simple language.\n\nMethod:\n1. Use analogies to everyday life.\n2. Avoid jargon.\n3. Use short sentences.',
    category: 'Writing',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.1.0', author: 'Education Team' },
    tags: ['simplify', 'eli5', 'explanation'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      "Input: 'Explain blockchain.' -> Output: 'Imagine a digital notebook that everyone shares but no one can erase. That is blockchain.'",
    performance: {
      estimatedProcessingTime: 160,
      tokenUsage: 190,
      complexityScore: 4,
    },
  },
  {
    id: 'emoji',
    key: 'add-emojis',
    name: 'Add Emojis',
    shortDescription: 'Enhance with appropriate emojis and visual cues.',
    longDescription:
      'Enhances the prompt with appropriate emojis and visual elements that improve engagement and clarity.',
    systemPrompt:
      'You are an expert in digital communication. Enhance the prompt with appropriate emojis.\n\nGuidelines:\n1. Ensure emojis match the context.\n2. Do not overuse; place them strategically for emphasis.\n3. Avoid potentially offensive emojis.',
    category: 'Tone',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Social Team' },
    tags: ['emoji', 'visual', 'engagement'],
    complexity: 'low',
    experimental: false,
    exampleUsage:
      "Input: 'Great job on the report!' -> Output: 'Great job on the report! 📈👍'",
    performance: {
      estimatedProcessingTime: 110,
      tokenUsage: 130,
      complexityScore: 1,
    },
  },
  {
    id: 'metaphor',
    key: 'add-metaphors',
    name: 'Add Metaphors',
    shortDescription:
      'Include metaphors and analogies for better understanding.',
    longDescription:
      'Enhances the prompt with relevant metaphors and analogies that make complex concepts easier to understand.',
    systemPrompt:
      'You are an expert in metaphorical thinking. Enhance the prompt with relevant metaphors.\n\nStrategy:\n1. Identify the core concept.\n2. Find a relatable domain (e.g., nature, machinery) to compare it to.\n3. Draw explicit parallels.',
    category: 'Writing',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Lit Team' },
    tags: ['metaphor', 'analogy', 'comparison'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      "Input: 'The immune system fights germs.' -> Output: 'The immune system is like a castle defense, with white blood cells acting as the guards.'",
    performance: {
      estimatedProcessingTime: 170,
      tokenUsage: 200,
      complexityScore: 4,
    },
  },
  {
    id: 'time',
    key: 'time-sensitive',
    name: 'Time-Sensitive',
    shortDescription: 'Add urgency and time-based elements.',
    longDescription:
      'Enhances the prompt with time-sensitive elements, deadlines, and temporal context to create urgency.',
    systemPrompt:
      'You are an expert in time management. Enhance the prompt with time-sensitive elements.\n\nElements:\n1. Specific deadlines (e.g., EOD, Friday).\n2. Urgency markers (ASAP, immediately).\n3. Sequencing (First, then, finally).',
    category: 'Business',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'PMO' },
    tags: ['time', 'urgency', 'deadline'],
    complexity: 'low',
    experimental: false,
    exampleUsage:
      "Input: 'Finish the task.' -> Output: 'Finish the task by 5:00 PM today to ensure we meet the client deadline.'",
    performance: {
      estimatedProcessingTime: 120,
      tokenUsage: 140,
      complexityScore: 2,
    },
  },
  {
    id: 'cultural',
    key: 'cultural-context',
    name: 'Cultural Context',
    shortDescription: 'Add cultural awareness and global perspective.',
    longDescription:
      'Enhances the prompt with cultural sensitivity, global perspectives, and cross-cultural understanding.',
    systemPrompt:
      'You are a cultural expert. Enhance the prompt with cultural sensitivity.\n\nConsiderations:\n1. Cultural norms and etiquette.\n2. Global perspective vs local perspective.\n3. Avoiding cultural appropriation or insensitivity.',
    category: 'Personal',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.1.0', author: 'Global Team' },
    tags: ['cultural', 'global', 'diversity'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      "Input: 'Greet the user.' -> Output: 'Greet the user in a way that is respectful of their potential cultural background (e.g., use a formal bow or handshake depending on context).'",
    performance: {
      estimatedProcessingTime: 180,
      tokenUsage: 220,
      complexityScore: 5,
    },
  },
  {
    id: 'interactive',
    key: 'make-interactive',
    name: 'Make Interactive',
    shortDescription: 'Add interactive elements and engagement prompts.',
    longDescription:
      'Transforms the prompt to include interactive elements, engagement prompts, and participatory features.',
    systemPrompt:
      'You are an expert in interactive design. Transform the prompt to include interactive elements.\n\nFeatures:\n1. Questions directed at the user.\n2. Calls to action (Click here, Reply with...).\n3. Gamification elements.',
    category: 'Writing',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.2.0', author: 'UX Team' },
    tags: ['interactive', 'engagement', 'ux'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      "Input: 'Here is the info.' -> Output: 'Here is the info. What do you think? Reply with your thoughts!'",
    performance: {
      estimatedProcessingTime: 160,
      tokenUsage: 180,
      complexityScore: 4,
    },
  },
  {
    id: 'local',
    key: 'localize-content',
    name: 'Localize Content',
    shortDescription: 'Adapt content for local context and relevance.',
    longDescription:
      'Adapts the prompt to include local context, regional references, and culturally appropriate elements.',
    systemPrompt:
      'You are a localization expert. Adapt the prompt to include local context.\n\nAdaptation:\n1. Use local idioms or slang (if specified).\n2. Reference local events or places.\n3. Adjust to local date/time formats.',
    category: 'Language',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'LocTeam' },
    tags: ['localization', 'regional', 'adaptation'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      "Input: 'It is summer.' -> Output: 'It is summer, perfect for a day at the beach [specific local beach].'",
    performance: {
      estimatedProcessingTime: 170,
      tokenUsage: 200,
      complexityScore: 4,
    },
  },
  {
    id: 'emoji-free',
    key: 'remove-emojis',
    name: 'Remove Emojis',
    shortDescription: 'Clean up text by removing emojis and symbols.',
    longDescription:
      'Removes emojis, excessive symbols, and informal elements to create cleaner, more professional text.',
    systemPrompt:
      'You are an expert in formal communication. Remove emojis and informal elements.\n\nAction:\n1. Strip all emoji characters.\n2. Remove special symbols (like ~ or *), unless used for standard formatting like bullets.\n3. Clean up the text structure.',
    category: 'Writing',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Editorial' },
    tags: ['clean', 'formal', 'text-processing'],
    complexity: 'low',
    experimental: false,
    exampleUsage: "Input: 'Great job!! 🎉✨' -> Output: 'Great job!'",
    performance: {
      estimatedProcessingTime: 100,
      tokenUsage: 100,
      complexityScore: 1,
    },
  },
  {
    id: 'universal',
    key: 'universal-design',
    name: 'Universal Design',
    shortDescription: 'Make content universally accessible and clear.',
    longDescription:
      'Enhances the prompt to be universally accessible, culturally neutral, and clear to diverse audiences.',
    systemPrompt:
      'You are a universal design expert. Enhance the prompt to be universally accessible.\n\nPrinciples:\n1. Equitable Use.\n2. Flexibility in Use.\n3. Simple and Intuitive.\n4. Perceptible Information.',
    category: 'Professional',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Design Systems' },
    tags: ['universal', 'accessible', 'inclusive'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      "Input: 'Mandatory meeting.' -> Output: 'Required meeting: We will provide translation services and captioning.'",
    performance: {
      estimatedProcessingTime: 180,
      tokenUsage: 210,
      complexityScore: 5,
    },
  },
  {
    id: 'trendy',
    key: 'add-trendy-elements',
    name: 'Add Trendy Elements',
    shortDescription: 'Incorporate current trends and popular references.',
    longDescription:
      'Enhances the prompt with current trends, popular references, and contemporary language.',
    systemPrompt:
      'You are a trend expert. Enhance the prompt with current trends.\n\nElements:\n1. Gen Z slang (appropriately).\n2. Current social media memes (non-offensive).\n3. Pop culture references.',
    category: 'Tone',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Social Team' },
    tags: ['trendy', 'pop-culture', 'slang'],
    complexity: 'medium',
    experimental: true,
    exampleUsage:
      "Input: 'This is good.' -> Output: 'This is giving main character energy. No cap.'",
    performance: {
      estimatedProcessingTime: 150,
      tokenUsage: 180,
      complexityScore: 4,
    },
  },
  {
    id: 'retro',
    key: 'vintage-style',
    name: 'Vintage Style',
    shortDescription: 'Add vintage or retro elements to the prompt.',
    longDescription:
      'Transforms the prompt with retro language, classic references, and nostalgic elements.',
    systemPrompt:
      'You are an expert in vintage styles. Transform the prompt with retro language.\n\nStyle:\n1. Use 1920s-1950s slang.\n2. Formal, polite, and slightly antiquated sentence structures.\n3. References to classic technology or fashion.',
    category: 'Tone',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'History Buff' },
    tags: ['retro', 'vintage', 'nostalgia'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      "Input: 'Hello, friend.' -> Output: 'Greetings, old chap. It is swell to see you.'",
    performance: {
      estimatedProcessingTime: 160,
      tokenUsage: 190,
      complexityScore: 4,
    },
  },
  {
    id: 'minimal',
    key: 'minimalist-approach',
    name: 'Minimalist Approach',
    shortDescription: 'Strip down to essential elements only.',
    longDescription:
      'Reduces the prompt to its essential elements, removing all non-critical information while maintaining clarity.',
    systemPrompt:
      'You are a minimalism expert. Reduce the prompt to its essential elements.\n\nStrategy:\n1. Remove all adjectives and adverbs not strictly necessary.\n2. Shorten sentences to their bare bones.\n3. Focus only on the core action.',
    category: 'Writing',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Design Systems' },
    tags: ['minimal', 'essential', 'clean'],
    complexity: 'low',
    experimental: false,
    exampleUsage:
      "Input: 'Please review the document at your earliest convenience.' -> Output: 'Review the document.'",
    performance: {
      estimatedProcessingTime: 110,
      tokenUsage: 110,
      complexityScore: 1,
    },
  },

  // --- Legal & Compliance ---
  {
    id: 'legal-compliance',
    key: 'legal-compliance-review',
    name: 'Legal Compliance Review',
    shortDescription:
      'Ensure prompt meets legal standards and regulatory requirements.',
    longDescription:
      'Analyzes the prompt against regulatory frameworks to ensure the resulting output does not encourage non-compliant advice or content.',
    systemPrompt:
      'You are a Legal Compliance Expert. Review the provided prompt and ensure it aligns with legal standards.\n\nReview Process:\n1. Identify jurisdiction and regulations.\n2. Check for requests that violate privacy laws.\n3. Add necessary disclaimers.\n4. Flag high-risk requests.',
    category: 'Legal',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Legal Engineering' },
    tags: ['legal', 'compliance', 'gdpr', 'hipaa'],
    complexity: 'expert',
    experimental: false,
    exampleUsage:
      'Modifying a prompt to include "Ensure all data handling described adheres to GDPR."',
    performance: {
      estimatedProcessingTime: 300,
      tokenUsage: 400,
      complexityScore: 9,
    },
  },
  {
    id: 'contract-language',
    key: 'contract-language-enhancement',
    name: 'Contract Language Enhancement',
    shortDescription: 'Optimize for legal contract precision and clarity.',
    longDescription:
      'Enhances the prompt to require the use of standard legal terminology, defined terms, and formal structures typical of binding agreements.',
    systemPrompt:
      'You are a Contract Law Specialist. Enhance the prompt to generate formal legal contract language.\n\nEnhancement Steps:\n1. Use defined terms.\n2. Use formal tone (hereinafter, pursuant to).\n3. Delineate rights and obligations clearly.',
    category: 'Legal',
    chainingEnabled: false,
    templateVariables: ['jurisdiction'],
    dependencies: ['legal-compliance'],
    metadata: { version: '1.1.0', author: 'Contract Automation AI' },
    tags: ['contracts', 'legal-drafting', 'precision'],
    complexity: 'expert',
    experimental: false,
    exampleUsage:
      'Input: "Write an agreement." -> Output: "Draft a Master Services Agreement (MSA) under the laws of New York..."',
    performance: {
      estimatedProcessingTime: 350,
      tokenUsage: 500,
      complexityScore: 9,
    },
  },
  {
    id: 'privacy-focused',
    key: 'privacy-protection-focus',
    name: 'Privacy Protection Focus',
    shortDescription:
      'Add privacy considerations and data protection elements.',
    longDescription:
      'Enhances the prompt with strong privacy protections, data minimization principles, and compliance considerations.',
    systemPrompt:
      'You are a privacy law expert. Enhance the prompt with privacy protections.\n\nRequirements:\n1. Data Minimization: Collect only what is needed.\n2. Purpose Limitation: Use data only for stated reasons.\n3. Security Measures: Encrypt and protect data.',
    category: 'Legal',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Privacy Team' },
    tags: ['privacy', 'gdpr', 'ccpa', 'data-protection'],
    complexity: 'high',
    experimental: false,
    exampleUsage:
      'Input: "Collect user emails." -> Output: "Collect user emails strictly for the purpose of sending newsletters, ensuring explicit opt-in consent."',
    performance: {
      estimatedProcessingTime: 250,
      tokenUsage: 320,
      complexityScore: 8,
    },
  },
  {
    id: 'terms-optimization',
    key: 'terms-of-service-optimization',
    name: 'Terms of Service Optimization',
    shortDescription: 'Enhance for terms of service and policy documents.',
    longDescription:
      'Optimizes the prompt for clarity, enforceability, and user understanding in terms of service documents.',
    systemPrompt:
      'You are a terms of service expert. Optimize the prompt for clarity and enforceability.\n\nFocus:\n1. Clear definitions of prohibited actions.\n2. Liability limitations.\n3. Termination clauses.',
    category: 'Legal',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Policy Team' },
    tags: ['tos', 'policy', 'legal'],
    complexity: 'high',
    experimental: false,
    exampleUsage:
      'Input: "Rules for the app." -> Output: "Terms of Service: Users must not engage in harassment or illegal activities... Liability is limited..."',
    performance: {
      estimatedProcessingTime: 280,
      tokenUsage: 350,
      complexityScore: 8,
    },
  },
  {
    id: 'disclaimer-addition',
    key: 'add-legal-disclaimers',
    name: 'Add Legal Disclaimers',
    shortDescription: 'Include appropriate legal disclaimers and limitations.',
    longDescription:
      'Adds appropriate legal disclaimers, limitations of liability, and risk disclosures to the prompt where necessary.',
    systemPrompt:
      'You are a legal disclaimer specialist. Add appropriate legal disclaimers.\n\nAction:\n1. Identify potential risks in the output.\n2. Add standard "Not financial/legal/medical advice" disclaimers if needed.\n3. Limit liability for errors.',
    category: 'Legal',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Legal Ops' },
    tags: ['disclaimer', 'liability', 'legal'],
    complexity: 'high',
    experimental: false,
    exampleUsage:
      'Input: "Invest in stocks." -> Output: "Investment analysis: Disclaimer: This is not financial advice. Consult a broker."',
    performance: {
      estimatedProcessingTime: 200,
      tokenUsage: 250,
      complexityScore: 7,
    },
  },

  // --- Medical & Healthcare ---
  {
    id: 'medical-terminology',
    key: 'medical-terminology-precision',
    name: 'Medical Terminology Precision',
    shortDescription:
      'Enhance with accurate medical terminology and clinical precision.',
    longDescription:
      'Ensures the prompt guides the AI to use correct medical nomenclature, standard clinical codes, and professional healthcare terminology.',
    systemPrompt:
      'You are a Medical Doctor and Clinical Terminologist. Refine the prompt to use precise medical terminology.\n\nRequirements:\n1. Use precise anatomical and pharmacological terms.\n2. Reference standard medical classifications (ICD-10).\n3. Maintain a clinical, objective tone.',
    category: 'Medical',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Health Informatics' },
    tags: ['medical', 'healthcare', 'clinical', 'icd-10'],
    complexity: 'expert',
    experimental: false,
    exampleUsage:
      'Input: "Fix heart pain." -> Output: "Formulate a treatment plan for angina pectoris..."',
    performance: {
      estimatedProcessingTime: 280,
      tokenUsage: 350,
      complexityScore: 9,
    },
  },
  {
    id: 'patient-communication',
    key: 'patient-friendly-communication',
    name: 'Patient-Friendly Communication',
    shortDescription: 'Make medical content accessible to patients.',
    longDescription:
      'Transforms medical jargon into clear, empathetic, and understandable language for patient audiences.',
    systemPrompt:
      'You are a patient communication specialist. Transform medical jargon into patient-friendly language.\n\nGuidelines:\n1. Use the "teach-back" method.\n2. Avoid medical jargon; use plain English.\n3. Be empathetic and reassuring.',
    category: 'Medical',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Patient Experience' },
    tags: ['medical', 'patient', 'communication', 'plain-language'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      'Input: "Hypertension management." -> Output: "Managing high blood pressure: Tips to keep your heart healthy."',
    performance: {
      estimatedProcessingTime: 180,
      tokenUsage: 220,
      complexityScore: 4,
    },
  },
  {
    id: 'clinical-documentation',
    key: 'clinical-documentation-enhancement',
    name: 'Clinical Documentation Enhancement',
    shortDescription: 'Optimize for medical records and clinical notes.',
    longDescription:
      'Enhances the prompt for accuracy, completeness, and professional standards in medical record keeping.',
    systemPrompt:
      'You are a clinical documentation expert. Enhance the prompt for medical records.\n\nStandards:\n1. SOAP Note structure (Subjective, Objective, Assessment, Plan).\n2. Chronological ordering.\n3. Objective, factual language.',
    category: 'Medical',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Health IT' },
    tags: ['medical', 'documentation', 'emr', 'soap'],
    complexity: 'high',
    experimental: false,
    exampleUsage:
      'Input: "Patient has a cough." -> Output: "S: Patient reports productive cough. O: Lung sounds clear. A: Bronchitis. P: Rest and fluids."',
    performance: {
      estimatedProcessingTime: 240,
      tokenUsage: 300,
      complexityScore: 7,
    },
  },
  {
    id: 'health-literacy',
    key: 'health-literacy-focus',
    name: 'Health Literacy Focus',
    shortDescription:
      'Improve understanding for diverse health literacy levels.',
    longDescription:
      'Enhances the prompt to be understandable across different health literacy levels using plain language principles.',
    systemPrompt:
      'You are a health literacy expert. Enhance the prompt for diverse literacy levels.\n\nPrinciples:\n1. Limit to one concept per sentence.\n2. Use active voice.\n3. Provide visual aid descriptions.',
    category: 'Medical',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Public Health' },
    tags: ['medical', 'literacy', 'education'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      'Input: "Myocardial infarction." -> Output: "Heart attack: When blood flow to the heart is blocked."',
    performance: {
      estimatedProcessingTime: 170,
      tokenUsage: 200,
      complexityScore: 4,
    },
  },
  {
    id: 'medical-research',
    key: 'medical-research-optimization',
    name: 'Medical Research Optimization',
    shortDescription: 'Enhance for medical research papers and studies.',
    longDescription:
      'Optimizes the prompt for scientific rigor, research methodology clarity, and academic standards in medical research.',
    systemPrompt:
      'You are a medical research methodology expert. Optimize the prompt for academic rigor.\n\nRequirements:\n1. PICO format (Population, Intervention, Comparison, Outcome).\n2. Statistical significance discussion.\n3. Peer-review quality tone.',
    category: 'Medical',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Med Research' },
    tags: ['medical', 'research', 'academic', 'pico'],
    complexity: 'expert',
    experimental: false,
    exampleUsage:
      'Input: "Test the drug." -> Output: "Design a double-blind randomized control trial to compare the efficacy of Drug X against a placebo..."',
    performance: {
      estimatedProcessingTime: 300,
      tokenUsage: 400,
      complexityScore: 9,
    },
  },

  // --- Financial & Economic ---
  {
    id: 'financial-precision',
    key: 'financial-terminology-precision',
    name: 'Financial Terminology Precision',
    shortDescription: 'Add precise financial and economic terminology.',
    longDescription:
      'Enhances the prompt with accurate financial terminology, economic concepts, and industry-specific financial language.',
    systemPrompt:
      'You are a financial terminology expert. Enhance the prompt with accurate financial language.\n\nTerms to Use:\n1. ROI, EBITDA, Liquidity, Volatility.\n2. Fiscal vs Monetary policy.\n3. Bull vs Bear markets.',
    category: 'Financial',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'FinTech Team' },
    tags: ['financial', 'economic', 'terminology'],
    complexity: 'high',
    experimental: false,
    exampleUsage:
      'Input: "Make money." -> Output: "Maximize Return on Investment (ROI) through diversified asset allocation."',
    performance: {
      estimatedProcessingTime: 200,
      tokenUsage: 250,
      complexityScore: 6,
    },
  },
  {
    id: 'investment-analysis',
    key: 'investment-analysis-enhancement',
    name: 'Investment Analysis Enhancement',
    shortDescription: 'Optimize for investment research and analysis.',
    longDescription:
      'Enhances the prompt with investment research frameworks, risk assessment considerations, and portfolio optimization principles.',
    systemPrompt:
      'You are an investment analysis expert. Enhance the prompt with investment frameworks.\n\nFrameworks:\n1. Fundamental Analysis (P/E ratio, earnings).\n2. Technical Analysis (Moving averages).\n3. Risk tolerance assessment.',
    category: 'Financial',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Investment Bank' },
    tags: ['investment', 'finance', 'analysis'],
    complexity: 'expert',
    experimental: false,
    exampleUsage:
      'Input: "Buy this stock." -> Output: "Perform a fundamental analysis of the stock, evaluating P/E ratio and market cap before recommending a buy."',
    performance: {
      estimatedProcessingTime: 250,
      tokenUsage: 320,
      complexityScore: 8,
    },
  },
  {
    id: 'budget-planning',
    key: 'budget-planning-optimization',
    name: 'Budget Planning Optimization',
    shortDescription: 'Enhance for budget creation and financial planning.',
    longDescription:
      'Optimizes the prompt for budget creation, expense tracking, financial forecasting, and money management strategies.',
    systemPrompt:
      'You are a financial planning expert. Optimize the prompt for budgeting.\n\nElements:\n1. Income vs Expense breakdown.\n2. Fixed vs Variable costs.\n3. Contingency funds (emergency savings).',
    category: 'Financial',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Wealth Management' },
    tags: ['budget', 'planning', 'finance'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      'Input: "Plan my budget." -> Output: "Create a monthly budget categorizing expenses into Needs, Wants, and Savings, ensuring 20% income is saved."',
    performance: {
      estimatedProcessingTime: 180,
      tokenUsage: 220,
      complexityScore: 5,
    },
  },
  {
    id: 'economic-forecasting',
    key: 'economic-forecasting-enhancement',
    name: 'Economic Forecasting Enhancement',
    shortDescription: 'Add economic analysis and forecasting elements.',
    longDescription:
      'Enhances the prompt with economic indicators, trend analysis, forecasting methodologies, and macroeconomic context.',
    systemPrompt:
      'You are an economic forecasting expert. Enhance the prompt with economic analysis.\n\nIndicators:\n1. GDP, Inflation (CPI), Unemployment rates.\n2. Consumer Confidence Index.\n3. Interest rate trends.',
    category: 'Financial',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Economics Dept' },
    tags: ['economics', 'forecasting', 'macro'],
    complexity: 'expert',
    experimental: false,
    exampleUsage:
      'Input: "What about the economy?" -> Output: "Analyze the current economic outlook based on recent GDP growth and inflation trends."',
    performance: {
      estimatedProcessingTime: 260,
      tokenUsage: 330,
      complexityScore: 8,
    },
  },
  {
    id: 'risk-assessment',
    key: 'risk-assessment-enhancement',
    name: 'Risk Assessment Enhancement',
    shortDescription: 'Add comprehensive risk analysis and mitigation.',
    longDescription:
      'Enhances the prompt with thorough risk assessment frameworks, mitigation strategies, and contingency planning considerations.',
    systemPrompt:
      'You are a risk management expert. Enhance the prompt with risk assessment.\n\nFramework:\n1. Identify Risks (Market, Credit, Operational).\n2. Assess Likelihood and Impact.\n3. Mitigation Strategies.',
    category: 'Financial',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Risk Management' },
    tags: ['risk', 'management', 'mitigation'],
    complexity: 'high',
    experimental: false,
    exampleUsage:
      'Input: "Start a business." -> Output: "Conduct a risk assessment identifying potential market failures and operational bottlenecks."',
    performance: {
      estimatedProcessingTime: 230,
      tokenUsage: 290,
      complexityScore: 7,
    },
  },

  // --- Environmental & Sustainability ---
  {
    id: 'sustainability-focus',
    key: 'sustainability-focus',
    name: 'Sustainability Focus',
    shortDescription:
      'Add environmental sustainability and eco-friendly elements.',
    longDescription:
      'Enhances the prompt with environmental sustainability principles, eco-friendly practices, and green initiatives.',
    systemPrompt:
      'You are a sustainability expert. Enhance the prompt with sustainability principles.\n\nPrinciples:\n1. Reduce, Reuse, Recycle.\n2. Carbon footprint reduction.\n3. Sustainable sourcing.',
    category: 'Environmental',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Green Team' },
    tags: ['sustainability', 'green', 'eco-friendly'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      'Input: "Design a package." -> Output: "Design a package using biodegradable materials with minimal plastic waste."',
    performance: {
      estimatedProcessingTime: 180,
      tokenUsage: 220,
      complexityScore: 5,
    },
  },
  {
    id: 'environmental-impact',
    key: 'environmental-impact-assessment',
    name: 'Environmental Impact Assessment',
    shortDescription: 'Add environmental impact analysis and considerations.',
    longDescription:
      'Enhances the prompt with environmental impact analysis, carbon footprint considerations, and ecological consequences.',
    systemPrompt:
      'You are an environmental impact assessment expert. Enhance the prompt with impact analysis.\n\nAnalysis:\n1. Life Cycle Assessment (LCA).\n2. Impact on local biodiversity.\n3. Pollution potential.',
    category: 'Environmental',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'EPA Compliance' },
    tags: ['environmental', 'impact', 'assessment'],
    complexity: 'high',
    experimental: false,
    exampleUsage:
      'Input: "Build a factory." -> Output: "Assess the environmental impact of the factory, focusing on air quality and waste disposal."',
    performance: {
      estimatedProcessingTime: 240,
      tokenUsage: 300,
      complexityScore: 7,
    },
  },
  {
    id: 'green-technology',
    key: 'green-technology-enhancement',
    name: 'Green Technology Enhancement',
    shortDescription: 'Focus on renewable energy and sustainable technology.',
    longDescription:
      'Enhances the prompt with renewable energy concepts, sustainable technology solutions, and environmental innovation principles.',
    systemPrompt:
      'You are a green technology expert. Enhance the prompt with sustainable tech.\n\nTech:\n1. Solar/Wind energy integration.\n2. Energy efficiency (LEED standards).\n3. Smart grids.',
    category: 'Environmental',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'CleanTech' },
    tags: ['green-tech', 'renewable', 'energy'],
    complexity: 'high',
    experimental: false,
    exampleUsage:
      'Input: "Power the building." -> Output: "Implement a solar panel array with battery storage to power the building sustainably."',
    performance: {
      estimatedProcessingTime: 210,
      tokenUsage: 260,
      complexityScore: 6,
    },
  },
  {
    id: 'climate-context',
    key: 'climate-change-context',
    name: 'Climate Change Context',
    shortDescription: 'Add climate change awareness and adaptation strategies.',
    longDescription:
      'Enhances the prompt with climate change context, adaptation strategies, mitigation approaches, and climate resilience.',
    systemPrompt:
      'You are a climate change expert. Enhance the prompt with climate context.\n\nContext:\n1. Rising sea levels.\n2. Extreme weather events.\n3. Decarbonization strategies.',
    category: 'Environmental',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Climate Action' },
    tags: ['climate', 'resilience', 'adaptation'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      'Input: "Build a house." -> Output: "Design a house resilient to flooding and heatwaves, using passive cooling techniques."',
    performance: {
      estimatedProcessingTime: 200,
      tokenUsage: 250,
      complexityScore: 6,
    },
  },
  {
    id: 'eco-friendly-language',
    key: 'eco-friendly-language',
    name: 'Eco-Friendly Language',
    shortDescription:
      'Use environmentally conscious and sustainable terminology.',
    longDescription:
      'Transforms the prompt to use eco-friendly language, sustainable terminology, and environmentally conscious expressions.',
    systemPrompt:
      'You are an environmental communication expert. Use eco-friendly language.\n\nVocabulary:\n1. Use "regenerative" instead of "sustainable" where appropriate.\n2. Avoid "waste", use "resource".\n3. Focus on stewardship.',
    category: 'Environmental',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Comms Team' },
    tags: ['language', 'eco', 'environmental'],
    complexity: 'low',
    experimental: false,
    exampleUsage:
      'Input: "Throw away trash." -> Output: "Dispose of materials responsibly, prioritizing recycling and composting."',
    performance: {
      estimatedProcessingTime: 140,
      tokenUsage: 170,
      complexityScore: 3,
    },
  },

  // --- Artistic & Creative ---
  {
    id: 'poetic-enhancement',
    key: 'poetic-enhancement',
    name: 'Poetic Enhancement',
    shortDescription: 'Transform into poetic form with rhythm and meter.',
    longDescription:
      'Transforms the prompt into poetic form with appropriate rhythm, meter, rhyme schemes, and poetic devices while preserving meaning.',
    systemPrompt:
      'You are a poetry expert. Transform the prompt into poetic form.\n\nElements:\n1. Choose a form (Sonnet, Haiku, Free Verse).\n2. Use imagery and metaphor.\n3. Pay attention to rhythm and cadence.',
    category: 'Artistic',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Poetry Club' },
    tags: ['poetry', 'rhyme', 'meter'],
    complexity: 'high',
    experimental: false,
    exampleUsage:
      'Input: "I love you." -> Output: "My heart beats only for your tune, / Beneath the watching, silent moon."',
    performance: {
      estimatedProcessingTime: 250,
      tokenUsage: 320,
      complexityScore: 8,
    },
  },
  {
    id: 'musical-composition',
    key: 'musical-composition-focus',
    name: 'Musical Composition Focus',
    shortDescription: 'Enhance for music creation and composition.',
    longDescription:
      'Enhances the prompt with musical terminology, composition techniques, instrumentation details, and harmonic structures.',
    systemPrompt:
      'You are a musical composition expert. Enhance the prompt for music creation.\n\nDetails:\n1. Tempo, Key, Time Signature.\n2. Instrumentation (Timbre).\n3. Dynamics (Crescendo, Staccato).',
    category: 'Artistic',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Audio Eng' },
    tags: ['music', 'composition', 'harmony'],
    complexity: 'expert',
    experimental: false,
    exampleUsage:
      'Input: "Write a song." -> Output: "Compose a ballad in C Major, 4/4 time, featuring a piano melody and a crescendo in the bridge."',
    performance: {
      estimatedProcessingTime: 260,
      tokenUsage: 330,
      complexityScore: 8,
    },
  },
  {
    id: 'visual-art-description',
    key: 'visual-art-description-enhancement',
    name: 'Visual Art Description Enhancement',
    shortDescription: 'Add detailed art description and visual elements.',
    longDescription:
      'Enhances the prompt with detailed art descriptions, visual composition elements, color theory, and artistic techniques.',
    systemPrompt:
      'You are a visual art expert. Enhance the prompt with art descriptions.\n\nElements:\n1. Color palette (Monochromatic, Complementary).\n2. Composition (Rule of Thirds, Golden Ratio).\n3. Medium (Oil, Watercolor, Digital).',
    category: 'Artistic',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Art History' },
    tags: ['art', 'visual', 'description'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      'Input: "Draw a tree." -> Output: "Paint an oak tree using watercolors, focusing on the texture of the bark and the dappled light through the leaves."',
    performance: {
      estimatedProcessingTime: 200,
      tokenUsage: 250,
      complexityScore: 6,
    },
  },
  {
    id: 'dance-choreography',
    key: 'dance-choreography-enhancement',
    name: 'Dance Choreography Enhancement',
    shortDescription: 'Focus on dance movements and choreographic elements.',
    longDescription:
      'Enhances the prompt with dance movement descriptions, choreographic structures, rhythm patterns, and performance elements.',
    systemPrompt:
      'You are a dance choreography expert. Enhance the prompt with dance elements.\n\nVocabulary:\n1. Plié, Pirouette, Jeté (Ballet).\n2. Isolations, Dynamics (Contemporary).\n3. Formation and spacing.',
    category: 'Artistic',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Dance Co' },
    tags: ['dance', 'choreography', 'movement'],
    complexity: 'high',
    experimental: false,
    exampleUsage:
      'Input: "Dance sad." -> Output: "Perform a contemporary solo focusing on floor work, contracting movements, and slow, heavy dynamics to express sorrow."',
    performance: {
      estimatedProcessingTime: 220,
      tokenUsage: 280,
      complexityScore: 7,
    },
  },
  {
    id: 'cinematic-storytelling',
    key: 'cinematic-storytelling',
    name: 'Cinematic Storytelling',
    shortDescription: 'Transform into film script and cinematic narrative.',
    longDescription:
      'Transforms the prompt into film script format with scene descriptions, camera directions, dialogue, and cinematic techniques.',
    systemPrompt:
      'You are a cinematic storytelling expert. Transform the prompt into a script.\n\nFormat:\n1. Scene Headings (INT. HOUSE - DAY).\n2. Action Lines (visuals).\n3. Camera Angles (CLOSE UP, PAN).',
    category: 'Artistic',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Screenwriters' },
    tags: ['film', 'script', 'cinema'],
    complexity: 'high',
    experimental: false,
    exampleUsage:
      'Input: "He wakes up." -> Output: "INT. BEDROOM - MORNING\nSunlight streams through the blinds. JOHN (30s) stirs, eyes fluttering open. CLOSE UP on his alarm clock: 7:00 AM."',
    performance: {
      estimatedProcessingTime: 280,
      tokenUsage: 350,
      complexityScore: 8,
    },
  },

  // --- Gaming & Entertainment ---
  {
    id: 'game-narrative',
    key: 'game-narrative-enhancement',
    name: 'Game Narrative Enhancement',
    shortDescription:
      'Optimize for video game storytelling and narrative design.',
    longDescription:
      'Enhances the prompt for video game storytelling, character development, world-building, and interactive narrative elements.',
    systemPrompt:
      'You are a game narrative designer. Enhance the prompt for gaming.\n\nElements:\n1. Lore and World-building.\n2. Branching dialogue options.\n3. Player agency.',
    category: 'Gaming',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Game Writers' },
    tags: ['gaming', 'narrative', 'rpg'],
    complexity: 'high',
    experimental: false,
    exampleUsage:
      'Input: "Meet a guard." -> Output: "Create a guard who offers a side quest. The dialogue options should allow the player to Persuade, Intimidate, or Bribe him."',
    performance: {
      estimatedProcessingTime: 240,
      tokenUsage: 300,
      complexityScore: 7,
    },
  },
  {
    id: 'character-development',
    key: 'character-development-focus',
    name: 'Character Development Focus',
    shortDescription: 'Add deep character development and personality traits.',
    longDescription:
      'Enhances the prompt with detailed character backgrounds, personality traits, motivations, and character arcs.',
    systemPrompt:
      'You are a character development expert. Enhance the prompt with character depth.\n\nTraits:\n1. Flaws and Virtues.\n2. Backstory and Motivation.\n3. Voice and Mannerisms.',
    category: 'Gaming',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Narrative Design' },
    tags: ['character', 'writing', 'persona'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      'Input: "A hero." -> Output: "A reluctant hero who fears failure but is driven by a promise to their deceased father."',
    performance: {
      estimatedProcessingTime: 200,
      tokenUsage: 250,
      complexityScore: 6,
    },
  },
  {
    id: 'world-building',
    key: 'world-building-optimization',
    name: 'World-Building Optimization',
    shortDescription: 'Create rich fictional worlds and settings.',
    longDescription:
      'Enhances the prompt with detailed world-building elements including geography, culture, history, politics, and unique mechanics.',
    systemPrompt:
      'You are a world-building expert. Enhance the prompt with world details.\n\nAspects:\n1. Geography and Climate.\n2. Political Systems and Factions.\n3. Magic Systems or Tech Level.',
    category: 'Gaming',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Lore Keepers' },
    tags: ['world-building', 'fantasy', 'scifi'],
    complexity: 'expert',
    experimental: false,
    exampleUsage:
      'Input: "A fantasy world." -> Output: "A world floating in the sky, where islands are connected by bridges and magic is harvested from clouds."',
    performance: {
      estimatedProcessingTime: 300,
      tokenUsage: 400,
      complexityScore: 9,
    },
  },
  {
    id: 'interactive-fiction',
    key: 'interactive-fiction-enhancement',
    name: 'Interactive Fiction Enhancement',
    shortDescription:
      'Optimize for choose-your-own-adventure style narratives.',
    longDescription:
      'Transforms the prompt into interactive fiction format with branching paths, player choices, and consequence systems.',
    systemPrompt:
      'You are an interactive fiction expert. Transform the prompt into CYOA format.\n\nStructure:\n1. Set the scene.\n2. Present 3 distinct choices.\n3. Outline the consequence of each.',
    category: 'Gaming',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'IF Authors' },
    tags: ['interactive', 'fiction', 'choices'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      'Input: "Open a door." -> Output: "You stand before a heavy oak door. Do you: 1) Knock, 2) Kick it open, 3) Pick the lock?"',
    performance: {
      estimatedProcessingTime: 210,
      tokenUsage: 260,
      complexityScore: 6,
    },
  },
  {
    id: 'game-mechanics',
    key: 'game-mechanics-description',
    name: 'Game Mechanics Description',
    shortDescription: 'Add detailed game mechanics and system descriptions.',
    longDescription:
      'Enhances the prompt with detailed game mechanics descriptions, rule systems, gameplay loops, and balance considerations.',
    systemPrompt:
      'You are a game mechanics expert. Enhance the prompt with system rules.\n\nMechanics:\n1. Stats and Attributes.\n2. Resource Management (HP, Mana).\n3. Win/Loss Conditions.',
    category: 'Gaming',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Game Designers' },
    tags: ['mechanics', 'rules', 'systems'],
    complexity: 'high',
    experimental: false,
    exampleUsage:
      'Input: "Fighting system." -> Output: "A turn-based combat system using Rock-Paper-Scissors logic (Heavy beats Fast, Fast beats Strong, Strong beats Heavy)."',
    performance: {
      estimatedProcessingTime: 230,
      tokenUsage: 290,
      complexityScore: 7,
    },
  },

  // --- Sports & Fitness ---
  {
    id: 'sports-analytics',
    key: 'sports-analytics-enhancement',
    name: 'Sports Analytics Enhancement',
    shortDescription: 'Add sports statistics and performance analysis.',
    longDescription:
      'Enhances the prompt with sports statistics, performance metrics, data analysis, and athletic performance insights.',
    systemPrompt:
      'You are a sports analytics expert. Enhance the prompt with stats.\n\nMetrics:\n1. Player Efficiency Rating (PER).\n2. Expected Goals (xG).\n3. Velocity and Spin rates.',
    category: 'Sports',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Sports Data' },
    tags: ['sports', 'analytics', 'stats'],
    complexity: 'high',
    experimental: false,
    exampleUsage:
      'Input: "Is he good?" -> Output: "Analyze his performance based on his season ERA and WHIP compared to league average."',
    performance: {
      estimatedProcessingTime: 220,
      tokenUsage: 270,
      complexityScore: 7,
    },
  },
  {
    id: 'training-program',
    key: 'training-program-optimization',
    name: 'Training Program Optimization',
    shortDescription:
      'Enhance for fitness training programs and workout plans.',
    longDescription:
      'Optimizes the prompt for workout programs, exercise routines, training schedules, and fitness progression plans.',
    systemPrompt:
      'You are a fitness training expert. Optimize the prompt for workouts.\n\nStructure:\n1. Warm-up (Dynamic stretching).\n2. Main Set (Reps, Sets, Weight).\n3. Cool-down (Static stretching).',
    category: 'Sports',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Personal Trainers' },
    tags: ['fitness', 'training', 'workout'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      'Input: "Leg day." -> Output: "A leg day routine consisting of Squats (4x8), Lunges (3x12), and Calf Raises (4x15)."',
    performance: {
      estimatedProcessingTime: 180,
      tokenUsage: 220,
      complexityScore: 5,
    },
  },
  {
    id: 'athletic-performance',
    key: 'athletic-performance-focus',
    name: 'Athletic Performance Focus',
    shortDescription: 'Add athletic performance optimization strategies.',
    longDescription:
      'Enhances the prompt with performance optimization strategies, technique improvements, and athletic development principles.',
    systemPrompt:
      'You are an athletic performance coach. Enhance the prompt with performance tips.\n\nFocus:\n1. Biomechanics.\n2. Nutrition and Recovery.\n3. Mental toughness.',
    category: 'Sports',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Sports Science' },
    tags: ['sports', 'performance', 'coaching'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      'Input: "Run faster." -> Output: "Improve sprint speed by optimizing stride length and frequency, and incorporating plyometric drills."',
    performance: {
      estimatedProcessingTime: 190,
      tokenUsage: 230,
      complexityScore: 5,
    },
  },
  {
    id: 'sports-commentary',
    key: 'sports-commentary-enhancement',
    name: 'Sports Commentary Enhancement',
    shortDescription: 'Optimize for live sports commentary and analysis.',
    longDescription:
      'Enhances the prompt for live sports commentary, game analysis, player insights, and engaging sports broadcasting language.',
    systemPrompt:
      'You are a sports commentator. Enhance the prompt for broadcasting.\n\nStyle:\n1. Energetic and fast-paced.\n2. Play-by-play vs Color commentary.\n3. Storytelling about players.',
    category: 'Sports',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Broadcasters' },
    tags: ['sports', 'commentary', 'broadcasting'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      'Input: "He scored." -> Output: "He finds the back of the net! What a tremendous strike from outside the box!"',
    performance: {
      estimatedProcessingTime: 170,
      tokenUsage: 210,
      complexityScore: 5,
    },
  },
  {
    id: 'fitness-motivation',
    key: 'fitness-motivation-enhancement',
    name: 'Fitness Motivation Enhancement',
    shortDescription: 'Add motivational elements for fitness and wellness.',
    longDescription:
      'Enhances the prompt with motivational language, goal-setting strategies, and inspirational fitness messaging.',
    systemPrompt:
      'You are a fitness motivation expert. Enhance the prompt with motivation.\n\nTone:\n1. Encouraging and "Can-do" attitude.\n2. Focus on discipline over motivation.\n3. Visualize success.',
    category: 'Sports',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Fitness Coaches' },
    tags: ['fitness', 'motivation', 'wellness'],
    complexity: 'low',
    experimental: false,
    exampleUsage:
      'Input: "Go to the gym." -> Output: "Crush your workout today! You are stronger than your excuses."',
    performance: {
      estimatedProcessingTime: 130,
      tokenUsage: 160,
      complexityScore: 3,
    },
  },

  // --- Travel & Tourism ---
  {
    id: 'travel-itinerary',
    key: 'travel-itinerary-enhancement',
    name: 'Travel Itinerary Enhancement',
    shortDescription: 'Optimize for detailed travel planning and itineraries.',
    longDescription:
      'Enhances the prompt for comprehensive travel itineraries, daily schedules, activity planning, and travel logistics.',
    systemPrompt:
      'You are a travel planning expert. Enhance the prompt for itinerary creation.\n\nDetails:\n1. Day-by-day breakdown.\n2. Logistics (Transport, Accommodation).\n3. Hidden gems and local tips.',
    category: 'Travel',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Travel Agents' },
    tags: ['travel', 'itinerary', 'planning'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      'Input: "Trip to Paris." -> Output: "Day 1: Eiffel Tower and Seine Cruise. Day 2: Louvre Museum. Day 3: Day trip to Versailles."',
    performance: {
      estimatedProcessingTime: 210,
      tokenUsage: 260,
      complexityScore: 6,
    },
  },
  {
    id: 'destination-description',
    key: 'destination-description-optimization',
    name: 'Destination Description Optimization',
    shortDescription: 'Create vivid and engaging destination descriptions.',
    longDescription:
      'Enhances the prompt with vivid destination descriptions, cultural insights, local attractions, and sensory travel experiences.',
    systemPrompt:
      'You are a travel writer. Enhance the prompt with vivid descriptions.\n\nSensory:\n1. Taste the local cuisine.\n2. Smell the spices.\n3. See the architecture.',
    category: 'Travel',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Lonely Planet' },
    tags: ['travel', 'description', 'writing'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      'Input: "Go to Rome." -> Output: "Wander through the cobblestone streets of Rome, where ancient history meets vibrant modern life, and the scent of espresso fills the air."',
    performance: {
      estimatedProcessingTime: 200,
      tokenUsage: 250,
      complexityScore: 6,
    },
  },
  {
    id: 'cultural-travel',
    key: 'cultural-travel-context',
    name: 'Cultural Travel Context',
    shortDescription: 'Add cultural sensitivity and local customs awareness.',
    longDescription:
      'Enhances the prompt with cultural context, local customs, etiquette guidelines, and cross-cultural travel considerations.',
    systemPrompt:
      'You are a cultural travel expert. Enhance the prompt with cultural context.\n\nEtiquette:\n1. Dress codes (temples, mosques).\n2. Tipping customs.\n3. Greeting rituals.',
    category: 'Travel',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Cultural Navigator' },
    tags: ['travel', 'culture', 'etiquette'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      'Input: "Visit Japan." -> Output: "When visiting shrines in Japan, remember to bow respectfully and purify your hands at the chozuya before entering."',
    performance: {
      estimatedProcessingTime: 190,
      tokenUsage: 240,
      complexityScore: 5,
    },
  },
  {
    id: 'adventure-travel',
    key: 'adventure-travel-enhancement',
    name: 'Adventure Travel Enhancement',
    shortDescription: 'Focus on adventure and experiential travel elements.',
    longDescription:
      'Enhances the prompt with adventure travel elements, outdoor activities, risk considerations, and experiential planning.',
    systemPrompt:
      'You are an adventure travel expert. Enhance the prompt for adventure.\n\nActivities:\n1. Hiking, Diving, Skiing.\n2. Gear checklists.\n3. Safety briefings.',
    category: 'Travel',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: {
      version: '1.0.0',
      author: 'Nat Geo Adventure',
    },
    tags: ['travel', 'adventure', 'outdoors'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      'Input: "Go hiking." -> Output: "Plan a challenging hike on the Inca Trail, ensuring acclimatization to altitude and packing proper rain gear."',
    performance: {
      estimatedProcessingTime: 200,
      tokenUsage: 250,
      complexityScore: 6,
    },
  },
  {
    id: 'luxury-travel',
    key: 'luxury-travel-focus',
    name: 'Luxury Travel Focus',
    shortDescription: 'Add luxury travel and premium experience elements.',
    longDescription:
      'Enhances the prompt with luxury travel elements, premium accommodations, exclusive experiences, and high-end travel services.',
    systemPrompt:
      'You are a luxury travel consultant. Enhance the prompt with luxury elements.\n\nStandards:\n1. 5-star hotels and resorts.\n2. Private transfers and guides.\n3. Michelin-star dining.',
    category: 'Travel',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Concierge' },
    tags: ['travel', 'luxury', 'premium'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      'Input: "Trip to Maldives." -> Output: "Stay in an overwater bungalow at the St. Regis, with private butler service and a sunset dolphin cruise."',
    performance: {
      estimatedProcessingTime: 190,
      tokenUsage: 240,
      complexityScore: 5,
    },
  },

  // --- Food & Culinary ---
  {
    id: 'recipe-enhancement',
    key: 'recipe-enhancement',
    name: 'Recipe Enhancement',
    shortDescription: 'Optimize for cooking recipes and food preparation.',
    longDescription:
      'Enhances the prompt for detailed recipes, cooking techniques, ingredient measurements, and step-by-step food preparation instructions.',
    systemPrompt:
      "You are a culinary expert. Enhance the prompt for recipes.\n\nStructure:\n1. Ingredients list with measurements.\n2. Clear step-by-step instructions.\n3. Chef's tips for success.",
    category: 'Culinary',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Chef Team' },
    tags: ['cooking', 'recipe', 'food'],
    complexity: 'low',
    experimental: false,
    exampleUsage:
      'Input: "Make pancakes." -> Output: "Ingredients: 2 cups flour, 2 eggs, 1 cup milk. Instructions: 1. Mix dry ingredients. 2. Whisk wet ingredients. 3. Combine and cook on griddle."',
    performance: {
      estimatedProcessingTime: 150,
      tokenUsage: 180,
      complexityScore: 3,
    },
  },
  {
    id: 'food-description',
    key: 'food-description-optimization',
    name: 'Food Description Optimization',
    shortDescription: 'Create vivid and appetizing food descriptions.',
    longDescription:
      'Enhances the prompt with vivid food descriptions, sensory details, flavor profiles, and appetizing culinary language.',
    systemPrompt:
      'You are a food writer. Enhance the prompt with appetizing descriptions.\n\nSensory Words:\n1. Texture (crispy, velvety).\n2. Taste (umami, zesty).\n3. Aroma (fragrant, aromatic).',
    category: 'Culinary',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Bon Appetit' },
    tags: ['food', 'description', 'writing'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      'Input: "The steak was good." -> Output: "The steak was a succulent masterpiece, seared to a perfect medium-rare and meltingly tender."',
    performance: {
      estimatedProcessingTime: 180,
      tokenUsage: 220,
      complexityScore: 5,
    },
  },
  {
    id: 'restaurant-review',
    key: 'restaurant-review-enhancement',
    name: 'Restaurant Review Enhancement',
    shortDescription: 'Optimize for restaurant reviews and food criticism.',
    longDescription:
      'Enhances the prompt for professional restaurant reviews, food criticism, service evaluation, and dining experience analysis.',
    systemPrompt:
      'You are a restaurant critic. Enhance the prompt for professional reviews.\n\nCriteria:\n1. Food quality and presentation.\n2. Service and ambiance.\n3. Value for money.',
    category: 'Culinary',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Michelin Guide' },
    tags: ['food', 'review', 'criticism'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      'Input: "Nice place." -> Output: "The restaurant offers an exquisite dining experience with impeccable service and a menu that delights the palate."',
    performance: {
      estimatedProcessingTime: 190,
      tokenUsage: 230,
      complexityScore: 5,
    },
  },
  {
    id: 'culinary-techniques',
    key: 'culinary-technique-focus',
    name: 'Culinary Technique Focus',
    shortDescription: 'Add detailed cooking methods and techniques.',
    longDescription:
      'Enhances the prompt with detailed cooking methods, professional techniques, kitchen equipment usage, and culinary best practices.',
    systemPrompt:
      'You are a culinary techniques expert. Enhance the prompt with technical cooking details.\n\nTechniques:\n1. Sous-vide, Braise, Sauté.\n2. Knife skills (Julienne, Chiffonade).\n3. Mise en place.',
    category: 'Culinary',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Culinary Institute' },
    tags: ['cooking', 'technique', 'chef'],
    complexity: 'high',
    experimental: false,
    exampleUsage:
      'Input: "Cook the veggies." -> Output: "Sauté the vegetables in olive oil over medium-high heat until they are tender-crisp and slightly caramelized."',
    performance: {
      estimatedProcessingTime: 200,
      tokenUsage: 240,
      complexityScore: 6,
    },
  },
  {
    id: 'food-pairing',
    key: 'food-pairing-suggestions',
    name: 'Food Pairing Suggestions',
    shortDescription:
      'Add complementary food and beverage pairing recommendations.',
    longDescription:
      'Enhances the prompt with complementary food pairings, beverage recommendations, flavor combinations, and pairing principles.',
    systemPrompt:
      'You are a food pairing expert. Enhance the prompt with pairings.\n\nPrinciples:\n1. Complementary flavors (Sweet & Salty).\n2. Balance (Acid cuts Fat).\n3. Regional harmony.',
    category: 'Culinary',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Sommelier' },
    tags: ['food', 'pairing', 'wine'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      'Input: "Steak dinner." -> Output: "Pair the steak with a full-bodied Cabernet Sauvignon and a side of creamy mushroom risotto."',
    performance: {
      estimatedProcessingTime: 170,
      tokenUsage: 200,
      complexityScore: 4,
    },
  },

  // --- Academic & Scholarly ---
  {
    id: 'academic-writing',
    key: 'academic-writing-enhancement',
    name: 'Academic Writing Enhancement',
    shortDescription:
      'Optimize for scholarly papers and academic publications.',
    longDescription:
      'Enhances the prompt for scholarly writing standards, academic tone, formal structure, and publication-ready content.',
    systemPrompt:
      'You are an academic writing expert. Enhance the prompt for scholarly standards.\n\nTone:\n1. Objective and Neutral.\n2. Formal vocabulary.\n3. Passive voice where appropriate for methods.',
    category: 'Academic',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'University Press' },
    tags: ['academic', 'scholarly', 'research'],
    complexity: 'high',
    experimental: false,
    exampleUsage:
      'Input: "I think the study is good." -> Output: "The study demonstrates significant merit, offering robust evidence to support its conclusions."',
    performance: {
      estimatedProcessingTime: 210,
      tokenUsage: 260,
      complexityScore: 7,
    },
  },
  {
    id: 'research-methodology',
    key: 'research-methodology-focus',
    name: 'Research Methodology Focus',
    shortDescription: 'Add detailed research methods and academic rigor.',
    longDescription:
      'Enhances the prompt with rigorous research methods, data collection techniques, analysis frameworks, and academic validation.',
    systemPrompt:
      'You are a research methodology expert. Enhance the prompt with rigorous methods.\n\nMethods:\n1. Qualitative (Interviews) vs Quantitative (Surveys).\n2. Sampling techniques.\n3. Validity and Reliability.',
    category: 'Academic',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Research Dept' },
    tags: ['research', 'methodology', 'data'],
    complexity: 'expert',
    experimental: false,
    exampleUsage:
      'Input: "Ask people questions." -> Output: "Conduct semi-structured interviews with a sample size of 30 participants to gather qualitative data."',
    performance: {
      estimatedProcessingTime: 250,
      tokenUsage: 310,
      complexityScore: 8,
    },
  },
  {
    id: 'citation-style',
    key: 'citation-style-optimization',
    name: 'Citation Style Optimization',
    shortDescription: 'Ensure proper academic citations and references.',
    longDescription:
      'Enhances the prompt with proper academic citations, reference formatting, and citation style compliance (APA, MLA, Chicago).',
    systemPrompt:
      'You are a citation style expert. Enhance the prompt with proper citations.\n\nStyles:\n1. APA (Psychology, Education).\n2. MLA (Humanities).\n3. Chicago (History, Business).',
    category: 'Academic',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Library Science' },
    tags: ['academic', 'citation', 'referencing'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      'Input: "Smith wrote a book." -> Output: "According to Smith (2020), the findings indicate... (Smith, 2020)."',
    performance: {
      estimatedProcessingTime: 160,
      tokenUsage: 200,
      complexityScore: 4,
    },
  },
  {
    id: 'peer-review',
    key: 'peer-review-preparation',
    name: 'Peer Review Preparation',
    shortDescription: 'Prepare content for academic peer review process.',
    longDescription:
      'Enhances the prompt to meet peer review standards, addressing potential reviewer concerns, methodological rigor, and scholarly contribution.',
    systemPrompt:
      'You are a peer review expert. Enhance the prompt for review readiness.\n\nCheckpoints:\n1. Clear hypothesis.\n2. Robust methodology.\n3. Discussion of limitations.',
    category: 'Academic',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Journal Editor' },
    tags: ['academic', 'peer-review', 'publishing'],
    complexity: 'high',
    experimental: false,
    exampleUsage:
      'Input: "Submit paper." -> Output: "Prepare the manuscript by ensuring all figures are high-resolution and the bibliography adheres to the journal\'s specific style guide."',
    performance: {
      estimatedProcessingTime: 230,
      tokenUsage: 280,
      complexityScore: 7,
    },
  },
  {
    id: 'thesis-statement',
    key: 'thesis-statement-enhancement',
    name: 'Thesis Statement Enhancement',
    shortDescription: 'Strengthen thesis statements and academic arguments.',
    longDescription:
      'Enhances the prompt with strong thesis statements, clear arguments, supporting evidence, and academic reasoning.',
    systemPrompt:
      'You are a thesis development expert. Enhance the prompt with strong arguments.\n\nComponents:\n1. Debatable claim.\n2. Reasons supporting the claim.\n3. Blueprint of the essay.',
    category: 'Academic',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Writing Center' },
    tags: ['academic', 'thesis', 'argument'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      'Input: "Pollution is bad." -> Output: "Urban pollution must be addressed through stricter legislation, technological innovation, and community education."',
    performance: {
      estimatedProcessingTime: 170,
      tokenUsage: 210,
      complexityScore: 5,
    },
  },

  // --- Social Media & Digital Marketing ---
  {
    id: 'social-media-optimization',
    key: 'social-media-optimization',
    name: 'Social Media Optimization',
    shortDescription:
      'Optimize for various social media platforms and formats.',
    longDescription:
      'Enhances the prompt for different social media platforms (Twitter, Instagram, LinkedIn) with platform-specific best practices.',
    systemPrompt:
      'You are a social media optimization expert. Enhance the prompt for specific platforms.\n\nBest Practices:\n1. Twitter: Short, hashtags, threads.\n2. Instagram: Visual focus, stories, reels.\n3. LinkedIn: Professional tone, industry insights.',
    category: 'Marketing',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Social Media Team' },
    tags: ['social-media', 'marketing', 'content'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      'Input: "New product." -> Output: "🚀 Big news! Our latest product is live. Check it out! #Innovation #Launch"',
    performance: {
      estimatedProcessingTime: 160,
      tokenUsage: 190,
      complexityScore: 4,
    },
  },
  {
    id: 'hashtag-strategy',
    key: 'hashtag-strategy-enhancement',
    name: 'Hashtag Strategy Enhancement',
    shortDescription: 'Add effective hashtag research and strategy.',
    longDescription:
      'Enhances the prompt with relevant hashtag research, trending hashtags, campaign-specific tags, and performance optimization.',
    systemPrompt:
      'You are a hashtag strategy expert. Enhance the prompt with hashtags.\n\nStrategy:\n1. Mix of high volume and niche tags.\n2. Brand-specific hashtags.\n3. Trending topic integration.',
    category: 'Marketing',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Growth Hacking' },
    tags: ['hashtags', 'social-media', 'discovery'],
    complexity: 'low',
    experimental: false,
    exampleUsage:
      'Input: "Coffee post." -> Output: "Post about morning coffee with #CoffeeLover #MorningVibes #ButFirstCoffee"',
    performance: {
      estimatedProcessingTime: 130,
      tokenUsage: 150,
      complexityScore: 3,
    },
  },
  {
    id: 'viral-content',
    key: 'viral-content-focus',
    name: 'Viral Content Focus',
    shortDescription:
      'Add elements that increase viral potential and shareability.',
    longDescription:
      'Enhances the prompt with viral content elements, emotional triggers, shareability factors, and engagement hooks.',
    systemPrompt:
      'You are a viral content expert. Enhance the prompt for virality.\n\nTriggers:\n1. High arousal emotions (Awe, Anger, Anxiety).\n2. Practical value (Utility).\n3. Social currency (Makes sharer look good).',
    category: 'Marketing',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'BuzzFeed' },
    tags: ['viral', 'marketing', 'engagement'],
    complexity: 'medium',
    experimental: true,
    exampleUsage:
      'Input: "Watch this." -> Output: "You won\'t believe what happens at 0:15! This mind-blowing trick will change how you see the world."',
    performance: {
      estimatedProcessingTime: 170,
      tokenUsage: 200,
      complexityScore: 5,
    },
  },
  {
    id: 'influencer-collaboration',
    key: 'influencer-collaboration-enhancement',
    name: 'Influencer Collaboration Enhancement',
    shortDescription:
      'Optimize for influencer partnerships and branded content.',
    longDescription:
      'Enhances the prompt for influencer collaborations, branded content guidelines, partnership terms, and authentic integration.',
    systemPrompt:
      'You are an influencer marketing expert. Enhance the prompt for influencer partnerships.\n\nGuidelines:\n1. Authentic voice of the influencer.\n2. Clear disclosure (#ad).\n3. Call to action.',
    category: 'Marketing',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Influencer Agency' },
    tags: ['influencer', 'marketing', 'branding'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      'Input: "Sell my soap." -> Output: "Create a post where the influencer shares their morning routine, naturally integrating the soap as a key step."',
    performance: {
      estimatedProcessingTime: 180,
      tokenUsage: 220,
      complexityScore: 5,
    },
  },
  {
    id: 'brand-voice',
    key: 'brand-voice-consistency',
    name: 'Brand Voice Consistency',
    shortDescription:
      'Ensure consistent brand voice and messaging across platforms.',
    longDescription:
      'Enhances the prompt to maintain consistent brand voice, tone guidelines, messaging pillars, and brand personality.',
    systemPrompt:
      'You are a brand voice expert. Enhance the prompt to match the brand.\n\nConsistency:\n1. Specific vocabulary (e.g., "folks" vs "guys").\n2. Tone (Witty, Serious, Empathetic).\n3. Mission alignment.',
    category: 'Marketing',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Brand Strategy' },
    tags: ['brand', 'voice', 'identity'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      'Input: "Thanks." -> Output: "Thanks a ton! We appreciate you. (Playful brand voice)"',
    performance: {
      estimatedProcessingTime: 150,
      tokenUsage: 180,
      complexityScore: 4,
    },
  },

  // --- Psychological & Mental Health ---
  {
    id: 'therapeutic-communication',
    key: 'therapeutic-communication-enhancement',
    name: 'Therapeutic Communication Enhancement',
    shortDescription: 'Optimize for therapeutic and counseling contexts.',
    longDescription:
      'Enhances the prompt with therapeutic language, active listening principles, empathy techniques, and counseling best practices.',
    systemPrompt:
      'You are a therapeutic communication expert. Enhance the prompt for therapy.\n\nTechniques:\n1. Reflection ("It sounds like you feel...").\n2. Open-ended questions.\n3. Non-judgmental validation.',
    category: 'Psychology',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Psychology Board' },
    tags: ['therapy', 'counseling', 'communication'],
    complexity: 'expert',
    experimental: false,
    exampleUsage:
      'Input: "I am sad." -> Output: "I hear that you are feeling sad right now. Can you tell me more about what might be contributing to these feelings?"',
    performance: {
      estimatedProcessingTime: 220,
      tokenUsage: 270,
      complexityScore: 8,
    },
  },
  {
    id: 'mindfulness-focus',
    key: 'mindfulness-focus',
    name: 'Mindfulness Focus',
    shortDescription: 'Add mindfulness and present-moment awareness elements.',
    longDescription:
      'Enhances the prompt with mindfulness techniques, present-moment awareness exercises, meditation guidance, and mindful communication.',
    systemPrompt:
      'You are a mindfulness expert. Enhance the prompt with mindfulness.\n\nPractices:\n1. Grounding techniques (5-4-3-2-1).\n2. Breath awareness.\n3. Non-judgmental observation.',
    category: 'Psychology',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Wellness Coach' },
    tags: ['mindfulness', 'meditation', 'wellness'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      'Input: "Relax." -> Output: "Take a moment to focus on your breath. Inhale deeply for 4 seconds, hold for 4, and exhale for 4."',
    performance: {
      estimatedProcessingTime: 160,
      tokenUsage: 190,
      complexityScore: 4,
    },
  },
  {
    id: 'cognitive-behavioral',
    key: 'cognitive-behavioral-enhancement',
    name: 'Cognitive Behavioral Enhancement',
    shortDescription: 'Apply cognitive behavioral therapy principles.',
    longDescription:
      'Enhances the prompt with CBT techniques, thought challenging exercises, behavioral activation strategies, and therapeutic frameworks.',
    systemPrompt:
      'You are a CBT expert. Enhance the prompt with CBT principles.\n\nTechniques:\n1. Identify cognitive distortions.\n2. Challenge negative thoughts.\n3. Behavioral experiments.',
    category: 'Psychology',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'CBT Institute' },
    tags: ['cbt', 'psychology', 'therapy'],
    complexity: 'high',
    experimental: false,
    exampleUsage:
      'Input: "I always fail." -> Output: "Challenge the thought \'I always fail\'. Is this accurate? Can you recall times you succeeded?"',
    performance: {
      estimatedProcessingTime: 210,
      tokenUsage: 260,
      complexityScore: 7,
    },
  },
  {
    id: 'emotional-regulation',
    key: 'emotional-regulation-language',
    name: 'Emotional Regulation Language',
    shortDescription: 'Add emotional intelligence and regulation strategies.',
    longDescription:
      'Enhances the prompt with emotional intelligence principles, regulation strategies, coping mechanisms, and emotional awareness.',
    systemPrompt:
      'You are an emotional regulation expert. Enhance the prompt with EQ strategies.\n\nStrategies:\n1. Name it to tame it.\n2. The pause (responding vs reacting).\n3. Self-soothing techniques.',
    category: 'Psychology',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'EQ Lab' },
    tags: ['emotional-intelligence', 'regulation', 'psychology'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      'Input: "I am angry." -> Output: "I notice that I am feeling angry. I will take a few deep breaths to regulate this emotion before responding."',
    performance: {
      estimatedProcessingTime: 170,
      tokenUsage: 210,
      complexityScore: 5,
    },
  },
  {
    id: 'stress-reduction',
    key: 'stress-reduction-focus',
    name: 'Stress Reduction Focus',
    shortDescription: 'Add stress management and relaxation techniques.',
    longDescription:
      'Enhances the prompt with stress reduction techniques, relaxation exercises, coping strategies, and wellness practices.',
    systemPrompt:
      'You are a stress management expert. Enhance the prompt with relaxation techniques.\n\nTechniques:\n1. Progressive Muscle Relaxation.\n2. Guided Imagery.\n3. Time management.',
    category: 'Psychology',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Health Psych' },
    tags: ['stress', 'relaxation', 'wellness'],
    complexity: 'low',
    experimental: false,
    exampleUsage:
      'Input: "Calm down." -> Output: "Let\'s practice a quick body scan. Start at your toes and relax each muscle group as you move up to your head."',
    performance: {
      estimatedProcessingTime: 150,
      tokenUsage: 180,
      complexityScore: 3,
    },
  },

  // --- Engineering & Architecture ---
  {
    id: 'engineering-specifications',
    key: 'engineering-specifications-enhancement',
    name: 'Engineering Specifications Enhancement',
    shortDescription:
      'Add detailed technical specifications and engineering standards.',
    longDescription:
      'Enhances the prompt with detailed technical specifications, engineering standards, tolerances, and professional engineering requirements.',
    systemPrompt:
      'You are an engineering specifications expert. Enhance the prompt with technical specs.\n\nSpecs:\n1. ISO/ASTM standards.\n2. Tolerances (+/- 0.01mm).\n3. Material properties (Yield Strength).',
    category: 'Engineering',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Engineers Inc' },
    tags: ['engineering', 'specifications', 'technical'],
    complexity: 'expert',
    experimental: false,
    exampleUsage:
      'Input: "Build a beam." -> Output: "Fabricate a steel beam meeting ASTM A36 standards with a yield strength of 36,000 psi."',
    performance: {
      estimatedProcessingTime: 250,
      tokenUsage: 310,
      complexityScore: 9,
    },
  },
  {
    id: 'architectural-design',
    key: 'architectural-design-focus',
    name: 'Architectural Design Focus',
    shortDescription: 'Optimize for architectural plans and building design.',
    longDescription:
      'Enhances the prompt for architectural plans, building specifications, design principles, spatial planning, and construction considerations.',
    systemPrompt:
      'You are an architectural design expert. Enhance the prompt for architecture.\n\nElements:\n1. Zoning and Code compliance.\n2. Circulation and Flow.\n3. Aesthetics and Function.',
    category: 'Engineering',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'AIA' },
    tags: ['architecture', 'design', 'building'],
    complexity: 'expert',
    experimental: false,
    exampleUsage:
      'Input: "Design a house." -> Output: "Design a passive-solar house with an open floor plan, maximizing natural light and adhering to local residential building codes."',
    performance: {
      estimatedProcessingTime: 270,
      tokenUsage: 340,
      complexityScore: 9,
    },
  },
  {
    id: 'technical-drawing',
    key: 'technical-drawing-description',
    name: 'Technical Drawing Description',
    shortDescription: 'Add detailed technical drawing and diagram elements.',
    longDescription:
      'Enhances the prompt with detailed technical drawing descriptions, diagram specifications, labeling conventions, and visual technical communication.',
    systemPrompt:
      'You are a technical drawing expert. Enhance the prompt with drawing specs.\n\nStandards:\n1. Orthographic projection.\n2. Dimensioning and Tolerancing.\n3. Line weights (Hidden, Center).',
    category: 'Engineering',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Drafting Team' },
    tags: ['drawing', 'diagram', 'cad'],
    complexity: 'high',
    experimental: false,
    exampleUsage:
      'Input: "Draw a part." -> Output: "Create a 2D orthographic drawing of the part, showing front, top, and side views with all necessary dimensions."',
    performance: {
      estimatedProcessingTime: 230,
      tokenUsage: 280,
      complexityScore: 7,
    },
  },
  {
    id: 'structural-analysis',
    key: 'structural-analysis-enhancement',
    name: 'Structural Analysis Enhancement',
    shortDescription: 'Add structural engineering and load analysis elements.',
    longDescription:
      'Enhances the prompt with structural engineering principles, load calculations, material strength considerations, and safety factor analysis.',
    systemPrompt:
      'You are a structural analysis expert. Enhance the prompt with engineering principles.\n\nAnalysis:\n1. Dead vs Live loads.\n2. Shear and Moment diagrams.\n3. Safety Factors (1.5 - 2.0).',
    category: 'Engineering',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Structural Eng' },
    tags: ['structural', 'engineering', 'analysis'],
    complexity: 'expert',
    experimental: false,
    exampleUsage:
      'Input: "Hold up the roof." -> Output: "Calculate the load-bearing capacity of the columns, ensuring a safety factor of 2.0 for the roof dead load."',
    performance: {
      estimatedProcessingTime: 260,
      tokenUsage: 320,
      complexityScore: 9,
    },
  },
  {
    id: 'material-science',
    key: 'material-science-precision',
    name: 'Material Science Precision',
    shortDescription:
      'Add material properties and engineering material specifications.',
    longDescription:
      'Enhances the prompt with detailed material properties, engineering material specifications, compatibility considerations, and selection criteria.',
    systemPrompt:
      'You are a material science expert. Enhance the prompt with material specs.\n\nProperties:\n1. Thermal Conductivity.\n2. Electrical Resistivity.\n3. Chemical Compatibility.',
    category: 'Engineering',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Materials Lab' },
    tags: ['materials', 'science', 'engineering'],
    complexity: 'expert',
    experimental: false,
    exampleUsage:
      'Input: "Pick a metal." -> Output: "Select Titanium Alloy Ti-6Al-4V for its high strength-to-weight ratio and corrosion resistance."',
    performance: {
      estimatedProcessingTime: 240,
      tokenUsage: 300,
      complexityScore: 8,
    },
  },

  // --- Mathematical & Statistical ---
  {
    id: 'mathematical-notation',
    key: 'mathematical-notation-enhancement',
    name: 'Mathematical Notation Enhancement',
    shortDescription:
      'Add precise mathematical notation and formal expressions.',
    longDescription:
      'Enhances the prompt with precise mathematical notation, formal expressions, theorem statements, and mathematical rigor.',
    systemPrompt:
      'You are a mathematical notation expert. Enhance the prompt with math notation.\n\nNotation:\n1. LaTeX formatting.\n2. Set theory notation (∈, ∪).\n3. Calculus symbols (∫, ∂).',
    category: 'Mathematical',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Math Dept' },
    tags: ['math', 'notation', 'latex'],
    complexity: 'high',
    experimental: false,
    exampleUsage:
      'Input: "Add numbers." -> Output: "Calculate the summation $\\sum_{i=1}^{n} x_i$ for the given set of numbers."',
    performance: {
      estimatedProcessingTime: 200,
      tokenUsage: 250,
      complexityScore: 7,
    },
  },
  {
    id: 'statistical-analysis',
    key: 'statistical-analysis-focus',
    name: 'Statistical Analysis Focus',
    shortDescription: 'Add statistical methods and data analysis techniques.',
    longDescription:
      'Enhances the prompt with statistical methods, data analysis techniques, hypothesis testing, confidence intervals, and statistical interpretation.',
    systemPrompt:
      'You are a statistical analysis expert. Enhance the prompt with statistical methods.\n\nTests:\n1. T-tests, ANOVA, Chi-Square.\n2. Regression analysis.\n3. P-value interpretation.',
    category: 'Mathematical',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Stats Team' },
    tags: ['statistics', 'data', 'analysis'],
    complexity: 'expert',
    experimental: false,
    exampleUsage:
      'Input: "Test if this works." -> Output: "Perform a hypothesis test to determine if the observed difference is statistically significant (p < 0.05)."',
    performance: {
      estimatedProcessingTime: 240,
      tokenUsage: 300,
      complexityScore: 8,
    },
  },
  {
    id: 'data-visualization',
    key: 'data-visualization-description',
    name: 'Data Visualization Description',
    shortDescription: 'Add detailed chart and graph description elements.',
    longDescription:
      'Enhances the prompt with detailed chart descriptions, graph specifications, visualization best practices, and data presentation techniques.',
    systemPrompt:
      'You are a data visualization expert. Enhance the prompt with chart specs.\n\nVisuals:\n1. Bar charts for comparison.\n2. Line charts for trends.\n3. Pie charts for proportion (rarely).',
    category: 'Mathematical',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Data Viz' },
    tags: ['visualization', 'charts', 'data'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      'Input: "Show sales." -> Output: "Create a clustered bar chart showing monthly sales figures for Q1 and Q2 side-by-side."',
    performance: {
      estimatedProcessingTime: 180,
      tokenUsage: 220,
      complexityScore: 5,
    },
  },
  {
    id: 'algorithm-explanation',
    key: 'algorithm-explanation-optimization',
    name: 'Algorithm Explanation Optimization',
    shortDescription:
      'Enhance for clear algorithm descriptions and pseudocode.',
    longDescription:
      'Enhances the prompt for clear algorithm explanations, pseudocode representation, complexity analysis, and step-by-step algorithmic processes.',
    systemPrompt:
      'You are an algorithm expert. Enhance the prompt for clear algorithms.\n\nStructure:\n1. Input/Output definition.\n2. Step-by-step logic.\n3. Time and Space complexity (Big O).',
    category: 'Mathematical',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'CS Dept' },
    tags: ['algorithms', 'cs', 'pseudocode'],
    complexity: 'expert',
    experimental: false,
    exampleUsage:
      'Input: "Sort numbers." -> Output: "Implement the Quicksort algorithm: Pick a pivot, partition the array, and recursively sort. Time complexity: O(n log n)."',
    performance: {
      estimatedProcessingTime: 230,
      tokenUsage: 280,
      complexityScore: 8,
    },
  },
  {
    id: 'formula-derivation',
    key: 'formula-derivation-enhancement',
    name: 'Formula Derivation Enhancement',
    shortDescription: 'Add mathematical formula derivations and proofs.',
    longDescription:
      'Enhances the prompt with formula derivations, mathematical proofs, theorem demonstrations, and step-by-step mathematical reasoning.',
    systemPrompt:
      'You are a mathematical derivation expert. Enhance the prompt with proofs.\n\nLogic:\n1. Start with axioms or known theorems.\n2. Apply logical steps.\n3. Conclude with the desired result (Q.E.D.).',
    category: 'Mathematical',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Mathematics' },
    tags: ['math', 'proof', 'derivation'],
    complexity: 'expert',
    experimental: false,
    exampleUsage:
      'Input: "Prove Pythagoras." -> Output: "Start with a right-angled triangle inscribed in a square. By rearranging the triangles, demonstrate that $a^2 + b^2 = c^2$."',
    performance: {
      estimatedProcessingTime: 280,
      tokenUsage: 350,
      complexityScore: 9,
    },
  },

  // --- Religious & Spiritual ---
  {
    id: 'spiritual-guidance',
    key: 'spiritual-guidance-enhancement',
    name: 'Spiritual Guidance Enhancement',
    shortDescription: 'Add spiritual wisdom and guidance elements.',
    longDescription:
      'Enhances the prompt with spiritual wisdom, guidance principles, inner growth insights, and spiritual development considerations.',
    systemPrompt:
      'You are a spiritual guidance expert. Enhance the prompt with wisdom.\n\nTone:\n1. Compassionate and non-dogmatic.\n2. Focus on inner peace and connection.\n3. Universal spiritual themes.',
    category: 'Spiritual',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Spirituality' },
    tags: ['spiritual', 'wisdom', 'guidance'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      'Input: "I am lost." -> Output: "Feeling lost is often the beginning of a new journey inward. Take this time to meditate and reconnect with your true self."',
    performance: {
      estimatedProcessingTime: 180,
      tokenUsage: 220,
      complexityScore: 5,
    },
  },
  {
    id: 'religious-text',
    key: 'religious-text-interpretation',
    name: 'Religious Text Interpretation',
    shortDescription: 'Enhance for religious scripture and text analysis.',
    longDescription:
      'Enhances the prompt for scripture interpretation, religious text analysis, theological insights, and faith-based context understanding.',
    systemPrompt:
      'You are a religious text expert. Enhance the prompt for theological analysis.\n\nMethod:\n1. Historical Context.\n2. Literary Genre (Parable, Law, Poetry).\n3. Theological Interpretation.',
    category: 'Spiritual',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Theology' },
    tags: ['religious', 'scripture', 'theology'],
    complexity: 'high',
    experimental: false,
    exampleUsage:
      'Input: "Explain this verse." -> Output: "Interpret this verse by considering its historical context and its application to modern theological discussions."',
    performance: {
      estimatedProcessingTime: 220,
      tokenUsage: 270,
      complexityScore: 7,
    },
  },
  {
    id: 'meditation-instruction',
    key: 'meditation-instruction-focus',
    name: 'Meditation Instruction Focus',
    shortDescription:
      'Add detailed meditation guidance and practice instructions.',
    longDescription:
      'Enhances the prompt with detailed meditation instructions, practice guidance, breathing techniques, and mindfulness practices.',
    systemPrompt:
      'You are a meditation instruction expert. Enhance the prompt with meditation guidance.\n\nSteps:\n1. Find a comfortable seat.\n2. Close eyes and focus on breath.\n3. Observe thoughts without judgment.',
    category: 'Spiritual',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Meditation' },
    tags: ['meditation', 'mindfulness', 'practice'],
    complexity: 'low',
    experimental: false,
    exampleUsage:
      'Input: "Start meditating." -> Output: "Begin by sitting comfortably. Close your eyes gently. Bring your attention to the sensation of air entering and leaving your nostrils."',
    performance: {
      estimatedProcessingTime: 140,
      tokenUsage: 160,
      complexityScore: 3,
    },
  },
  {
    id: 'ethical-spiritual',
    key: 'ethical-spiritual-context',
    name: 'Ethical Spiritual Context',
    shortDescription:
      'Add moral and ethical considerations from spiritual perspectives.',
    longDescription:
      'Enhances the prompt with moral and ethical considerations from various spiritual traditions, value-based decision making, and spiritual ethics.',
    systemPrompt:
      'You are an ethical spirituality expert. Enhance the prompt with spiritual ethics.\n\nPerspectives:\n1. Karma and Dharma.\n2. The Golden Rule.\n3. Stewardship of the Earth.',
    category: 'Spiritual',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Ethics' },
    tags: ['spiritual', 'ethics', 'morality'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      'Input: "Should I lie?" -> Output: "Consider the spiritual law of truthfulness. While difficult, honesty maintains harmony in your soul and relationships."',
    performance: {
      estimatedProcessingTime: 190,
      tokenUsage: 230,
      complexityScore: 5,
    },
  },
  {
    id: 'interfaith-dialogue',
    key: 'interfaith-dialogue-enhancement',
    name: 'Interfaith Dialogue Enhancement',
    shortDescription:
      'Add interfaith understanding and religious diversity elements.',
    longDescription:
      'Enhances the prompt with interfaith understanding, religious diversity awareness, cross-faith communication principles, and inclusive spiritual perspectives.',
    systemPrompt:
      'You are an interfaith dialogue expert. Enhance the prompt for inclusivity.\n\nPrinciples:\n1. Respect for all traditions.\n2. Finding common ground.\n3. Celebrating diversity.',
    category: 'Spiritual',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Interfaith' },
    tags: ['interfaith', 'diversity', 'religion'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      'Input: "Compare religions." -> Output: "Discuss the concept of compassion in Christianity, Buddhism, and Islam, highlighting the shared value of kindness."',
    performance: {
      estimatedProcessingTime: 200,
      tokenUsage: 240,
      complexityScore: 6,
    },
  },

  // --- Political & Government ---
  {
    id: 'policy-analysis',
    key: 'policy-analysis-enhancement',
    name: 'Policy Analysis Enhancement',
    shortDescription:
      'Add detailed policy analysis and government impact assessment.',
    longDescription:
      'Enhances the prompt with detailed policy analysis, impact assessments, stakeholder considerations, and government policy evaluation frameworks.',
    systemPrompt:
      'You are a policy analysis expert. Enhance the prompt with policy analysis.\n\nFramework:\n1. Problem Definition.\n2. Policy Options.\n3. Criteria for Evaluation (Efficiency, Equity).',
    category: 'Political',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Policy Lab' },
    tags: ['policy', 'government', 'analysis'],
    complexity: 'expert',
    experimental: false,
    exampleUsage:
      'Input: "Fix housing." -> Output: "Analyze housing policy options including rent control, zoning reform, and subsidies, evaluating their impact on affordability."',
    performance: {
      estimatedProcessingTime: 280,
      tokenUsage: 350,
      complexityScore: 9,
    },
  },
  {
    id: 'political-rhetoric',
    key: 'political-rhetoric-optimization',
    name: 'Political Rhetoric Optimization',
    shortDescription: 'Optimize for political speeches and public address.',
    longDescription:
      'Enhances the prompt for political speeches, public addresses, campaign messaging, and persuasive political communication.',
    systemPrompt:
      'You are a political rhetoric expert. Enhance the prompt for speeches.\n\nDevices:\n1. Anaphora and Repetition.\n2. Rule of Three.\n3. Emotional appeals (Pathos).',
    category: 'Political',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Speechwriter' },
    tags: ['politics', 'speech', 'rhetoric'],
    complexity: 'high',
    experimental: false,
    exampleUsage:
      'Input: "Vote for me." -> Output: "We need change. We need hope. We need a future that works for everyone. Vote for progress."',
    performance: {
      estimatedProcessingTime: 200,
      tokenUsage: 250,
      complexityScore: 7,
    },
  },
  {
    id: 'government-document',
    key: 'government-document-clarity',
    name: 'Government Document Clarity',
    shortDescription:
      'Enhance for official government documents and public notices.',
    longDescription:
      'Enhances the prompt for clarity in official government documents, public notices, regulatory filings, and bureaucratic communications.',
    systemPrompt:
      'You are a government document expert. Enhance the prompt for clarity.\n\nPlain Language Act:\n1. Use "You" and "We".\n2. Avoid jargon and legalese.\n3. Organize with clear headings.',
    category: 'Political',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Gov Comms' },
    tags: ['government', 'clarity', 'bureaucracy'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      'Input: "The party of the first part..." -> Output: "You (the tenant) agree to pay rent on the first of every month."',
    performance: {
      estimatedProcessingTime: 170,
      tokenUsage: 200,
      complexityScore: 5,
    },
  },
  {
    id: 'diplomatic-communication',
    key: 'diplomatic-communication-focus',
    name: 'Diplomatic Communication Focus',
    shortDescription:
      'Add diplomatic language and international relations context.',
    longDescription:
      'Enhances the prompt with diplomatic language, international relations context, cross-cultural diplomatic protocols, and statecraft principles.',
    systemPrompt:
      'You are a diplomatic communication expert. Enhance the prompt with diplomacy.\n\nTone:\n1. Formal and Courteous.\n2. Non-confrontational.\n3. Constructive ambiguity.',
    category: 'Political',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'State Dept' },
    tags: ['diplomacy', 'international', 'relations'],
    complexity: 'expert',
    experimental: false,
    exampleUsage:
      'Input: "Stop fighting." -> Output: "We urge all parties to de-escalate tensions and return to the negotiating table for a peaceful resolution."',
    performance: {
      estimatedProcessingTime: 210,
      tokenUsage: 260,
      complexityScore: 7,
    },
  },
  {
    id: 'public-policy',
    key: 'public-policy-impact-assessment',
    name: 'Public Policy Impact Assessment',
    shortDescription: 'Add comprehensive public policy impact evaluation.',
    longDescription:
      'Enhances the prompt with comprehensive policy impact assessments, implementation strategies, evaluation metrics, and policy effectiveness analysis.',
    systemPrompt:
      'You are a public policy expert. Enhance the prompt with impact evaluation.\n\nAssessment:\n1. Cost-Benefit Analysis.\n2. Social Impact Assessment.\n3. Implementation feasibility.',
    category: 'Political',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Public Policy' },
    tags: ['policy', 'evaluation', 'impact'],
    complexity: 'expert',
    experimental: false,
    exampleUsage:
      'Input: "New tax law." -> Output: "Evaluate the new tax law\'s impact on revenue generation and its distributional effects on low-income households."',
    performance: {
      estimatedProcessingTime: 290,
      tokenUsage: 360,
      complexityScore: 9,
    },
  },

  // --- Linguistic & Translation ---
  {
    id: 'dialect-adaptation',
    key: 'dialect-adaptation',
    name: 'Dialect Adaptation',
    shortDescription:
      'Adapt content for specific regional dialects and variations.',
    longDescription:
      'Enhances the prompt to adapt content for specific regional dialects, linguistic variations, and local language preferences while maintaining meaning.',
    systemPrompt:
      'You are a dialect adaptation expert. Enhance the prompt for a specific dialect.\n\nFeatures:\n1. Regional vocabulary.\n2. Specific grammatical structures.\n3. Local idioms.',
    category: 'Linguistic',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Linguistics' },
    tags: ['dialect', 'language', 'regional'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      'Input: "Hello, friend." -> Output (Cockney): "Alright, mate?"',
    performance: {
      estimatedProcessingTime: 180,
      tokenUsage: 220,
      complexityScore: 5,
    },
  },
  {
    id: 'slang-modernization',
    key: 'slang-modernization',
    name: 'Slang Modernization',
    shortDescription: 'Update with current slang and contemporary expressions.',
    longDescription:
      'Enhances the prompt with current slang, modern expressions, trending terminology, and up-to-date colloquial language.',
    systemPrompt:
      'You are a contemporary language expert. Enhance the prompt with modern slang.\n\nVibe:\n1. Use Gen Z / Alpha slang.\n2. Current internet memes.\n3. Casual text-speak (lol, tbh).',
    category: 'Linguistic',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Gen Z' },
    tags: ['slang', 'modern', 'contemporary'],
    complexity: 'medium',
    experimental: true,
    exampleUsage: 'Input: "That is cool." -> Output: "That\'s lit, no cap."',
    performance: {
      estimatedProcessingTime: 150,
      tokenUsage: 180,
      complexityScore: 4,
    },
  },
  {
    id: 'register-adjustment',
    key: 'register-adjustment',
    name: 'Formal/Informal Register Adjustment',
    shortDescription:
      'Adjust formality level and linguistic register appropriately.',
    longDescription:
      'Enhances the prompt by adjusting the formality level and linguistic register to match the intended audience and context appropriately.',
    systemPrompt:
      'You are a linguistic register expert. Enhance the prompt by adjusting formality.\n\nRegisters:\n1. Frozen (e.g., "The parties herein...").\n2. Formal (e.g., "I would appreciate...").\n3. Consultative (e.g., "Could you help me...").\n4. Casual (e.g., "What\'s up?").',
    category: 'Linguistic',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Sociolinguistics' },
    tags: ['register', 'formality', 'tone'],
    complexity: 'low',
    experimental: false,
    exampleUsage:
      'Input: "Sorry." -> Output (Formal): "Please accept my deepest apologies."',
    performance: {
      estimatedProcessingTime: 130,
      tokenUsage: 160,
      complexityScore: 3,
    },
  },
  {
    id: 'idiomatic-enhancement',
    key: 'idiomatic-expression-enhancement',
    name: 'Idiomatic Expression Enhancement',
    shortDescription: 'Add natural idiomatic expressions and cultural sayings.',
    longDescription:
      'Enhances the prompt with natural idiomatic expressions, cultural sayings, proverbs, and figurative language that resonates with native speakers.',
    systemPrompt:
      'You are an idiomatic expressions expert. Enhance the prompt with idioms.\n\nUsage:\n1. "Bite the bullet".\n2. "Break the ice".\n3. "Hit the nail on the head".',
    category: 'Linguistic',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'ESL Teacher' },
    tags: ['idioms', 'expressions', 'phrases'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      'Input: "Start working." -> Output: "Let\'s get the ball rolling."',
    performance: {
      estimatedProcessingTime: 150,
      tokenUsage: 180,
      complexityScore: 4,
    },
  },
  {
    id: 'phonetics-focus',
    key: 'phonetics-focus',
    name: 'Phonetics/Phonology Focus',
    shortDescription:
      'Add pronunciation guides and sound pattern considerations.',
    longDescription:
      'Enhances the prompt with pronunciation guides, phonetic transcriptions, sound pattern considerations, and oral communication elements.',
    systemPrompt:
      'You are a phonetics expert. Enhance the prompt with pronunciation guides.\n\nSystem:\n1. IPA (International Phonetic Alphabet).\n2. Stress marks.\n3. Syllable breaks.',
    category: 'Linguistic',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Phonetics' },
    tags: ['phonetics', 'pronunciation', 'ipa'],
    complexity: 'high',
    experimental: false,
    exampleUsage:
      'Input: "Read this." -> Output: "Read this /riːd ðɪs/. Focus on the long \'e\' sound."',
    performance: {
      estimatedProcessingTime: 180,
      tokenUsage: 220,
      complexityScore: 6,
    },
  },

  // --- Specialized Technical ---
  {
    id: 'blockchain-focus',
    key: 'blockchain-focus',
    name: 'Blockchain/Cryptocurrency Focus',
    shortDescription: 'Add blockchain technology and cryptocurrency context.',
    longDescription:
      'Enhances the prompt with blockchain concepts, cryptocurrency terminology, smart contract details, and decentralized technology context.',
    systemPrompt:
      'You are a blockchain technology expert. Enhance the prompt with crypto context.\n\nConcepts:\n1. Distributed Ledger Technology (DLT).\n2. Consensus mechanisms (PoW, PoS).\n3. Smart contracts (Solidity).',
    category: 'Technical',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Web3 Dev' },
    tags: ['blockchain', 'crypto', 'web3'],
    complexity: 'expert',
    experimental: false,
    exampleUsage:
      'Input: "Send money." -> Output: "Initiate a transaction on the Ethereum blockchain, signing the payload with your private key via MetaMask."',
    performance: {
      estimatedProcessingTime: 250,
      tokenUsage: 310,
      complexityScore: 9,
    },
  },
  {
    id: 'ai-ml-specification',
    key: 'ai-ml-model-specification',
    name: 'AI/ML Model Specification',
    shortDescription:
      'Add artificial intelligence and machine learning specifications.',
    longDescription:
      'Enhances the prompt with artificial intelligence terminology, machine learning model specifications, training requirements, and AI system architecture.',
    systemPrompt:
      'You are an AI/ML specification expert. Enhance the prompt with AI specs.\n\nSpecs:\n1. Model Architecture (Transformer, CNN).\n2. Hyperparameters (Learning rate, Batch size).\n3. Evaluation metrics (F1, BLEU).',
    category: 'Technical',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '2.0.0', author: 'ML Engineering' },
    tags: ['ai', 'ml', 'machine-learning'],
    complexity: 'expert',
    experimental: false,
    exampleUsage:
      'Input: "Create a model." -> Output: "Design a BERT-based model fine-tuned for sentiment analysis, using a learning rate of 2e-5."',
    performance: {
      estimatedProcessingTime: 320,
      tokenUsage: 450,
      complexityScore: 8,
    },
  },
  {
    id: 'cybersecurity-protocols',
    key: 'cybersecurity-protocol-enhancement',
    name: 'Cybersecurity Protocol Enhancement',
    shortDescription: 'Add cybersecurity measures and protection protocols.',
    longDescription:
      'Enhances the prompt with cybersecurity protocols, threat protection measures, vulnerability assessments, and security best practices.',
    systemPrompt:
      'You are a cybersecurity expert. Enhance the prompt with security measures.\n\nProtocols:\n1. Zero Trust Architecture.\n2. End-to-End Encryption (AES-256).\n3. Multi-Factor Authentication (MFA).',
    category: 'Technical',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'SecOps' },
    tags: ['cybersecurity', 'security', 'protocols'],
    complexity: 'expert',
    experimental: false,
    exampleUsage:
      'Input: "Secure the app." -> Output: "Implement OWASP Top 10 security controls, including input sanitization and robust session management."',
    performance: {
      estimatedProcessingTime: 280,
      tokenUsage: 350,
      complexityScore: 9,
    },
  },
  {
    id: 'cloud-infrastructure',
    key: 'cloud-infrastructure-optimization',
    name: 'Cloud Infrastructure Optimization',
    shortDescription:
      'Optimize for cloud computing and infrastructure deployment.',
    longDescription:
      'Enhances the prompt for cloud computing deployment, infrastructure as code, scalability considerations, and cloud architecture best practices.',
    systemPrompt:
      'You are a cloud infrastructure expert. Enhance the prompt for cloud deployment.\n\nTech:\n1. AWS / Azure / GCP services.\n2. Docker and Kubernetes.\n3. CI/CD pipelines.',
    category: 'Technical',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Cloud Arch' },
    tags: ['cloud', 'aws', 'devops'],
    complexity: 'expert',
    experimental: false,
    exampleUsage:
      'Input: "Host the site." -> Output: "Deploy the site using AWS S3 for static hosting and CloudFront for CDN distribution, configured via Terraform."',
    performance: {
      estimatedProcessingTime: 270,
      tokenUsage: 340,
      complexityScore: 8,
    },
  },
  {
    id: 'devops-pipeline',
    key: 'devops-pipeline-description',
    name: 'DevOps Pipeline Description',
    shortDescription:
      'Add DevOps workflows and continuous integration elements.',
    longDescription:
      'Enhances the prompt with DevOps pipeline descriptions, CI/CD workflows, automation strategies, and infrastructure management.',
    systemPrompt:
      'You are a DevOps expert. Enhance the prompt with pipeline workflows.\n\nWorkflow:\n1. Code commit triggers build.\n2. Automated tests run.\n3. Artifact deployed to staging.',
    category: 'Technical',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'DevOps Team' },
    tags: ['devops', 'ci-cd', 'automation'],
    complexity: 'high',
    experimental: false,
    exampleUsage:
      'Input: "Update the app." -> Output: "Trigger the Jenkins pipeline to run unit tests, build the Docker image, and push to the ECR registry."',
    performance: {
      estimatedProcessingTime: 250,
      tokenUsage: 310,
      complexityScore: 8,
    },
  },

  // --- Additional Creative & Lifestyle (Fashion, Beauty, Auto) ---
  {
    id: 'fashion-description',
    key: 'fashion-description-enhancement',
    name: 'Fashion Description Enhancement',
    shortDescription:
      'Add detailed fashion industry terminology and style descriptions.',
    longDescription:
      'Enhances the prompt with detailed fashion terminology, style descriptions, trend analysis, and fashion industry context.',
    systemPrompt:
      'You are a fashion industry expert. Enhance the prompt with fashion terminology.\n\nTerms:\n1. Silhouette (A-line, Mermaid).\n2. Fabrics (Chiffon, Denim).\n3. Haute Couture vs Prêt-à-Porter.',
    category: 'Fashion',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Vogue' },
    tags: ['fashion', 'style', 'clothing'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      'Input: "Nice dress." -> Output: "A stunning A-line midi dress featuring a floral Chiffon fabrication and a square neckline."',
    performance: {
      estimatedProcessingTime: 180,
      tokenUsage: 220,
      complexityScore: 5,
    },
  },
  {
    id: 'beauty-product',
    key: 'beauty-product-description',
    name: 'Beauty Product Description',
    shortDescription: 'Optimize for cosmetics and beauty product descriptions.',
    longDescription:
      'Enhances the prompt for cosmetic product descriptions, ingredient analysis, beauty benefits, and skincare/beauty industry terminology.',
    systemPrompt:
      'You are a beauty product expert. Enhance the prompt for beauty descriptions.\n\nFocus:\n1. Ingredients (Hyaluronic Acid, Retinol).\n2. Benefits (Hydration, Anti-aging).\n3. Texture and Scent.',
    category: 'Beauty',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Sephora' },
    tags: ['beauty', 'cosmetics', 'skincare'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      'Input: "This cream is good." -> Output: "This luxurious cream is enriched with Hyaluronic Acid for deep hydration and Vitamin C for a radiant glow."',
    performance: {
      estimatedProcessingTime: 170,
      tokenUsage: 210,
      complexityScore: 5,
    },
  },
  {
    id: 'automotive-technical',
    key: 'automotive-technical-description',
    name: 'Automotive Technical Description',
    shortDescription:
      'Add detailed automotive specifications and technical details.',
    longDescription:
      'Enhances the prompt with detailed vehicle specifications, mechanical terminology, automotive engineering details, and car industry context.',
    systemPrompt:
      'You are an automotive technical expert. Enhance the prompt with car specs.\n\nSpecs:\n1. Horsepower and Torque.\n2. 0-60 mph time.\n3. Drivetrain (AWD, RWD).',
    category: 'Automotive',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Car & Driver' },
    tags: ['automotive', 'cars', 'mechanical'],
    complexity: 'high',
    experimental: false,
    exampleUsage:
      'Input: "Fast car." -> Output: "A sports car boasting 600 horsepower, achieving 0-60 in 3.2 seconds, equipped with a dual-clutch transmission."',
    performance: {
      estimatedProcessingTime: 200,
      tokenUsage: 250,
      complexityScore: 6,
    },
  },
  {
    id: 'aviation-terminology',
    key: 'aviation-terminology-precision',
    name: 'Aviation Terminology Precision',
    shortDescription:
      'Add aviation-specific terminology and flight operations context.',
    longDescription:
      'Enhances the prompt with precise aviation terminology, flight operations context, aircraft specifications, and aerospace industry language.',
    systemPrompt:
      'You are an aviation terminology expert. Enhance the prompt with aviation terms.\n\nTerms:\n1. IFR (Instrument Flight Rules) vs VFR.\n2. Knots and Mach number.\n3. ATC communications.',
    category: 'Aviation',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'FAA' },
    tags: ['aviation', 'flight', 'aerospace'],
    complexity: 'high',
    experimental: false,
    exampleUsage:
      'Input: "Fly the plane." -> Output: "Pilot the aircraft maintaining VFR flight conditions, monitoring the altimeter and airspeed indicator."',
    performance: {
      estimatedProcessingTime: 210,
      tokenUsage: 260,
      complexityScore: 7,
    },
  },
  {
    id: 'marine-navigation',
    key: 'marine-navigation-enhancement',
    name: 'Marine Navigation Enhancement',
    shortDescription:
      'Add nautical terminology and maritime navigation elements.',
    longDescription:
      'Enhances the prompt with nautical terminology, maritime navigation elements, sailing instructions, and oceanographic context.',
    systemPrompt:
      'You are a marine navigation expert. Enhance the prompt with nautical terms.\n\nTerms:\n1. Port vs Starboard.\n2. Nautical miles and Knots.\n3. Buoys and Beacons.',
    category: 'Maritime',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Coast Guard' },
    tags: ['marine', 'nautical', 'sailing'],
    complexity: 'high',
    experimental: false,
    exampleUsage:
      'Input: "Turn the boat." -> Output: "Execute a starboard turn, maintaining a speed of 10 knots, and watch for the red channel markers."',
    performance: {
      estimatedProcessingTime: 200,
      tokenUsage: 240,
      complexityScore: 7,
    },
  },

  // --- Additional Professional & Business ---
  {
    id: 'crisis-communication',
    key: 'crisis-communication-enhancement',
    name: 'Crisis Communication Enhancement',
    shortDescription:
      'Optimize for crisis management and emergency communications.',
    longDescription:
      'Enhances the prompt for crisis management scenarios, emergency communications, reputation protection, and stakeholder messaging during crises.',
    systemPrompt:
      'You are a crisis communication expert. Enhance the prompt for crisis scenarios.\n\nStrategy:\n1. Acknowledge the issue immediately.\n2. Express empathy.\n3. Outline the solution clearly.',
    category: 'Business',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'PR Firm' },
    tags: ['crisis', 'pr', 'communication'],
    complexity: 'expert',
    experimental: false,
    exampleUsage:
      'Input: "We leaked data." -> Output: "We are aware of a data security incident. We are working diligently to fix it and will keep our customers informed."',
    performance: {
      estimatedProcessingTime: 230,
      tokenUsage: 280,
      complexityScore: 8,
    },
  },
  {
    id: 'merger-acquisition',
    key: 'merger-acquisition-focus',
    name: 'Merger & Acquisition Focus',
    shortDescription: 'Add M&A terminology and corporate transaction context.',
    longDescription:
      'Enhances the prompt with M&A terminology, corporate transaction context, due diligence considerations, and deal structuring elements.',
    systemPrompt:
      'You are a merger and acquisition expert. Enhance the prompt with M&A context.\n\nTerms:\n1. Due Diligence.\n2. Synergies.\n3. Valuation (EBITDA multiple).',
    category: 'Business',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Investment Bankers' },
    tags: ['merger', 'acquisition', 'm&a'],
    complexity: 'expert',
    experimental: false,
    exampleUsage:
      'Input: "Buy the company." -> Output: "Execute a strategic acquisition, conducting due diligence to identify operational synergies and validate the valuation."',
    performance: {
      estimatedProcessingTime: 260,
      tokenUsage: 320,
      complexityScore: 9,
    },
  },
  {
    id: 'startup-pitch',
    key: 'startup-pitch-optimization',
    name: 'Startup Pitch Optimization',
    shortDescription:
      'Optimize for startup investor pitches and business proposals.',
    longDescription:
      'Enhances the prompt for investor pitches, business proposals, startup valuations, market opportunity analysis, and venture capital terminology.',
    systemPrompt:
      'You are a startup pitch expert. Enhance the prompt for investors.\n\nPitch Deck:\n1. The Problem.\n2. The Solution.\n3. The Ask (Funding needed).',
    category: 'Business',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'VC Team' },
    tags: ['startup', 'pitch', 'investors'],
    complexity: 'high',
    experimental: false,
    exampleUsage:
      'Input: "Give me money." -> Output: "We are seeking $2M in seed funding to disrupt the pet food industry with our AI-powered nutrition platform."',
    performance: {
      estimatedProcessingTime: 220,
      tokenUsage: 270,
      complexityScore: 7,
    },
  },
  {
    id: 'negotiation-strategy',
    key: 'negotiation-strategy-enhancement',
    name: 'Negotiation Strategy Enhancement',
    shortDescription: 'Add negotiation tactics and deal-making strategies.',
    longDescription:
      'Enhances the prompt with negotiation tactics, deal-making strategies, conflict resolution approaches, and persuasive negotiation techniques.',
    systemPrompt:
      'You are a negotiation strategy expert. Enhance the prompt with tactics.\n\nTactics:\n1. BATNA (Best Alternative to a Negotiated Agreement).\n2. Anchoring.\n3. Win-Win scenarios.',
    category: 'Business',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Harvard Law' },
    tags: ['negotiation', 'strategy', 'business'],
    complexity: 'high',
    experimental: false,
    exampleUsage:
      'Input: "Lower price." -> Output: "Propose a counter-offer based on volume discounts, anchoring the negotiation to your BATNA."',
    performance: {
      estimatedProcessingTime: 210,
      tokenUsage: 260,
      complexityScore: 7,
    },
  },
  {
    id: 'leadership-communication',
    key: 'leadership-communication-focus',
    name: 'Leadership Communication Focus',
    shortDescription: 'Add executive leadership and team management elements.',
    longDescription:
      'Enhances the prompt with executive leadership language, team management strategies, organizational communication principles, and leadership presence.',
    systemPrompt:
      'You are a leadership communication expert. Enhance the prompt for executives.\n\nStyle:\n1. Visionary and Inspiring.\n2. Decisive.\n3. Transparent.',
    category: 'Business',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'C-Suite' },
    tags: ['leadership', 'management', 'executive'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      'Input: "Work hard." -> Output: "Let us embrace this challenge with determination and execute our strategy to achieve excellence."',
    performance: {
      estimatedProcessingTime: 180,
      tokenUsage: 220,
      complexityScore: 5,
    },
  },

  // --- Additional Personal & Lifestyle ---
  {
    id: 'parenting-advice',
    key: 'parenting-advice-enhancement',
    name: 'Parenting Advice Enhancement',
    shortDescription:
      'Add child development insights and parenting strategies.',
    longDescription:
      'Enhances the prompt with child development insights, age-appropriate parenting strategies, family dynamics considerations, and child psychology principles.',
    systemPrompt:
      'You are a parenting expert. Enhance the prompt with parenting advice.\n\nApproach:\n1. Positive reinforcement.\n2. Age-appropriate expectations.\n3. Empathy and validation.',
    category: 'Parenting',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Pediatrics' },
    tags: ['parenting', 'child-development', 'family'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      'Input: "Stop the tantrum." -> Output: "Validate the child\'s feelings ("I see you are upset"), offer comfort, and set a calm boundary."',
    performance: {
      estimatedProcessingTime: 190,
      tokenUsage: 230,
      complexityScore: 5,
    },
  },
  {
    id: 'relationship-counseling',
    key: 'relationship-counseling-focus',
    name: 'Relationship Counseling Focus',
    shortDescription:
      'Add relationship dynamics and interpersonal communication.',
    longDescription:
      'Enhances the prompt with relationship dynamics insights, interpersonal communication strategies, conflict resolution techniques, and emotional connection principles.',
    systemPrompt:
      'You are a relationship counseling expert. Enhance the prompt with relationship advice.\n\nSkills:\n1. "I" statements.\n2. Active listening.\n3. Compromise.',
    category: 'Relationships',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Couples Therapy' },
    tags: ['relationships', 'counseling', 'love'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      'Input: "We fight a lot." -> Output: "Practice active listening by repeating what your partner says before responding, to ensure you understand their perspective."',
    performance: {
      estimatedProcessingTime: 190,
      tokenUsage: 230,
      complexityScore: 5,
    },
  },
  {
    id: 'personal-finance',
    key: 'personal-finance-optimization',
    name: 'Personal Finance Optimization',
    shortDescription:
      'Add personal financial planning and money management advice.',
    longDescription:
      'Enhances the prompt with personal financial planning strategies, budget management techniques, debt reduction approaches, and financial wellness principles.',
    systemPrompt:
      'You are a personal finance expert. Enhance the prompt with money advice.\n\nSteps:\n1. Track expenses.\n2. Build an emergency fund.\n3. Invest for retirement.',
    category: 'Personal',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'NerdWallet' },
    tags: ['finance', 'money', 'budgeting'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      'Input: "Save money." -> Output: "Automate your savings by setting up a direct deposit from your paycheck to a high-yield savings account."',
    performance: {
      estimatedProcessingTime: 170,
      tokenUsage: 210,
      complexityScore: 5,
    },
  },
  {
    id: 'career-coaching',
    key: 'career-coaching-enhancement',
    name: 'Career Coaching Enhancement',
    shortDescription:
      'Add career development and professional growth strategies.',
    longDescription:
      'Enhances the prompt with career development strategies, professional growth planning, job search techniques, and career advancement principles.',
    systemPrompt:
      'You are a career coaching expert. Enhance the prompt for career growth.\n\nStrategy:\n1. Networking.\n2. Skill development.\n3. Personal branding.',
    category: 'Career',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'LinkedIn' },
    tags: ['career', 'work', 'growth'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      'Input: "Get a job." -> Output: "Optimize your LinkedIn profile, reach out to industry connections for informational interviews, and tailor your resume to the job description."',
    performance: {
      estimatedProcessingTime: 180,
      tokenUsage: 220,
      complexityScore: 5,
    },
  },
  {
    id: 'life-coaching',
    key: 'life-coaching-focus',
    name: 'Life Coaching Focus',
    shortDescription:
      'Add personal development and life goal achievement strategies.',
    longDescription:
      'Enhances the prompt with personal development strategies, life goal achievement techniques, habit formation principles, and holistic life planning.',
    systemPrompt:
      'You are a life coaching expert. Enhance the prompt for life goals.\n\nProcess:\n1. Define SMART goals.\n2. Break into actionable steps.\n3. Build accountability habits.',
    category: 'Personal',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Life Coach' },
    tags: ['life-coaching', 'goals', 'habits'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      'Input: "Be happy." -> Output: "Set a goal to practice gratitude daily by writing down three things you are thankful for every morning."',
    performance: {
      estimatedProcessingTime: 160,
      tokenUsage: 190,
      complexityScore: 4,
    },
  },

  // --- Additional Technical & Scientific ---
  {
    id: 'biotechnology-focus',
    key: 'biotechnology-enhancement',
    name: 'Biotechnology Enhancement',
    shortDescription:
      'Add biotech terminology and genetic engineering context.',
    longDescription:
      'Enhances the prompt with biotech terminology, genetic engineering concepts, molecular biology context, and life sciences research elements.',
    systemPrompt:
      'You are a biotechnology expert. Enhance the prompt with biotech context.\n\nTerms:\n1. CRISPR-Cas9.\n2. PCR (Polymerase Chain Reaction).\n3. Recombinant DNA.',
    category: 'Biotech',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'BioTech' },
    tags: ['biotech', 'genetics', 'biology'],
    complexity: 'expert',
    experimental: false,
    exampleUsage:
      'Input: "Fix the gene." -> Output: "Utilize CRISPR-Cas9 gene editing technology to target and correct the specific point mutation in the DNA sequence."',
    performance: {
      estimatedProcessingTime: 270,
      tokenUsage: 340,
      complexityScore: 9,
    },
  },
  {
    id: 'quantum-computing',
    key: 'quantum-computing-context',
    name: 'Quantum Computing Context',
    shortDescription:
      'Add quantum mechanics and quantum computing terminology.',
    longDescription:
      'Enhances the prompt with quantum mechanics principles, quantum computing terminology, qubit operations, and quantum algorithm concepts.',
    systemPrompt:
      'You are a quantum computing expert. Enhance the prompt with quantum terms.\n\nConcepts:\n1. Superposition and Entanglement.\n2. Qubits vs Bits.\n3. Quantum Gates.',
    category: 'Quantum',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'IBM Quantum' },
    tags: ['quantum', 'physics', 'computing'],
    complexity: 'expert',
    experimental: true,
    exampleUsage:
      'Input: "Solve the problem." -> Output: "Design a quantum algorithm using Grover\'s search to find the solution in O(√N) time complexity."',
    performance: {
      estimatedProcessingTime: 290,
      tokenUsage: 370,
      complexityScore: 9,
    },
  },
  {
    id: 'nanotechnology-precision',
    key: 'nanotechnology-precision',
    name: 'Nanotechnology Precision',
    shortDescription:
      'Add nanoscale engineering and molecular manipulation details.',
    longDescription:
      'Enhances the prompt with nanoscale engineering principles, molecular manipulation techniques, nanomaterial properties, and nanoengineering applications.',
    systemPrompt:
      'You are a nanotechnology expert. Enhance the prompt with nano details.\n\nScale:\n1. Nanometers (10^-9 meters).\n2. Carbon Nanotubes.\n3. Self-assembly.',
    category: 'Nano',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'NanoTech' },
    tags: ['nanotech', 'materials', 'engineering'],
    complexity: 'expert',
    experimental: true,
    exampleUsage:
      'Input: "Make a strong material." -> Output: "Synthesize a composite material reinforced with carbon nanotubes to enhance tensile strength at the nanoscale."',
    performance: {
      estimatedProcessingTime: 280,
      tokenUsage: 350,
      complexityScore: 9,
    },
  },
  {
    id: 'astrophysics-context',
    key: 'astrophysics-context-enhancement',
    name: 'Astrophysics Context Enhancement',
    shortDescription:
      'Add astrophysical concepts and space science terminology.',
    longDescription:
      'Enhances the prompt with astrophysical concepts, space science terminology, celestial mechanics, cosmological principles, and astronomical phenomena.',
    systemPrompt:
      'You are an astrophysics expert. Enhance the prompt with space science.\n\nTerms:\n1. Light years and Parsecs.\n2. Redshift and Blueshift.\n3. Black Holes and Neutron Stars.',
    category: 'Space',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'NASA' },
    tags: ['astrophysics', 'space', 'science'],
    complexity: 'expert',
    experimental: false,
    exampleUsage:
      'Input: "Look at the star." -> Output: "Observe the spectral lines of the star to determine its composition and measure its redshift to calculate its distance."',
    performance: {
      estimatedProcessingTime: 260,
      tokenUsage: 320,
      complexityScore: 9,
    },
  },
  {
    id: 'robotics-engineering',
    key: 'robotics-engineering-focus',
    name: 'Robotics Engineering Focus',
    shortDescription:
      'Add robotics terminology and mechanical automation details.',
    longDescription:
      'Enhances the prompt with robotics terminology, mechanical automation details, control systems, sensor integration, and robotic application contexts.',
    systemPrompt:
      'You are a robotics engineering expert. Enhance the prompt with robotics terms.\n\nComponents:\n1. Actuators and Servos.\n2. Inverse Kinematics.\n3. SLAM (Simultaneous Localization and Mapping).',
    category: 'Robotics',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Boston Dynamics' },
    tags: ['robotics', 'automation', 'engineering'],
    complexity: 'expert',
    experimental: false,
    exampleUsage:
      'Input: "Move the arm." -> Output: "Calculate the inverse kinematics to move the robotic arm\'s end-effector to the target coordinates (x, y, z)."',
    performance: {
      estimatedProcessingTime: 250,
      tokenUsage: 310,
      complexityScore: 8,
    },
  },

  // --- Additional Creative & Entertainment (Genres) ---
  {
    id: 'comedy-writing',
    key: 'comedy-writing-enhancement',
    name: 'Comedy Writing Enhancement',
    shortDescription:
      'Add humor writing techniques and comedic timing elements.',
    longDescription:
      'Enhances the prompt with humor writing techniques, comedic timing elements, joke structure, satire principles, and comedy genre conventions.',
    systemPrompt:
      'You are a comedy writing expert. Enhance the prompt with humor.\n\nTechniques:\n1. The Rule of Three.\n2. Misdirection.\n3. Callbacks.',
    category: 'Comedy',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Comedy Central' },
    tags: ['comedy', 'humor', 'writing'],
    complexity: 'high',
    experimental: false,
    exampleUsage:
      'Input: "I went to the store." -> Output: "I went to the store to buy milk, but they were out of cows. So I bought a soybean instead."',
    performance: {
      estimatedProcessingTime: 200,
      tokenUsage: 250,
      complexityScore: 7,
    },
  },
  {
    id: 'horror-atmosphere',
    key: 'horror-atmosphere-focus',
    name: 'Horror Atmosphere Focus',
    shortDescription: 'Add suspense, tension, and horror genre elements.',
    longDescription:
      'Enhances the prompt with suspense-building techniques, tension creation, horror atmosphere elements, fear psychology, and genre conventions.',
    systemPrompt:
      'You are a horror writing expert. Enhance the prompt with horror.\n\nElements:\n1. Sensory deprivation.\n2. The Unseen.\n3. Pacing (Slow build up).',
    category: 'Horror',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Stephen King' },
    tags: ['horror', 'suspense', 'scary'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      'Input: "Open the door." -> Output: "My hand trembled as it touched the cold brass knob. Behind that door, something was breathing—shallow, ragged breaths."',
    performance: {
      estimatedProcessingTime: 210,
      tokenUsage: 260,
      complexityScore: 6,
    },
  },
  {
    id: 'romance-narrative',
    key: 'romance-narrative-enhancement',
    name: 'Romance Narrative Enhancement',
    shortDescription:
      'Add romantic storytelling and relationship development elements.',
    longDescription:
      'Enhances the prompt with romantic storytelling techniques, relationship development arcs, emotional intimacy building, and romance genre conventions.',
    systemPrompt:
      'You are a romance narrative expert. Enhance the prompt with romance.\n\nTropes:\n1. Meet Cute.\n2. Emotional conflict.\n3. Happily Ever After.',
    category: 'Romance',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Nora Roberts' },
    tags: ['romance', 'love', 'relationships'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      'Input: "They met." -> Output: "Their eyes met across the crowded coffee shop, and in that instant, the noise of the world faded into silence."',
    performance: {
      estimatedProcessingTime: 190,
      tokenUsage: 230,
      complexityScore: 5,
    },
  },
  {
    id: 'fantasy-worldbuilding',
    key: 'fantasy-worldbuilding-optimization',
    name: 'Fantasy Worldbuilding Optimization',
    shortDescription:
      'Create detailed fantasy worlds with magic systems and lore.',
    longDescription:
      'Enhances the prompt with detailed fantasy world creation, magic system development, lore establishment, mythical creatures, and fantasy realm building.',
    systemPrompt:
      'You are a fantasy worldbuilding expert. Enhance the prompt with fantasy elements.\n\nLore:\n1. Hard Magic vs Soft Magic.\n2. Races and Classes.\n3. Ancient Prophecies.',
    category: 'Fantasy',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Tolkien Estate' },
    tags: ['fantasy', 'worldbuilding', 'magic'],
    complexity: 'high',
    experimental: false,
    exampleUsage:
      'Input: "Cast a spell." -> Output: "He whispered the ancient words of the Eldritch tongue, weaving mana from the air to conjure a sphere of arcane fire."',
    performance: {
      estimatedProcessingTime: 240,
      tokenUsage: 300,
      complexityScore: 8,
    },
  },
  {
    id: 'sci-fi-concepts',
    key: 'science-fiction-concepts',
    name: 'Science Fiction Concepts',
    shortDescription:
      'Add futuristic technology and speculative science elements.',
    longDescription:
      'Enhances the prompt with futuristic technology concepts, speculative science elements, space exploration themes, and sci-fi worldbuilding principles.',
    systemPrompt:
      'You are a science fiction expert. Enhance the prompt with sci-fi concepts.\n\nTech:\n1. Cybernetics and AI.\n2. FTL (Faster Than Light) travel.\n3. Dystopian societies.',
    category: 'SciFi',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Asimov Foundation' },
    tags: ['scifi', 'future', 'technology'],
    complexity: 'high',
    experimental: false,
    exampleUsage:
      'Input: "Fly to Mars." -> Output: "Engage the ion drive for the transfer burn to Mars, ensuring the cryo-sleep pods are active for the 6-month journey."',
    performance: {
      estimatedProcessingTime: 230,
      tokenUsage: 280,
      complexityScore: 7,
    },
  },

  // --- Additional Business & Professional (Retail, Real Estate, etc.) ---
  {
    id: 'franchise-development',
    key: 'franchise-development-focus',
    name: 'Franchise Development Focus',
    shortDescription: 'Add franchise business model and expansion strategies.',
    longDescription:
      'Enhances the prompt with franchise business models, expansion strategies, franchisee-franchisor relationships, and multi-unit growth planning.',
    systemPrompt:
      'You are a franchise development expert. Enhance the prompt with franchising strategies.\n\nModel:\n1. Franchise Fees and Royalties.\n2. Operations Manual.\n3. Territory allocation.',
    category: 'Franchise',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Franchise Biz' },
    tags: ['franchise', 'business', 'expansion'],
    complexity: 'expert',
    experimental: false,
    exampleUsage:
      'Input: "Grow the brand." -> Output: "Develop a franchise disclosure document (FDD) and recruit qualified franchisees to expand into new territories."',
    performance: {
      estimatedProcessingTime: 240,
      tokenUsage: 300,
      complexityScore: 8,
    },
  },
  {
    id: 'e-commerce-optimization',
    key: 'e-commerce-optimization',
    name: 'E-commerce Optimization',
    shortDescription:
      'Optimize for online stores and digital commerce platforms.',
    longDescription:
      'Enhances the prompt for online store optimization, digital commerce platforms, conversion rate strategies, user experience design, and online sales funnels.',
    systemPrompt:
      'You are an e-commerce expert. Enhance the prompt for online sales.\n\nMetrics:\n1. Conversion Rate (CVR).\n2. Average Order Value (AOV).\n3. Cart Abandonment rate.',
    category: 'Ecommerce',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Shopify' },
    tags: ['ecommerce', 'online', 'sales'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      'Input: "Sell more." -> Output: "Optimize the product page with high-quality images and customer reviews to increase the conversion rate."',
    performance: {
      estimatedProcessingTime: 180,
      tokenUsage: 220,
      complexityScore: 5,
    },
  },
  {
    id: 'real-estate-marketing',
    key: 'real-estate-marketing-enhancement',
    name: 'Real Estate Marketing Enhancement',
    shortDescription:
      'Add property marketing and real estate sales strategies.',
    longDescription:
      'Enhances the prompt with property marketing strategies, real estate sales techniques, market analysis, property descriptions, and listing optimization.',
    systemPrompt:
      'You are a real estate marketing expert. Enhance the prompt for property listings.\n\nDetails:\n1. Curb appeal.\n2. Square footage and Amenities.\n3. Neighborhood highlights.',
    category: 'RealEstate',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Zillow' },
    tags: ['realestate', 'marketing', 'property'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      'Input: "House for sale." -> Output: "Stunning 3-bed home with an open concept kitchen, hardwood floors, and a spacious backyard perfect for entertaining."',
    performance: {
      estimatedProcessingTime: 190,
      tokenUsage: 230,
      complexityScore: 5,
    },
  },
  {
    id: 'hospitality-service',
    key: 'hospitality-service-focus',
    name: 'Hospitality Service Focus',
    shortDescription:
      'Add hotel, restaurant, and hospitality industry context.',
    longDescription:
      'Enhances the prompt with hotel management context, restaurant service standards, guest experience optimization, and hospitality industry best practices.',
    systemPrompt:
      'You are a hospitality service expert. Enhance the prompt for guest experience.\n\nStandards:\n1. Personalization.\n2. Speed of service.\n3. Cleanliness and Comfort.',
    category: 'Hospitality',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Marriott' },
    tags: ['hospitality', 'hotel', 'service'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      'Input: "Check in guests." -> Output: "Provide a warm welcome, offer an upgrade if available, and ensure the room is prepared with amenities tailored to their preferences."',
    performance: {
      estimatedProcessingTime: 170,
      tokenUsage: 210,
      complexityScore: 5,
    },
  },
  {
    id: 'retail-experience',
    key: 'retail-experience-enhancement',
    name: 'Retail Experience Enhancement',
    shortDescription:
      'Add retail store operations and customer experience elements.',
    longDescription:
      'Enhances the prompt with retail store operations, customer experience design, merchandising strategies, sales techniques, and retail industry context.',
    systemPrompt:
      'You are a retail experience expert. Enhance the prompt for retail ops.\n\nElements:\n1. Visual Merchandising.\n2. Floor Staff engagement.\n3. POS efficiency.',
    category: 'Retail',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Retail Mgmt' },
    tags: ['retail', 'sales', 'operations'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      'Input: "Run the store." -> Output: "Optimize the floor plan for traffic flow, ensure high-margin items are at eye level, and train staff on upselling techniques."',
    performance: {
      estimatedProcessingTime: 180,
      tokenUsage: 220,
      complexityScore: 5,
    },
  },

  // --- Additional Specialized Domains ---
  {
    id: 'agriculture-technology',
    key: 'agriculture-technology-focus',
    name: 'Agriculture Technology Focus',
    shortDescription:
      'Add farming technology and agricultural innovation elements.',
    longDescription:
      'Enhances the prompt with farming technology concepts, agricultural innovation elements, sustainable farming practices, and agri-tech industry context.',
    systemPrompt:
      'You are an agricultural technology expert. Enhance the prompt with AgTech.\n\nTech:\n1. Precision Agriculture (Drones, Sensors).\n2. Automated Irrigation.\n3. Crop Monitoring software.',
    category: 'Agriculture',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'John Deere' },
    tags: ['agriculture', 'farming', 'tech'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      'Input: "Grow corn." -> Output: "Implement precision farming techniques using soil sensors to optimize water and fertilizer application for the corn crop."',
    performance: {
      estimatedProcessingTime: 200,
      tokenUsage: 240,
      complexityScore: 6,
    },
  },
  {
    id: 'education-curriculum',
    key: 'education-curriculum-development',
    name: 'Education Curriculum Development',
    shortDescription:
      'Add educational curriculum design and learning objectives.',
    longDescription:
      'Enhances the prompt with curriculum design principles, learning objectives development, educational standards alignment, and pedagogical strategies.',
    systemPrompt:
      "You are an education curriculum expert. Enhance the prompt for lesson planning.\n\nStructure:\n1. Learning Objectives (Bloom's Taxonomy).\n2. Assessment methods.\n3. Differentiated instruction.",
    category: 'Education',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Dept of Ed' },
    tags: ['education', 'curriculum', 'teaching'],
    complexity: 'high',
    experimental: false,
    exampleUsage:
      'Input: "Teach math." -> Output: "Design a lesson plan on fractions that aligns with Common Core standards, utilizing visual aids and manipulatives for hands-on learning."',
    performance: {
      estimatedProcessingTime: 230,
      tokenUsage: 280,
      complexityScore: 7,
    },
  },
  {
    id: 'nonprofit-messaging',
    key: 'nonprofit-messaging-enhancement',
    name: 'Nonprofit Messaging Enhancement',
    shortDescription:
      'Optimize for nonprofit organizations and cause marketing.',
    longDescription:
      'Enhances the prompt for nonprofit organization communications, cause marketing strategies, donor engagement, and social impact messaging.',
    systemPrompt:
      'You are a nonprofit messaging expert. Enhance the prompt for social impact.\n\nFocus:\n1. The Mission and Vision.\n2. Impact stories (Beneficiaries).\n3. Call to Action (Donate/Volunteer).',
    category: 'Nonprofit',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'NGO' },
    tags: ['nonprofit', 'charity', 'social-impact'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      'Input: "Help us." -> Output: "Your support can change lives. Join us in providing clean water to communities in need. Donate today to make a difference."',
    performance: {
      estimatedProcessingTime: 180,
      tokenUsage: 220,
      complexityScore: 5,
    },
  },
  {
    id: 'legal-tech-innovation',
    key: 'legal-tech-innovation-focus',
    name: 'Legal Tech Innovation Focus',
    shortDescription: 'Add legal technology and law firm innovation elements.',
    longDescription:
      'Enhances the prompt with legal technology concepts, law firm innovation strategies, legal process automation, and legal industry digital transformation.',
    systemPrompt:
      'You are a legal tech expert. Enhance the prompt with legal technology.\n\nTech:\n1. E-discovery tools.\n2. Contract AI (NLP).\n3. Online Dispute Resolution (ODR).',
    category: 'LegalTech',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'LegalTech' },
    tags: ['legal', 'tech', 'innovation'],
    complexity: 'high',
    experimental: false,
    exampleUsage:
      'Input: "Review contracts." -> Output: "Utilize AI-powered contract analysis software to identify risks and standard clauses across 1000 documents in minutes."',
    performance: {
      estimatedProcessingTime: 230,
      tokenUsage: 280,
      complexityScore: 7,
    },
  },
  {
    id: 'health-tech-solutions',
    key: 'health-tech-solutions-enhancement',
    name: 'Health Tech Solutions Enhancement',
    shortDescription:
      'Add healthcare technology and digital health innovations.',
    longDescription:
      'Enhances the prompt with healthcare technology solutions, digital health innovations, telemedicine applications, and health industry digital transformation.',
    systemPrompt:
      'You are a health tech expert. Enhance the prompt with digital health.\n\nSolutions:\n1. Telehealth platforms.\n2. Wearable tech integration.\n3. EHR interoperability.',
    category: 'HealthTech',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'HIMSS' },
    tags: ['health', 'tech', 'digital'],
    complexity: 'high',
    experimental: false,
    exampleUsage:
      'Input: "Monitor patients." -> Output: "Implement a remote patient monitoring system using wearables to track vitals and alert providers to anomalies."',
    performance: {
      estimatedProcessingTime: 230,
      tokenUsage: 280,
      complexityScore: 7,
    },
  },

  // --- Additional Creative & Lifestyle (Interior Design, etc.) ---
  {
    id: 'interior-design',
    key: 'interior-design-focus',
    name: 'Interior Design Focus',
    shortDescription:
      'Add interior design principles and space planning elements.',
    longDescription:
      'Enhances the prompt with interior design principles, space planning techniques, color theory applications, furniture selection, and design aesthetic considerations.',
    systemPrompt:
      'You are an interior design expert. Enhance the prompt with design principles.\n\nElements:\n1. Balance and Rhythm.\n2. Color Harmony.\n3. Scale and Proportion.',
    category: 'Design',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Architectural Digest' },
    tags: ['design', 'interior', 'decor'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      'Input: "Decorate room." -> Output: "Create a minimalist living room with a neutral color palette, incorporating texture through linen throws and a jute rug."',
    performance: {
      estimatedProcessingTime: 190,
      tokenUsage: 230,
      complexityScore: 5,
    },
  },
  {
    id: 'photography-technique',
    key: 'photography-technique-enhancement',
    name: 'Photography Technique Enhancement',
    shortDescription:
      'Add photography technical details and artistic composition.',
    longDescription:
      'Enhances the prompt with photography technical details, camera settings, lighting techniques, artistic composition principles, and visual storytelling.',
    systemPrompt:
      'You are a photography technique expert. Enhance the prompt with photo specs.\n\nSettings:\n1. Aperture (f-stop) and ISO.\n2. Shutter Speed.\n3. Rule of Thirds.',
    category: 'Photography',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Nat Geo Photo' },
    tags: ['photography', 'camera', 'art'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      'Input: "Take a portrait." -> Output: "Set the aperture to f/1.8 for a shallow depth of field, focus on the eyes, and use soft, diffused lighting."',
    performance: {
      estimatedProcessingTime: 180,
      tokenUsage: 220,
      complexityScore: 5,
    },
  },
  {
    id: 'gardening-expertise',
    key: 'gardening-expertise-focus',
    name: 'Gardening Expertise Focus',
    shortDescription:
      'Add horticulture knowledge and garden planning elements.',
    longDescription:
      'Enhances the prompt with horticulture knowledge, plant selection advice, garden planning principles, seasonal gardening tips, and landscape design elements.',
    systemPrompt:
      'You are a gardening expertise expert. Enhance the prompt with horticulture.\n\nTips:\n1. Hardiness Zones.\n2. Soil pH and composition.\n3. Companion planting.',
    category: 'Gardening',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Burpee' },
    tags: ['gardening', 'plants', 'horticulture'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      'Input: "Plant flowers." -> Output: "Choose native perennials suited to your hardiness zone, and plant them in well-draining soil with full sun exposure."',
    performance: {
      estimatedProcessingTime: 180,
      tokenUsage: 220,
      complexityScore: 5,
    },
  },
  {
    id: 'craft-instruction',
    key: 'craft-instruction-enhancement',
    name: 'Craft Instruction Enhancement',
    shortDescription: 'Add detailed craft project instructions and techniques.',
    longDescription:
      'Enhances the prompt with detailed craft project instructions, material lists, technique explanations, step-by-step guidance, and creative craft principles.',
    systemPrompt:
      'You are a craft instruction expert. Enhance the prompt with DIY details.\n\nDetails:\n1. Materials and Tools list.\n2. Clear step-by-step instructions.\n3. Safety warnings (Hot glue, Scissors).',
    category: 'Crafts',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Etsy' },
    tags: ['crafts', 'diy', 'hobbies'],
    complexity: 'low',
    experimental: false,
    exampleUsage: `Input: 'Make a candle.' -> Output: 'Melt soy wax flakes to 185°F, add fragrance oil, secure the wick in the jar, and pour the wax.'`,
    performance: {
      estimatedProcessingTime: 150,
      tokenUsage: 180,
      complexityScore: 3,
    },
  },
  {
    id: 'pet-care-advice',
    key: 'pet-care-advice-focus',
    name: 'Pet Care Advice Focus',
    shortDescription:
      'Add animal care knowledge and pet health considerations.',
    longDescription:
      'Enhances the prompt with animal care knowledge, pet health considerations, training techniques, nutrition advice, and responsible pet ownership principles.',
    systemPrompt:
      'You are a pet care expert. Enhance the prompt with animal care.\n\nCare:\n1. Nutrition needs by species/age.\n2. Exercise and enrichment.\n3. Veterinary checkups.',
    category: 'Pets',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'VetStreet' },
    tags: ['pets', 'animals', 'care'],
    complexity: 'low',
    experimental: false,
    exampleUsage: `Input: 'Train the dog.' -> Output: 'Use positive reinforcement techniques like clicker training to teach basic commands such as sit, stay, and come.'`,
    performance: {
      estimatedProcessingTime: 150,
      tokenUsage: 180,
      complexityScore: 3,
    },
  },

  // --- Additional Technical & Professional (Audio, Video, UX) ---
  {
    id: 'audio-engineering',
    key: 'audio-engineering-enhancement',
    name: 'Audio Engineering Enhancement',
    shortDescription:
      'Add sound design and audio production technical details.',
    longDescription:
      'Enhances the prompt with sound design principles, audio production technical details, mixing techniques, recording equipment specifications, and audio engineering best practices.',
    systemPrompt:
      'You are an audio engineering expert. Enhance the prompt with sound specs.\n\nSpecs:\n1. Sample Rate and Bit Depth.\n2. EQ and Compression settings.\n3. Reverb and Delay times.',
    category: 'Audio',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Sound on Sound' },
    tags: ['audio', 'sound', 'music'],
    complexity: 'high',
    experimental: false,
    exampleUsage: `Input: 'Record vocals.' -> Output: 'Record vocals at 48kHz/24-bit using a large-diaphragm condenser microphone, applying a high-pass filter at 80Hz.'`,
    performance: {
      estimatedProcessingTime: 220,
      tokenUsage: 270,
      complexityScore: 7,
    },
  },
  {
    id: 'video-production',
    key: 'video-production-focus',
    name: 'Video Production Focus',
    shortDescription:
      'Add filmmaking techniques and video production workflows.',
    longDescription:
      'Enhances the prompt with filmmaking techniques, video production workflows, camera operation details, editing principles, and visual storytelling methods.',
    systemPrompt:
      'You are a video production expert. Enhance the prompt with film specs.\n\nWorkflow:\n1. Pre-production (Storyboarding).\n2. Production (Lighting, Camera).\n3. Post-production (Editing, Color Grading).',
    category: 'Video',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Film Riot' },
    tags: ['video', 'film', 'production'],
    complexity: 'high',
    experimental: false,
    exampleUsage: `Input: 'Shoot a scene.' -> Output: 'Set up a three-point lighting setup (Key, Fill, Back) and shoot on a 24fps cinema camera for a cinematic look.'`,
    performance: {
      estimatedProcessingTime: 230,
      tokenUsage: 280,
      complexityScore: 7,
    },
  },
  {
    id: 'ux-design-principles',
    key: 'ux-design-principles-enhancement',
    name: 'UX Design Principles Enhancement',
    shortDescription:
      'Add user experience design and interface optimization elements.',
    longDescription:
      'Enhances the prompt with user experience design principles, interface optimization techniques, usability testing considerations, user research insights, and design thinking methodologies.',
    systemPrompt:
      'You are a UX design expert. Enhance the prompt with UX principles.\n\nPrinciples:\n1. User-Centricity.\n2. Usability (Heuristics).\n3. Information Architecture.',
    category: 'UX',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Nielsen Norman Group' },
    tags: ['ux', 'design', 'usability'],
    complexity: 'high',
    experimental: false,
    exampleUsage: `Input: 'Design the app.' -> Output: 'Create an intuitive navigation flow that allows users to complete the primary task in under three clicks, ensuring accessibility compliance.'`,
    performance: {
      estimatedProcessingTime: 240,
      tokenUsage: 300,
      complexityScore: 8,
    },
  },
  {
    id: 'content-strategy',
    key: 'content-strategy-focus',
    name: 'Content Strategy Focus',
    shortDescription:
      'Add content marketing strategy and audience engagement planning.',
    longDescription:
      'Enhances the prompt with content marketing strategy development, audience engagement planning, content calendar creation, and content performance optimization.',
    systemPrompt:
      'You are a content strategy expert. Enhance the prompt with strategy.\n\nStrategy:\n1. Audience Personas.\n2. Content Pillars.\n3. Distribution Channels.',
    category: 'Content',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Content Marketing Institute' },
    tags: ['content', 'strategy', 'marketing'],
    complexity: 'medium',
    experimental: false,
    exampleUsage: `Input: 'Write content.' -> Output: 'Develop a content calendar targeting the "Tech-Savvy Millennial" persona, focusing on "How-to" guides distributed via LinkedIn and Instagram.'`,
    performance: {
      estimatedProcessingTime: 190,
      tokenUsage: 230,
      complexityScore: 6,
    },
  },
  {
    id: 'seo-optimization',
    key: 'seo-optimization-enhancement',
    name: 'SEO Optimization Enhancement',
    shortDescription:
      'Add search engine optimization and digital visibility strategies.',
    longDescription:
      'Enhances the prompt with search engine optimization techniques, keyword research strategies, digital visibility planning, and search ranking improvement tactics.',
    systemPrompt:
      'You are an SEO optimization expert. Enhance the prompt with SEO tactics.\n\nTactics:\n1. Keyword Research (Volume, Difficulty).\n2. On-page SEO (Meta tags, Headers).\n3. Backlinking strategy.',
    category: 'SEO',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Moz' },
    tags: ['seo', 'search', 'visibility'],
    complexity: 'medium',
    experimental: false,
    exampleUsage: `Input: 'Improve rank.' -> Output: 'Optimize the blog post for the keyword "vegan recipes", include internal links to related posts, and optimize the meta description for click-through rate.'`,
    performance: {
      estimatedProcessingTime: 180,
      tokenUsage: 220,
      complexityScore: 5,
    },
  },

  // --- Additional Specialized Fields (Forensic, Archaeology) ---
  {
    id: 'forensic-analysis',
    key: 'forensic-analysis-focus',
    name: 'Forensic Analysis Focus',
    shortDescription:
      'Add forensic science and investigative analysis elements.',
    longDescription:
      'Enhances the prompt with forensic science principles, investigative analysis techniques, evidence examination methods, and criminal justice context.',
    systemPrompt:
      'You are a forensic analysis expert. Enhance the prompt with investigative analysis.\n\nMethods:\n1. Chain of Custody.\n2. DNA/Fingerprint analysis.\n3. Digital forensics.',
    category: 'Forensic',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'CSI' },
    tags: ['forensic', 'investigation', 'science'],
    complexity: 'expert',
    experimental: false,
    exampleUsage: `Input: 'Solve the crime.' -> Output: 'Collect trace evidence from the scene, maintain the chain of custody, and compare DNA profiles against the CODIS database.'`,
    performance: {
      estimatedProcessingTime: 250,
      tokenUsage: 310,
      complexityScore: 9,
    },
  },
  {
    id: 'archaeology-context',
    key: 'archaeology-context-enhancement',
    name: 'Archaeology Context Enhancement',
    shortDescription:
      'Add archaeological methods and historical excavation details.',
    longDescription:
      'Enhances the prompt with archaeological methods, historical excavation details, artifact analysis techniques, dating methods, and cultural heritage preservation.',
    systemPrompt:
      'You are an archaeology expert. Enhance the prompt with excavation details.\n\nMethods:\n1. Stratigraphy (Layer analysis).\n2. Carbon-14 Dating.\n3. Typology analysis.',
    category: 'Archaeology',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Archaeology Institute' },
    tags: ['archaeology', 'history', 'excavation'],
    complexity: 'expert',
    experimental: false,
    exampleUsage: `Input: 'Dig here.' -> Output: 'Excavate the test unit in 10cm levels, recording all artifact coordinates and soil changes to establish the stratigraphic sequence.'`,
    performance: {
      estimatedProcessingTime: 250,
      tokenUsage: 310,
      complexityScore: 9,
    },
  },
  {
    id: 'meteorology-focus',
    key: 'meteorology-focus',
    name: 'Meteorology Focus',
    shortDescription:
      'Add weather forecasting and atmospheric science elements.',
    longDescription:
      'Enhances the prompt with weather forecasting techniques, atmospheric science principles, climate patterns, meteorological data analysis, and severe weather prediction.',
    systemPrompt:
      'You are a meteorology expert. Enhance the prompt with weather data.\n\nData:\n1. Isobars and Fronts.\n2. Dew point and Humidity.\n3. Model outputs (GFS, ECMWF).',
    category: 'Weather',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'NOAA' },
    tags: ['weather', 'meteorology', 'climate'],
    complexity: 'high',
    experimental: false,
    exampleUsage: `Input: 'Will it rain?' -> Output: 'Analyze the surface pressure map and dew point levels; the approaching cold front suggests a high probability of precipitation within 6 hours.'`,
    performance: {
      estimatedProcessingTime: 220,
      tokenUsage: 270,
      complexityScore: 7,
    },
  },
  {
    id: 'geology-terminology',
    key: 'geology-terminology-precision',
    name: 'Geology Terminology Precision',
    shortDescription: 'Add geological concepts and earth science terminology.',
    longDescription:
      'Enhances the prompt with precise geological terminology, earth science concepts, rock formation analysis, plate tectonics principles, and geological survey methods.',
    systemPrompt:
      'You are a geology expert. Enhance the prompt with earth science terms.\n\nTerms:\n1. Igneous, Metamorphic, Sedimentary.\n2. Plate Tectonics and Fault lines.\n3. Mineralogy.',
    category: 'Geology',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'USGS' },
    tags: ['geology', 'earth-science', 'rocks'],
    complexity: 'high',
    experimental: false,
    exampleUsage: `Input: 'Look at the rock.' -> Output: 'Examine the sedimentary layers for fossil imprints and note the mineral composition to determine the depositional environment.'`,
    performance: {
      estimatedProcessingTime: 230,
      tokenUsage: 280,
      complexityScore: 8,
    },
  },
  {
    id: 'oceanography-context',
    key: 'oceanography-context-enhancement',
    name: 'Oceanography Context Enhancement',
    shortDescription: 'Add marine science and oceanographic research elements.',
    longDescription:
      'Enhances the prompt with marine science concepts, oceanographic research methods, marine ecosystem analysis, ocean current patterns, and underwater exploration.',
    systemPrompt:
      'You are an oceanography expert. Enhance the prompt with marine science.\n\nConcepts:\n1. Thermohaline circulation.\n2. Marine ecosystems (Coral reefs).\n3. Bathymetry.',
    category: 'Oceanography',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'WHOI' },
    tags: ['oceanography', 'marine', 'science'],
    complexity: 'expert',
    experimental: false,
    exampleUsage: `Input: 'Study the sea.' -> Output: 'Analyze the salinity and temperature data to track the movement of the Gulf Stream and its impact on local marine life.'`,
    performance: {
      estimatedProcessingTime: 240,
      tokenUsage: 300,
      complexityScore: 9,
    },
  },

  // --- Final Professional & Technical Enhancements ---
  {
    id: 'project-management',
    key: 'project-management-optimization',
    name: 'Project Management Optimization',
    shortDescription:
      'Add project management methodologies and delivery frameworks.',
    longDescription:
      'Enhances the prompt with project management methodologies (Agile, Waterfall, Scrum), delivery frameworks, risk management strategies, and project lifecycle planning.',
    systemPrompt:
      'You are a project management expert. Enhance the prompt with PM methodologies.\n\nMethodologies:\n1. Agile (Sprints, Stand-ups).\n2. Waterfall (Gantt charts, Phases).\n3. Risk Matrix.',
    category: 'Project',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'PMI' },
    tags: ['project-management', 'pmp', 'agile'],
    complexity: 'high',
    experimental: false,
    exampleUsage: `Input: 'Manage the project.' -> Output: 'Implement an Agile framework with 2-week sprints, daily stand-ups, and a Jira board for backlog tracking.'`,
    performance: {
      estimatedProcessingTime: 220,
      tokenUsage: 270,
      complexityScore: 7,
    },
  },
  {
    id: 'quality-assurance',
    key: 'quality-assurance-focus',
    name: 'Quality Assurance Focus',
    shortDescription: 'Add quality control standards and testing protocols.',
    longDescription:
      'Enhances the prompt with quality control standards, testing protocols, defect tracking methods, quality metrics, and continuous improvement principles.',
    systemPrompt:
      'You are a quality assurance expert. Enhance the prompt with QC standards.\n\nProtocols:\n1. Unit Testing, Integration Testing.\n2. Six Sigma (3.4 defects per million).\n3. QA Audits.',
    category: 'Quality',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'QA Team' },
    tags: ['qa', 'quality', 'testing'],
    complexity: 'medium',
    experimental: false,
    exampleUsage: `Input: 'Check the code.' -> Output: 'Execute the full test suite, including unit tests and end-to-end integration tests, and log any defects in Jira.'`,
    performance: {
      estimatedProcessingTime: 180,
      tokenUsage: 220,
      complexityScore: 5,
    },
  },
  {
    id: 'supply-chain',
    key: 'supply-chain-optimization',
    name: 'Supply Chain Optimization',
    shortDescription: 'Add logistics and supply chain management elements.',
    longDescription:
      'Enhances the prompt with logistics management, supply chain optimization strategies, inventory control methods, distribution planning, and procurement best practices.',
    systemPrompt:
      'You are a supply chain expert. Enhance the prompt with logistics.\n\nStrategies:\n1. Just-In-Time (JIT).\n2. Inventory turnover.\n3. Last-mile delivery optimization.',
    category: 'Chain',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'APICS' },
    tags: ['supply-chain', 'logistics', 'operations'],
    complexity: 'high',
    experimental: false,
    exampleUsage: `Input: 'Ship the goods.' -> Output: 'Optimize the shipping route to reduce transit time and implement JIT delivery to minimize warehousing costs.'`,
    performance: {
      estimatedProcessingTime: 210,
      tokenUsage: 260,
      complexityScore: 7,
    },
  },
  {
    id: 'human-resources',
    key: 'human-resources-enhancement',
    name: 'Human Resources Enhancement',
    shortDescription: 'Add HR policies and employee management strategies.',
    longDescription:
      'Enhances the prompt with HR policies development, employee management strategies, recruitment processes, performance evaluation systems, and workplace culture considerations.',
    systemPrompt:
      'You are a human resources expert. Enhance the prompt with HR strategies.\n\nPolicies:\n1. DEI (Diversity, Equity, Inclusion).\n2. Performance Reviews (360-degree).\n3. Employee Retention.',
    category: 'HR',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'SHRM' },
    tags: ['hr', 'human-resources', 'management'],
    complexity: 'medium',
    experimental: false,
    exampleUsage:
      "Input: 'Hire people.' -> Output: 'Launch a recruitment campaign focusing on DEI, utilizing LinkedIn and niche job boards to attract a diverse candidate pool.'",
    performance: {
      estimatedProcessingTime: 190,
      tokenUsage: 230,
      complexityScore: 5,
    },
  },
  {
    id: 'operations-excellence',
    key: 'operations-excellence-focus',
    name: 'Operations Excellence Focus',
    shortDescription:
      'Add operational efficiency and process improvement elements.',
    longDescription:
      'Enhances the prompt with operational efficiency strategies, process improvement methodologies, lean principles, continuous improvement frameworks, and operational excellence standards.',
    systemPrompt:
      'You are an operations excellence expert. Enhance the prompt with efficiency strategies.\n\nFrameworks:\n1. Lean (Eliminate Waste).\n2. Kaizen (Continuous Improvement).\n3. Six Sigma.',
    category: 'Operations',
    chainingEnabled: true,
    templateVariables: [],
    dependencies: [],
    metadata: { version: '1.0.0', author: 'Ops Team' },
    tags: ['operations', 'efficiency', 'lean'],
    complexity: 'high',
    experimental: false,
    exampleUsage:
      "Input: 'Fix the process.' -> Output: 'Map the current value stream to identify bottlenecks and apply Lean principles to eliminate non-value-added steps.'",
    performance: {
      estimatedProcessingTime: 220,
      tokenUsage: 270,
      complexityScore: 7,
    },
  },
];

export default enhancementTypes;
