/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import axios from 'axios';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

// types
import type {AppConfig, VisibleComponents} from '~/types';

/**
 * Represents a single item in a dashboard layout, defining its position, size, and behavior.
 * @example
 * {
 *   id: 'widget-1',
 *   type: 'stats',
 *   title: 'User Activity',
 *   width: 6,
 *   visible: true,
 *   sortable: true
 * }
 * @developerNotes Ensure `type` is one of the allowed enums and `width` is between 1-12.
 */

export type CurrentTab = 'enhancer' | 'history' | 'stats' | 'settings' | string;

/**
 * Application state interface for managing app configuration and UI state
 * @example
 * ```typescript
 * const { config, theme, setTheme } = useAppStore();
 * ```
 */
export interface AppState {
  // Config
  /** Global application configuration settings */
  config: AppConfig;

  /** Updates configuration with partial changes */
  setConfig(config: Partial<AppConfig>, save?: boolean): Promise<void>;

  /** Saves the current configuration to the backend */
  saveConfig(config: Partial<AppConfig>): Promise<void>;

  // Theme
  /** Current theme preference */
  theme: 'light' | 'dark' | 'system';

  /** Updates the theme preference */
  setTheme(theme: 'light' | 'dark' | 'system'): void;

  // Sidebar
  /** Sidebar visibility state */
  sidebarOpen: boolean;

  /** Updates sidebar visibility */
  setSidebarOpen(open: boolean): void;

  currentTab: CurrentTab;
  setCurrentTab(tab: CurrentTab): void;

  selectedRole: string;

  setSelectedRole(role: string): void;

  // Model Selector Settings
  /** Component order for the model selector */
  componentOrder: string[];

  /** Component visibility settings for the model selector */
  visibleComponents: VisibleComponents;

  /** Sets the component order */
  setComponentOrder(order: string[]): void;

  /** Sets the component visibility */
  setVisibleComponents(components: VisibleComponents): void;
}

/**
 * Saves the current application configuration to the backend
 * @param config The configuration to save
 * @returns Promise that resolves when save is complete
 */
export const saveAppConfig = async (config: Partial<AppConfig>): Promise<void> => {
  try {
    await axios.put('/api/config', config, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Configuration saved successfully');
  } catch (error) {
    console.error('Failed to save configuration:', error);
    throw error;
  }
};

/**
 * Zustand store for managing application state with persistence
 * @example
 * ```typescript
 * const { theme, setTheme } = useAppStore();
 * setTheme('dark');
 * ```
 * @developer-note This store automatically persists to localStorage and excludes transient data
 */
export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Config
      config: {} as AppConfig,
      async setConfig(updates, save: boolean = false) {
        // Call the original setConfig function
        set((state) => ({
          config: {...state.config, ...updates},
        }));

        if (save) {
          await saveAppConfig(updates);
        }
      },

      /** Saves the current configuration to the backend */
      async saveConfig(updates: Partial<AppConfig>) {
        try {
          await saveAppConfig(updates);
        } catch (error) {
          console.error('Failed to save configuration:', error);
          throw error;
        }
      },

      // Theme
      theme: 'system',
      setTheme: theme => set({theme}),

      // Role
      selectedRole: '',
      setSelectedRole: selectedRole => set({selectedRole}),

      // Role
      currentTab: 'enhancer',
      setCurrentTab: currentTab => set({currentTab}),

      // Sidebar
      sidebarOpen: true,
      setSidebarOpen: open => set({sidebarOpen: open}),

      // Model Selector Settings
      componentOrder: [
        'enhancement',
        'temperature',
        'maxTokens',
        'targetAudience',
        'tone',
        'responseLength',
        'customInstructions',
        'enhancementParameters',
        'format',
        'offTheRecord',
        'topP',
        'topK',
        'stopSequences',
        'frequencyPenalty',
        'presencePenalty',
        'status',
      ],
      visibleComponents: {
        enhancement: true,
        temperature: true,
        maxTokens: true,
        targetAudience: false,
        tone: false,
        responseLength: false,
        customInstructions: false,
        enhancementParameters: false,
        format: false,
        offTheRecord: true,
        topP: false,
        topK: false,
        stopSequences: false,
        frequencyPenalty: false,
        presencePenalty: false,
        status: true,
      },
      setComponentOrder: (order) => set({componentOrder: order}),
      setVisibleComponents: (components) => set({visibleComponents: components}),
    }),
    {
      name: 'prompt-enhancer-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        config: {
          ...state.config,
          targetAudience: state.config.targetAudience,
          tone: state.config.tone,
          responseLength: state.config.responseLength,
          customInstructions: state.config.customInstructions,
          enhancementParameters: state.config.enhancementParameters,
          format: state.config.format,
          offTheRecord: state.config.offTheRecord,
          topP: state.config.topP,
          topK: state.config.topK,
          stopSequences: state.config.stopSequences,
          frequencyPenalty: state.config.frequencyPenalty,
          presencePenalty: state.config.presencePenalty,
        },
        theme: state.theme,
        sidebarOpen: state.sidebarOpen,
        componentOrder: state.componentOrder,
        visibleComponents: state.visibleComponents,
      }),
    },
  ),
);
