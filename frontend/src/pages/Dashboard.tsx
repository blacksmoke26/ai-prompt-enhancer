import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar';
import { PromptEnhancer } from '../components/PromptEnhancer';
import { SettingsPanel } from '../components/SettingsPanel';
import { HistoryPanel } from '../components/HistoryPanel';
import { StatsPanel } from '../components/StatsPanel';
import { ModelSelector } from '../components/ModelSelector';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { History, BarChart3, Settings, Sparkles } from 'lucide-react';
import { useAppData } from '../hooks/useAppData';
import { useHistory } from '../hooks/useHistory';
import { useHistoryStore } from '../stores/historyStore';
import { useAppStore } from '../stores/appStore';
import { cn } from '../utils/helpers';

type TabType = 'enhancer' | 'history' | 'stats' | 'settings';

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('enhancer');
  const { loading, error, refreshData } = useAppData();
  const { history, loadHistory, deleteItem, updateItem, clearHistory, exportHistory } = useHistory();
  const { stats, setStats } = useHistoryStore();
  const { sidebarOpen } = useAppStore();

  useEffect(() => {
    loadHistory();
  }, []);

  useEffect(() => {
    // Load stats when history changes
    const loadStats = async () => {
      // This would typically call an API endpoint
      // For now, we'll calculate basic stats from history
      if (history.length > 0) {
        const totalItems = history.length;
        const totalTokensUsed = history.reduce((sum, item) => sum + (item.tokensUsed || 0), 0);
        const averageProcessingTime = history.reduce((sum, item) => sum + item.processingTime, 0) / totalItems;
        
        const modelCounts = history.reduce((acc, item) => {
          acc[item.model] = (acc[item.model] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        const typeCounts = history.reduce((acc, item) => {
          acc[item.enhancementType] = (acc[item.enhancementType] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        setStats({
          totalItems,
          totalTokensUsed,
          averageProcessingTime: Math.round(averageProcessingTime),
          mostUsedModel: Object.entries(modelCounts).sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A',
          mostUsedEnhancementType: Object.entries(typeCounts).sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A',
        });
      }
    };

    loadStats();
  }, [history, setStats]);

  const tabs = [
    { id: 'enhancer' as TabType, label: 'Enhancer', icon: Sparkles },
    { id: 'history' as TabType, label: 'History', icon: History },
    { id: 'stats' as TabType, label: 'Statistics', icon: BarChart3 },
    { id: 'settings' as TabType, label: 'Settings', icon: Settings },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg font-medium">Loading AI Prompt Enhancer...</p>
        </div>
      </div>
    );
  }

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
    <div className="min-h-screen bg-background flex">
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
                    activeTab === tab.id && 'bg-primary text-primary-foreground'
                  )}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </Button>
              );
            })}
          </div>
        </div>
      </Sidebar>

      {/* Main Content - Fixed Layout */}
      <div className={cn(
        "flex-1 flex flex-col transition-all duration-300",
        sidebarOpen ? "lg:ml-64" : "lg:ml-0"
      )}>
        {/* Mobile Tab Bar */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-border bg-background">
          <h1 className="text-lg font-semibold">AI Prompt Enhancer</h1>
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
                  <Icon className="h-4 w-4" />
                </Button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto px-4 py-6 lg:py-8">
            <div className="max-w-6xl mx-auto">
              {activeTab === 'enhancer' && (
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                  {/* Main Editor Area */}
                  <div className="xl:col-span-8">
                    <PromptEnhancer />
                  </div>
                  
                  {/* Sidebar Content */}
                  <div className="xl:col-span-4">
                    <div className="sticky top-6 space-y-6">
                      <div className="hidden xl:block">
                        <ModelSelector />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'history' && (
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                  <div className="xl:col-span-8">
                    <HistoryPanel
                      history={history}
                      onDelete={deleteItem}
                      onUpdate={updateItem}
                      onExport={exportHistory}
                      onClear={clearHistory}
                    />
                  </div>
                  <div className="xl:col-span-4">
                    <div className="hidden xl:block sticky top-6">
                      <StatsPanel stats={stats} />
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'stats' && <StatsPanel stats={stats} />}
              {activeTab === 'settings' && <SettingsPanel />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};