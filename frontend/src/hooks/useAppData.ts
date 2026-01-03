/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import {useEffect, useState} from 'react';

// store
import {useAppStore} from '~/stores/appStore';

// services
import ToneService from '~/services/ToneService';
import PromptService from '~/services/PromptService';
import ConfigService from '~/services/ConfigService';
import UserRoleService from '~/services/UserRoleService';
import ResponseLengthService from '~/services/ResponseLengthService';
import EnhancementTypeService from '~/services/EnhancementTypeService';

/**
 * Custom hook for managing application data loading and state.
 * Provides loading states, error handling, and data refresh functionality.
 *
 * @example
 * const { loading, error, refreshData } = useAppData();
 * if (loading) return <div>Loading...</div>;
 * if (error) return <div>Error: {error}</div>;
 * return <div>App loaded successfully</div>;
 *
 * @developer-note
 * This hook automatically loads initial data on mount and updates the global store.
 * All data fetching is done in parallel for optimal performance.
 */
export const useAppData = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const {
    setModels,
    setProviders,
    setEnhancementTypes,
    setUserRoles,
    setConfig,
    setResponseLengths,
    setTones,
  } = useAppStore();

  useEffect(() => {
    loadInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Loads all initial application data from services and updates the store.
   * Fetches models, providers, enhancement types, user roles, and config in parallel.
   *
   * @developer-note
   * Uses Promise.all for parallel execution to minimize loading time.
   * Any error during loading will set the error state and stop loading.
   */
  const loadInitialData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load all data in parallel
      await Promise.all([
        ToneService.getAll().then(setTones),
        ConfigService.getConfig().then(setConfig),
        PromptService.getModels().then(setModels),
        UserRoleService.getAll().then(setUserRoles),
        PromptService.getProviders().then(setProviders),
        ResponseLengthService.getAll().then(setResponseLengths),
        EnhancementTypeService.getAll().then(setEnhancementTypes),
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Refreshes all application data by reloading initial data.
   * Useful for manual data refresh after updates or error recovery.
   *
   * @example
   * const handleRefresh = async () => {
   *   await refreshData();
   *   console.log('Data refreshed');
   * };
   *
   * @developer-note
   * This is essentially a wrapper around loadInitialData for clarity.
   * Could be extended to include partial refreshes in the future.
   */
  const refreshData = async () => {
    await loadInitialData();
  };

  return {
    loading,
    error,
    refreshData,
  };
};
