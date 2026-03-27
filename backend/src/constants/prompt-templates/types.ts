/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

 /**
  * Defines the structure for a variable used within a prompt template.
  * This interface allows for the specification of input fields that can be dynamically
  * inserted or modified within the template content.
  */
 export interface PromptTemplateVariable {
   /**
    * A human-readable label for the variable.
    * @note This is optional and typically used for UI display purposes.
    */
   label?: string;

   /**
    * The unique identifier name for the variable.
    * @note This is used to reference the variable within the template content.
    */
   name: string;

   /**
    * A brief explanation of what the variable represents.
    * @note Optional, useful for providing context or tooltips in the user interface.
    */
   description?: string;

   /**
    * The data type of the variable.
    * @note Determines the kind of input control to render (e.g., text box, dropdown).
    */
   type: 'string' | 'select' | 'number' | 'boolean' | 'code' | string;

   /**
    * Indicates whether the variable must be provided a value.
    * @note If true, the template cannot be processed without this variable being set.
    */
   required?: boolean;

   /**
    * The minimum allowed value (for number types) or minimum length (for string types).
    * @note Validation constraint applicable only to specific types like 'number' or 'string'.
    */
   min?: number;

   /**
    * The maximum allowed value (for number types) or maximum length (for string types).
    * @note Validation constraint applicable only to specific types like 'number' or 'string'.
    */
   max?: number;

   /**
    * A list of predefined choices for the variable.
    * @note Used primarily when the type is set to 'select' to populate a dropdown menu.
    */
   options?: string[];

   /**
    * The default value assigned to the variable if no user input is provided.
    * @note Can be null, indicating no default value is set.
    */
   defaultValue?: string | number | boolean | null;

   /**
    * A placeholder text to display when the variable input is empty.
    * @note Helps guide the user on what input is expected.
    */
   placeholder?: string;
 }

 /**
  * Defines the complete structure of a prompt template.
  * This interface encapsulates all metadata, content, and variable definitions required to construct a prompt.
  */
 export interface PromptTemplate {
   /**
    * The title or name of the prompt template.
    * @note A short, descriptive identifier for the template.
    */
   title: string;

   /**
    * A detailed description of what the prompt template does.
    * @note Provides context about the purpose and expected output of the prompt.
    */
   description: string;

   /**
    * The category to which the template belongs.
    * @note Helps in organizing and filtering templates (e.g., 'Coding', 'Writing').
    */
   category: string;

   /**
    * An array of tags associated with the template.
    * @note Useful for searchability and categorization (e.g., ['AI', 'JavaScript', 'Debugging']).
    */
   tags: string[];

   /**
    * A list of tools or external dependencies required by the template.
    * @note Optional; specifies if the prompt execution relies on specific external tools.
    */
   tools?: string[];

   /**
    * The actual content body of the prompt.
    * @note Contains the text and variable placeholders (e.g., `{{name}}`) that form the prompt.
    */
   content: string;

   /**
    * An array of variables defined for use within the template.
    * @note These variables allow for dynamic customization of the prompt content.
    */
   variables: PromptTemplateVariable[];
 }
