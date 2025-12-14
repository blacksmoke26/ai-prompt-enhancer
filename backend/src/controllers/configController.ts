/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// classes
import {ConfigManager} from '~/config/ConfigManager';

// actions
import getConfig from '~/actions/config/getConfig';
import updateConfig from '~/actions/config/updateConfig';
import resetConfig from '~/actions/config/resetConfig';
import exportConfig from '~/actions/config/exportConfig';
import importConfig from '~/actions/config/importConfig';
import getEnhancementTypes from '~/actions/config/getEnhancementTypes';
import getUserRoles from '~/actions/config/getUserRoles';

// types
import type {FastifyInstance} from 'fastify';
import type {AppConfig} from '~/types/index';

/**
 * Registers configuration management routes for Fastify.
 * @param fastify - Fastify instance for route registration
 * @param options - Configuration options containing ConfigManager instance
 * @example
 * ```typescript
 * await fastify.register(configRoutes, { configManager });
 * ```
 * @developer-note Ensure configManager is properly initialized before registering routes
 */
export default async function configRoutes(fastify: FastifyInstance, options: { configManager: ConfigManager }) {
  const {configManager} = options;

  /**
   * Retrieves the current application configuration.
   * @example GET /config
   * @developer-note Returns the full config object with all settings
   */
  fastify.get('/', async (_request, reply) => {
    try {
      const config = await getConfig(configManager);
      return reply.code(200).send(config);
    } catch (error: any) {
      fastify.log.error('Failed to get config:', error);
      return reply.code(500).send({error: 'Failed to fetch config'});
    }
  });

  /**
   * Updates the application configuration with validated changes.
   * @example PUT /config with body: {"setting": "value"}
   * @developer-note All updates are validated against configUpdateSchema
   */
  fastify.put<{ Body: AppConfig }>('/', async (request, reply) => {
    try {
      const updates = request.body;
      const updatedConfig = await updateConfig(configManager, updates);
      return reply.code(200).send(updatedConfig);
    } catch (error: any) {
      fastify.log.error('Failed to update config:', error);
      return reply.code(500).send({error: 'Failed to update config'});
    }
  });

  /**
   * Resets the configuration to default values.
   * @example POST /config/reset
   * @developer-note This action is irreversible - ensure user confirmation in UI
   */
  fastify.post('/reset', async (_request, reply) => {
    try {
      const config = await resetConfig(configManager);
      return reply.code(200).send(config);
    } catch (error: any) {
      fastify.log.error('Failed to reset config:', error);
      return reply.code(500).send({error: 'Failed to reset config'});
    }
  });

  /**
   * Exports the current configuration as a downloadable JSON file.
   * @example GET /config/export
   * @developer-note Response headers force file download with timestamp
   */
  fastify.get('/export', async (_request, reply) => {
    try {
      const configJson = await exportConfig(configManager);

      reply.header('Content-Type', 'application/json');
      reply.header('Content-Disposition', `attachment; filename="prompt-enhancer-config-${new Date().toISOString().split('T')[0]}.json"`);

      return reply.code(200).send(configJson);
    } catch (error: any) {
      fastify.log.error('Failed to export config:', error);
      return reply.code(500).send({error: 'Failed to export config'});
    }
  });

  /**
   * Imports configuration from a JSON string.
   * @example POST /config/import with body: {"configJson": "{}"}
   * @developer-note Invalid JSON will be rejected - validate before sending
   */
  fastify.post('/import', async (request, reply) => {
    try {
      const {configJson} = request.body as { configJson: string };

      const success = await importConfig(configManager, configJson);

      if (!success) {
        return reply.code(400).send({error: 'Invalid config JSON'});
      }

      const config = await getConfig(configManager);
      return reply.code(200).send(config);
    } catch (error: any) {
      fastify.log.error('Failed to import config:', error);
      return reply.code(500).send({error: 'Failed to import config'});
    }
  });

  /**
   * Retrieves all available enhancement types for prompts.
   * @example GET /config/enhancement-types
   * @developer-note Used to populate dropdown options in UI
   */
  fastify.get('/enhancement-types', async (_request, reply) => {
    try {
      const types = await getEnhancementTypes();
      return reply.code(200).send(types);
    } catch (error: any) {
      fastify.log.error('Failed to get enhancement types:', error);
      return reply.code(500).send({error: 'Failed to fetch enhancement types'});
    }
  });

  /**
   * Retrieves all defined user roles in the system.
   * @example GET /config/user-roles
   * @developer-note Used for role-based access control configurations
   */
  fastify.get('/user-roles', async (_request, reply) => {
    try {
      const roles = await getUserRoles();
      return reply.code(200).send(roles);
    } catch (error: any) {
      fastify.log.error('Failed to get user roles:', error);
      return reply.code(500).send({error: 'Failed to fetch user roles'});
    }
  });
}
