/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

/**
 * Represents a configurable enhancement type with metadata and categorization.
 *
 * This interface defines the structure for enhancements that can be applied to systems,
 * AI models, or other configurable entities. It includes a unique identifier, name,
 * description, system-specific prompt, and category for organization.
 */
export interface EnhancementType {
  /**  A unique identifier for the enhancement. This is typically
   * used for referencing the enhancement in systems, APIs, or databases. It should be
   * immutable and globally unique across all enhancement definitions. */
  id: string;
  /** The human-readable name of the enhancement. This is used
   * for display purposes in UIs, documentation, or configuration interfaces. */
  name: string;
  /**  A detailed description of the enhancement's purpose,
   * functionality, and use cases. This provides context for developers or users
   * understanding what the enhancement does. */
  description: string;
  /** A prompt or instruction that defines how the
   * enhancement should behave within a system. This is often used in AI or
   * automation contexts to guide the behavior of the enhancement. */
  systemPrompt: string;
  /** A string that categorizes the enhancement. This is
   * used for grouping related enhancements, such as "AI", "UI", "Performance", etc.
   * Categories help in organizing enhancements for easier management and filtering. */
  category: string;
}

/**
 * Available enhancement types with their descriptions and system prompts
 * @developer-notes These enhancement types define different prompt modification strategies
 * that users can select to improve their prompts. Each type has a specific system prompt
 * that guides the AI to focus on particular aspects of prompt engineering such as
 * grammar correction, creativity, technical precision, and more.
 */
const enhancementTypes: EnhancementType[] = [
  {
    id: 'correct',
    name: 'Correct Grammar & Spelling',
    description: 'Fix grammatical errors, spelling mistakes, and improve clarity',
    systemPrompt: 'You are a grammar and spelling expert. Correct any grammatical errors, spelling mistakes, and improve the clarity of the given prompt while preserving the original intent.',
    category: 'Language'
  },
  {
    id: 'enhance',
    name: 'Enhance & Expand',
    description: 'Make the prompt more detailed, specific, and effective',
    systemPrompt: 'You are a prompt engineering expert. Enhance the given prompt by adding relevant details, making it more specific, and improving its effectiveness while maintaining the core intent.',
    category: 'Writing'
  },
  {
    id: 'proofread',
    name: 'Proofread & Refine',
    description: 'Review and refine the prompt for better results',
    systemPrompt: 'You are a professional proofreader. Review and refine the given prompt to make it more effective, clear, and likely to produce high-quality results.',
    category: 'Writing'
  },
  {
    id: 'optimize',
    name: 'Optimize for AI',
    description: 'Optimize the prompt specifically for AI models',
    systemPrompt: 'You are an AI prompt optimization specialist. Optimize the given prompt to work best with AI models, adding structure, context, and clarity as needed.',
    category: 'Technical'
  },
  {
    id: 'creative',
    name: 'Creative Enhancement',
    description: 'Add creative elements and imaginative details',
    systemPrompt: 'You are a creative writing expert. Enhance the given prompt with creative elements, vivid descriptions, and imaginative details while preserving the core request.',
    category: 'Creative'
  },
  {
    id: 'technical',
    name: 'Technical Precision',
    description: 'Add technical details and precise specifications',
    systemPrompt: 'You are a technical expert. Enhance the given prompt with precise technical details, specifications, and domain-specific terminology to improve accuracy.',
    category: 'Technical'
  },
  {
    id: 'concise',
    name: 'Make Concise',
    description: 'Remove unnecessary words and improve efficiency',
    systemPrompt: 'You are an expert in clear communication. Make the given prompt more concise by removing unnecessary words, improving structure, and enhancing efficiency while maintaining all essential information.',
    category: 'Writing'
  },
  {
    id: 'structured',
    name: 'Add Structure',
    description: 'Organize the prompt with clear sections and formatting',
    systemPrompt: 'You are an expert in structured communication. Reorganize the given prompt with clear sections, bullet points, and formatting to improve readability and effectiveness.',
    category: 'Writing'
  },
  {
    id: 'empathize',
    name: 'Add Empathy',
    description: 'Enhance with emotional intelligence and human connection',
    systemPrompt: 'You are an emotional intelligence expert. Enhance the given prompt with empathetic language, emotional awareness, and human-centered communication.',
    category: 'Personal'
  },
  {
    id: 'persuasive',
    name: 'Make Persuasive',
    description: 'Add persuasive elements and rhetorical techniques',
    systemPrompt: 'You are a persuasion expert. Enhance the given prompt with rhetorical devices, persuasive techniques, and compelling arguments.',
    category: 'Business'
  },
  {
    id: 'formal',
    name: 'Formal Tone',
    description: 'Convert to formal and professional language',
    systemPrompt: 'You are an expert in formal communication. Convert the given prompt to use professional language, proper etiquette, and formal tone.',
    category: 'Tone'
  },
  {
    id: 'casual',
    name: 'Casual Tone',
    description: 'Make the prompt more conversational and friendly',
    systemPrompt: 'You are an expert in casual communication. Make the given prompt more conversational, friendly, and approachable while maintaining clarity.',
    category: 'Tone'
  },
  {
    id: 'multilingual',
    name: 'Multilingual Support',
    description: 'Enhance for multiple language contexts',
    systemPrompt: 'You are a multilingual communication expert. Enhance the given prompt to be culturally sensitive and effective across multiple languages.',
    category: 'Language'
  },
  {
    id: 'visual',
    name: 'Visual Elements',
    description: 'Add visual descriptions and imagery',
    systemPrompt: 'You are a visual storytelling expert. Enhance the given prompt with vivid visual descriptions, imagery, and sensory details.',
    category: 'Creative'
  },
  {
    id: 'action',
    name: 'Action-Oriented',
    description: 'Focus on clear actions and outcomes',
    systemPrompt: 'You are an expert in action-oriented communication. Enhance the given prompt to focus on specific actions, outcomes, and measurable results.',
    category: 'Business'
  },
  {
    id: 'question',
    name: 'Question-Based',
    description: 'Convert to probing questions and inquiries',
    systemPrompt: 'You are an expert in Socratic questioning. Convert the given prompt into thoughtful, probing questions that encourage deeper thinking.',
    category: 'Educational'
  },
  {
    id: 'story',
    name: 'Storytelling',
    description: 'Transform into narrative format',
    systemPrompt: 'You are a master storyteller. Transform the given prompt into a compelling narrative with story structure, characters, and plot elements.',
    category: 'Creative'
  },
  {
    id: 'data',
    name: 'Data-Driven',
    description: 'Add data and analytical perspective',
    systemPrompt: 'You are a data analysis expert. Enhance the given prompt with data-driven insights, analytical thinking, and evidence-based reasoning.',
    category: 'Technical'
  },
  {
    id: 'ethical',
    name: 'Ethical Framework',
    description: 'Add ethical considerations and values',
    systemPrompt: 'You are an ethics expert. Enhance the given prompt with ethical considerations, moral frameworks, and responsible guidance.',
    category: 'Professional'
  },
  {
    id: 'accessible',
    name: 'Accessibility Focus',
    description: 'Make content accessible to all users',
    systemPrompt: 'You are an accessibility expert. Enhance the given prompt to be inclusive, accessible, and considerate of all users\' needs.',
    category: 'Professional'
  },
  {
    id: 'step',
    name: 'Step-by-Step',
    description: 'Break down into sequential steps',
    systemPrompt: 'You are an expert in instructional design. Break down the given prompt into clear, sequential steps with logical progression.',
    category: 'Educational'
  },
  {
    id: 'example',
    name: 'Add Examples',
    description: 'Include relevant examples and illustrations',
    systemPrompt: 'You are an expert in educational examples. Enhance the given prompt with relevant examples, case studies, and illustrative scenarios.',
    category: 'Educational'
  },
  {
    id: 'compare',
    name: 'Comparison Focus',
    description: 'Add comparative elements and alternatives',
    systemPrompt: 'You are an expert in comparative analysis. Enhance the given prompt with comparisons, alternatives, and different perspectives.',
    category: 'Analytical'
  },
  {
    id: 'future',
    name: 'Future-Oriented',
    description: 'Add forward-thinking and visionary elements',
    systemPrompt: 'You are a strategic futurist. Enhance the given prompt with forward-thinking, visionary elements, and future considerations.',
    category: 'Strategic'
  },
  {
    id: 'historical',
    name: 'Historical Context',
    description: 'Add historical perspective and context',
    systemPrompt: 'You are a historical expert. Enhance the given prompt with historical context, relevant precedents, and temporal perspective.',
    category: 'Research'
  },
  {
    id: 'scientific',
    name: 'Scientific Method',
    description: 'Apply scientific thinking and methodology',
    systemPrompt: 'You are a scientific method expert. Enhance the given prompt with scientific thinking, methodology, and evidence-based approaches.',
    category: 'Research'
  },
  {
    id: 'philosophical',
    name: 'Philosophical Depth',
    description: 'Add philosophical inquiry and deeper meaning',
    systemPrompt: 'You are a philosophy expert. Enhance the given prompt with philosophical inquiry, deep questions, and meaningful reflections.',
    category: 'Research'
  },
  {
    id: 'humorous',
    name: 'Add Humor',
    description: 'Inject appropriate humor and wit',
    systemPrompt: 'You are a humor expert. Enhance the given prompt with appropriate humor, wit, and levity while maintaining professionalism.',
    category: 'Tone'
  },
  {
    id: 'motivational',
    name: 'Motivational Tone',
    description: 'Add inspiring and motivating elements',
    systemPrompt: 'You are a motivational expert. Enhance the given prompt with inspiring language, motivational elements, and encouragement.',
    category: 'Personal'
  },
  {
    id: 'debug',
    name: 'Debug & Troubleshoot',
    description: 'Add debugging and problem-solving focus',
    systemPrompt: 'You are a debugging expert. Enhance the given prompt with troubleshooting steps, problem-solving frameworks, and debugging techniques.',
    category: 'Technical'
  },
  {
    id: 'security',
    name: 'Security Focus',
    description: 'Add security and privacy considerations',
    systemPrompt: 'You are a security expert. Enhance the given prompt with security considerations, privacy best practices, and protective measures.',
    category: 'Technical'
  },
  {
    id: 'performance',
    name: 'Performance Optimization',
    description: 'Focus on efficiency and performance',
    systemPrompt: 'You are a performance optimization expert. Enhance the given prompt with performance considerations, efficiency metrics, and optimization strategies.',
    category: 'Technical'
  },
  {
    id: 'scalable',
    name: 'Scalability Focus',
    description: 'Add scalability and growth considerations',
    systemPrompt: 'You are a scalability expert. Enhance the given prompt with scalability considerations, growth strategies, and flexible design principles.',
    category: 'Technical'
  },
  {
    id: 'simplify',
    name: 'Simplify Complex Concepts',
    description: 'Break down complex ideas into simple terms',
    systemPrompt: 'You are an expert in simplification. Transform complex concepts into clear, simple, and easy-to-understand language while preserving accuracy.',
    category: 'Writing'
  },
  {
    id: 'emoji',
    name: 'Add Emojis',
    description: 'Enhance with appropriate emojis and visual cues',
    systemPrompt: 'You are an expert in digital communication. Enhance the prompt with appropriate emojis and visual elements that improve engagement and clarity.',
    category: 'Tone'
  },
  {
    id: 'metaphor',
    name: 'Add Metaphors',
    description: 'Include metaphors and analogies for better understanding',
    systemPrompt: 'You are an expert in metaphorical thinking. Enhance the prompt with relevant metaphors and analogies that make complex concepts easier to understand.',
    category: 'Writing'
  },
  {
    id: 'time',
    name: 'Time-Sensitive',
    description: 'Add urgency and time-based elements',
    systemPrompt: 'You are an expert in time management. Enhance the prompt with time-sensitive elements, deadlines, and temporal context to create urgency.',
    category: 'Business'
  },
  {
    id: 'cultural',
    name: 'Cultural Context',
    description: 'Add cultural awareness and global perspective',
    systemPrompt: 'You are a cultural expert. Enhance the prompt with cultural sensitivity, global perspectives, and cross-cultural understanding.',
    category: 'Personal'
  },
  {
    id: 'interactive',
    name: 'Make Interactive',
    description: 'Add interactive elements and engagement prompts',
    systemPrompt: 'You are an expert in interactive design. Transform the prompt to include interactive elements, engagement prompts, and participatory features.',
    category: 'Writing'
  },
  {
    id: 'local',
    name: 'Localize Content',
    description: 'Adapt content for local context and relevance',
    systemPrompt: 'You are a localization expert. Adapt the prompt to include local context, regional references, and culturally appropriate elements.',
    category: 'Language'
  },
  {
    id: 'emoji-free',
    name: 'Remove Emojis',
    description: 'Clean up text by removing emojis and symbols',
    systemPrompt: 'You are an expert in formal communication. Remove emojis, excessive symbols, and informal elements to create cleaner, more professional text.',
    category: 'Writing'
  },
  {
    id: 'universal',
    name: 'Universal Design',
    description: 'Make content universally accessible and clear',
    systemPrompt: 'You are a universal design expert. Enhance the prompt to be universally accessible, culturally neutral, and clear to diverse audiences.',
    category: 'Professional'
  },
  {
    id: 'trendy',
    name: 'Add Trendy Elements',
    description: 'Incorporate current trends and popular references',
    systemPrompt: 'You are a trend expert. Enhance the prompt with current trends, popular references, and contemporary language that resonates with modern audiences.',
    category: 'Tone'
  },
  {
    id: 'retro',
    name: 'Vintage Style',
    description: 'Add vintage or retro elements to the prompt',
    systemPrompt: 'You are an expert in vintage styles. Transform the prompt with retro language, classic references, and nostalgic elements.',
    category: 'Tone'
  },
  {
    id: 'minimal',
    name: 'Minimalist Approach',
    description: 'Strip down to essential elements only',
    systemPrompt: 'You are a minimalism expert. Reduce the prompt to its essential elements, removing all non-critical information while maintaining clarity.',
    category: 'Writing'
  },
];

export default enhancementTypes;
