/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// classes

import {HistoryManager} from '~/services/HistoryManager';

/**
 * Deletes a specific history item by ID
 * @param historyManager - Instance of HistoryManager
 * @param id - ID of the history item to delete
 * @returns Boolean indicating success or failure
 */
export default async function deleteHistoryItem(historyManager: HistoryManager, id: string): Promise<boolean> {
  try {
    return await historyManager.deleteHistoryItem(id);
  } catch (error: any) {
    throw new Error(`Failed to delete history item: ${error.message}`);
  }
}
