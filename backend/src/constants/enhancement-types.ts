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
  /** Whether the enhancement type is hidden from the user */
  hidden?: boolean;
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
  // Legal & Compliance
  {
    id: 'legal-compliance',
    name: 'Legal Compliance Review',
    description: 'Ensure prompt meets legal standards and regulatory requirements',
    systemPrompt: 'You are a legal compliance expert. Review and enhance the prompt to ensure it meets all relevant legal standards, regulatory requirements, and compliance guidelines while maintaining its purpose.',
    category: 'Legal'
  },
  {
    id: 'contract-language',
    name: 'Contract Language Enhancement',
    description: 'Optimize for legal contract precision and clarity',
    systemPrompt: 'You are a contract law expert. Enhance the prompt with precise legal terminology, clear obligations, and legally sound structure for contract-related contexts.',
    category: 'Legal'
  },
  {
    id: 'privacy-focused',
    name: 'Privacy Protection Focus',
    description: 'Add privacy considerations and data protection elements',
    systemPrompt: 'You are a privacy law expert. Enhance the prompt with strong privacy protections, data minimization principles, and GDPR/CCPA compliance considerations.',
    category: 'Legal'
  },
  {
    id: 'terms-optimization',
    name: 'Terms of Service Optimization',
    description: 'Enhance for terms of service and policy documents',
    systemPrompt: 'You are a terms of service expert. Optimize the prompt for clarity, enforceability, and user understanding in terms of service and policy documents.',
    category: 'Legal'
  },
  {
    id: 'disclaimer-addition',
    name: 'Add Legal Disclaimers',
    description: 'Include appropriate legal disclaimers and limitations',
    systemPrompt: 'You are a legal disclaimer specialist. Add appropriate legal disclaimers, limitations of liability, and risk disclosures to the prompt where necessary.',
    category: 'Legal'
  },

  // Medical & Healthcare
  {
    id: 'medical-terminology',
    name: 'Medical Terminology Precision',
    description: 'Enhance with accurate medical terminology and clinical precision',
    systemPrompt: 'You are a medical terminology expert. Enhance the prompt with precise medical terminology, clinical accuracy, and healthcare-specific language while maintaining clarity.',
    category: 'Medical'
  },
  {
    id: 'patient-communication',
    name: 'Patient-Friendly Communication',
    description: 'Make medical content accessible to patients',
    systemPrompt: 'You are a patient communication specialist. Transform medical jargon into clear, empathetic, and understandable language for patient audiences.',
    category: 'Medical'
  },
  {
    id: 'clinical-documentation',
    name: 'Clinical Documentation Enhancement',
    description: 'Optimize for medical records and clinical notes',
    systemPrompt: 'You are a clinical documentation expert. Enhance the prompt for accuracy, completeness, and professional standards in medical record keeping and clinical documentation.',
    category: 'Medical'
  },
  {
    id: 'health-literacy',
    name: 'Health Literacy Focus',
    description: 'Improve understanding for diverse health literacy levels',
    systemPrompt: 'You are a health literacy expert. Enhance the prompt to be understandable across different health literacy levels, using plain language principles and visual aids where appropriate.',
    category: 'Medical'
  },
  {
    id: 'medical-research',
    name: 'Medical Research Optimization',
    description: 'Enhance for medical research papers and studies',
    systemPrompt: 'You are a medical research methodology expert. Optimize the prompt for scientific rigor, research methodology clarity, and academic standards in medical research contexts.',
    category: 'Medical'
  },

  // Financial & Economic
  {
    id: 'financial-precision',
    name: 'Financial Terminology Precision',
    description: 'Add precise financial and economic terminology',
    systemPrompt: 'You are a financial terminology expert. Enhance the prompt with accurate financial terminology, economic concepts, and industry-specific financial language.',
    category: 'Financial'
  },
  {
    id: 'investment-analysis',
    name: 'Investment Analysis Enhancement',
    description: 'Optimize for investment research and analysis',
    systemPrompt: 'You are an investment analysis expert. Enhance the prompt with investment research frameworks, risk assessment considerations, and portfolio optimization principles.',
    category: 'Financial'
  },
  {
    id: 'budget-planning',
    name: 'Budget Planning Optimization',
    description: 'Enhance for budget creation and financial planning',
    systemPrompt: 'You are a financial planning expert. Optimize the prompt for budget creation, expense tracking, financial forecasting, and money management strategies.',
    category: 'Financial'
  },
  {
    id: 'economic-forecasting',
    name: 'Economic Forecasting Enhancement',
    description: 'Add economic analysis and forecasting elements',
    systemPrompt: 'You are an economic forecasting expert. Enhance the prompt with economic indicators, trend analysis, forecasting methodologies, and macroeconomic context.',
    category: 'Financial'
  },
  {
    id: 'risk-assessment',
    name: 'Risk Assessment Enhancement',
    description: 'Add comprehensive risk analysis and mitigation',
    systemPrompt: 'You are a risk management expert. Enhance the prompt with thorough risk assessment frameworks, mitigation strategies, and contingency planning considerations.',
    category: 'Financial'
  },

  // Environmental & Sustainability
  {
    id: 'sustainability-focus',
    name: 'Sustainability Focus',
    description: 'Add environmental sustainability and eco-friendly elements',
    systemPrompt: 'You are a sustainability expert. Enhance the prompt with environmental sustainability principles, eco-friendly practices, and green initiatives.',
    category: 'Environmental'
  },
  {
    id: 'environmental-impact',
    name: 'Environmental Impact Assessment',
    description: 'Add environmental impact analysis and considerations',
    systemPrompt: 'You are an environmental impact assessment expert. Enhance the prompt with environmental impact analysis, carbon footprint considerations, and ecological consequences.',
    category: 'Environmental'
  },
  {
    id: 'green-technology',
    name: 'Green Technology Enhancement',
    description: 'Focus on renewable energy and sustainable technology',
    systemPrompt: 'You are a green technology expert. Enhance the prompt with renewable energy concepts, sustainable technology solutions, and environmental innovation principles.',
    category: 'Environmental'
  },
  {
    id: 'climate-context',
    name: 'Climate Change Context',
    description: 'Add climate change awareness and adaptation strategies',
    systemPrompt: 'You are a climate change expert. Enhance the prompt with climate change context, adaptation strategies, mitigation approaches, and climate resilience considerations.',
    category: 'Environmental'
  },
  {
    id: 'eco-friendly-language',
    name: 'Eco-Friendly Language',
    description: 'Use environmentally conscious and sustainable terminology',
    systemPrompt: 'You are an environmental communication expert. Transform the prompt to use eco-friendly language, sustainable terminology, and environmentally conscious expressions.',
    category: 'Environmental'
  },

  // Artistic & Creative (Expanded)
  {
    id: 'poetic-enhancement',
    name: 'Poetic Enhancement',
    description: 'Transform into poetic form with rhythm and meter',
    systemPrompt: 'You are a poetry expert. Transform the prompt into poetic form with appropriate rhythm, meter, rhyme schemes, and poetic devices while preserving meaning.',
    category: 'Artistic'
  },
  {
    id: 'musical-composition',
    name: 'Musical Composition Focus',
    description: 'Enhance for music creation and composition',
    systemPrompt: 'You are a musical composition expert. Enhance the prompt with musical terminology, composition techniques, instrumentation details, and harmonic structures.',
    category: 'Artistic'
  },
  {
    id: 'visual-art-description',
    name: 'Visual Art Description Enhancement',
    description: 'Add detailed art description and visual elements',
    systemPrompt: 'You are a visual art expert. Enhance the prompt with detailed art descriptions, visual composition elements, color theory, and artistic techniques.',
    category: 'Artistic'
  },
  {
    id: 'dance-choreography',
    name: 'Dance Choreography Enhancement',
    description: 'Focus on dance movements and choreographic elements',
    systemPrompt: 'You are a dance choreography expert. Enhance the prompt with dance movement descriptions, choreographic structures, rhythm patterns, and performance elements.',
    category: 'Artistic'
  },
  {
    id: 'cinematic-storytelling',
    name: 'Cinematic Storytelling',
    description: 'Transform into film script and cinematic narrative',
    systemPrompt: 'You are a cinematic storytelling expert. Transform the prompt into film script format with scene descriptions, camera directions, dialogue, and cinematic techniques.',
    category: 'Artistic'
  },

  // Gaming & Entertainment
  {
    id: 'game-narrative',
    name: 'Game Narrative Enhancement',
    description: 'Optimize for video game storytelling and narrative design',
    systemPrompt: 'You are a game narrative designer. Enhance the prompt for video game storytelling, character development, world-building, and interactive narrative elements.',
    category: 'Gaming'
  },
  {
    id: 'character-development',
    name: 'Character Development Focus',
    description: 'Add deep character development and personality traits',
    systemPrompt: 'You are a character development expert. Enhance the prompt with detailed character backgrounds, personality traits, motivations, and character arcs.',
    category: 'Gaming'
  },
  {
    id: 'world-building',
    name: 'World-Building Optimization',
    description: 'Create rich fictional worlds and settings',
    systemPrompt: 'You are a world-building expert. Enhance the prompt with detailed world-building elements including geography, culture, history, politics, and unique world mechanics.',
    category: 'Gaming'
  },
  {
    id: 'interactive-fiction',
    name: 'Interactive Fiction Enhancement',
    description: 'Optimize for choose-your-own-adventure style narratives',
    systemPrompt: 'You are an interactive fiction expert. Transform the prompt into interactive fiction format with branching paths, player choices, and consequence systems.',
    category: 'Gaming'
  },
  {
    id: 'game-mechanics',
    name: 'Game Mechanics Description',
    description: 'Add detailed game mechanics and system descriptions',
    systemPrompt: 'You are a game mechanics expert. Enhance the prompt with detailed game mechanics descriptions, rule systems, gameplay loops, and balance considerations.',
    category: 'Gaming'
  },

  // Sports & Fitness
  {
    id: 'sports-analytics',
    name: 'Sports Analytics Enhancement',
    description: 'Add sports statistics and performance analysis',
    systemPrompt: 'You are a sports analytics expert. Enhance the prompt with sports statistics, performance metrics, data analysis, and athletic performance insights.',
    category: 'Sports'
  },
  {
    id: 'training-program',
    name: 'Training Program Optimization',
    description: 'Enhance for fitness training programs and workout plans',
    systemPrompt: 'You are a fitness training expert. Optimize the prompt for workout programs, exercise routines, training schedules, and fitness progression plans.',
    category: 'Sports'
  },
  {
    id: 'athletic-performance',
    name: 'Athletic Performance Focus',
    description: 'Add athletic performance optimization strategies',
    systemPrompt: 'You are an athletic performance coach. Enhance the prompt with performance optimization strategies, technique improvements, and athletic development principles.',
    category: 'Sports'
  },
  {
    id: 'sports-commentary',
    name: 'Sports Commentary Enhancement',
    description: 'Optimize for live sports commentary and analysis',
    systemPrompt: 'You are a sports commentator. Enhance the prompt for live sports commentary, game analysis, player insights, and engaging sports broadcasting language.',
    category: 'Sports'
  },
  {
    id: 'fitness-motivation',
    name: 'Fitness Motivation Enhancement',
    description: 'Add motivational elements for fitness and wellness',
    systemPrompt: 'You are a fitness motivation expert. Enhance the prompt with motivational language, goal-setting strategies, and inspirational fitness messaging.',
    category: 'Sports'
  },

  // Travel & Tourism
  {
    id: 'travel-itinerary',
    name: 'Travel Itinerary Enhancement',
    description: 'Optimize for detailed travel planning and itineraries',
    systemPrompt: 'You are a travel planning expert. Enhance the prompt for comprehensive travel itineraries, daily schedules, activity planning, and travel logistics.',
    category: 'Travel'
  },
  {
    id: 'destination-description',
    name: 'Destination Description Optimization',
    description: 'Create vivid and engaging destination descriptions',
    systemPrompt: 'You are a travel writer. Enhance the prompt with vivid destination descriptions, cultural insights, local attractions, and sensory travel experiences.',
    category: 'Travel'
  },
  {
    id: 'cultural-travel',
    name: 'Cultural Travel Context',
    description: 'Add cultural sensitivity and local customs awareness',
    systemPrompt: 'You are a cultural travel expert. Enhance the prompt with cultural context, local customs, etiquette guidelines, and cross-cultural travel considerations.',
    category: 'Travel'
  },
  {
    id: 'adventure-travel',
    name: 'Adventure Travel Enhancement',
    description: 'Focus on adventure and experiential travel elements',
    systemPrompt: 'You are an adventure travel expert. Enhance the prompt with adventure travel elements, outdoor activities, risk considerations, and experiential travel planning.',
    category: 'Travel'
  },
  {
    id: 'luxury-travel',
    name: 'Luxury Travel Focus',
    description: 'Add luxury travel and premium experience elements',
    systemPrompt: 'You are a luxury travel consultant. Enhance the prompt with luxury travel elements, premium accommodations, exclusive experiences, and high-end travel services.',
    category: 'Travel'
  },

  // Food & Culinary
  {
    id: 'recipe-enhancement',
    name: 'Recipe Enhancement',
    description: 'Optimize for cooking recipes and food preparation',
    systemPrompt: 'You are a culinary expert. Enhance the prompt for detailed recipes, cooking techniques, ingredient measurements, and step-by-step food preparation instructions.',
    category: 'Culinary'
  },
  {
    id: 'food-description',
    name: 'Food Description Optimization',
    description: 'Create vivid and appetizing food descriptions',
    systemPrompt: 'You are a food writer. Enhance the prompt with vivid food descriptions, sensory details, flavor profiles, and appetizing culinary language.',
    category: 'Culinary'
  },
  {
    id: 'restaurant-review',
    name: 'Restaurant Review Enhancement',
    description: 'Optimize for restaurant reviews and food criticism',
    systemPrompt: 'You are a restaurant critic. Enhance the prompt for professional restaurant reviews, food criticism, service evaluation, and dining experience analysis.',
    category: 'Culinary'
  },
  {
    id: 'culinary-techniques',
    name: 'Culinary Technique Focus',
    description: 'Add detailed cooking methods and techniques',
    systemPrompt: 'You are a culinary techniques expert. Enhance the prompt with detailed cooking methods, professional techniques, kitchen equipment usage, and culinary best practices.',
    category: 'Culinary'
  },
  {
    id: 'food-pairing',
    name: 'Food Pairing Suggestions',
    description: 'Add complementary food and beverage pairing recommendations',
    systemPrompt: 'You are a food pairing expert. Enhance the prompt with complementary food pairings, beverage recommendations, flavor combinations, and pairing principles.',
    category: 'Culinary'
  },

  // Academic & Scholarly
  {
    id: 'academic-writing',
    name: 'Academic Writing Enhancement',
    description: 'Optimize for scholarly papers and academic publications',
    systemPrompt: 'You are an academic writing expert. Enhance the prompt for scholarly writing standards, academic tone, formal structure, and publication-ready content.',
    category: 'Academic'
  },
  {
    id: 'research-methodology',
    name: 'Research Methodology Focus',
    description: 'Add detailed research methods and academic rigor',
    systemPrompt: 'You are a research methodology expert. Enhance the prompt with rigorous research methods, data collection techniques, analysis frameworks, and academic validation.',
    category: 'Academic'
  },
  {
    id: 'citation-style',
    name: 'Citation Style Optimization',
    description: 'Ensure proper academic citations and references',
    systemPrompt: 'You are a citation style expert. Enhance the prompt with proper academic citations, reference formatting, and citation style compliance (APA, MLA, Chicago, etc.).',
    category: 'Academic'
  },
  {
    id: 'peer-review',
    name: 'Peer Review Preparation',
    description: 'Prepare content for academic peer review process',
    systemPrompt: 'You are a peer review expert. Enhance the prompt to meet peer review standards, addressing potential reviewer concerns, methodological rigor, and scholarly contribution.',
    category: 'Academic'
  },
  {
    id: 'thesis-statement',
    name: 'Thesis Statement Enhancement',
    description: 'Strengthen thesis statements and academic arguments',
    systemPrompt: 'You are a thesis development expert. Enhance the prompt with strong thesis statements, clear arguments, supporting evidence, and academic reasoning.',
    category: 'Academic'
  },

  // Social Media & Digital Marketing
  {
    id: 'social-media-optimization',
    name: 'Social Media Optimization',
    description: 'Optimize for various social media platforms and formats',
    systemPrompt: 'You are a social media optimization expert. Enhance the prompt for different social media platforms (Twitter, Instagram, LinkedIn, etc.) with platform-specific best practices and engagement strategies.',
    category: 'Marketing'
  },
  {
    id: 'hashtag-strategy',
    name: 'Hashtag Strategy Enhancement',
    description: 'Add effective hashtag research and strategy',
    systemPrompt: 'You are a hashtag strategy expert. Enhance the prompt with relevant hashtag research, trending hashtags, campaign-specific hashtags, and hashtag performance optimization.',
    category: 'Marketing'
  },
  {
    id: 'viral-content',
    name: 'Viral Content Focus',
    description: 'Add elements that increase viral potential and shareability',
    systemPrompt: 'You are a viral content expert. Enhance the prompt with viral content elements, emotional triggers, shareability factors, and engagement hooks.',
    category: 'Marketing'
  },
  {
    id: 'influencer-collaboration',
    name: 'Influencer Collaboration Enhancement',
    description: 'Optimize for influencer partnerships and branded content',
    systemPrompt: 'You are an influencer marketing expert. Enhance the prompt for influencer collaborations, branded content guidelines, partnership terms, and authentic integration strategies.',
    category: 'Marketing'
  },
  {
    id: 'brand-voice',
    name: 'Brand Voice Consistency',
    description: 'Ensure consistent brand voice and messaging across platforms',
    systemPrompt: 'You are a brand voice expert. Enhance the prompt to maintain consistent brand voice, tone guidelines, messaging pillars, and brand personality across all communications.',
    category: 'Marketing'
  },

  // Psychological & Mental Health
  {
    id: 'therapeutic-communication',
    name: 'Therapeutic Communication Enhancement',
    description: 'Optimize for therapeutic and counseling contexts',
    systemPrompt: 'You are a therapeutic communication expert. Enhance the prompt with therapeutic language, active listening principles, empathy techniques, and counseling best practices.',
    category: 'Psychology'
  },
  {
    id: 'mindfulness-focus',
    name: 'Mindfulness Focus',
    description: 'Add mindfulness and present-moment awareness elements',
    systemPrompt: 'You are a mindfulness expert. Enhance the prompt with mindfulness techniques, present-moment awareness exercises, meditation guidance, and mindful communication.',
    category: 'Psychology'
  },
  {
    id: 'cognitive-behavioral',
    name: 'Cognitive Behavioral Enhancement',
    description: 'Apply cognitive behavioral therapy principles',
    systemPrompt: 'You are a cognitive behavioral therapy expert. Enhance the prompt with CBT techniques, thought challenging exercises, behavioral activation strategies, and therapeutic frameworks.',
    category: 'Psychology'
  },
  {
    id: 'emotional-regulation',
    name: 'Emotional Regulation Language',
    description: 'Add emotional intelligence and regulation strategies',
    systemPrompt: 'You are an emotional regulation expert. Enhance the prompt with emotional intelligence principles, regulation strategies, coping mechanisms, and emotional awareness techniques.',
    category: 'Psychology'
  },
  {
    id: 'stress-reduction',
    name: 'Stress Reduction Focus',
    description: 'Add stress management and relaxation techniques',
    systemPrompt: 'You are a stress management expert. Enhance the prompt with stress reduction techniques, relaxation exercises, coping strategies, and wellness practices.',
    category: 'Psychology'
  },

  // Engineering & Architecture
  {
    id: 'engineering-specifications',
    name: 'Engineering Specifications Enhancement',
    description: 'Add detailed technical specifications and engineering standards',
    systemPrompt: 'You are an engineering specifications expert. Enhance the prompt with detailed technical specifications, engineering standards, tolerances, and professional engineering requirements.',
    category: 'Engineering'
  },
  {
    id: 'architectural-design',
    name: 'Architectural Design Focus',
    description: 'Optimize for architectural plans and building design',
    systemPrompt: 'You are an architectural design expert. Enhance the prompt for architectural plans, building specifications, design principles, spatial planning, and construction considerations.',
    category: 'Engineering'
  },
  {
    id: 'technical-drawing',
    name: 'Technical Drawing Description',
    description: 'Add detailed technical drawing and diagram elements',
    systemPrompt: 'You are a technical drawing expert. Enhance the prompt with detailed technical drawing descriptions, diagram specifications, labeling conventions, and visual technical communication.',
    category: 'Engineering'
  },
  {
    id: 'structural-analysis',
    name: 'Structural Analysis Enhancement',
    description: 'Add structural engineering and load analysis elements',
    systemPrompt: 'You are a structural analysis expert. Enhance the prompt with structural engineering principles, load calculations, material strength considerations, and safety factor analysis.',
    category: 'Engineering'
  },
  {
    id: 'material-science',
    name: 'Material Science Precision',
    description: 'Add material properties and engineering material specifications',
    systemPrompt: 'You are a material science expert. Enhance the prompt with detailed material properties, engineering material specifications, compatibility considerations, and material selection criteria.',
    category: 'Engineering'
  },

  // Mathematical & Statistical
  {
    id: 'mathematical-notation',
    name: 'Mathematical Notation Enhancement',
    description: 'Add precise mathematical notation and formal expressions',
    systemPrompt: 'You are a mathematical notation expert. Enhance the prompt with precise mathematical notation, formal expressions, theorem statements, and mathematical rigor.',
    category: 'Mathematical'
  },
  {
    id: 'statistical-analysis',
    name: 'Statistical Analysis Focus',
    description: 'Add statistical methods and data analysis techniques',
    systemPrompt: 'You are a statistical analysis expert. Enhance the prompt with statistical methods, data analysis techniques, hypothesis testing, confidence intervals, and statistical interpretation.',
    category: 'Mathematical'
  },
  {
    id: 'data-visualization',
    name: 'Data Visualization Description',
    description: 'Add detailed chart and graph description elements',
    systemPrompt: 'You are a data visualization expert. Enhance the prompt with detailed chart descriptions, graph specifications, visualization best practices, and data presentation techniques.',
    category: 'Mathematical'
  },
  {
    id: 'algorithm-explanation',
    name: 'Algorithm Explanation Optimization',
    description: 'Enhance for clear algorithm descriptions and pseudocode',
    systemPrompt: 'You are an algorithm expert. Enhance the prompt for clear algorithm explanations, pseudocode representation, computational complexity analysis, and step-by-step algorithmic processes.',
    category: 'Mathematical'
  },
  {
    id: 'formula-derivation',
    name: 'Formula Derivation Enhancement',
    description: 'Add mathematical formula derivations and proofs',
    systemPrompt: 'You are a mathematical derivation expert. Enhance the prompt with formula derivations, mathematical proofs, theorem demonstrations, and step-by-step mathematical reasoning.',
    category: 'Mathematical'
  },

  // Religious & Spiritual
  {
    id: 'spiritual-guidance',
    name: 'Spiritual Guidance Enhancement',
    description: 'Add spiritual wisdom and guidance elements',
    systemPrompt: 'You are a spiritual guidance expert. Enhance the prompt with spiritual wisdom, guidance principles, inner growth insights, and spiritual development considerations.',
    category: 'Spiritual'
  },
  {
    id: 'religious-text',
    name: 'Religious Text Interpretation',
    description: 'Enhance for religious scripture and text analysis',
    systemPrompt: 'You are a religious text expert. Enhance the prompt for scripture interpretation, religious text analysis, theological insights, and faith-based context understanding.',
    category: 'Spiritual'
  },
  {
    id: 'meditation-instruction',
    name: 'Meditation Instruction Focus',
    description: 'Add detailed meditation guidance and practice instructions',
    systemPrompt: 'You are a meditation instruction expert. Enhance the prompt with detailed meditation instructions, practice guidance, breathing techniques, and mindfulness practices.',
    category: 'Spiritual'
  },
  {
    id: 'ethical-spiritual',
    name: 'Ethical Spiritual Context',
    description: 'Add moral and ethical considerations from spiritual perspectives',
    systemPrompt: 'You are an ethical spirituality expert. Enhance the prompt with moral and ethical considerations from various spiritual traditions, value-based decision making, and spiritual ethics.',
    category: 'Spiritual'
  },
  {
    id: 'interfaith-dialogue',
    name: 'Interfaith Dialogue Enhancement',
    description: 'Add interfaith understanding and religious diversity elements',
    systemPrompt: 'You are an interfaith dialogue expert. Enhance the prompt with interfaith understanding, religious diversity awareness, cross-faith communication principles, and inclusive spiritual perspectives.',
    category: 'Spiritual'
  },

  // Political & Government
  {
    id: 'policy-analysis',
    name: 'Policy Analysis Enhancement',
    description: 'Add detailed policy analysis and government impact assessment',
    systemPrompt: 'You are a policy analysis expert. Enhance the prompt with detailed policy analysis, impact assessments, stakeholder considerations, and government policy evaluation frameworks.',
    category: 'Political'
  },
  {
    id: 'political-rhetoric',
    name: 'Political Rhetoric Optimization',
    description: 'Optimize for political speeches and public address',
    systemPrompt: 'You are a political rhetoric expert. Enhance the prompt for political speeches, public addresses, campaign messaging, and persuasive political communication.',
    category: 'Political'
  },
  {
    id: 'government-document',
    name: 'Government Document Clarity',
    description: 'Enhance for official government documents and public notices',
    systemPrompt: 'You are a government document expert. Enhance the prompt for clarity in official government documents, public notices, regulatory filings, and bureaucratic communications.',
    category: 'Political'
  },
  {
    id: 'diplomatic-communication',
    name: 'Diplomatic Communication Focus',
    description: 'Add diplomatic language and international relations context',
    systemPrompt: 'You are a diplomatic communication expert. Enhance the prompt with diplomatic language, international relations context, cross-cultural diplomatic protocols, and statecraft principles.',
    category: 'Political'
  },
  {
    id: 'public-policy',
    name: 'Public Policy Impact Assessment',
    description: 'Add comprehensive public policy impact evaluation',
    systemPrompt: 'You are a public policy expert. Enhance the prompt with comprehensive policy impact assessments, implementation strategies, evaluation metrics, and policy effectiveness analysis.',
    category: 'Political'
  },

  // Linguistic & Translation
  {
    id: 'dialect-adaptation',
    name: 'Dialect Adaptation',
    description: 'Adapt content for specific regional dialects and variations',
    systemPrompt: 'You are a dialect adaptation expert. Enhance the prompt to adapt content for specific regional dialects, linguistic variations, and local language preferences while maintaining meaning.',
    category: 'Linguistic'
  },
  {
    id: 'slang-modernization',
    name: 'Slang Modernization',
    description: 'Update with current slang and contemporary expressions',
    systemPrompt: 'You are a contemporary language expert. Enhance the prompt with current slang, modern expressions, trending terminology, and up-to-date colloquial language.',
    category: 'Linguistic'
  },
  {
    id: 'register-adjustment',
    name: 'Formal/Informal Register Adjustment',
    description: 'Adjust formality level and linguistic register appropriately',
    systemPrompt: 'You are a linguistic register expert. Enhance the prompt by adjusting the formality level and linguistic register to match the intended audience and context appropriately.',
    category: 'Linguistic'
  },
  {
    id: 'idiomatic-enhancement',
    name: 'Idiomatic Expression Enhancement',
    description: 'Add natural idiomatic expressions and cultural sayings',
    systemPrompt: 'You are an idiomatic expressions expert. Enhance the prompt with natural idiomatic expressions, cultural sayings, proverbs, and figurative language that resonates with native speakers.',
    category: 'Linguistic'
  },
  {
    id: 'phonetics-focus',
    name: 'Phonetics/Phonology Focus',
    description: 'Add pronunciation guides and sound pattern considerations',
    systemPrompt: 'You are a phonetics expert. Enhance the prompt with pronunciation guides, phonetic transcriptions, sound pattern considerations, and oral communication elements.',
    category: 'Linguistic'
  },

  // Specialized Technical
  {
    id: 'blockchain-focus',
    name: 'Blockchain/Cryptocurrency Focus',
    description: 'Add blockchain technology and cryptocurrency context',
    systemPrompt: 'You are a blockchain technology expert. Enhance the prompt with blockchain concepts, cryptocurrency terminology, smart contract details, and decentralized technology context.',
    category: 'Technical'
  },
  {
    id: 'ai-ml-specification',
    name: 'AI/ML Model Specification',
    description: 'Add artificial intelligence and machine learning specifications',
    systemPrompt: 'You are an AI/ML specification expert. Enhance the prompt with artificial intelligence terminology, machine learning model specifications, training requirements, and AI system architecture details.',
    category: 'Technical'
  },
  {
    id: 'cybersecurity-protocols',
    name: 'Cybersecurity Protocol Enhancement',
    description: 'Add cybersecurity measures and protection protocols',
    systemPrompt: 'You are a cybersecurity expert. Enhance the prompt with cybersecurity protocols, threat protection measures, vulnerability assessments, and security best practices.',
    category: 'Technical'
  },
  {
    id: 'cloud-infrastructure',
    name: 'Cloud Infrastructure Optimization',
    description: 'Optimize for cloud computing and infrastructure deployment',
    systemPrompt: 'You are a cloud infrastructure expert. Enhance the prompt for cloud computing deployment, infrastructure as code, scalability considerations, and cloud architecture best practices.',
    category: 'Technical'
  },
  {
    id: 'devops-pipeline',
    name: 'DevOps Pipeline Description',
    description: 'Add DevOps workflows and continuous integration elements',
    systemPrompt: 'You are a DevOps expert. Enhance the prompt with DevOps pipeline descriptions, continuous integration/continuous deployment workflows, automation strategies, and infrastructure management.',
    category: 'Technical'
  },

  // Additional Creative & Specialized
  {
    id: 'fashion-description',
    name: 'Fashion Description Enhancement',
    description: 'Add detailed fashion industry terminology and style descriptions',
    systemPrompt: 'You are a fashion industry expert. Enhance the prompt with detailed fashion terminology, style descriptions, trend analysis, and fashion industry context.',
    category: 'Fashion'
  },
  {
    id: 'beauty-product',
    name: 'Beauty Product Description',
    description: 'Optimize for cosmetics and beauty product descriptions',
    systemPrompt: 'You are a beauty product expert. Enhance the prompt for cosmetic product descriptions, ingredient analysis, beauty benefits, and skincare/beauty industry terminology.',
    category: 'Beauty'
  },
  {
    id: 'automotive-technical',
    name: 'Automotive Technical Description',
    description: 'Add detailed automotive specifications and technical details',
    systemPrompt: 'You are an automotive technical expert. Enhance the prompt with detailed vehicle specifications, mechanical terminology, automotive engineering details, and car industry context.',
    category: 'Automotive'
  },
  {
    id: 'aviation-terminology',
    name: 'Aviation Terminology Precision',
    description: 'Add aviation-specific terminology and flight operations context',
    systemPrompt: 'You are an aviation terminology expert. Enhance the prompt with precise aviation terminology, flight operations context, aircraft specifications, and aerospace industry language.',
    category: 'Aviation'
  },
  {
    id: 'marine-navigation',
    name: 'Marine Navigation Enhancement',
    description: 'Add nautical terminology and maritime navigation elements',
    systemPrompt: 'You are a marine navigation expert. Enhance the prompt with nautical terminology, maritime navigation elements, sailing instructions, and oceanographic context.',
    category: 'Maritime'
  },

  // Additional Professional & Business
  {
    id: 'crisis-communication',
    name: 'Crisis Communication Enhancement',
    description: 'Optimize for crisis management and emergency communications',
    systemPrompt: 'You are a crisis communication expert. Enhance the prompt for crisis management scenarios, emergency communications, reputation protection, and stakeholder messaging during crises.',
    category: 'Business'
  },
  {
    id: 'merger-acquisition',
    name: 'Merger & Acquisition Focus',
    description: 'Add M&A terminology and corporate transaction context',
    systemPrompt: 'You are a merger and acquisition expert. Enhance the prompt with M&A terminology, corporate transaction context, due diligence considerations, and deal structuring elements.',
    category: 'Business'
  },
  {
    id: 'startup-pitch',
    name: 'Startup Pitch Optimization',
    description: 'Optimize for startup investor pitches and business proposals',
    systemPrompt: 'You are a startup pitch expert. Enhance the prompt for investor pitches, business proposals, startup valuations, market opportunity analysis, and venture capital terminology.',
    category: 'Business'
  },
  {
    id: 'negotiation-strategy',
    name: 'Negotiation Strategy Enhancement',
    description: 'Add negotiation tactics and deal-making strategies',
    systemPrompt: 'You are a negotiation strategy expert. Enhance the prompt with negotiation tactics, deal-making strategies, conflict resolution approaches, and persuasive negotiation techniques.',
    category: 'Business'
  },
  {
    id: 'leadership-communication',
    name: 'Leadership Communication Focus',
    description: 'Add executive leadership and team management elements',
    systemPrompt: 'You are a leadership communication expert. Enhance the prompt with executive leadership language, team management strategies, organizational communication principles, and leadership presence.',
    category: 'Business'
  },

  // Additional Personal & Lifestyle
  {
    id: 'parenting-advice',
    name: 'Parenting Advice Enhancement',
    description: 'Add child development insights and parenting strategies',
    systemPrompt: 'You are a parenting expert. Enhance the prompt with child development insights, age-appropriate parenting strategies, family dynamics considerations, and child psychology principles.',
    category: 'Parenting'
  },
  {
    id: 'relationship-counseling',
    name: 'Relationship Counseling Focus',
    description: 'Add relationship dynamics and interpersonal communication',
    systemPrompt: 'You are a relationship counseling expert. Enhance the prompt with relationship dynamics insights, interpersonal communication strategies, conflict resolution techniques, and emotional connection principles.',
    category: 'Relationships'
  },
  {
    id: 'personal-finance',
    name: 'Personal Finance Optimization',
    description: 'Add personal financial planning and money management advice',
    systemPrompt: 'You are a personal finance expert. Enhance the prompt with personal financial planning strategies, budget management techniques, debt reduction approaches, and financial wellness principles.',
    category: 'Personal'
  },
  {
    id: 'career-coaching',
    name: 'Career Coaching Enhancement',
    description: 'Add career development and professional growth strategies',
    systemPrompt: 'You are a career coaching expert. Enhance the prompt with career development strategies, professional growth planning, job search techniques, and career advancement principles.',
    category: 'Career'
  },
  {
    id: 'life-coaching',
    name: 'Life Coaching Focus',
    description: 'Add personal development and life goal achievement strategies',
    systemPrompt: 'You are a life coaching expert. Enhance the prompt with personal development strategies, life goal achievement techniques, habit formation principles, and holistic life planning.',
    category: 'Personal'
  },

  // Additional Technical & Scientific
  {
    id: 'biotechnology-focus',
    name: 'Biotechnology Enhancement',
    description: 'Add biotech terminology and genetic engineering context',
    systemPrompt: 'You are a biotechnology expert. Enhance the prompt with biotech terminology, genetic engineering concepts, molecular biology context, and life sciences research elements.',
    category: 'Biotech'
  },
  {
    id: 'quantum-computing',
    name: 'Quantum Computing Context',
    description: 'Add quantum mechanics and quantum computing terminology',
    systemPrompt: 'You are a quantum computing expert. Enhance the prompt with quantum mechanics principles, quantum computing terminology, qubit operations, and quantum algorithm concepts.',
    category: 'Quantum'
  },
  {
    id: 'nanotechnology-precision',
    name: 'Nanotechnology Precision',
    description: 'Add nanoscale engineering and molecular manipulation details',
    systemPrompt: 'You are a nanotechnology expert. Enhance the prompt with nanoscale engineering principles, molecular manipulation techniques, nanomaterial properties, and nanoengineering applications.',
    category: 'Nano'
  },
  {
    id: 'astrophysics-context',
    name: 'Astrophysics Context Enhancement',
    description: 'Add astrophysical concepts and space science terminology',
    systemPrompt: 'You are an astrophysics expert. Enhance the prompt with astrophysical concepts, space science terminology, celestial mechanics, cosmological principles, and astronomical phenomena.',
    category: 'Space'
  },
  {
    id: 'robotics-engineering',
    name: 'Robotics Engineering Focus',
    description: 'Add robotics terminology and mechanical automation details',
    systemPrompt: 'You are a robotics engineering expert. Enhance the prompt with robotics terminology, mechanical automation details, control systems, sensor integration, and robotic application contexts.',
    category: 'Robotics'
  },

  // Additional Creative & Entertainment
  {
    id: 'comedy-writing',
    name: 'Comedy Writing Enhancement',
    description: 'Add humor writing techniques and comedic timing elements',
    systemPrompt: 'You are a comedy writing expert. Enhance the prompt with humor writing techniques, comedic timing elements, joke structure, satire principles, and comedy genre conventions.',
    category: 'Comedy'
  },
  {
    id: 'horror-atmosphere',
    name: 'Horror Atmosphere Focus',
    description: 'Add suspense, tension, and horror genre elements',
    systemPrompt: 'You are a horror writing expert. Enhance the prompt with suspense-building techniques, tension creation, horror atmosphere elements, fear psychology, and genre conventions.',
    category: 'Horror'
  },
  {
    id: 'romance-narrative',
    name: 'Romance Narrative Enhancement',
    description: 'Add romantic storytelling and relationship development elements',
    systemPrompt: 'You are a romance narrative expert. Enhance the prompt with romantic storytelling techniques, relationship development arcs, emotional intimacy building, and romance genre conventions.',
    category: 'Romance'
  },
  {
    id: 'fantasy-worldbuilding',
    name: 'Fantasy Worldbuilding Optimization',
    description: 'Create detailed fantasy worlds with magic systems and lore',
    systemPrompt: 'You are a fantasy worldbuilding expert. Enhance the prompt with detailed fantasy world creation, magic system development, lore establishment, mythical creatures, and fantasy realm building.',
    category: 'Fantasy'
  },
  {
    id: 'sci-fi-concepts',
    name: 'Science Fiction Concepts',
    description: 'Add futuristic technology and speculative science elements',
    systemPrompt: 'You are a science fiction expert. Enhance the prompt with futuristic technology concepts, speculative science elements, space exploration themes, and sci-fi worldbuilding principles.',
    category: 'SciFi'
  },

  // Additional Business & Professional
  {
    id: 'franchise-development',
    name: 'Franchise Development Focus',
    description: 'Add franchise business model and expansion strategies',
    systemPrompt: 'You are a franchise development expert. Enhance the prompt with franchise business models, expansion strategies, franchisee-franchisor relationships, and multi-unit growth planning.',
    category: 'Franchise'
  },
  {
    id: 'e-commerce-optimization',
    name: 'E-commerce Optimization',
    description: 'Optimize for online stores and digital commerce platforms',
    systemPrompt: 'You are an e-commerce expert. Enhance the prompt for online store optimization, digital commerce platforms, conversion rate strategies, user experience design, and online sales funnels.',
    category: 'Ecommerce'
  },
  {
    id: 'real-estate-marketing',
    name: 'Real Estate Marketing Enhancement',
    description: 'Add property marketing and real estate sales strategies',
    systemPrompt: 'You are a real estate marketing expert. Enhance the prompt with property marketing strategies, real estate sales techniques, market analysis, property descriptions, and listing optimization.',
    category: 'RealEstate'
  },
  {
    id: 'hospitality-service',
    name: 'Hospitality Service Focus',
    description: 'Add hotel, restaurant, and hospitality industry context',
    systemPrompt: 'You are a hospitality service expert. Enhance the prompt with hotel management context, restaurant service standards, guest experience optimization, and hospitality industry best practices.',
    category: 'Hospitality'
  },
  {
    id: 'retail-experience',
    name: 'Retail Experience Enhancement',
    description: 'Add retail store operations and customer experience elements',
    systemPrompt: 'You are a retail experience expert. Enhance the prompt with retail store operations, customer experience design, merchandising strategies, sales techniques, and retail industry context.',
    category: 'Retail'
  },

  // Additional Specialized Domains
  {
    id: 'agriculture-technology',
    name: 'Agriculture Technology Focus',
    description: 'Add farming technology and agricultural innovation elements',
    systemPrompt: 'You are an agricultural technology expert. Enhance the prompt with farming technology concepts, agricultural innovation elements, sustainable farming practices, and agri-tech industry context.',
    category: 'Agriculture'
  },
  {
    id: 'education-curriculum',
    name: 'Education Curriculum Development',
    description: 'Add educational curriculum design and learning objectives',
    systemPrompt: 'You are an education curriculum expert. Enhance the prompt with curriculum design principles, learning objectives development, educational standards alignment, and pedagogical strategies.',
    category: 'Education'
  },
  {
    id: 'nonprofit-messaging',
    name: 'Nonprofit Messaging Enhancement',
    description: 'Optimize for nonprofit organizations and cause marketing',
    systemPrompt: 'You are a nonprofit messaging expert. Enhance the prompt for nonprofit organization communications, cause marketing strategies, donor engagement, and social impact messaging.',
    category: 'Nonprofit'
  },
  {
    id: 'legal-tech-innovation',
    name: 'Legal Tech Innovation Focus',
    description: 'Add legal technology and law firm innovation elements',
    systemPrompt: 'You are a legal tech expert. Enhance the prompt with legal technology concepts, law firm innovation strategies, legal process automation, and legal industry digital transformation.',
    category: 'LegalTech'
  },
  {
    id: 'health-tech-solutions',
    name: 'Health Tech Solutions Enhancement',
    description: 'Add healthcare technology and digital health innovations',
    systemPrompt: 'You are a health tech expert. Enhance the prompt with healthcare technology solutions, digital health innovations, telemedicine applications, and health industry digital transformation.',
    category: 'HealthTech'
  },

  // Additional Creative & Lifestyle
  {
    id: 'interior-design',
    name: 'Interior Design Focus',
    description: 'Add interior design principles and space planning elements',
    systemPrompt: 'You are an interior design expert. Enhance the prompt with interior design principles, space planning techniques, color theory applications, furniture selection, and design aesthetic considerations.',
    category: 'Design'
  },
  {
    id: 'photography-technique',
    name: 'Photography Technique Enhancement',
    description: 'Add photography technical details and artistic composition',
    systemPrompt: 'You are a photography technique expert. Enhance the prompt with photography technical details, camera settings, lighting techniques, artistic composition principles, and visual storytelling.',
    category: 'Photography'
  },
  {
    id: 'gardening-expertise',
    name: 'Gardening Expertise Focus',
    description: 'Add horticulture knowledge and garden planning elements',
    systemPrompt: 'You are a gardening expertise expert. Enhance the prompt with horticulture knowledge, plant selection advice, garden planning principles, seasonal gardening tips, and landscape design elements.',
    category: 'Gardening'
  },
  {
    id: 'craft-instruction',
    name: 'Craft Instruction Enhancement',
    description: 'Add detailed craft project instructions and techniques',
    systemPrompt: 'You are a craft instruction expert. Enhance the prompt with detailed craft project instructions, material lists, technique explanations, step-by-step guidance, and creative craft principles.',
    category: 'Crafts'
  },
  {
    id: 'pet-care-advice',
    name: 'Pet Care Advice Focus',
    description: 'Add animal care knowledge and pet health considerations',
    systemPrompt: 'You are a pet care expert. Enhance the prompt with animal care knowledge, pet health considerations, training techniques, nutrition advice, and responsible pet ownership principles.',
    category: 'Pets'
  },

  // Additional Technical & Professional
  {
    id: 'audio-engineering',
    name: 'Audio Engineering Enhancement',
    description: 'Add sound design and audio production technical details',
    systemPrompt: 'You are an audio engineering expert. Enhance the prompt with sound design principles, audio production technical details, mixing techniques, recording equipment specifications, and audio engineering best practices.',
    category: 'Audio'
  },
  {
    id: 'video-production',
    name: 'Video Production Focus',
    description: 'Add filmmaking techniques and video production workflows',
    systemPrompt: 'You are a video production expert. Enhance the prompt with filmmaking techniques, video production workflows, camera operation details, editing principles, and visual storytelling methods.',
    category: 'Video'
  },
  {
    id: 'ux-design-principles',
    name: 'UX Design Principles Enhancement',
    description: 'Add user experience design and interface optimization elements',
    systemPrompt: 'You are a UX design expert. Enhance the prompt with user experience design principles, interface optimization techniques, usability testing considerations, user research insights, and design thinking methodologies.',
    category: 'UX'
  },
  {
    id: 'content-strategy',
    name: 'Content Strategy Focus',
    description: 'Add content marketing strategy and audience engagement planning',
    systemPrompt: 'You are a content strategy expert. Enhance the prompt with content marketing strategy development, audience engagement planning, content calendar creation, and content performance optimization.',
    category: 'Content'
  },
  {
    id: 'seo-optimization',
    name: 'SEO Optimization Enhancement',
    description: 'Add search engine optimization and digital visibility strategies',
    systemPrompt: 'You are an SEO optimization expert. Enhance the prompt with search engine optimization techniques, keyword research strategies, digital visibility planning, and search ranking improvement tactics.',
    category: 'SEO'
  },

  // Additional Specialized Fields
  {
    id: 'forensic-analysis',
    name: 'Forensic Analysis Focus',
    description: 'Add forensic science and investigative analysis elements',
    systemPrompt: 'You are a forensic analysis expert. Enhance the prompt with forensic science principles, investigative analysis techniques, evidence examination methods, and criminal justice context.',
    category: 'Forensic'
  },
  {
    id: 'archaeology-context',
    name: 'Archaeology Context Enhancement',
    description: 'Add archaeological methods and historical excavation details',
    systemPrompt: 'You are an archaeology expert. Enhance the prompt with archaeological methods, historical excavation details, artifact analysis techniques, dating methods, and cultural heritage preservation principles.',
    category: 'Archaeology'
  },
  {
    id: 'meteorology-focus',
    name: 'Meteorology Focus',
    description: 'Add weather forecasting and atmospheric science elements',
    systemPrompt: 'You are a meteorology expert. Enhance the prompt with weather forecasting techniques, atmospheric science principles, climate patterns, meteorological data analysis, and severe weather prediction.',
    category: 'Weather'
  },
  {
    id: 'geology-terminology',
    name: 'Geology Terminology Precision',
    description: 'Add geological concepts and earth science terminology',
    systemPrompt: 'You are a geology expert. Enhance the prompt with precise geological terminology, earth science concepts, rock formation analysis, plate tectonics principles, and geological survey methods.',
    category: 'Geology'
  },
  {
    id: 'oceanography-context',
    name: 'Oceanography Context Enhancement',
    description: 'Add marine science and oceanographic research elements',
    systemPrompt: 'You are an oceanography expert. Enhance the prompt with marine science concepts, oceanographic research methods, marine ecosystem analysis, ocean current patterns, and underwater exploration terminology.',
    category: 'Oceanography'
  },

  // Final Professional & Technical Enhancements
  {
    id: 'project-management',
    name: 'Project Management Optimization',
    description: 'Add project management methodologies and delivery frameworks',
    systemPrompt: 'You are a project management expert. Enhance the prompt with project management methodologies (Agile, Waterfall, Scrum), delivery frameworks, risk management strategies, and project lifecycle planning.',
    category: 'Project'
  },
  {
    id: 'quality-assurance',
    name: 'Quality Assurance Focus',
    description: 'Add quality control standards and testing protocols',
    systemPrompt: 'You are a quality assurance expert. Enhance the prompt with quality control standards, testing protocols, defect tracking methods, quality metrics, and continuous improvement principles.',
    category: 'Quality'
  },
  {
    id: 'supply-chain',
    name: 'Supply Chain Optimization',
    description: 'Add logistics and supply chain management elements',
    systemPrompt: 'You are a supply chain expert. Enhance the prompt with logistics management, supply chain optimization strategies, inventory control methods, distribution planning, and procurement best practices.',
    category: 'Chain'
  },
  {
    id: 'human-resources',
    name: 'Human Resources Enhancement',
    description: 'Add HR policies and employee management strategies',
    systemPrompt: 'You are a human resources expert. Enhance the prompt with HR policies development, employee management strategies, recruitment processes, performance evaluation systems, and workplace culture considerations.',
    category: 'HR'
  },
  {
    id: 'operations-excellence',
    name: 'Operations Excellence Focus',
    description: 'Add operational efficiency and process improvement elements',
    systemPrompt: 'You are an operations excellence expert. Enhance the prompt with operational efficiency strategies, process improvement methodologies, lean principles, continuous improvement frameworks, and operational excellence standards.',
    category: 'Operations'
  }
];

export default enhancementTypes;
