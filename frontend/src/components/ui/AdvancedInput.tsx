/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useEffect, useRef, useState} from 'react';
import {
  AlertCircle,
  Calendar,
  Check,
  Copy,
  CreditCard,
  DollarSign,
  Eye,
  EyeOff,
  Hash,
  Loader2,
  type LucideProps,
  Phone,
  X,
} from 'lucide-react';

// utils
import {cn} from '~/utils/helpers';

/**
 * Defines the size variants for input components.
 * @example
 * <AdvancedInput size="lg" label="Large Input" />
 */
export type InputSize = 'sm' | 'md' | 'lg';

/**
 * Defines the visual variant styles for input components.
 * @example
 * <AdvancedInput variant="filled" label="Filled Input" />
 */
export type InputVariant = 'outline' | 'filled' | 'ghost' | 'otp';

/**
 * Defines predefined input format presets for formatting and validation.
 * @example
 * <AdvancedInput format="currency" label="Currency Input" />
 */
export type FormatPreset = 'phone' | 'credit-card' | 'ssn' | 'currency' | 'date' | 'none';

/**
 * Comprehensive props interface for an advanced input component, extending standard HTML input attributes
 * with additional UI, formatting, and behavior controls.
 * @typedef {Object} AdvancedInputProps
 * @example
 * <AdvancedInput
 *   label="Email"
 *   format="email"
 *   variant="filled"
 *   defaultValue="user@example.com"
 *   onValueChange={(value) => console.log('Value changed:', value)}
 * />
 */
export interface AdvancedInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'defaultValue'> {
  /**
   * Label text for the input field
   */
  label?: string;

  /**
   * Error message to display below the input
   */
  error?: string;

  /**
   * Helper text for additional guidance or examples
   */
  helperText?: string;

  /**
   * Input size variant
   * @default 'md'
   */
  size?: InputSize;

  /**
   * Visual variant of the input (outline, filled, ghost, etc.)
   * @default 'outline'
   */
  variant?: InputVariant;

  /**
   * Border radius variant
   * @default 'md'
   */
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';

  /**
   * Icon to render on the left side of the input
   */
  leftIcon?: React.ReactNode;

  /**
   * Icon to render on the right side of the input
   */
  rightIcon?: React.ReactNode;

  /**
   * Predefined input format (e.g., phone, date)
   * @default 'none'
   */
  format?: FormatPreset;

  /**
   * Regular expression to validate input (optional)
   */
  inputRegex?: RegExp;

  /**
   * Function to format input value (e.g., add currency symbols)
   * @param value - Input value
   * @returns Formatted string
   */
  formatter?(value: string): string;

  /**
   * Enable masked input (e.g., for passwords)
   * @default false
   */
  masked?: boolean;

  /**
   * Character to use for masking (e.g., '*')
   * @default '*'
   */
  maskChar?: string;

  /**
   * Restrict input to numeric values only
   * @default false
   */
  allowNumericOnly?: boolean;

  /**
   * Enable clear button
   * @default false
   */
  allowClear?: boolean;

  /**
   * Enable copy button
   * @default false
   */
  allowCopy?: boolean;

  /**
   * Show character count
   * @default false
   */
  showCharCount?: boolean;

  /**
   * Show password toggle button
   * @default false
   */
  showPasswordToggle?: boolean;

  /**
   * Convert input to uppercase
   * @default false
   */
  uppercase?: boolean;

  /**
   * Convert input to lowercase
   * @default false
   */
  lowercase?: boolean;

  /**
   * Maximum allowed length of input
   */
  maxLength?: number;

  /**
   * Number of remaining characters before triggering warning color
   * @default 10
   */
  charsRemainingWarning?: number;

  /**
   * Enable shaking animation when limit is reached
   * @default false
   */
  shakeOnLimitReach?: boolean;

  /**
   * Loading state
   * @default false
   */
  loading?: boolean;

  /**
   * Success state
   * @default false
   */
  success?: boolean;

  /**
   * Disabled state
   * @default false
   */
  disabled?: boolean;

  /**
   * Debounce time in milliseconds for input changes
   * @default 300
   */
  debounceMs?: number;

  /**
   * Auto-select text on focus
   * @default false
   */
  autoSelectOnFocus?: boolean;

  /**
   * Callback for Enter key press
   */
  onEnterPress?(): void;

  /**
   * Callback for copy button click
   * @param value - Current input value
   */
  onCopyClick?(value: string): void;

  /**
   * Callback for clear button click
   */
  onClearClick?(): void;

  /**
   * Callback for value change
   * @param value - New input value
   */
  onValueChange?(value: string): void;

  /**
   * Default value for the input
   */
  defaultValue?: string;
}

// --- Format Preset Implementations ---

/**
 * A mapping of predefined format presets to their corresponding formatting functions.
 * Each function transforms the input value according to the format rules.
 * @example
 * formatParsers.none("123") // returns "123"
 */
const formatParsers: Record<FormatPreset, (val: string) => string> = {
  none: (val) => val,
  phone: (val) => {
    const digits = val.replace(/\D/g, '');
    const x = digits.match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    if (!x) return digits;
    return !x[2] ? x[1] : `(${x[1]}) ${x[2]}${x[3] ? `-${x[3]}` : ''}`;
  },
  'credit-card': (val) => {
    const v = val.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts: string[] = [];
    for (let i = 0, len = match.length; i < len; i += 4) parts.push(match.substring(i, i + 4));
    return parts.length ? parts.join(' ') : v;
  },
  ssn: (val) => {
    const v = val.replace(/\D/g, '').match(/(\d{0,3})(\d{0,2})(\d{0,4})/);
    if (!v) return val;
    return !v[2] ? v[1] : `${v[1]}-${v[2]}${v[3] ? `-${v[3]}` : ''}`;
  },
  currency: (val) => {
    const num = val.replace(/[^0-9.]/g, '');
    if (!num) return '';
    const parts = num.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return `$${parts.join('.')}`;
  },
  date: (val) => {
    const v = val.replace(/\D/g, '').match(/(\d{0,2})(\d{0,2})(\d{0,4})/);
    if (!v) return val;
    return !v[2] ? v[1] : `${v[1]}${v[3] ? `/${v[2]}${v[3] ? `/${v[3]}` : ''}` : `/${v[2]}`}`;
  },
};

/**
 * A mapping of input size variants to their corresponding CSS class strings.
 * Used to apply consistent sizing styles to input components.
 * @example
 * sizeStyles.sm // 'h-8 px-2 text-xs'
 */
const sizeStyles: Record<inputSize, string> = {
  sm: 'h-8 px-2 text-xs',
  md: 'h-10 px-3 py-2 text-sm',
  lg: 'h-12 px-4 py-3 text-base',
};

/**
 * A mapping of border radius variants to their corresponding CSS class strings.
 * Used to apply consistent border radius styles to input components.
 * @example
 * radiusStyles.full // 'rounded-full'
 */
const radiusStyles: Record<NonNullable<AdvancedInputProps['radius']>, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
};

/**
 * A mapping of input variant styles to their corresponding CSS class strings.
 * Used to apply consistent visual styles (outline, filled, ghost, etc.) to input components.
 * @example
 * variantStyles.otp // 'border-2 border-input text-center !tracking-[0.5em] font-mono bg-background'
 */
const variantStyles: Record<inputVariant, string> = {
  outline: 'border border-input bg-background',
  filled: 'border-2 border-transparent bg-muted focus:bg-background focus:border-input',
  ghost: 'border-0 bg-transparent focus:bg-muted/50',
  otp: 'border-2 border-input text-center !tracking-[0.5em] font-mono bg-background',
};

/**
 * A highly customizable input component that supports formatting, masking, and various visual styles.
 * It uses `React.forwardRef` to allow direct access to the underlying HTML input element.
 * @param props - The props for the input component.
 * @param ref - The ref to forward to the underlying input element.
 * @example
 * <AdvancedInput
 *   label="Username"
 *   variant="filled"
 *   format="none"
 *   onValueChange={(value) => console.log('Input value:', value)}
 * />
 */
export const AdvancedInput = React.forwardRef<HTMLInputElement, AdvancedInputProps>(
  (
    {
      className,
      type = 'text',
      label,
      error,
      helperText,
      size = 'md',
      variant = 'outline',
      radius = 'md',
      leftIcon,
      rightIcon,
      format = 'none',
      inputRegex,
      formatter,
      masked = false,
      maskChar = '•',
      allowNumericOnly = false,
      allowClear = true,
      allowCopy = false,
      showCharCount = false,
      showPasswordToggle: forcePasswordToggle,
      uppercase = false,
      lowercase = false,
      maxLength,
      charsRemainingWarning = 10,
      shakeOnLimitReach = false,
      loading = false,
      success = false,
      disabled = false,
      debounceMs,
      autoSelectOnFocus = false,
      onEnterPress,
      onCopyClick,
      onClearClick,
      onValueChange,
      value: controlledValue,
      onChange,
      onFocus,
      onBlur,
      defaultValue = '',
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState<string>(String(defaultValue ?? ''));
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [copyFeedback, setCopyFeedback] = useState<'idle' | 'copied'>('idle');
    const [isShaking, setIsShaking] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const shakeTimeoutRef = useRef<NodeJS.Timeout>(undefined);
    const debounceTimeoutRef = useRef<NodeJS.Timeout>(undefined);

    const combinedRef = (node: HTMLInputElement | null) => {
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
      inputRef.current = node;
    };

    // --- Derived Logic ---

    const rawValue = controlledValue !== undefined ? controlledValue : internalValue;
    const currentValue = String(rawValue ?? '');

    const hasValue = currentValue.length > 0;
    const length = currentValue.length;

    // Calculate Remaining Chars
    // If no maxLength, we use Infinity for remaining
    const remaining = maxLength ? maxLength - length : Infinity;
    const isLimitReached = maxLength && length >= maxLength;
    const isNearLimit = maxLength && remaining > 0 && remaining <= charsRemainingWarning;

    // --- Icon Logic ---
    let AutoIcon: React.FC<LucideProps> | null = null;
    if (format === 'credit-card') AutoIcon = CreditCard;
    else if (format === 'currency') AutoIcon = DollarSign;
    else if (format === 'phone') AutoIcon = Phone;
    else if (format === 'date') AutoIcon = Calendar;
    else if (format === 'ssn') AutoIcon = Hash;

    // --- Effects ---

    useEffect(() => {
      if (debounceMs && onValueChange) {
        clearTimeout(debounceTimeoutRef.current);
        debounceTimeoutRef.current = setTimeout(() => onValueChange(currentValue), debounceMs);
      }
      return () => clearTimeout(debounceTimeoutRef.current);
    }, [currentValue, debounceMs, onValueChange]);

    useEffect(() => {
      if (shakeOnLimitReach && isLimitReached) {
        setIsShaking(true);
        clearTimeout(shakeTimeoutRef.current);
        shakeTimeoutRef.current = setTimeout(() => setIsShaking(false), 400);
      }
    }, [length, shakeOnLimitReach, isLimitReached]);

    // --- Handlers ---

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      if (autoSelectOnFocus) e.target.select();
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = e.target.value;

      if (inputRegex) {
        try {
          const invertedRegex = new RegExp(`[^${inputRegex.source.replace(/\\/g, '')}]`, 'g');
          newValue = newValue.replace(invertedRegex, '');
        } catch (err) {
          console.warn('Invalid Regex', err);
        }
      }

      if (allowNumericOnly && !inputRegex) {
        newValue = newValue.replace(/[^0-9]/g, '');
      }

      if (uppercase) newValue = newValue.toUpperCase();
      if (lowercase) newValue = newValue.toLowerCase();

      if (formatter) {
        newValue = formatter(newValue);
      } else if (format !== 'none') {
        newValue = formatParsers[format](newValue);
      }

      if (maxLength && newValue.length > maxLength) {
        newValue = newValue.slice(0, maxLength);
      }

      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }

      const syntheticEvent = {...e, target: {...e.target, value: newValue}};
      onChange?.(syntheticEvent as React.ChangeEvent<HTMLInputElement>);
    };

    const handleClear = () => {
      if (controlledValue === undefined) setInternalValue('');
      onClearClick?.();
      inputRef.current?.focus();
    };

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(currentValue);
        setCopyFeedback('copied');
        onCopyClick?.(currentValue);
        setTimeout(() => setCopyFeedback('idle'), 2000);
      } catch (err) {
        console.error('Failed to copy', err);
      }
    };

    // --- Visual Helpers ---

    const getBorderColor = () => {
      if (error) return 'border-destructive focus-visible:ring-destructive';
      if (success) return 'border-green-500 focus-visible:ring-green-500';
      if (isFocused) return 'border-primary ring-primary';
      return '';
    };

    const getCounterColor = () => {
      if (error) return 'text-destructive';
      // Limit Reached (Over limit or exactly at limit)
      if (isLimitReached) return 'text-destructive font-bold';
      // About to reach (Warning state)
      if (isNearLimit) return 'text-amber-500 font-semibold';
      return 'text-muted-foreground';
    };

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            className={cn(
              'text-sm font-medium leading-none transition-colors',
              isFocused ? 'text-primary' : 'text-muted-foreground',
              disabled && 'opacity-50 cursor-not-allowed',
            )}
          >
            {label}
          </label>
        )}

        <div
          className={cn(
            'relative group transition-all duration-200',
            isShaking && 'animate-shake',
          )}
        >
          {/* Left Icon */}
          {(leftIcon || AutoIcon) && variant !== 'otp' && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none z-10">
              {leftIcon || (AutoIcon && <AutoIcon className="h-4 w-4"/>)}
            </div>
          )}

          {/* Input */}
          <input
            ref={combinedRef}
            type={type === 'password' || masked ? (showPassword ? 'text' : 'password') : type}
            value={currentValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled || loading}
            maxLength={maxLength}
            inputMode={format === 'phone' || allowNumericOnly ? 'tel' : 'text'}
            className={cn(
              'flex w-full ring-offset-background transition-all duration-200',
              'file:border-0 file:bg-transparent file:text-sm file:font-medium',
              'placeholder:text-muted-foreground',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
              'disabled:cursor-not-allowed disabled:opacity-50',

              sizeStyles[size],
              radiusStyles[radius],
              variantStyles[variant],

              getBorderColor(),
              !error && !success && variant !== 'otp' && 'hover:border-primary/50',

              (leftIcon || AutoIcon) && variant !== 'otp' && (size === 'sm' ? 'pl-8' : 'pl-10'),
              (rightIcon || hasValue || loading || type === 'password' || masked) && variant !== 'otp' && (size === 'sm' ? 'pr-8' : 'pr-10'),

              variant === 'otp' && 'text-center tracking-widest uppercase',
              className,
            )}
            {...props}
          />

          {/* Right Actions */}
          <div className={cn(
            'absolute inset-y-0 right-0 flex items-center pr-2 gap-1 z-10',
            variant === 'otp' && 'hidden',
          )}>
            {loading && <Loader2 className="h-4 w-4 text-muted-foreground animate-spin"/>}
            {!loading && rightIcon && <div className="text-muted-foreground pointer-events-none">{rightIcon}</div>}

            {masked && (
              <button type="button" onClick={() => setShowPassword(p => !p)}
                      className="rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
                      tabIndex={-1}>
                {showPassword ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
              </button>
            )}

            {type === 'password' && !loading && (
              <button type="button" onClick={() => setShowPassword(p => !p)}
                      className="rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
                      tabIndex={-1}>
                {showPassword ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
              </button>
            )}

            {!loading && allowClear && hasValue && (
              <button type="button" onClick={handleClear}
                      className={cn('rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/50', 'opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all', hasValue && 'opacity-100')}
                      tabIndex={-1}>
                <X className="h-4 w-4"/>
              </button>
            )}

            {!loading && allowCopy && hasValue && (
              <button type="button" onClick={handleCopy}
                      className={cn('rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/50', 'opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all', hasValue && 'opacity-100')}
                      tabIndex={-1}>
                {copyFeedback === 'copied' ? <Check className="h-4 w-4 text-green-500"/> : <Copy className="h-4 w-4"/>}
              </button>
            )}
          </div>

          {/* Character Count: Remaining / Total */}
          {showCharCount && (maxLength || isFocused || isNearLimit) && (
            <div className="absolute bottom-1 right-2 pointer-events-none z-10">
              <span
                className={cn('text-[10px] px-1 rounded bg-background/80 backdrop-blur-sm transition-colors', getCounterColor())}>
                {maxLength ? `${remaining} / ${maxLength}` : length}
              </span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={cn(
          'flex items-start gap-1.5 px-1 transition-all duration-300 overflow-hidden',
          (error || helperText) ? 'h-5' : 'h-0 opacity-0',
        )}>
          {error && (
            <>
              <AlertCircle className="h-3.5 w-3.5 text-destructive shrink-0 mt-0.5"/>
              <p className="text-xs text-destructive font-medium animate-in fade-in slide-in-from-top-1">{error}</p>
            </>
          )}
          {!error && helperText && (
            <p className="text-xs text-muted-foreground animate-in fade-in slide-in-from-top-1">{helperText}</p>
          )}
          {!error && !helperText && success && <Check className="h-3.5 w-3.5 text-green-600 shrink-0 mt-0.5"/>}
        </div>
      </div>
    );
  },
);

AdvancedInput.displayName = 'AdvancedInput';
