/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

// db
import { getInstance } from '~/database';

// public types
export type PromptUserRoleAttributes = InferAttributes<PromptUserRole>;

export enum ExpertiseLevel {
  Associate = 'Associate',
  Junior = 'Junior',
  Mid = 'Mid',
  Senior = 'Senior',
  Expert = 'Expert',
  Principal = 'Principal',
  Fellow = 'Fellow',
  Doctorate = 'Doctorate',
}

/**
 * Represents a user role in an application, defining access permissions and categorization.
 * This class extends Sequelize's Model class to provide database persistence capabilities.
 * It defines the structure of a user role entity with attributes like key, name, and description.
 */
export class PromptUserRole extends Model<
  InferAttributes<PromptUserRole>,
  InferCreationAttributes<PromptUserRole>
> {
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
   * A detailed and comprehensive system-specific prompt or instruction associated with the role
   * This could be used for AI/automation scenarios (e.g., "Grant full access to all systems").
   * This field is optional.
   */
  declare systemPrompt: string;

  /* A minimal system-specific prompt or instruction associated with the role */
  declare systemPromptShort: string;

  /** A concise, one-line summary of the role's primary function */
  declare shortDescription: string;

  /** A more detailed description of the role's responsibilities */
  declare longDescription: string;

  /**
   * A category grouping similar roles (e.g., "Administration", "Data Access").
   * This field is optional and helps organize roles logically.
   */
  declare category: string;

  /** The expertise level of the person */
  declare expertiseLevel: ExpertiseLevel;

  /** The tone or style the model should use in its responses */
  declare tone: string[];

  /** The capabilities the model should prioritize or utilize */
  declare capabilities: string[];

  /** Tags or labels associated with the model's output or purpose */
  declare tags: string[];

  /** The temperature parameter controlling the model's randomness and creativity. */
  declare temperature: number;

  /** A flag indicating whether the user role` is hidden from the user interface. */
  declare hidden?: boolean;

  /**
   * Retrieves the ID associated with a given key from the database.
   * If no record is found, returns a default value of `1`.
   *
   * This method queries the database using the provided `key` to fetch the corresponding record's ID.
   * It uses Sequelize's `findOne` method with raw SQL query execution to ensure direct access to the database row.
   * If the record is not found, it gracefully defaults to returning `1` to avoid undefined behavior.
   *
   * @param key - The unique identifier used to search for the record in the database.
   *               This should correspond to a column (e.g., `key`) in the database table.
   * @returns A Promise that resolves to the ID of the record (number), or `1` if no record is found.
   * @async Indicates that this method performs asynchronous database operations.
   *
   * @example
   * // Example 1: Record exists
   * const id = await PromptUserRole.getIdByKey('user123');
   * console.log(id); // Output: 42 (assuming the record with key 'user123' has ID 42)
   *
   * @example
   * // Example 2: Record does not exist
   * const id = await PromptUserRole.getIdByKey('nonexistent_key');
   * console.log(id); // Output: 1 (fallback value)
   *
   * @example
   * // Example 3: Usage in a service method
   * async function getUserData(key: string) {
   *   const userId = await PromptUserRole.getIdByKey(key);
   *   return await User.findByPk(userId);
   * }
   */
  public static async getIdByKey(key: string): Promise<string> {
    if (Number.isInteger(key)) return key;

    const record = await this.findOne({
      attributes: ['id'],
      where: {
        key,
      },
      raw: true,
    });

    return String(record?.id ?? 1);
  }
}

PromptUserRole.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      comment: 'The primary key of the role. Auto-incremented by the database',
    },
    key: {
      type: DataTypes.STRING,
      primaryKey: false,
      allowNull: false,
      comment: 'A unique identifier for the role',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'The human-readable name of the role',
    },
    systemPrompt: {
      field: 'system_prompt',
      type: DataTypes.TEXT,
      allowNull: false,
      comment: `A system-specific prompt or instruction associated with the role`,
    },
    systemPromptShort: {
      field: 'system_prompt_short',
      type: DataTypes.TEXT,
      allowNull: false,
      comment: `A short system-specific prompt or instruction associated with the role`,
    },
    shortDescription: {
      type: DataTypes.TEXT,
      field: 'short_description',
      allowNull: false,
      comment: `A concise, one-line summary of the role's primary function`,
    },
    longDescription: {
      type: DataTypes.TEXT,
      field: 'long_description',
      allowNull: false,
      comment: `A more detailed description of the role's responsibilities`,
    },
    category: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: ` A category grouping similar roles`,
    },
    expertiseLevel: {
      type: DataTypes.STRING(25),
      field: 'expertise_level',
      allowNull: false,
      defaultValue: 'Mid',
      comment: 'The expertise level of the person',
    },
    tone: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
      comment: 'The tone or style the model should use in its responses',
    },
    capabilities: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
      comment: 'The capabilities the model should prioritize or utilize',
    },
    tags: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
      comment: `Tags or labels associated with the model's output or purpose`,
    },
    temperature: {
      type: DataTypes.NUMBER,
      allowNull: false,
      defaultValue: 0.7,
      comment: `The temperature parameter controlling the model's randomness and creativity.`,
    },
    hidden: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: `A flag indicating whether the user role is hidden from the user interface.`,
    },
  },
  {
    sequelize: getInstance(),
    tableName: 'prompt_user_roles',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['key'],
      },
    ],
  },
);

export default PromptUserRole;
