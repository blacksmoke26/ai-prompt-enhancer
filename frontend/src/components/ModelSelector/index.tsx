/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useState, useCallback, useRef, useEffect} from 'react';
import {Settings} from 'lucide-react';
import {Dialog, Flex} from '@radix-ui/themes';

// store
import {useAppStore} from '~/stores/appStore';

// ui components
import {Switch} from '~/components/ui/Switch';
import {Button} from '~/components/ui/Button';
import {Card, CardContent, CardHeader, CardTitle} from '~/components/ui/Card';

// components
import ProviderSelector from './ProviderSelector';
import ModelSelector from './ModelSelector';
import EnhancementTypeSelector from './EnhancementTypeSelector';
import UserRoleSelector from './UserRoleSelector';
import TemperatureSlider from './TemperatureSlider';
import MaxTokensInput from './MaxTokensInput';
import ProviderStatus from './ProviderStatus';
import TargetAudienceInput from './TargetAudienceInput';
import ToneInput from './ToneInput';
import ResponseLengthInput from './ResponseLengthInput';
import CustomInstructionsInput from './CustomInstructionsInput';
import EnhancementParametersInput from './EnhancementParametersInput';
import FormatInput from './FormatInput';
import OffTheRecordToggle from './OffTheRecordToggle';
import TopPInput from './TopPInput';
import TopKInput from './TopKInput';
import StopSequencesInput from './StopSequencesInput';
import FrequencyPenaltyInput from './FrequencyPenaltyInput';
import PresencePenaltyInput from './PresencePenaltyInput';

// types
import type {VisibleComponents} from '~/types';

/**
 * Props for the ModelSelector component
 * @interface ModelSelectorProps
 */
export interface ModelSelectorProps {
  /** Optional CSS class name for styling */
  className?: string;
}

/**
 * AI Configuration selector component for models, enhancements, and roles
 * @component
 * @example
 * <ModelSelector className="w-full max-w-md" />
 * @developerNotes
 * - Uses Zustand store for state management
 * - Split model selection into two dropdowns: provider and model
 * - Groups models by provider for better organization
 * - Displays provider connection status
 * - Includes descriptions for enhancement types and user roles
 * - Added drag/sort functionality for component reordering with drop area animation
 * - Added expand/collapse functionality (default collapsed)
 * - Added persistent drag-and-drop configuration using localStorage
 * - Added settings dialog for component visibility control
 * - Added advanced configuration panel in dialog
 *
 * @changes
 * - Split AI Model selection into two dropdowns:
 *   1. Provider selection dropdown
 *   2. Model selection dropdown (filtered by selected provider)
 * - Maintained all existing functionality for enhancement types and user roles
 * - Preserved model display formatting with badges and context information
 * - Added drag/sort functionality for component reordering
 * - Added drop area with smooth animations
 * - Added expand/collapse functionality (default collapsed)
 * - Added persistent drag-and-drop configuration using localStorage
 * - Added settings dialog for component visibility control
 * - Added advanced configuration panel in dialog
 */
const ModelSelectorComponent: React.FC<ModelSelectorProps> = ({className = ''}) => {
  const {
    componentOrder,
    visibleComponents,
    setComponentOrder,
    setVisibleComponents,
  } = useAppStore();

  // State for local component visibility and order (to avoid direct store mutations)
  const [localVisibleComponents, setLocalVisibleComponents] = useState<VisibleComponents>(visibleComponents);
  const [localComponentOrder, setLocalComponentOrder] = useState<string[]>(componentOrder);

  // Sync local state with store
  useEffect(() => {
    setLocalVisibleComponents(visibleComponents);
  }, [visibleComponents]);

  useEffect(() => {
    setLocalComponentOrder(componentOrder);
  }, [componentOrder]);

  // Save to store when local state changes
  useEffect(() => {
    setVisibleComponents(localVisibleComponents);
  }, [localVisibleComponents, setVisibleComponents]);

  useEffect(() => {
    setComponentOrder(localComponentOrder);
  }, [localComponentOrder, setComponentOrder]);

  const [dropIndex, setDropIndex] = useState<number | null>(null);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const dragItemRef = useRef<number | null>(null);

  // Handle drag start
  const handleDragStart = useCallback((e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
    e.dataTransfer.effectAllowed = 'move';
    dragItemRef.current = index;
    setDraggingIndex(index);

    // Add dragging class to body for global styling
    document.body.classList.add('dragging');

    // Small delay to allow drag to start before adding opacity
    setTimeout(() => {
      const element = e.currentTarget as HTMLElement;
      element.classList.add('dragging-item');
    }, 10);
  }, []);

  // Handle drag over
  const handleDragOver = useCallback((e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';

    // Get the element's position and size
    const element = e.currentTarget as HTMLElement;
    const rect = element.getBoundingClientRect();
    const mouseY = e.clientY;
    const elementTop = rect.top;
    const elementBottom = rect.bottom;
    const elementHeight = elementBottom - elementTop;

    // Determine if we're in the top or bottom half of the element
    const isTopHalf = mouseY < (elementTop + elementHeight / 2);

    // Set the drop index based on position
    const targetIndex = isTopHalf ? index : index + 1;
    setDropIndex(targetIndex);
  }, []);

  // Handle drag leave
  const handleDragLeave = useCallback(() => {
    setDropIndex(null);
  }, []);

  // Handle drag end
  const handleDragEnd = useCallback((e: React.DragEvent) => {
    setDropIndex(null);
    setDraggingIndex(null);
    dragItemRef.current = null;
    document.body.classList.remove('dragging');

    const element = e.currentTarget as HTMLElement;
    element.classList.remove('dragging-item');
  }, []);

  // Handle drop
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (dropIndex === null || dragItemRef.current === null) return;

    const sourceIndex = dragItemRef.current;
    const targetIndex = dropIndex;

    if (sourceIndex === targetIndex || sourceIndex + 1 === targetIndex) {
      setDropIndex(null);
      return;
    }

    // Create a new order array
    const newOrder = [...localComponentOrder];

    // Remove the item from its current position
    const [movedItem] = newOrder.splice(sourceIndex, 1);

    // Insert it at the new position
    const insertIndex = targetIndex > sourceIndex ? targetIndex - 1 : targetIndex;
    newOrder.splice(insertIndex, 0, movedItem);

    // Animate the reorder
    setLocalComponentOrder(newOrder);
    setDropIndex(null);
  }, [localComponentOrder, dropIndex]);

  // Handle drop on the container (for dropping at the end)
  const handleContainerDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (dropIndex === null || dragItemRef.current === null) return;

    const sourceIndex = dragItemRef.current;
    const targetIndex = dropIndex;

    if (sourceIndex === targetIndex) return;

    const newOrder = [...localComponentOrder];
    const [movedItem] = newOrder.splice(sourceIndex, 1);
    newOrder.splice(targetIndex, 0, movedItem);
    setLocalComponentOrder(newOrder);
    setDropIndex(null);
  }, [localComponentOrder, dropIndex]);

  // Toggle component visibility
  const toggleComponentVisibility = (componentId: string) => {
    setLocalVisibleComponents(prev => ({
      ...prev,
      [componentId]: !prev[componentId],
    }));
  };

  // Render a drop indicator
  const renderDropIndicator = (index: number) => {
    if (dropIndex !== index || draggingIndex === null) return null;

    return (
      <div
        className="drop-indicator animate-pulse"
        style={{
          height: 4,
          backgroundColor: '#3B82F6',
          borderRadius: 2,
          margin: '8px 0',
          transition: 'all 0.2s ease',
        }}
      />
    );
  };

  // Render a component with drag handle
  const renderComponentWithHandle = (component: React.ReactNode, id: string, index: number) => {
    return (
      <div
        key={id}
        draggable
        onDragStart={(e) => handleDragStart(e, index)}
        onDragOver={(e) => handleDragOver(e, index)}
        onDragLeave={handleDragLeave}
        onDragEnd={handleDragEnd}
        onDrop={handleDrop}
        className={`relative group mb-4 ${dropIndex !== null ? 'cursor-grabbing' : 'cursor-grab'}`}
      >
        <div
          className="absolute left-[-13px] top-0 bottom-0 w-6 flex items-center justify-start opacity-0 group-hover:opacity-100 transition-opacity cursor-move">
          <div className="flex flex-col space-y-1">
            <div className="w-2 h-0.5 bg-gray-400 rounded transition-colors duration-200 group-hover:bg-gray-400"></div>
            <div className="w-2 h-0.5 bg-gray-400 rounded transition-colors duration-200 group-hover:bg-gray-400"></div>
            <div className="w-2 h-0.5 bg-gray-400 rounded transition-colors duration-200 group-hover:bg-gray-400"></div>
          </div>
        </div>
        <div>
          {component}
        </div>
      </div>
    );
  };

  // Get components in the correct order
  const orderedComponents = localComponentOrder.map((componentId, index) => {
    if (!localVisibleComponents[componentId]) return null;

    switch (componentId) {
      case 'provider':
        return renderComponentWithHandle(<ProviderSelector/>, 'provider', index);
      case 'model':
        return renderComponentWithHandle(<ModelSelector/>, 'model', index);
      case 'enhancement':
        return renderComponentWithHandle(<EnhancementTypeSelector/>, 'enhancement', index);
      case 'role':
        return renderComponentWithHandle(<UserRoleSelector/>, 'role', index);
      case 'temperature':
        return renderComponentWithHandle(<TemperatureSlider/>, 'temperature', index);
      case 'maxTokens':
        return renderComponentWithHandle(<MaxTokensInput/>, 'maxTokens', index);
      case 'targetAudience':
        return renderComponentWithHandle(<TargetAudienceInput/>, 'targetAudience', index);
      case 'tone':
        return renderComponentWithHandle(<ToneInput/>, 'tone', index);
      case 'responseLength':
        return renderComponentWithHandle(<ResponseLengthInput/>, 'responseLength', index);
      case 'customInstructions':
        return renderComponentWithHandle(<CustomInstructionsInput/>, 'customInstructions', index);
      case 'enhancementParameters':
        return renderComponentWithHandle(<EnhancementParametersInput/>, 'enhancementParameters', index);
      case 'format':
        return renderComponentWithHandle(<FormatInput/>, 'format', index);
      case 'offTheRecord':
        return renderComponentWithHandle(<OffTheRecordToggle/>, 'offTheRecord', index);
      case 'topP':
        return renderComponentWithHandle(<TopPInput/>, 'topP', index);
      case 'topK':
        return renderComponentWithHandle(<TopKInput/>, 'topK', index);
      case 'stopSequences':
        return renderComponentWithHandle(<StopSequencesInput/>, 'stopSequences', index);
      case 'frequencyPenalty':
        return renderComponentWithHandle(<FrequencyPenaltyInput/>, 'frequencyPenalty', index);
      case 'presencePenalty':
        return renderComponentWithHandle(<PresencePenaltyInput/>, 'presencePenalty', index);
      case 'status':
        return renderComponentWithHandle(<ProviderStatus/>, 'status', index);
      default:
        return null;
    }
  }).filter(Boolean);

  // Handle opening advanced settings
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          <span>AI Configuration</span>
          <div className="flex space-x-2">
            {/* Settings Dialog */}
            <Dialog.Root>
              <Dialog.Trigger>
                {/* This is just a placeholder trigger, since we'll control it via the button */}
                <Button
                  variant="ghost"
                  size="sm"
                >
                  <Settings className="mr-1 h-3 w-3"/>
                </Button>
              </Dialog.Trigger>
              <Dialog.Content className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="space-y-4">
                  <h3 className="font-medium mb-0">
                    Component Visibility
                    <p className="text-xs font-normal text-muted-foreground mt-[4px] mb-8">
                      Customize which configuration components are displayed in the AI Configuration panel.
                    </p>
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {Object.entries(localVisibleComponents).map(([componentId, isVisible]) => (
                      <div key={componentId} className="flex items-center space-x-2">
                        <Switch
                          id={`visible-${componentId}`}
                          checked={isVisible}
                          onCheckedChange={() => toggleComponentVisibility(componentId)}
                          className="rounded"
                        />
                        <label htmlFor={`visible-${componentId}`} className="text-sm">
                          {componentId
                            .replace(/([A-Z])/g, ' $1')
                            .replace(/^./, str => str.toUpperCase())}
                        </label>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-0">
                    Check or uncheck the items above to show or hide them. This allows you to simplify the interface
                    by focusing only on the parameters relevant to your current task.
                  </p>
                </div>
                <Flex gap="3" mt="4" justify="end">
                  <Dialog.Close>
                    <Button variant="ghost">
                      Close
                    </Button>
                  </Dialog.Close>
                </Flex>
              </Dialog.Content>
            </Dialog.Root>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent
        className="space-y-4 relative"
        onDragOver={(e) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = 'move';
        }}
        onDrop={handleContainerDrop}
      >
        {orderedComponents.map((component, index) => (
          <React.Fragment key={index}>
            {renderDropIndicator(index)}
            {component}
          </React.Fragment>
        ))}
        {renderDropIndicator(localComponentOrder.length)}
      </CardContent>
    </Card>
  );
};

export default ModelSelectorComponent;
