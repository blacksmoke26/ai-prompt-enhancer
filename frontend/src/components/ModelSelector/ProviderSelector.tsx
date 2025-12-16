/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useMemo} from 'react';
import {Cloud} from 'lucide-react';
import {useAppStore} from '~/stores/appStore';
import {Select} from '~/components/ui/Select';

export interface ProviderSelectorProps {
  className?: string;
}

const ProviderSelector: React.FC<ProviderSelectorProps> = ({className = ''}) => {
  const {models, providers, config, setConfig} = useAppStore();

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
    <Select
      isSearchable
      value={config.provider}
      onChange={(e) => setConfig({provider: e as string})}
      options={providerOptions}
      label={<strong><Cloud className="inline-flex display-inline" size="16"/> AI Provider</strong>}
      formatOptionLabel={(option, context) => {
        return context?.context === 'menu'
          ? <div><Cloud className="inline-flex" size="16"/> {option.label}</div>
          : <div>{option.label}</div>;
      }}
    />
  );
};

export default ProviderSelector;
