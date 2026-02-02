/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

export interface PromptTemplateVariable {
  name: string;
  description: string;
  type: 'string' | 'select' | 'number' | 'boolean' | 'code' | string;
  required?: boolean;
  min?: number;
  max?: number;
  options?: string[];
  defaultValue?: string | number | boolean | null;
  placeholder?: string;
}

export interface PromptTemplate {
  title: string;
  description: string;
  category: string;
  tags: string[];
  tools?: string[];
  content: string;
  variables: PromptTemplateVariable[];
}
