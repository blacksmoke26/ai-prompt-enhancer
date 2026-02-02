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
import HistoryResponse from './HistoryResponse';
import PromptTemplate from './PromptTemplate';
import PromptTemplateCategory from './PromptTemplateCategory';

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
export * from './HistoryResponse';
export * from './PromptTemplate';
export * from './PromptTemplateCategory';

let isInitialized = false;

if (!isInitialized) {
  Provider.hasMany(History, {
    as: 'history',
    foreignKey: 'providerId',
  });
  History.belongsTo(Provider, {
    as: 'provider',
    foreignKey: 'providerId',
  });
  History.belongsTo(PromptUserRole, {
    as: 'promptUserRole',
    foreignKey: 'userRole',
  });
  History.hasOne(HistoryResponse, {
    as: 'response',
    foreignKey: 'historyId',
    sourceKey: 'id',
  });
  HistoryResponse.belongsTo(History, {
    as: 'history',
    foreignKey: 'historyId',
    targetKey: 'id',
  });
  PromptTemplate.belongsTo(PromptTemplateCategory, {
    as: 'category',
    foreignKey: 'categoryId',
    targetKey: 'id',
  });
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
  HistoryResponse,
  PromptTemplate,
  PromptTemplateCategory,
};
