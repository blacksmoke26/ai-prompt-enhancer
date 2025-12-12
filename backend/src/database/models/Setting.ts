/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import {CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model} from 'sequelize';

// db
import {getInstance} from '../index';

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
  declare key: string;

  /** The setting value (stored as text) */
  declare value: string;

  /** Timestamp when the record was created (auto-managed) */
  declare readonly createdAt: CreationOptional<Date>;

  /** Timestamp when the record was last updated (optional) */
  declare readonly updatedAt?: Date;
}

Setting.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    key: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    value: {
      type: DataTypes.TEXT,
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
    tableName: 'settings',
    sequelize: getInstance(),
    timestamps: true,
  },
);

export default Setting;
