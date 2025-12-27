/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import type { CacheItem, CacheOptions, CacheStats } from '~/types/cache';

/**
 * CacheManager provides a consistent interface for caching operations across different providers.
 * Supports in-memory caching with TTL (time-to-live) expiration and multiple cache strategies.
 *
 * @example
 * const cache = new CacheManager('ollama');
 * await cache.set('model:llama2', modelData, 3600000); // 1 hour TTL
 * const cached = await cache.get('model:llama2');
 *
 * @developerNotes
 * - Uses Map for in-memory storage with automatic TTL cleanup
 * - All methods are async to support future extension to external caches (Redis, etc.)
 * - Fault-tolerant design - cache failures won't break application flow
 */
export default class CacheManager {
  /** In-memory cache storage using Map for O(1) lookups */
  private cache: Map<string, CacheItem>;
  /** Provider name for logging and identification */
  private readonly providerName: string;
  /** Cache configuration options */
  private options: CacheOptions;
  /** Interval ID for TTL cleanup */
  private cleanupInterval: NodeJS.Timeout | null = null;
  /** Cache statistics for monitoring */
  private stats: CacheStats = {
    hits: 0,
    misses: 0,
    sets: 0,
    deletes: 0,
    expired: 0,
    errors: 0
  };

  /**
   * Creates a new CacheManager instance.
   * @param providerName - Name of the provider using this cache (for logging/identification)
   * @param options - Cache configuration options
   *
   * @example
   * const cache = new CacheManager('ollama', {
   *   defaultTTL: 3600000, // 1 hour
   *   cleanupInterval: 300000, // 5 minutes
   *   maxItems: 1000,
   *   strategy: 'lru'
   * });
   */
  constructor(providerName: string, options: Partial<CacheOptions> = {}) {
    this.providerName = providerName;
    this.cache = new Map();
    this.options = {
      defaultTTL: options.defaultTTL ?? 3600000, // 1 hour default
      cleanupInterval: options.cleanupInterval ?? 300000, // 5 minutes
      maxItems: options.maxItems ?? 1000,
      strategy: options.strategy ?? 'lru',
      enableCompression: options.enableCompression ?? false,
      namespace: options.namespace || providerName
    };

    // Start TTL cleanup interval
    this.startCleanupInterval();
  }

  /**
   * Starts the automatic TTL cleanup interval.
   * @private
   */
  private startCleanupInterval(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }

    this.cleanupInterval = setInterval(() => {
      this.cleanupExpiredItems();
    }, this.options.cleanupInterval);
  }

  /**
   * Stops the cleanup interval (useful for testing or shutdown).
   * @example
   * cache.stopCleanupInterval();
   */
  public stopCleanupInterval(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
  }

  /**
   * Cleans up expired cache items.
   * @private
   * @returns Number of items cleaned up
   */
  private cleanupExpiredItems(): number {
    const now = Date.now();
    let cleanedCount = 0;

    for (const [key, item] of this.cache.entries()) {
      if (item.expiresAt && item.expiresAt <= now) {
        this.cache.delete(key);
        cleanedCount++;
        this.stats.expired++;
      }
    }

    // Apply cache strategy if we exceed max items
    if (this.cache.size > this.options.maxItems) {
      this.applyCacheStrategy();
    }

    return cleanedCount;
  }

  /**
   * Applies the configured cache strategy when max items are exceeded.
   * @private
   */
  private applyCacheStrategy(): void {
    switch (this.options.strategy) {
      case 'lru': // Least Recently Used
        this.applyLRUStrategy();
        break;
      case 'lfu': // Least Frequently Used
        this.applyLFUStrategy();
        break;
      case 'fifo': // First In First Out
        this.applyFIFOStrategy();
        break;
      default:
        this.applyLRUStrategy();
    }
  }

  /**
   * Applies LRU (Least Recently Used) cache strategy.
   * @private
   */
  private applyLRUStrategy(): void {
    const items = Array.from(this.cache.entries())
      .sort(([, a], [, b]) => (a.lastAccessed || 0) - (b.lastAccessed || 0));

    const itemsToRemove = items.length - this.options.maxItems;
    for (let i = 0; i < itemsToRemove; i++) {
      const [key] = items[i];
      this.cache.delete(key);
      this.stats.deletes++;
    }
  }

  /**
   * Applies LFU (Least Frequently Used) cache strategy.
   * @private
   */
  private applyLFUStrategy(): void {
    const items = Array.from(this.cache.entries())
      .sort(([, a], [, b]) => (a.accessCount || 0) - (b.accessCount || 0));

    const itemsToRemove = items.length - this.options.maxItems;
    for (let i = 0; i < itemsToRemove; i++) {
      const [key] = items[i];
      this.cache.delete(key);
      this.stats.deletes++;
    }
  }

  /**
   * Applies FIFO (First In First Out) cache strategy.
   * @private
   */
  private applyFIFOStrategy(): void {
    const items = Array.from(this.cache.entries());
    const itemsToRemove = items.length - this.options.maxItems;

    for (let i = 0; i < itemsToRemove; i++) {
      const [key] = items[i];
      this.cache.delete(key);
      this.stats.deletes++;
    }
  }

  /**
   * Compresses data for storage if compression is enabled.
   * @private
   * @param data - Data to compress
   * @returns Compressed data or original data if compression fails
   */
  private async compressData(data: any): Promise<any> {
    if (!this.options.enableCompression || typeof data !== 'string') {
      return data;
    }

    try {
      // Simple compression for now - could be extended with actual compression algorithms
      return data;
    } catch (error) {
      console.warn(`[${this.providerName}] Compression failed, storing uncompressed:`, error);
      this.stats.errors++;
      return data;
    }
  }

  /**
   * Decompresses data if it was compressed.
   * @private
   * @param data - Data to decompress
   * @returns Decompressed data or original data if decompression fails
   */
  private async decompressData(data: any): Promise<any> {
    if (!this.options.enableCompression || typeof data !== 'string') {
      return data;
    }

    try {
      // Simple decompression for now
      return data;
    } catch (error) {
      console.warn(`[${this.providerName}] Decompression failed, returning compressed data:`, error);
      this.stats.errors++;
      return data;
    }
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
    try {
      const namespacedKey = this.getNamespacedKey(key);
      const item = this.cache.get(namespacedKey);

      if (!item) {
        this.stats.misses++;
        return null;
      }

      // Check if item has expired
      if (item.expiresAt && item.expiresAt <= Date.now()) {
        this.cache.delete(namespacedKey);
        this.stats.expired++;
        this.stats.misses++;
        return null;
      }

      // Update access statistics
      item.lastAccessed = Date.now();
      item.accessCount = (item.accessCount || 0) + 1;
      this.stats.hits++;

      // Return decompressed data
      return await this.decompressData(item.value) as T;
    } catch (error) {
      console.error(`[${this.providerName}] Cache get failed:`, error);
      this.stats.errors++;
      return null;
    }
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
    try {
      const namespacedKey = this.getNamespacedKey(key);
      const expiresAt = ttl ? Date.now() + ttl : null;

      // Clean up expired items before adding new one
      this.cleanupExpiredItems();

      // Apply cache strategy if needed
      if (this.cache.size >= this.options.maxItems) {
        this.applyCacheStrategy();
      }

      const compressedValue = await this.compressData(value);

      this.cache.set(namespacedKey, {
        value: compressedValue,
        expiresAt,
        createdAt: Date.now(),
        lastAccessed: Date.now(),
        accessCount: 0
      });

      this.stats.sets++;
      return true;
    } catch (error) {
      console.error(`[${this.providerName}] Cache set failed:`, error);
      this.stats.errors++;
      return false;
    }
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
    try {
      const namespacedKey = this.getNamespacedKey(key);
      const result = this.cache.delete(namespacedKey);

      if (result) {
        this.stats.deletes++;
      }

      return result;
    } catch (error) {
      console.error(`[${this.providerName}] Cache delete failed:`, error);
      this.stats.errors++;
      return false;
    }
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
    try {
      const count = this.cache.size;
      this.cache.clear();
      this.stats.deletes += count;
      return count;
    } catch (error) {
      console.error(`[${this.providerName}] Cache clear failed:`, error);
      this.stats.errors++;
      return 0;
    }
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
    try {
      const namespacedKey = this.getNamespacedKey(key);
      const item = this.cache.get(namespacedKey);

      if (!item) return false;

      if (item.expiresAt && item.expiresAt <= Date.now()) {
        this.cache.delete(namespacedKey);
        this.stats.expired++;
        return false;
      }

      return true;
    } catch (error) {
      console.error(`[${this.providerName}] Cache has check failed:`, error);
      this.stats.errors++;
      return false;
    }
  }

  /**
   * Gets cache statistics for monitoring and debugging.
   * @returns Cache statistics object
   *
   * @example
   * const stats = cache.getStats();
   * console.log(`Cache hit rate: ${(stats.hits / (stats.hits + stats.misses) * 100).toFixed(2)}%`);
   */
  public getStats(): CacheStats {
    return {
      ...this.stats,
      size: this.cache.size,
      maxSize: this.options.maxItems,
      hitRate: this.stats.hits + this.stats.misses > 0
        ? this.stats.hits / (this.stats.hits + this.stats.misses)
        : 0,
      provider: this.providerName,
      strategy: this.options.strategy,
      uptime: this.cleanupInterval ? Date.now() : 0
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
  public getSizeInfo(): { size: number; maxSize: number; percentFull: number } {
    const size = this.cache.size;
    const maxSize = this.options.maxItems;
    const percentFull = maxSize > 0 ? (size / maxSize) * 100 : 0;

    return {
      size,
      maxSize,
      percentFull
    };
  }

  /**
   * Gets a namespaced cache key.
   * @private
   * @param key - Original cache key
   * @returns Namespaced cache key
   */
  private getNamespacedKey(key: string): string {
    return `${this.options.namespace}:${key}`;
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
    this.stopCleanupInterval();

    if (clearCache) {
      await this.clear();
    }

    console.log(`[${this.providerName}] CacheManager shutdown complete`);
  }
}
