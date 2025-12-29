/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import { kebabCase } from 'case-anything';

// db
import { EnhancementType } from '~/database/models';

// types
import {
  AdvancedEnhancementType,
  Complexity,
} from '~/types/advanced-enhancement';

/**
 * Service for managing advanced enhancement types
 */
export default abstract class AdvancedEnhancementService {
  /**
   * Get all available enhancement types with advanced features
   * @returns Promise resolving to array of advanced enhancement types
   */
  public static async getAllEnhancementTypes(): Promise<
    AdvancedEnhancementType[]
  > {
    try {
      const records = await EnhancementType.findAll({
        attributes: [
          'id',
          'key',
          'name',
          'description',
          'systemPrompt',
          'category',
          'hidden',
          'parameters',
          'chainingEnabled',
          'templateVariables',
          'dependencies',
          'metadata',
          'tags',
          'complexity',
          'experimental',
          'exampleUsage',
          'performance',
        ],
        order: [['id', 'ASC']],
        raw: true,
      });

      return records.map((record) => ({
        id: record.key,
        name: record.name,
        description: record.description,
        systemPrompt: record.systemPrompt,
        category: record.category,
        hidden: Boolean(record.hidden),
        parameters: record.parameters ? JSON.parse(record.parameters) : {},
        chainingEnabled: record.chainingEnabled ?? false,
        templateVariables: record.templateVariables
          ? JSON.parse(record.templateVariables)
          : [],
        dependencies: record.dependencies
          ? JSON.parse(record.dependencies)
          : [],
        metadata: record.metadata ? JSON.parse(record.metadata) : {},
        tags: record.tags ? JSON.parse(record.tags) : [],
        complexity: record?.complexity || 'basic',
        experimental: record.experimental ?? false,
        exampleUsage: record.exampleUsage || '',
        performance: record.performance ? JSON.parse(record.performance) : {},
      }));
    } catch (error) {
      console.error('Failed to get enhancement types:', error);
      throw new Error('Failed to fetch enhancement types');
    }
  }

  /**
   * Get a specific enhancement type by ID
   * @param id - Enhancement type ID
   * @returns Promise resolving to advanced enhancement type
   */
  public static async getEnhancementType(
    id: string,
  ): Promise<AdvancedEnhancementType | null> {
    try {
      const record = await EnhancementType.findOne({
        attributes: [
          'id',
          'key',
          'name',
          'description',
          'systemPrompt',
          'category',
          'hidden',
          'parameters',
          'chainingEnabled',
          'templateVariables',
          'dependencies',
          'metadata',
          'tags',
          'complexity',
          'experimental',
          'exampleUsage',
          'performance',
        ],
        where: { key: id },
        raw: true,
      });

      if (!record) {
        return null;
      }

      return {
        id: record.key,
        name: record.name,
        description: record.description,
        systemPrompt: record.systemPrompt,
        category: record.category,
        hidden: Boolean(record.hidden),
        parameters: record.parameters ? JSON.parse(record.parameters) : {},
        chainingEnabled: record.chainingEnabled ?? false,
        templateVariables: record.templateVariables
          ? JSON.parse(record.templateVariables)
          : [],
        dependencies: record.dependencies
          ? JSON.parse(record.dependencies)
          : [],
        metadata: record.metadata ? JSON.parse(record.metadata) : {},
        tags: record.tags ? JSON.parse(record.tags) : [],
        complexity: record.complexity || 'basic',
        experimental: record.experimental ?? false,
        exampleUsage: record.exampleUsage || '',
        performance: record.performance ? JSON.parse(record.performance) : {},
      };
    } catch (error) {
      console.error(`Failed to get enhancement type ${id}:`, error);
      throw new Error(`Failed to fetch enhancement type ${id}`);
    }
  }

  /**
   * Update an enhancement type with advanced features
   * @param id - Enhancement type ID
   * @param data - Updated enhancement type data
   * @returns Promise resolving to updated enhancement type
   */
  public static async updateEnhancementType(
    id: string,
    data: Partial<AdvancedEnhancementType>,
  ): Promise<AdvancedEnhancementType> {
    try {
      const record = await EnhancementType.findOne({
        where: { key: id },
        raw: true,
      });

      if (!record) {
        throw new Error(`Enhancement type ${id} not found`);
      }

      // Update the record in database
      await EnhancementType.update(
        {
          name: data.name || record.name,
          description: data.description || record.description,
          systemPrompt: data.systemPrompt || record.systemPrompt,
          category: data.category || record.category,
          hidden: data.hidden ?? record.hidden,
          parameters: data.parameters ? JSON.stringify(data.parameters) : '',
          chainingEnabled: data.chainingEnabled ?? record.chainingEnabled,
          templateVariables: data.templateVariables
            ? JSON.stringify(data.templateVariables)
            : '',
          dependencies: data.dependencies
            ? JSON.stringify(data.dependencies)
            : '',
          metadata: data.metadata ? JSON.stringify(data.metadata) : '',
          tags: data.tags ? JSON.stringify(data.tags) : '',
          complexity: data.complexity || record.complexity,
          experimental: data.experimental ?? record.experimental,
          exampleUsage: data.exampleUsage || '',
          performance: data.performance ? JSON.stringify(data.performance) : '',
        },
        { where: { key: id } },
      );

      // Return updated enhanced type
      return {
        id,
        name: data.name || record.name,
        description: data.description || record.description,
        systemPrompt: data.systemPrompt || record.systemPrompt,
        category: data.category || record.category,
        hidden: data.hidden ?? record.hidden,
        parameters: data.parameters,
        chainingEnabled: data.chainingEnabled ?? false,
        templateVariables: data.templateVariables || [],
        dependencies: data.dependencies || [],
        metadata: data.metadata || {},
        tags: data.tags || [],
        complexity: data.complexity || 'basic',
        experimental: data.experimental ?? false,
        exampleUsage: data.exampleUsage || '',
        performance: data.performance || {},
      };
    } catch (error) {
      console.error(`Failed to update enhancement type ${id}:`, error);
      throw new Error(`Failed to update enhancement type ${id}`);
    }
  }

  /**
   * Create a new enhancement type with advanced features
   * @param data - New enhancement type data
   * @returns Promise resolving to created enhancement type
   */
  public static async createEnhancementType(
    data: Omit<AdvancedEnhancementType, 'id'>,
  ): Promise<AdvancedEnhancementType> {
    const key = kebabCase(data.name);

    // checks that key exists, if it does, throw an error
    if (await EnhancementType.count({ where: { key } })) {
      console.error(`Enhancement type ${data.name} already exists`);
      throw new Error('Enhancement type already exists');
    }

    try {
      const record = await EnhancementType.create({
        key,
        name: data.name,
        description: data.description,
        systemPrompt: data.systemPrompt,
        category: data.category,
        hidden: data.hidden ?? false,
        parameters: data.parameters ? JSON.stringify(data.parameters) : '',
        chainingEnabled: data.chainingEnabled ?? false,
        templateVariables: data.templateVariables
          ? JSON.stringify(data.templateVariables)
          : '',
        dependencies: data.dependencies
          ? JSON.stringify(data.dependencies)
          : '',
        metadata: data.metadata ? JSON.stringify(data.metadata) : '',
        tags: data?.tags ? JSON.stringify(data.tags) : '',
        complexity: (data.complexity || 'basic') as Complexity,
        experimental: data.experimental ?? false,
        exampleUsage: data?.exampleUsage,
        performance: data?.performance ? JSON.stringify(data.performance) : '',
      });

      return {
        id: record.key,
        name: record.name,
        description: record.description,
        systemPrompt: record.systemPrompt,
        category: record.category,
        hidden: Boolean(record.hidden),
        parameters: data.parameters,
        chainingEnabled: data.chainingEnabled ?? false,
        templateVariables: data.templateVariables || [],
        dependencies: data.dependencies || [],
        metadata: data.metadata || {},
        tags: data.tags || [],
        complexity: (data.complexity || 'basic') as Complexity,
        experimental: data.experimental ?? false,
        exampleUsage: data.exampleUsage || '',
        performance: data.performance || {},
      };
    } catch (error) {
      console.error('Failed to create enhancement type:', error);
      throw new Error('Failed to create enhancement type');
    }
  }

  /**
   * Validate enhancement type parameters
   * @param id - Enhancement type ID
   * @param parameters - Parameters to validate
   * @returns Promise resolving to validation result
   */
  public static async validateParameters(
    id: string,
    parameters: Record<string, any>,
  ): Promise<{ isValid: boolean; errors?: string[] }> {
    try {
      const enhancementType = await this.getEnhancementType(id);

      if (!enhancementType || !enhancementType.parameters) {
        return { isValid: true };
      }

      const errors: string[] = [];

      for (const [paramName, paramConfig] of Object.entries(
        enhancementType.parameters,
      )) {
        const value = parameters[paramName];

        if (paramConfig.required && (value === undefined || value === null)) {
          errors.push(`Parameter '${paramName}' is required`);
          continue;
        }

        if (value !== undefined && value !== null) {
          // Type validation
          if (paramConfig.type === 'number' && typeof value !== 'number') {
            errors.push(`Parameter '${paramName}' must be a number`);
          } else if (
            paramConfig.type === 'boolean' &&
            typeof value !== 'boolean'
          ) {
            errors.push(`Parameter '${paramName}' must be a boolean`);
          } else if (paramConfig.type === 'array' && !Array.isArray(value)) {
            errors.push(`Parameter '${paramName}' must be an array`);
          }

          // Range validation for numbers
          if (
            paramConfig.type === 'number' &&
            (paramConfig.min !== undefined || paramConfig.max !== undefined)
          ) {
            if (paramConfig.min !== undefined && value < paramConfig.min) {
              errors.push(
                `Parameter '${paramName}' must be at least ${paramConfig.min}`,
              );
            }
            if (paramConfig.max !== undefined && value > paramConfig.max) {
              errors.push(
                `Parameter '${paramName}' must be at most ${paramConfig.max}`,
              );
            }
          }

          // Option validation
          if (paramConfig.options && !paramConfig.options.includes(value)) {
            errors.push(
              `Parameter '${paramName}' must be one of: ${paramConfig.options.join(', ')}`,
            );
          }
        }
      }

      return {
        isValid: errors.length === 0,
        errors: errors.length > 0 ? errors : undefined,
      };
    } catch (error) {
      console.error(
        `Failed to validate parameters for enhancement type ${id}:`,
        error,
      );
      return { isValid: false, errors: ['Validation failed'] };
    }
  }

  /**
   * Get enhancement types by category
   * @param category - Category name
   * @returns Promise resolving to array of enhancement types in category
   */
  public static async getEnhancementTypesByCategory(
    category: string,
  ): Promise<AdvancedEnhancementType[]> {
    try {
      const records = await EnhancementType.findAll({
        attributes: [
          'id',
          'key',
          'name',
          'description',
          'systemPrompt',
          'category',
          'hidden',
          'parameters',
          'chainingEnabled',
          'templateVariables',
          'dependencies',
          'metadata',
          'tags',
          'complexity',
          'experimental',
          'exampleUsage',
          'performance',
        ],
        where: { category },
        order: [['id', 'ASC']],
        raw: true,
      });

      return records.map((record) => ({
        id: record.key,
        name: record.name,
        description: record.description,
        systemPrompt: record.systemPrompt,
        category: record.category,
        hidden: Boolean(record.hidden),
        parameters: record.parameters ? JSON.parse(record.parameters) : {},
        chainingEnabled: record.chainingEnabled ?? false,
        templateVariables: record.templateVariables
          ? JSON.parse(record.templateVariables)
          : [],
        dependencies: record.dependencies
          ? JSON.parse(record.dependencies)
          : [],
        metadata: record.metadata ? JSON.parse(record.metadata) : {},
        tags: record.tags ? JSON.parse(record.tags) : [],
        complexity: record.complexity || 'basic',
        experimental: record.experimental ?? false,
        exampleUsage: record.exampleUsage || '',
        performance: record.performance ? JSON.parse(record.performance) : {},
      }));
    } catch (error) {
      console.error(
        `Failed to get enhancement types by category ${category}:`,
        error,
      );
      throw new Error(
        `Failed to fetch enhancement types by category ${category}`,
      );
    }
  }

  /**
   * Get enhancement types by tags
   * @param tags - Array of tags to filter by
   * @returns Promise resolving to array of enhancement types matching tags
   */
  public static async getEnhancementTypesByTags(
    tags: string[],
  ): Promise<AdvancedEnhancementType[]> {
    // Note: This would require updating the database schema to support tagging
    // For now, return all types as this is a basic implementation
    return await this.getAllEnhancementTypes();
  }

  /**
   * Get enhancement type complexity statistics
   * @returns Promise resolving to complexity distribution
   */
  public static async getComplexityStats(): Promise<Record<string, number>> {
    try {
      const records = await EnhancementType.findAll({
        attributes: ['category'],
        raw: true,
      });

      const stats: Record<string, number> = {};

      for (const record of records) {
        const category = record.category || 'Uncategorized';
        stats[category] = (stats[category] || 0) + 1;
      }

      return stats;
    } catch (error) {
      console.error('Failed to get complexity stats:', error);
      return {};
    }
  }

  /**
   * Get all enhancement types that can be chained with the given type
   * @param enhancementTypeId - The ID of the enhancement type
   * @returns Promise resolving to array of compatible enhancement types
   */
  public static async getCompatibleChainedTypes(
    enhancementTypeId: string,
  ): Promise<AdvancedEnhancementType[]> {
    try {
      // Get the enhancement type to check chaining capabilities
      const enhancementType = await this.getEnhancementType(enhancementTypeId);

      if (!enhancementType || !enhancementType.chainingEnabled) {
        return [];
      }

      // Get all enhancement types (in a real implementation, this would filter based on dependencies)
      const allTypes = await this.getAllEnhancementTypes();

      // Filter to only include those that are not the same as the current type
      return allTypes.filter((type) => type.id !== enhancementTypeId);
    } catch (error) {
      console.error(
        `Failed to get compatible chained types for ${enhancementTypeId}:`,
        error,
      );
      return [];
    }
  }

  /**
   * Validate if two enhancement types can be chained together
   * @param firstType - First enhancement type ID
   * @param secondType - Second enhancement type ID
   * @returns Promise resolving to validation result
   */
  public static async validateChaining(
    firstType: string,
    secondType: string,
  ): Promise<{ isValid: boolean; errors?: string[] }> {
    try {
      const firstEnhancement = await this.getEnhancementType(firstType);
      const secondEnhancement = await this.getEnhancementType(secondType);

      if (!firstEnhancement || !secondEnhancement) {
        return {
          isValid: false,
          errors: ['One or both enhancement types not found'],
        };
      }

      const errors: string[] = [];

      // Check dependencies
      if (
        firstEnhancement.dependencies &&
        firstEnhancement.dependencies.includes(secondType)
      ) {
        errors.push(
          `"${secondType}" is a dependency of "${firstType}" but should come first`,
        );
      }

      if (
        secondEnhancement.dependencies &&
        secondEnhancement.dependencies.includes(firstType)
      ) {
        errors.push(
          `"${firstType}" is a dependency of "${secondType}" but should come first`,
        );
      }

      return {
        isValid: errors.length === 0,
        errors: errors.length > 0 ? errors : [],
      };
    } catch (error: any) {
      console.error(
        `Failed to validate chaining between ${firstType} and ${secondType}:`,
        error,
      );
      return {
        isValid: false,
        errors: [error?.message || 'Chaining validation failed'],
      };
    }
  }
}
