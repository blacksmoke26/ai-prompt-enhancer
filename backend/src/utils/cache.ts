/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @license MIT
 * @description Simple in-memory caching utility with TTL support and type safety
 */

// types
import type {CacheOptions, CacheStats} from '~/types';

// Export types for convenience
export type {CacheOptions, CacheStats} from '~/types';

/**
 * Default cache configuration options
 * @constant
 * @example
 * const config = DEFAULT_CACHE_OPTIONS;
 * // { ttl: 300, maxSize: 1000, cleanupInterval: 60000 }
 */
export const DEFAULT_CACHE_OPTIONS: Required<CacheOptions> = {
  /** Default TTL in seconds (5 minutes) */
  ttl: 300,

  /** Maximum number of items to store in cache */
  maxSize: 1000,

  /** Interval for cleanup in milliseconds (1 minute) */
  cleanupInterval: 60000,

  /** Whether to enable cache statistics */
  enableStats: true,
};

/**
 * Cache item interface with metadata
 * @interface CacheItem
 * @template T - The type of data stored in cache
 */
export interface CacheItem<T> {
  /** The cached value */
  value: T;

  /** Expiration timestamp (Unix timestamp in milliseconds) */
  expiresAt: number;

  /** When the item was created (Unix timestamp in milliseconds) */
  createdAt: number;

  /** Size of the cached item in bytes (approximate) */
  size: number;

  /** Optional tags for categorization */
  tags?: string[];
}

/**
 * Simple in-memory cache implementation with TTL support
 * @class SimpleCache
 * @template T - The type of data stored in cache
 * @example
 * const cache = new SimpleCache<string>();
 *
 * // Set with default TTL
 * await cache.set('key', 'value');
 *
 * // Set with custom TTL (10 minutes)
 * await cache.set('key2', 'value2', 600);
 *
 * // Get value
 * const value = await cache.get('key');
 *
 * // Delete key
 * await cache.delete('key');
 */
export class SimpleCache<T = any> {
  /** Internal cache storage */
  private cache = new Map<string, CacheItem<T>>();

  /** Cache configuration */
  private options: CacheOptions;

  /** Cleanup interval ID */
  private cleanupInterval: NodeJS.Timeout | null = null;

  /** Cache statistics */
  private stats: CacheStats = {
    hits: 0,
    misses: 0,
    sets: 0,
    deletes: 0,
    evictions: 0,
    totalItems: 0,
  };

  /**
   * Creates a new cache instance
   * @param options - Cache configuration options
   */
  constructor(options: Partial<CacheOptions> = {}) {
    this.options = {...DEFAULT_CACHE_OPTIONS, ...options};
    this.startCleanup();
  }

  /**
   * Gets a value from cache if it exists and hasn't expired
   * @param key - The cache key
   * @returns {Promise<T | undefined>} The cached value or undefined if not found/expired
   *
   * @example
   * const value = await cache.get('user:123');
   * if (value) {
   *   console.log('Cache hit:', value);
   * } else {
   *   console.log('Cache miss');
   * }
   */
  async get<T>(key: string): Promise<T | undefined> {
    const item = this.cache.get(key);

    if (!item) {
      this.stats.misses++;
      return undefined;
    }

    // Check if item has expired
    if (Date.now() > item.expiresAt) {
      await this.delete(key);
      this.stats.misses++;
      return undefined;
    }

    this.stats.hits++;
    return item.value as (T | undefined);
  }

  /**
   * Sets a value in cache with optional TTL
   * @param key - The cache key
   * @param value - The value to cache
   * @param ttl - Time to live in seconds (overrides default TTL)
   * @param tags - Optional tags for categorization
   * @returns {Promise<boolean>} True if set successfully
   *
   * @example
   * // Set with default TTL
   * await cache.set('user:123', { name: 'John', age: 30 });
   *
   * // Set with custom TTL (1 hour) and tags
   * await cache.set('product:456', productData, 3600, ['products', 'featured']);
   */
  async set(key: string, value: T, ttl?: number, tags?: string[]): Promise<boolean> {
    const maxSize = this.options?.maxSize ?? DEFAULT_CACHE_OPTIONS.maxSize;
    const cacheTTL = ttl ?? this.options?.ttl ?? DEFAULT_CACHE_OPTIONS.ttl;


    // Cleanup before adding new item if at max size
    if (this.cache.size >= maxSize) {
      this.cleanupExpiredItems();
      if (this.cache.size >= maxSize) {
        // Evict least recently used item (oldest created)
        const oldestKey = [...this.cache.entries()]
          .sort(([, a], [, b]) => a.createdAt - b.createdAt)[0][0];
        await this.delete(oldestKey);
        this.stats.evictions++;
      }
    }

    const expiresAt = Date.now() + (cacheTTL * 1000);
    const createdAt = Date.now();
    const size = this.estimateSize(value);

    this.cache.set(key, {
      value,
      expiresAt,
      createdAt,
      size,
      tags,
    });

    this.stats.sets++;
    this.stats.totalItems = this.cache.size;

    return true;
  }

  /**
   * Deletes a key from cache
   * @param key - The cache key to delete
   * @returns {Promise<boolean>} True if deleted successfully
   *
   * @example
   * await cache.delete('user:123');
   */
  async delete(key: string): Promise<boolean> {
    const deleted = this.cache.delete(key);
    if (deleted) {
      this.stats.deletes++;
      this.stats.totalItems = this.cache.size;
    }
    return deleted;
  }

  /**
   * Deletes all keys from cache
   * @returns {Promise<boolean>} True if cleared successfully
   *
   * @example
   * await cache.clear();
   */
  async clear(): Promise<boolean> {
    const size = this.cache.size;
    this.cache.clear();
    this.stats.deletes += size;
    this.stats.totalItems = 0;
    return true;
  }

  /**
   * Checks if a key exists in cache and hasn't expired
   * @param key - The cache key
   * @returns {Promise<boolean>} True if key exists and is valid
   *
   * @example
   * const exists = await cache.has('user:123');
   */
  async has(key: string): Promise<boolean> {
    const item = this.cache.get(key);
    if (!item) return false;
    return Date.now() <= item.expiresAt;
  }

  /**
   * Gets cache statistics
   * @returns {CacheStats} Current cache statistics
   *
   * @example
   * const stats = cache.getStats();
   * console.log(`Hit rate: ${(stats.hits / (stats.hits + stats.misses) * 100).toFixed(2)}%`);
   */
  getStats(): CacheStats {
    return {...this.stats};
  }

  /**
   * Cleans up expired items from cache
   * @returns {number} Number of items cleaned up
   *
   * @example
   * const cleaned = cache.cleanupExpiredItems();
   * console.log(`Cleaned up ${cleaned} expired items`);
   */
  cleanupExpiredItems(): number {
    let cleaned = 0;
    const now = Date.now();

    this.cache.forEach((item, key) => {
      if (now > item.expiresAt) {
        this.cache.delete(key);
        cleaned++;
        this.stats.deletes++;
      }
    });

    this.stats.totalItems = this.cache.size;
    return cleaned;
  }

  /**
   * Starts the automatic cleanup interval
   * @private
   */
  private startCleanup(): void {
    if (this.cleanupInterval) return;

    this.cleanupInterval = setInterval(() => {
      this.cleanupExpiredItems();
    }, this.options.cleanupInterval);

    // Allow the interval to be cleared on process exit
    if (typeof process !== 'undefined') {
      process.on('exit', () => this.stopCleanup());
    }
  }

  /**
   * Stops the automatic cleanup interval
   * @private
   */
  private stopCleanup(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
  }

  /**
   * Estimates the size of a value in bytes
   * @private
   * @param value - The value to estimate size for
   * @returns {number} Estimated size in bytes
   */
  private estimateSize(value: any): number {
    if (value === null || value === undefined) return 0;

    switch (typeof value) {
      case 'string':
        return value.length * 2; // Rough estimate for UTF-16
      case 'number':
        return 8; // 64-bit number
      case 'boolean':
        return 1;
      case 'object':
        if (Array.isArray(value)) {
          return value.reduce((sum, item) => sum + this.estimateSize(item), 0);
        } else if (value instanceof Map || value instanceof Set) {
          return [...value.values()].reduce((sum, item) => sum + this.estimateSize(item), 0);
        } else {
          return Object.values(value).reduce((sum: number, val) => sum + this.estimateSize(val), 0);
        }
      default:
        return String(value).length * 2;
    }
  }

  /**
   * Gets all keys in cache (including expired ones)
   * @returns {string[]} Array of cache keys
   */
  getAllKeys(): string[] {
    return [...this.cache.keys()];
  }

  /**
   * Gets cache size information
   * @returns {{ itemCount: number, totalSize: number }} Object containing item count and total size
   */
  getSizeInfo(): { itemCount: number; totalSize: number } {
    let totalSize = 0;
    this.cache.forEach(item => {
      totalSize += item.size;
    });

    return {
      itemCount: this.cache.size,
      totalSize,
    };
  }

  /**
   * Deletes keys by tag
   * @param tag - The tag to match
   * @returns {Promise<number>} Number of keys deleted
   *
   * @example
   * // Delete all items with 'products' tag
   * const deletedCount = await cache.deleteByTag('products');
   */
  async deleteByTag(tag: string): Promise<number> {
    let deletedCount = 0;

    this.cache.forEach((item, key) => {
      if (item.tags?.includes(tag)) {
        this.cache.delete(key);
        deletedCount++;
        this.stats.deletes++;
      }
    });

    this.stats.totalItems = this.cache.size;
    return deletedCount;
  }

  /**
   * Destructor to clean up resources
   */
  destroy(): void {
    this.stopCleanup();
    this.cache.clear();
    this.stats = {
      hits: 0,
      misses: 0,
      sets: 0,
      deletes: 0,
      evictions: 0,
      totalItems: 0,
    };
  }
}

/**
 * Creates a singleton cache instance with default options
 * @returns {SimpleCache} Singleton cache instance
 *
 * @example
 * // Get the default cache instance
 * const cache = createCache();
 *
 * // Use with different types
 * const stringCache = createCache<string>();
 * const objectCache = createCache<{ name: string; age: number }>();
 */
export function createCache<T = any>(options: Partial<CacheOptions> = {}): SimpleCache<T> {
  return new SimpleCache<T>(options);
}

/**
 * Default cache instance (singleton)
 * @constant
 * @example
 * // Import and use directly
 * import { cache } from '~/utils/cache';
 *
 * await cache.set('key', 'value');
 * const value = await cache.get('key');
 */
const cache = createCache();

export default cache;

// Cleanup on module unload
if (typeof process !== 'undefined') {
  process.on('beforeExit', () => {
    cache.destroy();
  });
}
