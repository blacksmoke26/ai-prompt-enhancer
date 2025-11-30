/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {RefreshCw, TestTube} from 'lucide-react';

// ui components
import {Button} from '~/components/ui/Button';
import {Input} from '~/components/ui/Input';
import {Badge} from '~/components/ui/Badge';

// types
import type {AppConfig} from '~/types';

/**
 * Props interface for the OllamaProviderSettings component.
 *
 * This interface defines the contract for all properties required by the OllamaProviderSettings
 * component, which manages the UI for configuring Ollama provider connection settings. Each prop
 * serves a specific role in maintaining the component's state and functionality.
 *
 * @interface OllamaProviderSettingsProps
 */
export interface OllamaProviderSettingsProps {
  /**
   * Current configuration values for the application, including all provider settings.
   * This object contains the existing configuration that the user has set, which
   * serves as the source of truth for the form inputs and displays.
   *
   * @type {AppConfig}
   */
  localConfig: AppConfig;

  /**
   * State setter function for updating the local configuration.
   * This function is called whenever the user modifies any of the Ollama
   * provider settings, allowing the parent component to maintain the latest
   * configuration state.
   *
   * @type {React.Dispatch<React.SetStateAction<AppConfig>>}
   */
  setLocalConfig: React.Dispatch<React.SetStateAction<AppConfig>>;

  /**
   * The name of the provider currently being tested, or null if no test is in progress.
   * This state is used to disable UI elements and display loading states during
   * connection testing to prevent user interference.
   *
   * @type {string | null}
   */
  testingProvider: string | null;

  /**
   * State setter for updating which provider is currently being tested.
   * Called when starting or stopping a connection test to update the UI state.
   *
   * @type {React.Dispatch<React.SetStateAction<string | null>>}
   */
  setTestingProvider: React.Dispatch<React.SetStateAction<string | null>>;

  /**
   * Record of test results for each provider, indicating success or failure.
   * This object maintains the outcome of connection tests, allowing the UI
   * to display appropriate status indicators to the user.
   *
   * @type {Record<string, boolean>}
   */
  testResults: Record<string, boolean>;

  /**
   * State setter for updating test results.
   * Called after a connection test completes to store the result and trigger
   * UI updates that reflect the test outcome.
   *
   * @type {React.Dispatch<React.SetStateAction<Record<string, boolean>>>}
   */
  setTestResults: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;

  /**
   * Function to test a provider connection.
   * This async function initiates a connection test for the specified provider,
   * updating the testing state and results upon completion.
   *
   * @param {string} providerName - The name of the provider to test
   * @returns {void}
   */
  testProvider(providerName: string): void;
}

/**
 * Ollama provider settings component for configuring connection parameters.
 *
 * @example
 * ```tsx
 * <OllamaProviderSettings
 *   localConfig={config}
 *   setLocalConfig={setConfig}
 *   testingProvider={testing}
 *   setTestingProvider={setTesting}
 *   testResults={results}
 *   setTestResults={setResults}
 *   testProvider={testConnection}
 * />
 * ```
 *
 * @developer Note: This component handles the UI for Ollama provider-specific settings including
 * server URL, timeout configuration, and connection testing functionality.
 */
const OllamaProviderSettings: React.FC<OllamaProviderSettingsProps> = (props) => {
  const {
    localConfig,
    setLocalConfig,
    testingProvider,
    setTestingProvider,
    testResults,
    setTestResults,
    testProvider,
  } = props;

  return (
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
  );
};

export default OllamaProviderSettings;
