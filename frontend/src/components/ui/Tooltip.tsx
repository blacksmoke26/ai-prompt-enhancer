/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import * as React from 'react';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import { cn } from '~/utils/helpers';

/**
 * Provides context for tooltip components.
 * @example
 * <TooltipProvider>
 *   <Tooltip>...</Tooltip>
 * </TooltipProvider>
 * @developer Must wrap your app with this provider for tooltips to work.
 */
const TooltipProvider = TooltipPrimitive.Provider;

/**
 * Root component for creating tooltips.
 * @example
 * <Tooltip>
 *   <TooltipTrigger>Hover me</TooltipTrigger>
 *   <TooltipContent>Tooltip content</TooltipContent>
 * </Tooltip>
 * @developer Combines trigger and content to create a tooltip.
 */
const Tooltip = TooltipPrimitive.Root;

/**
 * Element that triggers the tooltip to appear.
 * @example
 * <TooltipTrigger>
 *   <button>Hover me</button>
 * </TooltipTrigger>
 * @developer Should wrap the element that will trigger the tooltip.
 */
const TooltipTrigger = TooltipPrimitive.Trigger;

/**
 * The content that appears inside the tooltip.
 * @example
 * <TooltipContent sideOffset={8}>
 *   This is the tooltip content
 * </TooltipContent>
 * @developer Automatically positioned relative to the trigger element.
 */
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      'z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      className
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
