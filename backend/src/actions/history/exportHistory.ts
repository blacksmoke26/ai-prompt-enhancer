/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// classes
import { HistoryManager } from '~/services/HistoryManager';

// utils
import { exportSchema } from '~/utils/validation';

/**
 * Exports history data in specified format
 * @param historyManager - Instance of HistoryManager
 * @param format - Export format (json, csv, or txt)
 * @param limit - Optional limit on number of items to export
 * @returns Exported history data as string
 */
export default async function exportHistory(historyManager: HistoryManager, format: 'json' | 'csv' | 'txt', limit?: number): Promise<string> {
  try {
    const { error, value } = exportSchema.validate({ format, limit });
    if (error) {
      throw new Error(`Validation failed: ${error.details.map(detail => detail.message).join(', ')}`);
    }

    return historyManager.exportHistory(value.format);
  } catch (error: any) {
    throw new Error(`Failed to export history: ${error.message}`);
  }
}
