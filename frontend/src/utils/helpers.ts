/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import {twMerge} from 'tailwind-merge';
import {type ClassValue, clsx} from 'clsx';

// types
import type {GroupedOption} from '~/components/ui/Select';

/**
 * Merges class names using clsx and tailwind-merge.
 * @example cn('px-2', 'py-1', 'bg-blue-500') // Returns merged Tailwind classes
 * @developer-note Ensure clsx and tailwind-merge are installed as dependencies.
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

/**
 * Formats a date string or Date object into a localized string.
 * @example formatDate(new Date()) // Returns "Jan 1, 2023, 12:00 AM"
 * @developer-note Adjust locale or options as needed for different date formats.
 */
export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Converts bytes into a human-readable string with appropriate units.
 * @example formatBytes(1024) // Returns "1 KB"
 * @developer-note Supports up to GB; extend sizes array for larger units.
 */
export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Utility for formatting numbers safely.
 * @param num Value to format; returns `'0'` for null/undefined.
 * @example
 * ```typescript
 * formatNumber(1234.56); // "1,235"
 * formatNumber(null); // "0"
 * ```
 * @developerNotes Handles NaN and null/undefined gracefully
 */
export const formatNumber = (num: number | undefined | null) => {
  if (num == null || isNaN(num)) return '0';
  return num.toLocaleString();
};

/**
 * Utility for formatting percentages.
 * @param num Value to format as percentage; returns `'0%'` for null/undefined.
 * @example
 * ```typescript
 * formatPercentage(0.75); // "75%"
 * formatPercentage(null); // "0%"
 * ```
 * @developerNotes Handles NaN and null/undefined gracefully
 */
export const formatPercentage = (num: number | undefined | null) => {
  if (num == null || isNaN(num)) return '0%';
  return num >= 100
    ? `${Math.round(num)}%`
    : (num < 0.01
      ? '<1%'
      : `${Math.round(num * 100)}%`);
};

/**
 * Utility for formatting time ranges.
 * @param seconds Value in seconds to format; returns `'0s'` for null/undefined.
 * @example
 * ```typescript
 * formatTimeRange(120); // "2m"
 * formatTimeRange(45); // "45s"
 * ```
 * @developerNotes Converts seconds to appropriate time units
 */
export const formatTimeRange = (seconds: number | undefined | null) => {
  if (seconds == null || isNaN(seconds)) return '0s';
  return formatDuration(seconds * 1000);
};

/**
 * Formats milliseconds into a readable duration string.
 * @example formatDuration(1500) // Returns "1.5s"
 * @developer-note Adjust thresholds for different precision requirements.
 */
export const formatDuration = (ms: number): string => {
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
  return `${(ms / 60000).toFixed(1)}m`;
};

/**
 * Creates a debounced version of a function that delays execution.
 * @example debounce(() => console.log('Hello'), 300) // Logs after 300ms delay
 * @developer-note Useful for limiting API calls during rapid events like typing.
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void => {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Downloads a file with given content and filename.
 * @example downloadFile('Hello, world!', 'greeting.txt') // Triggers file download
 * @developer-note Ensure proper MIME type for non-text files (e.g., 'application/json').
 */
export const downloadFile = (content: string, filename: string, contentType: string = 'text/plain'): void => {
  const blob = new Blob([content], {type: contentType});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Copies text to the clipboard using modern or fallback methods.
 * @example copyToClipboard('Copy me') // Copies text to clipboard
 * @developer-note Fallback uses deprecated execCommand; update when Clipboard API is unsupported.
 */
export const copyToClipboard = (text: string): Promise<void> => {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    return new Promise((resolve, reject) => {
      document.execCommand('copy') ? resolve() : reject();
      textArea.remove();
    });
  }
};

/**
 * Truncates text to a specified length and appends ellipsis.
 * @example truncateText('Hello, world!', 5) // Returns "Hello..."
 * @developer-note Consider using CSS text-overflow for UI truncation instead.
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

/**
 * Generates a unique ID using timestamp and random string.
 * @example generateId() // Returns "1b2c3d4e5f6g7h8i9j0k"
 * @developer-note Replace with crypto.randomUUID() for more secure IDs.
 */
export const generateId = (): string => Date.now().toString(36) + Math.random().toString(36).substr(2);

/**
 * Validates if a string is a properly formatted URL.
 * @example isValidUrl('https://example.com') // Returns true
 * @developer-note Only checks syntax; does not verify URL reachability.
 */
export const isValidUrl = (string: string): boolean => {
  try {
    new URL(string);
    return true;
  } catch {
    return false;
  }
};

/**
 * Converts a flat list into grouped options for a select component.
 * @example toSelectGroupedOptions([{id: '1', name: 'Option 1', category: 'A'}]) // Returns grouped options
 * @developer-note Customize categoryField/descriptionField for different data structures.
 */
export const toSelectGroupedOptions = (list: {
  id: string;
  name: string;
  description?: string;
  [key: string]: any;
}[], categoryField: string = 'category', descriptionField: string = 'description'): GroupedOption[] => {
  const mapped: Record<string, { label: string; value: string; description?: string; }[]> = {};

  for (const data of list) {
    const option = {
      ...data,
      label: data.name,
      value: data.id,
      description: data[descriptionField],
      category: data[categoryField],
    };
    if (Object.prototype.hasOwnProperty.call(mapped, data[categoryField])) {
      mapped[data[categoryField]].push(option);
    } else {
      mapped[data[categoryField]] = [option];
    }
  }

  return Object.entries(mapped).map(([label, options]) => ({label, options}));
};


/**
 * Converts a flat list into grouped options for a select component.
 * @example toSelectGroupedOptions([{id: '1', name: 'Option 1', category: 'A'}]) // Returns grouped options
 * @developer-note Customize categoryField/descriptionField for different data structures.
 */
export const toSelectGroupedOptionsPlain = (list: {
  key: string;
  name: string;
  category: string;
  [key: string]: any;
}[], categoryField: string = 'category', keyField: string = 'key'): GroupedOption[] => {
  const mapped: Record<string, { label: string; value: string; }[]> = {};

  for (const data of list) {
    const option = {...data, label: data.name, value: data[keyField], category: data[categoryField]};
    if (Object.prototype.hasOwnProperty.call(mapped, data[categoryField])) {
      mapped[data[categoryField]].push(option);
    } else {
      mapped[data[categoryField]] = [option];
    }
  }

  return Object.entries(mapped).map(([label, options]) => ({label, options}));
};
