/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 * @version 2.0.0
 */

import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Circle,
  Copy,
  Grid3x3, Heart,
  HelpCircle,
  Keyboard,
  Layers,
  LayoutList,
  List,
  LucideIcon,
  RotateCcw,
  Search,
  SearchX,
  Tag,
  X,
} from 'lucide-react';

// utils
import {cn} from '~/utils/helpers';
import {defaultCategoryMap} from './utils';

// relative components
import TemplateCard from './TemplateCard';

// types
import type {PromptTemplate} from './index';

/**
 * Props for the TemplateSelector V2 component.
 */
export interface TemplateSelectorProps {
  /** List of all available templates. */
  templates: PromptTemplate[];

  /** Callback to close the selector. */
  onClose(): void;

  /** Callback when a template is chosen (Single mode) or templates are chosen (Multi mode). */
  onSelectTemplate(t: PromptTemplate | PromptTemplate[]): void;

  /** Callback when a category filter is applied. */
  onCategoryFilter?(cat: string): void;

  /** Callback when a tag is clicked. */
  onTagClick?(tag: string): void;

  /** Callback when searching for templates. */
  onTemplateSearch?(q: string, cat: string): void;

  /** Callback when pagination changes. */
  onPaginate?(page: number): void;

  /** Callback when a category is clicked. */
  onCategoryClick?(cat: string): void;

  /** Callback when the active category changes. */
  onCategoryChange?(cat: string): void;

  /** List of template IDs marked as favorites. */
  favorites?: number[];

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
    /** List of available sorting options. */
    sortOptions?: Array<{ value: string; label: string }>;
    /** The default sorting strategy. */
    defaultSort?: string;
    /** Flag to toggle the visibility of a "Favorites Only" filter switch. */
    showFavoritesOnly?: boolean;
    /** Allow user to toggle Multi-Select mode. */
    allowMultiSelect?: boolean;
  };

  /** Mapping of category names to icons (Legacy support). */
  categoryIcons?: Record<string, { name: string; icon: LucideIcon }>;

  /** Callback to toggle a template's favorite status. */
  onToggleFavorite?(id: number): void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = (props) => {
  const {
    templates,
    onClose,
    onSelectTemplate,
    onCategoryFilter,
    onTagClick,
    onTemplateSearch,
    onPaginate,
    onToggleFavorite,
    favorites = [],
    selectorProps = {},
    categoryIcons,
    onCategoryClick,
    onCategoryChange,
    categories: propCategories,
  } = props;

  // --- State ---
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  // V2: Support Multi-select via Set
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [isMultiSelectMode, setIsMultiSelectMode] = useState(false);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState(selectorProps.defaultSort || 'newest');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Refs
  const listContainerRef = useRef<HTMLDivElement>(null);

  // --- Config ---
  const ITEMS_PER_PAGE = selectorProps.itemsPerPage || 12;

  // Merge categories
  const activeCategoryMap = useMemo(() => {
    const map: Record<string, { name: string; icon: LucideIcon }> = {...defaultCategoryMap, ...categoryIcons};
    if (propCategories && propCategories.length > 0) {
      propCategories.forEach(cat => {
        map[cat.id] = { name: cat.name, icon: cat.icon };
      });
    }
    return map;
  }, [propCategories, categoryIcons]);

  const categoryKeys = useMemo(() => {
    if (propCategories && propCategories.length > 0) {
      return propCategories.map(c => c.id);
    }
    return Object.keys(activeCategoryMap);
  }, [propCategories, activeCategoryMap]);

  const sortOptions = selectorProps.sortOptions || [
    {value: 'newest', label: 'Newest'},
    {value: 'az', label: 'A-Z'},
    {value: 'favorites', label: 'Favorites'},
  ];

  // --- Logic: Filtering & Sorting ---
  const filtered = useMemo(() => {
    let result = templates;

    // 1. Category Filter
    if (selectedCategory !== 'all') {
      result = result.filter((t) => t.category === selectedCategory);
    }

    // 2. Tag Filter (V2 New)
    if (activeTag) {
      result = result.filter((t) => t.tags && t.tags.includes(activeTag));
    }

    // 3. Favorites Filter
    const isFavoritesView = sortType === 'favorites' || showFavoritesOnly;
    if (isFavoritesView) {
      result = result.filter((t) => favorites.includes(t.id));
    }

    // 4. Search Filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          (t.tags && t.tags.some((tag) => tag.toLowerCase().includes(q))),
      );
    }

    // 5. Sorting
    if (sortType === 'az') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortType === 'newest') {
      result.sort((a, b) => b.id - a.id);
    }

    return result;
  }, [templates, selectedCategory, activeTag, searchQuery, sortType, favorites, showFavoritesOnly]);

  // --- Logic: Category Counts ---
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: templates.length };
    categoryKeys.forEach(key => {
      if (key === 'all') return;
      counts[key] = templates.filter(t => t.category === key).length;
    });
    return counts;
  }, [templates, categoryKeys]);

  // --- Logic: Available Tags (V2 New) ---
  const availableTags = useMemo(() => {
    const tagMap = new Map<string, number>();
    // Count tags based on current filtered results (contextual)
    filtered.forEach(t => {
      t.tags?.forEach(tag => {
        tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
      });
    });
    // Sort by frequency
    return Array.from(tagMap.entries()).sort((a, b) => b[1] - a[1]).slice(0, 10); // Top 10 tags
  }, [filtered]);

  // --- Logic: Pagination ---
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTemplates = filtered.slice(start, start + ITEMS_PER_PAGE);

  // --- Effects ---
  useEffect(() => {
    setCurrentPage(1);
    // Clear selection when filters change to avoid selecting invisible items
    // setSelectedIds(new Set());
  }, [selectedCategory, activeTag, searchQuery, sortType, showFavoritesOnly]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showShortcuts) {
          setShowShortcuts(false);
        } else {
          onClose();
        }
        return;
      }

      // Shortcuts Toggle
      if (e.key === '?' && !e.shiftKey) {
        e.preventDefault();
        setShowShortcuts(prev => !prev);
        return;
      }

      // Navigation (Single Select Mode Only)
      if (!isMultiSelectMode) {
        const selectedId = selectedIds.size === 1 ? Array.from(selectedIds)[0] : null;
        if (!selectedId) return;

        const currentIndex = paginatedTemplates.findIndex((t) => t.id === selectedId);

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          const nextIndex = Math.min(currentIndex + 1, paginatedTemplates.length - 1);
          setSelectedIds(new Set([paginatedTemplates[nextIndex]?.id]));
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          const prevIndex = Math.max(currentIndex - 1, 0);
          setSelectedIds(new Set([paginatedTemplates[prevIndex]?.id]));
        } else if (e.key === 'Enter') {
          e.preventDefault();
          handleConfirm();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginatedTemplates, selectedIds, isMultiSelectMode, showShortcuts, onClose]);

  // --- Handlers ---

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    setActiveTag(null); // Reset tag on cat change
    if (onCategoryClick) onCategoryClick(cat);
    if (onCategoryChange) onCategoryChange(cat);
    if (onCategoryFilter) onCategoryFilter(cat);
  };

  const handleTagClick = (tag: string) => {
    setActiveTag(prev => prev === tag ? null : tag);
    if (onTagClick) onTagClick(tag);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    if (onTemplateSearch) onTemplateSearch(val, selectedCategory);
  };

  const handleCopy = useCallback(async (text: string, _title: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      // nothing
    }
  }, []);

  const handleSelect = (id: number) => {
    if (isMultiSelectMode) {
      const newSet = new Set(selectedIds);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      setSelectedIds(newSet);
    } else {
      // Single select: clicking again deselects? No, usually just selects.
      setSelectedIds(new Set([id]));
    }
  };

  const toggleMultiSelect = () => {
    setIsMultiSelectMode(!isMultiSelectMode);
    setSelectedIds(new Set()); // Clear selection on mode switch
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setActiveTag(null);
    setSortType('newest');
    setShowFavoritesOnly(false);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (onPaginate) onPaginate(page);
  };

  const handleConfirm = () => {
    if (selectedIds.size === 0) return;

    const selectedTemplates = templates.filter(t => selectedIds.has(t.id));

    if (isMultiSelectMode) {
      onSelectTemplate(selectedTemplates);
    } else {
      onSelectTemplate(selectedTemplates[0]);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 pointer-events-none">
        <div className="bg-card w-full h-[90vh] max-w-7xl rounded-2xl border border-border shadow-2xl flex overflow-hidden pointer-events-auto relative flex-col md:flex-row">

          {/* Sidebar */}
          <div className={cn(
            'w-full md:w-64 border-r border-border bg-muted/20 flex flex-col shrink-0 transition-all z-10',
            selectorProps.sidebarClassName || '',
          )}>
            {/* Sidebar Header */}
            <div className="p-4 border-b border-border bg-background/40 shrink-0 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <LayoutList size={16} className="text-muted-foreground"/>
                <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
                  {selectorProps.sidebarTitle || 'Library'}
                </h2>
              </div>
              {/* V2: Shortcuts Help */}
              <button onClick={() => setShowShortcuts(true)} className="text-muted-foreground hover:text-foreground">
                <HelpCircle size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scroll p-2 space-y-4">

              {/* Categories */}
              <div className="space-y-1">
                {categoryKeys.map((cat) => {
                  const isActive = selectedCategory === cat;
                  const Icon = activeCategoryMap[cat]?.icon || LayoutList;
                  const count = categoryCounts[cat] || 0;
                  const isDisabled = count === 0 && cat !== 'all';

                  return (
                    <button
                      key={cat}
                      onClick={() => !isDisabled && handleCategoryClick(cat)}
                      disabled={isDisabled}
                      className={cn(
                        'w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group',
                        isActive
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : isDisabled
                            ? 'text-muted-foreground/30 cursor-not-allowed'
                            : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                      )}
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <Icon size={16} className={cn("shrink-0", isActive && "text-primary-foreground")}/>
                        <span className="truncate">{activeCategoryMap[cat]?.name || cat}</span>
                      </div>
                      <span className={cn(
                        "text-xs py-0.5 px-2 rounded-full shrink-0",
                        isActive
                          ? "bg-primary-foreground/20 text-primary-foreground"
                          : "bg-muted text-muted-foreground group-hover:bg-accent"
                      )}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* V2: Tag Cloud Filter */}
              {availableTags.length > 0 && (
                <div className="pt-4 border-t border-border/50">
                  <div className="px-3 pb-2 flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase">
                    <Tag size={12} /> Popular Tags
                  </div>
                  <div className="flex flex-wrap gap-2 px-2">
                    {availableTags.map(([tag, count]) => (
                      <button
                        key={tag}
                        onClick={() => handleTagClick(tag)}
                        className={cn(
                          "px-2 py-1 rounded-md text-xs border transition-colors flex items-center gap-1.5",
                          activeTag === tag
                            ? "border-primary bg-primary/10 text-primary font-medium"
                            : "border-border bg-background hover:bg-accent text-muted-foreground"
                        )}
                      >
                        {tag}
                        <span className={cn("text-[10px] opacity-70", activeTag === tag && "opacity-100")}>
                          {count}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Footer */}
            <div className="p-3 border-t border-border bg-background/40 text-[10px] text-muted-foreground text-center shrink-0">
              {templates.length} Templates • V2.0
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col min-w-0 h-full">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-background/40 shrink-0">
              <div>
                <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                  {activeCategoryMap[selectedCategory]?.name || 'All Templates'}
                  {activeTag && (
                    <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full border border-border">
                       #{activeTag}
                     </span>
                  )}
                  {showFavoritesOnly && (
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Heart size={10} fill="currentColor"/> Favorites
                    </span>
                  )}
                </h2>
                <p className="text-sm text-muted-foreground">{filtered.length} results found</p>
              </div>
              <button onClick={onClose} className="rounded-full p-2 hover:bg-accent hover:text-foreground transition-colors">
                <X size={20}/>
              </button>
            </div>

            {/* Controls Bar */}
            <div className="px-6 py-4 border-b border-border bg-background/30 shrink-0 flex flex-col xl:flex-row gap-4 items-start xl:items-center justify-between">

              <div className="relative w-full xl:max-w-md group">
                <Search size={16} className="absolute left-3 top-3 text-muted-foreground group-focus-within:text-primary transition-colors"/>
                <input
                  type="text"
                  placeholder="Search by title, tag, or description..."
                  className={cn(
                    'w-full h-10 rounded-md border border-input bg-background pl-9 pr-9 text-sm',
                    'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all',
                    'placeholder:text-muted-foreground',
                  )}
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
                {searchQuery && (
                  <button onClick={() => handleSearchChange('')} className="absolute right-2 top-2 p-1 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors">
                    <X size={14}/>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 w-full xl:w-auto justify-between xl:justify-end flex-wrap">

                {/* V2: Multi-Select Toggle */}
                {selectorProps.allowMultiSelect && (
                  <button
                    onClick={toggleMultiSelect}
                    className={cn(
                      "flex items-center gap-2 px-3 py-1.5 rounded-md border transition-all text-xs font-medium",
                      isMultiSelectMode
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-input bg-background text-muted-foreground hover:bg-accent"
                    )}
                  >
                    <Layers size={14} />
                    {isMultiSelectMode ? 'Multi-Select ON' : 'Multi-Select'}
                  </button>
                )}

                <div className="w-px h-6 bg-border mx-1 hidden xl:block"></div>

                {/* View Toggle */}
                <div className="flex bg-muted p-1 rounded-md border border-border">
                  <button onClick={() => setViewMode('grid')} className={cn("p-1.5 rounded-sm transition-all", viewMode === 'grid' ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground")}><Grid3x3 size={16} /></button>
                  <button onClick={() => setViewMode('list')} className={cn("p-1.5 rounded-sm transition-all", viewMode === 'list' ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground")}><List size={16} /></button>
                </div>

                {/* Reset */}
                <button onClick={resetFilters} className="p-2 rounded-md hover:bg-accent text-muted-foreground" title="Reset Filters">
                  <RotateCcw size={16} />
                </button>

                {/* Sort Select */}
                <select
                  value={sortType}
                  onChange={(e) => { setSortType(e.target.value); if(e.target.value === 'favorites') setShowFavoritesOnly(true); }}
                  className="h-9 text-sm rounded-md border border-input bg-background px-3 py-1 focus:outline-none focus:ring-2 focus-visible:ring-ring min-w-[120px]"
                >
                  {sortOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              </div>
            </div>

            {/* Grid/List Area */}
            <div ref={listContainerRef} className="flex-1 overflow-y-auto custom-scroll p-6 bg-background/10">
              {paginatedTemplates.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-4">
                  <div className="p-6 rounded-full bg-muted/30 border border-border/50"><SearchX size={48} className="opacity-50"/></div>
                  <div className="text-center"><p className="text-lg font-medium text-foreground">No templates found</p><p className="text-sm mt-1">Try adjusting your search or category filters.</p><button onClick={resetFilters} className="mt-4 text-primary hover:underline text-sm font-medium">Clear all filters</button></div>
                </div>
              ) : (
                <div className={cn("gap-4", viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "flex flex-col")}>
                  {paginatedTemplates.map((t) => {
                    const isSelected = selectedIds.has(t.id);
                    return (
                      <div key={t.id} className="relative group">
                        {/* V2: Selection Checkbox Overlay */}
                        {selectorProps.allowMultiSelect && isMultiSelectMode && (
                          <div className="absolute top-2 left-2 z-20">
                            <button
                              onClick={(e) => { e.stopPropagation(); handleSelect(t.id); }}
                              className="bg-background/90 backdrop-blur border border-border rounded-full p-1.5 shadow-sm hover:scale-110 transition-transform"
                            >
                              {isSelected ? <CheckCircle2 className="text-primary w-5 h-5" fill="currentColor" /> : <Circle className="text-muted-foreground w-5 h-5" />}
                            </button>
                          </div>
                        )}

                        {/* V2: Copy Button Overlay */}
                        <button
                          onClick={(e) => { e.stopPropagation(); handleCopy(t.content, t.title); }}
                          className="absolute top-2 right-2 z-20 bg-background/90 backdrop-blur border border-border rounded-md p-1.5 shadow-sm opacity-0 group-hover:opacity-100 transition-all hover:text-primary hover:border-primary/50"
                          title="Copy Prompt"
                        >
                          <Copy size={16} />
                        </button>

                        <TemplateCard
                          template={t}
                          isSelected={isSelected}
                          isFavorite={favorites.includes(t.id)}
                          onClick={() => handleSelect(t.id)}
                          onToggleFavorite={() => onToggleFavorite && onToggleFavorite(t.id)}
                          onTagClick={onTagClick}
                          categoryIcons={categoryIcons}
                          renderTag={selectorProps.renderTag}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-border bg-card p-4 shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="h-9 w-9 flex items-center justify-center rounded-md border border-input bg-background hover:bg-accent disabled:opacity-50 transition-colors"><ChevronLeft size={14}/></button>
                  <span className="text-sm font-medium w-24 text-center">Page {currentPage} <span className="text-muted-foreground">/ {totalPages}</span></span>
                  <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="h-9 w-9 flex items-center justify-center rounded-md border border-input bg-background hover:bg-accent disabled:opacity-50 transition-colors"><ChevronRight size={14}/></button>
                </div>

                <button
                  onClick={handleConfirm}
                  disabled={selectedIds.size === 0}
                  className={cn(
                    'inline-flex items-center justify-center rounded-lg text-sm font-bold transition-all h-10 px-8 shadow-md disabled:opacity-50 disabled:cursor-not-allowed',
                    selectedIds.size > 0
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'bg-muted text-muted-foreground',
                  )}
                >
                  {selectedIds.size > 0 ? (
                    <>
                      <Check size={16} className="mr-2"/>
                      {isMultiSelectMode
                        ? `Use ${selectedIds.size} Templates`
                        : (selectorProps.chooseButtonText || 'Choose Template')}
                    </>
                  ) : (
                    isMultiSelectMode ? 'Select Templates' : 'Select a Template'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* V2: Shortcuts Modal */}
      {showShortcuts && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setShowShortcuts(false)}></div>
          <div className="bg-card border border-border shadow-xl rounded-lg p-6 w-full max-w-sm relative z-10 animate-in fade-in zoom-in duration-200">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Keyboard size={20} className="text-primary"/> Keyboard Shortcuts
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Close Modal</span> <kbd className="bg-muted px-2 py-0.5 rounded border border-border">Esc</kbd></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Navigate (Single Mode)</span> <div className="flex gap-1"><kbd className="bg-muted px-2 py-0.5 rounded border border-border">↑</kbd> <kbd className="bg-muted px-2 py-0.5 rounded border border-border">↓</kbd></div></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Confirm Selection</span> <kbd className="bg-muted px-2 py-0.5 rounded border border-border">Enter</kbd></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Show/Hide Help</span> <kbd className="bg-muted px-2 py-0.5 rounded border border-border">?</kbd></div>
            </div>
            <div className="mt-6 text-center">
              <button onClick={() => setShowShortcuts(false)} className="text-sm font-medium text-primary hover:underline">Got it</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TemplateSelector;
