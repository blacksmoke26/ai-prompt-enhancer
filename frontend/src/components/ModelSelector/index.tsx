/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';

// store
import { useAppStore } from '~/stores/appStore';

// ui components
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/Card';

// components
import ProviderSelector from './ProviderSelector';
import ModelSelector from './ModelSelector';
import EnhancementTypeSelector from './EnhancementTypeSelector';
import UserRoleSelector from './UserRoleSelector';
import TemperatureSlider from './TemperatureSlider';
import MaxTokensInput from './MaxTokensInput';
import ProviderStatus from './ProviderStatus';

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
const ModelSelectorComponent: React.FC<ModelSelectorProps> = ({ className = '' }) => {
  const {
    selectedProvider,
  } = useAppStore();

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">AI Configuration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ProviderSelector />
        <ModelSelector />
        <EnhancementTypeSelector />
        <UserRoleSelector />
        <TemperatureSlider />
        <MaxTokensInput />
        {selectedProvider && <ProviderStatus />}
      </CardContent>
    </Card>
  );
};

export default ModelSelectorComponent;
