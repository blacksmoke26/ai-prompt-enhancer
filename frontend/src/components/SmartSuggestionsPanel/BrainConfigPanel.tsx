/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useCallback, useEffect, useState} from 'react';
import {Brain, BrainCircuit, LayersIcon} from 'lucide-react';
import {Slider} from '@radix-ui/themes';

// libs
import {EnhancedAIBrainConfig} from '~/lib/ai-brain-enhanced.ts';

// ui components
import {Switch} from '~/components/ui/Switch.tsx';
import {Select} from '~/components/ui/Select.tsx';

/**
 * Defines the props for the BrainConfigPanel component, which allows users to configure AI brain settings with optional advanced mode toggles.
 * @example
 * const props = {
 *   config: { learningRate: 0.1, memoryRetention: 0.8 },
 *   onConfigChange: (newConfig) => setConfig(newConfig),
 *   isAdvancedMode: false
 * };
 * @developerNotes Ensure `EnhancedAIBrainConfig` is properly typed and exported. Implement `onConfigChange` to handle state updates in parent components. Use `isAdvancedMode` to conditionally render advanced settings.
 */
export interface BrainConfigPanelProps {
  /** The current configuration state for the AI brain. This is a partial object to allow for optional configuration updates */
  config: Partial<EnhancedAIBrainConfig>;
  /** Callback function triggered when the configuration changes. This is used to update the parent component's state or persist the new configuration */
  onConfigChange: (config: Partial<EnhancedAIBrainConfig>) => void;
  /** Controls whether advanced configuration options are visible. When `true`, additional settings are shown to the user */
  isAdvancedMode: boolean;
}

/**
 * Renders a configuration panel for AI brain settings, allowing users to adjust parameters and toggle advanced options.
 * @example
 * <BrainConfigPanel
 *   config={{ learningRate: 0.1, memoryRetention: 0.8 }}
 *   onConfigChange={(newConfig) => setConfig(newConfig)}
 *   isAdvancedMode={true}
 * />
 * @developerNotes Ensure `EnhancedAIBrainConfig` is properly typed and exported. Implement `onConfigChange` to handle state updates in parent components. Use `isAdvancedMode` to conditionally render advanced settings based on user preferences.
 */
const BrainConfigPanel: React.FC<BrainConfigPanelProps> = (props) => {
  const {config, onConfigChange, isAdvancedMode} = props;

  const [localConfig, setLocalConfig] = useState(config);

  useEffect(() => {
    setLocalConfig(config);
  }, [config]);

  const updateConfig = useCallback((updates: Partial<EnhancedAIBrainConfig>) => {
    const newConfig = {...localConfig, ...updates};
    setLocalConfig(newConfig);
    onConfigChange(newConfig);
  }, [localConfig, onConfigChange]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium"><Brain className="display-inline h-4 w-4"/> Self-Assessment</label>
          <Switch
            checked={localConfig.core?.enableSelfAssessment}
            onCheckedChange={(value) => updateConfig({core: {...localConfig.core, enableSelfAssessment: value}})}
          >

          </Switch>
        </div>
        <p className="text-xs text-muted-foreground">
          Enable AI to evaluate its own limitations and biases
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium"><BrainCircuit
            className="display-inline h-4 w-4"/> Meta-Cognition</label>
          <Switch
            checked={localConfig.core?.enableMetaCognition}
            onCheckedChange={(value) => updateConfig({core: {...localConfig.core, enableMetaCognition: value}})}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Enable AI to think about its own thinking process
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium"><LayersIcon className="display-inline h-4 w-4"/> Quantum
            Reasoning</label>
          <Switch
            checked={localConfig.advanced?.enableQuantumReasoning}
            onCheckedChange={(value) => updateConfig({
              advanced: {
                ...localConfig.advanced,
                enableQuantumReasoning: value,
              },
            })}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Enable multi-state reasoning and probabilistic outcomes
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Intelligence Mode</label>
        <Select
          value={localConfig.core?.enableEthicalFramework ? 'ethics-focused' : 'performance-focused'}
          options={[
            {label: 'Performance Focused', value: 'performance-focused'},
            {label: 'Ethics Focused', value: 'ethics-focused'},
            {label: 'Balanced', value: 'balanced'},
          ]}
          onChange={(value) => {
            const ethicalFramework = value === 'ethics-focused' || value === 'balanced';
            updateConfig({
              core: {...localConfig.core, enableEthicalFramework: ethicalFramework},
              neuralWeights: {
                ...localConfig.neuralWeights,
                ethicalAlignment: value === 'ethics-focused' ? 0.15 : (value === 'balanced' ? 0.08 : 0.03),
              },
            });
          }}
        />
        <p className="text-xs text-muted-foreground">
          Control the balance between performance and ethical considerations
        </p>
      </div>

      {isAdvancedMode && (
        <div className="space-y-4 pt-4 border-t border-border">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Learning Rate</label>
              <span className="text-xs text-muted-foreground">{localConfig.core?.learningRate?.toFixed(2)}</span>
            </div>
            <Slider
              value={[localConfig.core?.learningRate || 0.1]}
              max={1}
              step={0.05}
              onValueChange={([value]) => updateConfig({core: {...localConfig.core, learningRate: value}})}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Innovation Threshold</label>
              <span className="text-xs text-muted-foreground">{localConfig.core?.innovationThreshold?.toFixed(2)}</span>
            </div>
            <Slider
              value={[localConfig.core?.innovationThreshold || 0.7]}
              max={1}
              step={0.05}
              onValueChange={([value]) => updateConfig({core: {...localConfig.core, innovationThreshold: value}})}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Max Suggestions</label>
              <span className="text-xs text-muted-foreground">{localConfig.core?.maxSuggestions || 10}</span>
            </div>
            <Slider
              value={[localConfig.core?.maxSuggestions || 10]}
              max={20}
              step={1}
              onValueChange={([value]) => updateConfig({
                core: {
                  ...localConfig.core,
                  maxSuggestions: Math.round(value),
                },
              })}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BrainConfigPanel;
