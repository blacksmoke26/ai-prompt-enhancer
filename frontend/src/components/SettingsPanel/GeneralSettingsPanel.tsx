/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';

// ui components
import {Button} from '~/components/ui/Button';
import {Input} from '~/components/ui/Input';
import {Select} from '~/components/ui/Select';
import {Textarea} from '~/components/ui/Textarea';

// types
import type {AppConfig} from '~/types';
import type {Theme} from '~/components/ThemeProvider.tsx';

export interface GeneralSettingsPanelProps {
  /** Current application configuration */
  localConfig: AppConfig;
  /** Function to update the local configuration */
  setLocalConfig: React.Dispatch<React.SetStateAction<AppConfig>>;
  /** Current theme setting */
  theme: Theme;
  /** Function to update the theme setting */
  setTheme: (theme: Theme) => void;
  /** List of available models */
  models: { id: string; name: string; provider: string }[];
}

/**
 * GeneralSettingsPanel component
 * @description Renders a settings panel with controls for appearance, defaults, and behavior settings
 * @example
 * ```tsx
 * <GeneralSettingsPanel
 *   localConfig={config}
 *   setLocalConfig={setConfig}
 *   theme={theme}
 *   setTheme={setTheme}
 *   models={availableModels}
 * />
 * ```
 * @developerNotes This component uses React's functional component approach with TypeScript type safety.
 * It manages state for theme selection, default model selection, system prompt, auto-save behavior, and history limits.
 */
const GeneralSettingsPanel: React.FC<GeneralSettingsPanelProps> = (props) => {
  const {localConfig, setLocalConfig, theme, setTheme, models} = props;
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Appearance</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Theme</label>
            <div className="mt-2">
              <Select
                value={theme}
                onChange={(e) => setTheme(e as any)}
                options={[
                  {value: 'light', label: 'Light'},
                  {value: 'dark', label: 'Dark'},
                ]}
                isSearchable
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Defaults</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Default Model</label>
            <Select
              isSearchable
              value={localConfig.defaultModel}
              onChange={(e) =>
                setLocalConfig({...localConfig, defaultModel: e as string})
              }
              options={models.map((model) => ({
                value: model.id,
                label: `${model.name} (${model.provider})`,
              }))}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Default System Prompt</label>
            <Textarea
              value={localConfig.defaultSystemPrompt}
              onChange={(e) =>
                setLocalConfig({
                  ...localConfig,
                  defaultSystemPrompt: e.target.value,
                })
              }
              placeholder="Enter default system prompt..."
              rows={3}
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Behavior</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium">Auto-save History</label>
              <p className="text-xs text-muted-foreground">
                Automatically save prompt enhancements to history
              </p>
            </div>
            <Button
              variant={localConfig.autoSave ? 'default' : 'outline'}
              onClick={() =>
                setLocalConfig({...localConfig, autoSave: !localConfig.autoSave})
              }
            >
              {localConfig.autoSave ? 'Enabled' : 'Disabled'}
            </Button>
          </div>

          <div>
            <label className="text-sm font-medium">Max History Items</label>
            <Input
              type="number"
              value={localConfig.maxHistoryItems}
              onChange={(e) =>
                setLocalConfig({
                  ...localConfig,
                  maxHistoryItems: parseInt(e.target.value) || 1000,
                })
              }
              min="10"
              max="10000"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralSettingsPanel;
