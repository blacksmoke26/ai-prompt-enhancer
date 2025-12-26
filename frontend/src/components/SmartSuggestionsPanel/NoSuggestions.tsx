/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {Lightbulb} from 'lucide-react';

// ui components
import {Button} from '~/components/ui/Button';

/**
 * Interface defining the props for the `NoSuggestions` component.
 * The `onClick` prop is used to handle click events on the component.
 */
export interface NoSuggestionsProps {
  /**
   * Callback function triggered when the component Reset Filters button is clicked.
   * Typically used to navigate or trigger an action when no suggestions are available.
   */
  onResetFilterClick(): void;
}

/**
 * A UI component that renders when no suggestions are available.
 * It triggers the `onClick` handler when clicked, allowing for custom navigation or actions.
 *
 * @example
 * <NoSuggestions onClick={() => console.log('No suggestions clicked!')} />
 */
const NoSuggestions: React.FC<NoSuggestionsProps> = (props) => (
  <div className="col-span-full text-center py-12">
    <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
      <Lightbulb className="h-8 w-8 text-muted-foreground"/>
    </div>
    <p className="text-lg font-medium text-foreground mb-2">
      No suggestions found
    </p>
    <p className="text-muted-foreground mb-4">
      Try adjusting your filters or search query to find relevant suggestions.
    </p>
    <div className="flex justify-center gap-2 flex-wrap">
      <Button variant="outline" size="sm" onClick={props.onResetFilterClick}>
        Reset Filters
      </Button>
    </div>
  </div>
);

export default NoSuggestions;
