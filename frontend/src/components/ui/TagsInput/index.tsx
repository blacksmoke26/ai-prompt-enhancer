/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useLayoutEffect,
  useCallback,
  forwardRef,
  HTMLAttributes,
  ReactNode,
} from 'react';

export type TagsInputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type TagsInputRadius = 'none' | 'sm' | 'md' | 'lg' | 'full';
export type TagsInputVariant = 'outline' | 'filled' | 'ghost' | 'plain';

export interface TagsInputProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'size'> {
  value: string[];
  onChange: (tags: string[]) => void;
  suggestions?: string[];
  placeholder?: string;
  size?: TagsInputSize;
  variant?: TagsInputVariant;
  radius?: TagsInputRadius;
  maxItems?: number;
  maxLength?: number;
  allowDuplicates?: boolean;
  allowEdit?: boolean;
  disabled?: boolean;
  loading?: boolean;
  required?: boolean;
  clearOnBlur?: boolean;
  autoFocus?: boolean;
  full?: boolean;
  id?: string;
  name?: string;
  label?: string;
  description?: string;
  helperText?: string;
  error?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  onValidate?: (tag: string) => boolean;
  onAddTag?: (tag: string) => void;
  onRemoveTag?: (tag: string, index: number) => void;
}

const Icon = ({
                path,
                className,
                size = 16,
              }: {
  path: ReactNode;
  className?: string;
  size?: number;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {path}
  </svg>
);

const XIcon = (props: any) => (
  <Icon
    {...props}
    path={
      <>
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </>
    }
  />
);
const HashIcon = (props: any) => (
  <Icon
    {...props}
    path={
      <>
        <line x1="4" x2="20" y1="9" y2="9" />
        <line x1="4" x2="20" y1="15" y2="15" />
        <line x1="10" x2="8" y1="3" y2="21" />
        <line x1="16" x2="14" y1="3" y2="21" />
      </>
    }
  />
);
const AlertCircleIcon = (props: any) => (
  <Icon
    {...props}
    path={
      <>
        <circle cx="12" cy="12" r="10" />
        <line x1="12" x2="12" y1="8" y2="12" />
        <line x1="12" x2="12.01" y1="16" y2="16" />
      </>
    }
  />
);
const InfoIcon = (props: any) => (
  <Icon
    {...props}
    path={
      <>
        <circle cx="12" cy="12" r="10" />
        <line x1="12" x2="12" y1="16" y2="12" />
        <line x1="12" x2="12.01" y1="8" y2="8" />
      </>
    }
  />
);
const LoaderIcon = (props: any) => (
  <Icon
    {...props}
    className={`animate-spin ${props.className || ''}`}
    path={
      <>
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </>
    }
  />
);
const TrashIcon = (props: any) => (
  <Icon
    {...props}
    path={
      <>
        <path d="M3 6h18" />
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        <line x1="10" x2="10" y1="11" y2="17" />
        <line x1="14" x2="14" y1="11" y2="17" />
      </>
    }
  />
);

// Helper for diacritics insensitive match
const normalizeText = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

const highlightMatch = (text: string, query: string) => {
  if (!query) return text;
  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escapedQuery})`, 'gi'));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <strong key={i} className="text-primary font-semibold">
        {part}
      </strong>
    ) : (
      part
    ),
  );
};

interface TagItemProps {
  tag: string;
  index: number;
  size: TagsInputSize;
  radius: TagsInputRadius;
  variant: TagsInputVariant;
  onRemove: (index: number) => void;
  onUpdate: (index: number, newTag: string) => void;
  allowEdit: boolean;
  disabled: boolean;
}

const TagItem: React.FC<TagItemProps> = (props) => {
  const {
    tag,
    index,
    size,
    radius,
    variant,
    onRemove,
    onUpdate,
    allowEdit,
    disabled,
  } = props;
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(tag);
  const inputRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  const save = () => {
    const trimmed = value.trim();
    if (trimmed && trimmed !== tag) {
      onUpdate(index, trimmed);
    }
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      save();
    } else if (e.key === 'Escape') {
      setValue(tag);
      setEditing(false);
    }
  };

  if (editing && !disabled) {
    return (
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={save}
        onKeyDown={handleKeyDown}
        className="h-6 w-24 text-sm px-1.5 rounded bg-background border border-input focus:ring-1 focus:ring-ring focus:outline-none"
      />
    );
  }

  const sizeStyles: Record<TagsInputSize, string> = {
    xs: 'h-5 px-1 text-[10px]',
    sm: 'h-6 px-1.5 text-[11px]',
    md: 'h-7 px-2 text-xs',
    lg: 'h-8 px-2.5 text-sm',
    xl: 'h-9 px-3 text-base',
  };

  const radiusStyles: Record<TagsInputRadius, string> = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  const variantStyles: Record<TagsInputVariant, string> = {
    outline:
      'border border-border bg-background hover:border-primary/50 hover:text-primary text-foreground',
    filled:
      'bg-primary text-primary-foreground hover:bg-primary/90 border border-primary shadow-sm',
    ghost:
      'bg-transparent text-foreground hover:bg-accent border border-transparent',
    plain: 'bg-transparent text-muted-foreground border border-transparent',
  };

  const cl = `inline-flex items-center gap-1.5 transition-all duration-200 animate-fade-slide select-none group/tag ${sizeStyles[size]} ${radiusStyles[radius]} ${variantStyles[variant]}`;

  return (
    <span
      className={cl}
      onDoubleClick={() => allowEdit && setEditing(true)}
      title={allowEdit ? 'Double-click to edit' : ''}
    >
      <span className="max-w-[160px] truncate">{tag}</span>
      {!disabled && (
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="p-0.5 rounded-full opacity-60 group-hover/tag:opacity-100 hover:bg-black/5 dark:hover:bg-white/10 focus:outline-none focus:ring-1 focus:ring-ring transition-all"
          aria-label={`Remove ${tag}`}
        >
          <XIcon size={10} strokeWidth={2.5} />
        </button>
      )}
    </span>
  );
};

const TagsInput = forwardRef<HTMLDivElement, TagsInputProps>(
  (
    {
      value = [],
      onChange,
      suggestions = [],
      placeholder = 'Add tag...',
      size = 'md',
      variant = 'outline',
      radius = 'md',
      maxItems = 10,
      maxLength,
      allowDuplicates = false,
      allowEdit = true,
      disabled = false,
      loading = false,
      required = false,
      clearOnBlur = true,
      autoFocus = false,
      full = false,
      id,
      name,
      label,
      description,
      helperText,
      error,
      icon,
      iconPosition = 'left',
      onValidate,
      onAddTag,
      onRemoveTag,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const [inputValue, setInputValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [internalError, setInternalError] = useState<string | null>(null);

    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
      if (autoFocus && !disabled) {
        inputRef.current?.focus();
      }
    }, [autoFocus, disabled]);

    // Auto-scroll to bottom when tags change
    useEffect(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }
    }, [value]);

    const effectiveError = error || internalError;

    const filteredSuggestions = useMemo(() => {
      if (!inputValue) return [];
      const q = normalizeText(inputValue);

      return suggestions
        .filter((s) => {
          if (typeof s !== 'string') return false;
          const normalizedS = normalizeText(s);
          const matches = normalizedS.includes(q);
          const notDuplicate = allowDuplicates ? true : !value.includes(s);
          return matches && notDuplicate;
        })
        .sort((a, b) => {
          const aNorm = normalizeText(a);
          const bNorm = normalizeText(b);
          const aStarts = aNorm.startsWith(q);
          const bStarts = bNorm.startsWith(q);

          if (aStarts && !bStarts) return -1;
          if (!aStarts && bStarts) return 1;
          return 0;
        });
    }, [inputValue, suggestions, value, allowDuplicates]);

    const addTag = useCallback(
      (text: string) => {
        const tag = text.trim();
        if (!tag) return;
        if (onValidate && !onValidate(tag)) {
          setInternalError('Invalid tag');
          return;
        }
        if (maxItems != null && value.length >= maxItems) {
          setInternalError(`Maximum ${maxItems} tags`);
          return;
        }
        if (!allowDuplicates && value.includes(tag)) {
          setInternalError('Duplicate tag');
          return;
        }
        if (maxLength != null && tag.length > maxLength) {
          setInternalError(`Tag too long (max ${maxLength} characters)`);
          return;
        }
        onChange([...value, tag]);
        setInputValue('');
        setIsOpen(false);
        setInternalError(null);
        onAddTag?.(tag);
      },
      [value, onChange, maxItems, maxLength, allowDuplicates, onValidate, onAddTag],
    );

    const removeTag = useCallback(
      (index: number) => {
        onChange(value.filter((_, i) => i !== index));
        setInternalError(null);
        onRemoveTag?.(value[index], index);
      },
      [value, onChange, onRemoveTag],
    );

    const updateTag = useCallback(
      (index: number, newTag: string) => {
        const updated = [...value];
        updated[index] = newTag;
        onChange(updated);
      },
      [value, onChange],
    );

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled || loading) return;
      if (isOpen && filteredSuggestions.length > 0) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setHighlightedIndex(
            (prev) => (prev + 1) % filteredSuggestions.length,
          );
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setHighlightedIndex(
            (prev) =>
              (prev - 1 + filteredSuggestions.length) %
              filteredSuggestions.length,
          );
        } else if (e.key === 'Enter') {
          e.preventDefault();
          if (highlightedIndex >= 0) {
            addTag(filteredSuggestions[highlightedIndex]);
          } else {
            addTag(inputValue);
          }
        } else if (e.key === 'Tab') {
          if (highlightedIndex >= 0) {
            e.preventDefault();
            addTag(filteredSuggestions[highlightedIndex]);
          } else {
            setIsOpen(false);
          }
        } else if (e.key === 'Escape') {
          setIsOpen(false);
        }
      } else {
        if (e.key === 'Enter' || e.key === ',') {
          e.preventDefault();
          addTag(inputValue);
        } else if (
          e.key === 'Backspace' &&
          inputValue === '' &&
          value.length > 0
        ) {
          removeTag(value.length - 1);
        }
      }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      if (disabled || loading) return;
      e.preventDefault();
      const paste =
        (e.clipboardData || (window as any).clipboardData).getData('text') || '';
      const tags = paste
        .split(/[\n,]+/)
        .map((t) => t.trim())
        .filter(Boolean);
      if (!tags.length) return;
      let next = [...value];
      for (const t of tags) {
        if (onValidate && !onValidate(t)) continue;
        if (!allowDuplicates && next.includes(t)) continue;
        if (maxItems != null && next.length >= maxItems) break;
        if (maxLength != null && t.length > maxLength) continue;
        next.push(t);
      }
      onChange(next);
      setInternalError(null);
    };

    useEffect(() => {
      if (highlightedIndex >= 0 && dropdownRef.current) {
        const item = dropdownRef.current.children[highlightedIndex];
        item?.scrollIntoView({ block: 'nearest' });
      }
    }, [highlightedIndex]);

    useEffect(() => {
      const onClickOutside = (e: MouseEvent) => {
        if (!containerRef.current?.contains(e.target as Node)) {
          setIsOpen(false);
          if (clearOnBlur && inputValue) {
            setInputValue('');
          }
        }
      };
      document.addEventListener('mousedown', onClickOutside);
      return () => document.removeEventListener('mousedown', onClickOutside);
    }, [clearOnBlur, inputValue]);

    // Styles
    const sizeStyles: Record<TagsInputSize, string> = {
      xs: 'min-h-7 text-xs',
      sm: 'min-h-8 text-xs',
      md: 'min-h-10 text-sm',
      lg: 'min-h-12 text-sm',
      xl: 'min-h-14 text-base',
    };

    // Padding moved here
    const paddingStyles: Record<TagsInputSize, string> = {
      xs: 'px-2 py-1.5',
      sm: 'px-2.5 py-2',
      md: 'px-3 py-2.5',
      lg: 'px-4 py-3',
      xl: 'px-5 py-3.5',
    };

    const radiusStyles: Record<TagsInputRadius, string> = {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      full: 'rounded-xl',
    };

    const variantStyles: Record<TagsInputVariant, string> = {
      outline:
        'bg-background border border-border focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/20 shadow-sm',
      filled:
        'bg-secondary/30 border border-transparent focus-within:bg-secondary/50 focus-within:ring-2 focus-within:ring-primary/10',
      ghost:
        'bg-transparent border border-transparent focus-within:bg-accent/40 focus-within:ring-2 focus-within:ring-primary/10',
      plain:
        'bg-transparent border-0 border-b border-border focus-within:border-primary focus-within:ring-0 px-0 py-0', // Remove padding for plain
    };

    const wrapperCl = `w-full flex flex-col gap-1.5 ${
      full ? '' : 'max-w-md'
    } ${className}`;

    // Outer container: Has padding now
    const inputBoxCl = `relative flex items-start gap-2 w-full transition-all duration-200 ${
      sizeStyles[size]
    } ${
      variantStyles[variant]
    } ${
      radiusStyles[radius]
    } ${
      effectiveError
        ? 'border-destructive focus-within:border-destructive focus-within:ring-destructive/20'
        : ''
    } ${disabled ? 'opacity-60 pointer-events-none' : ''}`;

    // Inner scrollable container: No padding here, relies on parent padding
    const contentCl = `flex-1 flex flex-wrap items-center w-full pt-1 max-h-48 overflow-y-auto custom-scroll`;

    return (
      <div className={wrapperCl} ref={containerRef} {...rest}>
        {/* Label */}
        {(label || required) && (
          <div className="flex items-baseline justify-between gap-2">
            {label ? (
              <label
                htmlFor={id}
                className="text-sm font-medium text-foreground leading-tight"
              >
                {label}{' '}
                {required && <span className="text-destructive ml-0.5">*</span>}
              </label>
            ) : (
              required && (
                <span className="text-[11px] text-muted-foreground ml-auto">
                  Required
                </span>
              )
            )}
          </div>
        )}

        {/* Input box */}
        <div className={inputBoxCl} ref={ref}>
          {/* Left icon */}
          {icon && iconPosition === 'left' && (
            <span className="text-muted-foreground flex items-center shrink-0 py-2 mt-1 pl-3">
              {icon}
            </span>
          )}

          {/* Scrollable Content Area */}
          <div className={contentCl} ref={scrollRef}>
            {/* Tags */}
            <div className="flex flex-wrap items-center gap-1.5 mt-[1px] ml-1">
              {value.map((t, i) => (
                <TagItem
                  key={`${t}-${i}`}
                  tag={t}
                  index={i}
                  size={size}
                  radius={radius}
                  variant={variant}
                  onRemove={removeTag}
                  onUpdate={updateTag}
                  allowEdit={allowEdit}
                  disabled={disabled || loading}
                />
              ))}
            </div>

            {/* Text input */}
            <input
              ref={inputRef}
              id={id}
              name={name}
              type="text"
              className="flex-1 mt-[6px] min-w-[90px] bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground disabled:opacity-50 py-0"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setHighlightedIndex(-1);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              placeholder={value.length === 0 && !loading ? placeholder : ''}
              disabled={disabled || loading}
            />
          </div>

          {/* Right side: loading spinner / counter / clear */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground shrink-0 py-2 pr-3 pt-[10px]">
            {loading ? (
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <LoaderIcon size={14} />
                <span>Loading…</span>
              </span>
            ) : (
              <>
                {maxLength != null && inputValue && (
                  <span
                    className={
                      inputValue.length > maxLength
                        ? 'text-destructive font-medium'
                        : ''
                    }
                  >
                    {inputValue.length}/{maxLength}
                  </span>
                )}
                {maxItems != null && (
                  <span
                    className={
                      value.length >= maxItems
                        ? 'text-destructive font-medium'
                        : ''
                    }
                  >
                    {value.length}/{maxItems}
                  </span>
                )}
                {value.length > 0 && (
                  <button
                    type="button"
                    onClick={() => onChange([])}
                    className="p-0.5 rounded hover:bg-black/5 dark:hover:bg-white/10 hover:text-destructive transition-colors"
                    title="Clear all"
                  >
                    <TrashIcon size={14} />
                  </button>
                )}
              </>
            )}

            {/* Right icon */}
            {!loading && icon && iconPosition === 'right' && (
              <span className="text-muted-foreground flex items-center">
                {icon}
              </span>
            )}
          </div>

          {/* Autocomplete dropdown - Fixed: Anchored to padded parent, flush with content */}
          {isOpen && filteredSuggestions.length > 0 && !disabled && !loading && (
            <div
              ref={dropdownRef}
              className="absolute top-full left-0 w-full z-50 mt-0.5 bg-popover border border-border rounded-lg shadow-lg overflow-hidden max-h-56 overflow-y-auto custom-scroll animate-fade-slide"
            >
              {filteredSuggestions.map((s, idx) => (
                <div
                  key={s}
                  onClick={() => addTag(s)}
                  onMouseEnter={() => setHighlightedIndex(idx)}
                  className={`px-3 py-2 text-sm flex items-center justify-between cursor-pointer ${
                    idx === highlightedIndex
                      ? 'bg-accent text-accent-foreground'
                      : 'text-popover-foreground hover:bg-muted/50'
                  }`}
                >
                  <span className="flex items-center">
                    <HashIcon size={14} className="opacity-40 mr-1" />
                    {highlightMatch(s, inputValue)}
                  </span>
                  {idx === highlightedIndex && (
                    <kbd className="text-[10px] px-1 rounded bg-muted border border-border">
                      ↵
                    </kbd>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Description */}
        {description && (
          <p className="text-xs text-muted-foreground leading-snug">
            {description}
          </p>
        )}

        {/* Helper text / error */}
        <div className="flex items-start gap-1.5 min-h-[1.25rem]">
          {effectiveError ? (
            <span className="inline-flex items-center gap-1 text-xs text-destructive">
              <AlertCircleIcon size={12} />
              <span>{effectiveError}</span>
            </span>
          ) : helperText ? (
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <InfoIcon size={12} />
              <span>{helperText}</span>
            </span>
          ) : null}
        </div>
      </div>
    );
  },
);

TagsInput.displayName = 'TagsInput';

export default TagsInput;
