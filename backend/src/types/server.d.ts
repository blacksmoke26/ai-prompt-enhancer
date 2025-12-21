/**
 * Server types
 * @Author: Junaid Atari mj.atari@gmail.com
 * @Date: 2025-10-12 17:17:14
 */

// classes
import PaginationQuery from '~/core/classes/PaginationQuery';

// types
import type { FastifyInstance } from 'fastify';

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
    // This interface can be extended by plugins or custom logic.
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
