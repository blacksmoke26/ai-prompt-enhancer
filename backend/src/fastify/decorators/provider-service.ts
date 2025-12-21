/**
 * Sequelize connection decorator
 * @Author: Junaid Atari junaid.attari@invozone.dev
 * @Date: 2025-02-06 13:46:59
 */

// classes
import ProviderService from '~/services/ProviderService';

// types
import type {FastifyInstance} from 'fastify';
import type {AppDecorator} from '~/types/server';

/**
 * Registers a configuration manager as a decorator on the Fastify instance.
 * This plugin asynchronously initializes a `AIProviderManager` instance and attaches it to the Fastify instance as a decorator.
 *
 * @param app - The Fastify instance to which the configuration manager will be registered.
 * @returns A promise that resolves to the `AppDecorator` object containing the configuration manager.
 *
 * @developerNotes
 * - This plugin is typically used to inject a centralized configuration manager into the Fastify instance.
 * - The `AIProviderManager` class should be defined elsewhere and must be fully initialized before use.
 * - Ensure that `AIProviderManager` is properly implemented with methods like `get()` and `set()` for configuration access.
 * - This function is an async plugin and should be registered using `fastify.register()` with `await`.
 */
export default async (app: FastifyInstance): Promise<AppDecorator> => {
  const service = new ProviderService();
  await service.load();

  return {
    name: 'providerService',
    value: service,
  };
}
