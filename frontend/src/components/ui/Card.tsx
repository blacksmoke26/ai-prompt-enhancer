import React from 'react';
import { cn } from '../../utils/helpers';

/**
 * Base card component with default styling.
 * @example
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Card Title</CardTitle>
 *     <CardDescription>Card Description</CardDescription>
 *   </CardHeader>
 *   <CardContent>Card Content</CardContent>
 * </Card>
 * @developer
 * Uses cn utility for className merging and spreads all div attributes.
 */
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        'rounded-lg border bg-card text-card-foreground shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * Container for card header elements with padding and spacing.
 * @example
 * <CardHeader>
 *   <CardTitle>Header Title</CardTitle>
 *   <CardDescription>Header Description</CardDescription>
 * </CardHeader>
 * @developer
 * Provides consistent spacing for header content and accepts all div props.
 */
export const CardHeader: React.FC<CardProps> = ({ className, children, ...props }) => {
  return (
    <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props}>
      {children}
    </div>
  );
};

/**
 * Primary title heading for cards with large font size.
 * @example
 * <CardTitle>Card Title</CardTitle>
 * @developer
 * Renders as h3 with semibold weight and tight letter spacing.
 */
export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ className, children, ...props }) => {
  return (
    <h3 className={cn('text-2xl font-semibold leading-none tracking-tight', className)} {...props}>
      {children}
    </h3>
  );
};

/**
 * Secondary text description with muted color for cards.
 * @example
 * <CardDescription>Supporting description text</CardDescription>
 * @developer
 * Renders as paragraph with small text and muted foreground color.
 */
export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ className, children, ...props }) => {
  return (
    <p className={cn('text-sm text-muted-foreground', className)} {...props}>
      {children}
    </p>
  );
};

/**
 * Main content area for cards with top padding removed.
 * @example
 * <CardContent>Primary card content goes here</CardContent>
 * @developer
 * Provides padding on sides and bottom, no top padding to align with header.
 */
export const CardContent: React.FC<CardProps> = ({ className, children, ...props }) => {
  return (
    <div className={cn('p-6 pt-0', className)} {...props}>
      {children}
    </div>
  );
};

/**
 * Footer section for cards with horizontal item layout.
 * @example
 * <CardFooter>
 *   <Button>Action</Button>
 *   <Button variant="outline">Cancel</Button>
 * </CardFooter>
 * @developer
 * Uses flexbox for horizontal alignment and matches content padding.
 */
export const CardFooter: React.FC<CardProps> = ({ className, children, ...props }) => {
  return (
    <div className={cn('flex items-center p-6 pt-0', className)} {...props}>
      {children}
    </div>
  );
};
