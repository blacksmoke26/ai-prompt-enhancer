import React from 'react';
import { cn } from '../../utils/helpers';

interface LoadingSpinnerProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ className, size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  return (
    <div className={cn('animate-spin rounded-full border-2 border-current border-t-transparent', sizeClasses[size], className)} />
  );
};

interface LoadingDotsProps {
  className?: string;
}

export const LoadingDots: React.FC<LoadingDotsProps> = ({ className }) => {
  return (
    <div className={cn('flex space-x-1', className)}>
      <div className="h-2 w-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
      <div className="h-2 w-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
      <div className="h-2 w-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
  );
};