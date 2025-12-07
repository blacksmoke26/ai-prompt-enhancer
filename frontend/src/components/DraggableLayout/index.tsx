/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useCallback, useState} from 'react';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {Eye, EyeOff} from 'lucide-react';

// types
import type {DashboardLayoutItem} from '~/stores/appStore';
// hooks
import {useAppStore} from '~/stores/appStore';

// ui components
import {Button} from '~/components/ui/Button';
import {Card, CardContent, CardHeader, CardTitle} from '~/components/ui/Card';

// components
import DragHandle from './components/DragHandle';
import LayoutControls from './components/LayoutControls';

/**
 * Props for the DraggableLayout component
 */
interface DraggableLayoutProps {
  children: React.ReactNode;
  activeTab?: string;
}

/**
 * Individual sortable panel component
 */
const SortablePanel: React.FC<{
  item: DashboardLayoutItem;
  children: React.ReactNode;
  dragEnabled: boolean;
  onVisibilityToggle: (id: string, visible: boolean) => void;
}> = ({ item, children, dragEnabled, onVisibilityToggle }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id, disabled: !dragEnabled || !item.sortable });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  if (!item.visible) {
    return null;
  }

  return (
    <div ref={setNodeRef} style={style} className="relative">
      <Card className="h-full">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-medium">{item.title}</CardTitle>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => onVisibilityToggle(item.id, false)}
              >
                <EyeOff className="h-4 w-4" />
              </Button>
              {dragEnabled && item.sortable && (
                <DragHandle {...attributes} {...listeners} />
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {children}
        </CardContent>
      </Card>
    </div>
  );
};

/**
 * Draggable dashboard layout component with sorting and customization
 */
const DraggableLayout: React.FC<DraggableLayoutProps> = ({ children, activeTab }) => {
  const { dashboardLayout, setDashboardLayout } = useAppStore();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [showHiddenItems, setShowHiddenItems] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setDashboardLayout({
        items: arrayMove(
          dashboardLayout.items,
          dashboardLayout.items.findIndex(item => item.id === active.id),
          dashboardLayout.items.findIndex(item => item.id === over?.id)
        )
      });
    }

    setActiveId(null);
  }, [dashboardLayout.items, setDashboardLayout]);

  const handleDragOver = useCallback((event: DragOverEvent) => {
    // This could be used for more complex drag and drop logic
    // For now, we're just using the sortable context
  }, []);

  const handleVisibilityToggle = useCallback((id: string, visible: boolean) => {
    setDashboardLayout({
      items: dashboardLayout.items.map(item =>
        item.id === id ? { ...item, visible } : item
      )
    });
  }, [dashboardLayout.items, setDashboardLayout]);

  const getVisibleItemsForTab = useCallback(() => {
    if (!activeTab) return [];

    // Filter items based on the current active tab
    return dashboardLayout.items.filter(item => {
      if (!item.visible) return false;

      // Map dashboard item types to tabs
      const tabMap: Record<string, string[]> = {
        'enhancer': ['enhancer'],
        'history': ['history'],
        'stats': ['stats'],
        'settings': ['settings']
      };

      console.log([activeTab, item.id, item.type]);

      return tabMap[activeTab]?.includes(item.type) || false;
    });
  }, [activeTab, dashboardLayout.items]);

  const getHiddenItems = useCallback(() => {
    return dashboardLayout.items.filter(item => !item.visible);
  }, [dashboardLayout.items]);

  const visibleItems = getVisibleItemsForTab();
  const hiddenItems = getHiddenItems();

  return (
    <div className="relative">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <SortableContext items={visibleItems.map(item => item.id)} strategy={verticalListSortingStrategy}>
          <div className="grid gap-4 mb-4" style={{
            gridTemplateColumns: visibleItems
              .map(item => `${item.width}fr`)
              .join(' ')
          }}>
            {visibleItems.map(item => (
              <div key={item.id} style={{ gridColumn: `span ${item.width}` }}>
                <SortablePanel
                  item={item}
                  dragEnabled={dashboardLayout.dragEnabled}
                  onVisibilityToggle={handleVisibilityToggle}
                >
                  {/* This would render the appropriate component based on item.type */}
                  {/* For now, we're using the children prop which contains the rendered content */}
                  {children}
                </SortablePanel>
              </div>
            ))}
          </div>
        </SortableContext>

        <DragOverlay>
          {activeId ? (
            <Card className="shadow-lg opacity-90">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">
                  {dashboardLayout.items.find(item => item.id === activeId)?.title}
                </CardTitle>
              </CardHeader>
            </Card>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Hidden items panel */}
      {showHiddenItems && hiddenItems.length > 0 && (
        <Card className="mt-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Hidden Panels</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2">
              {hiddenItems.map(item => (
                <Button
                  key={item.id}
                  variant="outline"
                  size="sm"
                  onClick={() => handleVisibilityToggle(item.id, true)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  {item.title}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Layout controls */}
      <LayoutControls
        showHiddenItems={showHiddenItems}
        setShowHiddenItems={setShowHiddenItems}
        hiddenItemsCount={hiddenItems.length}
        dragEnabled={dashboardLayout.dragEnabled}
        onToggleDrag={() => setDashboardLayout({ dragEnabled: !dashboardLayout.dragEnabled })}
      />
    </div>
  );
};

export default DraggableLayout;
