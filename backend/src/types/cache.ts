/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

/**
 * Cache item structure containing value and metadata
 */
export interface CacheItem {
  /** The cached value */
  value: any;
  /** Expiration timestamp in milliseconds */
  expiresAt: number | null;
  /** Creation timestamp */
  createdAt: number;
  /** Last access timestamp */
  lastAccessed?: number;
  /** Access count for LFU strategy */
  accessCount?: number;
}

/**
 * Cache configuration options
 */
export interface CacheOptions {
  /** Default TTL in milliseconds (default: 1 hour) */
  defaultTTL: number;
  /** Interval for cleaning up expired items in milliseconds (default: 5 minutes) */
  cleanupInterval: number;
  /** Maximum number of items to store in cache */
  maxItems: number;
  /** Cache eviction strategy */
  strategy: CacheStrategy;
  /** Enable data compression for storage */
  enableCompression: boolean;
  /** Namespace for cache keys to avoid collisions */
  namespace: string;
}

/**
 * Cache eviction strategies
 */
export type CacheStrategy = 'lru' | 'lfu' | 'fifo';

/**
 * Cache statistics for monitoring
 */
export interface CacheStats {
  /** Number of cache hits */
  hits: number;
  /** Number of cache misses */
  misses: number;
  /** Number of items set */
  sets: number;
  /** Number of items deleted */
  deletes: number;
  /** Number of items expired */
  expired: number;
  /** Number of errors encountered */
  errors: number;
  /** Current cache size */
  size?: number;
  /** Maximum cache size */
  maxSize?: number;
  /** Cache hit rate (0-1) */
  hitRate?: number;
  /** Provider name */
  provider?: string;
  /** Current cache strategy */
  strategy?: CacheStrategy;
  /** Uptime timestamp */
  uptime?: number;
}
