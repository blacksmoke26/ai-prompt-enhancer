/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import {LucideIcon} from 'lucide-react';

// types
import type {PromptStatus} from './index';

/**
 * Readonly array of all valid prompt statuses.
 * Used for iterating over possible states or validating status inputs.
 */
export const PROMPT_STATUSES: readonly PromptStatus[] = ['draft', 'active', 'archived'] as const;

/**
 * Mapping of status keys to human-readable labels.
 * Provides the display text for the UI corresponding to a specific status key.
 */
export const PROMPT_STATUS_LABELS: Record<PromptStatus, string> = {
  draft: 'Draft',
  active: 'Active',
  archived: 'Archived',
};

/**
 * Mapping of status keys to visual variant names.
 * Defines the visual style (e.g., button variant) associated with each status.
 */
export const PROMPT_STATUS_VARIANT: Record<
  PromptStatus,
  'default' | 'primary' | 'muted'
> = {
  draft: 'default',
  active: 'primary',
  archived: 'muted',
};

/**
 * Returns the appropriate CSS class string for a status badge based on the given status.
 * These classes handle background colors, text colors, and borders for both light and dark modes.
 *
 * @param status - The prompt status (e.g., 'draft', 'active').
 * @returns A string of Tailwind CSS classes.
 */
export const getStatusBadgeClassName = (
  status: PromptStatus,
): string => {
  switch (status) {
    case 'draft':
      return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20 dark:text-yellow-500';
    case 'active':
      return 'bg-green-500/10 text-green-600 border-green-500/20 dark:text-green-500';
    case 'archived':
      return 'bg-muted/50 text-muted-foreground border-border';
    default:
      return 'bg-muted/50 text-muted-foreground border-border';
  }
};

/**
 * Default mapping of category slugs to their display metadata.
 * Includes the human-readable name and the associated Lucide icon for the category.
 */
export const defaultCategoryMap: Record<string, { name: string; icon: LucideIcon }> = {
  /*'all': {name: 'All', icon: LayoutGrid},
  'writing': {name: 'Writing', icon: PenTool},
  'development': {name: 'Dev', icon: Code},
  'marketing': {name: 'Marketing', icon: Megaphone},
  'design': {name: 'Design', icon: Palette},
  'finance': {name: 'Finance', icon: BarChart},
  'networking': {name: 'Networking', icon: Globe},
  'education': {name: 'Education', icon: History},
  'legal': {name: 'Legal', icon: FileText},*/
};
