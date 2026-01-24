/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import * as React from 'react';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import { cn } from '~/utils/helpers';

const baseStyles =
  "z-50 overflow-hidden rounded-md shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2";

const variantStyles: Record<string, string> = {
  default:
    "bg-white text-gray-900 border border-gray-200 dark:bg-gray-800 dark:text-gray-50 dark:border-gray-700",
  dark: "bg-gray-900 text-gray-50 border border-gray-800",
  primary: "bg-blue-600 text-white border border-blue-600",
  danger: "bg-red-600 text-white border border-red-600",
  light: "bg-gray-100 text-gray-900 border border-gray-200",
};

const sizeStyles: Record<string, string> = {
  sm: "px-2 py-1 text-xs",
  md: "px-3 py-1.5 text-sm",
  lg: "px-4 py-2 text-base",
};

// --- Types ---
// 1. Extract the original props from Radix Content
type PrimitiveTooltipContentProps = React.ComponentPropsWithoutRef<
  typeof TooltipPrimitive.Content
>;

// 2. Omit 'title' from the original props to avoid type conflict with our custom 'title' prop
export interface TooltipMiniProps
  extends Omit<PrimitiveTooltipContentProps, "title"> {
  children: React.ReactNode;
  content?: string;
  title?: string | React.ReactNode; // Redefine title to accept ReactNode (not just string)
  className?: string;
  triggerClassName?: string;
  showArrow?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  align?: "start" | "center" | "end";
  alignOffset?: number;
  delayDuration?: number;
  disableHoverableContent?: boolean;
  variant?: "default" | "dark" | "primary" | "danger" | "light";
  size?: "sm" | "md" | "lg";
}

// --- Component ---

export const TooltipMini = React.forwardRef<
  React.ComponentRef<typeof TooltipPrimitive.Content>,
  TooltipMiniProps
>((props, ref) => {
  const {
    children,
    content,
    title,
    className,
    triggerClassName,
    variant = "default",
    size = "md",
    showArrow = true,
    open,
    defaultOpen,
    onOpenChange,
    side = "top",
    align = "center",
    sideOffset = 4,
    alignOffset = 0,
    delayDuration = 200,
    disableHoverableContent = false,
    ...restProps // These are the remaining Radix props (without 'title', 'content', etc.)
  } = props;

  // Use 'content' if provided, otherwise fall back to 'title'
  const tooltipContent = content !== undefined ? content : title;

  const getArrowClass = () => {
    switch (variant) {
      case "dark":
        return "fill-gray-900 text-gray-900";
      case "primary":
        return "fill-blue-600 text-blue-600";
      case "danger":
        return "fill-red-600 text-red-600";
      case "light":
        return "fill-gray-100 text-gray-100";
      case "default":
      default:
        return "fill-white dark:fill-gray-800 text-white dark:text-gray-800";
    }
  };

  const renderContent = () => {
    if (tooltipContent === null || tooltipContent === undefined) return null;

    // Changed font-medium to font-normal as requested
    return typeof tooltipContent === "string" ? (
      <p className="font-normal leading-none">{tooltipContent}</p>
    ) : (
      tooltipContent
    );
  };

  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        delayDuration={delayDuration}
        disableHoverableContent={disableHoverableContent}
      >
        <TooltipPrimitive.Trigger asChild className={triggerClassName}>
          {children}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            ref={ref}
            side={side}
            align={align}
            sideOffset={sideOffset}
            alignOffset={alignOffset}
            className={cn(
              baseStyles,
              variantStyles[variant],
              sizeStyles[size],
              className
            )}
            {...restProps} // Spread the remaining props (safe, because we extracted 'title' above)
          >
            {renderContent()}
            {showArrow && (
              <TooltipPrimitive.Arrow
                className={getArrowClass()}
                width={10}
                height={5}
              />
            )}
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
});

TooltipMini.displayName = "TooltipMini";

export default TooltipMini;
