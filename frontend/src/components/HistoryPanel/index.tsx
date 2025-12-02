import React, {useState} from 'react';
import {Search, Download, Trash2, Star, Edit, Eye} from 'lucide-react';

// helpers
import {formatDate, formatDuration, truncateText} from '~/utils/helpers';

// components
import {Badge} from '~/components/ui/Badge';
import {Input} from '~/components/ui/Input';
import {Button} from '~/components/ui/Button';
import {Card, CardContent, CardHeader, CardTitle} from '~/components/ui/Card';

// types
import type {PromptHistory} from '~/types/index';

/**
 * Props for the HistoryPanel component
 * @example
 * <HistoryPanel
 *   history={promptHistory}
 *   onDelete={handleDelete}
 *   onUpdate={handleUpdate}
 *   onExport={handleExport}
 *   onClear={handleClear}
 * />
 * @developer.notes
 * All callback functions must handle their respective actions in the parent component.
 * The onUpdate callback should support partial updates to prompt history items.
 */
export interface HistoryPanelProps {
  /** Array of prompt history items to display */
  history: PromptHistory[];
  /** Shows loading state when fetching history */
  loading?: boolean;
  /** Callback for deleting a history item */
  onDelete?(id: string): void;
  /** Callback for updating rating or notes */
  onUpdate?(id: string, updates: { rating?: number; notes?: string }): void;
  /** Callback for exporting history in specified format */
  onExport?(format: 'json' | 'csv' | 'txt'): void;
  /** Callback for clearing all history */
  onClear?(): void;
}

/**
 * Component for displaying and managing prompt history
 * @example
 * const [history, setHistory] = useState([]);
 *
 * <HistoryPanel
 *   history={history}
 *   onDelete={(id) => setHistory(h => h.filter(item => item.id !== id))}
 *   onUpdate={(id, updates) => setHistory(h => h.map(item =>
 *     item.id === id ? {...item, ...updates} : item
 *   ))}
 *   onExport={(format) => exportHistory(history, format)}
 *   onClear={() => setHistory([])}
 * />
 * @developer.notes
 * This component maintains internal state for search, selection, and notes editing.
 * It uses optimistic updates for ratings and notes, assuming parent handles persistence.
 */
const HistoryPanel: React.FC<HistoryPanelProps> = (props) => {
  const {
    history,
    loading = false,
    onDelete = () => {},
    onUpdate = () => {},
    onExport = () => {},
    onClear = () => {},
  } = props;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [editingNotes, setEditingNotes] = useState<string | null>(null);
  const [notesValue, setNotesValue] = useState('');

  /**
   * Filters history items based on search query
   * @developer.notes
   * Searches across original prompt, enhanced prompt, and model name.
   * Case-insensitive search with partial matching.
   */
  const filteredHistory = history.filter(item =>
    item.originalPrompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.enhancedPrompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.model.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  /**
   * Handles rating changes for history items
   * @param id - The ID of the history item
   * @param rating - The new rating value (1-5)
   * @developer.notes
   * Triggers immediate UI update with optimistic rendering.
   * Parent component should handle persistence.
   */
  const handleRatingChange = (id: string, rating: number) => {
    onUpdate(id, {rating});
  };

  /**
   * Initiates notes editing for a history item
   * @param id - The ID of the history item
   * @param currentNotes - Current notes content (optional)
   * @developer.notes
   * Sets editing state and prepares form with existing notes.
   * Only one item can be edited at a time.
   */
  const handleNotesEdit = (id: string, currentNotes?: string) => {
    setEditingNotes(id);
    setNotesValue(currentNotes || '');
  };

  /**
   * Saves edited notes for a history item
   * @param id - The ID of the history item
   * @developer.notes
   * Clears empty notes as undefined for cleaner data.
   * Resets editing state after save.
   */
  const handleNotesSave = (id: string) => {
    onUpdate(id, {notes: notesValue.trim() || undefined});
    setEditingNotes(null);
    setNotesValue('');
  };

  /**
   * Cancels notes editing and resets form
   * @developer.notes
   * Discards any unsaved changes and clears editing state.
   */
  const handleNotesCancel = () => {
    setEditingNotes(null);
    setNotesValue('');
  };

  /**
   * Renders interactive star rating component
   * @param rating - Current rating value (0-5)
   * @param itemId - ID of the history item for updates
   * @returns Star rating UI component
   * @developer.notes
   * Uses yellow filled stars for rated items, gray for unrated.
   * Hover state provides visual feedback before rating.
   */
  const renderStars = (rating: number, itemId: string) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 cursor-pointer transition-colors ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300 hover:text-yellow-200'
            }`}
            onClick={() => handleRatingChange(itemId, star)}
          />
        ))}
      </div>
    );
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Prompt History</CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onExport('json')}
            >
              <Download className="h-4 w-4 mr-2"/>
              Export
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClear}
              disabled={history.length === 0}
            >
              <Trash2 className="h-4 w-4 mr-2"/>
              Clear
            </Button>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
            <Input
              placeholder="Search history..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          </div>
        ) : filteredHistory.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            {searchQuery ? 'No results found' : 'No history yet'}
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredHistory.map((item) => (
              <div
                key={item.id}
                className="border border-border rounded-lg p-3 space-y-2 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      {item.model}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {item.enhancementType}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {item.userRole}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedItem(selectedItem === item.id ? null : item.id)}
                      className="h-6 w-6"
                    >
                      <Eye className="h-3 w-3"/>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(item.id)}
                      className="h-6 w-6 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3"/>
                    </Button>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground">
                  {formatDate(item.timestamp)} • {formatDuration(item.processingTime)}
                  {item.tokensUsed && ` • ${item.tokensUsed} tokens`}
                </div>

                <div className="space-y-1">
                  <div>
                    <span className="text-xs font-medium">Original:</span>
                    <p className="text-sm text-muted-foreground">
                      {truncateText(item.originalPrompt, 100)}
                    </p>
                  </div>

                  {selectedItem === item.id && (
                    <div>
                      <span className="text-xs font-medium">Enhanced:</span>
                      <p className="text-sm">
                        {truncateText(item.enhancedPrompt, 200)}
                      </p>
                    </div>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-medium">Rating:</span>
                    {renderStars(item.rating || 0, item.id)}
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">Notes:</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleNotesEdit(item.id, item.notes)}
                      className="h-6 w-6"
                    >
                      <Edit className="h-3 w-3"/>
                    </Button>
                  </div>
                  {editingNotes === item.id ? (
                    <div className="space-y-2">
                      <textarea
                        value={notesValue}
                        onChange={(e) => setNotesValue(e.target.value)}
                        className="w-full p-2 text-sm border border-border rounded-md resize-none"
                        rows={2}
                        placeholder="Add notes..."
                      />
                      <div className="flex space-x-2">
                        <Button size="sm" onClick={() => handleNotesSave(item.id)}>
                          Save
                        </Button>
                        <Button size="sm" variant="outline" onClick={handleNotesCancel}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      {item.notes || <span className="italic">No notes</span>}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HistoryPanel;
