/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

// db
import { getInstance } from '~/database';

// public types
export type EnhancementTypeAttributes = InferAttributes<EnhancementType>;


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
 * Represents a type of enhancement in an application, defining the nature and purpose of enhancements.
 * This class extends Sequelize's Model class to provide database persistence capabilities.
 * It defines the structure of an enhancement type entity with attributes like key, name, and description.
 */
export class EnhancementType extends Model<
  InferAttributes<EnhancementType>,
  InferCreationAttributes<EnhancementType>
> {
  /**
   * The primary key of the enhancement type. Auto-incremented by the database.
   * This field is optional during creation but required for updates.
   */
  declare readonly id: CreationOptional<number>;

  /**
   * A unique identifier for the enhancement type (e.g., "speed", "accuracy").
   * This field is required and must be unique across the database.
   */
  declare key: string;

  /**
   * The human-readable name of the enhancement type (e.g., "Speed Boost", "Accuracy Increase").
   * This field is required and should be unique per key.
   */
  declare name: string;

  /**
   * A quick description of the enhancement type
   */
  declare shortDescription: string;

  /**
   * A detailed description of the enhancement type's purpose and effects.
   * This field is optional and provides additional context.
   */
  declare longDescription: string;

  /**
   * A system-specific prompt or instruction associated with the enhancement type.
   * This could be used for AI/automation scenarios (e.g., "Increase processing speed by 20%").
   * This field is optional.
   */
  declare systemPrompt: string;

  /**
   * A category grouping similar enhancement types (e.g., "Performance", "Functionality").
   * This field is optional and helps organize enhancement types logically.
   */
  declare category: string;

  /** A flag indicating whether the enhancement type is hidden from the user interface. */
  declare hidden?: boolean;

  /** Configuration parameters for the enhancement type */
  declare parameters?: Record<string, any>;

  /** Whether chaining of enhancement types is enabled */
  declare chainingEnabled?: boolean;

  /** Template variables that can be replaced in system prompts */
  declare templateVariables?: CreationOptional<string[]>;

  /** Dependencies on other enhancement types */
  declare dependencies?: CreationOptional<string[]>;

  /** Additional metadata for the enhancement type */
  declare metadata?: CreationOptional<{ version: string; author: string }>;

  /** Tags for categorization and filtering */
  declare tags?: string[];

  /** Complexity level of the enhancement type */
  declare complexity?: CreationOptional<Complexity>;

  /** Whether this enhancement type is experimental */
  declare experimental?: boolean;

  /** Example usage for this enhancement type */
  declare exampleUsage?: string;

  /** Performance characteristics */
  declare performance?: CreationOptional<{
    estimatedProcessingTime: number;
    tokenUsage: number;
    complexityScore: number;
  }>;
}

EnhancementType.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    key: {
      type: DataTypes.STRING,
      primaryKey: false,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shortDescription: {
      field: 'short_description',
      type: DataTypes.TEXT,
      allowNull: false,
    },
    longDescription: {
      field: 'long_description',
      type: DataTypes.TEXT,
      allowNull: false,
    },
    systemPrompt: {
      field: 'system_prompt',
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hidden: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    parameters: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: {},
    },
    chainingEnabled: {
      field: 'chaining_enabled',
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    templateVariables: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
    },
    dependencies: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
    },
    metadata: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: {},
    },
    tags: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
    },
    complexity: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'basic',
    },
    experimental: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    exampleUsage: {
      field: 'example_usage',
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },
    performance: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: {},
    },
  },
  {
    sequelize: getInstance(),
    tableName: 'enhancement_types',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['key'],
      },
    ],
  },
);

export default EnhancementType;
