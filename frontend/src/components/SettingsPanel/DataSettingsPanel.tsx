/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {Download, Trash2} from 'lucide-react';

// ui components
import {Button} from '~/components/ui/Button';
import {Alert, AlertDescription} from '~/components/ui/Alert';
import {AppConfig} from '~/types';

export interface DataSettingsPanelProps {
  /**
   * Current application configuration state
   * @example { theme: 'dark', fontSize: 14 }
   */
  localConfig: AppConfig;
  /**
   * Function to update the application configuration state
   * @example (newConfig) => setLocalConfig(newConfig)
   * @developer-notes This function is used to persist changes to the app config
   */
  setLocalConfig: React.Dispatch<React.SetStateAction<AppConfig>>;
}

/**
 * DataSettingsPanel component provides UI controls for managing application history and local storage data.
 * @example
 * ```tsx
 * <DataSettingsPanel
 *   localConfig={config}
 *   setLocalConfig={setConfig}
 * />
 * ```
 * @developer-notes This component handles export functionality for history data in multiple formats and provides
 * a way to clear all local storage data with a confirmation dialog. The export links are generated dynamically
 * based on the API endpoints for different file formats.
 */
const DataSettingsPanel: React.FC<DataSettingsPanelProps> = ({localConfig, setLocalConfig}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">History Management</h3>
        <div className="space-y-4">
          <Alert>
            <AlertDescription>
              Your prompt history is stored locally in your browser. You can export it for backup or migrate to another
              device.
            </AlertDescription>
          </Alert>

          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              leftIcon={<Download className="h-4 w-4 mr-2"/>}
                    onClick={() => window.open('/api/history/export?format=json')}>
              Export as JSON
            </Button>
            <Button
              variant="outline"
              leftIcon={<Download className="h-4 w-4 mr-2"/>}
                    onClick={() => window.open('/api/history/export?format=csv')}>
              Export as CSV
            </Button>
            <Button
              variant="outline"
              leftIcon={<Download className="h-4 w-4 mr-2"/>}
                    onClick={() => window.open('/api/history/export?format=txt')}>
              Export as TXT
            </Button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Storage</h3>
        <div className="space-y-4">
          <div className="p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium mb-2">Local Storage Usage</h4>
            <div className="text-sm text-muted-foreground">
              <p>History items: {localStorage.getItem('prompt-enhancer-storage') ? 'Stored' : 'Empty'}</p>
              <p>Configuration: {localStorage.getItem('prompt-enhancer-storage') ? 'Stored' : 'Default'}</p>
            </div>
          </div>

          <Button
            variant="destructive"
            leftIcon={<Trash2 className="h-4 w-4 mr-2"/>}
            onClick={() => {
              if (confirm('Are you sure you want to clear all local data? This action cannot be undone.')) {
                localStorage.clear();
                window.location.reload();
              }
            }}
          >
            Clear All Local Data
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataSettingsPanel;
