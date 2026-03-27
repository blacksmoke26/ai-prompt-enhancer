/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 * @version 2.7.2
 */

import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Circle,
  Copy,
  Eye,
  FileText,
  Grid3x3,
  Heart,
  HelpCircle,
  History,
  Keyboard,
  Layers,
  LayoutList,
  List,
  LucideIcon,
  Merge,
  RotateCcw,
  Search,
  SearchX,
  X,
  Pin,
  BarChart2,
  Wand2,
  Code,
} from 'lucide-react';

// utils
import {cn} from '~/utils/helpers';
import {defaultCategoryMap} from './utils';

// relative components
import TemplateCard from './TemplateCard';

// types
import type {PromptTemplate} from './index';
import {SelectAdvanced} from '~/components/ui/SelectAdvanced.tsx';

/**
 * Props for TemplateSelector V2 component.
 */
export interface TemplateSelectorProps {
  /** List of all available templates. */
  templates: PromptTemplate[];

  /** Callback to close the selector. */
  onClose?(): void;

  /** Callback when a template is chosen (Single mode) or templates are chosen (Multi mode). */
  onSelectTemplate?(t: PromptTemplate | PromptTemplate[]): void;

  /** Callback when a category is clicked. */
  onCategoryClick?(cat: string): void;

  /** Callback when active category changes. */
  onCategoryChange?(cat: string): void;

  /** Callback when a tag is clicked. */
  onTagClick?(tag: string): void;

  /** Callback when searching for templates (Debounced). */
  onSearch?(value: string): void;

  /** Debounce time in milliseconds for search input. */
  debounceMs?: number;

  /** Callback when pagination changes. */
  onPaginate?(page: number): void;

  /** List of template IDs marked as favorites. */
  favorites?: number[];

  /** List of template IDs marked as pinned. */
  pinnedIds?: number[];

  /** Explicit list of categories to display. */
  categories?: Array<{ id: string; name: string; icon: LucideIcon }>;

  /** Configuration specific to the selector's behavior. */
  selectorProps?: {
    /** Determines the number of template items displayed per page. */
    itemsPerPage?: number;
    /** Custom title displayed in the sidebar header area. */
    sidebarTitle?: string;
    /** Additional CSS class names applied to the sidebar container. */
    sidebarClassName?: string;
    /** Text displayed on the primary confirmation button. */
    chooseButtonText?: string;
    /** Custom renderer function for template tags. */
    renderTag?(tag: string, onClick: (tag: string) => void): React.ReactNode;
    /** Allow user to toggle Multi-Select mode. */
    allowMultiSelect?: boolean;
    /** Enable the "Recent" category feature (Local Storage). */
    enableRecents?: boolean;
    /** Enable the "Favorites" category feature. */
    enableFavorites?: boolean;
    /** Enable the "Pinned" category feature. */
    enablePinned?: boolean;
    /** Enable the "Analytics" feature. */
    enableAnalytics?: boolean;

    /** --- Filter Visibility Controls --- */
    /** Show or hide the Sidebar (Categories, Recents, etc). */
    showSidebar?: boolean;
    /** Show or hide the Search Bar. */
    showSearch?: boolean;
    /** Show or hide the Sort Dropdown. */
    showSort?: boolean;
    /** Show or hide the Grid/List View Toggle. */
    showViewToggle?: boolean;
  };

  /** Mapping of category names to icons (Legacy support). */
  categoryIcons?: Record<string, { name: string; icon: LucideIcon }>;

  /** Callback to toggle a template's favorite status. */
  onToggleFavorite?(id: number): void;

  /** Callback to toggle a template's pinned status. */
  onTogglePin?(id: number): void;

  /** Loading state to display skeleton UI. */
  loading?: boolean;

  /** Override global loading state for the sidebar specifically. */
  loadingCategories?: boolean;

  /** Callback when combining selected templates content. */
  onCombineContent?(content: string): void;
}

// --- Internal Utility Components ---

const VariableHighlighter: React.FC<{ text: string }> = ({text}) => {
  const parts = text.split(/(\{\{[^}]+}}|\{[^}]+})/g);
  return (
    <>
      {parts.map((part, index) => {
        if (part.match(/^\{\{.+}}$/) || part.match(/^\{.+}$/)) {
          return (
            <span key={index}
                  className="bg-primary/20 text-primary font-mono text-xs px-1 rounded mx-0.5 py-0.5 border border-primary/20">
              {part}
            </span>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
};

export interface BuilderModalProps {
  template: PromptTemplate;

  onClose(): void;

  onBuild(content: string): void;
}

const BuilderModal: React.FC<BuilderModalProps> = (props) => {
  const {template, onClose, onBuild} = props;

  const [values, setValues] = useState<Record<string, string>>({});
  const variables = useMemo(() => {
    const regex = /\{\{([^}]+)}}/g;
    const matches: string[] = [];
    let match;
    while ((match = regex.exec(template.content)) !== null) {
      if (!matches.includes(match[1])) matches.push(match[1]);
    }
    return matches;
  }, [template.content]);

  const handleBuild = () => {
    let finalContent = template.content;
    variables.forEach(v => {
      const val = values[v] || `[${v}]`;
      finalContent = finalContent.replace(new RegExp(`\\{\\{${v}\\}\\}`, 'g'), val)
        .replace(/\n+/, `\n`);
    });
    onBuild(finalContent);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose}></div>
      <div
        className="bg-card border border-border shadow-2xl rounded-xl w-full max-w-lg relative z-10 animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
        <div className="p-5 border-b border-border flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg text-primary"><Wand2 size={20}/></div>
            <h3 className="text-lg font-bold">Build Prompt</h3>
          </div>
          <button onClick={onClose}><X size={20}/></button>
        </div>
        <div className="p-6 overflow-y-auto">
          {variables.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No variables detected in this template.</div>
          ) : (
            <div className="space-y-4">
              {variables.map(v => (
                <div key={v}>
                  <label className="block text-sm font-medium mb-1.5">{v}</label>
                  <input
                    type="text"
                    className="w-full h-10 px-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary outline-none"
                    placeholder={`Enter value for ${v}...`}
                    value={values[v] || ''}
                    onChange={e => setValues(prev => ({...prev, [v]: e.target.value}))}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="p-4 border-t border-border flex justify-end">
          <button onClick={handleBuild} disabled={variables.length === 0}
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50">Generate
            & Copy
          </button>
        </div>
      </div>
    </div>
  );
};

const ComparisonView: React.FC<{ t1: PromptTemplate; t2: PromptTemplate }> = ({t1, t2}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full overflow-hidden">
      {[t1, t2].map(t => (
        <div key={t.id} className="flex flex-col h-full bg-card border border-border rounded-xl overflow-hidden">
          <div className="p-4 border-b border-border bg-muted/20 flex items-center justify-between">
            <h4 className="font-bold text-sm truncate">{t.title}</h4>
            <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded">{t.category}</span>
          </div>
          <div
            className="flex-1 p-4 overflow-y-auto font-mono text-xs bg-background whitespace-pre-wrap leading-relaxed">
            <VariableHighlighter text={t.content}/>
          </div>
        </div>
      ))}
    </div>
  );
};

interface PreviewModalProps {
  template: PromptTemplate;
  categoryIcons?: Record<string, { name: string; icon: LucideIcon }>;

  onClose(): void;

  onCopy(): void;
}

const PreviewModal: React.FC<PreviewModalProps> = (props) => {
  const {template, onClose, onCopy, categoryIcons} = props;

  const Icon = categoryIcons?.[template.category]?.icon || FileText;
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/90 backdrop-blur-sm" onClick={onClose}></div>
      <div
        className="bg-card border border-border shadow-2xl rounded-xl w-full max-w-2xl max-h-[85vh] flex flex-col relative z-10 animate-in fade-in zoom-in duration-200">
        <div className="p-5 border-b border-border flex items-start justify-between bg-muted/10 rounded-t-xl">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg text-primary shrink-0"><Icon size={24}/></div>
            <div>
              <h3 className="text-lg font-bold text-foreground leading-tight mb-1">{template.title}</h3>
              <div className="flex flex-wrap gap-2">
                {template.tags?.map(tag => (
                  <span key={tag}
                        className="text-[10px] uppercase font-bold tracking-wider bg-secondary text-secondary-foreground px-2 py-0.5 rounded">{tag}</span>
                ))}
              </div>
            </div>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors"><X
            size={20}/></button>
        </div>
        <div className="p-6 overflow-y-auto custom-scroll bg-background">
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <div
              className="font-mono text-sm bg-muted/30 p-4 rounded-lg border border-border/50 whitespace-pre-wrap leading-relaxed">
              <VariableHighlighter text={template.content}/>
            </div>
            {template.description && (
              <div className="mt-4 pt-4 border-t border-border/50">
                <p className="text-sm text-muted-foreground italic">"{template.description}"</p>
              </div>
            )}
          </div>
        </div>
        <div className="p-4 border-t border-border bg-muted/20 rounded-b-xl flex justify-end gap-3">
          <button onClick={onClose}
                  className="px-4 py-2 text-sm font-medium hover:bg-accent rounded-lg transition-colors">Close
          </button>
          <button onClick={() => {
            onCopy();
            onClose();
          }}
                  className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 flex items-center gap-2 shadow-sm">
            <Copy size={16}/> Copy Prompt
          </button>
        </div>
      </div>
    </div>
  );
};

const CategorySkeleton: React.FC = () => (
  <div className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg">
    <div className="flex items-center gap-3">
      <div className="w-4 h-4 rounded bg-muted animate-pulse shrink-0"/>
      <div className="w-24 h-4 rounded bg-muted animate-pulse"/>
    </div>
  </div>
);

const TemplateSkeleton: React.FC<{ viewMode: 'grid' | 'list' }> = ({viewMode}) => (
  <div
    className={cn('bg-card rounded-xl border border-border p-4 h-full flex flex-col gap-3 relative overflow-hidden', viewMode === 'list' ? 'flex-row items-center gap-4' : '')}>
    <div
      className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer direction-right"/>
    <div className={cn('bg-muted rounded-md animate-pulse shrink-0', viewMode === 'grid' ? 'w-10 h-10' : 'w-12 h-12')}/>
    <div className="flex-1 w-full space-y-2">
      <div className="h-5 w-3/4 bg-muted rounded animate-pulse"/>
      <div className="space-y-1.5">
        <div className="h-3.5 w-full bg-muted/50 rounded animate-pulse"/>
        <div className="h-3.5 w-5/6 bg-muted/50 rounded animate-pulse"/>
      </div>
    </div>
  </div>
);

// --- Main Component ---

const TemplateSelector: React.FC<TemplateSelectorProps> = (props) => {
  const {
    templates,
    onClose = () => {
    },
    onSelectTemplate = () => {
    },
    onTagClick,
    onSearch,
    onPaginate,
    onToggleFavorite,
    onTogglePin,
    favorites = [],
    pinnedIds = [],
    selectorProps = {},
    categoryIcons,
    onCategoryClick,
    onCategoryChange,
    categories: propCategories,
    loading = false,
    loadingCategories,
    onCombineContent,
    debounceMs = 300,
  } = props;

  // --- Config ---
  const ITEMS_PER_PAGE = selectorProps.itemsPerPage || 12;
  const ENABLE_RECENTS = selectorProps.enableRecents !== false;
  const ENABLE_FAVORITES = selectorProps.enableFavorites !== false;
  const ENABLE_PINNED = selectorProps.enablePinned !== false;
  const ENABLE_ANALYTICS = selectorProps.enableAnalytics !== false;

  // Visibility Configs
  const SHOW_SIDEBAR = selectorProps.showSidebar !== false;
  const SHOW_SEARCH = selectorProps.showSearch !== false;
  const SHOW_SORT = selectorProps.showSort !== false;
  const SHOW_VIEW_TOGGLE = selectorProps.showViewToggle !== false;

  // --- State ---
  const [searchQuery, setSearchQuery] = useState('');
  const [categorySearchQuery, setCategorySearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('recent');
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [isMultiSelectMode, setIsMultiSelectMode] = useState(false);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'default' | 'asc' | 'desc'>('default');
  const [previewItem, setPreviewItem] = useState<PromptTemplate | null>(null);
  const [builderItem, setBuilderItem] = useState<PromptTemplate | null>(null);
  const [recentIds, setRecentIds] = useState<number[]>([]);
  const [analyticsData, setAnalyticsData] = useState<Record<number, { count: number, lastUsed: number }>>({});

  // Sidebar specific loading state (defaults to global loading)
  const isSidebarLoading = loadingCategories ?? loading;

  // Refs
  const listContainerRef = useRef<HTMLDivElement>(null);

  // --- Effects: Analytics ---
  useEffect(() => {
    if (!ENABLE_ANALYTICS) return;
    try {
      const saved = localStorage.getItem('template-analytics');
      if (saved) setAnalyticsData(JSON.parse(saved));
    } catch (e) {
      // do nothing
    }
  }, [ENABLE_ANALYTICS]);

  const updateAnalytics = useCallback((id: number) => {
    if (!ENABLE_ANALYTICS) return;
    setAnalyticsData(prev => {
      const updated = {...prev, [id]: {count: (prev[id]?.count || 0) + 1, lastUsed: Date.now()}};
      try {
        localStorage.setItem('template-analytics', JSON.stringify(updated));
      } catch (e) {
        // do nothing
      }
      return updated;
    });
  }, [ENABLE_ANALYTICS]);

  // --- Effects: Search Debounce ---
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onSearch) onSearch(searchQuery);
    }, debounceMs);
    return () => clearTimeout(timer);
  }, [searchQuery, debounceMs, onSearch]);

  // --- Effects: Recents Logic ---
  useEffect(() => {
    if (!ENABLE_RECENTS) return;
    try {
      const saved = localStorage.getItem('template-selector-recents');
      if (saved) setRecentIds(JSON.parse(saved));
    } catch (e) {
      // do nothing
    }
  }, [ENABLE_RECENTS]);

  const addToRecents = useCallback((id: number) => {
    if (!ENABLE_RECENTS) return;
    setRecentIds(prev => {
      const newRecents = [id, ...prev.filter(i => i !== id)].slice(0, 10);
      try {
        localStorage.setItem('template-selector-recents', JSON.stringify(newRecents));
      } catch (e) {
        // do nothing
      }
      return newRecents;
    });
  }, [ENABLE_RECENTS]);

  // Merge categories
  const activeCategoryMap = useMemo(() => {
    const map: Record<string, { name: string; icon: LucideIcon }> = {
      recent: {name: 'Recent', icon: History},
      favorites: {name: 'Favorites', icon: Heart},
      pinned: {name: 'Pinned', icon: Pin},
      ...defaultCategoryMap,
      ...categoryIcons,
    };
    if (propCategories && propCategories.length > 0) {
      propCategories.forEach(cat => {
        map[cat.id] = {name: cat.name, icon: cat.icon};
      });
    }
    return map;
  }, [propCategories, categoryIcons]);

  // Generate category keys
  const categoryKeys = useMemo(() => {
    let keys: string[];
    if (propCategories && propCategories.length > 0) {
      keys = propCategories.map(c => c.id);
    } else {
      keys = Object.keys(activeCategoryMap).filter(k => k !== 'recent' && k !== 'favorites' && k !== 'pinned');
    }
    const finalKeys: string[] = [];
    if (ENABLE_PINNED) finalKeys.push('pinned');
    if (ENABLE_RECENTS) finalKeys.push('recent');
    if (ENABLE_FAVORITES) finalKeys.push('favorites');
    return [...finalKeys, ...keys];
  }, [propCategories, activeCategoryMap, ENABLE_RECENTS, ENABLE_FAVORITES, ENABLE_PINNED]);

  // --- Combined: Search + System Category Filtering ---
  const searchFilteredTemplates = useMemo(() => {
    let baseList = templates;

    // 1. Handle System Categories (Favorites, Pinned, Recent)
    if (SHOW_SIDEBAR) {
      if (selectedCategory === 'favorites' && ENABLE_FAVORITES) {
        baseList = templates.filter(t => favorites.includes(t.id));
      } else if (selectedCategory === 'pinned' && ENABLE_PINNED) {
        baseList = templates.filter(t => pinnedIds.includes(t.id));
      } else if (selectedCategory === 'recent' && ENABLE_RECENTS) {
        baseList = templates.filter(t => recentIds.includes(t.id));
      }
      // Note: Standard category filtering (e.g., "Coding") is intentionally removed.
    }

    // 2. Handle Text Search
    if (!searchQuery.trim()) return baseList;
    const query = searchQuery.toLowerCase();
    return baseList.filter(t => {
      return (
        t.title.toLowerCase().includes(query) ||
        (t.description && t.description.toLowerCase().includes(query)) ||
        (t.tags && t.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    });
  }, [templates, selectedCategory, favorites, pinnedIds, recentIds, ENABLE_FAVORITES, ENABLE_PINNED, ENABLE_RECENTS, SHOW_SIDEBAR, searchQuery]);

  // Sort Templates
  const sortedTemplates = useMemo(() => {
    if (sortBy === 'default') return searchFilteredTemplates;
    const sorted = [...searchFilteredTemplates];
    if (sortBy === 'asc') return sorted.sort((a, b) => a.title.localeCompare(b.title));
    if (sortBy === 'desc') return sorted.sort((a, b) => b.title.localeCompare(a.title));
    return searchFilteredTemplates;
  }, [searchFilteredTemplates, sortBy]);

  // --- Logic: Pagination ---
  const displayItems = loading ? Array.from({length: ITEMS_PER_PAGE}) : sortedTemplates;
  const totalPages = loading ? 1 : Math.ceil(sortedTemplates.length / ITEMS_PER_PAGE) || 1;
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTemplates = (loading ? displayItems : sortedTemplates.slice(start, start + ITEMS_PER_PAGE)) as PromptTemplate[];

  // Feature: Related Templates
  const relatedTemplates = useMemo(() => {
    if (selectedIds.size !== 1) return [];
    const currentId = Array.from(selectedIds)[0];
    const currentTemplate = templates.find(t => t.id === currentId);
    if (!currentTemplate || !currentTemplate.tags) return [];
    return templates
      .filter(t => t.id !== currentId && t.tags?.some(tag => currentTemplate.tags?.includes(tag)))
      .sort((a, b) => {
        const aMatches = a.tags?.filter(tag => currentTemplate.tags?.includes(tag)).length || 0;
        const bMatches = b.tags?.filter(tag => currentTemplate.tags?.includes(tag)).length || 0;
        return bMatches - aMatches;
      })
      .slice(0, 4);
  }, [templates, selectedIds]);

  // --- Effects ---
  useEffect(() => {
    setCurrentPage(1);
  }, [sortedTemplates.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (loading) return;
      if (previewItem || builderItem) {
        if (e.key === 'Escape') {
          setPreviewItem(null);
          setBuilderItem(null);
        }
        return;
      }
      if (e.key === 'Escape') {
        if (showAnalytics) {
          setShowAnalytics(false);
          return;
        }
        if (showShortcuts) {
          setShowShortcuts(false);
          return;
        }
        onClose();
        return;
      }
      if (e.key === '?' && !e.shiftKey) {
        e.preventDefault();
        setShowShortcuts(prev => !prev);
        return;
      }
      if (!isMultiSelectMode) {
        const selectedId = selectedIds.size === 1 ? Array.from(selectedIds)[0] : null;
        if (!selectedId) return;
        const currentIndex = paginatedTemplates.findIndex((t: any) => t.id === selectedId);
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          const nextIndex = Math.min(currentIndex + 1, paginatedTemplates.length - 1);
          if (paginatedTemplates[nextIndex]?.id) setSelectedIds(new Set([paginatedTemplates[nextIndex].id]));
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          const prevIndex = Math.max(currentIndex - 1, 0);
          if (paginatedTemplates[prevIndex]?.id) setSelectedIds(new Set([paginatedTemplates[prevIndex].id]));
        } else if (e.key === 'Enter') {
          e.preventDefault();
          handleConfirm();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginatedTemplates, selectedIds, isMultiSelectMode, showShortcuts, onClose, loading, previewItem, builderItem, showAnalytics]);

  // --- Handlers ---
  const handleCategoryClick = (cat: string) => {
    if (isSidebarLoading) return;
    setSelectedCategory(cat);
    setActiveTag(null);
    setCurrentPage(1);
    if (onCategoryClick) onCategoryClick(cat);
    if (onCategoryChange) onCategoryChange(cat);
  };

  const handleTagClick = (tag: string) => {
    if (isSidebarLoading) return;
    setActiveTag(prev => prev === tag ? null : tag);
    if (onTagClick) onTagClick(tag);
  };

  const handleCopy = useCallback(async (text: string, _title: string) => {
    if (loading) return;
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      // do nothing
    }
  }, [loading]);

  const handleSelect = (id: number) => {
    if (loading) return;
    if (isMultiSelectMode) {
      const newSet = new Set(selectedIds);
      if (newSet.has(id)) newSet.delete(id); else newSet.add(id);
      setSelectedIds(newSet);
    } else {
      setSelectedIds(new Set([id]));
    }
  };

  const toggleMultiSelect = () => {
    if (loading) return;
    setIsMultiSelectMode(!isMultiSelectMode);
    setSelectedIds(new Set());
  };

  const resetFilters = () => {
    if (loading) return;
    setSearchQuery('');
    setSelectedCategory(ENABLE_RECENTS ? 'recent' : (ENABLE_PINNED ? 'pinned' : (ENABLE_FAVORITES ? 'favorites' : 'all')));
    setActiveTag(null);
    setCurrentPage(1);
    setSortBy('default');
    if (onSearch) onSearch('');
  };

  const handlePageChange = (page: number) => {
    if (loading) return;
    setCurrentPage(page);
    if (onPaginate) onPaginate(page);
  };

  const handleConfirm = () => {
    if (loading || selectedIds.size === 0) return;
    const firstId = Array.from(selectedIds)[0];
    addToRecents(firstId);
    updateAnalytics(firstId);
    const selectedTemplates = sortedTemplates.filter(t => selectedIds.has(t.id));
    if (isMultiSelectMode) {
      onSelectTemplate(selectedTemplates);
    } else {
      onSelectTemplate(selectedTemplates[0]);
    }
  };

  const handleCombine = () => {
    if (selectedIds.size < 1 || !onCombineContent) return;
    const selectedTemplates = sortedTemplates.filter(t => selectedIds.has(t.id));
    const combinedText = selectedTemplates.map(t => t.content).join('\n\n---\n\n');
    onCombineContent(combinedText);
    if (selectedTemplates[0]) {
      addToRecents(selectedTemplates[0].id);
      updateAnalytics(selectedTemplates[0].id);
    }
  };

  // Helper for Sidebar Filtering (Inline replacement for filteredCategoryKeys)
  const visibleCategories = categoryKeys.filter(key =>
    !categorySearchQuery.trim() || activeCategoryMap[key]?.name.toLowerCase().includes(categorySearchQuery.toLowerCase()),
  );

  return (
    <>
      <div
        className={cn('fixed inset-0 z-50 bg-background/20 transition-opacity', loading && 'animate-pulse pointer-events-none opacity-50')}
        onClick={loading ? undefined : onClose}></div>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 pointer-events-none">
        <div
          className="bg-card w-full h-[90vh] max-w-7xl rounded-2xl border border-border shadow-2xl flex overflow-hidden pointer-events-auto relative flex-col md:flex-row">

          {/* Sidebar */}
          {SHOW_SIDEBAR && (
            <div
              className={cn('w-full md:w-64 border-r border-border bg-muted/20 flex flex-col shrink-0 transition-all z-10', selectorProps.sidebarClassName || '')}>
              <div className="p-4 border-b border-border bg-background/40 shrink-0 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <LayoutList size={16} className="text-muted-foreground"/>
                  <h2
                    className="text-sm font-bold uppercase tracking-wider text-foreground">{selectorProps.sidebarTitle || 'Library'}</h2>
                </div>
                <div className="flex gap-1">
                  {ENABLE_ANALYTICS && (
                    <button onClick={() => !loading && setShowAnalytics(true)}
                            className={cn('text-muted-foreground hover:text-foreground', loading && 'opacity-50')}>
                      <BarChart2 size={16}/></button>
                  )}
                  <button onClick={() => !loading && setShowShortcuts(true)}
                          className={cn('text-muted-foreground hover:text-foreground', loading && 'opacity-50')}>
                    <HelpCircle size={16}/></button>
                </div>
              </div>

              <div className="px-3 py-2 border-b border-border/50">
                <div className="relative">
                  <Search size={12} className="absolute left-2.5 top-2 text-muted-foreground"/>
                  <input type="text" placeholder="Filter categories..." value={categorySearchQuery}
                         onChange={(e) => setCategorySearchQuery(e.target.value)}
                         className="w-full h-8 pl-8 pr-2 text-xs rounded-md bg-background border border-input focus:border-primary focus:outline-none placeholder:text-muted-foreground/70"/>
                  {categorySearchQuery && <button onClick={() => setCategorySearchQuery('')}
                                                  className="absolute right-1.5 top-1.5 text-muted-foreground hover:text-foreground">
                    <X size={12}/></button>}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto custom-scroll p-2 space-y-4">
                <div className="space-y-1">
                  {isSidebarLoading ? Array.from({length: 5}).map((_, i) => <CategorySkeleton key={i}/>) :
                    visibleCategories.length === 0 ?
                      <div className="px-3 py-4 text-center text-xs text-muted-foreground">No categories found</div> :
                      visibleCategories.map((cat) => {
                        const isActive = selectedCategory === cat;
                        const Icon = activeCategoryMap[cat]?.icon || LayoutList;
                        return (
                          <button key={cat} onClick={() => handleCategoryClick(cat)}
                                  className={cn('w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group', isActive ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-accent hover:text-foreground')}>
                            <div className="flex items-center gap-3 overflow-hidden"><Icon size={16}
                                                                                           className={cn('shrink-0', isActive && 'text-primary-foreground')}/><span
                              className="truncate">{activeCategoryMap[cat]?.name || cat}</span></div>
                          </button>
                        );
                      })}
                </div>
                {activeTag && (
                  <div className="pt-4 border-t border-border/50">
                    <div
                      className="px-3 pb-2 flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase">Active
                      Tag
                    </div>
                    <div className="px-2">
                      <button onClick={() => handleTagClick(activeTag)}
                              className="px-2 py-1 rounded-md text-xs border border-primary bg-primary/10 text-primary font-medium">{activeTag}</button>
                    </div>
                  </div>
                )}
              </div>

              <div
                className="p-3 border-t border-border bg-background/40 text-[10px] text-muted-foreground text-center shrink-0">
                {isSidebarLoading ? <div
                  className="w-32 h-3 bg-muted/30 rounded mx-auto animate-pulse"/> : `${templates.length} Templates • V2.7.2`}
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1 flex flex-col min-w-0 h-full">
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-4 border-b border-border bg-background/40 shrink-0">
              <div>
                {loading ? (
                  <div className="space-y-2">
                    <div className="h-6 w-48 bg-muted rounded animate-pulse"/>
                    <div className="h-4 w-24 bg-muted/50 rounded animate-pulse"/>
                  </div>
                ) : (
                  <>
                    <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                      {SHOW_SIDEBAR ? (activeCategoryMap[selectedCategory]?.name || 'All Templates') : (selectorProps.sidebarTitle || 'All Templates')}
                      {activeTag && <span
                        className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full border border-border">#{activeTag}</span>}
                    </h2>
                    <p className="text-sm text-muted-foreground">{sortedTemplates.length} results found</p>
                  </>
                )}
              </div>
              <div className="flex items-center gap-2">
                {ENABLE_ANALYTICS && !SHOW_SIDEBAR && (
                  <button onClick={() => !loading && setShowAnalytics(true)}
                          className={cn('text-muted-foreground hover:text-foreground', loading && 'opacity-50')}>
                    <BarChart2 size={18}/></button>
                )}
                <button onClick={onClose} disabled={loading}
                        className={cn('rounded-full p-2 hover:bg-accent hover:text-foreground transition-colors', loading && 'opacity-50 cursor-not-allowed')}>
                  <X size={20}/></button>
              </div>
            </div>

            {/* Controls Bar */}
            <div
              className={cn('px-6 py-4 border-b border-border bg-background/30 shrink-0 flex flex-col xl:flex-row gap-4 items-start xl:items-center justify-between', !SHOW_SEARCH && !SHOW_SORT && !selectorProps.allowMultiSelect && 'hidden')}>
              {SHOW_SEARCH && (
                <div className="relative w-full xl:max-w-md group">
                  <Search size={16}
                          className="absolute left-3 top-3 text-muted-foreground group-focus-within:text-primary transition-colors"/>
                  <input type="text" placeholder="Search by title, tag, or description..." disabled={loading}
                         className={cn('w-full h-10 rounded-md border border-input bg-background pl-9 pr-9 text-sm', 'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all', 'placeholder:text-muted-foreground', 'disabled:opacity-50 disabled:cursor-not-allowed')}
                         value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                  {searchQuery && !loading && <button onClick={() => setSearchQuery('')}
                                                      className="absolute right-2 top-2 p-1 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors">
                    <X size={14}/></button>}
                </div>
              )}

              <div className="flex items-center gap-2 w-full xl:w-auto justify-between xl:justify-end flex-wrap">
                {SHOW_SORT && (
                  <div className="flex items-center gap-1 p-0.5">
                    <span className="pl-2 pr-1 text-xs text-muted-foreground">Sort:</span>
                    <SelectAdvanced
                      triggerWidth="120px"
                      clearable={false}
                      value={sortBy} onChange={value => setSortBy(value as any)} disabled={loading}
                      options={[
                        {label: 'Default', value: 'default'},
                        {label: 'Name (A-Z)', value: 'asc'},
                        {label: 'Name (Z-A)', value: 'desc'},
                      ]}/>
                  </div>
                )}

                {selectorProps.allowMultiSelect && (
                  <button onClick={toggleMultiSelect} disabled={loading}
                          className={cn('flex items-center gap-2 px-3 py-1.5 rounded-md border transition-all text-xs font-medium', isMultiSelectMode ? 'border-primary bg-primary/10 text-primary' : 'border-input bg-background text-muted-foreground hover:bg-accent', 'disabled:opacity-50 disabled:cursor-not-allowed')}>
                    <Layers size={14}/> {isMultiSelectMode ? 'Multi-Select ON' : 'Multi-Select'}
                  </button>
                )}

                {SHOW_VIEW_TOGGLE && (
                  <>
                    <div className="w-px h-6 bg-border mx-1 hidden xl:block"></div>
                    <div className="flex bg-muted p-1 rounded-md border border-border">
                      <button disabled={loading} onClick={() => setViewMode('grid')}
                              className={cn('p-1.5 rounded-sm transition-all', viewMode === 'grid' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground disabled:opacity-50')}>
                        <Grid3x3 size={16}/></button>
                      <button disabled={loading} onClick={() => setViewMode('list')}
                              className={cn('p-1.5 rounded-sm transition-all', viewMode === 'list' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground disabled:opacity-50')}>
                        <List size={16}/></button>
                    </div>
                  </>
                )}

                <button disabled={loading} onClick={resetFilters}
                        className="p-2 rounded-md hover:bg-accent text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Reset Filters"><RotateCcw size={16}/></button>
              </div>
            </div>

            {/* Grid/List/Compare Area */}
            <div ref={listContainerRef}
                 className="flex-1 overflow-y-auto custom-scroll p-6 bg-background/10 flex flex-col">
              {isMultiSelectMode && selectedIds.size === 2 && (
                <div
                  className="mb-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-sm flex justify-between items-center text-blue-600 dark:text-blue-400">
                  <span className="font-medium"><Code className="inline w-4 h-4 mr-2"/>Comparison Mode Active</span>
                  <button onClick={() => setSelectedIds(new Set())}
                          className="text-xs underline opacity-80 hover:opacity-100">Exit Comparison
                  </button>
                </div>
              )}

              {loading ? (
                <div
                  className={cn('gap-4', viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'flex flex-col')}>
                  {paginatedTemplates.map((_, i) => <TemplateSkeleton key={i} viewMode={viewMode}/>)}
                </div>
              ) : isMultiSelectMode && selectedIds.size === 2 ? (
                <ComparisonView t1={templates.find(t => t.id === Array.from(selectedIds)[0])!}
                                t2={templates.find(t => t.id === Array.from(selectedIds)[1])!}/>
              ) : paginatedTemplates.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-4">
                  <div className="p-6 rounded-full bg-muted/30 border border-border/50"><SearchX size={48}
                                                                                                 className="opacity-50"/>
                  </div>
                  <div className="text-center"><p className="text-lg font-medium text-foreground">No templates found</p>
                    <p className="text-sm mt-1">Try adjusting your search or category filters.</p>
                    <button onClick={resetFilters}
                            className="mt-4 text-primary hover:underline text-sm font-medium">Clear all filters
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div
                    className={cn('gap-4', viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'flex flex-col')}>
                    {paginatedTemplates.map((t: PromptTemplate) => {
                      const isSelected = selectedIds.has(t.id);
                      return (
                        <div key={t.id} className="relative group">
                          {selectorProps.allowMultiSelect && isMultiSelectMode && (
                            <div className="absolute top-2 left-2 z-20">
                              <button onClick={(e) => {
                                e.stopPropagation();
                                handleSelect(t.id);
                              }}
                                      className="bg-background/90 backdrop-blur border border-border rounded-full p-1.5 shadow-sm hover:scale-110 transition-transform">
                                {isSelected ? <CheckCircle2 className="text-primary w-5 h-5" fill="currentColor"/> :
                                  <Circle className="text-muted-foreground w-5 h-5"/>}
                              </button>
                            </div>
                          )}

                          <div
                            className="absolute bottom-4 right-2 z-20 flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                            <button onClick={(e) => {
                              e.stopPropagation();
                              setBuilderItem(t);
                            }}
                                    className="bg-background/90 backdrop-blur border border-border rounded-md p-1.5 shadow-sm hover:text-primary hover:border-primary/50"
                                    title="Build Prompt"><Wand2 size={16}/></button>
                            <button onClick={(e) => {
                              e.stopPropagation();
                              setPreviewItem(t);
                            }}
                                    className="bg-background/90 backdrop-blur border border-border rounded-md p-1.5 shadow-sm hover:text-primary hover:border-primary/50"
                                    title="Quick Preview"><Eye size={16}/></button>
                            {ENABLE_PINNED && SHOW_SIDEBAR && (
                              <button onClick={(e) => {
                                e.stopPropagation();
                                onTogglePin && onTogglePin(t.id);
                              }}
                                      className={cn('bg-background/90 backdrop-blur border border-border rounded-md p-1.5 shadow-sm transition-colors', pinnedIds.includes(t.id) ? 'text-primary border-primary' : 'text-muted-foreground hover:text-foreground')}
                                      title="Pin"><Pin size={16}
                                                       fill={pinnedIds.includes(t.id) ? 'currentColor' : 'none'}/>
                              </button>
                            )}
                            <button onClick={(e) => {
                              e.stopPropagation();
                              handleCopy(t.content, t.title);
                            }}
                                    className="bg-background/90 backdrop-blur border border-border rounded-md p-1.5 shadow-sm hover:text-primary hover:border-primary/50"
                                    title="Copy Prompt"><Copy size={16}/></button>
                          </div>

                          <TemplateCard
                            actionsConfig={{showFavorite: selectorProps.enableFavorites}}
                            template={t}
                            isSelected={isSelected} isFavorite={favorites.includes(t.id)}
                            onClick={() => handleSelect(t.id)}
                            onToggleFavorite={() => onToggleFavorite && onToggleFavorite(t.id)}
                            onTagClick={onTagClick} categoryIcons={categoryIcons}
                            renderTag={selectorProps.renderTag}/>
                        </div>
                      );
                    })}
                  </div>

                  {relatedTemplates.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-border/50">
                      <h4 className="text-sm font-bold text-muted-foreground mb-3 uppercase tracking-wider">Related
                        Templates
                      </h4>
                      <div className="flex gap-3 overflow-x-auto pb-2 custom-scroll">
                        {relatedTemplates.map(t => (
                          <div key={t.id} onClick={() => handleSelect(t.id)}
                               className="min-w-[280px] p-3 bg-card border border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
                            <div className="text-sm font-bold truncate">{t.title}</div>
                            <div className="text-xs text-muted-foreground line-clamp-2 mt-1">{t.content}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-border bg-card p-4 shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1 || loading}
                          className="h-9 w-9 flex items-center justify-center rounded-md border border-input bg-background hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                    <ChevronLeft size={14}/></button>
                  <span className="text-sm font-medium w-24 text-center">{loading ?
                    <div className="h-5 bg-muted/30 rounded animate-pulse mx-auto w-16"/> : <>Page {currentPage} <span
                      className="text-muted-foreground">/ {totalPages}</span></>}</span>
                  <button onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages || loading}
                          className="h-9 w-9 flex items-center justify-center rounded-md border border-input bg-background hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                    <ChevronRight size={14}/></button>
                </div>
                <div className="flex items-center gap-2">
                  {isMultiSelectMode && selectedIds.size > 1 && onCombineContent && (
                    <button onClick={handleCombine}
                            className="hidden sm:inline-flex items-center justify-center rounded-lg text-sm font-bold transition-all h-10 px-4 shadow-sm border border-input bg-background hover:bg-accent text-foreground">
                      <Merge size={16} className="mr-2"/> Combine ({selectedIds.size})</button>
                  )}
                  <button onClick={handleConfirm} disabled={selectedIds.size === 0 || loading}
                          className={cn('inline-flex items-center justify-center rounded-lg text-sm font-bold transition-all h-10 px-8 shadow-md disabled:opacity-50 disabled:cursor-not-allowed', selectedIds.size > 0 ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-muted text-muted-foreground')}>
                    {loading ? <div className="w-20 h-5 bg-muted/30 rounded animate-pulse"/> : selectedIds.size > 0 ? (
                      <>
                        <Check size={16} className="mr-2"/>
                        {isMultiSelectMode ? `Use ${selectedIds.size} Templates` : (selectorProps.chooseButtonText || 'Choose Template')}
                      </>
                    ) : (isMultiSelectMode ? 'Select Templates' : 'Select a Template')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {previewItem && (
        <PreviewModal
          template={previewItem} onClose={() => setPreviewItem(null)}
          onCopy={() => handleCopy(previewItem.content.replace(/\n+/, `\n`), previewItem.title)}
          categoryIcons={categoryIcons}/>
      )}

      {builderItem && (
        <BuilderModal
          template={builderItem} onClose={() => setBuilderItem(null)}
          onBuild={(c) => handleCopy(c, builderItem.title)}/>
      )}

      {/* Shortcuts Modal */}
      {showShortcuts && !previewItem && !builderItem && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"
               onClick={() => setShowShortcuts(false)}></div>
          <div
            className="bg-card border border-border shadow-xl rounded-lg p-6 w-full max-w-sm relative z-10 animate-in fade-in zoom-in duration-200">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Keyboard size={20}
                                                                                     className="text-primary"/> Keyboard
              Shortcuts</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Close Modal</span> <kbd
                className="bg-muted px-2 py-0.5 rounded border border-border">Esc</kbd></div>
              <div className="flex justify-between"><span
                className="text-muted-foreground">Navigate (Single Mode)</span>
                <div className="flex gap-1"><kbd className="bg-muted px-2 py-0.5 rounded border border-border">↑</kbd>
                  <kbd className="bg-muted px-2 py-0.5 rounded border border-border">↓</kbd></div>
              </div>
              <div className="flex justify-between"><span className="text-muted-foreground">Confirm Selection</span>
                <kbd
                  className="bg-muted px-2 py-0.5 rounded border border-border">Enter</kbd></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Show/Hide Help</span> <kbd
                className="bg-muted px-2 py-0.5 rounded border border-border">?</kbd></div>
            </div>
            <div className="mt-6 text-center">
              <button onClick={() => setShowShortcuts(false)}
                      className="text-sm font-medium text-primary hover:underline">Got it
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Modal */}
      {showAnalytics && !previewItem && !builderItem && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"
               onClick={() => setShowAnalytics(false)}></div>
          <div
            className="bg-card border border-border shadow-xl rounded-lg p-6 w-full max-w-md relative z-10 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold flex items-center gap-2"><BarChart2 size={20}
                                                                                   className="text-primary"/> Usage
                Analytics</h3>
              <button onClick={() => setShowAnalytics(false)}><X size={18}/></button>
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase text-muted-foreground mb-3">Top 5 Templates</h4>
                <div className="space-y-3">
                  {Object.entries(analyticsData).sort(([, a], [, b]) => b.count - a.count).slice(0, 5).map(([id, data]) => {
                    const t = templates.find(tmp => tmp.id === Number(id));
                    if (!t) return null;
                    const maxCount = Math.max(...Object.values(analyticsData).map(d => d.count));
                    const width = (data.count / maxCount) * 100;
                    return (
                      <div key={id}>
                        <div className="flex justify-between text-xs mb-1"><span
                          className="truncate w-3/4 font-medium">{t.title}</span><span
                          className="text-muted-foreground">{data.count} uses</span></div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary transition-all duration-500"
                               style={{width: `${width}%`}}></div>
                        </div>
                      </div>
                    );
                  })}
                  {Object.keys(analyticsData).length === 0 &&
                    <p className="text-xs text-muted-foreground italic">No usage data yet.</p>}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase text-muted-foreground mb-3">Recent Activity</h4>
                <div className="space-y-2">
                  {Object.entries(analyticsData).sort(([, a], [, b]) => b.lastUsed - a.lastUsed).slice(0, 3).map(([id, data]) => {
                    const t = templates.find(tmp => tmp.id === Number(id));
                    const timeAgo = new Date(data.lastUsed).toLocaleDateString();
                    return (
                      <div key={id}
                           className="flex justify-between text-xs py-1 border-b border-border/50 last:border-0">
                        <span className="font-medium truncate w-2/3">{t?.title || 'Unknown'}</span>
                        <span className="text-muted-foreground">{timeAgo}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TemplateSelector;
