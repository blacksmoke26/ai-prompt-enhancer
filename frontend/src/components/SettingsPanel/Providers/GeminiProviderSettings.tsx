import React from 'react';
import { RefreshCw, TestTube, Eye, EyeOff } from 'lucide-react';

import { Button } from '~/components/ui/Button';
import { Input } from '~/components/ui/Input';
import { Badge } from '~/components/ui/Badge';

import type { AppConfig } from '~/types';

export interface GeminiProviderSettingsProps {
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
 * Gemini provider settings component with API key visibility and connection testing.
 */
const GeminiProviderSettings: React.FC<GeminiProviderSettingsProps> = (props) => {
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
            type={showApiKeys.gemini ? 'text' : 'password'}
            value={localConfig.gemini?.apiKey || ''}
            onChange={(e) =>
              setLocalConfig({
                ...localConfig,
                gemini: { ...(localConfig.gemini || {}), apiKey: e.target.value || '' },
              })
            }
            placeholder="sk-..."
            className="flex-1 w-96"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setShowApiKeys((prev) => ({ ...prev, ['gemini']: !prev.gemini }))
            }
          >
            {showApiKeys.gemini ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          onClick={() => testProvider('gemini')}
          disabled={testingProvider === 'gemini' || !localConfig.gemini?.apiKey}
          variant="outline"
        >
          {testingProvider === 'gemini' ? (
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <TestTube className="h-4 w-4 mr-2" />
          )}
          Test Connection
        </Button>

        {testResults['gemini'] !== undefined && (
          <Badge variant={testResults['gemini'] ? 'default' : 'destructive'}>
            {testResults['gemini'] ? 'Connected' : 'Failed'}
          </Badge>
        )}
      </div>
    </div>
  );
};

export default GeminiProviderSettings;