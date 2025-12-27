/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import {CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model} from 'sequelize';

// db
import {getInstance} from '../index';

// types
import {ConfigKey, configuration} from '~/constants/configuration';

// public types
export type SettingAttributes = InferAttributes<Setting>;

/**
 * Represents a setting key-value pair stored in the database.
 *
 * @example
 * ```typescript
 * // Create a new setting
 * const setting = await Setting.create({
 *   key: 'theme',
 *   value: 'dark'
 * });
 *
 * // Update a setting
 * await Setting.update(
 *   { value: 'light' },
 *   { where: { key: 'theme' } }
 * );
 * ```
 *
 * @developerNotes
 * - This model uses Sequelize's infer types for TypeScript type safety.
 * - All timestamps are handled automatically by Sequelize.
 * - The `key` field should be unique in practice (enforced at application level).
 */
class Setting extends Model<InferAttributes<Setting>, InferCreationAttributes<Setting>> {
  /** Unique identifier for the setting record */
  declare readonly id: CreationOptional<number>;

  /** The setting key/name (max 128 characters) */
  declare key: ConfigKey | string;

  /** The setting value (stored as text) */
  declare value: string | null;

  /** The description */
  declare description: string | null;

  /** Timestamp when the record was created (auto-managed) */
  declare readonly createdAt: CreationOptional<Date>;

  /** Timestamp when the record was last updated (optional) */
  declare readonly updatedAt?: Date;

  /**
   * Gets a setting value by key.
   * @param key - The setting key
   * @param [defaultValue] - Default value to return if the setting is not found
   * @returns The setting value or the default value if not found
   */
  public static async getByKey<T = any>(key: ConfigKey | string, defaultValue: T = null as T): Promise<T> {
    const record = await Setting.findOne({where: {key}, attributes: ['value'], raw: true});

    return !record?.value
      ? defaultValue
      : JSON.parse(record?.value) as T;
  }

  /**
   * Check if a setting with the given key exists
   * @param key - The setting key
   * @returns Promise resolving to true if a setting with the given key exists, false otherwise
   */
  public static async keyExists(key: ConfigKey | string): Promise<boolean> {
    return (await Setting.count({where: {key}})) > 0;
  }

  /**
   * Gets all settings.
   * @returns All settings as a record
   */
  public static async getAllSettings(): Promise<Record<ConfigKey | string, any>> {
    const records = await Setting.findAll({attributes: ['key', 'value'], raw: true});
    const config: Record<ConfigKey | string, any> = {};
    records.forEach(record => {
      config[record.key] = !record.value ? null : JSON.parse(record.value);
    });

    return config;
  }

  /**
   * Gets all default settings.
   */
  public static async getDefaultSettings(): Promise<Record<ConfigKey | string, any>> {
    const config: Record<ConfigKey | string, any> = {};

    for (const conf of configuration) {
      config[conf.key] = conf.defaultValue;
    }

    return config;
  }
}

Setting.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    key: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
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
    tableName: 'settings',
    sequelize: getInstance(),
    timestamps: true,
  },
);

export default Setting;
