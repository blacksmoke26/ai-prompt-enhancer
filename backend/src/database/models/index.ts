/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import History from './History';
import Setting from './Setting';
import Provider from './Provider';
import Tone from './Tone';
import PromptUserRole from './PromptUserRole';
import ResponseLength from './ResponseLength';
import EnhancementType from './EnhancementType';

/**
 * Export all models for use elsewhere in the application.
 */
export * from './History';
export * from './Setting';
export * from './Provider';
export * from './Tone';
export * from './PromptUserRole';
export * from './ResponseLength';
export * from './EnhancementType';

let isInitialized = false;

if (!isInitialized) {
  Provider.hasMany(History, {as: 'provider', foreignKey: 'providerId'});
  isInitialized = true;
}

export {
  History,
  Setting,
  Provider,
  Tone,
  PromptUserRole,
  ResponseLength,
  EnhancementType,
};
