/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// drivers
import MemoryCache from './drivers/MemoryCache';
import RedisCache, { RedisOptions } from './drivers/RedisCache';
import FileCache, { FileCacheOptions } from './drivers/FileCache';
import DbCache, { DbCacheOptions } from './drivers/DbCache';

// types
import type {
  CacheDriver,
  CacheStats,
  CacheOptions,
} from '~/types/interfaces/CacheDriver';

/**
 * Configuration options for CacheManager initialization
 * Combines base cache options with driver-specific configuration
 *
 * @example
 * {
 *   driver: 'redis',
 *   redisOptions: { host: '127.0.0.1', port: 6379 },
 *   defaultTTL: 30000
 * }
 *
 * Developer Notes:
 * - Uses Partial<CacheOptions> for flexible configuration
 * - Driver-specific options are conditionally required
 * - Supports memory, redis, file, and database backends
 * - Options are merged with default CacheOptions values
 */
export type CacheManagerOptions = Partial<CacheOptions> & {
  /**
   * Cache backend implementation to use
   * @default 'memory'
   */
  driver?: 'memory' | 'redis' | 'file' | 'database';

  /**
   * Redis-specific connection options
   * Required when driver is set to 'redis'
   */
  redisOptions?: RedisOptions;

  /**
   * File cache-specific options
   * Required when driver is set to 'file'
   */
  fileOptions?: FileCacheOptions;

  /**
   * Database cache-specific options
   * Required when driver is set to 'database'
   */
  dbOptions?: DbCacheOptions;
};

/**
 * CacheManager provides a consistent interface for caching operations across different providers.
 * Supports multiple cache backends including in-memory, Redis, file-based, and database caching.
 *
 * @example
 * // In-memory cache
 * const cache = new CacheManager('ollama');
 *
 * // Redis cache
 * const redisCache = new CacheManager('ollama', {
 *   backend: 'redis',
 *   redisOptions: { host: 'localhost', port: 6379 }
 * });
 *
 * await cache.set('model:llama2', modelData, 3600000); // 1 hour TTL
 * const cached = await cache.get('model:llama2');
 *
 * @developerNotes
 * - Uses pluggable backend architecture to support multiple storage mechanisms
 * - All methods are async to support both in-memory and external caches
 * - Fault-tolerant design - cache failures won't break application flow
 */
export default class CacheManager {
  /**
   * Provider name for logging and identification
   * Used to distinguish between different cache implementations in logs and diagnostics
   *
   * @example
   * this.providerName = 'RedisCache';
   *
   * Developer Notes:
   * - Should be unique per cache implementation
   * - Used in logging for troubleshooting
   * - Recommended to use class name as value
   */
  private readonly providerName: string;

  /**
   * Cache backend implementation
   * Provides the actual caching functionality through the CacheBackend interface
   *
   * @example
   * this.driver = new RedisCache({ namespace: 'user', defaultTTL: 60000 });
   *
   * Developer Notes:
   * - Must implement CacheBackend interface methods
   * - Supports different backends like MemoryCache or RedisCache
   * - Responsible for all cache operations
   */
  private driver: CacheDriver;

  /**
   * Cache configuration options
   * Contains settings that control cache behavior and performance
   *
   * @example
   * this.options = {
   *   namespace: 'session',
   *   defaultTTL: 60000,
   *   maxItems: 500,
   *   cleanupInterval: 30000
   * };
   *
   * Developer Notes:
   * - namespace: Prevents key collisions between different systems
   * - defaultTTL: Controls how long items stay in cache
   * - maxItems: Limits memory usage for in-memory caches
   * - cleanupInterval: Manages automatic expiration of stale items
   */
  private options: CacheOptions;

  /**
   * Creates a new CacheManager instance.
   * @param providerName - Name of the provider using this cache (for logging/identification)
   * @param options - Cache configuration options
   *
   * @example
   * // In-memory cache (default)
   * const cache = new CacheManager('ollama', {
   *   defaultTTL: 3600000, // 1 hour
   *   cleanupInterval: 300000, // 5 minutes
   *   maxItems: 1000,
   *   strategy: 'lru'
   * });
   *
   * // Redis cache
   * const redisCache = new CacheManager('ollama', {
   *   driver: 'redis',
   *   redisOptions: { host: 'localhost', port: 6379 },
   *   defaultTTL: 3600000
   * });
   */
  constructor(
    providerName: string,
    options: Partial<CacheOptions> & {
      driver?: 'memory' | 'redis' | 'file' | 'database';
      redisOptions?: RedisOptions;
      fileOptions?: FileCacheOptions;
      dbOptions?: DbCacheOptions;
    } = {},
  ) {
    this.providerName = providerName;

    // Set default options
    this.options = {
      defaultTTL: options.defaultTTL ?? 3600000, // 1 hour default
      cleanupInterval: options.cleanupInterval ?? 300000, // 5 minutes
      maxItems: options.maxItems ?? 1000,
      strategy: options.strategy ?? 'lru',
      enableCompression: options.enableCompression ?? false,
      namespace: options.namespace || providerName,
    };

    // Initialize backend based on options
    const backendType = options.driver ?? 'memory';

    switch (backendType) {
      case 'redis':
        if (!options.redisOptions) {
          throw new Error('Redis options are required for Redis backend');
        }
        this.driver = new RedisCache(this.options, options.redisOptions);
        break;

      case 'file':
        if (!options.fileOptions) {
          throw new Error('File options are required for File backend');
        }
        this.driver = new FileCache(this.options, options.fileOptions);
        break;

      case 'database':
        if (!options.dbOptions) {
          throw new Error('Database options are required for Database backend');
        }
        this.driver = new DbCache(this.options, options.dbOptions);
        break;

      case 'memory':
      default:
        this.driver = new MemoryCache(this.options);
        break;
    }

    // Initialize the backend
    this.driver.init().catch((error) => {
      console.error(
        `[${this.providerName}] Cache backend initialization failed:`,
        error,
      );
    });
  }

  /**
   * Gets a value from the cache.
   * @param key - Cache key to retrieve
   * @returns Cached value or null if not found/expired
   *
   * @example
   * const value = await cache.get('user:123');
   * if (value) {
   *   console.log('Cache hit:', value);
   * } else {
   *   console.log('Cache miss');
   * }
   */
  public async get<T = any>(key: string): Promise<T | null> {
    const item = await this.driver.get<T>(key);
    return item ? item.value : null;
  }

  /**
   * Sets a value in the cache with optional TTL.
   * @param key - Cache key
   * @param value - Value to cache
   * @param ttl - Time to live in milliseconds (optional, uses default if not provided)
   * @returns Boolean indicating if set was successful
   *
   * @example
   * await cache.set('user:123', userData, 3600000); // 1 hour TTL
   */
  public async set(key: string, value: any, ttl?: number): Promise<boolean> {
    return this.driver.set(key, value, ttl);
  }

  /**
   * Deletes a value from the cache.
   * @param key - Cache key to delete
   * @returns Boolean indicating if delete was successful
   *
   * @example
   * await cache.delete('user:123');
   */
  public async delete(key: string): Promise<boolean> {
    return this.driver.delete(key);
  }

  /**
   * Clears all items from the cache.
   * @returns Number of items cleared
   *
   * @example
   * const clearedCount = await cache.clear();
   * console.log(`Cleared ${clearedCount} cache items`);
   */
  public async clear(): Promise<number> {
    return this.driver.clear();
  }

  /**
   * Checks if a key exists in the cache (not expired).
   * @param key - Cache key to check
   * @returns Boolean indicating if key exists and is not expired
   *
   * @example
   * if (await cache.has('user:123')) {
   *   console.log('Key exists in cache');
   * }
   */
  public async has(key: string): Promise<boolean> {
    return this.driver.has(key);
  }

  /**
   * Gets cache statistics for monitoring and debugging.
   * @returns Cache statistics object
   *
   * @example
   * const stats = cache.getStats();
   * console.log(`Cache hit rate: ${(stats.hits / (stats.hits + stats.misses) * 100).toFixed(2)}%`);
   */
  public async getStats(): Promise<CacheStats> {
    const stats = await this.driver.getStats();
    return {
      ...stats,
      provider: this.providerName,
    };
  }

  /**
   * Gets cache size information.
   * @returns Object containing cache size metrics
   *
   * @example
   * const sizeInfo = cache.getSizeInfo();
   * console.log(`Cache size: ${sizeInfo.size}/${sizeInfo.maxSize} items`);
   */
  public async getSizeInfo(): Promise<{
    size: number;
    maxSize: number;
    percentFull: number;
  }> {
    const stats = await this.driver.getStats();
    const size = stats.size ?? 0;
    const maxSize = this.options.maxItems;
    const percentFull = maxSize > 0 ? (size / maxSize) * 100 : 0;

    return {
      size,
      maxSize,
      percentFull,
    };
  }

  /**
   * Gracefully shuts down the cache manager.
   * Stops cleanup interval and clears cache if configured.
   * @param clearCache - Whether to clear the cache on shutdown (default: false)
   * @returns Promise that resolves when shutdown is complete
   *
   * @example
   * await cache.shutdown(true); // Clear cache on shutdown
   */
  public async shutdown(clearCache: boolean = false): Promise<void> {
    await this.driver.shutdown(clearCache);
    console.log(`[${this.providerName}] CacheManager shutdown complete`);
  }
}
