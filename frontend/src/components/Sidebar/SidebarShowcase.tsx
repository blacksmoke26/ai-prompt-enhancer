import React, {useCallback, useEffect, useState} from 'react';
import {
  Activity,
  BarChart3,
  Code,
  Database,
  Folder,
  Globe,
  LayoutDashboard,
  LucideIcon,
  Settings,
  Shield,
  Smartphone,
  Terminal,
  Users,
  Zap,
} from 'lucide-react';

// utils
import {cn} from '~/utils/helpers';

// components
import Sidebar from './index';
import {SidebarItem} from '~/components/Sidebar/SidebarItem.tsx';
import {SidebarGroup} from '~/components/Sidebar/SidebarGroup.tsx';

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: string | number;
  children?: NavItem[];
}

export interface NavGroup {
  title?: string;
  items: NavItem[];
  defaultCollapsed?: boolean;
}

export const navigationItems: NavGroup[] = [
  {
    title: 'Platform',
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: LayoutDashboard
      },
      {
        id: 'analytics',
        label: 'Analytics',
        icon: BarChart3,
        badge: 'Pro'
      },
      {
        id: 'activity',
        label: 'Live Activity',
        icon: Activity
      }
    ]
  },
  {
    title: 'Workspace',
    defaultCollapsed: false,
    items: [
      {
        id: 'projects',
        label: 'Projects',
        icon: Folder,
        badge: 12,
        children: [
          { id: 'web', label: 'Web Apps', icon: Globe },
          { id: 'mobile', label: 'Mobile Apps', icon: Smartphone },
          { id: 'ai', label: 'AI Models', icon: Zap },
        ]
      },
      {
        id: 'team',
        label: 'Team Members',
        icon: Users
      }
    ]
  },
  {
    title: 'System',
    defaultCollapsed: true,
    items: [
      {
        id: 'database',
        label: 'Database',
        icon: Database
      },
      {
        id: 'api',
        label: 'API Keys',
        icon: Code
      },
      {
        id: 'settings',
        label: 'Settings',
        icon: Settings,
        children: [
          { id: 'settings-general', label: 'General', icon: Settings },
          { id: 'settings-security', label: 'Security', icon: Shield },
          { id: 'settings-logs', label: 'Logs', icon: Terminal },
        ]
      },
    ]
  }
];

// ==========================================
// 3. RENDERER HELPER
// ==========================================

interface DynamicSidebarProps {
  items: NavGroup[];
  activeId: string;
  onItemClick: (id: string) => void;
}

const renderItems = (items: NavItem[], activeId: string, onClick: (id: string) => void) => {
  return items.map((item) => (
    <SidebarItem
      key={item.id}
      id={item.id}
      label={item.label}
      icon={item.icon}
      badge={item.badge}
      active={activeId === item.id}
      onClick={() => onClick(item.id)}
    >
      {item.children && renderItems(item.children, activeId, onClick)}
    </SidebarItem>
  ));
};

const DynamicSidebar: React.FC<DynamicSidebarProps> = ({ items, activeId, onItemClick }) => {
  return (
    <>
      {items.map((group, idx) => (
        <SidebarGroup
          key={group.title || idx}
          title={group.title}
          defaultCollapsed={group.defaultCollapsed}
        >
          {renderItems(group.items, activeId, onItemClick)}
        </SidebarGroup>
      ))}
    </>
  );
};

// ==========================================
// 4. MAIN SHOWCASE COMPONENT
// ==========================================

export default function SidebarShowcaseApp() {
  // -- State --
  const [activeId, setActiveId] = useState('dashboard');
  const [logs, setLogs] = useState<{ time: string; event: string }[]>([]);

  // Configuration State
  const [config, setConfig] = useState({
    side: 'left' as 'left' | 'right',
    collapsible: true,
    resizable: true,
    searchable: true,
    expandOnHover: true,
    isLoading: false
  });

  // -- Handlers --
  const handleNavigation = useCallback((id: string) => {
    setActiveId(id);
    addLog(`Navigated to: ${id}`);
  }, []);

  const handleSearch = useCallback((query: string) => {
    addLog(`Search query: "${query}"`);
  }, []);

  const handleOpenChange = useCallback((open: boolean) => {
    // You can sync with app store here
  }, []);

  const handleCollapseChange = useCallback((collapsed: boolean) => {
    addLog(`Sidebar ${collapsed ? 'Collapsed' : 'Expanded'}`);
  }, []);

  // Logger Helper
  const addLog = useCallback((event: string) => {
    const now = new Date();
    const time = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    setLogs(prev => [{ time, event }, ...prev].slice(0, 10));
  }, []);

  // Simulate Loading Effect
  useEffect(() => {
    if (config.isLoading) {
      const timer = setTimeout(() => setConfig(c => ({ ...c, isLoading: false })), 2000);
      return () => clearTimeout(timer);
    }
  }, [config.isLoading]);

  return (
    <div className="flex h-screen w-full bg-background font-sans text-foreground overflow-hidden relative">

      {/*
       * --- SIDEBAR SECTION ---
       */}
      <Sidebar
        title="Synapse Demo"
        collapsible={config.collapsible}
        resizable={config.resizable}
        searchable={config.searchable}
        onSearchChange={handleSearch}
        isLoading={config.isLoading}
        expandOnHover={config.expandOnHover}
        side={config.side}
        onOpenChange={handleOpenChange}
        onCollapseChange={handleCollapseChange}
      >
        <DynamicSidebar
          items={navigationItems}
          activeId={activeId}
          onItemClick={handleNavigation}
        />
      </Sidebar>

      {/*
       * --- MAIN CONTENT AREA ---
       */}
      <main className="flex-1 overflow-hidden flex flex-col relative bg-gradient-to-br from-background to-slate-50/50">

        {/* Top Header */}
        <header className="h-16 border-b border-border bg-card/50 backdrop-blur-md flex items-center justify-between px-8 shrink-0 z-30">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-primary">Dashboard</h2>
            <p className="text-xs text-muted-foreground">Application Control Center</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">System Online</span>
            </div>
          </div>
        </header>

        {/* Scrollable Workspace */}
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-6xl mx-auto space-y-8">

            {/* Hero Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Total Users', val: '12,345', color: 'blue', icon: Users },
                { label: 'Revenue', val: '$45,230', color: 'purple', icon: BarChart3 },
                { label: 'Server Load', val: '12%', color: 'emerald', icon: Activity }
              ].map((stat, i) => (
                <div key={i} className="bg-card rounded-xl p-6 border border-border shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                  <div className="absolute -right-4 -top-4 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                    <stat.icon size={64} className={`text-${stat.color}-500`} />
                  </div>
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    {stat.label}
                  </h3>
                  <div className="mt-2 text-3xl font-bold text-foreground">{stat.val}</div>
                  <div className="mt-2 text-xs text-muted-foreground flex items-center">
                    <span className="text-emerald-500 mr-1 font-semibold">▲ 8%</span> vs last month
                  </div>
                </div>
              ))}
            </div>

            {/* Active View Placeholder */}
            <div className="bg-card rounded-xl border border-border p-12 min-h-[400px] flex flex-col items-center justify-center text-center relative overflow-hidden">
              {/* Background Grid */}
              <div className="absolute inset-0 grid grid-cols-[repeat(20,1fr)] opacity-5 pointer-events-none">
                {[...Array(100)].map((_, i) => <div key={i} className="border border-r border-b border-foreground h-8 w-8" />)}
              </div>

              {/* Content */}
              <div className="relative z-10 animate-in fade-in zoom-in-95 duration-500">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-primary to-blue-500 flex items-center justify-center shadow-lg shadow-primary/25 mb-6">
                  <Terminal size={40} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">View: <span className="text-primary">{activeId}</span></h3>
                <p className="text-muted-foreground max-w-lg">
                  This area represents the main application content. The `activeId` state is being driven by the Sidebar component.
                  Try searching for "AI" or "Mobile" in the sidebar to filter items.
                </p>
              </div>
            </div>

            {/* Console Log */}
            <div className="bg-slate-950 text-slate-300 font-mono text-xs p-4 rounded-lg border border-border shadow-inner h-48 overflow-auto custom-scroll">
              <div className="mb-2 border-b border-white/10 pb-2 font-bold text-white flex justify-between sticky top-0 bg-slate-950 pb-2">
                <span>EVENT LOGS</span>
                <span className="text-emerald-400">● LIVE</span>
              </div>
              {logs.length === 0 ? (
                <div className="opacity-50 italic">Waiting for interaction...</div>
              ) : (
                logs.map((log, i) => (
                  <div key={i} className="mb-1 font-mono hover:bg-white/5 px-2 -mx-2 rounded">
                    <span className="text-blue-400 mr-2">[{log.time}]</span>
                    <span className="text-yellow-400">{log.event}</span>
                  </div>
                ))
              )}
            </div>

          </div>
        </div>

        {/*
         * --- FLOATING CONTROL PANEL ---
         */}
        <div className="fixed bottom-6 right-6 w-80 bg-card/95 backdrop-blur-xl border border-border shadow-2xl rounded-xl p-5 z-50 animate-in slide-in-from-bottom-4 duration-500">
          <h3 className="text-sm font-bold mb-4 flex items-center text-primary">
            <Shield size={16} className="mr-2" /> Developer Tools
          </h3>

          <div className="space-y-4">

            {/* Side Selection */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Sidebar Side</span>
              <div className="flex bg-muted rounded-lg p-0.5">
                <button
                  onClick={() => setConfig({...config, side: 'left'})}
                  className={cn(
                    "px-3 py-1 text-xs font-medium rounded-md transition-all",
                    config.side === 'left' ? "bg-background shadow text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >Left</button>
                <button
                  onClick={() => setConfig({...config, side: 'right'})}
                  className={cn(
                    "px-3 py-1 text-xs font-medium rounded-md transition-all",
                    config.side === 'right' ? "bg-background shadow text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >Right</button>
              </div>
            </div>

            {/* Feature Toggles */}
            {['collapsible', 'resizable', 'searchable', 'expandOnHover'].map((key) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground capitalize">{key}</span>
                <button
                  onClick={() => setConfig({...config, [key]: !config[key as keyof typeof config]})}
                  className={cn("h-5 w-9 rounded-full relative transition-colors", config[key as keyof typeof config] ? "bg-primary" : "bg-input")}
                >
                  <span className={cn(
                    "absolute top-1 h-3 w-3 rounded-full bg-white transition-transform",
                    config[key as keyof typeof config] ? "translate-x-4" : "translate-x-1"
                  )} />
                </button>
              </div>
            ))}

            {/* Simulate Loading */}
            <button
              onClick={() => setConfig({...config, isLoading: true})}
              disabled={config.isLoading}
              className={cn(
                "w-full mt-2 py-2 text-xs font-bold rounded-md transition-all border border-border",
                config.isLoading
                  ? "bg-muted/50 text-muted-foreground cursor-not-allowed"
                  : "bg-accent hover:bg-accent/80 text-accent-foreground"
              )}
            >
              {config.isLoading ? 'Loading...' : 'Simulate API Loading'}
            </button>

          </div>
        </div>

      </main>
    </div>
  );
}
