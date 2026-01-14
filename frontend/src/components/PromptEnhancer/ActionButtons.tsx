/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {RefreshCw, Zap} from 'lucide-react';

// ui components
import {Button} from '~/components/ui/Button';

/**
 * Props interface for ActionButtons component.
 * @interface ActionButtonsProps
 */
interface ActionButtonsProps {
  /** Callback function triggered when the enhance button is clicked. */
  onStreamingStart(): void;

  /** Callback function triggered when the stop button is clicked. */
  onStreamingStop(): void;

  /** Callback function triggered when the reset button is clicked. */
  onReset(): void;

  /** Indicates whether the enhance operation is in progress. */
  isLoading: boolean;
  /** Determines if the enhance button should be enabled. */
  isEnhancementAvailable: boolean;
  /** Optional CSS class name for additional styling. */
  className?: string;
}

/**
 * ActionButtons component that renders enhance and reset buttons.
 * Provides interactive buttons for enhancing prompts and resetting the state.
 *
 * @example
 * ```tsx
 * <ActionButtons
 *   onStreamingStart={handleEnhance}
 *   onReset={handleReset}
 *   isLoading={false}
 *   isEnhancementAvailable={true}
 *   className="mt-4"
 * />
 * ```
 *
 * @developer-notes
 * - The enhance button shows a loading spinner during operation
 * - Both buttons are disabled during loading state
 * - The enhance button is only enabled when enhancement is available
 */
const ActionButtons: React.FC<ActionButtonsProps> = (props) => {
  const {
    onStreamingStart,
    onStreamingStop,
    onReset,
    isLoading,
    isEnhancementAvailable,
    className = '',
  } = props;

  return (
    <div className={`flex items-center justify-center space-x-4 ${className}`}>
      {isLoading && (
        <Button
          variant="destructive"
          size="lg"
          className="min-w-32" onClick={onStreamingStop}
        >
          <RefreshCw className="h-4 w-4 mr-2 animate-spin"/>
          Interrupt
        </Button>
      )}

      {!isLoading && (
        <Button
          variant="default"
          disabled={!isEnhancementAvailable}
          size="lg"
          className="min-w-32"
          onClick={onStreamingStart}
        >
          <Zap className="h-4 w-4 mr-2"/>
          Ask AI
        </Button>
      )}

      <Button
        variant="outline"
        onClick={onReset}
        size="lg"
        disabled={!isEnhancementAvailable || isLoading}>
        Reset
      </Button>
    </div>
  );
};

export default ActionButtons;
