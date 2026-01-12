/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useMemo} from 'react';
import {Brain, Cloud} from 'lucide-react';

// store
import {useAppStore} from '~/stores/appStore';

// ui components
import {Badge} from '~/components/ui/Badge';
import {SelectAdvanced} from '~/components/ui/SelectAdvanced';

// utils
import {toSelectGroupedOptions} from '~/utils/helpers';

/**
 * Interface defining the props for the ModelSelector component.
 * @interface ModelSelectorProps
 */
export interface ModelSelectorProps {
  /** Optional class name for custom styling. */
  className?: string;
}

/**
 * A reusable component for selecting different models with optional styling customization.
 * @example <ModelSelector className="custom-style" />
 * @developerNotes This component is a React.FC with TypeScript support. The className prop allows for flexible styling.
 */
const ModelSelector: React.FC<ModelSelectorProps> = ({className = ''}) => {
  const {models, config, setConfig} = useAppStore();

  // Filter models by selected provider
  const filteredModels = useMemo(() => {
    // Add type guard for provider
    if (typeof config.provider !== 'string' || !config?.provider) {
      console.warn('Invalid provider:', config?.provider);
      return [];
    }

    // Use type assertion to ensure string comparison
    return models.filter(model => model.provider === config.provider as string);
  }, [models, config.provider]);

  // Get selected model data
  const selectedModelData = models.find(model => model.id === config.model);

  return (
    <div className={`space-y-2 ${className || ''}`}>
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <strong><Brain className="inline-flex display-inline" size="16"/> AI Model</strong>
      </label>
      <SelectAdvanced
        searchable
        clearable={false}
        triggerWidth="w-full"
        onChange={name => setConfig({model: name as string}, true)}
        value={config.model as string}
        options={toSelectGroupedOptions(filteredModels as any, 'provider')}
        formatLabel={option => (
          <div><Brain className="inline-flex" size="16"/> {option.label} <span
            className="text-xs">({option.value?.replace?.(option.label + ':', '')})</span><p
            className="text-xs pl-5 mt-1">{option.description}</p></div>
        )}
        disabled={!config.provider}
        selectedOption={(_, option) => (
          <div>
            {option?.label ?? 'Select model'}
            {option?.label && (
              <span className="text-xs">({option?.value?.replace?.(option?.label + ':', '')})</span>
            )}
          </div>
        )}
      />
      {selectedModelData && (
        <div className="mt-2 flex flex-wrap gap-2">
          <Badge variant="secondary" className="text-xs">
            {selectedModelData.provider}
          </Badge>
          {selectedModelData.contextLength && (
            <Badge variant="outline" className="text-xs">
              Context: {selectedModelData.contextLength.toLocaleString()}
            </Badge>
          )}
          {selectedModelData.maxTokens && (
            <Badge variant="outline" className="text-xs">
              Max: {selectedModelData.maxTokens.toLocaleString()}
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default ModelSelector;
