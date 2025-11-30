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

export interface ProviderSettingsPanelProps {
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
 * ProviderSettingsPanel component renders configuration settings for various AI providers.
 *
 * This component allows users to configure settings for Ollama, OpenAI, OpenRouter, and DeepSeek.
 * It includes input fields for API keys, server URLs, timeouts, and base URLs.
 * Users can test connections to each provider and toggle API key visibility.
 *
 * Example usage:
 * ```tsx
 * <ProviderSettingsPanel
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
 * ```
 *
 * Developer notes:
 * - The component handles state for multiple providers with consistent patterns
 * - API key visibility toggling uses a record of boolean values
 * - Test results are displayed using Badge components with appropriate variants
 * - Input validation and default values are handled in onChange handlers
 * - The testProvider function is called with provider names as arguments
 */
const ProviderSettingsPanel: React.FC<ProviderSettingsPanelProps> = (props) => {
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
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Ollama (Local)</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Server URL</label>
            <Input
              value={localConfig.ollama?.url || ''}
              onChange={(e) => setLocalConfig({
                ...localConfig,
                ollama: {...(localConfig.ollama || {}), url: e.target.value},
              })}
              placeholder="http://localhost:11434"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Timeout (ms)</label>
            <Input
              type="number"
              value={localConfig.ollama?.timeout || 30000}
              onChange={(e) => setLocalConfig({
                ...localConfig,
                ollama: {...(localConfig.ollama || {}), timeout: parseInt(e.target.value) || 30000},
              })}
              min="5000"
              max="300000"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Button
              onClick={() => testProvider('ollama')}
              disabled={testingProvider === 'ollama'}
              variant="outline"
            >
              {testingProvider === 'ollama' ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin"/>
              ) : (
                <TestTube className="h-4 w-4 mr-2"/>
              )}
              Test Connection
            </Button>

            {testResults['ollama'] !== undefined && (
              <Badge variant={testResults['ollama'] ? 'default' : 'destructive'}>
                {testResults['ollama'] ? 'Connected' : 'Failed'}
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">OpenAI</h3>
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
                className="flex-1"
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
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">OpenRouter</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">API Key</label>
            <div className="flex space-x-2">
              <Input
                type={showApiKeys.openrouter ? 'text' : 'password'}
                value={localConfig.openrouter?.apiKey || ''}
                onChange={(e) => setLocalConfig({
                  ...localConfig,
                  openrouter: {...(localConfig.openrouter || {}), apiKey: e.target.value || ''},
                })}
                placeholder="sk-or-..."
                className="flex-1"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowApiKeys(prev => ({...prev, ['openrouter']: !prev.openrouter}))}
              >
                {showApiKeys.openrouter ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              onClick={() => testProvider('openrouter')}
              disabled={testingProvider === 'openrouter' || !localConfig.openrouter?.apiKey}
              variant="outline"
            >
              {testingProvider === 'openrouter' ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin"/>
              ) : (
                <TestTube className="h-4 w-4 mr-2"/>
              )}
              Test Connection
            </Button>

            {testResults['openrouter'] !== undefined && (
              <Badge variant={testResults['openrouter'] ? 'default' : 'destructive'}>
                {testResults['openrouter'] ? 'Connected' : 'Failed'}
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">DeepSeek</h3>
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
                className="flex-1"
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
      </div>
    </div>
  );
};

export default ProviderSettingsPanel;
