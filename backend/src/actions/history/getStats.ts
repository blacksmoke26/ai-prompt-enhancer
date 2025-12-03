/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// classes
import { HistoryManager } from '~/services/HistoryManager';

/**
 * Gets statistics about the history data
 * @param historyManager - Instance of HistoryManager
 * @returns History statistics object
 */
export default async function getStats(historyManager: HistoryManager) {
  try {
    return historyManager.getStats();
  } catch (error: any) {
    throw new Error(`Failed to get history stats: ${error.message}`);
  }
}
