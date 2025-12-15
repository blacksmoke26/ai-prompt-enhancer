/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// classes
import {HistoryManager, PromptHistory} from '~/services/HistoryManager';

/**
 * Retrieves history items with optional search or limit
 * @param historyManager - Instance of HistoryManager
 * @param limit - Optional limit on number of items to return
 * @param search - Optional search term for filtering history
 * @returns Array of history items
 */
export default async function getHistory(historyManager: HistoryManager, limit?: number, search?: string): Promise<PromptHistory[]> {
  try {
    let history;
    if (search) {
      history = await historyManager.searchHistory(search);
    } else {
      history = await historyManager.getHistory(limit);
    }
    return history;
  } catch (error: any) {
    throw new Error(`Failed to get history: ${error.message}`);
  }
}
