/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useEffect, useState} from 'react';

import {RefreshCw, Save} from 'lucide-react';

// hooks
import {useAppStore} from '~/stores/appStore';
import {useDataStore} from '~/stores/dataStore';

// services
import ConfigService from '~/services/ConfigService';
import PromptService from '~/services/PromptService';

// ui components
import {Button} from '~/components/ui/Button';
import {Alert, AlertDescription} from '~/components/ui/Alert';

// components
import SettingsTabNavigation from './SettingsTabNavigation';
import GeneralSettingsPanel from './GeneralSettingsPanel';
import ProviderSettingsPanel from './ProviderSettingsPanel';
import EnhancementSettingsPanel from './EnhancementSettingsPanel';
import DataSettingsPanel from './DataSettingsPanel';
import AdvancedSettingsPanel from './AdvancedSettingsPanel';
import UserRoleSettingsPanel from './UserRoleSettingsPanel';
import LayoutSettingsPanel from './LayoutSettingsPanel';
import TonesSettingsPanel from './TonesSettingsPanel';
import ResponseLengthSettingsPanel from './ResponseLengthSettingsPanel';

// types
import {AppConfig} from '~/types';
import {ProviderConfig} from '~/types';


/**
 * Type definition for available settings tabs
 * @example
 * const activeTab: SettingsTab = 'general';
 * @developer Note: Add new tabs here and update the renderTabContent function
 */
export type SettingsTab =
  'general'
  | 'providers'
  | 'enhancement'
  | 'user-role'
  | 'tones'
  | 'response-lengths'
  | 'data'
  | 'layout'
  | 'advanced';

/**
 * Main settings panel component for configuring the Synapse
 * @example
 * <SettingsPanel />
 * @developer Note: This component uses Zustand for state management and handles multiple settings categories
 */
const SettingsPanel: React.FC = () => {
  const {
    config,
    setConfig,
    theme,
    setTheme,
  } = useAppStore();
  const {models} = useDataStore();

  const [activeTab, setActiveTab] = useState<SettingsTab>('general');
  const [localConfig, setLocalConfig] = useState<AppConfig>(config);
  const [testingProvider, setTestingProvider] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<Record<string, boolean>>({});
  const [showApiKeys, setShowApiKeys] = useState<Record<string, boolean>>({});
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    setLocalConfig(config);
  }, [config]);

  /**
   * Saves current configuration settings to storage
   * @example
   * handleSave(); // Saves all settings
   * @developer Note: Updates both local and global config state
   */
  const handleSave = async () => {
    setSaving(true);
    try {
      await ConfigService.updateConfig(localConfig);
      setConfig(localConfig);
      setSaveMessage('Settings saved successfully!');
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (error) {
      setSaveMessage('Failed to save settings');
      setTimeout(() => setSaveMessage(null), 3000);
    } finally {
      setSaving(false);
    }
  };

  /**
   * Resets all settings to their default values
   * @example
   * handleReset(); // Requires user confirmation
   * @developer Note: This is a destructive action that cannot be undone
   */
  const handleReset = async () => {
    if (confirm('Are you sure you want to reset all settings to defaults?')) {
      try {
        await ConfigService.resetConfig();
        const newConfig = await ConfigService.getConfig();
        setConfig(newConfig);
        setLocalConfig(newConfig);
        setSaveMessage('Settings reset to defaults');
        setTimeout(() => setSaveMessage(null), 3000);
      } catch (error) {
        setSaveMessage('Failed to reset settings');
        setTimeout(() => setSaveMessage(null), 3000);
      }
    }
  };

  /**
   * Exports current configuration as a downloadable file
   * @example
   * handleExport(); // Downloads config.json
   * @developer Note: Uses the configService to handle file download
   */
  const handleExport = async () => {
    try {
      await ConfigService.exportConfig();
      setSaveMessage('Configuration exported');
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (error) {
      setSaveMessage('Failed to export configuration');
      setTimeout(() => setSaveMessage(null), 3000);
    }
  };

  /**
   * Imports configuration from a selected JSON file
   * @example
   * handleImport(); // Opens file picker dialog
   * @developer Note: Validates JSON structure and updates config
   */
  const handleImport = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        try {
          const text = await file.text();
          await ConfigService.importConfig(text);
          const newConfig = await ConfigService.getConfig();
          setConfig(newConfig);
          setLocalConfig(newConfig);
          setSaveMessage('Configuration imported successfully');
          setTimeout(() => setSaveMessage(null), 3000);
        } catch (error) {
          setSaveMessage('Failed to import configuration');
          setTimeout(() => setSaveMessage(null), 3000);
        }
      }
    };
    input.click();
  };

  /**
   * Tests connection to an AI provider
   * @param providerName - Name of the provider to test
   * @param config - Provider configuration object
   * @example
   * testProvider('openai'); // Tests OpenAI connection
   * @developer Note: Updates testResults state with outcome
   */
  const testProvider = async (providerName: string, config: ProviderConfig = {}) => {
    setTestingProvider(providerName);
    try {
      const result = await PromptService.testProvider(providerName, config);
      setTestResults(prev => ({...prev, [providerName]: result.available}));
    } catch (error) {
      setTestResults(prev => ({...prev, [providerName]: false}));
    } finally {
      setTestingProvider(null);
    }
  };

  /**
   * Renders content for the currently active settings tab
   * @example
   * renderTabContent(); // Returns appropriate JSX for active tab
   * @developer Note: Add new tab renderers here when expanding functionality
   */
  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <GeneralSettingsPanel
            localConfig={localConfig}
            setLocalConfig={setLocalConfig}
            theme={theme}
            setTheme={setTheme}
            models={models}
          />
        );
      case 'providers':
        return (
          <ProviderSettingsPanel
            localConfig={localConfig}
            setLocalConfig={setLocalConfig}
            testingProvider={testingProvider}
            setTestingProvider={setTestingProvider}
            testResults={testResults}
            setTestResults={setTestResults}
            showApiKeys={showApiKeys}
            setShowApiKeys={setShowApiKeys}
            testProvider={testProvider}
          />
        );
      case 'enhancement':
        return <EnhancementSettingsPanel/>;
      case 'user-role':
        return <UserRoleSettingsPanel/>;
      case 'tones':
        return <TonesSettingsPanel/>;
      case 'response-lengths':
        return <ResponseLengthSettingsPanel/>;
      case 'data':
        return (
          <DataSettingsPanel
            localConfig={localConfig}
            setLocalConfig={setLocalConfig}
          />
        );
      case 'layout':
        return <LayoutSettingsPanel/>;
      case 'advanced':
        return (
          <AdvancedSettingsPanel
            localConfig={localConfig}
            setLocalConfig={setLocalConfig}
            handleExport={handleExport}
            handleImport={handleImport}
            handleReset={handleReset}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Configure your Synapse</p>
        </div>

        <div className="flex items-center space-x-2">
          {saveMessage && (
            <Alert className={
              saveMessage.includes('success') ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
            }>
              <AlertDescription>{saveMessage}</AlertDescription>
            </Alert>
          )}

          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin"/>
            ) : (
              <Save className="h-4 w-4 mr-2"/>
            )}
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <SettingsTabNavigation activeTab={activeTab} setActiveTab={setActiveTab}/>

      {/* Tab Content */}
      <div className="space-y-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default SettingsPanel;
