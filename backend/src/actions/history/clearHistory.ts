/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// classes
import { HistoryManager } from '~/services/HistoryManager';

/**
 * Clears all history items
 * @param historyManager - Instance of HistoryManager
 * @returns Boolean indicating success
 */
export default async function clearHistory(historyManager: HistoryManager): Promise<boolean> {
  try {
    historyManager.clearHistory();
    return true;
  } catch (error: any) {
    throw new Error(`Failed to clear history: ${error.message}`);
  }
}
