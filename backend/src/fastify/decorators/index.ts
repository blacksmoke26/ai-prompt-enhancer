/**
 * Fastify Decorators
 * @Author: Junaid Atari junaid.attari@invozone.dev
 * @Date: 2025-02-06 13:46:59
 */

// decorators
import configServiceDecorator from './config-service';
import historyServiceDecorator from './history-service';
import providerServiceDecorator from './provider-service';

// types
import type {FastifyInstance} from 'fastify';
import type {AppDecorator} from '~/types/server';

/**
 * A Fastify plugin that registers configuration decorators on the Fastify instance.
 * This plugin asynchronously loads and applies decorators to the Fastify instance for use in routes or plugins.
 *
 * @param fastify - The Fastify instance to which decorators will be registered.
 * @example
 * // Example decorator structure
 * {
 *   name: 'configManager',
 *   value: {
 *     get: (key: string) => { /* ... *!/ },
 *     set: (key: string, value: any) => { /* ... *!/ }
 *   },
 *   dependencies: ['database', 'cache']
 * }
 *
 * @developerNotes
 * - This function is typically used as a Fastify plugin to inject shared utility functions or configuration managers.
 * - The `configManagerDecorator()` function must be defined elsewhere and return a Promise that resolves to an array of decorator objects.
 * - `fastify.decorate()` is used to attach the `value` to the Fastify instance, optionally with `dependencies` for dependency injection.
 */
export default async (fastify: FastifyInstance) => {
  const decorators: AppDecorator[] = await Promise.all([
    configServiceDecorator(fastify),
    historyServiceDecorator(fastify),
    providerServiceDecorator(fastify),
  ]);

  for (const {name, value, dependencies = []} of decorators) {
    fastify.decorate(name, value, dependencies);
  }
}
