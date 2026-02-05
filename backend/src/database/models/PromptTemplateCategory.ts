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
export type PromptTemplateCategoryAttributes = InferAttributes<PromptTemplateCategory>;

/**
 * Prompt template category model
 */
class PromptTemplateCategory extends Model<
  InferAttributes<PromptTemplateCategory>,
  InferCreationAttributes<PromptTemplateCategory>
> {
  /** Unique identifier for the setting record */
  declare readonly id: CreationOptional<number>;
  /** The setting key/name (max 128 characters) */
  declare key: string;
  /** Display name of the category */
  declare label: string;
  /** Description of the category */
  declare description?: string;
}

PromptTemplateCategory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      comment: 'Unique identifier for the category',
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Unique identifier for the category',
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Display name of the category',
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Description of the category',
    },
  },
  {
    tableName: 'prompt_template_categories',
    sequelize: getInstance(),
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['key'],
      },
    ],
  },
);

export default PromptTemplateCategory;
