/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import {
  Association,
  BelongsTo,
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

// db
import { getInstance } from '~/database';
import Provider from '~/database/models/Provider';

// public types
export type HistoryAttributes = InferAttributes<History>;

/**
 * Metadata for a history record.
 */
export interface HistoryMetadata {
  [key: string]: any;
  /** Request ID */
  requestId?: string;
  /** User ID */
  userId?: string;
  /** Metadata */
  timestamp?: string;
}

/**
 * Represents a history record of provider interactions.
 * @developerNotes
 * - The `meta` field is flexible and can store any JSON-serializable data.
 * - `createdAt` and `updatedAt` are automatically managed by Sequelize.
 */
class History extends Model<
  InferAttributes<History>,
  InferCreationAttributes<History>
> {
  /** Unique identifier for the history record */
  declare readonly id: CreationOptional<number>;
  /** ID of the associated provider */
  declare providerId: number;
  /** The AI prompt used to generate the response from model */
  declare aiPrompt: string | null;
  /** The original prompt sent to the provider */
  declare originalPrompt: string;
  /** The enhanced prompt received from the provider */
  declare enhancedPrompt: string;
  /** The model used for the response */
  declare model: string;
  /** The type of enhancement applied to the prompt */
  declare enhancementType?: string | null;
  /** The role of the user */
  declare userRole: string;
  /** The response received from the provider */
  declare systemPrompt: string;
  /** The number of tokens used for the response */
  declare tokensUsed?: number;
  /** The time taken to process the request */
  declare processingTime: number;
  /** The temperature used for the response */
  declare temperature: number;
  /** The maximum number of tokens allowed for the response */
  declare maxTokens: number;
  /** The rating given to the response */
  declare rating?: number;
  /** Any additional notes about the response */
  declare notes?: string | null;
  /** Optional metadata for the history record */
  declare meta?: Record<string, any>;
  /** Target audience for the response */
  declare targetAudience?: string | null;
  /** Desired tone for the AI response */
  declare tone?: string | null;
  /** Preferred length of the response */
  declare responseLength?: string | null;
  /** Additional user instructions for the AI */
  declare customInstructions?: string | null;
  /** Parameters for the enhancement type */
  declare enhancementParameters?: Record<string, any> | null;
  /** Output format for the enhanced response */
  declare format?: string | null;
  /** Timestamp when the request was made */
  declare timestamp?: string | null;
  /** Additional metadata for the request */
  declare metadata?: HistoryMetadata | null;
  /** Top-p sampling parameter */
  declare topP?: number | null;
  /** Top-k sampling parameter */
  declare topK?: number | null;
  /** Stop sequences for generation */
  declare stopSequences?: string[] | null;
  /** Frequency penalty parameter */
  declare frequencyPenalty?: number | null;
  /** Presence penalty parameter */
  declare presencePenalty?: number | null;
  /** Conversation ID for context */
  declare conversationId?: string | null;
  /** Indicates whether this history entry is pinned for quick access */
  declare pinned?: boolean;
  /** Timestamp when the record was created */
  declare readonly createdAt?: CreationOptional<Date>;
  /** Timestamp when the record was last updated */
  declare readonly updatedAt?: CreationOptional<Date>;

  /** Static associations defined for the HistoryResponse model */
  declare public static associations: {
    provider: BelongsTo<Provider, History>;
  };
}

History.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    providerId: {
      field: 'provider_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Provider', key: 'id' },
      onDelete: 'CASCADE',
    },
    aiPrompt: {
      field: 'ai_prompt',
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
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
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    userRole: {
      field: 'user_role',
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
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
      defaultValue: 0,
    },
    processingTime: {
      field: 'processing_time',
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    temperature: {
      field: 'temperature',
      type: DataTypes.NUMBER,
      allowNull: false,
      defaultValue: 0.8,
    },
    maxTokens: {
      field: 'max_tokens',
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2000,
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
    targetAudience: {
      field: 'target_audience',
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    tone: {
      field: 'tone',
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    responseLength: {
      field: 'response_length',
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    customInstructions: {
      field: 'custom_instructions',
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },
    enhancementParameters: {
      field: 'enhancement_parameters',
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: null,
    },
    format: {
      field: 'format',
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    timestamp: {
      field: 'timestamp',
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    metadata: {
      field: 'metadata',
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: null,
    },
    topP: {
      field: 'top_p',
      type: DataTypes.NUMBER,
      allowNull: true,
      defaultValue: null,
    },
    topK: {
      field: 'top_k',
      type: DataTypes.NUMBER,
      allowNull: true,
      defaultValue: null,
    },
    stopSequences: {
      field: 'stop_sequences',
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: null,
    },
    frequencyPenalty: {
      field: 'frequency_penalty',
      type: DataTypes.NUMBER,
      allowNull: true,
      defaultValue: null,
    },
    presencePenalty: {
      field: 'presence_penalty',
      type: DataTypes.NUMBER,
      allowNull: true,
      defaultValue: null,
    },
    conversationId: {
      field: 'conversation_id',
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    meta: {
      field: 'meta',
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: {},
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
    pinned: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment:
        'Indicates whether this history entry is pinned for quick access',
    },
  },
  {
    tableName: 'history',
    sequelize: getInstance(),
    timestamps: true,
  },
);

export default History;
