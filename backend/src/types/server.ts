/**
 * Server types
 * @Author: Junaid Atari mj.atari@gmail.com
 * @Date: 2025-10-12 17:17:14
 */

// classes
import PaginationQuery from '~/classes/PaginationQuery';

// services
import ConfigService from '~/services/ConfigService';
import HistoryService from '~/services/HistoryService';
import ProviderService from '~/services/ProviderService';

// types
import type {FastifySchema} from 'fastify';
import type {JSONSchema7} from 'json-schema';

/**
 * A flexible interface for configuration options.
 * Represents a map of string keys to any type of value.
 * @example { "timeout": 5000, "retries": 3 }
 * @developerNotes
 * - This is commonly used to represent configuration objects in libraries and frameworks.
 * - The index signature `[string: string]: any` allows for dynamic key-value pairs.
 */
export interface Options {
  [string: string]: any;
}

/**
 * A callback function type used to signal completion of asynchronous operations.
 * @param result - Optional result of the operation.
 * @example (result: string) => console.log('Operation completed with result:', result);
 * @developerNotes
 * - This is a common pattern in Node.js-style asynchronous APIs.
 * - The generic type `T` allows the result to be typed appropriately.
 */
export interface DoneFunc<T = any> {
  (result?: T): void;
}

/**
 * Represents a decorator metadata structure for application components.
 * @example { name: 'cache', value: { expiresIn: 60 }, dependencies: ['UserModel'] }
 * @developerNotes
 * - Used in frameworks to attach metadata to classes, methods, or properties.
 * - `dependencies` is optional and can be used to declare injection dependencies.
 */
export interface AppDecorator {
  /** Name of the decorator (e.g., 'cache', 'auth') */
  name: string;
  /** Value or configuration associated with the decorator */
  value: any;
  /** Optional list of dependencies required by the decorator */
  dependencies?: any[];
}

/**
 * A type that maps properties from `FastifySchema` to optional `JSONSchema7` definitions.
 * @example {
 *   body: { type: 'object', properties: { name: { type: 'string' } }, required: ['name'] },
 *   querystring: { type: 'object', properties: { page: { type: 'integer' } } }
 * }
 * @developerNotes
 * - This is used to define schema validation rules in Fastify applications.
 * - Assumes that `FastifySchema` is already defined elsewhere in the codebase.
 */
export type AppSchema = {
  [key in keyof FastifySchema]?: JSONSchema7;
};

/**
 * Type augmentation for the `fastify` module to extend `FastifyInstance` and `FastifyRequest`.
 * This enables adding custom properties and behaviors to Fastify instances and requests.
 */
declare module 'fastify' {
  /**
   * Base interface for a Fastify instance.
   * This interface can be extended with custom properties or methods as needed.
   */
  interface FastifyInstance {
    /** Config manager instance */
    configService: InstanceType<typeof ConfigService>;
    /** History manager instance */
    historyService: InstanceType<typeof HistoryService>;
    /** Provider manager instance */
    providerService: InstanceType<typeof ProviderService>;
  }

  /**
   * Extends the Fastify request interface to include pagination query parameters.
   * @example { "pagination": { "page": 1, "pageSize": 10, "sortBy": "name", "order": "asc" } }
   */
  interface FastifyRequest {
    /**
     * Pagination query parameters extracted from the request.
     * These are typically parsed by a Fastify plugin that processes query string parameters.
     */
    pagination: PaginationQuery;
  }
}
