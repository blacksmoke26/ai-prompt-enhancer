import React, {useEffect, useRef, useState} from 'react';
import {
  AlertTriangle,
  Bot,
  Bug,
  ChevronRight,
  Code,
  Cpu,
  FileCode,
  Globe,
  Layers,
  Layout,
  Maximize2,
  Minimize2,
  Moon,
  Plus,
  Send,
  Settings,
  Shield,
  Sliders,
  Square,
  Sun,
  Trash2,
  WifiOff,
  XCircle,
} from 'lucide-react';

// --- IMPORTS ---
import {useTheme} from '~/components/ThemeProvider';
import ResponseArea, {ChatMessage} from '../ResponseArea';
import {cn} from '~/utils/helpers.ts';
import {Button} from '~/components/ui/Button.tsx';
import {AdvancedTextarea} from '~/components/ui/AdvancedTextarea';

// --- 1. THEME CONFIGURATION ---
/**
 * Defines the color palette for the application's UI theme.
 * Includes semantic colors for backgrounds, text, borders, and interactive elements.
 */
interface ThemeColors {
  background: string;      /* The background color of the main container. */
  foreground: string;       /* The primary text color. */
  muted: string;            /* Color for secondary text or less prominent elements. */
  border: string;           /* Color for structural borders and dividers. */
  primary: string;          /* Color for primary actions and highlights. */
  accent: string;           /* Color for accents, success states, or highlights. */
  card: string;             /* Color for card-like containers and sidebar backgrounds. */
}

/**
 * Defines the color configurations for both dark and light modes.
 * Maps theme names to their respective hex color palettes.
 */
const THEME_COLORS: Record<string, ThemeColors> = {
  dark: {
    background: '#0f172a',
    foreground: '#f8fafc',
    muted: '#64748b',
    border: '#1e293b',
    primary: '#3b82f6',
    accent: '#10b981',
    card: '#1e293b',
  },
  light: {
    background: '#ffffff',
    foreground: '#0f172a',
    muted: '#94a3b8',
    border: '#e2e8f0',
    primary: '#2563eb',
    accent: '#059669',
    card: '#ffffff',
  },
};

/**
 * Retrieves the color palette for a specific theme mode.
 * @param mode - The name of the theme ('dark' or 'light').
 * @returns The ThemeColors interface for the requested mode, or light mode as a fallback.
 */
const getThemeColors = (mode: string): ThemeColors => {
  return THEME_COLORS[mode] || THEME_COLORS.light;
};

// --- 2. ENHANCED MOCK SERVICE ---
class MockService {
  private static idCounter = 0;

  static generateId() {
    return `msg_${++this.idCounter}_${Date.now()}`;
  }

  static createMessage(role: 'user' | 'assistant', content: string, overrides?: Partial<ChatMessage>): ChatMessage {
    const isUser = role === 'user';
    const id = this.generateId();
    const words = content.split(/\s+/).length;

    // Generate Variants for User Messages to test UI
    const variants = isUser ? [
      content,
      `${content} (Version A)`,
      `${content} (Version B)`,
      `${content} (Concise)`,
    ] : undefined;

    return {
      id,
      role,
      aiPrompt: content,
      originalPrompt: isUser ? content : 'Request',
      enhancedPrompt: content,
      model: isUser ? 'user-input' : 'gpt-4-turbo',
      enhancementType: isUser ? 'input' : 'generation',
      userRole: 'developer',
      provider: 'OpenAI',
      timestamp: new Date(Date.now() - Math.random() * 10000000),
      tokensUsed: Math.floor(words * 1.5),
      processingTime: Math.floor(Math.random() * 2000) + 200,
      rating: 0,
      notes: null,
      targetAudience: 'Expert',
      tone: 'professional',
      responseLength: 'medium',
      customInstructions: 'Use markdown.',
      format: 'markdown',
      metadata: {source: 'demo_ultimate', processed_at: new Date().toISOString()},
      stats: {
        textData: [
          {name: 'Words', value: words},
          {name: 'Chars', value: content.length},
          {name: 'Sentences', value: content.split('.').length},
        ],
        tokenStats: isUser ? [] : [
          {name: 'Input', value: 150, fill: '#3b82f6'},
          {name: 'Output', value: Math.floor(Math.random() * 1000) + 500, fill: '#10b981'},
          {name: 'Total', value: Math.floor(Math.random() * 1200) + 650, fill: '#f59e0b'},
        ],
      },
      variants,
      variantIndex: 0,
      pinned: false,
      ...overrides,
    };
  }

  static createMassiveLine() {
    return '# Massive Line Stress Test\n' + '█'.repeat(500) + 'END';
  }

  static createDeepNesting() {
    return Array(20).fill(0).map((_, i) =>
      `> ${'Nested Quote '.repeat(i)}Level ${i}`,
    ).join('\n');
  }
}

// --- 3. SUB-COMPONENTS ---

// A. Toggle Switch
const ToggleSwitch: React.FC<{ checked: boolean; onChange: () => void; label: string; icon?: any }> = (props) => {
  const {checked, onChange, label, icon: Icon} = props;

  return (
    <button onClick={onChange} className={cn(
      'w-full flex items-center justify-between p-2 rounded-md border transition-all text-xs',
      checked ? 'bg-blue-500/10 border-blue-500' : 'border-transparent bg-white/5 hover:bg-white/10',
    )}>
      <div className="flex items-center gap-2">
        {Icon && <Icon size={12}/>}
        <span>{label}</span>
      </div>
      <div className={cn('w-8 h-4 rounded-full relative transition-colors', checked ? 'bg-blue-500' : 'bg-gray-600')}>
        <div
          className={cn('absolute top-0.5 w-3 h-3 bg-white rounded-full shadow-sm transition-transform', checked ? 'translate-x-4' : 'translate-x-0.5')}/>
      </div>
    </button>
  );
};

// B. Terminal Log
const TerminalLog: React.FC<{ logs: any[] }> = ({logs}) => {
  const {resolvedTheme} = useTheme();
  const colors = getThemeColors(resolvedTheme);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (endRef.current) endRef.current.scrollIntoView({behavior: 'smooth'});
  }, [logs]);

  return (
    <div
      className={cn('h-48 font-mono text-[10px] p-2 overflow-hidden flex flex-col rounded-b-lg', colors.background, `border ${colors.border}`)}>
      <div className="flex items-center justify-between mb-1 border-b border-white/10 pb-1">
        <span className={cn('font-bold uppercase tracking-wider', colors.accent)}>Dev Console</span>
        <span className={cn('animate-pulse', colors.primary)}>● REC</span>
      </div>
      <div className="flex-1 overflow-y-auto space-y-1 custom-scrollbar">
        {logs.slice(-50).map((log, idx) => {
          let color = colors.primary;
          if (log.type === 'error') color = 'text-red-400';
          if (log.type === 'success') color = 'text-green-400';
          if (log.type === 'warn') color = 'text-yellow-400';

          return (
            <div key={idx} className="flex gap-2 break-all">
              <span className={cn('w-16 text-right shrink-0', colors.muted)}>[{log.time || 'Now'}]</span>
              <span className={cn(color, 'flex-1')}>{log.msg}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- 4. MAIN DEMO APPLICATION ---
const DemoApp: React.FC = () => {
  const {resolvedTheme, setTheme} = useTheme();
  const colors = getThemeColors(resolvedTheme);
  const [isDark, setIsDark] = useState(resolvedTheme === 'dark');

  // --- UI State ---
  const [isWide, setIsWide] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // --- Input State (New Feature) ---
  const [promptInput, setPromptInput] = useState('');

  // --- Simulation Settings State ---
  const [streamSpeed, setStreamSpeed] = useState(10);
  const [streamLatency, setStreamLatency] = useState(0);
  const [glitchMode, setGlitchMode] = useState(false);
  const [themeFlicker, setThemeFlicker] = useState(false);

  // --- Core Data State ---
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [content, setContent] = useState('');

  // --- Simulation State ---
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const streamIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const streamIndexRef = useRef(0);

  // --- Logger State ---
  const [devLogs, setDevLogs] = useState<any[]>([]);
  const log = (msg: string, type: 'info' | 'success' | 'warn' | 'error' = 'info') => {
    const time = new Date().toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    setDevLogs(prev => [...prev, {time, msg, type}]);
  };

  // --- Effects ---
  useEffect(() => setIsDark(resolvedTheme === 'dark'), [resolvedTheme]);

  // Theme Flicker Effect
  useEffect(() => {
    if (!themeFlicker) return;
    const interval = setInterval(() => {
      const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
      log(`FLICKER: Attempting switch to ${newTheme}`, 'warn');
      setTheme(newTheme);
    }, 500);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [themeFlicker, resolvedTheme]);

  // --- Initialization ---
  useEffect(() => {
    const initMsgs = [
      MockService.createMessage('user', 'System Diagnostics: Run full test suite.'),
      MockService.createMessage('assistant', '**Status:** All systems nominal. Ready for testing. Use the **Input Bar** below to chat.'),
    ];
    setMessages(initMsgs);
    log('App Initialized', 'success');
  }, []);

  // --- HANDLERS ---

  const handleToggleTheme = () => {
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    log('Theme toggle requested (Mock)', 'info');
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    log(`Copied ${text.length} chars`, 'success');
  };

  const handleDownload = (text: string) => {
    const element = document.createElement('a');
    const file = new Blob([text], {type: 'text/markdown'});
    element.href = URL.createObjectURL(file);
    element.download = `demo_${Date.now()}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    log('File downloaded', 'success');
  };

  const handleStopStream = () => {
    if (streamIntervalRef.current) {
      clearInterval(streamIntervalRef.current);
      setIsStreaming(false);
      log('Stream Stopped', 'warn');
    }
  };

  const handleStream = (text: string) => {
    setIsStreaming(true);
    setContent('');
    streamIndexRef.current = 0;

    const startStream = () => {
      streamIntervalRef.current = setInterval(() => {
        if (streamIndexRef.current < text.length) {
          let char = text[streamIndexRef.current];

          // Glitch Simulation
          if (glitchMode && Math.random() > 0.95) {
            char = '█';
          }

          setContent(prev => prev + char);
          streamIndexRef.current++;
        } else {
          handleStopStream();
          setTimeout(() => {
            const newMsg = MockService.createMessage('assistant', text);
            setMessages(prev => [...prev, newMsg]);
            setContent('');
            log('Stream Finished', 'success');
          }, 100);
        }
      }, streamSpeed);
    };

    // Latency Simulation
    if (streamLatency > 0) {
      log(`Latency applied: ${streamLatency}ms`, 'info');
      setTimeout(startStream, streamLatency);
    } else {
      startStream();
    }
  };

  const handleDeleteMessage = (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
    log(`Deleted message ${id}`);
  };

  const handleEditMessage = (id: string, newContent: string) => {
    setMessages(prev => prev.map(m => m.id === id ? {...m, aiPrompt: newContent} : m));
    log(`Edited message ${id}`);
  };

  const handleRateMessage = (id: string, rating: number) => {
    setMessages(prev => prev.map(m => m.id === id ? {...m, rating} : m));
    log(`Rated message ${id}: ${rating}`);
  };

  const handlePinMessage = (id: string, isPinned: boolean) => {
    setMessages(prev => {
      const msg = prev.find(m => m.id === id);
      if (!msg) return prev;
      const others = prev.filter(m => m.id !== id);
      const updatedMsg = {...msg, pinned: isPinned};

      log(isPinned ? `Pinned message ${id}` : `Unpinned message ${id}`, 'info');
      return isPinned ? [updatedMsg, ...others] : [...others, updatedMsg];
    });
  };

  const handleSwitchVariant = (msgId: string, newIndex: number) => {
    setMessages(prev => {
      const idx = prev.findIndex(m => m.id === msgId);
      if (idx === -1) return prev;
      const msg = prev[idx];
      const newVar = msg.variants?.[newIndex];
      if (!newVar) return prev;
      const updated = [...prev];
      updated[idx] = {...msg, aiPrompt: newVar, variantIndex: newIndex};
      log(`Switched variant ${newIndex} for ${msgId}`);
      return updated;
    });
  };

  // --- NEW: Input Handler ---
  const handleSendPrompt = () => {
    if (!promptInput.trim()) return;

    // 1. Add User Message
    const userMsg = MockService.createMessage('user', promptInput);
    setMessages(prev => [...prev, userMsg]);
    setPromptInput('');
    log('User message sent', 'info');

    // 2. Simulate AI Response
    setTimeout(() => {
      const responses = [
        'I\'ve analyzed your input. Here is the breakdown.',
        '**Confirmed:** Operation successful.',
        'Data updated in local store.',
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      handleStream(randomResponse);
    }, 600);
  };

  // --- NEW: Bulk / Variant Handlers ---
  const handleAddMultiple = (count: number) => {
    const newMsgs = Array.from({length: count}, (_, i) =>
      MockService.createMessage(i % 2 === 0 ? 'user' : 'assistant', `Bulk Item #${i}`),
    );
    setMessages(prev => [...prev, ...newMsgs]);
    log(`Bulk injected ${count} messages`, 'success');
  };

  const handleAddVariantTest = () => {
    const userMsg = MockService.createMessage('user', 'Test variant switching please.');
    setMessages(prev => [...prev, userMsg]);
    log('Added variant test message', 'info');
  };

  const testEmpty = () => {
    handleStream('');
    log('Testing empty content', 'warn');
  };

  const floodContent = () => {
    const text = Array(100).fill(null).map((_, i) => `Line ${i}: ${'A'.repeat(50)}`).join('\n');
    handleStream(text);
  };

  return (
    <div
      className={cn('h-screen w-screen overflow-hidden flex flex-col font-sans', colors.background, colors.foreground)}>

      {/* --- TOP NAVBAR --- */}
      <div
        className={cn('h-14 border-b flex items-center justify-between px-6 shrink-0 z-50 shadow-sm', colors.card, `border ${colors.border}`)}>
        <div className="flex items-center gap-4">
          <div
            className={cn('p-2 rounded-lg shadow-md bg-gradient-to-br', isDark ? 'from-blue-600 to-purple-600' : 'from-blue-500 to-indigo-500')}>
            <Bot size={18} className="text-white"/>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
              ResponseArea <span className="text-xs px-2 py-0.5 rounded bg-blue-500/20 text-blue-500">ULTIMATE</span>
            </h1>
            <p className={cn('text-xs', colors.muted)}>Comprehensive Testing Suite</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={handleToggleTheme} className={cn('p-2 rounded-full hover:bg-black/5', colors.foreground)}>
            {isDark ? <Sun size={20} className="text-yellow-300"/> : <Moon size={20} className="text-blue-500"/>}
          </button>
          <div className="h-6 w-px bg-white/10"/>
          <Button size="sm" variant="outline" onClick={() => setMessages([])}
                  leftIcon={<Trash2 size={14}/>} className={cn('text-xs', colors.muted, `border ${colors.border}`)}>
            Clear
          </Button>
          <Button size="sm" variant="default" onClick={() => {
            const m = MockService.createMessage('user', 'Generate random test data.');
            setMessages(p => [...p, m]);
            setTimeout(() => handleStream(MockService.createMessage('assistant', 'Here is some random data: **' + Math.random().toString(36).substring(7) + '**').aiPrompt), 500);
          }} leftIcon={<Plus size={14}/>} className="text-xs shadow-lg">
            Random
          </Button>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 flex overflow-hidden relative">

        {/* --- COMPREHENSIVE SIDEBAR --- */}
        <aside className={cn(
          'w-[420px] flex flex-col border-r z-40 transition-transform duration-300 ease-in-out',
          `border ${colors.border}`, colors.card,
          isSidebarOpen ? 'translate-x-0' : '-translate-x-[420px]',
        )}>
          <div className="p-3 border-b flex justify-between items-center"
               style={{borderColor: 'rgba(255,255,255,0.05)'}}>
            <h3 className={cn('text-xs font-bold uppercase tracking-wider flex items-center gap-2', colors.muted)}>
              <Settings size={12}/> Dev Suite
            </h3>
            <button onClick={() => setIsSidebarOpen(false)} className={cn(colors.foreground, 'hover:opacity-80')}>
              <ChevronRight size={16}/>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-4">

            {/* 1. Generators */}
            <section className="space-y-2">
              <h4 className={cn('text-[10px] font-bold uppercase tracking-wider mb-2', colors.primary)}>Generators</h4>
              <div className="grid grid-cols-2 gap-2">
                <Button className="py-8" variant="ghost" onClick={() => {
                  const m = MockService.createMessage('user', 'Explain React Virtual DOM');
                  setMessages(p => [...p, m]);
                  setTimeout(() => handleStream(MockService.createMessage('assistant', 'React Virtual DOM is a concept...').aiPrompt), 500);
                }}>
                  <Code size={16} className="mb-1 mx-auto text-blue-400 block"/> <span
                  className="text-[12px]">Concept</span>
                </Button>
                <Button className="py-8" variant="ghost" onClick={() => {
                  const m = MockService.createMessage('user', 'What is the capital of France?');
                  setMessages(p => [...p, m]);
                  setTimeout(() => handleStream('Paris'), 500);
                }}>
                  <span><Globe size={16} className="mb-1 mx-auto text-green-400 block"/> <span
                    className="text-[12px]">Fact</span></span>
                </Button>
              </div>
            </section>

            {/* 2. Stream Engine */}
            <section className="p-3 rounded bg-black/20 border border-white/5">
              <h4
                className={cn('text-[10px] font-bold uppercase tracking-wider mb-3 flex items-center gap-2', colors.primary)}>
                <Cpu size={12}/> Stream Engine
              </h4>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-[10px] mb-1">
                    <span>Speed: {streamSpeed}ms</span>
                    <span className={colors.muted}>(Lower is faster)</span>
                  </div>
                  <input type="range" min="1" max="100" value={streamSpeed}
                         onChange={(e) => setStreamSpeed(Number(e.target.value))}
                         className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"/>
                </div>

                <div>
                  <div className="flex justify-between text-[10px] mb-1">
                    <span>Latency: {streamLatency}ms</span>
                  </div>
                  <input type="range" min="0" max="2000" step="100" value={streamLatency}
                         onChange={(e) => setStreamLatency(Number(e.target.value))}
                         className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"/>
                </div>

                <ToggleSwitch label="Glitch Mode (Simulate Loss)" checked={glitchMode}
                              onChange={() => setGlitchMode(!glitchMode)} icon={WifiOff}/>
              </div>
            </section>

            {/* 3. Bulk Ops */}
            <section className="space-y-2">
              <h4 className={cn('text-[10px] font-bold uppercase tracking-wider mb-2', colors.primary)}>Bulk
                Operations</h4>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="flex-1" onClick={() => handleAddMultiple(10)}>Add 10
                  Msgs</Button>
                <Button variant="outline" className="flex-1" onClick={() => handleAddMultiple(50)}>Add 50
                  Msgs</Button>
                <Button variant="outline" className="flex-1" onClick={handleAddVariantTest}>Add Variant
                  Test</Button>
                <Button variant="outline" className="flex-1" onClick={floodContent}>Content Flood</Button>
              </div>
            </section>

            {/* 4. Stress Tests */}
            <section className="space-y-2">
              <h4 className={cn('text-[10px] font-bold uppercase tracking-wider mb-2', colors.primary)}>Stress & Edge
                Cases</h4>
              <button onClick={() => handleStream(MockService.createMassiveLine())} className={cn(
                'w-full p-2 rounded border text-left flex items-center justify-between text-[10px] hover:bg-white/5', `border ${colors.border}`,
              )}>
                <span className="flex items-center gap-2"><FileCode size={12}/> Massive Line (No Wrap)</span>
                <AlertTriangle size={12} className="text-yellow-500"/>
              </button>
              <button onClick={() => handleStream(MockService.createDeepNesting())} className={cn(
                'w-full p-2 rounded border text-left flex items-center justify-between text-[10px] hover:bg-white/5', `border ${colors.border}`,
              )}>
                <span className="flex items-center gap-2"><Layers size={12}/> Deep Nesting (20 levels)</span>
                <Bug size={12} className="text-red-500"/>
              </button>
              <button onClick={testEmpty} className={cn(
                'w-full p-2 rounded border text-left flex items-center justify-between text-[10px] hover:bg-white/5', `border ${colors.border}`,
              )}>
                <span className="flex items-center gap-2"><Square size={12}
                                                                  className="text-gray-500"/> Empty Content</span>
                <Shield size={12} className="text-blue-500"/>
              </button>
            </section>

            {/* 5. UI Stress */}
            <section className="p-2 rounded bg-red-500/10 border border-red-500/20">
              <h4 className={cn('text-[10px] font-bold uppercase tracking-wider mb-2 text-red-400')}>UI Stress
                Tests</h4>
              <ToggleSwitch label="Theme Flicker (500ms)" checked={themeFlicker}
                            onChange={() => setThemeFlicker(!themeFlicker)} icon={Sliders}/>
            </section>

            {/* 6. TERMINAL */}
            <div className="mt-auto pt-4 border-t border-white/10">
              <TerminalLog logs={devLogs}/>
            </div>

          </div>
        </aside>

        {/* --- MAIN COMPONENT AREA --- */}
        <main className="flex-1 relative h-full flex flex-col" style={{backgroundColor: colors.background}}>

          {/* Floating Layout Toggles */}
          <div className="absolute top-4 left-4 z-50 flex gap-2">
            <button onClick={() => setIsWide(!isWide)} className={cn(
              'p-2 rounded-lg shadow-lg backdrop-blur-sm transition-transform hover:scale-110',
              colors.card, `border ${colors.border}`,
            )}>
              {isWide ? <Minimize2 size={16}/> : <Maximize2 size={16}/>}
            </button>
            <button onClick={() => setIsFullScreen(!isFullScreen)} className={cn(
              'p-2 rounded-lg shadow-lg backdrop-blur-sm transition-transform hover:scale-110',
              colors.card, `border ${colors.border}`,
            )}>
              <Layout size={16}/>
            </button>
          </div>

          <div className="flex-1 h-full flex flex-col">
            <div className="flex-1 overflow-hidden">
              <ResponseArea
                content={content}
                messages={messages}
                isLoading={isLoading}
                isStreaming={isStreaming}
                isWide={isWide}
                isFullScreen={isFullScreen}
                onCopy={handleCopy}
                onDownload={handleDownload}
                toggleWidth={() => setIsWide(!isWide)}
                toggleFullScreen={() => setIsFullScreen(!isFullScreen)}
                onStopStream={handleStopStream}
                onRegenerate={() => {
                  log('Regenerating last message', 'info');
                  const last = messages[messages.length - 1];
                  if (last) {
                    setMessages(p => p.slice(0, -1));
                    handleStream(last.aiPrompt);
                  }
                }}
                onEditMessage={handleEditMessage}
                onDeleteMessage={handleDeleteMessage}
                onSwitchVariant={handleSwitchVariant}
                onRateMessage={handleRateMessage}
                onPinMessage={handlePinMessage}
                onClearHistory={() => {
                  setMessages([]);
                  log('Cleared History', 'warn');
                }}
              />
            </div>
          </div>

          {/* --- NEW: INPUT BAR --- */}
          <div className="shrink-0 p-4 border-t" style={{backgroundColor: colors.card, borderColor: colors.border}}>
            <div className="max-w-4xl mx-auto flex gap-2">
              <div className="flex-1 relative">
                <AdvancedTextarea
                  value={promptInput}
                  onChange={value => setPromptInput(value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendPrompt();
                    }
                  }}
                  placeholder="Type a message to test the chat interface..."
                  className={cn(
                    'w-full h-12 px-4 pr-12 rounded-xl border resize-none focus:outline-none focus:ring-2 transition-all text-sm custom-scrollbar',
                    colors.background,
                    colors.foreground,
                    `border ${colors.border} focus:ring-blue-500/50`,
                  )}
                />
                <div className="absolute right-3 top-3 text-muted-foreground pointer-events-none">
                  <span className="text-[10px] font-mono opacity-50">Enter ↵</span>
                </div>
              </div>
              <Button
                onClick={handleSendPrompt}
                disabled={isStreaming || !promptInput.trim()}
                className="h-14 w-12 rounded-xl shadow-lg flex items-center justify-center shrink-0"
              >
                <Send size={20}/>
              </Button>
              <Button
                variant="ghost"
                onClick={() => setPromptInput('')}
                className="h-12 w-12 rounded-xl"
              >
                <XCircle size={20}/>
              </Button>
            </div>
          </div>
        </main>

        {/* Floating Sidebar Toggle (When closed) */}
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className={cn(
              'absolute top-4 left-4 z-50 p-3 rounded-full shadow-2xl backdrop-blur-md animate-slide-up',
              colors.card, `border ${colors.border}`, colors.primary,
            )}
          >
            <Settings size={20}/>
          </button>
        )}

      </div>
    </div>
  );
};

export default DemoApp;
