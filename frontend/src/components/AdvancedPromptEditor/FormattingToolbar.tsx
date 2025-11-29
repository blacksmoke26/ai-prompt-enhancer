import React from 'react';
import { Button } from '~/components/ui/Button';
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List, ListOrdered } from 'lucide-react';

/**
 * Props for the FormattingToolbar component.
 * @interface FormattingToolbarProps
 */
export interface FormattingToolbarProps {
  /** Current formatting state for the toolbar */
  formatting: {
    /** Whether bold formatting is active */
    bold: boolean;
    /** Whether italic formatting is active */
    italic: boolean;
    /** Whether underline formatting is active */
    underline: boolean;
    /** Current text alignment */
    alignment: 'left' | 'center' | 'right';
    /** Current list type */
    listType: 'none' | 'bullet' | 'numbered';
  };
  /** Function to update the formatting state */
  setFormatting: React.Dispatch<React.SetStateAction<{
    bold: boolean;
    italic: boolean;
    underline: boolean;
    alignment: 'left' | 'center' | 'right';
    listType: 'none' | 'bullet' | 'numbered';
  }>>;
}

/**
 * FormattingToolbar component provides controls for text formatting options.
 * @example
 * ```tsx
 * const [formatting, setFormatting] = useState({
 *   bold: false,
 *   italic: false,
 *   underline: false,
 *   alignment: 'left',
 *   listType: 'none'
 * });
 *
 * <FormattingToolbar
 *   formatting={formatting}
 *   setFormatting={setFormatting}
 * />
 * ```
 * @developer_notes
 * - The toolbar uses buttons from the UI component library.
 * - Icons are provided by the lucide-react library.
 * - State is managed externally via the setFormatting prop.
 * - The toolbar is styled with Tailwind CSS classes.
 */
const FormattingToolbar: React.FC<FormattingToolbarProps> = ({ formatting, setFormatting }) => {
  return (
    <div className="flex items-center space-x-2 p-2 bg-muted/30 rounded-lg mb-4">
      <span className="text-sm font-medium">Formatting:</span>
      <div className="flex items-center space-x-1">
        <Button
          variant={formatting.bold ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFormatting(prev => ({...prev, bold: !prev.bold}))}
          aria-label="Bold"
        >
          <Bold className="h-4 w-4"/>
        </Button>
        <Button
          variant={formatting.italic ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFormatting(prev => ({...prev, italic: !prev.italic}))}
          aria-label="Italic"
        >
          <Italic className="h-4 w-4"/>
        </Button>
        <Button
          variant={formatting.underline ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFormatting(prev => ({...prev, underline: !prev.underline}))}
          aria-label="Underline"
        >
          <Underline className="h-4 w-4"/>
        </Button>
        <div className="h-px w-px bg-border mx-2"/>
        <Button
          variant={formatting.alignment === 'left' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFormatting(prev => ({...prev, alignment: 'left'}))}
          aria-label="Align Left"
        >
          <AlignLeft className="h-4 w-4"/>
        </Button>
        <Button
          variant={formatting.alignment === 'center' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFormatting(prev => ({...prev, alignment: 'center'}))}
          aria-label="Align Center"
        >
          <AlignCenter className="h-4 w-4"/>
        </Button>
        <Button
          variant={formatting.alignment === 'right' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFormatting(prev => ({...prev, alignment: 'right'}))}
          aria-label="Align Right"
        >
          <AlignRight className="h-4 w-4"/>
        </Button>
        <div className="h-px w-px bg-border mx-2"/>
        <Button
          variant={formatting.listType === 'bullet' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFormatting(prev => ({...prev, listType: 'bullet'}))}
          aria-label="Bullet List"
        >
          <List className="h-4 w-4"/>
        </Button>
        <Button
          variant={formatting.listType === 'numbered' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFormatting(prev => ({...prev, listType: 'numbered'}))}
          aria-label="Numbered List"
        >
          <ListOrdered className="h-4 w-4"/>
        </Button>
      </div>
    </div>
  );
};

export default FormattingToolbar;
