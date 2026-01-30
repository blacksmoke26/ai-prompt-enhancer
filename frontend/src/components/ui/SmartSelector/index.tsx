/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {ComponentType, SVGAttributes, useEffect, useMemo, useRef, useState} from 'react';
import * as RadioGroup from '@radix-ui/react-radio-group';
import {Search, Check, ChevronDown, ChevronRight} from 'lucide-react'; // Added Chevron icons

// utils
import {cn} from '~/utils/helpers';

/**
 * Preset sizes for component text and general layout.
 */
export type SmartSelectorSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Visual density variants.
 */
export type SmartSelectorVariant = 'tiny' | 'compact' | 'padded' | 'huge';

/**
 * Horizontal alignment for text content.
 */
export type SmartSelectorAlignment = 'left' | 'center' | 'right';

/**
 * Position of icon relative to text.
 */
export type SmartSelectorIconPosition = 'left' | 'right';

/**
 * Preset color themes.
 */
export type SmartSelectorTheme = 'blue' | 'emerald' | 'purple' | 'rose' | 'orange';

/**
 * Independent size for icons.
 */
export type SmartSelectorIconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * Margin gap between icon and text.
 */
export type SmartSelectorIconGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Type for Lucide (or similar) React icons.
 */
export type IconType = ComponentType<SVGAttributes<SVGSVGElement>>;

/**
 * Configuration for a specific Group/Category.
 */
export interface SmartSelectorGroupConfig {
  /** Display label for the group header. Defaults to the group key if not provided. */
  label?: string;
  /** Whether the group is collapsible. Defaults to true if groups are present. */
  collapsible?: boolean;
  /** Initial state of the group (open/closed). Defaults to true (open). */
  defaultOpen?: boolean;
  /** Whether to show the count of items in the group. Defaults to true. */
  showCount?: boolean;
  /** Custom icon for the group header (optional). */
  icon?: IconType;
}

/**
 * Generic Option Interface.
 */
export interface SmartSelectorOption<TValue extends string = string, TMeta = Record<string, unknown>> {
  /** Unique identifier for the option */
  value: TValue;
  /** Display label */
  label: string;
  /** Optional icon component */
  icon?: IconType;
  /** Optional secondary description text */
  description?: string;
  /** Disables individual item interaction */
  disabled?: boolean;
  /** Custom metadata */
  meta?: TMeta;
  /** The group/category key this option belongs to. Options without this are rendered at the top. */
  group?: string;
}

/**
 * Props passed to the custom `renderOption` function.
 */
export interface RenderOptionProps<TValue extends string> {
  option: SmartSelectorOption<TValue>;
  isSelected: boolean;
  iconNode: React.ReactNode;
  checkNode: React.ReactNode;
  onSelect: (value: TValue) => void;
}

/**
 * Main Props for SmartSelector.
 */
export interface SmartSelectorProps<TValue extends string> {
  options: SmartSelectorOption<TValue>[];
  value?: TValue;
  onChange: (value: TValue) => void;

  /** --- Grouping Configuration --- */
  /** Configuration object for groups. Keys match the `group` property in options. */
  groups?: Record<string, SmartSelectorGroupConfig>;
  /** Global setting to enable/disable group collapsing. */
  collapsibleGroups?: boolean;

  /** --- Sizing & Layout --- */
  size?: SmartSelectorSize;
  variant?: SmartSelectorVariant;
  alignment?: SmartSelectorAlignment;
  showEndingMargin?: boolean;

  /** --- Icons --- */
  iconPosition?: SmartSelectorIconPosition;
  iconSize?: SmartSelectorIconSize;
  iconGap?: SmartSelectorIconGap;

  /** --- Appearance --- */
  theme?: SmartSelectorTheme;
  showSearch?: boolean;
  showBorder?: boolean;
  searchPlaceholder?: string;

  /** --- Functionality --- */
  disabled?: boolean;
  visibleItems?: number;
  renderOption?: (props: RenderOptionProps<TValue>) => React.ReactNode;

  /** --- Customization --- */
  classNames?: {
    root?: string;
    searchInput?: string;
    list?: string;
    empty?: string;
    itemsWrapper?: string;
    groupHeader?: string;
    groupLabel?: string;
    groupCount?: string;
  };
  className?: string;
}

// --- Constants & Maps ---

const SIZE_MAP: Record<SmartSelectorSize, { text: string; desc: string; input: string; container: string; groupHeader: string }> = {
  xs: {text: 'text-[10px]', desc: 'text-[9px]', input: 'py-1 px-2 pl-7', container: 'gap-1', groupHeader: 'text-[10px] py-1 px-2'},
  sm: {text: 'text-xs', desc: 'text-[10px]', input: 'py-1.5 px-2.5 pl-8', container: 'gap-1.5', groupHeader: 'text-xs py-1.5 px-2.5'},
  md: {text: 'text-sm', desc: 'text-xs', input: 'py-2 px-3 pl-9', container: 'gap-2', groupHeader: 'text-sm py-2 px-3'},
  lg: {text: 'text-base', desc: 'text-sm', input: 'py-2.5 px-3.5 pl-10', container: 'gap-2.5', groupHeader: 'text-base py-2.5 px-3.5'},
  xl: {text: 'text-lg', desc: 'text-sm', input: 'py-3 px-4 pl-11', container: 'gap-3', groupHeader: 'text-lg py-3 px-4'},
};

const ICON_SIZE_MAP: Record<SmartSelectorIconSize, string> = {
  xs: 'w-4 h-4',
  sm: 'w-5 h-5',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-10 h-10',
  '2xl': 'w-12 h-12',
};

const ICON_GAP_MAP: Record<SmartSelectorIconGap, string> = {
  none: 'mr-0',
  xs: 'mr-2',
  sm: 'mr-3',
  md: 'mr-4',
  lg: 'mr-6',
  xl: 'mr-8',
};

const VARIANT_MAP: Record<SmartSelectorVariant, {
  item: string;
  iconContainer: string;
  check: string;
  desc: string
}> = {
  tiny: {
    item: 'py-1 px-2',
    iconContainer: 'bg-transparent dark:bg-transparent',
    check: 'w-3 h-3',
    desc: 'mt-0'
  },
  compact: {
    item: 'py-2 px-3',
    iconContainer: 'bg-zinc-100 dark:bg-zinc-800',
    check: 'w-4 h-4',
    desc: 'mt-0.5'
  },
  padded: {
    item: 'py-3 px-4',
    iconContainer: 'bg-zinc-100 dark:bg-zinc-800',
    check: 'w-5 h-5',
    desc: 'mt-1'
  },
  huge: {
    item: 'py-4 px-5',
    iconContainer: 'bg-zinc-100 dark:bg-zinc-800',
    check: 'w-6 h-6',
    desc: 'mt-1.5'
  },
};

const ALIGNMENT_MAP: Record<SmartSelectorAlignment, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

const THEME_MAP: Record<SmartSelectorTheme, { main: string; bg: string; bgHover: string; border: string }> = {
  blue: {main: 'text-blue-600 dark:text-blue-500', bg: 'bg-blue-600 dark:bg-blue-500', bgHover: 'bg-blue-100 dark:bg-blue-500/10', border: 'border-blue-600 dark:border-blue-500'},
  emerald: {main: 'text-emerald-600 dark:text-emerald-500', bg: 'bg-emerald-600 dark:bg-emerald-500', bgHover: 'bg-emerald-100 dark:bg-emerald-500/10', border: 'border-emerald-600 dark:border-emerald-500'},
  purple: {main: 'text-purple-600 dark:text-purple-500', bg: 'bg-purple-600 dark:bg-purple-500', bgHover: 'bg-purple-100 dark:bg-purple-500/10', border: 'border-purple-600 dark:border-purple-500'},
  rose: {main: 'text-rose-600 dark:text-rose-500', bg: 'bg-rose-600 dark:bg-rose-500', bgHover: 'bg-rose-100 dark:bg-rose-500/10', border: 'border-rose-600 dark:border-rose-500'},
  orange: {main: 'text-orange-600 dark:text-orange-500', bg: 'bg-orange-600 dark:bg-orange-500', bgHover: 'bg-orange-100 dark:bg-orange-500/10', border: 'border-orange-600 dark:border-orange-500'},
};

/**
 * SmartSelector Component
 */
const SmartSelector = <TValue extends string>(props: SmartSelectorProps<TValue>) => {
  const {
    options,
    value = undefined,
    onChange,
    size = 'sm',
    variant = 'compact',
    alignment = 'left',
    iconPosition = 'left',
    theme = 'blue',
    iconSize = 'md',
    iconGap = 'md',
    disabled = false,
    showSearch = true,
    showBorder = true,
    searchPlaceholder = 'Search...',
    visibleItems,
    renderOption,
    groups: groupsConfig = {},
    collapsibleGroups = true,
    classNames = {},
    className = '',
    showEndingMargin = false,
  } = props;

  const [searchQuery, setSearchQuery] = useState('');
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());

  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Auto-scroll to selected item
  useEffect(() => {
    if (value && itemRefs.current[value]) {
      itemRefs.current[value].scrollIntoView({behavior: 'smooth', block: 'nearest'});
    }
  }, [value]);

  const sizeConfig = SIZE_MAP[size];
  const variantConfig = VARIANT_MAP[variant];
  const themeConfig = THEME_MAP[theme];
  const alignmentClass = ALIGNMENT_MAP[alignment];
  const iconClass = ICON_SIZE_MAP[iconSize];

  // --- Advanced Grouping Logic ---

  const groupedData = useMemo(() => {
    // 1. Filter options first based on search query
    const filtered = options.filter((option) => {
      if (option.disabled) return false; // Or keep them but disable? Usually filter out disabled in search or keep. Let's keep but allow disabled selection to fail later, or filter. Standard is to filter out from interaction but keep visible? The previous code filtered them out: `if (option.disabled) return false;`. I will stick to that.
      const query = searchQuery.toLowerCase();
      return (
        option.label.toLowerCase().includes(query) ||
        option.value.toLowerCase().includes(query) ||
        (option.description && option.description.toLowerCase().includes(query))
      );
    });

    // 2. Separate into groups
    const map: Record<string, SmartSelectorOption<TValue>[]> = {};
    const ungrouped: SmartSelectorOption<TValue>[] = [];

    filtered.forEach(opt => {
      if (opt.group) {
        if (!map[opt.group]) map[opt.group] = [];
        map[opt.group].push(opt);
      } else {
        ungrouped.push(opt);
      }
    });

    return { map, ungrouped, hasGroups: Object.keys(map).length > 0 };
  }, [options, searchQuery]);

  // Initialize collapsed state based on config
  useEffect(() => {
    const initialCollapsed = new Set<string>();
    Object.keys(groupedData.map).forEach(groupKey => {
      const config = groupsConfig[groupKey];
      const isOpen = config?.defaultOpen !== false; // Default to open
      if (!isOpen) {
        initialCollapsed.add(groupKey);
      }
    });
    setCollapsedGroups(initialCollapsed);
  }, [JSON.stringify(groupsConfig)]); // Simple dependency check

  // When searching, expand all groups automatically
  const isSearching = searchQuery.length > 0;
  const isGroupCollapsed = (groupKey: string) => {
    if (isSearching) return false; // Always expand on search
    const config = groupsConfig[groupKey];
    const isCollapsible = config?.collapsible !== false && collapsibleGroups;
    return isCollapsible && collapsedGroups.has(groupKey);
  };

  const toggleGroup = (groupKey: string) => {
    setCollapsedGroups(prev => {
      const next = new Set(prev);
      if (next.has(groupKey)) {
        next.delete(groupKey);
      } else {
        next.add(groupKey);
      }
      return next;
    });
  };

  // --- Height Calculation ---
  const getHeightMultiplier = (): number => {
    const baseMultipliers: Record<SmartSelectorSize, number> = {xs: 28, sm: 32, md: 36, lg: 42, xl: 52};
    const variantMultipliers: Record<SmartSelectorVariant, number> = {tiny: 0.8, compact: 1.0, padded: 1.2, huge: 1.5};
    const iconHeights: Record<SmartSelectorIconSize, number> = {xs: 16, sm: 20, md: 24, lg: 32, xl: 40, '2xl': 48};

    const iconHeight = iconHeights[iconSize];
    return (baseMultipliers[size] * variantMultipliers[variant]) + (iconHeight * 0.8);
  };

  const listStyle = visibleItems
    ? ({maxHeight: `${visibleItems * getHeightMultiplier()}px`} as React.CSSProperties)
    : {};

  // Icon Gap Logic
  const rawGapClass = ICON_GAP_MAP[iconGap];
  const iconMarginClass = iconPosition === 'left' ? rawGapClass : rawGapClass.replace('mr-', 'ml-');

  /**
   * Default Item Renderer
   */
  const DefaultItemRenderer: React.FC<RenderOptionProps<TValue>> = (renderProps) => {
    const { option, isSelected, iconNode, onSelect } = renderProps;
    const isDisabled = disabled || option.disabled;

    const selectedBg = 'bg-zinc-100 dark:bg-zinc-900';
    const hoverBg = 'hover:bg-zinc-50 dark:hover:bg-zinc-800';
    const activeText = 'text-zinc-900 dark:text-zinc-200';
    const inactiveText = 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200';

    return (
      <div
        ref={(el) => { itemRefs.current[option.value] = el; }}
        onClick={() => !isDisabled && onSelect(option.value)}
        className={`
          group relative flex items-center justify-between rounded-lg transition-all duration-150
          ${isSelected
          ? `${selectedBg} ${showBorder ? 'border' : 'border-transparent'} ${themeConfig.border}`
          : `bg-transparent ${showBorder ? 'border-transparent hover:border-zinc-200 dark:hover:border-zinc-800' : 'border-transparent'} ${hoverBg}`
        }
          ${isDisabled ? 'opacity-50 cursor-not-allowed hover:bg-transparent hover:border-transparent' : ''}
          ${variantConfig.item}
        `}
      >
        {/* LEFT ICON */}
        {iconPosition === 'left' && iconNode && (
          <div
            className={`
              flex items-center justify-center rounded-md shrink-0
              ${isSelected ? `${themeConfig.bgHover} ${themeConfig.main}` : `${variantConfig.iconContainer} text-zinc-500 dark:text-muted-foreground group-hover:text-zinc-900 dark:group-hover:text-white`}
              ${iconClass}
              ${iconMarginClass}
            `}
          >
            {iconNode}
          </div>
        )}

        {/* TEXT CONTENT */}
        <div className="flex flex-col min-w-0 w-full">
          <span
            className={`
              truncate leading-tight block
              ${isSelected ? activeText : inactiveText}
              ${sizeConfig.text}
              ${alignmentClass}
            `}
          >
            {option.label}
          </span>
          {option.description && (
            <span
              className={`
                truncate opacity-70 leading-tight block
                ${sizeConfig.desc}
                ${variantConfig.desc}
                ${alignmentClass}
                ${isSelected ? 'text-zinc-600 dark:text-zinc-400' : 'text-zinc-500 dark:text-zinc-500'}
              `}
            >
              {option.description}
            </span>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className={`flex items-center shrink-0 ${iconPosition === 'left' ? 'pl-2' : ''} gap-2`}>
          {isSelected ? (
            <div className={`text-white rounded-full flex items-center justify-center shadow-sm shrink-0 ${variantConfig.check} ${themeConfig.bg}`}>
              <Check className="w-[60%] h-[60%]"/>
            </div>
          ) : (
            <div className={`rounded-full border-2 border-zinc-300 dark:border-zinc-700 group-hover:border-zinc-400 dark:group-hover:border-zinc-600 transition-colors shrink-0 ${variantConfig.check}`} />
          )}

          {iconPosition === 'right' && iconNode && (
            <div
              className={`
                flex items-center justify-center rounded-md
                ${isSelected ? `${themeConfig.bgHover} ${themeConfig.main}` : `${variantConfig.iconContainer} text-zinc-500 dark:text-muted group-hover:text-zinc-900 dark:group-hover:text-text`}
                ${iconClass}
                ${iconMarginClass}
              `}
            >
              {iconNode}
            </div>
          )}
        </div>
      </div>
    );
  };

  const ItemRenderer = renderOption || DefaultItemRenderer;

  /**
   * Renders a Group Header
   */
  const renderGroupHeader = (groupKey: string, count: number) => {
    const config = groupsConfig[groupKey] || {};
    const label = config.label || groupKey;
    const isCollapsed = isGroupCollapsed(groupKey);
    const canCollapse = config.collapsible !== false && collapsibleGroups;
    const showCount = config.showCount !== false;

    const IconComponent = config.icon;

    return (
      <div
        className={cn(
          'sticky top-0 z-10 flex items-center justify-between w-full select-none transition-colors',
          'bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm', // Sticky background
          'border-b border-zinc-100 dark:border-zinc-800',
          canCollapse ? 'cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50' : 'cursor-default',
          sizeConfig.groupHeader,
          classNames.groupHeader
        )}
        onClick={() => canCollapse && toggleGroup(groupKey)}
      >
        <div className="flex items-center gap-2">
          {canCollapse && (
            <div className="text-zinc-400">
              {isCollapsed ? <ChevronRight className="w-4 h-4"/> : <ChevronDown className="w-4 h-4"/>}
            </div>
          )}
          {IconComponent && <IconComponent className={cn('w-4 h-4', themeConfig.main)} />}
          <span className={cn('font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400', classNames.groupLabel)}>
            {label}
          </span>
        </div>
        {showCount && (
          <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400', classNames.groupCount)}>
            {count}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className={cn('flex flex-col', disabled ? 'opacity-50 pointer-events-none grayscale' : '', className)}>
      {/* Search Header */}
      {showSearch && (
        <div className="pb-3 mb-2 border-b border-zinc-200 dark:border-zinc-800">
          <div className="relative w-full">
            <Search
              className={`
                absolute top-1/2 -translate-y-1/2 text-zinc-500 dark:text-muted pointer-events-none
                ${size === 'xs' ? 'w-3 h-3 left-2' : 'w-4 h-4 left-3'}
              `}
            />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              className={cn(
                `w-full bg-zinc-50 dark:bg-background border border-zinc-200 dark:border-border rounded-md text-zinc-900 dark:text-gray-100 placeholder-zinc-500 dark:placeholder-muted focus:outline-none focus:border-blue-500 dark:focus:border-primary transition-colors ${sizeConfig.text} ${sizeConfig.input}`,
                classNames.searchInput
              )}
            />
          </div>
        </div>
      )}

      {/* List Area */}
      <div className={cn('overflow-y-auto custom-scrollbar pr-1', classNames.list)} style={listStyle}>
        {groupedData.ungrouped.length === 0 && Object.keys(groupedData.map).length === 0 ? (
          <div className={cn('flex flex-col items-center justify-center text-zinc-500 dark:text-muted py-6', classNames.empty)}>
            <span className={sizeConfig.text}>No results found</span>
          </div>
        ) : (
          <div className={cn('flex flex-col', sizeConfig.container, classNames.itemsWrapper)}>
            <RadioGroup.Root className="contents" value={value} onValueChange={(val) => onChange(val as TValue)}>

              {/* --- UNGROUPED ITEMS --- */}
              {groupedData.ungrouped.map((option) => {
                const isSelected = value === option.value;
                const IconComponent = option.icon;
                const iconNode = IconComponent ? <IconComponent className="w-full h-full"/> : null;

                return (
                  <RadioGroup.Item key={option.value} value={option.value} className="outline-none">
                    <ItemRenderer
                      option={option}
                      isSelected={isSelected}
                      iconNode={iconNode}
                      checkNode={null}
                      onSelect={onChange}
                    />
                  </RadioGroup.Item>
                );
              })}

              {/* --- GROUPED ITEMS --- */}
              {Object.entries(groupedData.map).map(([groupKey, groupOptions]) => {
                const isCollapsed = isGroupCollapsed(groupKey);

                // Don't render empty groups (e.g., if search filtered everything out of it)
                if (groupOptions.length === 0) return null;

                return (
                  <div key={groupKey} className="flex flex-col w-full">
                    {renderGroupHeader(groupKey, groupOptions.length)}

                    {!isCollapsed && (
                      <div className="flex flex-col w-full">
                        {groupOptions.map((option) => {
                          const isSelected = value === option.value;
                          const IconComponent = option.icon;
                          const iconNode = IconComponent ? <IconComponent className="w-full h-full"/> : null;

                          return (
                            <RadioGroup.Item key={option.value} value={option.value} className="outline-none">
                              <ItemRenderer
                                option={option}
                                isSelected={isSelected}
                                iconNode={iconNode}
                                checkNode={null}
                                onSelect={onChange}
                              />
                            </RadioGroup.Item>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}

            </RadioGroup.Root>
            {showEndingMargin && <div className={`h-${size === 'xs' ? '2' : '4'}`} aria-hidden="true"></div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartSelector;
