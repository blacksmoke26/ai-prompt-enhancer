/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import axios from 'axios';

// types
import type {AppConfig, AIModel, AIProvider, EnhancementType, UserRole} from '~/types';
import {debounce} from '~/utils/helpers.ts';

// Dashboard layout item interface
export interface DashboardLayoutItem {
  id: string;
  type: 'enhancer' | 'history' | 'stats' | 'settings';
  title: string;
  width: number; // Grid column width (1-12)
  height?: number; // Row height if needed
  visible: boolean;
  sortable: boolean;
}

// Dashboard layout configuration
export interface DashboardLayout {
  items: DashboardLayoutItem[];
  dragEnabled: boolean;
  snapToGrid: boolean;
  gridSize: number;
}

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

  saveConfig(config: Partial<AppConfig>): Promise<void>;

  // Models and Providers
  /** Available AI models in the system */
  models: AIModel[];
  /** Available AI providers */
  providers: AIProvider[];

  /** Sets the list of available models */
  setModels(models: AIModel[]): void;

  /** Sets the list of available providers */
  setProviders(providers: AIProvider[]): void;

  // Enhancement Types and User Roles
  /** Types of prompt enhancements available */
  enhancementTypes: EnhancementType[];
  /** User roles for prompt context */
  userRoles: UserRole[];

  /** Sets the enhancement types */
  setEnhancementTypes(types: EnhancementType[]): void;

  /** Sets the user roles */
  setUserRoles(roles: UserRole[]): void;

  // UI State
  /** Currently selected model ID */
  selectedModel: string;
  /** Currently selected provider ID */
  selectedProvider: string;
  /** Currently selected enhancement type */
  selectedEnhancementType: string;
  /** Currently selected user role */
  selectedUserRole: string;

  /** Updates the selected model */
  setSelectedModel(model: string): void;

  /** Updates the selected provider */
  setSelectedProvider(provider: string): void;

  /** Updates the selected enhancement type */
  setSelectedEnhancementType(type: string): void;

  /** Updates the selected user role */
  setSelectedUserRole(role: string): void;

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

  // Dashboard Layout
  /** Dashboard layout configuration */
  dashboardLayout: DashboardLayout;

  /** Updates dashboard layout */
  setDashboardLayout(layout: Partial<DashboardLayout>): void;

  /** Resets dashboard layout to default */
  resetDashboardLayout(): void;

  /** Auto-arranges dashboard layout */
  autoArrangeLayout(): void;

  /** Toggles a user role */
  toggleUserRole(key: string, hidden: boolean): Promise<void>;

  /** Toggles the enhancement type */
  toggleEnhancementType(key: string, hidden: boolean): Promise<void>;
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

      async toggleUserRole(key: string, hidden: boolean) {
        set((state) => ({
          userRoles: state.userRoles.map((role) =>
            role.id === key ? {...role, hidden} : role
          ),
        }));

        try {
          await axios.put(`/api/user-roles/${key}`, {hidden}, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
        } catch (error) {
          console.error('Failed to save configuration:', error);
        }
      },

      async toggleEnhancementType(key: string, hidden: boolean) {
        set((state) => ({
          enhancementTypes: state.enhancementTypes.map((type) =>
            type.id === key ? {...type, hidden} : type
          ),
        }));

        try {
          await axios.put(`/api/enhancement-types/${key}`, {hidden}, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
        } catch (error) {
          console.error('Failed to save configuration:', error);
        }
      },

      // Models and Providers
      models: [],
      providers: [],
      setModels: (models) => set({models}),
      setProviders: (providers) => set({providers}),

      // Enhancement Types and User Roles
      enhancementTypes: [],
      userRoles: [],
      setEnhancementTypes: (types) => set({enhancementTypes: types}),
      setUserRoles: (roles) => set({userRoles: roles}),

      // UI State
      selectedModel: '',
      selectedProvider: '',
      selectedEnhancementType: 'enhance',
      selectedUserRole: 'general',
      setSelectedModel: (model) => set({selectedModel: model}),
      setSelectedProvider: (provider) => set({selectedProvider: provider}),
      setSelectedEnhancementType: (type) => set({selectedEnhancementType: type}),
      setSelectedUserRole: (role) => set({selectedUserRole: role}),

      // Theme
      theme: 'system',
      setTheme: (theme) => set({theme}),

      // Sidebar
      sidebarOpen: true,
      setSidebarOpen: (open) => set({sidebarOpen: open}),

      // Dashboard Layout
      dashboardLayout: {
        items: [
          {id: 'enhancer', type: 'enhancer', title: 'Prompt Enhancer', width: 8, visible: true, sortable: true},
          {id: 'history', type: 'history', title: 'History', width: 8, visible: true, sortable: true},
          {id: 'stats', type: 'stats', title: 'Statistics', width: 4, visible: true, sortable: true},
          {id: 'settings', type: 'settings', title: 'Settings', width: 8, visible: true, sortable: true},
        ],
        dragEnabled: true,
        snapToGrid: true,
        gridSize: 12,
      },
      setDashboardLayout: (layout) => set((state) => ({
        dashboardLayout: {...state.dashboardLayout, ...layout},
      })),
      resetDashboardLayout: () => set({
        dashboardLayout: {
          items: [
            {id: 'enhancer', type: 'enhancer', title: 'Prompt Enhancer', width: 8, visible: true, sortable: true},
            {id: 'history', type: 'history', title: 'History', width: 8, visible: true, sortable: true},
            {id: 'stats', type: 'stats', title: 'Statistics', width: 4, visible: true, sortable: true},
            {id: 'settings', type: 'settings', title: 'Settings', width: 8, visible: true, sortable: true},
          ],
          dragEnabled: true,
          snapToGrid: true,
          gridSize: 12,
        },
      }),
      autoArrangeLayout: () => set((state) => {
        const visibleItems = state.dashboardLayout.items.filter(item => item.visible);
        const autoItems = visibleItems.map((item, index) => {
          const width = Math.floor(12 / visibleItems.length);

          return {
            ...item,
            width: width,
          };
        });

        return {
          dashboardLayout: {
            ...state.dashboardLayout,
            items: autoItems,
          },
        };
      }),
    }),
    {
      name: 'prompt-enhancer-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        config: state.config,
        selectedModel: state.selectedModel,
        selectedProvider: state.selectedProvider,
        selectedEnhancementType: state.selectedEnhancementType,
        selectedUserRole: state.selectedUserRole,
        theme: state.theme,
        sidebarOpen: state.sidebarOpen,
        dashboardLayout: state.dashboardLayout,
      }),
    },
  ),
);
