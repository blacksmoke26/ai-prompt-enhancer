import api from '../utils/api';
import { AppConfig, EnhancementType, UserRole } from '../types';

export const configService = {
  // Get config
  async getConfig(): Promise<AppConfig> {
    const response = await api.get('/config');
    return response.data;
  },

  // Update config
  async updateConfig(config: Partial<AppConfig>): Promise<AppConfig> {
    const response = await api.put('/config', config);
    return response.data;
  },

  // Reset config
  async resetConfig(): Promise<AppConfig> {
    const response = await api.post('/config/reset');
    return response.data;
  },

  // Export config
  async exportConfig(): Promise<void> {
    const response = await api.get('/config/export', {
      responseType: 'blob',
    });
    
    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `prompt-enhancer-config-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  },

  // Import config
  async importConfig(configJson: string): Promise<AppConfig> {
    const response = await api.post('/config/import', { configJson });
    return response.data;
  },

  // Get enhancement types
  async getEnhancementTypes(): Promise<EnhancementType[]> {
    const response = await api.get('/config/enhancement-types');
    return response.data;
  },

  // Get user roles
  async getUserRoles(): Promise<UserRole[]> {
    const response = await api.get('/config/user-roles');
    return response.data;
  },
};