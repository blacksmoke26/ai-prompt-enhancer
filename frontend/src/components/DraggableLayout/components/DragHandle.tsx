/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import { GripVertical } from 'lucide-react';
import { cn } from '~/utils/helpers';

/**
 * Props for the DragHandle component
 */
interface DragHandleProps {
  /** Additional class names */
  className?: string;
  /** Whether to show the handle */
  showHandle?: boolean;
}

/**
 * Drag handle component for rearranging dashboard panels
 */
const DragHandle: React.FC<DragHandleProps & React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  showHandle = true,
  ...props
}) => {
  if (!showHandle) return null;

  return (
    <div
      className={cn(
        'cursor-grab active:cursor-grabbing p-1 rounded-sm hover:bg-muted transition-colors',
        className
      )}
      {...props}
    >
      <GripVertical className="h-4 w-4 text-muted-foreground" />
    </div>
  );
};

export default DragHandle;