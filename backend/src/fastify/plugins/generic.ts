/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// types
import type { FastifyInstance } from 'fastify';

export default async function (app: FastifyInstance) {
  // ecosystem plugins
  await Promise.all([
    import('@fastify/middie'),
    import('@fastify/cookie'),
    import('@fastify/accepts'),
    import('@fastify/multipart'),
    import('@fastify/formbody'),
  ].map(x => app.register(x)));

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  await app.register(import('fastify-ip'), {
    strict: false,
    isAWS: false,
  });

  // See more: https://github.com/Eomm/fastify-raw-body
  await app.register(import('fastify-raw-body'), {
    field: 'rawBody', // change the default request.rawBody property name
    global: false, // add the rawBody to every request. **Default true**
    encoding: 'utf8', // set as false to set rawBody as a Buffer **Default utf8**
    runFirst: true, // get the body before any preParsing hook change/un-compress it. **Default false**
    routes: [], // array of routes, **`global`** will be ignored, wildcard routes not supported
    jsonContentTypes: [], // array of content-types to handle as JSON. **Default ['application/json']**
  });
}
