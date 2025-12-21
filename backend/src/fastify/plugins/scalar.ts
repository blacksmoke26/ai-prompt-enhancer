/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// types
import type { FastifyInstance } from 'fastify';

export default async function (fastify: FastifyInstance) {
  await fastify.register(import('@fastify/swagger'), {
    openapi: {
      info: {
        title: 'Smart Fulfill',
        version: '1.0',
        contact: {
          name: 'Junaid Atari',
          url: 'https://github.com/blacksmoke26',
          email: 'mj.atari@gmail.com',
        },
        license: {
          name: 'Apache 2.0',
          url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
        },
      },
      components: {
        /*securitySchemes: {
          Bearer: {
            type: 'http',
            scheme: 'bearer',
            description: 'JWT Authorization header using the Bearer scheme',
            in: 'header',
          },
        },*/
      },
    },
  });

  await fastify.register(import('@scalar/fastify-api-reference'), {
    routePrefix: '/reference',
  });
}
