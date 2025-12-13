import React, { ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
}

const variantClasses = {
  default: 'bg-gray-200 text-gray-800',
  primary: 'bg-blue-100 text-blue-800',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  error: 'bg-red-100 text-red-800',
};

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-1.5 text-base',
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
}) => (
  <span className={cn('inline-block rounded-full font-medium', variantClasses[variant], sizeClasses[size])}>
    {children}
  </span>
);

Badge.displayName = 'Badge';

// Tag (similar but typically outline style)
export interface TagProps extends BadgeProps {}

const tagVariantClasses = {
  default: 'bg-white text-gray-800 border border-gray-300',
  primary: 'bg-white text-blue-800 border border-blue-300',
  success: 'bg-white text-green-800 border border-green-300',
  warning: 'bg-white text-yellow-800 border border-yellow-300',
  error: 'bg-white text-red-800 border border-red-300',
};

export const Tag: React.FC<TagProps> = ({
  children,
  variant = 'default',
  size = 'md',
}) => (
  <span className={cn('inline-block rounded-full font-medium', tagVariantClasses[variant], sizeClasses[size])}>
    {children}
  </span>
);

Tag.displayName = 'Tag';

