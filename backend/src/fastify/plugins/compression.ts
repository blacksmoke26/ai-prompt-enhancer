/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// types
import type { FastifyInstance } from 'fastify';

export default async function (fastify: FastifyInstance) {
  await fastify.register(import('@fastify/compress'), {
    threshold: 2048,
  });
}
