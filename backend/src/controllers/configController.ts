import { FastifyInstance } from 'fastify';
import { ConfigManager } from '~/config/ConfigManager';
import { configUpdateSchema } from '~/utils/validation';
import { enhancementTypes, userRoles } from '~/config/constants';

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
export async function configRoutes(fastify: FastifyInstance, options: { configManager: ConfigManager }) {
  const { configManager } = options;

  /**
   * Retrieves the current application configuration.
   * @example GET /config
   * @developer-note Returns the full config object with all settings
   */
  fastify.get('/', async (request, reply) => {
    try {
      const config = configManager.getConfig();
      return reply.code(200).send(config);
    } catch (error: any) {
      fastify.log.error('Failed to get config:', error);
      return reply.code(500).send({ error: 'Failed to fetch config' });
    }
  });

  /**
   * Updates the application configuration with validated changes.
   * @example PUT /config with body: {"setting": "value"}
   * @developer-note All updates are validated against configUpdateSchema
   */
  fastify.put('/', async (request, reply) => {
    try {
      const updates = request.body;

      const { error, value } = configUpdateSchema.validate(updates);
      if (error) {
        return reply.code(400).send({
          error: 'Validation failed',
          details: error.details.map(detail => detail.message)
        });
      }

      configManager.updateConfig(value);
      const updatedConfig = configManager.getConfig();

      return reply.code(200).send(updatedConfig);
    } catch (error: any) {
      fastify.log.error('Failed to update config:', error);
      return reply.code(500).send({ error: 'Failed to update config' });
    }
  });

  /**
   * Resets the configuration to default values.
   * @example POST /config/reset
   * @developer-note This action is irreversible - ensure user confirmation in UI
   */
  fastify.post('/reset', async (request, reply) => {
    try {
      configManager.resetConfig();
      const config = configManager.getConfig();
      return reply.code(200).send(config);
    } catch (error: any) {
      fastify.log.error('Failed to reset config:', error);
      return reply.code(500).send({ error: 'Failed to reset config' });
    }
  });

  /**
   * Exports the current configuration as a downloadable JSON file.
   * @example GET /config/export
   * @developer-note Response headers force file download with timestamp
   */
  fastify.get('/export', async (request, reply) => {
    try {
      const configJson = configManager.exportConfig();

      reply.header('Content-Type', 'application/json');
      reply.header('Content-Disposition', `attachment; filename="prompt-enhancer-config-${new Date().toISOString().split('T')[0]}.json"`);

      return reply.code(200).send(configJson);
    } catch (error: any) {
      fastify.log.error('Failed to export config:', error);
      return reply.code(500).send({ error: 'Failed to export config' });
    }
  });

  /**
   * Imports configuration from a JSON string.
   * @example POST /config/import with body: {"configJson": "{}"}
   * @developer-note Invalid JSON will be rejected - validate before sending
   */
  fastify.post('/import', async (request, reply) => {
    try {
      const { configJson } = request.body as { configJson: string };

      if (!configJson) {
        return reply.code(400).send({ error: 'configJson is required' });
      }

      const success = configManager.importConfig(configJson);

      if (!success) {
        return reply.code(400).send({ error: 'Invalid config JSON' });
      }

      const config = configManager.getConfig();
      return reply.code(200).send(config);
    } catch (error: any) {
      fastify.log.error('Failed to import config:', error);
      return reply.code(500).send({ error: 'Failed to import config' });
    }
  });

  /**
   * Retrieves all available enhancement types for prompts.
   * @example GET /config/enhancement-types
   * @developer-note Used to populate dropdown options in UI
   */
  fastify.get('/enhancement-types', async (request, reply) => {
    try {
      return reply.code(200).send(enhancementTypes);
    } catch (error: any) {
      fastify.log.error('Failed to get enhancement types:', error);
      return reply.code(500).send({ error: 'Failed to fetch enhancement types' });
    }
  });

  /**
   * Retrieves all defined user roles in the system.
   * @example GET /config/user-roles
   * @developer-note Used for role-based access control configurations
   */
  fastify.get('/user-roles', async (request, reply) => {
    try {
      return reply.code(200).send(userRoles);
    } catch (error: any) {
      fastify.log.error('Failed to get user roles:', error);
      return reply.code(500).send({ error: 'Failed to fetch user roles' });
    }
  });
}
