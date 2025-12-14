/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useMemo} from 'react';
import {Brain} from 'lucide-react';

// store
import {useAppStore} from '~/stores/appStore';

// ui components
import {Select} from '~/components/ui/Select';
import {Badge} from '~/components/ui/Badge';

// utils
import {toSelectGroupedOptions} from '~/utils/helpers.ts';

export interface ModelSelectorProps {
  className?: string;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({className = ''}) => {
  const {models, config, setConfig} = useAppStore();

  // Filter models by selected provider
  const filteredModels = useMemo(() => {
    if (!config.provider) return [];
    return models.filter(model => model.provider === config.provider);
  }, [models, config.provider]);

  // Get selected model data
  const selectedModelData = models.find(model => model.id === config.model);

  return (
    <div className={className}>
      <Select
        isSearchable
        value={config.model}
        onChange={(name) => {
          setConfig({model: name as string});
        }}
        options={toSelectGroupedOptions(filteredModels as any, 'provider')}
        label={<strong><Brain className="inline-flex display-inline" size="16"/> AI Model</strong>}
        formatOptionLabel={(option, context) => {
          return context?.context === 'menu'
            ? <div><Brain className="inline-flex" size="16"/> {option.label} <span
              className="text-xs">({option.value?.replace?.(option.label + ':', '')})</span><p
              className="text-xs pl-5 mt-1">{option.description}</p></div>
            : (
              <div>
                {option.label} <span className="text-xs">({option?.value?.replace?.(option.label + ':', '')})</span>
              </div>
            );
        }}
        disabled={!config.provider}
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
