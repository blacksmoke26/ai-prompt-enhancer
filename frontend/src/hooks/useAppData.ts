/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import {useEffect, useState} from 'react';

// store
import {useAppStore} from '~/stores/appStore';
import {useDataStore} from '~/stores/dataStore';

// services
import ToneService from '~/services/ToneService';
import PromptService from '~/services/PromptService';
import ConfigService from '~/services/ConfigService';
import UserRoleService from '~/services/UserRoleService';
import ResponseLengthService from '~/services/ResponseLengthService';
import EnhancementTypeService from '~/services/EnhancementTypeService';
import TargetAudienceService from '~/services/TargetAudienceService';
import HistoryService from '~/services/HistoryService';
import PromptTemplateService from '~/services/PromptTemplateService.ts';

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
    setUserRoles,
    setTones,
    setTargetAudience,
    setResponseLengths,
    setEnhancementTypes,
    setListRoles,
    setListByRoles,
    setPromptTemplates,
    setPromptCategories,

  } = useDataStore();

  const {setConfig} = useAppStore();

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

      const [config, userRoles] = await Promise.all([
        ConfigService.getConfig(),
        UserRoleService.getAll(),
      ]);

      setConfig(config);
      setUserRoles(userRoles);

      // Load all data in parallel
      await Promise.all([
        //UserRoleService.getAll().then(setUserRoles),
        ToneService.getAll().then(setTones),
        HistoryService.getRolesList().then(setListRoles),
        PromptService.getModels().then(setModels),
        PromptService.getProviders().then(setProviders),
        TargetAudienceService.getAll().then(setTargetAudience),
        ResponseLengthService.getAll().then(setResponseLengths),
        PromptTemplateService.getCategories().then(setPromptCategories),
        PromptTemplateService.getTemplates().then(setPromptTemplates),
        EnhancementTypeService.getAll().then(setEnhancementTypes),
      ]);

      const roleKey = userRoles?.find(x => Number(x.id) === Number(config?.userRole))?.key ?? '';

      if (roleKey.length) {
        setListByRoles(roleKey, await HistoryService.getListByRole(roleKey));
      }
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
