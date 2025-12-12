/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import Provider from './Provider';
import History from './History';
import Setting from './Setting';

/**
 * Export all models for use elsewhere in the application.
 */
export * from './Provider';
export * from './History';
export * from './Setting';

let isInitialized = false;

if (!isInitialized) {
  History.hasOne(Provider, {as: 'provider', foreignKey: 'providerId'});
  isInitialized = true;
}

export {
  Provider,
  History,
  Setting,
};
