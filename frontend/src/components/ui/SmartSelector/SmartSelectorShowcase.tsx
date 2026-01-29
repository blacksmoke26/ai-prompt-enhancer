/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useState} from 'react';
import SmartSelector, {SmartSelectorOption, SmartSelectorProps} from './index';
import {Monitor, Moon, Settings, Sun, Zap} from 'lucide-react';
import {useTheme} from '~/components/ThemeProvider';
import {cn} from '~/utils/helpers';


/**
 * Theme Provider Component
 * Manages the application theme and applies the 'dark' class to the DOM.
 */

// ==========================================
// 2. MOCK DATA GENERATORS
// ==========================================

const generateModels = (count: number): SmartSelectorOption[] => {
  const models: SmartSelectorOption[] = [];
  for (let i = 1; i <= count; i++) {
    models.push({
      value: `model-${i}`,
      label: `Model ${i}`,
      //description: `High-performance AI model version ${i}.0`,
      disabled: i % 15 === 0,
      //icon: null, // Icons are optional
    });
  }
  return models;
};

// ==========================================
// 3. DEMO COMPONENT
// ==========================================

export const SmartSelectorShowcase = () => {
  // 1. Access Theme
  const {theme, resolvedTheme, setTheme} = useTheme();

  // 2. State for component value
  const [selectedValue, setSelectedValue] = useState<string>('model-5');

  // 3. State for configuration (Props)
  const [config, setConfig] = useState<Partial<SmartSelectorProps<string>>>({
    size: 'sm',
    variant: 'compact',
    alignment: 'left',
    iconPosition: 'left',
    theme: 'blue',
    iconSize: 'md',
    iconGap: 'md',
    showSearch: true,
    showBorder: true,
    disabled: false,
  });

  // 4. State for "Stress Testing"
  const [dataSetSize, setDataSetSize] = useState(10);
  const [options] = useState<SmartSelectorOption[]>(generateModels(50));

  // Helper to update config
  const updateConfig = <K extends keyof SmartSelectorProps<string>>(key: K, value: SmartSelectorProps<string>[K]) => {
    setConfig(prev => ({...prev, [key]: value}));
  };

  return (
    <div className={cn(
      'min-h-screen font-sans p-8 transition-colors duration-300',
      'bg-gray-50 text-gray-900', // Light Mode Base
      'dark:bg-zinc-950 dark:text-zinc-200', // Dark Mode Base
    )}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* --- LEFT PANEL: CONTROLS --- */}
        <div className="lg:col-span-4 space-y-6">

          {/* Theme Toggler */}
          <div className={cn(
            'flex items-center justify-between p-4 rounded-xl border',
            'bg-white border-gray-200 shadow-sm', // Light
            'dark:bg-zinc-900 dark:border-zinc-800 dark:shadow-zinc-900/50', // Dark
          )}>
            <span className="text-sm font-semibold flex items-center gap-2">
              <Settings className="w-4 h-4"/>
              Appearance
            </span>
            <div className="flex bg-gray-100 dark:bg-zinc-800 p-1 rounded-lg">
              <button
                onClick={() => setTheme('light')}
                className={cn(
                  'p-2 rounded-md transition-all',
                  theme === 'light' ? 'bg-white shadow-sm text-orange-500' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200',
                )}
              >
                <Sun className="w-4 h-4"/>
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={cn(
                  'p-2 rounded-md transition-all',
                  theme === 'dark' ? 'bg-zinc-700 shadow-sm text-blue-400' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200',
                )}
              >
                <Moon className="w-4 h-4"/>
              </button>
              <button
                onClick={() => setTheme('system')}
                className={cn(
                  'p-2 rounded-md transition-all',
                  theme === 'system' ? 'bg-white dark:bg-zinc-600 shadow-sm text-purple-600 dark:text-purple-400' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200',
                )}
              >
                <Monitor className="w-4 h-4"/>
              </button>
            </div>
          </div>

          <div className={cn(
            'border p-6 rounded-xl shadow-xl',
            'bg-white border-gray-200', // Light
            'dark:bg-zinc-900 dark:border-zinc-800 dark:shadow-2xl', // Dark
          )}>
            <h2 className={cn('text-xl font-bold mb-1', 'text-gray-900 dark:text-white')}>Dev Console</h2>
            <p className={cn('text-xs mb-6', 'text-gray-500 dark:text-zinc-500')}>
              Configure props to debug features.
            </p>

            {/* Size Controls */}
            <div className="space-y-4">
              <div>
                <label
                  className={cn('text-xs font-bold uppercase tracking-wider mb-2 block', 'text-gray-400 dark:text-zinc-500')}>Size
                  & Variant</label>
                <div className="grid grid-cols-5 gap-1 mb-3">
                  {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(s => (
                    <button
                      key={s}
                      onClick={() => updateConfig('size', s)}
                      className={cn(
                        'py-2 text-xs rounded capitalize transition-colors border border-transparent',
                        config.size === s
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100 dark:bg-zinc-800 dark:text-gray-400 dark:hover:bg-zinc-700',
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-4 gap-1">
                  {(['tiny', 'compact', 'padded', 'huge'] as const).map(v => (
                    <button
                      key={v}
                      onClick={() => updateConfig('variant', v)}
                      className={cn(
                        'py-2 text-xs rounded capitalize transition-colors border border-transparent',
                        config.variant === v
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100 dark:bg-zinc-800 dark:text-gray-400 dark:hover:bg-zinc-700',
                      )}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Alignment & Icon Controls */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className={cn('text-xs font-bold uppercase tracking-wider mb-2 block', 'text-gray-400 dark:text-zinc-500')}>Alignment</label>
                  <div
                    className={cn('flex p-1 rounded border', 'bg-gray-50 border-gray-200 dark:bg-zinc-950 dark:border-zinc-800')}>
                    {(['left', 'center', 'right'] as const).map(a => (
                      <button
                        key={a}
                        onClick={() => updateConfig('alignment', a)}
                        className={cn(
                          'flex-1 py-1.5 text-xs rounded capitalize',
                          config.alignment === a
                            ? 'bg-white dark:bg-zinc-700 text-gray-900 dark:text-white shadow-sm'
                            : 'text-gray-500 hover:text-gray-700 dark:text-zinc-500 dark:hover:text-zinc-300',
                        )}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label
                    className={cn('text-xs font-bold uppercase tracking-wider mb-2 block', 'text-gray-400 dark:text-zinc-500')}>Icon
                    Pos</label>
                  <div
                    className={cn('flex p-1 rounded border', 'bg-gray-50 border-gray-200 dark:bg-zinc-950 dark:border-zinc-800')}>
                    {(['left', 'right'] as const).map(p => (
                      <button
                        key={p}
                        onClick={() => updateConfig('iconPosition', p)}
                        className={cn(
                          'flex-1 py-1.5 text-xs rounded capitalize',
                          config.iconPosition === p
                            ? 'bg-white dark:bg-zinc-700 text-gray-900 dark:text-white shadow-sm'
                            : 'text-gray-500 hover:text-gray-700 dark:text-zinc-500 dark:hover:text-zinc-300',
                        )}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Icon Specifics */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className={cn('text-xs font-bold uppercase tracking-wider mb-2 block', 'text-gray-400 dark:text-zinc-500')}>Icon
                    Size</label>
                  <div
                    className={cn('flex p-1 rounded border', 'bg-gray-50 border-gray-200 dark:bg-zinc-950 dark:border-zinc-800')}>
                    {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map(is => (
                      <button
                        key={is}
                        onClick={() => updateConfig('iconSize', is)}
                        className={cn(
                          'flex-1 py-1.5 text-xs rounded',
                          config.iconSize === is
                            ? 'bg-white dark:bg-zinc-700 text-gray-900 dark:text-white shadow-sm'
                            : 'text-gray-500 dark:text-zinc-500',
                        )}
                      >
                        {is}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label
                    className={cn('text-xs font-bold uppercase tracking-wider mb-2 block', 'text-gray-400 dark:text-zinc-500')}>Icon
                    Gap</label>
                  <div
                    className={cn('flex p-1 rounded border', 'bg-gray-50 border-gray-200 dark:bg-zinc-950 dark:border-zinc-800')}>
                    {(['none', 'xs', 'sm', 'md', 'lg', 'xl'] as const).map(ig => (
                      <button
                        key={ig}
                        onClick={() => updateConfig('iconGap', ig)}
                        className={cn(
                          'flex-1 py-1.5 text-xs rounded',
                          config.iconGap === ig
                            ? 'bg-white dark:bg-zinc-700 text-gray-900 dark:text-white shadow-sm'
                            : 'text-gray-500 dark:text-zinc-500',
                        )}
                      >
                        {ig}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Theme & Toggles */}
              <div>
                <label
                  className={cn('text-xs font-bold uppercase tracking-wider mb-2 block', 'text-gray-400 dark:text-zinc-500')}>Theme</label>
                <div
                  className={cn('flex p-1 rounded border mb-4', 'bg-gray-50 border-gray-200 dark:bg-zinc-950 dark:border-zinc-800')}>
                  {(['blue', 'emerald', 'purple', 'rose', 'orange'] as const).map(t => (
                    <button
                      key={t}
                      onClick={() => updateConfig('theme', t)}
                      className={cn(
                        'flex-1 py-1.5 text-xs rounded capitalize transition-colors',
                        config.theme === t
                          ? `text-white shadow-sm bg-${t}-500`
                          : 'text-gray-500 hover:text-gray-700 dark:text-zinc-500 dark:hover:text-zinc-300',
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-zinc-800">
                  {[
                    {key: 'showSearch', label: 'Show Search'},
                    {key: 'showBorder', label: 'Show Borders'},
                    {key: 'disabled', label: 'Disabled (Mute)'},
                  ].map(({key, label}) => (
                    <label key={key} className="flex items-center justify-between cursor-pointer">
                      <span className={cn('text-sm', 'text-gray-600 dark:text-gray-400')}>{label}</span>
                      <input
                        type="checkbox"
                        checked={!!config[key as keyof typeof config]}
                        onChange={() => updateConfig(key as any, !config[key as keyof typeof config])}
                        className="w-4 h-4 rounded bg-gray-100 border-gray-300 text-blue-600 focus:ring-0 dark:bg-zinc-800 dark:border-zinc-600"
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* --- DEBUG OUTPUT --- */}
          <div className={cn(
            'border p-6 rounded-xl shadow-xl font-mono text-xs',
            'bg-white border-gray-200', // Light
            'dark:bg-zinc-900 dark:border-zinc-800', // Dark
          )}>
            <h3 className={cn('mb-2 font-bold uppercase', 'text-gray-500 dark:text-zinc-500')}>Debug Output</h3>
            <div className="space-y-1">
              <p>Value: <span className="text-emerald-600 dark:text-emerald-400">{selectedValue}</span></p>
              <p>Theme Mode: <span className="text-blue-600 dark:text-blue-400">{resolvedTheme}</span></p>
              <p>Variant: <span className="text-blue-600 dark:text-blue-400">{config.variant}</span></p>
              <p>Size: <span className="text-blue-600 dark:text-blue-400">{config.size}</span></p>
              <p>Icon Gap: <span className="text-blue-600 dark:text-blue-400">{config.iconGap}</span></p>
            </div>
          </div>
        </div>

        {/* --- RIGHT PANEL: COMPONENT PREVIEW --- */}
        <div className="lg:col-span-8 flex flex-col h-full">
          <div className={cn(
            'border rounded-xl shadow-2xl overflow-hidden flex flex-col h-[700px]',
            'bg-white border-gray-200', // Light
            'dark:bg-zinc-900 dark:border-zinc-800', // Dark
          )}>
            <div className={cn(
              'p-6 border-b flex-none',
              'bg-gray-50 border-gray-200', // Light Header
              'dark:bg-zinc-900/50 dark:border-zinc-800', // Dark Header
            )}>
              <div className="flex items-center justify-between">
                <div>
                  <h1 className={cn('text-lg font-bold', 'text-gray-900 dark:text-white')}>SmartSelector Preview</h1>
                  <p className={cn('text-sm', 'text-gray-500 dark:text-zinc-500')}>
                    Live rendering with applied configurations.
                  </p>
                </div>
                <div className={cn(
                  'flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium',
                  'bg-blue-50 border-blue-100 text-blue-700', // Light Badge
                  'dark:bg-blue-500/10 dark:border-blue-500/20 dark:text-blue-400', // Dark Badge
                )}>
                  <Zap className="w-3 h-3"/>
                  {resolvedTheme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                </div>
              </div>
            </div>

            <div className={cn('flex-1 p-6 overflow-hidden', 'bg-gray-50 dark:bg-zinc-900/50')}>
              {/* THE COMPONENT UNDER TEST */}
              <div className="w-full max-w-2xl mx-auto h-full flex flex-col">
                <SmartSelector
                  options={options.slice(0, dataSetSize)}
                  value={selectedValue}
                  onChange={setSelectedValue}
                  {...config}
                  themeMode={resolvedTheme} // CRITICAL: Pass resolved theme
                  visibleItems={dataSetSize > 10 ? 10 : undefined}
                />
              </div>
            </div>

            {/* STRESS TEST FOOTER */}
            <div className={cn(
              'p-4 border-t flex items-center justify-between text-xs',
              'bg-gray-100 border-gray-200 text-gray-500', // Light Footer
              'dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-500', // Dark Footer
            )}>
              <div className="flex items-center gap-4">
                <span>Dataset Size:</span>
                <div className="flex bg-white dark:bg-zinc-800 rounded p-1 border border-gray-200 dark:border-zinc-700">
                  {[10, 20, 50].map(size => (
                    <button
                      key={size}
                      onClick={() => setDataSetSize(size)}
                      className={cn(
                        'px-3 py-1 rounded transition-colors',
                        dataSetSize === size
                          ? 'bg-blue-600 text-white'
                          : 'hover:bg-gray-100 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-300',
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <span>
                Rendered Items: {dataSetSize}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartSelectorShowcase;
