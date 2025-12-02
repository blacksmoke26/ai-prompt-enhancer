import {create} from 'zustand';

// types
import type {PromptHistory, HistoryStats, } from '~/types/index';

/**
 * Interface defining the shape and actions of the history state management store.
 * @example
 * const store = useHistoryStore();
 * console.log(store.history); // Access history array
 */
export interface HistoryState {
  /** Array of prompt history items */
  history: PromptHistory[];
  /** Statistics about the history data */
  stats: HistoryStats | null;
  /** Loading state indicator */
  loading: boolean;
  /** Error message if any operation fails */
  error: string | null;

  // Actions
  /** Replaces the entire history array with new items */
  setHistory(history: PromptHistory[]): void;

  /** Adds a new prompt to the beginning of the history array */
  addToHistory(item: PromptHistory): void;

  /** Updates an existing history item by its ID with partial updates */
  updateHistoryItem(id: string, updates: Partial<PromptHistory>): void;

  /** Removes a history item from the array by its ID */
  deleteHistoryItem(id: string): void;

  /** Clears all items from the history array */
  clearHistory(): void;

  /** Updates the history statistics */
  setStats(stats: HistoryStats): void;

  /** Sets the loading state */
  setLoading(loading: boolean): void;

  /** Sets or clears the error message */
  setError(error: string | null): void;
}

/**
 * Zustand store for managing prompt history state and operations.
 * @developer-note This store uses immer-like patterns for state updates
 * @example
 * const { addToHistory, history } = useHistoryStore();
 * addToHistory({ id: '1', prompt: 'Hello', timestamp: Date.now() });
 */
export const useHistoryStore = create<HistoryState>((set) => ({
  history: [],
  stats: null,
  loading: false,
  error: null,

  setHistory: (history) => set({history}),

  addToHistory: (item) => set((state) => ({
    history: [item, ...state.history],
  })),

  updateHistoryItem: (id, updates) => set((state) => ({
    history: state.history.map(item =>
      item.id === id ? {...item, ...updates} : item,
    ),
  })),

  deleteHistoryItem: (id) => set((state) => ({
    history: state.history.filter(item => item.id !== id),
  })),

  clearHistory: () => set({history: []}),

  setStats: (stats) => set({stats}),

  setLoading: (loading) => set({loading}),

  setError: (error) => set({error}),
}));
