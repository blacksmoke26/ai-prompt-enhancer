/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useMemo, useState} from 'react';
import {AudioLines, ChevronDown, ChevronUp, Minus, Plus, Search} from 'lucide-react';

// store
import {useAppStore} from '~/stores/appStore';

// ui components
import {Card, CardHeader, CardTitle} from '~/components/ui/Card';
import {Badge} from '~/components/ui/Badge';
import {Button} from '~/components/ui/Button';
import {Input} from '~/components/ui/Input';
import {Switch} from '~/components/ui/Switch';

/**
 * Props for the ResponseLengthSettingsPanel component
 */
export interface ResponseLengthSettingsPanelProps {
}

/**
 * A panel component that displays user responseLengths for configuration with advanced features
 * @example
 * ```tsx
 * <ResponseLengthSettingsPanel
 *   localConfig={config}
 *   setLocalConfig={setConfig}
 * />
 * ```
 * @developerNotes This component renders user responseLengths grouped by category
 * with advanced search, auto-expansion, visibility controls, and selection highlighting.
 */
const ResponseLengthSettingsPanel: React.FC<ResponseLengthSettingsPanelProps> = () => {
  const {config, setConfig, responseLengths, toggleTone} = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [showHidden, setShowHidden] = useState(false);
  const [expandedAll, setExpandedAll] = useState(true);

  // Group responseLengths by category and apply filters
  const groupedResponseLength = useMemo(() => {
    const groups: Record<string, typeof responseLengths> = {};

    responseLengths
      .filter(responseLength => showHidden ? responseLength.hidden : !responseLength.hidden)
      .filter(responseLength =>
        responseLength.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        responseLength.category.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      .forEach(responseLength => {
        if (!groups[responseLength.category]) {
          groups[responseLength.category] = [];
        }
        groups[responseLength.category].push(responseLength);
      });

    return groups;
  }, [responseLengths, searchTerm, showHidden]);

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
    Object.keys(groupedResponseLength).forEach(category => {
      newExpandedCategories[category] = newExpanded;
    });
    setExpandedCategories(newExpandedCategories);
  };

  // Check if category is expanded
  const isCategoryExpanded = (category: string) => {
    return expandedCategories[category] ?? expandedAll;
  };

  // Handle responseLength selection
  const handleRoleSelect = (responseLengthId: string) => {
    setConfig({responseLength: responseLengthId}, true);
  };

  const filteredRoles = useMemo(() => {
    return responseLengths.filter(responseLength =>
      (showHidden || !responseLength.hidden) &&
      (
        responseLength.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        responseLength.category.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    );
  }, [responseLengths, searchTerm, showHidden]);

  // Auto-expand categories when search term is present
  React.useEffect(() => {
    if (searchTerm.trim() !== '') {
      const newExpanded: Record<string, boolean> = {};
      Object.keys(groupedResponseLength).forEach(category => {
        newExpanded[category] = true;
      });
      setExpandedCategories(newExpanded);
      setExpandedAll(true);
    } else {
      // Reset to default expanded state when search is cleared
      setExpandedAll(true);
    }
  }, [searchTerm, groupedResponseLength]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <AudioLines className="inline-flex" size="16"/> Response Lengths<Badge>
          <span title="Visible count">{responseLengths.filter(responseLength => !responseLength.hidden).length}</span> <span
          className="ml-1 mr-1">/</span>
          <span title="Total count">{responseLengths.length}</span></Badge>
        </h3>

        {/* Search and Filters Section */}
        <div className="space-y-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/>
              <Input
                placeholder="Search responseLengths, categories, descriptions..."
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
        {filteredRoles.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No user responseLengths found matching your criteria.
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedResponseLength).map(([category, responseLengths]) => (
              <div key={category} className="border rounded-lg overflow-hidden">
                <Button
                  variant="secondary"
                  className="w-full justify-between p-4 text-left"
                  onClick={() => toggleCategory(category)}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{category}</span>
                    <Badge variant="secondary" className="text-xs">
                      {responseLengths.length} response lengths
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                      {responseLengths.map((responseLength) => (
                        <Card
                          key={responseLength.key}
                          className={`cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02] ${
                            config.responseLength === responseLength.key
                              ? 'ring-2 ring-primary border-primary shadow-lg'
                              : 'border-border'
                          }`}
                          onClick={() => handleRoleSelect(responseLength.key)}
                        >
                          <CardHeader className="pt-3 pb-3">
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-base font-medium">
                                {responseLength.name}
                              </CardTitle>
                              <div className="flex flex-col items-end gap-2">
                                <Switch
                                  onClick={e => e.stopPropagation()}
                                  checked={!responseLength.hidden}
                                  onCheckedChange={hidden => {
                                    toggleTone(responseLength.key, !hidden);
                                  }}
                                />
                              </div>
                            </div>
                          </CardHeader>
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

export default ResponseLengthSettingsPanel;
