/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';

// helpers
import {cn} from '~/utils/helpers.ts';

/**
 * Props interface for the ProviderTabNavigation component.
 * Defines the structure of props required to manage tab navigation.
 */
export interface ProviderTabNavigationProps {
  /**
   * The currently active tab identifier.
   * This string determines which tab is visually selected and its content displayed.
   */
  activeTab: string;

  /**
   * Callback function to update the active tab.
   * @param tab - The identifier of the tab to activate.
   * This function is called when a user clicks on a tab button.
   */
  setActiveTab: (tab: string) => void;
}

/**
 * ProviderTabNavigation component renders a navigation bar for provider selection.
 * This component displays a list of configurable tabs and manages their active state.
 * It's designed to work as a controlled component, receiving the active tab state
 * and a callback to update it.
 *
 * @param props - The component props conforming to ProviderTabNavigationProps
 * @param props.activeTab - The currently active tab identifier
 * @param props.setActiveTab - Function to update the active tab
 *
 * @example
 * ```tsx
 * const [activeTab, setActiveTab] = useState('ollama');
 *
 * <ProviderTabNavigation
 *   activeTab={activeTab}
 *   setActiveTab={setActiveTab}
 * />
 * ```
 *
 * @developer Note: The tabs configuration is hardcoded in this component.
 * Consider extracting it to a constant file if you need to reuse it elsewhere.
 */
const ProviderTabNavigation: React.FC<ProviderTabNavigationProps> = (props) => {
  const { activeTab, setActiveTab } = props;

  /**
   * Configuration for settings tabs with icons and labels
   * @developer Note: Update this array when adding new tabs
   */
  const tabs: { id: string; label: string; }[] = [
    {id: 'ollama', label: 'Ollama'},
    {id: 'lmstudio', label: 'LM Studio'},
    {id: 'openai', label: 'OpenAI'},
    {id: 'openrouter', label: 'OpenRouter'},
    {id: 'deepseek', label: 'DeepSeek'},
    {id: 'coze', label: 'Coze'},
    {id: 'qianfan', label: 'QianFan'},
    {id: 'gemini', label: 'Gemini'},
    {id: 'kimi', label: 'Kimi'},
    {id: 'groq', label: 'Groq'},
    {id: 'anthropic', label: 'Anthropic'},
    {id: 'mistral', label: 'Mistral'},
    {id: 'nvidia', label: 'Nvidia'},
    {id: 'cohere', label: 'Cohere'},
    {id: 'cody', label: 'Cody'},
    {id: 'xai', label: 'xAI'},
    {id: 'huggingface', label: 'HuggingFace'},
    {id: 'siliconflow', label: 'SiliconFlow'},
    {id: 'glm', label: 'Zhipu'},
  ];

  return (
    <div className="flex space-x-2 mb-6 border-b">
      {tabs.map((tab) => {
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'py-2 px-3 border-b-2 font-medium text-sm transition-colors',
              activeTab === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground',
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default ProviderTabNavigation;
