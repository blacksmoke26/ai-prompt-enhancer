/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// types
import type {
  CacheDriver,
  CacheItem,
  CacheStats,
  CacheOptions,
} from '~/types/interfaces/CacheDriver';

/**
 * Configuration options specific to the database cache implementation.
 *
 * @example
 * const dbOptions: DbCacheOptions = {
 *   connectionString: 'mysql://user:pass@localhost:3306/cache_db',
 *   tableName: 'cache_items'
 * };
 */
export interface DbCacheOptions {
  /**
   * Connection string for the database (e.g., `mysql://user:pass@localhost:3306/cache_db`).
   */
  connectionString: string;

  /**
   * Name of the table used to store cache items.
   * @default 'cache_items'
   */
  tableName?: string;
}

/**
 * Database cache implementation that uses a key-value table to store cache items.
 * This is a generic implementation and requires adaptation to your specific database driver.
 *
 * @example
 * const dbCache = new DbCache(
 *   {
 *     defaultTTL: 3600000,
 *     maxItems: 1000,
 *     strategy: 'lru'
 *   },
 *   {
 *     connectionString: 'mysql://user:pass@localhost:3306/cache_db',
 *     tableName: 'cache_items'
 *   }
 * );
 *
 * Developer Notes:
 * - This class implements the `CacheBackend` interface and provides the required methods.
 * - The actual database connection and SQL implementation depend on your specific DB driver.
 * - The `tableName` can be customized to avoid naming conflicts.
 * - Error handling and connection management are left to the DB driver implementation.
 */
export default class DbCache implements CacheDriver {
  /**
   * Main cache configuration options (e.g., TTL, maxItems, strategy).
   */
  private options: CacheOptions;

  /**
   * Database-specific configuration options (e.g., connection string, table name).
   */
  private dbOptions: DbCacheOptions;

  /**
   * Performance statistics for the cache (hits, misses, errors, etc.).
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
   * Interval timer for automatic cleanup of expired items.
   */
  private cleanupInterval: NodeJS.Timeout | null = null;

  /**
   * Database connection object (implementation-specific, e.g., MySQL, PostgreSQL, etc.).
   */
  private connection: any;

  /**
   * Initializes a new instance of the `DbCache` class with the provided configuration.
   *
   * @param options - Main cache configuration (TTL, maxItems, strategy, etc.)
   * @param dbOptions - Database-specific configuration (connection string, table name)
   *
   * @example
   * const dbCache = new DbCache(
   *   {
   *     defaultTTL: 3600000,
   *     maxItems: 1000,
   *     strategy: 'lru'
   *   },
   *   {
   *     connectionString: 'mysql://user:pass@localhost:3306/cache_db',
   *     tableName: 'cache_items'
   *   }
   * );
   *
   * Developer Notes:
   * - The `connectionString` is used to establish a connection to the database.
   * - The `tableName` is used to identify the table where cache items are stored.
   * - The `connection` object must be initialized by the DB driver implementation.
   */
  constructor(options: CacheOptions, dbOptions: DbCacheOptions) {
    this.options = options;
    this.dbOptions = {
      ...dbOptions,
      tableName: dbOptions.tableName || 'cache_items',
    };

    // Initialize DB connection (implementation depends on your DB driver)
    // this.connection = createConnection(dbOptions.connectionString);
  }

  /**
   * Ensures that the database table for cache items exists, creating it if necessary.
   *
   * @example
   * await this.ensureTableExists();
   *
   * Developer Notes:
   * - This method is called automatically during initialization.
   * - The SQL example below is illustrative and must be adapted to your specific DB driver.
   * - The table schema must include fields like `cache_key`, `cache_value`, `expires_at`, etc.
   * - If the table already exists, this method does nothing.
   */
  private async ensureTableExists(): Promise<void> {
    // Example SQL (must be adapted to your DB driver):
    // CREATE TABLE IF NOT EXISTS cache_items (
    //   cache_key VARCHAR(255) PRIMARY KEY,
    //   cache_value TEXT NOT NULL,
    //   expires_at BIGINT,
    //   created_at BIGINT NOT NULL,
    //   last_accessed BIGINT NOT NULL,
    //   access_count INT NOT NULL DEFAULT 0
    // );
    // await this.connection.execute(createTableSql);
  }

  /**
   * @inheritDoc
   */
  async init(): Promise<void> {
    // Initialize DB connection and ensure table exists
    // This is a placeholder - implementation depends on your DB driver
    await this.ensureTableExists();
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

      // Delete expired items first (or handle in query)
      await this.deleteExpiredItems();

      // Query the database
      // const result = await this.connection.query(
      //   `SELECT * FROM ${this.dbOptions.tableName} WHERE cache_key = ?`,
      //   [namespacedKey]
      // );

      // Placeholder implementation
      // In a real implementation, you would use your DB driver
      const result: {
        cache_value: any;
        expires_at: number;
        created_at: number;
        access_count: number;
      }[] = []; // Replace with actual query result

      if (result.length === 0) {
        this.stats.misses++;
        return null;
      }

      const row = result[0];
      const item: CacheItem<T> = {
        value: JSON.parse(row.cache_value),
        expiresAt: row.expires_at,
        createdAt: row.created_at,
        lastAccessed: Date.now(),
        accessCount: row.access_count + 1,
      };

      // Update lastAccessed and accessCount
      // await this.connection.execute(
      //   `UPDATE ${this.dbOptions.tableName}
      //    SET last_accessed = ?, access_count = ?
      //    WHERE cache_key = ?`,
      //   [Date.now(), item.accessCount, namespacedKey]
      // );

      this.stats.hits++;
      return item;
    } catch (error) {
      console.error(`[DbCache] Get failed:`, error);
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
      const expiresAt = ttl ? Date.now() + ttl : null;

      // Clean up expired items before adding new one
      await this.deleteExpiredItems();

      // Check if we exceed max items and apply strategy if needed
      // This is simplified - a real implementation would need to handle this properly
      const currentCount = 0; // Replace with actual count query
      if (currentCount >= this.options.maxItems) {
        await this.applyCacheStrategy();
      }

      // Insert or update
      // const sql = `
      //   INSERT INTO ${this.dbOptions.tableName}
      //   (cache_key, cache_value, expires_at, created_at, last_accessed, access_count)
      //   VALUES (?, ?, ?, ?, ?, ?)
      //   ON DUPLICATE KEY UPDATE
      //   cache_value = VALUES(cache_value),
      //   expires_at = VALUES(expires_at),
      //   last_accessed = VALUES(last_accessed)
      // `;

      // await this.connection.execute(sql, [
      //   namespacedKey,
      //   JSON.stringify(value),
      //   expiresAt,
      //   Date.now(),
      //   Date.now(),
      //   0
      // ]);

      this.stats.sets++;
      return true;
    } catch (error) {
      console.error(`[DbCache] Set failed:`, error);
      this.stats.errors++;
      return false;
    }
  }

  async delete(key: string): Promise<boolean> {
    try {
      const namespacedKey = this.getNamespacedKey(key);

      // const result = await this.connection.execute(
      //   `DELETE FROM ${this.dbOptions.tableName} WHERE cache_key = ?`,
      //   [namespacedKey]
      // );

      // Placeholder
      const deletedCount = 0; // Replace with actual result

      if (deletedCount > 0) {
        this.stats.deletes++;
        return true;
      }

      return false;
    } catch (error) {
      console.error(`[DbCache] Delete failed:`, error);
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

      // Clean up expired items
      await this.deleteExpiredItems();

      // const result = await this.connection.query(
      //   `SELECT COUNT(*) as count FROM ${this.dbOptions.tableName}
      //    WHERE cache_key = ? AND (expires_at IS NULL OR expires_at > ?)`,
      //   [namespacedKey, Date.now()]
      // );

      // Placeholder
      const count = 0; // Replace with actual count

      return count > 0;
    } catch (error) {
      console.error(`[DbCache] Has check failed:`, error);
      this.stats.errors++;
      return false;
    }
  }

  /**
   * @inheritDoc
   */
  async clear(): Promise<number> {
    try {
      // const result = await this.connection.execute(
      //   `DELETE FROM ${this.dbOptions.tableName}
      //    WHERE cache_key LIKE ?`,
      //   [`${this.options.namespace}:%`]
      // );

      // Placeholder
      const deletedCount = 0; // Replace with actual result

      this.stats.deletes += deletedCount;
      return deletedCount;
    } catch (error) {
      console.error(`[DbCache] Clear failed:`, error);
      this.stats.errors++;
      return 0;
    }
  }

  /**
   * @inheritDoc
   */
  async getStats(): Promise<CacheStats> {
    try {
      // const result = await this.connection.query(
      //   `SELECT COUNT(*) as size FROM ${this.dbOptions.tableName}
      //    WHERE cache_key LIKE ?`,
      //   [`${this.options.namespace}:%`]
      // );

      // Placeholder
      const size = 0; // Replace with actual size

      return {
        ...this.stats,
        size,
        maxSize: this.options.maxItems,
        hitRate:
          this.stats.hits + this.stats.misses > 0
            ? this.stats.hits / (this.stats.hits + this.stats.misses)
            : 0,
      };
    } catch (error) {
      console.error(`[DbCache] Get stats failed:`, error);
      this.stats.errors++;
      return this.stats;
    }
  }

  /**
   * @inheritDoc
   */
  async shutdown(clearCache: boolean = false): Promise<void> {
    this.stopCleanupInterval();

    if (clearCache) {
      await this.clear();
    }

    // Close DB connection
    // if (this.connection) {
    //   await this.connection.close();
    // }
  }

  /**
   * @inheritDoc
   */
  startCleanupInterval(interval: number): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }

    this.cleanupInterval = setInterval(async () => {
      await this.deleteExpiredItems();
    }, interval);
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

  /**
   * Deletes expired items from the cache based on their `expires_at` timestamp.
   * This method is typically called during cleanup intervals to maintain cache validity.
   *
   * @example
   * const expiredCount = await this.deleteExpiredItems();
   * console.log(`Removed ${expiredCount} expired items from the cache.`);
   *
   * @remarks
   * - This method is a placeholder and requires implementation with the actual SQL query
   *   that deletes expired items from your database.
   * - The SQL query should be adapted to your specific DB driver and table schema.
   * - The returned count is used to update the internal cache statistics.
   * - If an error occurs during deletion, it is logged and counted in the `errors` metric.
   */
  private async deleteExpiredItems(): Promise<number> {
    try {
      // Placeholder: Replace with actual SQL query that deletes expired items
      // Example SQL (adapt to your DB driver):
      // DELETE FROM ${this.dbOptions.tableName}
      // WHERE expires_at IS NOT NULL AND expires_at <= ?

      // const result = await this.connection.execute(
      //   `DELETE FROM ${this.dbOptions.tableName}
      //    WHERE expires_at IS NOT NULL AND expires_at <= ?`,
      //   [Date.now()]
      // );

      // Placeholder: Replace `0` with the actual deleted count from the query
      const deletedCount = 0;

      this.stats.expired += deletedCount;
      return deletedCount;
    } catch (error) {
      console.error(`[DbCache] Delete expired items failed:`, error);
      this.stats.errors++;
      return 0;
    }
  }

  /**
   * Applies the configured cache eviction strategy to manage cache size limits.
   * This method is used when the cache reaches its `maxItems` limit.
   *
   * @example
   * await this.applyCacheStrategy();
   *
   * @remarks
   * - This method is a placeholder and must be implemented with the actual SQL queries
   *   for each eviction strategy (LRU, LFU, FIFO) based on your DB driver.
   * - The SQL queries must be adapted to your specific table schema and DB dialect.
   * - For LRU, delete items with the oldest `last_accessed` timestamp.
   * - For LFU, delete items with the lowest `access_count`.
   * - For FIFO, delete items with the oldest `created_at` timestamp.
   * - This method does not return a value but modifies the cache state directly.
   */
  private async applyCacheStrategy(): Promise<void> {
    // Placeholder: Replace with actual SQL queries for each strategy

    switch (this.options.strategy) {
      case 'lru':
        // Example SQL (adapt to your DB driver):
        // DELETE FROM ${this.dbOptions.tableName}
        // WHERE cache_key IN (
        //   SELECT cache_key FROM (
        //     SELECT cache_key FROM ${this.dbOptions.tableName}
        //     WHERE cache_key LIKE ?
        //     ORDER BY last_accessed ASC
        //     LIMIT ?
        //   ) AS t
        // )
        break;

      case 'lfu':
        // Example SQL (adapt to your DB driver):
        // DELETE FROM ${this.dbOptions.tableName}
        // WHERE cache_key IN (
        //   SELECT cache_key FROM (
        //     SELECT cache_key FROM ${this.dbOptions.tableName}
        //     WHERE cache_key LIKE ?
        //     ORDER BY access_count ASC
        //     LIMIT ?
        //   ) AS t
        // )
        break;

      case 'fifo':
        // Example SQL (adapt to your DB driver):
        // DELETE FROM ${this.dbOptions.tableName}
        // WHERE cache_key IN (
        //   SELECT cache_key FROM (
        //     SELECT cache_key FROM ${this.dbOptions.tableName}
        //     WHERE cache_key LIKE ?
        //     ORDER BY created_at ASC
        //     LIMIT ?
        //   ) AS t
        // )
        break;
    }
  }
}
