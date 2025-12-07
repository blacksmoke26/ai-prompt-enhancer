/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import { Eye, EyeOff, Grid, Lock, Unlock, Maximize2 } from 'lucide-react';
import { Button } from '~/components/ui/Button';
import { useAppStore } from '~/stores/appStore';

/**
 * Props for the LayoutControls component
 */
interface LayoutControlsProps {
  /** Whether to show hidden items panel */
  showHiddenItems: boolean;
  /** Function to toggle hidden items visibility */
  setShowHiddenItems: (show: boolean) => void;
  /** Count of hidden items */
  hiddenItemsCount: number;
  /** Whether drag is currently enabled */
  dragEnabled: boolean;
  /** Function to toggle drag mode */
  onToggleDrag: () => void;
}

/**
 * Layout controls component for managing dashboard panels
 */
const LayoutControls: React.FC<LayoutControlsProps> = ({
  showHiddenItems,
  setShowHiddenItems,
  hiddenItemsCount,
  dragEnabled,
  onToggleDrag,
}) => {
  const { resetDashboardLayout, autoArrangeLayout } = useAppStore();

  const handleReset = () => {
    if (confirm('Are you sure you want to reset the layout to default? This will rearrange all panels.')) {
      resetDashboardLayout();
    }
  };

  const handleAutoArrange = () => {
    autoArrangeLayout();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="flex items-center space-x-2 bg-background/90 backdrop-blur-sm border border-border rounded-lg shadow-lg p-2">
        {/* Toggle hidden items */}
        <Button
          variant={showHiddenItems ? 'default' : 'outline'}
          size="sm"
          onClick={() => setShowHiddenItems(!showHiddenItems)}
          disabled={hiddenItemsCount === 0}
          title={`Show hidden panels (${hiddenItemsCount})`}
        >
          {showHiddenItems ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>

        {/* Toggle drag mode */}
        <Button
          variant={dragEnabled ? 'default' : 'outline'}
          size="sm"
          onClick={onToggleDrag}
          title={dragEnabled ? 'Disable dragging' : 'Enable dragging'}
        >
          {dragEnabled ? <Unlock className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
        </Button>

        {/* Auto arrange layout */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleAutoArrange}
          title="Auto arrange panels"
        >
          <Grid className="h-4 w-4" />
        </Button>

        {/* Maximize all panels */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            // This would maximize all panels or set them to a preferred layout
            // Implementation depends on specific requirements
          }}
          title="Maximize all panels"
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default LayoutControls;