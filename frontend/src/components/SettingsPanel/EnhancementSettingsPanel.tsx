/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useMemo, useState} from 'react';
import {ChevronDown, ChevronUp, Filter, Minus, Plus, Search, User2} from 'lucide-react';

// store
import {useAppStore} from '~/stores/appStore';

// ui components
import {Card, CardContent, CardHeader, CardTitle} from '~/components/ui/Card';
import {Badge} from '~/components/ui/Badge';
import {Button} from '~/components/ui/Button';
import {Input} from '~/components/ui/Input';
import {Switch} from '~/components/ui/Switch';

/**
 * Props for the EnhancementSettingsPanel component
 */
export interface EnhancementSettingsPanelProps {
}

/**
 * A panel component that displays user roles for configuration with advanced features
 * @example
 * ```tsx
 * <EnhancementSettingsPanel
 *   localConfig={config}
 *   setLocalConfig={setConfig}
 * />
 * ```
 * @developerNotes This component renders user roles grouped by category
 * with advanced search, auto-expansion, visibility controls, and selection highlighting.
 */
const EnhancementSettingsPanel: React.FC<EnhancementSettingsPanelProps> = () => {
  const {config, setConfig, enhancementTypes, toggleEnhancementType} = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [showHidden, setShowHidden] = useState(false);
  const [expandedAll, setExpandedAll] = useState(true);

  // Group roles by category and apply filters
  const groupedTypes = useMemo(() => {
    const groups: Record<string, typeof enhancementTypes> = {};

    enhancementTypes
      .filter(type => showHidden ? type.hidden : !type.hidden)
      .filter(type =>
        type.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        type.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        type.category.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      .forEach(type => {
        if (!groups[type.category]) {
          groups[type.category] = [];
        }
        groups[type.category].push(type);
      });

    return groups;
  }, [enhancementTypes, searchTerm, showHidden]);

  // Toggle category expansion
  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  // Toggle all categories
  const toggleAllCategories = () => {
    const newExpanded = !expandedAll;
    setExpandedAll(newExpanded);

    const newExpandedCategories: Record<string, boolean> = {};
    Object.keys(groupedTypes).forEach(category => {
      newExpandedCategories[category] = newExpanded;
    });
    setExpandedCategories(newExpandedCategories);
  };

  // Check if category is expanded
  const isCategoryExpanded = (category: string) => {
    return expandedCategories[category] ?? expandedAll;
  };

  // Handle role selection
  const handleRoleSelect = (typeId: string) => {
    setConfig({enhancementType: typeId}, true)
  };

  const filteredTypes = useMemo(() => {
    return enhancementTypes.filter(type =>
      (showHidden || !type.hidden) &&
      (
        type.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        type.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        type.category.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    );
  }, [enhancementTypes, searchTerm, showHidden]);

  // Auto-expand categories when search term is present
  React.useEffect(() => {
    if (searchTerm.trim() !== '') {
      const newExpanded: Record<string, boolean> = {};
      Object.keys(groupedTypes).forEach(category => {
        newExpanded[category] = true;
      });
      setExpandedCategories(newExpanded);
      setExpandedAll(true);
    } else {
      // Reset to default expanded state when search is cleared
      setExpandedAll(true);
    }
  }, [searchTerm, groupedTypes]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <User2 className="inline-flex" size="16"/> Enhancement Types <Badge>
          <span title="Visible count">{enhancementTypes.filter(type => !type.hidden).length}</span> <span className="ml-1 mr-1">/</span>
          <span title="Total count">{enhancementTypes.length}</span></Badge>
        </h3>

        {/* Search and Filters Section */}
        <div className="space-y-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/>
              <Input
                placeholder="Search roles, categories, descriptions..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <Switch
                id="show-hidden"
                checked={showHidden}
                onCheckedChange={setShowHidden}
              />
              <label htmlFor="show-hidden"
                     className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Show Hidden
              </label>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={toggleAllCategories}
              className="flex items-center gap-1"
            >
              {expandedAll ? <Minus className="h-4 w-4"/> : <Plus className="h-4 w-4"/>}
              {expandedAll ? 'Collapse All' : 'Expand All'}
            </Button>
          </div>
        </div>

        {/* Role Cards */}
        {filteredTypes.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No user roles found matching your criteria.
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedTypes).map(([category, types]) => (
              <div key={category} className="border rounded-lg overflow-hidden">
                <Button
                  variant="secondary"
                  className="w-full justify-between p-4 text-left"
                  onClick={() => toggleCategory(category)}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{category}</span>
                    <Badge variant="secondary" className="text-xs">
                      {types.length} roles
                    </Badge>
                  </div>
                  {isCategoryExpanded(category) ? (
                    <ChevronUp className="h-4 w-4"/>
                  ) : (
                    <ChevronDown className="h-4 w-4"/>
                  )}
                </Button>

                {isCategoryExpanded(category) && (
                  <div className="p-4 space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {types.map((type) => (
                        <Card
                          key={type.id}
                          className={`cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02] ${
                            config.enhancementType === type.id
                              ? 'ring-2 ring-primary border-primary shadow-lg'
                              : 'border-border'
                          }`}
                          onClick={() => handleRoleSelect(type.id)}
                        >
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-base font-medium">
                                {type.name}
                              </CardTitle>
                              <div className="flex flex-col items-end gap-2">
                                <Switch
                                  onClick={e => e.stopPropagation()}
                                  checked={!type.hidden}
                                  onCheckedChange={hidden => {
                                    toggleEnhancementType(type.id, !hidden);
                                  }}
                                />
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {type.description}
                            </p>
                            {Boolean(type.hidden) && (
                              <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1">
                                <Filter className="h-3 w-3"/>
                                Hidden from UI
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancementSettingsPanel;
