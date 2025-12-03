/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// classes
import {HistoryManager} from '~/services/HistoryManager';

// utils
import {historyUpdateSchema} from '~/utils/validation';

/**
 * Updates a history item with rating or notes
 * @param historyManager - Instance of HistoryManager
 * @param id - ID of the history item to update
 * @param updates - Updates to apply to the history item
 * @returns Boolean indicating success or failure
 */
export default async function updateHistoryItem(historyManager: HistoryManager, id: string, updates: Record<string, any>): Promise<boolean> {
  try {
    const { error, value } = historyUpdateSchema.validate(updates);
    if (error) {
      throw new Error(`Validation failed: ${error.details.map(detail => detail.message).join(', ')}`);
    }

    return historyManager.updateHistoryItem(id, value);
  } catch (error: any) {
    throw new Error(`Failed to update history item: ${error.message}`);
  }
}
