import React from 'react';
import {Select} from './ui/Select';
import {Card, CardContent, CardHeader, CardTitle} from './ui/Card';
import {Badge} from './ui/Badge';
import {useAppStore} from '~/stores/appStore';

// types
import {AIModel} from '~/types';

/**
 * Props for the ModelSelector component
 * @interface ModelSelectorProps
 */
interface ModelSelectorProps {
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
 * - Groups models by provider for better organization
 * - Displays provider connection status
 * - Includes descriptions for enhancement types and user roles
 */
export const ModelSelector: React.FC<ModelSelectorProps> = ({className}) => {
  const {
    models,
    providers,
    selectedModel,
    setSelectedModel,
    enhancementTypes,
    userRoles,
    selectedEnhancementType,
    setSelectedEnhancementType,
    selectedUserRole,
    setSelectedUserRole,
  } = useAppStore();

  /**
   * Groups AI models by their provider for organized display
   * @returns {Record<string, AIModel[]>} Models grouped by provider name
   */
  const groupedModels = models.reduce((acc, model) => {
    if (!acc[model.provider]) {
      acc[model.provider] = [];
    }
    acc[model.provider].push(model);
    return acc;
  }, {} as Record<string, AIModel[]>);

  /**
   * Generates select options with provider headers and model entries
   * @returns {Array<{value: string, label: string, disabled?: boolean}>}
   */
  const modelOptions = Object.entries(groupedModels).flatMap(([provider, providerModels]) => [
    {value: '', label: `--- ${provider.toUpperCase()} ---`, disabled: true},
    ...providerModels.map(model => ({
      value: model.id,
      label: `${model.name} ${model.description ? `• ${model.description}` : ''}`,
    })),
  ]);

  /**
   * Enhancement type options with descriptions
   * @returns {Array<{value: string, label: string, description: string}>}
   */
  const enhancementOptions = enhancementTypes.map(type => ({
    value: type.id,
    label: type.name,
    description: type.description,
  }));

  /**
   * User role options with descriptions
   * @returns {Array<{value: string, label: string, description: string}>}
   */
  const roleOptions = userRoles.map(role => ({
    value: role.id,
    label: role.name,
    description: role.description,
  }));

  const selectedModelData = models.find(model => model.id === selectedModel);
  const selectedEnhancementData = enhancementTypes.find(type => type.id === selectedEnhancementType);
  const selectedRoleData = userRoles.find(role => role.id === selectedUserRole);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">AI Configuration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Model Selection */}
        <div>
          <Select
            isSearchable
            value={selectedModel}
            onChange={(e) => setSelectedModel(e as string)}
            options={modelOptions}
            label="AI Model"
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
            options={enhancementOptions}
            label="Enhancement Type"
            formatOptionLabel={(option, context) => {
              return context?.context === 'menu'
                ? <div>{option.label}<p className="text-xs">{option.description}</p></div>
                : option.label;
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
            options={roleOptions}
            label="User Role"
            formatOptionLabel={(option, context) => {
              return context?.context === 'menu'
                ? <div>{option.label}<p className="text-xs">{option.description}</p></div>
                : option.label;
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
