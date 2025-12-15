/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import {CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model} from 'sequelize';

// db
import {getInstance} from '~/database';

/**
 * Represents a type of enhancement in an application, defining the nature and purpose of enhancements.
 * This class extends Sequelize's Model class to provide database persistence capabilities.
 * It defines the structure of an enhancement type entity with attributes like key, name, and description.
 */
export class EnhancementType extends Model<InferAttributes<EnhancementType>, InferCreationAttributes<EnhancementType>> {
  /**
   * The primary key of the enhancement type. Auto-incremented by the database.
   * This field is optional during creation but required for updates.
   */
  declare readonly id: CreationOptional<number>;

  /**
   * A unique identifier for the enhancement type (e.g., "speed", "accuracy").
   * This field is required and must be unique across the database.
   */
  declare key: string;

  /**
   * The human-readable name of the enhancement type (e.g., "Speed Boost", "Accuracy Increase").
   * This field is required and should be unique per key.
   */
  declare name: string;

  /**
   * A detailed description of the enhancement type's purpose and effects.
   * This field is optional and provides additional context.
   */
  declare description: string;

  /**
   * A system-specific prompt or instruction associated with the enhancement type.
   * This could be used for AI/automation scenarios (e.g., "Increase processing speed by 20%").
   * This field is optional.
   */
  declare systemPrompt: string;

  /**
   * A category grouping similar enhancement types (e.g., "Performance", "Functionality").
   * This field is optional and helps organize enhancement types logically.
   */
  declare category: string;
}

EnhancementType.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    key: {
      type: DataTypes.STRING,
      primaryKey: false,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    systemPrompt: {
      field: 'system_prompt',
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: getInstance(),
    tableName: 'enhancement_types',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['key'],
      },
    ],
  },
);

export default EnhancementType;
