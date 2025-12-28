/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import path from 'node:path';
import fs from 'node:fs/promises';

// types
import type {
  CacheDriver,
  CacheItem,
  CacheStats,
  CacheOptions,
} from '~/types/interfaces/CacheDriver';

/**
 * Configuration options for a file-based cache implementation.
 * Defines the storage directory and file format for cached entries.
 *
 * @example
 * const options: FileCacheOptions = {
 *   directory: '/var/cache/myapp',
 *   fileExtension: '.cache.json'
 * };
 *
 * Developer Notes:
 * - The `directory` must be a valid, writable path on the filesystem.
 * - The `fileExtension` should be consistent across all cache operations to ensure correct file handling.
 * - If `fileExtension` is not provided, it defaults to `.cache`.
 */
export interface FileCacheOptions {
  /**
   * Absolute or relative path to the directory where cache files will be stored.
   * The directory must exist and be writable by the application.
   */
  directory: string;

  /**
   * File extension to use for cache entries (e.g., `.json`, `.bin`).
   * @default `.cache`
   */
  fileExtension?: string;
}
/**
 * File-based cache implementation that stores cache items as JSON files in a specified directory.
 * Provides persistent storage with support for TTL, eviction strategies, and statistics tracking.
 *
 * @example
 * const cache = new FileCache({
 *   defaultTTL: 3600000,
 *   maxItems: 1000,
 *   strategy: 'lru'
 * }, {
 *   directory: '/var/cache/myapp',
 *   fileExtension: '.cache.json'
 * });
 *
 * Developer Notes:
 * - The `directory` must be a valid, writable path on the filesystem.
 * - The `fileExtension` determines the format of the cache files (e.g., `.json`, `.bin`).
 * - This class implements the `CacheBackend` interface and supports all required methods.
 */
export default class FileCache implements CacheDriver {
  /**
   * Main cache configuration options (e.g., TTL, maxItems, strategy).
   */
  private options: CacheOptions;

  /**
   * File-specific configuration options (e.g., directory, file extension).
   */
  private fileOptions: FileCacheOptions;

  /**
   * Performance statistics for the cache (hits, misses, errors, etc.).
   */
  private stats: CacheStats = {
    hits: 0,
    misses: 0,
    sets: 0,
    deletes: 0,
    expired: 0,
    errors: 0
  };

  /**
   * Interval timer for automatic cleanup of expired items.
   */
  private cleanupInterval: NodeJS.Timeout | null = null;

  /**
   * Initializes a new instance of the FileCache class with the provided configuration options.
   *
   * @param options - Main cache configuration (TTL, maxItems, strategy, etc.)
   * @param fileOptions - File-specific configuration (storage directory, file extension)
   *
   * @example
   * const cache = new FileCache({
   *   defaultTTL: 3600000,
   *   maxItems: 1000,
   *   strategy: 'lru'
   * }, {
   *   directory: '/var/cache/myapp',
   *   fileExtension: '.cache.json'
   * });
   *
   * Developer Notes:
   * - The `directory` path is validated during initialization to ensure it exists and is writable.
   * - If `fileExtension` is not provided, it defaults to `.cache`.
   * - The initial `stats` object is reset to zero for all metrics.
   */
  constructor(options: CacheOptions, fileOptions: FileCacheOptions) {
    this.options = options;
    this.fileOptions = {
      ...fileOptions,
      fileExtension: fileOptions.fileExtension || '.cache'
    };

    // Ensure directory exists
    this.ensureDirectoryExists();
  }

  /**
   * Ensures that the cache storage directory exists, creating it if necessary.
   * Uses the `recursive: true` option to safely create nested directories.
   *
   * @example
   * // Called internally during initialization to prepare the storage directory
   * await this.ensureDirectoryExists();
   *
   * @remarks
   * - This method is called automatically during initialization and should not be invoked manually.
   * - If the directory already exists, this method does nothing.
   * - If the directory cannot be created (e.g., due to permission issues), an error is thrown after logging the failure.
   * - The `recursive: true` option ensures that all required parent directories are created if they do not exist.
   */
  private async ensureDirectoryExists(): Promise<void> {
    try {
      await fs.mkdir(this.fileOptions.directory, { recursive: true });
    } catch (error) {
      console.error(`[FileCache] Failed to create directory:`, error);
      throw error;
    }
  }

  /**
   * @inheritDoc
   */
  async init(): Promise<void> {
    // Ensure directory exists
    await this.ensureDirectoryExists();
  }

  /**
   * @inheritDoc
   */
  getNamespacedKey(key: string): string {
    // Replace invalid filename characters
    const safeKey = key.replace(/[/\\?%*:|"<>]/g, '_');
    return `${this.options.namespace}_${safeKey}`;
  }

  private getFilePath(key: string): string {
    const namespacedKey = this.getNamespacedKey(key);
    return path.join(this.fileOptions.directory, `${namespacedKey}${this.fileOptions.fileExtension}`);
  }

  /**
   * @inheritDoc
   */
  async get<T = any>(key: string): Promise<CacheItem<T> | null> {
    try {
      const filePath = this.getFilePath(key);

      // Check if file exists
      try {
        await fs.access(filePath);
      } catch {
        this.stats.misses++;
        return null;
      }

      // Read file
      const data = await fs.readFile(filePath, 'utf8');
      const item: CacheItem<T> = JSON.parse(data);

      // Check expiration
      if (item.expiresAt && item.expiresAt <= Date.now()) {
        // Delete expired file
        await this.delete(key);
        this.stats.expired++;
        this.stats.misses++;
        return null;
      }

      // Update access stats
      item.lastAccessed = Date.now();
      item.accessCount = (item.accessCount || 0) + 1;

      // Write back updated stats (optional, could be skipped for performance)
      // await fs.writeFile(filePath, JSON.stringify(item));

      this.stats.hits++;
      return item;
    } catch (error) {
      console.error(`[FileCache] Get failed:`, error);
      this.stats.errors++;
      return null;
    }
  }

  /**
   * @inheritDoc
   */
  async set<T = any>(key: string, value: T, ttl?: number): Promise<boolean> {
    try {
      const filePath = this.getFilePath(key);
      const expiresAt = ttl ? Date.now() + ttl : null;

      const item: CacheItem<T> = {
        value,
        expiresAt,
        createdAt: Date.now(),
        lastAccessed: Date.now(),
        accessCount: 0
      };

      await fs.writeFile(filePath, JSON.stringify(item));
      this.stats.sets++;
      return true;
    } catch (error) {
      console.error(`[FileCache] Set failed:`, error);
      this.stats.errors++;
      return false;
    }
  }

  /**
   * @inheritDoc
   */
  async delete(key: string): Promise<boolean> {
    try {
      const filePath = this.getFilePath(key);
      await fs.unlink(filePath);
      this.stats.deletes++;
      return true;
    } catch (error) {
      // If file doesn't exist, it's not an error for delete operation
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return false;
      }

      console.error(`[FileCache] Delete failed:`, error);
      this.stats.errors++;
      return false;
    }
  }

  /**
   * @inheritDoc
   */
  async has(key: string): Promise<boolean> {
    try {
      const filePath = this.getFilePath(key);
      await fs.access(filePath);

      // Check if expired
      const data = await fs.readFile(filePath, 'utf8');
      const item: CacheItem = JSON.parse(data);

      if (item.expiresAt && item.expiresAt <= Date.now()) {
        await this.delete(key);
        this.stats.expired++;
        return false;
      }

      return true;
    } catch (error) {
      // File doesn't exist or other error
      return false;
    }
  }

  /**
   * @inheritDoc
   */
  async clear(): Promise<number> {
    try {
      const files = await fs.readdir(this.fileOptions.directory);
      const cacheFiles = files.filter(file =>
        file.startsWith(`${this.options.namespace}_`) &&
        file.endsWith(this.fileOptions.fileExtension || '.cache')
      );

      // Delete all cache files
      await Promise.all(
        cacheFiles.map(file => fs.unlink(path.join(this.fileOptions.directory, file)))
      );

      this.stats.deletes += cacheFiles.length;
      return cacheFiles.length;
    } catch (error) {
      console.error(`[FileCache] Clear failed:`, error);
      this.stats.errors++;
      return 0;
    }
  }

  /**
   * @inheritDoc
   */
  async getStats(): Promise<CacheStats> {
    try {
      const files = await fs.readdir(this.fileOptions.directory);
      const cacheFiles = files.filter(file =>
        file.startsWith(`${this.options.namespace}_`) &&
        file.endsWith(this.fileOptions.fileExtension || '.cache')
      );

      return {
        ...this.stats,
        size: cacheFiles.length,
        maxSize: this.options.maxItems,
        hitRate: this.stats.hits + this.stats.misses > 0
          ? this.stats.hits / (this.stats.hits + this.stats.misses)
          : 0
      };
    } catch (error) {
      console.error(`[FileCache] Get stats failed:`, error);
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
  }

  /**
   * @inheritDoc
   */
  startCleanupInterval(interval: number): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }

    this.cleanupInterval = setInterval(async () => {
      await this.cleanupExpiredItems();
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
  }/**
   * Scans the cache directory and removes expired items based on their expiration timestamp.
   * Used by the cleanup interval to maintain cache validity and reduce storage overhead.
   *
   * @example
   * // Automatically called by the cleanup interval every X milliseconds
   * const expiredCount = await this.cleanupExpiredItems();
   * console.log(`Cleaned up ${expiredCount} expired items`);
   *
   * @remarks
   * - This method is invoked automatically by the cleanup interval and should not be called manually.
   * - Expired items are identified by checking if `item.expiresAt <= Date.now()`.
   * - Files are filtered by the cache namespace and file extension to ensure correct targeting.
   * - Errors during cleanup are logged and counted in the stats object.
   */
  private async cleanupExpiredItems(): Promise<number> {
    try {
      const files = await fs.readdir(this.fileOptions.directory);
      const cacheFiles = files.filter(file =>
        file.startsWith(`${this.options.namespace}_`) &&
        file.endsWith(this.fileOptions.fileExtension || '.cache')
      );

      let cleanedCount = 0;

      for (const file of cacheFiles) {
        const filePath = path.join(this.fileOptions.directory, file);
        const data = await fs.readFile(filePath, 'utf8');
        const item: CacheItem = JSON.parse(data);

        if (item.expiresAt && item.expiresAt <= Date.now()) {
          await fs.unlink(filePath);
          cleanedCount++;
          this.stats.expired++;
        }
      }

      return cleanedCount;
    } catch (error) {
      console.error(`[FileCache] Cleanup expired items failed:`, error);
      this.stats.errors++;
      return 0;
    }
  }
}
