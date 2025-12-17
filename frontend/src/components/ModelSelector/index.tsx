/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, { useState, useCallback, useRef } from 'react';

// store
import { useAppStore } from '~/stores/appStore';

// ui components
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/Card';

// components
import ProviderSelector from './ProviderSelector';
import ModelSelector from './ModelSelector';
import EnhancementTypeSelector from './EnhancementTypeSelector';
import UserRoleSelector from './UserRoleSelector';
import TemperatureSlider from './TemperatureSlider';
import MaxTokensInput from './MaxTokensInput';
import ProviderStatus from './ProviderStatus';

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
 *
 * @changes
 * - Split AI Model selection into two dropdowns:
 *   1. Provider selection dropdown
 *   2. Model selection dropdown (filtered by selected provider)
 * - Maintained all existing functionality for enhancement types and user roles
 * - Preserved model display formatting with badges and context information
 * - Added drag/sort functionality for component reordering
 * - Added drop area with smooth animations
 */
const ModelSelectorComponent: React.FC<ModelSelectorProps> = ({ className = '' }) => {
  const {
    selectedProvider,
  } = useAppStore();

  // Define the component order
  const [componentOrder, setComponentOrder] = useState([
    'provider',
    'model',
    'enhancement',
    'role',
    'temperature',
    'maxTokens',
    'status'
  ]);

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
    const newOrder = [...componentOrder];

    // Remove the item from its current position
    const [movedItem] = newOrder.splice(sourceIndex, 1);

    // Insert it at the new position
    const insertIndex = targetIndex > sourceIndex ? targetIndex - 1 : targetIndex;
    newOrder.splice(insertIndex, 0, movedItem);

    // Animate the reorder
    setComponentOrder(newOrder);
    setDropIndex(null);
  }, [componentOrder, dropIndex]);

  // Handle drop on the container (for dropping at the end)
  const handleContainerDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (dropIndex === null || dragItemRef.current === null) return;

    const sourceIndex = dragItemRef.current;
    const targetIndex = dropIndex;

    if (sourceIndex === targetIndex) return;

    const newOrder = [...componentOrder];
    const [movedItem] = newOrder.splice(sourceIndex, 1);
    newOrder.splice(targetIndex, 0, movedItem);
    setComponentOrder(newOrder);
    setDropIndex(null);
  }, [componentOrder, dropIndex]);

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
          transition: 'all 0.2s ease'
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
        <div className="absolute left-[-13px] top-0 bottom-0 w-6 flex items-center justify-start opacity-0 group-hover:opacity-100 transition-opacity cursor-move">
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
  const orderedComponents = componentOrder.map((componentId, index) => {
    if (componentId === 'status' && !selectedProvider) return null;

    switch(componentId) {
      case 'provider':
        return renderComponentWithHandle(<ProviderSelector />, 'provider', index);
      case 'model':
        return renderComponentWithHandle(<ModelSelector />, 'model', index);
      case 'enhancement':
        return renderComponentWithHandle(<EnhancementTypeSelector />, 'enhancement', index);
      case 'role':
        return renderComponentWithHandle(<UserRoleSelector />, 'role', index);
      case 'temperature':
        return renderComponentWithHandle(<TemperatureSlider />, 'temperature', index);
      case 'maxTokens':
        return renderComponentWithHandle(<MaxTokensInput />, 'maxTokens', index);
      case 'status':
        return renderComponentWithHandle(<ProviderStatus />, 'status', index);
      default:
        return null;
    }
  }).filter(Boolean);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <span>AI Configuration</span>
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
        {renderDropIndicator(componentOrder.length)}
      </CardContent>
    </Card>
  );
};

export default ModelSelectorComponent;
