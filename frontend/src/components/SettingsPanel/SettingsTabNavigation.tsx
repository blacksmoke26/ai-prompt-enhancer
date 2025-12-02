/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {User2, WandSparkles ,Settings as SettingsIcon, TestTube} from 'lucide-react';

// helpers
import {cn} from '~/utils/helpers';

// types
import type {SettingsTab} from './index';

export interface SettingsTabNavigationProps {
  /** Currently active settings tab */
  activeTab: SettingsTab;
  /** Function to set the active settings tab */
  setActiveTab: React.Dispatch<React.SetStateAction<SettingsTab>>;
}
/**
 * Navigation component for settings tabs
 * @developer Note: Update SETTINGS_TABS array when adding new tabs
 * @example
 * ```tsx
 * <SettingsTabNavigation
 *   activeTab="general"
 *   setActiveTab={(tab) => console.log(tab)}
 * />
 * ```
 */
const SettingsTabNavigation: React.FC<SettingsTabNavigationProps> = ({activeTab, setActiveTab}) => {
  /**
   * Configuration for settings tabs with icons and labels
   * @developer Note: Update this array when adding new tabs
   */
  const SETTINGS_TABS: { id: SettingsTab; label: string; icon: any; }[] = [
    {id: 'general', label: 'General', icon: SettingsIcon},
    {id: 'providers', label: 'AI Providers', icon: TestTube},
    {id: 'enhancement', label: 'Enhancement', icon: WandSparkles},
    {id: 'user-role', label: 'User Role', icon: User2},
    {id: 'data', label: 'Data Management', icon: SettingsIcon},
    {id: 'advanced', label: 'Advanced', icon: SettingsIcon},
  ];

  return (
    <div className="border-b border-border">
      <nav className="flex space-x-8">
        {SETTINGS_TABS.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'py-2 px-1 border-b-2 font-medium text-sm transition-colors',
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground',
              )}
            >
              <IconComponent className="h-4 w-4 mr-2 inline"/>
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default SettingsTabNavigation;
