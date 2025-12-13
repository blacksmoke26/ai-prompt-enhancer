/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import {Options, Sequelize} from 'sequelize';

// @ts-ignore
import config from '~/database/config/config';

/**
 * Represents a Sequelize database instance.
 */
export type SequelizeInstance = InstanceType<typeof Sequelize>;

const DB_CONFIG = config?.development ?? {};

/**
 * The main Sequelize instance for the application.
 */
let sequelizeInstance: SequelizeInstance;

/**
 * Creates a new Sequelize instance with the given options.
 * @param options - Partial Sequelize configuration options to override defaults
 * @returns The newly created Sequelize instance
 */
export const newInstance = (options: Partial<Options> = {}) => {
  if (!sequelizeInstance) {
    sequelizeInstance = new Sequelize({
      dialect: DB_CONFIG.dialect,
      storage: DB_CONFIG.storage,
      logging: DB_CONFIG.logging,
      ...options,
    });
  }

  return sequelizeInstance;
};

/**
 * Initializes database connection and synchronizes models.
 *
 * @param options - Partial Sequelize configuration options to override defaults
 * @returns Promise that resolves when initialization completes
 *
 * @example
 * ```typescript
 * await initDB({ logging: false });
 * const db = getInstance();
 * ```
 *
 * @developerNote
 * In production, consider using migrations instead of sync() for better control over schema changes.
 */
export const initDB = async (options: Partial<Options> = {}): Promise<void> => {
  const instance = getInstance();

  try {
    await instance.authenticate();
    console.log('Database connection established.');
    // In a production setup you would run migrations instead of sync().
    await instance.sync();
    console.log('Database synchronized.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

/**
 * Retrieves the current Sequelize database instance.
 *
 * @returns The initialized Sequelize instance
 *
 * @example
 * ```typescript
 * const db = getInstance();
 * await db.query('SELECT * FROM users');
 * ```
 *
 * @throws {Error} If the instance hasn't been initialized via initDB()
 *
 * @developerNote
 * Always call initDB() before attempting to get the instance.
 */
export const getInstance = (): SequelizeInstance => {
  return sequelizeInstance
    ? sequelizeInstance
    : (sequelizeInstance = newInstance());
};
