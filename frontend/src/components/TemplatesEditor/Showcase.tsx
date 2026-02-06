/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useMemo, useState} from 'react';
import PromptRunner, {HistoryItem, PromptStatus, PromptTemplate, Variable} from './index';
import {
  Aperture,
  Bug,
  Cpu,
  Download,
  FileJson,
  FlaskConical,
  Gauge,
  Hash,
  Layers,
  Lock,
  type LucideIcon,
  RefreshCw,
  SlidersHorizontal,
  Star,
  Terminal,
  Trash2,
  Wrench,
  Zap,
} from 'lucide-react';
import {cn} from '~/utils/helpers';
import {defaultCategoryMap} from '~/components/TemplatesEditor/utils.ts';

// --- 1. MOCK DATA GENERATOR ---

const categories = ['development', 'marketing', 'writing', 'design', 'finance', 'education', 'legal', 'networking', 'science'];
const types = ['Generator', 'Analyzer', 'Refactor', 'Summarizer', 'Translator', 'Validator', 'Optimizer'];

const generateMassiveTemplates = (): PromptTemplate[] => {
  const templates: PromptTemplate[] = [];
  let idCounter = 100;

  categories.forEach(cat => {
    types.forEach((type, i) => {
      const isComplex = i > 2;
      const hasConditionals = i === 1;
      const hasLocks = i === 2;

      // Content generation
      let content = `# Task: {{task_name}}\n\nGenerate a {{type}} for {{target}}.`;
      if (cat === 'development') {
        content = `// Define ${type} for {{target}}\nconst config = {{env}};\n\nfunction execute() {\n  // Use {{language}} to {{action}}\n}`;
      } else if (cat === 'marketing') {
        content = `Subject: {{subject_line}}\n\nHey {{audience}},\n\n{{content_body}}`;
      } else if (cat === 'writing') {
        content = `**Title:** {{headline}}\n\n{{body_text}}\n\n_Tags: {{tags}}_`;
      }

      // Variable generation
      const variables: Variable[] = [
        {
          name: 'target',
          type: 'string',
          required: true,
          placeholder: cat === 'development' ? 'e.g. API Endpoint' : 'Target Audience',
          description: 'The primary entity to focus on.'
        },
        {
          name: 'type',
          type: 'select',
          options: ['Standard', 'Detailed', 'Creative', 'Technical'],
          defaultValue: 'Standard'
        }
      ];

      if (cat === 'development') {
        variables.push(
          { name: 'env', type: 'select', options: ['Staging', 'Production', 'Dev'], defaultValue: 'Dev', group: 'Config' },
          { name: 'language', type: 'select', options: ['JavaScript', 'Python', 'Rust', 'Go'], defaultValue: 'JavaScript', group: 'Config' },
          { name: 'action', type: 'select', options: ['Parse', 'Compile', 'Minify'], defaultValue: 'Parse' },
        );
      }

      if (cat === 'marketing') {
        variables.push(
          { name: 'tone', type: 'select', options: ['Professional', 'Casual', 'Excited'], defaultValue: 'Professional' },
          { name: 'platform', type: 'select', options: ['Email', 'LinkedIn', 'Twitter', 'Blog'] },
        );
      }

      // Conditional Logic Example
      if (hasConditionals) {
        variables.push({
          name: 'include_advanced',
          type: 'boolean',
          defaultValue: false,
          description: 'Enable advanced settings'
        });
        variables.push({
          name: 'complexity_level',
          type: 'select',
          options: ['Low', 'Medium', 'High'],
          group: 'Advanced',
          showIf: (d) => d.include_advanced === true
        });
      }

      // Locked Variable Example
      if (hasLocks) {
        variables.push({
          name: 'system_id',
          type: 'string',
          locked: true,
          defaultValue: 'SYS-8842-X',
          group: 'System',
          tooltip: 'Auto-generated unique identifier. Read-only.'
        });
      }

      // Number Input Example
      if (i % 2 === 0) {
        variables.push({
          name: 'max_tokens',
          type: 'number',
          defaultValue: 500,
          min: 100,
          max: 4000,
          group: 'Limits'
        });
      }

      // Textarea Example
      if (i % 3 === 0) {
        variables.push({
          name: 'notes',
          type: 'code',
          placeholder: 'Add any additional context...',
          description: 'Internal notes for this generation'
        });
      }

      templates.push({
        id: idCounter++,
        title: `${cat.charAt(0).toUpperCase() + cat.slice(1)} ${type} v${i + 1}.0}`,
        description: `A robust ${type.toLowerCase()} template designed for ${cat} scenarios. ${isComplex ? 'Includes advanced conditional logic.' : ''}`,
        category: cat,
        tags: [cat, type.toLowerCase(), 'v4'],
        version: `${Math.floor(Math.random() * 5)}.${Math.floor(Math.random() * 10)}`,
        badges: i === 0 ? ['NEW'] : (cat === 'marketing' && i === 1 ? ['HOT', 'VIRAL'] : []),
        isDeprecated: cat === 'development' && idCounter % 20 === 0,
        estimatedBaseTokens: 50 + (i * 10),
        content: content,
        variables: variables,
      });
    });
  });
  return templates;
};

// Generate presets based on common use cases
const generateDemoPresets = (templates: PromptTemplate[]) => {
  const devTemplate = templates.find(t => t.category === 'development');
  const mktTemplate = templates.find(t => t.category === 'marketing');
  const writeTemplate = templates.find(t => t.category === 'writing');

  return [
    {
      id: 'p1',
      label: 'Quick API Call',
      values: { target: 'Payment Gateway', type: 'Generator', env: 'Production', language: 'JavaScript' }
    },
    {
      id: 'p2',
      label: 'Viral Tweet',
      values: { tone: 'Excited', platform: 'Twitter', audience: 'Gen Z' }
    },
    {
      id: 'p3',
      label: 'Blog Post Draft',
      values: { type: 'Summarizer', headline: 'The Future of AI' }
    }
  ].filter(p => templates.length > 0);
};

const demoTemplates = generateMassiveTemplates();
const demoPresets = generateDemoPresets(demoTemplates);

// Extended Category Icons
const showcaseCategoryIcons: Record<string, { name: string; icon: LucideIcon }> = {
  ...defaultCategoryMap,
  'science': { name: 'Science', icon: FlaskConical },
};

// --- TYPES ---
type RightPanelTab = 'logs' | 'tweaks' | 'debug' | 'actions';

interface LogEntry {
  id: number;
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'debug';
  message: string;
  details?: any;
}

// --- SHOWCASE COMPONENT V5 (UPDATED FOR SIMPLIFIED RUNNER) ---

export const PromptRunnerShowcaseV4: React.FC = () => {
  // --- STATE ---

  // Core App State (Layout is now fixed: Split Vertical + Drawer)
  const [output, setOutput] = useState('');

  // Data State
  const [status, setStatus] = useState<PromptStatus>('active');
  const [favorites, setFavorites] = useState<number[]>([101]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [filterCat, setFilterCat] = useState<string>('all');

  // Logging State
  const [logs, setLogs] = useState<LogEntry[]>([]);

  // Tweak / Config State
  const [tweaks, setTweaks] = useState({
    fontSize: 14,
    debounceMs: 300,
    simSpeed: 10,
    manualEdit: true,
    maxChars: 0,
  });

  // UI State
  const [activeTab, setActiveTab] = useState<RightPanelTab>('logs');

  // --- HANDLERS ---

  const addLog = (type: LogEntry['type'], message: string, details?: any) => {
    const entry: LogEntry = {
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString('en-US', {hour12: false}),
      type,
      message,
      details,
    };
    setLogs(prev => [entry, ...prev].slice(0, 100));
  };

  const handleTweakChange = (key: keyof typeof tweaks, value: any) => {
    setTweaks(prev => ({...prev, [key]: value}));
    addLog('debug', `Config changed: ${key} = ${value}`);
  };

  const handleHardReset = () => {
    setOutput('');
    setLogs([]);
    setStatus('active');
    setFavorites([101]);
    setFilterCat('all');
    addLog('warning', 'Hard Reset performed');
  };

  const handleExportState = () => {
    const state = {
      tweaks,
      logsCount: logs.length,
    };
    const blob = new Blob([JSON.stringify(state, null, 2)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `showcase-state-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    addLog('success', 'State exported to JSON');
  };

  // --- CALCULATED PROPS FOR RUNNER ---
  const runnerProps = useMemo(() => ({
    enableCommandPalette: true,
    config: {
      enableManualEdit: tweaks.manualEdit,
      simulationSpeed: tweaks.simSpeed,
    },
    editorProps: {
      fontSize: tweaks.fontSize,
      maxCharCount: tweaks.maxChars || undefined,
      showCopyButton: true,
    },
    debounceMs: tweaks.debounceMs,
  }), [tweaks]);

  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden font-sans">

      {/* LEFT PANEL: LIBRARY & INFO */}
      <div className="w-80 border-r border-border bg-muted/5 flex flex-col shrink-0 transition-all duration-300">
        {/* Header */}
        <div className="h-14 border-b border-border flex items-center px-4 bg-muted/20 shrink-0">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-primary"/><span className="font-bold text-sm">IDE v5 (Fixed)</span>
          </div>
          <button onClick={() => setLogs([])} className="text-muted-foreground hover:text-foreground ml-auto"><RefreshCw size={14}/></button>
        </div>

        {/* Controls Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scroll">

          {/* Info Box */}
          <div className="mt-auto p-3 bg-muted/10 rounded border border-border/50 text-[10px] text-muted-foreground">
            <div className="flex justify-between mb-1"><span>Templates:</span> <span className="font-mono text-foreground">{demoTemplates.length}</span></div>
            <div className="flex justify-between mb-1"><span>Favorites:</span> <span className="font-mono text-foreground">{favorites.length}</span></div>
            <div className="flex justify-between"><span>Logs:</span> <span className="font-mono text-foreground">{logs.length}</span></div>
          </div>
        </div>

        {/* TEMPLATE LIBRARY */}
        <div className="flex-1 flex flex-col overflow-hidden border-t border-border">
          <div className="h-10 border-b border-border flex items-center px-4 justify-between bg-muted/10 shrink-0">
            <div className="flex items-center gap-2">
              <Layers size={12} className="text-muted-foreground"/>
              <span className="text-[10px] font-bold uppercase text-muted-foreground">Library ({demoTemplates.length})</span>
            </div>
            {filterCat !== 'all' && (
              <span className="text-[9px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-bold ml-2">{filterCat}</span>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scroll">
            <div className="flex gap-2 pb-2 overflow-x-auto border-b border-border/50">
              <button onClick={() => setFilterCat('all')}
                      className={cn('text-[10px] px-2 py-1 rounded border border-border hover:bg-accent whitespace-nowrap', filterCat === 'all' && 'bg-primary text-primary-foreground')}>All
              </button>
              {Object.keys(showcaseCategoryIcons).filter(k => k !== 'all').map(cat => (
                <button key={cat} onClick={() => setFilterCat(cat)}
                        className={cn('text-[10px] px-2 py-1 rounded border border-border hover:bg-accent whitespace-nowrap flex items-center gap-1', filterCat === cat && 'bg-primary text-primary-foreground')}>
                  {React.createElement(showcaseCategoryIcons[cat].icon, {size: 10})}
                  {cat}
                </button>
              ))}
            </div>

            {demoTemplates.filter(t => filterCat === 'all' || t.category === filterCat).length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-4">
                <Hash size={32} className="opacity-20"/>
                <p className="text-sm font-medium">No templates found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {demoTemplates.filter(t => filterCat === 'all' || t.category === filterCat).map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      addLog('success', `Selected: ${t.title}`);
                    }}
                    className="group text-left p-3 rounded border border-border hover:border-primary hover:bg-accent transition-all text-xs min-h-[120px] flex flex-col"
                  >
                    <div className="flex items-start gap-2 mb-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-foreground group-hover:text-primary line-clamp-1">{t.title}</h3>
                          {t.isDeprecated && <span className="ml-2 text-[8px] bg-destructive/10 text-destructive px-1.5 py-0.5 rounded border border-destructive/20">DEPRECATED</span>}
                          {t.badges && t.badges.map(b => <span key={b} className="ml-1 text-[8px] bg-primary/10 text-primary px-1.5 py-0.5 rounded border border-primary/20 font-bold uppercase tracking-wider">{b}</span>)}
                        </div>
                        <div className="flex items-center gap-1">
                          {t.variables.some(v => v.locked) && <Lock size={10} className="text-orange-500"/>}
                          {t.variables.some(v => v.showIf) && <Bug size={10} className="text-blue-500"/>}
                          {t.variables.some(v => v.group) && <Layers size={10} className="text-green-500"/>}
                        </div>
                      </div>
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-1 truncate opacity-70 line-clamp-2">{t.description}</div>
                    <div className="flex items-center justify-between mt-auto pt-2 border-t border-border/50">
                      <span className="text-[9px] uppercase font-bold text-muted-foreground">{t.category}</span>
                      {favorites.includes(t.id) && <Star size={10} className="text-yellow-500 fill-yellow-500" />}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CENTER: PROMPT RUNNER (Simplified Interface) */}
      <div className="flex-1 flex flex-col min-w-0 bg-black/5 dark:bg-white/5 relative">
        <PromptRunner
          // --- DATA ---
          templates={demoTemplates}
          favorites={favorites}
          onToggleFavorite={(id) => {
            setFavorites(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
            addLog('info', `Favorite toggled for ID: ${id}`);
          }}
          history={history}
          onSaveSnapshot={() => {
            const newSnapshot: HistoryItem = {
              id: Math.random().toString(36).substr(2, 9),
              timestamp: new Date(),
              content: output || 'Current Output...',
              formData: {},
              label: 'Manual Save'
            };
            setHistory(prev => [newSnapshot, ...prev]);
            addLog('success', 'Snapshot saved to history');
          }}
          onRestoreHistory={(id) => {
            addLog('info', `Restoring snapshot: ${id}`);
          }}
          status={status}
          onStatusChange={(s) => {
            setStatus(s);
            addLog('info', `Status -> ${s}`);
          }}
          presets={demoPresets}
          categoryIcons={showcaseCategoryIcons}

          // --- EVENTS ---
          onCommandAction={(action) => {
            addLog('info', `Command executed: ${action}`);
          }}
          onDrawerOpen={() => addLog('info', 'Drawer Opened')}
          onSelectorOpen={() => addLog('info', 'Selector Opened')}
          onCategoryClick={(cat) => {
            addLog('info', `Category clicked: ${cat}`);
          }}
          onCategoryChange={(cat) => {
            addLog('info', `Category changed to: ${cat}`);
          }}
          onCategoryFilter={(cat) => {
            addLog('info', `Category filter applied: ${cat}`);
          }}
          onTemplateSearch={(q, cat) => {
            addLog('info', `Search query: ${q}, category: ${cat}`);
          }}
          onTagClick={(tag) => {
            addLog('info', `Tag clicked: ${tag}`);
          }}
          onCopy={() => {
            addLog('success', 'Content copied to clipboard');
          }}
          onTagValidate={(name, val, schema) => {
            // Placeholder for validation logic
            return true;
          }}
          onErrors={(errs) => {
            if (Object.keys(errs).length > 0) {
              addLog('warning', `Validation errors: ${JSON.stringify(errs)}`);
            }
          }}
          onValidate={(data) => {
            addLog('debug', `Form validated: ${JSON.stringify(data)}`);
          }}
          onFormSubmit={(data) => {
            addLog('success', `Form submitted with data: ${JSON.stringify(data)}`);
          }}
          onExecuteClick={(content, variables) => {
            addLog('success', 'Execution triggered', { content: content.substring(0, 50) + '...' });
          }}
          onPresetSelect={(id) => {
            addLog('info', `Preset selected: ${id}`);
          }}
          onExport={(format) => {
            addLog('success', `Exported as ${format}`);
          }}
          onTagValueChange={(name, val) => {
            if (Math.random() > 0.9) addLog('debug', `Var Update: ${name} = ${val}`);
          }}
          onOutputChange={setOutput}
          onStreamUpdate={(chunk) => {
            if (Math.random() > 0.8) addLog('debug', `Stream update: ${chunk.length} chars`);
          }}
          outputContent={output}

          // --- CUSTOMIZATION ---
          config={runnerProps.config}
          headerProps={{
            title: 'Pro IDE',
            breadcrumbs: [
              {label: 'Workspaces', onClick: () => {}},
              {label: filterCat.charAt(0).toUpperCase() + filterCat.slice(1), onClick: () => setFilterCat(filterCat)},
              {label: 'Active'},
            ],
            extraActions: <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>,
          }}
          editorProps={runnerProps.editorProps}
          drawerProps={{submitText: 'Generate Prompt'}}
          selectorProps={{}}
          renderTag={(tag, onClick) => (
            <span key={tag} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer transition-colors" onClick={(e) => { e.stopPropagation(); onClick(tag); }}>
              {tag}
            </span>
          )}
        />
      </div>

      {/* RIGHT PANEL: TWEAKS, DEBUG, ACTIONS */}
      <div className="w-80 border-l border-border bg-card flex flex-col shrink-0 transition-all duration-300">

        {/* Tabs Header */}
        <div className="h-12 border-b border-border flex items-center bg-muted/20 px-2 gap-1 shrink-0 overflow-x-auto">
          {[
            { id: 'logs', label: 'Logs', icon: Terminal },
            { id: 'tweaks', label: 'Tweaks', icon: SlidersHorizontal },
            { id: 'debug', label: 'Debug', icon: Bug },
            { id: 'actions', label: 'Actions', icon: Wrench },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as RightPanelTab)}
                    className={cn('flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-md transition-all whitespace-nowrap', activeTab === tab.id ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:bg-accent')}>
              <tab.icon size={14}/> {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-hidden relative">

          {/* --- TAB: LOGS --- */}
          {activeTab === 'logs' && (
            <div className="absolute inset-0 overflow-y-auto p-4 space-y-2 custom-scroll">
              {logs.length === 0 && (
                <div className="h-full flex items-center justify-center text-muted-foreground text-xs opacity-50">Waiting for events...</div>
              )}
              {logs.map((log) => (
                <div key={log.id} className={cn(
                  'text-[10px] font-mono p-2 rounded border-l-2 bg-card/50 break-all animate-in slide-in-from-right-2 duration-200',
                  log.type === 'error' && 'border-destructive text-destructive bg-destructive/5',
                  log.type === 'success' && 'border-green-500 text-green-600 bg-green-500/5',
                  log.type === 'warning' && 'border-orange-500 text-orange-600 bg-orange-500/5',
                  log.type === 'info' && 'border-blue-500 text-blue-700 dark:text-blue-400 bg-blue-500/5',
                  log.type === 'debug' && 'border-purple-500 text-purple-600 bg-purple-500/5',
                )}>
                  <div className="flex justify-between opacity-50 mb-1">
                    <span className="font-bold">{log.type.toUpperCase()}</span>
                    <span>{log.timestamp}</span>
                  </div>
                  <div className="text-foreground">{log.message}</div>
                  {log.details && (
                    <div className="mt-1 pt-2 border-t border-border/30 text-[9px] text-muted-foreground font-sans break-all">
                      {JSON.stringify(log.details, null, 2)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* --- TAB: TWEAKS --- */}
          {activeTab === 'tweaks' && (
            <div className="absolute inset-0 overflow-y-auto p-4 space-y-6 custom-scroll">
              <h4 className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2 mb-4"><Aperture size={12}/> Utilities</h4>

              {/* 1. Font Size */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Editor Font Size</span>
                  <span className="font-mono text-primary">{tweaks.fontSize}px</span>
                </div>
                <input type="range" min="12" max="24" step="1" value={tweaks.fontSize}
                       onChange={(e) => handleTweakChange('fontSize', parseInt(e.target.value))}
                       className="w-full h-1.5 bg-border appearance-none rounded-full cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:hover:scale-110 transition-transform" />
              </div>

              {/* 2. Simulation Speed */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="flex items-center gap-1"><Zap size={10} /> Stream Speed</span>
                  <span className="font-mono text-primary">{tweaks.simSpeed}ms</span>
                </div>
                <input type="range" min="0" max="100" step="5" value={tweaks.simSpeed}
                       onChange={(e) => handleTweakChange('simSpeed', parseInt(e.target.value))}
                       className="w-full h-1.5 bg-border appearance-none rounded-full cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer" />
                <div className="flex justify-between text-[9px] text-muted-foreground mt-1">
                  <span>Instant</span>
                  <span>Slow</span>
                </div>
              </div>

              {/* 3. Debounce */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Debounce Delay</span>
                  <span className="font-mono text-primary">{tweaks.debounceMs}ms</span>
                </div>
                <input type="range" min="0" max="1000" step="50" value={tweaks.debounceMs}
                       onChange={(e) => handleTweakChange('debounceMs', parseInt(e.target.value))}
                       className="w-full h-1.5 bg-border appearance-none rounded-full cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer" />
              </div>

              {/* 4. Manual Edit */}
              <div className="flex items-center justify-between p-2 bg-muted/20 rounded border border-border">
                <span className="text-xs">Manual Edit</span>
                <button onClick={() => handleTweakChange('manualEdit', !tweaks.manualEdit)}
                        className={cn('w-10 h-5 rounded-full relative transition-colors', tweaks.manualEdit ? 'bg-primary' : 'bg-input')}>
                  <div className={cn('absolute top-1 left-1 w-3.5 h-3.5 rounded-full bg-white transition-transform', tweaks.manualEdit ? 'translate-x-5' : 'translate-x-0')}></div>
                </button>
              </div>

              {/* 5. Max Chars */}
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">Max Char Limit (0 = Unlimited)</label>
                <input type="number" min="0" step="100" value={tweaks.maxChars || ''}
                       onChange={(e) => handleTweakChange('maxChars', parseInt(e.target.value))}
                       className="w-full h-8 text-xs px-2 rounded border border-input bg-background font-mono focus:ring-1 focus:ring-primary outline-none" placeholder="Unlimited" />
              </div>
            </div>
          )}

          {/* --- TAB: DEBUG --- */}
          {activeTab === 'debug' && (
            <div className="absolute inset-0 overflow-y-auto p-0 custom-scroll bg-black/5 dark:bg-white/5">
              <div className="p-4 border-b border-border bg-muted/10">
                <h4 className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2"><Cpu size={12}/> Live State</h4>
              </div>
              <div className="p-4 space-y-4">
                {/* Debug Tree */}
                <div className="space-y-1 font-mono text-xs">
                  <div className="text-muted-foreground">layout: <span className="text-primary">"split-vertical" (fixed)</span></div>
                  <div className="text-muted-foreground">sidebar: <span className="text-primary">"drawer" (fixed)</span></div>
                  <div className="text-muted-foreground">status: <span className="text-primary">"{status}"</span></div>
                  <div className="text-muted-foreground">outputLen: <span className="text-primary">{output.length}</span></div>
                  <div className="text-muted-foreground">logs: <span className="text-primary">{logs.length}</span></div>
                </div>

                {/* JSON Dump */}
                <div>
                  <button onClick={() => {
                    try {
                      navigator.clipboard.writeText(JSON.stringify({tweaks, status, filterCat}, null, 2));
                      addLog('success', 'State copied to clipboard');
                    } catch(e) {
                      // nothing
                    }
                  }} className="flex items-center gap-2 text-[10px] hover:text-primary text-muted-foreground uppercase font-bold">
                    <FileJson size={12}/> Copy State JSON
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* --- TAB: ACTIONS --- */}
          {activeTab === 'actions' && (
            <div className="absolute inset-0 overflow-y-auto p-4 space-y-4 custom-scroll">
              <h4 className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2 mb-2"><Wrench size={12}/> App Control</h4>

              <div className="space-y-2">
                <button onClick={handleHardReset} className="w-full flex items-center justify-between px-3 py-2 rounded border border-border hover:bg-destructive/10 hover:text-destructive text-xs group">
                  <span>Hard Reset App</span>
                  <RefreshCw size={12} className={cn('group-hover:rotate-180 transition-transform', 'text-muted-foreground')}/>
                </button>

                <button onClick={() => setLogs([])} className="w-full flex items-center justify-between px-3 py-2 rounded border border-border hover:bg-muted/20 text-xs">
                  <span>Clear All Logs</span>
                  <Trash2 size={12} className="text-muted-foreground"/>
                </button>

                <button onClick={handleExportState} className="w-full flex items-center justify-between px-3 py-2 rounded border border-border hover:bg-primary/10 hover:text-primary text-xs">
                  <span>Export Config JSON</span>
                  <Download size={12} className="text-muted-foreground"/>
                </button>

                <button onClick={() => {
                  setStatus(Math.random() > 0.5 ? 'draft' : 'active');
                  addLog('warning', 'Status randomized');
                }} className="w-full flex items-center justify-between px-3 py-2 rounded border border-border hover:bg-muted/20 text-xs">
                  <span>Randomize Status</span>
                  <Hash size={12} className="text-muted-foreground"/>
                </button>
              </div>

              <div className="mt-6 border-t border-border pt-4">
                <h5 className="text-[10px] font-bold text-muted-foreground mb-2">SIMULATION CONTROLS</h5>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => handleTweakChange('simSpeed', 0)} className="p-2 rounded bg-muted/20 border border-border hover:bg-accent text-xs text-center">Instant (0ms)</button>
                  <button onClick={() => handleTweakChange('simSpeed', 10)} className="p-2 rounded bg-muted/20 border border-border hover:bg-accent text-xs text-center">Normal (10ms)</button>
                  <button onClick={() => handleTweakChange('simSpeed', 50)} className="p-2 rounded bg-muted/20 border border-border hover:bg-accent text-xs text-center">Slow (50ms)</button>
                  <button onClick={() => handleTweakChange('simSpeed', 200)} className="p-2 rounded bg-muted/20 border border-border hover:bg-accent text-xs text-center">Glitch (200ms)</button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-3 border-t border-border bg-muted/20 text-[10px] text-muted-foreground flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Gauge size={10} className={cn('text-primary', tweaks.simSpeed > 50 && 'text-destructive')}/>
            <span>{tweaks.simSpeed}ms/tick</span>
          </div>
          <span className="font-mono">v5.0 FIXED</span>
        </div>
      </div>
    </div>
  );
};

export default PromptRunnerShowcaseV4;
