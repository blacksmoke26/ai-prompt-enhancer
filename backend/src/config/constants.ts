import { AppConfig } from '../types';

export const defaultConfig: AppConfig = {
  ollama: {
    url: 'http://localhost:11434',
    timeout: 30000,
  },
  theme: 'system',
  autoSave: true,
  maxHistoryItems: 1000,
  defaultModel: 'llama2',
  defaultSystemPrompt: 'You are a helpful AI assistant specialized in enhancing and improving prompts.',
};

export const enhancementTypes: Array<{
  id: string;
  name: string;
  description: string;
  systemPrompt: string;
}> = [
  {
    id: 'correct',
    name: 'Correct Grammar & Spelling',
    description: 'Fix grammatical errors, spelling mistakes, and improve clarity',
    systemPrompt: 'You are a grammar and spelling expert. Correct any grammatical errors, spelling mistakes, and improve the clarity of the given prompt while preserving the original intent.',
  },
  {
    id: 'enhance',
    name: 'Enhance & Expand',
    description: 'Make the prompt more detailed, specific, and effective',
    systemPrompt: 'You are a prompt engineering expert. Enhance the given prompt by adding relevant details, making it more specific, and improving its effectiveness while maintaining the core intent.',
  },
  {
    id: 'proofread',
    name: 'Proofread & Refine',
    description: 'Review and refine the prompt for better results',
    systemPrompt: 'You are a professional proofreader. Review and refine the given prompt to make it more effective, clear, and likely to produce high-quality results.',
  },
  {
    id: 'optimize',
    name: 'Optimize for AI',
    description: 'Optimize the prompt specifically for AI models',
    systemPrompt: 'You are an AI prompt optimization specialist. Optimize the given prompt to work best with AI models, adding structure, context, and clarity as needed.',
  },
  {
    id: 'creative',
    name: 'Creative Enhancement',
    description: 'Add creative elements and imaginative details',
    systemPrompt: 'You are a creative writing expert. Enhance the given prompt with creative elements, vivid descriptions, and imaginative details while preserving the core request.',
  },
  {
    id: 'technical',
    name: 'Technical Precision',
    description: 'Add technical details and precise specifications',
    systemPrompt: 'You are a technical expert. Enhance the given prompt with precise technical details, specifications, and domain-specific terminology to improve accuracy.',
  },
  {
    id: 'concise',
    name: 'Make Concise',
    description: 'Remove unnecessary words and improve efficiency',
    systemPrompt: 'You are an expert in clear communication. Make the given prompt more concise by removing unnecessary words, improving structure, and enhancing efficiency while maintaining all essential information.',
  },
  {
    id: 'structured',
    name: 'Add Structure',
    description: 'Organize the prompt with clear sections and formatting',
    systemPrompt: 'You are an expert in structured communication. Reorganize the given prompt with clear sections, bullet points, and formatting to improve readability and effectiveness.',
  },
  {
    id: 'empathize',
    name: 'Add Empathy',
    description: 'Enhance with emotional intelligence and human connection',
    systemPrompt: 'You are an emotional intelligence expert. Enhance the given prompt with empathetic language, emotional awareness, and human-centered communication.',
  },
  {
    id: 'persuasive',
    name: 'Make Persuasive',
    description: 'Add persuasive elements and rhetorical techniques',
    systemPrompt: 'You are a persuasion expert. Enhance the given prompt with rhetorical devices, persuasive techniques, and compelling arguments.',
  },
  {
    id: 'formal',
    name: 'Formal Tone',
    description: 'Convert to formal and professional language',
    systemPrompt: 'You are an expert in formal communication. Convert the given prompt to use professional language, proper etiquette, and formal tone.',
  },
  {
    id: 'casual',
    name: 'Casual Tone',
    description: 'Make the prompt more conversational and friendly',
    systemPrompt: 'You are an expert in casual communication. Make the given prompt more conversational, friendly, and approachable while maintaining clarity.',
  },
  {
    id: 'multilingual',
    name: 'Multilingual Support',
    description: 'Enhance for multiple language contexts',
    systemPrompt: 'You are a multilingual communication expert. Enhance the given prompt to be culturally sensitive and effective across multiple languages.',
  },
  {
    id: 'visual',
    name: 'Visual Elements',
    description: 'Add visual descriptions and imagery',
    systemPrompt: 'You are a visual storytelling expert. Enhance the given prompt with vivid visual descriptions, imagery, and sensory details.',
  },
  {
    id: 'action',
    name: 'Action-Oriented',
    description: 'Focus on clear actions and outcomes',
    systemPrompt: 'You are an expert in action-oriented communication. Enhance the given prompt to focus on specific actions, outcomes, and measurable results.',
  },
  {
    id: 'question',
    name: 'Question-Based',
    description: 'Convert to probing questions and inquiries',
    systemPrompt: 'You are an expert in Socratic questioning. Convert the given prompt into thoughtful, probing questions that encourage deeper thinking.',
  },
  {
    id: 'story',
    name: 'Storytelling',
    description: 'Transform into narrative format',
    systemPrompt: 'You are a master storyteller. Transform the given prompt into a compelling narrative with story structure, characters, and plot elements.',
  },
  {
    id: 'data',
    name: 'Data-Driven',
    description: 'Add data and analytical perspective',
    systemPrompt: 'You are a data analysis expert. Enhance the given prompt with data-driven insights, analytical thinking, and evidence-based reasoning.',
  },
  {
    id: 'ethical',
    name: 'Ethical Framework',
    description: 'Add ethical considerations and values',
    systemPrompt: 'You are an ethics expert. Enhance the given prompt with ethical considerations, moral frameworks, and responsible guidance.',
  },
  {
    id: 'accessible',
    name: 'Accessibility Focus',
    description: 'Make content accessible to all users',
    systemPrompt: 'You are an accessibility expert. Enhance the given prompt to be inclusive, accessible, and considerate of all users\' needs.',
  },
  {
    id: 'step',
    name: 'Step-by-Step',
    description: 'Break down into sequential steps',
    systemPrompt: 'You are an expert in instructional design. Break down the given prompt into clear, sequential steps with logical progression.',
  },
  {
    id: 'example',
    name: 'Add Examples',
    description: 'Include relevant examples and illustrations',
    systemPrompt: 'You are an expert in educational examples. Enhance the given prompt with relevant examples, case studies, and illustrative scenarios.',
  },
  {
    id: 'compare',
    name: 'Comparison Focus',
    description: 'Add comparative elements and alternatives',
    systemPrompt: 'You are an expert in comparative analysis. Enhance the given prompt with comparisons, alternatives, and different perspectives.',
  },
  {
    id: 'future',
    name: 'Future-Oriented',
    description: 'Add forward-thinking and visionary elements',
    systemPrompt: 'You are a strategic futurist. Enhance the given prompt with forward-thinking, visionary elements, and future considerations.',
  },
  {
    id: 'historical',
    name: 'Historical Context',
    description: 'Add historical perspective and context',
    systemPrompt: 'You are a historical expert. Enhance the given prompt with historical context, relevant precedents, and temporal perspective.',
  },
  {
    id: 'scientific',
    name: 'Scientific Method',
    description: 'Apply scientific thinking and methodology',
    systemPrompt: 'You are a scientific method expert. Enhance the given prompt with scientific thinking, methodology, and evidence-based approaches.',
  },
  {
    id: 'philosophical',
    name: 'Philosophical Depth',
    description: 'Add philosophical inquiry and deeper meaning',
    systemPrompt: 'You are a philosophy expert. Enhance the given prompt with philosophical inquiry, deep questions, and meaningful reflections.',
  },
  {
    id: 'humorous',
    name: 'Add Humor',
    description: 'Inject appropriate humor and wit',
    systemPrompt: 'You are a humor expert. Enhance the given prompt with appropriate humor, wit, and levity while maintaining professionalism.',
  },
  {
    id: 'motivational',
    name: 'Motivational Tone',
    description: 'Add inspiring and motivating elements',
    systemPrompt: 'You are a motivational expert. Enhance the given prompt with inspiring language, motivational elements, and encouragement.',
  },
  {
    id: 'debug',
    name: 'Debug & Troubleshoot',
    description: 'Add debugging and problem-solving focus',
    systemPrompt: 'You are a debugging expert. Enhance the given prompt with troubleshooting steps, problem-solving frameworks, and debugging techniques.',
  },
  {
    id: 'security',
    name: 'Security Focus',
    description: 'Add security and privacy considerations',
    systemPrompt: 'You are a security expert. Enhance the given prompt with security considerations, privacy best practices, and protective measures.',
  },
  {
    id: 'performance',
    name: 'Performance Optimization',
    description: 'Focus on efficiency and performance',
    systemPrompt: 'You are a performance optimization expert. Enhance the given prompt with performance considerations, efficiency metrics, and optimization strategies.',
  },
  {
    id: 'scalable',
    name: 'Scalability Focus',
    description: 'Add scalability and growth considerations',
    systemPrompt: 'You are a scalability expert. Enhance the given prompt with scalability considerations, growth strategies, and flexible design principles.',
  },
];

export const userRoles: Array<{
  id: string;
  name: string;
  description: string;
  systemPrompt: string;
}> = [
  {
    id: 'general',
    name: 'General User',
    description: 'Everyday prompt enhancement needs',
    systemPrompt: 'You are a helpful AI assistant. Provide clear, accurate, and useful responses to enhance the user\'s prompt.',
  },
  {
    id: 'developer',
    name: 'Developer',
    description: 'Programming and technical prompts',
    systemPrompt: 'You are an expert software developer and prompt engineer. Enhance programming-related prompts with technical accuracy, best practices, and code-specific details.',
  },
  {
    id: 'writer',
    name: 'Writer',
    description: 'Creative writing and content creation',
    systemPrompt: 'You are a professional writer and editor. Enhance creative writing prompts with literary techniques, vivid descriptions, and engaging elements.',
  },
  {
    id: 'researcher',
    name: 'Researcher',
    description: 'Academic and research-oriented prompts',
    systemPrompt: 'You are an experienced researcher and academic. Enhance research prompts with methodological rigor, academic precision, and scholarly depth.',
  },
  {
    id: 'marketer',
    name: 'Marketer',
    description: 'Marketing and promotional content',
    systemPrompt: 'You are a marketing expert. Enhance marketing prompts with persuasive language, audience targeting, and brand-aligned messaging.',
  },
  {
    id: 'educator',
    name: 'Educator',
    description: 'Educational and teaching content',
    systemPrompt: 'You are an experienced educator. Enhance educational prompts with pedagogical best practices, clear learning objectives, and appropriate complexity.',
  },
  {
    id: 'business',
    name: 'Business Professional',
    description: 'Business and corporate communication',
    systemPrompt: 'You are a business professional. Enhance business prompts with corporate communication standards, strategic thinking, and professional terminology.',
  },
  {
    id: 'designer',
    name: 'Designer',
    description: 'Design and creative visual prompts',
    systemPrompt: 'You are a professional designer. Enhance design prompts with visual thinking, aesthetic principles, and creative direction.',
  },
  {
    id: 'scientist',
    name: 'Scientist',
    description: 'Scientific research and analysis prompts',
    systemPrompt: 'You are a professional scientist. Enhance scientific prompts with rigorous methodology, experimental design, and evidence-based reasoning.',
  },
  {
    id: 'journalist',
    name: 'Journalist',
    description: 'News reporting and investigative prompts',
    systemPrompt: 'You are an experienced journalist. Enhance journalistic prompts with factual accuracy, objective reporting, and engaging storytelling.',
  },
  {
    id: 'consultant',
    name: 'Consultant',
    description: 'Business consulting and strategy prompts',
    systemPrompt: 'You are an expert business consultant. Enhance consulting prompts with strategic frameworks, actionable insights, and professional recommendations.',
  },
  {
    id: 'lawyer',
    name: 'Lawyer',
    description: 'Legal and regulatory prompts',
    systemPrompt: 'You are an experienced lawyer. Enhance legal prompts with precise terminology, regulatory compliance, and sound legal reasoning.',
  },
  {
    id: 'doctor',
    name: 'Medical Professional',
    description: 'Healthcare and medical prompts',
    systemPrompt: 'You are a medical professional. Enhance healthcare prompts with medical accuracy, patient care focus, and ethical considerations.',
  },
  {
    id: 'psychologist',
    name: 'Psychologist',
    description: 'Psychology and mental health prompts',
    systemPrompt: 'You are a licensed psychologist. Enhance psychology prompts with therapeutic approaches, mental health awareness, and empathetic communication.',
  },
  {
    id: 'economist',
    name: 'Economist',
    description: 'Economic analysis and financial prompts',
    systemPrompt: 'You are an expert economist. Enhance economic prompts with analytical frameworks, market insights, and financial acumen.',
  },
  {
    id: 'engineer',
    name: 'Engineer',
    description: 'Engineering and technical problem-solving prompts',
    systemPrompt: 'You are a professional engineer. Enhance engineering prompts with technical precision, problem-solving methodologies, and industry standards.',
  },
  {
    id: 'architect',
    name: 'Architect',
    description: 'Architecture and spatial design prompts',
    systemPrompt: 'You are a professional architect. Enhance architectural prompts with spatial thinking, design principles, and structural considerations.',
  },
  {
    id: 'chef',
    name: 'Chef',
    description: 'Culinary arts and cooking prompts',
    systemPrompt: 'You are a professional chef. Enhance culinary prompts with cooking techniques, flavor profiles, and gastronomic expertise.',
  },
  {
    id: 'musician',
    name: 'Musician',
    description: 'Music theory and composition prompts',
    systemPrompt: 'You are a professional musician. Enhance music prompts with theoretical knowledge, compositional techniques, and artistic expression.',
  },
  {
    id: 'photographer',
    name: 'Photographer',
    description: 'Photography and visual arts prompts',
    systemPrompt: 'You are a professional photographer. Enhance photography prompts with technical expertise, artistic vision, and compositional principles.',
  },
  {
    id: 'filmmaker',
    name: 'Filmmaker',
    description: 'Film production and storytelling prompts',
    systemPrompt: 'You are a professional filmmaker. Enhance film prompts with cinematic techniques, narrative structure, and visual storytelling.',
  },
  {
    id: 'gamedev',
    name: 'Game Developer',
    description: 'Game design and development prompts',
    systemPrompt: 'You are an expert game developer. Enhance game development prompts with design principles, technical considerations, and player experience focus.',
  },
  {
    id: 'data-scientist',
    name: 'Data Scientist',
    description: 'Data analysis and machine learning prompts',
    systemPrompt: 'You are a professional data scientist. Enhance data science prompts with statistical methods, machine learning techniques, and analytical rigor.',
  },
  {
    id: 'product-manager',
    name: 'Product Manager',
    description: 'Product development and management prompts',
    systemPrompt: 'You are an experienced product manager. Enhance product prompts with user focus, market analysis, and strategic planning.',
  },
  {
    id: 'ux-researcher',
    name: 'UX Researcher',
    description: 'User experience and research prompts',
    systemPrompt: 'You are a UX research expert. Enhance UX prompts with user-centered thinking, research methodologies, and empathy-driven design.',
  },
  {
    id: 'financial-advisor',
    name: 'Financial Advisor',
    description: 'Financial planning and investment prompts',
    systemPrompt: 'You are a certified financial advisor. Enhance financial prompts with investment strategies, risk management, and financial planning expertise.',
  },
  {
    id: 'environmentalist',
    name: 'Environmental Scientist',
    description: 'Environmental science and sustainability prompts',
    systemPrompt: 'You are an environmental scientist. Enhance environmental prompts with ecological knowledge, sustainability principles, and conservation focus.',
  },
  {
    id: 'philosopher',
    name: 'Philosopher',
    description: 'Philosophical inquiry and ethics prompts',
    systemPrompt: 'You are a professional philosopher. Enhance philosophical prompts with critical thinking, ethical frameworks, and logical reasoning.',
  },
  {
    id: 'historian',
    name: 'Historian',
    description: 'Historical analysis and interpretation prompts',
    systemPrompt: 'You are an expert historian. Enhance historical prompts with contextual understanding, source analysis, and chronological perspective.',
  },
  {
    id: 'linguist',
    name: 'Linguist',
    description: 'Language and linguistics prompts',
    systemPrompt: 'You are a professional linguist. Enhance language prompts with linguistic analysis, grammatical expertise, and cultural awareness.',
  },
  {
    id: 'diplomat',
    name: 'Diplomat',
    description: 'International relations and diplomacy prompts',
    systemPrompt: 'You are an experienced diplomat. Enhance diplomatic prompts with international protocol, cross-cultural communication, and negotiation skills.',
  },
  {
    id: 'entrepreneur',
    name: 'Entrepreneur',
    description: 'Startup and business innovation prompts',
    systemPrompt: 'You are an experienced entrepreneur. Enhance business innovation prompts with startup methodologies, creative thinking, and growth strategies.',
  },
  {
    id: 'nonprofit-leader',
    name: 'Nonprofit Leader',
    description: 'Nonprofit management and social impact prompts',
    systemPrompt: 'You are a nonprofit leadership expert. Enhance social impact prompts with mission focus, community engagement, and sustainable strategies.',
  },
  {
    id: 'fitness-trainer',
    name: 'Fitness Trainer',
    description: 'Health, fitness, and wellness prompts',
    systemPrompt: 'You are a certified fitness trainer. Enhance wellness prompts with exercise science, nutrition knowledge, and motivational coaching.',
  },
  {
    id: 'life-coach',
    name: 'Life Coach',
    description: 'Personal development and coaching prompts',
    systemPrompt: 'You are a professional life coach. Enhance coaching prompts with personal development strategies, goal setting, and empowerment techniques.',
  },
  {
    id: 'travel-expert',
    name: 'Travel Expert',
    description: 'Travel planning and exploration prompts',
    systemPrompt: 'You are a travel industry expert. Enhance travel prompts with destination knowledge, cultural insights, and practical travel advice.',
  },
  {
    id: 'tech-evangelist',
    name: 'Technology Evangelist',
    description: 'Technology trends and innovation prompts',
    systemPrompt: 'You are a technology evangelist. Enhance tech prompts with trend analysis, innovation insights, and digital transformation expertise.',
  },
  {
    id: 'cybersecurity-expert',
    name: 'Cybersecurity Expert',
    description: 'Security and privacy protection prompts',
    systemPrompt: 'You are a cybersecurity expert. Enhance security prompts with threat analysis, protection strategies, and privacy best practices.',
  },
  {
    id: 'ai-specialist',
    name: 'AI Specialist',
    description: 'Artificial intelligence and machine learning prompts',
    systemPrompt: 'You are an AI specialist. Enhance AI prompts with deep learning concepts, neural network expertise, and cutting-edge AI knowledge.',
  },
];
