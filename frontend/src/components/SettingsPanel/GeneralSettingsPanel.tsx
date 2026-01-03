/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {Brain} from 'lucide-react';
import {Button} from '@radix-ui/themes';

// ui components
import {Input} from '~/components/ui/Input';
import {SelectAdvanced} from '~/components/ui/SelectAdvanced';
import {AdvancedTextarea} from '~/components/ui/AdvancedTextarea';

// utils
import {toSelectGroupedOptions} from '~/utils/helpers';

// types
import type {AppConfig} from '~/types';
import type {Theme} from '~/components/ThemeProvider';

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
            <div className="text-sm font-medium mb-2">Theme</div>
            <div className="mt-2">
              <SelectAdvanced
                value={theme}
                onChange={(e) => setTheme(e as any)}
                options={[
                  {value: 'light', label: 'Light'},
                  {value: 'dark', label: 'Dark'},
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Defaults</h3>
        <div className="space-y-4">
          <div>
            <div className="text-sm font-medium mb-2"><Brain className="inline-flex display-inline" size="16"/> Default Model</div>
            <SelectAdvanced
              searchable
              value={localConfig.defaultModel}
              onChange={(e) =>
                setLocalConfig({...localConfig, defaultModel: e as string})
              }
              options={toSelectGroupedOptions(models, 'provider')}
              triggerWidth="w-full"
              selectedOption={(_, option) => (
                <div>
                  {option.label} <span
                  className="text-xs">({option.value?.replace?.(option.label + ':', '')} | {option.category})</span>
                </div>
              )}
              formatLabel={option => (
                <div>{option.label}
                  <span className="text-xs">({option.value?.replace?.(option.label + ':', '')})</span>
                </div>
              )}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Default System Prompt</label>
            <AdvancedTextarea
              maxLength={300} showCopyButton
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
              variant={localConfig.autoSave ? 'soft' : 'outline'}
              onClick={() =>
                setLocalConfig({...localConfig, autoSave: !localConfig.autoSave})
              }
            >
              {localConfig.autoSave ? 'Enabled' : 'Disabled'}
            </Button>
          </div>

          <div>
            <div className="text-sm font-medium mb-2">Max History Items</div>
            <Input
              type="number"
              maxLength={4}
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
