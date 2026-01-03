/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {RefreshCw, Settings} from 'lucide-react';
import {Dialog, Flex, Button} from '@radix-ui/themes';

// libs
import {EnhancedAIBrainV3} from '~/lib/ai-brain-enhanced';

// constants
import {SmartSuggestion} from '~/constants/prompt-suggestions';

// ui  components
import {Badge} from '~/components/ui/Badge';
import {CardFooter} from '~/components/ui/Card';

// components
import BrainConfigPanel from './BrainConfigPanel';

/**
 * Renders a configurable footer panel with suggestions, settings, and interactive elements.
 * Used to display secondary content, configuration options, and contextual actions in the UI.
 *
 * Example:
 * <FooterPanel
 *   smartSuggestions={sampleSuggestions}
 *   smartSuggestions1={secondarySuggestions}
 *   enhancedAnalysis={analysisData}
 *   brainInstance={aiBrain}
 *   onConfigChange={(config) => console.log('Config changed:', config)}
 *   advancedMode={true}
 *   onClick={() => console.log('Panel clicked')}
 *   onCloseClick={() => console.log('Closed')}
 * />
 */
export interface FooterPanelProps {
  /**
   * Primary list of smart suggestions to display in the footer.
   */
  smartSuggestions: SmartSuggestion[];
  /**
   * Secondary list of smart suggestions for additional context or options.
   */
  smartSuggestions1: SmartSuggestion[];
  /**
   * Optional enhanced analysis data for advanced features or visualizations.
   */
  enhancedAnalysis: any;
  /**
   * The AI brain instance providing contextual data for suggestions and actions.
   */
  brainInstance: EnhancedAIBrainV3;
  /**
   * Callback triggered when configuration settings are updated.
   * Receives the updated configuration object.
   */
  onConfigChange: (config: any) => any;
  /**
   * Controls whether advanced features are visible in the footer panel.
   */
  advancedMode: boolean;
  /**
   * Callback triggered when the reanalyze action is initiated (e.g., via a reanalyze button).
   * Used to refresh analysis data or restart processing workflows.
   */
  onReanalyzeClick: () => void;
  /**
   * Callback triggered when the close action is initiated (e.g., by a close button).
   * Note: This prop uses `any` type, consider refining the type for better type safety.
   */
  onCloseClick:() => void;
}

/**
 * A configurable footer panel component displaying suggestions, settings, and interactive actions.
 *
 * Developer Notes:
 * - Requires `brainInstance` and `smartSuggestions` for core functionality
 * - `onConfigChange` allows dynamic configuration updates
 * - `advancedMode` toggles visibility of advanced options
 * - `onCloseClick` uses `any` type - consider refining to a specific function signature
 * - `smartSuggestions1` provides secondary suggestions for extended UI interactions
 */
const FooterPanel: React.FC<FooterPanelProps> = (props) => {
  return (
    <CardFooter className="border-t border-border p-4 bg-background/50 flex justify-between items-center">
      <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Showing {props.smartSuggestions.length} of {props.smartSuggestions1.length} suggestions
            </span>
        {props.enhancedAnalysis?.processingTime && (
          <Badge variant="secondary" className="text-xs">
            Analysis: {props.enhancedAnalysis.processingTime}ms
          </Badge>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Dialog.Root>
          <Dialog.Trigger>
            <Button
              variant="outline"
              className="hidden md:flex"
            >
              <Settings className="mr-1 h-3 w-3"/>
              Configure AI
            </Button>
          </Dialog.Trigger>
          <Dialog.Content maxWidth="500px">
            <Dialog.Title className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary"/>
              AI Brain Configuration
            </Dialog.Title>
            <Flex direction="column" gap="3">
              <div className="py-4 max-h-[70vh] overflow-y-auto">
                <BrainConfigPanel
                  config={props.brainInstance.getConfig()}
                  onConfigChange={props.onConfigChange}
                  isAdvancedMode={props.advancedMode}
                />
              </div>
            </Flex>
            <Flex gap="3" mt="4" justify="end">
              <Dialog.Close>
                <Button>
                  Done
                </Button>
              </Dialog.Close>
            </Flex>
          </Dialog.Content>
        </Dialog.Root>

        <Button
          color="iris"
          onClick={props.onReanalyzeClick}
        >
          <RefreshCw className="mr-1 h-3 w-3"/>
          Re-analyze
        </Button>
        <Button className="ml-1 mr-1" variant="ghost" onClick={props.onCloseClick}>
          Close
        </Button>
      </div>
    </CardFooter>
  );
};

export default FooterPanel;
