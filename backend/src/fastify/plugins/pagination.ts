/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// classes
import PaginationQuery from '~/classes/PaginationQuery';

// types
import type { FastifyInstance, FastifyRequest } from 'fastify';

/**
 * Sets up pagination support in a Fastify application by decorating the request object and initializing the pagination query.
 * This function should be registered as a Fastify plugin to ensure consistent pagination handling across routes.
 */
export default async function (fastify: FastifyInstance) {
  const pageQuery = new PaginationQuery(null);

  fastify.decorateRequest('pagination', {
    getter: () => {
      return pageQuery;
    },
  });

  fastify.addHook('onRequest', async (request: FastifyRequest) => {
    request.pagination.setRequest(request as FastifyRequest<{ Querystring: {} }>);
  });
}
