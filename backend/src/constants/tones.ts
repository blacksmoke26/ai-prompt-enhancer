/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

/**
 * A constant array of tone groups, where each group contains a set of related tone names categorized under a specific theme or context.
 * This structure is useful for organizing and retrieving tones based on predefined categories (e.g., formality, emotional tone, or technical contexts).
 * @example [
 *   {
 *     category: 'Original core tones',
 *     tones: ['formal', 'casual', 'professional', 'friendly', ...]
 *   }
 * ]
 * @developerNotes Ensure that tone group categories are distinct and meaningful, and that tones are logically grouped to avoid overlaps. Use consistent naming for `id` and `category` values.
 */
export const TONES_GROUPED: { category: string; tones: string[] }[] = [
  {
    category: 'Original core tones',
    tones: ['formal', 'casual', 'professional', 'friendly', 'academic', 'creative', 'technical'],
  },
  {
    category: 'Formality & Professional Contexts',
    tones: [
      'business', 'corporate', 'legal', 'diplomatic', 'authoritative', 'objective', 'neutral',
      'official', 'bureaucratic', 'executive', 'boardroom', 'compliance-oriented', 'regulatory',
    ],
  },
  {
    category: 'Emotional & Relational',
    tones: [
      'empathetic', 'compassionate', 'supportive', 'encouraging', 'uplifting', 'reassuring',
      'sincere', 'humble', 'grateful', 'apologetic', 'respectful', 'warm', 'kind', 'gentle',
      'enthusiastic', 'passionate', 'excited', 'optimistic', 'hopeful', 'playful', 'cheerful',
      'whimsical', 'witty', 'sarcastic', 'dry', 'deadpan', 'ironic', 'cynical', 'pessimistic',
      'nostalgic', 'melancholic', 'somber', 'urgent', 'alarmed', 'concerned', 'soothing',
    ],
  },
  {
    category: 'Style & Expression',
    tones: [
      'conversational', 'colloquial', 'narrative', 'storytelling', 'descriptive', 'vivid',
      'minimalist', 'concise', 'succinct', 'verbose', 'eloquent', 'poetic', 'lyrical', 'rhythmic',
      'metaphorical', 'symbolic', 'abstract', 'literal', 'direct', 'indirect', 'subtle',
      'dramatic', 'theatrical', 'cinematic', 'epic', 'mythic',
    ],
  },
  {
    category: 'Persuasive & Rhetorical',
    tones: [
      'persuasive', 'convincing', 'compelling', 'motivational', 'inspirational', 'provocative',
      'challenging', 'confrontational', 'assertive', 'confident', 'bold', 'defiant', 'rebellious',
      'diplomatic', 'tactful', 'non-confrontational', 'mediating', 'harmonious',

    ],
  },
  {
    category: 'Educational & Explanatory',
    tones: [
      'instructional', 'tutorial', 'didactic', 'expository', 'explanatory', 'clarifying',
      'scholarly', 'research-based', 'analytical', 'critical', 'evaluative', 'comparative',
      'scientific', 'empirical', 'methodical', 'systematic', 'logical', 'rational', 'evidence-based',
    ],
  },
  {
    category: 'Creative & Artistic',
    tones: [
      'artistic', 'imaginative', 'experimental', 'avant-garde', 'surreal', 'dreamlike',
      'fantastical', 'futuristic', 'retro', 'vintage', 'quirky', 'eccentric', 'unconventional',
    ],
  },
  {
    category: 'Journalistic & Media',
    tones: [
      'journalistic', 'newsy', 'investigative', 'exposé', 'editorial', 'opinionated',
      'balanced', 'unbiased', 'sensational', 'clickbaity', 'tabloid', 'documentary-style',
    ],
  },
  {
    category: 'Technical & Specialized',
    tones: [
      'engineering', 'developer-focused', 'code-centric', 'architectural', 'systemic',
      'diagnostic', 'troubleshooting', 'how-to', 'step-by-step', 'API-style', 'CLI-like',
    ],
  },
  {
    category: 'Audience-Oriented',
    tones: [
      'youthful', 'teen-friendly', 'childlike', 'parental', 'elderly-appropriate',
      'inclusive', 'accessible', 'culturally-sensitive', 'globally-aware', 'localized',
      'mentoring', 'coaching', 'peer-to-peer', 'collegial', 'academic-peer', 'student-friendly',
    ],
  },
  {
    category: 'Brand & Marketing',
    tones: [
      'brand-aligned', 'on-message', 'premium', 'luxury', 'minimal-brand', 'vibrant',
      'trustworthy', 'authentic', 'relatable', 'aspirational', 'disruptive', 'innovative',
      'customer-centric', 'user-first', 'solution-oriented', 'benefit-driven',
    ],
  },
  {
    category: 'Mood & Atmosphere',
    tones: [
      'calm', 'peaceful', 'serene', 'tense', 'suspenseful', 'mysterious', 'eerie',
      'celebratory', 'festive', 'solemn', 'ceremonial', 'ritualistic', 'meditative',
    ],
  },
];

/**
 * A constant array representing predefined tone categories or styles, typically used to categorize communication styles, design elements, or other thematic classifications.
 * @example ["formal", "casual"]
 * @developerNotes This array is extensible and should remain consistent with the project's terminology and use cases (e.g., "professional" vs "informal" if needed).
 */
export const TONES: string[] = TONES_GROUPED.reduce((acc: string[], group) => {
  acc.push(...group.tones);
  return acc;
}, []);
