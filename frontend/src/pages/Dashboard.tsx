/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useEffect, useState} from 'react';
import {BarChart3, History, Settings, Sparkles} from 'lucide-react';

// hooks
import {useAppData} from '~/hooks/useAppData';
import {useHistory} from '~/hooks/useHistory';
import {useAppStore} from '~/stores/appStore';

// helpers
import {cn} from '~/utils/helpers';

// ui-components
import {Button} from '~/components/ui/Button';
import {Card, CardContent} from '~/components/ui/Card';

// components
import Header from '~/layout/Header';
import Sidebar from '~/components/Sidebar';
import Assistant from '~/layout/Assistant';
import StatsPanel from '~/components/StatsPanel';
import HistoryPanel from '~/components/HistoryPanel';
import SettingsPanel from '~/components/SettingsPanel';

/**
 * Represents the available dashboard tabs
 * @example 'assistant' - Main prompt enhancement interface
 * @developer notes: Use these exact values when referencing tab states
 */
export type TabType = 'assistant' | 'history' | 'stats' | 'settings';

/**
 * Main dashboard component managing tab navigation and layout
 * @example <Dashboard />
 * @developer notes: Handles global state management and responsive layout
 */
export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('assistant');
  const {loading: appLoading, error, refreshData} = useAppData();
  const {history, loadStats, loadHistory} = useHistory();
  const {sidebarOpen, theme} = useAppStore();

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme]);

  /**
   * Loads user history on component mount
   * @example useEffect(() => loadHistory(), []);
   * @developer notes: Consider adding error handling for failed loads
   */
  useEffect(() => {
    Promise.all([loadStats(), loadHistory()]).then();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Navigation tab configuration with icons
   * @example { id: 'assistant', label: 'Enhancer', icon: Sparkles }
   * @developer notes: Icons should be from lucide-react library
   */
  const tabs = [
    {id: 'assistant' as TabType, label: 'Assistant', icon: Sparkles},
    {id: 'history' as TabType, label: 'History', icon: History},
    {id: 'stats' as TabType, label: 'Statistics', icon: BarChart3},
    {id: 'settings' as TabType, label: 'Settings', icon: Settings},
  ];

  const currentTab = tabs.find(x => activeTab === x.id)!;
  const TabIcon = currentTab.icon;

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
                  leftIcon={<Icon className="h-4 w-4"/>}
                  key={tab.id}
                  variant={activeTab === tab.id ? 'default' : 'ghost'}
                  className={cn(
                    'w-full justify-start',
                    activeTab === tab.id && 'bg-primary text-primary-foreground',
                  )}
                  onClick={() => setActiveTab(tab.id)}
                >
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
        {/* Header Area */}
        <Header
          currentTab={currentTab.id}
          heading={currentTab.label}
          icon={<TabIcon size={20}/>}/>
        {/*<ModelSelector/>*/}
        {/* Content Area */}
        <div className={cn('flex-1 overflow-auto', {'overflow-hidden': activeTab === 'assistant'})}>
          <div className={cn({'container mx-auto px-4 py-6 lg:py-8': activeTab !== 'assistant'})}>
            <div className="mx-auto">
              {activeTab === 'assistant' && (
                <Assistant/>
              )}

              {activeTab === 'history' && (
                <HistoryPanel
                  history={history}
                  config={{allowBulkDelete: true, allowCompare: true, allowExport: true}}
                />
              )}

              {activeTab === 'stats' && (
                <StatsPanel/>
              )}
              {activeTab === 'settings' && (
                <SettingsPanel/>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
