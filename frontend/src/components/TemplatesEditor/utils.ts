/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {
  Archive,
  BarChart,
  CheckCircle2,
  Code,
  FileText,
  Globe,
  History,
  LayoutGrid,
  LucideIcon,
  Megaphone,
  Palette,
  PenTool,
} from 'lucide-react';

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
 * Mapping of status keys to Lucide React icon components.
 * Used to display a visual indicator next to the status label.
 */
export const PROMPT_STATUS_ICONS: Record<PromptStatus, React.ComponentType<{ size?: number }>> = {
  draft: FileText,
  active: CheckCircle2,
  archived: Archive,
};

/**
 * Default mapping of category slugs to their display metadata.
 * Includes the human-readable name and the associated Lucide icon for the category.
 */
export const defaultCategoryMap: Record<string, { name: string; icon: LucideIcon }> = {
  'all': {name: 'All', icon: LayoutGrid},
  'writing': {name: 'Writing', icon: PenTool},
  'development': {name: 'Dev', icon: Code},
  'marketing': {name: 'Marketing', icon: Megaphone},
  'design': {name: 'Design', icon: Palette},
  'finance': {name: 'Finance', icon: BarChart},
  'networking': {name: 'Networking', icon: Globe},
  'education': {name: 'Education', icon: History},
  'legal': {name: 'Legal', icon: FileText},
};

/**
 * Converts a simple Markdown string into an HTML string with Tailwind CSS classes.
 * Supports headers, bold, italic, code blocks, inline code, lists, and paragraphs.
 *
 * @param markdown - The Markdown string to convert.
 * @returns The converted HTML string.
 */
export const simpleMarkdownToHtml = (markdown: string): string => {
  if (!markdown) return '';
  let html = markdown
    // Headers
    .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mb-4 mt-6">$1</h1>')
    .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mb-3 mt-4">$1</h2>')
    .replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold mb-2 mt-3">$1</h3>')
    // Bold & Italic
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    // Code blocks
    .replace(/```([\s\S]*?)```/g, '<pre class="bg-muted p-3 rounded-md my-4 overflow-x-auto text-sm font-mono"><code>$1</code></pre>')
    .replace(/`(.*?)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-xs font-mono text-primary">$1</code>')
    // Lists
    .replace(/^\s*-\s+(.*)$/gm, '<li class="ml-4 list-disc">$1</li>')
    .replace(/(<li.*<\/li>\n?)+/g, '<ul class="list-disc pl-5 mb-4">$&</ul>')
    // Paragraphs
    .replace(/\n\n/g, '</p><p class="mb-4">')
    .replace(/\n/g, '<br />');

  return `<p class="mb-4">${html}</p>`;
};
