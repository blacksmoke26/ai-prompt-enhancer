import React, { useState, useEffect } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';
import { Select } from './ui/Select';
import { Badge } from './ui/Badge';
import { Alert, AlertDescription } from './ui/Alert';
import {
  Save,
  Download,
  Upload,
  RotateCcw,
  TestTube,
  RefreshCw,
  Trash2,
  Settings as SettingsIcon,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAppStore } from '../stores/appStore';
import { configService } from '../utils/configService';
import { promptService } from '../utils/promptService';
import { cn } from '../utils/helpers';
import { AppConfig } from '../types';

/**
 * Type definition for available settings tabs
 * @example
 * const activeTab: SettingsTab = 'general';
 * @developer Note: Add new tabs here and update the renderTabContent function
 */
type SettingsTab = 'general' | 'providers' | 'enhancement' | 'data' | 'advanced';

/**
 * Main settings panel component for configuring the AI Prompt Enhancer
 * @example
 * <SettingsPanel />
 * @developer Note: This component uses Zustand for state management and handles multiple settings categories
 */
export const SettingsPanel: React.FC = () => {
  const {
    config,
    setConfig,
    theme,
    setTheme,
    models,
    providers
  } = useAppStore();

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
   * Configuration for settings tabs with icons and labels
   * @developer Note: Update this array when adding new tabs
   */
  const tabs = [
    { id: 'general' as SettingsTab, label: 'General', icon: SettingsIcon },
    { id: 'providers' as SettingsTab, label: 'AI Providers', icon: TestTube },
    { id: 'enhancement' as SettingsTab, label: 'Enhancement', icon: SettingsIcon },
    { id: 'data' as SettingsTab, label: 'Data Management', icon: SettingsIcon },
    { id: 'advanced' as SettingsTab, label: 'Advanced', icon: SettingsIcon },
  ];

  /**
   * Saves current configuration settings to storage
   * @example
   * handleSave(); // Saves all settings
   * @developer Note: Updates both local and global config state
   */
  const handleSave = async () => {
    setSaving(true);
    try {
      await configService.updateConfig(localConfig);
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
        await configService.resetConfig();
        const newConfig = await configService.getConfig();
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
      await configService.exportConfig();
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
          await configService.importConfig(text);
          const newConfig = await configService.getConfig();
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
   * @example
   * testProvider('openai'); // Tests OpenAI connection
   * @developer Note: Updates testResults state with outcome
   */
  const testProvider = async (providerName: string) => {
    setTestingProvider(providerName);
    try {
      const result = await promptService.testProvider(providerName);
      setTestResults(prev => ({ ...prev, [providerName]: result.available }));
    } catch (error) {
      setTestResults(prev => ({ ...prev, [providerName]: false }));
    } finally {
      setTestingProvider(null);
    }
  };

  /**
   * Toggles visibility of API keys in password fields
   * @param provider - Provider whose API key visibility to toggle
   * @example
   * toggleApiKeyVisibility('openai'); // Shows/hides OpenAI API key
   * @developer Note: Useful for verifying key input without compromising security
   */
  const toggleApiKeyVisibility = (provider: string) => {
    setShowApiKeys(prev => ({ ...prev, [provider]: !prev[provider] }));
  };

  /**
   * Renders general settings including theme, defaults, and behavior options
   * @example
   * renderGeneralSettings(); // Returns JSX for general tab
   * @developer Note: Organized into subsections for better UX
   */
  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Appearance</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Theme</label>
            <div className="flex space-x-2 mt-2">
              {(['light', 'dark', 'system'] as const).map((t) => (
                <Button
                  key={t}
                  variant={theme === t ? 'default' : 'outline'}
                  onClick={() => setTheme(t)}
                  className="capitalize"
                >
                  {t}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Defaults</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Default Model</label>
            <Select
              value={localConfig.defaultModel}
              onChange={(e) => setLocalConfig(prev => ({ ...prev, defaultModel: e.target.value }))}
              options={models.map(model => ({
                value: model.id,
                label: `${model.name} (${model.provider})`
              }))}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Default System Prompt</label>
            <Textarea
              value={localConfig.defaultSystemPrompt}
              onChange={(e) => setLocalConfig(prev => ({ ...prev, defaultSystemPrompt: e.target.value }))}
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
              <p className="text-xs text-muted-foreground">Automatically save prompt enhancements to history</p>
            </div>
            <Button
              variant={localConfig.autoSave ? 'default' : 'outline'}
              onClick={() => setLocalConfig(prev => ({ ...prev, autoSave: !prev.autoSave }))}
            >
              {localConfig.autoSave ? 'Enabled' : 'Disabled'}
            </Button>
          </div>

          <div>
            <label className="text-sm font-medium">Max History Items</label>
            <Input
              type="number"
              value={localConfig.maxHistoryItems}
              onChange={(e) => setLocalConfig(prev => ({
                ...prev,
                maxHistoryItems: parseInt(e.target.value) || 1000
              }))}
              min="10"
              max="10000"
            />
          </div>
        </div>
      </div>
    </div>
  );

  /**
   * Renders AI provider configuration settings
   * @example
   * renderProviderSettings(); // Shows provider forms and test buttons
   * @developer Note: Each provider has its own configuration section
   */
  const renderProviderSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Ollama (Local)</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Server URL</label>
            <Input
              value={localConfig.ollama.url}
              onChange={(e) => setLocalConfig(prev => ({
                ...prev,
                ollama: { ...prev.ollama, url: e.target.value }
              }))}
              placeholder="http://localhost:11434"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Timeout (ms)</label>
            <Input
              type="number"
              value={localConfig.ollama.timeout}
              onChange={(e) => setLocalConfig(prev => ({
                ...prev,
                ollama: { ...prev.ollama, timeout: parseInt(e.target.value) || 30000 }
              }))}
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
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <TestTube className="h-4 w-4 mr-2" />
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
                onChange={(e) => setLocalConfig(prev => ({
                ...prev,
                openai: { ...(prev.openai || {}), apiKey: e.target.value || '' }
              }))}
                placeholder="sk-..."
                className="flex-1"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => toggleApiKeyVisibility('openai')}
              >
                {showApiKeys.openai ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Base URL (optional)</label>
            <Input
              value={localConfig.openai?.baseUrl || ''}
              onChange={(e) => setLocalConfig(prev => ({
                ...prev,
                openai: { ...(prev.openai || {}), baseUrl: e.target.value || '' }
              }))}
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
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <TestTube className="h-4 w-4 mr-2" />
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
                onChange={(e) => setLocalConfig(prev => ({
                  ...prev,
                  openrouter: { ...(prev.openrouter || {}), apiKey: e.target.value || '' }
                }))}
                placeholder="sk-or-..."
                className="flex-1"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => toggleApiKeyVisibility('openrouter')}
              >
                {showApiKeys.openrouter ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
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
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <TestTube className="h-4 w-4 mr-2" />
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
                onChange={(e) => setLocalConfig(prev => ({
                  ...prev,
                  deepseek: { ...(prev.deepseek || {}), apiKey: e.target.value || '' }
                }))}
                placeholder="sk-..."
                className="flex-1"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => toggleApiKeyVisibility('deepseek')}
              >
                {showApiKeys.deepseek ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
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
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <TestTube className="h-4 w-4 mr-2" />
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

  /**
   * Renders enhancement types and user roles configuration
   * @example
   * renderEnhancementSettings(); // Shows enhancement options grid
   * @developer Note: Currently displays info cards - can be expanded for configuration
   */
  const renderEnhancementSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Enhancement Types</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { id: 'correct', name: 'Correct', desc: 'Fix grammar, spelling, and clarity' },
            { id: 'enhance', name: 'Enhance', desc: 'Add details and specificity' },
            { id: 'proofread', name: 'Proofread', desc: 'Review for effectiveness' },
            { id: 'optimize', name: 'Optimize', desc: 'Optimize for AI models' },
            { id: 'creative', name: 'Creative', desc: 'Add imaginative elements' },
            { id: 'technical', name: 'Technical', desc: 'Add technical precision' },
            { id: 'concise', name: 'Concise', desc: 'Remove unnecessary words' },
            { id: 'structured', name: 'Structured', desc: 'Add clear formatting' },
          ].map((type) => (
            <Card key={type.id} className="p-4">
              <h4 className="font-medium">{type.name}</h4>
              <p className="text-sm text-muted-foreground">{type.desc}</p>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">User Roles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { id: 'general', name: 'General', desc: 'Everyday enhancement needs' },
            { id: 'developer', name: 'Developer', desc: 'Programming and technical' },
            { id: 'writer', name: 'Writer', desc: 'Creative writing and content' },
            { id: 'researcher', name: 'Researcher', desc: 'Academic and research' },
            { id: 'marketer', name: 'Marketer', desc: 'Marketing and promotional' },
            { id: 'educator', name: 'Educator', desc: 'Educational content' },
            { id: 'business', name: 'Business', desc: 'Corporate communication' },
            { id: 'designer', name: 'Designer', desc: 'Design and visual prompts' },
          ].map((role) => (
            <Card key={role.id} className="p-4">
              <h4 className="font-medium">{role.name}</h4>
              <p className="text-sm text-muted-foreground">{role.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  /**
   * Renders data management settings including export and storage options
   * @example
   * renderDataSettings(); // Shows history export and storage info
   * @developer Note: Export buttons trigger API endpoints for file download
   */
  const renderDataSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">History Management</h3>
        <div className="space-y-4">
          <Alert>
            <AlertDescription>
              Your prompt history is stored locally in your browser. You can export it for backup or migrate to another device.
            </AlertDescription>
          </Alert>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => window.open('/api/history/export?format=json')}>
              <Download className="h-4 w-4 mr-2" />
              Export as JSON
            </Button>
            <Button variant="outline" onClick={() => window.open('/api/history/export?format=csv')}>
              <Download className="h-4 w-4 mr-2" />
              Export as CSV
            </Button>
            <Button variant="outline" onClick={() => window.open('/api/history/export?format=txt')}>
              <Download className="h-4 w-4 mr-2" />
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
            onClick={() => {
              if (confirm('Are you sure you want to clear all local data? This action cannot be undone.')) {
                localStorage.clear();
                window.location.reload();
              }
            }}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All Local Data
          </Button>
        </div>
      </div>
    </div>
  );

  /**
   * Renders advanced settings including configuration management and debug info
   * @example
   * renderAdvancedSettings(); // Shows config import/export and system details
   * @developer Note: System information helps with troubleshooting
   */
  const renderAdvancedSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Configuration</h3>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export Config
            </Button>
            <Button variant="outline" onClick={handleImport}>
              <Upload className="h-4 w-4 mr-2" />
              Import Config
            </Button>
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="h-4 w-4 mr-2" />
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
              <p>Providers Loaded: {providers.length}</p>
              <p>Models Available: {models.length}</p>
              <p>Current Theme: {theme}</p>
              <p>Auto-save: {localConfig.autoSave ? 'Enabled' : 'Disabled'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  /**
   * Renders content for the currently active settings tab
   * @example
   * renderTabContent(); // Returns appropriate JSX for active tab
   * @developer Note: Add new tab renderers here when expanding functionality
   */
  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'providers':
        return renderProviderSettings();
      case 'enhancement':
        return renderEnhancementSettings();
      case 'data':
        return renderDataSettings();
      case 'advanced':
        return renderAdvancedSettings();
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
          <p className="text-muted-foreground">Configure your AI Prompt Enhancer</p>
        </div>

        <div className="flex items-center space-x-2">
          {saveMessage && (
            <Alert className={cn(
              "max-w-md",
              saveMessage.includes('success') ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
            )}>
              <AlertDescription>{saveMessage}</AlertDescription>
            </Alert>
          )}

          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-border">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "py-2 px-1 border-b-2 font-medium text-sm transition-colors",
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {renderTabContent()}
      </div>
    </div>
  );
};
