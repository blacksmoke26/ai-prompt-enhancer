import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AppConfig, AIModel, AIProvider, EnhancementType, UserRole } from '../types';

interface AppState {
  // Config
  config: AppConfig;
  setConfig: (config: Partial<AppConfig>) => void;
  
  // Models and Providers
  models: AIModel[];
  providers: AIProvider[];
  setModels: (models: AIModel[]) => void;
  setProviders: (providers: AIProvider[]) => void;
  
  // Enhancement Types and User Roles
  enhancementTypes: EnhancementType[];
  userRoles: UserRole[];
  setEnhancementTypes: (types: EnhancementType[]) => void;
  setUserRoles: (roles: UserRole[]) => void;
  
  // UI State
  selectedModel: string;
  selectedEnhancementType: string;
  selectedUserRole: string;
  setSelectedModel: (model: string) => void;
  setSelectedEnhancementType: (type: string) => void;
  setSelectedUserRole: (role: string) => void;
  
  // Theme
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  
  // Sidebar
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Config
      config: {
        ollama: { url: 'http://localhost:11434', timeout: 30000 },
        theme: 'system',
        autoSave: true,
        maxHistoryItems: 1000,
        defaultModel: 'llama2',
        defaultSystemPrompt: 'You are a helpful AI assistant specialized in enhancing and improving prompts.',
      },
      setConfig: (updates) => set((state) => ({ 
        config: { ...state.config, ...updates } 
      })),
      
      // Models and Providers
      models: [],
      providers: [],
      setModels: (models) => set({ models }),
      setProviders: (providers) => set({ providers }),
      
      // Enhancement Types and User Roles
      enhancementTypes: [],
      userRoles: [],
      setEnhancementTypes: (types) => set({ enhancementTypes: types }),
      setUserRoles: (roles) => set({ userRoles: roles }),
      
      // UI State
      selectedModel: '',
      selectedEnhancementType: 'enhance',
      selectedUserRole: 'general',
      setSelectedModel: (model) => set({ selectedModel: model }),
      setSelectedEnhancementType: (type) => set({ selectedEnhancementType: type }),
      setSelectedUserRole: (role) => set({ selectedUserRole: role }),
      
      // Theme
      theme: 'system',
      setTheme: (theme) => set({ theme }),
      
      // Sidebar
      sidebarOpen: true,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
    }),
    {
      name: 'prompt-enhancer-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        config: state.config,
        selectedModel: state.selectedModel,
        selectedEnhancementType: state.selectedEnhancementType,
        selectedUserRole: state.selectedUserRole,
        theme: state.theme,
        sidebarOpen: state.sidebarOpen,
      }),
    }
  )
);