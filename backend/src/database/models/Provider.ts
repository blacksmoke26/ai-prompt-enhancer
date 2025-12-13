/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import {CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model} from 'sequelize';

// db
import {getInstance} from '~/database';

export interface ConfigMeta {
  [key: string]: any;

  apiKey: string | null;
  baseUrl: string;
  timeout?: number;
}

/**
 * Represents a provider configuration with API credentials and settings.
 *
 * @example
 * ```typescript
 * const provider = Provider.build({
 *   name: 'OpenAI',
 *   apiKey: 'sk-1234567890',
 *   config: { model: 'gpt-4', maxTokens: 2048 },
 *   enabled: true
 * });
 * ```
 *
 * @developerNotes
 * - The `config` property accepts any JSON-compatible object for provider-specific settings
 * - `apiKey` is optional to support providers that don't require authentication
 * - Timestamps are automatically managed by Sequelize
 */
class Provider extends Model<InferAttributes<Provider>, InferCreationAttributes<Provider>> {
  /** Unique identifier for the provider record (auto-generated) */
  declare readonly id: CreationOptional<number>;

  /** Human-readable name of the provider (must be unique) */
  declare caption: CreationOptional<string>;

  /** Human-readable name of the provider (must be unique) */
  declare name: string;

  /** Provider-specific configuration object (JSON format) */
  declare config: ConfigMeta;

  /** Whether this provider is currently active (defaults to false) */
  declare enabled: boolean;

  /** Record creation timestamp (auto-generated) */
  declare readonly createdAt: CreationOptional<Date>;

  /** Last modification timestamp (nullable) */
  declare readonly updatedAt?: Date;
}

Provider.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    caption: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
    config: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
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
    tableName: 'providers',
    sequelize: getInstance(),
    timestamps: true,
  },
);

export default Provider;
