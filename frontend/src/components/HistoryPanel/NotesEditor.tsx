/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';

// ui components
import {Textarea} from '~/components/ui/Textarea';
import {Button} from '~/components/ui/Button';
import {Label} from '~/components/ui/Label';

/**
 * Props for the {@link NotesEditor} component.
 *
 * @property notes        Current notes content.
 * @property onSave       Callback invoked with the updated notes string.
 * @property onCancel     Callback invoked when the edit is cancelled.
 * @property isEditing    Flag indicating whether the editor is visible.
 */
export interface NotesEditorProps {
  notes: string;
  isEditing: boolean;
  onSave: (notes: string) => void;
  onCancel: () => void;
}

/**
 * Inline editor for editing the notes of a history item.
 *
 * The component renders a textarea with "Save" and "Cancel" actions.
 * It is shown only when {@link NotesEditorProps.isEditing} is true.
 *
 * @component
 */
const NotesEditor: React.FC<NotesEditorProps> = ({
  notes,
  isEditing,
  onSave,
  onCancel,
}) => {
  const [value, setValue] = React.useState(notes);

  // Keep textarea value in sync when notes prop changes
  React.useEffect(() => {
    setValue(notes);
  }, [notes]);

  if (!isEditing) return null;

  return (
    <div className="space-y-2">
      <Label htmlFor="notes-editor">Notes</Label>
      <Textarea
        id="notes-editor"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={2}
        placeholder="Add notes..."
        className="resize-none"
      />
      <div className="flex gap-2">
        <Button size="sm" onClick={() => onSave(value.trim())}>
          Save
        </Button>
        <Button size="sm" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default NotesEditor;
