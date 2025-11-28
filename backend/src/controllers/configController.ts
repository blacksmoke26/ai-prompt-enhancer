import { FastifyInstance } from 'fastify';
import { ConfigManager } from '../config/ConfigManager';
import { configUpdateSchema } from '../utils/validation';
import { enhancementTypes, userRoles } from '../config/constants';

export async function configRoutes(fastify: FastifyInstance, options: { configManager: ConfigManager }) {
  const { configManager } = options;

  fastify.get('/', async (request, reply) => {
    try {
      const config = configManager.getConfig();
      return reply.code(200).send(config);
    } catch (error: any) {
      fastify.log.error('Failed to get config:', error);
      return reply.code(500).send({ error: 'Failed to fetch config' });
    }
  });

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

  fastify.get('/enhancement-types', async (request, reply) => {
    try {
      return reply.code(200).send(enhancementTypes);
    } catch (error: any) {
      fastify.log.error('Failed to get enhancement types:', error);
      return reply.code(500).send({ error: 'Failed to fetch enhancement types' });
    }
  });

  fastify.get('/user-roles', async (request, reply) => {
    try {
      return reply.code(200).send(userRoles);
    } catch (error: any) {
      fastify.log.error('Failed to get user roles:', error);
      return reply.code(500).send({ error: 'Failed to fetch user roles' });
    }
  });
}
