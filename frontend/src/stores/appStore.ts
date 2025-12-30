/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import axios from 'axios';
import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';

// types
import type {AppConfig, AIModel, AIProvider, EnhancementType, UserRole, PromptRequest} from '~/types';

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
export interface DashboardLayoutItem {
  /** Unique identifier for the dashboard item */
  id: string;
  /** The type of dashboard item, which determines its functionality and appearance */
  type: 'enhancer' | 'history' | 'stats' | 'settings';
  /** Display title for the dashboard item */
  title: string;
  /** Grid column width (1-12) defining the item's horizontal size */
  width: number;
  /** Optional row height if additional vertical space is needed */
  height?: number;
  /** Controls whether the item is visible on the dashboard */
  visible: boolean;
  /** Indicates if the item can be dragged and sorted within the layout */
  sortable: boolean;
}

/**
 * Defines the overall configuration for a dashboard layout, including items and grid behavior.
 * @example
 * {
 *   items: [/* Array of DashboardLayoutItem *!/],
 *   dragEnabled: true,
 *   snapToGrid: true,
 *   gridSize: 12
 * }
 * @developerNotes Set `gridSize` based on the desired grid column count and ensure `dragEnabled` aligns with user permissions.
 */
export interface DashboardLayout {
  /** Array of dashboard layout items composing the dashboard */
  items: DashboardLayoutItem[];
  /** Enables or disables drag-and-drop functionality for rearranging items */
  dragEnabled: boolean;
  /** Enables snapping items to the grid for alignment purposes */
  snapToGrid: boolean;
  /** Defines the grid size in columns, affecting how items align and snap during rearrangement */
  gridSize: number;
}

/**
 * Application configuration interface for storing and managing application settings
 * @example
 * ```typescript
 * const { config } = useAppStore();
 * ```
 */
export type ApplicationConfig = AppConfig & PromptRequest;

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
  config: ApplicationConfig;

  /** Updates configuration with partial changes */
  setConfig(config: Partial<ApplicationConfig>, save?: boolean): Promise<void>;

  /** Saves the current configuration to the backend */
  saveConfig(config: Partial<ApplicationConfig>): Promise<void>;

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

  // Model Selector Settings
  /** Component order for the model selector */
  componentOrder: string[];

  /** Component visibility settings for the model selector */
  visibleComponents: Record<string, boolean>;

  /** Sets the component order */
  setComponentOrder(order: string[]): void;

  /** Sets the component visibility */
  setVisibleComponents(components: Record<string, boolean>): void;
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
      config: {} as ApplicationConfig,
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
            role.id === key ? {...role, hidden} : role,
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
            type.id === key ? {...type, hidden} : type,
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

      // Model Selector Settings
      componentOrder: [
        'provider',
        'model',
        'enhancement',
        'role',
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
        'status'
      ],
      visibleComponents: {
        provider: true,
        model: true,
        enhancement: true,
        role: true,
        temperature: true,
        maxTokens: true,
        targetAudience: false,
        tone: true,
        responseLength: true,
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
          systemPrompt: state.config.systemPrompt,
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
        selectedModel: state.selectedModel,
        selectedProvider: state.selectedProvider,
        selectedEnhancementType: state.selectedEnhancementType,
        selectedUserRole: state.selectedUserRole,
        theme: state.theme,
        sidebarOpen: state.sidebarOpen,
        dashboardLayout: state.dashboardLayout,
        componentOrder: state.componentOrder,
        visibleComponents: state.visibleComponents,
      }),
    },
  ),
);
