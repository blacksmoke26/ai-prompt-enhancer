import React, { useState, useMemo } from 'react';
import { Download, Trash2 } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/Card';
import { Button } from '~/components/ui/Button';
import FilterPanel from './FilterPanel';
import HistoryItem from './HistoryItem';
import type { PromptHistory } from '~/types';

/**
 * Props for the {@link HistoryPanel} component.
 *
 * @property history   Array of prompt history items to display.
 * @property loading   Optional flag to show a loading indicator while fetching data.
 * @property onDelete  Callback invoked with the ID of an item to delete.
 * @property onUpdate  Callback invoked with the ID of an item and an object containing
 *                     updated fields (rating or notes).  The parent component
 *                     should persist the changes.
 * @property onExport  Callback invoked with the format (`json`, `csv`, or `txt`) to export
 *                     the current history view.
 * @property onClear   Callback invoked to clear the entire history.
 *
 * @developer.notes
 * The component is stateless except for UI‑level filters, expanded item, and notes
 * editing.  All CRUD operations are forwarded to the parent via callbacks.
 */
export interface HistoryPanelProps {
  history: PromptHistory[];
  loading?: boolean;
  onDelete?: (id: string) => void;
  onUpdate?: (id: string, updates: { rating?: number; notes?: string }) => void;
  onExport?: (format: 'json' | 'csv' | 'txt') => void;
  onClear?: () => void;
}

/**
 * The main HistoryPanel component.
 *
 * It renders a list of {@link HistoryItem} components and provides an
 * advanced filter UI via {@link FilterPanel}.  The panel is fully typed and
 * includes comprehensive developer documentation.
 */
const HistoryPanel: React.FC<HistoryPanelProps> = ({
  history,
  loading = false,
  onDelete = () => {},
  onUpdate = () => {},
  onExport = () => {},
  onClear = () => {},
}) => {
  /* Filter state */
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [selectedEnhancementType, setSelectedEnhancementType] = useState<string>('');
  const [selectedProvider, setSelectedProvider] = useState<string>('');
  const [ratingFilter, setRatingFilter] = useState(0);
  const [dateRange, setDateRange] = useState<[string | null, string | null]>([
    null,
    null,
  ]);

  /* UI state */
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [notesValue, setNotesValue] = useState<string>('');

  /* Derived data */
  const models = useMemo(
    () => Array.from(new Set(history.map((h) => h.model))),
    [history]
  );
  const roles = useMemo(
    () => Array.from(new Set(history.map((h) => h.userRole))),
    [history]
  );
  const enhancementTypes = useMemo(
    () => Array.from(new Set(history.map((h) => h.enhancementType))),
    [history]
  );
  const providers = useMemo(
    () => Array.from(new Set(history.map((h) => h.provider))),
    [history]
  );

  const filteredHistory = useMemo(() => {
    return history.filter((item) => {
      const matchesSearch =
        item.originalPrompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.enhancedPrompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.model.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesModel = selectedModel ? item.model === selectedModel : true;
      const matchesRole = selectedRole ? item.userRole === selectedRole : true;
      const matchesEnhancement =
        selectedEnhancementType
          ? item.enhancementType === selectedEnhancementType
          : true;
      const matchesProvider =
        selectedProvider ? item.provider === selectedProvider : true;

      const matchesRating =
        ratingFilter ? (item.rating ?? 0) >= ratingFilter : true;

      const itemDate = new Date(item.timestamp);
      const [start, end] = dateRange;
      const matchesDate =
        (!start || itemDate >= new Date(start)) &&
        (!end || itemDate <= new Date(end));

      return (
        matchesSearch &&
        matchesModel &&
        matchesRole &&
        matchesEnhancement &&
        matchesProvider &&
        matchesRating &&
        matchesDate
      );
    });
  }, [
    history,
    searchQuery,
    selectedModel,
    selectedRole,
    selectedEnhancementType,
    selectedProvider,
    ratingFilter,
    dateRange,
  ]);

  /* Handlers */
  const toggleExpand = (id: string) =>
    setExpandedItemId((prev) => (prev === id ? null : id));

  const startEditingNotes = (id: string, current: string | undefined) => {
    setEditingNotesId(id);
    setNotesValue(current ?? '');
  };

  const saveNotes = (id: string) => {
    onUpdate(id, { notes: notesValue.trim() || undefined });
    setEditingNotesId(null);
    setNotesValue('');
  };

  const cancelNotes = () => {
    setEditingNotesId(null);
    setNotesValue('');
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <CardTitle className="text-lg font-medium">Prompt History</CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onExport('json')}
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClear}
              disabled={history.length === 0}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>
        </div>
        <FilterPanel
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          models={models}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          ratingFilter={ratingFilter}
          setRatingFilter={setRatingFilter}
          dateRange={dateRange}
          setDateRange={setDateRange}
          roles={roles}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
          enhancementTypes={enhancementTypes}
          selectedEnhancementType={selectedEnhancementType}
          setSelectedEnhancementType={setSelectedEnhancementType}
          providers={providers}
          selectedProvider={selectedProvider}
          setSelectedProvider={setSelectedProvider}
        />
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
          </div>
        ) : filteredHistory.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            {searchQuery ? 'No results found' : 'No history yet'}
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredHistory.map((item) => (
              <HistoryItem
                onCopyPrompt={() => {}}
                key={item.id}
                item={item}
                isExpanded={expandedItemId === item.id}
                onToggleExpand={() => toggleExpand(item.id)}
                onDelete={() => onDelete(item.id)}
                onRatingChange={(id, rating) => onUpdate(id, { rating })}
                isEditingNotes={editingNotesId === item.id}
                notesValue={notesValue}
                onNotesChange={setNotesValue}
                onNotesSave={() => saveNotes(item.id)}
                onNotesCancel={cancelNotes}
                onEditNotes={() => startEditingNotes(item.id, item.notes)}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HistoryPanel;
