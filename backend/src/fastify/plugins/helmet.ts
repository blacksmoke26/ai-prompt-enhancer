/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import fastifyHelmet from '@fastify/helmet';

// types
import type {FastifyInstance} from 'fastify';

export default async function (fastify: FastifyInstance) {
  /** @see https://github.com/fastify/fastify-helmet?tab=readme-ov-file#example---disable-fastifyhelmet-globally */
  await fastify.register(fastifyHelmet, {
    contentSecurityPolicy: false,
  });
}
