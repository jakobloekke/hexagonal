import React from 'react';
import { cn } from '../../utils/cn';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white';
  className?: string;
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
};

const colorClasses = {
  primary: 'text-blue-600',
  white: 'text-white',
};

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  color = 'primary',
  className,
}) => (
  <div
    className={cn(
      'animate-spin rounded-full border-2 border-current border-t-transparent',
      sizeClasses[size],
      colorClasses[color],
      className
    )}
    role="status"
  >
    <span className="sr-only">Loading...</span>
  </div>
);

Spinner.displayName = 'Spinner';

// Skeleton
export interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  circle?: boolean;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '1rem',
  circle = false,
  className,
}) => (
  <div
    className={cn(
      'bg-gray-200 animate-pulse',
      circle && 'rounded-full',
      !circle && 'rounded',
      className
    )}
    style={{ width, height }}
  />
);

Skeleton.displayName = 'Skeleton';

