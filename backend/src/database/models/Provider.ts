/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import {CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model} from 'sequelize';

// db
import {getInstance} from '~/database';

// constants
import providers from '~/constants/providers';

export interface ConfigMeta {
  [key: string]: any;
  enabled?: boolean;
  /** Valid API key for authentication */
  apiKey?: string | null;
  /** Base URL for the provider's API */
  baseUrl?: string;
  /** Request timeout in milliseconds (default: 30000) */
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

  /**
   * Check if a provider with the given name exists
   * @param name - Name of the provider to check
   * @returns Promise resolving to true if a provider with the given name exists, false otherwise
   */
  public static async exists(name: string): Promise<boolean> {
    return (await Provider.count({where: {name}})) > 0;
  }

  /**
   * Gets all providers.
   */
  public static async getAllProviders(): Promise<Record<string, ConfigMeta>> {
    const records = await Provider.findAll({attributes: ['name', 'config', 'enabled'], raw: true});

    const config: Record<string, ConfigMeta> = {};

    records.forEach(record => {
      config[record.name] = {
        enabled: Boolean(record.enabled),
        apiKey: '',
        ...(JSON.parse(record?.config as unknown as string)),
      };
    });

    return config;
  }

  /**
   * Gets all default settings.
   */
  public static async getDefaultProviders(): Promise<Record<string, ConfigMeta>> {
    const config: Record<string, ConfigMeta> = {};

    for (const {name, caption, enabled, ...provider} of providers) {
      config[name] = {
        enabled,
        ...provider,
      } as ConfigMeta;
    }

    return config;
  }
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
