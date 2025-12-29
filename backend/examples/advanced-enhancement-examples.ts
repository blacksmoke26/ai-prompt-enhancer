/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import type { AdvancedEnhancementType } from '~/types/advanced-enhancement';

/**
 * Advanced enhancement type examples with enhanced capabilities
 */
export const advancedEnhancementExamples: AdvancedEnhancementType[] = [
  {
    id: 'custom-enhance',
    name: 'Custom Enhancement',
    description: 'A flexible enhancement type that can be customized with parameters',
    systemPrompt: 'You are a flexible prompt engineer. Enhance the user\'s prompt based on the provided parameters. {{complexity}} level complexity requested.',
    category: 'Technical',
    parameters: {
      complexity: {
        type: 'number',
        description: 'Complexity level of the enhancement (1-10)',
        required: false,
        default: 5,
        min: 1,
        max: 10
      },
      focus: {
        type: 'string',
        description: 'Focus area for the enhancement',
        required: false,
        options: ['clarity', 'specificity', 'effectiveness', 'grammar']
      }
    },
    chainingEnabled: true,
    templateVariables: ['complexity', 'focus'],
    dependencies: [],
    metadata: {
      version: '1.0',
      author: 'AI Prompt Engineering Team'
    },
    tags: ['flexible', 'customizable'],
    complexity: 'intermediate',
    experimental: false,
    exampleUsage: 'Use with complexity=7 and focus="specificity" for highly specific prompts',
    performance: {
      estimatedProcessingTime: 150,
      tokenUsage: 120,
      complexity: 6
    }
  },
  {
    id: 'chain-optimized',
    name: 'Chain Optimization',
    description: 'Optimizes prompt chains for maximum effectiveness',
    systemPrompt: 'You are a prompt chaining expert. Optimize the sequence of enhancements for maximum effectiveness. Current chain: {{chain}}',
    category: 'Advanced',
    parameters: {
      chain: {
        type: 'array',
        description: 'Array of enhancement types in the chain',
        required: true
      },
      optimizationLevel: {
        type: 'number',
        description: 'Level of optimization (0-100)',
        required: false,
        default: 75,
        min: 0,
        max: 100
      }
    },
    chainingEnabled: true,
    templateVariables: ['chain', 'optimizationLevel'],
    dependencies: ['enhance', 'optimize'],
    metadata: {
      version: '1.0',
      author: 'AI Prompt Engineering Team'
    },
    tags: ['optimization', 'chaining'],
    complexity: 'advanced',
    experimental: true,
    exampleUsage: 'Chain this with enhance and optimize for best results',
    performance: {
      estimatedProcessingTime: 300,
      tokenUsage: 200,
      complexity: 8
    }
  },
  {
    id: 'context-aware',
    name: 'Context-Aware Enhancement',
    description: 'Enhances prompts with contextual awareness',
    systemPrompt: 'You are a context-aware AI. Enhance the prompt with relevant context information. Context: {{context}}',
    category: 'Technical',
    parameters: {
      context: {
        type: 'string',
        description: 'Additional context information to include',
        required: true
      },
      relevance: {
        type: 'number',
        description: 'Relevance level (0-100)',
        required: false,
        default: 80,
        min: 0,
        max: 100
      }
    },
    chainingEnabled: true,
    templateVariables: ['context', 'relevance'],
    dependencies: ['enhance'],
    metadata: {
      version: '1.0',
      author: 'AI Prompt Engineering Team'
    },
    tags: ['context', 'awareness'],
    complexity: 'intermediate',
    experimental: false,
    exampleUsage: 'Use with context="technical documentation" and relevance=90',
    performance: {
      estimatedProcessingTime: 200,
      tokenUsage: 150,
      complexity: 7
    }
  },
  {
    id: 'multi-language',
    name: 'Multi-Language Enhancement',
    description: 'Enhances prompts for multilingual contexts',
    systemPrompt: 'You are a multilingual expert. Enhance the prompt to be effective in multiple languages. Primary language: {{language}}',
    category: 'Language',
    parameters: {
      language: {
        type: 'string',
        description: 'Primary language for the enhancement',
        required: false,
        default: 'English',
        options: ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese']
      },
      dialect: {
        type: 'string',
        description: 'Specific dialect or regional variant',
        required: false
      }
    },
    chainingEnabled: true,
    templateVariables: ['language', 'dialect'],
    dependencies: ['multilingual'],
    metadata: {
      version: '1.0',
      author: 'AI Prompt Engineering Team'
    },
    tags: ['language', 'multilingual'],
    complexity: 'intermediate',
    experimental: false,
    exampleUsage: 'Use with language="Spanish" and dialect="Latin American"',
    performance: {
      estimatedProcessingTime: 180,
      tokenUsage: 140,
      complexity: 6
    }
  },
  {
    id: 'performance-focus',
    name: 'Performance-Focused Enhancement',
    description: 'Enhances prompts with performance optimization in mind',
    systemPrompt: 'You are a performance optimization expert. Enhance the prompt focusing on computational efficiency and speed. Target performance: {{targetPerformance}}',
    category: 'Technical',
    parameters: {
      targetPerformance: {
        type: 'string',
        description: 'Performance target (speed, memory, accuracy)',
        required: false,
        default: 'speed',
        options: ['speed', 'memory', 'accuracy', 'balanced']
      },
      threshold: {
        type: 'number',
        description: 'Performance threshold percentage',
        required: false,
        default: 85,
        min: 0,
        max: 100
      }
    },
    chainingEnabled: true,
    templateVariables: ['targetPerformance', 'threshold'],
    dependencies: ['optimize'],
    metadata: {
      version: '1.0',
      author: 'AI Prompt Engineering Team'
    },
    tags: ['performance', 'optimization'],
    complexity: 'advanced',
    experimental: true,
    exampleUsage: 'Use with targetPerformance="memory" and threshold=90',
    performance: {
      estimatedProcessingTime: 250,
      tokenUsage: 180,
      complexity: 7
    }
  }
];