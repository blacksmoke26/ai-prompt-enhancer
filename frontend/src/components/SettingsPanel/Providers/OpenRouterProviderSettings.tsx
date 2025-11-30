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

/**
 * Props interface for the OpenRouterProviderSettings component.
 *
 * This interface defines all the properties required to manage the OpenRouter provider
 * configuration, including API key management, connection testing, and UI state handling.
 * Each property is designed to provide full control over the provider's settings and
 * real-time feedback on connection status.
 */
export interface OpenRouterProviderSettingsProps {
  /**
   * Current application configuration object containing all provider settings.
   * This object holds the complete state of the application's configuration,
   * including the OpenRouter provider's API key and other related settings.
   */
  localConfig: AppConfig;

  /**
   * State dispatcher function to update the local configuration.
   * Accepts a new AppConfig object or a function that receives the previous config
   * and returns an updated config. This is the primary way to modify any
   * configuration values including API keys and provider-specific settings.
   */
  setLocalConfig: React.Dispatch<React.SetStateAction<AppConfig>>;

  /**
   * The name of the provider currently undergoing connection testing.
   * When null, no provider is being tested. This allows the UI to show
   * loading states and disable controls during test operations.
   */
  testingProvider: string | null;

  /**
   * State dispatcher to update which provider is currently being tested.
   * Use this to set the provider name when starting a test or to clear it
   * (set to null) when testing completes or is cancelled.
   */
  setTestingProvider: React.Dispatch<React.SetStateAction<string | null>>;

  /**
   * Record containing test results for all configured providers.
   * Each key is a provider name and the boolean value indicates whether
   * the last connection test was successful (true) or failed (false).
   * Providers not yet tested will not appear in this record.
   */
  testResults: Record<string, boolean>;

  /**
   * State dispatcher to update the test results record.
   * Use this to add new test results or update existing ones. The record
   * can be completely replaced or modified using the functional update form.
   */
  setTestResults: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;

  /**
   * Record controlling the visibility state of API key input fields.
   * Each key is a provider name and the boolean value determines whether
   * the API key is visible (true) or masked (false) in the UI.
   */
  showApiKeys: Record<string, boolean>;

  /**
   * State dispatcher to toggle API key visibility.
   * Updates the showApiKeys record to show or hide API keys in the input fields.
   * This is typically triggered by eye/eye-off icon buttons in the UI.
   */
  setShowApiKeys: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;

  /**
   * Initiates a connection test for the specified provider.
   * This function handles the entire testing process including setting the
   * testingProvider state, performing the actual connection test, and updating
   * the testResults with the outcome.
   *
   * @param providerName - The name/identifier of the provider to test
   */
  testProvider(providerName: string): void;
}

/**
 * OpenRouter Provider Settings Component
 *
 * This component provides a comprehensive interface for configuring and managing
 * the OpenRouter AI provider settings. It includes functionality for:
 * - Secure API key input with toggle visibility
 * - Real-time connection testing with visual feedback
 * - Persistent configuration storage through the localConfig state
 *
 * The component maintains its own internal state for UI elements while
 * synchronizing all configuration changes with the parent through the provided
 * state management functions. It integrates with the broader application's
 * configuration system to ensure consistent settings across all providers.
 */
const OpenRouterProviderSettings: React.FC<OpenRouterProviderSettingsProps> = (props) => {
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
            type={showApiKeys.openrouter ? 'text' : 'password'}
            value={localConfig.openrouter?.apiKey || ''}
            onChange={(e) => setLocalConfig({
              ...localConfig,
              openrouter: {...(localConfig.openrouter || {}), apiKey: e.target.value || ''},
            })}
            placeholder="sk-or-..."
            className="flex-1 w-96"
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
  );
};

export default OpenRouterProviderSettings;
