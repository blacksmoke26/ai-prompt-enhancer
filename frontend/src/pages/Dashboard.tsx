/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useState, useEffect} from 'react';
import {History, BarChart3, Settings, Sparkles} from 'lucide-react';

// hooks
import {useAppData} from '~/hooks/useAppData';
import {useHistory} from '~/hooks/useHistory';
import {useHistoryStore} from '~/stores/historyStore';
import {useAppStore} from '~/stores/appStore';

// helpers
import {cn} from '~/utils/helpers';

// ui-components
import {Button} from '~/components/ui/Button';
import {Card, CardContent} from '~/components/ui/Card';

// components
import Sidebar from '~/components/Sidebar';
import StatsPanel from '~/components/StatsPanel';
import HistoryPanel from '~/components/HistoryPanel';
import SettingsPanel from '~/components/SettingsPanel';
import ModelSelector from '~/components/ModelSelector';
import PromptEnhancer from '~/components/PromptEnhancer';
import DraggableLayout from '~/components/DraggableLayout';

/**
 * Represents the available dashboard tabs
 * @example 'enhancer' - Main prompt enhancement interface
 * @developer notes: Use these exact values when referencing tab states
 */
export type TabType = 'enhancer' | 'history' | 'stats' | 'settings';

/**
 * Main dashboard component managing tab navigation and layout
 * @example <Dashboard />
 * @developer notes: Handles global state management and responsive layout
 */
export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('enhancer');
  const {loading: appLoading, error, refreshData} = useAppData();
  const {history, loadStats, loadHistory} = useHistory();
  const {sidebarOpen} = useAppStore();
  const [historyLoading, setHistoryLoading] = useState(false);

  /**
   * Loads user history on component mount
   * @example useEffect(() => loadHistory(), []);
   * @developer notes: Consider adding error handling for failed loads
   */
  useEffect(() => {
    Promise.all([loadStats(), loadHistory()]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Handles refreshing history data
   */
  const handleRefreshHistory = async () => {
    try {
      setHistoryLoading(true);
      await loadHistory();
    } finally {
      setHistoryLoading(false);
    }
  };

  /**
   * Navigation tab configuration with icons
   * @example { id: 'enhancer', label: 'Enhancer', icon: Sparkles }
   * @developer notes: Icons should be from lucide-react library
   */
  const tabs = [
    {id: 'enhancer' as TabType, label: 'Enhancer', icon: Sparkles},
    {id: 'history' as TabType, label: 'History', icon: History},
    {id: 'stats' as TabType, label: 'Statistics', icon: BarChart3},
    {id: 'settings' as TabType, label: 'Settings', icon: Settings},
  ];

  /**
   * Loading state display with spinner animation
   * @example Shows when loading === true
   * @developer notes: Consider adding skeleton loaders for better UX
   */
  if (appLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg font-medium">Loading Synapse...</p>
        </div>
      </div>
    );
  }

  /**
   * Error state display with retry option
   * @example Shows when error is not null
   * @developer notes: Should log errors to monitoring service
   */
  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Connection Error</h2>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={refreshData}>Retry</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-screen bg-background flex">
      <Sidebar>
        <div className="space-y-4">
          {/* Navigation Tabs */}
          <div className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? 'default' : 'ghost'}
                  className={cn(
                    'w-full justify-start',
                    activeTab === tab.id && 'bg-primary text-primary-foreground',
                  )}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <Icon className="h-4 w-4 mr-2"/>
                  {tab.label}
                </Button>
              );
            })}
          </div>
        </div>
      </Sidebar>

      {/* Main Content - Fixed Layout */}
      <div className={cn(
        'flex-1 flex flex-col transition-all duration-300',
        sidebarOpen ? 'lg:ml-0' : 'lg:ml-0',
      )}>
        {/* Mobile Tab Bar */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-border bg-background">
          <h1 className="text-lg font-semibold">Synapse</h1>
          <div className="flex space-x-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? 'default' : 'ghost'}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setActiveTab(tab.id)}
                >
                  <Icon className="h-4 w-4"/>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto px-4 py-6 lg:py-8">
            <div className="mx-auto">
              {activeTab === 'enhancer' && (
                <DraggableLayout activeTab={activeTab}>
                  <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                    {/* Main Editor Area */}
                    <div className="xl:col-span-8">
                      <PromptEnhancer/>
                    </div>

                    {/* Sidebar Content */}
                    <div className="xl:col-span-4">
                      <div className="sticky top-6 space-y-6">
                        <div className="hidden xl:block">
                          <ModelSelector/>
                        </div>
                      </div>
                    </div>
                  </div>
                </DraggableLayout>
              )}

              {activeTab === 'history' && (
                <DraggableLayout activeTab={activeTab}>
                  <HistoryPanel
                    history={history}
                    loading={historyLoading}
                    config={{allowBulkDelete: true, allowCompare: true, allowExport: true}}
                  />
                </DraggableLayout>
              )}

              {activeTab === 'stats' && (
                <DraggableLayout activeTab={activeTab}>
                  <StatsPanel/>
                </DraggableLayout>
              )}
              {activeTab === 'settings' && (
                <DraggableLayout activeTab={activeTab}>
                  <SettingsPanel/>
                </DraggableLayout>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
