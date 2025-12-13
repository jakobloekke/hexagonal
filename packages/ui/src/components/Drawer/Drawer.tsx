import React, { ReactNode, useState } from 'react';
import { cn } from '../../utils/cn';
import { FOCUS_RING } from '../../utils/a11yClasses';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

export interface DrawerProps {
  /** Whether the drawer is open */
  isOpen: boolean;
  /** Callback when drawer should close */
  onClose: () => void;
  /** Drawer title */
  title?: ReactNode;
  /** Drawer content */
  children: ReactNode;
  /** Position of the drawer */
  position?: 'left' | 'right' | 'top' | 'bottom';
  /** Whether clicking backdrop closes the drawer */
  closeOnBackdropClick?: boolean;
  /** Custom actions/footer */
  footer?: ReactNode;
  /** Whether to show close button */
  showCloseButton?: boolean;
}

/**
 * Drawer component for side/edge slide-out content.
 * 
 * @example
 * <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} title="Menu">
 *   <p>Drawer content</p>
 * </Drawer>
 */
export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  children,
  position = 'left',
  closeOnBackdropClick = true,
  footer,
  showCloseButton = true,
}) => {
  const [animationVariants] = useState({
    left: {
      initial: { x: '-100%' },
      animate: { x: 0 },
      exit: { x: '-100%' },
    },
    right: {
      initial: { x: '100%' },
      animate: { x: 0 },
      exit: { x: '100%' },
    },
    top: {
      initial: { y: '-100%' },
      animate: { y: 0 },
      exit: { y: '-100%' },
    },
    bottom: {
      initial: { y: '100%' },
      animate: { y: 0 },
      exit: { y: '100%' },
    },
  });

  const positionClasses = {
    left: 'inset-y-0 left-0 w-64 border-r',
    right: 'inset-y-0 right-0 w-64 border-l',
    top: 'inset-x-0 top-0 h-64 border-b',
    bottom: 'inset-x-0 bottom-0 h-64 border-t',
  };

  const isHorizontal = position === 'left' || position === 'right';

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={handleBackdropClick}
            role="presentation"
          />
          <motion.div
            initial={animationVariants[position].initial}
            animate={animationVariants[position].animate}
            exit={animationVariants[position].exit}
            transition={{ duration: 0.3 }}
            className={cn(
              'fixed bg-white shadow-lg z-50',
              positionClasses[position]
            )}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'drawer-title' : undefined}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <div className={cn(
                'flex items-center justify-between p-4 border-b border-gray-200',
                !isHorizontal && 'flex-col'
              )}>
                {title && (
                  <h2 id="drawer-title" className="text-lg font-semibold text-gray-900">
                    {title}
                  </h2>
                )}
                {showCloseButton && (
                  <button
                    onClick={onClose}
                    className={cn(
                      'p-1 text-gray-400 hover:text-gray-600 rounded-md',
                      !isHorizontal ? 'self-end' : 'ml-auto',
                      FOCUS_RING
                    )}
                    aria-label="Close drawer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            )}

            {/* Content */}
            <div className={cn(
              'overflow-y-auto',
              isHorizontal ? 'h-[calc(100%-80px)]' : 'w-full'
            )}>
              <div className="p-4">
                {children}
              </div>
            </div>

            {/* Footer */}
            {footer && (
              <div className="border-t border-gray-200 p-4">
                {footer}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

Drawer.displayName = 'Drawer';

