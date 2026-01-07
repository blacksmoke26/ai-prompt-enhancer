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
        title: 'Synapse',
        description: 'The Synapse is a comprehensive tool that transforms how users interact with AI models. By providing intelligent prompt enhancement capabilities, it helps users craft more effective prompts that yield better results from AI systems. The application offers a rich, intuitive interface with advanced features for prompt engineering, history management, and performance analytics.',
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
    routePrefix: '/docs',
  });
}
