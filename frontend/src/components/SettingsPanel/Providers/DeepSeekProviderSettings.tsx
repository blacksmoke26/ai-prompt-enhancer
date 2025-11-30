/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {RefreshCw, TestTube, Eye, EyeOff} from 'lucide-react';

// ui components
import {Button} from '~/components/ui/Button';
import {Input} from '~/components/ui/Input';
import {Badge} from '~/components/ui/Badge';

// types
import type {AppConfig} from '~/types';

export interface DeepSeekProviderSettingsProps {
  /** Current configuration values */
  localConfig: AppConfig;

  /** Function to update local configuration */
  setLocalConfig: React.Dispatch<React.SetStateAction<AppConfig>>;

  /** Name of provider currently being tested, or null if none */
  testingProvider: string | null;

  /** Function to set the provider currently being tested */
  setTestingProvider: React.Dispatch<React.SetStateAction<string | null>>;

  /** Test results for each provider */
  testResults: Record<string, boolean>;

  /** Function to update test results */
  setTestResults: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;

  /** Visibility state for API key inputs */
  showApiKeys: Record<string, boolean>;

  /** Function to update API key visibility */
  setShowApiKeys: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;

  /** Function to test a provider connection */
  testProvider(providerName: string): void;
}

/**
 * DeepSeek provider settings component for configuring API credentials and testing connection.
 *
 * @example
 * <DeepSeekProviderSettings
 *   localConfig={config}
 *   setLocalConfig={setConfig}
 *   testingProvider={testingProvider}
 *   setTestingProvider={setTestingProvider}
 *   testResults={testResults}
 *   setTestResults={setTestResults}
 *   showApiKeys={showApiKeys}
 *   setShowApiKeys={setShowApiKeys}
 *   testProvider={testProvider}
 * />
 *
 * @developer_notes
 * - Handles API key input with toggle visibility
 * - Provides connection testing functionality
 * - Shows test results with status badges
 * - Uses controlled components for state management
 */
const DeepSeekProviderSettings: React.FC<DeepSeekProviderSettingsProps> = (props) => {
  const {
    localConfig,
    setLocalConfig,
    testingProvider,
    setTestingProvider,
    testResults,
    setTestResults,
    showApiKeys,
    setShowApiKeys,
    testProvider,
  } = props;

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">API Key</label>
        <div className="flex space-x-2">
          <Input
            type={showApiKeys.deepseek ? 'text' : 'password'}
            value={localConfig.deepseek?.apiKey || ''}
            onChange={(e) => setLocalConfig({
              ...localConfig,
              deepseek: {...(localConfig.deepseek || {}), apiKey: e.target.value || ''},
            })}
            placeholder="sk-..."
            className="flex-1 w-96"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowApiKeys(prev => ({...prev, ['deepseek']: !prev.deepseek}))}
          >
            {showApiKeys.deepseek ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          onClick={() => testProvider('deepseek')}
          disabled={testingProvider === 'deepseek' || !localConfig.deepseek?.apiKey}
          variant="outline"
        >
          {testingProvider === 'deepseek' ? (
            <RefreshCw className="h-4 w-4 mr-2 animate-spin"/>
          ) : (
            <TestTube className="h-4 w-4 mr-2"/>
          )}
          Test Connection
        </Button>

        {testResults['deepseek'] !== undefined && (
          <Badge variant={testResults['deepseek'] ? 'default' : 'destructive'}>
            {testResults['deepseek'] ? 'Connected' : 'Failed'}
          </Badge>
        )}
      </div>
    </div>
  );
};

export default DeepSeekProviderSettings;
