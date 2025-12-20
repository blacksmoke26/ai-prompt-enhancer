/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import {CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model} from 'sequelize';

// db
import {getInstance} from '~/database';

/**
 * Represents a user role in an application, defining access permissions and categorization.
 * This class extends Sequelize's Model class to provide database persistence capabilities.
 * It defines the structure of a user role entity with attributes like key, name, and description.
 */
export class UserRole extends Model<InferAttributes<UserRole>, InferCreationAttributes<UserRole>> {
  /**
   * The primary key of the role. Auto-incremented by the database.
   * This field is optional during creation but required for updates.
   */
  declare readonly id: CreationOptional<number>;

  /**
   * A unique identifier for the role (e.g., "admin", "user").
   * This field is required and must be unique across the database.
   */
  declare key: string;

  /**
   * The human-readable name of the role (e.g., "Administrator", "Standard User").
   * This field is required and should be unique per key.
   */
  declare name: string;

  /**
   * A detailed description of the role's purpose and permissions.
   * This field is optional and provides additional context.
   */
  declare description: string;

  /**
   * A system-specific prompt or instruction associated with the role.
   * This could be used for AI/automation scenarios (e.g., "Grant full access to all systems").
   * This field is optional.
   */
  declare systemPrompt: string;

  /**
   * A category grouping similar roles (e.g., "Administration", "Data Access").
   * This field is optional and helps organize roles logically.
   */
  declare category: string;

  /** A flag indicating whether the user role` is hidden from the user interface. */
  declare hidden?: boolean;
}

UserRole.init(
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
    hidden: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
  },
  {
    sequelize: getInstance(),
    tableName: 'user_roles',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['key'],
      },
    ],
  },
);

export default UserRole;
