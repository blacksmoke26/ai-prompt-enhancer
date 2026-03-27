/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import axios from 'axios';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

// classes
import ToneService from '~/services/ToneService';
import ResponseLengthService from '~/services/ResponseLengthService';

// types
import {
  AIModel,
  AIProvider,
  AppConfig,
  EnhancementType,
  PromptHistory,
  PromptTemplateCategories,
  PromptTemplateResponse,
  ResponseLength,
  TargetAudience,
  Tone,
  UserRole,
} from '~/types';
import type {ListRoleItem} from '~/types/history-service';

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
 * Application state interface for managing app configuration and UI state
 * @example
 * ```typescript
 * const { config, theme, setTheme } = useAppStore();
 * ```
 */
export interface DataState {
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

  // Response Lengths and Tones
  /** Types of response length available */
  responseLengths: ResponseLength[];

  /** List of target audiences available */
  targetAudiences: TargetAudience[];

  /** Tones for prompt context */
  tones: Tone[];

  /** Categories for organizing prompt templates */
  promptCategories: PromptTemplateCategories[];

  /** Available prompt templates with content */
  promptTemplates: PromptTemplateResponse[];

  /** List of user roles for history filtering */
  listRoles: ListRoleItem[];

  /** Prompt history grouped by user roles */
  listByRoles: Record<string, PromptHistory[]>;

  /** Sets the response lengths */
  setResponseLengths(types: ResponseLength[]): void;

  /** Sets the target audience */
  setTargetAudience(list: TargetAudience[]): void;

  /** Sets the prompt categories */
  setPromptCategories(list: PromptTemplateCategories[]): void;

  /** Sets the prompt templates */
  setPromptTemplates(list: PromptTemplateResponse[]): void;

  /** Sets the tones */
  setTones(roles: Tone[]): void;

  /** Sets the list roles */
  setListRoles(rows: ListRoleItem[]): void;

  /** Sets the list by roles */
  setListByRoles(role: string, rows: PromptHistory[]): void;

  /** Toggles a user role */
  toggleUserRole(key: string, hidden: boolean): Promise<void>;

  /** Toggles the response length */
  toggleEnhancementType(key: string, hidden: boolean): Promise<void>;

  /** Toggles a user role */
  toggleResponseLength(key: string, hidden: boolean): Promise<void>;

  /** Toggles the tone */
  toggleTone(key: string, hidden: boolean): Promise<void>;
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
export const useDataStore = create<DataState>()(
  persist(
    (set) => ({
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

      async toggleResponseLength(key: string, hidden: boolean) {
        try {
          await ResponseLengthService.update(key, hidden);
          set(state => ({
            responseLengths: state.responseLengths.map((length) =>
              length.key === key ? {...length, hidden} : length,
            ),
          }));
        } catch (error) {
          console.error('Failed to save configuration:', error);
        }
      },

      async toggleTone(key: string, hidden: boolean) {
        try {
          await ToneService.update(key, hidden);
          set(state => ({
            tones: state.tones.map((tone) =>
              tone.key === key ? {...tone, hidden} : tone,
            ),
          }));
        } catch (error) {
          console.error('Failed to save configuration:', error);
        }
      },

      // Models and Providers
      models: [],
      providers: [],
      setModels: models => set({models}),
      setProviders: providers => set({providers}),

      // Enhancement Types and User Roles
      enhancementTypes: [],
      userRoles: [],
      setEnhancementTypes: types => set({enhancementTypes: types}),
      setUserRoles: roles => set({userRoles: roles}),

      // Response lengths and Tones
      responseLengths: [],
      targetAudiences: [],
      tones: [],
      listRoles: [],
      listByRoles: {},
      setResponseLengths: responseLengths => set({responseLengths}),
      setTargetAudience: targetAudiences => set({targetAudiences}),
      setTones: tones => set({tones}),
      setListRoles: listRoles => set({listRoles}),
      setListByRoles(role: string, rows: PromptHistory[]) {
        set(state => {
          state.listByRoles[role] = rows;
          return state;
        });
      },

      promptCategories: [],
      setPromptCategories: promptCategories => set({promptCategories}),

      promptTemplates: [],
      setPromptTemplates: promptTemplates => {
        const templates = promptTemplates.map(x => {
          x.content = x.content.replace(/\n+/g, `\n`);
          return x;
        });

        set({promptTemplates: templates});
      },
    }),
    {
      name: 'prompt-enhancer-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({}),
    },
  ),
);
