/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useRef, useState} from 'react';
import {
  HelpCircle,
  Info,
  Loader2,
  X,
  Check,
  XCircle,
  RotateCcw,
  AlertTriangle,
} from 'lucide-react';
import * as RadPopover from '@radix-ui/react-popover';

// utils
import {cn} from '~/utils/helpers';

// ui components
import {TooltipMini} from '~/components/ui/Tooltip';
import {Button, ButtonVariant} from '~/components/ui/Button';

/**
 * Props for the advanced Popover component
 */
export interface PopoverProps {
  // --- Control ---
  /** Controlled open state */
  open?: boolean;

  /** Event when open state changes */
  onOpenChange?(open: boolean): void;

  /** Default open state for uncontrolled usage */
  defaultOpen?: boolean;

  // --- Trigger ---
  /** Custom trigger element */
  trigger?: React.ReactNode;
  /** Class name for the trigger wrapper */
  triggerClassName?: string;
  /** Hide the trigger entirely (useful for programmatic control) */
  hideTrigger?: boolean;
  /** Tooltip text for the default icon trigger */
  triggerTooltip?: string;
  /** Icon for the default trigger (Lucide component) */
  triggerIcon?: typeof HelpCircle;
  triggerIconSize?: number;
  /** Variant for the default trigger button */
  triggerVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'plain';

  // --- Content & Positioning ---
  /** Side where the popover appears */
  side?: 'top' | 'right' | 'bottom' | 'left';
  /** Alignment of the popover */
  align?: 'start' | 'center' | 'end';
  /** Distance from the trigger (px) */
  sideOffset?: number;
  /** Alignment offset (px) */
  alignOffset?: number;
  /** Width of the popover */
  width?: string | number;
  /** Max height of the popover content (enables scroll) */
  maxHeight?: string | number;
  /** If true, popover matches trigger width */
  alignTriggerWidth?: boolean;

  // --- Styling ---
  /** Variant theme */
  variant?: ButtonVariant | 'warning';
  /** Custom class names for the content container */
  contentClassName?: string;
  /** Whether to show the arrow */
  showArrow?: boolean;
  /** Border radius: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full' */
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Shadow intensity: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' */
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  /** Enable backdrop blur (glassmorphism) */
  backdrop?: boolean;
  /** Inset the content (useful for mobile layouts) */
  inset?: boolean;

  // --- Interaction ---
  /** Close popover when confirm action is successful */
  closeOnConfirm?: boolean;
  /** Allow closing by clicking outside */
  closeOnOutsideClick?: boolean;
  /** Allow closing via Escape key */
  closeOnEscape?: boolean;

  // --- Header ---
  /** Show the header section */
  showHeader?: boolean;
  /** Title text */
  title?: string;
  /** Description/Subtitle text */
  description?: string;
  /** Icon to display in the header (Lucide component) */
  headerIcon?: typeof HelpCircle;
  /** Show close button in header */
  showCloseButton?: boolean;
  /** Extra actions to render in the header (right side) */
  headerActions?: React.ReactNode;

  // --- Footer / Actions ---
  /** Show the footer section */
  showFooter?: boolean;
  /** Show confirm button */
  showConfirm?: boolean;
  /** Show cancel button */
  showCancel?: boolean;
  /** Show reset button */
  showReset?: boolean;

  /** Text for the confirm button */
  confirmText?: string;
  /** Text for the cancel button */
  cancelText?: string;
  /** Text for the reset button */
  resetText?: string;

  /** Icons for buttons (Lucide components) */
  confirmIcon?: typeof Check;
  cancelIcon?: typeof XCircle;
  resetIcon?: typeof RotateCcw;

  /** Loading state for the confirm action */
  loading?: boolean;
  /** Disable the confirm button */
  confirmDisabled?: boolean;

  // --- Callbacks ---
  /** Called when Confirm/Save is clicked */
  onConfirm?(): void | Promise<void>;

  /** Called when Cancel/Close is clicked */
  onCancel?(): void;

  /** Called when Reset is clicked */
  onReset?(): void;

  // --- Children ---
  children: React.ReactNode;
}

// Styling Maps
const radiusMap: Record<NonNullable<PopoverProps['radius']>, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
};

const shadowMap: Record<NonNullable<PopoverProps['shadow']>, string> = {
  none: 'shadow-none',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  '2xl': 'shadow-2xl',
};

/**
 * Advanced Popover Component with animations, async handling, and full customization.
 */
export const Popover: React.FC<PopoverProps> = (props) => {
  const {
    open: controlledOpen,
    onOpenChange,
    defaultOpen = false,
    trigger,
    triggerClassName,
    hideTrigger = false,
    triggerTooltip,
    triggerIcon,
    triggerVariant = 'plain',

    side = 'bottom',
    align = 'end',
    sideOffset = 4,
    alignOffset = 0,
    width = 'w-96',
    maxHeight,
    alignTriggerWidth = false,

    variant = 'default',
    contentClassName,
    showArrow = true,
    radius = 'lg',
    shadow = 'xl',
    backdrop = false,
    inset = false,

    closeOnConfirm = false,
    closeOnOutsideClick = true,
    closeOnEscape = true,

    showHeader = true,
    title = 'Details',
    description,
    headerIcon,
    showCloseButton = true,
    headerActions,

    showFooter = true,
    showConfirm = true,
    showCancel = true,
    showReset = false,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    resetText = 'Reset',
    confirmIcon,
    cancelIcon,
    resetIcon,
    loading = false,
    confirmDisabled = false,

    onConfirm,
    onCancel,
    onReset,
    children,
  } = props;

  // Local state for handling internal loading if not fully controlled
  const [isInternalLoading, setIsInternalLoading] = useState(false);

  // Determine if we are in a loading state
  const isSaving = loading || isInternalLoading;


  const popoverRef = useRef<HTMLButtonElement>(null);

  const close = () => popoverRef.current?.click();

  const handleConfirm = async () => {
    if (isSaving || confirmDisabled) return;

    // If onConfirm returns a promise, handle the loading state automatically
    if (onConfirm) {
      const result = onConfirm();
      if (result instanceof Promise) {
        setIsInternalLoading(true);
        try {
          await result;
          if (closeOnConfirm) {
            onOpenChange?.(false);
          }
          close();
        } finally {
          setIsInternalLoading(false);
        }
      } else {
        // Synchronous action
        if (closeOnConfirm) {
          onOpenChange?.(false);
        }
        close();
      }
    }
  };

  const handleCancel = () => {
    onCancel?.();
    onOpenChange?.(false);
    close();
  };

  // Determine icons based on variant or explicit props
  const DefaultHeaderIcon = variant === 'destructive' ? AlertTriangle : (variant === 'warning' ? HelpCircle : Info);
  const HeaderIconComponent = headerIcon || DefaultHeaderIcon;

  const TriggerIconComponent = triggerIcon || HeaderIconComponent;

  // Button Icon Mappings
  const ConfirmIcon = confirmIcon || Check;
  const CancelIcon = cancelIcon || XCircle;
  const ResetIcon = resetIcon || RotateCcw;

  // Variant colors
  const variantColors = {
    default: 'text-muted-foreground border-border',
    destructive: 'text-destructive border-destructive/50 bg-destructive/10',
    warning: 'text-warning border-warning/50 bg-warning/10',
    ghost: 'text-foreground border-transparent',
  };

  const buttonVariantMap = {
    default: 'default',
    destructive: 'destructive',
    warning: 'secondary', // Secondary or custom
    ghost: 'ghost',
  };

  return (
    <RadPopover.Root
      open={controlledOpen}
      onOpenChange={onOpenChange}
      defaultOpen={defaultOpen}
    >
      {!hideTrigger && (
        <RadPopover.Trigger ref={popoverRef} asChild className={cn('outline-none', triggerClassName)}>
          {trigger ? (
            trigger
          ) : (
            <Button
              variant={variant === 'destructive' ? 'destructive' : triggerVariant}
              size="icon"
              className="h-8 w-8"
            >
              <TooltipMini title={triggerTooltip || 'Open options'}>
                <TriggerIconComponent size={props?.triggerIconSize ?? 18}/>
              </TooltipMini>
            </Button>
          )}
        </RadPopover.Trigger>
      )}

      <RadPopover.Portal>
        <RadPopover.Content
          side={side}
          align={align}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
          className={cn(
            // Base layout & z-index
            'z-50 p-0 text-foreground',
            // Dynamic styling props
            radiusMap[radius],
            shadowMap[shadow],
            'border bg-background',
            backdrop && 'backdrop-blur-md bg-background/80',

            // Sizing
            alignTriggerWidth ? 'w-[var(--radix-popover-trigger-width)]' : width,
            maxHeight && `max-h-[${maxHeight}]`,

            // Variant borders
            variantColors[variant].split(' ')[1], // Extract border class if needed, simplified here

            // Animation Classes
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
            'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
            'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
            'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
            // Animation Origin
            'origin-[var(--radix-popover-content-transform-origin)]',
            // Variant overrides
            variant === 'destructive' && 'border-destructive/50',
            variant === 'warning' && 'border-warning/50',
            contentClassName,
          )}
          onPointerDownOutside={(event) => {
            if (!closeOnOutsideClick || isSaving) event.preventDefault();
          }}
          onEscapeKeyDown={(event) => {
            if (!closeOnEscape || isSaving) event.preventDefault();
          }}
        >
          <div className={cn(
            'flex flex-col gap-0',
            inset && 'h-full',
          )}>

            {/* --- Header --- */}
            {showHeader && (
              <div className={cn(
                'flex items-center justify-between border-b px-4 py-3 bg-muted/20',
                variant === 'destructive' ? 'border-destructive/20' : 'border-border',
              )}>
                <div className="flex items-center gap-3 overflow-hidden">
                  {headerIcon && <div className={cn(
                    'shrink-0 text-sm',
                    variant === 'destructive' ? 'text-destructive' :
                      variant === 'warning' ? 'text-warning' :
                        'text-muted-foreground',
                  )}>
                    <HeaderIconComponent className="h-5 w-5"/>
                  </div>}
                  <div className="flex flex-col min-w-0">
                    <h4
                      className={cn('text-sm font-semibold leading-none truncate', variant === 'destructive' ? 'text-destructive' : '')}>
                      {title}
                    </h4>
                    {description && (
                      <p className="mt-1 text-xs text-muted-foreground leading-snug truncate">
                        {description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {headerActions}
                  {showCloseButton && (
                    <RadPopover.Close asChild disabled={isSaving}>
                      <Button variant="ghost" className="h-7 w-7 p-0 text-muted-foreground hover:bg-muted">
                        <X className="h-3.5 w-3.5"/>
                        <span className="sr-only">Close</span>
                      </Button>
                    </RadPopover.Close>
                  )}
                </div>
              </div>
            )}

            {/* --- Body --- */}
            <div className={cn(
              'px-4 py-4',
              maxHeight ? 'overflow-y-auto custom-scrollbar' : '',
              !showHeader && !showFooter && 'p-0', // Remove padding if no header/footer for full bleed
            )}>
              {children}
            </div>

            {/* --- Footer --- */}
            {showFooter && (
              <div className={cn(
                'flex items-center justify-between gap-2 border-t px-4 py-3 bg-muted/30',
                variant === 'destructive' ? 'border-destructive/20' : 'border-border',
              )}>
                {/* Left Side: Reset or Custom Actions */}
                <div className="flex items-center gap-2">
                  {showReset && onReset && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-foreground"
                      onClick={onReset}
                      disabled={isSaving}
                    >
                      {ResetIcon && <ResetIcon className="mr-1.5 h-3.5 w-3.5"/>}
                      {resetText}
                    </Button>
                  )}
                </div>

                {/* Right Side: Cancel / Confirm */}
                <div className="flex items-center gap-2 ml-auto">
                  {showCancel && onCancel && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCancel}
                      disabled={isSaving}
                    >
                      {CancelIcon && <CancelIcon className="mr-1.5 h-3.5 w-3.5"/>}
                      {cancelText}
                    </Button>
                  )}

                  {showConfirm && onConfirm && (
                    <Button
                      variant={buttonVariantMap[variant]}
                      size="sm"
                      onClick={handleConfirm}
                      disabled={confirmDisabled || isSaving}
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                          Processing...
                        </>
                      ) : (
                        <>
                          {ConfirmIcon && <ConfirmIcon className="mr-1.5 h-3.5 w-3.5"/>}
                          {confirmText}
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* --- Arrow --- */}
          {showArrow && (
            <RadPopover.Arrow
              className={cn(
                'fill-popover stroke-border',
                backdrop && 'fill-background/80',
                variant === 'destructive' && 'fill-destructive/10 stroke-destructive/20',
              )}
              width={10}
              height={5}
            />
          )}
        </RadPopover.Content>
      </RadPopover.Portal>
    </RadPopover.Root>
  );
};

export default Popover;
