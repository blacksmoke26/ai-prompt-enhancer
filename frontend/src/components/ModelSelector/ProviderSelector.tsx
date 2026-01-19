/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useMemo} from 'react';
import {Cloud} from 'lucide-react';

// hooks
import {useAppStore} from '~/stores/appStore';
import {useDataStore} from '~/stores/dataStore';

// ui components
import {SelectAdvanced} from '~/components/ui/SelectAdvanced';

export interface ProviderSelectorProps {
  /** Class name for the component */
  className?: string;
}

/**
 * The ProviderSelector component
 */
const ProviderSelector: React.FC<ProviderSelectorProps> = ({className = ''}) => {
  const {models, providers} = useDataStore();
  const {config, setConfig} = useAppStore();

  // Get provider options for the provider dropdown
  const providerOptions = useMemo(() => {
    // Extract unique provider names from models
    const uniqueProviders = Array.from(new Set(models.map(model => model.provider)));

    // Create a map for O(1) caption lookup by provider name
    const providerMap = new Map(providers.map(provider => [provider.name, provider.caption]));

    // Generate options using the map for efficient lookups
    return uniqueProviders.map(provider => ({
      value: provider,
      label: providerMap.get(provider) || 'Unknown Provider',
      category: provider,
    }));
  }, [models, providers]);

  return (
    <div className={`space-y-2 ${className || ''}`}>
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <strong><Cloud className="inline-flex display-inline" size="16"/> AI Provider</strong>
      </label>
      <SelectAdvanced
        searchable
        clearable={false}
        triggerWidth="w-full"
        onChange={value => setConfig({provider: value as string}, true)}
        value={config.provider as string}
        options={providerOptions}
        formatLabel={option => <div><Cloud className="inline-flex display-inline mr-1" size="16"/> {option.label}</div>}
      />
    </div>
  );
};

export default ProviderSelector;
