/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

/**
 * Database configuration for Sequelize ORM.
 *
 * This file exports the configuration object used by Sequelize to connect to the database.
 * The configuration includes settings for the SQLite database, storage path, and logging.
 *
 * @example
 * const db = require('./config/database');
 * // Access the development configuration
 * const devConfig = db.development;
 *
 * @developer_notes
 * - The configuration uses environment variables for the storage path.
 * - Default storage path is 'database/database.sqlite' if not specified.
 * - Logging is enabled for development mode.
 */

  // Load environment variables from .env file
require('dotenv').config();

const env = require('@junaidatari/env-binder').default;

/**
 * Sequelize database configuration.
 * @typedef {Object} DatabaseConfig
 * @property {Object} development - Development environment configuration.
 * @property {string} development.dialect - Database dialect (e.g., 'sqlite').
 * @property {string} development.storage - Path to the SQLite database file.
 * @property {boolean} development.logging - Enable/disable logging.
 */

/**
 * @type {DatabaseConfig}
 */
module.exports = {
  development: {
    dialect: 'sqlite',
    storage: env.getString('SQLITE_STORAGE') ?? 'database/database.sqlite',
    logging: console.log,
  }
};
