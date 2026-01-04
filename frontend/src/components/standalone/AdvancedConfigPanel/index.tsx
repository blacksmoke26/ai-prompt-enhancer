/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {CSSProperties, useEffect, useMemo, useRef, useState} from 'react';
import {Global, css} from '@emotion/react';
import {
  Check,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Filter,
  LayoutGrid,
  List,
  Minus,
  Pin,
  PinOff,
  Plus,
  RotateCcw,
  Search,
  Settings,
  X,
} from 'lucide-react';
import {Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

// ui components
import {Card, CardContent, CardHeader, CardTitle} from '~/components/ui/Card';
import {Badge} from '~/components/ui/Badge';
import {Button} from '~/components/ui/Button';
import {Input} from '~/components/ui/Input';
import {Switch} from '~/components/ui/Switch';

/**
 * Represents a generic configuration item with metadata and flexible properties.
 * @example
 * const item: GenericConfigItem = {
 *   id: 'theme-dark',
 *   name: 'Dark Theme',
 *   category: 'Appearance',
 *   hidden: false,
 *   value: 1,
 *   metadata: { priority: 'high' }
 * };
 * @developerNotes
 * This interface allows additional properties via the [key: string]: any index signature.
 */
export interface GenericConfigItem {
  /** Unique identifier for the configuration item */
  id: string;
  /** Human-readable name of the configuration item */
  name: string;
  /** Optional description providing additional context */
  description?: string;
  /** Category grouping for organizational purposes */
  category: string;
  /** Whether the item should be hidden from UI */
  hidden: boolean;
  /** Optional numeric value associated with the item */
  value?: number;
  /** Optional metadata store for arbitrary key-value pairs */
  metadata?: Record<string, any>;

  /** Allows additional custom properties */
  [key: string]: any;
}


/**
 * Props interface for an advanced configuration panel component.
 * @template T - Type of configuration items, must extend GenericConfigItem
 * @example
 * const panelProps: AdvancedConfigPanelProps<GenericConfigItem> = {
 *   items: [...],
 *   selectedId: 'theme-dark',
 *   onSelect: (id) => console.log('Selected:', id),
 *   categorySort: 'name',
 *   enableMultiSelect: true
 * };
 * @developerNotes
 * This interface is designed for maximum extensibility while maintaining core functionality.
 * Ensure prop types align with your component's implementation requirements.
 */
export interface AdvancedConfigPanelProps<T extends GenericConfigItem> {
  /**
   * Core data and behavior props.
   */
  /**
   * Array of configuration items to display.
   */
  items: T[];

  /**
   * ID of currently selected item.
   */
  selectedId: string | undefined;

  /**
   * Handler for item selection.
   * @param {string} id - Selected item ID
   */
  onSelect(id: string): void;

  /**
   * Handler for visibility toggle.
   * @param {string} id - Item ID
   * @param {boolean} isVisible - New visibility state
   */
  onToggleVisibility(id: string, isVisible: boolean): void;

  /**
   * Optional bulk update handler.
   * @param {string[]} ids - Array of item IDs
   * @param {Partial<T>} updates - Partial item updates
   */
  onBulkUpdate?(ids: string[], updates: Partial<T>): void;

  /**
   * Text-related UI props.
   */
  /**
   * Panel title text.
   */
  title?: string;

  /**
   * Optional icon to display with title.
   */
  titleIcon?: React.ReactNode;

  /**
   * Placeholder text for search input.
   */
  searchPlaceholder?: string;

  /**
   * Label for empty state message.
   */
  emptyStateLabel?: string;

  /**
   * Description for empty state message.
   */
  emptyStateDescription?: string;

  /**
   * Feature toggle props.
   */
  /**
   * Enable chart visualization.
   */
  enableChart?: boolean;

  /**
   * Enable layout toggle between grid/list.
   */
  enableLayoutToggle?: boolean;

  /**
   * Enable multi-select capability.
   */
  enableMultiSelect?: boolean;

  /**
   * Enable pinning functionality.
   */
  enablePinning?: boolean;

  /**
   * Enable tilt effect on hover.
   */
  enableTiltEffect?: boolean;

  /**
   * Allow bulk actions on items.
   */
  allowBulkActions?: boolean;

  /**
   * Configuration props.
   */
  /**
   * Sorting strategy for categories.
   */
  categorySort?: 'default' | 'name' | 'count-desc' | 'count-asc';

  /**
   * Initial expanded state for categories.
   */
  initialExpanded?: boolean;

  /**
   * Visual styling props.
   */
  /**
   * Primary color for UI elements.
   */
  primaryColor?: string;

  /**
   * UI density level.
   */
  density?: 'compact' | 'comfortable' | 'spacious';

  /**
   * Card style variant.
   */
  cardVariant?: 'default' | 'glass' | 'outlined';

  /**
   * Card border radius level.
   */
  cardBorderRadius?: 'none' | 'sm' | 'md' | 'lg';

  /**
   * Custom rendering props.
   */
  /**
   * Custom content for card extra area.
   * @param {T} item - Current item
   */
  renderCardExtra?: (item: T) => React.ReactNode;

  /**
   * Custom content for card header action.
   * @param {T} item - Current item
   */
  renderCardHeaderAction?(item: T): React.ReactNode;

  /**
   * Custom empty state rendering.
   */
  renderEmptyState?(): React.ReactNode;

  /**
   * Event handler for category clicks.
   * @param {string} category - Selected category
   */
  onCategoryClick?(category: string): void;

  /**
   * Event handler for search input.
   * @param {string} term - Search term
   */
  onSearch?(term: string): void;
}

/**
 * A predefined color map containing HSL values for various named colors.
 * @constant {Record<string, {h: number; s: number; l: number}>} COLOR_MAP
 * @example
 * // Accessing the HSL value for 'blue'
 * const blueHSL = COLOR_MAP.blue; // {h: 221.2, s: 83.2, l: 53.3}
 * @developerNotes
 * This map is useful for consistent color representation across themes or visualizations.
 * Additional colors can be added by extending the object with new key-value pairs.
 */
const COLOR_MAP: Record<string, { h: number; s: number; l: number }> = {
  blue: {h: 221.2, s: 83.2, l: 53.3},
  green: {h: 142.1, s: 76.2, l: 36.3},
  violet: {h: 263.4, s: 70, l: 50.4},
  orange: {h: 24.6, s: 95, l: 53.1},
  red: {h: 346.8, s: 77.2, l: 49.8},
  slate: {h: 215, s: 16, l: 47},
};

/**
 * A custom tooltip component for rendering data visualizations.
 * @component
 * @param {boolean} active - Indicates if the tooltip is currently active.
 * @param {any} payload - Data payload containing information to display.
 * @example
 * // Usage in a React chart component
 * <Tooltip content={<CustomTooltip active={true} payload={data} />} />
 * @developerNotes
 * This component is designed to work with charting libraries like Recharts.
 * Ensure payload contains the expected structure for proper rendering.
 */
const CustomTooltip = ({active, payload}: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover text-popover-foreground border border-border rounded-lg shadow-lg px-3 py-2 text-xs">
        <p className="font-bold">{payload[0].name}</p>
        <p className="text-muted-foreground">Count: {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

/**
 * A chart component visualizing the distribution of visible vs hidden configuration items.
 * @component
 * @example
 * <VisibilityStatsChart items={configItems} />
 * @developerNotes
 * This is Chart 1 in the series and serves as the replacement for the original visibility stats visualization.
 * It leverages the `hidden` property from GenericConfigItem to compute the distribution.
 * Ensure that the items array contains at least one visible and one hidden item for meaningful visualization.
 */

const VisibilityStatsChart = ({items}: { items: GenericConfigItem[] }) => {
  const data = useMemo(() => {
    const visible = items.filter(i => !i.hidden).length;
    const hidden = items.filter(i => i.hidden).length;
    return [
      {name: 'Visible', value: visible, color: 'hsl(var(--primary))'},
      {name: 'Hidden', value: hidden, color: 'hsl(var(--muted))'},
    ];
  }, [items]);

  const totalCount = items.length;
  const visiblePercent = Math.round((data[0].value / totalCount) * 100) || 0;

  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative">
      <ResponsiveContainer width="100%" height="100%" className="absolute inset-0">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={24}
            outerRadius={40}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color}/>
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      {/* Center Text */}
      <div className="flex flex-col items-center pointer-events-none z-10">
        <span className="text-xs font-bold text-foreground">{visiblePercent}%</span>
        <span className="text-[9px] text-muted-foreground uppercase">Visible</span>
      </div>
      {/* Legend below */}
      <div className="flex gap-4 mt-20 text-[10px] font-medium">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-primary"/>
          <span className="text-foreground">Visible ({data[0].value})</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-muted"/>
          <span className="text-muted-foreground">Hidden ({data[1].value})</span>
        </div>
      </div>
    </div>
  );
};

/**
 * A bar chart visualizing the distribution of configuration items across categories.
 * @component
 * @example
 * <CategoryChart items={configItems} />
 * @developerNotes
 * This chart groups items by their `category` property and displays them as bars.
 * Ensure the `items` array contains at least one item per category for meaningful visualization.
 * The chart may use a library like Recharts or Chart.js for rendering.
 */
const CategoryChart = ({items}: { items: GenericConfigItem[] }) => {
  const data = useMemo(() => {
    const cats: Record<string, number> = {};
    items.forEach(i => cats[i.category] = (cats[i.category] || 0) + 1);
    return Object.entries(cats)
      .map(([name, value]) => ({name, value}))
      .sort((a, b) => b.value - a.value) // Sort desc
      .slice(0, 5); // Top 5
  }, [items]);

  return (
    <div className="w-full h-full flex items-center">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="4 3" horizontal={true} vertical={false} stroke="hsl(var(--border))"/>
          <XAxis type="number" hide/>
          <YAxis
            dataKey="name"
            type="category"
            axisLine={false}
            tickLine={false}
            tick={{fontSize: 11, fill: 'hsl(var(--muted-foreground))'}}
            width={80}
          />
          <Tooltip content={<CustomTooltip/>}/>
          <Bar
            dataKey="value"
            fill="hsl(var(--primary))"
            radius={[0, 4, 4, 0]}
            barSize={12}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

/**
 * Props interface for the `BulkActionBar` component.
 * @typedef {Object} BulkActionBarProps
 */
interface BulkActionBarProps {
  /** Number of currently selected items */
  count: number;

  /** Handler to clear all selected items */
  onClear(): void;

  /** Handler to hide all selected items */
  onBulkHide(): void;

  /** Handler to show all selected items */
  onBulkShow(): void;
}

/**
 * A UI component for performing bulk actions on selected items (hide, show, clear selection).
 * @component
 * @example
 * import { BulkActionBar } from './components/BulkActionBar';
 *
 * <BulkActionBar
 *   count={3}
 *   onClear={() => setSelectedItems([])}
 *   onBulkHide={() => setSelectedItems(prev => prev.filter(item => !item.hidden))}
 *   onBulkShow={() => setSelectedItems(prev => prev.filter(item => item.hidden))}
 * />
 * @developerNotes
 * This component assumes a selection context is managed externally. The `count` prop should reflect the number of currently selected items. Action handlers (`onBulkHide`, `onBulkShow`, `onClear`) should be implemented to update the selection state accordingly.
 */
const BulkActionBar: React.FC<BulkActionBarProps> = (props) => {
  const {
    count = 0,
    onClear = () => {
    },
    onBulkHide = () => {
    },
    onBulkShow = () => {
    },
  } = props;

  return (
    <div
      className="animate-in slide-in-from-bottom-4 fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 bg-background/90 backdrop-blur-xl border border-border shadow-2xl px-6 py-3 rounded-full">
      <div className="flex items-center gap-2">
        <span
          className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">{count}</span>
        <span className="text-sm font-medium text-foreground">Selected</span>
      </div>
      <div className="h-4 w-px bg-border"/>
      <div className="flex gap-2">
        <Button size="sm" variant="ghost" onClick={onBulkShow} className="h-8 gap-2">
          <Eye className="w-3 h-3"/> Show All
        </Button>
        <Button size="sm" variant="ghost" onClick={onBulkHide} className="h-8 gap-2">
          <EyeOff className="w-3 h-3"/> Hide All
        </Button>
      </div>
      <Button size="sm" variant="ghost" onClick={onClear} className="h-8 w-8 p-0 rounded-full">
        <X className="w-4 h-4"/>
      </Button>
    </div>
  );
};

/**
 * A reusable card component with a tilt effect on hover, controlled via the `enabled` prop.
 * @component
 * @example
 * <TiltCard enabled={true}>
 *   <div className="card-content">Hover me to see the tilt effect!</div>
 * </TiltCard>
 * @developerNotes
 * This component relies on a tilt effect library (e.g., react-tilt) for the animation.
 * Ensure `enabled` is set to `true` to activate the tilt effect, and use `style` or `className`
 * for custom styling or layout adjustments.
 */
const TiltCard: React.FC<{
  children: React.ReactNode;
  enabled: boolean;
  className?: string;
  style?: CSSProperties;
}> = ({children, enabled, className, style}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !enabled) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -3; // Reduced intensity
    const rotateY = ((x - centerX) / centerX) * 3;
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`);
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0) rotateY(0) scale(1)');
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{...style, transition: 'transform 0.1s ease-out', transform: enabled ? transform : undefined}}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

/**
 * A highly customizable configuration panel for managing and visualizing configuration items with advanced features.
 * @component
 * @example

 * const configItems: GenericConfigItem[] = [...];
 *
 * <AdvancedConfigPanel<GenericConfigItem>
 *   items={configItems}
 *   selectedId="theme-dark"
 *   onSelect={(id) => console.log('Selected ID:', id)}
 *   onToggleVisibility={(id, isVisible) => console.log('Toggled visibility for', id, 'to', isVisible)}
 *   enableMultiSelect={true}
 *   categorySort="name"
 * />
 * @developerNotes
 * This component is designed for extensibility and can be customized with props for features, visuals, and behavior.
 * Ensure that all required props are provided, and that the generic type `T` is correctly specified based on your configuration item structure.
 */
const AdvancedConfigPanel = <T extends GenericConfigItem>(props: AdvancedConfigPanelProps<T>) => {
  const {
    items,
    selectedId,
    onSelect,
    onToggleVisibility,
    onBulkUpdate,
    title = 'Configuration',
    titleIcon,
    searchPlaceholder = 'Search...',
    emptyStateLabel,
    emptyStateDescription,
    enableChart = true,
    enableLayoutToggle = true,
    enableMultiSelect = false,
    enablePinning = false,
    enableTiltEffect = false,
    allowBulkActions = true,
    categorySort = 'default',
    initialExpanded = true,
    primaryColor = 'blue',
    density = 'comfortable',
    cardVariant = 'default',
    cardBorderRadius = 'lg',
    renderCardExtra,
    renderCardHeaderAction,
    renderEmptyState,
    onCategoryClick,
    onSearch,
  } = props;

  // --- State ---
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [showHidden, setShowHidden] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [pinnedCategories, setPinnedCategories] = useState<Set<string>>(new Set());

  // --- Derived State ---
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.description?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch && (showHidden || !item.hidden);
    });
  }, [items, searchTerm, showHidden]);

  const groupedItems = useMemo(() => {
    const groups: Record<string, T[]> = {};
    filteredItems.forEach(item => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    });

    let sortedKeys = Object.keys(groups);
    if (categorySort === 'name') sortedKeys.sort((a, b) => a.localeCompare(b));
    else if (categorySort === 'count-desc' || categorySort === 'count-asc') {
      sortedKeys.sort((a, b) => {
        const diff = groups[b].length - groups[a].length;
        return categorySort === 'count-desc' ? diff : -diff;
      });
    }

    if (pinnedCategories.size > 0) {
      sortedKeys = sortedKeys.sort((a, b) => {
        const aPinned = pinnedCategories.has(a);
        const bPinned = pinnedCategories.has(b);
        if (aPinned && !bPinned) return -1;
        if (!aPinned && bPinned) return 1;
        return 0;
      });
    }

    const sortedGroups: Record<string, T[]> = {};
    sortedKeys.forEach(key => sortedGroups[key] = groups[key]);
    return sortedGroups;
  }, [filteredItems, categorySort, pinnedCategories]);

  // --- Effects ---
  useEffect(() => {
    if (searchTerm.trim() !== '') {
      const newExpanded: Record<string, boolean> = {};
      Object.keys(groupedItems).forEach(k => newExpanded[k] = true);
      setExpandedCategories(newExpanded);
    }
  }, [searchTerm, groupedItems]);

  useEffect(() => {
    if (initialExpanded) {
      const newExpanded: Record<string, boolean> = {};
      Object.keys(groupedItems).forEach(k => newExpanded[k] = true);
      setExpandedCategories(newExpanded);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialExpanded]);

  useEffect(() => {
    if (onSearch) onSearch(searchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  // --- Handlers ---
  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({...prev, [category]: !prev[category]}));
    if (onCategoryClick) onCategoryClick(category);
  };
  const togglePin = (category: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPinnedCategories(prev => {
      const next = new Set(prev);
      if (next.has(category)) next.delete(category); else next.add(category);
      return next;
    });
  };
  const toggleSelect = (id: string) => {
    if (!enableMultiSelect) return;
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };
  const isSelected = (id: string) => selectedIds.has(id);
  const handleBulkHide = () => {
    if (!onBulkUpdate) return;
    onBulkUpdate(Array.from(selectedIds), {hidden: true} as T);
    setSelectedIds(new Set());
  };
  const handleBulkShow = () => {
    if (!onBulkUpdate) return;
    onBulkUpdate(Array.from(selectedIds), {hidden: false} as T);
    setSelectedIds(new Set());
  };

  // --- Styles ---
  const themeStyles = useMemo(() => {
    const color = COLOR_MAP[primaryColor] || COLOR_MAP.blue;
    return {
      '--primary': `${color.h} ${color.s}% ${color.l}%`,
      '--primary-foreground': '210 40% 98%',
      '--ring': `${color.h} ${color.s}% calc(${color.l}% + 40%)`,
    } as CSSProperties;
  }, [primaryColor]);

  const getAnimationDelay = (index: number) => ({animationDelay: `${index * 30}ms`});

  return (
    <div className="w-full mx-auto space-y-6 p-1 advanced-config-panel-wrapper" style={themeStyles}>
      <Global styles={css`
          @keyframes fadeInSlideUp {
              from {
                  opacity: 0;
                  transform: translateY(10px) scale(0.98);
              }
              to {
                  opacity: 1;
                  transform: translateY(0) scale(1);
              }
          }

          .advanced-config-panel-wrapper {
              --chart-0: hsl(var(--primary));
              --chart-1: hsl(var(--muted-foreground));
              --chart-2: hsl(142.1 76.2% 36.3%);
          }

          ::-webkit-scrollbar {
              width: 8px;
              height: 8px;
          }

          ::-webkit-scrollbar-track {
              background: transparent;
          }

          ::-webkit-scrollbar-thumb {
              background: hsl(var(--border));
              border-radius: 4px;
          }

          ::-webkit-scrollbar-thumb:hover {
              background: hsl(var(--muted-foreground));
          }
      `}></Global>

      {/* --- HEADER --- */}
      <div
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-border">
        <div className="flex items-center gap-4">
          <div
            className={`p-3 rounded-2xl bg-primary/10 text-primary shadow-sm ring-1 ring-inset ring-primary/20 transition-transform hover:scale-105 duration-300`}>
            {titleIcon || <Settings className="w-6 h-6"/>}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">{title}</h2>
              {pinnedCategories.size > 0 &&
                <Badge variant="outline" className="text-[10px] border-primary/50 text-primary animate-pulse"><Pin
                  className="w-2.5 h-2.5 mr-1"/> {pinnedCategories.size} Pinned</Badge>}
            </div>
            <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
              <span
                className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded border border-border">{items.length} / {filteredItems.length} ITEMS</span>
              <span className="text-muted-foreground/50">•</span>
              <span className="text-xs capitalize">{density} View</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {enableLayoutToggle && (
            <div className="flex bg-muted/50 p-1 rounded-lg border border-border/50">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'} size="sm"
                className="h-8 w-8 p-0 transition-all" onClick={() => setViewMode('grid')}><LayoutGrid
                className="w-4 h-4"/></Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'} size="sm"
                className="h-8 w-8 p-0 transition-all" onClick={() => setViewMode('list')}><List
                className="w-4 h-4"/></Button>
            </div>
          )}
          {enableMultiSelect && <Button
            variant={selectedIds.size > 0 ? 'default' : 'outline'} size="sm"
            onClick={() => setSelectedIds(new Set())}>{selectedIds.size > 0 ? `Clear (${selectedIds.size})` : 'Multi-Select'}</Button>}
        </div>
      </div>

      {/* --- TOOLBAR --- */}
      <div
        className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl py-4 -mx-4 px-4 border-b border-border transition-all duration-300 shadow-sm">
        <div className="flex flex-col xl:flex-row gap-4 justify-between items-center">
          <div className="relative w-full xl:w-[400px] group">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors"/>
            <Input placeholder={searchPlaceholder}
                   className="pl-10 h-10 w-full bg-muted/50 border-input focus-visible:ring-primary/50 transition-all"
                   value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
          </div>
          <div className="flex items-center flex-wrap gap-3 justify-center xl:justify-end w-full xl:w-auto">
            <div
              className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-full border border-border hover:border-primary/50 transition-colors">
              <Switch id="show-hidden" checked={showHidden} onCheckedChange={setShowHidden}/>
              <label htmlFor="show-hidden"
                     className="text-xs font-medium cursor-pointer select-none whitespace-nowrap">{showHidden ? 'Show All' : 'Active Only'}</label>
            </div>
            <div className="h-5 w-px bg-border hidden xl:block"/>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setExpandedCategories(Object.keys(groupedItems).reduce((acc, k) => ({
                  ...acc,
                  [k]: true,
                }), {}));
              }} className="text-xs text-muted-foreground hover:text-primary gap-1"><Plus
              className="w-3 h-3"/> Expand</Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setExpandedCategories(Object.keys(groupedItems).reduce((acc, k) => ({
                  ...acc,
                  [k]: false,
                }), {}));
              }}
              className="text-xs text-muted-foreground hover:text-primary gap-1"><Minus
              className="w-3 h-3"/> Collapse</Button>
          </div>
        </div>
      </div>

      {/* --- WORKING CHARTS SECTION --- */}
      {enableChart && !searchTerm && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

          {/* Chart 1: Category Distribution */}
          <Card
            className={`md:col-span-2 border-border ${cardVariant === 'glass' ? 'bg-background/40 backdrop-blur-sm' : 'bg-card'} shadow-sm h-40`}>
            <CardHeader className="pb-2 px-4 pt-4">
              <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Top
                Categories</CardTitle>
            </CardHeader>
            <CardContent className="h-24 px-4 pb-4">
              <CategoryChart items={filteredItems}/>
            </CardContent>
          </Card>

          {/* Chart 2: Visibility Stats (Hidden/Visible) - The Replacement */}
          <Card
            className={`border-border ${cardVariant === 'glass' ? 'bg-background/40 backdrop-blur-sm' : 'bg-card'} shadow-sm h-40`}>
            <CardHeader className="pb-2 px-4 pt-4">
              <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider text-right">Visibility
                Status</CardTitle>
            </CardHeader>
            <CardContent className="h-24 px-4 pb-4">
              <VisibilityStatsChart items={items}/>
            </CardContent>
          </Card>

        </div>
      )}

      {/* --- CONTENT LIST --- */}
      {filteredItems.length === 0 ? (
        <div
          className="min-h-[400px] flex flex-col items-center justify-center text-center border border-dashed border-border rounded-xl bg-muted/20">
          {renderEmptyState ? renderEmptyState() : (
            <>
              <div className="bg-muted p-4 rounded-full mb-4 ring-8 ring-background"><Filter
                className="w-8 h-8 text-muted-foreground"/></div>
              <h3 className="text-lg font-medium text-foreground">{emptyStateLabel || 'No items found'}</h3>
              <p
                className="text-sm text-muted-foreground mt-1 max-w-sm">{emptyStateDescription || 'Try adjusting your filters or search terms.'}</p>
              {searchTerm && <Button variant="link" onClick={() => setSearchTerm('')} className="mt-4"><RotateCcw
                className="w-3 h-3 mr-1"/> Clear Search</Button>}
            </>
          )}
        </div>
      ) : (
        <div className="space-y-6 pb-20">
          {Object.entries(groupedItems).map(([category, categoryItems], catIndex) => {
            const isPinned = pinnedCategories.has(category);
            const isExpanded = expandedCategories[category] ?? initialExpanded;
            return (
              <div key={category} className="group/category animate-in fade-in slide-in-from-bottom-4 duration-500"
                   style={getAnimationDelay(catIndex * 0.1)}>
                <div
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all border border-transparent ${isExpanded ? 'bg-accent/50 hover:bg-accent border-border/50' : 'hover:bg-muted/30'}`}
                  onClick={() => toggleCategory(category)}>
                  <div className="flex items-center gap-3">
                    {enablePinning && <button onClick={(e) => togglePin(category, e)}
                                              className="text-muted-foreground hover:text-primary transition-colors">{isPinned ?
                      <Pin className="w-3.5 h-3.5 fill-primary"/> : <PinOff className="w-3.5 h-3.5"/>}</button>}
                    <div
                      className={`w-1 h-6 rounded-full bg-primary transition-all ${isExpanded ? 'h-8 shadow-[0_0_8px_hsl(var(--primary)/0.5)]' : ''}`}/>
                    <h3
                      className={`font-semibold transition-colors ${isExpanded ? 'text-foreground' : 'text-muted-foreground'}`}>{category}</h3>
                    <Badge variant="secondary"
                           className="text-[10px] h-5 px-1.5 font-mono border-border">{categoryItems.length}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium hidden sm:block">{categoryItems.filter(i => !i.hidden).length} Active</span>
                    <Button variant="ghost" size="sm"
                            className="h-6 w-6 p-0 text-muted-foreground hover:bg-transparent">{isExpanded ?
                      <ChevronUp className="w-4 h-4"/> : <ChevronDown className="w-4 h-4"/>}</Button>
                  </div>
                </div>
                {isExpanded && (
                  <div className="mt-3 animate-in slide-in-from-top-2 duration-300">
                    <div
                      className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4' : 'flex flex-col gap-2'}>
                      {categoryItems.map((item, index) => {
                        const isActive = selectedId === item.id;
                        const isMultiSelected = isSelected(item.id);
                        return (
                          <TiltCard key={item.id} enabled={enableTiltEffect} className="relative h-full">
                            <Card
                              className={`relative h-full overflow-hidden transition-all duration-300 cursor-pointer border group/card ${cardVariant === 'glass' ? 'bg-card/50 backdrop-blur-sm' : 'bg-card'} ${isActive ? 'ring-2 ring-primary bg-primary/5 border-primary' : isMultiSelected ? 'ring-2 ring-ring bg-accent border-ring' : 'border-border hover:border-primary/50 hover:shadow-md'} rounded-${cardBorderRadius}`}
                              onClick={(e) => {
                                if (e.target instanceof HTMLElement && e.target.closest('button, input, label')) return;
                                if (enableMultiSelect) toggleSelect(item.id); else onSelect(item.id);
                              }} style={getAnimationDelay(index * 0.05)}>
                              {enableMultiSelect && <div className="absolute top-3 left-3 z-10">
                                <div
                                  className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isMultiSelected ? 'bg-primary border-primary text-primary-foreground' : 'bg-background border-muted-foreground'}`}>{isMultiSelected &&
                                  <Check className="w-3 h-3"/>}</div>
                              </div>}
                              <div
                                className={`absolute left-0 top-0 bottom-0 w-1 bg-primary transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover/card:opacity-50'}`}/>
                              <CardHeader className={`pb-2 ${isMultiSelected ? 'pl-10' : ''}`}>
                                <div className="flex justify-between items-start gap-2">
                                  <div className={`space-y-1 ${isMultiSelected ? 'opacity-50' : 'opacity-100'}`}>
                                    <CardTitle
                                      className={`text-sm font-bold ${isActive ? 'text-primary' : 'text-foreground'}`}>{item.name}</CardTitle>
                                    <div className="flex items-center gap-2">{item.hidden && <Badge variant="secondary"
                                                                                                    className="text-[10px] border border-border text-muted-foreground flex items-center gap-1 px-1.5 py-0 bg-muted/50"><EyeOff
                                      className="w-2.5 h-2.5"/> Hidden</Badge>}</div>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    {renderCardHeaderAction?.(item)}
                                    <Switch
                                      checked={!item.hidden}
                                      onCheckedChange={(checked) => onToggleVisibility(item.id, checked)}
                                      onClick={(e) => e.stopPropagation()}/>
                                  </div>
                                </div>
                              </CardHeader>
                              <CardContent className={`pt-0 ${isMultiSelected ? 'pl-10' : ''}`}>
                                <p
                                  className={`text-xs text-muted-foreground line-clamp-2 leading-relaxed ${density === 'compact' ? 'min-h-[2.5em]' : 'min-h-[3em]'}`}>{item.description || 'No description provided.'}</p>
                                {renderCardExtra && renderCardExtra(item)}
                              </CardContent>
                            </Card>
                          </TiltCard>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {allowBulkActions && selectedIds.size > 0 &&
        <BulkActionBar
          count={selectedIds.size}
          onClear={() => setSelectedIds(new Set())} onBulkHide={handleBulkHide}
          onBulkShow={handleBulkShow}/>}
    </div>
  );
};

export default AdvancedConfigPanel;
