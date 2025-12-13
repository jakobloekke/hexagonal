import React, { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export interface DividerProps extends HTMLAttributes<HTMLHRElement | HTMLDivElement> {
  /** Orientation of the divider */
  orientation?: 'horizontal' | 'vertical';
  /** Label to display in the center of the divider */
  label?: React.ReactNode;
  /** Style variant */
  variant?: 'solid' | 'dashed' | 'dotted';
  /** Size of the divider */
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'h-0.5',
  md: 'h-1',
  lg: 'h-1.5',
};

const variantClasses = {
  solid: 'border-solid',
  dashed: 'border-dashed',
  dotted: 'border-dotted',
};

/**
 * Divider component for visual separation of content sections.
 * 
 * @example
 * <Divider variant="solid" />
 * <Divider label="Or" />
 * <Divider orientation="vertical" />
 */
export const Divider = React.forwardRef<HTMLHRElement | HTMLDivElement, DividerProps>(
  (
    {
      orientation = 'horizontal',
      label,
      variant = 'solid',
      size = 'md',
      className,
      ...props
    },
    ref
  ) => {
    const isVertical = orientation === 'vertical';

    if (isVertical) {
      return (
        <div
          ref={ref as React.ForwardedRef<HTMLDivElement>}
          className={cn(
            'border-l border-gray-300',
            variantClasses[variant],
            'h-8',
            className
          )}
          {...(props as React.HTMLAttributes<HTMLDivElement>)}
        />
      );
    }

    if (label) {
      return (
        <div
          ref={ref as React.ForwardedRef<HTMLDivElement>}
          className={cn('flex items-center gap-4', className)}
          {...(props as React.HTMLAttributes<HTMLDivElement>)}
        >
          <hr className={cn('flex-1 border-0 border-t border-gray-300', variantClasses[variant])} />
          <span className="text-sm text-gray-600 whitespace-nowrap">{label}</span>
          <hr className={cn('flex-1 border-0 border-t border-gray-300', variantClasses[variant])} />
        </div>
      );
    }

    return (
      <hr
        ref={ref as React.ForwardedRef<HTMLHRElement>}
        className={cn(
          'border-0 border-t border-gray-300',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...(props as React.HTMLAttributes<HTMLHRElement>)}
      />
    );
  }
);

Divider.displayName = 'Divider';

