/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// middleware
import cors, {CorsOptions} from 'cors';

// helpers
import env from '@junaidatari/env-binder';

// types
import {FastifyInstance, FastifyRequest} from 'fastify';

/**
 * Configuration for allowed origins, derived from environment variable `CORS_ALLOWED_ORIGIN`.
 * Converts URLs to hostnames (e.g., `https://example.com/` → `example.com`).
 * @example
 * // If `CORS_ALLOWED_ORIGIN` is ["https://example.com/"], this becomes ["example.com"]
 */
const originHostnames = env.getStringArray<string>('CORS_ALLOWED_ORIGIN', []).map((o) => new URL(o).hostname);

/**
 * List of allowed IP addresses from the `CORS_ALLOWED_IPS` environment variable.
 * @example
 * // If `CORS_ALLOWED_IPS` is ["192.168.1.1", "10.0.0.0/16"], this becomes ["192.168.1.1", "10.0.0.0/16"]
 * @note Ensure IPs are validated (e.g., CIDR format) in production.
 */
const allowedIps = env.getStringArray<string>('CORS_ALLOWED_IPS', []);

/**
 * Configuration options for CORS middleware.
 */
const corsOptions: CorsOptions = {
  maxAge: 86400,
  optionsSuccessStatus: 204,
  preflightContinue: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,

  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Accept',
    'Origin',
    'DNT',
    'Keep-Alive',
    'User-Agent',
    'X-Requested-With',
    'If-Modified-Since',
    'Cache-Control',
    'Content-Range',
    'Range',
  ].concat(env.getStringArray<string>('CORS_ALLOWED_ORIGIN_HEADERS', [])),

  exposedHeaders: ['Content-Length', 'Content-Type', 'RefreshToken', 'Token'],
};

/**
 * Checks if the request origin is allowed based on hostnames, IPs, or absence of origin.
 * @param {FastifyRequest} this - The Fastify request context.
 * @param {string} origin - The origin header from the request.
 * @param {Function} callback - Callback to return allowed status or error.
 * @example
 * // If origin is "https://example.com" and `originHostnames` includes "example.com", returns true.
 * @note `this.ip` is used to check IP-based access control.
 */
const isOriginAllowed = function (this: FastifyRequest, origin: any, callback: (...args: any[]) => void) {
  if (
    // Allow requests with no origin, like mobile apps or curl requests
    (origin === undefined || origin === null)
    // Browser requests
    || (!originHostnames.length || originHostnames.includes(new URL(origin).hostname))
    // IPs
    || (!this.ip.length || !allowedIps.length || allowedIps.includes(this.ip))
  ) {
    callback(null, true);
    return;
  }

  // Generate an error on other origins, disabling access
  callback(new Error('Not allowed'), false);
};

/**
 * Delegate function to dynamically set CORS options for Fastify.
 * @param {FastifyRequest} req - The Fastify request context.
 * @param {Function} callback - Callback to return CORS configuration.
 * @example
 * // Binds `isOriginAllowed` to the request and returns `corsOptions` for Fastify's CORS middleware.
 */
export const corsOptionsDelegate = function (req: FastifyRequest, callback: (...args: any[]) => void) {
  corsOptions.origin = isOriginAllowed.bind(req);
  callback(null, corsOptions);
};

/**
 * Registers CORS middleware with Fastify using dynamic configuration.
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @example
 * // Sets up CORS with `corsOptionsDelegate` to handle origin validation.
 * @note This must be called before defining routes to ensure middleware is applied.
 */
export default async function (fastify: FastifyInstance) {
  fastify.use(cors(corsOptionsDelegate));
}
