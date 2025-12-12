/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import {CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model} from 'sequelize';

// db
import {getInstance} from '~/database';
import {Provider} from './index';

/**
 * Represents a history record of provider interactions.
 * @example
 * ```typescript
 * const history = await History.create({
 *   providerId: 1,
 *   prompt: 'What is the weather today?',
 *   response: 'The weather is sunny with a high of 75°F.',
 *   meta: { temperature: 75, condition: 'sunny' }
 * });
 * ```
 * @developerNotes
 * - The `meta` field is flexible and can store any JSON-serializable data.
 * - `createdAt` and `updatedAt` are automatically managed by Sequelize.
 */
class History extends Model<InferAttributes<History>, InferCreationAttributes<History>> {
  /** Unique identifier for the history record */
  declare readonly id: CreationOptional<number>;
  /** ID of the associated provider */
  declare providerId: number;
  /** The prompt sent to the provider */
  declare prompt: string;
  /** The response received from the provider */
  declare response: string;
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
      references: {model: Provider, key: 'id'},
      onDelete: 'CASCADE',
    },
    prompt: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    response: {
      type: DataTypes.TEXT,
      allowNull: false,
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
