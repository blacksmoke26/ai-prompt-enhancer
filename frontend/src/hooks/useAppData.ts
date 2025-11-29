import { useEffect, useState } from 'react';
import { useAppStore } from '~/stores/appStore.ts';
import { promptService } from '~/utils/promptService.ts';
import { configService } from '~/utils/configService.ts';

export const useAppData = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    setModels,
    setProviders,
    setEnhancementTypes,
    setUserRoles,
    setConfig
  } = useAppStore();

  useEffect(() => {
    loadInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load all data in parallel
      const [models, providers, enhancementTypes, userRoles, appConfig] = await Promise.all([
        promptService.getModels(),
        promptService.getProviders(),
        configService.getEnhancementTypes(),
        configService.getUserRoles(),
        configService.getConfig(),
      ]);

      setModels(models);
      setProviders(providers);
      setEnhancementTypes(enhancementTypes);
      setUserRoles(userRoles);
      setConfig(appConfig);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    await loadInitialData();
  };

  return {
    loading,
    error,
    refreshData,
  };
};
