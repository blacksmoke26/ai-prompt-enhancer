/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

/**
 * Represents a structured response with categorized values, often used for documentation or API response formatting.
 * Each category contains multiple values, each with metadata like description, parameters, and tone.
 * @example
 * {
 *   category: "exampleCategory",
 *   values: [
 *     {
 *       key: "exampleKey",
 *       label: "Example Label",
 *       shortDescription: "A brief summary.",
 *       summary: "A more detailed summary.",
 *       description: "Full description of the value.",
 *       parameters: { param1: "value1" },
 *       tags: ["tag1", "tag2"],
 *       tone: "neutral"
 *     }
 *   ]
 * }
 * @developerNotes
 * - Ensure `tone` uses one of the allowed enum values.
 * - Parameters should be validated for correctness in real-world usage.
 */
export interface ResponseLength {
  /** The category or group this response belongs to */
  category: string;
  /** An array of value objects, each representing a distinct item within the category */
  values: {
    key: string;
    /** The display name or title of this value */
    label: string;
    /** A brief, one-line summary of this value */
    shortDescription: string;
    /** A more detailed summary than `shortDescription`, but less than `description` */
    summary: string;
    /** A full explanation or detailed description of this value */
    description: string;
    /** A map of parameters associated with this value, where keys are parameter names and values are their corresponding values */
    parameters: Record<string, any>;
    /** An array of strings representing relevant tags or keywords for this value */
    tags: string[];
    /** The tone or style of the description, which can be one of: 'casual', 'formal', 'neutral', or 'technical' */
    tone: 'casual' | 'formal' | 'neutral' | 'technical';
  }[];
}

/**
 * Generates a JSON Schema representation of the `ResponseLength` interface.
 * Each property includes a description and an array of example values derived from the `RESPONSE_LENGTH_GROUPED` constant.
 * @returns {object} The JSON Schema object.
 */
export const getResponseLengthSchema = (): object => ({
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'ResponseLength',
  description: 'Represents a structured response with categorized values, often used for documentation or API response formatting.',
  type: 'object',
  properties: {
    category: {
      type: 'string',
      description: 'The category or group this response belongs to',
      examples: [
        'Original values',
        'Brevity-focused',
        'Expansion-focused',
        'Structured formats',
        'Context-aware lengths',
      ],
    },
    values: {
      type: 'array',
      description: 'An array of value objects, each representing a distinct item within the category',
      items: {
        type: 'object',
        properties: {
          key: {
            type: 'string',
            description: 'The unique identifier for the value',
            examples: ['short', 'medium', 'long', 'concise', 'detailed'],
          },
          label: {
            type: 'string',
            description: 'The display name or title of this value',
            examples: ['Short', 'Medium', 'Long', 'Concise', 'Detailed'],
          },
          shortDescription: {
            type: 'string',
            description: 'A brief, one-line summary of this value',
            examples: [
              'A very brief response containing only essential information.',
              'A balanced response with sufficient detail.',
              'An extended response with thorough explanations.',
            ],
          },
          summary: {
            type: 'string',
            description: 'A more detailed summary than `shortDescription`, but less than `description`',
            examples: [
              'Brief answer, minimal details provided.',
              'Balanced response, moderate detail included.',
              'Extended answer with full explanations.',
            ],
          },
          description: {
            type: 'string',
            description: 'A full explanation or detailed description of this value',
            examples: [
              'A very brief response containing only the essential information without unnecessary elaboration or filler content.',
              'A balanced response that provides sufficient detail to answer the question without being overly wordy or excessively brief.',
              'An extended response that explores the topic in detail, providing background information, examples, and thorough explanations.',
            ],
          },
          parameters: {
            type: 'object',
            description: 'A map of parameters associated with this value, where keys are parameter names and values are their corresponding values',
            examples: [
              { maxLength: 50, style: 'direct' },
              { targetLength: 150, density: 'standard' },
              { minLength: 300, depth: 'high' },
            ],
          },
          tags: {
            type: 'array',
            description: 'An array of strings representing relevant tags or keywords for this value',
            items: { type: 'string' },
            examples: [['brevity', 'essential', 'fast'], ['balanced', 'standard', 'default'], ['detailed', 'extensive', 'comprehensive']],
          },
          tone: {
            type: 'string',
            description: 'The tone or style of the description',
            enum: ['casual', 'formal', 'neutral', 'technical'],
            examples: ['neutral', 'casual', 'formal', 'technical'],
          },
        },
        required: ['key', 'label', 'shortDescription', 'summary', 'description', 'parameters', 'tags', 'tone'],
      },
    },
  },
  required: ['category', 'values'],
});

/**
 * A constant array of response length categories, where each category groups related values describing the expected length or format of a response.
 * This structure allows for organizing response length options into meaningful themes (e.g., brevity, expansion, or structured formats).
 * @example [
 *   {
 *     category: 'Original values',
 *     values: ['short', 'medium', 'long', 'concise', 'detailed']
 *   }
 * ]
 * @developerNotes Maintain consistency in category names and ensure that values are logically grouped to avoid ambiguity. Avoid overlapping values across categories.
 */
export const RESPONSE_LENGTH_GROUPED: ResponseLength[] = [
  {
    category: 'Original values',
    values: [
      {
        key: 'short',
        label: 'Short',
        shortDescription:
          'A very brief response containing only essential information.',
        summary: 'Brief answer, minimal details provided.',
        description:
          'A very brief response containing only the essential information without unnecessary elaboration or filler content.',
        parameters: { maxLength: 50, style: 'direct' },
        tags: ['brevity', 'essential', 'fast'],
        tone: 'neutral',
      },
      {
        key: 'medium',
        label: 'Medium',
        shortDescription: 'A balanced response with sufficient detail.',
        summary: 'Balanced response, moderate detail included.',
        description:
          'A balanced response that provides sufficient detail to answer the question without being overly wordy or excessively brief.',
        parameters: { targetLength: 150, density: 'standard' },
        tags: ['balanced', 'standard', 'default'],
        tone: 'neutral',
      },
      {
        key: 'long',
        label: 'Long',
        shortDescription: 'An extended response with thorough explanations.',
        summary: 'Extended answer with full explanations.',
        description:
          'An extended response that explores the topic in detail, providing background information, examples, and thorough explanations.',
        parameters: { minLength: 300, depth: 'high' },
        tags: ['detailed', 'extensive', 'comprehensive'],
        tone: 'neutral',
      },
      {
        key: 'concise',
        label: 'Concise',
        shortDescription: 'A clear and efficient core message.',
        summary: 'Clear and brief without extra words.',
        description:
          'A response that delivers the core message clearly and efficiently, removing any fluff while maintaining complete meaning.',
        parameters: { verbosity: 'low', clarity: 'high' },
        tags: ['efficient', 'clear', 'trimmed'],
        tone: 'neutral',
      },
      {
        key: 'detailed',
        label: 'Detailed',
        shortDescription: 'A comprehensive response with nuances and data.',
        summary: 'Thorough explanation with specific details.',
        description:
          'A comprehensive response that covers multiple facets of the topic, including nuances, specific data points, and extensive context.',
        parameters: { granularity: 'fine', scope: 'broad' },
        tags: ['granular', 'nuanced', 'specific'],
        tone: 'neutral',
      },
    ],
  },
  {
    category: 'Brevity-focused',
    values: [
      {
        key: 'brief',
        label: 'Brief',
        shortDescription: 'A short and direct answer.',
        summary: 'Very short, direct, and swift.',
        description:
          'A short and direct answer designed to convey the necessary information in the fewest possible words.',
        parameters: { strictness: 'max', words: 30 },
        tags: ['quick', 'fast', 'summary'],
        tone: 'neutral',
      },
      {
        key: 'succinct',
        label: 'Succinct',
        shortDescription: 'Compact and precisely expressed.',
        summary: 'Expressed clearly and in few words.',
        description:
          'A compact and precisely expressed response that is brief and to the point, often using strong vocabulary to save space.',
        parameters: { precision: 'high', tone: 'sharp' },
        tags: ['compact', 'precise', 'elegant'],
        tone: 'neutral',
      },
      {
        key: 'to-the-point',
        label: 'To-the-point',
        shortDescription: 'Directly addresses the query without fluff.',
        summary: 'Directly answers the specific question.',
        description:
          'A focused response that addresses the specific query directly, avoiding any tangential information or pleasantries.',
        parameters: { focus: 'laser', filter: 'no-fluff' },
        tags: ['direct', 'focused', 'relevant'],
        tone: 'neutral',
      },
      {
        key: 'minimal',
        label: 'Minimal',
        shortDescription: 'Contains only absolute critical data.',
        summary: 'Bare facts with absolutely no fluff.',
        description:
          'A bare-bones response containing only the absolute critical data points required to understand the concept.',
        parameters: { complexity: 'lowest', words: 15 },
        tags: ['sparse', 'basic', 'raw'],
        tone: 'neutral',
      },
      {
        key: 'one-liner',
        label: 'One-liner',
        shortDescription: 'A single sentence summary.',
        summary: 'Entire response in one sentence.',
        description:
          'A response constrained to a single sentence or line of text, summarizing the entire thought efficiently.',
        parameters: { maxLines: 1, structure: 'flat' },
        tags: ['single', 'sentence', 'witty'],
        tone: 'casual',
      },
      {
        key: 'tweet-length',
        label: 'Tweet Length',
        shortDescription: 'Limited to character count of a post.',
        summary: 'Short text fitting a social post.',
        description:
          'A response limited to the character count of a standard social media post, forcing brevity and wit.',
        parameters: { maxLength: 280, platform: 'social' },
        tags: ['social', 'micro', 'internet'],
        tone: 'casual',
      },
      {
        key: 'summary',
        label: 'Summary',
        shortDescription: 'Condensed version of main points.',
        summary: 'Highlights main points and takeaways.',
        description:
          'A condensed version of the information that captures the main points and key takeaways in a short format.',
        parameters: { type: 'abstract', compression: 'high' },
        tags: ['overview', 'recap', 'compressed'],
        tone: 'neutral',
      },
      {
        key: 'bullet-point',
        label: 'Bullet Point',
        shortDescription: 'List-based format for quick reading.',
        summary: 'Information presented in bullet points.',
        description:
          'A list-based format where information is broken down into short, scannable points for quick reading.',
        parameters: { format: 'list', style: 'unordered' },
        tags: ['list', 'scannable', 'chunks'],
        tone: 'neutral',
      },
      {
        key: 'telegraphic',
        label: 'Telegraphic',
        shortDescription: 'Omits auxiliary words like a telegram.',
        summary: 'Omits grammar words like headlines.',
        description:
          'A response style that omits articles and auxiliary words, mimicking the brevity of a telegram or headline.',
        parameters: { grammar: 'reduced', style: 'headline' },
        tags: ['abbreviated', 'headlines', 'robotic'],
        tone: 'neutral',
      },
    ],
  },
  {
    category: 'Expansion-focused',
    values: [
      {
        key: 'comprehensive',
        label: 'Comprehensive',
        shortDescription: 'All-encompassing coverage of the topic.',
        summary: 'Covers every aspect of the topic.',
        description:
          'An all-encompassing response that covers every aspect of the topic, ensuring nothing is left out or unexplained.',
        parameters: { scope: 'complete', breadth: 'max' },
        tags: ['complete', 'holistic', 'total'],
        tone: 'neutral',
      },
      {
        key: 'in-depth',
        label: 'In-depth',
        shortDescription: 'Deep analysis of underlying concepts.',
        summary: 'Deep analysis of underlying concepts.',
        description:
          'A response that goes beneath the surface level, analyzing underlying causes, mechanisms, and complex relationships within the topic.',
        parameters: { analysisLevel: 'deep', focus: 'root-cause' },
        tags: ['analytical', 'deep', 'profound'],
        tone: 'formal',
      },
      {
        key: 'thorough',
        label: 'Thorough',
        shortDescription: 'Meticulous detail considering all angles.',
        summary: 'Careful and complete with no gaps.',
        description:
          'A meticulous response that considers all details and angles, leaving no room for ambiguity or unanswered questions.',
        parameters: { attention: 'high', check: 'cross-reference' },
        tags: ['meticulous', 'careful', 'rigorous'],
        tone: 'formal',
      },
      {
        key: 'elaborate',
        label: 'Elaborate',
        shortDescription: 'Rich descriptions with detailed reasoning.',
        summary: 'Expands ideas with rich details.',
        description:
          'A response that expands on ideas with rich descriptions, examples, and detailed reasoning to fully flesh out concepts.',
        parameters: { expansionFactor: 2, verbosity: 'high' },
        tags: ['rich', 'decorative', 'expansive'],
        tone: 'formal',
      },
      {
        key: 'extensive',
        label: 'Extensive',
        shortDescription: 'Wide-ranging coverage of broad context.',
        summary: 'Wide scope covering many related areas.',
        description:
          'A wide-ranging response that covers a large amount of material, touching upon related topics and broad context.',
        parameters: { breadth: 'wide', volume: 'large' },
        tags: ['broad', 'sweeping', 'large'],
        tone: 'formal',
      },
      {
        key: 'exhaustive',
        label: 'Exhaustive',
        shortDescription: 'Attempts to list every possible detail.',
        summary: 'Lists every possible item and detail.',
        description:
          'A response that attempts to list every possible item, scenario, or detail related to the subject matter.',
        parameters: { limit: 'none', completion: '100%' },
        tags: ['complete', 'encyclopedic', 'thorough'],
        tone: 'formal',
      },
      {
        key: 'encyclopedic',
        label: 'Encyclopedic',
        shortDescription: 'Formal, factual reference style.',
        summary: 'Formal, factual, and reference-like style.',
        description:
          'A formal and factual response structured like a reference entry, providing objective and extensive knowledge.',
        parameters: { tone: 'academic', structure: 'reference' },
        tags: ['reference', 'academic', 'wiki'],
        tone: 'formal',
      },
      {
        key: 'full-length',
        label: 'Full-length',
        shortDescription: 'No artificial constraints on length.',
        summary: 'Natural length without cutting content.',
        description:
          'A response with no artificial constraints on length, allowing the content to develop naturally and completely.',
        parameters: { constraint: 'none', flow: 'natural' },
        tags: ['natural', 'unrestricted', 'full'],
        tone: 'neutral',
      },
      {
        key: 'essay-style',
        label: 'Essay Style',
        shortDescription: 'Cohesive narrative with intro and conclusion.',
        summary: 'Narrative essay with introduction and conclusion.',
        description:
          'A cohesive narrative response structured with an introduction, body paragraphs, and a conclusion on the topic.',
        parameters: { structure: 'essay', paragraphs: '5+' },
        tags: ['academic', 'narrative', 'structured'],
        tone: 'formal',
      },
      {
        key: 'report-quality',
        label: 'Report Quality',
        shortDescription: 'Professional structure for business/academic use.',
        summary: 'Formal report suitable for professionals.',
        description:
          'A highly professional and structured response suitable for formal business or academic reporting purposes.',
        parameters: { format: 'formal', audience: 'professional' },
        tags: ['business', 'professional', 'official'],
        tone: 'formal',
      },
    ],
  },
  {
    category: 'Structured formats',
    values: [
      {
        key: 'outline',
        label: 'Outline',
        shortDescription: 'Hierarchical skeleton of main points.',
        summary: 'Hierarchical list of main points.',
        description:
          'A hierarchical organization of the main points and sub-points, providing a structural skeleton of the content.',
        parameters: { structure: 'hierarchical', depth: 3 },
        tags: ['structure', 'hierarchy', 'skeleton'],
        tone: 'neutral',
      },
      {
        key: 'structured',
        label: 'Structured',
        shortDescription: 'Organized with headers and logical separation.',
        summary: 'Organized with clear headers and sections.',
        description:
          'A response that organizes information using headers, sections, and clear logical separation for better readability.',
        parameters: { formatting: 'markdown', layout: 'organized' },
        tags: ['organized', 'headers', 'readable'],
        tone: 'neutral',
      },
      {
        key: 'step-by-step',
        label: 'Step-by-Step',
        shortDescription: 'Sequential guide for a process.',
        summary: 'Follows a clear, sequential order.',
        description:
          'A sequential guide that breaks down a process into distinct, actionable instructions presented in order.',
        parameters: { sequence: 'ordered', flow: 'linear' },
        tags: ['guide', 'tutorial', 'ordered'],
        tone: 'neutral',
      },
      {
        key: 'numbered-list',
        label: 'Numbered List',
        shortDescription: 'Prioritized or ordered list of items.',
        summary: 'Items listed in numerical order.',
        description:
          'A prioritized or ordered list of items or actions, useful for ranking or sequential instructions.',
        parameters: { listType: 'numbered', priority: 'explicit' },
        tags: ['ordered', 'ranked', 'list'],
        tone: 'neutral',
      },
      {
        key: 'paragraph-form',
        label: 'Paragraph Form',
        shortDescription: 'Standard prose blocks for reading.',
        summary: 'Standard written paragraphs and sentences.',
        description:
          'A response written in standard prose blocks, suitable for continuous reading and narrative flow.',
        parameters: { format: 'prose', block: 'standard' },
        tags: ['prose', 'reading', 'text'],
        tone: 'neutral',
      },
      {
        key: 'narrative-form',
        label: 'Narrative Form',
        shortDescription: 'Story-like flow with conversational tone.',
        summary: 'Engaging story-like conversational flow.',
        description:
          'A story-like response that guides the reader through the information using a conversational or storytelling tone.',
        parameters: { tone: 'storytelling', voice: 'active' },
        tags: ['story', 'conversational', 'flow'],
        tone: 'casual',
      },
    ],
  },
  {
    category: 'Context-aware lengths',
    values: [
      {
        key: 'quick-reply',
        label: 'Quick Reply',
        shortDescription: 'Rapid informal response for instant messaging.',
        summary: 'Fast, informal, instant message reply.',
        description:
          'A rapid and informal response suitable for instant messaging or fast-paced communication channels.',
        parameters: { latency: 'low', formality: 'casual' },
        tags: ['instant', 'chat', 'fast'],
        tone: 'casual',
      },
      {
        key: 'chat-style',
        label: 'Chat Style',
        shortDescription: 'Conversational simulation with colloquialisms.',
        summary: 'Casual, chatty, and conversational tone.',
        description:
          'A conversational response that mimics human-to-human interaction, often using colloquialisms and casual grammar.',
        parameters: { persona: 'friend', medium: 'chat' },
        tags: ['colloquial', 'slang', 'human'],
        tone: 'casual',
      },
      {
        key: 'email-appropriate',
        label: 'Email Appropriate',
        shortDescription: 'Formatted with subject and greeting.',
        summary: 'Formatted as a professional email.',
        description:
          'A response formatted with a subject line and greeting, tailored for professional or personal email correspondence.',
        parameters: { medium: 'email', salutation: true },
        tags: ['correspondence', 'business', 'letter'],
        tone: 'formal',
      },
      {
        key: 'document-ready',
        label: 'Document Ready',
        shortDescription: 'Polished text ready for direct copying.',
        summary: 'Polished text ready for documents.',
        description:
          'A polished and formatted response that can be directly copied into a formal document without editing.',
        parameters: { polish: 'high', formatting: 'final' },
        tags: ['final', 'clean', 'copy-paste'],
        tone: 'formal',
      },
      {
        key: 'presentation-summary',
        label: 'Presentation Summary',
        shortDescription: 'High-level overview for slides.',
        summary: 'Short points for slide presentation.',
        description:
          'A high-level overview designed to be spoken or displayed on slides, focusing on key messages.',
        parameters: { medium: 'slide', density: 'visual' },
        tags: ['slides', 'powerpoint', 'visuals'],
        tone: 'formal',
      },
      {
        key: 'technical-spec',
        label: 'Technical Spec',
        shortDescription: 'Precise data-driven technical details.',
        summary: 'Focuses on technical specs and data.',
        description:
          'A highly precise and data-driven response focusing on technical details, constraints, and specifications.',
        parameters: { domain: 'technical', jargon: 'high' },
        tags: ['engineering', 'specs', 'data'],
        tone: 'technical',
      },
      {
        key: 'executive-summary',
        label: 'Executive Summary',
        shortDescription: 'Concise overview for busy stakeholders.',
        summary: 'High-level summary for busy leaders.',
        description:
          'A concise overview of the main points intended for busy stakeholders who need the bottom line quickly.',
        parameters: { audience: 'executive', filter: 'high-impact' },
        tags: ['business', 'overview', 'leadership'],
        tone: 'formal',
      },
      {
        key: 'tldr',
        label: 'TL;DR',
        shortDescription: 'Summary for those with no time.',
        summary: 'Summary for those with no time.',
        description:
          'A "Too Long; Didn\'t Read" section at the end or beginning, summarizing the entire concept in one sentence.',
        parameters: { placement: 'top', length: 'minimal' },
        tags: ['summary', 'internet', 'short'],
        tone: 'casual',
      },
      {
        key: 'expandable-preview',
        label: 'Expandable Preview',
        shortDescription: 'Short headline with hidden details.',
        summary: 'Short intro with hidden details.',
        description:
          'A short headline or snippet followed by a detailed breakdown that can be expanded upon request.',
        parameters: { interaction: 'expandable', default: 'hidden' },
        tags: ['ui', 'interactive', 'preview'],
        tone: 'neutral',
      },
    ],
  },
];

/**
 * A flattened array containing all response length values from the `RESPONSE_LENGTH_GROUPED` structure.
 * This array is derived by combining all `values` from each group, providing a single list of possible response length options.
 * @example ["short", "medium", "long", "concise", "detailed", "brief", "succinct", ...]
 * @developerNotes This array is automatically generated from `RESPONSE_LENGTH_GROUPED` and should not be manually edited. Ensure consistency in the grouped data to maintain accuracy here.
 */
export const RESPONSE_LENGTH = [
  ...new Set(
    RESPONSE_LENGTH_GROUPED.reduce((acc: string[], group) => {
      acc.push(...group.values.map(x => x.key));
      return acc;
    }, []),
  ),
];
