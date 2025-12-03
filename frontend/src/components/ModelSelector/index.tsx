/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */


import React, {useMemo} from 'react';
import {Puzzle, User2, WandSparkles} from 'lucide-react';

// store
import {useAppStore} from '~/stores/appStore';

// helpers
import {toSelectGroupedOptions} from '~/utils/helpers';

// components
import {Badge} from '~/components/ui/Badge';
import {Select} from '~/components/ui/Select';
import {Card, CardContent, CardHeader, CardTitle} from '~/components/ui/Card';

/**
 * Props for the ModelSelector component
 * @interface ModelSelectorProps
 */
export interface ModelSelectorProps {
  /** Optional CSS class name for styling */
  className?: string;
}

/**
 * AI Configuration selector component for models, enhancements, and roles
 * @component
 * @example
 * <ModelSelector className="w-full max-w-md" />
 * @developerNotes
 * - Uses Zustand store for state management
 * - Split model selection into two dropdowns: provider and model
 * - Groups models by provider for better organization
 * - Displays provider connection status
 * - Includes descriptions for enhancement types and user roles
 *
 * @changes
 * - Split AI Model selection into two dropdowns:
 *   1. Provider selection dropdown
 *   2. Model selection dropdown (filtered by selected provider)
 * - Maintained all existing functionality for enhancement types and user roles
 * - Preserved model display formatting with badges and context information
 */
const ModelSelector: React.FC<ModelSelectorProps> = ({className = ''}) => {
  const {
    models,
    providers,
    selectedModel,
    setSelectedModel,
    setSelectedProvider,
    enhancementTypes,
    userRoles,
    selectedEnhancementType,
    setSelectedEnhancementType,
    selectedUserRole,
    setSelectedUserRole,
    selectedProvider,
  } = useAppStore();

  // Get selected model data
  const selectedModelData = models.find(model => model.id === selectedModel);

  // Get enhancement and role data for display
  const selectedEnhancementData = enhancementTypes.find(type => type.id === selectedEnhancementType);
  const selectedRoleData = userRoles.find(role => role.id === selectedUserRole);

  // Filter models by selected provider
  const filteredModels = useMemo(() => {
    if (!selectedProvider) return [];
    return models.filter(model => model.provider === selectedProvider);
  }, [models, selectedProvider]);

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
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">AI Configuration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Provider Selection */}
        <div>
          <Select
            isSearchable
            value={selectedProvider}
            onChange={(e) => {
              setSelectedProvider(e as string);
              // Reset selected model when provider changes
              setSelectedModel('');
            }}
            options={providerOptions}
            label={<strong><Puzzle className="inline-flex" size="16"/> AI Provider</strong>}
            formatOptionLabel={(option, context) => {
              return context?.context === 'menu'
                ? <div><Puzzle className="inline-flex" size="16"/> {option.label}</div>
                : <div>{option.label} <Badge variant="outline" className="text-xs">{option.category}</Badge></div>;
            }}
          />
        </div>

        {/* Model Selection */}
        <div>
          <Select
            isSearchable
            value={selectedModel}
            onChange={(e, option) => {
              setSelectedModel(e as string);
            }}
            options={toSelectGroupedOptions(filteredModels, 'provider')}
            label={<strong><Puzzle className="inline-flex" size="16"/> AI Model</strong>}
            formatOptionLabel={(option, context) => {
              return context?.context === 'menu'
                ? <div><Puzzle className="inline-flex" size="16"/> {option.label} <span
                  className="text-xs">({option.value.replace(option.label + ':', '')})</span><p
                  className="text-xs pl-5 mt-1">{option.description}</p></div>
                : <div>{option.label} <span className="text-xs">({option.value.replace(option.label + ':', '')})</span>
                  <Badge variant="outline" className="text-xs">{option.category}</Badge></div>;
            }}
            disabled={!selectedProvider}
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

        {/* Enhancement Type */}
        <div>
          <Select
            isSearchable={true}
            value={selectedEnhancementType}
            onChange={(e) => setSelectedEnhancementType(e as string)}
            options={toSelectGroupedOptions(enhancementTypes)}

            label={<strong><WandSparkles className="inline-flex" size="16"/> Enhancement Type</strong>}
            formatOptionLabel={(option, context) => {
              return context?.context === 'menu'
                ? <div><WandSparkles className="inline-flex" size="16"/> {option.label}<p
                  className="text-xs pl-5 mt-1">{option.description}</p></div>
                : <div>{option.label} <Badge variant="outline" className="text-xs">{option.category}</Badge></div>;
            }}
          />
          {selectedEnhancementData && (
            <p className="mt-1 text-xs text-muted-foreground">
              {selectedEnhancementData.description}
            </p>
          )}
        </div>

        {/* User Role */}
        <div>
          <Select
            isSearchable
            value={selectedUserRole}
            onChange={(e) => {
              setSelectedUserRole(e as string);
            }}
            options={toSelectGroupedOptions(userRoles)}
            label={<strong><User2 className="inline-flex" size="16"/> User Role</strong>}
            formatOptionLabel={(option, context) => {
              return context?.context === 'menu'
                ? <div><User2 className="inline-flex" size="16"/> {option.label}<p
                  className="text-xs pl-5 mt-1">{option.description}</p></div>
                : <div>{option.label} <Badge variant="outline" className="text-xs">{option.category}</Badge></div>;
            }}
          />
          {selectedRoleData && (
            <p className="mt-1 text-xs text-muted-foreground">
              {selectedRoleData.description}
            </p>
          )}
        </div>

        {/* Provider Status */}
        <div className="pt-2 border-t border-border">
          <h4 className="text-sm font-medium mb-2">Provider Status</h4>
          <div className="space-y-1">
            {providers.map((provider) => (
              <div key={provider.name} className="flex items-center justify-between">
                <span className="text-sm capitalize">{provider.name}</span>
                <Badge
                  variant={provider.isConfigured ? 'default' : 'destructive'}
                  className="text-xs"
                >
                  {provider.isConfigured ? 'Connected' : 'Not Connected'}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModelSelector;
