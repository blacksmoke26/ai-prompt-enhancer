/**
 * Utility functions for enhancement types
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// types
import type { AdvancedEnhancementType } from '~/types/advanced-enhancement';

/**
 * Check if an enhancement type has parameters.
 * @param enhancementType - Enhancement type to check.
 * @returns True if the enhancement type contains any parameters.
 * @example
 * hasParameters({ parameters: { username: { type: 'string' } } }); // returns true
 * @developerNote Ensure the enhancementType is properly initialized to avoid runtime errors.
 */
export const hasParameters = (
  enhancementType: AdvancedEnhancementType,
): boolean => {
  return Object.keys(enhancementType?.parameters ?? {}).length > 0;
};

/**
 * Get default parameter values for an enhancement type.
 * @param enhancementType - Enhancement type to get defaults for.
 * @returns Object with default parameter values.
 * @example
 * getDefaultParameters({ parameters: { age: { type: 'number', default: 18 } } }); // returns { age: 18 }
 * @developerNote Ensure the enhancementType has parameters before calling this function.
 */
export const getDefaultParameters = (
  enhancementType: Required<AdvancedEnhancementType>,
): Record<string, any> => {
  if (!hasParameters(enhancementType)) return {};

  return Object.fromEntries(
    Object.entries(enhancementType.parameters)
      .filter(([, paramConfig]) => paramConfig?.default !== undefined)
      .map(([paramName, paramConfig]) => [paramName, paramConfig.default])
  );
};

/**
 * Merge provided parameters with default values.
 * @param providedParams - Parameters provided by the user.
 * @param defaultParams - Default parameters from the enhancement type.
 * @returns Merged parameters object with user values taking precedence.
 * @example
 * mergeParameters({ age: 25 }, { age: 18 }); // returns { age: 25 }
 * @developerNote Ensure that defaultParams are fetched using getDefaultParameters() before merging.
 */
export const mergeParameters = (
  providedParams: Record<string, any> | undefined,
  defaultParams: Record<string, any>,
): Record<string, any> => {
  return { ...defaultParams, ...(providedParams || {}) };
};

/**
 * Format an enhancement type for display or serialization.
 * @param enhancementType - Enhancement type to format.
 * @returns Formatted enhancement type object with all properties included.
 * @example
 * formatEnhancementType({ id: '123', name: 'Enhancement A' }); // returns the same object with all properties
 * @developerNote This function is useful for UI rendering or API responses where all properties must be included.
 */
export const formatEnhancementType = (
  enhancementType: AdvancedEnhancementType,
): AdvancedEnhancementType => ({
  id: enhancementType.id,
  name: enhancementType.name,
  description: enhancementType.description,
  systemPrompt: enhancementType.systemPrompt,
  category: enhancementType.category,
  hidden: enhancementType.hidden,
  parameters: enhancementType.parameters,
  chainingEnabled: enhancementType.chainingEnabled,
  templateVariables: enhancementType.templateVariables,
  dependencies: enhancementType.dependencies,
  tags: enhancementType.tags,
  complexity: enhancementType.complexity,
  experimental: enhancementType.experimental,
  exampleUsage: enhancementType.exampleUsage,
  performance: enhancementType.performance,
});
