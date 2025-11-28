import { create } from 'zustand';
import { PromptHistory, HistoryStats } from '../types';

interface HistoryState {
  history: PromptHistory[];
  stats: HistoryStats | null;
  loading: boolean;
  error: string | null;
  
  // Actions
  setHistory: (history: PromptHistory[]) => void;
  addToHistory: (item: PromptHistory) => void;
  updateHistoryItem: (id: string, updates: Partial<PromptHistory>) => void;
  deleteHistoryItem: (id: string) => void;
  clearHistory: () => void;
  setStats: (stats: HistoryStats) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useHistoryStore = create<HistoryState>((set) => ({
  history: [],
  stats: null,
  loading: false,
  error: null,
  
  setHistory: (history) => set({ history }),
  
  addToHistory: (item) => set((state) => ({ 
    history: [item, ...state.history] 
  })),
  
  updateHistoryItem: (id, updates) => set((state) => ({
    history: state.history.map(item => 
      item.id === id ? { ...item, ...updates } : item
    )
  })),
  
  deleteHistoryItem: (id) => set((state) => ({
    history: state.history.filter(item => item.id !== id)
  })),
  
  clearHistory: () => set({ history: [] }),
  
  setStats: (stats) => set({ stats }),
  
  setLoading: (loading) => set({ loading }),
  
  setError: (error) => set({ error }),
}));