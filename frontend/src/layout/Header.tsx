/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useState} from 'react';
import {Brain, ChevronsUpDown, Moon, Sun} from 'lucide-react';

// hooks
import {useAppStore} from '~/stores/appStore';
import {useDataStore} from '~/stores/dataStore';
import {useTheme} from '~/components/ThemeProvider';

// ui components
import {Button} from '~/components/ui/Button';

// components
import ModelProvider from '~/components/ModelSelector/ModelProvider';

// types
import type {AIModel} from '~/types';

/**
 * Props for the `Header` component, which includes optional `heading` and `icon`, and a required `currentTab` to indicate the active tab.
 * This interface is typically used to configure the appearance and behavior of a header component in a UI framework.
 */
export interface HeaderProps {
  /**
   * The main heading of the header. Can be a string or a React node (e.g., JSX element).
   */
  heading?: string | React.ReactNode;
  /**
   * An optional icon to display alongside the header. Can be a string (e.g., emoji or icon name) or a React node.
   */
  icon?: string | React.ReactNode;
  /**
   * The currently active tab, used to determine the state or styling of the header in a multi-tab interface.
   */
  currentTab: string;
}

const ModelSelector: React.FC = () => {
  const {models, providers} = useDataStore();
  const {config, setConfig} = useAppStore();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const provider = providers.find(x => x.name === config.provider)!;
  const model = models.find(x => x.id === config.model)!;
  const isSelected = model !== undefined;

  const handleSelectModel = (model: AIModel) => {
    setConfig({
      model: model.name,
      provider: model.provider,
    });
    setIsModalOpen(false);
  };

  return <>
    {/* Display Selected Model */}
    <div className="ml-4">
      <button
        onClick={() => setIsModalOpen(true)}
        className="text-sm"
      >
        {isSelected ? <><Brain className="display-inline mr-1" size="18"/> {model.name} | {provider.caption} <span
          className="relative top-[1px]"><ChevronsUpDown className="display-inline"
                                                         size="14"/></span></> : 'Choose Provider'}
      </button>
    </div>

    {/* Modal Component */}
    <ModelProvider
      onClose={() => setIsModalOpen(false)}
      isOpen={isModalOpen}
      onSelect={handleSelectModel}
      models={models}
    />
  </>;
};

const Header: React.FC<HeaderProps> = ({heading, icon, currentTab = 'assistant'}) => {
  const {isDarkTheme, setTheme} = useTheme();

  return (
    <header
      className="flex items-center justify-between px-6 py-4 pb-3 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-30">
      <div className="flex items-center gap-3">
        {icon && (
          <div className="py-2 rounded-lg text-primary">
            {icon}
          </div>
        )}

        {heading && (
          <h1 className="text-lg font-semibold tracking-tight text-foreground">{heading}</h1>
        )}

        {currentTab === 'assistant' && (
          <ModelSelector/>
        )}
      </div>
      <div className="flex items-center gap-4">

        <div className="hidden md:flex text-xs text-muted-foreground gap-4">
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> System Ready</span>
        </div>
        <Button
          variant="plain"
          size="sm"
          onClick={() => setTheme(isDarkTheme ? 'light' : 'dark')}
          className="p-2 rounded-full transition-colors duration-200
                   hover:bg-muted text-muted-foreground hover:text-foreground"
          aria-label="Toggle Theme"
        >
          {isDarkTheme ? <Sun size={20}/> : <Moon size={20}/>}
        </Button>
      </div>
    </header>
  );
};

export default Header;
