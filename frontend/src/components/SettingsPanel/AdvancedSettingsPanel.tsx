/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {Download, RotateCcw, Upload} from 'lucide-react';

// components
import {Button} from '~/components/ui/Button';

// types
import type {AppConfig} from '~/types';

/**
 * Configuration properties for the advanced settings panel
 */
export interface AdvancedSettingsPanelProps {
  /** Current configuration state */
  localConfig: AppConfig;

  /** Function to update configuration state */
  setLocalConfig: React.Dispatch<React.SetStateAction<AppConfig>>;

  /** Function to export current configuration */
  handleExport(): void;

  /** Function to import configuration from file */
  handleImport(): void;

  /** Function to reset configuration to default values */
  handleReset(): void;
}

/**
 * Renders advanced settings including configuration management and debug info
 * @description This component provides a UI for managing application configuration,
 * exporting/importing settings, and viewing system/debug information for troubleshooting.
 * @example
 * <AdvancedSettingsPanel localConfig={config} setLocalConfig={setConfig} />
 * @developer Note: System information helps with troubleshooting
 * @param props
 */
const AdvancedSettingsPanel: React.FC<AdvancedSettingsPanelProps> = (props) => {
  const {localConfig, setLocalConfig, handleExport, handleImport, handleReset} = props;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Configuration</h3>
        <div className="space-y-4">
          <div
            className="flex flex-wrap gap-2">
            <Button
              leftIcon={<Download className="h-4 w-4 mr-2"/>}
              variant="outline" onClick={handleExport}>
              Export Config
            </
            Button>
            <Button
              leftIcon={<Upload className="h-4 w-4 mr-2"/>}
              variant="outline" onClick={handleImport}>
              Import Config
            </
            Button>
            <Button
              leftIcon={<RotateCcw className="h-4 w-4 mr-2"/>}
              variant="outline" onClick={handleReset}>
              Reset to Defaults
            </Button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Debug Information</h3>
        <div className="space-y-4">
          <div className="p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium mb-2">System Information</h4>
            <div className="text-sm font-mono space-y-1">
              <p>User Agent: {navigator.userAgent}</p>
              <p>Language: {navigator.language}</p>
              <p>Platform: {navigator.userAgent.includes('Win') ? 'Windows' : navigator.userAgent.includes('Mac') ? 'macOS' : 'Other'}</p>
              <p>Cookie Enabled: {navigator.cookieEnabled}</p>
              <p>Local Storage: {localStorage ? 'Available' : 'Not Available'}</p>
            </div>
          </div>

          <div className="p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium mb-2">Application Status</h4>
            <div className="text-sm font-mono space-y-1">
              <p>Providers
                Loaded: {localStorage.getItem('prompt-enhancer-providers') ? localStorage.getItem('prompt-enhancer-providers')?.split?.(',')?.length : 0}</p>
              <p>Models
                Available: {localStorage.getItem('prompt-enhancer-models') ? localStorage.getItem('prompt-enhancer-models')?.split?.(',')?.length : 0}</p>
              <p>Current Theme: {localStorage.getItem('prompt-enhancer-theme') || 'default'}</p>
              <p>Auto-save: {localConfig.autoSave ? 'Enabled' : 'Disabled'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSettingsPanel;
