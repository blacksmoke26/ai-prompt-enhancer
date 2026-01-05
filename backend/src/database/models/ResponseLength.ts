/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import {CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model} from 'sequelize';

// db
import {getInstance} from '~/database';

// public types
export type ResponseLengthAttributes = InferAttributes<ResponseLength>;

export enum ResponseLengthTone {
  Casual = 'casual',
  Formal = 'formal',
  Neutral = 'neutral',
  Technical = 'technical'
}

/**
 * Represents a user role in an application, defining access permissions and categorization.
 * This class extends Sequelize's Model class to provide database persistence capabilities.
 * It defines the structure of a user role entity with attributes like key, name, and description.
 */
export class ResponseLength extends Model<InferAttributes<ResponseLength>, InferCreationAttributes<ResponseLength>> {
  /**
   * The primary key of the role. Auto-incremented by the database.
   * This field is optional during creation but required for updates.
   */
  declare readonly id: CreationOptional<number>;

  /**
   * A unique identifier for the response length (e.g., "short", "detailed").
   * This field is required and must be unique across the database.
   */
  declare key: string;

  /** The human-readable name of the role (e.g., "Short", "Detailed") */
  declare name: string;

  /** A category grouping similar response lengths (e.g., "Original values", "Structured formats") */
  declare category: string;

  /**
   * A brief summary of the purpose or function.
   * Ideal for quick overviews in API documentation.
   */
  declare shortDescription: string;

  /**
   * A concise summary of the entity's role.
   * Used in navigation or indexing within documentation.
   */
  declare summary: string;

  /**
   * A detailed explanation of the entity's functionality.
   * Should cover behavior, inputs, and outputs.
   */
  declare description: string;

  /**
   * A list of parameters or inputs required by the entity.
   * Format: parameterName (type), parameterName (type)
   */
  declare parameters: Record<string, any>;

  /**
   * Keywords or tags for categorization.
   * Used for filtering and searching in documentation.
   */
  declare tags: CreationOptional<string[]>;

  /**
   * Defines the tone or formality level of the documentation.
   */
  declare tone: CreationOptional<ResponseLengthTone>;

  /** A flag indicating whether the response length is hidden from the user interface. */
  declare hidden?: boolean;
}

ResponseLength.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    key: {
      type: DataTypes.STRING(50),
      primaryKey: false,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shortDescription: {
      field: 'short_description',
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parameters: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: {},
    },
    tags: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
    tone: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ResponseLengthTone.Neutral,
    },
    hidden: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize: getInstance(),
    tableName: 'response_length',
    timestamps: false,
    indexes: [
      {
        name: 'UNQ_response_length_key',
        fields: ['key'],
        unique: true,
      },
      {
        name: 'IDX_response_length_hidden',
        fields: ['hidden'],
        using: 'HASH',
      },
    ],
  },
);

export default ResponseLength;
