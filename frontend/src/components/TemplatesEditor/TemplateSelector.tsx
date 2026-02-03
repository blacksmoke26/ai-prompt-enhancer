/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Heart,
  HeartOff,
  LayoutGrid,
  LucideIcon,
  Search,
  SearchX,
  SortAsc,
  X,
} from 'lucide-react';

// utils
import {defaultCategoryMap} from './utils';
import {cn} from '~/utils/helpers';

// relative components
import TemplateCard from './TemplateCard';

// types
import type {PromptTemplate} from './index';

/**
 * Props for the TemplateSelector component.
 */
export interface TemplateSelectorProps {
  /** List of all available templates. */
  templates: PromptTemplate[];

  /** Callback to close the selector. */
  onClose(): void;

  /** Callback when a template is chosen. */
  onSelectTemplate(t: PromptTemplate): void;

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
  /** Configuration specific to the selector's behavior. */
  selectorProps?: {
    /** Determines the number of template items displayed per page in the grid view. */
    itemsPerPage?: number;
    /** Custom title displayed in the sidebar header area. */
    sidebarTitle?: string;
    /** Additional CSS class names applied to the sidebar container for styling overrides. */
    sidebarClassName?: string;
    /** Text displayed on the primary confirmation button used to select a template. */
    chooseButtonText?: string;
    /** Custom renderer function for template tags, allowing specific UI or behavior per tag. */
    renderTag?(tag: string, onClick: (tag: string) => void): React.ReactNode;
    /** List of available sorting options to populate the sort dropdown menu. */
    sortOptions?: Array<{ value: string; label: string }>;
    /** The default sorting strategy applied when the selector initializes (e.g., 'newest', 'az'). */
    defaultSort?: string;
    /** Flag to toggle the visibility of a "Favorites Only" filter switch in the controls area. */
    showFavoritesOnly?: boolean;
  };
  /** Mapping of category names to icons. */
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
  } = props;

  // --- State ---
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState(selectorProps.defaultSort || 'newest');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Refs for keyboard navigation
  const listContainerRef = useRef<HTMLDivElement>(null);

  // --- Config ---
  const ITEMS_PER_PAGE = selectorProps.itemsPerPage || 9; // Slightly larger grid
  const activeCategoryMap = {...defaultCategoryMap, ...categoryIcons};

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

    // 2. Favorites Filter (Active if sortType is favorites OR switch is toggled)
    const isFavoritesView = sortType === 'favorites' || showFavoritesOnly;
    if (isFavoritesView) {
      result = result.filter((t) => favorites.includes(t.id));
    }

    // 3. Search Filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          (t.tags && t.tags.some((tag) => tag.toLowerCase().includes(q))),
      );
    }

    // 4. Sorting
    if (sortType === 'az') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortType === 'newest') {
      // Assuming templates might have a date, otherwise fallback to ID
      result.sort((a, b) => b.id - a.id);
    }
    // Favorites are already filtered, no specific sort needed usually, or sort by date added to favorites?

    return result;
  }, [templates, selectedCategory, searchQuery, sortType, favorites, showFavoritesOnly]);

  // --- Logic: Pagination ---
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTemplates = filtered.slice(start, start + ITEMS_PER_PAGE);

  // --- Effects ---
  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, sortType, showFavoritesOnly]);

  // Handle Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedId) return;

      const currentIndex = paginatedTemplates.findIndex((t) => t.id === selectedId);

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = Math.min(currentIndex + 1, paginatedTemplates.length - 1);
        setSelectedId(paginatedTemplates[nextIndex]?.id || null);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = Math.max(currentIndex - 1, 0);
        setSelectedId(paginatedTemplates[prevIndex]?.id || null);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        handleConfirm();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [paginatedTemplates, selectedId]);

  // --- Handlers ---
  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    if (onCategoryClick) onCategoryClick(cat);
    if (onCategoryChange) onCategoryChange(cat);
    if (onCategoryFilter) onCategoryFilter(cat);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    if (onTemplateSearch) onTemplateSearch(val, selectedCategory);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (onPaginate) onPaginate(page);
  };

  const handleSelect = (id: number) => {
    setSelectedId(id);
  };

  const handleConfirm = () => {
    if (selectedId) {
      const t = templates.find((x) => x.id === selectedId);
      if (t) onSelectTemplate(t);
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-card w-full h-[90vh] max-w-7xl rounded-2xl border border-border shadow-2xl flex overflow-hidden pointer-events-auto relative">

          {/* Sidebar */}
          <div className={cn(
            'w-64 border-r border-border bg-muted/20 flex flex-col shrink-0 transition-all',
            selectorProps.sidebarClassName || '',
          )}>
            <div className="p-4 border-b border-border bg-background/40">
              <div className="flex items-center gap-2">
                <LayoutGrid size={16} className="text-muted-foreground"/>
                <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
                  {selectorProps.sidebarTitle || 'Categories'}
                </h2>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scroll p-2 space-y-1">
              {Object.keys(activeCategoryMap).map((cat) => {
                const isActive = selectedCategory === cat;
                const Icon = activeCategoryMap[cat].icon;
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategoryClick(cat)}
                    className={cn(
                      'w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={16}/>
                      <span>{activeCategoryMap[cat].name}</span>
                    </div>
                    {isActive && <ChevronRight size={14}/>}
                  </button>
                );
              })}
            </div>

            {/* Sidebar Footer (Optional) */}
            <div className="p-4 border-t border-border bg-background/40 text-xs text-muted-foreground text-center">
              {templates.length} Total Templates
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-4 border-b border-border bg-background/40 shrink-0">
              <div>
                <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                  {activeCategoryMap[selectedCategory]?.name || 'All Templates'}
                  {showFavoritesOnly && (
                    <span
                      className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Heart size={10} fill="currentColor"/> Favorites
                    </span>
                  )}
                </h2>
                <p className="text-sm text-muted-foreground">{filtered.length} results</p>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-2 hover:bg-accent hover:text-foreground transition-colors"
              >
                <X size={20}/>
              </button>
            </div>

            {/* Controls: Search & Sort */}
            <div
              className="px-6 py-4 border-b border-border bg-background/30 shrink-0 flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="relative w-full lg:max-w-md group">
                <Search
                  size={16}
                  className="absolute left-3 top-3 text-muted-foreground group-focus-within:text-primary transition-colors"
                />
                <input
                  type="text"
                  placeholder="Search by title, tag, or description..."
                  className={cn(
                    'w-full h-10 rounded-md border border-input bg-background pl-9 pr-4 text-sm',
                    'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all',
                    'placeholder:text-muted-foreground',
                  )}
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-3 w-full lg:w-auto">
                {/* Advanced Feature: Favorites Toggle Switch */}
                {selectorProps.showFavoritesOnly && (
                  <button
                    onClick={() => {
                      setShowFavoritesOnly(!showFavoritesOnly);
                      if (sortType === 'favorites' && showFavoritesOnly) {
                        setSortType('newest'); // Reset sort if toggling off manually
                      }
                    }}
                    className={cn(
                      'flex items-center gap-2 px-3 py-1.5 rounded-md border transition-all text-xs font-medium',
                      showFavoritesOnly
                        ? 'border-yellow-500/30 bg-yellow-500/10 text-yellow-600 dark:text-yellow-500'
                        : 'border-input bg-background text-muted-foreground hover:bg-accent',
                    )}
                  >
                    {showFavoritesOnly ? <HeartOff size={14}/> : <Heart size={14}/>}
                    <span>{showFavoritesOnly ? 'Showing All' : 'Favorites Only'}</span>
                  </button>
                )}

                {/* Sort Select */}
                <div className="flex items-center gap-2">
                  <SortAsc size={16} className="text-muted-foreground"/>
                  <select
                    value={sortType}
                    onChange={(e) => {
                      setSortType(e.target.value);
                      // If selecting favorites, ensure toggle is on
                      if (e.target.value === 'favorites') setShowFavoritesOnly(true);
                    }}
                    className="h-9 text-sm rounded-md border border-input bg-background px-3 py-1 focus:outline-none focus:ring-2 focus-visible:ring-ring"
                  >
                    {sortOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Grid Area */}
            <div
              ref={listContainerRef}
              className="flex-1 overflow-y-auto custom-scroll p-6 bg-background/10"
            >
              {paginatedTemplates.length === 0 ? (
                <div
                  className="flex flex-col items-center justify-center h-full text-muted-foreground gap-4 animate-in fade-in duration-300">
                  <div className="p-6 rounded-full bg-muted/30 border border-border/50">
                    <SearchX size={48} className="opacity-50"/>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-medium text-foreground">No templates found</p>
                    <p className="text-sm mt-1">Try adjusting your search or category filters.</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {paginatedTemplates.map((t) => (
                    <TemplateCard
                      key={t.id}
                      template={t}
                      isSelected={selectedId === t.id}
                      isFavorite={favorites.includes(t.id)}
                      onClick={() => handleSelect(t.id)}
                      onToggleFavorite={() => onToggleFavorite && onToggleFavorite(t.id)}
                      onTagClick={onTagClick}
                      categoryIcons={categoryIcons}
                      renderTag={selectorProps.renderTag}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Footer: Pagination & Action */}
            <div className="border-t border-border bg-card p-4 shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="h-9 w-9 flex items-center justify-center rounded-md border border-input bg-background hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft size={14}/>
                  </button>
                  <span className="text-sm font-medium w-24 text-center">
                    Page {currentPage} <span className="text-muted-foreground">/ {totalPages}</span>
                  </span>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="h-9 w-9 flex items-center justify-center rounded-md border border-input bg-background hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight size={14}/>
                  </button>
                </div>

                <button
                  onClick={handleConfirm}
                  disabled={!selectedId}
                  className={cn(
                    'inline-flex items-center justify-center rounded-lg text-sm font-bold transition-all h-10 px-8 shadow-md disabled:opacity-50',
                    selectedId
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90 transform hover:-translate-y-0.5'
                      : 'bg-muted text-muted-foreground cursor-not-allowed',
                  )}
                >
                  {selectedId ? (
                    <>
                      <Check size={16} className="mr-2"/>
                      {selectorProps.chooseButtonText || 'Choose Template'}
                    </>
                  ) : (
                    'Select a Template'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TemplateSelector;
