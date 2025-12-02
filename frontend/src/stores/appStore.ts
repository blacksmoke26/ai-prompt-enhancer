/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';

// types
import type {AppConfig, AIModel, AIProvider, EnhancementType, UserRole} from '~/types/index';

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
  setConfig(config: Partial<AppConfig>): void;

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
}

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
      config: {
        ollama: {url: 'http://localhost:11434', timeout: 30000},
        theme: 'system',
        autoSave: true,
        maxHistoryItems: 1000,
        defaultModel: 'llama2',
        defaultSystemPrompt: 'You are a helpful AI assistant specialized in enhancing and improving prompts.',
      },
      setConfig: (updates) => set((state) => ({
        config: {...state.config, ...updates},
      })),

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
      }),
    },
  ),
);
