/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// services
import {ConfigManager} from '~/config/ConfigManager';
import {AIProviderManager} from '~/services/AIProviderManager';
import {HistoryManager} from '~/services/HistoryManager';

// types
import type {FastifyInstance} from 'fastify';

export default async function promptRoutes(fastify: FastifyInstance, options: {
  providerManager: AIProviderManager,
  historyManager: HistoryManager,
  configManager: ConfigManager
}) {
  /**
   * Health check endpoint to verify server status.
   * @route GET /health
   * @returns {object} Server status and current timestamp.
   * @example
   * // Response
   * { "status": "ok", "timestamp": "2023-01-01T00:00:00.000Z" }
   */
  fastify.get('/health', async () => {
    return {status: 'ok', timestamp: new Date().toISOString()};
  });
}
