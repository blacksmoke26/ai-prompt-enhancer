/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

/**
 * Interface for defining advanced enhancement parameters with complex configurations.
 * Used to manage customizable features with detailed metadata and optional settings.
 * @example
 * {
 *   name: 'dynamicTheming',
 *   type: 'boolean',
 *   value: true,
 *   metadata: { priority: 'high', category: 'UI' },
 *   isEnabled: true
 * }
 * @developerNote Use descriptive names and ensure metadata aligns with system categorization. Avoid overloading with unnecessary properties.
 */
export interface EnhancementParameter {
  /** Data type of the parameter (string, number, boolean, or array) */
  type: 'string' | 'number' | 'boolean' | 'array';
  /** Human-readable description of the parameter's purpose */
  description: string;
  /** Whether the parameter is required (default: false) */
  required?: boolean;
  /** Default value when parameter is not provided */
  default?: any;
  /** Allowed values for string parameters (used for validation) */
  options?: string[];
  /** Minimum allowed value for number parameters */
  min?: number;
  /** Maximum allowed value for number parameters */
  max?: number;
}

/**
 * Represents performance metrics for an enhancement, including processing time, token usage, and complexity.
 * Provides quantitative insights into the efficiency and resource requirements of an enhancement.
 * @example
 * {
 *   estimatedProcessingTime: 1200, // 1.2 seconds
 *   tokenUsage: 450, // Approximate number of tokens consumed
 *   complexity: 7 // On a scale from 1 (simple) to 10 (complex)
 * }
 * @developerNote Ensure consistent unit usage (milliseconds for time, tokens for usage) and maintain complexity within the 1-10 range. Consider adding optional metrics like memory usage if needed.
 */
export interface EnhancementPerformance {
  /**
   * Estimated time required to process the enhancement (in milliseconds).
   * Optional; may be omitted if not available or not yet measured.
   */
  estimatedProcessingTime?: number;

  /**
   * Approximate number of tokens consumed during enhancement execution.
   * Optional; useful for tracking resource allocation.
   */
  tokenUsage?: number;

  /**
   * Complexity rating of the enhancement (1-10 scale).
   * 1 = very simple, 10 = highly complex.
   * Optional; may be omitted if not yet evaluated.
   */
  complexity?: number;
}

/**
 * Represents a complexity level, either as a predefined category or a custom string.
 * Useful for categorizing features, tasks, or enhancements based on difficulty or resource requirements.
 * @example
 * 'basic', 'intermediate', 'advanced', or 'custom-level'
 * @developerNote Prefer using 'basic', 'intermediate', or 'advanced' for consistency unless a custom label is explicitly needed. Avoid ambiguous or overly specific custom values.
 */
export type Complexity = 'basic' | 'intermediate' | 'advanced';

/**
 * Advanced enhancement type definition with enhanced capabilities
 */
export interface AdvancedEnhancementType {
  /**
   * Unique identifier for the enhancement type
   */
  id: string;

  /**
   * Human-readable name of the enhancement type
   */
  name: string;

  /**
   * Detailed description of the enhancement's purpose and functionality
   */
  description: string;

  /**
   * System prompt that defines how the enhancement should behave
   */
  systemPrompt: string;

  /**
   * Category for grouping similar enhancement types
   */
  category: string;

  /**
   * Whether the enhancement type is hidden from user interface
   */
  hidden?: boolean;

  /**
   * A flexible parameters object allowing definition of various parameter types with constraints.
   * Used to configure options with type validation, defaults, and range restrictions.
   * @example
   * {
   *   username: { type: 'string', description: 'User identifier', required: true, options: ['admin', 'user'] },
   *   age: { type: 'number', description: 'Age in years', min: 0, max: 120, default: 18 },
   *   isSubscribed: { type: 'boolean', description: 'Subscription status', default: false },
   *   tags: { type: 'array', description: 'List of tags', default: ['general'] }
   * }
   * @developerNote Ensure all keys use descriptive names and maintain type consistency. The 'array' type is represented as a string but indicates an array of strings.
   */
  parameters?: EnhancementParameter;

  /** Whether chaining of enhancement types is enabled */
  chainingEnabled?: boolean;

  /** Template variables that can be replaced in system prompts */
  templateVariables?: string[];

  /** Dependencies on other enhancement types */
  dependencies?: string[];

  /** Additional metadata for the enhancement type */
  metadata?: Record<string, any>;

  /** Tags for categorization and filtering */
  tags?: string[];

  /** Complexity level of the enhancement type */
  complexity?: Complexity;

  /** Whether this enhancement type is experimental */
  experimental?: boolean;

  /** Example usage for this enhancement type */
  exampleUsage?: string;

  /** Performance characteristics */
  performance?: EnhancementPerformance;
}
