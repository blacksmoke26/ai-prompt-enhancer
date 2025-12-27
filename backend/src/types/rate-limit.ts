/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

/**
 * Rate limit information structure
 */
export interface RateLimitInfo {
  /** Retry after timestamp in milliseconds */
  retryAfter: number;
  /** Reset time timestamp */
  resetTime: number;
  /** Remaining requests allowed */
  remaining: number;
  /** Limit of requests allowed */
  limit?: number;
  /** Whether rate limit is active */
  isActive?: boolean;
  /** Last update timestamp */
  lastUpdated?: number;
}
