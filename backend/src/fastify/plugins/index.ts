/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

/**
 * This file exports a list of middleware plugins for an application. These plugins are ordered based on their typical usage and security considerations.
 */
// plugins
/**
 * Helmet middleware for setting secure HTTP headers.
 */
import helmet from './helmet';

/**
 * Scalar middleware for API documentation and exploration.
 */
import scalar from './scalar';

/**
 * CORS middleware to enable Cross-Origin Resource Sharing.
 */
import cors from './cors';

/**
 * Pagination middleware for handling paginated requests.
 */
import pagination from './pagination';

/**
 * Rate limiting middleware to prevent abuse and ensure fair usage.
 */
import rateLimiter from './rate-limit';

/**
 * Compression middleware to reduce payload size and improve performance.
 */
import compression from './compression';

/**
 * WebSocket middleware for enabling real-time communication.
 */
import websocket from './websocket';

/**
 * The list of middleware plugins used by the application. The order is important for security and functionality.
 * @example
 * const plugins = [rateLimiter, cors, helmet, ...];
 */
export default [
  rateLimiter,
  scalar,
  cors,
  pagination,
  compression,
  helmet,
  websocket,
];
