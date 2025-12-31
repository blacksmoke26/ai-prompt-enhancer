/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import {CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model} from 'sequelize';

// db
import {getInstance} from '~/database';

// public types
export type ToneAttributes = InferAttributes<Tone>;

/**
 * Represents a user role in an application, defining access permissions and categorization.
 * This class extends Sequelize's Model class to provide database persistence capabilities.
 * It defines the structure of a user role entity with attributes like key, name, and description.
 */
export class Tone extends Model<InferAttributes<Tone>, InferCreationAttributes<Tone>> {
  /**
   * The primary key of the role. Auto-incremented by the database.
   * This field is optional during creation but required for updates.
   */
  declare readonly id: CreationOptional<number>;

  /**
   * A unique identifier for the tone (e.g., "friendly", "executive").
   * This field is required and must be unique across the database.
   */
  declare key: string;

  /** The human-readable name of the tone (e.g., "Friendly", "Executive") */
  declare name: string;

  /** A category grouping similar tones (e.g., "Original core tones", "Emotional & Relational") */
  declare category: string;

  /** A flag indicating whether the tone is hidden from the user interface. */
  declare hidden?: boolean;
}

Tone.init(
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
    hidden: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize: getInstance(),
    tableName: 'tones',
    timestamps: false,
    indexes: [
      {
        name: 'UNQ_tones_key',
        fields: ['key'],
        unique: true,
      },
      {
        name: 'IDX_tones_hidden',
        fields: ['hidden'],
        using: 'HASH',
      },
    ],
  },
);

export default Tone;
