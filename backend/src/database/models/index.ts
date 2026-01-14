/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import Tone from './Tone';
import History from './History';
import Setting from './Setting';
import Provider from './Provider';
import PromptUserRole from './PromptUserRole';
import ResponseLength from './ResponseLength';
import TargetAudience from './TargetAudience';
import EnhancementType from './EnhancementType';

/**
 * Export all models for use elsewhere in the application.
 */
export * from './Tone';
export * from './History';
export * from './Setting';
export * from './Provider';
export * from './PromptUserRole';
export * from './TargetAudience';
export * from './ResponseLength';
export * from './EnhancementType';

let isInitialized = false;

if (!isInitialized) {
  Provider.hasMany(History, {as: 'provider', foreignKey: 'providerId'});
  isInitialized = true;
}

export {
  Tone,
  History,
  Setting,
  Provider,
  PromptUserRole,
  ResponseLength,
  TargetAudience,
  EnhancementType,
};
