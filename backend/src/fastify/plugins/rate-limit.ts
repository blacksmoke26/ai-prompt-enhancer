/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// helpers
import env from '@junaidatari/env-binder';

// types
import type {FastifyInstance} from 'fastify';

export default async function (fastify: FastifyInstance) {
  /** @see https://github.com/fastify/fastify-rate-limit?tab=readme-ov-file#options */
  await fastify.register(import('@fastify/rate-limit'), {
    max: env.getInteger('RATE_LIMIT_MAX', 100),
    timeWindow: env.getString('RATE_LIMIT_TIME_WINDOW', '1 minute'),
    //redis: ...,
  });
}
