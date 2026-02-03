/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {Check, LayoutGrid, LucideIcon, Star} from 'lucide-react';

// utils
import {cn} from '~/utils/helpers';
import {defaultCategoryMap} from './utils';

// types
import type {PromptTemplate} from './index';

/**
 * Props for the TemplateCard component.
 */
export interface TemplateCardProps {
  /** The template data to display. */
  template: PromptTemplate;
  /** Whether this template is currently selected. */
  isSelected: boolean;
  /** Whether this template is marked as a favorite. */
  isFavorite?: boolean;
  /** Mapping of category names to icons. */
  categoryIcons?: Record<string, { name: string; icon: LucideIcon }>;

  /** Callback when the card is clicked. */
  onClick(): void;

  /** Callback when the favorite toggle is clicked. */
  onToggleFavorite?(): void;

  /** Callback when a tag is clicked. */
  onTagClick?(tag: string): void;

  /** Custom renderer for tags. */
  renderTag?(tag: string, onClick: (tag: string) => void): React.ReactNode;
}
const TemplateCard: React.FC<TemplateCardProps> = (props) => {
  const {
    template,
    isSelected,
    isFavorite = false,
    onClick,
    onToggleFavorite,
    onTagClick = () => {
    },
    categoryIcons,
    renderTag,
  } = props;

  // 1. Handle Category Icon
  const iconData =
    (categoryIcons && categoryIcons[template.category]) ||
    defaultCategoryMap[template.category] ||
    {icon: LayoutGrid, name: 'All'};
  const IconName = iconData.icon;

  // 2. Default Tag Renderer (used if renderTag prop is not provided)
  const renderDefaultTag = (tag: string) => (
    <span
      key={tag}
      onClick={(e) => {
        e.stopPropagation();
        onTagClick(tag);
      }}
      className="text-[10px] text-muted-foreground bg-background/50 border border-border px-1.5 py-0.5 rounded hover:text-foreground hover:bg-accent cursor-pointer transition-colors select-none"
    >
      #{tag}
    </span>
  );

  return (
    <div
      onClick={onClick}
      className={cn(
        'group relative text-left p-4 rounded-xl border cursor-pointer transition-all duration-200 flex flex-col h-full',
        isSelected
          ? 'border-primary bg-primary/5 shadow-md ring-1 ring-primary/20'
          : 'border-border hover:border-primary/50 hover:bg-accent/30 hover:shadow-sm hover:-translate-y-0.5',
      )}
    >
      {/* Top Row: Icon, Title, Version, Actions */}
      <div className="flex justify-between items-start mb-2 shrink-0">
        <div className="flex items-start gap-3">
          <div
            className={cn(
              'p-2 rounded-lg border transition-colors shrink-0',
              isSelected
                ? 'border-primary/30 bg-primary/20 text-primary'
                : 'border-border bg-muted/30 text-muted-foreground group-hover:bg-background group-hover:text-foreground',
            )}
          >
            <IconName size={18}/>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm leading-tight group-hover:text-primary transition-colors truncate">
              {template.title}
            </h3>
            {template.version && (
              <span className="text-[10px] text-muted-foreground">
                v{template.version}
              </span>
            )}
          </div>
        </div>

        {/* Actions: Favorite & Selected Indicator */}
        <div className="flex gap-2">
          {onToggleFavorite && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite();
              }}
              className={cn(
                'h-5 w-5 rounded-full border flex items-center justify-center transition-all shrink-0 hover:bg-background',
                isFavorite
                  ? 'bg-yellow-100 border-yellow-400 text-yellow-600'
                  : 'border-input bg-background',
              )}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Star
                size={10}
                className={cn(
                  'fill-current',
                  isFavorite
                    ? 'text-yellow-600'
                    : 'text-transparent hover:text-yellow-400',
                )}
              />
            </button>
          )}
          <div
            className={cn(
              'h-5 w-5 rounded-full border flex items-center justify-center transition-all shrink-0',
              isSelected
                ? 'bg-primary border-primary'
                : 'border-input bg-background',
            )}
          >
            {isSelected && (
              <Check size={10} className="text-primary-foreground"/>
            )}
          </div>
        </div>
      </div>

      {/* Middle Row: Description */}
      <p className="text-xs text-muted-foreground mb-3 line-clamp-2 leading-relaxed flex-1">
        {template.description}
      </p>

      {/* Bottom Row: Tags */}
      {/* Uses custom renderTag if provided, otherwise uses renderDefaultTag */}
      {template.tags && template.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {template.tags.map((tag) =>
            renderTag ? renderTag(tag, onTagClick) : renderDefaultTag(tag),
          )}
        </div>
      )}
    </div>
  );
};

export default TemplateCard;
