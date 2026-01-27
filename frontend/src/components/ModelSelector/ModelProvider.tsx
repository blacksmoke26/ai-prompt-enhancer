/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {ChangeEvent, useEffect, useMemo, useRef, useState} from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Select from '@radix-ui/react-select';
import {
  ArrowDown,
  ArrowUp,
  Check,
  ChevronDown,
  Copy,
  Layers,
  Search,
  Server,
  Sparkles,
  TrendingUp,
  X,
} from 'lucide-react';

// utils
import {formatContext, inferTags} from './utils/model-provider';

// types
import type {AIModel} from '~/types';

/**
 * Represents a grouped collection of AI models by their provider
 * @interface ModelGroup
 * @property {string} provider - The name of the AI provider (e.g., "OpenAI", "Anthropic")
 * @property {AIModel[]} models - Array of AI models belonging to this provider
 */
export interface ModelGroup {
  provider: string;
  models: AIModel[];
}

/**
 * Props for the ModelSelector component
 * @interface ModelSelectorps
 * @property {boolean} isOpen - Controls whether the dialog is visible
 * @property {function} onClose - Callback function when dialog is closed
 * @property {function} onSelect - Callback function when a model is selected
 * @property {AIModel[]} models - Array of available AI models to display
 */
export interface ModelSelectorps {
  isOpen: boolean;
  models: AIModel[];

  onClose?(open: boolean): void;

  onSelect?(model: AIModel): void;
}

/**
 * Sort options for organizing the model list
 * @type SortOption
 */
export type SortOption = 'name-asc' | 'tokens-desc' | 'size-desc' | 'name-desc';

/**
 * Main component for selecting AI models with enhanced UI and functionality
 * @component
 * @example
 * <ModelSelector
 *   isOpen={dialogOpen}
 *   onClose={(open) => setDialogOpen(open)}
 *   onSelect={(model) => handleModelSelect(model)}
 *   models={availableModels}
 * />
 */
const ModelSelector: React.FC<ModelSelectorps> = (props) => {
  const {
    isOpen, onClose = () => {
    }, onSelect = () => {
    }, models = [],
  } = props;

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('tokens-desc');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => searchInputRef.current?.focus?.(), 100);
    // eslint-disable-next-line
  }, [searchInputRef.current]);

  /**
   * Handles copying model ID to clipboard with visual feedback
   * @param {React.MouseEvent} e - The click event
   * @param {string} id - The model ID to copy
   */
  const handleCopy = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  /**
   * Groups and filters models based on search query and sort option
   * @returns {ModelGroup[]} Array of grouped models
   */
  const groupedModels = useMemo<ModelGroup[]>(() => {
    if (models.length === 0) return [];

    let result = models.filter((model) => {
      const s = searchQuery.toLowerCase();
      return model.name.toLowerCase().includes(s) ||
        model.provider.toLowerCase().includes(s) ||
        model.description.toLowerCase().includes(s);
    });

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'tokens-desc') return b.contextLength - a.contextLength;

      // Parse size for sorting
      const getNum = (str: string) => parseFloat(str.replace(/[^0-9.]/g, '')) || 0;
      return getNum(b.size) - getNum(a.size);
    });

    const groups: Record<string, AIModel[]> = {};
    result.forEach(m => {
      if (!groups[m.provider]) groups[m.provider] = [];
      groups[m.provider].push(m);
    });

    return Object.entries(groups).map(([k, v]) => ({provider: k, models: v}));
  }, [searchQuery, sortBy, models]);

  /**
   * Gets gradient class for provider-specific styling
   * @param {string} p - Provider name
   * @returns {string} Gradient class
   */
  const getProviderGradient = (p: string) => {
    const provider = p.toLowerCase();
    if (provider.includes('openai')) return 'from-emerald-400 to-teal-600';
    if (provider.includes('anthropic')) return 'from-orange-400 to-rose-600';
    if (provider.includes('google') || provider.includes('gemini')) return 'from-blue-400 to-indigo-600';
    if (provider.includes('meta') || provider.includes('llama')) return 'from-purple-400 to-pink-600';
    return 'from-gray-400 to-gray-600';
  };

  /**
   * Gets border color class for provider-specific styling
   * @param p - Provider name
   * @returns Border class
   */
  const getProviderBorder = (p: string) => {
    const provider = p.toLowerCase();
    if (provider.includes('openai')) return 'border-emerald-200 dark:border-emerald-900';
    if (provider.includes('anthropic')) return 'border-orange-200 dark:border-orange-900';
    if (provider.includes('google')) return 'border-blue-200 dark:border-blue-900';
    return 'border-gray-200 dark:border-gray-700';
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 animate-in fade-in"/>

        <Dialog.Content
          className="fixed left-[50%] top-[50%] z-50 w-full max-w-3xl translate-x-[-50%] translate-y-[-50%] duration-300 ease-out animate-in zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-[48%]">
          {/* Gradient Border Container */}
          <div
            className="relative rounded-2xl border border-gray-200 bg-white shadow-2xl overflow-hidden dark:border-gray-700 dark:bg-gray-900">
            {/* Top Gradient Accent */}
            <div
              className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 z-20"/>

            {/* Glass Header */}
            <div
              className="relative z-10 flex flex-col gap-5 border-b border-gray-100 bg-white/80 p-6 backdrop-blur-xl dark:border-gray-800 dark:bg-gray-900/80">
              <div className="flex items-center justify-between">
                <div>
                  <Dialog.Title className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-1.5 rounded-lg">
                      <Sparkles className="h-4 w-4"/>
                    </div>
                    Model Hub
                  </Dialog.Title>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-9">
                    Select an AI model for your workflow
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Dialog.Close
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors">
                    <X className="h-5 w-5"/>
                  </Dialog.Close>
                </div>
              </div>

              <div className="grid gap-3">
                {/* Search Bar */}
                <div className="relative group">
                  <Search
                    className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors"/>
                  <input ref={searchInputRef}
                         type="text"
                         placeholder="Search by model name, provider (e.g. OpenAI), or capability..."
                         value={searchQuery}
                         onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                         className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 pl-10 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all dark:border-gray-700 dark:bg-gray-800/50 dark:text-white dark:focus:bg-gray-900 dark:focus:ring-indigo-500/20"
                  />
                </div>

                {/* Filter Toolbar */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                    <span>{groupedModels.reduce((acc, g) => acc + g.models.length, 0)} Models</span>
                    <span>•</span>
                    <span>{groupedModels.length} Providers</span>
                  </div>
                  <Select.Root value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                    <Select.Trigger
                      className="flex items-center gap-2 text-xs rounded-lg border border-gray-200 bg-white px-3 py-2 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                      aria-label="Sort models"
                    >
                      <Select.Value/>
                      <Select.Icon>
                        <ChevronDown className="h-3 w-3 text-gray-500"/>
                      </Select.Icon>
                    </Select.Trigger>
                    <Select.Portal>
                      <Select.Content
                        className="z-50 min-w-[150px] rounded-lg border border-gray-200 bg-white p-1 shadow-xl dark:border-gray-700 dark:bg-gray-800">
                        <Select.Viewport>
                          <Select.Item value="tokens-desc"
                                       className="relative flex cursor-pointer select-none items-center rounded px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-indigo-50 data-[highlighted]:text-indigo-900 dark:data-[highlighted]:bg-indigo-900/20 dark:data-[highlighted]:text-indigo-300">
                            <Select.ItemText className="flex items-center justify-between gap-2">
                              <TrendingUp className="h-4 w-4 display-inline mr-1 relative"/>
                              Top Rated (Context)
                            </Select.ItemText>
                            <Select.ItemIndicator className="absolute right-2 flex items-center">
                              <Check className="h-3 w-3 text-indigo-600 dark:text-indigo-400"/>
                            </Select.ItemIndicator>
                          </Select.Item>
                          <Select.Item value="size-desc"
                                       className="relative flex cursor-pointer select-none items-center rounded px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-indigo-50 data-[highlighted]:text-indigo-900 dark:data-[highlighted]:bg-indigo-900/20 dark:data-[highlighted]:text-indigo-300">
                            <Select.ItemText className="flex items-center gap-2">
                              <Layers className="h-3 w-3 display-inline mr-1 relative"/>
                              Largest Models
                            </Select.ItemText>
                            <Select.ItemIndicator className="absolute right-2 flex items-center">
                              <Check className="h-3 w-3 text-indigo-600 dark:text-indigo-400"/>
                            </Select.ItemIndicator>
                          </Select.Item>
                          <Select.Item value="name-asc"
                                       className="relative flex cursor-pointer select-none items-center rounded px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-indigo-50 data-[highlighted]:text-indigo-900 dark:data-[highlighted]:bg-indigo-900/20 dark:data-[highlighted]:text-indigo-300">
                            <Select.ItemText className="flex items-center gap-2">
                              <ArrowUp className="h-3 w-3 display-inline mr-1 relative"/>
                              Name (A-Z)
                            </Select.ItemText>
                            <Select.ItemIndicator className="absolute right-2 flex items-center">
                              <Check className="h-3 w-3 text-indigo-600 dark:text-indigo-400"/>
                            </Select.ItemIndicator>
                          </Select.Item>
                          <Select.Item value="name-desc"
                                       className="relative flex cursor-pointer select-none items-center rounded px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-indigo-50 data-[highlighted]:text-indigo-900 dark:data-[highlighted]:bg-indigo-900/20 dark:data-[highlighted]:text-indigo-300">
                            <Select.ItemText className="flex items-center gap-2">
                              <ArrowDown className="h-3 w-3 display-inline mr-1 relative"/>
                              Name (Z-A)
                            </Select.ItemText>
                            <Select.ItemIndicator className="absolute right-2 flex items-center">
                              <Check className="h-3 w-3 text-indigo-600 dark:text-indigo-400"/>
                            </Select.ItemIndicator>
                          </Select.Item>
                        </Select.Viewport>
                      </Select.Content>
                    </Select.Portal>
                  </Select.Root>
                  {/*<SelectAdvanced
                    clearable={false}
                    value={sortBy}
                    options={[
                      {label: 'Top Rated (Context)', value: 'tokens-desc'},
                      {label: 'Largest Models', value: 'size-desc'},
                      {label: 'Alphabetical', value: 'name-asc'},
                    ]}
                    onChange={value => setSortBy(value as SortOption)}
                  />*/}
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="custom-scrollbar h-[500px] overflow-y-auto bg-white dark:bg-gray-950 p-2">
              {groupedModels.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-full mb-4 animate-pulse">
                    <Server className="h-8 w-8 text-gray-400"/>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">No models found</h3>
                </div>
              ) : (
                <div className="space-y-8 pb-6 px-4 pt-2">
                  {groupedModels.map((group) => (
                    <div key={group.provider}>
                      {/* Provider Header with Accent */}
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className={`h-1 flex-1 bg-gradient-to-r ${getProviderGradient(group.provider)} rounded-full opacity-20`}></div>
                        <div
                          className={`flex items-center gap-2 px-3 py-1 rounded-full border ${getProviderBorder(group.provider)} bg-white dark:bg-gray-900/50`}>
                          <div
                            className={`h-2 w-2 rounded-full bg-gradient-to-r ${getProviderGradient(group.provider)}`}></div>
                          <span className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                             {group.provider}
                           </span>
                        </div>
                        <div
                          className="h-1 flex-1 bg-gradient-to-l from-gray-200 to-transparent dark:from-gray-800 rounded-full opacity-20"></div>
                      </div>

                      <div className="grid gap-3">
                        {group.models.map((model) => {
                          const tags = inferTags(model);
                          const isMaxContext = model.contextLength >= 128000;

                          return (
                            <div
                              key={model.id}
                              onClick={() => onSelect(model)}
                              className="group relative flex flex-col gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:border-indigo-200 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-indigo-900/50 cursor-pointer"
                            >
                              <div className="flex justify-between items-start gap-4">
                                <div className="flex gap-4 min-w-0 flex-1">
                                  {/* Icon Avatar */}
                                  <div
                                    className={`h-12 w-12 rounded-xl bg-gradient-to-br ${getProviderGradient(model.provider)} flex items-center justify-center shadow-md text-white`}>
                                    <Sparkles className="h-6 w-6"/>
                                  </div>

                                  {/* Text Content */}
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h3
                                        className="font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                                        {model.name}
                                      </h3>
                                      <span
                                        className="text-[10px] font-mono text-gray-400 border border-gray-200 dark:border-gray-700 px-1.5 py-0.5 rounded bg-gray-50 dark:bg-gray-800">
                                        {model.size}
                                      </span>
                                    </div>

                                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 mb-2">
                                      {model.description}
                                    </p>

                                    {/* Smart Tags */}
                                    <div className="flex flex-wrap gap-1.5">
                                      {tags.map((t, idx) => {
                                        const Icon = t.icon;
                                        return (
                                          <span key={idx}
                                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${t.color}`}>
                                            <Icon className="h-3 w-3"/> {t.text}
                                          </span>
                                        );
                                      })}
                                    </div>
                                  </div>
                                </div>

                                {/* Action Area */}
                                <div className="flex flex-col items-end gap-2 shrink-0">
                                  <button
                                    onClick={(e) => handleCopy(e, model.id)}
                                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors opacity-0 group-hover:opacity-100"
                                    title="Copy ID"
                                  >
                                    {copiedId === model.id ? <Check className="h-4 w-4"/> : <Copy className="h-4 w-4"/>}
                                  </button>
                                </div>
                              </div>

                              {/* Spec Bar (Visual Context Length) */}
                              <div className="mt-1">
                                <div className="flex justify-between text-[10px] text-gray-400 font-medium mb-1">
                                  <span>Context Window</span>
                                  <span
                                    className="text-gray-600 dark:text-gray-300">{formatContext(model.contextLength)} tokens</span>
                                </div>
                                <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full bg-gradient-to-r ${getProviderGradient(model.provider)} transition-all duration-1000 ease-out`}
                                    style={{width: isMaxContext ? '100%' : '60%'}}
                                  ></div>
                                </div>
                              </div>

                              {/* Selection Indicator Overlay */}
                              <div
                                className="absolute inset-0 rounded-xl ring-2 ring-indigo-500 ring-opacity-0 group-hover:ring-opacity-100 transition-all pointer-events-none dark:ring-indigo-400"></div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ModelSelector;
