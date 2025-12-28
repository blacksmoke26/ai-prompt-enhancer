/**
 * Cache eviction strategies supported by the system.
 * 'lru' = Least Recently Used, 'lfu' = Least Frequently Used, 'fifo' = First In, First Out.
 */
export type CacheStrategy = 'lru' | 'lfu' | 'fifo';

/**
 * Configuration options for cache behavior.
 * Controls default TTL, cleanup intervals, size limits, and eviction strategy.
 */
export interface CacheOptions {
  /**
   * Default time-to-live for cached items in milliseconds (0 = no expiration).
   * @default 3600000 (1 hour)
   */
  defaultTTL: number;

  /**
   * Interval (ms) for automatic cleanup of expired items.
   * @default 300000 (5 minutes)
   */
  cleanupInterval: number;

  /**
   * Maximum number of items allowed in cache (-1 = unlimited).
   * @default 1000
   */
  maxItems: number;

  /**
   * Eviction strategy when maxItems is exceeded.
   * @default 'lru'
   */
  strategy: CacheStrategy;

  /**
   * Enable compression for values before storage (e.g., gzip).
   * @default false
   */
  enableCompression: boolean;

  /**
   * Namespace prefix for keys to prevent collisions between providers.
   * @default providerName
   */
  namespace: string;
}

/**
 * Represents a single cached item with metadata for TTL, access tracking, and strategy implementation.
 * @template T - The type of the cached value
 * @example
 * const item: CacheItem<string> = {
 *   value: 'cached data',
 *   expiresAt: Date.now() + 3600000,
 *   createdAt: Date.now(),
 *   lastAccessed: Date.now(),
 *   accessCount: 1
 * };
 */
export interface CacheItem<T = any> {
  /**
   * The cached value of generic type T.
   */
  value: T;
  /**
   * Expiration timestamp in milliseconds (Unix epoch time). `null` means no expiration.
   * @example
   * expiresAt: Date.now() + 3600000 // Expires in 1 hour
   * expiresAt: null // Never expires
   */
  expiresAt: number | null;
  /**
   * Creation timestamp in milliseconds (Unix epoch time).
   */
  createdAt: number;
  /**
   * Last access timestamp in milliseconds (used for LRU strategy).
   */
  lastAccessed: number;
  /**
   * Number of times this item has been accessed (used for LFU strategy).
   * @default 0
   */
  accessCount: number;
}

/**
 * Aggregates cache performance statistics including hit/miss rates, eviction counts, and operational metrics.
 * Provides insights into cache usage and efficiency for monitoring and optimization.
 *
 * @example
 * const stats: CacheStats = {
 *   hits: 150,
 *   misses: 50,
 *   sets: 200,
 *   deletes: 30,
 *   expired: 25,
 *   errors: 5,
 *   size: 180,
 *   maxSize: 200,
 *   hitRate: 0.75,
 *   provider: 'redis',
 *   strategy: 'lru',
 *   uptime: 16800000 // 4.666 hours
 * };
 *
 * Developer Notes:
 * - Some properties (like `size`, `hitRate`, `provider`, `strategy`, `uptime`) are optional and may vary by backend.
 * - `hitRate` is calculated as `hits / (hits + misses)` and may be omitted if either value is zero.
 * - `uptime` is typically initialized with `Date.now()` on cache startup.
 */
export interface CacheStats {
  /** Number of successful cache hits (key found and not expired) */
  hits: number;
  /** Number of cache misses (key not found or expired) */
  misses: number;
  /** Number of items successfully stored in the cache */
  sets: number;
  /** Number of explicit deletions performed by the user */
  deletes: number;
  /** Number of items automatically removed due to expiration */
  expired: number;
  /** Number of errors encountered during cache operations */
  errors: number;
  /** Current number of items in the cache (optional, not all backends support) */
  size?: number;
  /** Maximum number of items allowed in the cache (from configuration) */
  maxSize?: number;
  /** Hit rate: ratio of hits to total accesses (`hits / (hits + misses)`) */
  hitRate?: number;
  /** Name of the cache provider or backend implementation */
  provider?: string;
  /** Current active eviction strategy (e.g., LRU, LFU, FIFO) */
  strategy?: CacheStrategy;
  /** Uptime timestamp in milliseconds (e.g., `Date.now()` on cache initialization) */
  uptime?: number;
}

/**
 * Abstract interface defining the contract for all cache backend implementations.
 * Provides a standardized API for cache operations, statistics, and management.
 *
 * @example
 * class InMemoryCache implements CacheBackend {
 *   async init() { /* ... * / }
 *   async get<T>(key: string): Promise<CacheItem<T> | null> { /* ... * / }
 *   async set<T>(key: string, value: T, ttl?: number): Promise<boolean> { /* ... * / }
 *   // ... other methods
 * }
 *
 * Developer Notes:
 * - All methods must be implemented by concrete backends (e.g., Redis, InMemory, etc.).
 * - Asynchronous operations are required for all methods (e.g., `get`, `set`, `delete`).
 * - Backend-specific logic (e.g., connection pooling, serialization) should be encapsulated.
 * - Ensure thread safety and consistency if used in multi-threaded environments.
 * - `getNamespacedKey` must ensure namespace prefixes are applied consistently to prevent key collisions.
 */
export interface CacheDriver {
  /**
   * Initialize the cache backend (e.g., connect to storage or initialize in-memory structures).
   * Must be called before any cache operations.
   *
   * @example
   * await cache.init();
   *
   * Developer Notes:
   * - This method must be implemented by all backend providers (e.g., Redis, InMemory, etc.).
   * - Ensure that any required setup (e.g., connection pools, serialization formats) is completed here.
   * - This is typically the first method called when initializing a cache instance.
   */
  init(): Promise<void>;

  /**
   * Retrieve a value from cache by key.
   * @param key - The cache key to look up
   * @returns Promise resolving to cached item or null if not found or expired
   *
   * @example
   * const item = await cache.get('user:123');
   *
   * Developer Notes:
   * - This method should not throw errors but return null when the key is missing or expired.
   * - Implementations should handle key normalization and namespace resolution internally.
   * - The returned CacheItem contains metadata for tracking usage and TTL.
   */
  get<T = any>(key: string): Promise<CacheItem<T> | null>;

  /**
   * Store a value in cache with optional time-to-live (TTL).
   * @param key - The cache key
   * @param value - The value to store
   * @param ttl - Optional time-to-live in milliseconds (default uses CacheOptions.defaultTTL)
   * @returns Promise resolving to true if the value was successfully stored
   *
   * @example
   * await cache.set('user:123', { name: 'Alice' }, 3600000); // 1 hour TTL
   *
   * Developer Notes:
   * - If `ttl` is not provided, the default from CacheOptions should be used.
   * - Implementations should handle value compression if enabled in CacheOptions.
   * - This method should not overwrite existing values unless explicitly required.
   */
  set<T = any>(key: string, value: T, ttl?: number): Promise<boolean>;

  /**
   * Delete a key from the cache.
   * @param key - The cache key to remove
   * @returns Promise resolving to true if the key was successfully deleted
   *
   * @example
   * await cache.delete('user:123');
   *
   * Developer Notes:
   * - This method should be idempotent (calling it on a non-existent key should return true).
   * - Implementations should ensure that namespace prefixes are correctly removed.
   * - Deletion should be handled asynchronously to avoid blocking operations.
   */
  delete(key: string): Promise<boolean>;

  /**
   * Check if a key exists in the cache.
   * @param key - The cache key to check
   * @returns Promise resolving to true if the key exists and is not expired
   *
   * @example
   * const exists = await cache.has('user:123');
   *
   * Developer Notes:
   * - This method is useful to avoid unnecessary cache fetches.
   * - It should return false for expired items, not just missing keys.
   * - Implementations should ensure efficient lookup without fetching the full value.
   */
  has(key: string): Promise<boolean>;

  /**
   * Clear all items from the cache.
   * @returns Promise resolving to the number of items deleted
   *
   * @example
   * const deletedCount = await cache.clear();
   *
   * Developer Notes:
   * - This method should be efficient even for large caches.
   * - Implementations should handle cleanup of resources or storage.
   * - Be cautious of potential performance impact on large datasets.
   */
  clear(): Promise<number>;

  /**
   * Get backend-specific statistics about cache usage and performance.
   * @returns Promise resolving to a CacheStats object containing detailed metrics
   *
   * @example
   * const stats = await cache.getStats();
   *
   * Developer Notes:
   * - This method should return a complete and accurate CacheStats object.
   * - Some backends may not support all optional fields (e.g., `size`, `hitRate`).
   * - Avoid unnecessary computation or blocking during stats collection.
   */
  getStats(): Promise<CacheStats>;

  /**
   * Shutdown the cache backend (e.g., disconnect from storage or release resources).
   * @param clearCache - Whether to clear all cached items before shutdown
   * @returns Promise resolving when shutdown is complete
   *
   * @example
   * await cache.shutdown(true); // Clear cache and disconnect
   *
   * Developer Notes:
   * - This method should be called during application shutdown to release resources.
   * - If `clearCache` is true, all items should be deleted before shutdown.
   * - Ensure that any async operations (e.g., flushing data) are completed before resolving.
   */
  shutdown(clearCache?: boolean): Promise<void>;

  /**
   * Generate a namespaced key by prefixing with the provider's namespace.
   * @param key - The original key without namespace
   * @returns The namespaced key (e.g., "providerName:key")
   *
   * @example
   * const namespacedKey = cache.getNamespacedKey('user:123');
   *
   * Developer Notes:
   * - This method ensures key uniqueness across different cache providers.
   * - The namespace is typically derived from CacheOptions.namespace.
   * - Implementations should ensure consistent key formatting.
   */
  getNamespacedKey(key: string): string;

  /**
   * Starts a periodic cleanup task to remove expired items from the cache.
   * @param interval - The time interval in milliseconds between cleanup runs.
   * @example
   * cacheBackend.startCleanupInterval(60000); // Clean up every 60 seconds
   *
   * Developer Notes:
   * - This should be called after initialization to ensure proper cleanup.
   * - The interval should be a positive number to avoid invalid configurations.
   * - Ensure that the cleanup task is properly managed to prevent resource leaks.
   */
  startCleanupInterval(interval: number): void;

  /**
   * Stops the periodic cleanup task for expired items.
   * @example
   * cacheBackend.stopCleanupInterval();
   *
   * Developer Notes:
   * - Call this method when the cache is no longer needed to free up resources.
   * - Ensure that the cleanup interval was started before calling this method.
   * - This is important for systems where cleanup should be paused or stopped temporarily.
   */
  stopCleanupInterval(): void;
}
