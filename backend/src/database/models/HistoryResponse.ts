/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import {
  Association,
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

// db
import { getInstance } from '~/database';
import History from '~/database/models/History';

// public types
export type HistoryResponseAttributes = InferAttributes<HistoryResponse>;

/**
 * Represents a response associated with a history record.
 * @developerNotes
 * - `createdAt` and `updatedAt` are automatically managed by Sequelize.
 */
class HistoryResponse extends Model<
  InferAttributes<HistoryResponse>,
  InferCreationAttributes<HistoryResponse>
> {
  /** Unique identifier for the history response record */
  declare readonly id: CreationOptional<number>;
  /** ID of the associated history record */
  declare historyId: number;
  /** The response content */
  declare response: CreationOptional<string>;
  /** Timestamp when the record was created */
  declare readonly createdAt?: CreationOptional<Date>;
  /** Timestamp when the record was last updated */
  declare readonly updatedAt?: CreationOptional<Date>;

  /**
   * Association declarations
   */
  declare history?: History;

  /** Static associations defined for the HistoryResponse model */
  declare public static associations: {
    history: Association<HistoryResponse, History>;
  };
}

HistoryResponse.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    historyId: {
      field: 'history_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'history',
        key: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    },
    response: {
      field: 'response',
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
    tableName: 'history_responses',
    sequelize: getInstance(),
    timestamps: true,
  },
);

export default HistoryResponse;
