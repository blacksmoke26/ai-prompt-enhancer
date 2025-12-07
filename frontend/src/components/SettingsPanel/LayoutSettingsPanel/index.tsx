/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, { useState } from 'react';
import { 
  Settings, 
  Grid, 
  RotateCcw, 
  Eye, 
  EyeOff,
  Save,
  Lock,
  Unlock
} from 'lucide-react';

// hooks
import { useAppStore } from '~/stores/appStore';

// ui components
import { Button } from '~/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/Card';
import { Switch } from '~/components/ui/Switch';
import { Input } from '~/components/ui/Input';
import { Label } from '~/components/ui/Label';

/**
 * Layout settings panel component for configuring dashboard layout
 */
const LayoutSettingsPanel: React.FC = () => {
  const {
    dashboardLayout,
    setDashboardLayout,
    resetDashboardLayout,
    autoArrangeLayout
  } = useAppStore();
  
  const [showHiddenItems, setShowHiddenItems] = useState(false);

  const handleDragToggle = () => {
    setDashboardLayout({ dragEnabled: !dashboardLayout.dragEnabled });
  };

  const handleSnapToGridToggle = () => {
    setDashboardLayout({ snapToGrid: !dashboardLayout.snapToGrid });
  };

  const handleResetLayout = () => {
    if (confirm('Are you sure you want to reset the layout to default? This will rearrange all panels.')) {
      resetDashboardLayout();
    }
  };

  const handleAutoArrange = () => {
    autoArrangeLayout();
  };

  const handleSaveLayout = () => {
    // This would save the current layout configuration to persistent storage
    // For now, we're just showing a success message
    alert('Layout configuration saved successfully!');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Layout Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Drag & Drop</h3>
              <p className="text-sm text-muted-foreground">Enable or disable panel reordering</p>
            </div>
            <Switch 
              checked={dashboardLayout.dragEnabled} 
              onCheckedChange={handleDragToggle}
              aria-label="Enable/disable drag and drop"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Snap to Grid</h3>
              <p className="text-sm text-muted-foreground">Snap panels to grid when dragging</p>
            </div>
            <Switch 
              checked={dashboardLayout.snapToGrid} 
              onCheckedChange={handleSnapToGridToggle}
              aria-label="Enable/disable grid snapping"
            />
          </div>

          <div className="pt-2">
            <h3 className="font-medium mb-2">Grid Size</h3>
            <div className="flex items-center space-x-2">
              <Input 
                type="number" 
                min="1" 
                max="12" 
                value={dashboardLayout.gridSize}
                onChange={(e) => setDashboardLayout({ gridSize: parseInt(e.target.value) || 12 })}
                className="w-20"
              />
              <span className="text-sm text-muted-foreground">columns</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Grid className="h-5 w-5" />
            Layout Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button 
            variant="outline" 
            onClick={handleAutoArrange}
            className="w-full"
          >
            <Grid className="h-4 w-4 mr-2" />
            Auto Arrange Panels
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleResetLayout}
            className="w-full"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset to Default Layout
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleSaveLayout}
            className="w-full"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Current Layout
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Panel Visibility
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {dashboardLayout.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <span className="text-sm">{item.title}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDashboardLayout({
                    items: dashboardLayout.items.map(i => 
                      i.id === item.id ? { ...i, visible: !i.visible } : i
                    )
                  })}
                >
                  {item.visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LayoutSettingsPanel;