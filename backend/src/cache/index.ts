/**
 * Sequelize connection decorator
 * @Author: Junaid Atari junaid.attari@invozone.dev
 * @Date: 2025-02-06 13:46:59
 */

// classes
import CacheManager, { CacheManagerOptions } from '~/cache/CacheManager';

/**
 * Instance of CacheManager for interacting with the cache system
 * Provides access to caching operations through the CacheManager class
 *
 * @example
 * let cache: InstanceType<typeof CacheManager>;
 * cache = new CacheManager();
 *
 * Developer Notes:
 * - This variable holds a concrete instance of the CacheManager class
 * - Should be initialized with proper configuration before use
 * - Recommended to use dependency injection for testability
 * - The type is inferred from the CacheManager class constructor
 */
let cacheInstance: CacheManager;

/**
 * Get the singleton instance of CacheManager
 * Ensures only one instance is created and reused throughout the application
 *
 * @example
 * const cache = CacheManager.getInstance();
 * await cache.set('user:123', { name: 'John' });
 *
 * Developer Notes:
 * - Implements the singleton pattern for global cache access
 * - Initializes with default 'memory' driver if not specified
 * - Thread-safe instance creation
 * - Configuration is locked after first initialization
 */
export const getInstance = (): CacheManager => {
  if (cacheInstance) return cacheInstance;

  return cacheInstance = newInstance('app', {
    driver: 'memory',
  });
};

/**
 * Create a new instance of CacheManager with custom configuration
 * Alternative to singleton pattern for multiple cache instances
 *
 * @example
 * const cache = CacheManager.newInstance('user-cache', {
 *   driver: 'redis',
 *   redisOptions: { host: '127.0.0.1', port: 6379 },
 *   defaultTTL: 60000
 * });
 *
 * Developer Notes:
 * - Creates a new instance rather than using the singleton
 * - Useful for testing or multiple cache configurations
 * - ProviderName should be unique per instance
 * - Options are merged with default CacheManagerOptions
 */
export const newInstance = (
  providerName: string,
  options: CacheManagerOptions,
): InstanceType<typeof CacheManager> => {
  return new CacheManager(providerName, options);
};
