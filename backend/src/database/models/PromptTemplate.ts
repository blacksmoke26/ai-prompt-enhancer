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
import PromptTemplateCategory from '~/database/models/PromptTemplateCategory';

// public types
export type PromptTemplateAttributes = InferAttributes<PromptTemplate>;

export interface TemplateVariable {
  /** The name of the variable */
  name: string;
  /** The description of the variable */
  description: string;
  /** The type of the variable */
  type: 'string' | 'select' | 'number' | 'boolean' | 'code' | string;
  /** Whether the variable is required */
  required?: boolean;
  /** The minimum value for the variable */
  min?: number;
  /** The maximum value for the variable */
  max?: number;
  /** Options for select type */
  options?: string[];
  /** The default value for the variable */
  defaultValue?: string | number | boolean | null;
  /** The placeholder for the variable */
  placeholder?: string;
}

export class PromptTemplate extends Model<
  InferAttributes<PromptTemplate>,
  InferCreationAttributes<PromptTemplate>
> {
  /** Unique identifier */
  declare id: CreationOptional<number>;
  /** The category of the prompt */
  declare categoryId: number;
  /** The title of the prompt */
  declare title: string;
  /** The description of the prompt */
  declare description: string;
  /** The tags associated with the prompt */
  declare tags: string[];
  /** The tools associated with the prompt */
  declare tools: string[];
  /** The content of the prompt */
  declare content: string;
  /** The variables used in the prompt */
  declare variables: TemplateVariable[];

  /**
   * Association declarations
   */
  declare category?: PromptTemplateCategory;

  /** Static associations defined for the HistoryResponse model */
  declare public static associations: {
    category: Association<PromptTemplate, PromptTemplateCategory>;
  };
}

PromptTemplate.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      comment: 'Unique identifier for the category',
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: 'Category for the prompt',
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Title of the prompt',
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: 'Description of the prompt',
    },
    tags: {
      type: DataTypes.JSON,
      allowNull: false,
      comment: 'Tags for the prompt',
      defaultValue: [],
    },
    tools: {
      type: DataTypes.JSON,
      allowNull: true,
      comment: 'Tools associated with the prompt',
      defaultValue: [],
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: 'Content of the prompt',
    },
    variables: {
      type: DataTypes.JSON,
      allowNull: false,
      comment: 'Variables for the prompt',
      defaultValue: [],
    },
  },
  {
    sequelize: getInstance(),
    tableName: 'prompt_templates',
    timestamps: false,
  },
);

export default PromptTemplate;
