/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @version 3.0.0
 * @see https://github.com/blacksmoke26
 */

import React, {useState, useCallback, useMemo, useRef, useEffect} from 'react';
import * as Select from '@radix-ui/react-select';
import {AdvancedTextarea, AdvancedTextareaProps, TextareaSize, TextareaVariant, ToolbarPosition} from './index';
import {Code, Terminal, Zap, Trash2, Settings, Sun, Moon, ChevronDown, Check, Ruler} from 'lucide-react';
import {cn} from '~/utils/helpers';

// --- Mock Data Generators ---
const generateLorem = (paragraphs: number) => {
  const p = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  return Array(paragraphs).fill(p).join('\n\n');
};

const generateLargeJSON = (depth: number, breadth: number) => {
  const generate = (d: number): any => {
    if (d === 0) return "value";
    const obj: any = {};
    for (let i = 0; i < breadth; i++) {
      obj[`key_${d}_${i}`] = i % 2 === 0 ? generate(d - 1) : Math.random();
    }
    return obj;
  };
  return JSON.stringify(generate(depth), null, 2);
};

// --- Helper Components (Styled Radix) ---

const RadixSelect = ({label, value, onChange, options, icon: Icon}: {
  label: string;
  value: string;
  onChange: (v: any) => void;
  options: Array<{label: string, value: string}>;
  icon?: React.ComponentType<{ className?: string }>;
}) => (
  <div className="space-y-1">
    <label className="text-xs font-medium text-gray-700 dark:text-gray-300">{label}</label>
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-4 w-4 opacity-50" />}
          <Select.Value placeholder="Select..." />
        </div>
        <Select.Icon className="h-4 w-4 opacity-50"><ChevronDown /></Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md">
          <Select.Viewport className="p-1">
            {options.map(opt => (
              <Select.Item key={opt.value} value={opt.value} className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                  <Select.ItemIndicator><Check className="h-4 w-4" /></Select.ItemIndicator>
                </span>
                <Select.ItemText className="capitalize">{opt.label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  </div>
);

const DemoCard: React.FC<{title: string; icon: React.ReactNode; children: React.ReactNode; className?: string}> = ({title, icon, children, className}) => (
  <div className={cn("border rounded-xl bg-card text-card-foreground shadow-sm overflow-hidden", className)}>
    <div className="flex items-center justify-between space-y-0 p-4 border-b bg-muted/50">
      <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
        {icon} {title}
      </div>
    </div>
    <div className="p-4 space-y-6">{children}</div>
  </div>
);

const StyledSwitch: React.FC<{checked: boolean; onCheckedChange: (c: boolean) => void; label: string}> = ({checked, onCheckedChange, label}) => (
  <label className="flex items-center justify-between space-x-2 cursor-pointer group">
    <span className="text-xs font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors">{label}</span>
    <div className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" className="sr-only peer" checked={checked} onChange={(e) => onCheckedChange(e.target.checked)} />
      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
    </div>
  </label>
);

const StyledSlider: React.FC<{value: number; onChange: (v: number) => void; label: string; max?: number; suffix?: string}> = ({value, onChange, label, max = 100, suffix = ''}) => (
  <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-gray-800">
    <div className="flex justify-between text-xs">
      <span className="font-medium text-gray-700 dark:text-gray-300">{label}</span>
      <span className="font-mono text-muted-foreground">{value}{suffix}</span>
    </div>
    <input type="range" min={0} max={max} step={max === 100 ? 1 : 10} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary" />
  </div>
);

export const AdvancedTextareaShowcase: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);
  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const [value, setValue] = useState('{\n  "mode": "demo",\n  "version": 3.1\n}');
  const [size, setSize] = useState<TextareaSize>('md');
  const [variant, setVariant] = useState<TextareaVariant>('classic');
  const [radius, setRadius] = useState<AdvancedTextareaProps['radius']>('md');
  const [toolbarPosition, setToolbarPosition] = useState<ToolbarPosition>('floating');
  const [layout, setLayout] = useState<AdvancedTextareaProps['layout']>('default');
  const [historyLimit, setHistoryLimit] = useState(50);
  const [indentationStr, setIndentationStr] = useState('  ');
  const [gutterWidth, setGutterWidth] = useState<number>(50);

  const [features, setFeatures] = useState({
    jsonMode: true,
    enableAutoClosing: true,
    enableTabSupport: true,
    enableDragDrop: true,
    enableCommandPalette: false,
    showLineNumbers: true,
    autoResize: true,
    showCharCount: true, // Default enabled
    showCopyButton: true, // Default enabled
    showClearButton: true, // Default enabled
    showFormatButton: true, // Default enabled
    isLoading: false,
  });

  const [maxLength, setMaxLength] = useState<number | undefined>(undefined);
  const [suggestions] = useState<string[]>(['"name": "Junaid"', '"role": "Dev"', '"active": true']);

  const [logs, setLogs] = useState<{id: number; time: string; event: string; detail: string}[]>([]);
  const logCounter = useRef(0);

  const addLog = useCallback((event: string, detail: string = '') => {
    const now = new Date().toLocaleTimeString();
    setLogs(prev => [{id: ++logCounter.current, time: now, event, detail}, ...prev].slice(0, 100));
  }, []);

  const handleChange = (val: string) => { setValue(val); addLog('onChange', `Len: ${val.length}`); };
  const handleFormat = () => addLog('onFormat', 'Triggered');
  const handleClear = () => { setValue(''); addLog('onClear', 'Value cleared'); };
  const handleCopy = () => addLog('onCopy', 'Copied to clipboard');
  const handleFocus = () => addLog('onFocus', 'Textarea focused');
  const handleBlur = () => addLog('onBlur', 'Textarea blurred');
  const handleUndo = () => addLog('Undo', 'History stack moved back');
  const handleRedo = () => addLog('Redo', 'History stack moved forward');

  const runStressTest = (type: 'small' | 'medium' | 'large' | 'json_heavy' | 'rapid') => {
    if (type === 'small') { setValue(generateLorem(1)); addLog('Stress Test', 'Generated 1 paragraph'); }
    else if (type === 'medium') { setValue(generateLorem(20)); addLog('Stress Test', 'Generated 20 paragraphs'); }
    else if (type === 'large') { setValue(generateLorem(200)); addLog('Stress Test', 'Generated 200 paragraphs'); }
    else if (type === 'json_heavy') {
      setFeatures(f => ({...f, jsonMode: true}));
      setValue(generateLargeJSON(4, 5));
      addLog('Stress Test', 'Generated Deep Nested JSON');
    }
    else if (type === 'rapid') {
      addLog('Stress Test', 'Starting rapid updates');
      let count = 0;
      const interval = setInterval(() => {
        setValue(v => v + '\n' + `Update #${count++}`);
        if (count > 20) { clearInterval(interval); addLog('Stress Test', 'Finished'); }
      }, 100);
    }
  };

  const textareaProps: Partial<AdvancedTextareaProps> = useMemo(() => ({
    value,
    onChange: handleChange,
    onFocus: handleFocus,
    onBlur: handleBlur,
    size,
    variant,
    radius,
    toolbarPosition,
    layout,
    historyLimit,
    indentationStr,
    gutterWidth,
    jsonMode: features.jsonMode,
    enableAutoClosing: features.enableAutoClosing,
    enableTabSupport: features.enableTabSupport,
    enableDragDrop: features.enableDragDrop,
    enableCommandPalette: features.enableCommandPalette,
    showLineNumbers: features.showLineNumbers,
    autoResize: features.autoResize,
    showCharCount: features.showCharCount,
    showCopyButton: features.showCopyButton,
    showClearButton: features.showClearButton,
    showFormatButton: features.showFormatButton,
    isLoading: features.isLoading,
    maxLength: maxLength === 0 ? undefined : maxLength,
    suggestions: suggestions,
    // NOTE: renderToolbar is REMOVED here to test default buttons
    onSuggestionSelect: (s) => addLog('Suggestion Selected', s),
    onFileDrop: (f) => addLog('File Drop', `${f.name} (${f.size} bytes)`),
  }), [value, features, size, variant, radius, toolbarPosition, layout, historyLimit, indentationStr, gutterWidth, maxLength, suggestions, handleChange, handleFocus, handleBlur, addLog]);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 font-sans">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-14 items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-2 font-bold text-lg">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md">
              <Code className="w-5 h-5" />
            </div>
            <span className="hidden md:inline-block">AdvancedTextarea <span className="text-muted-foreground font-normal text-sm ml-1">v3.1 Showcase</span></span>
          </div>
          <button onClick={toggleTheme} className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground h-9 w-9" aria-label="Toggle theme">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </button>
        </div>
      </header>

      <div className="flex flex-col xl:flex-row gap-6 p-4 md:p-8">
        <div className="w-full xl:w-1/3 space-y-6 flex flex-col">
          <DemoCard title="Configurator" icon={<Settings className="text-indigo-500 w-4 h-4"/>}>
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground border-b pb-2">Appearance</h3>
              <div className="grid grid-cols-2 gap-4">
                <RadixSelect label="Size" value={size} onChange={(v: TextareaSize) => setSize(v)} options={[{label: 'Small', value: 'sm'}, {label: 'Medium', value: 'md'}, {label: 'Large', value: 'lg'}, {label: 'X-Large', value: 'xl'}]} />
                <RadixSelect label="Variant" value={variant} onChange={(v: TextareaVariant) => setVariant(v)} options={[{label: 'Classic', value: 'classic'}, {label: 'Soft', value: 'soft'}, {label: 'Filled', value: 'filled'}, {label: 'Ghost', value: 'ghost'}]} />
                <RadixSelect label="Radius" value={radius || 'md'} onChange={(v: any) => setRadius(v)} options={[{label: 'None', value: 'none'}, {label: 'Small', value: 'sm'}, {label: 'Medium', value: 'md'}, {label: 'Large', value: 'lg'}, {label: 'Full', value: 'full'}]} />
                <RadixSelect label="Layout" value={layout as string} onChange={(v: any) => setLayout(v)} options={[{label: 'Default', value: 'default'}, {label: 'Split View', value: 'split'}]} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Toolbar Position</label>
                <div className="flex rounded-md border p-1 bg-muted gap-1">
                  {(['top', 'floating', 'bottom'] as ToolbarPosition[]).map((pos) => (
                    <button key={pos} onClick={() => setToolbarPosition(pos)} className={cn("flex-1 rounded-sm py-1 text-xs font-medium transition-colors capitalize", toolbarPosition === pos ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:bg-background/50")}>{pos}</button>
                  ))}
                </div>
              </div>
              <StyledSlider label="Gutter Width (px)" value={gutterWidth} onChange={setGutterWidth} max={100} />
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground border-b pb-2">Features</h3>
              <div className="grid grid-cols-1 gap-3">
                {Object.keys(features).map((key) => (
                  <StyledSwitch key={key} label={key.replace(/([A-Z])/g, ' $1').trim()} checked={(features as any)[key]} onCheckedChange={(c) => setFeatures(f => ({...f, [key]: c}))} />
                ))}
              </div>
              <StyledSlider label="History Limit" value={historyLimit} onChange={setHistoryLimit} />
              <StyledSlider label="Max Length" value={maxLength || 0} onChange={(v) => setMaxLength(v === 0 ? undefined : v)} max={500} suffix={maxLength === 0 ? ' (Unlimited)' : ''} />
            </div>
          </DemoCard>

          <DemoCard title="Stress Test Suite" icon={<Code className="text-orange-500 w-4 h-4"/>} className="border-orange-100 dark:border-orange-900/30">
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => runStressTest('small')} className="px-3 py-2 text-xs rounded border bg-background hover:bg-accent hover:text-accent-foreground transition-colors">Small Text</button>
              <button onClick={() => runStressTest('medium')} className="px-3 py-2 text-xs rounded border bg-background hover:bg-accent hover:text-accent-foreground transition-colors">Medium Text</button>
              <button onClick={() => runStressTest('large')} className="px-3 py-2 text-xs rounded border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40 transition-colors">Large Text</button>
              <button onClick={() => runStressTest('json_heavy')} className="px-3 py-2 text-xs rounded border bg-background hover:bg-accent hover:text-accent-foreground transition-colors">Deep JSON</button>
              <button onClick={() => runStressTest('rapid')} className="col-span-2 px-3 py-2 text-xs rounded border bg-background hover:bg-accent hover:text-accent-foreground transition-colors font-semibold">Rapid Updates (20x)</button>
            </div>
          </DemoCard>
        </div>

        <div className="w-full xl:w-2/3 space-y-6 flex flex-col">
          <div className="flex-1 flex flex-col min-h-[500px] border-2 border-dashed rounded-xl p-4 bg-card/50">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold flex items-center gap-2"><Ruler className="w-5 h-5"/> Live Demo</h2>
              <div className="text-xs font-mono bg-muted px-2 py-1 rounded">{value.length} chars / {value.split('\n').length} lines</div>
            </div>
            <div className="flex-1 h-full overflow-hidden bg-background border rounded-lg shadow-inner">
              <AdvancedTextarea {...textareaProps as any} className="h-full rounded-none border-none focus:ring-0" />
            </div>
          </div>

          <div className="h-72 border rounded-xl bg-card shadow-sm overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-3 border-b bg-muted/50">
              <h3 className="text-xs font-bold flex items-center gap-2 text-muted-foreground"><Terminal className="w-3 h-3"/> Event Logger</h3>
              <button onClick={() => setLogs([])} className="px-2 py-1 text-xs flex items-center gap-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"><Trash2 className="w-3 h-3"/> Clear</button>
            </div>
            <div className="flex-1 overflow-y-auto bg-gray-50/50 dark:bg-black/20">
              <table className="w-full text-left border-collapse text-xs font-mono">
                <thead className="bg-muted/30 sticky top-0 backdrop-blur-sm">
                <tr className="text-muted-foreground">
                  <th className="p-2 w-20 border-b">Time</th>
                  <th className="p-2 w-32 border-b">Event</th>
                  <th className="p-2 border-b">Detail</th>
                </tr>
                </thead>
                <tbody>
                {logs.map((log) => (
                  <tr key={log.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="p-2 text-gray-500">{log.time}</td>
                    <td className="p-2 font-semibold text-blue-600 dark:text-blue-400">{log.event}</td>
                    <td className="p-2 text-gray-700 dark:text-gray-300 break-all">{log.detail}</td>
                  </tr>
                ))}
                {logs.length === 0 && <tr><td colSpan={3} className="p-8 text-center text-muted-foreground italic">No events logged yet...</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedTextareaShowcase;
