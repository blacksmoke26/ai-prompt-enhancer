/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import {CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model} from 'sequelize';

// db
import {getInstance} from '~/database';

// public types
export type HistoryAttributes = InferAttributes<History>;

/**
 * Represents a history record of provider interactions.
 * @developerNotes
 * - The `meta` field is flexible and can store any JSON-serializable data.
 * - `createdAt` and `updatedAt` are automatically managed by Sequelize.
 */
class History extends Model<InferAttributes<History>, InferCreationAttributes<History>> {
  /** Unique identifier for the history record */
  declare readonly id: CreationOptional<number>;
  /** ID of the associated provider */
  declare providerId: number;
  /** The original prompt sent to the provider */
  declare originalPrompt: string;
  /** The enhanced prompt received from the provider */
  declare enhancedPrompt: string;
  /** The model used for the response */
  declare model: string;
  /** The type of enhancement applied to the prompt */
  declare enhancementType: string;
  /** The role of the user */
  declare userRole: string;
  /** The response received from the provider */
  declare systemPrompt: string;
  /** The number of tokens used for the response */
  declare tokensUsed: number;
  /** The time taken to process the request */
  declare processingTime: number;
  /** The temperature used for the response */
  declare temperature: number;
  /** The maximum number of tokens allowed for the response */
  declare maxTokens: number;
  /** The rating given to the response */
  declare rating: number;
  /** Any additional notes about the response */
  declare notes: string | null;
  /** Optional metadata for the history record */
  declare meta?: Record<string, any>;
  /** Timestamp when the record was created */
  declare readonly createdAt: CreationOptional<Date>;
  /** Timestamp when the record was last updated */
  declare readonly updatedAt?: Date;
}

History.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    providerId: {
      field: 'provider_id',
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: 'Provider', key: 'id' },
      onDelete: 'CASCADE',
    },
    originalPrompt: {
      field: 'original_prompt',
      type: DataTypes.TEXT,
      allowNull: false,
    },
    enhancedPrompt: {
      field: 'enhanced_prompt',
      type: DataTypes.TEXT,
      allowNull: false,
    },
    model: {
      field: 'model',
      type: DataTypes.TEXT,
      allowNull: false,
    },
    enhancementType: {
      field: 'enhancement_type',
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userRole: {
      field: 'user_role',
      type: DataTypes.TEXT,
      allowNull: false,
    },
    systemPrompt: {
      field: 'system_prompt',
      type: DataTypes.TEXT,
      allowNull: false,
    },
    tokensUsed: {
      field: 'tokens_used',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    processingTime: {
      field: 'processing_time',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    temperature: {
      field: 'temperature',
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    maxTokens: {
      field: 'max_tokens',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      field: 'rating',
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    notes: {
      field: 'notes',
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },
    meta: {
      field: 'metadata',
      type: DataTypes.JSON,
      allowNull: true,
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
      comment: 'Created at',
      allowNull: true,
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE,
      comment: 'Updated at',
      allowNull: true,
    },
  },
  {
    tableName: 'history',
    sequelize: getInstance(),
    timestamps: true,
  },
);

export default History;
