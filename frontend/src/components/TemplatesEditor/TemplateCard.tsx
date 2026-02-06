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

  // --- Advanced UI Configurations ---

  /** Display mode of the card. 'full' shows all info, 'compact' minimizes spacing and hides description. */
  displayMode?: 'full' | 'compact';

  /** Custom wrapper class names for the card container. */
  cardClassName?: string;

  /** Custom styles for the card container. */
  cardStyle?: React.CSSProperties;

  /** Configuration for the description text. */
  descriptionConfig?: {
    /** Number of lines to show before truncating. Defaults to 2. */
    lines?: number;
    /** Whether to show the description at all. Defaults to true. */
    visible?: boolean;
    /** Custom renderer for the description. */
    render?: (text: string) => React.ReactNode;
  };

  /** Configuration for the header section (Icon + Title). */
  headerConfig?: {
    /** Whether to show the category icon. Defaults to true. */
    showIcon?: boolean;
    /** Whether to show the version badge. Defaults to true. */
    showVersion?: boolean;
    /** Custom renderer for the title area. */
    renderTitle?: (template: PromptTemplate) => React.ReactNode;
    /** Custom size for the icon container. */
    iconSize?: number;
  };

  /** Configuration for the actions (Favorite/Select). */
  actionsConfig?: {
    /** Whether to show the favorite button. Defaults to true if onToggleFavorite exists. */
    showFavorite?: boolean;
    /** Whether to show the selection checkmark. Defaults to true. */
    showSelection?: boolean;
    /** Position of the actions relative to the card. */
    position?: 'top-right' | 'bottom-right';
  };

  /** Configuration for tags. */
  tagsConfig?: {
    /** Maximum number of tags to display before truncating (e.g., "+2 more"). */
    maxVisible?: number;
    /** Whether to hide tags entirely. Defaults to false. */
    hidden?: boolean;
    /** Alignment of tags. */
    align?: 'left' | 'right' | 'center';
  };

  /** Custom footer content to append below the tags. */
  renderFooter?: () => React.ReactNode;
}

const TemplateCard: React.FC<TemplateCardProps> = (props) => {
  const {
    template,
    isSelected,
    isFavorite = false,
    onClick,
    onToggleFavorite,
    onTagClick = () => {},
    categoryIcons,
    renderTag,
    displayMode = 'full',
    cardClassName,
    cardStyle,
    descriptionConfig,
    headerConfig,
    actionsConfig,
    tagsConfig,
    renderFooter,
  } = props;

  // 1. Handle Category Icon
  const iconData =
    (categoryIcons && categoryIcons[template.category]) ||
    defaultCategoryMap[template.category] ||
    {icon: LayoutGrid, name: 'All'};
  const IconName = iconData.icon;

  // Determine visibility based on config
  const shouldShowDescription = descriptionConfig?.visible !== false;
  const shouldShowIcon = headerConfig?.showIcon !== false;
  const shouldShowVersion = headerConfig?.showVersion !== false;
  const shouldShowFavorite = actionsConfig?.showFavorite !== false && !!onToggleFavorite;
  const shouldShowSelection = actionsConfig?.showSelection !== false;
  const shouldShowTags = !tagsConfig?.hidden && template.tags && template.tags.length > 0;

  // 2. Default Tag Renderer
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

  // 3. Handle Tags Truncation
  let tagsToRender: string[] = [];
  let overflowCount = 0;

  if (shouldShowTags) {
    const maxTags = tagsConfig?.maxVisible;
    if (maxTags && maxTags > 0 && template.tags.length > maxTags) {
      tagsToRender = template.tags.slice(0, maxTags);
      overflowCount = template.tags.length - maxTags;
    } else {
      tagsToRender = template.tags;
    }
  }

  // 4. Determine Base Styling based on mode
  const isCompact = displayMode === 'compact';

  return (
    <div
      onClick={onClick}
      className={cn(
        'group relative text-left border cursor-pointer transition-all duration-200 flex flex-col h-full',
        isCompact ? 'p-3 rounded-lg' : 'p-4 rounded-xl',
        isSelected
          ? 'border-primary bg-primary/5 shadow-md ring-1 ring-primary/20'
          : 'border-border hover:border-primary/50 hover:bg-accent/30 hover:shadow-sm hover:-translate-y-0.5',
        cardClassName
      )}
      style={cardStyle}
    >
      {/* Top Row: Icon, Title, Version, Actions */}
      <div className={cn(
        'flex justify-between items-start shrink-0',
        isCompact ? 'mb-1.5' : 'mb-2'
      )}>
        <div className="flex items-start gap-3">
          {shouldShowIcon && (
            <div
              className={cn(
                'rounded-lg border transition-colors shrink-0',
                isCompact ? 'p-1.5' : 'p-2',
                isSelected
                  ? 'border-primary/30 bg-primary/20 text-primary'
                  : 'border-border bg-muted/30 text-muted-foreground group-hover:bg-background group-hover:text-foreground',
              )}
            >
              <IconName size={headerConfig?.iconSize || (isCompact ? 14 : 18)}/>
            </div>
          )}
          <div className="flex-1 min-w-0">
            {headerConfig?.renderTitle ? (
              headerConfig.renderTitle(template)
            ) : (
              <>
                <h3 className={cn(
                  'font-semibold leading-tight group-hover:text-primary transition-colors truncate',
                  isCompact ? 'text-xs' : 'text-sm'
                )}>
                  {template.title}
                </h3>
                {shouldShowVersion && template.version && (
                  <span className="text-[10px] text-muted-foreground">
                    v{template.version}
                  </span>
                )}
              </>
            )}
          </div>
        </div>

        {/* Actions: Favorite & Selected Indicator */}
        {actionsConfig?.position !== 'bottom-right' && (
          <div className="flex gap-2">
            {shouldShowFavorite && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite!();
                }}
                className={cn(
                  'rounded-full border flex items-center justify-center transition-all shrink-0 hover:bg-background',
                  isCompact ? 'h-4 w-4' : 'h-5 w-5',
                  isFavorite
                    ? 'bg-yellow-100 border-yellow-400 text-yellow-600'
                    : 'border-input bg-background',
                )}
                title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Star
                  size={isCompact ? 8 : 10}
                  className={cn(
                    'fill-current',
                    isFavorite
                      ? 'text-yellow-600'
                      : 'text-transparent hover:text-yellow-400',
                  )}
                />
              </button>
            )}
            {shouldShowSelection && (
              <div
                className={cn(
                  'rounded-full border flex items-center justify-center transition-all shrink-0',
                  isCompact ? 'h-4 w-4' : 'h-5 w-5',
                  isSelected
                    ? 'bg-primary border-primary'
                    : 'border-input bg-background',
                )}
              >
                {isSelected && (
                  <Check size={isCompact ? 8 : 10} className="text-primary-foreground"/>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Middle Row: Description */}
      {isCompact ? null : (
        shouldShowDescription && (
          <div className="flex-1 mb-3">
            {descriptionConfig?.render ? (
              descriptionConfig.render(template.description)
            ) : (
              <p
                className={cn(
                  "text-muted-foreground leading-relaxed",
                  descriptionConfig?.lines ? `line-clamp-${descriptionConfig.lines}` : "line-clamp-2",
                  "text-xs"
                )}
              >
                {template.description}
              </p>
            )}
          </div>
        )
      )}

      {/* Bottom Row: Tags & Footer */}
      <div className={cn(
        "mt-auto",
        tagsConfig?.align === 'right' && "justify-end",
        tagsConfig?.align === 'center' && "justify-center",
        actionsConfig?.position === 'bottom-right' && "flex justify-between items-center"
      )}>
        {shouldShowTags && (
          <div className={cn(
            "flex flex-wrap gap-1.5",
            actionsConfig?.position === 'bottom-right' ? "flex-1" : "w-full"
          )}>
            {tagsToRender.map((tag) =>
              renderTag ? renderTag(tag, onTagClick) : renderDefaultTag(tag),
            )}
            {overflowCount > 0 && (
              <span className="text-[10px] text-muted-foreground px-1.5 py-0.5 select-none">
                +{overflowCount} more
              </span>
            )}
          </div>
        )}

        {/* Bottom Positioned Actions */}
        {actionsConfig?.position === 'bottom-right' && (
          <div className="flex gap-2 ml-2 shrink-0">
            {shouldShowFavorite && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite!();
                }}
                className={cn(
                  'rounded-full border flex items-center justify-center transition-all shrink-0 hover:bg-background',
                  'h-5 w-5',
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
            {shouldShowSelection && (
              <div
                className={cn(
                  'rounded-full border flex items-center justify-center transition-all shrink-0',
                  'h-5 w-5',
                  isSelected
                    ? 'bg-primary border-primary'
                    : 'border-input bg-background',
                )}
              >
                {isSelected && (
                  <Check size={10} className="text-primary-foreground"/>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Custom Footer */}
      {renderFooter && (
        <div className="mt-3 pt-2 border-t border-border/50">
          {renderFooter()}
        </div>
      )}
    </div>
  );
};

export default TemplateCard;
