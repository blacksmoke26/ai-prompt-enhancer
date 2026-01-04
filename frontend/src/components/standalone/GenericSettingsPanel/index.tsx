/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useMemo, useState, useEffect} from 'react';
import {
  ChevronDown,
  ChevronUp,
  Minus,
  Plus,
  Search,
  Sparkles,
  Eye,
  EyeOff,
  LayoutGrid,
  AlertCircle,
} from 'lucide-react';

// ui components
import {Badge} from '~/components/ui/Badge';
import {Button} from '~/components/ui/Button';
import {Switch} from '~/components/ui/Switch';
import {Separator} from '~/components/ui/Separator';
import {AdvancedInput} from '~/components/ui/AdvancedInput';
import {Card, CardHeader, CardTitle} from '~/components/ui/Card';

/**
 * Base interface for items to be displayed in the panel. Extend this interface if you need custom fields on your data objects.
 * @example
 * interface SettingsItem extends SettingsItemBase {
 *   value: string;
 *   icon: React.ReactNode;
 * }
 * @developerNotes This interface provides core properties like ID, name, category, and optional description/hidden state. Extend it to add custom fields specific to your application's needs.
 */
export interface SettingsItemBase {
  /**
   * Unique identifier for the settings item. Required for selection and reference.
   */
  id: string;

  /**
   * Display name or label for the settings item. Shown to the user in the UI.
   */
  name: string;

  /**
   * Category or group that this item belongs to. Used for organizing items in the panel.
   */
  category: string;

  /**
   * Optional description providing additional context or details about the item.
   */
  description?: string;

  /**
   * Optional flag to hide the item from the UI. Useful for conditional rendering or filtering.
   */
  hidden?: boolean;
}

/**
 * Props for the GenericSettingsPanel component, providing a flexible way to render settings items with customizable UI and behavior.
 * @example
 * interface SettingsItem extends SettingsItemBase { id: string; label: string; }
 * const props: GenericSettingsPanelProps<SettingsItem> = {
 *   items: [{ id: '1', label: 'Setting 1' }],
 *   selectedItemId: '1',
 *   onSelect: (item) => console.log('Selected:', item),
 *   title: 'Application Settings',
 * };
 * @developerNotes This interface is generic over `T` (which extends `SettingsItemBase`) and supports customization of UI elements, selection behavior, and visibility toggling.
 */
export interface GenericSettingsPanelProps<T extends SettingsItemBase> {
  /**
   * Array of settings items to display in the panel.
   */
  items: T[];

  /**
   * The ID of the currently selected item (null if none selected).
   */
  selectedItemId: string | null;

  /**
   * Callback triggered when a settings item is selected.
   * @param item - The selected settings item.
   */
  onSelect(item: T): void;

  /**
   * Optional callback to handle visibility toggle for a settings item.
   * @param itemId - The ID of the item.
   * @param isHidden - Whether the item is hidden.
   */
  onToggleVisibility?(itemId: string, isHidden: boolean): void;

  /**
   * Optional title to display at the top of the settings panel.
   */
  title?: string;

  /**
   * Optional subtitle to display below the title.
   */
  subtitle?: string;

  /**
   * Placeholder text for the search input field (if present).
   */
  searchPlaceholder?: string;

  /**
   * Title to display when no items are found (used with search).
   */
  emptyTitle?: string;

  /**
   * Description to display when no items are found (used with search).
   */
  emptyDescription?: string;

  /**
   * Optional render function to customize the icon for each settings item.
   * @param item - The current settings item.
   */
  renderIcon?(item: T): React.ReactNode;

  /**
   * Optional custom class name to apply to the settings panel container.
   */
  className?: string;
}

/**
 * GenericSettingsPanel Component
 *
 * A reusable, searchable, and grouped grid component for settings selection.
 * Supports dark mode, visibility toggling, and custom rendering.
 * @example
 * interface CustomSettingsItem extends SettingsItemBase {
 *   value: string;
 *   icon: React.ReactNode;
 * }
 *
 * <GenericSettingsPanel<CustomSettingsItem>
 *   items={[
 *     {
 *       id: '1',
 *       name: 'Theme',
 *       category: 'Appearance',
 *       value: 'dark',
 *       icon: <SunIcon />,
 *     },
 *     {
 *       id: '2',
 *       name: 'Language',
 *       category: 'Appearance',
 *       value: 'en',
 *       icon: <GlobeIcon />,
 *     },
 *   ]}
 *   selectedItemId="1"
 *   onSelect={(item) => console.log('Selected item:', item)}
 *   onToggleVisibility={(id, hidden) => console.log('Toggled visibility for ID:', id, hidden)}
 *   title="Appearance Settings"
 *   renderIcon={(item) => item.icon}
 * />
 * @developerNotes This component is designed to be flexible and extensible, allowing for custom rendering of icons, search functionality, and grouping by category. It also supports dark mode through its parent context or explicit styling.
 */
const GenericSettingsPanel = <T extends SettingsItemBase>(props: GenericSettingsPanelProps<T>) => {
  const {
    items,
    selectedItemId,
    onSelect,
    onToggleVisibility,
    title = 'Configuration',
    subtitle = 'Select an option to customize your experience.',
    searchPlaceholder = 'Search items...',
    emptyTitle = 'No items found',
    emptyDescription = 'We couldn\'t find any items matching your criteria.',
    renderIcon,
    className = '',
  } = props;

  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [showHidden, setShowHidden] = useState(false);
  const [expandedAll, setExpandedAll] = useState(true);

  /**
   * Group and filter items based on search and visibility preferences.
   */
  const groupedItems = useMemo(() => {
    const groups: Record<string, T[]> = {};

    items
      .filter(item => (showHidden ? item.hidden : !item.hidden))
      .filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase())),
      )
      .forEach(item => {
        if (!groups[item.category]) {
          groups[item.category] = [];
        }
        groups[item.category].push(item);
      });

    return groups;
  }, [items, searchTerm, showHidden]);

  // Toggle a specific category
  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  // Toggle all categories expand/collapse
  const toggleAllCategories = () => {
    const newExpanded = !expandedAll;
    setExpandedAll(newExpanded);

    const newExpandedCategories: Record<string, boolean> = {};
    Object.keys(groupedItems).forEach(category => {
      newExpandedCategories[category] = newExpanded;
    });
    setExpandedCategories(newExpandedCategories);
  };

  // Check if a category is expanded
  const isCategoryExpanded = (category: string) => {
    return expandedCategories[category] ?? expandedAll;
  };

  // Handle selecting an item
  const handleSelect = (item: T) => {
    onSelect(item);
  };

  // Handle visibility toggle
  const handleToggleVisibility = (e: React.MouseEvent, item: T) => {
    e.stopPropagation();
    if (onToggleVisibility) {
      onToggleVisibility(item.id, !item.hidden);
    }
  };

  // Auto-expand logic when searching
  useEffect(() => {
    if (searchTerm.trim() !== '') {
      const newExpanded: Record<string, boolean> = {};
      Object.keys(groupedItems).forEach(category => {
        newExpanded[category] = true;
      });
      setExpandedCategories(newExpanded);
      setExpandedAll(true);
    } else {
      setExpandedAll(true);
    }
  }, [searchTerm, groupedItems]);

  const categories = Object.keys(groupedItems);
  const totalVisibleCount = items.filter(item => !item.hidden).length;

  return (
    <div
      className={`w-full mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ${className}`}>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            {title}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            {subtitle}
          </p>
        </div>
        <Badge
          variant="secondary"
          className="h-fit px-3 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700">
          <span className="text-indigo-600 dark:text-indigo-400 font-bold mr-1">{totalVisibleCount}</span> Active
          <span className="mx-1 text-slate-300 dark:text-slate-600">/</span>
          {items.length} Total
        </Badge>
      </div>

      {/* Controls Section */}
      <div
        className="sticky top-0 z-10 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 pb-4 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:border-0 sm:pb-0 sm:pt-0 sm:bg-transparent sm:dark:bg-transparent">
        <div className="flex flex-col sm:flex-row gap-3">

          {/* Search Input */}
          <div className="relative flex-1 group">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 dark:group-focus-within:text-indigo-400 transition-colors"/>
            <AdvancedInput
              placeholder={searchPlaceholder} leftIcon={<Search/>}
              className="pl-10 h-11 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-950 focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-indigo-500/20 dark:focus:ring-indigo-500/40 transition-all shadow-sm rounded-xl placeholder:text-slate-400 dark:placeholder:text-slate-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Actions Row */}
          <div
            className="flex items-center gap-3 bg-white dark:bg-slate-900 p-1.5 h-[45px] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">

            {/* Show Hidden Toggle (Only show if callback exists) */}
            {onToggleVisibility && (
              <div className="flex items-center gap-2 px-2 border-r border-slate-100 dark:border-slate-800 pr-3">
                <Switch
                  id="show-hidden"
                  checked={showHidden}
                  onCheckedChange={setShowHidden}
                />
                <label
                  htmlFor="show-hidden"
                  className="text-xs font-semibold text-slate-600 dark:text-slate-400 cursor-pointer select-none whitespace-nowrap"
                >
                  {showHidden ? 'Hidden only' : 'Visible only'}
                </label>
              </div>
            )}

            {/* Expand/Collapse Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleAllCategories}
              className="h-9 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
            >
              {expandedAll ? (
                <>
                  <Minus className="h-3.5 w-3.5 mr-1"/> Collapse
                </>
              ) : (
                <>
                  <Plus className="h-3.5 w-3.5 mr-1"/> Expand
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      {categories.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-16 text-center rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="bg-white dark:bg-slate-950 p-4 rounded-full shadow-sm mb-4">
            <AlertCircle className="h-8 w-8 text-slate-400"/>
          </div>
          <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">{emptyTitle}</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs mt-1">
            {emptyDescription}
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {categories.map(category => (
            <div key={category} className="space-y-3">

              {/* Category Header */}
              <button
                onClick={() => toggleCategory(category)}
                className="w-full flex items-center justify-between group py-2 -mx-2 px-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <LayoutGrid className="h-4 w-4 text-slate-400 dark:text-slate-600"/>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200 tracking-wider">
                    {category}
                  </span>
                  <Badge variant="outline"
                         className="text-xs font-normal text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
                    {groupedItems[category].length}
                  </Badge>
                </div>
                <div
                  className="text-slate-400 dark:text-slate-600 bg-slate-100 dark:bg-slate-800 rounded-full p-1 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/30 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {isCategoryExpanded(category) ? (
                    <ChevronUp className="h-4 w-4"/>
                  ) : (
                    <ChevronDown className="h-4 w-4"/>
                  )}
                </div>
              </button>

              {/* Items Grid */}
              {isCategoryExpanded(category) && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {groupedItems[category].map(item => {
                    const isSelected = selectedItemId === item.id;

                    return (
                      <Card
                        key={item.id}
                        onClick={() => handleSelect(item)}
                        className={`
                          relative group cursor-pointer transition-all duration-300 ease-out
                          hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-indigo-500/10
                          ${isSelected
                          ? 'bg-indigo-600 border-indigo-600 shadow-lg shadow-indigo-200/50 dark:shadow-indigo-900/50'
                          : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 shadow-sm hover:shadow-md'
                        }
                        `}
                      >
                        <CardHeader className="pb-3 pt-4">
                          <div className="flex justify-between items-start gap-3">

                            {/* Item Icon / Name */}
                            <div className="flex items-start gap-3 overflow-hidden">
                              <div className={`
                                p-2 rounded-lg flex-shrink-0 transition-colors
                                ${isSelected
                                ? 'bg-indigo-500 text-white'
                                : 'bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'
                              }
                              `}>
                                {renderIcon ? renderIcon(item) : <Sparkles className="h-4 w-4"/>}
                              </div>
                              <div className="space-y-0.5 min-w-0 mt-1.5">
                                <CardTitle className={`
                                  text-sm font-semibold leading-tight truncate
                                  ${isSelected ? 'text-white' : 'text-slate-800 dark:text-slate-100'}
                                `}>
                                  {item.name}
                                </CardTitle>
                                {item.description && (
                                  <p className={`
                                    text-xs line-clamp-2 leading-relaxed
                                    ${isSelected ? 'text-indigo-100' : 'text-slate-500 dark:text-slate-400'}
                                  `}>
                                    {item.description}
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Visibility Toggle (If supported) */}
                            {onToggleVisibility && (
                              <div
                                onClick={(e) => handleToggleVisibility(e, item)}
                                className={`
                                  absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity
                                  ${isSelected ? 'opacity-100' : ''}
                                `}
                              >
                                <div
                                  className={`
                                    p-1.5 rounded-full transition-colors shadow-sm
                                    ${item.hidden
                                    ? 'bg-rose-50 dark:bg-rose-950 text-rose-500 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/50'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700'
                                  }
                                  `}
                                  title={item.hidden ? 'Item is hidden' : 'Item is visible'}
                                >
                                  {item.hidden ? <EyeOff className="h-3.5 w-3.5"/> : <Eye className="h-3.5 w-3.5"/>}
                                </div>
                              </div>
                            )}

                          </div>
                        </CardHeader>

                        {/* Selection Indicator Line */}
                        <div className={`
                          h-1 w-full rounded-b-xl
                          ${isSelected ? 'bg-indigo-400' : 'bg-transparent'}
                        `}/>
                      </Card>
                    );
                  })}
                </div>
              )}

              {/* Separator between categories */}
              {categories.indexOf(category) !== categories.length - 1 && (
                <Separator className="mt-6 opacity-50 dark:opacity-20"/>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GenericSettingsPanel;
