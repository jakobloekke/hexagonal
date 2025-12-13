import React, { ReactNode, useState } from 'react';
import { cn } from '../../utils/cn';
import { FOCUS_RING } from '../../utils/a11yClasses';
import { AnimatePresence, motion } from 'framer-motion';

export interface TooltipProps {
  /** Tooltip trigger content */
  children: ReactNode;
  /** Tooltip text content */
  content: ReactNode;
  /** Tooltip position */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /** Delay before showing tooltip (ms) */
  delayMs?: number;
  /** Trigger mode */
  trigger?: 'hover' | 'click' | 'focus';
}

/**
 * Tooltip component for displaying contextual information on hover/focus.
 * 
 * @example
 * <Tooltip content="Help text" placement="top">
 *   <Button>Hover me</Button>
 * </Tooltip>
 */
export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  placement = 'top',
  delayMs = 200,
  trigger = 'hover',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [delayTimeout, setDelayTimeout] = useState<NodeJS.Timeout | null>(null);

  const showTooltip = () => {
    const timeout = setTimeout(() => setIsVisible(true), delayMs);
    setDelayTimeout(timeout);
  };

  const hideTooltip = () => {
    if (delayTimeout) clearTimeout(delayTimeout);
    setIsVisible(false);
  };

  const placementClasses = {
    top: 'bottom-full mb-2 -translate-x-1/2 left-1/2',
    bottom: 'top-full mt-2 -translate-x-1/2 left-1/2',
    left: 'right-full mr-2 top-1/2 -translate-y-1/2',
    right: 'left-full ml-2 top-1/2 -translate-y-1/2',
  };

  const arrowClasses = {
    top: 'top-full mt-0.5 left-1/2 -translate-x-1/2 border-t-gray-900',
    bottom: 'bottom-full mb-0.5 left-1/2 -translate-x-1/2 border-b-gray-900',
    left: 'left-full ml-0.5 top-1/2 -translate-y-1/2 border-l-gray-900',
    right: 'right-full mr-0.5 top-1/2 -translate-y-1/2 border-r-gray-900',
  };

  const triggerProps =
    trigger === 'hover'
      ? { onMouseEnter: showTooltip, onMouseLeave: hideTooltip }
      : trigger === 'click'
        ? { onClick: () => (isVisible ? hideTooltip() : showTooltip()) }
        : { onFocus: showTooltip, onBlur: hideTooltip };

  return (
    <div className="relative inline-block">
      <div {...triggerProps} className={FOCUS_RING}>
        {children}
      </div>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={cn(
              'absolute z-50 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-md whitespace-nowrap pointer-events-none',
              placementClasses[placement]
            )}
            role="tooltip"
          >
            {content}
            {/* Arrow */}
            <div
              className={cn(
                'absolute w-0 h-0 border-4 border-transparent',
                arrowClasses[placement]
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

Tooltip.displayName = 'Tooltip';

