/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// schemas
import schema500WithError from '~/fastify/schemas/generic/500.schema';
import schema404WithError from '~/fastify/schemas/generic/404.schema';
import schema422WithError from '~/fastify/schemas/generic/422.schema';
import schema503WithError from '~/fastify/schemas/generic/503.schema';

// types
import type { FastifySchema } from 'fastify';
import type { JSONSchema7 } from 'json-schema';

export default {
  summary: 'Stream',
  description: 'Streams enhanced prompt response using the specified AI provider',
  tags: ['Prompt'],
  security: [],
  body: {
    type: 'object',
    properties: {
      text: {
        type: 'string',
        description:
          'The main input text to be processed or enhanced. This is the core content that the model will work with.',
        examples: ['Analyze the dataset and generate a summary'],
      },
      systemPrompt: {
        type: 'string',
        description:
          "The system message that sets the context or rules for the model's behavior. This is typically used to define the model's role or constraints.",
        examples: ['You are a data analyst specializing in financial trends.'],
      },
      format: {
        type: 'string',
        enum: ['json', 'markdown', 'text', 'html', 'xml', 'yaml', 'csv'],
        description:
          'The desired format of the output. Supported formats include JSON, Markdown, plain text, HTML, XML, YAML, and CSV.',
        examples: ['markdown'],
      },
      userRole: {
        type: 'string',
        description:
          'The role the user is playing in the interaction. This defines the context for how the model should interpret and respond to the input.',
        examples: ['data scientist'],
      },
      enhancementType: {
        type: 'string',
        description:
          'The type of enhancement or transformation to apply to the input text. This could include summarization, translation, formatting, etc.',
        examples: ['summarize'],
      },
      provider: {
        type: 'string',
        description:
          "Optional: The AI provider to use (e.g., 'OpenAI', 'Anthropic', 'Google').",
        examples: ['Anthropic'],
      },
      model: {
        type: 'string',
        description: 'Optional: The specific model name or identifier to use.',
        examples: ['claude-3-5-sonnet'],
      },
      targetAudience: {
        type: 'string',
        description:
          'Optional: The target audience for the output content. This influences tone, complexity, and language choices.',
        examples: ['technical audience'],
      },
      tone: {
        type: 'string',
        description:
          'Optional: The tone of the output (e.g., formal, casual, professional).',
        examples: ['professional'],
      },
      responseLength: {
        type: 'string',
        description:
          "Optional: The desired length of the output response. Common values: 'short', 'medium', 'long', 'extensive'.",
        examples: ['medium'],
      },
      customInstructions: {
        type: 'string',
        description:
          'Optional: Custom instructions to supplement the main prompt. These are additional guidelines for the model to follow.',
        examples: ['Include a table of key findings'],
      },
      temperature: {
        type: 'number',
        description:
          'Optional: Controls the randomness of the output. Lower values make the output more deterministic.',
        default: 0.7,
        examples: [0.5],
        minimum: 0,
        maximum: 2,
      },
      maxTokens: {
        type: 'integer',
        description:
          'Optional: Maximum number of tokens (words) to generate in the output.',
        examples: [1024],
        minimum: 1,
      },
      topP: {
        type: 'number',
        description:
          'Optional: Controls the diversity of the generated text. Higher values allow for more diverse outputs.',
        examples: [0.95],
        minimum: 0,
        maximum: 1,
      },
      topK: {
        type: 'integer',
        description:
          'Optional: Controls the diversity of the generated text based on token probabilities.',
        examples: [50],
        minimum: 1,
      },
      frequencyPenalty: {
        type: 'number',
        description:
          'Optional: Penalizes frequent token usage to reduce repetition.',
        examples: [0.2],
        minimum: -2,
        maximum: 2,
      },
      presencePenalty: {
        type: 'number',
        description:
          'Optional: Penalizes new topic introduction to keep the response focused.',
        examples: [0.1],
        minimum: -2,
        maximum: 2,
      },
      stopSequences: {
        type: 'array',
        items: {
          type: 'string',
        },
        description: 'Optional: Sequences to stop token generation at.',
        examples: [['<END>', '<STOP>']],
      },
      timestamp: {
        type: 'string',
        format: 'date-time',
        description:
          'Optional: Timestamp for tracking when the prompt was created.',
        examples: ['2023-10-05T14:30:00Z'],
      },
      conversationId: {
        type: 'string',
        description:
          'Optional: Unique identifier for the conversation or session.',
        examples: ['chat_12345'],
      },
      offTheRecord: {
        type: 'boolean',
        description:
          'Optional: If true, the response will not be tied to previous interactions.',
        examples: [true],
      },
      enhancementParameters: {
        type: 'object',
        additionalProperties: true,
        description:
          'Optional: Custom parameters for the enhancement process. This allows passing arbitrary metadata or configuration.',
        examples: [{ theme: 'dark', version: '2.1' }],
      },
      cognitiveLoad: {
        type: 'string',
        enum: ['low', 'medium', 'high'],
        description:
          "The cognitive load required to understand the content. Options: 'low' (simple concepts), 'medium', 'high' (complex analysis).",
        examples: ['medium'],
      },
      informationDensity: {
        type: 'string',
        enum: ['sparse', 'balanced', 'dense'],
        description:
          "The density of information per concept in the output. Options: 'sparse' (brief), 'balanced', 'dense' (detailed).",
        examples: ['balanced'],
      },
      abstractionLevel: {
        type: 'string',
        enum: ['concrete', 'abstract', 'mixed'],
        description:
          "The level of abstraction in the content. Options: 'concrete' (specific examples), 'abstract', 'mixed'.",
        examples: ['mixed'],
      },
      metaphorUsage: {
        type: 'string',
        enum: ['none', 'light', 'heavy'],
        description:
          "The use of metaphors in the output. Options: 'none', 'light' (occasional), 'heavy' (figurative language).",
        examples: ['light'],
      },
      ambiguityTolerance: {
        type: 'string',
        enum: ['low', 'medium', 'high'],
        description:
          "The tolerance for ambiguity in the content. Options: 'low' (precise), 'medium', 'high' (open-ended).",
        examples: ['medium'],
      },
      sentenceStructure: {
        type: 'string',
        enum: ['simple', 'compound', 'complex', 'varied'],
        description:
          "The complexity of sentence structures in the output. Options: 'simple', 'compound', 'complex', 'varied'.",
        examples: ['varied'],
      },
      paragraphFlow: {
        type: 'string',
        enum: ['linear', 'circular', 'pyramidal'],
        description:
          "The flow pattern of paragraphs in the output. Options: 'linear' (sequential), 'circular' (repetitive), 'pyramidal'.",
        examples: ['linear'],
      },
      listStyle: {
        type: 'string',
        enum: ['bulleted', 'numbered', 'inline', 'none'],
        description:
          "The style of lists used in the output. Options: 'bulleted', 'numbered', 'inline', 'none'.",
        examples: ['bulleted'],
      },
      headingHierarchy: {
        type: 'boolean',
        description:
          'Whether to include a hierarchical structure of headings in the output.',
        examples: [true],
      },
      culturalContext: {
        type: 'string',
        description:
          'The cultural context to consider when generating the content.',
        examples: ['US-West'],
      },
      domainSpecificity: {
        type: 'string',
        description: 'The specific domain or subject area of the content.',
        examples: ['Quantum Physics'],
      },
      technicalJargonLevel: {
        type: 'string',
        enum: ['none', 'layman', 'professional', 'academic'],
        description:
          "The level of technical jargon to use. Options: 'none', 'layman', 'professional', 'academic'.",
        examples: ['professional'],
      },
      regulatoryCompliance: {
        type: 'array',
        items: {
          type: 'string',
        },
        description: 'Regulatory compliance requirements for the output.',
        examples: [['GDPR', 'HIPAA']],
      },
      emotionalIntensity: {
        type: 'integer',
        description:
          'The intensity of emotional expression in the output. Range: 1 (flat) to 10 (passionate).',
        examples: [7],
        minimum: 1,
        maximum: 10,
      },
      persuasionTechnique: {
        type: 'string',
        enum: ['ethos', 'pathos', 'logos', 'kairos'],
        description:
          "The persuasion technique to use. Options: 'ethos' (credibility), 'pathos' (emotion), 'logos' (logic), 'kairos' (timing).",
        examples: ['logos'],
      },
      empathyLevel: {
        type: 'integer',
        description:
          'The level of empathy to express in the output. Range: 1 (neutral) to 10 (deep empathy).',
        examples: [5],
        minimum: 1,
        maximum: 10,
      },
      strictness: {
        type: 'integer',
        description:
          'The strictness of output formatting constraints. Range: 1 (loose) to 10 (rigid).',
        examples: [6],
        minimum: 1,
        maximum: 10,
      },
      minimalOutput: {
        type: 'boolean',
        description:
          'If true, removes all conversational filler and focuses on core content.',
        examples: [true],
      },
      includeMetadata: {
        type: 'boolean',
        description:
          'If true, appends metadata about the reasoning process to the output.',
        examples: [false],
      },
      language: {
        type: 'string',
        description: 'The language code for the output (ISO 639-1 standard).',
        examples: ['en'],
        pattern: '^[a-z]{2}$',
      },
      encoding: {
        type: 'string',
        enum: ['utf-8', 'ascii'],
        description: 'The character encoding to use for the output.',
        examples: ['utf-8'],
      },
    },
    required: ['text', 'provider', 'model'],
    additionalProperties: false,
  } as JSONSchema7,
  response: {
    500: schema500WithError('Prompt enhancement streaming failed'),
    503: schema503WithError('Provider is not available'),
    404: schema404WithError('Provider not found'),
    422: schema422WithError('Validation failed'),
    200: {
      type: 'object',
      description: 'Streaming response with enhanced prompt',
      properties: {
        enhancedPrompt: {
          type: 'string',
          description: 'The enhanced version of the original prompt',
          examples: [
            'Explain quantum computing in simple terms, focusing on basic principles and applications',
          ],
        },
        originalPrompt: {
          type: 'string',
          description: 'The original prompt that was submitted',
          examples: ['Explain quantum computing'],
        },
        model: {
          type: 'string',
          description: 'Identifier of the AI model used',
          examples: ['gpt-4-turbo'],
        },
        timestamp: {
          type: 'string',
          format: 'date-time',
          description: 'Timestamp when the response was generated',
          examples: ['2023-05-15T10:30:00Z'],
        },
        tokensUsed: {
          type: 'integer',
          description: 'Number of tokens used in the processing',
          examples: [120],
        },
        processingTime: {
          type: 'integer',
          description: 'Time taken to process the prompt in milliseconds',
          examples: [1250],
        },
      },
      required: [
        'enhancedPrompt',
        'originalPrompt',
        'model',
        'timestamp',
        'processingTime',
      ],
      additionalProperties: false,
    },
  },
} as FastifySchema;
