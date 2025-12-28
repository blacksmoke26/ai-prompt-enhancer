/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import { Redis } from 'ioredis';

// types
import type {
  CacheDriver,
  CacheItem,
  CacheStats,
  CacheOptions,
} from '~/types/interfaces/CacheDriver';

/**
 * Configuration options for Redis connection
 * Defines parameters required to connect to a Redis server
 *
 * @example
 * {
 *   host: '127.0.0.1',
 *   port: 6379,
 *   password: 'redispass',
 *   db: 0,
 *   commandTimeout: 5000,
 *   tls: false
 * }
 *
 * Developer Notes:
 * - host: Required Redis server address (default: '127.0.0.1')
 * - port: Standard Redis port is 6379
 * - password: Should be set for production environments
 * - db: Selects specific Redis database (0-15)
 * - commandTimeout: Prevents hanging commands
 * - tls: Enable for secure connections (requires Redis server support)
 */
export interface RedisOptions {
  /**
   * Redis server host address
   * @default '127.0.0.1'
   */
  host: string;

  /**
   * Redis server port number
   * @default 6379
   */
  port: number;

  /**
   * Optional authentication password
   * @default undefined
   */
  password?: string;

  /**
   * Redis database number (0-15)
   * @default 0
   */
  db?: number;

  /**
   * Maximum time in milliseconds for commands to complete
   * @default undefined
   */
  commandTimeout?: number;

  /**
   * Enable TLS/SSL connection
   * @default false
   */
  tls?: boolean;
}

/**
 * Redis cache implementation using ioredis
 * Provides distributed caching with high availability and connection pooling
 *
 * @example
 * const redisCache = new RedisCache(
 *   { namespace: 'user', defaultTTL: 60000, maxItems: 1000 },
 *   { host: '127.0.0.1', port: 6379, password: 'redispass', db: 0 }
 * );
 * await redisCache.set('user:123', { name: 'John' });
 * const user = await redisCache.get('user:123');
 *
 * Developer Notes:
 * - Uses ioredis for Redis connection with automatic reconnection
 * - Namespacing prevents key collisions across different systems
 * - Stats tracking includes hits, misses, and errors
 * - TTL is enforced at the Redis level
 */
export default class RedisCache implements CacheDriver {
  /**
   * Redis client instance using ioredis
   */
  private client: Redis;

  /**
   * Cache configuration options
   */
  private options: CacheOptions;

  /**
   * Redis-specific connection options
   */
  private redisOptions: RedisOptions;

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
   * Interval for cleanup tasks
   */
  private cleanupInterval: NodeJS.Timeout | null = null;

  /**
   * Initialize the Redis cache with configuration options
   *
   * @param options - Cache configuration options
   * @param redisOptions - Redis connection options
   * @example
   * new RedisCache(
   *   { namespace: 'session', defaultTTL: 60000, maxItems: 500 },
   *   { host: 'redis-host', port: 6379, password: 'secret', db: 1 }
   * );
   */
  constructor(options: CacheOptions, redisOptions: RedisOptions) {
    this.options = options;
    this.redisOptions = redisOptions;

    // Initialize Redis client
    this.client = new Redis({
      host: redisOptions?.host,
      port: redisOptions?.port,
      password: redisOptions?.password,
      db: redisOptions.db,
      commandTimeout: redisOptions?.commandTimeout,
      retryStrategy: (times: number) => {
        // Reconnect after 1 second, up to 5 times
        return Math.min(times * 1000, 5000);
      },
    });

    // Handle connection errors
    this.client.on('error', (error: any) => {
      console.error(`[RedisCache] Connection error:`, error);
      this.stats.errors++;
    });
  }

  /**
   * @inheritDoc
   */
  async init(): Promise<void> {
    try {
      // Test connection
      await this.client.ping();
    } catch (error) {
      console.error(`[RedisCache] Failed to initialize:`, error);
      throw error;
    }
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
      const valueStr = await this.client.get(namespacedKey);

      if (valueStr === null) {
        this.stats.misses++;
        return null;
      }

      // Get TTL to calculate expiresAt
      const ttl = await this.client.ttl(namespacedKey);
      const expiresAt = ttl > 0 ? Date.now() + ttl * 1000 : null;

      this.stats.hits++;

      // Parse the stored value
      const value = JSON.parse(valueStr);

      return {
        value,
        expiresAt,
        createdAt:
          Date.now() -
          (this.options.defaultTTL -
            (ttl > 0 ? ttl * 1000 : this.options.defaultTTL)),
        lastAccessed: Date.now(),
        accessCount: 1,
      };
    } catch (error) {
      console.error(`[RedisCache] Get failed:`, error);
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
      const valueStr = JSON.stringify(value);
      const expireSeconds = ttl
        ? Math.floor(ttl / 1000)
        : Math.floor(this.options.defaultTTL / 1000);

      if (ttl === 0) {
        // No expiration
        await this.client.set(namespacedKey, valueStr);
      } else {
        await this.client.setex(namespacedKey, expireSeconds, valueStr);
      }

      this.stats.sets++;
      return true;
    } catch (error) {
      console.error(`[RedisCache] Set failed:`, error);
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
      const result = await this.client.del(namespacedKey);
      this.stats.deletes++;
      return result > 0;
    } catch (error) {
      console.error(`[RedisCache] Delete failed:`, error);
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
      const exists = await this.client.exists(namespacedKey);
      return exists === 1;
    } catch (error) {
      console.error(`[RedisCache] Has check failed:`, error);
      this.stats.errors++;
      return false;
    }
  }

  /**
   * @inheritDoc
   */
  async clear(): Promise<number> {
    try {
      // Get all keys with namespace prefix
      const pattern = `${this.options.namespace}:*`;
      const keys = await this.client.keys(pattern);

      if (keys.length === 0) {
        return 0;
      }

      // Delete all keys in one transaction
      const pipeline = this.client.pipeline();
      keys.forEach((key: string) => pipeline.del(key));
      await pipeline.exec();

      this.stats.deletes += keys.length;
      return keys.length;
    } catch (error) {
      console.error(`[RedisCache] Clear failed:`, error);
      this.stats.errors++;
      return 0;
    }
  }

  /**
   * @inheritDoc
   */
  async getStats(): Promise<CacheStats> {
    // Redis doesn't provide direct stats, so we return our tracked stats
    // In a production environment, you might want to use INFO command
    return {
      ...this.stats,
      // Size estimation would require KEYS command which is not recommended in production
      // So we omit size and maxSize
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

    await this.client.quit();
  }

  /**
   * @inheritDoc
   */
  startCleanupInterval(interval: number): void {
    // Redis handles expiration automatically, so we don't need a cleanup interval
    // But we can implement it if needed for custom logic
  }

  /**
   * @inheritDoc
   */
  stopCleanupInterval(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
  }
}
