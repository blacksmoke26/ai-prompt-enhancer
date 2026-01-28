/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useEffect, useMemo, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import {
  BarChart3,
  Briefcase,
  Check,
  Code,
  Cpu,
  GraduationCap,
  Layers,
  Loader2,
  PenTool,
  Search,
  Shield,
  Sparkles,
  Thermometer,
  User,
  X,
} from 'lucide-react';

// ui components
import {Badge} from '~/components/ui/Badge';
import {Button} from '~/components/ui/Button';

// types
import type { UserRole } from '~/types';

/**
 * Configuration options for the RoleSelector modal component. Allows customization of titles, placeholders, text labels,
 * and responsive grid column settings.
 */
export interface RoleSelectorConfig {
  /** Optional title for the modal header. Defaults to "User Role". */
  modalTitle?: string;
  /** Placeholder text for the search input field. */
  searchPlaceholder?: string;
  /** Title text displayed when no roles match the filter criteria. */
  emptyStateTitle?: string;
  /** Description text shown alongside the empty state title. */
  emptyStateDescription?: string;
  /** Text label for the button to clear active search or category filters. */
  clearFiltersText?: string;
  /** Text label for the close button in the modal footer. */
  closeText?: string;
  /** Default category to filter by when the component loads. Defaults to "All". */
  defaultCategory?: string;
  /** CSS utility classes for grid column layout across different screen breakpoints. */
  gridCols?: {
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
    '2xl'?: string;
  };
}

/**
 * Props definition for the RoleSelector component, handling data display, user selection events, and configuration.
 */
export interface RoleSelectorProps {
  /** Array of role objects to display in the selector. */
  data?: UserRole[];
  /** Callback function triggered when a role is selected. Receives the selected role object. */
  onSelect(role: UserRole): void;
  /** Optional initial selected role. */
  initialValue?: UserRole | null;
  /** Component configuration object for customization. */
  config?: RoleSelectorConfig;
}

/**
 * Generic wrapper for Lucide icons to handle size and className props consistently.
 */
const Icon = ({Icon: LucideIcon, size = 16, className = ''}) => (
  <LucideIcon size={size} className={className}/>
);

/**
 * Displays a compact card representing a single role including name, description, capabilities, and temperature.
 */
const RoleCard = ({role, isSelected, onSelect, getCategoryIcon}) => {
  return (
    <div
      onClick={() => onSelect(role)}
      className={`group relative flex flex-col p-4 rounded-lg border transition-all duration-200 cursor-pointer h-full
        ${isSelected
        ? 'border-primary bg-primary/5 shadow-sm ring-1 ring-primary/20'
        : 'border-border bg-card hover:border-primary/40 hover:bg-accent/30'
      }
                    `}
    >
      {/* Selection Check */}
      {isSelected && (
        <div className="absolute top-3 right-3 text-primary">
          <Check size={16} className="bg-primary text-primary-foreground rounded-full p-0.5"/>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-2 pr-6">
        <div className="flex items-center gap-2.5">
          <div className={`
                                p-1.5 rounded flex-shrink-0
                                ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground'}
                            `}>
            <Icon Icon={getCategoryIcon(role.category)} size={14}/>
          </div>
          <h3 className={`font-semibold text-sm truncate ${isSelected ? 'text-primary' : 'text-foreground'}`}>
            {role.name}
          </h3>
        </div>
      </div>

      {/* Description */}
      <p className="text-[11px] text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
        {role.shortDescription}
      </p>

      {/* Footer */}
      <div className="mt-auto flex flex-col gap-2">
        {/* Capabilities / Tags - Now displaying ALL tags, wrapped */}
        <div className="flex flex-wrap gap-1.5">
          {role.capabilities.map(cap => (
            <span
              key={cap}
              className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground border border-border"
            >
              {cap}
            </span>
          ))}
        </div>

        {/* Temperature Bar */}
        <div className="flex items-center gap-1.5 flex-shrink-0 self-end" title={`Temp: ${role.temperature}`}>
          <Thermometer size={10} className="text-muted-foreground"/>
          <div className="w-12 h-1 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-orange-500/80"
              style={{width: `${role.temperature * 100}%`}}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * MAIN COMPONENT: RoleSelector
 */
const RoleSelector: React.FC<RoleSelectorProps> = (props) => {
  const {
    data = [],
    onSelect,
    initialValue = null,
    config = {},
  } = props;

  // Merge user config with defaults
  const {
    modalTitle = 'Choose Assistant',
    searchPlaceholder,
    emptyStateTitle = 'No results found',
    emptyStateDescription = 'Try adjusting your search or category filter.',
    clearFiltersText = 'Clear Filters',
    closeText = 'Close',
    defaultCategory = 'All',
    // Defaulting to 2 columns per row for all breakpoints as requested
    gridCols = {
      sm: 'grid-cols-2',
      md: 'grid-cols-2',
      lg: 'grid-cols-2',
      xl: 'grid-cols-2',
      '2xl': 'grid-cols-2',
    },
  } = config;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(initialValue);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>(defaultCategory);

  const containerRef = useRef(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => searchInputRef.current?.focus?.(), 200);
    // eslint-disable-next-line
  }, [searchInputRef.current]);

  // Extract categories dynamically from data
  const categories = useMemo(() => {
    const cats = new Set(data.map(r => r.category));
    return [defaultCategory, ...Array.from(cats)];
  }, [data, defaultCategory]);

  // Filter Logic (Flat list first)
  const filteredRoles = useMemo(() => {
    return data.filter(role => {
      if (role.hidden) return false;
      const matchesCategory = activeCategory === defaultCategory || role.category === activeCategory;
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        role.name.toLowerCase().includes(searchLower) ||
        role.shortDescription.toLowerCase().includes(searchLower) ||
        role.key.toLowerCase().includes(searchLower) ||
        role.capabilities.some(cap => cap.toLowerCase().includes(searchLower));
      return matchesCategory && matchesSearch;
    });
  }, [data, searchQuery, activeCategory, defaultCategory]);

  // Group Logic (Group filtered list by category)
  const groupedRoles: Record<string, UserRole[]> = useMemo(() => {
    const groups = {};
    filteredRoles.forEach(role => {
      if (!groups[role.category]) {
        groups[role.category] = [];
      }
      groups[role.category].push(role);
    });
    return groups;
  }, [filteredRoles]);

  // Actions
  const handleSelectRole = (role) => {
    setSelectedRole(role);
    setIsOpen(false);
    if (onSelect) onSelect(role);
  };

  // Mapped Icon Function
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Software Engineering':
        return Code;
      case 'Creative':
        return Sparkles;
      case 'Business':
        return Briefcase;
      case 'Product':
        return Layers;
      case 'Design':
        return PenTool;
      case 'Academic':
        return GraduationCap;
      case 'General':
        return User;
      // Fallbacks
      case 'Security':
        return Shield;
      case 'DevOps':
        return Cpu;
      case 'Data Science':
        return BarChart3;
      default:
        return User;
    }
  };

  // Dynamic placeholder generation
  const placeholderText = searchPlaceholder || `Search ${data.length} roles by name, ID, or capability...`;

  return (
    <div className="relative z-50 w-full max-w-lg mx-auto font-sans">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="font-normal"
      >
        <div className="flex items-center gap-3 relative z-10">
          <div className="overflow-hidden">
            <div className="text-sm text-foreground truncate group-hover:text-primary transition-colors">
              {selectedRole ?
                <span><span className="font-light text-base mr-1">{selectedRole.name}</span>
                  <Badge variant="secondary" className="text-xs font-normal">{selectedRole.category}</Badge>
                </span> : 'Choose Role'}
            </div>
          </div>
        </div>
      </button>

      {/* Modal Overlay - Using Portal */}
      {isOpen && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Content */}
          <div
            ref={containerRef}
            className="relative w-full max-w-6xl h-[85vh] bg-background border border-border rounded-xl shadow-2xl flex flex-col overflow-hidden animate-fade-in"
          >
            {/* STICKY HEADER */}
            <div className="sticky top-0 z-20 bg-background/95 backdrop-blur border-b border-border">
              <div className="p-4 pb-0">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                      <User size={20} className="text-primary"/>
                      {modalTitle}
                    </h2>
                    <Badge variant="outline">{data.length}</Badge>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                    <X size={18}/>
                  </Button>
                </div>

                {/* Search Bar */}
                <div className="relative mb-4">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={16} className="text-muted-foreground"/>
                  </div>
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder={placeholderText}
                    className="w-full pl-10 pr-10 py-2 bg-secondary/50 border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground"
                    >
                      <X size={14}/>
                    </button>
                  )}
                </div>
              </div>

              {/* Horizontal Category Scroll Bar */}
              <div
                className="flex items-center gap-2 px-4 pb-3 overflow-x-auto overflow-y-hidden border-b border-border/50 custom-scrollbar">
                {categories.map(cat => {
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`
                                                        whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold border transition-all flex items-center gap-2 shrink-0
                                                        ${isActive
                        ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                        : 'bg-background border-border text-muted-foreground hover:bg-accent hover:text-foreground'
                      }
                                                    `}
                    >
                      <Icon Icon={getCategoryIcon(cat)} size={12}/>
                      {cat}
                      {cat !== defaultCategory && (
                        <span className={`text-[10px] px-1 rounded-full ${isActive ? 'bg-black/20' : 'bg-muted'}`}>
                          {data.filter(r => r.category === cat).length}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main Scrollable Grid Area */}
            <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 custom-scrollbar bg-background">
              {filteredRoles.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[300px] text-center">
                  <Search size={48} className="text-muted-foreground mb-4 opacity-50"/>
                  <h3 className="text-lg font-medium text-foreground">{emptyStateTitle}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {emptyStateDescription}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategory(defaultCategory);
                    }}
                  >
                    {clearFiltersText}
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {/* Results Info */}
                  <div className="flex items-center justify-between px-1">
                    <p className="text-xs font-medium text-muted-foreground">
                      Showing {filteredRoles.length} roles
                    </p>
                    {filteredRoles.length > 50 && (
                      <span className="text-[10px] text-muted-foreground animate-pulse flex items-center gap-1">
                        <Loader2 size={10} className="animate-spin"/> Scrolling large list
                      </span>
                    )}
                  </div>

                  {/* Render Grouped Categories */}
                  {Object.entries(groupedRoles).map(([category, roles]) => (
                    <div key={category} className="flex flex-col gap-3">
                      {/* Category Header */}
                      <div className="flex items-center gap-2 mb-1">
                        <Icon Icon={getCategoryIcon(category)} size={18} className="text-foreground"/>
                        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
                          {category}
                        </h3>
                        <div className="h-px bg-border flex-1 ml-2"/>
                        <Badge variant="secondary" className="text-[10px] h-5 px-1.5 rounded-full">
                          {roles.length}
                        </Badge>
                      </div>

                      {/* Grid for this category */}
                      <div
                        className={`grid gap-3 ${gridCols.sm} ${gridCols.md} ${gridCols.lg} ${gridCols.xl} ${gridCols['2xl']}`}>
                        {roles.map(role => (
                          <RoleCard
                            key={role.id}
                            role={role}
                            isSelected={selectedRole?.id === role.id}
                            onSelect={handleSelectRole}
                            getCategoryIcon={getCategoryIcon}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </main>

            {/* Footer */}
            <div className="p-3 border-t border-border bg-muted/30 flex justify-end">
              <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}>
                {closeText}
              </Button>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </div>
  );
};

export default RoleSelector;
