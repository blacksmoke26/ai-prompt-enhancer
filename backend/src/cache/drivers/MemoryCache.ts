/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import NodeCache from 'node-cache';

// types
import type {
  CacheDriver,
  CacheItem,
  CacheStats,
  CacheOptions,
} from '~/types/interfaces/CacheDriver';

/**
 * In-memory cache implementation using node-cache
 * Provides high-performance caching with TTL support
 *
 * @example
 * const cache = new MemoryCache({ namespace: 'user', defaultTTL: 30000, maxItems: 1000 });
 * await cache.set('user:123', { name: 'John' });
 * const user = await cache.get('user:123');
 *
 * Developer Notes:
 * - Uses node-cache under the hood with automatic cleanup
 * - Namespacing prevents key collisions
 * - Stats tracking includes hits, misses, and errors
 * - TTL is converted from milliseconds to seconds
 */
export default class MemoryCache implements CacheDriver {
  /**
   * Internal cache instance using node-cache
   */
  private cache: NodeCache;

  /**
   * Configuration options for the cache
   */
  private options: CacheOptions;

  /**
   * Cache statistics tracking hits, misses, errors, etc.
   */
  private stats: CacheStats = {
    hits: 0,
    misses: 0,
    sets: 0,
    deletes: 0,
    expired: 0,
    errors: 0,
  };

  /**
   * Initialize the memory cache with configuration options
   *
   * @param options - Cache configuration options
   * @example
   * new MemoryCache({
   *   namespace: 'session',
   *   defaultTTL: 60000,
   *   maxItems: 500
   * });
   */
  constructor(options: CacheOptions) {
    this.options = options;

    // Initialize node-cache with options
    this.cache = new NodeCache({
      stdTTL: Math.floor(options.defaultTTL / 1000), // Convert ms to seconds
      checkperiod: Math.floor(options.cleanupInterval / 1000),
      useClones: false, // For performance, we handle cloning ourselves
      deleteOnExpire: true,
      maxKeys: options.maxItems,
    });

    // Listen to events for stats
    this.cache.on('expired', () => {
      this.stats.expired++;
    });

    this.cache.on('del', () => {
      this.stats.deletes++;
    });
  }

  /**
   * @inheritDoc
   */
  async init(): Promise<void> {
    // Nothing to initialize for in-memory cache
  }

  /**
   * @inheritDoc
   */
  getNamespacedKey(key: string): string {
    return `${this.options.namespace}:${key}`;
  }

  /**
   * @inheritDoc
   */
  async get<T = any>(key: string): Promise<CacheItem<T> | null> {
    try {
      const namespacedKey = this.getNamespacedKey(key);
      const value = this.cache.get<T>(namespacedKey);

      if (value === undefined) {
        this.stats.misses++;
        return null;
      }

      this.stats.hits++;

      // Return as CacheItem structure
      return {
        value,
        expiresAt: this.cache.getTtl(namespacedKey) || null,
        createdAt:
          Date.now() -
          (this.options.defaultTTL -
            (this.cache.getTtl(namespacedKey) || this.options.defaultTTL)),
        lastAccessed: Date.now(),
        accessCount: 1, // node-cache doesn't track access count
      };
    } catch (error) {
      console.error(`[MemoryCache] Get failed:`, error);
      this.stats.errors++;
      return null;
    }
  }

  /**
   * @inheritDoc
   */
  async set<T = any>(key: string, value: T, ttl?: number): Promise<boolean> {
    try {
      const namespacedKey = this.getNamespacedKey(key);
      const ttlSeconds = ttl ? Math.floor(ttl / 1000) : undefined;

      const success = ttlSeconds
        ? this.cache.set(namespacedKey, value, ttlSeconds)
        : this.cache.set(namespacedKey, value);
      if (success) {
        this.stats.sets++;
      }

      return success;
    } catch (error) {
      console.error(`[MemoryCache] Set failed:`, error);
      this.stats.errors++;
      return false;
    }
  }

  /**
   * @inheritDoc
   */
  async delete(key: string): Promise<boolean> {
    try {
      const namespacedKey = this.getNamespacedKey(key);
      const deletedCount = this.cache.del(namespacedKey);
      return deletedCount > 0;
    } catch (error) {
      console.error(`[MemoryCache] Delete failed:`, error);
      this.stats.errors++;
      return false;
    }
  }

  /**
   * @inheritDoc
   */
  async has(key: string): Promise<boolean> {
    try {
      const namespacedKey = this.getNamespacedKey(key);
      return this.cache.has(namespacedKey);
    } catch (error) {
      console.error(`[MemoryCache] Has check failed:`, error);
      this.stats.errors++;
      return false;
    }
  }

  /**
   * @inheritDoc
   */
  async clear(): Promise<number> {
    try {
      const beforeSize = this.cache.getStats().keys;
      this.cache.flushAll();
      const deletedCount = beforeSize;
      this.stats.deletes += deletedCount;
      return deletedCount;
    } catch (error) {
      console.error(`[MemoryCache] Clear failed:`, error);
      this.stats.errors++;
      return 0;
    }
  }

  /**
   * @inheritDoc
   */
  async getStats(): Promise<CacheStats> {
    const nodeCacheStats = this.cache.getStats();

    return {
      ...this.stats,
      size: nodeCacheStats.keys,
      maxSize: this.options.maxItems,
      hitRate:
        this.stats.hits + this.stats.misses > 0
          ? this.stats.hits / (this.stats.hits + this.stats.misses)
          : 0,
    };
  }

  /**
   * @inheritDoc
   */
  async shutdown(clearCache: boolean = false): Promise<void> {
    this.stopCleanupInterval();

    if (clearCache) {
      await this.clear();
    }

    this.cache.close();
  }

  /**
   * @inheritDoc
   */
  startCleanupInterval(interval: number): void {
    // node-cache handles its own cleanup, so we just ensure it's configured
    // The interval is already set in the constructor
  }

  /**
   * @inheritDoc
   */
  stopCleanupInterval(): void {
    // node-cache handles its own cleanup interval internally
    // We can't directly stop it, but closing the cache will stop it
  }
}
