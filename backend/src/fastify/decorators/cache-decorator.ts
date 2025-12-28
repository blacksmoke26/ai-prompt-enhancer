/**
 * Sequelize connection decorator
 * @Author: Junaid Atari junaid.attari@invozone.dev
 * @Date: 2025-02-06 13:46:59
 */

// classes
import { getInstance } from '~/cache';

// types
import type { FastifyInstance } from 'fastify';
import type { AppDecorator } from '~/types/server';

/**
 * Fastify plugin for integrating a cache manager into the application
 * Registers a centralized cache system with automatic initialization and cleanup
 *
 * @example
 * const app = await fastify();
 * await app.register(cachePlugin);
 *
 * Developer Notes:
 * - Creates a singleton CacheManager instance
 * - Returns AppDecorator object for Fastify registration
 * - Assumes CacheManager is properly implemented elsewhere
 * - Can be extended with custom initialization options
 */
export default async (app: FastifyInstance): Promise<AppDecorator> => {
  return {
    name: 'cache',
    value: getInstance(),
  };
};
