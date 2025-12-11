/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useMemo} from 'react';
import {Cloud, Hash} from 'lucide-react';
import {useAppStore} from '~/stores/appStore';
import {Select} from '~/components/ui/Select';

export interface ProviderSelectorProps {
  className?: string;
}

const ProviderSelector: React.FC<ProviderSelectorProps> = ({className = ''}) => {
  const {
    models,
    selectedProvider,
    setSelectedProvider,
  } = useAppStore();

  // Get provider options for the provider dropdown
  const providerOptions = useMemo(() => {
    const providerNames = Array.from(new Set(models.map(model => model.provider)));
    return providerNames.map(provider => ({
      value: provider,
      label: provider,
      category: provider,
    }));
  }, [models]);

  return (
    <Select
      isSearchable
      value={selectedProvider}
      onChange={(e) => {
        setSelectedProvider(e as string);
      }}
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
