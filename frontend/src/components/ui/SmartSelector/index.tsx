/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {ComponentType, SVGAttributes, useEffect, useRef, useState} from 'react';
import * as RadioGroup from '@radix-ui/react-radio-group';
import {Search, Check} from 'lucide-react'; // Lucide Icons

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
 * Theme Mode (Light or Dark).
 */
export type SmartSelectorThemeMode = 'light' | 'dark';

/**
 * Type for Lucide (or similar) React icons.
 * @example
 * import { Search } from 'lucide-react';
 * // Search satisfies IconType
 */
export type IconType = ComponentType<SVGAttributes<SVGSVGElement>>;

/**
 * Generic Option Interface.
 * Extends this interface to add custom metadata if needed, though the generic `TMeta` supports this.
 *
 * @template TValue - The type of value (usually string or number).
 * @template TMeta - Additional metadata attached to the option (optional).
 */
export interface SmartSelectorOption<TValue extends string = string, TMeta = Record<string, unknown>> {
  /** Unique identifier for the option */
  value: TValue;
  /** Display label */
  label: string;
  /** Optional icon component (e.g., from lucide-react) */
  icon?: IconType;
  /** Optional secondary description text */
  description?: string;
  /** Disables individual item interaction */
  disabled?: boolean;
  /** Custom metadata passed to the renderOption prop */
  meta?: TMeta;
}

/**
 * Props passed to the custom `renderOption` function.
 */
export interface RenderOptionProps<TValue extends string> {
  /** The option data object */
  option: SmartSelectorOption<TValue>;
  /** Is this item currently selected */
  isSelected: boolean;
  /** The pre-rendered icon node (or null) */
  iconNode: React.ReactNode;
  /** The pre-rendered checkmark node */
  checkNode: React.ReactNode;
  /** Callback to trigger selection */
  onSelect: (value: TValue) => void;
}

/**
 * Main Props for SmartSelector.
 *
 * @template TValue - The value type of the options.
 */
export interface SmartSelectorProps<TValue extends string> {
  /** Array of options to display */
  options: SmartSelectorOption<TValue>[];
  /** Currently selected value */
  value: TValue;
  /** Callback when selection changes */
  onChange: (value: TValue) => void;

  /** --- Sizing & Layout --- */
  /** Size of text and inputs (default: 'sm') */
  size?: SmartSelectorSize;
  /** Padding density (default: 'compact') */
  variant?: SmartSelectorVariant;
  /** Text alignment (default: 'left') */
  alignment?: SmartSelectorAlignment;

  /** --- Icons --- */
  /** Where to place the icon (default: 'left') */
  iconPosition?: SmartSelectorIconPosition;
  /** Specific size for icons independent of text (default: 'md') */
  iconSize?: SmartSelectorIconSize;
  /** Space between icon and text (default: 'md') */
  iconGap?: SmartSelectorIconGap;

  /** --- Appearance --- */
  /** Color theme (default: 'blue') */
  theme?: SmartSelectorTheme;
  /** Theme mode (light/dark) - defaults to 'dark' */
  themeMode?: SmartSelectorThemeMode;
  /** Whether to show the search input (default: true) */
  showSearch?: boolean;
  /** Whether to show borders on items (default: true) */
  showBorder?: boolean;
  /** Placeholder text for the search input (default: "Search...") */
  searchPlaceholder?: string;

  /** --- Functionality --- */
  /** Disables the entire component */
  disabled?: boolean;
  /** Limits the vertical height of the list (default: undefined) */
  visibleItems?: number;
  /** Completely overrides the default item renderer */
  renderOption?: (props: RenderOptionProps<TValue>) => React.ReactNode;

  /** --- Customization --- */
  /** Granular CSS class overrides */
  classNames?: {
    root?: string;
    searchInput?: string;
    list?: string;
    empty?: string;
    itemsWrapper?: string;
  };
  /** General wrapper class name */
  className?: string;
}

const SIZE_MAP: Record<SmartSelectorSize, { text: string; desc: string; input: string; container: string }> = {
  xs: {text: 'text-[10px]', desc: 'text-[9px]', input: 'py-1 px-2 pl-7', container: 'gap-1'},
  sm: {text: 'text-xs', desc: 'text-[10px]', input: 'py-1.5 px-2.5 pl-8', container: 'gap-1.5'},
  md: {text: 'text-sm', desc: 'text-xs', input: 'py-2 px-3 pl-9', container: 'gap-2'},
  lg: {text: 'text-base', desc: 'text-sm', input: 'py-2.5 px-3.5 pl-10', container: 'gap-2.5'},
  xl: {text: 'text-lg', desc: 'text-sm', input: 'py-3 px-4 pl-11', container: 'gap-3'},
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

// Updated with Dark/Light support
const VARIANT_MAP: Record<SmartSelectorVariant, {
  item: string;
  iconContainer: string;
  check: string;
  desc: string
}> = {
  tiny: {
    item: 'py-1 px-2',
    // Tiny usually has no background for icon
    iconContainer: 'bg-transparent dark:bg-transparent',
    check: 'w-3 h-3',
    desc: 'mt-0'
  },
  compact: {
    item: 'py-2 px-3',
    // Light: Gray-100, Dark: Gray-800
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
 * SmartSelector
 *
 * A highly customizable, accessible list selector component with Dark/Light mode support.
 * Features include search, auto-focus on selection, multiple variants/sizes, and optional Lucide icon rendering.
 *
 * @template TValue - The string type for option values.
 *
 * @example
 * ```tsx
 * <SmartSelector
 *   options={[{ value: '1', label: 'Option 1', icon: Star }]}
 *   value="1"
 *   onChange={setVal}
 *   themeMode="light"
 *   size="md"
 *   theme="blue"
 * />
 * ```
 */
const SmartSelector = <TValue extends string>(props: SmartSelectorProps<TValue>) => {
  const {
    options,
    value,
    onChange,
    size = 'sm',
    variant = 'compact',
    alignment = 'left',
    iconPosition = 'left',
    theme = 'blue',
    iconSize = 'md',
    iconGap = 'md',
    themeMode = 'dark', // Default to dark
    disabled = false,
    showSearch = true,
    showBorder = true,
    searchPlaceholder = 'Search...',
    visibleItems,
    renderOption,
    classNames = {},
    className = '',
  } = props;

  const [searchQuery, setSearchQuery] = useState('');

  // Refs for programmatic scrolling to selected item
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

  // Calculate height for the list container
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

  // Filter Logic
  const filteredOptions = options.filter((option) => {
    if (option.disabled) return false;
    const query = searchQuery.toLowerCase();
    return (
      option.label.toLowerCase().includes(query) ||
      option.value.toLowerCase().includes(query) ||
      (option.description && option.description.toLowerCase().includes(query))
    );
  });

  // Icon Gap Logic (Swap mr/ml based on position)
  const rawGapClass = ICON_GAP_MAP[iconGap];
  const iconMarginClass = iconPosition === 'left'
    ? rawGapClass
    : rawGapClass.replace('mr-', 'ml-');

  /**
   * Default Item Renderer
   * Handles layout, alignment, icon positioning, and selection state.
   */
  const DefaultItemRenderer: React.FC<RenderOptionProps<TValue>> = (renderProps) => {
    const {
      option,
      isSelected,
      iconNode,
      checkNode, // We use our own Check icon, but accept prop
      onSelect,
    } = renderProps;

    const isDisabled = disabled || option.disabled;

    // Colors based on mode
    const selectedBg = 'bg-zinc-100 dark:bg-zinc-900';
    const hoverBg = 'hover:bg-zinc-50 dark:hover:bg-zinc-800';
    const activeText = 'text-zinc-900 dark:text-zinc-200';
    const inactiveText = 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200';

    return (
      <div
        ref={(el) => {
          itemRefs.current[option.value] = el;
        }}
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
        {/* --- LEFT ICON --- */}
        {iconPosition === 'left' && iconNode && (
          <div
            className={`
              flex items-center justify-center rounded-md shrink-0
              ${isSelected ? `${themeConfig.bgHover} ${themeConfig.main}` : `${variantConfig.iconContainer} text-zinc-500 dark:text-muted group-hover:text-zinc-900 dark:group-hover:text-text`}
              ${iconClass}
              ${iconMarginClass}
            `}
          >
            {iconNode}
          </div>
        )}

        {/* --- TEXT CONTENT --- */}
        <div className="flex flex-col min-w-0 w-full">
          <span
            className={`
              font-medium truncate leading-tight block
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

        {/* --- RIGHT SIDE (Check + Optional Icon) --- */}
        <div className={`flex items-center shrink-0 ${iconPosition === 'left' ? 'pl-2' : ''} gap-2`}>
          {isSelected ? (
            <div
              className={`
                text-white rounded-full flex items-center justify-center shadow-sm shrink-0
                ${variantConfig.check} ${themeConfig.bg}
              `}
            >
              {/* Lucide Check Icon */}
              <Check className="w-[60%] h-[60%]"/>
            </div>
          ) : (
            <div
              className={`
                rounded-full border-2 border-zinc-300 dark:border-zinc-700 group-hover:border-zinc-400 dark:group-hover:border-zinc-600 transition-colors shrink-0
                ${variantConfig.check}
              `}
            />
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

  return (
    <div className={cn('flex flex-col bg-white dark:bg-zinc-950', disabled ? 'opacity-50 pointer-events-none grayscale' : '', className)}>
      {/* Search Header */}
      {showSearch && (
        <div className="pb-3 mb-2 border-b border-zinc-200 dark:border-zinc-800">
          <div className="relative w-full">
            {/* Lucide Search Icon */}
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
                `
                w-full bg-zinc-50 dark:bg-background border border-zinc-200 dark:border-border rounded-md text-zinc-900 dark:text-text placeholder-zinc-500 dark:placeholder-muted focus:outline-none focus:border-blue-500 dark:focus:border-primary transition-colors
                ${sizeConfig.text}
                ${sizeConfig.input}
              `,
                classNames.searchInput
              )}
            />
          </div>
        </div>
      )}

      {/* List Area */}
      <div className={cn('overflow-y-auto custom-scrollbar pr-1', classNames.list)} style={listStyle}>
        {filteredOptions.length === 0 ? (
          <div className={cn('flex flex-col items-center justify-center text-zinc-500 dark:text-muted py-6', classNames.empty)}>
            <span className={sizeConfig.text}>No results found</span>
          </div>
        ) : (
          <div className={cn('flex flex-col', sizeConfig.container, classNames.itemsWrapper)}>
            <RadioGroup.Root className="contents" value={value} onValueChange={(val) => onChange(val as TValue)}>
              {filteredOptions.map((option) => {
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
            </RadioGroup.Root>

            {/* Margin after last item */}
            <div className={`h-${size === 'xs' ? '2' : '4'}`} aria-hidden="true"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartSelector;
