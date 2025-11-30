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

export interface OpenAIProviderSettingsProps {
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
 * OpenAI provider configuration component with API key management and connection testing.
 *
 * @example
 * <OpenAIProviderSettings
 *   localConfig={config}
 *   setLocalConfig={setConfig}
 *   testingProvider={testing}
 *   setTestingProvider={setTesting}
 *   testResults={results}
 *   setTestResults={setResults}
 *   showApiKeys={visibleKeys}
 *   setShowApiKeys={setVisibleKeys}
 *   testProvider={testConnection}
 * />
 *
 * @developer_notes This component handles OpenAI-specific settings including API key input with visibility toggle,
 * optional base URL configuration, and connection testing with visual feedback. All state management is handled
 * through props passed from the parent component.
 */
const OpenAIProviderSettings: React.FC<OpenAIProviderSettingsProps> = (props) => {
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
            type={showApiKeys.openai ? 'text' : 'password'}
            value={localConfig.openai?.apiKey || ''}
            onChange={(e) => setLocalConfig({
              ...localConfig,
              openai: {...(localConfig.openai || {}), apiKey: e.target.value || ''},
            })}
            placeholder="sk-..."
            className="flex-1 w-96"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowApiKeys(prev => ({...prev, ['openai']: !prev.openai}))}
          >
            {showApiKeys.openai ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
          </Button>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Base URL (optional)</label>
        <Input
          value={localConfig.openai?.baseUrl || ''}
          onChange={(e) => setLocalConfig({
            ...localConfig,
            openai: {...(localConfig.openai || {}), baseUrl: e.target.value || ''},
          })}
          placeholder="https://api.openai.com/v1"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Button
          onClick={() => testProvider('openai')}
          disabled={testingProvider === 'openai' || !localConfig.openai?.apiKey}
          variant="outline"
        >
          {testingProvider === 'openai' ? (
            <RefreshCw className="h-4 w-4 mr-2 animate-spin"/>
          ) : (
            <TestTube className="h-4 w-4 mr-2"/>
          )}
          Test Connection
        </Button>

        {testResults['openai'] !== undefined && (
          <Badge variant={testResults['openai'] ? 'default' : 'destructive'}>
            {testResults['openai'] ? 'Connected' : 'Failed'}
          </Badge>
        )}
      </div>
    </div>
  );
};

export default OpenAIProviderSettings;
